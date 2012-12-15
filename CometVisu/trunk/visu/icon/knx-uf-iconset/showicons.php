<?php

  function GetFilesNew($p) {
    $result = array();
    $fh = opendir($p);
    while ($mydirs = readdir($fh)) {
      if (! preg_match("/^\./", $mydirs)) { 
        if (is_dir($mydirs)) {
          $fh2 = opendir($mydirs);
          while ($file = readdir($fh2)) {
            if (! preg_match("/^\./", $file)) { 
              if (is_file($mydirs ."/". $file)) $result[$mydirs][] = $mydirs ."/". $file;
            }
            @sort($result[$mydirs]);
          }
        }
      }
    }
    closedir($fh);      
    closedir($fh2);      
    
    return $result;
  }


echo "<body bgcolor=\"#333333\">\n";

$myfiles = GetFilesNew('.');
foreach ($myfiles as $d => $k) {
echo "<h2>Directory: ". $d ."</h2>";

  foreach ($k as $f) {
    echo "<img src=\"". $f ."\" border=\"0\">". $f ."<br>\n";
  }
}

?>
