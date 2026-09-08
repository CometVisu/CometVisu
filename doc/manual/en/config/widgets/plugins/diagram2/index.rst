.. _diagram2:

The diagram2 plugin
===================

.. api-doc:: cv.plugins.diagram2.AbstractDiagram2

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Diagrams drawn with d3, the successor of the flot based diagram plugin.

The configuration is the one of the old plugin, only the widget names differ, so that both
can be used side by side while this one is being completed.

.. ###END-WIDGET-DESCRIPTION###

The diagram2 plugin draws the history of measured values. It is the successor of the
:ref:`diagram` plugin and uses D3 instead of flot. Its configuration is the same one: attributes,
child elements, defaults and appearance match the old plugin, only the widget names are
``diagram2`` and ``diagram2_info``. Both plugins can therefore be used side by side in the same
configuration and compared directly.

Like the old plugin the diagram is shown as a widget by default (inline diagram). With
``popup="true"`` a click additionally opens a fullscreen view in which the diagram can be panned
and zoomed. Depending on the widget size, ``previewlabels`` and ``legend`` decide whether axis
labels and the legend are shown in the inline diagram.

To show a current value as the widget that opens the diagram when clicked, use
:ref:`diagram2_info` instead.

The plugin is included in the ``meta`` section of the main configuration like any other:

.. code-block:: xml

    <plugins>
        <plugin name="diagram2" />
    </plugins>

.. hint::

    The plugin list is read from the main configuration only. If a ``<diagram2>`` lives in a file
    pulled in through ``<include>``, the ``<plugin>`` entry still has to be in the main
    configuration.

Data sources
------------

Every series is its own child element. Which sources are available depends on the backend in use:

=============  ===================================================================================
``<rrd>``      RRD file on the server, as in the old plugin. The content is the name without the
               ``.rrd`` suffix, ``datasourceIndex`` selects the column inside the file.
``<influx>``   Measurement from an InfluxDB, filtered through ``<and>``, ``<or>`` and ``<tag>``.
``<openhab>``  Item from the openHAB persistence service. The content is the item name.
``<demo>``     Generated data, only useful in a demo configuration.
=============  ===================================================================================

The series attributes are largely the same for all sources: ``yaxis`` assigns the series to an
axis — its value is the **name** of that axis, i.e. the content of the corresponding ``<axis>``
element; without it the series goes onto the first axis. ``color`` and ``label`` set colour and
legend text, ``scaling`` and ``offset`` convert the raw values, ``style`` selects between
``lines``, ``bars`` and ``points``, ``fill``, ``steps``, ``barWidth`` and ``align`` control the
drawing, and ``resolution`` together with ``consolidationFunction`` (on ``<rrd>`` and ``<influx>``)
decide how the values are aggregated for the shown time range. ``fillMissing``
closes gaps — ``<rrd>`` does not have that attribute.

The possible values of ``consolidationFunction`` and ``fillMissing``, the filter elements and the
``authentication`` attribute inside ``<influx>`` are described with the old plugin and apply
unchanged: :ref:`diagram`.

.. code-block:: xml

    <diagram2 series="day" period="3" popup="true" previewlabels="true" legend="both" legendposition="nw">
        <layout colspan="12" rowspan="6" />
        <axis unit=" °C" label="Temperature" position="left" decimals="1">temperature</axis>
        <axis unit=" %" label="Humidity" position="right" min="0" max="100" decimals="0">humidity</axis>
        <influx measurement="house/temperature" color="#FF0000" label="Outside [°C]" yaxis="temperature"/>
        <influx measurement="house/humidity" color="#00A0FF" label="Humidity [%]" yaxis="humidity"/>
    </diagram2>

Interaction in the popup
------------------------

The inline diagram does not move; panning and zooming only work in the popup view:

* **Pan**: drag with the pressed mouse button, or swipe with one finger.
* **Zoom**: a double click zooms in by a factor of 1.5, the mouse wheel zooms in both directions,
  two fingers zoom through a pinch gesture. The point under the pointer stays where it is.
* Only the time axis is zoomed and panned. The value axes follow only if ``zoomYAxis="true"``
  is set.
* After each gesture the data for the new time range is loaded. The end stays at the current time,
  the start follows the visible range.

Stroke widths and grid colour
-----------------------------

Four attributes decide how heavily the diagram is drawn — each on its own, each defaulting to the
picture it had:

===============  ==========  ======================================================
attribute        default     applies to
===============  ==========  ======================================================
``gridwidth``    ``1``       grid lines, axis lines and tick marks
``gridopacity``  ``0.4``     how solid the grid lines are, 0 to 1
``borderwidth``  ``1``       the frame around the plotting area
``linewidth``    see below   the graphs, their bar and point outlines included
===============  ==========  ======================================================

``gridopacity`` only affects the grid lines; frame, axes and tick marks are always solid.

Without ``linewidth`` diagram2 draws its lines with 1.5 and the outlines of bars and points with
1 — exactly as before; a configured value applies to all three.

The old plugin draws heavier: frame and graphs with 2, its grid lines with 1 as well, but in the
full grid colour. So with ``borderwidth="2" linewidth="2" gridopacity="1"`` a ``diagram2`` looks
like a ``diagram``. The :ref:`diagram2_migration` puts that into context.

Differences to ``diagram``
--------------------------

Deliberate deviations from the old plugin:

* ``popup`` is honoured. Without that attribute a click opens nothing, and the widget no longer
  looks like a control either. The old plugin always opens the popup.
* The stroke is slimmer and the grid fainter, see above; three attributes restore the old
  picture.
* The unit of an axis really is shown — on the tick labels and in the tooltip. ``diagram`` shows it
  in neither place, although it reads the ``unit`` attribute as well.
* ``zoomYAxis`` governs both gestures. Without the attribute the value axis stays put, whether the
  diagram is dragged or zoomed; ``diagram`` ties only zooming to it and always takes the value axis
  along when dragging.
* Points (``style="points"``) have a radius of 2 px instead of 3 px.
* The time axis thins out its labels when there is not enough room instead of letting them overlap.
* Drawing is done with D3. jQuery and the eight flot scripts are no longer loaded.

Unchanged are the set of attributes and child elements, the axes with their margins and tick
spacing, legend, tooltip, ``refresh``, the colour order and the defaults.

Settings
--------

Allowed attributes in the diagram2-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram2


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram2

.. toctree::
    :titlesonly:
    :hidden:

    migration
