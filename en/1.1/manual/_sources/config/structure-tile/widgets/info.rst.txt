.. _tile-info:

The info widget
===============

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The info widget represents a value with an optional unit and an additional explanatory text.
It can be used to display temperatures or consumption values, for example.
A :ref:`Value <tile-component-value>` is used to display the value.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info" margin="0 10 10 0">
            <data address="1/4/2">21.5</data>
        </screenshot>
    </settings>
    <cv-info format="%.2f">
        <cv-address slot="address" mode="read" transform="DPT:9.001">1/4/2</cv-address>
        <span slot="label">Living room</span>
        <span slot="unit">°C</span>
    </cv-info>

It is necessary to specify a ``<cv-address slot="address">`` through which the value to be displayed is transmitted.
In addition, a unit for the value can be specified with ``<span slot="unit">`` and a label
via ``<span slot="label">``. The value can be :ref:`formatted <format>` using the ``format`` attribute.

It is also possible to specify the unit via the formatting, then it is displayed next to the value and not
below it.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info-format" margin="0 10 10 0">
            <data address="1/4/2">21.5</data>
        </screenshot>
    </settings>
    <cv-info format="%.1f°C">
        <cv-address slot="address" mode="read" transform="DPT:9.001">1/4/2</cv-address>
        <span slot="label">Living room</span>
    </cv-info>

It is of course also possible to use one of the other display formats of the :ref:`Value <tile-component-value>`.
For displaying numbers, a progress bar is a good choice, for example.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info-progress" margin="0 10 10 0">
            <data address="1/4/2">66</data>
        </screenshot>
    </settings>
    <cv-info format="%d%%">
        <cv-address slot="address" mode="read" transform="DPT:5.001">1/4/2</cv-address>
        <cv-round-progress slot="value-component" type="semiCircle"/>
        <span slot="label">Volume</span>
    </cv-info>

Or an :ref:`Icon <tile-component-icon>` to show a window status.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-info-icon-closed" margin="0 10 10 0">
            <data address="1/4/2">0</data>
            <caption>Window closed</caption>
        </screenshot>
        <screenshot name="cv-info-icon-opened" margin="0 10 10 0">
            <data address="1/4/2">1</data>
            <caption>Window opened</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="WindowOpen">
            <entry value="0">knxuf-fts_window_1w</entry>
            <entry value="1">knxuf-fts_window_1w_open</entry>
        </cv-mapping>
        <cv-styling name="WindowOpen">
            <entry value="0">green</entry>
            <entry value="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-info mapping="WindowOpen" styling="WindowOpen">
        <cv-address slot="address" mode="read" transform="DPT:1.001">1/4/2</cv-address>
        <cv-icon slot="value-component" size="xxx-large"/>
        <span slot="label">Window LR</span>
    </cv-info>


Allowed attributes in the Info element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-info tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-info tile
