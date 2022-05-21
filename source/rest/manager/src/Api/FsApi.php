<?php

namespace OpenAPIServer\Api;

use Exception;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use OpenAPIServer\FileHandler;
use OpenAPIServer\Helper;

class FsApi extends AbstractFsApi
{
    protected $baseDir;
    protected $config;
    protected $mounts;

    public function __construct(ContainerInterface $container = null)
    {
        parent::__construct($container);
        $this->config = include getcwd() . "/src/config.php";
        $this->baseDir = $this->config->configDir;
        if (!$this->baseDir) {
            throw new Exception(
                "resources/config path not found " .
                    getcwd() .
                    "/src/config.php"
            );
        }
        $map = function ($val) {
            return $val["mountPoint"];
        };
        $this->mounts = array_map($map, $this->config->mounts);
    }

    public function checkEnvironment(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $res = [];
        // config folder must be writeable
        foreach ([".", "media", "backup", "hidden.php"] as $folder) {
            array_push($res, [
                "entity" => $folder,
                "state" => $this->getState(
                    realpath($this->baseDir . "/" . $folder)
                ),
            ]);
        }
        return Helper::withJson($response, $res);
    }

    public function create(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        return $this->__processRequest(
            $request,
            $response,
            function ($request, $response, $fsPath, $mount) {
                return $this->createFolder($response, $fsPath);
            },
            function ($request, $response, $fsPath, $mount) {
                $uploadedFiles = $request->getUploadedFiles();
                if (sizeof($uploadedFiles) > 0) {
                    // upload file mode, get the information from the uploaded file
                    $options = $request->getParsedBody();
                    if (!array_key_exists("filename", $options)) {
                        $options["filename"] = $uploadedFiles[
                            "file"
                        ]->getClientFileName();
                    } else {
                        $options["filename"] = urldecode($options["filename"]);
                    }
                    return $this->createFile(
                        $response,
                        $fsPath,
                        $uploadedFiles,
                      Helper::getQueryParam($request, "hash"),
                        $options
                    );
                } else {
                    $options = [];
                    $options["filename"] = basename($fsPath);
                    $fsPath = dirname($fsPath);
                    return $this->createFile(
                        $response,
                        $fsPath,
                        $request->getBody(),
                        Helper::getQueryParam($request, "hash"),
                        $options
                    );
                }
            },
            "create"
        );
    }

    public function read(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        return $this->__processRequest(
            $request,
            $response,
            function ($request, $response, $fsPath, $mount) {
                $recursive = Helper::getQueryParam($request, "recursive");
                return Helper::withJson(
                    $response,
                    $this->listFolder($fsPath, $recursive, $mount)
                );
            },
            function ($request, $response, $fsPath, $mount) {
                $download = Helper::getQueryParam($request, "download");
                if ($download) {
                    $response = $response->withHeader(
                        "Content-Disposition",
                        "attachment; filename=" . basename($fsPath)
                    );
                }
                $response->getBody()->write(file_get_contents($fsPath));
                return $response->withHeader(
                    "Content-Type",
                    FileHandler::getMimeTypeFromSuffix($fsPath)
                );
            },
            "read"
        );
    }

    public function update(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        return $this->__processRequest(
            $request,
            $response,
            null,
            function ($request, $response, $fsPath, $mount) {
                return $this->updateFile(
                    $response,
                    $fsPath,
                    $request->getBody(),
                    Helper::getQueryParam($request, "hash")
                );
            },
            "update"
        );
    }

    public function delete(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        return $this->__processRequest(
            $request,
            $response,
            function ($request, $response, $fsPath) {
                try {
                    FileHandler::deleteFolder(
                        $fsPath,
                        Helper::getQueryParam($request, "force")
                    );
                } catch (Exception $e) {
                    return Helper::withJson(
                        $response,
                        ["message" => $e->getMessage()],
                        $e->getCode()
                    );
                }
            },
            function ($request, $response, $fsPath) {
                try {
                    FileHandler::deleteFile(
                        $fsPath,
                        Helper::getQueryParam($request, "force")
                    );
                } catch (Exception $e) {
                    return Helper::withJson(
                        $response,
                        ["message" => $e->getMessage()],
                        $e->getCode()
                    );
                }
            },
            "delete"
        );
    }

