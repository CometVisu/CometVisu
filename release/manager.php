<?php
/* manager.php (c) 2014 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This little PHP helper will show and manage all available CometVisu 
 * Configurations.
 */

// global definitions
define( 'CONFIG_FILENAME', 'config/visu_config%s.xml');
define( 'DEMO_FILENAME', 'config/demo/visu_config%s.xml');

// strings
$_STRINGS = array(
  'en' => array(
    'A configuration with that name does already exist' => 'A configuration with that name does already exist',
    'Available Configurations:' => 'Available %s Configurations:',
    'Check' => 'Check',
    'CometVisu Manager' => 'CometVisu Manager',
    'Configuration file could not be created' => 'Configuration file (%s) could not be created',
    'Configuration file could not be deleted' => 'Configuration file (%s) could not be deleted',
    'Configuration file deleted' => 'Configuration file (%s) deleted.',
    'Configuration file not writeable' => 'Configuration file (%s) not writeable. Please check permissions!',
    'Configuration file to delete not found' => 'Configuration file to delete (%s) not found.',
    'Configuration successfully replaced' => 'Configuration successfully replaced (%s).',
    'Could not replace configuraion' => 'Could not replace configuraion (%s).',
    'Create new config' => 'Create new config',
    'Delete' => 'Delete',
    'deleteConfig(displayName,name)' => '"Do you really want to delete config \"" + displayName + "\"?"',
    'Demo config' => 'Demo config',
    'Download' => 'Download',
    'Edit' => 'Edit',
    'Empty configuration is not readable -> CometVisu installation is badly broken!' => 'Empty configuration is not readable -> CometVisu installation is badly broken!',
    'Installation error - please check file permissions!' => 'Installation error - please check file permissions!',
    'Name' => 'Name',
    'New configuration file successfully created' => 'New configuration file (%s) successfully created',
    'new_name' => 'new_name',
    'Replace' => 'Replace',
    'View' => 'View',
    'What name shall the new config have (please use only letters, numbers and the underscore)' => 'What name shall the new config have (please use only letters, numbers and the underscore)?',
    'dummy' => 'dummy' // hanlde last comma gracefully
  ),
  'de' => array(
    'A configuration with that name does already exist' => 'Eine Konfigurationsdatei mit diesem Namen existiert bereits!',
    'Available Configurations:' => 'Verfügbare %s Konfigurationen:',
    'Check' => 'Überprüfen',
    'CometVisu Manager' => 'CometVisu Manager',
    'Configuration file could not be created' => 'Konfigurationsdatei (%s) konnte nicht erstellt werden.',
    'Configuration file could not be deleted' => 'Konfigurationsdatei (%s) konnte nicht gelöscht werden.',
    'Configuration file deleted' => 'Konfigurationsdatei (%s) gelöscht.',
    'Configuration file not writeable' => 'Konfigurationsdatei (%s) nicht schreibbar. Bitte Berechtigungen überprüfen!',
    'Configuration file to delete not found' => 'Konfigurationsdatei zum Löschen (%s) nicht gefunden.',
    'Configuration successfully replaced' => 'Konfigurationsdatei (%s) erfolgreich ersetzt.',
    'Could not replace configuraion' => 'Konnte Konfigurationsdatei (%s) nicht ersetzen.',
    'Create new config' => 'Erstelle neue Konfigurationsdatei',
    'Delete' => 'Löschen',
    'deleteConfig(displayName,name)' => '"Wollen Sie wirklich Konfiguration \"" + displayName + "\" endgültig löschen?"',
    'Demo config' => 'Demo Konfiguration',
    'Download' => 'Herunterladen',
    'Edit' => 'Editieren',
    'Empty configuration is not readable -> CometVisu installation is badly broken!' => 'Die leere Konfigurationsdatei konnte nicht gelesen werden -> CometVisu-Installation ist defekt!',
    'Installation error - please check file permissions!' => 'Installationsfehler - bitte die Datei-Berechtigungen überprüfen!',
    'Name' => 'Name',
    'New configuration file successfully created' => 'Neue Konfigurationsdatei (%s) erfolgreich erstellt.',
    'new_name' => 'neuer_name',
    'Replace' => 'Ersetzen',
    'View' => 'Öffnen',
    'What name shall the new config have (please use only letters, numbers and the underscore)' => 'Welchen Namen soll die neue Konfigurationsdatei haben (bitte nur Buchstaben, Zahlen und den Unterstrich verwenden)?',
    'dummy' => 'dummy' // hanlde last comma gracefully
  )
);
define( 'VISU_TABLE_ROW', '<tr class="visuline">'
. '<td class="name">%1$s</td>'
. '<td><a href=".?config=%3$s">'.icon('edit_open').'</a></td>'
. '<td><a href="check_config.php?config=%3$s">'.icon('control_clear').'</a></td>'
. '<td><a href="editor/?config=%3$s">'.icon('edit_settings').'</a></td>'
. '<td><a href="%4$s" download target="_blank">'.icon('control_arrow_downward').'</a></td>'
. '<td><label for="%3$s_xml">'.icon('control_return').'</label><input type="file" id="%3$s_xml" name="%3$s_xml"/></td>'
. '<td class="warn"><a href="javascript:deleteConfig(\'%2$s\', \'%3$s\')">'.icon('message_garbage').'</a></td>'
. '</tr>' );
define( 'DEMO_TABLE_ROW', '<tr class="visuline">'
. '<td class="name">%1$s<span class="footnote">*)</span></td>'
. '<td><a href=".?config=%3$s">'.icon('edit_open').'</a></td>'
. '<td>-</td>'
. '<td><a href="editor/?config=%3$s">'.icon('edit_settings').'</a></td>'
. '<td><a href="%4$s" download target="_blank">'.icon('control_arrow_downward').'</a></td>'
. '<td>-</td>'
. '<td>-</td>'
. '</tr>' );

