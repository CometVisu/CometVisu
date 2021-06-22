.. replaces:: CometVisu/Installation/de
    CometVisu/de/latest/manual/install/linux.html
    CometVisu/de/latest/manual/install/nas.html

Voraussetzungen für die Installation
====================================

Wenn WireGate 1.1 oder später eingesetzt wird, ist CometVisu 0.8.5
bereits vorinstalliert und kann ohne Weiteres genutzt werden. Um die
alte CometVisu auf einem WireGate zu installieren, gibt es hier
:doc:`weitere Informationen <wiregate>`.

Um die CometVisu nutzen zu können, muss das System gewisse
Voraussetzungen erfüllen.

Diese sind

-  ein Backend für den Zugriff auf den KNX-Bus
-  [optional] rrdtool für die Graphenerstellung
-  [optional] InfluxDB für die Graphenerstellung
-  ein Webserver, mit (optional aber empfohlen) PHP Unterstützung
-  das CometVisu-Softwarepaket

Backend - knxd/eibd oder OpenHAB
--------------------------------

Die Installation des Backends wird unter
:doc:`backends/install-eibd` beschrieben.

.. toctree::
    :hidden:

    backends/install-eibd

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
