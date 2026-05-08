<?php
/* NotFoundException.php
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


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
