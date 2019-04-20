.. _docker:

Installation mittels Docker-Container
=====================================

Vom CometVisu Projekt werden offizielle Docker-Container bereit gestellt, die
über DockerHub unter `cometvisu/cometvisu <https://hub.docker.com/r/cometvisu/cometvisu/>`_
bezogen werden können.

Versionen
---------

Als `Tags <https://hub.docker.com/r/cometvisu/cometvisu/tags/>`_ stehen die
neuesten Releases unter ihrem Release-Namen zur Verfügung, so wie unter dem
Tag ``latest`` das jeweils aktuellste Release.

Die aktuellen Entwicklungsversionen können unter ``testing-<Datum>`` bezogen
werden, so wie ``testing`` alleine, dass auf die jeweils aktuellste
Entwicklungsversion zeigt. Wenn im Entwicklungsprozess ein neuer Pull-Request
gemergt wird, so wird im Anschluss automatisch ein neuer Docker-Container
gebaut und unter dem aktuellen Datum abgelegt. Wenn ein Tag für dieses Datum
noch nicht existiert, wird dieses angelegt, und wenn das Tag bereits existiert,
so wird dieses mit dem neu erstellten Container überschrieben.

Einrichtung
-----------

.. _dockerenvironment:

Umgebungsvariablen (environment)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Der Container wird über Umgebungsvariablen grundsätzlich konfiguriert.
Zur Verfügung stehen:

+---------------------+------------------------------+-----------------------------------------------------------------+
|Parameter            |Default                       |Beschreibung                                                     |
+=====================+==============================+=================================================================+
|KNX_INTERFACE        |``iptn:172.17.0.1:3700``      |knxd-URL für die KNX Schnittstelle. Wenn leer, so wird der       |
|                     |                              |``knxd`` nicht geladen.                                          |
+---------------------+------------------------------+-----------------------------------------------------------------+
|KNX_PA               |``1.1.238``                   |Physikalische Schnittstelle (PA) für den ``knxd``.               |
+---------------------+------------------------------+-----------------------------------------------------------------+
|KNXD_PARAMETERS      |``-u -d/var/log/eibd.log -c`` |Weitere Aufruf-Parameter für den ``knxd``.                       |
+---------------------+------------------------------+-----------------------------------------------------------------+
|CGI_URL_PATH         |``/cgi-bin/``                 |URL-Prefix um die ``cgi-bin`` Ressourcen zu lokalisieren.        |
+---------------------+------------------------------+-----------------------------------------------------------------+
|BACKEND_PROXY_SOURCE |                              |Proxy-Pfade beginnen mit diesem Wert, z.B. ``/rest`` für das     |
|                     |                              |openHAB Backend.                                                 |
+---------------------+------------------------------+-----------------------------------------------------------------+
|BACKEND_PROXY_TARGET |                              |Ziel-URL für die Proxy-Anfragen an ``BACKEND_PROXY_SOURCE``,     |
|                     |                              |z.B. ``http://<openhab-server-ip-address>:8080/rest`` für das    |
|                     |                              |openHAB Backend.                                                 |
+---------------------+------------------------------+-----------------------------------------------------------------+

Klassisch (``knxd`` mit ``eibread-cgi``/``eibwrite-cgi``)
.........................................................

Für das klassische Backend läuft ein ``knxd``, der über die ``eibread-cgi`` und
``eibwrite-cgi`` Befehle das Interface der CometVisu zu dem KNX-Bus bereit
stellt.

Am wichtigsten ist die Umgebungsvariable ``KNX_INTERFACE``, die an die eigenen
Bedingungen angepasst werden muss um auf das KNX Interface zugreifen zu können.
Die Dokumentation für den ``knxd`` in der zur Zeit verwendeten Version 0.0.5.1
kann dem
`knxd-Wiki <https://github.com/knxd/knxd/wiki/Command-line-parameters/e49c9d1a2a81cb692cc88683920108f032d2b9bc>`_
entnommen werden.

OpenHAB
.......

Beispiel-Konfiguration für das OpenHAB Backend (wenn es auf einem Server mit
der Addresse ``192.168.0.10`` läuft):

.. code-block:: bash

    KNX_INTERFACE=
    CGI_URL_PATH=/rest/
    BACKEND_PROXY_SOURCE=/rest
    BACKEND_PROXY_TARGET=http://192.168.0.10:8080/rest

Volumes
~~~~~~~

Konfigurations-Dateien
......................

Um über den Restart oder die Neuerstellung von Containern hinweg Daten persistent
abzulegen zu können müssen diese in einem Volume liegen. Für die Config-Dateien
wird hierzu das Verzeichnis ``/var/www/html/config`` (bis einschließlich
Release 0.10.2) bzw. ``/var/www/html/resource/config`` (ab Release 0.11) als
Volume exportiert.

RRD (Diagram-Plugin)
....................

Für das :ref:`Diagram-Plugin <diagram>` können die Zeitserien als RRD-Dateien
bereit gestellt werden. Diese müssen unter dem Pfad ``/var/www/rrd`` als
Mount eingebunden werden. Die RRD-Dateien selbst müssen außerhalb befüllt
und aktualisiert werden, z.B. von einem anderen Container der dieses Volume
gleichzeitig mit einbindet.

Ports
~~~~~

Der Container exportiert den Port 80 für den Web-Server.
