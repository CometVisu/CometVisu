.. _tile-component-menu:

Menu
....

.. api-doc:: cv.ui.structure.tile.components.Menu


Beschreibung
^^^^^^^^^^^^

Diese Komponente erzeugt ein Navigationsmenü aus einem Modell. Momentan ist nur die Seitenstruktur der Konfigurationsdatei
als Modell verfügbar: ``pages``.

.. figure:: ../_static/tile-nav-menu.png

    Navigationsmenü aus Seitenstruktur


.. widget-example::

        <settings design="tile" selector="nav">
            <screenshot name="tile-nav-menu-mobile-closed" screen-width="400">
                <caption>Menü auf kleinen Bildschirmen, geschlossen</caption>
            </screenshot>
            <screenshot name="tile-nav-menu-mobile-open" screen-width="400" clickpath="cv-menu > a.menu" waitfor="cv-menu.responsive li">
                <caption>Menü auf kleinen Bildschirmen, geöffnet</caption>
            </screenshot>
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

Es gibt unterschiedliche Darstellungsarten des Menüs, die über das ``appearance``-Attribut gesteuert werden.
Die möglichen Werte sind

=====================   =======================
Darstellungsart         Erklärung
=====================   =======================
text                    Standardeinstellung, Focus liegt auf dem Seitennamen, das Icon wird in der selben Größe neben den Namen angezeigt.
icons                   Focus liegt auf dem Icon, großes Icon und kleinere Seitennamen darunter. Benötigt ein Icon für jede Seite auf der obersten Navigationsebene.
dock                    Nur im `<footer>` möglich, Aussehen wie bei "icons" jedoch wird das Menü in der Mitte über dem Seiteninhalt angezeigt.
=====================   =======================

.. widget-example::

      <settings design="tile" selector="nav">
            <screenshot name="tile-nav-menu-icons" clickpath="cv-menu > ul > li:first-child > details" waitfor="cv-menu > ul > li:first-child > details > ul" margin="0 -800 200 0">
                <caption>Icons Darstellungsart</caption>
            </screenshot>
        </settings>
        <header>
            <nav>
                <cv-menu model="pages" appearance="icons"/>
            </nav>
        </header>
        <main>
            <cv-page id="eg" name="Erdgeschoss" icon="knxuf-control_building_modern02_okg_eg">
                <cv-page id="ez" name="Esszimmer" />
                <cv-page id="wz" name="Wohnzimmer" />
                <cv-page id="ku" name="Küche" />
                <cv-page id="bad" name="Badezimmer" />
            </cv-page>
             <cv-page id="og" name="Obergeschoss" icon="knxuf-control_building_modern02_okg_og">
                <cv-page id="sz" name="Schlafzimmer" />
                <cv-page id="kz1" name="Kinderzimmer 1" />
                <cv-page id="kz2" name="Kinderzimmer 2" />
                <cv-page id="badOg" name="Badezimmer" />
            </cv-page>
        </main>


.. widget-example::

      <settings design="tile" selector="nav">
            <screenshot name="tile-nav-menu-dock" selector="cv-menu" waitfor="cv-menu > ul > li:first-child > a > i" margin="10 10 10 10">
                <caption>Dock Darstellungsart im Footer</caption>
            </screenshot>
        </settings>
        <main>
            <cv-page id="eg" name="Erdgeschoss" icon="knxuf-control_building_modern02_okg_eg">
                <cv-page id="ez" name="Esszimmer" />
                <cv-page id="wz" name="Wohnzimmer" />
                <cv-page id="ku" name="Küche" />
                <cv-page id="bad" name="Badezimmer" />
            </cv-page>
             <cv-page id="og" name="Obergeschoss" icon="knxuf-control_building_modern02_okg_og">
                <cv-page id="sz" name="Schlafzimmer" />
                <cv-page id="kz1" name="Kinderzimmer 1" />
                <cv-page id="kz2" name="Kinderzimmer 2" />
                <cv-page id="badOg" name="Badezimmer" />
            </cv-page>
        </main>
        <footer>
            <nav>
                <cv-menu model="pages" appearance="dock"/>
            </nav>
        </footer>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-menu tile
