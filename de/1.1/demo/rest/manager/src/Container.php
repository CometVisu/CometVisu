<?php
/* Container.php
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
