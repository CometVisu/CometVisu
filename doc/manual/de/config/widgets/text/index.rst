.. replaces:: CometVisu/0.8.0/text/de
    CometVisu/0.8.x/widgets/text/de/

.. _text:

Das Text Widget
===============

.. api-doc:: Text

Beschreibung
------------

Das Text-Element fügt der Visu einen statischen Text hinzu. Auch HTML-Code ist möglich, muss allerdings
entsprechend escaped werden.

.. figure:: _static/text_simple.png

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Text-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Text-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: text

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <text>
        <label>Willkommen bei der CometVisu</label>
    </text>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: text

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <text>
        <label>Willkommen bei der CometVisu</label>
    </text>

XML Syntax
----------

Alternativ kann man für das Text Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier einige Beispiele:

.. widget-example::

    <settings>
        <screenshot name="text_simple">
            <caption>Text, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <text>
        <label>Willkommen bei der CometVisu</label>
    </text>

.. widget-example::

    <settings>
        <screenshot name="text_center">
            <caption>Text, zentriert</caption>
        </screenshot>
    </settings>
    <text align="center">
        <label>Willkommen bei der CometVisu</label>
    </text>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.