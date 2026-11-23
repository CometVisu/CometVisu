.. _docker:

Installation mittels Docker-Container
=====================================

Vom CometVisu Projekt werden offizielle Docker-Container bereit gestellt, die
über DockerHub unter `cometvisu/cometvisu <https://hub.docker.com/r/cometvisu/cometvisu/>`_
bezogen werden können.

.. note::

    Die Installation des Docker-Containers wird - am Beispiel eines Raspberry
    Pi - auch im Tutorial
    :ref:`Raspberry Pi: CometVisu in Docker installieren <rpi tutorial cometvisu in docker>`
    beschrieben.

Versionen
---------

Als `Tags <https://hub.docker.com/r/cometvisu/cometvisu/tags/>`_ stehen die
neuesten Releases unter ihrem Release-Namen zur Verfügung, so wie unter dem
Tag ``latest`` das jeweils aktuellste Release.

Die aktuellen Entwicklungsversionen können unter ``testing-<Datum>`` bezogen
werden, so wie ``testing`` alleine, dass auf die jeweils aktuellste
Entwicklungsversion zeigt. Wenn im Entwicklungsprozess ein neuer Pull-Request
gemerged wird, so wird im Anschluss automatisch ein neuer Docker-Container
gebaut und unter dem aktuellen Datum abgelegt. Wenn ein Tag für dieses Datum
noch nicht existiert, wird dieses angelegt, und wenn das Tag bereits existiert,
so wird dieses mit dem neu erstellten Container überschrieben.

Einrichtung
-----------

.. _dockerenvironment:

Umgebungsvariablen (environment)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Der Container wird über Umgebungsvariablen konfiguriert. Für die Anbindung
an den KNX-Bus enthält er das FastCGI-Backend ``cometvisu-knx-fcgi`` (bis
FastCGI-Backend Version 1.2.1: ``cometvisu-knxd-fcgi``) zusammen mit Apache
und PHP, so dass keine zusätzliche Software benötigt wird.

Backend und Webserver
.....................

.. list-table::
   :header-rows: 1

   * - Parameter
     - Default
     - Beschreibung
   * - ``BACKEND_NAME``
     - ``knxd``
     - Backend-Name: ``knxd`` (KNX), ``openhab`` oder ``mqtt``. Für den
       KNX-Bus ist der Name bei allen Transporten ``knxd``.
   * - ``BACKEND_KNXD``
     - ``<CGI_URL_PATH>l``
     - URL der ``l`` (Login)-Ressource des KNX-Backends.
   * - ``BACKEND_OPENHAB``
     - ``<CGI_URL_PATH>``
     - Pfad zur openHAB REST-API.
   * - ``BACKEND_MQTT``
     - *(leer)*
     - URL des MQTT-Brokers (WebSocket-Schnittstelle).
   * - ``CGI_URL_PATH``
     - ``/cgi-bin/``
     - **Veraltet:** URL-Prefix der ``cgi-bin``-Ressourcen.
   * - ``BACKEND_PROXY_SOURCE``
     - *(leer)*
     - Proxy-Pfade beginnen mit diesem Wert, z.B. ``/rest`` für das
       openHAB-Backend.
   * - ``BACKEND_PROXY_TARGET``
     - *(leer)*
     - Ziel-URL für die Proxy-Anfragen an ``BACKEND_PROXY_SOURCE``, z.B.
       ``http://<openhab-server-ip-address>:8080/rest`` für das
       openHAB-Backend.
   * - ``APACHE_PORT``
     - ``80``
     - Experten-Option: Port, auf dem Apache im Container lauscht. Bei
       Änderung mit ``-p <Host-Port>:<APACHE_PORT>`` veröffentlichen.
   * - ``ACCESS_LOG``
     - ``false``
     - Zugriffsprotokoll des Webservers anzeigen, wenn auf ``true`` gesetzt.
   * - ``STOP_ON_BAD_HEALTH``
     - ``true``
     - Container bei fehlgeschlagenem Healthcheck stoppen, wenn auf
       ``true`` gesetzt.

