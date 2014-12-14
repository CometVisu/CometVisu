<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Pre-Check the configuration using the embedded schema.
 * This should make sure that we do not confront the user with javascript-errors
 * because of an invalid configuration.
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
 * @copyright   2013 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2013-02-05
 */

require_once('../lib/library_version.inc.php');

define('CONFIG_FILENAME', '../config/visu_config%s.xml');
define('DEMO_FILENAME', '../config/demo/visu_config%s.xml');
define('SCHEMA_FILENAME', './%s');

// flag to define if a real config file or a demo is opened
$isDemo = false;

// get everything the user has provided ...
$strConfigSuffix = (true === isset($_GET['config'])) ? $_GET['config'] : null;

// clean-up filename, we want no security-holes. work with a whitelist.
$strConfigCleaned = preg_replace("/[^\-\_0-9a-z]/i", "", $strConfigSuffix);

if (false === empty($strConfigCleaned)) {
    // prefix the postfix with an underscore
    $strConfigCleaned = '_' . $strConfigCleaned;
}

// generate the configurations filename
$strConfigFilename = sprintf(CONFIG_FILENAME, $strConfigCleaned);
$strDemoConfigFilename = sprintf(DEMO_FILENAME, $strConfigCleaned);
// .. as a fully qualified filename
$strConfigFQFilename = realpath($strConfigFilename);
$strDemoConfigFQFilename = realpath($strDemoConfigFilename);

if (false === is_readable($strConfigFQFilename)) {
    if( false === is_readable($strDemoConfigFQFilename)) {
        exitWithError('config-file does not exist nor demo is known with that name \'' . $strConfigFQFilename . '\' (\'' . $strConfigFilename. '\').');
    } else {
      $isDemo = true;
      $strConfigFQFilename = $strDemoConfigFQFilename;
    }
} else {
    if (false === is_writeable($strConfigFQFilename)) {
        exitWithError('config-file is not writeable by webserver-process; please chmod/chown config-file \'' . $strConfigFQFilename . '\' (\'' . $strConfigFilename. '\').');
    }
}

// load the configuration
$objDOM = new DOMDocument("1.0", "UTF-8");
$objDOM->load($strConfigFQFilename);

// get the configurations schema.
$strSchemaFile = $objDOM->getElementsByTagName('pages')->item(0)->getAttribute('xsi:noNamespaceSchemaLocation');

if (true === empty($strSchemaFile)) {
    exitWithError('config-file has no schema associated; do not worry, you probably only need to upgrade its ' . 
                    'structure. This can be done automatically. ' .
                    '<a href="../upgrade/index.php?config=' . $strConfigSuffix . '">Click here to upgrade</a>');
}

$intConfigurationVersion = $objDOM->getElementsByTagName('pages')->item(0)->getAttribute('lib_version');
if ($intConfigurationVersion < LIBRARY_VERSION) {
    exitWithError('Your configuration is not suited for the current version of the library/editor; ' .
                    ' do not worry, you only need to upgrade its structure. This can be done automatically. ' .
                    '<a href="../upgrade/index.php?config=' . $strConfigSuffix . '">Click here to upgrade</a>');
}

$strSchemaFilename = sprintf(SCHEMA_FILENAME, $strSchemaFile);
// .. as a fully qualified filename
$strSchemaFQFilename = realpath(pathinfo($strConfigFQFilename, PATHINFO_DIRNAME) . '/' . $strSchemaFilename);

if (false === is_readable($strSchemaFQFilename)) {
    exitWithError('schema-file of config-file does not exist \'' . $strSchemaFQFilename . '\' (\'' . $strSchemaFilename. '\').');
}

// disable output of validator
ob_start();
// validate the configuration
$boolValid = $objDOM->schemaValidate($strSchemaFQFilename);

// and flush the validators output
ob_end_clean();


if (true === $boolValid) {
    // everything is good
    header('Location: editor.html?config=' . $strConfigSuffix . ($isDemo?'&demo=true':''));
    exit;
} else {
    // not everything is good, have check_config look at it.
    header('Location: ../check_config.php?config=' . $strConfigSuffix);
    exit;
}

/**
 * create and send a response.
 * This function will issue an exit command!
 * 
 * @param   string  $strMessage     a message, if any
 */
function exitWithError($strMessage = '') {

    header('Content-type: text/html');
    print '<html><head>';
    print '<title>configuration pre-check</title>';
    print '</head><body>';

    print '<b style="color: red;">ERROR</b>: ';
    print $strMessage;
    
    print '</body></html>';
    
    exit;
}

?>