.. _tile-tile-pair:

Das Tile-Pair Widget
====================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Tile-Pair Widget erlaubt es zwei einfache Widgets mit halber Höhe untereinander darzustellen.
Die Gesamthöhe beider Widgets entspricht dabei genau der Höhe eines normalen Widgets und passt somit ins Layout.
Es macht natürlich nur Sinn Widgets innerhalb des Tile-Pairs zu benutzen die wenig Inhalte haben und somit
mit dem reduzierten Platz noch benutzbar sind. Momentan kann man hier nur das :ref:`Switch <tile-switch>` Widget
benutzen oder sich ein eigenes definieren innerhalb eines ``cv-tile``-Elements.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-tile-pair" margin="0 10 10 0">
        </screenshot>
    </settings>
    <cv-tile-pair>
        <cv-switch size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="secondaryLabel">Wohnzimmer</span>
        </cv-switch>
        <cv-switch size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/1</cv-address>
            <span slot="secondaryLabel">Schlafzimmer</span>
        </cv-switch>
    </cv-tile-pair>



Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-tile-pair tile
    :depth: 1
