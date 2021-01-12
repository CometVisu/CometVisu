Installation auf einem Ubuntu System mit openHAB2 und Docker
============================================================

1. Voraussetzungen
------------------

Für den Betrieb der CometVisu mit openHAB und Docker werden folgende Dinge benötigt:

1. Server mit funktionierender openHAB Installation.
2. Docker-CE und Docker Compose

.. HINT::

    Es wird kein zusätzlicher Webserver, wie z.B. Apache o.ä. mit installiertem PHP Support benötigt, da dies
    alles Bestandteil des Containers ist.
    Die o.g. Punkte sind alles, was zur erfolgreichen Inbetriebnahme erforderlich ist.


2. Installation von Docker-CE und Compose auf dem Server
--------------------------------------------------------

Dies alles kann durch folgenden Konsolenbefehle ausgeführt werden:

.. code-block:: console

    # Update
    sudo apt-get update

    # Vorausetzungen installieren
    sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

    # Hinzufügen vom Docker GPG-Key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # Hinzufügen vom Docker Repositoty
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    # Nochmal ein Update
    sudo apt-get update

    # Installation docker-ce und Compose
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose
	

3. Systemvorbereitungen
-----------------------

Damit openHAB mit der CometVisu kommunizieren kann, ist die entsprechende Erweiterung über die PaperUI (http://openhab_adresse:8080)
-> Add-ons -> User Interfaces -> CometVisu oder über die addons.cfg zu installieren. Die Erweiterung *PHP support for CometVisu* 
wird in diesem Fall nicht benötigt.


.. code-block:: console

    # Aktuellen Benutzer zur Gruppe *Docker* hinzufügen
    sudo usermod -aG docker $USER
    
Nach dem Aufnehmen des Benutzers nochmal neu Anmelden

.. code-block:: console

    # Anlegen vom Verzeichnis resource/config unter dem aktuellen Benutzer
    sudo mkdir -p resource/config

    # Anlegen einer Beispiel XML-Datei unter resource/config
    sudo nano resource/config/visu_config.xml
                                                                
.. code-block:: xml
    
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="pure" xsi:noNamespaceSchemaLocation="../visu_config.xsd" lib_version="8">
    <meta>
        <statusbar>
        <status type="html"><![CDATA[
                <img src="resource/icon/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
                -<a href=".?forceReload=true">Reload</a>
                -<a href="?config=demo">Widget Demo</a>
                ]]></status>
        <status type="html" condition="!edit" hrefextend="config"><![CDATA[
                - <a href="edit_config.html">Edit</a>
                ]]></status>
        <status type="html" condition="edit" hrefextend="all"><![CDATA[
                - <a href=".">normal Mode</a>
            ]]></status>
        <status type="html"><![CDATA[
            - <a href="check_config.php">Check Config</a>
            <div style="float:right;padding-right:0.5em">Version: SVN</div>
            ]]></status>
        </statusbar>
    </meta>
    <page name="Startseite">
    </page>
    </pages>


.. code-block:: console

    # Anlegen der Verzeichnisse Backup und media unter resource/config
    sudo mkdir -p resource/config/media
    sudo mkdir -p resource/config/backup

    # Rechte für den Webserver setzen
    sudo chown -hR www-data:www-data resource/config 

4. CometVisu per Docker installieren
------------------------------------
Jetzt den Container installieren

.. code-block:: docker

    # yaml datei Anlegen
    sudo nano docker-compose.yaml

    # Beispielinhalt für openhab
    
    version: '3.4'
    services:
        cometvisu:
            image: "cometvisu/cometvisu:latest"
            restart: always
            ports:
            - 80:80
            volumes:
                - ./resource/config:/var/www/html/resource/config
            environment:
                KNX_INTERFACE: ""
                CGI_URL_PATH: "/rest/cv/"
                BACKEND_PROXY_SOURCE: "/rest"
                BACKEND_PROXY_TARGET: "http://<IP-Openhab2>:8080/rest"

.. HINT::
    Bei der YAML-Datei ist darauf zu achten, dass die Einrückungen jeweils mit 2 Leerzeichen erstellt werden.

.. code-block:: console

    # docker starten
    docker-compose up -d

Die CometVisu ist dann direkt unter der URL ``http://<IP-Openhab>:`` im Browser erreichbar.