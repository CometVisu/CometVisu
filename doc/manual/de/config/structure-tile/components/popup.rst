.. _tile-component-popup:

Popup
.....

.. api-doc:: cv.ui.structure.tile.widgets.Popup

Die Popup-Komponente kann genutzt werden um :ref:`Widgets <tile-widgets>` innerhalb eines Popups anzuzeigen.
Das Popup wird zentriert als Fenster über dem aktuellen Inhalt angezeigt und ist normalerweise nicht sichtbar.
Es wird entweder durch Benutzerinteraktion wie z.B. einem Klick oder durch eingehende Daten vom Backend sichtbar gemacht.

**Details zu einem Status**

Ein Anwendungsfall ergibt sich in Verbindung mit einem :ref:`Status-Widget <tile-status>` bei dem das Status-Widget
eine Zusammenfassung liefern wie z.B. x Lichter eingeschaltet und beim Klick auf das Widget dann ein Popup geöffnet wird
in dem alle eingeschalteten Lichter aufgelistet sind. Innerhalb des Popups wird eine :ref:`Liste <tile-component-list>`
verwendet.

.. widget-example::

    <settings design="tile" selector="cv-status">
        <screenshot name="tile-status-popup-closed">
            <caption>Status-Widget, Popup geschlossen</caption>
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
            <caption>Status-Popup</caption>
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
    <cv-status format="%d an">
        <cv-icon slot="icon" size="x-large">ri-lightbulb-line</cv-icon>
        <cv-address slot="address" transform="OH:number" mode="read" backend="main">number:Lights</cv-address>
        <span slot="label">Lichter</span>
        <cv-popup slot="popup" modal="true">
            <cv-list rowspan="3" colspan="3">
                <model filter="item.active===true" sort-by="label">
                    <cv-address transform="raw" mode="read">members:Lights</cv-address>
                </model>
                <header>
                    <h4>Eingeschaltete Lichter</h4>
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
                    <li><label class="primary">Zur Zeit sind keine Lampen eingeschaltet</label></li>
                </template>
            </cv-list>
        </cv-popup>
    </cv-status>


**Öffnen bei Statusupdate**

Popups können sich auch selbstständig öffnen, wenn auf einer Adresse ein bestimmter Wert empfangen wird.
So kann man z.B. das Bild einer Kamera an der Haustür in einem Popup anzeigen, wenn es an der Tür geklingelt hat.

.. code-block:: xml

    <cv-page>
        <cv-popup modal="true" style="padding: 0" auto-close-timeout="120">
            <cv-image style="width: 470px" src="http://localhost/camera/picture" refresh="2" />
            <cv-button class="bottom green overlay">
                <cv-address mode="readwrite" transform="DPT:1.001" on="down" value="1">1/4/0</cv-address>
                <cv-address mode="write" transform="DPT:1.001" on="up" value="0">1/4/0</cv-address>
                <label class="primary value">Öffnen</label>
            </cv-button>
            <cv-address mode="read" transform="DPT:1.001" target="open">1/4/2</cv-address>
        </cv-popup>
    <cv-page>

Das Popup bindet dazu ein :ref:`Image <tile-component-image>` ein mit einer niedrigen Refresh-Rate von nur 2 Sekunden.
Über dem Bild wird ein :ref:`Button <tile-component-button>` angezeigt, der beim Drücken der Maus den Wert "1"
an die Adresse "1/4/0" sendet (``on="down" value="1"``) und beim Loslassen den Wert "0" (``on="up" value="0"``).

Das Popup öffnet sich, wenn auf der Adresse "1/4/2" der Wert "1" empfangen wird (``target="open"``).
Wenn das Popup auch geschlossen werden soll, wenn der Wert "0" empfangen wird muss ``target="open-close"`` benutzt werden.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-popup tile

