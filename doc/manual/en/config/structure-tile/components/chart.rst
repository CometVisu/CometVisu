.. _tile-component-chart:

Chart
=====

.. api-doc:: cv.ui.structure.tile.components.Chart


Description
-----------

The chart element allows the visualization of historical values as a diagram.
For this, the chart element must contain at least one ``<dataset>`` child element.
For each ``<dataset>`` a line is drawn in the chart.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/temp-chart.json" target-path="/rest/persistence/items/Temperature_FF_Living" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-temp"/>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Living room" y-format="%.1f °C" series="day" refresh="300" colspan="3" rowspan="3">
                <dataset chart-type="line" src="openhab://Temperature_FF_Living"/>
            </cv-chart>
        </cv-tile>
    </cv-widget>

The example shows the temperature curve of the last 24 hours, the exact, formatted temperature value for a point in the
chart is displayed as a tooltip when hovering over the chart.
In order for the chart to reach a certain size, a tile with double width ``<cv-tile size="2x1">`` is used here and the
chart itself should fill the entire tile ``<cv-chart ... colspan="3" rowspan="3">``.

Configuring the data source
###########################

In the ``src`` attribute of the ``dataset`` element, a URL is specified that defines the data source. So far
openHAB (`Persistence <https://www.openhab.org/docs/configuration/persistence.html>`_), InfluxDB and RRD are supported as data sources.

**configuring an openHAB-source**

``openhab://<Item-Name>`` where <Item-Name> can be any item name in openHAB for which historical data is recorded.
It is also possible to specify a specific persistence service if you use multiple:
``openhab://<service-id>@<Item-Name>``, if you do not specify this, the default persistence service configured in openHAB is used.

**configuring einer InfluxDB-source**

``flux://<organization>@<bucket>/<measurement>/<field>`` Optional parameters for the
`aggregationWindow function <https://docs.influxdata.com/flux/v0.x/stdlib/universe/aggregatewindow/>`_ can be added as
query parameters. These require the prefix ``ag-``. Example:
``flux://cometvisu@cv-bucket/Temperature/value?ag-every=1d&amp;ag-fn=mean`` would send the following Flux query to the
database:

.. code-block::

    from(bucket:"cv-bucket")
      |> range(start: <start-time>, stop: <end-time>)
      |> filter(fn: (r) => r._measurement == "Temperature" and r._field == "value")
      |> aggregateWindow(every: 1d, fn: mean)

If only ``ag-every`` is specified, "mean" is taken as the default value for ``ag-fn``. If only ``ag-every`` is specified,
the values are automatically determined based on the ``series`` used by the chart.

For more complex database queries, the code of the Flux query can also be specified directly as text content of the ``<dataset>`` element.
In this case, only the organization and the note that the query was specified "inline" must be specified in the ``src`` attribute.

.. code-block:: xml

    <dataset src="flux://openhab@inline">
        from(bucket:"openhab")
            |> range(start: -2d)
            |> filter(fn: (r) => r._measurement == "Counter" and r._field == "value")
            |> aggregateWindow(every: 1d, fn: last)
            |> difference()
    </dataset>

With this query, the time range is set to the last 2 days (``range(start: -2d)``) and is therefore no longer variable and
overwrites or deactivates the possibility to select other time series via ``selection``. To use this feature, a placeholder
must be inserted and the ``aggregateWindow`` must be omitted (this is automatically selected according to the selected time series).
The upper query would look like this:

.. code-block:: xml

    <dataset src="flux://openhab@inline">
        from(bucket:"openhab")
            |> range($$RANGE$$)
            |> filter(fn: (r) => r._measurement == "Counter" and r._field == "value")
            |> difference()
    </dataset>

.. hint::

    Since the CometVisu itself cannot check whether the Flux code is correct, it is recommended to compile the query
    in the UI of the InfluxDB and then copy the working code.

The URI of the InfluxDB server and a token for authenticating the requests must be specified in the :ref:`hidden configurations <hidden-config>`
under the section "influx". The following key-value entries are required in this section.

+----------------+-----------------------------------+
| Key            | Value                             |
+----------------+-----------------------------------+
| uri            | `http://<influx-server>:8062`     |
+----------------+-----------------------------------+
| token          | `API Token (can be generated in   |
|                | the influxdb-UI)`                 |
+----------------+-----------------------------------+
| config         | flux                              |
+----------------+-----------------------------------+

The values for "uri" and "token" must be adjusted accordingly, the value for "config" must be "flux" so that the communication can work correctly.

**Configuring a RRD-source**

``rrd://<filename-without-rrd>`` For the RRD data source, the file name without the ".rrd" at the end must be specified.
Additional query parameters can be added:

* ``ds``: Select one of the available Consolidation Functions of the RRDTools (http://rrdtool.org).
* ``res``: The default resolution for the data from the RRD file can be overridden with its own second value.

Example: ``rrd://<dateiname-ohne-rrd>?ds=AVERAGE&resolution=3600``


More examples
#############

It is also possible to display multiple lines in a chart and to color them differently.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="/rest/persistence/items/PV_Energy_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv">
            <caption>Two lines in one chart.</caption>
        </screenshot>
        <screenshot name="cv-chart-pv-tooltip" hover-on="cv-chart > svg" waitfor="cv-chart > div.tooltip">
            <caption>Tooltip with single values.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Power" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Grid withdrawal" color="#FF0000" show-area="false"/>
                <dataset src="openhab://PV_Energy_Today" color="#FF9900" title="Production" />
              </cv-chart>
        </cv-tile>
    </cv-widget>

The red line shows the daily withdrawal from the power grid in kWh and the orange area shows the daily PV production in kWh.

The chart element also offers the possibility to display a bar chart:

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="/rest/persistence/items/PV_Energy_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-bar">
            <caption>Two bars in one chart.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Grid withdrawal" color="#FF0000" show-area="false" chart-type="bar"/>
                <dataset src="openhab://PV_Energy_Today" color="#FF9900" title="Production" chart-type="bar"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>

If you want to switch to other time series and navigate within the currently selected one, you can unlock these with
the ``selection`` attribute. This can be filled with a comma-separated list of allowed time series, or simply with ``all``.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-nav">
            <caption>Time series selection.</caption>
        </screenshot>
        <screenshot name="cv-chart-pv-nav-open" clickpath="label.clickable" waitfor="div.popup.series">
            <caption>Opened time series selection</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Power" selection="week,month,year" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Grid withdrawal" color="#FF0000" show-area="false"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>


Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-chart tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-chart tile

