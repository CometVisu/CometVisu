.. _fcgi:

FastCGI-Backend (cometvisu-knx-fcgi)
====================================

Seit der CometVisu Version 1.0.0 ist das FastCGI-Backend
``cometvisu-knx-fcgi`` der empfohlene Weg, um die CometVisu mit dem KNX-Bus
zu verbinden. Bis zur Version 1.2.1 hieß es ``cometvisu-knxd-fcgi``.

Das Backend implementiert das CometVisu-Protokoll mit den Endpunkten ``l``
(Login), ``r`` (Lesen) und ``w`` (Schreiben) und stellt es über einen
FastCGI-Socket bereit, den es selbst öffnet. Der Webserver muss nur noch
die drei URL-Pfade an diesen Socket weiterleiten - CGI-Programme werden
nicht mehr benötigt.

Das Protokoll selbst ist im CometVisu-Wiki spezifiziert
(`Protokoll <https://github.com/CometVisu/CometVisu/wiki/Protokoll>`__).

Transporte
----------

Das Backend unterstützt drei Transporte für den Zugriff auf den KNX-Bus.
Der Transport muss explizit ausgewählt werden, einen Standard gibt es
nicht.

.. list-table::
   :header-rows: 1
   :widths: auto

   * - ``KNX_TRANSPORT``
     - Bus-Zugriff
     - Voraussetzung
   * - ``knxd``
     - ein lokaler ``knxd``-Daemon über dessen Unix-Socket
     - ``knxd`` installiert und gestartet
   * - ``ip-tunnel``
     - KNXnet/IP-Tunneling-Client
     - eine KNX IP-Schnittstelle oder ein KNX IP-Router mit einem freien
       Tunnel
   * - ``ip-routing``
     - KNXnet/IP-Multicast-Routing-Teilnehmer
     - ein KNX IP-Router im selben Netzwerksegment (Multicast)

Die Transporte ``ip-tunnel`` und ``ip-routing`` benötigen **keinen knxd**.
Damit verhält sich die CometVisu wie ein klassisches KNX-Gerät:

- Bei ``ip-tunnel`` verbindet sich das Backend als Tunneling-Client mit
  der KNX IP-Schnittstelle bzw. dem KNX IP-Router und erhält von dort eine
  physikalische Adresse zugewiesen.
- Bei ``ip-routing`` tritt das Backend der KNXnet/IP-Multicast-Gruppe bei
  und nimmt am Routing wie ein KNX IP-Router teil. Es verwendet eine eigene
  physikalische Adresse (``KNX_IP_INDIVIDUAL_ADDR``), die eine freie
  Adresse der Installation sein muss.

.. note::

    Das alte Backend mit den CGI-Programmen ``eibread-cgi`` und
    ``eibwrite-cgi`` von ``eibd``/``knxd`` funktioniert weiterhin, ist aber
    nicht mehr empfehlenswert. Es wird unter :doc:`install-eibd`
    beschrieben.

Installation
------------

Voraussetzungen
~~~~~~~~~~~~~~~

Das Backend ist in C++ geschrieben und muss aus den Quellen gebaut werden.
Auf einem Debian- oder Ubuntu-System werden die Build-Abhängigkeiten mit

.. code-block:: bash

    sudo apt install libfcgi-dev cmake g++
    sudo apt install knxd-dev     # nur für KNX_TRANSPORT=knxd

installiert. ``knxd-dev`` wird nur benötigt, wenn der ``knxd``-Transport
mit kompiliert wird - für ``ip-tunnel`` und ``ip-routing`` ist es nicht
erforderlich.

Bauen
~~~~~

.. code-block:: bash

    git clone https://github.com/CometVisu/cometvisu-knx-fcgi.git
    cd cometvisu-knx-fcgi
    cmake -B build -DCMAKE_BUILD_TYPE=Release
    cmake --build build -j$(nproc)
    sudo cmake --install build --prefix /usr/local

Damit wird das Programm ``/usr/local/bin/cometvisu-knx-fcgi`` installiert.

Ein Programm ohne jegliche ``knxd``-Abhängigkeit wird mit

.. code-block:: bash

    cmake -B build -DCMAKE_BUILD_TYPE=Release -DKNX_BUILD_KNXD_TRANSPORT=OFF

gebaut.

.. note::

    ``--help`` listet alle Umgebungsvariablen auf. Beim Start protokolliert
    das Backend die tatsächlich verwendete Transport-Konfiguration und die
    wichtigsten Limits.

Backend starten
~~~~~~~~~~~~~~~

