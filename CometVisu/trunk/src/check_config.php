<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>CometVisu-Client: Config file check</title>
  </head>
  <body>
<?php

$error_array = array();

// this function was inspired by:
//  http://www.php.net/manual/en/function.highlight-string.php#84661
function xml_highlight($s)
{
    $s = htmlspecialchars($s);
    $s = preg_replace("#&lt;([/]*?)(.*)([\s]*?)&gt;#sU",
        "<font color=\"#0000FF\">&lt;\\1\\2\\3&gt;</font>",$s);
    $s = preg_replace("#&lt;([\?])(.*)([\?])&gt;#sU",
        "<font color=\"#800000\">&lt;\\1\\2\\3&gt;</font>",$s);
    $s = preg_replace("#&lt;([^\s\?/=])(.*)([\[\s/]|&gt;)#iU",
        "&lt;<font color=\"#808000\">\\1\\2</font>\\3",$s);
    $s = preg_replace("#&lt;([/])([^\s]*?)([\s\]]*?)&gt;#iU",
        "&lt;\\1<font color=\"#808000\">\\2</font>\\3&gt;",$s);
    $s = preg_replace("#([^\s]*?)\=(&quot;|')(.*)(&quot;|')#isU",
        "<font color=\"#800080\">\\1</font>=<font color=\"#FF00FF\">\\2\\3\\4</font>",$s);
    $s = preg_replace("#&lt;(.*)(\[)(.*)(\])&gt;#isU",
        "&lt;\\1<font color=\"#800080\">\\2\\3\\4</font>&gt;",$s);
    return preg_replace( '#<br */>$#', '', nl2br($s) );
}

function libxml_display_error( $error )
{
  global $lines, $error_array;

  $error_array[] = $error->line;

  switch ($error->level)
  {
    case LIBXML_ERR_WARNING:
      $return .= '<b>Warning ' . $error->code . '</b>: ';
      break; 
    case LIBXML_ERR_ERROR: 
      $return .= '<b>Error ' . $error->code . '</b>: ';
      break; 
    case LIBXML_ERR_FATAL: 
      $return .= '<b>Fatal Error ' . $error->code . '</b>: ';
      break; 
  }

  $return .= trim( $error->message );
  $return .= ' on <a href="#' . ($error->line-1) . '">line <b>' . $error->line . '</b></a>';

  $return .= '<pre>';
  for( $i = max( 0, $error->line - 1 - 3); $i <= $error->line - 1 + 3; $i++ )
  {
    if( $i == $error->line - 1 ) $return .= '<b>';
    $return .= sprintf( '%4d: ', $i+1 );
    $return .= xml_highlight( $lines[ $i ] );
    if( $i == $error->line - 1 ) $return .= '</b>';
  }
  $return .= '</pre>';

  return $return; 
}

// Enable user error handling 
libxml_use_internal_errors(true); 

$dom = new DomDocument();
$conffile = 'config/visu_config';
if ($_GET['config']) {
  $conffile .= "_" . $_GET['config'];
}
$conffile .= '.xml';

if( false === is_readable( $conffile ) )
{
  $old_conffile = 'visu_config';
  if ($_GET['config']) {
    $old_conffile .= "_" . $_GET['config'];
  }
  $old_conffile .= '.xml';

  if( true === is_readable( $old_conffile ) )
  {
    $conffile = $old_conffile;
    echo '<font color="#f00"><b>WARNING:</b> Depreciated position of config file!</font><hr/>';
  } else {
    echo "File <b>$conffile</b> (nor the depreciated <b>$old_conffile</b>) does not exitst!";
    echo '</body></html>';
    exit;
  }
}

$lines = file( $conffile );
$dom->load( $conffile );

if( $dom->schemaValidate( 'visu_config.xsd' ) )
{
  print ("config <b>" . $conffile . " is valid </b> XML");
} else {
  print ("config <b>" . $conffile . " is NOT </b> valid XML");

  echo '<hr />';

  $errors = libxml_get_errors();
  foreach( $errors as $error )
  {
    echo libxml_display_error( $error );
  }
  libxml_clear_errors();
}

echo '<hr />';

echo '<pre>';
foreach( $lines as $line_num => $line )
{
  $error_in_line = in_array( $line_num+1, $error_array );
  if( $error_in_line ) echo '<b>';
  printf( '<a name="%s">%4d</a>: ', $line_num, $line_num+1 );
  echo xml_highlight( $line );
  if( $error_in_line ) echo '</b>';
} 
echo '</pre>';
?> 
  </body>
</html>
