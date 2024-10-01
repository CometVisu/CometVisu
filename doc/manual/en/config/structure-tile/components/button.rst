.. _tile-component-button:

Button
======

.. api-doc:: cv.ui.structure.tile.components.Button


Description
-----------

The button supports different operating modes, which are described below.

Switch
^^^^^^

The switch button allows sending and displaying a state. The simplest example is an on/off switch.
The button displays the current state and toggles between the two possible states when clicked.

.. widget-example::

    <settings design="tile" selector="cv-button" wrap-in="cv-widget"  wrapper-class="screenshots">
        <screenshot name="cv-button-off" margin="10 10 10 10">
            <data address="1/4/2">0</data>
            <caption>Switched off</caption>
        </screenshot>
        <screenshot name="cv-button-on" margin="10 10 10 10">
            <data address="1/4/2">1</data>
            <caption>Switched on</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-button mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>

In order to improve the representation of the current state, a "mapping" is used in the example, which
causes a different icon to be used depending on the state. In addition, a "styling" is used to set the color of the
icon and the border of the button differently depending on the state.


Trigger
^^^^^^^

A trigger button sends a fixed value to the backend when clicked. Here, the sent value is not dependent on the current state,
as with the switch, but a fixed value is always sent.
This mode is activated by specifying the fixed value to be sent in the <cv-address> element:

.. code-block:: xml

    <cv-address transform="DPT:1.001" mode="readwrite" value="1">1/4/2</cv-address>


Push-button
^^^^^^^^^^^

A push-button sends a value when the button is pressed and another value when the button is released.
In trigger and switch mode, only one value is sent when the button is released (simple click).
This mode is also activated via the <cv-address> element. More precisely, two addresses are required here:

.. code-block:: xml

    <cv-address transform="DPT:1.001" mode="readwrite" value="1" on="down">1/4/2</cv-address>
    <cv-address transform="DPT:1.001" mode="readwrite" value="0" on="up">1/4/2</cv-address>


The value ``1`` is sent to ``1/4/2`` when the button is pressed (``on="down"``) and the value ``0`` is sent when the
button is released (``on="up"``).

Additional properties
^^^^^^^^^^^^^^^^^^^^^

Round button
++++++++++++

As an additional option, the button can be displayed as a circle. To do this, simply add a ``class="round-button"``
to the <cv-button> element.

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-button" wrap-in="cv-widget"  wrapper-class="screenshots">
        <screenshot name="cv-button-round-off" margin="10 10 10 10">
            <data address="1/4/2">0</data>
            <caption>Switched off</caption>
        </screenshot>
        <screenshot name="cv-button-round-on" margin="10 10 10 10">
            <data address="1/4/2">1</data>
            <caption>Switched on</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-button class="round-button" mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>

.. code-block:: xml

    <cv-button class="round-button" mapping="light" styling="button">


Progress bar
++++++++++++

The border of the button can also be used to display a percentage value. For example, the progress
of a currently playing song, a volume, or the brightness value of a dimmer can be displayed.

.. HINT::

    To make sure that border of the button and the progress bar overlap each other, the round button should always be used here.

.. widget-example::

    <settings design="tile" selector="cv-button" wrap-in="cv-widget" >
        <screenshot name="cv-button-progress" margin="10 10 10 10">
            <data address="1/4/1">75</data>
            <data address="1/4/2">1</data>
            <caption>75% brightness </caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-button class="round-button" mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/1</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>


Additional label
++++++++++++++++

Optionally, the button can receive an additional label via a ``name`` attribute.

.. code-block:: xml

    <cv-button class="round-button" mapping="light" styling="button" name="Light">

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-button" wrap-in="cv-widget" >
        <screenshot name="cv-button-text" margin="10 10 24 10">
            <data address="1/4/1">75</data>
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-button class="round-button" mapping="light" styling="button" name="Light">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-button tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-button tile
