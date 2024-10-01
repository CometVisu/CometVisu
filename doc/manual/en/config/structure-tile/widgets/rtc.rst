.. _tile-rtc:

The RTC widget
==============

.. api-doc:: cv.ui.structure.tile.Controller

Description
------------

The RTC widget allows to control a room temperature controller. The widget shows the currently set target temperature
and offers the possibility to change it, as well as to change the operating mode of the controller (normal, eco, off, etc.).
For the target temperature a :ref:`Spinner <tile-component-spinner>` is used and for the mode a :ref:`Select <tile-component-select>`.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-rtc" margin="0 10 10 0">
            <data address="1/4/0">comfort</data>
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-rtc>
        <cv-address slot="hvacAddress" transform="DPT:20.102">1/4/0</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:9.001">1/4/1</cv-address>
        <span slot="label">Living room</span>
    </cv-rtc>

The widget requires an address for the target temperature ``slot="temperatureAddress"`` and one for the mode
``slot="hvacAddress"``. An optional label can be specified by using ``<span slot="label">Living room</span>``.

If you only want to show the possibility to change the target temperature when the controller is in normal operation,
you can specify an additional ``temperatureAddress`` with the target ``show-hide`` and a special :ref:`Mapping <tile-element-mapping>`.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-rtc-notemp" margin="0 10 10 0">
            <data address="1/4/0">economy</data>
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="RtcOn" type="boolean">
            <entry value="comfort">true</entry>
            <entry value="economy">false</entry>
            <entry value="building Protection">false</entry>
            <entry value="stondby">false</entry>
        </cv-mapping>
    </cv-meta>
    <cv-rtc>
        <cv-address slot="hvacAddress" transform="DPT:20.102">1/4/0</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:9.001">1/4/1</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:20.102" mode="read" target="show-hide" mapping="RtcOn">1/4/0</cv-address>
        <span slot="label">Living room</span>
    </cv-rtc>

The widget can be customized by specifying the attributes ``min``, ``max``, ``step-width`` and ``format`` for the spinner of the target temperature.
For example, the widget can be changed to Fahrenheit by using ``<cv-rtc min="0" max="100" format="%d ′F">``.

If in your use case it is not possible to control the operating mode, the current temperature can be displayed instead.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-rtc-no-hvac" margin="0 10 10 0">
            <data address="1/4/0">22</data>
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-rtc format="%.1f">
        <cv-address slot="measuredTemperatureAddress" transform="DPT:9.001">1/4/0</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:9.001">1/4/1</cv-address>
        <span slot="label">Living room</span>
        <span slot="unit">°C</span>
    </cv-rtc>

Allowed Attributes in the RTC-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-rtc tile


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-rtc tile
