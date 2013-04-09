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

$picsperrow = 6;
$mywidth    = intval(100 / $picsperrow);

echo "<body bgcolor=\"#333333\">\n";
echo "<center>\n";

$myfiles = GetFilesNew('.');
foreach ($myfiles as $d => $k) {
  //echo "<h2>Directory: ". $d ."</h2>";

  echo "<table cellspacing=\"10\">\n";
  echo "<tr>";
  $c = 0;
  foreach ($k as $f) {
    echo "<td align=\"center\" width=\"". $mywidth ."\"><img src=\"". $f ."\" border=\"0\"><br/>";
    echo "<span style=\"color: #dddddd; font-weight: bold;\">". basename($f) ."</span></td>\n";
    $c++;
    if ($c >= $picsperrow) {
      echo "</tr>\n<tr>\n";
      $c = 0;
    }
  }
  echo "</table>\n";

  break;
}

echo "</center>\n";
echo "</body>\n</html>\n";

?>
