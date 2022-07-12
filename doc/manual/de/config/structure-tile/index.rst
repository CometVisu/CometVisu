Grundsätzlicher Aufbau
======================

Wie der Name schon suggeriert setzt sich eine Visualisierung in der Tile-Struktur aus einzelnen Kacheln (engl. Tile)
zusammen. Die Inhalte in den Kacheln sind in maximal 3 Zeilen mit jeweils 3 Spalten angeordnet, wobei hier ähnlich
wie in Tabellen ein Inhaltselement mehrere Zeilen und / oder Spalten belegen kann.

+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+

Innerhalb der Zellen einer Kachel können nun die von der Tile-Struktur vordefiniertem Komponenten frei platziert werden.
Beispiele für diese Komponenten sind z.B. einfacher Text, ein Button, Bild oder komplexere Anzeigeelemente wie Charts.

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
Dazu gehören z.B. die Verbindungen zu den :ref:`Backends <tile-element-backend>` und die :ref:`Mappings <tile-element-mapping>` und :ref:`Stylings <tile-element-styling>`.

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
    </cv-meta>

.. toctree::
    :hidden:
    :maxdepth: 1

    Backend <elements/backend>
    Mapping <elements/mapping>
    Styling <elements/styling>


Navigation / Seitenstruktur
---------------------------

Neben den eigentlichen Seiteninhalten, gibt es feste Bereiche, die immer sichtbar sind unabhängig davon auf welcher
Unterseite sich man gerade befindet. Dazu gibt es Header- und Footer-Bereiche und jeweils eine linke und rechte
Seitenleiste. Im Hauptbereich befinden sich dann die einzelnen Seiten mit den jeweiligen Inhalten (Kacheln) zwischen denen
hin und her navigiert werden kann. Die feststehenden Bereiche können für Inhalte benutzt werden die immer sichtbar
sein sollen, also z.B. Navigationsleisten oder Widgets die einen globalen Status anzeigen, wie die Anzahl der
offenen Fenster oder der eingeschalteten Lichter.

Alle Bereiche bis auf den Haupt-Bereich ``<main>`` sind optional und können weggelassen werden.

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


.. toctree::
    :maxdepth: 1

    Page <components/page>
    Nav bars <components/navBars>


Widgets
=======

Ein Widget ist eine Kachel mit einer oder mehreren Komponenten mit der eine bestimmte Funktion erfüllt wird.
Damit können übliche Anwendungsfälle innerhalb eines Smart-Homes abgedeckt werden, wie z.B. Lichtschalter (Switch)
oder die Bedienung einer Rolllade (Shutter).

.. toctree::
    :maxdepth: 1

    Switch <widgets/switch>
    Dimmer <widgets/dimmer>
    Shutter <widgets/shutter>
    Info <widgets/info>
    Status <widgets/status>
    MediaPLayer <widgets/media-player>
    RTC <widgets/rtc>


Eigene Widgets definieren
=========================

Sofern die vorhandenen Widgets nicht ausreichen, kann man sich auch eigenen Widgets definieren.
Dazu werden 1 bis maximal 9 Komponenten in einer Kachel platziert.

.. TODO::

    Wie macht man aus einem Custom-Widget ein Custom-Template zur Wiederverwendung

.. toctree::
    :maxdepth: 1

    Popup <components/popup>
    Group <components/group>


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
    Menu <components/menu>
    Chart <components/chart>


.. toctree::
    :hidden:

    Icon <elements/icon>
    Address <elements/address>
