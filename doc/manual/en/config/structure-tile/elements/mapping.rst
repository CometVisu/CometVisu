.. _tile-element-mapping:

Mapping
=======

.. HINT::

    The functionality of the mappings in the tile structure is not much different from the mappings in the Pure structure.
    Only the name of the element in the configuration file is different: ''<cv-mapping>''.
    Nevertheless, mappings from an old config cannot simply be adopted, as the widgets in the tile structure
    might not be able to handle the mapped values.

With the "cv-mapping" element, different values that are sent on the bus can be given different names for the
visualization. As the simplest example, a displayed "0" can be represented as "Off", while the "1" can be shown
as "On". The terms (“On”, “Off” ...) can be chosen arbitrarily.
Mapping is part of the <cv-meta> section in XML. The mapping definition is given a unique name that can be referred
to later for a wide variety of visualization elements.

Mapping values to text
----------------------

A simple definition in the meta area looks like this:

.. code-block:: xml

        <cv-mapping name="OffOn">
          <entry value="0">off</entry>
          <entry value="1">on</entry>
        </cv-mapping>

Using this mapping with, for example, a :ref:`Info-Widget <tile-info>`

would show instead of 0 and 1:

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile" selector="cv-info">
        <screenshot name="cv-value-nomapping-off" margin="10 10 0 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-nomapping-on" margin="10 10 0 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-info>
        <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/2</cv-address>
    </cv-info>

on and off:

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile" selector="cv-info">
        <screenshot name="cv-value-mapping-off" margin="10 10 0 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-mapping-on" margin="10 10 0 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="OffOn">
          <entry value="0">off</entry>
          <entry value="1">on</entry>
        </cv-mapping>
    </cv-meta>
    <cv-info mapping="OffOn">
        <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/2</cv-address>
    </cv-info>

The color can be determined by defining the :ref:`Styling <tile-element-styling>`.

Mapping of values into icons
----------------------------

If a status is to be displayed via an icon, you can use a mapping to display icons instead of values (e.g. 0 or 1).

The definition in the meta section looks like this:

.. widget-example::
    :hide-screenshots: true

    <settings design="tile">
        <screenshot name="cv-switch-mapping-off" margin="0 10 10 0">
            <data address="1/4/0">0</data>
        </screenshot>
        <screenshot name="cv-switch-mapping-on" margin="0 10 10 0">
            <data address="1/4/0">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="1">ri-lightbulb-fill</entry>
            <entry value="0">ri-lightbulb-line</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="1">active</entry>
            <entry value="0">inactive</entry>
        </cv-styling>
    </cv-meta>
    <cv-switch mapping="light" styling="button">
        <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
        <span slot="primaryLabel">Switch</span>
        <span slot="secondaryLabel">on/off</span>
    </cv-switch>


Using this with a :ref:`Switch-Widget <tile-switch>` would show different icons, depending on the status:

.. list-table::
    :class: image-float

    * - .. figure:: _static/cv-switch-mapping-off.png
            :alt: Switch off

      - .. figure:: _static/cv-switch-mapping-on.png
            :alt: Switch on

The color of the icons is controlled via the styling.

Mapping non-binary values
-------------------------

