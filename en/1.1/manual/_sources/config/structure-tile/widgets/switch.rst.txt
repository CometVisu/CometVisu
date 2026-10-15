.. _tile-switch:

The switch widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The Switch Widget adds a button to the visualization. With this button, e.g. on/off switches can be realized.
The behavior of the switch can be controlled via the mode of the added addresses. The normal behavior includes a
change between 2 states (on / off). A click on the switch triggers a change between these states, so the value that
is not active is always sent.

The switch widget contains a centered :ref:`Button <tile-component-button>` with optional title and subtitle below.

The switch can also behave like a trigger, i.e. it does not switch between states but always sends the same value when
clicked.

As a third variant, the switch can behave like a push button and send different values when clicked and when released.
An example of this behavior would be a door opener: When the button is clicked, the door opener is switched on and when
the button is released, the door opener is switched off again.

Switch
--------

For the switch mode, the switch widget must be able to read and write the current state, so a writing and a reading
address are required (can also be the same).
With each click, the switch toggles between the two states (on / off).

.. widget-example::

        <settings design="tile">
            <screenshot name="cv-switch-off" margin="0 10 10 0">
                <data address="1/4/0">0</data>
            </screenshot>
            <screenshot name="cv-switch-on" margin="0 10 10 0">
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <cv-switch>
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="primaryLabel">Switch</span>
            <span slot="secondaryLabel">on/off</span>
        </cv-switch>



Trigger
-------

A trigger always sends the same value to the backend. It does not need to know the current state and
therefore only needs a writing address with a fixed value ``mode="write" value="1"``.
This value is also used for the mapping / styling if specified.

.. widget-example::

            <settings design="tile">
                <screenshot name="cv-trigger" margin="0 10 10 0">
                </screenshot>
            </settings>
            <cv-switch>
                <cv-address slot="address" transform="DPT:1.001" mode="write" value="1">1/4/0</cv-address>
                <span slot="primaryLabel">Trigger</span>
                <span slot="secondaryLabel">Always sends 1</span>
            </cv-switch>


Push button
-----------

A push button sends different values when clicked and released. For this, an address is required for each of these events (up and down).
The ``on`` attribute of an address can be used to specify at which event the value of the ``value`` attribute is sent.
A ``<cv-address> with`` ``mode="write" value="1" on="down"`` sends the value ``1`` when the button is pressed to the
backend and a <cv-address> with ``mode="write" value="0" on="up"`` sends the value ``0`` when the button is released.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-pushbutton" margin="0 10 10 0">
        </screenshot>
    </settings>
    <cv-switch>
        <cv-address slot="address" transform="DPT:1.001" mode="write" value="1" on="down">1/4/0</cv-address>
        <cv-address slot="address" transform="DPT:1.001" mode="write" value="0" on="up">1/4/0</cv-address>
        <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/0</cv-address>
        <span slot="primaryLabel">Push button</span>
    </cv-switch>


Progress bar
------------

The switch widget also offers the possibility to display a circular progress bar. A possible
use case would be a switch with which a music player is controlled and the progress bar
shows how much of the current song has already been played (or alternatively the volume of the player).
The progress bar is only for information and cannot be operated itself.
For the progress bar, an additional ``<cv-address slot="address"`` element with ``mode="read"``
and ``target="progress"`` must be added. The progress bar can display values between 0 and 100.

.. widget-example::

            <settings design="tile">
                <screenshot name="cv-progress" margin="0 10 10 0">
                    <data address="1/4/0">1</data>
                    <data address="1/4/1">65</data>
                </screenshot>
            </settings>
            <cv-meta>
               <cv-mapping name="PlayStop">
                    <entry value="0">ri-play-fill</entry>
                    <entry value="1">ri-stop-fill</entry>
                </cv-mapping>
            </cv-meta>
            <cv-switch mapping="PlayStop">
                <cv-address slot="address" transform="DPT:1.001" value="1">1/4/0</cv-address>
                <cv-address slot="address" transform="DPT:5.001" mode="read" target="progress">1/4/1</cv-address>
                <span slot="primaryLabel">Player</span>
                <span slot="secondaryLabel"></span>
            </cv-switch>


Allowed attributes in the switch element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-switch tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-switch tile
