.. _tile-component-group:

Group
.....

Die Group-Komponente kann genutzt werden um :ref:`Widgets <tile-widgets>` zu gruppieren. Gruppen haben immer einen sichtbaren Titel,
der die gesamte verfügbare Breite einnimmt und darunter die Widgets. Gruppen können geöffnet (Widgets sind sichtbar)
oder geschlossen sein (Widgets sind nicht sichtbar). Durch einen Klick auf den Titel kann zwischen diesen Zuständen
gewechselt werden.

.. widget-example::

    <settings design="tile" selector="cv-group" content-class="">
        <screenshot name="tile-group-closed" screen-width="400">
            <caption>geschlossene Gruppe</caption>
        </screenshot>
        <screenshot name="tile-group-open" screen-width="400" clickpath="cv-group > summary" waitfor="cv-group > cv-switch" margin="0 0 10 10">
            <caption>geöffnete Gruppe</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="1">active</entry>
            <entry value="0">inactive</entry>
        </cv-styling>
    </cv-meta>
    <cv-group>
        <summary>Lampen</summary>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="primaryLabel">Wohnzimmer</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
           <cv-address slot="address" transform="DPT:1.001">1/4/1</cv-address>
            <span slot="primaryLabel">Bad</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/2</cv-address>
            <span slot="primaryLabel">Küche</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/3</cv-address>
            <span slot="primaryLabel">Esszimmer</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/4</cv-address>
            <span slot="primaryLabel">Flur</span>
        </cv-switch>
    </cv-group>


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-group tile

