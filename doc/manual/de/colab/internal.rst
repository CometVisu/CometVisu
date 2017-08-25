********************************
Interne Abläufe in der CometVisu
********************************

Laden der Visu
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

.. _transportschichten::

Transportschichten
------------------

Die Transportschichten sind für die Kommunikation zwischen CometVisu und Backend ab dem Moment des erfolgreichen
Logins verantwortlich. Die wesentliche Aufgabe besteht also darin, Werte vom Backend abzufragen (lesende Anfrage)
und Wertänderungen zum Backend zu schicken (schreibende Anfrage).

Zur Zeit unterstützt die CometVisu zwei unterschiedliche Transportschichten:

* :ref:`Long polling <long-polling>`: wird vom Default-Backend benutzt
* :ref:`Server sent events <sse>`: wird vom openHAB-Backend benutzt

.. _long-polling:

Long polling
^^^^^^^^^^^^

Lesende Anfragen
****************

Beim Long polling stellt die CometVisu eine Verbindung zum Backend her und lässt diese offen bis das Backend Daten sendet.
Die initiale Anfrage nach alles Werten beantwortet das Backend sofort. Die darauffolgenden Anfragen werden beantwortet,
sobald ein neuer Wert eintrifft. Dieser wird dann an die CometVisu gesendet, worauf die Verbindung geschlossen und sofort
wieder aufgebaut wird.

.. HINT::

    Als Besonderheit ist hier noch der interne *Watchdog* zu nennen, welcher eine Long polling Anfrage automatisch
    beendet und neu started, wenn innerhalb von 60 Sekunden keine Antwort gekommen ist.

Schreibende Anfragen
********************

Wenn ein neuer Wert an das Backend gesendet werden soll (weil z.B. der Benutzer ein Widget bedient hat), wird
eine neue Anfrage, die vollkommen unabhängig von den lesenden Anfragen ist an das Backend gesendet.
Hier bestätigt das Backend auch lediglich das erfolgreiche Empfangen der Anfrage, neue Werte werden immer nur über
die lesenden Anfragen gesendet.

.. _sse:

Server sent events (SSE)
^^^^^^^^^^^^^^^^^^^^^^^^

Lesende Anfragen
****************

Bei *Server sent events* wird eine einmalige lesende Verbindung aufgebaut. Über diese schickt das Backend
initial einmalig alle angefragten Werte, danach nur noch geänderte Werte.

.. HINT::
    Der Browser kümmert sich automatisch um die Wiederherstellung der Verbindung bei Abbrüchen.
    Daher ist der interne *Watchdog* bei SSE in der Regel nicht zum Einsatz.

Der Browser muss diese Technologie jedoch überstützen.
Eine Übersicht der unterstützen Browser liefert `Caniuse <http://caniuse.com/eventsource/embed/>`__.

Schreibende Anfragen
********************

Wenn ein neuer Wert an das Backend gesendet werden soll (weil z.B. der Benutzer ein Widget bedient hat), wird
eine neue Anfrage, die vollkommen unabhängig von den lesenden Anfragen ist an das Backend gesendet.
Hier bestätigt das Backend auch lediglich das erfolgreiche Empfangen der Anfrage, neue Werte werden immer nur über
die lesenden Anfragen gesendet.