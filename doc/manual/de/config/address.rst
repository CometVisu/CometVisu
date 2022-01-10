.. _address:

Adressen - die Kommunikation mit dem Backend
============================================

Die meisten Widgets verwenden ein oder mehrere ``address`` Elemente für die
Kommunikation mit dem Backend, welches darüber die ensprechenden Informationen
vom KNX-Bus, OpenHAB oder MQTT bereitstellt. Der Inhalt ist die Adresse selbst,
über die Attribute lässt sich das Verhalten des Widgets im Bezug auf die
Adresse einstellen:

============= ==================================================================
``transform`` Legt den Datentyp im Backend fest, z.B. ``DPT:1.001`` für den KNX
              Datenpunkttyp 1.001
``mode``      Legt fest, ob auf dieser Adresse nur gehocht (``read``),
              geschrieben (``write``) oder beides (``readwrite``) werden soll
``variant``   Optional und Widget spezifisch: manche Widgets können mehrere
              Adressen gleichzeitig benötigen, z.B. um für eine Farbe den roten,
              grünen und blauen Kanal unterscheiden zu können
============= ==================================================================

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

MQTT
....

.. backend-transform:: MQTT

Roh-Werte / Test:
.................

Die ``transform``-Werte ohne Namensraum dienen im Wesentlichen nur der
Entwicklung der CometVisu, können aber in Spezialfällen auch im Produktivbetrieb
relevant sein:

.. backend-transform::

Mode
----

.. note::

    Im KNX Umfeld ist es üblich, dass nur eine Adresse mit ``write`` definiert
    wird und eine oder mehrere Adressen, die in der Regel nicht mit der
    ``write`` Adresse übereinstimmen, als ``read``.

    Dieses Prinzip ist damit genau das gleiche wie bei allen anderen KNX
    Komponenten bei denen übe eine Addresse der Wert gesetzt wird und über eine
    andere die Rückmeldung erfolgt.