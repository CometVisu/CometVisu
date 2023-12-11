.. _tile-element-address:

Adressen - die Kommunikation mit dem Backend
============================================

.. api-doc:: cv.ui.structure.tile.elements.Address

Die meisten Widgets verwenden ein oder mehrere ``cv-address`` Elemente für die
Kommunikation mit dem Backend, welches darüber die entsprechenden Informationen
vom KNX-Bus, OpenHAB oder MQTT bereitstellt. Der Inhalt ist die Adresse selbst,
über die Attribute lässt sich das Verhalten des Widgets im Bezug auf die
Adresse einstellen:

.. parameter-information:: address tile

.. note::

    Im KNX Umfeld ist es üblich, dass nur eine Adresse mit ``write`` definiert
    wird und eine oder mehrere Adressen, die in der Regel nicht mit der
    ``write`` Adresse übereinstimmen, als ``read``.

    Dieses Prinzip ist damit genau das gleiche wie bei allen anderen KNX
    Komponenten bei denen über eine Adresse der Wert gesetzt wird und über eine
    andere die Rückmeldung erfolgt.

Backend-Attribut
----------------

In der Tile-Struktur können mehrere Backends definiert werden, mit denen die CometVisu gleichzeitig kommunizieren
kann. So kann zum Beispiel zusätzlich zu dem KNX-Backend eine Verbindung zu einem MQTT-Broker aufgenommen werden.
Es ist sogar möglich gleichzeitig mit mehreren Backends des selben Typs verbunden zu sein.
Jedes konfigurierte :ref:`Backend <tile-element-backend>` hat einen eindeutigen Namen, welcher als ``name``-Attribut festgelegt
wird. Wird dieses nicht angegeben entspricht der Name dem Wert des ``type``-Attributs.
Hat man nun also folgende 3 Backends definiert:

.. code:: xml

    <cv-backend type="openhab" username="..."/>
    <cv-backend name="si" default="true" type="simulated"/>
    <cv-backend name="mqtt-broker" type="mqtt" uri="ws://mqtt:9001/"/>

kann man diese in den ``<cv-address>``-Elementen auf folgende Weise benutzen:

.. code:: xml

    <!-- Default backend -->
    <cv-address transform="DPT:1001">1/0/0</cv-address>

    <!-- openHAB backend -->
    <cv-address transform="OH:switch" backend="openhab">Switch_Item</cv-address>

    <!-- MQTT backend -->
    <cv-address transform="MQTT:number" backend="mqtt-broker">/topic/baz</cv-address>


.. _tile-element-address-target:

Target-Attribut
---------------

Die möglichen Werte und deren Auswirkungen beim ``target``-Attribut hängen immer von dem Element ab in
dem das ``<cv-address>``-Element benutzt wird. Daher werden hier nur einige Beispiele genannt die in allen
Widgets/Komponenten funktionieren.

Sichtbarkeit steuern
.....................

Es gibt zwei Möglichkeiten die Sichtbarkeit zu beeinflussen:

* ``target="show-hide"``: Macht das Widget unsichtbar ändert aber nicht das Layout, es entsteht eine leere Fläche
* ``target="show-exclude"``: Entfernt as Widget aus dem Layout, es entsteht keine leere Fläche

In diesem Beispiel würde die komplette Kachel aus dem Layout gelöscht werden, wenn das Backend den Wert 0 auf
der Adresse sendet. Wenn eine 1 gesendet wird, wird die Kachel wieder hinzugefügt und sichtbar.

.. code:: xml

    <cv-widget>
        <cv-tile>
            <cv-address transform="DPT:1.001" mode="read" target="show-exclude">1/0/0</cv-address>
        </cv-tile>
    <cv-widget>

Widgets deaktivieren
....................

In diesem Beispiel würde die komplette Kachel inkl. aller Bedienelemente darin deaktiviert und reagiert dann
nicht mehr auf Interaktionen des Benutzers wie z.B. Mausklicks.

.. code:: xml

    <cv-widget>
        <cv-tile>
            <cv-address transform="DPT:1.001" mode="read" target="enabled">1/0/0</cv-address>
        </cv-tile>
    </cv-widget>


Transform
---------

Bei den für das jeweilige Backend spezifischen gültigen Werte für ``transform``
wird der entsprechende "Namensraum" per Doppelpunkt getrennt vor den jeweiligen
Datentyp geschrieben. Die für das jeweilige Backend gültigen Werte sind:

KNX
...

.. backend-transform:: DPT

OpenHab
.......

.. backend-transform:: OH

ioBroker
........

.. backend-transform:: IOB

MQTT
....

.. backend-transform:: MQTT

Über weitere Attribute im ``<address>``-Element kann die Kommunikation mit MQTT
weiter spezifiziert werden:

================ ===============================================================
``selector``     Der JSON-Pfad, wenn das Kommunikationsobjekt als JSON
                 übertragen wird.
``retain``       Setzt bei ``true`` das Retain-Flag, so dass die Daten auch
                 neuen Kommunikationsteilnehmern am MQTT sofort bereit gestellt
                 werden.
``qos``          Setzt den QOS-Wert.
``ignore-error`` Ignoriert Konvertierungsfehler, wenn auf dem MQTT Daten
                 gesendet werden, die z.B. nicht zum ``selector`` passen.
================ ===============================================================

Beispiel:
^^^^^^^^^

Um einen numerischen Wert am Topic ``/topic/baz`` zu adressieren, der in einem
JSON wie

.. code-block:: json

    {
      "foo": [
        {"bar": 0}
        {"bar": 1}
      ]
    }

übertragen wird, müsste das ``<cv-address>``-Element aussehen wie:

.. code-block:: xml

     <cv-address transform="MQTT:number" selector="foo[1].bar" retain="true">/topic/baz</cv-address>

Roh-Werte / Test:
.................

Die ``transform``-Werte ohne Namensraum dienen im Wesentlichen nur der
Entwicklung der CometVisu, können aber in Spezialfällen auch im Produktivbetrieb
relevant sein:

.. backend-transform::
