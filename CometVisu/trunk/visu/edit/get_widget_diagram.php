<?php
define('FILE_GA', "/etc/wiregate/eibga.conf");
define('FILE_OW', "/etc/wiregate/owsensors.conf");
define('DIR_RRD', "/var/www/rrd/*.rrd");


$arrOW = array();
if (true === file_exists(FILE_OW)) {
    $arrOW = parse_ini_file(FILE_OW, true);
}

$arrGA = array();
if (true === file_exists(FILE_GA)) {
    $arrGA = parse_ini_file(FILE_GA, true);
}

$arrAdresses = array();

foreach (glob(DIR_RRD) as $filename) {
    $filebase = basename($filename);
    $arrRRDParts = explode("_", $filebase, 2);
    $arrRRDtype = explode(".", $arrRRDParts[1], 2);
    $arrAdresses[$filebase] = array(
                                        "address" => $arrOW[$arrRRDParts[0]]['eib_ga_'.$arrRRDtype[0]],
                                        "name"    => utf8_encode($arrOW[$arrRRDParts[0]]['name']),
                                        "dpt"     => $arrGA[$arrOW[$arrRRDParts[0]]['eib_ga_'.$arrRRDtype[0]]]['DPTSubId']
                                        );

}

Header("Content-type: application/json");
print json_encode($arrAdresses);
exit;

?>
