.. _diagram2_info:

The diagram2_info plugin
========================

.. api-doc:: cv.plugins.diagram2.AbstractDiagram2

Description
-----------

The diagram2_info plugin shows the current value of an address as a widget. With ``popup="true"``
a click on it opens a fullscreen diagram showing the history of that value. It is the successor of
``diagram_info`` and draws with D3.

The displayed value comes from the ``<address>`` element and is rendered through ``format``, like
in every other info widget. The diagram in the popup is configured exactly like :ref:`diagram2`:
through ``<axis>`` and the data sources ``<rrd>``, ``<influx>``, ``<openhab>`` and ``<demo>``. Interaction in the popup — panning, zooming, reloading the visible range — is the same
as well.

Without ``popup="true"`` the widget stays a plain value display and is not clickable.

To show the diagram itself as the widget, use :ref:`diagram2`.

.. code-block:: xml

    <diagram2_info series="day" period="3" popup="true" format="%.1f °C">
        <layout colspan="3" />
        <label>Outside temperature</label>
        <axis unit=" °C" decimals="1">temperature</axis>
        <influx measurement="house/temperature" color="#FF0000"/>
        <address transform="DPT:9.001">4/2/0</address>
    </diagram2_info>

Settings
--------

Allowed attributes in the diagram2_info-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram2_info


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram2_info
