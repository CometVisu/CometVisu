Grundsätzlicher Aufbau
======================

Wie der Name schon suggeriert setzt sich eine Visualisierung in der Tile-Struktur aus einzelnen Kacheln (engl. Tile)
zusammen.

Für häufig benötigte Dinge liefert die Tile-Struktur bereits Kacheln mit vor-definiertem Inhalt mit (im folgenden
Widgets genannt). So enthält das Switch-Widget z.B. einen Button in der mittleren Zelle und zentrierten Text in der Zeile darunter.

Eine Konfigurationsdatei folgt grundsätzlich folgendem Aufbau:

.. code-block:: xml

    <config>
        <cv-meta>
            <!-- Nicht sichtbare Konfigurations-Elemente -->
        </cv-meta>
        <header>
            <!-- Optionaler Inhalt oben -->
        </header>
        <main>
            <!-- Hauptinhalt inkl. optionaler Seitenleisten -->
        </main>
        <footer>
            <!-- Optionaler Inhalt unten -->
        </footer>
    </config>

Meta-Bereich
------------

Im Meta-Bereich (``<cv-meta>``) finden sich alle Einstellungen, die für diese Konfigurationsdatei benötigt werden.
Dazu gehören z.B. die Verbindungen zu den :ref:`Backends <tile-element-backend>`, die
:ref:`Mappings <tile-element-mapping>`, :ref:`Stylings <tile-element-styling>` und :ref:`Loader <tile-element-loader>`.

.. code-block:: xml

    <cv-meta>
        <cv-backend type="openhab" uri="/rest/" />
        <cv-backend name="si" default="true" type="simulated"/>
        <cv-backend name="mqtt" type="mqtt" uri="ws://mqtt:9001/"/>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-mapping name="speaker">
            <entry value="0">ri-speaker-line</entry>
            <entry value="1">ri-speaker-fill</entry>
        </cv-mapping>
        <cv-styling name="WindowOpen">
            <entry range-min="1">red</entry>
        </cv-styling>
        <cv-mapping name="PlayProgress">
            <formula>y = Math.round(100/store.get('duration')*x)</formula>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
        <cv-loader type="css" src="resource/config/media/example.css" />
        <cv-loader type="js" src="resource/config/media/example.js" />
        <cv-loader type="templates" src="resource/config/media/my-templates.xml" />
    </cv-meta>

.. toctree::
    :hidden:
    :maxdepth: 1

    Backend <elements/backend>
    Mapping <elements/mapping>
    Styling <elements/styling>
    Loader <elements/loader>


Navigation / Seitenstruktur
---------------------------

Neben den eigentlichen Seiteninhalten, gibt es feste Bereiche, die immer sichtbar sind unabhängig davon auf welcher
Unterseite sich man gerade befindet. Dazu gibt es Header- und Footer-Bereiche und jeweils eine linke und rechte
Seitenleiste. Im Hauptbereich befinden sich dann die einzelnen Seiten mit den jeweiligen Inhalten (Kacheln) zwischen denen
hin und her navigiert werden kann. Die feststehenden Bereiche sind alle optional und können nach Bedarf genutzt oder
weggelassen werden. Man kann sie z.B. für Navigationsleisten oder Widgets die einen globalen Status anzeigen, wie die Anzahl der
offenen Fenster oder der eingeschalteten Lichter, nutzen.

.. widget-example::

        <settings design="tile" selector="body">
            <screenshot name="tile-ui-structure">
            <caption>Grundstruktur mit allen verfügbaren optionalen Bereichen</caption>
            </screenshot>
        </settings>
        <header>
            <h1>Header-Bereich</h1>
        </header>
        <main>
            <aside>
                <h1>Linke Seitenleiste</h1>
            </aside>
            <cv-page id="start">
                <h1>Seiteninhalte</h1>
            </cv-page>
            <aside>
                <h1>Rechte Seitenleiste</h1>
            </aside>
        </main>
        <footer>
            <h1>Footer-Bereich</h1>
        </footer>

Der ``<main>``-Bereich ist nicht optional und muss immer vorhanden sein
Innerhalb dieses Bereichs können beliebig viele :ref:`Pages <tile-component-page>` angegeben werden.
Eine Page kann wiederum `Widgets`_, :ref:`Gruppen <tile-component-group>` und weitere Pages enthalten. Durch diese Verschachtelung
kann man eine Navigationsstruktur festlegen. So kann man z.B. für jede Etage eine Page angeben, die wiederum
für jeden Raum in dieser Etage eine Page enthält.

