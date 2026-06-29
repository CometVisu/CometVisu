.. _tile-component-power-entity:

Power entity
============

.. api-doc:: cv.ui.structure.tile.components.energy.PowerEntity

Description
-----------

The ``<cv-power-entity>`` component displays the electrical power of a specific device. It consists of an icon,
a value in the unit Watt and a colored circle around both, which can optionally also contain a progress bar
(e.g. to display the charge level of a battery).

The Power Entity is essentially a :ref:`Svg round value<tile-component-svg-round-value-entity>` with predefined
color scheme, icon and special mapping for the value. These presets are bound to the ``type`` attribute.

There are the following Power entity types:

.. list-table::

    * - .. figure:: _static/cv-power-entity-pv.png

        ``type="pv"``

      - .. figure:: _static/cv-power-entity-battery.png

        ``type="battery"``

      - .. figure:: _static/cv-power-entity-grid.png

        ``type="grid"``

    * - .. figure:: _static/cv-power-entity-charger.png

        ``type="charger"``

      - .. figure:: _static/cv-power-entity-consumer.png

        ``type="consumer"``

      - .. figure:: _static/cv-power-entity-heatpump.png

        ``type="heatpump"``

    * - .. figure:: _static/cv-power-entity-house.png

        ``type="house"``

      -
      -

.. widget-example::
    :hide: true

    <settings design="tile">
        <screenshot name="cv-power-entity-pv" selector="svg #pv" margin="5 5 5 5">
            <data address="1/4/2">75</data>
        </screenshot>
        <screenshot name="cv-power-entity-battery" selector="svg #battery" margin="5 5 5 5">
            <data address="1/4/4">75</data>
            <data address="1/4/3">50</data>
        </screenshot>
        <screenshot name="cv-power-entity-grid" selector="svg #grid" margin="5 5 5 5">
            <data address="1/4/5">75</data>
        </screenshot>
        <screenshot name="cv-power-entity-house" selector="svg #house" margin="5 5 5 5"/>
        <screenshot name="cv-power-entity-consumer" selector="svg #consumer" margin="5 5 5 5"/>
        <screenshot name="cv-power-entity-charger" selector="svg #charger" margin="5 5 5 5"/>
        <screenshot name="cv-power-entity-heatpump" selector="svg #heatpump" margin="5 5 5 5"/>
    </settings>
    <cv-energy style="border-radius: 0">
        <cv-power-entity type="pv" id="pv" column="1">
            <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        </cv-power-entity>
        <cv-power-entity type="battery" id="battery" row="1" column="0">
            <cv-address transform="DPT:13.001" mode="read">1/4/4</cv-address>
            <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/3</cv-address>
        </cv-power-entity>
        <cv-power-entity type="grid" id="grid" row="1" column="2">
            <cv-address transform="DPT:13.001" mode="read">1/4/5</cv-address>
        </cv-power-entity>
        <cv-power-entity type="consumer" id="consumer" row="2" column="0">
            <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        </cv-power-entity>
        <cv-power-entity type="charger" id="charger" row="2" column="1">
            <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        </cv-power-entity>
        <cv-power-entity type="heatpump" id="heatpump" row="2" column="2">
            <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        </cv-power-entity>
        <cv-address slot="house-power" transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-energy>

The following example:

.. code-block:: xml

    <cv-power-entity type="pv">
       <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-power-entity>

is the same as:

.. code-block:: xml

    <cv-svg-round-value icon="knxuf-weather_sun" styling="tile-pv-power" mapping="tile-kilo-watts">
       <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-round-value>

Adding values
^^^^^^^^^^^^^

It is also possible to display multiple values added in this component. If you have multiple individual PV modules,
you can sum them up with an :ref:`Address-Group <tile-element-address-group>` and the quantity of values that are
not equal to 0 will be displayed next to the icon.

.. widget-example::
    :hide-source: true

    <settings design="tile">
        <screenshot name="cv-power-entity-multiple" selector="svg #pv" margin="5 5 5 5">
            <data address="1/4/2">300</data>
            <data address="1/4/3">300</data>
        </screenshot>
    </settings>
    <cv-energy>
        <cv-power-entity type="pv" id="pv" column="1">
            <cv-address-group operator="+">
                <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
                <cv-address transform="DPT:12.001" mode="read">1/4/3</cv-address>
            </cv-address-group>
        </cv-power-entity>
    </cv-energy>

.. code-block:: xml

    <cv-power-entity type="pv">
        <cv-address-group operator="+">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
            <cv-address transform="DPT:12.001" mode="read">1/4/3</cv-address>
        </cv-address-group>
    </cv-power-entity>


Connections
^^^^^^^^^^^

Multiple Power Entities can be connected to each other. This is represented by a line between 2 entities.
This line can have an arrowhead at one of the two ends to represent a direction.
The direction then represents the flow of energy, e.g. from the PV module to the house.

More information about the connections can be found in the :ref:`Energy-Widget<tile-energy-flow>`.

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-power-entity tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-power-entity tile
