.. replaces:: CometVisu/0.8.x/widgets/reload/de/

.. _reload:

Das Reload Widget
=================

.. api-doc:: Reload

Beschreibung
------------

Das Widget hört auf eine GA um basierend darauf die Visu neu zu laden.

Anwendungsfall: Eine neue Config wurde erstellt und es soll zentral dafür gesorgt werden,
dass alle aktuell laufenden Visu-PCs diese Config laden.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Reload-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Reload-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Keine

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: reload

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <reload>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </reload>

XML Syntax
----------

Alternativ kann man für das Reload Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier ein Beispiel:

.. code-block:: xml

    <reload>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </reload>
