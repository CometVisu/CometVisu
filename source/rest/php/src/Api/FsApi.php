<?php

namespace OpenAPIServer\Api;

use Exception;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use OpenAPIServer\FileHandler;


class FsApi extends AbstractFsApi
{
  protected $baseDir;
  protected $config;
  protected $mounts;

  public function __construct(ContainerInterface $container) {
    parent::__construct($container);
    $this->config = include(getcwd() . '/src/config.php');
    $this->baseDir = $this->config->configDir;
    if (!$this->baseDir) {
      throw new Exception("resources/config path not found");
    }
    $map = function ($val) { return $val['mountPoint']; };
    $this->mounts = array_map($map, $this->config->mounts);
  }

  public function checkEnvironment(ServerRequestInterface $request, ResponseInterface $response, array $args) {
    $res = [];
    // config folder must be writeable
    forEach(['.', 'media', 'backup'] as $folder) {
      array_push($res, [
        "entity" => $folder,
        "state" => $this->getState(realpath($this->baseDir . '/' . $folder))
      ]);
    };
    return $response->withJson($res);
  }

  public function read(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    return $this->__processRequest($request, $response, function ($request, $response, $fsPath, $mount) {
      $recursive = $request->getQueryParam('recursive');
      return $response->withJson($this->listFolder($fsPath, $recursive, $mount));
    }, function ($request, $response, $fsPath, $mount) {
      $download = $request->getQueryParam('download');
      if ($download) {
        $response = $response->withHeader('Content-Disposition', 'attachment; filename=' . basename($fsPath));
      }
      return $response->write(file_get_contents($fsPath))->withHeader('Content-Type', FileHandler::getMimeTypeFromSuffix($fsPath));
    }, 'read');
  }

  public function update(ServerRequestInterface $request, ResponseInterface $response, array $args) {
    return $this->__processRequest($request, $response, null, function ($request, $response, $fsPath, $mount) {
      return $this->updateFile($response, $fsPath, $request->getBody(), $request->getQueryParam('hash'));
    }, 'update');
  }

  public function delete(ServerRequestInterface $request, ResponseInterface $response, array $args) {
    return $this->__processRequest($request, $response, function ($request, $response, $fsPath) {
      try {
        FileHandler::deleteFolder($fsPath, $request->getQueryParam('force'));
      } catch (Exception $e) {
        return $response->withJson(array('message' => $e->getMessage()), $e->getCode());
      }
    }, function ($request, $response, $fsPath) {
      try {
        FileHandler::deleteFile($fsPath, $request->getQueryParam('force'));
      } catch (Exception $e) {
        return $response->withJson(array('message' => $e->getMessage()), $e->getCode());
      }
    }, 'delete');
  }

  public function move(ServerRequestInterface $request, ResponseInterface $response, array $args) {
    $mount = $this->getMount($request->getQueryParam('src'));
    $fsPath = $this->getAbsolutePath($request->getQueryParam('src'), $mount);
    $targetMount = $this->getMount($request->getQueryParam('target'));
    $targetPath = $this->getAbsolutePath($request->getQueryParam('target'), $targetMount);
    if (!file_exists($fsPath)) {
      return $response->withJson(array('message' => 'Source not found'), 404);
    }
    if (file_exists(targetPath)) {
      return $response->withJson(array('message' => 'Target exists'), 406);
    }
    if (!$this->checkAccess(targetPath) || ($mount && $mount['writeable'] === false) || ($targetMount && $targetMount['writeable'] === false)) {
      return $response->withJson(array('message' => 'Forbidden'), 403);
    } else {
      try {
        FileHandler::rename($fsPath, $targetPath);
      } catch (Exception $e) {
        return $response->withJson(array('message' => $e->getMessage()), $e->getCode());
      }
    }
  }

  private function __processRequest(ServerRequestInterface $request, ResponseInterface $response, $folderCallback, $fileCallback, $type) {
    $requestPath = $request->getQueryParam('path');
    $mount = $this->getMount($requestPath);
    $fsPath = $this->getAbsolutePath($requestPath, $mount);
    if (file_exists($fsPath)) {
      if (!$this->checkAccess($fsPath) || ($mount && $mount['writeable'] === false && $type !== 'read')) {
        $response->withStatus(403);
      } else {
        if (is_dir($fsPath)) {
          if ($folderCallback) {
            return $folderCallback($request, $response, $fsPath, $mount);
                  }
        } else {
          if ($fileCallback) {
            return $fileCallback($request, $response, $fsPath, $mount);
          }
        }
      }
    } else {
      return $response->withStatus(404);
    }
  }

