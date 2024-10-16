.. _tile-component-popup:

Popup
.....

.. api-doc:: cv.ui.structure.tile.widgets.Popup

The popup component can be used to display :ref:`widgets <tile-widgets>` within a popup.
The popup is centered as a window above the current content and is usually not visible.
It is made visible either by user interaction such as a click or by incoming data from the backend.

**Details to a status**

A use case arises in connection with a :ref:`status widget <tile-status>` where the status widget
provides a summary such as x lights switched on and when clicked on the widget then a popup is opened
in which all switched on lights are listed. Within the popup a :ref:`list <tile-component-list>`
is used.

.. widget-example::

    <settings design="tile" selector="cv-status">
        <screenshot name="tile-status-popup-closed">
            <caption>Status widget, popup closed</caption>
        </screenshot>
        <screenshot name="tile-status-popup-open" clickpath="cv-status" waitfor="cv-popup" selector="cv-popup" margin="50 50 50 50">
            <data address="members:Lights" type="json">[
            {
                "type": "switch",
                "state": "OFF",
                "label": "Wohnzimmer",
                "name": "Light_FF_Living",
                "active": true
            },
            {
                "type": "switch",
                "state": "OFF",
                "label": "Bad",
                "name": "Light_FF_Toilet",
                "active": true
            },
            {
                "type": "switch",
                "state": "OFF",
                "label": "Küche",
                "name": "Light_FF_Kitchen",
                "active": true
            }]
            </data>
            <data address="Light_FF_Living">1</data>
            <data address="Light_FF_Toilet">1</data>
            <data address="Light_FF_Kitchen">1</data>
            <caption>Status popup</caption>
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
    <cv-status format="%d on">
        <cv-icon slot="icon" size="x-large">ri-lightbulb-line</cv-icon>
        <cv-address slot="address" transform="OH:number" mode="read" backend="main">number:Lights</cv-address>
        <span slot="label">Lights</span>
        <cv-popup slot="popup" modal="true">
            <cv-list rowspan="3" colspan="3">
                <model filter="item.active===true" sort-by="label">
                    <cv-address transform="raw" mode="read">members:Lights</cv-address>
                </model>
                <header>
                    <h4>Lights on</h4>
                </header>
                <template>
                    <cv-listitem>
                        <cv-button class="round-button" mapping="light" size="small">
                            <cv-address mode="readwrite" transform="OH:switch">${name}</cv-address>
                            <cv-icon class="value" />
                        </cv-button>
                        <div class="content">
                            <label class="primary">${label}</label>
                        </div>
                    </cv-listitem>
                </template>
                <template when="empty">
                    <li><label class="primary">Currently all lights are switched off</label></li>
                </template>
            </cv-list>
        </cv-popup>
    </cv-status>

**Open on status update**

Popups can also open themselves when a certain value is received at an address.
For example, the image of a camera at the front door can be displayed in a popup when the doorbell rings.

.. code-block:: xml

    <cv-page>
        <cv-popup modal="true" style="padding: 0" auto-close-timeout="120">
            <cv-image style="width: 470px" src="http://localhost/camera/picture" refresh="2" />
            <cv-button class="bottom green overlay">
                <cv-address mode="readwrite" transform="DPT:1.001" on="down" value="1">1/4/0</cv-address>
                <cv-address mode="write" transform="DPT:1.001" on="up" value="0">1/4/0</cv-address>
                <label class="primary value">Open</label>
            </cv-button>
            <cv-address mode="read" transform="DPT:1.001" target="open">1/4/2</cv-address>
        </cv-popup>
    <cv-page>

The popup includes an :ref:`Image <tile-component-image>` with a low refresh rate of only 2 seconds.
Above the image a :ref:`Button <tile-component-button>` is displayed that sends the value "1" to address "1/4/0"
when the mouse is pressed (``on="down" value="1"``) and the value "0" when released (``on="up" value="0"``).

The popup opens when the value "1" is received at address "1/4/2" (``target="open"``).
If the popup should also close when the value "0" is received, ``target="open-close"`` must be used.

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-popup tile

