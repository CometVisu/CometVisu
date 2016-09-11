.. _image:

Das Image Widget
================

.. api-doc:: Image

Beschreibung
------------

Das Image Widget fügt der Visualisierung ein statisches Bild oder ein Kamerabild hinzu.

Das Bild muss als URL angegeben werden. Wenn man Dateien anzeigen möchte müssen diese über
http erreichbar auf dem CV-System oder einem anderen Server liegen.

Als Dateiformate können alle Formate verwendet werden, die vom für die CV genutzen
Browser unterstützen werden. Vorzugweise sollten das PNG, GIF und JPG sein.

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="image_simple"/>
    </settings>
    <image src="icon/comet_128_ff8000.png"/>


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Image-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit * gekennzeichneten Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Image-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: image

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <image src="/icon/comet_128_ff8000.png"/>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: image

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <image src="/icon/comet_128_ff8000.png">
            <label>Beschreibung der Grafik</label>
        </image>

XML Syntax minimal
------------------

Alternativ kann man für das Image Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Image Widget aus dem oben gezeigten Screenshot erzeugt:

.. code-block:: xml

    <image src="icon/comet_128_ff8000.png"/>


XML Syntax komplett
-------------------

Hier der Beispielcode der das Image-Widget mit den allen gezeigten
Eigenschaften einfügt:

.. widget-example::

    <settings>
        <screenshot name="image_complete"/>
    </settings>
    <image src="icon/comet_128_ff8000.png" width="300px" height="200px" refresh="300">
        <label>Beschreibung der Grafik</label>
    </image>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.