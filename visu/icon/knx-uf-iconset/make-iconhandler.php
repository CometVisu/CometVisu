<?php

/*
'zeit_notiz' : { '*': { '*' : 'white',
                  'white'  : { 'uri': 'icon/knx-uf-iconset/128x128_ws/zeit_notiz.png', 'style': 'height: 2em;' },
                  'sodium' : { 'uri': 'icon/knx-uf-iconset/128x128_or/zeit_notiz.png', 'style': 'height: 2em;' } } },
*/



  function GetIcons($p) {
    $result = array();
    $fh = opendir($p);
    while ($files = readdir($fh)) {
      if (preg_match("/^[A-Za-z].*png$/", $files)) $result[] = $files;
    }
    sort($result);

    return $result;
  }


  function GetColors($p) {
    $result = array();
    $fh = opendir($p);
    while ($mydirs = readdir($fh)) {
      if (! preg_match("/^\./", $mydirs)) { 
        if (is_dir($mydirs)) { 
          if (preg_match("/^128.*/", $mydirs)) $result[] = preg_replace("/^128x128_/", "", $mydirs);
        }
      }
    }
    closedir($fh);
    sort($result);

    return $result;
  }



  $colors = GetColors(".");
  $foundwhite = false;
  foreach ($colors as $i => $c) {
    if ($c == "white") { $foundwhite = true; }
  }
  if (! $foundwhite) die("No 128x128_white found - this is needed as an index for all icons\n");


  $icons = GetIcons("128x128_white");

  $outtxt = "";
  foreach ($icons as $i) {
    $name = preg_replace("/\.png$/", "", $i);
    $outtxt .= sprintf("%-30s", "'". $name ."' : ") ."   { '*': { '*' : 'white', 'ws' : 'white', 'sodium' : 'orange',\n";
    $firstline = true;
    foreach ($colors as $c) {
      if (! $firstline) { $outtxt .= ",\n"; } else { $firstline = false; }
      $color = $c;
      $outtxt .= sprintf("%36s", "'". $color ."'") . " : { 'uri': 'icon/knx-uf-iconset/128x128_". $c ."/". $i ."' }";
    }
    $outtxt .= " } },\n";
  }
 
  $outtxt = preg_replace("/,\n$/", "", $outtxt);


  // Read Original File
  $fn = fopen("../../lib/iconhandler.js", "r");
  $show = true;
  while(! feof($fn)) {
    $line = fgets($fn);

    if (preg_match("/Dynamic Icons End/", $line)) $show = true;

    if ($show) echo $line;

    if (preg_match("/Dynamic Icons Start/", $line)) {
      $show = false;
      echo "\n". $outtxt ."\n\n";
    }
  }

?>
