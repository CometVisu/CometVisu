****************************
Informationen für Entwickler
****************************

Diese Seite liefert eine Einführung in die internen Zusammenhänge und Hintergründe der CometVisu und richtet sich in
erster Linie an Entwickler.

Grundlagen der Software
-----------------------

Die CometVisu ist seit Version 0.11 auf dem `Qooxdoo-Framework <http://www.qooxdoo.org>`__ aufgebaut.
Das Qooxdoo Framework bietet ein eigenes Objekt-Orientiertes Klassensystem (inkl. erweiterten Features wie: Interfaces
Mixins, Abstakte Klasse, Singletons, einfache Type-Checks für Properties, usw.) mit dem sich ein komplexes und
dennoch strukturiertes Software-System aufbauen lässt.

Ebenso liefert es eine vollständige Toolchain (Qooxdoo-Generator) mit, die Klassenabhängigkeiten automatisch auflöst und daraus
entweder Entwickler Versionen (source-Version) oder Releases (build-Versionen) baut.

Unterschiede in der Javascript-Unterstützung der verschiedenen Browser werden automatisch ausgeglichen und der
Generator erstellt für die Releases unterschiedliche Build-Versionen für die 4 wichtigsten Browser-Engines.

Weitere Qooxdoo-Features die die CometVisu nutzt:

* `Parts <http://www.qooxdoo.org/current/pages/development/parts_using.html>`__:
    Teile des Codes, die nicht immer benötigt werden, werden in *Parts* ausgelagert, die bei Bedarf nachgeladen werden.
    Die CometVisu nutzt dies für Plugins und die Widget-Pakete (Es gibt zwar momentan nur das *Pure*-Widgetpaket,
    weitere sind jedoch möglich).

Da die CometVisu eigene Widgets liefert inkl. Layout und CSS-basiertem Design, wird der komplette UI Teil von
Qooxdoo nicht benutzt. Dieser liefert eigene Layoutmanager und Widgets mit nicht CSS-basiertem Design.
Es wäre jedoch möglich ein neues auf Qooxdoo-UI basierendes Widgetpaket zu implementieren, welches parallel nutzbar ist.

Startverhalten
--------------

Der Ablauf des Ladens der Visu läuft nach dem CometVisu-Protokoll in folgenden Schritten:

.. uml::
    :caption: Start-Kommunikation zwischen CometVisu und Backend
    :align: center

    autonumber

    CometVisu -> Backend: Lade Konfigurationsdatei
    Backend -> CometVisu: Konfigurationsdatei mit optionalen Headern schicken
    CometVisu -> Backend: Login
    Backend -> CometVisu: Bestätigung des Logins mit optionaler Backend-Konfiguration
    CometVisu -> Backend: Lese Werte vom Backend


#. Laden der Konfigurationsdatei ``visu_config*.xml``
#. Der Server kann diese Datei mit 2 optionalen Headern ausliefern, die der CometVisu weitere Informationen
   über das Backend zu liefern:

    * ``X-CometVisu-Backend-LoginUrl``: Pfad unter der der Client das Login ausführen kann.
    * ``X-CometVisu-Backend-Name``: Der Name des zu verwendenden Backends.
#. Die CometVisu authentifiziert sich beim Backend (zur Zeit implementiert kein Backend eine echte Authenfizierung)
#. Das Backend bestätigt die Authentifizierung und liefert Informationen als JSON zurück:

    ``v``: Ist die Protokollversion

    ``s``: Die Session ID

    ``c``: Die optionale Backend-Konfiguration


    .. code-block:: json

        {
            "v":"0.0.1",
            "s":"0",
            "c": {
                "name":"openhab2",
                "transport":"sse",
                "baseURL":"/rest/cv/",
                "resources": {
                    "read":"r",
                    "rrd":"rrdfetch",
                    "write":"w"
                }
            }
        }
#. Die CometVisu fängt an die Werte vom Backend abzufragen, zunächst initial alle benötigten Werten und im
   zweiten Schritt wird nur noch auf Änderungen der Werte gelauscht.

Transportschichten
------------------

Die Transportschichten sind für die Kommunikation zwischen CometVisu und Backend ab dem Moment des erfolgreichen
Logins verantwortlich. Die wesentliche Aufgabe besteht also darin, Werte vom Backend abzufragen (lesende Anfrage)
und Wertänderungen zum Backend zu schicken (schreibende Anfrage).

Zur Zeit unterstützt die CometVisu zwei unterschiedliche Transportschichten:

