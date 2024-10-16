.. _tile-component-svg-round-value-entity:

SVG round value
===============

.. api-doc:: cv.ui.structure.tile.components.svg.RoundValue

Description
-----------

The SVG round value component consists of an icon and a text in a colored circle. It forms the technical basis for the
:ref:`Power Entity Component<tile-component-power-entity>` and is therefore usually used in the
:ref:`Energy Widget<tile-energy>`.
Functionally, this component is similar to the :ref:`Value Component<tile-component-value>`.

.. widget-example::

    <settings design="tile" selector="cv-svg-round-value" wrap-in="cv-widget" wrapped-position="row='2' column='2'">
        <screenshot name="cv-svg-round-value" margin="10 10 10 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-round-value format="%d%%" icon="knxuf-measure_battery_100">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-round-value>

The outer circle can optionally be used as a progress bar.

.. widget-example::

    <settings design="tile" selector="cv-svg-round-value" wrap-in="cv-widget" wrapped-position="row='2' column='2'">
        <screenshot name="cv-svg-round-progress" margin="10 10 10 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-round-value format="%d%%" icon="knxuf-measure_battery_100">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/2</cv-address>
    </cv-svg-round-value>

The colors of the circle and the progress bar can be changed.

.. widget-example::

    <settings design="tile" selector="cv-svg-round-value" wrap-in="cv-widget" wrapped-position="row='2' column='2'">
        <screenshot name="cv-svg-round-colored" margin="10 10 10 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-round-value format="%d%%" icon="knxuf-measure_battery_100" background-color="black" foreground-color="red">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/2</cv-address>
    </cv-svg-round-value>

Allowed Attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-svg-round-value tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-svg-round-value tile
