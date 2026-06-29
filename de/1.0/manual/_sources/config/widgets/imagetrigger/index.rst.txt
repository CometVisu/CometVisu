.. replaces:: CometVisu/0.8.0/imagetrigger/de
    CometVisu/0.8.x/widgets/imagetrigger/de/
    CometVisu/imagetrigger/de
    CometVisu/imagetrigger_(Deutsch)

.. _imagetrigger:

Das ImageTrigger Widget
=======================

.. api-doc:: ImageTrigger

Beschreibung
------------

Das ImageTrigger Widget fügt der Visualisierung eine Schaltfläche hinzu, die mit einem Bild belegt werden kann.
Der Schaltfläche kann ein Wert zugeordnet werden, der beim darauf Klicken zum Backend gesendet wird.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des ImageTrigger-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit * gekennzeichneten Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im ImageTrigger-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: imagetrigger

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <imagetrigger src="icons/comet_50x50_ff8000" suffix="png" sendValue="0">
          <layout colspan="4" />
          <label>Müllabfuhr</label>
	  <address transform="DPT:1.001" mode="write">1/1/1</address>
        </imagetrigger>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: imagetrigger

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
	<imagetrigger src="icons/comet_50x50_ff8000" suffix="png" sendValue="0">
          <layout colspan="4" />
          <label>Müllabfuhr</label>
	  <address transform="DPT:1.001" mode="write">1/1/1</address>
        </imagetrigger>

XML Syntax minimal
------------------

Alternativ kann man für das ImageTrigger Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das ImageTrigger Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="image_trigger">
              <caption>Imagetrigger in 'blau'</caption>
              <data address="0/0/0">blue</data>
            </screenshot>
            <screenshot name="image_trigger_changes">
              <caption>Imagetrigger in 'grey'</caption>
              <data address="0/0/0">grey</data>
            </screenshot>
        </settings>
	    <imagetrigger src="icons/CometVisu_" suffix="png" sendValue="clicked" type="select" width="45px" height="32px">
            <layout colspan="1" />
            <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
        </imagetrigger>


Weitere Beispiele
-----------------

.. widget-example::

    <settings>
       <screenshot name="image_trigger_colspan0">
         <caption>Layout deaktiviert (auf '0' gesetzt) , damit das Widget die Größe des Bildes annimmt</caption>
         <data address="0/0/0">1</data>
       </screenshot>
     </settings>
     <imagetrigger src="icons/CometVisu_orange" suffix="png" sendValue="clicked" type="show" width="45px" height="32px">
       <layout colspan="0" />
       <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
     </imagetrigger>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
