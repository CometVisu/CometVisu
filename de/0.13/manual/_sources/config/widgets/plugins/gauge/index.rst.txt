.. replaces:: CometVisu/0.8.x/widgets/gauge/de/

.. _gauge:

Das Gauge Plugin
================

.. api-doc:: cv.plugins.Gauge

Beschreibung
------------

Das Gauge Plugin fügt der Visualisierung ein Anzeigeinstrument hinzu.
Es stehen verschiedene Instrumente zur Auswahl.
Die CometVisu beinhaltet eine Demo-Config für das Gauge-Plugin, welche eine Übersicht über
die verschiedenen Elemente liefert. Geladen werden kann sie über folgenden Link:

``http://<url-zur-cometvisu>/?config=gauge&testMode=1``

über die Slider kann man dann verschiedenen Werte einstellen und sehen, wie diese angezeigt werden.

.. figure:: _static/DisplayElements_GaugePlugin.png

    Beispiele für Anzeigeelemente des Gauge-Plugins


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Gauge-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Gauge-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: gauge

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge type="DisplaySingle" width="120" height="50" lcdDecimals="1" unitStringVisible= "true" unitString="°C">
        <layout colspan="3"/>
        <address transform="DPT:9" mode="read" variant="setValue">12/7/90</address>
    </gauge>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: gauge

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge type="DisplaySingle" width="120" height="50" lcdDecimals="1" unitStringVisible= "true" unitString="°C">
        <layout colspan="3"/>
        <address transform="DPT:9" mode="read" variant="setValue">12/7/90</address>
    </gauge>

XML Syntax
----------

Alternativ kann man für das Gauge Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier ein Beispielcode der das Gauge Plugin aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="gauge_complex" sleep="2000">
            <caption>Gauge-Plugin</caption>
            <data address="12/7/90">40</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge type="RadialBargraph" titleString="Title" unitString="Unit" minValue="0" maxValue="100" size="200" threshold="30" lcdVisible="true" trendVisible="true" lcdDecimals="2" thresholdRising="true" ledVisible="true" background="DARK_GRAY" framedesign="BLACK_METAL" valueColor="RED">
        <layout colspan="2" rowspan="4"/>
        <address transform="DPT:9" mode="read">12/7/90</address>
        <address transform="DPT:9" mode="read" variant="trend">12/7/92</address>
    </gauge>

Weiteres einfacheres Beispiel:

.. widget-example::

    <settings>
        <screenshot name="gauge_simple">
            <caption>Gauge-Plugin, einfach</caption>
            <data address="12/7/90" type="float">21.5</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge type="DisplaySingle" width="120" height="50" lcdDecimals="1" unitStringVisible="true" unitString="°C">
        <layout colspan="2"/>
        <address transform="DPT:9" mode="read" variant="setValue">12/7/90</address>
    </gauge>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.