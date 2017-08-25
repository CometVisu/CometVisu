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
Sofern dies nicht der Fall ist wird die gerade geladenen Datei verworfen, andernfalls der parse und speicher-Vorgang erneut
durchgeführt und die Daten aus dem Cache werden verworfen.

Das Caching kann durch den URL-Parameter :ref:`enableCache` beeinflusst werden.


Fehlerbehandlung
----------------

.. TODO::

    NotificationRouter, -Center, GlobalError-handling