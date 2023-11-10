.. _tile-energy:

Das Energy Widget
=================

.. api-doc:: cv.ui.structure.tile.components.Flow

Beschreibung
------------

Mit dem Energy-Widget lassen sich die Energieflüsse innerhalb eines Hauses darstellen.
In der Standardkonfiguration zeigt das Widget aktuelle Werte der elektrischen Leistung (Watt)
und deren Flussrichtung für folgende Typen an: Photovoltaik-Inverter, Batteriespeicher, diverse Verbraucher
und den Hauptstromzähler. Diese Elemente werden eingeblendet, sofern man eine ``<cv-address>`` für 
den entsprechenden Slot hinzufügt. Ein komplettes Beispiel würde so aussehen:

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-energy-full" margin="0 10 10 0">
            <data address="1/4/27">767</data>
            <data address="1/4/42">80</data>
            <data address="1/4/25">186</data>
            <data address="1/4/43">10</data>
            <data address="1/4/42">-1100.0</data>
        </screenshot>
    </settings>
    <cv-energy>
        <cv-address slot="pv-power" transform="DPT:12.001" mode="read">1/4/27</cv-address>
        <cv-address slot="battery-power" transform="DPT:13.001" mode="read">1/4/42</cv-address>
        <cv-address slot="battery-other" transform="DPT:5.001" mode="read" target="progress">1/4/43</cv-address>
        <cv-address slot="grid-power" transform="DPT:13.001" mode="read">1/4/25</cv-address>
        <cv-address slot="charger-power" transform="DPT:12.001" mode="read">1/4/44</cv-address>
        <cv-address slot="charger-power" transform="DPT:12.001" mode="read">1/4/46</cv-address>
        <cv-address slot="heatpump-power" transform="DPT:12.001" mode="read">1/4/45</cv-address>             
    </cv-energy>


Erlaubte Attribute im Switch-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-energy tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-energy tile
