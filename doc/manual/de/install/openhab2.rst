Installation auf einem Debian System mit openHAB2
=================================================

Die CometVisu kann hier herunter geladen werden: https://github.com/CometVisu/CometVisu/releases. 
Das entpackte Paket enthält den Ordner *cometvisu/release*, welches nach /etc/openhab2/cometvisu 
kopiert werden muss. Außerdem sind die Berechtigungen für den openhab User zu setzen.
.. code-block:: bash

    cp -r cometvisu/release /etc/openhab2/html/cometvisu
	mkdir -p /etc/openhab2/cometvisu/config
	mkdir -p /etc/openhab2/cometvisu/designs
	chown -R openhab:openhab /etc/openhab2
	
Die zwei Verzeichnisse */etc/openhab2/cometvisu/config* und */etc/openhab2/cometvisu/designs* werden die Konfigurationen 
der CometVisu enthalten und sind durch die separate Lokation vor Upgrades geschützt. Nur wenn diese Verzeichnisse nicht 
vorhanden sind, wird CometVisu die Konfiguration in */etc/openhab2/html/cometvisu/config* suchen.

Damit openHAB2 mit der CometVisu kommunizieren kann, ist die entsprechende Erweiterung über die PaperUI (http://openhab_adresse:8080)
-> Add-ons -> User Interfaces -> CometVisu zu installieren. Wenn z.B. der CometVisu Editor benutzt werden soll, ist auch noch die 
Erweiterung der PHP support for CometVisu zu installieren.
Die openHAB2 Konfigurationsdatei cometvisu.cfg befindet sich, wie alle anderen Konfigurationen der openHAB Erweiterungen,
unter */etc/openhab2/services/* und sollte die Direktive 
.. code-block:: bash
    
	webAlias=/cometvisu 
	
enthalten.

Der Beginn der */etc/openhab2/cometvisu/config/visu_config_<name>.xml* sieht in etwa wie folgt aus. Als backend ist unbedingt oh2 zu setzen.
.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <pages backend="oh2" lib_version="8" design="metal" screensave_page="Übersicht" screensave_time="300" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="../visu_config.xsd">
		<meta>
			<plugins>
				....	
			</plugins>
			<mappings>
				...
			</mappings>

Die CometVisu ist direkt unter der URL http://openhab_adresse:8080/cometvisu/?config=<name> im Browser erreichbar, wobei sich <name> vom Namen der visu_config_<name>.xml ableitet.
