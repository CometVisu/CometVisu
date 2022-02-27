.. replaces:: CometVisu/Installation/de
    CometVisu/de/latest/manual/install/linux.html
    CometVisu/de/latest/manual/install/nas.html
    CometVisu/Installation/WireGate/de
    CometVisu/de/0.12/manual/install/wiregate.html

Voraussetzungen für die Installation
====================================

Um die CometVisu nutzen zu können, muss das System gewisse
Voraussetzungen erfüllen.

Diese sind

-  ein Backend für den Zugriff auf den KNX-Bus
-  [optional] rrdtool für die Graphenerstellung
-  [optional] InfluxDB für die Graphenerstellung
-  ein Webserver, mit (optional aber empfohlen) PHP Unterstützung
-  das CometVisu-Softwarepaket

.. note::

    Für den :ref:`Manager <manager>` und :ref:`Editor <editor>` wird PHP
    ab Version 7 benötigt. Der Kern der CometVisu selbst kann jedoch auch
    ohne PHP genutzt werden.

Backend
-------

Damit die CometVisu auf die Geräte zugreifen kann wird ein "Backend" benötigt.
Hierzu gibt es verschiedene Möglichkeiten:

knxd / eibd
~~~~~~~~~~~

Um direkt auf den KNX Bus zuzugreifen wird der knxd verwendet.
Die Installation dieses Backends wird unter
:doc:`backends/install-eibd` beschrieben.

.. toctree::
    :hidden:

    backends/install-eibd

openHAB
~~~~~~~

Für die Verwendung von openHAB als Backend gibt es die Anleitungen
:doc:`openhab`
und
:doc:`docker_openhab`.

MQTT
~~~~

Damit die CometVisu ein MQTT-Teilnehmer ist, wird ein MQTT Broker benötigt
der über WebSocket ansprechbar ist.

Backend konfigurieren
~~~~~~~~~~~~~~~~~~~~~

Um die CometVisu für die Verwendung von einem spezifischen Backend zu
konfigurieren gibt es mehrere Möglichkeiten, die im folgenden Aufgeführt sind.
Hierbei überschreibt eine Methode die darüber aufgeführten Werte, d.h.
beispielsweise überschreiben die Werte in der Konfiguartionsdatei die Einstellungen
aus den Umgebungsvariablen.

HTTP-Header / Docker-Umgebungsvariablen
.......................................

Der Web-Server kann in den HTTP-Headern der Konfigurationsdatei die
Backend-Parameter mit übergeben. Dies ist bei Verwendung des offiziellen
Docker-Image der CometVisu leicht durch das Setzen entsprechender
``ENVIRONMENT`` Parameter erreichbar

============================ ================ ===========
HTTP Header                  ``ENVIRONMENT``  Bedeutung
---------------------------- ---------------- -----------
X-CometVisu-Backend-Name     BACKEND_NAME     Name wie ``knxd``, ``oh`` oder ``mqtt``
X-CometVisu-Backend-Url      BACKEND_URL      URL für den MQTT WebSocket
X-CometVisu-Backend-LoginUrl CGI_URL_PATH     URL für die knxd oder openHAB Login-Ressource
X-CometVisu-Backend-User     BACKEND_USERNAME Benutzername, wenn für den MQTT Broker benötigt
X-CometVisu-Backend-Pass     BACKEND_PASSWORD Passwort, wenn für den MQTT Broker benötigt
============================ ================ ===========

.. warning::

    Der Benutzername und das Passwort für den MQTT Broker liegen hier direkt
    lesbar vor und werden auch so über das Netzwerk übertragen!

Konfigurationsdatei
...................

Im alles umschließenden ``<pages>``-Element können die entsprechenden Parameter
als Attribut gesetzt werden:

=========== ===========
Attribut    Bedeutung
----------- -----------
backend     Name wie ``knxd``, ``oh`` oder ``mqtt``
backend-url URL für den MQTT WebSocket
username    Benutzername, wenn für den MQTT Broker benötigt
password    Passwort, wenn für den MQTT Broker benötigt
=========== ===========

Beispiel:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <pages backend="mqtt" backend-url="wss://web.server:443/mqtt/ws" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="pure" xsi:noNamespaceSchemaLocation="../visu_config.xsd">
      <meta>
        <plugins>
    ...

URL
...

Durch den URL Parameter ``backend`` kann auch durch den Seitenaufruf das Backend
ausgewählt werden. Dies ist jedoch nur in Spezialfällen wie Entwicklungs- und
Testbetrieb sinnvoll und bedingt, dass die Zugriffs-URLs bereits über eine der
weiter oben stehenden Methoden gesetzt wurden.

Graphentool - RRDtool
---------------------

