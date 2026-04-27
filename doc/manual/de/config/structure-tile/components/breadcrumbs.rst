.. _tile-component-breadcrumbs:

Breadcrumbs
...........

.. api-doc:: cv.ui.structure.tile.components.Breadcrumbs

Die Breadcrumbs-Komponente erzeugt einen Navigationspfad zur aktuell sichtbaren :ref:`Page <tile-component-page>`.
Sie wird typischerweise zusammen mit einem :ref:`Menü <tile-component-menu>` im ``<header>`` oder ``<footer>`` eingesetzt
und aktualisiert sich automatisch, sobald sich die aktuelle Seite ändert.

.. figure:: ../_static/tile-nav-breadcrumb.png

    Breadcrumb-Navigation der aktuell geöffneten Seite.

Um auf kleineren Bildschirmen vertikalen Platz zu sparen, unterstützen Breadcrumbs das Attribut ``hide-on-scroll="true"``.
Dadurch wird die Breadcrumb-Leiste während des Scrollens im ``<main>``-Bereich ausgeblendet und erscheint wieder,
wenn die Scroll-Position an den Anfang zurückkehrt.

.. code-block:: xml

    <header>
        <nav hide-on-scroll="true">
            <cv-menu model="pages"/>
        </nav>
        <cv-breadcrumbs hide-on-scroll="true"/>
    </header>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-breadcrumbs tile