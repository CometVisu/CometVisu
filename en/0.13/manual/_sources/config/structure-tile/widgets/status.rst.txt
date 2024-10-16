.. _tile-status:

The status widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Description
------------

The status widget combines an icon with a text. It is used to summarize status information,
e.g. the number of open windows in the apartment.
The status widget only occupies half the height of a standard widget.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-status" margin="0 10 10 0">
            <data address="1/4/2">2</data>
        </screenshot>
    </settings>
    <cv-status format="%d open">
        <cv-icon slot="icon" size="x-large">knxuf-fts_window_1w_open</cv-icon>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <span slot="label">Windows</span>
    </cv-status>

It must be specified with a ``<cv-address slot="address">`` over which the value to be displayed is transmitted.
In addition, a label can be added via ``<span slot="label">``.
The value can be :ref:`formatted <format>` and supplemented with additional text via the ``format`` attribute.

It is also possible to adapt the icon via a mapping to display an icon for open or closed windows, depending on the value.
An additional styling can be used to color the icon accordingly.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-status-closed" margin="0 10 10 0">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-status-opened" margin="0 10 10 0">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="WindowOpen">
            <entry value="0">knxuf-fts_window_1w</entry>
            <entry range-min="1">knxuf-fts_window_1w_open</entry>
        </cv-mapping>
        <cv-styling name="OpenAlert">
            <entry range-min="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-status format="%d open">
        <cv-value slot="icon" mapping="WindowOpen" styling="OpenAlert">
            <cv-icon size="x-large" class="value">knxuf-fts_window_1w_open</cv-icon>
            <cv-address transform="DPT:5.010" mode="read">1/4/2</cv-address>
        </cv-value>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <span slot="label">Windows</span>
    </cv-status>

To achieve this a simple :ref:`cv-icon <tile-component-icon>` is not used for the "icon" slot, but a
:ref:`cv-value <tile-component-value>` with a :ref:`cv-icon <tile-component-icon>` inside.
This allows you to define a mapping/styling for this icon. To ensure that the value element uses the same values as the status element,
the same :ref:`cv-address <tile-element-address>` element must be used here again.

To provide further details on the status, this widget can be linked to a :ref:`popup <tile-component-popup>`.
When clicking on the status widget, a popup opens with additional information.

Allowed attributes in the status element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-status tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-status tile
