.. _tile-component-svg-round-value-entity:

SVG round value
===============

.. api-doc:: cv.ui.structure.tile.components.svg.RoundValue

Beschreibung
------------

Die SVG round value Komponente besteht aus einem Icon und einem Text in einem farbigen Kreis. Sie bildet die technische
Basis für die :ref:`Power Entity Komponente<tile-component-power-entity>` und wird dadurch normalerweise in der
:ref:`Flow Komponente<tile-component-flow>` bzw. dem :ref:`Energy Widget<tile-energy>` eingesetzt.
Funktional ähnelt diese Komponente der :ref:`Value Komponente<tile-component-value>`.

.. widget-example::

    <settings design="tile" selector="cv-svg-round-value" wrap-in="cv-widget" wrapped-position="row='1' column='1'" margin="10 10 10 10">
        <screenshot name="cv-svg-round-value">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-svg-round-value format="%d%%" icon="knxuf-measure_battery_100">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-round-value>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-svg-round-value tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-svg-round-value tile