  private function listFolder($path, $recursive, $mount) {
    $content = array();

    if ($handle = opendir($path)) {
      $inTrash = $path === $this->config->trashFolder || substr($path, 0, strlen($this->config->trashFolder )) === $this->config->trashFolder;
      $trashFound = false;

      if ($mount) {
        $relFolder = $mount['mountPoint'] . substr($path, strlen($mount['path']));
      } else {
        $relFolder = substr($path, strlen($this->baseDir));
      }
      if (strlen($relFolder) > 0) {
        $relFolder .= '/';
      }
      while (($file = readdir($handle)) !== false) {
        if ($this->checkAccess($path, $file)) {
          $filePath = realpath($path . "/" . $file);
          $isDir = is_dir($filePath);
          if ($mount && $mount['showSubDirs'] === false && $isDir) {
            // no subdirs in mount
            continue;
          }

          $c = array(
            'name' => $file,
            'type' => $isDir ? 'dir' : (is_file($filePath) ? 'file' : null),
            'parentFolder' => $relFolder,
            'hasChildren' => is_dir($filePath) ? !FileHandler::isEmptyDir($filePath) : false,
            'readable' => is_readable($filePath),
            'writeable' => (!$mount || $mount['writeable'] !== false) && is_writable($filePath),
            'trash' => false,
            'inTrash' => $inTrash
          );
          $isTrash = $isDir && $file === $this->config->trashFolderName;
          $c['trash'] = $isTrash;
          if ($recursive && $c['hasChildren']) {
            $c['children'] = $this->listFolder($filePath, $recursive, $mount);
          }
          array_push($content, $c);
          if ($isTrash && !$trashFound) {
            $trashFound = true;
          }
        }
      }
      if (substr($path, -strlen('/resource/config')) === '/resource/config') {
        forEach($this->config->mounts as $mount) {
          array_push($content, array(
            'name' => $mount['mountPoint'],
            'type' => 'dir',
            'mounted' => true,
            'parentFolder' => '',
            'hasChildren' => count(scandir($mount['path'])) > 2,
            'readable' => true,
            'writeable' => $mount['writeable'] !== false
          ));
        };
        if (!$trashFound) {
          // add trash folder even if it does not exist
          array_push($content, [
            'name' => $this->config->trashFolderName,
            'type' => 'dir',
            'mounted' => false,
            'parentFolder' => '',
            'hasChildren' => false,
            'readable' => true,
            'writeable' => false,
            'trash' => true
          ]);
        }
      }
    }
    return $content;
  }

  /**
   * Update the content of an existing file
   * @param $response {ResponseInterface}
   * @param $file {String} absolute path to file
   * @param $content {String} file content
   */
  private function updateFile(ResponseInterface $response, $file, $content, $hash) {
    if (!file_exists($file)) {
      return $response->withStatus(404);
    } else {
      try {
        $dirname = dirname($file);
        if (!file_exists($dirname)) {
          // create missing dirs first
          mkdir($dirname, 0777, true);
        }
        return FileHandler::saveFile($file, $content, $hash);
      } catch (Exception $e) {
        var_dump($e);
        return $response->withJson(array('message' => $e->getMessage()))->withStatus($e->getCode());
      }
    }
  }

  private function __saveFile(ResponseInterface $response, $file, $content) {

  }

  private function getState($folder) {
    $state = 0;
    if (file_exists($folder)) {
      // Bit 0: exists
      $state = 1;
    }
    if (is_readable($folder)) {
      // Bit 1: readable
      $state |= 1 << 1;
    }
    if (is_writeable($folder)) {
      // Bit 2: writeable
      $state |= 2 << 1;
    }
    return $state;
  }

  /**
   * Returns false if accessing the filesystem item is not allowed (no read, update, delete, create).
   * The main purpose of this method is to prevent access to hidden files.
   *
   * @param $fsPath {String} path
   * @param $item {String} file name
   * @return {Boolean} true if access is allowed
   */
  private function checkAccess($fsPath, $item = null) {
    if (!$item) {
      $item = basename($fsPath);
      $fsPath = dirname($fsPath);
    }
    return $item === $this->config->trashFolderName || !(substr($item, 0, 1) === '.') || ($item === 'hidden.php' && $fsPath === $this->config->configDir);
  }

  private function getMount($path) {
    $mountKey = array_search($path, $this->mounts);
    if ($mountKey === false) {
      forEach($this->mounts as $index => $mountPoint) {
        if (substr($path, 0, strlen($mountPoint)) === $mountPoint) {
          $mountKey = $index;
          break;
        }
      };
    }
    if ($mountKey !== false) {
      return $this->config->mounts[$mountKey];
    }
  }

  private function getAbsolutePath($fsPath, $mount) {
    $fsPath = $this->__sanitize($fsPath);
    if ($mount) {
      // remove mountPoint from requested path
      $fsPath = substr($fsPath,strlen($mount['mountPoint']) + 1);
      return realpath($mount['path'] .  '/' . $fsPath);
    }
    return realpath($this->baseDir . '/' . $fsPath);
  }

  private function __sanitize($requestPath) {
    $parts = explode("/", $requestPath);
    $normalizedParts = [];
    // remove leading '..'
    foreach ($parts as $part) {
      if ($part == "." || $part == ".." || $part == "") {
        continue;
      } else {
        array_push($normalizedParts, $part);
      }
    }
    return join("/", $normalizedParts);
  }
}