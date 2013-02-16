<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Provide a list of all system-known addresses for the attribute 'addr'.
 * 
 * Will also provide hints for the attribute 'transform' as well as use user-readable names when available.
 * 
 * This file will output a json-encoded object with multiple dimensions.
 * Each last node will have:
 * - value: the value for this node
 * - label: a user-readable description/title of this node
 * - hints: an object, defining a list of attributes that will be set on the same element in the editor, when this value
 *              is selected.
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
define('FILE_HG', "/etc/wiregate/eibga_hg.conf");
define('FILE_MG', "/etc/wiregate/eibga_mg.conf");

// list of group-addresses, main-groups and middle-groups
$arrGA = array();
$arrHG = array();
$arrMG = array();

if (true === file_exists(FILE_GA) && filesize(FILE_GA) > 0) {
    // read list of known group addresses
    $arrGA = parse_ini_file(FILE_GA, true);
}
if (true === file_exists(FILE_HG) && filesize(FILE_HG) > 0) {
    // read list of known main groups
    $arrHG = parse_ini_file(FILE_HG, true);
}
if (true === file_exists(FILE_MG) && filesize(FILE_MG) > 0) {
    // read list of known middle groups
    $arrMG = parse_ini_file(FILE_MG, true);
}


// create a list of ALL group-addresses, multi-dimensional
$arrAdresses = array();

// sort the group addresses
uksort($arrGA, 'GASort');

foreach ($arrGA as $strGA => $arrData) {
    $arrGAParts = explode("/", $strGA, 3);

    $strHG = "";
    if (true === isset($arrHG[$arrGAParts[0]])) {
        $strHG = utf8_encode($arrHG[$arrGAParts[0]]['name']);
    }

    $strMG = "";
    if (true === isset($arrMG[$arrGAParts[1]])) {
        $strMG = utf8_encode($arrMG[$arrGAParts[1]]['name']);
    }

    $arrAdresses[$strHG . " " . $strMG][] = array(
                                                        'value' => $strGA,
                                                        'label' => utf8_encode($arrData['name']),
                                                        'hints' => array(
                                                                        'transform' => "DPT:" . $arrData['DPTSubId'],
                                                                        ),
                                                        );
}

Header("Content-type: application/json");
print json_encode($arrAdresses);
exit;


/**
 * Sort two GroupAddresses, natural sorting
 * 
 * @param string    $a
 * @param string    $b
 */
function GASort($a, $b) {
    $strA = preg_replace('/(^|\/)(\d)(\/|$)/', '${1}0${2}${3}', $a);
    $strB = preg_replace('/(^|\/)(\d)(\/|$)/', '${1}0${2}${3}', $b);
    
    return strcmp($strA, $strB);
}

?>