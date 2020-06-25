Installation auf einem Debian System mit openHAB2
=================================================

Kurzübersicht
-------------

Für den Betrieb der CometVisu mit openHAB werden folgende Dinge benötigt:

1. Server mit funktionierender openHAB Installation (alle Beispiele beziehen sich auf eine openHAB Installation
   auf einem Debian basierten System über den mitgelieferten Paketmanager ``apt``, bei anderen Distributionen
   müssen ggf. die in dieser Anleitung benutzten Pfade angepasst werden.
2. Ein entpacktes Release der CometVisu auf dem Server
3. Die openHAB Erweiterung *CometVisu*
4. Die openHAB Erweiterung *PHP support for CometVisu*, falls der Editor der CometVisu benutzt werden soll
5. Die Konfigurationsoption ``webFolder`` mit dem Pfad zur CometVisu

.. HINT::

    Es wird kein zusätzlicher Webserver, wie z.B. Apache o.ä. mit installiertem PHP Support benötigt.
    Die o.g. Punkte sind alles, was zur erfolgreichen Inbetriebnahme erfolderlich ist.

Es wird davon ausgegangen, dass Punkt 1 bereits erfüllt ist und im folgenden nur auf die weiteren Punkte eingegangen.

2. Installation der CometVisu auf dem Server
--------------------------------------------

Die CometVisu kann hier herunter geladen werden: https://github.com/CometVisu/CometVisu/releases. 
Das entpackte Paket enthält den Ordner *cometvisu/release*, welcher auf den Server in folgenden Pfad
*/var/www/cometvisu* kopiert werden muss.
Darüber hinaus müssen noch entsprechenden Rechte für den openHAB Benutzer gesetzt werden und einige
Konfigurationsverzeichnisse angelegt werden.
Dies alles kann durch folgenden Konsolenbefehle ausgeführt werden:

.. code-block:: console

    # Kopieren des release Verzeichnisses an die richtige Stelle
    cp -r cometvisu/release /var/www/cometvisu

    # Benutzerrechte anpassen für openHAB
    chown -R openhab:openhab /var/www/cometvisu

    # Konfigurationsverzeichnisse anpassen
    mkdir -p /etc/openhab2/cometvisu/resource/config
    mkdir -p /etc/openhab2/cometvisu/resource/designs

    # Benutzerrechte anpassen für openHAB
    chown -R openhab:openhab /etc/openhab2/cometvisu
	
Die zwei Verzeichnisse */etc/openhab2/cometvisu/resource/config* und */etc/openhab2/cometvisu/resource/designs* werden die Konfigurationen
der CometVisu enthalten und sind durch die separate Lokation vor Upgrades geschützt. Nur wenn diese Verzeichnisse nicht 
vorhanden sind, wird CometVisu die Konfiguration in */var/www/cometvisu/resource/config* suchen.

3.-5. openHAB konfigurieren
---------------------------

Damit openHAB mit der CometVisu kommunizieren kann, ist die entsprechende Erweiterung über die PaperUI (http://openhab_adresse:8080)
-> Add-ons -> User Interfaces -> CometVisu zu installieren. Wenn auch noch der CometVisu Editor benutzt werden soll, ist die 
Erweiterung *PHP support for CometVisu* zu installieren.

.. figure:: _static/openhab_paperui_user_interfaces.png

   PaperUI - Add-ons - User Interfaces
   
Die openHAB Konfigurationsdatei cometvisu.cfg befindet sich, wie alle anderen Konfigurationen der openHAB Erweiterungen,
unter */etc/openhab2/services/* und sollte folgende Einträge enthalten:

.. code-block:: ini

    # Pfad auf dem Server in dem der CometVisu liegt
    webFolder=/var/www/cometvisu/

    # Relativer Pfad im Browser unter der die CometVisu erreichbar sein soll
    webAlias=/cometvisu
	

Die CometVisu ist dann direkt unter der URL ``http://openhab_adresse:8080/cometvisu/?config=<name>`` im Browser erreichbar,
wobei sich ``<name>`` vom Namen der ``visu_config_<name>.xml`` ableitet.
