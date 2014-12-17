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
    'Available Configurations:' => 'Available %s Configurations:',
    'Check' => 'Check',
    'CometVisu Manager' => 'CometVisu Manager',
    'Configuration file could not be deleted' => 'Configuration file (%s) could not be deleted',
    'Configuration file deleted' => 'Configuration file (%s) deleted.',
    'Configuration file not writeable' => 'Configuration file (%s) not writeable. Please check permissions!',
    'Configuration file to delete not found' => 'Configuration file to delete (%s) not found.',
    'Configuration successfully replaced' => 'Configuration successfully replaced (%s).',
    'Could not replace configuraion' => 'Could not replace configuraion (%s).',
    'Delete' => 'Delete',
    'deleteConfig(displayName,name)' => '"Do you really want to delete config \"" + displayName + "\"?"',
    'Demo config' => 'Demo config',
    'Download' => 'Download',
    'Edit' => 'Edit',
    'Name' => 'Name',
    'Replace' => 'Replace',
    'View' => 'View',
    'dummy' => 'dummy' // hanlde last comma gracefully
  ),
  'de' => array(
    'Available Configurations:' => 'Verfügbare %s Konfigurationen:',
    'Check' => 'Überprüfen',
    'CometVisu Manager' => 'CometVisu Manager',
    'Configuration file could not be deleted' => 'Konfigurationsdatei (%s) konnte nicht gelöscht werden.',
    'Configuration file deleted' => 'Konfigurationsdatei (%s) gelöscht.',
    'Configuration file not writeable' => 'Konfigurationsdatei (%s) nicht schreibbar. Bitte Berechtigungen überprüfen!',
    'Configuration file to delete not found' => 'Konfigurationsdatei zum Löschen (%s) nicht gefunden.',
    'Configuration successfully replaced' => 'Konfigurationsdatei (%s) erfolgreich ersetzt.',
    'Could not replace configuraion' => 'Konnte Konfigurationsdatei (%s) nicht ersetzen.',
    'Delete' => 'Löschen',
    'deleteConfig(displayName,name)' => '"Wollen Sie wirklich Konfiguration \"" + displayName + "\" endgültig löschen?"',
    'Demo config' => 'Demo Konfiguration',
    'Download' => 'Herunterladen',
    'Edit' => 'Editieren',
    'Name' => 'Name',
    'Replace' => 'Ersetzen',
    'View' => 'Öffnen',
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
  return '<img src="icon/knx-uf-iconset/128x128_white/' . $name . '.png" />';
}

// very simple i18n:
$userLang = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
if( !array_key_exists( $userLang, $_STRINGS ) )
  $userLang = 'en'; // default
$_ = $_STRINGS[ $userLang ];

// fill global variables
$availVisu = glob( sprintf( CONFIG_FILENAME, '*' ) );
$availDemo = glob( sprintf( DEMO_FILENAME  , '*' ) );

// check if we have to do something:
$actionDone = false;
$resetUrl = false;
$config = array_key_exists( 'config', $_GET  ) ? $_GET ['config'] :
        ( array_key_exists( 'config', $_POST ) ? $_POST['config'] : false );
$action = array_key_exists( 'action', $_GET  ) ? $_GET ['action'] :
        ( array_key_exists( 'action', $_POST ) ? $_POST['action'] : false );
if( ($config != false) && ($action != false) )
{
  $configFile = sprintf( CONFIG_FILENAME, (''==$config ? '' : '_') . $config );
  if( !is_writeable( $configFile ) )
    $actionDone = sprintf( $_['Configuration file not writeable'], $configFile );
  else switch( $action )
  {
    case 'delete':
      if( in_array( $configFile, $availVisu ) ) {
        if( unlink( $configFile ) ) {
          $actionDone = sprintf( $_['Configuration file deleted'], $configFile );
          $availVisu = glob( sprintf( CONFIG_FILENAME, '*' ) );
          $resetUrl = true;
        } else
          $actionDone = sprintf( $_['Configuration file could not be deleted'], $configFile );
      } else {
        $actionDone = sprintf( $_['Configuration file to delete not found'], $configFile );
      }
      break;
    
    case 'replace':
      if( move_uploaded_file( $_FILES[$config.'_xml']['tmp_name'], $configFile ) )
        $actionDone = sprintf( $_['Configuration successfully replaced'], $configFile );
      else
        $actionDone = sprintf( $_['Could not replace configuraion'], $configFile );
      //$actionDone = 'cp ' . $_FILES[$config.'_xml']['tmp_name'] . ' -> ' . $configFile;
      break;
  }
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title><?php echo $_['CometVisu Manager'] ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" href="icon/comet_16x16_000000.png" type="image/png" />
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
    .visuline:hover {
      background: #999;
    }
    td img {
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
    </style>
  </head>
  <body>
    <?php
    if( $actionDone )
      echo '<div class="actionDone">'.$actionDone.'</div>';
    ?>
    <h1><?php printf( $_['Available Configurations:'], '<img src="icon/comet_50_ff8000.png" />') ?></h1>
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
    
    <script>
      $('input[type=file]').change(function( ev ){ 
        $('#input_config').val( this.id.replace(/_xml$/,''));
        $('#input_action').val( 'replace' );
        $('#submit').click();
      } );
    </script>
  </body>
</html>
