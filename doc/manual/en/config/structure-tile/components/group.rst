.. _tile-component-group:

Group
.....

.. api-doc:: cv.ui.structure.tile.widgets.Group

The group component can be used to group :ref:`widgets <tile-widgets>`. Groups always have a visible title that spans the
entire available width and below that the widgets. Groups can be open (widgets are visible) or closed (widgets are not
visible). By clicking on the title, the state can be toggled between these states.

.. widget-example::

    <settings design="tile" selector="cv-group" content-class="">
        <screenshot name="tile-group-closed" screen-width="400" waitfor="cv-group > summary > label.title" margin="0 0 0 10">
            <caption>closed group</caption>
        </screenshot>
        <screenshot name="tile-group-open" screen-width="400" clickpath="cv-group > summary" waitfor="cv-group > cv-switch" margin="0 0 10 10">
            <caption>opened group</caption>
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
            <span slot="primaryLabel">Living room</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
           <cv-address slot="address" transform="DPT:1.001">1/4/1</cv-address>
            <span slot="primaryLabel">Bathroom</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/2</cv-address>
            <span slot="primaryLabel">Kitchen</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/3</cv-address>
            <span slot="primaryLabel">Dining room</span>
        </cv-switch>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/4</cv-address>
            <span slot="primaryLabel">Hallway</span>
        </cv-switch>
    </cv-group>

In the summary element, further :ref:`components <tile-components>` can be placed. For example, if you have a group
representing a room, you can use it to display the room temperature, the window status, and a light switch.

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
    <cv-group name="Living room">
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

    The mapping (``tile-light``) & styling (``tile-button``) used in the light switch are provided by the tile structure
    and used in the switch widget, for example. Therefore, they do not need to be defined separately in the configuration

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-group tile

