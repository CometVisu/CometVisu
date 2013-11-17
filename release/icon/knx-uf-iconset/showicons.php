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

echo "<html>\n<head>\n<style type=\"text/css\">";
echo "body { background-color:#333333; }\n";
echo "td { color: #dddddd; font-weight: bold; }\n";
echo ".filename { padding:10px; border: 3px solid #dddddd; border-right:0px; }\n";
echo ".icon { align:center; border: 3px solid #dddddd; border-left:1px solid #dddddd; }\n";
echo ".placeholder { width:30px; }\n";
# echo "table { margin: 10px; padding: 0px; }\n";
echo "</style>\n</head>\n<body>\n<center>\n";

$myfiles = GetFilesNew('.');
foreach ($myfiles as $d => $k) {

  echo "<table cellspacing=\"0\" cellpadding=\"0\">\n";
  $c = 0;
  foreach ($k as $f) {
    if ($c % 2 == 0) {
      echo "<tr>";
    }
    echo "<td class=\"filename\">". basename($f) ."</td>\n";
    echo "<td class=\"icon\"><img src=\"". $f ."\"></td>";
    if ($c % 2 <> 0) {
      echo "</tr>\n";
    }
    else {
      echo "<td class=\"placeholder\"> </td>";
    }
    $c++;
  }
  echo "</table>\n";

  break;
}

echo "</center>\n</body>\n</html>\n";

?>