KNX-Anbindung (FastCGI-Backend)
...............................

.. list-table::
   :header-rows: 1

   * - Parameter
     - Default
     - Beschreibung
   * - ``KNX_TRANSPORT``
     - ``knxd``
     - Transport zum KNX-Bus: ``knxd``, ``ip-tunnel`` oder ``ip-routing``.
   * - ``FCGI_SOCKET``
     - ``/run/cometvisu-fcgi.sock``
     - FastCGI-Socket des Backends. Apache leitet ``/cgi-bin/l``,
       ``/cgi-bin/r`` und ``/cgi-bin/w`` dorthin weiter.
   * - ``FCGI_WORKERS``
     - ``9``
     - Anzahl der Arbeiterprozesse (2 - 256). Zwei Arbeiter bleiben für
       ``/w`` und ``/l`` reserviert, so dass ``FCGI_WORKERS - 2`` Clients
       gleichzeitig warten können.
   * - ``LONGPOLL_TIMEOUT_SEC``
     - ``300``
     - Maximale Dauer eines Long-Polls von ``/r`` in Sekunden.
   * - ``KNX_TX_MAX_PER_SEC``
     - ``10``
     - Obergrenze für ausgehende KNX-Telegramme pro Sekunde über alle
       Clients hinweg.
   * - ``DEBUG_BACKEND``
     - *(nicht gesetzt)*
     - ``1`` aktiviert die Debug-Ausgabe des FastCGI-Backends.
   * - ``NO_ENTRYPOINT_KNXD``
     - ``false``
     - ``false``: Der Container startet den mitgelieferten ``knxd``.
       ``extern``: Den ``knxd`` **nicht** starten und stattdessen den Socket
       eines externen ``knxd`` verwenden (siehe ``KNXD_SOCKET``). ``true``:
       weder ``knxd`` noch das FastCGI-Backend starten.
   * - ``KNXD_SOCKET``
     - ``/run/knx``
     - Pfad zum Unix-Socket eines externen ``knxd``. Wird nur mit
       ``NO_ENTRYPOINT_KNXD=extern`` verwendet.

Seit Version 2.0 verwendet das FastCGI-Backend für alle Arbeiter genau
**eine** Verbindung zum ``knxd``. ``FCGI_WORKERS`` ist daher unabhängig
von ``KNX_CLIENT_PAS``; die Anzahl der Client-Verbindungen des ``knxd``
muss nur Platz für diese eine Verbindung und gegebenenfalls für Werkzeuge
wie ``knxtool`` lassen.

Transport ``knxd`` (``knxd`` im Container)
..........................................

Dies ist der Standard. Der Container startet einen mitgelieferten ``knxd``
und das FastCGI-Backend. Der wichtigste Parameter ist ``KNX_INTERFACE``,
der an die eigenen Bedingungen angepasst werden muss.

.. list-table::
   :header-rows: 1

   * - Parameter
     - Default
     - Beschreibung
   * - ``KNX_INTERFACE``
     - *(leer)*
     - KNX-Schnittstelle für den ``knxd`` in der Form
       ``<Backend>:<Adresse>:<Port>``. **Erforderlich**, wenn der Container
       den ``knxd`` startet. ``iptn:<IP>:<Port>`` wählt KNXnet/IP-Tunneling,
       z.B. ``iptn:192.168.0.10:3671``.
   * - ``KNX_PA``
     - ``1.1.238``
     - Physikalische Adresse (PA) des ``knxd``.
   * - ``KNX_CLIENT_PAS``
     - ``1.1.239:10``
     - Physikalische Adresse und Anzahl der Client-Verbindungen
       (``<Adresse>:<Anzahl>``), die der ``knxd`` anbietet. Mindestens 2
       Verbindungen sind erforderlich.
   * - ``KNX_INTERFACE_OPTIONS``
     - ``-B single -A retry-delay=1``
     - Zusätzliche Parameter für die KNX-Schnittstelle des ``knxd``.
   * - ``KNXD_PARAMETERS``
     - *(leer)*
     - Kompletter Parametersatz für den ``knxd``. Wenn gesetzt, werden alle
       anderen ``knxd``-Parameter ignoriert.

