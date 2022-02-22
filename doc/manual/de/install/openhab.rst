Installation auf einem Debian System mit openHAB
================================================

Kurzübersicht
-------------

Für den Betrieb der CometVisu mit openHAB werden folgende Dinge benötigt:

1. Server mit funktionierender openHAB Installation (alle Beispiele beziehen sich auf eine openHAB Installation
   auf einem Debian basierten System über den mitgelieferten Paketmanager ``apt``, bei anderen Distributionen
   müssen ggf. die in dieser Anleitung benutzten Pfade angepasst werden.
2. Webserver mit PHP-Unterstützung installieren
3. Ein entpacktes Release der CometVisu auf dem Server
4. API-Token in openHAB erstellen

.. HINT::

    Seit Version 0.12.0 werden keinerlei openHAB-Erweiterungen mehr benötigt, um die CometVisu nutzen zu können.
    Die CometVisu benutzt die von openHAB bereitgestellte REST-Schnittstelle zur Kommunikation.

Es wird davon ausgegangen, dass Punkt 1 bereits erfüllt ist und im folgenden nur auf die weiteren Punkte eingegangen.

2. Webserver installieren
-------------------------

.. code-block:: console

    # Webserver mit PHP installieren
    sudo apt install apache2 php libapache2-mod-php php-soap

Den Inhalt der Datei ``/etc/apache2/sites-enabled/000-default.conf`` durch folgenden ersetzen (``<openhab>`` bitte mit
der IP-Adresse oder dem Hostnamen des openHAB Servers ersetzen, wenn alles auf einem Server läuft, kann ``localhost``
eingetragen werden).

.. code-block:: apacheconf

    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        Header set X-CometVisu-Backend-LoginUrl "/rest/cv/l"
        Header set X-CometVisu-Backend-Name "openhab"

        ProxyPass /rest http://<openhab>:8080/rest
        ProxyPassReverse http://<openhab>:8080/rest /rest

        <Directory /var/www/html>
            Require all granted
            AllowOverride all
        </Directory>
    </VirtualHost>



3. Installation der CometVisu auf dem Server
--------------------------------------------

Die CometVisu kann hier herunter geladen werden: https://github.com/CometVisu/CometVisu/releases. 
Das entpackte Paket enthält den Ordner *cometvisu/release*, welcher auf den Server in folgenden Pfad
*/var/www/html* kopiert werden muss.
Darüber hinaus müssen noch entsprechenden Rechte für den Webserver Benutzer gesetzt werden und einige
Konfigurationsverzeichnisse angelegt werden.
Dies alles kann durch folgenden Konsolenbefehle ausgeführt werden:

.. code-block:: console

    # Kopieren des release Verzeichnisses an die richtige Stelle
    cp -r cometvisu/release /var/www/html

    # Benutzerrechte anpassen für den Webserver
    chown -R www-data:www-data /var/www/html

4. API-Token in openHAB erstellen
---------------------------------

Für einige Anfragen an openHAB benötigt die CometVisu Zugangsdaten. Man kann in der Profilansicht der openHAB UI
(erreichbar durch einen Klick auf den Usernamen unten links) ein API-Token generieren. Dazu klickt man auf
"Erstelle neuen API Token" und gibt seine Zugangsdaten (Benutzername + Passwort) und einen Namen für das Token ein
(das Feld "Token (optional)" bitte leer lassen). Dadurch wird ein neuen Token generiert und angezeigt. Dieses Token muss
jetzt kopiert werden (es wird nur in diesem Moment einmalig angezeigt und kann später nicht mehr angesehen werden) und als
``username`` in das ``pages`` Element der CometVisu-Config-Datei eingetragen werden.

.. code-block: xml

    <pages
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        username="oh.CometVisu.NxR3..."
        design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd" scroll_speed="0" lib_version="9">


Die CometVisu ist dann direkt unter der URL ``http://<server>/?config=<name>`` im Browser erreichbar,
wobei sich ``<name>`` vom Namen der ``visu_config_<name>.xml`` ableitet.
