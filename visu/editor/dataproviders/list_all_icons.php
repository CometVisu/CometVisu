<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Provide a list of all icons.
 * Uses the colorspace 'white' as a basis
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
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2012 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2012-10-17
 */

define('ICON_DIRECTORY', '../../icon/knx-uf-iconset/128x128_white/');
define('ICON_SUFFIX', '.png');
define('ICON_PATTERN', '*.png');

foreach (glob(ICON_DIRECTORY . ICON_PATTERN) as $strFilename) {
    $strFileBasename = basename($strFilename, ICON_SUFFIX);

    $arrData[] = array(
                                        'value' => utf8_encode($strFileBasename),
                                        'label' => utf8_encode($strFileBasename),
                                        );
}

Header("Content-type: application/json");
print json_encode($arrData);
exit;


?>
