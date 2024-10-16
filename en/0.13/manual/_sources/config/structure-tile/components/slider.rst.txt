.. _tile-component-slider:

Slider
=======

.. api-doc:: cv.ui.structure.tile.components.Slider


Description
------------

The slider component is used to display and set a numerical value within a defined range of numbers,
similar to the :ref:`Spinner <tile-component-spinner>`.
A classic use case would be setting a dimming or volume value.
The slider consists of a horizontal bar representing the range of values and a button that can be moved over
it to set the current value.

.. widget-example::

    <settings design="tile" selector="cv-slider" wrap-in="cv-widget"  wrapped-position="row='2' colspan='3'">
        <screenshot name="cv-slider-volume" margin="0 0 0 0">
            <data address="1/4/1">60</data>
        </screenshot>
    </settings>
    <cv-slider min="0" max="100" format="%d %%">
        <cv-address transform="DPT:5.001">1/4/1</cv-address>
        <cv-icon class="decrease">ri-volume-down-line</cv-icon>
        <cv-icon class="increase">ri-volume-up-line</cv-icon>
    </cv-slider>

The value range is limited by the ``min`` and ``max`` attributes. The ``step-width`` attribute can be used to
specify how much the value increases/decreases when the slider is operated.
The display of the value as text above the slider can be turned off with ``hide-value="true"`` and
:ref:`formatted <format>` using the ``format`` attribute.

To prevent every value change from being sent directly to the backend during operation and potentially overloading it,
the ``throttle-interval`` attribute can be used to specify the minimum time in milliseconds that must pass between two value changes.

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-slider tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-slider tile
