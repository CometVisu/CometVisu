<?php
//// Report all PHP errors
//// debugging:
//error_reporting(-1);
//header("content-type: text/plain");

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

/** die alten Mappings und stylings übernehmen */
$objDOM = new DOMDocument("1.0", "UTF-8");
$objDOM->load($strConfig);
$objDOM->formatOutput = true;


$objPages = $objDOM->getElementsByTagName("pages")->item(0);

$objTmp = $objPages->getElementsByTagName("page");
foreach ($objTmp as $objTmpNode) {
    $objPages->removeChild($objTmpNode);
}
 /** mappings und stylings übernommen */

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
// debugging:
//print $objXML->saveXML();

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

    if (false === isset($objJSON->_type) || "page" != $objJSON->_type) {
        throw new Exception("Malformed config received!");
    }

    $objXML = $GLOBALS['objDOM']->createElement("page");

    if (false === empty($objJSON->name)) {
        // den Namen der Seite festlegen
        $objXML->setAttribute("name", (string)$objJSON->name);
    }

    if (true === empty($objJSON->_elements) || false === is_array($objJSON->_elements)) {
        return $objXML;
    }

    foreach ($objJSON->_elements as $strKey => $arrElements) {
        // create an array - sometimes we have one, sometimes not
        // so just make sure we have one every single time
        if (false === is_array($arrElements)) {
            $arrElements = array($arrElements);
        }

        foreach ($arrElements as $objElement) {
            if ("page" == $objElement->_type) {
                $objXML->appendChild(createDOMFromJSON($objElement));
            } else {
                $objXML->appendChild(createChildFromJSON($objElement));
            }
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
function createChildFromJSON($objJSON, $debug = false) {

    if (true === empty($objJSON->_type)) {
        return null;
    }

    $objXML = $GLOBALS['objDOM']->createElement($objJSON->_type);
    if (false === empty($objJSON->_text)) {
        $objXML->nodeValue = $objJSON->_text;
    }
   
    if (false === empty($objJSON->_attributes)) {
        // some attributes are in a sub-element - it's easier to get them out of there
        // into our main namespace
        foreach ($objJSON->_attributes as $strKey => $strValue) {
            $objJSON->$strKey = $strValue;
        }
    }



    foreach ($objJSON as $strAttribute => $mixValue) {
        if (0 === strpos($strAttribute, "_")) {
            // Parameter die mit "_" beginnen sind special purpose
            continue;
        }

        if ($strAttribute === "textContent") {
            $objXML->nodeValue = $mixValue;
            continue;
        }
        $objXML->setAttribute($strAttribute, $mixValue);
    }


    // elements AFTER attributes, as they might be overwritten by nodeValue!
    if (false === empty($objJSON->_elements)) {
        // sub-elements - we needs thems
        $arrElements = array();
        foreach ($objJSON->_elements as $arrSubElements) {
            foreach ($arrSubElements as $objSubElement) {
                $arrChildren[] = createChildFromJSON($objSubElement);
            }
        }

        if (false === empty($arrChildren)) {
            // unset the node-value - we have either text OR sub-nodes
            $objXML->nodeValue = "";
            foreach ($arrChildren as $objChildNode) {
                $objXML->appendChild($objChildNode);
            }
        }
    }
    
    return $objXML;
}

?>