Eine optionale, aber dringend empfohlene Komponente ist rrdtool, um die
Daten für die Erstellung von Graphen bereitzustellen. Es gibt viele
Möglichkeiten, Daten an rrds zu übergeben und der Einsatz von rrdtool
ist in der Breite dokumentiert. Die Installation von rrdtool für
CometVisu wird unter :doc:`RRDtool <install-rrd>` beschrieben.

.. toctree::
    :hidden:

    install-rrd

Die Darstellung von Zeitreihen aus einer InfluxDB Datenbank wird direkt
unterstützt und benötigt (außer PHP Unterstützung) keine weitere Software.

Webserver
---------

Der notwendigen Dateien unter ``/usr/lib/cgi-bin/`` müssen für das Konto,
unter dem der Webserver läuft, ausführbar sein:

.. code-block:: bash

    chmod +x /usr/lib/cgi-bin/r
    chmod +x /usr/lib/cgi-bin/l
    chmod +x /usr/lib/cgi-bin/w
    chmod +x /usr/lib/cgi-bin/rrdfetch

Wenn diese Dateien symbolische Links sind, müssen entsprechend die
verlinkten Dateien ausführbar gemacht werden, z.B. in /usr/local/bin
oder /usr/share/knxd/examples/bin.

Um zusätzliche Komponenten wie z.B. den eingebauten Editor nutzen zu
können, muss der Webserver die Nutzung von PHP unterstützen.

lighttpd
~~~~~~~~

Für lighttpd wird hier eine Beispielkonfiguration bereit gestellt. Die
Konfiguration hier ist allerdings nur als Referenz gedacht; die
tatsächlich notwendigen Konfigurationsoptionen können sich je nach
Bedürfnis ändern.

Um unter Debian/Ubuntu lighttpd zu installieren:

.. code-block:: bash

    apt-get install lighttpd


/etc/lighttpd/lighttpd.conf

.. code-block:: lighttpd

    server.modules = (
            "mod_access",
            "mod_alias",
            "mod_compress",
            "mod_redirect",
    #       "mod_rewrite",
    )

    server.document-root        = "/var/www"
    server.upload-dirs          = ( "/var/cache/lighttpd/uploads" )
    server.errorlog             = "/var/log/lighttpd/error.log"
    server.pid-file             = "/var/run/lighttpd.pid"
    server.username             = "www-data"
    server.groupname            = "www-data"

    index-file.names            = ( "index.php", "index.html",
                                    "index.htm", "default.htm",
                                   " index.lighttpd.html" )

    url.access-deny             = ( "~", ".inc" )

    static-file.exclude-extensions = ( ".php", ".pl", ".fcgi" )

    ## Use ipv6 if available
    #include_shell "/usr/share/lighttpd/use-ipv6.pl"

    dir-listing.encoding        = "utf-8"
    server.dir-listing          = "enable"

    compress.cache-dir          = "/var/cache/lighttpd/compress/"
    compress.filetype           = ( "application/x-javascript", "text/css", "text/html", "text/plain" )

    include_shell "/usr/share/lighttpd/create-mime.assign.pl"
    include_shell "/usr/share/lighttpd/include-conf-enabled.pl"

/etc/lighttpd/conf-enabled/10-cgi.conf

.. code-block:: lighttpd

    # /usr/share/doc/lighttpd-doc/cgi.txt

    server.modules += ( "mod_cgi" )

    $HTTP["url"] =~ "^/cgi-bin/" {
            cgi.assign = ( "" => "" )
    }

    ## Warning this represents a security risk, as it allow to execute any file
    ## with a .pl/.py even outside of /usr/lib/cgi-bin.
    #
    cgi.assign      = (
            ".pl"  => "/usr/bin/perl",
            ".php" => "/usr/bin/php-cgi",
            ".py"  => "/usr/bin/python",
    )

/etc/lighttpd/conf-enabled/11-cgi-cometvisu.conf

.. code-block:: lighttpd

    ### Add cgi for cometvisu
    alias.url += ( "/cgi-bin/" => "/usr/lib/cgi-bin/" )
    compress.filetype += ("application/javascript", "application/xml", "application/octet-stream")

CometVisu installieren
----------------------

CometVisu kann unter https://github.com/CometVisu/CometVisu
heruntergeladen werden und sollte z.B. im Verzeichnis /var/www/visu/
entpackt werden. Die veröffentlichten Pakete sind dort unter
https://github.com/CometVisu/CometVisu/releases zu finden.

Die Installation auf dem `Raspberry
Pi <http://de.wikipedia.org/wiki/Raspberry_Pi>`__ wird unter :doc:`CometVisu auf Raspberry Pi <raspberry>`
beschrieben.

CometVisu testen
----------------

http://MyServer/visu/ im Browser öffnen

Viel Spaß!