Die Dokumentation der mitgelieferten ``knxd``-Version ist im
`knxd-Wiki <https://github.com/knxd/knxd/wiki/Command-line-parameters>`_
zu finden.

Beispiel (eine KNX IP-Schnittstelle unter ``192.168.0.10``):

.. code-block:: bash

    docker run -d -p 8080:80 \
      -e KNX_INTERFACE=iptn:192.168.0.10:3671 \
      -e KNX_PA=1.1.238 \
      cometvisu/cometvisu:latest

Transport ``knxd`` (externer ``knxd``)
.......................................

Wenn bereits ein ``knxd`` außerhalb des Containers läuft (z.B. auf dem Host
oder in einem anderen Container), darf er nicht ein zweites Mal gestartet
werden. Mit ``NO_ENTRYPOINT_KNXD=extern`` wird der mitgelieferte ``knxd``
nicht gestartet. Das FastCGI-Backend startet trotzdem und verbindet sich mit
dem Socket aus ``KNXD_SOCKET``:

.. code-block:: bash

    docker run -d -p 8080:80 \
      -v /run:/host-run:ro \
      -e NO_ENTRYPOINT_KNXD=extern \
      -e KNXD_SOCKET=/host-run/knx \
      -e BACKEND_NAME=knxd \
      -e BACKEND_KNXD=https://server.local/cgi-bin/l \
      cometvisu/cometvisu:latest

Hinweise für diesen Modus:

- Das **Verzeichnis** mit dem Socket einbinden, nicht die Socket-Datei
  selbst. Ein Bind-Mount der Socket-Datei zeigt nach einem Neustart des
  externen ``knxd`` weiterhin auf den alten Inode.
- ``KNX_PA``, ``KNX_CLIENT_PAS``, ``KNX_INTERFACE``,
  ``KNX_INTERFACE_OPTIONS`` und ``KNXD_PARAMETERS`` werden ignoriert - der
  externe ``knxd`` bringt seine eigene Konfiguration mit. Dessen Cache für
  Gruppenadressen muss für das Lesen aktiviert sein.
- ``NO_ENTRYPOINT_KNXD=true`` startet weder den ``knxd`` noch das
  FastCGI-Backend. Das ist nur sinnvoll, wenn das Backend komplett von
  außen bereitgestellt wird.

Transport ``ip-tunnel`` - ohne knxd
...................................

Mit ``KNX_TRANSPORT=ip-tunnel`` startet der Container den mitgelieferten
``knxd`` **nicht**. Das FastCGI-Backend verbindet sich direkt als
Tunneling-Client mit einer KNX IP-Schnittstelle bzw. einem KNX IP-Router,
d.h. die CometVisu verhält sich wie ein klassisches KNX-Gerät.

.. list-table::
   :header-rows: 1

   * - Parameter
     - Default
     - Beschreibung
   * - ``KNX_IP_HOST``
     - *(leer)*
     - Adresse der KNX IP-Schnittstelle bzw. des KNX IP-Routers.
       **Erforderlich**.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP-UDP-Port.
   * - ``KNX_IP_LOCAL_ADDR``
     - *(Wahl des Betriebssystems)*
     - Lokale Adresse, die dem Gerät bekannt gegeben wird. Hilfreich, wenn
       der Container hinter NAT oder auf einem Host mit mehreren Netzwerken
       läuft.
   * - ``KNX_IP_NAT``
     - ``0``
     - ``1`` aktiviert den NAT-Modus der Tunnel-Verbindung.
   * - ``KNX_IP_HEARTBEAT_SEC``
     - ``60``
     - Intervall der Verbindungsstatus-Abfrage.
   * - ``KNX_IP_ACK_TIMEOUT_MS``
     - ``1000``
     - Zeitlimit, bevor ein Telegramm wiederholt wird.
   * - ``KNX_IP_RETRIES``
     - ``3``
     - Anzahl der Wiederholungen pro Telegramm.

