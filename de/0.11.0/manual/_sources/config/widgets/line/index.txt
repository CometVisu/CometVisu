.. replaces:: CometVisu/0.8.x/widgets/line/de

.. _line:

Das Line Widget
===============

.. api-doc:: Line

Beschreibung
------------

Das Line Widget fügt der Visualisierung eine dicke horizontale Linie hinzu. Hiermit kann man die Visu grafisch strukturieren.
Farben und Stile werden durch das gewählte Design bestimmt und lassen sich nicht ändern. 

Das Line Widget kann auch in den Navbars verwendet werden. In der Top- bzw. Bottom-Navbar werden damit dünne senkrechte Trennlinien erzeugt, 
in den seitlichen Navbars dünne waagerechte Linien.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Line-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Line-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Keine

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: line

XML Syntax
----------

Alternativ kann man für das Line Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Line Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="line_simple">
            <caption>Line, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <line/>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.