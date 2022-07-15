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
            <screenshot name="tile-nav-menu-mobile-open" screen-width="400" clickpath="nav > a.menu" waitfor="nav.responsive li">
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


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-menu tile