Mapping doesn't just work with binary data types.
A door contact delivers 0 when the door is closed, 1 when the door is open and 2
with the door tilted. The mapping replaces the less meaningful number
using the corresponding icons from the
`KNX User Forum Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__ supplied with CometVisu.

.. widget-example::
    :shots-per-row: 3

    <settings design="tile">
        <screenshot name="mapping_door_closed">
            <data address="1/1/0">0</data>
        </screenshot>
        <screenshot name="mapping_door_open">
            <data address="1/1/0">1</data>
        </screenshot>
        <screenshot name="mapping_door_tilt">
            <data address="1/1/0">2</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="OpenCloseDoorSymbol">
            <entry value="0">knxuf-fts_door</entry>
            <entry value="1">knxuf-fts_door_open</entry>
            <entry value="2">knxuf-fts_door_tilt</entry>
        </cv-mapping>
        <cv-styling name="OpenCloseDoor">
            <entry value="0">green</entry>
            <entry value="1">red</entry>
            <entry value="2">orange</entry>
        </cv-styling>
    </cv-meta>
    <cv-widget>
        <cv-tile>
            <cv-row colspan="3" row="first">
                <label class="secondary">Front door</label>
            </cv-row>
            <cv-row colspan="3" row="2">
                <cv-value mapping="OpenCloseDoorSymbol" styling="OpenCloseDoor">
                    <cv-address transform="DPT:4.001" mode="read">1/1/0</cv-address>
                    <cv-icon class="value" size="xxx-large"/>
                </cv-value>
            </cv-row>
        </cv-tile>
    </cv-widget>

Value ranges
------------

Value ranges can also be used to select the corresponding representation:

.. code-block:: xml

    <cv-mapping name="Vorzeichen">
      <entry range-min="-1e99" range-max="0">negative</entry>
      <entry value="0">Null</entry>
      <entry range-min="0" range-max="1e99">positive</entry>
    </cv-mapping>

If you look closely you can see that the "0" appears three times. Here
the rule applies that all values that have individual definitions are higher
prioritized as the values within a value range. Through this
it is possible to use special names for individual values (in this case
to define the "zero").

Special mapping values
----------------------

There are two mapping values that are treated separately:

  * ``NULL``: is applied when the value is empty
  * ``*``: is applied when no previously defined mapping for the value is found

.. code-block:: xml

    <cv-mapping name="Fehler">
        <entry value="NULL">Fehler</entry>
        <entry value="*">Ok</entry>
    </cv-mapping>

If the backend does not provide a value, the mapping returns the value *Error*, otherwise *Ok*.

Formulas (beginner)
-------------------

Sometimes it is also necessary to convert values before displaying them, e.g.
to use other units.

"x" is the input value that the formula appropriately modifies and "y" is the output value.

More complex functions and calculations with multiple values can not be done here,
for that you have to use an external logic engine (linknx
etc.). However, it is certainly possible
to use given JavaScript functions. More on this below.

.. code-block:: xml

    <cv-mapping name="Umrechnen_kW">
      <formula>y = x*1000</formula>
    </cv-mapping>

For example, you can use it to convert °C to °F:

.. widget-example::

    <settings design="tile" selector="cv-group">
        <screenshot name="mapping_formula">
            <data address="3/6/0">8.4</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="C-to-F">
            <formula>y = x*1.8+32</formula>
        </cv-mapping>
    </cv-meta>
    <cv-group open="true">
        <cv-info format="%.1f C">
            <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
            <span slot="label">Temperature outside</span>
        </cv-info>
        <cv-info format="%.1f F" mapping="C-to-F">
            <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
            <span slot="label">Temperature outside</span>
        </cv-info>
    </cv-group>

With this example, faulty sensors can be marked in an overview page.
Sensors usually provide numerical values. If these are not available, the expire binding in openHAB can send a negative
value, for example. The mapping would return an *OK* or *not OK*:

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="mapping-sensor-alarm-ok">
            <data address="3/6/0">0</data>
        </screenshot>
        <screenshot name="mapping-sensor-alarm-notok">
            <data address="3/6/0">-1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="SensorAlarm">
            <formula>y = (x >= 0) ? "OK" : "not OK";</formula>
        </cv-mapping>
    </cv-meta>
    <cv-info mapping="SensorAlarm">
        <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
        <span slot="label">MD LR</span>
    </cv-info>

Formulas (advanced)
-------------------

When the exact object type is known, you can also use the specific JavaScript methods in a formula.

Within the openHAB backen, for example, there is the item type *DateTime*.
This data type is mapped to the JavaScript counterpart, so that its methods can be applied directly.

Without mapping or formula, the output of an openHAB DateTime item looks like this:

.. widget-example::

    <settings design="tile">
        <screenshot name="mapping-oh-datetime">
            <data address="Sunrise_Time">2022-08-21T15:57:50</data>
        </screenshot>
    </settings>
    <cv-info format="%s Uhr" value-size="normal">
        <cv-address slot="address" transform="OH:datetime">Sunrise_Time</cv-address>
    </cv-info>

If you only want to have the time in the output, you can do this with the following mapping:

.. widget-example::

    <settings design="tile">
        <screenshot name="mapping_oh_time">
            <data address="Sunrise_Time">2022-08-21T15:57:50</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="HourMinute">
            <formula>y = x &amp;&amp; x.constructor === Date ? x.getHours() + ':' + x.getMinutes() : x;</formula>
        </cv-mapping>
    </cv-meta>
    <cv-info format="%s Uhr" mapping="HourMinute" value-size="normal">
        <cv-address slot="address" transform="OH:datetime">Sunrise_Time</cv-address>
    </cv-info>


.. CAUTION::
    The OH data types are defined entirely in lowercase!
    It has to be written like this in the CV config, otherwise
    the mapping will not work. *DateTime* is not the same
    *datetime*!

The openHAB DateTime data type is mapped to a JavaScript Date object.
`Here <http://www.w3schools.com/jsref/jsref_obj_date.asp>`__ you can find
the reference of the available JavaScript methods that can be called on this object.

Formulas with local store
-------------------------

A special feature that is currently only implemented for :ref:`\<cv-button\><tile-component-button>` is the use
of a local store within a formula. This allows calculations to be performed in the formula that depend on multiple
status values. If you want to calculate, for example, how many percent of a song has already been played, you need
the current position in the song and the total playing time to calculate the percentage.

