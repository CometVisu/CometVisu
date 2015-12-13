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

define('DESIGNS_DIRECTORY', '../../plugins/');
define('DESIGNS_PATTERN', '*');

foreach (glob(DESIGNS_DIRECTORY . DESIGNS_PATTERN, GLOB_ONLYDIR) as $strFilename) {
    $strFileBasename = basename($strFilename);

    $arrData[] = array(
                                        'value' => utf8_encode($strFileBasename),
                                        'label' => utf8_encode($strFileBasename),
                                        );
}

Header("Content-type: application/json");
print json_encode($arrData);
exit;


?>
