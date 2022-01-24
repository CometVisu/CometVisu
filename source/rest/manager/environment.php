<?php
/* environment.php
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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

/**
 * Return information about the running environment as JSON so that e.g. the
 * manager can warn about a too old and unsupported environment.
 */

$retval = array();
$retval['phpversion'] = phpversion();
if (!defined('PHP_VERSION_ID')) {
  $version = explode('.', PHP_VERSION);
  define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
}
$retval['PHP_VERSION_ID'] = PHP_VERSION_ID;
$retval['SERVER_SIGNATURE'] = $_SERVER['SERVER_SIGNATURE'];
$retval['SERVER_SOFTWARE'] = $_SERVER['SERVER_SOFTWARE'];

$composer_file = file_get_contents("composer.json");
$composer = json_decode($composer_file, true);
$retval['required_php_version'] = $composer['require']['php'];

echo json_encode($retval);
?>
