.. replaces:: CometVisu/0.8.0/pushbutton/de
    CometVisu/0.8.x/widgets/pushbutton/de/

.. _pushbutton:

Das PushButton Widget
=====================

.. api-doc:: PushButton

Beschreibung
------------

Der Pushbutton fügt der Visu eine Schaltfläche hinzu, mit der beim Drücken und beim Loslassen ein bestimmter
Wert gesendet werden kann. Beispielsweise beim Drücken EIN und beim Loslassen AUS.
Damit kann man z.B. mit einem Schaltaktor einen mechanischen Taster simulieren um das Garagentor zu öffnen.

.. figure:: _static/pushbutton_simple.png

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des PushButton-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im PushButton-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: pushbutton

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <pushbutton downValue="1" upValue="0" mapping="text auf/zu">
        <label>
            <icon name="fts_garage" color="orange"/>
        </label>
        <address transform="DPT:1.001">1/0/0</address>
    </pushbutton>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: pushbutton

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <pushbutton downValue="1" upValue="0" mapping="text auf/zu">
        <label>
            <icon name="fts_garage" color="orange"/>
        </label>
        <address transform="DPT:1.001">1/0/0</address>
    </pushbutton>

XML Syntax
----------

Alternativ kann man für das PushButton Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das PushButton Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="pushbutton_simple">
            <caption>PushButton, einfaches Beispiel</caption>
            <data address="1/0/0">1</data>
        </screenshot>
    </settings>
    <meta>
        <mappings>
            <mapping name="AufZu">
                <entry value="0">Auf</entry>
                <entry value="1">Zu</entry>
            </mapping>
        </mappings>
    </meta>
    <pushbutton downValue="1" upValue="0" mapping="AufZu">
        <layout colspan="3" />
        <label>
            <icon name="fts_garage" color="orange"/>
        </label>
        <address transform="DPT:1.001">1/0/0</address>
    </pushbutton>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.