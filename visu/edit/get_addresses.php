<?php
define('FILE_GA', "/etc/wiregate/eibga.conf");
define('FILE_HG', "/etc/wiregate/eibga_hg.conf");
define('FILE_MG', "/etc/wiregate/eibga_mg.conf");

$arrGA = array();
$arrHG = array();
$arrMG = array();

if (true === file_exists(FILE_GA)) {
    $arrGA = parse_ini_file(FILE_GA, true);
}
if (true === file_exists(FILE_HG)) {
    $arrHG = parse_ini_file(FILE_HG, true);
}
if (true === file_exists(FILE_MG)) {
    $arrMG = parse_ini_file(FILE_MG, true);
}


$arrAdresses = array();
foreach ($arrGA as $strGA => $arrData) {
    $arrGAParts = explode("/", $strGA, 3);

    $strHG = "";
    if (true === isset($arrHG[$arrGAParts[0]])) {
        $strHG = utf8_encode($arrHG[$arrGAParts[0]]['name']);
    }

    $strMG = "";
    if (true === isset($arrMG[$arrGAParts[1]])) {
        $strMG = utf8_encode($arrMG[$arrGAParts[1]]['name']);
    }

    $arrAdresses[$strHG][$strMG][] = array(
                                        "address" => $strGA,
                                        "name"    => utf8_encode($arrData['name']),
                                        "dpt"     => $arrData['DPTSubId']
                                        );
}

Header("Content-type: application/json");
print json_encode($arrAdresses);
exit;

?>