    public function move(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $src = Helper::getQueryParam($request, "src");
        $target = Helper::getQueryParam($request, "target");
        $renaming = dirname($src) == dirname($target);
        $mount = $this->getMount($src);
        $fsPath = $this->getAbsolutePath($src, $mount);
        if ($renaming) {
            $targetPath = dirname($fsPath) . "/" . basename($target);
        } else {
            $targetMount = $this->getMount($src);
            $targetPath = $this->getAbsolutePath($target, $targetMount);
        }
        if (!file_exists($fsPath)) {
            return Helper::withJson(
                $response,
                ["message" => "Source not found"],
                404
            );
        }
        if (file_exists($targetPath)) {
            return Helper::withJson(
                $response,
                ["message" => "Target exists"],
                406
            );
        }
        if (
            !$this->checkAccess($targetPath) ||
            ($mount && $mount["writeable"] === false) ||
            ($targetMount && $targetMount["writeable"] === false)
        ) {
            return Helper::withJson($response, ["message" => "Forbidden"], 403);
        } else {
            try {
                if (FileHandler::rename($fsPath, $targetPath)) {
                    return $response->withStatus(200);
                } else {
                    return Helper::withJson(
                        $response,
                        ["message" => "rename failed"],
                        500
                    );
                }
            } catch (Exception $e) {
                return Helper::withJson(
                    $response,
                    ["message" => $e->getMessage()],
                    $e->getCode()
                );
            }
        }
    }

    private function __processRequest(
        ServerRequestInterface $request,
        ResponseInterface $response,
        $folderCallback,
        $fileCallback,
        $type
    ) {
        $requestPath = Helper::getQueryParam($request, "path");
        $mount = $this->getMount($requestPath);
        $fsPath = $this->getAbsolutePath($requestPath, $mount);
        if (file_exists($fsPath) || $type === "create") {
            if (
                !$this->checkAccess($fsPath) ||
                ($mount && $mount["writeable"] === false && $type !== "read")
            ) {
                return $response->withStatus(403);
            } else {
                if (
                    ($type !== "create" && is_dir($fsPath)) ||
                    ($type === "create" &&
                      Helper::getQueryParam($request, "type") === "dir")
                ) {
                    if ($folderCallback) {
                        return $folderCallback(
                            $request,
                            $response,
                            $fsPath,
                            $mount
                        );
                    }
                } else {
                    if ($fileCallback) {
                        return $fileCallback(
                            $request,
                            $response,
                            $fsPath,
                            $mount
                        );
                    }
                }
            }
        } else {
            return $response->withStatus(404);
        }
    }

