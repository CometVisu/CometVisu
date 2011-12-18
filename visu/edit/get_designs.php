<?php
define('FOLDER_DESIGNS', "../designs/");

$arrDesigns = array();

if (false !== ($handle = opendir(FOLDER_DESIGNS))) {
    while (false !== ($strFile = readdir($handle))) {
        if ($strFile == "." || $strFile == "..") {
            continue;
        }
        
        if (true === is_dir(FOLDER_DESIGNS . $strFile) && true === file_exists(FOLDER_DESIGNS . $strFile . "/basic.css")) {
            $arrDesigns[] = $strFile;
        }
    }
}

sort($arrDesigns);

Header("Content-type: application/json");
print json_encode($arrDesigns);
exit;

?>
