.. _clock:

Das Clock Plugin
================

.. api-doc:: cv.plugins.Clock

Beschreibung
------------

Das Clock Plugin fügt der Visualisierung eine analoge Uhr zur Anzeige und
zum Ändern von Uhrzeiten hinzu.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Clock-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Clock-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: clock

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: clock

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

XML Syntax
----------

Alternativ kann man für das Clock Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier ein Beispielcode der das Gauge Plugin aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="clock" sleep="2000">
            <caption>Clock-Plugin</caption>
            <data address="12/7/10">17:30:00</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

Eigene Ziffernblätter
---------------------

Über das Attribut ``src`` lassen sich eigene Ziffernblätter verwenden. Diese
müssen als SVG-Datei vorliegen und sich nach dem hier beschriebenen Standard
richten:

* Es sollten nur die Koordinaten zwischen 0 und 100 verwendet werden
* Die Mitte muss bei der Koordinate x=50 und y=50 liegen
* Der Stundenzeiger muss in einer SVG-Gruppe mit der ID ``Hour`` liegen
* Der Hotspot für die Verstellung des Stundenzeigers muss die ID ``HotSpotHour``
  haben
* Der Minutenzeiger muss in einer SVG-Gruppe mit der ID ``Minute`` liegen
* Der Hotspot für die Verstellung des Minutenzeigers muss die ID ``HotSpotMinute``
  haben
* Alle Zeiger müssen in der Date senkrecht nach oben zeigen, d.h. sie müssen
  die Uhrzeit 00:00:00 anzeigen.

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