.. code-block:: xml

    <main>
        <cv-page id="eg" name="Erdgeschoss">
            <cv-page id="ez" name="Esszimmer" />
            <cv-page id="wz" name="Wohnzimmer" />
            <cv-page id="ku" name="Küche" />
            <cv-page id="bad" name="Badezimmer" />
        </cv-page>
         <cv-page id="og" name="Obergeschoss">
            <cv-page id="sz" name="Schlafzimmer" />
            <cv-page id="kz1" name="Kinderzimmer 1" />
            <cv-page id="kz2" name="Kinderzimmer 2" />
            <cv-page id="badOg" name="Badezimmer" />
        </cv-page>
    </main>

Aus dieser Struktur wird automatisch ein :ref:`Navigationsmenü <tile-component-menu>` erzeugt. Diese kann man an beliebiger Stelle einbinden (es bieten sich
jedoch der Header oder Footer Bereich an).

.. code-block:: xml

    <header>
        <nav>
            <cv-menu model="pages"/>
        </nav>
    </header>


.. widget-example::
    :hide-source: true

        <settings design="tile" selector="nav">
            <screenshot name="tile-nav-menu" clickpath="cv-menu > ul > li > .details" waitfor="cv-menu > ul > li > .details > ul" margin="0 -800 200 0"/>
        </settings>
        <header>
            <nav>
                <cv-menu model="pages"/>
            </nav>
        </header>
        <main>
            <cv-page id="eg" name="Erdgeschoss">
                <cv-page id="ez" name="Esszimmer" />
                <cv-page id="wz" name="Wohnzimmer" />
                <cv-page id="ku" name="Küche" />
                <cv-page id="bad" name="Badezimmer" />
            </cv-page>
             <cv-page id="og" name="Obergeschoss">
                <cv-page id="sz" name="Schlafzimmer" />
                <cv-page id="kz1" name="Kinderzimmer 1" />
                <cv-page id="kz2" name="Kinderzimmer 2" />
                <cv-page id="badOg" name="Badezimmer" />
            </cv-page>
        </main>

.. toctree::
    :maxdepth: 1
    :hidden:

    Menu <components/menu>
    Page <components/page>
    Group <components/group>
    Popup <components/popup>

.. _tile-widgets:

Widgets
=======

Ein Widget ist eine Kachel mit einer oder mehreren Komponenten mit der eine bestimmte Funktion erfüllt wird.
Damit können übliche Anwendungsfälle innerhalb eines Smart-Homes abgedeckt werden, wie z.B. Lichtschalter (Switch)
oder die Bedienung einer Rolllade (Shutter).

.. table::
    :widths: 30 70

    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-switch-on.png              |  :ref:`tile-switch`                                       |
    |   :width: 150                                            | Einfacher Schalter, Taster oder Trigger                   |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-dimmer.png                 |  :ref:`tile-dimmer`                                       |
    |   :width: 150                                            | Schalter mit zusätzlichem Slider zur Einstellung eines    |
    |                                                          | Prozentwerts.                                             |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-shutter.png                |  :ref:`tile-shutter`                                      |
    |   :width: 150                                            | Taster für hoch/runter/stop zur Bedienung einer Jalousie  |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-info.png                   |  :ref:`tile-info`                                         |
    |   :width: 150                                            | Darstellung eines Werts in verschiedenen Arten.           |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-status.png                 |  :ref:`tile-status`                                       |
    |   :width: 150                                            | Status Anzeige in halber Kachel-Höhe                      |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-rtc.png                    |  :ref:`tile-rtc`                                          |
    |   :width: 150                                            | Raumtemperatursteuerung mit Einstellungen für HVAC und    |
    |                                                          | einer Solltemperatur                                      |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-media-player.png           |  :ref:`tile-media-player`                                 |
    |   :width: 150                                            | Steuerung eines Medien-Abspielers mit Start/Stop          |
    |                                                          | vor & zurück und einer Lautstärkeregelsung                |
    +----------------------------------------------------------+-----------------------------------------------------------+
    | .. image:: widgets/_static/cv-tile-pair.png              |  :ref:`tile-pair`                                         |
    |   :width: 150                                            | Ermöglicht es zwei Kacheln in halber Höhe darzustellen    |
    +----------------------------------------------------------+-----------------------------------------------------------+

