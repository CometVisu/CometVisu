.. _diagram2_migration:

Moving from ``diagram`` to ``diagram2``
=======================================

``diagram2`` understands the same configuration as the older :ref:`diagram` plugin. Moving over
means renaming the elements, including the plugin and — if the diagrams should look exactly as
before — setting three stroke widths.

Step 1: include the plugin
--------------------------

In the ``<meta>`` section of the **main configuration** (not in an included part file):

.. code-block:: xml

    <plugins>
        <plugin name="diagram" />
        <plugin name="diagram2" />
    </plugins>

Both plugins may be used side by side. That helps while converting: put the same diagram once as
``<diagram>`` and once as ``<diagram2>`` on the same page and compare axes, colours and labels
directly. Once everything is converted, the ``diagram`` entry can go.

Step 2: rename the elements
---------------------------

============================  ==============================
old                           new
============================  ==============================
``<diagram>``                 ``<diagram2>``
``<diagram_info>``            ``<diagram2_info>``
============================  ==============================

All attributes and child elements stay as they are — ``series``, ``period``, ``legend``,
``gridcolor``, ``<axis>``, ``<rrd>``, ``<influx>``, ``<openhab>`` and the rest are read exactly as
before.

Step 3: stroke widths and grid colour for the look of ``diagram``
-----------------------------------------------------------------

Out of the box ``diagram2`` draws finer and with a fainter grid than the flot based diagram. Four
attributes change that; without them the picture it had stays.

===============  ==========  ===========================================  =============
attribute        default     applies to                                   value for v1
===============  ==========  ===========================================  =============
``gridwidth``    ``1``       grid lines, axis lines, tick marks           ``1``
``gridopacity``  ``0.4``     how solid the grid lines are, 0 to 1         ``1``
``borderwidth``  ``1``       frame around the plotting area               ``2``
``linewidth``    see below   graphs, their bar and point outlines         ``2``
===============  ==========  ===========================================  =============

``diagram`` draws its grid lines in the full ``gridcolor``. That is easy to get wrong: flot itself
would draw them at 22 % opacity, but the old plugin sets ``grid.tickColor`` to the grid colour
explicitly, so that rule never applies there. ``gridopacity="1"`` matches this.

Without ``linewidth`` diagram2 keeps the picture it had: lines 1.5, the outlines of bars and
points 1. A configured value applies to all three.

``gridwidth`` already carries the value of ``diagram`` — flot draws its grid lines with 1 as well
and only the frame more heavily. So three settings are enough for the familiar look:

.. code-block:: xml

    <diagram2 series="day" period="3" borderwidth="2" linewidth="2" gridopacity="1" popup="true">
        <layout colspan="12" rowspan="6" />
        <axis unit=" °C" label="Temperature" decimals="1">temperature</axis>
        <influx measurement="house/temperature" color="#FF0000" label="Outside [°C]" yaxis="temperature"/>
    </diagram2>

The values apply to a diagram as a whole, not per series, and to ``<diagram2_info>`` just the same.

What stays different even with those values
-------------------------------------------

* **popup is honoured.** ``diagram`` always opens the fullscreen view, ``diagram2`` only with
  ``popup="true"``. Without the attribute the widget is not clickable. To keep the old behaviour,
  set it wherever a popup used to open.
* **Units show up now.** ``diagram2`` appends the ``unit`` of an axis to the tick labels and to the
  value in the tooltip. ``diagram`` reads the attribute but shows it in neither place. To keep the
  familiar picture, **remove ``unit`` from the ``<axis>`` elements**; the unit can go into the axis
  title instead (``label="Temperature [°C]"``).
* **Points are smaller.** With ``style="points"`` ``diagram`` draws circles of 3 px radius,
  ``diagram2`` of 2 px. ``linewidth`` only affects the outline, not the radius.
* **``zoomYAxis`` governs both gestures.** In ``diagram`` the attribute only controls zooming;
  dragging always moves the value axes there. In ``diagram2`` the value axis stays put for both
  gestures without ``zoomYAxis="true"``. To keep the familiar behaviour, set the attribute wherever
  the popup is dragged.
* **The time axis thins out.** When room gets tight ``diagram2`` drops labels; ``diagram`` lets
  them overlap.
* **Drawing is done with D3** instead of flot. jQuery and the eight flot scripts are not loaded
  for ``diagram2``.

Axes, legend, tooltip, colour order, the 2 % of air above and below the graphs, ``refresh`` and all
data sources behave the same.
