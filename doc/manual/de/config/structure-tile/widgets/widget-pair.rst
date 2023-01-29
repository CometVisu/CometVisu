.. _tile-widget-pair:

Das Widget-Pair
===============

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Widget-Pair erlaubt es zwei einfache Widgets mit halber Höhe untereinander darzustellen.
Die Gesamthöhe beider Widgets entspricht dabei genau der Höhe eines normalen Widgets und passt somit ins Layout.
Es macht natürlich nur Sinn Widgets innerhalb des Widget-Pairs zu benutzen die wenig Inhalte haben und somit
mit dem reduzierten Platz noch benutzbar sind. Momentan kann man hier nur das :ref:`Switch <tile-switch>` Widget
benutzen oder sich ein eigenes definieren innerhalb eines ``cv-widget``-Elements.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-widget-pair" margin="0 10 10 0">
        </screenshot>
    </settings>
    <cv-widget-pair>
        <cv-switch button-size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="secondaryLabel">Wohnzimmer</span>
        </cv-switch>
        <cv-switch button-size="normal">
            <cv-address slot="address" transform="DPT:1.001">1/4/1</cv-address>
            <span slot="secondaryLabel">Schlafzimmer</span>
        </cv-switch>
    </cv-widget-pair>



Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-widget-pair tile
    :depth: 1
    :exclude-attributes: size
