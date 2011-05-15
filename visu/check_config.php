<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>CometVisu-Client: Config file check</title>
  </head>
  <body>
<?php

$dom = new DomDocument();
$conffile = "visu_config";
if ($_GET['config']) {
   $conffile .= "_" . $_GET['config'];
}

$dom->load($conffile . ".xml");

if ($dom->schemaValidate("visu_config.xsd")) {
    print ("config <b>" . $conffile . " is valid </b> XML");
} else {
    print ("config <b>" . $conffile . " is NOT </b> valid XML");
}

?> 
  </body>
</html>
