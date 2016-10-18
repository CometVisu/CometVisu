.. replaces:: CometVisu/0.8.x/widgets/break/de/

.. _break:

Das Break Widget
================

.. api-doc:: Break

Beschreibung
------------

Das Break-Widget fügt der Visualisierung einen Zeilenumbruch hinzu. Das nächste Widget landet also unter dem vorigen.
Hiermit kann man die Visu grafisch strukturieren. Break ist von der Auflösung unabhängig.


Einstellungen
-------------

Das Break-Widget hat keine Attribute und Elemente, über die weitere Einstellungen möglich wären.

XML Syntax
----------

Alternativ kann man für das Break Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der Beispielcode der das Break Widget erzeugt:

.. code-block:: xml

        <break/>
