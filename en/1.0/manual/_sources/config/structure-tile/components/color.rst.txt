.. _tile-component-color:

Color
=====

.. api-doc:: cv.ui.structure.tile.components.Color


Description
-----------

The color element allows the visualization and manipulation of an RGB lighting.
For color selection, the :ref:`ColorChooser <colorchooser>` from the Pure structure is used in a popup.
Therefore, all possibilities that this offers are also available.
In the tile, the current color value is displayed via the icon color. Clicking on the button opens the popup with the ColorChooser.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-color" selector="cv-widget" sleep="10">
            <data address="1/2/59">50</data>
            <data address="1/2/60">60</data>
            <data address="1/2/61">100</data>
            <caption>Normal view</caption>
        </screenshot>
        <screenshot name="cv-color-popup" clickpath="cv-color" waitfor="cv-popup" selector="cv-popup" margin="10 10 10 10">
            <data address="1/2/59">50</data>
            <data address="1/2/60">60</data>
            <data address="1/2/61">100</data>
            <caption>Color selection in popup</caption>
        </screenshot>
    </settings>
    <cv-widget>
        <cv-tile>
          <cv-row colspan="3" row="2">
            <cv-color controls="LCh-box;T:2500-15000;Y" title="Closet light">
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-r">1/2/59</cv-address>
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-g">1/2/60</cv-address>
              <cv-address transform="DPT:5.001" mode="readwrite" variant="RGB-b">1/2/61</cv-address>
              <cv-icon class="value">ri-lightbulb-line</cv-icon>
            </cv-color>
          </cv-row>
          <cv-row colspan="3" row="last">
            <label class="primary">Closet light</label>
          </cv-row>
        </cv-tile>
    </cv-widget>


Allowed Attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-color tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-color tile