Das Backend muss dauerhaft im Hintergrund laufen. Es öffnet den
FastCGI-Socket selbst und bedient ihn mit einem Pool von
Arbeiterprozessen. Eine systemd-Unit für einen lokalen ``knxd`` auf
derselben Maschine sieht so aus:

.. code-block:: ini

    [Unit]
    Description=CometVisu KNX FastCGI Backend
    After=network-online.target

    [Service]
    Environment=KNX_TRANSPORT=knxd
    Environment=FCGI_SOCKET=/run/cometvisu-fcgi/fcgi.sock
    Environment=FCGI_WORKERS=9
    RuntimeDirectory=cometvisu-fcgi
    RuntimeDirectoryMode=0750
    User=www-data
    Group=www-data
    ExecStart=/usr/local/bin/cometvisu-knx-fcgi
    Restart=always

    [Install]
    WantedBy=multi-user.target

Die Variablen im Abschnitt ``[Service]`` werden unter `Einstellungen`_
beschrieben. Wenn der Dienst unter dem Benutzer des Webservers läuft,
kann der Webserver direkt auf den Unix-Socket zugreifen. Andernfalls muss
der Benutzer des Webservers Mitglied der Gruppe des Sockets sein, denn der
Socket wird mit dem Modus ``0660`` angelegt.

.. code-block:: bash

    sudo systemctl daemon-reload
    sudo systemctl enable --now cometvisu-fcgi

Für einen KNXnet/IP-Transport ändern sich nur ``KNX_TRANSPORT`` und die
passenden ``KNX_IP_*``-Variablen, z.B.:

.. code-block:: ini

    # KNX IP-Schnittstelle / -Router als Tunnel
    Environment=KNX_TRANSPORT=ip-tunnel
    Environment=KNX_IP_HOST=192.168.0.10

    # KNX IP-Router im lokalen Netzwerk (Multicast)
    Environment=KNX_TRANSPORT=ip-routing
    Environment=KNX_IP_IFACE=eth0
    Environment=KNX_IP_INDIVIDUAL_ADDR=15.15.250

Webserver
---------

Die CometVisu verwendet die Standard-Backend-URL ``/cgi-bin/`` mit den
Ressourcen ``l``, ``r`` und ``w``. Diese drei Pfade müssen an den
FastCGI-Socket des Backends weitergeleitet werden.

Apache
~~~~~~

.. code-block:: bash

    sudo a2enmod proxy_fcgi
    sudo a2enconf cometvisu-fcgi

.. code-block:: apache

    # /etc/apache2/conf-available/cometvisu-fcgi.conf
    ProxyPass "/cgi-bin/l" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/l"
    ProxyPass "/cgi-bin/r" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/r"
    ProxyPass "/cgi-bin/w" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/w"

Wenn das Backend statt auf einem Unix-Socket auf einem TCP-Port lauscht,
wird ``fcgi://127.0.0.1:9000`` als Ziel verwendet.

nginx
~~~~~

.. code-block:: nginx

    location ~ ^/cgi-bin/(l|r|w)$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/cometvisu-fcgi/fcgi.sock;
    }

lighttpd
~~~~~~~~

.. code-block:: lighttpd

    server.modules += ( "mod_fastcgi" )

    fastcgi.server = (
        "/cgi-bin/" => ((
            "socket"       => "/run/cometvisu-fcgi/fcgi.sock",
            "check-local"  => "disable"
        ))
    )

.. note::

    Das Programm ``rrdfetch`` für das :ref:`Diagramm-Plugin <diagram>` ist
    weiterhin ein normales CGI-Programm in ``/usr/lib/cgi-bin/`` und wird
    unabhängig vom FastCGI-Backend an dieses Verzeichnis weitergeleitet.

.. warning::

    Das Backend führt selbst keine Authentifizierung durch - die Zugangsdaten
    an ``/l`` werden nicht geprüft. Die Authentifizierung muss der Webserver
    (bzw. der vorgeschaltete Proxy) übernehmen. Das Backend darf
    niemals direkt aus einem nicht vertrauenswürdigen Netzwerk erreichbar
    sein.

Einstellungen
-------------

Das Backend wird über Umgebungsvariablen konfiguriert. Der Transport wird
mit ``KNX_TRANSPORT`` gewählt; ein nicht gesetzter oder unbekannter Wert
führt zu einem Startfehler.

