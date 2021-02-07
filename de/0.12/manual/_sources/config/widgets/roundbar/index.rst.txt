.. _roundbar:

Das Roundbar Widget
===================

.. api-doc:: Roundbar

Beschreibung
------------

Das Roundbar Widget fügt der Visualisierung einen oder mehrere dynamische Indikatoren hinzu, in Form eines runden
Balkens und/oder Zeigers. Dies ermöglicht die grafische Anzeige von Werten von Gruppenadressen.

Das Roundbar Widget ist sowohl mit sehr einfacher Parametrierung nutzbar, als auch sehr flexibel an die jeweiligen
Anforderungen anpassbar.

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="roundbar_simple" sleep="400">
            <caption>Beispiel Roundbar Widget</caption>
            <data address="3/3/1">63.3</data>
        </screenshot>
    </settings>
    <roundbar>
        <layout colspan="2" rowspan="2"/>
        <address transform="DPT:9.001" mode="read">3/3/1</address>
    </roundbar>

Die Darstellung kann jedoch auch vielen Details angepasst werden:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="roundbar_complex" sleep="400">
            <caption>Beispiel für komplexes Roundbar Widgets</caption>
            <data address="3/6/0">87.4</data>
            <data address="3/6/1">78.1</data>
            <data address="3/6/2">63.6</data>
            <data address="3/6/3">44.0</data>
        </screenshot>
    </settings>
    <group nowidget="true">
        <layout rowspan="2" colspan="6"/>
        <roundbar format="%.1f °C" fontsize="25" linespace="26">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="50" width="50">3/6/3</address>
          <address transform="DPT:9.001" style="fill:#3f20ff; stroke:#3f20ff" radius="50">3/6/0</address>
          <address transform="DPT:9.001" style="fill:#9f009f; stroke:#9f009f">3/6/2</address>
          <address transform="DPT:9.001" style="fill:#ff003f; stroke:#ff003f">3/6/1</address>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="100" thickness="10">3/6/3</address>
        </roundbar>
        <roundbar preset="B" format="%.1f" axiswidth="2" axiscolor="white" startarrow="0" endarrow="0" fontsize="30" textx="52" texty="-15">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001" style="fill:#555; stroke:none" radius="0" width="49">3/6/0</address>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="52" width="-52" thickness="5">3/6/0</address>
        </roundbar>
        <roundbar preset="bridge" axiswidth="10" axiscolor="#555" format="%.1f" start="190" end="-10" min="0" max="100"
              labels=",roundmiddle:30,70,30.0;70,,70.0;85,,85.0;center,horizontal:-6,57,0.0;106,,100.0"
              labelstyle="font-size:60%"
              bboxgrow="12;10"
              ranges="0...30,63,3,yellow;30...70,63,3,green;70...85,63,3,yellow;85...100,63,3,red" texty="10">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001">3/6/2</address>
        </roundbar>
    </group>

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Roundbar-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Roundbar-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: roundbar

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <roundbar preset="bridge" format="%.1f°C">
          <address transform="DPT:9.001" mode="read">3/6/0</address>
        </roundbar>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: roundbar

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <roundbar>
          <layout colspan="2" rowspan="2"/>
          <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

XML Syntax minimal
------------------

Alternativ kann man für das Roundbar Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode, der das Roundbar Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="roundbar_minimal" sleep="400">
                <caption>Roundbar, einfaches Beispiel</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar>
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Bestandteile
------------

Das Roundbar-Widget besteht aus vielen verschiednen Bestandteilen, die teilweise optional sind und auf
verschiedene Arten konfiguriert werden können. Grundsätzlich wird für die Realisierung in die Visu-Seite
ein SVG-Block eingebunden, dessen Darstellung über CSS-Regeln angepasst werden kann (siehe auch
:ref:`"Vorhandenes Design verändern" <custom_cssrules>`).

Indikatoren
^^^^^^^^^^^

Der offensichtlichste Bestandteil ist der Indikator, der als gebogener Balken oder als Zeiger ausgeführt sein kann.
Ein Roundbar Widget kann auch mehrere Indikatoren gleichzeitig enthalten.

.. widget-example::

        <settings>
            <screenshot name="roundbar_indicators" sleep="400">
                <caption>Balken und Zeiger</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <group nowidget="true">
            <layout colspan="4" rowspan="2"/>
            <roundbar>
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar format="%.1f">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" type="pointer" radius="50" width="-50" thickness="3" mode="read">3/3/1</address>
            </roundbar>
        </group>

Markierungen
^^^^^^^^^^^^

Um die Skala einzuteilen können Markierungen gesetzt werden. Die "großen" (major) Markierungen können frei auf die
relevanten Werte gesetzt werden, die "kleinen" (minor) werden gleichmäßig verteilt.

.. widget-example::

        <settings>
            <screenshot name="roundbar_marking" sleep="400">
                <caption>Große und kleine Markierungen</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar majorradius="35" majorwidth="15" majorposition="0;20;40;60;80;100" minorradius="45" minorwidth="5" minorspacing="5" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Beschriftungen