    private function listFolder($path, $recursive, $mount)
    {
        $content = [];

        if ($handle = opendir($path)) {
            $inTrash =
                $path === $this->config->trashFolder ||
                substr($path, 0, strlen($this->config->trashFolder)) ===
                    $this->config->trashFolder;
            $trashFound = false;
            $mounted = false;

            if ($mount) {
                $relFolder =
                    $mount["mountPoint"] .
                    substr($path, strlen($mount["path"]));
                $mounted = true;
            } else {
                $relFolder = substr($path, strlen($this->baseDir));
            }
            if (substr($relFolder, 0, 1) === "/") {
                $relFolder = substr($relFolder, 1);
            }
            if (strlen($relFolder) > 0) {
                $relFolder .= "/";
            }
            while (($file = readdir($handle)) !== false) {
                if ($this->checkAccess($path, $file)) {
                    $filePath = realpath($path . "/" . $file);
                    $isDir = is_dir($filePath);
                    if ($mount && $mount["showSubDirs"] === false && $isDir) {
                        // no subdirs in mount
                        continue;
                    }

                    $c = [
                        "name" => $file,
                        "type" => $isDir
                            ? "dir"
                            : (is_file($filePath)
                                ? "file"
                                : null),
                        "parentFolder" => $relFolder,
                        "hasChildren" => is_dir($filePath)
                            ? !FileHandler::isEmptyDir($filePath)
                            : false,
                        "readable" => is_readable($filePath),
                        "writeable" =>
                            (!$mount || $mount["writeable"] !== false) &&
                            is_writable($filePath),
                        "trash" => false,
                        "inTrash" => $inTrash,
                        "mounted" => $mounted,
                    ];
                    $isTrash =
                        $isDir && $file === $this->config->trashFolderName;
                    $c["trash"] = $isTrash;

                    if (
                        $file === $this->config->backupFolderName ||
                        substr(
                            $relFolder,
                            1,
                            strlen($this->config->backupFolderName)
                        ) === $this->config->backupFolderName
                    ) {
                        $c["writeable"] = false;
                    }
                    if ($recursive && $c["hasChildren"]) {
                        $c["children"] = $this->listFolder(
                            $filePath,
                            $recursive,
                            $mount
                        );
                    }
                    array_push($content, $c);
                    if ($isTrash && !$trashFound) {
                        $trashFound = true;
                    }
                }
            }
            if (
                substr($path, -strlen("/resource/config")) ===
                "/resource/config"
            ) {
                foreach ($this->config->mounts as $mount) {
                    array_push($content, [
                        "name" => $mount["mountPoint"],
                        "type" => "dir",
                        "mounted" => true,
                        "parentFolder" => "",
                        "hasChildren" => count(scandir($mount["path"])) > 2,
                        "readable" => true,
                        "writeable" => $mount["writeable"] !== false,
                    ]);
                }
                if (!$trashFound) {
                    // add trash folder even if it does not exist
                    array_push($content, [
                        "name" => $this->config->trashFolderName,
                        "type" => "dir",
                        "mounted" => false,
                        "parentFolder" => "",
                        "hasChildren" => false,
                        "readable" => true,
                        "writeable" => false,
                        "trash" => true,
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
    private function updateFile(
        ResponseInterface $response,
        $file,
        $content,
        $hash
    ) {
        if (!file_exists($file)) {
            return $response->withStatus(404);
        } else {
            try {
                $dirname = dirname($file);
                if (!file_exists($dirname)) {
                    // create missing dirs first
                    mkdir($dirname, 0777, true);
                }
                FileHandler::saveFile($file, $content, $hash);
                return $response->withStatus(200);
            } catch (Exception $e) {
                return Helper::withJson(
                    $response,
                    ["message" => $e->getMessage()],
                    $e->getCode()
                );
            }
        }
    }

    /**
     * Create a new file with content
     * @param $response {ResponseInterface}
     * @param $file {String} absolute path to file
     * @param $content {String} file content
     * @param $options {Array} additional options fpr this request
     * @return ResponseInterface
     */
    private function createFile(
        ResponseInterface $response,
        $dirname,
        $content,
        $hash,
        $options = []
    ) {
        try {
            if (is_array($content)) {
                $uploadedFile = $content["file"];
                if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                    $content = file_get_contents($uploadedFile->file);
                    if (!$content) {
                        throw new Exception(
                            "Uploaded file could not be read",
                            406
                        );
                    }
                } else {
                    throw new Exception(
                        "File upload failed with error code: " .
                            $uploadedFile->getError(),
                        406
                    );
                }
            }
            if (!file_exists($dirname)) {
                // create missing dirs first
                mkdir($dirname, 0777, true);
            }

            $file = $dirname . DIRECTORY_SEPARATOR . $options["filename"];
            if (file_exists($file) && (!$options || !$options["force"])) {
                throw new Exception("File already exists", 406);
            } else {
                FileHandler::saveFile($file, $content, $hash);
                return $response->withStatus(200);
            }
        } catch (Exception $e) {
            return Helper::withJson(
                $response,
                ["message" => $e->getMessage()],
                $e->getCode()
            );
        }
    }

    private function createFolder(ResponseInterface $response, $file)
    {
        try {
            FileHandler::createFolder($file);
            return $response->withStatus(200);
        } catch (Exception $e) {
            return Helper::withJson(
                $response,
                ["message" => $e->getMessage()],
                $e->getCode()
            );
        }
    }

    private function getState($folder)
    {
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
    private function checkAccess($fsPath, $item = null)
    {
        if (!$item) {
            $item = basename($fsPath);
            $fsPath = dirname($fsPath);
        }
        return $item === $this->config->trashFolderName ||
            !(substr($item, 0, 1) === ".") ||
            ($item === "hidden.php" && $fsPath === $this->config->configDir);
    }

    private function getMount($path)
    {
        $mountKey = array_search($path, $this->mounts);
        if ($mountKey === false) {
            foreach ($this->mounts as $index => $mountPoint) {
                if (substr($path, 0, strlen($mountPoint)) === $mountPoint) {
                    $mountKey = $index;
                    break;
                }
            }
        }
        if ($mountKey !== false) {
            return $this->config->mounts[$mountKey];
        }
        return null;
    }

    private function getAbsolutePath($fsPath, $mount)
    {
        $fsPath = $this->__sanitize($fsPath);
        if ($mount) {
            // remove mountPoint from requested path
            $fsPath = substr($fsPath, strlen($mount["mountPoint"]) + 1);
            $res = realpath($mount["path"] . "/" . $fsPath);
            if ($res == false) {
                // path does not exist, create the path without normalizing
                $res = $mount["path"] . "/" . $fsPath;
            }
            return $res;
        }
        $res = realpath($this->baseDir . "/" . $fsPath);
        if ($res == false) {
            // path does not exist, create the path without normalizing
            $res = $this->baseDir . "/" . $fsPath;
        }
        return $res;
    }

    private function __sanitize($requestPath)
    {
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
