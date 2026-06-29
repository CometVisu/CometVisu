.. _tile-component-svg-text-value-entity:

SVG text value
===============

.. api-doc:: cv.ui.structure.tile.components.svg.TextValue

Description
-----------

The SVG text value component consists of an icon or a title and a value. It forms the technical basis for the
:ref:`Energy Entity component<tile-component-energy-entity>` and is used in the
:ref:`Energy Widget<tile-energy>`.

.. widget-example::

    <settings design="tile" selector="svg > svg" wrap-in="cv-energy" wrapped-position="column='1'">
        <screenshot name="cv-svg-text-value" margin="10 10 10 10">
            <caption>With icon</caption>
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-text-value format="%d%%" icon="knxuf-measure_battery_100" column="1">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-text-value>

.. widget-example::

    <settings design="tile" selector="svg > svg" wrap-in="cv-energy" wrapped-position="column='1'">
        <screenshot name="cv-svg-text-value-title" margin="10 10 10 10">
            <caption>With title</caption>
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-text-value format="%d%%" title="Battery" column="1">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-text-value>

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-svg-text-value tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-svg-text-value tile