Allgemeine Einstellungen
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Standard
     - Beschreibung
   * - ``KNX_TRANSPORT``
     - *(erforderlich)*
     - ``knxd``, ``ip-tunnel`` oder ``ip-routing``.
   * - ``FCGI_SOCKET``
     - *(erforderlich)*
     - Listen-Socket: ein Dateipfad für einen Unix-Socket oder
       ``host:port`` für TCP. Das Backend öffnet den Socket selbst. Ein
       Unix-Socket erhält den Modus ``0660``. Ein TCP-Socket hat keine
       Authentifizierung und sollte deshalb an eine Loopback-Adresse
       (``127.0.0.1:9000``) gebunden werden.
   * - ``FCGI_WORKERS``
     - ``20``
     - Anzahl der Arbeiterprozesse (1 - 256). Zwei Arbeiter bleiben für
       ``/w`` und ``/l`` reserviert, so dass höchstens
       ``FCGI_WORKERS - 2`` Clients gleichzeitig warten können.
   * - ``LONGPOLL_TIMEOUT_SEC``
     - ``300``
     - Maximale Dauer eines Long-Polls von ``/r`` in Sekunden (1 - 330).
   * - ``FCGI_CONNECTION_TIMEOUT_SEC``
     - ``330``
     - Maximale Zeit, die eine FastCGI-Verbindung ohne Fortschritt
       verbringen darf.
   * - ``KNX_TX_MAX_PER_SEC``
     - ``10``
     - Obergrenze für ausgehende KNX-Telegramme pro Sekunde über alle
       Clients hinweg (1 - 1000).
   * - ``KNX_CACHE_CAPACITY``
     - ``16384``
     - Anzahl der Gruppenadressen, die im gemeinsamen Cache gehalten
       werden.
   * - ``SESSION_TTL_SEC``
     - ``1800``
     - Lebensdauer einer Session in Sekunden.
   * - ``SESSION_MAX``
     - ``10000``
     - Maximale Anzahl gleichzeitiger Sessions.
   * - ``BASE_URL``
     - *(nicht gesetzt)*
     - URL-Präfix, das das Backend in der Login-Antwort bekannt gibt.
   * - ``ADDRESS_PREFIX``
     - *(leer)*
     - Namensraum für Adressen ohne Namensraum (``ADDRESS_PREFIX=KNX``
       macht aus ``1/2/3`` die Adresse ``KNX:1/2/3``).
   * - ``LOGIN_EXTRA_CONFIG``
     - *(nicht gesetzt)*
     - Rohe JSON-Einträge, die an die Konfiguration der Login-Antwort
       angehängt werden.
   * - ``DEBUG_BACKEND``
     - *(nicht gesetzt)*
     - ``1`` aktiviert die Debug-Ausgabe aller Anfragen und des
       Bus-Verkehrs auf stderr.

Die Variablen ``FCGI_WORKERS``, ``LONGPOLL_TIMEOUT_SEC`` und
``KNX_TX_MAX_PER_SEC`` müssen im Wesentlichen an die Anzahl der
gleichzeitigen Benutzer angepasst werden:

- Jeder Benutzer der CometVisu hält einen Long-Poll offen. Mit dem
  Standardwert von 20 Arbeitern sind 18 Long-Polls gleichzeitig möglich.
- ``KNX_TX_MAX_PER_SEC`` schützt den Bus vor zu vielen ausgehenden
  Telegrammen. Der KNX-Bus selbst wird oberhalb von etwa 20 bis 30
  Telegrammen pro Sekunde unzuverlässig.

Transport ``knxd``
~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Standard
     - Beschreibung
   * - ``KNXD_SOCKET``
     - ``/run/knx``
     - Pfad zum Unix-Socket des ``knxd``.

Der Cache für Gruppenadressen des ``knxd`` muss aktiviert sein, da das
Backend sonst die aktuellen Werte nicht vom Bus lesen kann. Das Backend verwendet
für alle Arbeiter genau **eine** Client-Verbindung des ``knxd``, die
Anzahl der Client-Verbindungen des ``knxd`` hängt also nicht mehr von
``FCGI_WORKERS`` ab. Sie muss nur Platz für diese Verbindung und
gegebenenfalls für Werkzeuge wie ``knxtool`` lassen.

Transport ``ip-tunnel``
~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Standard
     - Beschreibung
   * - ``KNX_IP_HOST``
     - *(erforderlich)*
     - Adresse der KNX IP-Schnittstelle bzw. des KNX IP-Routers.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP-UDP-Port.
   * - ``KNX_IP_LOCAL_ADDR``
     - *(Wahl des Betriebssystems)*
     - Lokale Adresse, die dem Gerät bekannt gegeben wird. Hilfreich, wenn
       das Backend hinter NAT oder auf einem Host mit mehreren Netzwerken
       läuft.
   * - ``KNX_IP_NAT``
     - ``0``
     - ``1`` aktiviert den NAT-Modus der Tunnel-Verbindung.
   * - ``KNX_IP_HEARTBEAT_SEC``
     - ``60``
     - Intervall der Verbindungsstatus-Abfrage (10 - 86400).
   * - ``KNX_IP_ACK_TIMEOUT_MS``
     - ``1000``
     - Zeitlimit, bevor ein Telegramm wiederholt wird (10 - 60000).
   * - ``KNX_IP_RETRIES``
     - ``3``
     - Anzahl der Wiederholungen pro Telegramm (1 - 10).

