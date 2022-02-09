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

// We might run on the Timberwolf Server, so try to get information about it - if possible.
// We use a caching mechanism here, so that non-timberwolf systems aren't
// affected by that test too often. For that /dev/shm/ must exist, so that
// it is ensured that the cache is cleaned during reboot
$SERVER_ADDR = explode('.', $_SERVER['SERVER_ADDR']);
if ($SERVER_ADDR[0]==='172' && $SERVER_ADDR[1]==='17') { // Linux Docker uses subnet 172.17.0.0/16
  $environmentInfoFile = '/dev/shm/CometVisuEnvironmentInfo.json';
  if (!is_dir('/dev/shm') || !file_exists($environmentInfoFile) || $_GET['force']) {
    $context = stream_context_create([
      'http' => [
        'method' => "GET",
      ],
      'ssl' => [
        'verify_peer' => false,
        'allow_self_signed' => true,
        'verify_peer_name' => false
      ]
    ]);
    $environmentInfoJSON = file_get_contents('https://172.17.0.1/version.json', false, $context);
    if ($environmentInfoJSON === false) {
      // we are not running on a Timberwolf - or the environment isn't as usual
      $environmentInfoJSON = '{}';
    }
    if (is_dir('/dev/shm')) {
      file_put_contents($environmentInfoFile, $environmentInfoJSON);
    }
  } else {
    // note: `is_dir('/dev/shm') === true` when we get here
    $environmentInfoJSON = file_get_contents($environmentInfoFile);
  }
  $environmentInfo = json_decode($environmentInfoJSON, true);
  if(array_key_exists('release', $environmentInfo)) {
    $retval['server_release'] = implode(' ', ['Timberwolf', $environmentInfo['release']]);
  }
  if(array_key_exists('branch', $environmentInfo)) {
    $retval['server_branch'] = $environmentInfo['branch'];
  }
  if(array_key_exists('id', $environmentInfo)) {
    $retval['server_id'] = implode(' ', ['Timberwolf', $environmentInfo['id']]);
  }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($retval);
?>
