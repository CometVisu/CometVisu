.. replaces:: CometVisu/0.8.0/slide/de
    CometVisu/0.8.x/widgets/slide/de/
    CometVisu/Widget/slide/de
    CometVisu/slide
    CometVisu/slide_(Deutsch)
    CometVisu/slider_(Deutsch)

.. _slide:

Das Slide Widget
================

.. api-doc:: Slide

Beschreibung
------------

Der Slider (Schieberegler) wird oft für das Ansteuern von Rollos, Heizung und Dimmer benutzt.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Slide-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Slide-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: slide

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <slide min="0" max="100" step="1" format="%d%%" styling="GreyGrey" flavour="lithium">
        <label>Spot Sofa</label>
        <address transform="DPT:5.001" mode="readwrite">11/1/6</address>
        <address transform="DPT:5.001" mode="readwrite">11/1/7</address>
    </slide>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: slide

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <slide min="0" max="100" step="1" format="%d%%" styling="GreyGrey" flavour="lithium">
        <label>Spot Sofa</label>
        <address transform="DPT:5.001" mode="readwrite">11/1/6</address>
        <address transform="DPT:5.001" mode="readwrite">11/1/7</address>
    </slide>

XML Syntax
----------

Alternativ kann man für das Slide Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Slide Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="slide_simple">
            <caption>Slider, einfaches Beispiel</caption>
            <data address="11/1/6">0</data>
        </screenshot>
    </settings>
    <slide min="0" max="100" step="1" format="%d%%" flavour="lithium">
        <label>Spot Sofa</label>
        <address transform="DPT:5.001" mode="readwrite">11/1/6</address>
        <address transform="DPT:5.001" mode="readwrite">11/1/7</address>
    </slide>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.