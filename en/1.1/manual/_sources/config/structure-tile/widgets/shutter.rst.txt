.. _tile-shutter:

The shutter widget
==================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The shutter widget contains buttons to control a shutter and shows its current position.
The three buttons allow to move the shutter up, down or to stop it.
The buttons are displayed in the middle row, the position in the top and bottom row can be used to display
e.g. the name/location of the shutter.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-shutter" margin="0 10 10 0">
            <data address="1/4/2">50</data>
        </screenshot>
    </settings>
    <cv-shutter>
        <cv-address slot="downAddress" transform="DPT:1.008" mode="write" value="1">1/4/0</cv-address>
        <cv-address slot="stopAddress" transform="DPT:1.010" mode="write" value="0">1/4/1</cv-address>
        <cv-address slot="upAddress" transform="DPT:1.008" mode="write" value="0">1/4/0</cv-address>
        <cv-address slot="positionAddress" transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <span slot="primaryLabel">Shutter</span>
        <span slot="secondaryLabel">Bedroom</span>
    </cv-shutter>

For each of the buttons at least one ``<cv-address>`` must be specified with the respective target as
value of the ``slot`` attribute. The possible slot values are "downAddress", "stopAddress" and "upAddress".
If no ``<cv-address>`` element is specified for one of these slots, the respective button is not displayed.

To display the current position of the shutter, an additional, optional ``<cv-address slot="positionAddress"``
is required.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-shutter-no-stop" margin="0 10 10 0">
            <data address="1/4/2">50</data>
        </screenshot>
    </settings>
    <cv-shutter>
        <cv-address slot="downAddress" transform="DPT:1.008" mode="write" value="1">1/4/0</cv-address>
        <cv-address slot="upAddress" transform="DPT:1.008" mode="write" value="0">1/4/0</cv-address>
        <cv-address slot="positionAddress" transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <span slot="primaryLabel">Shutter</span>
        <span slot="secondaryLabel">no stop-address</span>
    </cv-shutter>

Allowed attributes in the shutter element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-shutter tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-shutter tile
