.. _tile-component-power-entity:

Power entity
============

.. api-doc:: cv.ui.structure.tile.components.energy.PowerEntity

Beschreibung
------------

Mit der ``<cv-power-entity>``-Komponente lässt sich die elektrische Leistung
eines bestimmten Geräts anzeigen. Es besteht aus einem Icon, einem Wert in der Einheit Watt und
einem farblichen Kreis um beide, der optional auch einen Fortschrittsbalken enthalten kann (z.B.
im den Ladestand einer Batterie anzuzeigen).

Das Power-Entity ist im Kern ein :ref:`Svg round value<tile-component-svg-round-value-entity>` mit
vordefiniertem Farbschema, Icon und speziellem Mapping für den Wert. Diese Voreinstellungen
sind an das ``type``-Attribut gebunden.

Es existieren folgende Power entity Typen:

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

So entspricht zum Beispiel ein

.. code-block:: xml

    <cv-power-entity type="pv">
       <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-power-entity>

einem

.. code-block:: xml

    <cv-svg-round-value icon="knxuf-weather_sun" styling="tile-pv-power" mapping="tile-kilo-watts">
       <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
    </cv-svg-round-value>

Werte addieren
^^^^^^^^^^^^^^

Man kann auch mehrere Werte addiert in dieser Komponente anzeigen. Hat man z.B. mehrere einzelnen PV-Module
so kann man die mit einer :ref:`Address-Group <tile-element-address-group>` summieren und die Menge der
Werte die ungleich 0 sind werden neben dem Icon angezeigt.

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


Verbindungen
^^^^^^^^^^^^

Power Entities können mit einander verbunden werden. Das wird durch eine Linie zwischen 2 Entities dargestellt.
Diese Linie kann eine Pfeilspitze an einem der beiden Enden haben um eine Richtung darzustellen.
Die Richtung stellt dann den Energiefluss dar, z.B. vom PV-Modul ins Haus.

Weitere Informationen zu den Verbindungen sind im :ref:`Energy-Widget<tile-energy-flow>` zu finden.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-power-entity tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-power-entity tile
