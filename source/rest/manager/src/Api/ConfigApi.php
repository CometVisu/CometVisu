<?php


namespace OpenAPIServer\Api;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Exception;


class ConfigApi extends AbstractConfigApi
{
    protected $configFile;
    protected $apiConfig;
    protected $hidden;
    protected $escapeChars = "'";


    public function __construct(ContainerInterface $container)
    {
      parent::__construct($container);
      $this->apiConfig = include(getcwd() . '/src/config.php');
      $this->configFile = realpath($this->apiConfig->configDir . '/hidden.php');
      $this->load();
  }

  protected function load()
  {
    $hidden = array();
    include($this->configFile);
    $this->hidden = $hidden;
  }

  protected function dump() {
    $out =  '<?php
// File for configurations that shouldn\'t be shared with the user
$data = \'' . json_encode($this->hidden, JSON_PRETTY_PRINT) . '\';
$hidden = json_decode($data, true);
';
    // step 3: write
    $res = file_put_contents( $this->configFile, $out );
    if ($res === false && !is_writeable($this->configFile)) {
      throw new Exception('Configuration file is not writeable', 403);
    }

    // step 4: read it in, so that the user sees it
    $this->load();
  }

  protected function getSection($name)
  {
    if ($name === '*') {
      // return everything
      return $this->hidden;
    }
    return array_key_exists($name, $this->hidden) ? $this->hidden[$name] : null;
  }

  public function createHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    $section = $args['section'];
    $key = $args['key'];
    // TODO: sanitize key / value
    $value = $request->getParsedBody();

    if (!array_key_exists($section, $this->hidden)) {
      $this->hidden[$section] = array();
    } elseif (array_key_exists($key, $this->config[$section])) {
      return $response->withJson(['message' => 'Config option already exists'], 406);
    }
    $this->hidden[$section][$key] = $value;
    try {
      $this->dump();
    } catch (Exception $e) {
      return $response->withJson(['message' => $e->getMessage()], $e->getCode());
    }
    return $response->withStatus(200);
  }

  public function deleteHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    $section = $args['section'];
    $key = $args['key'];
    if ($key === '*') {
      $key = null;
    }
    if (array_key_exists($section, $this->hidden)) {
      if ($key) {
        if (array_key_exists($key, $this->hidden[$section])) {
          unset($this->hidden[$section][$key]);
        } else {
          return $response->withJson(['message' => 'Config option not found'], 403);
        }
      } else {
        // delete complete section
        unset($this->hidden[$section]);
      }
      try {
        $this->dump();
      } catch (Exception $e) {
        return $response->withJson(['message' => $e->getMessage()], $e->getCode());
      }
      return $response->withStatus(200);
    } else {
      return $response->withJson(['message' => 'Config option not found'], 403);
    }
  }

  public function getHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    $sectionName = $args['section'];
    $key = $args['key'];
    if ($key === '*') {
      $key = null;
    }

    $section = $this->getSection($sectionName);
    if ($section && (!$key || array_key_exists($key, $section))) {
      if (!$key) {
        return $response->withJson($section);
      } else {
        return $response->withJson($section[$key]);
      }
    } else {
      return $response->withJson(['message' => 'Config option not found'], 404);
    }
  }

  public function saveHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    $this->hidden = $request->getParsedBody();
    var_dump($request->getParsedBody());
    var_dump($request->getBody());
    try {
      $this->dump();
    } catch (Exception $e) {
      return $response->withJson(['message' => $e->getMessage()], $e->getCode());
    }
    return $response->withStatus(200);
  }

  public function updateHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
  {
    $section = addcslashes($args['section'], $this->escapeChars);
    $key = addcslashes($args['key'], $this->escapeChars);
    // TODO: sanitize key / value
    $value = addcslashes($request->getParsedBody(), $this->escapeChars);

    if (array_key_exists($section, $this->hidden) && array_key_exists($key, $this->hidden[$section])) {
      $this->hidden[$section][$key] = $value;
      try {
        $this->dump();
      } catch (Exception $e) {
        return $response->withJson(['message' => $e->getMessage()], $e->getCode());
      }
    } else {
      return $response->withJson(['message' => 'Config option nit found'], 403);
    }
  }
}