.. _tile-component-group:

Group
.....

.. api-doc:: cv.ui.structure.tile.widgets.Group

Die Group-Komponente kann genutzt werden um :ref:`Widgets <tile-widgets>` zu gruppieren. Gruppen haben immer einen sichtbaren Titel,
der die gesamte verfügbare Breite einnimmt und darunter die Widgets. Gruppen können geöffnet (Widgets sind sichtbar)
oder geschlossen sein (Widgets sind nicht sichtbar). Durch einen Klick auf den Titel kann zwischen diesen Zuständen
gewechselt werden.

.. widget-example::

    <settings design="tile" selector="cv-group" content-class="">
        <screenshot name="tile-group-closed" screen-width="400" waitfor="cv-group > summary > label.title" margin="0 0 0 10">
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
    <cv-group name="Lampen">
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

Im Summary-Element können weitere :ref:`Komponenten <tile-components>` platziert werden. Wenn man z.B. eine
Gruppe hat die einen Raum repräsentiert kann damit die z.B. Raumtemperatur, der Fenster-Status und ein
Lichtschalter angezeigt werden.

.. widget-example::

    <settings design="tile" selector="cv-group" content-class="">
        <screenshot name="tile-group-value" screen-width="400" waitfor="cv-group > summary > label.title" margin="0 10 0 10">
            <data address="1/4/0">21.5</data>
            <data address="1/4/1">1</data>
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="OpenClose">
            <entry value="1">knxuf-fts_window_1w_open</entry>
            <entry value="0">knxuf-fts_window_1w</entry>
        </cv-mapping>
        <cv-styling name="WindowOpen">
            <entry range-min="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-group name="Wohnzimmer">
        <summary>
            <cv-value mapping="OpenClose" styling="WindowOpen">
                <cv-address mode="read" transform="DPT:1.001">1/4/1</cv-address>
                <cv-icon class="value" size="large"/>
            </cv-value>
            <cv-button class="round-button" mapping="tile-light" styling="tile-button" size="small">
                <cv-address transform="DPT:1.001">1/4/2</cv-address>
                <cv-icon class="value ri-question-mark"/>
            </cv-button>
            <cv-value format="%.1f °C">
                <cv-address mode="read" transform="DPT:9.001">1/4/0</cv-address>
                <label class="value"/>
            </cv-value>
        </summary>
    </cv-group>

.. HINT::

    Das in dem Lichtschalter benutzte Mapping(``tile-light``) & Styling (``file-button``) wird von der Tile-Struktur
    mitgeliefert und z.B. im Switch-Widget benutzt. Daher müssen diese nicht extra in der Konfigurationsdatei definiert
    werden.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-group tile

