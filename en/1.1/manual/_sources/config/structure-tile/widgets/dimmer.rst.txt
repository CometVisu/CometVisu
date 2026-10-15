.. _tile-dimmer:

The dimmer widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The dimmer widget combines a switch with the ability to set a brightness value.
A :ref:`Button <tile-component-button>` is used for the switch and a vertical :ref:`Slider <tile-component-slider>`
for the brightness value.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-dimmer" margin="0 10 10 0">
            <data address="1/4/0">1</data>
            <data address="1/4/1">80</data>
        </screenshot>
    </settings>
    <cv-dimmer>
        <cv-address slot="switchAddress" transform="DPT:1.001">1/4/0</cv-address>
        <cv-address slot="brightnessAddress" transform="DPT:5.001">1/4/1</cv-address>
        <span slot="primaryLabel">Dimmer</span>
        <span slot="secondaryLabel">Living room</span>
    </cv-dimmer>


Allowed attributes in the dimmer element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-dimmer tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-dimmer tile
