.. _tile-element-backend:

Konfiguration der Backend Verbindung
====================================

.. api-doc:: cv.ui.structure.tile.elements.Backend

Die Tile-Struktur unterstützt die gleichzeitige Verbindung zu beliebig vielen Backends. So ist es z.B. möglich
neben dem Default-Backend eine Verbindung zu einem MQTT-Broker aufzubauen und dieses parallel zu nutzen.

.. parameter-information:: cv-backend tile

Es müssen ein paar Regeln beachtet werden, wenn mehrere Backends benutzt werden:

1. Es muss mindestens ein Backend in der Konfigurationsdatei definiert werden ansonsten findet keine Kommunikation statt.
2. Es darf es keine zwei cv-backend Element mit dem gleichen Namen geben. Der Standard-Name eines Backend ist "main",
   d.h. das ``<cv-backend>``-Element ohne ``name``-Attribut erhält den Namen "main" (und es darf daher auch nur eine cv-backend
   Element ohne Namen geben)

**Wie der Name eines Backend bestimmt wird**

Sofern kein ``name``-Attribut existiert wird der Name des Backends nach folgenden Regeln bestimmt:
Der oberste `cv-backend``-Eintrag ohne ``name``-Attribut erhält den Namen "main", bei den folgenden Einträgen
entspricht der Name dem Wert des ``type``-Attributs.

.. HINT::

    Der Name ``system`` ist für das interne :ref:`System-Backend <tile-backend-system>` reserviert und darf nicht benutzt werden.

Beispiel für die gleichzeitige Nutzung des KNXD und MQTT Backends:

.. code:: xml

    <cv-backend type="default" uri="/cgi-bin/l" />
    <cv-backend type="mqtt" uri="ws://mqtt:9001/" />

In diesem Fall nutzen alle ``cv-address``-Elemente ohne ``name``-Attribut (oder mit ``name="main"`` das default-Backend
und alle ``cv-address``-Elemente ``name="mqtt"``.


Verbindung zum KNXD / EIDB
--------------------------

.. code:: xml

    <cv-backend type="default" />

Der KNXD/EIBD benötigt bisher keine Zugangsdaten, daher werden die Attribute ``username`` und ``password`` hier nicht
benötigt. Sofern man die CometVisu in dem offiziellen Docker Container benutzt muss man auch das ``uri``-Attribut
nicht angeben, da dieser Wert dort anderweitig bestimmt wird.

Verbindung zu openHAB
---------------------

.. code:: xml

    <cv-backend type="openhab" username="<access-token>"/>

Für das openHAB Backend wird ein API-Token benötigt, dieses kann man sich in openHAB UI selbst erzeugen:
https://www.openhab.org/docs/configuration/apitokens.html.
Sofern man die CometVisu in dem offiziellen Docker Container benutzt muss man auch das ``uri``-Attribut
nicht angeben, da dieser Wert dort anderweitig bestimmt wird.
Wenn man die CometVisu mit einem eigenen Webserver ausliefert muss dieser als Proxy für die Verbindung
zum openHAB-Server dienen. Wird z.B. eine Apache-HTTP-Server benutzt so muss folgendes in dessen
Konfigurationsdatei eingetragen werden:

.. code-block:: apache

    ProxyPass /rest http://openhab:8080/rest
    ProxyPassReverse http://openhab:8888/rest /rest

Für die Verbindung zu openHAB muss dann folgender Eintrag benutzt werden.

.. code:: xml

    <cv-backend type="openhab" username="<access-token>" uri="/rest/" />


Verbindung zu einem MQTT-Broker
-------------------------------

.. code:: xml

    <cv-backend type="mqtt" uri="ws://mqtt:9001/"/>

Der MQTT-Broker muss Websocket Verbindungen unterstützen, damit die CometVisu damit kommunizieren kann.
Sofern der Broker Zugangsdaten benötigt können diese über die ``username`` und ``password`` Attribute angegeben werden.


.. _tile-backend-system:

Zugriff auf interne Stati und Funktionen
----------------------------------------

Ein spezielles Backend, welches immer vorhanden ist und nicht extra konfiguriert werden muss, ist das System-Backend.

Mit diesem Backend kann man sich z.B. einen Schalter bauen der den Verbindungsstatus zu einem Backend anzeigt und
beim Klick darauf die Verbindung neu startet.

.. code-block:: xml

    <cv-meta>
        <cv-mapping name="Connected">
            <entry value="0">ri-link-unlink-m</entry>
            <entry value="1">ri-link-m</entry>
        </cv-mapping>
        <cv-styling name="RedActive">
            <entry value="0">red</entry>
            <entry value="1">active</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch mapping="Connected" styling="RedActive">
        <cv-address slot="address" backend="system" mode="write" value="restart">backend:main</cv-address>
        <cv-address slot="address" backend="system" mode="read">backend:main:connected</cv-address>
        <span slot="primaryLabel">Verbindung</span>
        <span slot="secondaryLabel">openHAB</span>
    </cv-switch>

Als weitere Alternative kann ein Neu-laden des Browserfensters angestoßen werden.

.. code-block:: xml

    <cv-switch>
        <cv-address slot="address" backend="system" mode="write" value="reload">browser</cv-address>
        <cv-icon slot="icon">ri-refresh-line</cv-icon>
        <span slot="primaryLabel">Neu laden</span>
    </cv-switch>
