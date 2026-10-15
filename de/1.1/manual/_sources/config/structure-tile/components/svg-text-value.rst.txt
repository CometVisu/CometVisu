.. _tile-component-svg-text-value-entity:

SVG text value
===============

.. api-doc:: cv.ui.structure.tile.components.svg.TextValue

Beschreibung
------------

Die SVG text value Komponente besteht aus einem Icon oder einem Title und einem Wert. Sie bildet die technische
Basis für die :ref:`Energy Entity Komponente<tile-component-energy-entity>` und wird im
:ref:`Energy Widget<tile-energy>` eingesetzt.

.. widget-example::

    <settings design="tile" selector="svg > svg" wrap-in="cv-energy" wrapped-position="column='1'">
        <screenshot name="cv-svg-text-value" margin="10 10 10 10">
            <caption>Mit Icon</caption>
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-text-value format="%d%%" icon="knxuf-measure_battery_100" column="1">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-text-value>

.. widget-example::

    <settings design="tile" selector="svg > svg" wrap-in="cv-energy" wrapped-position="column='1'">
        <screenshot name="cv-svg-text-value-title" margin="10 10 10 10">
            <caption>Mit Titel</caption>
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-text-value format="%d%%" title="Batterie" column="1">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-text-value>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-svg-text-value tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-svg-text-value tile
