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

// activate most strict error reporting
error_reporting(-1);
 
// global definitions
define( 'CONFIG_FILENAME', 'resource/config/visu_config%s.xml' );
define( 'DEMO_FILENAME', 'resource/demo/visu_config%s.xml' );
define( 'MEDIA_PATH', 'resource/config/media/' );
// white list and black list file name patterns
define( 'MEDIA_ALLOWED_NAME', '#^[0-9a-zA-Z_./ -]+$#' ); // any of these chars but not empty
define( 'MEDIA_DISALLOWED_NAME', '#(^\.*/)|(/\.*/)#' );  // no amount of points at the beginning or after an slash and a following slash

// strings
$_STRINGS = array(
  'en' => array(
    'A configuration with that name does already exist' => 'A configuration with that name does already exist',
    'Available Configurations:' => 'Available %s Configurations:',
    'Available media files:' => 'Available media files:',
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
    'Media directory is not writeable' => 'Media directory (%s) is not writeable',
    'Media file name is not valid' => 'Media file name (%s) is not valid',
    'Media file does already exist' => 'Media file (%s) does already exist',
    'Media file successfully uploaded' => 'Media file (%s) successfully uploaded',
    'Could not upload media file' => 'Could not upload media file (%s)',
    'Media file deleted' => 'Media file (%s) deleted',
    'Media file could not be deleted' => 'Media file (%s) could not be deleted',
    'Media file to delete not found' => 'Media file (%s) to delete not found',
    'Media file successfully replaced' => 'Media file (%s) successfully replaced',
    'Could not replace media file' => 'Could not replace media file (%s)',
    'Upload new media' => 'Upload new media',
    'Delete' => 'Delete',
    'deleteConfig(displayName,name)' => '"Do you really want to delete config \"" + displayName + "\"?"',
    'deleteMedia(displayName,name)' => '"Do you really want to delete media file \"" + displayName + "\"?"',
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
    'What name shall the new media file have (please use only letters, numbers and the underscore)' => 'What name shall the new media file have (please use only letters, numbers and the underscore)',
    'dummy' => 'dummy' // hanlde last comma gracefully
  ),
  'de' => array(
    'A configuration with that name does already exist' => 'Eine Konfigurationsdatei mit diesem Namen existiert bereits!',
    'Available Configurations:' => 'Verfügbare %s Konfigurationen:',
    'Available media files:' => 'Verfügbare Mediendateien:',
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
    'Media directory is not writeable' => 'Medienverzeichnis (%s) ist nicht beschreibbar',
    'Media file name is not valid' => 'Mediendatei-Name (%s) ist ungültig',
    'Media file does already exist' => 'Mediendatei (%s) existiert bereits',
    'Media file successfully uploaded' => 'Mediendatei (%s) erfolgreich hochgeladen',
    'Could not upload media file' => 'Konnte Mediendatei (%s) nicht hochladen',
    'Media file deleted' => 'Mediendatei (%s) gelöscht',
    'Media file could not be deleted' => 'Mediendatei (%s) konnte nicht gelöscht werden',
    'Media file to delete not found' => 'Mediendatei zum Löschen (%s) nicht gefunden',
    'Media file successfully replaced' => 'Mediendatei (%s) erfolgreich ersetzt',
    'Could not replace media file' => 'Konnte Mediendatei (%s) nicht ersetzen',
    'Upload new media' => 'Lade neue Mediendatei hoch',
    'Delete' => 'Löschen',
    'deleteConfig(displayName,name)' => '"Wollen Sie wirklich Konfiguration \"" + displayName + "\" endgültig löschen?"',
    'deleteMedia(displayName,name)' => '"Wollen Sie wirklich die Mediendatei \"" + displayName + "\" endgültig löschen?"',
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
    'What name shall the new media file have (please use only letters, numbers and the underscore)' => 'Welchen Namen soll die neue Mediendatei haben (bitte nur Buchstaben, Zahlen und den Unterstrich verwenden)?',
    'dummy' => 'dummy' // handle last comma gracefully
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
define( 'MEDIA_TABLE_ROW', '<tr class="visuline">'
. '<td class="name">%1$s</td>'
. '<td><a href="'.MEDIA_PATH.'%1$s" download target="_blank">'.icon('control_arrow_downward').'</a></td>'
. '<td><label for="media_file">'.icon('control_return').'</label></td>'
. '<td class="warn"><a href="javascript:deleteMedia(\'%1$s\', \'%1$s\')">'.icon('message_garbage').'</a></td>'
. '</tr>' );

/**
 * Return HTML tag needed to show a icon
 */
function icon( $name )
{
  return '<svg class="icon"><use xlink:href="resource/icon/knx-uf-iconset.svg#kuf-' . $name . '"></use></svg>';
}

/**
 * Filter away the visu_config_previewtemp.xml that is needed by the editor.
 */
function filterPreview( $name )
{
  if( 'resource/config/visu_config_previewtemp.xml' == $name )
    return false;
  
  return true;
}

// very simple i18n:
$userLang = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
if( !array_key_exists( $userLang, $_STRINGS ) )
  $userLang = 'en'; // default
$_ = $_STRINGS[ $userLang ];

// fill global variables
$availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), 'filterPreview' );
$availDemo = glob( sprintf( DEMO_FILENAME  , '*' ) );
function fillAvailMedia()
{
  global $availMedia;
  $availMedia = Array();
  $it = new RecursiveDirectoryIterator( MEDIA_PATH );
  foreach( new RecursiveIteratorIterator($it) as $file )
  {
    $name = substr( $file, strlen( MEDIA_PATH ) );
    
    if( in_array( $name, Array( '.gitignore' ) ) )
      continue;
    
    array_push( $availMedia, $name );
  }
}
fillAvailMedia();

