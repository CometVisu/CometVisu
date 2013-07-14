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
    foreach (scandir($p) as $fh) {
      if (is_dir($p."/".$fh)) {
        if (preg_match("/^128.*/", $fh)) $result[] = preg_replace("/^128x128_/", "", $fh);
      } 
    };  
    sort($result);

    return $result;
  }



  $colors = GetColors(dirname(__FILE__));
  $foundwhite = false;
  foreach ($colors as $i => $c) {
    if ($c == "white") { $foundwhite = true; }
  }
  if (! $foundwhite) die("No 128x128_white found - this is needed as an index for all icons\n");


  $icons = GetIcons(dirname(__FILE__)."/128x128_white");

  $outtxt = "";
  foreach ($icons as $i) {
    $name = preg_replace("/\.png$/", "", $i);
    $outtxt .= sprintf("%-30s", "'". $name ."' : ") ."   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : 'white',\n";
    $firstline = true;
    foreach ($colors as $c) {
      if (! $firstline) { $outtxt .= ",\n"; } else { $firstline = false; }
      $color = $c;
      $outtxt .= sprintf("%36s", "'". $color ."'") . " : { 'uri': 'icon/knx-uf-iconset/128x128_". $c ."/". $i ."' }";
    }
    $outtxt .= " } } },\n";
  }
 
  $outtxt = preg_replace("/,\n$/", "", $outtxt);
  
  // Read Original File
  $fn = fopen(dirname(__FILE__)."/../../lib/iconhandler.js.OLD", "r");
  $fn_new = fopen(dirname(__FILE__)."/../../lib/iconhandler.js.OLD.NEW", "w");
  $show = true;
  while(! feof($fn)) {
    $line = fgets($fn);

    if (preg_match("/Dynamic Icons End/", $line)) $show = true;

    if ($show) fwrite($fn_new, $line);

    if (preg_match("/Dynamic Icons Start/", $line)) {
      $show = false;
      fwrite($fn_new, "\n". $outtxt ."\n\n");
    }
  }
  $oldFileName = stream_get_meta_data($fn);
  $oldFileName = $oldFileName["uri"];
  $newFileName = stream_get_meta_data($fn_new);
  $newFileName = $newFileName["uri"];
  fclose($fn);
  fclose($fn_new);
  unlink($oldFileName);
  rename($newFileName, $oldFileName);


  $outtxt = "";
  foreach ($icons as $i) {
    $name = preg_replace("/\.png$/", "", $i);
    $outtxt .= sprintf("%-30s", "'". $name ."' : ") ."   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/".$i."') } } },\n";
  }
 
  $outtxt = preg_replace("/,\n$/", "", $outtxt);

  // Read Original File for Canvas implementation
  $fn = fopen(dirname(__FILE__)."/../../lib/iconhandler.js", "r");
  $fn_new = fopen(dirname(__FILE__)."/../../lib/iconhandler.js.NEW", "w");
  $show = true;
  while(! feof($fn)) {
    $line = fgets($fn);

    if (preg_match("/Dynamic Icons End/", $line)) $show = true;

    if ($show) fwrite($fn_new, $line);

    if (preg_match("/Dynamic Icons Start/", $line)) {
      $show = false;
      fwrite($fn_new, "\n". $outtxt ."\n\n");
    }
  }
  $oldFileName = stream_get_meta_data($fn);
  $oldFileName = $oldFileName["uri"];
  $newFileName = stream_get_meta_data($fn_new);
  $newFileName = $newFileName["uri"];
  fclose($fn);
  fclose($fn_new);
  unlink($oldFileName);
  rename($newFileName, $oldFileName);

?>
