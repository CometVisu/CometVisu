<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Upgrade a visu_config.xml from a previous version to the most current.
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
 * @category    upgrade
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2013 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2013-01-22
 */

error_reporting(E_ALL);

outputHeader();

require_once('ConfigurationUpgrader.class.php');

if (LIBRARY_VERSION > UPGRADER_LIBRARY_VERSION) {
    // the library moved faster than the upgrader
    exitWithResponse(false, 'The upgrader itself is not up-to-date. ' .
                            'Library is at version ' . LIBRARY_VERSION . ', ' .
                            'upgrader at version ' . UPGRADER_LIBRARY_VERSION . '. ' .
                            'Please report this problem at http://www.knx-user-forum.de/cometvisu/');
}


define('OLD_CONFIG_FILENAME', '../visu_config%s.xml');
define('DEMO_CONFIG_FILENAME', '../demo/visu_config%s.xml');
define('CONFIG_FILENAME', '../config/visu_config%s.xml');
define('BACKUP_FILENAME', '../config/backup/visu_config%s-%s.xml');

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
// .. as a fully qualified filename
$strConfigFQFilename = realpath($strConfigFilename);
$strSrcConfigFQFilename = $strConfigFQFilename;

if (false === file_exists($strConfigFQFilename)) {
  $strSrcConfigFQFilename = realpath(sprintf(OLD_CONFIG_FILENAME, $strConfigCleaned));
  if (false === file_exists($strSrcConfigFQFilename)) {
    $strSrcConfigFQFilename = realpath(sprintf(DEMO_CONFIG_FILENAME, $strConfigCleaned));
    if (true === file_exists($strSrcConfigFQFilename)) {
      exitWithResponse(false, 'demo config should not be upgraded: \'' . $_GET['config'] . '\'.');
    }
    exitWithResponse(false, 'config-file does not exist \'' . $strConfigFilename. '\'.');
  }
  if (false === @touch($strConfigFilename)) {
    exitWithResponse(false, 'config-file in new path could not be created: \'' . $strConfigFilename. '\'; please chmod/chown config directory.');
  }
  // recreate FQ as it couldn't work before due to the missing file
  $strConfigFQFilename = realpath($strConfigFilename);
}

if (false === is_writeable($strConfigFQFilename)) {
    exitWithResponse(false, 'config-file is not writeable by webserver-process; please chmod/chown config-file \'' . $strConfigFQFilename . '\' (\'' . $strConfigFilename. '\').');
}

// generate the backups filename
$strBackupFilename = sprintf(BACKUP_FILENAME, $strConfigCleaned, date('YmdHis'));
$strBackupFQDirname = realpath(dirname($strBackupFilename));

if (false === is_writeable($strBackupFQDirname)) {
    exitWithResponse(false, 'backup-file is not writeable, please chmod/chown directory \'' . $strBackupFQDirname . '\'');
}

// make a copy of the file for backup-purposes
copy($strSrcConfigFQFilename, $strBackupFilename);

// load the configuration
$objDOM = new DOMDocument("1.0", "UTF-8");
$objDOM->load($strSrcConfigFQFilename);
$objDOM->formatOutput = true;

// find out configurations lib_version, if any
$objPages = $objDOM->getElementsByTagName("pages")->item(0);

$intLibVersion = 0;
if ($objPages->hasAttribute('lib_version')) {
    $intLibVersion = (int)$objPages->getAttribute('lib_version');
}

if ($intLibVersion == LIBRARY_VERSION) {
    // everything is fine, we need to do nothing
    exitWithResponse(true, 'configuration is already at library version ' . LIBRARY_VERSION);
}

if ($intLibVersion > LIBRARY_VERSION) {
    // there is something wrong.
    exitWithResponse(false, 'configuration claims the be of a higher version than this library really is');
}

// do the actual upgrade
$objUpgrader = new ConfigurationUpgrader($objDOM, $intLibVersion);
$boolSuccess = $objUpgrader->runUpgrade();

// print the messages/log that we have from the upgrader
outputLoglines($objUpgrader->getLog());

if (false === $boolSuccess) {
    exitWithResponse(false, 'error while upgrading, please see the above loglines for details; config was not written');
}

$objUpgradedDOM = $objUpgrader->getConfigurationDOM();


/**
 * from here on: save the config
 */

// stupid hack; to have a well-formed XML-output from a file-read input, we need to save it twice
$strXML = $objUpgradedDOM->saveXML();
$objXML = new DOMDocument();
$objXML->preserveWhiteSpace = false;
$objXML->formatOutput = true;
$objXML->loadXML($strXML);

// save the resulting XML to its configuration file
$handle = fopen($strConfigFQFilename, "w");
fputs($handle, $objXML->saveXML());
fclose($handle);

exitWithResponse(true, 'configuration was upgraded to version ' . LIBRARY_VERSION);


/**
 * create and send a response.
 * This function will issue an exit command!
 * 
 * @param   boolean $boolSuccess    was the operating successful?
 * @param   string  $strMessage     a message, if any
 */
function exitWithResponse($boolSuccess, $strMessage = '') {
    if (true === $boolSuccess) {
        print '<b style="color: green;">SUCCESS</b>';
    } else {
        print '<b style="color: red;">ERROR</b>';
    }
    
    if (false === empty($strMessage)) {
        print ': ';
        print $strMessage;
    }
    
    if (true === $boolSuccess) {
        // despite globals being bad in general, this is way easier.
        global $strConfigSuffix;

        print '<p><a href="../editor/?config=' . $strConfigSuffix . '">open config in editor</a></p>';
        print '<p><a href="../?config=' . $strConfigSuffix . '">show in CometVisu</a></p>';
    }
    
    outputFooter();

    exit;
}

/**
 * print the HTML-header-stuff
 */
function outputHeader() {
    header('Content-type: text/html');
    print '<html><head>';
    print '<title>configuration-upgrader</title>';
    print '</head><body>';
}

/**
 * print the HTML-footer-stuff
 */
function outputFooter() {
    print '</body></html>';
}

/**
 * print the loglines in an HTML-like fashion
 * 
 * @param   mixed   $mixLog loglines, either as array or string
 */
function outputLoglines($mixLog) {
    if (false === is_array($mixLog)) {
        $mixLog = array((string)$mixLog);
    }
    
    foreach ($mixLog as $strLogline) {
        print $strLogline . '<br />';
    }
}

?>