.. toctree::
    :maxdepth: 1
    :hidden:

    Switch <widgets/switch>
    Dimmer <widgets/dimmer>
    Shutter <widgets/shutter>
    Info <widgets/info>
    Status <widgets/status>
    RTC <widgets/rtc>
    Media Player <widgets/media-player>
    Tile-pair <widgets/tile-pair>

Eigene Widgets definieren
=========================

Sofern die vorhandenen Widgets nicht ausreichen, kann man sich auch eigenen Widgets definieren. Die Definition
eines neuen Widgets erfolgt in einer Kachel ``<cv-tile>``.
Die Inhalte in den Kacheln sind in maximal 3 Zeilen mit jeweils 3 Spalten angeordnet, wobei hier ähnlich
wie in Tabellen ein Inhaltselement mehrere Zeilen und / oder Spalten belegen kann.

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-tile">
        <screenshot name="tile-grid"/>
    </settings>
    <cv-tile>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
        <p class="grid"/>
    </cv-tile>

Innerhalb der Zellen einer Kachel können nun die von der Tile-Struktur bereitgestellten :ref:`Komponenten <tile-components>` frei platziert werden.
Beispiele für diese Komponenten sind z.B. einfacher Text, ein :ref:`Button <tile-component-button>`,
:ref:`Bild <tile-component-image>` oder komplexere Anzeigeelemente wie :ref:`Listen <tile-component-list>`.

Am einfachsten erstellt man sich erst mal eine Kachel mit allen benötigten Komponenten an den gewünschten Stellen
in seiner normalen Konfigurationsdatei. So kann man Aussehen und Funktionalität am besten testen.
Das folgende Beispiel zeigt eine Kachel in der ein runder :ref:`Fortschrittsbalken <tile-component-value>`
und ein Text angezeigt wird.

.. code-block:: xml

    <cv-tile>
        <cv-row colspan="3" row="2">
            <cv-value format="%d%%">
                <cv-address transform="OH:number" mode="read" backend="si">Test_Value</cv-address>
                <cv-round-progress class="value"/>
            </cv-value>
        </cv-row>
        <cv-row colspan="3" row="last">
            <label class="secondary">Circle Progress</label>
        </cv-row>
    </cv-tile>

Diese Kachel-Konfiguration muss nun in ein Template übertragen werden. Dazu muss man sich zunächst eine Template-Datei
anlegen. Das geht am besten über den :ref:`Manager <Manager>` indem man im Order "media" eine Datei mit Namen "my-templates.xml"
erzeugt. Damit diese Templates geladen werden fügt man in der Konfigurationsdatei im Meta-Bereich einen :ref:`Loader <tile-element-loader>`
hinzu.

.. code-block:: xml

    <cv-meta>
        <cv-loader type="templates" src="resource/config/media/my-templates.xml" />
    </cv-meta>


Diese Datei sollte dann folgenden Inhalt enthalten:

.. code-block:: xml

    <templates structure="tile">
        <template id="meter">
            <cv-tile>
                <cv-row colspan="3" row="2">
                    <cv-value slot-format="%d%%">
                        <slot name="address"/>
                        <cv-round-progress class="value"/>
                    </cv-value>
                </cv-row>
                <cv-row colspan="3" row="last">
                    <label class="secondary"><slot name="label"/></label>
                </cv-row>
            </cv-tile>
        </template>
    </templates>

Man sieht innerhalb der Template-Definition mit der id "meter" den leicht modifizierten Inhalt der Kachel.
Modifiziert werden müssen lediglich Inhalte die man später konfigurierbar haben möchte. In der Regel
gehören dazu Adressen, Label und ggf. einige Attribute wie Mappings, Stylings und Formatierungen.

Wenn man nun dieses Template in der Konfigurationsdatei benutzen möchte fügt man dort ein ``<cv-meter>`` Element hinzu.
Der Name ergibt sich aus der Template ID mit dem Präfix ``cv-``.

Das Prinzip der ``<slot>``-Elemente ist relativ einfach, sie dienen als Platzhalter für Elemente die diesen Slot benutzen.
In dem Beispiel gibt es zwei Slot-Elemente: einen für die Adresse des Value-Elements: ``<slot name="address"/>``
und einen für das Label: ``<slot name="label"/>``.

Daraus ergibt sich folgender Code mit dem man das neu definierte Template-Widget nun nutzen kann.

