.. _clock:

Das Clock Plugin
================

.. api-doc:: cv.plugins.Clock

Beschreibung
------------

Das Clock Plugin fügt der Visualisierung eine analoge Uhr zur Anzeige und
zum Ändern von Uhrzeiten hinzu.

Wird auch eine URL für das Pop-Up angegeben (diese kann gleich, aber auch
unterschiedlich zu der normalen URL sein), so zeigt das Widget nur die Uhrzeit
an und mit einem Klick auf das Widget öffnet sich eine weitere, größere Uhr
in einem Pop-Up. So kann leicht ein Optimum zwischen einer kompakten Anzeige
in der Visualisierung, aber auch einer komfortablen, großen Verstellung der Uhrzeit
erreicht werden.

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_enhanced" sleep="2000">
            <caption>Clock-Plugin Beispiel</caption>
            <data address="12/7/10">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_full.svg">
        <layout colspan="4" rowspan="5" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

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

Hier ein Beispielcode der das Clock Plugin aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="clock_pure_simple" sleep="2000">
            <caption>Clock-Plugin</caption>
            <data address="12/7/10">22:10:22</data>
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

* Die Zeiger und Elemente müssen in SVG-Gruppen mit entsprechender ID liegen:

  * ``Hour24`` - der 24h-Zeiger
  * ``Hour`` - der Stunden-Zeiger
  * ``Minute`` - der Minuten-Zeiger
  * ``Second`` - der Sekunden-Zeiger
  * ``AM`` - die Anzeige "AM" am Vormittag
  * ``PM`` - die Anzeige "PM" am Nachmittag
  * ``Digits`` - die numerische Anzeige der Uhrzeit
  * ``Hour24Group`` - das Ziffernblatt des 24h-Zeigers
* Die Zeiger werden durch eine Rotation um den Ursprung verstellt. Somit ist es
  in der Regel notwendig den Zeiger in eine weiteren SVG-Gruppe zu legen die
  diesen an die Zielposition verschiebt.
* Wenn in der Konfig-Datei Elemente ausgeblendet werden, so wird die
  entsprechende Ebene durch ein ``display="none"`` versteckt.
* Für einen einfachen Start kann das Ziffernblatt "Full" mit einem SVG Editor
  wie Inkscape angepasst werden.

Mit der CometVisu werden diese Ziffernblätter bereits mitgeliefert:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_full" sleep="2000">
            <caption>Ziffernblatt "Full": plugins/clock/clock_full.svg</caption>
            <data address="12/7/10">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_full.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_simple" sleep="2000">
            <caption>Ziffernblatt "Simple": plugins/clock/clock_simple.svg</caption>
            <data address="12/7/10">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_simple.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_pure" sleep="2000">
            <caption>Ziffernblatt "Pure": plugins/clock/clock_pure.svg</caption>
            <data address="12/7/10">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
