<?php
header("content-type: text/xml");
$city = $_GET['city'];
$lang = $_GET['lang'];

$xmlData = utf8_encode(file_get_contents("http://www.google.com/ig/api?hl=$lang&weather=$city"));
echo $xmlData;
?>