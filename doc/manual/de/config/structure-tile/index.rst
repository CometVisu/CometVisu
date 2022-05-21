=============
Tile-Struktur
=============

Die CometVisu bot seit jeher die Möglichkeit weitere Strukturen neben der vorhandenen pure-Struktur einzubinden.
Die Strukturen sind dafür verantwortlich eine Config-Datei im Browser darzustellen. Normalerweise geschieht dies
indem die Config-Datei eingelesen wird und daraus HTML-Code generiert wird.
Die Tile-Struktur geht hier einen anderen Weg, indem sie `Web-Components <https://wiki.selfhtml.org/wiki/HTML/Web_Components>`_
benutzt für spezielle Elemente und ansonsten bereits von Browser darstellbarer HTML-Code ist. Config-Dateien für die Tile-Struktur werden also
nicht in HTML-Code umgewandelt sondern direkt in den Browser geladen.

.. HINT::

    Bisherige Config-Dateien sind nicht mit der Tile-Struktur kompatibel! Dasselbe gilt für die bisher bekannten Plugins!
    Ebenso benötigen die benutzen Features einen modernen Browser (Chrome, Firefox, Safari, Edge in einer aktuellen Version)
    Der Internet Explorer wird in keiner Version unterstützt!

Neue Features:

* Multi-Backend fähig
* Flexiblerer Einsatz von `Templates <https://wiki.selfhtml.org/wiki/HTML/Web_Components/template>`_
    * Templates erklären
    * Slots erklären
    * Wie benutzt man eigene Templates in der Config (oder extern laden)
* Alternativer Ansatz für die Implementierung von Plugins

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

Für häufig benötigte Dinge liefert die Tile-Struktur bereits Kacheln mit vor-definiertem Inhalt mit. So enthält das
Switch-Widget z.B. einen Button in der mittleren Zelle und zentrierten Text in der Zeile darunter.


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


* Pages
* Navbar / MainNav / SideNav
* Details-Element
* Group
* Popup


Widgets
=======

.. toctree::
    :maxdepth: 1

    Switch <widgets/switch>
    Shutter <widgets/shutter>
    Info <widgets/info>
    Status <widgets/status>


* MediaPlayer
* RTC

Eigene Widgets definieren
=========================

Wie definiert man ein Template für ein Custom-Widget


Komponenten
-----------

.. toctree::
    :maxdepth: 1

    Button <components/button>


* Value
* Image
* RoundProgress
* Select
* Spinner
* Slider
* List
* Menu
* Chart


