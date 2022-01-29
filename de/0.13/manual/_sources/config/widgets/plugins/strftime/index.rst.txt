.. replaces:: CometVisu/0.8.0/strftime/de
    CometVisu/0.8.x/widgets/strftime/
    CometVisu/strftime/de
    CometVisu/strftime_(Deutsch)

.. _strftime:

Das Strftime Plugin
===================

.. api-doc:: cv.plugins.Strftime

Beschreibung
------------

Das strftime-Plugin fügt der Visuseite eine formatierbare Datums- und Uhrzeitanzeige hinzu.

.. figure:: _static/strftime_simple.png


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des strftime-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im strftime-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: strftime

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="strftime" />
        </plugins>
    </meta>
    <strftime lang="de" format="%A, %d. %B %Y %H:%M:%S">
        <layout colspan="6"/>
    </strftime>

.. HINT::
   
   Das Attribut ``class`` wird im Editor nur angezeigt, wenn der complex-Modus aktiviert wurde.

Mögliche Formatierungsoptionen findet man `hier <http://hacks.bluesmoon.info/strftime/format_specifiers.html>`__.
Ohne Angabe wird das Standardformat der jeweiligen Sprache verwendet.

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: strftime

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
            <plugin name="strftime" />
        </plugins>
    </meta>
    <strftime lang="de" format="%A, %d. %B %Y %H:%M:%S">
        <layout colspan="6"/>
    </strftime>

XML Syntax
----------

Alternativ kann man für das strftime Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das strftime Plugin aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings sleep="1300">
        <screenshot name="strftime_simple">
            <caption>strftime, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="strftime" />
        </plugins>
    </meta>
    <strftime lang="de" format="%A, %d. %B %Y %H:%M:%S">
        <layout colspan="6"/>
    </strftime>

Beispiele
---------

Zeitanzeige in der linken Navbar
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In der linken Navbar reicht die Breite typischerweise nicht für die Anzeige von Datum- und Uhrzeit in
einer Zeile. Aus diesem Grund wird im nachstehenden Beispiel eine Möglichkeit beschrieben, Datum und Uhrzeit 
übereinander anzuordnen und zusätzlich ansprechend mittels ``class``-Element zu formatieren.  

.. figure:: _static/Example_Metal_swiss_02.jpg


In der Navbar wurde an der obersten Stelle ein Group Widget eingefügt mit dem Namen "Aktuelle Zeit".
Innerhalb dieser Group befindet sich ein weiteres Group Widget mit dem Attribut ``nowidget="true"``.
Darin wurden dann von oben nach unten ein strftime, ein break gefolgt von einem weiteren strftime Widget eingefügt.
Das obere strftime Widget, dass die Zeit anzeigt hat folgende Parameter:

.. code-block:: guess

    lang="de"
    format="%H:%M"
    class="timebig"

Das untere strftime, dass das Datum anzeigt hat folgende Parameter:

.. code-block:: guess

    lang="de"
    format="%A, %d. %B %Y"
    class="timedate"

In der config.xml sieht dieser Abschnitt wie folgt aus:

.. code-block:: xml

    <group name="Aktuelle Zeit">
        <layout colspan="12"/>
        <group nowidget="true">
            <layout colspan="12"/>
            <strftime lang="de" format="%H:%M" class="timebig">
                <layout colspan="12"/>
            </strftime>
            <strftime lang="de" format="%A, %d. %B %Y" class="timedate">
                <layout colspan="12"/>
            </strftime>
        </group>
    </group>

Für die Formatierung (Farbe, Schriftgröße und Schriftart) muss im Visu Verzeichnis unter
``/designs/metal/custom.css`` noch folgender Abschnitt eingefügt werden:

.. code-block:: css

    .custom_timebig {
        padding: 0;
        margin: 0;
        color: #75d5ff;
        min-height: 0mm;
        line-height: 8mm;
        font: bold 12mm "Lucida Grande", Lucida, Verdana, sans-serif;
    }

    .custom_timebig > div.strftime_value {
        text-align: center;
        line-height: 14mm;
    }

    .custom_timedate {
        padding: 0;
        margin: 0;
        min-height: 0mm;
        line-height: 8mm;
        font: bold 3mm "Lucida Grande", Lucida, Verdana, sans-serif;
    }

    .custom_timedate > div.strftime_value {
            text-align: center;
    }

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