// check if we have to do something:
$actionDone = false;
$actionSuccess = false;
$resetUrl = false;
$config = array_key_exists( 'config', $_GET  ) ? $_GET ['config'] :
        ( array_key_exists( 'config', $_POST ) ? $_POST['config'] : false );
$media  = array_key_exists( 'media',  $_GET  ) ? $_GET ['media']  :
        ( array_key_exists( 'media',  $_POST ) ? $_POST['media']  : false );
$action = array_key_exists( 'action', $_GET  ) ? $_GET ['action'] :
        ( array_key_exists( 'action', $_POST ) ? $_POST['action'] : false );

if( ($config === '' || $config !== false) && ($media === false) && ($action !== false) )
{
  $configFile = sprintf( CONFIG_FILENAME, (''==$config ? '' : '_') . $config );
  if( !is_writeable( $configFile ) && 'create' != $action )
    $actionDone = sprintf( $_['Configuration file not writeable'], $configFile );
  else switch( $action )
  {
    case 'create':
      if( !is_readable( 'resource/demo/visu_config_empty.xml' ) )
      {
        $actionDone = $_['Empty configuration is not readable -> CometVisu installation is badly broken!'];
        break;
      }
      if( is_readable( $configFile ) )
      {
        $actionDone = $_['A configuration with that name does already exist'] . " ($configFile)";
        break;
      }
      
      if( copy( 'resource/demo/visu_config_empty.xml', $configFile ) ) {
        $actionDone = sprintf( $_['New configuration file successfully created'], $configFile );
        $availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), 'filterPreview' );
        $resetUrl = true;
        $actionSuccess = true;
      } else
        $actionDone = sprintf( $_['Configuration file could not be created'], $configFile );
      break;
      
    case 'delete':
      if( in_array( $configFile, $availVisu ) ) {
        if( unlink( $configFile ) ) {
          $actionDone = sprintf( $_['Configuration file deleted'], $configFile );
          $availVisu = array_filter( glob( sprintf( CONFIG_FILENAME, '*' ) ), 'filterPreview' );
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
} else if( ($media !== false) && ($action !== false) )
{
  $mediaFile = MEDIA_PATH . $media;
  switch( $action )
  {
    case 'create':
    case 'replace':
      if( !is_writeable( MEDIA_PATH ) )
      {
        $actionDone = sprintf( $_['Media directory is not writeable'], MEDIA_PATH );
        break;
      }
      if( !( preg_match( MEDIA_ALLOWED_NAME, $media ) && !preg_match( MEDIA_DISALLOWED_NAME, $media )) )
      {
        $actionDone = sprintf( $_['Media file name is not valid'], $media );
        break;
      }
      if( is_readable( $mediaFile ) && $action === 'create' )
      {
        $actionDone = sprintf( $_['Media file does already exist'], $mediaFile );
        break;
      }
      if( move_uploaded_file( $_FILES['media_file']['tmp_name'], $mediaFile ) )
      {
        if( $action === 'create' )
          $actionDone = sprintf( $_['Media file successfully uploaded'], $media );
        else
          $actionDone = sprintf( $_['Media file successfully replaced'], $media );
        $actionSuccess = true;
        fillAvailMedia();
      } else {
        if( $action === 'create' )
          $actionDone = sprintf( $_['Could not upload media file'], $media );
        else
          $actionDone = sprintf( $_['Could not replace media file'], $media );
      }
      break;
      
    case 'delete':
      if( in_array( $media, $availMedia ) )
      {
        if( unlink( $mediaFile ) ) {
          $actionDone = sprintf( $_['Media file deleted'], $mediaFile );
          fillAvailMedia();
          $resetUrl = true;
          $actionSuccess = true;
        } else
          $actionDone = sprintf( $_['Media file could not be deleted'], $mediaFile );
      } else {
        $actionDone = sprintf( $_['Media file to delete not found'], $media );
      }
      break;
  }
} else {
  // nothing special to do - so at least do a few sanity checks
  if( !is_writeable( 'resource/config/visu_config.xml' ) )
  {
    if( @chmod( 'resource/config/visu_config.xml', 0666 ) ) // try to fix it
    {
      if( !is_writeable( 'resource/config/visu_config.xml' ) )
        $actionDone = $_['Installation error - please check file permissions!'].' (resource/config/visu_config.xml)';
    } else
    $actionDone = $_['Installation error - please check file permissions!'].' (resource/config/visu_config.xml)';
  }
  
  if( !is_writeable( 'resource/config/visu_config_previewtemp.xml' ) )
  { 
    if( chmod( 'resource/config/visu_config_previewtemp.xml', 0666 ) ) // try to fix it
    {
      if( !is_writeable( 'resource/config/visu_config_previewtemp.xml' ) )
        $actionDone = $_['Installation error - please check file permissions!'].' (resource/config/visu_config_previewtemp.xml)';
    } else
      $actionDone = $_['Installation error - please check file permissions!'].' (resource/config/visu_config_previewtemp.xml)';
  }
  
  if( !is_readable( 'resource/demo/visu_config_empty.xml' ) )
    $actionDone = $_['Installation error - please check file permissions!'].' (resource/demo/visu_config_empty.xml)';
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title><?php echo $_['CometVisu Manager'] ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" href="resource/icon/comet_16x16_ff8000.png" type="image/png" />
    <link rel="apple-touch-icon" sizes="57x57" href="resource/icon/comet_webapp_icon_114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="resource/icon/comet_webapp_icon_114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="resource/icon/comet_webapp_icon_144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="resource/icon/comet_webapp_icon_144.png" />
    <script src="resource/libs/jquery.js" type="text/javascript"></script>
    <script>
function deleteConfig( displayName, name )
{
  if( confirm( <?php echo $_['deleteConfig(displayName,name)'] ?> ) )
  {
    var myUrl = window.location.href.split('?')[0];
    window.location.href = myUrl + '?config=' + name + '&action=delete';
  }
}

function deleteMedia( displayName, name )
{
  if( confirm( <?php echo $_['deleteMedia(displayName,name)'] ?> ) )
  {
    var myUrl = window.location.href.split('?')[0];
    window.location.href = myUrl + '?media=' + name + '&action=delete';
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
    .icon {
      width: 32px;
      height: 32px;
      color: white;
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
    .newFile {
      display: inline-block;
      text-decoration: none;
      color:black;
      background: #ccc;
      padding: 4px;
      padding-right: 16px;
    }
    .newFile .icon {
      vertical-align: middle;
      margin-right: 4px;
    }
    .newFile:hover .icon {
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
    <h1><?php printf( $_['Available Configurations:'], '<img src="resource/icon/comet_64_ff8000.png" />') ?></h1>
    <form enctype="multipart/form-data" action="manager.php" method="post" id="config_form">
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
    <input type="submit" id="submit_config" style="display:none" />
    </form>
    <span class="footnote">*)</span>: <?php echo $_['Demo config'] ?>
    
    <p>
    <a href="javascript:newConfig()" id="newConfig" class="newFile"><?php echo icon('control_plus') . $_['Create new config'] ?></a>
    </p>
    
    <h2><?php printf( $_['Available media files:'], '<img src="resource/icon/comet_64_ff8000.png" />') ?></h2>
    <form enctype="multipart/form-data" action="manager.php" method="post" id="media_form">
    <input type="hidden" name="MAX_FILE_SIZE" value="10000000" />
    <table>
      <?php
        echo '<tr class="head">'
        . '<th class="name">'.$_['Name'].'</th>'
        . '<th>'.$_['Download'].'</th>'
        . '<th>'.$_['Replace'].'</th>'
        . '<th>'.$_['Delete'].'</th></tr>';
        
        foreach( $availMedia as $name )
        {
          printf( MEDIA_TABLE_ROW, $name );
        }
      ?>
    </table>
    <input type="text" id="input_media_name" name="media" style="display:none" />
    <input type="text" id="input_media_action" name="action" style="display:none" />
    <input type="file" id="media_file" name="media_file" style="display:none" />
    <input type="submit" id="submit_media" style="display:none" />
    </form>
    
    <p>
    <a href="javascript:$('#media_file').trigger('click')" id="newMedia" class="newFile"><?php echo icon('control_plus') . $_['Upload new media'] ?></a>
    </p>
    
    <hr />
    <div id="footer">
      <img src="resource/icon/comet_icon_128x128_ff8000.png" alt="CometVisu" height="50"> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
      <div style="float:right;padding-right:0.5em">Version: <?php include('version') ?></div>
    </div>
    <script>
      $('#config_form input[type=file]').change(function( ev ){ 
        $('#input_config').val( this.id.replace(/_xml$/,''));
        $('#input_action').val( 'replace' );
        $('#submit_config').click();
      } );
      
      $('#media_form label').click(function( ev ){
        $('#input_media_name').val( $(this).parent().parent().find('.name').text() );
      });
      
      $('#media_form input[type=file]').change(function( ev ){ 
        if( this.value )
        {
          if( $('#input_media_name').val() === '' )
          {
            var newName = prompt( "<?php echo $_['What name shall the new media file have (please use only letters, numbers and the underscore)'] ?>", this.value.replace( /.*[/\\]/,'' ) );
            if( newName )
            {
              $('#input_media_name').val( newName );
              $('#input_media_action').val( 'create' );
              $('#submit_media').click();
            }
          } else {
            $('#input_media_action').val( 'replace' );
            $('#submit_media').click();
          }
        }
      } );
    </script>
  </body>
</html>
