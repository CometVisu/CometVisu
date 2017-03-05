Installation auf einem Debian System mit openHAB2
=================================================

Voraussetzung ist hier, dass openHAB2 per apt-get installiert wurde, ansonsten müssen ggf. die Pfade 
angepasst werden.
Die CometVisu kann hier herunter geladen werden: https://github.com/CometVisu/CometVisu/releases. 
Das entpackte Paket enthält den Ordner *cometvisu/release*, welches nach /var/www/cometvisu 
kopiert werden muss. Außerdem sind die Berechtigungen für den openhab User zu setzen.

.. code-block:: bash

    cp -r cometvisu/release /var/www/cometvisu
    chown -R openhab:openhab /var/www/cometvisu

    mkdir -p /etc/openhab2/cometvisu/config
    mkdir -p /etc/openhab2/cometvisu/designs
    chown -R openhab:openhab /etc/openhab2/cometvisu
	
Die zwei Verzeichnisse */etc/openhab2/cometvisu/config* und */etc/openhab2/cometvisu/designs* werden die Konfigurationen 
der CometVisu enthalten und sind durch die separate Lokation vor Upgrades geschützt. Nur wenn diese Verzeichnisse nicht 
vorhanden sind, wird CometVisu die Konfiguration in */etc/openhab2/html/cometvisu/config* suchen.

Damit openHAB2 mit der CometVisu kommunizieren kann, ist die entsprechende Erweiterung über die PaperUI (http://openhab_adresse:8080)
-> Add-ons -> User Interfaces -> CometVisu zu installieren. Wenn auch noch der CometVisu Editor benutzt werden soll, ist die 
Erweiterung *PHP support for CometVisu* zu installieren.

.. figure:: _static/openhab_paperui_user_interfaces.png

   PaperUI - Add-ons - User Interfaces
   
Die openHAB2 Konfigurationsdatei cometvisu.cfg befindet sich, wie alle anderen Konfigurationen der openHAB Erweiterungen,
unter */etc/openhab2/services/* und sollte die Direktive

.. code-block:: ini
    
	webFolder=/var/www/cometvisu/
	webAlias=/cometvisu
	
enthalten.

Die CometVisu ist direkt unter der URL ``http://openhab_adresse:8080/cometvisu/?config=<name>`` im Browser erreichbar,
wobei sich ``<name>`` vom Namen der ``visu_config_<name>.xml`` ableitet.
