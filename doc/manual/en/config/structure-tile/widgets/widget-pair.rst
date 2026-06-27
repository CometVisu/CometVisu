.. _tile-widget-pair:

The widget-pair
===============

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The widget-pair allows to display two simple widgets with half height one below the other.
The total height of both widgets corresponds exactly to the height of a normal widget and thus fits into the layout.
Of course, it only makes sense to use widgets within the widget-pair that have little content and are thus still usable
with the reduced space. Currently, you can only use the :ref:`Switch <tile-switch>` widget here or define your own within a ``cv-widget`` element.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-widget-pair" margin="0 10 10 0">
        </screenshot>
    </settings>
    <cv-widget-pair>
        <cv-switch button-size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="secondaryLabel">Living room</span>
        </cv-switch>
        <cv-switch button-size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/1</cv-address>
            <span slot="secondaryLabel">Bedroom</span>
        </cv-switch>
    </cv-widget-pair>

Allowed attributes in the widget-pair element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-widget-pair tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-widget-pair tile
    :depth: 1
    :exclude-attributes: size
