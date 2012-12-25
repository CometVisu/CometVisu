<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Save a serialized representation of a configuration to its file.
 * Serialization is done by means of JSON.
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
 * @since       2012-12-12
 */

define('CONFIG_FILENAME', '../../visu_config%s.xml');

// get everything the user has provided ...
$strJson   = (true === isset($_POST['data']))   ? $_POST['data']   : null;
$strConfig = (true === isset($_POST['config'])) ? $_POST['config'] : null;

$strConfigSuffix = preg_replace('/^visu_config_?(.*?)\.xml$/', '$1', $strConfig);

// clean-up filename, we want no security-holes. work with a whitelist.
$strConfigCleaned = preg_replace("/[^\-\_0-9da-z]/i", "", $strConfigSuffix);

// generate the configurations filename
$strConfigFilename = sprintf(CONFIG_FILENAME, $strConfigCleaned);
// .. as a fully qualified filename
$strConfigFQFilename = realpath($strConfigFilename);

if (false === is_writeable($strConfigFQFilename)) {
    exitWithResponse(false, 'config-file is not writeable by webserver-process; please chmod/chown config-file \'' . $strConfigFQFilename . '\'.');
}

// bail out if no json/configuration-data was provided
if (true === empty($strJson)) {
    exitWithResponse(false, 'no configuration-content given');
}

// decode json
$arrData = json_decode(stripslashes($strJson), true);

try {
    /** die alten Mappings und stylings übernehmen */
    $objDOM = new DOMDocument('1.0', 'UTF-8');
    $objDOM->formatOutput = true;


    foreach ($arrData as $arrRootNodeData) {
        $objDOM->appendChild(createDOMFromData($objDOM, $arrRootNodeData));
    }


    // stupid hacking. create the xml twice to receive nice newlines and indentation ...
    $strXML = $objDOM->saveXML();
    $objXML = new DOMDocument();
    $objXML->preserveWhiteSpace = false;
    $objXML->formatOutput = true;
    $objXML->loadXML($strXML);

    // save the XML to its configuration file
    $handle = fopen($strConfigFQFilename, "w");
    fputs($handle, $objXML->saveXML());
    fclose($handle);
} catch (Exception $e) {
    exitWithResponse(false, 'error: ' . $e->getMessage());
}

exitWithResponse(true, 'all good');

/**
 * create the DOM from a node
 * 
 * @param   object  $objMasterDOM   master-DOM
 * @param   array   $arrConfig      the configuration received from the editor, or a part of it
 * @returns object                  DOM-object
 * @throws  InvalidArgumentException
 */
function createDOMFromData($objMasterDOM, $arrConfig) {
    
    if (false === isset($arrConfig['nodeName'])) {
        throw new InvalidArgumentException('node has no name, ' . var_export($arrConfig, true));
    }
    
    if ($arrConfig['nodeName'] == '#text') {
        // this is a masqueraded text-only node
        $objXMLElement = $objMasterDOM->createTextNode($arrConfig['nodeValue']);
        return $objXMLElement;
    }
    
    // create a new DOM-Element
    $objXMLElement = $objMasterDOM->createElement($arrConfig['nodeName']);
    
    if (false === empty($arrConfig['attributes'])) {
        // add all of our attributes
        foreach ($arrConfig['attributes'] as $strName => $mixValue) {
            $objXMLElement->setAttribute($strName, $mixValue);
        }
    }
    
    if (false === empty($arrConfig['children'])) {
        // create and add new nodes for all of our children
        foreach ($arrConfig['children'] as $arrChildData) {
            $objXMLElement->appendChild(createDOMFromData($objMasterDOM, $arrChildData));
        }
    }
    
    
    if (false === empty($arrConfig['nodeValue'])) {
        // set the node value, if any
        $objCDATA = $objMasterDOM->createTextNode($arrConfig['nodeValue']);
        $objXMLElement->appendChild($objCDATA);
    }
    
    
    return $objXMLElement;
}

/**
 * create and send a response.
 * This function will issue an exit command!
 * 
 * @param   boolean $boolSuccess    was the operating successful?
 * @param   string  $strMessage     a message, if any
 */
function exitWithResponse($boolSuccess, $strMessage = '') {
    header('Content-type: application/json');
    $arrResponse = array(
                        'success' => (bool)$boolSuccess,
                        'message' => (string)$strMessage
    );
    
    print json_encode($arrResponse);
    exit;
}

?>

