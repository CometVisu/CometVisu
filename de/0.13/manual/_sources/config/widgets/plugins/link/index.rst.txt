.. _Link:

Das Link Plugin
=================

.. api-doc:: cv.plugins.Link

Beschreibung
------------

Das Link-Plugin fügt einen einfachen Link zu einer anderen Webseite hinzu, die beim Klicken auf den Link entweder
im selben oder einem neuen Fenster geöffnet wird.

.. widget-example::

        <caption>Öffnet Google in einem neuen Fenster</caption>
        <settings>
          <screenshot name="link"></screenshot>
        </settings>
        <meta>
          <plugins><plugin name="link"/></plugins>
        </meta>
        <link href="https://www.google.de" text="Google" newWindow="true"/>

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des link-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im link-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: link

.. .. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="link" />
        </plugins>
    </meta>
    <link href="https://www.google.de" text="Google" newWindow="true"/>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: link

.. .. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
            <plugin name="link" />
        </plugins>
    </meta>
    <link href="https://www.google.de" text="Google" newWindow="true">
        <layout colspan="6"/>
    </link

XML Syntax
----------

Alternativ kann man für das link Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.