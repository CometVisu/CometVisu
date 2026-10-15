.. _tile-component-spinner:

Spinner
=======

.. api-doc:: cv.ui.structure.tile.components.Spinner


Description
------------

The spinner component is used to display and set a numerical value within a defined range of numbers, similar to the :ref:`Slider <tile-component-slider>`.
A classic use case would be setting a target temperature. The current value is displayed in the middle and
there are two buttons on the left and right to increase or decrease the value by the set step width.

.. widget-example::

    <settings design="tile" selector="cv-spinner" wrap-in="cv-widget"  wrapped-position="row='2' colspan='3'">
        <screenshot name="cv-spinner" margin="0 0 0 0">
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-spinner format="%.1f °C" min="15" max="25" step-width="0.5">
        <cv-address transform="DPT:9.001" mode="read">1/4/1</cv-address>
        <cv-address transform="DPT:9.001" mode="write">1/4/2</cv-address>
        <label class="value primary"/>
    </cv-spinner>

The value range is limited by the attributes ``min`` and ``max``. The step width can be set with the attribute ``step-width``.

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-spinner tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-spinner tile