.. code-block:: xml

    <custom>
        <cv-meter>
            <cv-address slot="address" transform="OH:5.001" mode="read">1/4/0</cv-address>
            <span slot="label">Circle Progress</span>
        </cv-meter>
    </custom>

Da selbst definierte Template-Widgets dem offiziellen Schema der CometVisu-Konfigurationsdateien nicht bekannt sind,
muss man diese in ein ``<custom>...</custom>`` Element packen, damit die Konfigurationsdatei nicht als ungültig erkannt
wird. Damit verliert man an dieser Stelle aber den Vorteil, dass dieser Teil der Konfigurationsdatei auf Gültigkeit
geprüft werden kann. Sofern man darauf werden legt, kann auch eine Erweiterung des Schemas vorgenommen werden, in
dem das eigene Widget eingetragen wird. Dazu muss die Datei "custom_visu_config.xsd" im "config/" Ordner vorhanden sein.
Sofern sie nicht vorhanden ist, muss sie mit folgender Grundstruktur angelegt werden.

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xml="http://www.w3.org/XML/1998/namespace">
        <!-- uncomment the next line if you want to reference types from the main pure schema -->
        <!-- <xsd:include schemaLocation="../visu_config.xsd"/> -->
        <!-- uncomment the next line if you want to reference types from the main tile schema -->
        <!-- <xsd:include schemaLocation="../visu_config_tile.xsd"/> -->
        <xsd:group name="CustomWidgets">
            <xsd:choice>
                <!-- reference new widgets here, e.g.
                    <xsd:element name="cv-music-player" type="cv-music-player" />
                -->
            </xsd:choice>
        </xsd:group>
        <!-- add definition for new widgets here -->
        <!-- <xsd:complexType name="cv-music-player">...</xsd:complexType> -->
    </xsd:schema>


Das vollständige Beispiel für das ``<cv-meter>``-Widget sieht so aus.

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xml="http://www.w3.org/XML/1998/namespace">
        <xsd:include schemaLocation="../visu_config_tile.xsd"/>
        <xsd:group name="CustomWidgets">
            <xsd:choice>
                <xsd:element name="cv-meter" type="cv-meter" />
            </xsd:choice>
        </xsd:group>
        <xsd:complexType name="cv-meter">
            <xsd:sequence>
                <xsd:element name="span" minOccurs="0">
                    <xsd:complexType>
                        <xsd:simpleContent>
                            <xsd:extension base="xsd:string">
                                <xsd:attribute name="slot" use="required">
                                    <xsd:simpleType>
                                        <xsd:restriction base="xsd:string">
                                            <xsd:enumeration value="label" />
                                        </xsd:restriction>
                                    </xsd:simpleType>
                                </xsd:attribute>
                            </xsd:extension>
                        </xsd:simpleContent>
                    </xsd:complexType>
                </xsd:element>
                <xsd:element name="cv-address" maxOccurs="unbounded">
                    <xsd:complexType>
                        <xsd:simpleContent>
                            <xsd:extension base="address">
                                <xsd:attribute name="slot" use="required">
                                    <xsd:simpleType>
                                        <xsd:restriction base="xsd:string">
                                            <xsd:enumeration value="address" />
                                        </xsd:restriction>
                                    </xsd:simpleType>
                                </xsd:attribute>
                            </xsd:extension>
                        </xsd:simpleContent>
                    </xsd:complexType>
                </xsd:element>
            </xsd:sequence>
            <xsd:attribute ref="format" />
        </xsd:complexType>
    </xsd:schema>

Danach kann das ``<cv-meter>``-Widget ohne ``<custom>...</custom>`` benutzt werden und es wird auch auf Gültigkeit geprüft.

.. _tile-components:

Komponenten
-----------

Eine Komponente ist ein einzelnes visuelles Element, das entweder bedienbar (z.B. Button) oder zur reinen
Darstellung eines Werts benutzt wird (z.B. Value). Die bereits vorgestellten Widgets kombinieren eine oder
mehrere Komponenten in einer Kachel.

.. toctree::
    :maxdepth: 1

    Button <components/button>
    Value <components/value>
    Image <components/image>
    Select <components/select>
    Spinner <components/spinner>
    Slider <components/slider>
    List <components/list>
    Chart <components/chart>
    Color <components/color>


.. toctree::
    :hidden:

    Icon <components/icon>
    Address <elements/address>
