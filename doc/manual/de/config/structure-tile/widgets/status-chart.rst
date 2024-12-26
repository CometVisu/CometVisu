.. _tile-status-chart:

Das Status-Chart Widget
=======================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Status-Chart Widget kombiniert das :ref:`Status-Widget <tile-status>` mit einem Chart in dessen Hintergrund.
Der Chart wird ohne X- und Y-Achse im Hintergrund des Widgets angezeigt. Durch einen Klick auf die Kachel, öffnet sich
ein Popup in der der Chart dann mit den Achsen in voller Größe angezeigt wird.

.. widget-example::

    <settings design="tile" selector="cv-status-chart">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-status-chart">
            <caption>Status mit Hintergrund-Chart.</caption>
            <data address="1/4/0">157</data>
        </screenshot>
    </settings>
    <cv-status-chart format="%d" style="color: #f2495c" y-format="%d W" series="hour" x-format="%H:%M" >
        <cv-address slot="address" transform="DPT:7.001" mode="read">1/4/0</cv-address>
        <span slot="title">Aktueller Stromverbrauch</span>
        <span slot="unit">W</span>
        <dataset slot="dataset" src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="true" curve="step"/>
    </cv-status-chart>


Erlaubte Attribute im Status-Chart-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-status-chart tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-status-chart tile
