.. _tile-status-chart:

The status-chart widget
=======================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The status-chart widget combines the :ref:`status widget <tile-status>` with a chart in its background.
The chart is displayed in the background of the widget without X and Y axis. By clicking on the tile, a popup opens
in which the chart is displayed in full size with the axes.

.. widget-example::

    <settings design="tile" selector="cv-status-chart">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="charts/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-status-chart">
            <caption>Status with background dhart.</caption>
            <data address="1/4/0">157</data>
        </screenshot>
    </settings>
    <cv-status-chart format="%d" style="color: #f2495c" y-format="%d Wh" series="hour" x-format="%H:%M" >
        <cv-address slot="address" transform="DPT:7.001" mode="read">1/4/0</cv-address>
        <span slot="title">Current power consumption</span>
        <span slot="unit">W</span>
        <dataset slot="dataset" src="Meter_Energy_Grid_Import_Today" title="grid withdrawal" color="#FF0000" show-area="true" curve="step"/>
    </cv-status-chart>


Allowed attributes in the status-chart element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-status-chart tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-status-chart tile
