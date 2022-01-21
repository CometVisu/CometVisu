.. replaces:: CometVisu/0.8.0/web/de
    CometVisu/0.8.x/widgets/web/de/
    CometVisu/Iframe
    CometVisu/Iframe_(Deutsch)
    CometVisu/Widget/Iframe/de

.. _web:

Das Web Widget
==============

.. api-doc:: Web

Beschreibung
------------

Das Web-Element fügt der Visu die Möglichkeit zur Anzeige von externen Webseiten hinzu.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Web-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Web-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: web

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <web src="http://www.google.de" width="320px" height="300px" frameborder="false" background="black" refresh="20">
        <layout colspan="4"/>
        <label>Web-Suche</label>
    </web>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: web

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <web src="http://www.google.de" width="320px" height="300px" frameborder="false" background="black" refresh="20">
        <layout colspan="4"/>
        <label>Web-Suche</label>
    </web>

XML Syntax
----------

Alternativ kann man für das Web Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Web Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <fixtures>
            <fixture source-file="source/test/fixtures/web.html" target-path="/source/web.html"/>
        </fixtures>
        <screenshot name="web_simple" sleep="1000">
            <caption>Web, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <web src="/source/web.html" width="620px" height="300px" frameborder="false" background="black" refresh="20">
      <layout colspan="6"/>
      <label>Web widget example</label>
    </web>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.