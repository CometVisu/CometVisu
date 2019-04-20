.. replaces:: CometVisu/0.8.x/widgets/audio/de

.. _audio:

Das Audio Widget
================

.. api-doc:: Audio

Beschreibung
------------

Das Audio-Widget fügt der Visu eine Schaltfläche zum Abspielen einer Audio-Datei hinzu.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Audio-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Audio-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: audio

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <audio src="media/wama_fertig.mp3" threshold_value="1" autoplay="false" loop="false" id="Jens">
            <label>Audio</label>
            <address transform="DPT:1.001" mode="read" variant="">1/1/30</address>
        </audio>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: audio

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <audio src="media/wama_fertig.mp3" threshold_value="1" autoplay="false" loop="false" id="Jens">
            <label>Audio</label>
            <address transform="DPT:1.001" mode="read" variant="">1/1/30</address>
        </audio>

XML Syntax minimal
------------------

Alternativ kann man für das Audio Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Audio Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="audio_simple">
                <caption>Audio, einfaches Beispiel</caption>
            </screenshot>
        </settings>
        <audio src="media/wama_fertig.mp3" threshold_value="1" autoplay="false" loop="false" id="Jens">
            <label>Audio</label>
            <address transform="DPT:1.001" mode="read" variant="">1/1/30</address>
        </audio>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.