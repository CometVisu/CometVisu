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


Verbindung zum KNXD / EIBD
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


Verbindung zu ioBroker
----------------------

.. code:: xml

    <cv-backend type="iobroker" uri="ws://iobroker-host:8081"/>

Die ioBroker Instanz muss Websocket Verbindungen unterstützen, damit die CometVisu damit kommunizieren kann.
Sofern die ioBroker Instanz Zugangsdaten benötigt können diese über die ``username`` und ``password`` Attribute angegeben werden.


.. _tile-backend-system:

Zugriff auf interne Stati und Funktionen
----------------------------------------

Ein spezielles Backend, welches immer vorhanden ist und nicht extra konfiguriert werden muss, ist das System-Backend.

Backend-Verbindungen
....................

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

Browser-Aktionen
................

Als weitere Alternative kann ein Neu-laden des Browserfensters angestoßen werden.

.. code-block:: xml

    <cv-switch>
        <cv-address slot="address" backend="system" mode="write" value="reload">browser</cv-address>
        <cv-icon slot="icon">ri-refresh-line</cv-icon>
        <span slot="primaryLabel">Neu laden</span>
    </cv-switch>

Alternativ kann mit ``value="forced-reload"`` sichergestellt werden, dass die CometVisu Dateien wirklich neu geladen
werden und der Browser-Cache umgangen wird.

Seitennavigation
................

Ebenso bietet diese Backend eine Alternative zu den aus der Pure-Struktur bekannten Pagejumps, mit denen eine
Navigation zu einer bestimmten Seite möglich ist.

.. code-block:: xml

    <cv-switch styling="tile-button">
      <cv-address slot="address" backend="system" value="floorplan">nav:current-page</cv-address>
      <cv-icon slot="icon">ri-external-link-line</cv-icon>
      <span slot="primaryLabel">Räume</span>
    </cv-switch>

Beim Klick auf dieses Widget wird die Seite mit der id "floorplan" (``<page id="floorplan">``) geöffnet.

HTTP-Requests auslösen
......................

Es können einfache HTTP Requests ausgelöst werden, um z.B. Aktionen in externen Systemen zu starten.

.. code-block:: xml

    <cv-button size="small" style="position: absolute; top: 0; right: 0; color: red">
      <cv-address mode="write" backend="system">https://somewhere/delete?this</cv-address>
      <cv-icon class="ri-delete-bin-line"/>
    </cv-button>

Oft kommt es beim Aufrufen von URLs von externen Webseiten zu einen CORS Fehler, da das Aufrufen von externen Seiten
ein Sicherheitsrisiko darstellt. Dies kann umgangen werden, indem die interne Proxy-Funktion der CometVisu benutzt wird.
Dazu müssen die aufzurufenden URLs mit ":proxy" erweitert werden. Für das o.g. Beispiel würde aus
``https://somewhere/delete?this`` -> ``https:proxy://somewhere/delete?this``.


Light- /Dark-Theme
..................

Sofern das Design Light & Dark-Themes unterstützt, kann über das System Backend auch das Theme gewechselt werden.

.. code-block:: xml

    <cv-meta>
        <cv-styling name="LightTheme">
          <entry value="light">active</entry>
          <entry value="dark">inactive</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch on-value="light" off-value="dark" mapping="" styling="LightTheme">
      <cv-address slot="address" backend="system">theme</cv-address>
      <cv-icon slot="icon">ri-sun-line</cv-icon>
      <span slot="primaryLabel">Light-Theme</span>
    </cv-switch>


Interne Stati
.............

Man kann das System Backend auch benutzen um interne Stati zu schreiben und damit Aktionen innerhalb der
Visualisierung per Mausklick auszulösen. Damit kann man sich z.B. einen Button erzeugen der beim Klick einen Refresh
eines :ref:`Bilds <tile-component-image>` oder eines :ref:`Listen-Modells <tile-component-list>` auslöst.

.. code-block:: xml

    <cv-button>
      <cv-address mode="write" backend="system">state:refresh-image</cv-address>
      <cv-icon class="ri-refresh-line"/>
    </cv-button>

    <cv-image src="http://webcam/snapshot.jpeg">
        <cv-address mode="read" target="refresh" backend="system">state:refresh-image</cv-address>
    </cv-image>
