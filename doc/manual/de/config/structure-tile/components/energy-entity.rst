.. _tile-component-energy-entity:

Energy entity
=============

.. api-doc:: cv.ui.structure.tile.components.energy.EnergyEntity

Beschreibung
------------

Mit der ``<cv-energy-entity>``-Komponente lässt sich die elektrische Energie
eines bestimmten Geräts anzeigen. Es besteht aus einem Icon, einem Wert in der Einheit Kilo-Wattstunde und
und einem optionalen Richtungspfeil.

Das Energy-Entity ist im Kern :ref:`Svg text value<tile-component-svg-text-value-entity>` mit
vordefiniertem Farbschema, Icon und speziellem Mapping für den Wert. Diese Voreinstellungen
sind an das ``type``-Attribut gebunden. Optional kann über das ``direction``-Attribut eine Richtung
angeben werden.

Es existieren folgende Energy entity Typen:

.. list-table::

    * - .. figure:: _static/cv-energy-entity-pv.png

        ``type="pv"``

      - .. figure:: _static/cv-energy-entity-battery-in.png

        ``type="battery" direction="incoming"``

      - .. figure:: _static/cv-energy-entity-grid-in.png

        ``type="grid" direction="incoming"``

    * -

      - .. figure:: _static/cv-energy-entity-battery-out.png

        ``type="battery" direction="outgoing"``

      - .. figure:: _static/cv-energy-entity-grid-out.png

        ``type="grid" direction="outgoing"``

    * - .. figure:: _static/cv-energy-entity-charger.png

        ``type="charger"``

      - .. figure:: _static/cv-energy-entity-consumer.png

        ``type="consumer"``

      - .. figure:: _static/cv-energy-entity-heatpump.png

        ``type="heatpump"``

.. widget-example::
    :hide: true

    <settings design="tile">
        <screenshot name="cv-energy-entity-pv" selector="svg #pv" margin="5 5 5 5">
            <data address="1/4/2">7</data>
        </screenshot>
        <screenshot name="cv-energy-entity-battery-in" selector="svg #battery-in" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-battery-out" selector="svg #battery-out" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-grid-in" selector="svg #grid-in" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-grid-out" selector="svg #grid-out" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-consumer" selector="svg #consumer" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-charger" selector="svg #charger" margin="5 5 5 5"/>
        <screenshot name="cv-energy-entity-heatpump" selector="svg #heatpump" margin="5 5 5 5"/>
    </settings>
    <cv-energy style="border-radius: 0">
        <cv-energy-entity type="pv" id="pv">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="consumer" type="consumer" row="1" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity type="battery" id="battery-in" column="1" direction="incoming">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity type="battery" id="battery-out" row="1" column="1" direction="outgoing">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity type="grid" id="grid-in" column="2" direction="incoming">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity type="grid" id="grid-out" row="1" column="2" direction="outgoing">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="charger" type="charger" row="2" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="heatpump" type="heatpump" row="2" column="1">
            <cv-address transform="DPT:12.001" mode="read">1/4/2</cv-address>
        </cv-energy-entity>
    </cv-energy>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-energy-entity tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-energy-entity tile
