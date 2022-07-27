<?php

namespace OpenAPIServer\Exceptions;

use LogicException;
use Psr\Container\NotFoundExceptionInterface;

/**
 * Exception.
 */
final class NotFoundException extends LogicException implements NotFoundExceptionInterface
{
  /**
   * Create exception instance.
   *
   * @param string $id The id
   *
   * @return self
   */
  public static function create(string $id): self
  {
    return new self(sprintf('There is no service with id "%s"', $id), 0);
  }
}
