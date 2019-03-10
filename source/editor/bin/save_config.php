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

define('CONFIG_FILENAME', '../../resource/config/visu_config%s.xml');
define('BACKUP_FILENAME', '../../resource/config/backup/visu_config%s-%s.xml');

// get everything the user has provided ...
$strJson   = (true === isset($_POST['data']))   ? $_POST['data']   : null;
$strConfig = (true === isset($_POST['config'])) ? $_POST['config'] : null;
$configType = (true === isset($_POST['configType'])) ? $_POST['configType'] : "json";

$strConfigSuffix = preg_replace('/^(resource\/)?config\/visu_config(_?.*?)\.xml$/', '$2', $strConfig);

$isOhGenerated = false;
if (substr($strConfigSuffix,1,3)=="oh_") {
  $isOhGenerated = true;
  $strConfigCleaned = preg_replace("/[^\-0-9a-z]/i", "", $strConfigSuffix);
  $saveUrl = "http://".$_SERVER['SERVER_NAME'].":".$_SERVER['SERVER_PORT'].$_SERVER['SCRIPT_URL'];
} else {
  // clean-up filename, we want no security-holes. work with a whitelist. 
  $strConfigCleaned = preg_replace("/[^\-\_0-9a-z]/i", "", $strConfigSuffix);
}
// generate the configurations filename
$strConfigFilename = sprintf(CONFIG_FILENAME, $strConfigCleaned);
// .. as a fully qualified filename
$strConfigFQFilename = realpath($strConfigFilename);

if ($isOhGenerated === false && false === is_writeable($strConfigFQFilename)) {
    exitWithResponse(false, 'config-file is not writeable by webserver-process; please chmod/chown config-file \'' . $strConfigFQFilename . '\' (\'' . $strConfigFilename. '\').');
}

// create a backup, but not for the previewtemp
if ($strConfigCleaned !== '_previewtemp' && $isOhGenerated === false) {
    // generate the backups filename
    $strBackupFilename = sprintf(BACKUP_FILENAME, $strConfigCleaned, date('YmdHis'));
    $strBackupFQDirname = realpath(dirname($strBackupFilename));

    if (false === is_writeable($strBackupFQDirname)) {
        exitWithResponse(false, 'backup-file is not writeable, please chmod/chown directory \'' . $strBackupFQDirname . '\'');
    }

    // make a copy of the file for backup-purposes
    copy($strConfigFQFilename, $strBackupFilename);
}

// bail out if no json/configuration-data was provided
if (true === empty($strJson)) {
    exitWithResponse(false, 'no configuration-content given');
}
// decode json
if (true === function_exists("get_magic_quotes_gpc") && 1 == get_magic_quotes_gpc()) {
    // magic_quotes are on, so we have to remove those unneccessary slashes from input
    $arrData = json_decode(stripslashes($strJson), true);
} else {
    $arrData = json_decode($strJson, true);
}

if (false === is_array($arrData) || true ===  empty($arrData)) {
    $strResponse = 'configuration-data could not be decoded';
    if (true === function_exists('json_last_error')) {
        // json_last_error is only available with PHP >= 5.3
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                $strResponse .= ' - No errors';
                break;
            case JSON_ERROR_DEPTH:
                $strResponse .= ' - Maximum stack depth exceeded';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $strResponse .= ' - Underflow or the modes mismatch';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $strResponse .= ' - Unexpected control character found';
                break;
            case JSON_ERROR_SYNTAX:
                $strResponse .= ' - Syntax error, malformed JSON';
                break;
            case JSON_ERROR_UTF8:
                $strResponse .= ' - Malformed UTF-8 characters, possibly incorrectly encoded';
                break;
            default:
                $strResponse .= ' - Unknown error ' . json_last_error();
                break;
        }
    }
    exitWithResponse(false, $strResponse);
}

try {
    /** die alten Mappings und stylings übernehmen */
    $objDOM = new DOMDocument('1.0', 'UTF-8');
    $objDOM->formatOutput = true;

    if ($configType === "string") {
        $objDOM->loadXML($arrData[0]);
    } else {

      foreach ($arrData as $arrRootNodeData) {
          $objDOM->appendChild(createDOMFromData($objDOM, $arrRootNodeData));
      }
    }

    $objDOM->preserveWhiteSpace = false;
    $objDOM->formatOutput = true;

    if ($isOhGenerated === false) {
        // save the XML to its configuration file
        $handle = fopen($strConfigFQFilename, "w");
        fputs($handle, $objDOM->saveXML());
        fclose($handle);
    } else {
        // send generated data to openhab
        $data = array(
            'config' => $strConfig,
            'data' => $objDOM->saveXML(),
            'type' => 'xml'
        );

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($saveUrl, false, $context);

        if ($result === false) {
            exitWithResponse(false, 'error: ' . $resp);
        } else {
            exitWithResponse(true, 'all good, file ' . $strConfigFQFilename . ' saved');
        }
    }
} catch (Exception $e) {
    exitWithResponse(false, 'error: ' . $e->getMessage());
}

exitWithResponse(true, 'all good, file ' . $strConfigFQFilename . ' saved');

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

    if ($arrConfig['nodeName'] == '#comment') {
      // this is a masqueraded comment node
      $objXMLElement = $objMasterDOM->createComment($arrConfig['nodeValue']);
      return $objXMLElement;
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
            if ($mixValue !== '') {
                $objXMLElement->setAttribute($strName, $mixValue);
            }
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