``KNX_INTERFACE``, ``KNX_PA``, ``KNX_CLIENT_PAS``,
``KNX_INTERFACE_OPTIONS``, ``KNXD_PARAMETERS`` und ``KNXD_SOCKET`` werden
in diesem Modus ignoriert.

Beispiel:

.. code-block:: bash

    docker run -d -p 8080:80 \
      -e KNX_TRANSPORT=ip-tunnel \
      -e KNX_IP_HOST=192.168.0.10 \
      -e KNX_IP_NAT=1 \
      cometvisu/cometvisu:latest

Hinweise:

- Eine KNX IP-Schnittstelle bietet üblicherweise nur eine kleine Anzahl an
  Tunnel-Verbindungen (oft 4). Eine davon wird von der CometVisu belegt.
- Mit dem Standard-Netzwerk von Docker steht der Container hinter NAT.
  Daher entweder ``KNX_IP_NAT=1`` setzen (das Gerät muss NAT unterstützen)
  oder den Container mit ``--network host`` starten.
- Bei ``--network host`` kann ``-p`` nicht verwendet werden. Ist Port 80 auf
  dem Host bereits belegt, stattdessen ``APACHE_PORT`` setzen.

Transport ``ip-routing`` - ohne knxd
....................................

Mit ``KNX_TRANSPORT=ip-routing`` startet der Container den mitgelieferten
``knxd`` **nicht**. Das FastCGI-Backend tritt der
KNXnet/IP-Multicast-Gruppe bei und nimmt am Routing wie ein KNX IP-Router
teil.

.. list-table::
   :header-rows: 1

   * - Parameter
     - Default
     - Beschreibung
   * - ``KNX_IP_MULTICAST``
     - ``224.0.23.12``
     - Multicast-Gruppe des KNXnet/IP-Routings.
   * - ``KNX_IP_IFACE``
     - *(Standard-Route)*
     - Netzwerk-Interface für den Beitritt zur Multicast-Gruppe.
   * - ``KNX_IP_INDIVIDUAL_ADDR``
     - ``15.15.250``
     - Physikalische Adresse, die als Quelle der Routing-Telegramme
       verwendet wird. Dies muss eine freie Adresse der Installation sein.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP-UDP-Port.

Beispiel:

.. code-block:: bash

    docker run -d --network host \
      -e KNX_TRANSPORT=ip-routing \
      -e KNX_IP_IFACE=eth0 \
      -e KNX_IP_INDIVIDUAL_ADDR=15.15.250 \
      cometvisu/cometvisu:latest

Hinweise:

- ``--network host`` ist erforderlich, da Multicast-Verkehr das
  Standard-Netzwerk von Docker nicht überquert.
- Der KNX IP-Router muss für das Routing konfiguriert sein und sich im
  selben Netzwerksegment befinden.
- ``KNX_IP_INDIVIDUAL_ADDR`` muss eine freie physikalische Adresse sein. Ein
  Router weist die Adresse ``0.0.0`` zurück.
- Ist Port 80 auf dem Host bereits belegt, ``APACHE_PORT`` setzen.
- Jeder Teilnehmer der Multicast-Gruppe kann den Bus-Verkehr mitlesen und
  Telegramme senden. Diesen Modus nur in einem vertrauenswürdigen
  Netzwerksegment verwenden.

OpenHAB
.......

Beispiel-Konfiguration für das OpenHAB Backend (wenn es auf einem Server mit
der Adresse ``192.168.0.10`` läuft):

.. code-block:: bash

    BACKEND_NAME=openhab
    BACKEND_OPENHAB=/rest/
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
