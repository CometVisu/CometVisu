<?php

  function GetIcons($p) {
    $result = array();
    $fh = opendir($p);
    while ($files = readdir($fh)) {
      if (preg_match("/^[A-Za-z].*png$/", $files)) $result[] = $files;
    }
    sort($result);

    return $result;
  }


  $icons = GetIcons(dirname(__FILE__)."/128x128_white");
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
