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

    <settings design="tile" selector="cv-widget">
        <screenshot name="cv-js-list" />
    </settings>
    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3">
                <model>
                    <script><![CDATA[
                        for (let i = 0; i < 4; i++) {
                            model.push({
                                label: 'Listeneintrag ' + i,
                                subLabel: 'Zusatztext Nummer ' + i
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
    </cv-widget>

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


.. _tile-component-List-date-format:

Datum formatieren
^^^^^^^^^^^^^^^^^

Sofern in dem Modell ein Datumswert vorhanden ist, kann dieser entsprechend formatiert ausgegeben werden.
Angenommen der Datumswert ist im Modell unter dem Namen ``published`` vorhanden, so kann dann im Template folgendes
benutzt werden ``<div>${published|dd.MM.yyyy HH:mm}</div>``. Das Datumsformat wird durch ein ``|`` vom Variablennamen getrennt.
Eine Liste der möglichen Format-Einträge gibt es hier: `DateFormat <https://www.cometvisu.org/CometVisu/en/latest/api/#qx.util.format.DateFormat>`_

Daten senden bei Selektion
^^^^^^^^^^^^^^^^^^^^^^^^^^

Sofern als Listen-Elemente ``<cv-listitem>`` benutzt werden besteht die Möglichkeit beim Klick auf ein solches
einen Wert an das Backend zu senden. Wenn das Modell z.B. ein ``value``-Attribut enthält, kann dieser Wert
an eine Backend-Adresse gesendet werden.

.. code-block:: xml

    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3">
                <cv-address transform="DPT:5.010" mode="write">1/4/1</cv-address>
                <model>
                    <script><![CDATA[
                        for (let i = 0; i < 4; i++) {
                            model.push({
                                label: 'Listeneintrag ' + i,
                                value: i
                            })
                        }]]>
                    </script>
                </model>
                <template>
                    <cv-listitem onclick="fireEvent('sendState', ${value})">
                        <div class="content">
                          <label class="primary">${label}</label>
                        </div>
                    </cv-listitem>
                </template>
            </cv-list>
        </cv-tile>
    </cv-widget>

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

    <settings design="tile" selector="cv-widget">
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
    <cv-widget>
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
    </cv-widget>


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
in dem als Filter ``item.active===true``` benutzt wird. Ein Sortierung ist ebenfalls möglich.

Durch den Filter ist es möglich, dass das Modell leer ist. Für diesen Sonderfall kann man ein alternatives Template
definieren (``<template when="empty">``), welches dann angezeigt wird.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile" selector="cv-widget">
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
    <cv-widget size="1x2">
        <cv-tile>
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
    </cv-widget>

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

**Mitgelieferte Modelle**

Die CometVisu liefert einige vordefinierte Modelle mit, mit denen einige Datenquellen von Plugins eingebunden werden
können. Bisher ist es möglich die Anrufliste einer Fritz!Box über das :doc:`tr064 <../../widgets/plugins/tr064/index>`-Plugin und die Daten aus der
:doc:`RSSlog <../../widgets/plugins/rsslog/index>` -Datenbank abzufragen. Hierfür ist es nicht nötig die Plugins in der Config einzubinden, denn
es werden nur die Daten abgefragt und ansonsten nichts von den Plugins selbst benutzt.
Erforderliche Konfigurationen, wie z.B. das Hinterlegen von Zugangsdaten in der versteckten 
Konfiguration, wie z.B. für das :doc:`tr064 <../../widgets/plugins/tr064/index>`-Plugin müssen natürlich auch hier vorgenommen werden, damit die
Datenabfrage für Listen-Modelle funktioniert.

.. HINT::

    Für die beiden hier vorgestellten Modelle ist es zwingend erforderlich, dass die CometVisu von einem Webserver
    mit PHP-Support ausgeliefert wird. Im Offiziellen Docker-Container der CometVisu ist diese Voraussetzung gegeben.
    Wird die CometVisu von dem openHAB-Webserver ausgeliefert, ist dies nicht der Fall und die Listen-Modelle können
    nicht benutzt werden.

Beispiel zur Anzeige der Anruferliste aus dem tr064-Plugin:

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/tr064_proxy.xml" target-path="resource/plugins/tr064/proxy.php"/>
            <fixture source-file="source/test/fixtures/tr064_soap.json" target-path="resource/plugins/tr064/soap.php"/>
        </fixtures>
        <screenshot name="cv-tr064plugin-list"></screenshot>
    </settings>
    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3" refresh="120">
                <model class="FritzCallList" parameters="device=tr064device,max=10"/>
                <template>
                  <li>
                    <div style="float: left; font-size: 1.5em; padding-right: 8px">
                      <i class="knxuf-phone_call_in" style="color: #268DDA; vertical-align: middle;" when="${Type}=1"/>
                      <i class="knxuf-phone_missed_in" style="color: #E45F3B; vertical-align: middle;" when="${Type}=2"/>
                      <i class="knxuf-phone_call_out" style="color: #8BBF68; vertical-align: middle;" when="${Type}=3"/>
                    </div>
                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${Name || Caller}
                      <div style="font-size: 0.9em; color: #777;">${Date}</div>
                    </div>
                  </li>
                </template>
            </cv-list>
        </cv-tile>
    </cv-widget>

Beispiel zur Anzeige der Eintrage aus dem RssLog-Plugin:

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/rsslog.json" target-path="resource/plugins/rsslog/rsslog.php" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-rsslogplugin-list"></screenshot>
    </settings>
    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3" refresh="120">
                <model class="RssLog" parameters="limit=10"/>
                <template>
                  <li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    <div style="font-weight: bold">${title}</div>
                    <div style="color: #999">${content}</div>
                  </li>
                </template>
            </cv-list>
        </cv-tile>
    </cv-widget>

.. NOTE::

    Der Wert ``publishedDate`` ist als Javascript Date-Object unter dem Namen ``published`` abfragbar. Dadurch wird es möglich
    das Datum in dem gewünschten Format auszugeben: :ref:`tile-component-List-date-format`

Dieses Modell unterstützt auch einige weitere Features des RssLog-Plugins: Mapping und das Bestätigen oder Löschen eines
Eintrags.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/rsslog.json" target-path="resource/plugins/rsslog/rsslog.php" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-rsslogplugin-list-features"></screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="StateConfirm">
            <entry value="0"><cv-icon color="#A00000">knxuf-info_warning</cv-icon></entry>
            <entry value="1"><cv-icon color="#00A000">knxuf-info_ack</cv-icon></entry>
        </cv-mapping>
    </cv-meta>
    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3" refresh="120">
                <model class="RssLog" parameters="limit=10"/>
                <template>
                    <li style="display: flex; align-items: center; gap: 8px;">
                        <div data-action="toggle-state">${mappedState}</div>
                        <div style="flex: 1">
                            <div style="font-weight: bold">${title}</div>
                            <div style="color: #999; display: flex; align-items: center;">${content}</div>
                        </div>
                        <cv-icon data-action="delete" size="small" color="rgb(255 86 86)">ri-close-line</cv-icon>
                    </li>
                </template>
            </cv-list>
        </cv-tile>
    </cv-widget>

Um einen Eintrag bestätigen oder löschen zu können muss das Element, welches diese Aktion bei einem Klick auslösen soll
mit dem Attribute ``data-action`` versehen werden. Die Werte dieses Attributs bestimmen die Aktion die ausgelöst werden soll.
Momentan sind folgende Werte möglich: ``toggle-state`` (bestätigen) und ``delete`` (löschen).

Das Löschen eines Eintrags muss vom Benutzer immer zusätzlich in einem Popup bestätigt werden. Die Bestätigungsabfrage kann man
deaktivieren durch folgendes Attribut ``data-no-confirm="true"``.

Sofern der Eintrag mit einem Mapping angelegt wurde, kann dieser mit ``${mappedState}`` im Template benutzt werden.

openHAB persistence service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Es besteht die Möglichkeit die Historie eines openHAB-Items als Listen-Modell zu nutzen. Ein einfaches Beispiel dazu
zeigt die Historie des Items ``MyItem``:

.. code-block:: xml

    <cv-widget>
        <cv-tile>
            <cv-list rowspan="3" colspan="3" refresh="120">
                <model class="OpenHAB" parameters="item=MyItem"/>
                <template>
                  <li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    <div style="color: #999">${content}</div>
                  </li>
                </template>
            </cv-list>
        </cv-tile>
    </cv-widget>



Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-list tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-list tile