.. code-block:: xml

     <cv-button class="round-button" mapping="tile-play-stop" progress-mapping="tile-play-progress">
        <cv-address transform="DPT:1.001">1/4/0</cv-address>
        <cv-address transform="DPT:5.010" mode="read" target="progress">1/4/1</cv-address>
        <cv-address transform="DPT:5.010" mode="read" target="store">1/4/2</cv-address>
        <cv-icon class="value">ri-stop-fill</cv-icon>
    </cv-button>

The address ``1/4/1`` provides the current position in the song in seconds and is used for the progress bar
(``target="progress"``). The address ``1/4/2`` provides the total playing time of the song and is stored in the value store
(``target="store"``). The value store is a `Javascript Map <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map?retiredLocale=de>`_
and uses the address as a key to store the last value from the bus (e.g. ``{"1/4/2": 240}``).

This value can now be used in the mapping for the progress bar (``progress-mapping="tile-play-progress"``).

.. code-block:: xml

    <cv-mapping name="tile-play-progress">
        <formula>
            d = store.get('1/4/2');
            y = d > 0 ? Math.round(100/d*x) : 0;
        </formula>
    </cv-mapping>

If you want to use a more meaningful name than the group address for the store, you can specify it with:
``<cv-address transform="DPT:5.010" mode="read" target="store:duration">1/4/2</cv-address>``.
In this case, the line in the mapping that reads this value would look like this: ``d = store.get('duration');``.

To re-use this mapping multiple times and avoid naming conflicts in the same store, the
mapping attributes allow additional parameters to be specified:
``<cv-button class="round-button" mapping="tile-play-stop" progress-mapping="tile-play-progress('duration_key1')">``.

This can then be used as a variable in the formula:

.. code-block:: xml

    <cv-mapping name="tile-play-progress">
        <formula>
            d = store.get(params[0]);
            y = d > 0 ? Math.round(100/d*x) : 0;
        </formula>
    </cv-mapping>

``params[0]`` contains the value ``duration_key1`` in this case. The ``params`` variable is always present in the formulas as an array
and is empty if no parameters are specified.

Mapping examples
----------------

.. HINT::

    Use an UTF-8 capable editor when copy&pasting!

Wind and wind strength
^^^^^^^^^^^^^^^^^^^^^^

For weather data in km / h:

.. code-block:: xml

    <cv-mapping name="kmh2bft">
        <entry range_min="0" range_max="2">0</entry>
        <entry range_min="2" range_max="5">1</entry>
        <entry range_min="5" range_max="11">2</entry>
        <entry range_min="11" range_max="19">3</entry>
        <entry range_min="19" range_max="28">4</entry>
        <entry range_min="28" range_max="38">5</entry>
        <entry range_min="38" range_max="49">6</entry>
        <entry range_min="49" range_max="61">7</entry>
        <entry range_min="61" range_max="74">8</entry>
        <entry range_min="74" range_max="88">9</entry>
        <entry range_min="88" range_max="102">10</entry>
        <entry range_min="102" range_max="117">11</entry>
        <entry range_min="117" range_max="1e99">12</entry>
    </cv-mapping>

    <cv-mapping name="kmh2wind_text">
        <entry range_min="0" range_max="2">Calm</entry>
        <entry range_min="2" range_max="5">Light air</entry>
        <entry range_min="5" range_max="11">Light breeze</entry>
        <entry range_min="11" range_max="19">Gentle breeze</entry>
        <entry range_min="19" range_max="28">Moderate breeze</entry>
        <entry range_min="28" range_max="38">Fresh breeze</entry>
        <entry range_min="38" range_max="49">Strong breeze</entry>
        <entry range_min="49" range_max="61">High wind</entry>
        <entry range_min="61" range_max="74">Fresh gale</entry>
        <entry range_min="74" range_max="88">Gale</entry>
        <entry range_min="88" range_max="102">Storm</entry>
        <entry range_min="102" range_max="117">Violent Storm</entry>
        <entry range_min="117" range_max="1e99">Hurricane-Force</entry>
    </cv-mapping>

For weather data in m/s:

