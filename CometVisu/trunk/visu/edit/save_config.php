<?php
define("CONFIG_FILENAME", "../visu_config%s.xml");
define("CONFIG_BASE_XML", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><pages />");
define("CONFIG_PAGE_XML", "<page />");

// Übergabe-Parameter annehmen
$strJson   = (true === isset($_POST['data']))   ? $_POST['data']   : null;
$strConfig = (true === isset($_POST['config'])) ? $_POST['config'] : null;

// Dateinamen reinigen!
$strConfig = preg_replace("/[^\-\_0-9da-z]/i", "", $strConfig);

// Dateinamen der Config festlegen
$strConfig = sprintf(CONFIG_FILENAME, $strConfig);
// auf fully qualified filename wechseln
$strConfig = realpath($strConfig);

if (false === is_writeable($strConfig)) {
    echo json_encode("config-file is not writeable by webserver-process; please chmod/chown config-file '$strConfig'.");
    exit;
}

// wenn wir kein JSON bekamen, bzw das leer ist, dann speichern wir das auch nicht
if (true === empty($strJson)) {
    echo 0;
    exit;
}
// JSON dekodieren und PHP-geeignetes Array-Object-Kram daraus erzeugen
$objConfig = json_decode(stripslashes($strJson));

/** die alten Mappings und Styles übernehmen */
$objDOM = new DOMDocument("1.0", "UTF-8");
$objDOM->load($strConfig);
$objDOM->formatOutput = true;


$objPages = $objDOM->getElementsByTagName("pages")->item(0);

$objTmp = $objPages->getElementsByTagName("page");
foreach ($objTmp as $objTmpNode) {
    $objPages->removeChild($objTmpNode);
}
 /** mappings und styles übernommen */

$objPages->appendChild(createDOMFromJSON($objConfig));
$objDOM->appendChild($objPages);


// doofer Hack - das XML zweimal erzeugen damit
// Newlines und Einrueckungen passen
$strXML = $objDOM->saveXML();
$objXML = new DOMDocument();
$objXML->preserveWhiteSpace = false;
$objXML->formatOutput = true;
$objXML->loadXML($strXML);

// XML in die Konfigurationsdatei speichern
$handle = fopen($strConfig, "w");
fputs($handle, $objXML->saveXML());
fclose($handle);

echo 1;
exit;


/**
 * Erzeugt zu einem JSON-Objekt (= der Konfiguration)
 * den DOM-Baum mit allen Ästen und Blättern
 *
 * @param   object  $obj    Ein Objekt das aus dem JSON gewonnen wurde
 * @returns object          DOM-Objekt
 * @throws  Exception       Wenn die Konfiguration malformed ist
 */
function createDOMFromJSON($objJSON) {

    global $objDOM;

    if (false === isset($objJSON->_type) || "page" != $objJSON->_type) {
        throw new Exception("Malformed config received!");
    }

    $objXML = $objDOM->createElement("page");

    if (false === empty($objJSON->name)) {
        // den Namen der Seite festlegen
        $objXML->setAttribute("name", (string)$objJSON->name);
    }

    if (true === empty($objJSON->_elements) || false === is_array($objJSON->_elements)) {
        return $objXML;
    }

    foreach ($objJSON->_elements as $objElement) {
        if ("page" == $objElement->_type) {
            $objXML->appendChild(createDOMFromJSON($objElement));
        } else {
            $objXML->appendChild(createChildFromJSON($objElement));
        }
    }

    return $objXML;
}

/**
 * Erzeugt aus einem winzigen Teil des JSON-Objekts (= der Konfiguration)
 * ein einzelnes Blatt
 *
 * @param   object  $obj    Ein Objekt das aus dem JSON gewonnen wurde
 * @returns object          DOM-Objekt
 */
function createChildFromJSON($objJSON) {
    global $objDOM;

    if (true === empty($objJSON->_type)) {
        return null;
    }

    $objXML = $objDOM->createElement($objJSON->_type);
    if (false === empty($objJSON->_text)) {
        $objXML->nodeValue = $objJSON->_text;
    }

    foreach ($objJSON as $strAttribute => $strValue) {
        if (0 === strpos($strAttribute, "_")) {
            // Parameter die mit "_" beginnen sind special purpose
            continue;
        }
        $objXML->setAttribute($strAttribute, $strValue);
    }

    return $objXML;
}

?>
