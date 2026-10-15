.. _tile-component-select:

Select
======

.. api-doc:: cv.ui.structure.tile.components.Select


Description
------------

The Select component allows you to select a value from a predefined list.
A possible use case is, for example, selecting the operating mode of a room temperature controller.
The currently selected value is displayed and when you click on the component, the list opens
with possible values from which one can be selected.

With the ``show`` attribute you can specify whether only the icon (``show="icon"``), only
the text (``show="label"``) or both (``show="both"``) of the currently selected value is displayed. If the attribute is not specified,
both are displayed.

.. widget-example::

    <settings design="tile" selector="cv-select" wrap-in="cv-widget"  wrapped-position="colspan='3' row='middle' column='middle'">
        <screenshot name="cv-select-auto">
            <data address="1/4/2">0</data>
            <caption>Normal view</caption>
        </screenshot>
        <screenshot name="cv-select-comfort" clickpath="cv-select" margin="0 0 200 0">
            <data address="1/4/2">0</data>
            <caption>with opened selection list</caption>
        </screenshot>
    </settings>
    <cv-select>
        <cv-address transform="DPT:20.102">1/4/2</cv-address>
        <cv-option key="auto">
            <cv-icon>ri-character-recognition-line</cv-icon>Auto
        </cv-option>
        <cv-option key="comfort">
            <cv-icon>ri-temp-cold-line</cv-icon>Comfort
        </cv-option>
        <cv-option key="standby">
            <cv-icon>ri-shut-down-line</cv-icon>Off
        </cv-option>
        <cv-option key="economy">
            <cv-icon>ri-leaf-line</cv-icon>Eco
        </cv-option>
        <cv-option key="building_protection">
            <cv-icon>ri-shield-line</cv-icon>Frost protection
        </cv-option>
    </cv-select>

To be able to display the current value, a read-only ``cv-address`` is required, to be able to change the value a writable one is needed.
In the example, the address is both (default).
The entries in the selection list are defined by ``cv-option`` elements.
These have a ``key`` which corresponds to the value that is read from or sent to the address and
a content, which in the example consists of a combination of an :ref:`Icon <tile-component-icon>` and text.


Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-select tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-select tile