.. code-block:: xml

    <cv-mapping name="ms2bft">
        <entry range_min="0" range_max="0.3">0</entry>
        <entry range_min="0.3" range_max="1.6">1</entry>
        <entry range_min="1.6" range_max="3.4">2</entry>
        <entry range_min="3.4" range_max="5.5">3</entry>
        <entry range_min="5.5" range_max="8.0">4</entry>
        <entry range_min="8.0" range_max="10.8">5</entry>
        <entry range_min="10.8" range_max="13.9">6</entry>
        <entry range_min="13.9" range_max="17.2">7</entry>
        <entry range_min="17.2" range_max="20.8">8</entry>
        <entry range_min="20.8" range_max="24.5">9</entry>
        <entry range_min="24.5" range_max="28.5">10</entry>
        <entry range_min="28.5" range_max="32.7">11</entry>
        <entry range_min="32.7" range_max="1e99">12</entry>
    </cv-mapping>

    <cv-mapping name="ms2wind_text">
        <entry range_min="0" range_max="0.3">Calm</entry>
        <entry range_min="0.3" range_max="1.6">Light air</entry>
        <entry range_min="1.6" range_max="3.4">Light breeze</entry>
        <entry range_min="3.4" range_max="5.5">Gentle breeze</entry>
        <entry range_min="5.5" range_max="8.0">Moderate breeze</entry>
        <entry range_min="8.0" range_max="10.8">Fresh breeze</entry>
        <entry range_min="10.8" range_max="13.9">Strong breeze</entry>
        <entry range_min="13.9" range_max="17.2">High wind</entry>
        <entry range_min="17.2" range_max="20.8">Fresh gale</entry>
        <entry range_min="20.8" range_max="24.5">Gale</entry>
        <entry range_min="24.5" range_max="28.5">Storm</entry>
        <entry range_min="28.5" range_max="32.7">Violent Storm</entry>
        <entry range_min="32.7" range_max="1e99">Hurricane-Force</entry>
    </cv-mapping>

    <cv-mapping name="ms2wind_fulltext">
        <entry range_min="0" range_max="0.2">Calm - No air movement. Smoke rises vertically</entry>
        <entry range_min="0.2" range_max="1.5">Light Air - barely noticeable. Smoke drips off easily</entry>
        <entry range_min="1.5" range_max="3.3">Light breeze - Wind felt on exposed skin. Leaves rustle.</entry>
        <entry range_min="3.3" range_max="5.4">Gentle breeze - Leaves and smaller twigs in constant motion. </entry>
        <entry range_min="5.4" range_max="7.9">Moderate breeze - Dust and loose paper raised. Small branches begin to move.</entry>
        <entry range_min="7.9" range_max="10.9">Fresh breeze - Branches of a moderate size move. Small trees begin to sway. </entry>
        <entry range_min="10.9" range_max="13.8">Strong breeze - Large branches in motion. Whistling heard in overhead wires. Umbrella use becomes difficult. </entry>
        <entry range_min="13.8" range_max="17.1">High Wind - Whole trees in motion. Effort needed to walk against the wind. Swaying of skyscrapers may be felt, especially by people on upper floors.</entry>
        <entry range_min="17.1" range_max="20.7">Fresh gale - Twigs broken from trees. Cars veer on road.</entry>
        <entry range_min="20.7" range_max="24.4">Strong Gale - Larger branches break off trees, and some small trees blow over. Construction/temporary signs and barricades blow over. Damage to circus tents and canopies.</entry>
        <entry range_min="24.4" range_max="28.4">Storm - Trees are broken off or uprooted, saplings bent and deformed, poorly attached asphalt shingles and shingles in poor condition peel off roofs.</entry>
        <entry range_min="28.4" range_max="32.6">Violent Storm - Widespread vegetation damage. More damage to meast roofing surfaces, asphalt tiles that have curled up and/or fractured due to age may break away completely.</entry>
        <entry range_min="32.6" range_max="1e99">Hurricane-Force - Considerable and widespread damage to vegetation, a few windows broken, structural damage to mobile homes and poorly constructed sheds and barns. Debris may be hurled about.</entry>
    </cv-mapping>

Wind direction
^^^^^^^^^^^^^^

.. code-block:: xml

    <cv-mapping name="Windrichtung_°">
        <entry range_min="0" range_max="11.25">North</entry>
        <entry range_min="11.25" range_max="33.75">North Northeast</entry>
        <entry range_min="33.75" range_max="56.25">Northeast</entry>
        <entry range_min="56.25" range_max="78.75">East Northeast</entry>
        <entry range_min="78.75" range_max="101.25">East</entry>
        <entry range_min="101.25" range_max="123.75">East Southeast</entry>
        <entry range_min="123.75" range_max="146.25">Southeast</entry>
        <entry range_min="146.25" range_max="168.75">South Southeast</entry>
        <entry range_min="168.75" range_max="191.25">South</entry>
        <entry range_min="191.25" range_max="213.75">South Southwest</entry>
        <entry range_min="213.75" range_max="236.25">Southwest</entry>
        <entry range_min="236.25" range_max="258.75">West Southwest</entry>
        <entry range_min="258.75" range_max="281.25">West</entry>
        <entry range_min="281.25" range_max="303.75">West Northwest</entry>
        <entry range_min="303.75" range_max="326.25">Northwest</entry>
        <entry range_min="326.25" range_max="348.75">North Northwest</entry>
        <entry range_min="348.75" range_max="360">North</entry>
    </cv-mapping>
