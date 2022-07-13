.. _tile-component-List:

List
====

.. api-doc:: cv.ui.structure.tile.components.List


Beschreibung
------------

Mit der List-Komponente lassen sich Listen von gleichartigen Elementen erzeugen. Die Liste benötigt dafür ein
Datenmodell, welches einen Eintrag mit Daten für jedes Element in der Liste enthält und ein Template, welches
den HTML-Code für die jeweiligen Listen-Elemente definiert. Die List-Komponente erzeugt nun ein HTML-Element, basierend
auf dem Template und füllt dieses mit den Daten aus einem Eintrag des Datenmodells.

.. widget-example::

    <settings design="tile" selector="cv-tile">
        <screenshot name="cv-js-list" />
    </settings>
    <cv-tile>
        <cv-list rowspan="3" colspan="3">
            <model>
                <script><![CDATA[
                    for (let i = 0; i < 3; i++) {
                        model.push({
                            label: 'This is list item no ' + i,
                            subLabel: 'Sublabel number ' + i
                        })
                    }]]>
                </script>
            </model>
            <template>
                <li>
                    <label class="primary">${label}</label>
                    <label class="secondary">${subLabel}</label>
                </li>
            </template>
        </cv-list>
    </cv-tile>

Das Datenmodell wird in diesem Fall aus einfachen JavaScript-Code erzeugt und hat folgenden Inhalt.

.. code-block:: json

   [
        {
            "label": "This is list item no 0",
            "subLabel": "Sublabel number 0"
        },
        {
            "label": "This is list item no 1",
            "subLabel": "Sublabel number 1"
        },
        {
            "label": "This is list item no 2",
            "subLabel": "Sublabel number 2"
        },
        {
            "label": "This is list item no 3",
            "subLabel": "Sublabel number 3"
        },
        {
            "label": "This is list item no 4",
            "subLabel": "Sublabel number 4"
        }
   ]

Für jeden Eintrag in diesem Array wird nun ein HTML-Element aus dem Template erzeugt und mit den Daten aus dem
Modell-Eintrag gefüllt. Für den ersten Eintrag aus dem Modell wird also folgender HTML-Code erzeugt.

.. code-block:: html

    <li>
        <label class="primary">This is list item no 0</label>
        <label class="secondary">Sublabel number 0</label>
    </li>

Datenmodell
^^^^^^^^^^^

Das Datenmodell ist ein JavaScript-Array und kann entweder durch JavaScript-Code oder von Daten aus dem Backend gefüllt werden.
Ein einfaches Beispiel für ein Script-basiertes Modell wurde bereits oben gegeben. Es ist natürlich auch möglich
komplexeren Code zu benutzen und das Modell z.B. aus externen Quellen zu laden.

**JavaScript Code als Quelle**

Wie im obigen Beispiel bereits genutzt, kann beliebiger JavaScript-Code genutzt werden um das Modell zu füllen.

**Fixes Modell**

Das Modell kann auch über einzelne ``cv-data``-Element definiert werden. Diese Element erlauben beliebige Attribute, die
ins Modell übertragen werden. Innerhalb der Templates können natürlich auch beliebige Komponenten benutzt werden.
Hier wird ein ``cv-listitem`` benutzt, welches einen bedienbaren :ref:Button <tile-component-button>` neben einem Text anzeigt.

.. widget-example::

    <settings design="tile" selector="cv-tile">
        <screenshot name="cv-data-list">
            <data address="1/4/0">0</data>
            <data address="1/4/1">1</data>
            <data address="1/4/2">0</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
    </cv-meta>
    <cv-tile>
        <cv-list rowspan="3" colspan="3">
            <model>
                <cv-data label="Licht WZ" control-address="1/4/0" />
                <cv-data label="Licht Büro" control-address="1/4/1" />
                <cv-data label="Licht SZ" control-address="1/4/2" />
            </model>
            <template>
                <cv-listitem>
                    <cv-button class="round-button" mapping="light" size="small">
                        <cv-address mode="readwrite" transform="DPT:1.001">${control-address}</cv-address>
                        <cv-icon class="value" />
                    </cv-button>
                    <div class="content">
                        <label class="primary">${label}</label>
                    </div>
                </cv-listitem>
            </template>
        </cv-list>
    </cv-tile>


Das daraus erzeugte Modell hat folgenden Inhalt:

.. code-block:: json

    [
        {
            "index": 0,
            "label": "Licht WZ",
            "control-address": "1/4/0"
        },
        {
            "index": 1,
            "label": "Licht Büro",
            "control-address": "1/4/1"
        },
        {
            "index": 2,
            "label": "Licht SZ",
            "control-address": "1/4/2"
        }
    ]


**Backend als Quelle**

Das Backend als Quelle zu nutzen funktioniert momentan nur mit dem openHAB Backend und den dort vorhandenen GroupItems.
Die Mitglieder dieser GroupItems sind der CometVisu bekannt und können mittels der Adresse `members:<group-name>` als
Quelle für eine Listenmodell genutzt werden. Als Transform darf hier nur ``raw`` benutzt werden.
Diese Art von Modellen erlaubt es zusätzlich nur die aktiven Mitglieder anzuzeigen (also z.B. nur eingeschaltete Lichter)
indem als Filter ``item.active===true``` benutzt wird. Ein Sortierung ist ebenfalls möglich.

Durch den Filter ist es möglich, dass das Modell leer ist. Für diesen Sonderfall kann man ein alternatives Template
definieren (``<template when="empty">``), welches dann angezeigt wird.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile" selector="cv-tile">
        <screenshot name="cv-backend-list">
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
            <caption>Modell mit Einträgen</caption>
        </screenshot>
        <screenshot name="cv-backend-list-empty">
            <data address="members:Lights" type="json">[]</data>
            <caption>Leeres Modell</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
    </cv-meta>
    <cv-tile size="1x2">
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
    </cv-tile>

Das Modell für die Mitglieder eines GroupItems, hat folgende Struktur:

.. code-block:: json

    [
    {
        "type": "switch",
        "state": "OFF",
        "label": "Licht Wohnzimmer",
        "name": "Light_FF_Living",
        "active": true
    },
    {
        "type": "switch",
        "state": "OFF",
        "label": "Licht Bad",
        "name": "Light_FF_Toilet",
        "active": true
    },
    {
        "type": "switch",
        "state": "OFF",
        "label": "Licht Küche",
        "name": "Light_FF_Kitchen",
        "active": true
    }]

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-list tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-list tile
