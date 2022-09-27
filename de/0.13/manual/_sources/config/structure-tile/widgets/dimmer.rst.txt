.. _tile-simmer:

Das Dimmer Widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Dimmer-Widget kombiniert einen Schalter mit der Möglichkeit einen Helligkeitswert einzustellen.
Für den Schalter kommt ein :ref:`Button <tile-component-button>` zum Einsatz und für den Helligkeitswert
ein vertikaler :ref:`Slider <tile-component-slider>`.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-dimmer" margin="0 10 10 0">
            <data address="1/4/0">1</data>
            <data address="1/4/1">80</data>
        </screenshot>
    </settings>
    <cv-dimmer>
        <cv-address slot="switchAddress" transform="DPT:1.001">1/4/0</cv-address>
        <cv-address slot="brightnessAddress" transform="DPT:5.001">1/4/1</cv-address>
        <span slot="primaryLabel">Dimmer</span>
        <span slot="secondaryLabel">Wohnzimmer</span>
    </cv-dimmer>


Erlaubte Attribute im Dimmer-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-dimmer tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-dimmer tile
