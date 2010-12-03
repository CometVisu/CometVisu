<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>CometVisu-Client: Config file check</title>
  </head>
  <body>
<?php

$dom = new DomDocument();
$dom->load("visu_config.xml");

if ($dom->schemaValidate("visu_config.xsd")) {
    print ("config is valid XML");
} else {
    print ("config is NOT valid XML");
}

?> 
  </body>
</html>
