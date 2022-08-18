<?php

namespace OpenAPIServer;

use Psr\Container\ContainerInterface;
use OpenAPIServer\Exceptions\NotFoundException;

final class Container implements ContainerInterface {
  /**
   * @var array<string, mixed>
   */
  private array $config = [];

  public function __construct(array $config = []) {
    $this->config = $config;
  }


  public function get(string $id)
  {
    if (array_key_exists($id, $this->config)) {
      return $this->config[$id];
    }
    throw throw NotFoundException::create($id);
  }

  public function has(string $id): bool
  {
    return array_key_exists($id, $this->config);
  }
}
