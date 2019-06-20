<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Provide a list of all available plugins.
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    editor
 * @package     CometVisu
 * @author      Michael Hausl (michael at hausl dot com)
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2013 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2013-03-18
 */

define('SCRIPTS_DIRECTORY', '../../script/');
define('PLUGINS_DIRECTORY', '../../resource/plugins/');
define('PLUGINS_PATTERN', '*');

$arrData = array();
$script = "";
// check the generated script for part definitions that start with plugin-
if (file_exists(SCRIPTS_DIRECTORY . 'cv-webkit.js')) {
  // this file exists in build
  $script = file_get_contents(SCRIPTS_DIRECTORY . 'cv-webkit.js');
} else if (file_exists(SCRIPTS_DIRECTORY . 'cv.js')) {
  // this file exists in source
  $script = file_get_contents(SCRIPTS_DIRECTORY . 'cv.js');
}
if (strlen($script) > 0) {
  if (preg_match('/parts : ({[^}]+})/m', $script, $matches)) {
    $data = json_decode($matches[1]);
    foreach($data as $name=>$entries) {
      if (strpos($name, 'plugin-') === 0) {
        $pluginName = substr($name, 7);
        $arrData[$pluginName] = array(
          'value' => utf8_encode($pluginName),
          'label' => utf8_encode($pluginName),
        );
      }
    }

  }
}


foreach (glob(PLUGINS_DIRECTORY . PLUGINS_PATTERN) as $strFilename) {
    $strFileBasename = explode(".", basename($strFilename))[0];

    $arrData[$strFileBasename] = array(
                                        'value' => utf8_encode($strFileBasename),
                                        'label' => utf8_encode($strFileBasename),
                                        );
}

Header("Content-type: application/json");
print json_encode(array_values($arrData));
exit;


?>