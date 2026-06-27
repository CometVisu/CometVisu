.. _tile-component-color:

Color
=====

.. api-doc:: cv.ui.structure.tile.components.Color


Beschreibung
------------

Das Color-Element ermöglicht die Visualisierung und Manipulation einer RGB-Beleuchtung.
Für die Farbauswahl wird der :ref:`ColorChooser <colorchooser>` aus der Pure-Struktur in einem Popup benutzt.
Daher stehen auch alle Möglichkeiten die dieser bietet zur Verfügung.
In der Kachel wird der aktuelle Farbwert über die Icon-Farbe dargestellt. Klickt man auf den Button öffnet sich
das Popup mit dem ColorChooser.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-color" selector="cv-widget" sleep="10">
            <data address="1/2/59">50</data>
            <data address="1/2/60">60</data>
            <data address="1/2/61">100</data>
            <caption>Normale Ansicht</caption>
        </screenshot>
        <screenshot name="cv-color-popup" clickpath="cv-color" waitfor="cv-popup" selector="cv-popup" margin="10 10 10 10">
            <data address="1/2/59">50</data>
            <data address="1/2/60">60</data>
            <data address="1/2/61">100</data>
            <caption>Farbauswahl im Popup</caption>
        </screenshot>
    </settings>
    <cv-widget>
        <cv-tile>
          <cv-row colspan="3" row="2">
            <cv-color controls="LCh-box;T:2500-15000;Y" title="Schranklicht">
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-r">1/2/59</cv-address>
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-g">1/2/60</cv-address>
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-b">1/2/61</cv-address>
              <cv-icon class="value">ri-lightbulb-line</cv-icon>
            </cv-color>
          </cv-row>
          <cv-row colspan="3" row="last">
            <label class="primary">Schranklicht</label>
          </cv-row>
        </cv-tile>
    </cv-widget>



Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-color tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-color tile

