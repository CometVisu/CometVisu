.. _tile-shutter:

Das Shutter Widget
==================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Shutter-Widget enhält Buttons zur Bedienung einer Rolllade und zeigt deren aktuelle Position an.
Mit den drei Buttons lässt sich die Rolllade hoch-, runterfahren oder stoppen.
Die Buttons werden in der mittleren Zeile angezeigt, die Position in der obersten und in der
untersten Zeile kann man z.B. den Namen/den Ort der Rolllade anzeigen.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-shutter" margin="0 10 10 0">
            <data address="1/4/2">50</data>
        </screenshot>
    </settings>
    <cv-shutter styling="button">
        <cv-address slot="downAddress" transform="DPT:1.008" mode="write" value="1">1/4/0</cv-address>
        <cv-address slot="stopAddress" transform="DPT:1.010" mode="write" value="0">1/4/1</cv-address>
        <cv-address slot="upAddress" transform="DPT:1.008" mode="write" value="0">1/4/0</cv-address>
        <cv-address slot="positionAddress" transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <span slot="primaryLabel">Jalousie</span>
        <span slot="secondaryLabel">Schlafzimmer</span>
    </cv-shutter>


Erlaubte Attribute im Shutter-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-shutter tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-shutter tile