^^^^^^^^^^^^^^

Die Achse kann auf verschiedene Arten beschriftet werden. Hierzu werden im Attribut ``labels`` durch ein Semikolon
getrennt die Werte aufgeführt:

  ``labels="0;20;40;80;100"``

Jeder Wert kann einen individuellen Radius bekommen, so wie kann der anzuzeigende Text definiert werden:

  ``Wert,Radius``

  ``Wert,Radius,Text``

Außerdem kann die Position (``outside``, ``center`` und ``inside``), so wie Orientierung
(``horizontal``, ``parallel``, ``perpendicular``, ``roundstart``, ``roundmiddle`` und ``roundend``) gewählt werden
und per Doppelpunkt vor den Wert gestellt werden:

  ``Position:Wert``

  ``,Orientierung:Wert``

  ``Position,Orientierung:Wert``

Es ist ausreichend die Position, die Orientierung oder aber auch den Radius vor dem ersten Wert aufzuführen, alle
folgenden Werte übernehmen dann diese Eigenschaften. Für spezielle Effekte können diese Eigenschaften auch mehrfach
gewechselt werden.

.. widget-example::

        <settings>
            <screenshot name="roundbar_labels" sleep="400">
                <caption>Beschriftungen</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar labels="inside:0,44;25;50;75;100" majorradius="45" majorwidth="5" majorposition="0;25;50;75;100"
            minorradius="48" minorwidth="2" minorspacing="5" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Wertebereiche
^^^^^^^^^^^^^

Um schnell einen Überblick über den aktuellen Wert zu bekommen können Wertebereiche farbig hinterlegt werden. Hierzu
muss dem ``ranges`` Attribut eine durch ein Semikolon getrennte Liste der Wertebereich-Definitionen übergeben werden.

Jeder Wertebereich selbst besteht aus einer durch ein Komma getrennten Liste:

  ``Wert,Radius,Breite,Farbe``

  ``Start...Ende,Radius,Breite,Farbe``

Beispiel:

  ``ranges="0...70,63,3,green;70...100,63,3,red;70,60,9,#ff0"``

Hier werden drei Bereiche festgelegt. Zuerst von den Werten 0 bis 70 ein grüner Bogen mit dem Radius 63 und der
Breite 3. Dann ein roter Bogen von 70 bis 100, auch mit Radius 63 und Breite 3. Zu letzt wird über alles ein
Strich bei Wert 70 gemalt, der von Radius 60 für 9 Einheiten nach außen geht und die Farbe ``#ff0``, also ein
sattes Gelb, besitzt.

.. widget-example::

        <settings>
            <screenshot name="roundbar_ranges" sleep="400">
                <caption>Wertebereiche</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar ranges="0...70,63,3,green;70...100,63,3,red;70,60,9,#ff0" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Tipps
-----

Presets
^^^^^^^

Um die Konfiguration zu erleichtern gibt es vorgefertigte Designs die verwendet werden können. Alle Eigenschaften
eines Presetzt können durch die Werte aus der Konfiguration übersteuert werden.

.. widget-example::

        <settings>
            <screenshot name="roundbar_presets" sleep="400">
                <caption>Preset "A", "B" und "bridge"</caption>
                <data address="3/3/1">35.8</data>
            </screenshot>
        </settings>
        <group nowidget="true">
            <roundbar preset="A">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar preset="B">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar preset="bridge">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
        </group>

Debug-Modus
^^^^^^^^^^^

Das Roundbar-Widget versucht den verfügbaren Platz maximal auszufüllen. Hierzu muss aber bereits während der
Erzeugung der Visu-Seite bekannt sein wie groß der Inhalt des Widget werden kann. Gerade bei den Text-Bestandteilen,
wie den Labeln, ist dies jedoch nicht automatisiert möglich.

Hier kann über das Attribut ``bboxgrow`` dem automatisch bestimmten Wert noch ein zusätzlicher Abstand hinzugefügt
werden. Wird hier eine Zahl angegeben, so wird diese auf allen Seiten gleichzeitig hinzugefügt. Mit Strichpunkt
getrennt lassen sich für ``horizontal;vertikal`` jeweils eigene Werte angeben. Für Spezialfälle kann über
``links;oben;rechts;unten`` für jede Seite ein eigener Wert angegeben werden.

Um hier schneller zu einem Ergebnis zu kommen, gerade weil man sich iterativ dem besten Wert nähern muss, kann
das Attribut ``debug`` auf ``true`` gesetzt werden um einen blauen Rahmen an der automatisch bestimmten Größe, so wie
einen grünen Rahmen bei der finalen Größe zu sehen.

.. widget-example::

        <settings>
            <screenshot name="roundbar_debug" sleep="400">
                <caption>Aktivierter Debug Modus</caption>
                <data address="3/3/1">35.8</data>
            </screenshot>
        </settings>
        <roundbar debug="true" bboxgrow="50;0">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.