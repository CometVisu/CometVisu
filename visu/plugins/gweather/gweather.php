<?php
header("content-type: text/xml");
$city = $_GET['city'];
$lang = $_GET['lang'];
$xmlData = '';
$retries = 0;

// ugly workaround for google returning crap sometimes
while (($xmlData == "Unsupported API" or $xmlData == "") and $retries < 5) {
    $retries++;
    $xmlData = utf8_encode(file_get_contents("http://www.google.com/ig/api?hl=$lang&weather=$city"));
}
echo $xmlData;
?>