* :ref:`Long polling <long-polling>`: wird vom Default-Backend benutzt
* :ref:`Server sent events <sse>`: wird vom openHAB-Backend benutzt

.. toctree::

    transport/long-polling
    transport/sse

Caching
-------

Die CometVisu nutzt eigene Caching Mechanismen um das initiale Laden zu beschleunigen.
Die meiste Zeit wird benötigt um die XML-Konfigurationsdatei vom Server zu laden, dann zu parsen und daraus
den HTML Code zu generieren der die tatsächliche Visu im Browser darstellt.

Da sich der Inhalt der Konfigurationsdatei in der Regel selten ändert, liegt es Nahe diese nicht jedesmal erneut zu laden und
zu parsen. Daher wird nach dem ersten Parsen der erzeugte HTML und die internen Datenstrukturen im *LocalStorage* des Browsers
abgespeichert. Beim nächsten Laden der Visu werden diese Daten ausgelesen und die Oberfläche sofort dargestellt.
Erst danach fragt die Visu die Konfigurationsdatei vom Server ab und vergleicht ob es Änderungen gegeben hat.
Sofern dies nicht der Fall ist wird die gerade geladenen Datei verworfen, andernfalls der Parse und Speicher-Vorgang erneut
durchgeführt und die Daten aus dem Cache werden verworfen.

Das Caching kann durch den URL-Parameter :ref:`enableCache` beeinflusst werden.


Der NotificationRouter
----------------------

Es gibt einen internen ``NotificationRouter`` der für verschiedene Zwecke benutzt wird.
Hauptfunktion dieses Routers ist es Nachrichten entgegenzunehmen und an den richtigen
Empfänger weiterzuleiten. Mögliche Empfänger sind z.B. das ``NotificationCenter`` und der
``PopupHandler``. Beide kümmern sich dann um die Anzeige der Nachricht, entweder in der Nachrichtenzentrale (die am
rechten Rand eingeblendet wird und eine Liste von Nachrichten anzeigt) oder als Popup.

Eine Nachricht hat immer ein *Topic*, welches der thematischen Zuordnung dient, einen Titel, Text und diverse
Konfigurations-Optionen.

Folgenden *Topics* werden zur Zeit genutzt:

* ``cv.error``: Allgemeine Fehler
* ``cv.config.error``: Fehler die beim Einlesen der Config-Datei aufgetreten sind
* ``cv.state.*``: Namespace für alle in den :ref:`Benachrichtigungen <notifications>` benutzten Nachrichten

Ein Nachrichtenempfänger (``NotificationHandler``) kann sich nun für eines oder mehrere solcher Topics registrieren:

.. code-block:: javascript

    cv.core.notifications.Router.getInstance().registerMessageHandler(this, {
        'cv.config.error': {
            type: "error",
            icon: "message_attention"
        },
        'cv.error': {
           type: "error",
           icon: "message_attention"
        }
    });


Auch Wildcards sind möglich:

.. code-block:: javascript

    cv.core.notifications.Router.getInstance().registerMessageHandler(this, {
        'cv.*': {}
    });


Fehlerbehandlung
----------------

Der NotificationRouter wird auch dazu genutzt alle nicht abgefangenen Fehler zur Laufzeit der Visu anzuzeigen.
Diese Fehler werden als Popup angezeigt und ermöglichen es dem Nutzer direkt ein Issue auf Github mit vorausgefüllten
Formular mit den wichtigsten Informationen zu eröffnen. Diese Funktion ist nur
in den Build-Versionen aktiv (also auch in den Releases), während der Entwicklung werden die Fehler weiterhin
auf der Javascript-Konsole des Browsers angezeigt.

Weitere Fehler werden, je nach Art, entweder als Popup oder als Nachricht in der Nachrichtenzentrale angezeigt.
Als ein wichtiges Beispiel wären hier noch Verbindungsprobleme mit dem Backend zu nennen. Diese werden angezeigt,
solange das Problem besteht und verschwinden automatisch, sobald das Problem behoben wurde.


.. figure:: _static/noticenter_hidden.png
    :scale: 70%
    :align: center

    Geschlossene Nachrichtenzentrale mit einer kritischen Fehlermeldung

.. figure:: _static/NotificationCenter.png
    :scale: 70%
    :align: center

    Geöffnete Nachrichtenzentrale mit einer kritischen Fehlermeldung

Der ``NotificationRouter`` wird ebenfalls für die :ref:`Benachrichtigungen <notifications>` genutzt.