/**
 * Return HTML tag needed to show a icon
 */
function icon( $name )
{
  return '<img src="icon/knx-uf-iconset/128x128_white/' . $name . '.png" class="icon" />';
}

/**
 * Filter away the visu_config_previewtemp.xml that is needed by the editor.
 */
function filterPreview( $name )
{
  if( 'config/visu_config_previewtemp.xml' == $name )
    return false;
  
  return true;
}

// very simple i18n:
$userLang = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
if( !array_key_exists( $userLang, $_STRINGS ) )
  $userLang = 'en'; // default
$_ = $_STRINGS[ $userLang ];

// fill global variables
$availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), filterPreview );
$availDemo = glob( sprintf( DEMO_FILENAME  , '*' ) );

// check if we have to do something:
$actionDone = false;
$actionSuccess = false;
$resetUrl = false;
$config = array_key_exists( 'config', $_GET  ) ? $_GET ['config'] :
        ( array_key_exists( 'config', $_POST ) ? $_POST['config'] : false );
$action = array_key_exists( 'action', $_GET  ) ? $_GET ['action'] :
        ( array_key_exists( 'action', $_POST ) ? $_POST['action'] : false );
if( ($config != false) && ($action != false) )
{
  $configFile = sprintf( CONFIG_FILENAME, (''==$config ? '' : '_') . $config );
  if( !is_writeable( $configFile ) && 'create' != $action )
    $actionDone = sprintf( $_['Configuration file not writeable'], $configFile );
  else switch( $action )
  {
    case 'create':
      if( !is_readable( 'config/demo/visu_config_empty.xml' ) )
      {
        $actionDone = $_['Empty configuration is not readable -> CometVisu installation is badly broken!'];
        break;
      }
      if( is_readable( $configFile ) )
      {
        $actionDone = $_['A configuration with that name does already exist'] . " ($configFile)";
        break;
      }
      
      if( copy( 'config/demo/visu_config_empty.xml', $configFile ) ) {
        $actionDone = sprintf( $_['New configuration file successfully created'], $configFile );
        $availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), filterPreview );
        $resetUrl = true;
        $actionSuccess = true;
      } else
        $actionDone = sprintf( $_['Configuration file could not be created'], $configFile );
      break;
      
    case 'delete':
      if( in_array( $configFile, $availVisu ) ) {
        if( unlink( $configFile ) ) {
          $actionDone = sprintf( $_['Configuration file deleted'], $configFile );
          $availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), filterPreview );
          $resetUrl = true;
          $actionSuccess = true;
        } else
          $actionDone = sprintf( $_['Configuration file could not be deleted'], $configFile );
      } else {
        $actionDone = sprintf( $_['Configuration file to delete not found'], $configFile );
      }
      break;
    
    case 'replace':
      if( move_uploaded_file( $_FILES[$config.'_xml']['tmp_name'], $configFile ) )
      {
        $actionDone = sprintf( $_['Configuration successfully replaced'], $configFile );
        $actionSuccess = true;
      } else
        $actionDone = sprintf( $_['Could not replace configuraion'], $configFile );
      break;
  }
} else {
  // nothing special to do - so at least do a few sanity checks
  if( !is_writeable( 'config/visu_config.xml' ) )
    $actionDone = $_['Installation error - please check file permissions!'].' (config/visu_config.xml)';
  
  if( !is_writeable( 'config/visu_config_previewtemp.xml' ) )
    $actionDone = $_['Installation error - please check file permissions!'].' (config/visu_config_previewtemp.xml)';
  
  if( !is_readable( 'config/demo/visu_config_empty.xml' ) )
    $actionDone = $_['Installation error - please check file permissions!'].' (config/demo/visu_config_empty.xml)';
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title><?php echo $_['CometVisu Manager'] ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" href="icon/comet_16x16_ff8000.png" type="image/png" />
    <link rel="apple-touch-icon" sizes="57x57" href="icon/comet_webapp_icon_114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="icon/comet_webapp_icon_114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="icon/comet_webapp_icon_144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="icon/comet_webapp_icon_144.png" />
    <script src="dependencies/jquery.min.js" type="text/javascript"></script>
    <script>
function deleteConfig( displayName, name )
{
  if( confirm( <?php echo $_['deleteConfig(displayName,name)'] ?> ) )
  {
    var myUrl = window.location.href.split('?')[0];
    window.location.href = myUrl + '?config=' + name + '&action=delete';
  }
}

function newConfig()
{
  var newName = prompt( "<?php echo $_['What name shall the new config have (please use only letters, numbers and the underscore)'] ?>", "<?php echo $_['new_name'] ?>" );
  newName = newName.replace(/([^a-z0-9_]+)/gi, ''); // remove unwanted chars
  
  if( 0 < $('tr > td:nth-child(2) > a[href=".?config=' + newName + '"]').length )
  {
    alert( "<?php echo $_['A configuration with that name does already exist'] ?> (" + newName + ')' );
    return;
  }
  
  var myUrl = window.location.href.split('?')[0];
  window.location.href = myUrl + '?config=' + newName + '&action=create';
}

<?php
if( $resetUrl )
{
  echo 'window.history.replaceState("", "'.$_['CometVisu Manager'].'", window.location.href.split("?")[0] );';
}
?>
    </script>
    <style>
    body {
      font: 14px sans-serif;
    }
    table {
      background: #ccc;
      border-collapse: collapse;
    }
    tr:nth-child(odd) {
      background: #bbb;
    }
    tr {
      border: 1px solid white;
    }
    tr.head {
      background: #666;
      color: white;
    }
    th {
      padding: 5px;
      width: 70px;
    }
    th.name {
      width: auto;
    }
    td {
      text-align: center;
      padding: 0;
    }
    td.name {
      text-align: left;
      padding-left: 4px;
    }
    td.warn a:hover {
      background: #d66;
    }
    td > a, td > label {
      width: 100%;
      height: 100%;
      display: block;
    }
    td > a:hover, td > label:hover {
      background: #66d;
    }
    td > input {
      display: none;
    }
    .visuline:hover, #newConfig:hover {
      background: #999;
    }
    img.icon {
      width: 32px;
    }
    .footnote {
      font-size: 80%;
      vertical-align: 4px;
    }
    .actionDone {
      border: 2px solid #c00;
      background-color: #fcc;
      font-size: 120%;
      display: inline-block;
      padding: 8px;
    }
    .actionDone.actionSuccess {
      border-color: #0c0;
      background-color: #cfc;
    }
    #newConfig {
      display: inline-block;
      text-decoration: none;
      color:black;
      background: #ccc;
      padding: 4px;
      padding-right: 16px;
    }
    #newConfig .icon {
      vertical-align: middle;
      margin-right: 4px;
    }
    #newConfig:hover .icon {
      background-color: #6d6;
    }
    hr {
      height: 1px;
      border: none;
      color: #000;
      background-color: #000;
    }
    #footer img {
      vertical-align: middle;
    }
    </style>
  </head>
  <body>
    <?php
    if( $actionDone )
      echo '<div class="actionDone' . ($actionSuccess?' actionSuccess':'') . '">'.$actionDone.'</div>';
    ?>
    <h1><?php printf( $_['Available Configurations:'], '<img src="icon/comet_64_ff8000.png" />') ?></h1>
    <form enctype="multipart/form-data" action="manager.php" method="post">
    <input type="hidden" name="MAX_FILE_SIZE" value="300000" />
    <table>
      <?php
        echo '<tr class="head">'
        . '<th class="name">'.$_['Name'].'</th>'
        . '<th>'.$_['View'].'</th>'
        . '<th>'.$_['Check'].'</th>'
        . '<th>'.$_['Edit'].'</th>'
        . '<th>'.$_['Download'].'</th>'
        . '<th>'.$_['Replace'].'</th>'
        . '<th>'.$_['Delete'].'</th></tr>';
        
        foreach( $availVisu as $visu )
        {
          $name = preg_replace( '/.*visu_config_?(.*).xml/', '$1', $visu );
          $displayName = $name;
          $htmlName    = $displayName;
          
          if( '' == $name )
          {
            $displayName = '&lt;default&gt;';
            $htmlName = "<i>$displayName</i>";
          }
          
          printf( VISU_TABLE_ROW, $htmlName, $displayName, $name, $visu );
        }
        foreach( $availDemo as $visu )
        {
          $name = preg_replace( '/.*visu_config_?(.*).xml/', '$1', $visu );
          
          printf( DEMO_TABLE_ROW, $name, $name, $name, $visu );
        }
      ?>
    </table>
    <input type="text" id="input_config" name="config" style="display:none" />
    <input type="text" id="input_action" name="action" style="display:none" />
    <input type="submit" id="submit" style="display:none" />
    </form>
    <span class="footnote">*)</span>: <?php echo $_['Demo config'] ?>
    
    <p>
    <a href="javascript:newConfig()" id="newConfig"><?php echo icon('control_plus') . $_['Create new config'] ?></a>
    </p>
    
    <hr />
    <div id="footer">
      <img src="icon/comet_50_ff8000.png" alt="CometVisu"> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
      <div style="float:right;padding-right:0.5em">Version: <?php include('version') ?></div>
    </div>
    <script>
      $('input[type=file]').change(function( ev ){ 
        $('#input_config').val( this.id.replace(/_xml$/,''));
        $('#input_action').val( 'replace' );
        $('#submit').click();
      } );
    </script>
  </body>
</html>
