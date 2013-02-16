<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Provide a list of all system-known rrd-files for the attribute 'rrd'.
 * 
 * 
 * This file will output a json-encoded object with multiple dimensions.
 * Each last node will have:
 * - value: the value for this node
 * - label: a user-readable description/title of this node
 * - hints: an object, defining a list of attributes that will be set on the same element in the editor, when this value
 *              is selected. There are NONE for this file
 *
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

define('FILE_GA', "/etc/wiregate/eibga.conf");
define('FILE_OW', "/etc/wiregate/owsensors.conf");
define('DIR_RRD', "/var/www/rrd/*.rrd");

// list of known one-wire-sensors
$arrSensors = array();
if (true === file_exists(FILE_OW)) {
    $arrSensors = parse_ini_file(FILE_OW, true);
}

// list of all known group-addresses
$arrGA = array();
if (true === file_exists(FILE_GA)) {
    $arrGA = parse_ini_file(FILE_GA, true);
}

$arrData = array();

foreach (glob(DIR_RRD) as $strFilename) {
    $strFileBasename = basename($strFilename, '.rrd');
    $arrRRDParts = explode("_", $strFileBasename, 2);

    $arrData[] = array(
                                        'value' => utf8_encode($strFileBasename),
                                        'label' => utf8_encode($arrSensors[$arrRRDParts[0]]['name']),
                                        );
}

Header("Content-type: application/json");
print json_encode($arrData);
exit;

?>