.. note::

    Eine KNX IP-Schnittstelle bietet üblicherweise nur eine kleine Anzahl
    an Tunnel-Verbindungen (oft 4). Eine davon wird von der CometVisu
    belegt. Andere ETS-Verbindungen müssen gegebenenfalls geschlossen
    werden oder das Gerät muss mehr Tunnel anbieten.

Transport ``ip-routing``
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Standard
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
       verwendet wird. Dies muss eine freie Adresse der Installation sein -
       ein Router weist die Adresse ``0.0.0`` zurück.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP-UDP-Port.

.. warning::

    Bei ``ip-routing`` kann jeder Teilnehmer der Multicast-Gruppe
    Telegramme in den Bus senden und den gesamten Bus-Verkehr mitlesen. Das
    Backend gehört deshalb nur in ein vertrauenswürdiges Netzwerksegment
    (oder ein eigenes VLAN).

.. note::

    Mit ``ip-routing`` ist die CometVisu ein vollwertiger
    Routing-Teilnehmer. Es sollte nur verwendet werden, wenn der KNX
    IP-Router entsprechend konfiguriert ist und keine andere Software auf
    demselben Host mit derselben physikalischen Adresse das Routing
    durchführt.

.. note::

    Mit ``cometvisu-knx-fcgi --discover`` werden alle KNXnet/IP-Geräte im
    lokalen Netzwerk mit ihrer physikalischen und ihrer Multicast-Adresse
    aufgelistet.

Diagnose
--------

Der Zustand des Backends lässt sich mit einer einfachen Anfrage prüfen:

.. code-block:: bash

    curl "http://localhost/cgi-bin/l"

Die Antwort enthält die Protokoll-Version, eine Session und - im normalen
Betrieb - die Version des Backends.

Solange die Bus-Verbindung verloren ist, hängt das Backend an die Antworten
von ``/r`` und ``/w`` einen Ausfall-Block an. Der Schlüssel dieses Blocks
ist ``knxd`` beim ``knxd``-Transport und ``bus`` bei den
KNXnet/IP-Transporten. Das aktuelle CometVisu-Frontend wertet nur den
Schlüssel ``knxd`` aus, daher wird ein Ausfall einer ``ip-tunnel``- oder
``ip-routing``-Verbindung noch nicht in der Oberfläche angezeigt - die
Werte ändern sich dann einfach nicht mehr.

Eine Debug-Ausgabe aller Anfragen und des Bus-Verkehrs wird mit
``DEBUG_BACKEND=1`` aktiviert:

.. code-block:: ini

    [Service]
    Environment=DEBUG_BACKEND=1

Aktualisierung von 1.x
----------------------

Version 2.0 ändert vier Dinge, die eine Installation nachvollziehen muss:

.. list-table::
   :header-rows: 1
   :widths: auto

   * - 1.x
     - 2.0
   * - Programm ``cometvisu-knxd-fcgi``
     - Programm ``cometvisu-knx-fcgi``
   * - Transport implizit ``knxd``
     - ``KNX_TRANSPORT`` muss explizit gesetzt werden
   * - Start über ``spawn-fcgi`` mit stdin/stdout
     - ``FCGI_SOCKET`` ist erforderlich, das Backend öffnet den Socket
       selbst
   * - ``/r`` und ``/w`` funktionierten ohne den Session-Parameter ``s``
     - beide benötigen die Session aus ``/l``

Installationen, die das Programm noch unter dem alten Namen starten, können
einen symbolischen Link ``cometvisu-knxd-fcgi -> cometvisu-knx-fcgi``
anlegen. Alles andere benötigt eine explizite Einstellung:
``KNX_TRANSPORT=knxd`` behält den alten Bus-Zugriff bei, und der Webserver
muss wie oben beschrieben von CGI auf den FastCGI-Socket umgestellt werden.

Docker-Container
----------------

Der offizielle CometVisu-Docker-Container enthält das FastCGI-Backend
bereits und konfiguriert es automatisch. Die Anschlussvarianten werden in
:doc:`../docker` beschrieben.
