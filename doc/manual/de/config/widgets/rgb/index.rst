.. _rgb:

Das Rgb Widget
==============

.. api-doc:: Rgb

Beschreibung
------------

Mit dem RGB-Widget kann man eine Farbe in der Visu anzeigen.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Rgb-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Rgb-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: rgb

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: rgb

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <rgb>
      <layout colspan="1" />
      <address transform="DPT:5.004" mode="read" variant="r">0/3/20</address>
      <address transform="DPT:5.004" mode="read" variant="g">0/3/21</address>
      <address transform="DPT:5.004" mode="read" variant="b">0/3/22</address>
    </rgb>

XML Syntax
----------

Alternativ kann man für das Rgb Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Rgb Widget aus dem folgenden Screenshot erzeugt:


.. TODO:: Screenshot funktioniert nicht

.. code-block:: xml

    <rgb>
      <address transform="DPT:5.004" mode="read" variant="r">0/3/20</address>
      <address transform="DPT:5.004" mode="read" variant="g">0/3/21</address>
      <address transform="DPT:5.004" mode="read" variant="b">0/3/22</address>
    </rgb>

.. .. widget-example::

    <settings>
        <screenshot name="rgb_simple">
            <caption>Rgb, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <rgb>
      <address transform="DPT:5.004" mode="read" variant="r">0/3/20</address>
      <address transform="DPT:5.004" mode="read" variant="g">0/3/21</address>
      <address transform="DPT:5.004" mode="read" variant="b">0/3/22</address>
    </rgb>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.