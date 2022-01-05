.. _mapping:

=======
Mapping
=======

Meaning
-------

With the element "Mapping" different values that are sent on the bus
can get different names for the visualization. As a simplest example,
e.g. a displayed "0" may be displayed as "off" while the "1" may be
designated as "on". Here, the terms ("on", "off" ...) can be chosen
arbitrarily. Mapping is part of the meta-section in XML. All mappings
together are surrounded by a ... tag. The mapping definition gets a
unique name that can be referenced later on for a wide variety of
visualization elements.

Mapping values to text
----------------------

A simple definition in the meta area looks like this:

.. code-block:: xml

        <mapping name="OffOn">
          <entry value="0">Off</entry>
          <entry value="1">On</entry>
        </mapping>

This would be in use with e.g. one :doc:`Switch-Widget <widgets/switch/index>`

Instead of 0 and 1:

.. figure:: widgets/switch/_static/switch.png
   :alt: Simple Switch

Show on and off:

.. figure:: widgets/switch/_static/switch_mapping.png
   :alt: Switch with mapping

The color can be determined by the definition of :doc:`styling <styling>`.

Mapping of values in icons
--------------------------

The CometVisu contains the extensive `KNX User Forum
Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__

An overview of the available icons can be found most easily on
the computer on which the CometVisu is running
``http://<IP>/visu/resource/icons/iconlist.html``

You can use mapping to display icons instead of values
(for example, 0 or 1).

The definition in the meta area looks like this:

.. code-block:: xml

          <mapping name="On_Off_Symbol">
            <entry value="0">
              <icon name="light_light_dim_00" color="grey"/>
            </entry>
            <entry value="1">
              <icon name="light_light_dim_100" color="white"/>
            </entry>
          </mapping>

Thus, when used with e.g. one :doc:`Switch-Widget <widgets/switch/index>`

instead of 0 and 1:

.. figure:: widgets/switch/_static/switch.png
    :alt: switch.png

    Simple  Switch

the bulb with status in the button will display:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="switch_mapping_styling_off">
            <caption>Switched Off</caption>
            <data address="1/1/0">0</data>
        </screenshot>
        <screenshot name="switch_mapping_styling_on">
            <caption>Switched ON</caption>
            <data address="1/1/0">1</data>
        </screenshot>
    </settings>
    <meta>
     <mappings>
       <mapping name="On_Off_Symbol">
        <entry value="0">
          <icon name="light_light_dim_00" color="grey"/>
        </entry>
        <entry value="1">
          <icon name="light_light_dim_100" color="white"/>
        </entry>
      </mapping>
     </mappings>
    </meta>
    <switch on_value="1" off_value="0" mapping="On_Off_Symbol">
        <label>Canal 1</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </switch>

The color of an icon is NOT controlled via the styling,
but directly in the mapping.

Mapping non-binary values
-------------------------

Mapping works not only with binary data types:

.. code-block:: xml

          <mapping name="OpenCloseDoorSymbol">
            <entry value="0">
              <icon name="fts_door" color="green"/>
            </entry>
            <entry value="1">
              <icon name="fts_door_open" color="red"/>
            </entry>
            <entry value="2">
              <icon name="fts_door_tilt" color="orange"/>
            </entry>
          </mapping>

A door contact supplies 0 with the door closed, 1 with the door open
and 2 with the door tilted. The mapping replaces the insignificant
number with the corresponding icons from the CometVisu supplied
`KNX User Forum Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__

.. widget-example::
    :hide-source: true

        <settings>
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
        <meta>
        <mappings>
         <mapping name="AufZuTuerSymbol">
          <entry value="0">
            <icon name="fts_door" color="green"/>
          </entry>
          <entry value="1">
            <icon name="fts_door_open" color="red"/>
          </entry>
          <entry value="2">
            <icon name="fts_door_tilt" color="orange"/>
          </entry>
        </mapping>
        </mappings>
        </meta>
        <info mapping="OpenCloseDoorSymbol">
            <label>Haustür</label>
            <address transform="DPT:4.001" mode="read">1/1/0</address>
        </info>

Value ranges
------------

Value ranges can also be selected for the corresponding display:

.. code-block:: xml

        <mapping name="Sign">
          <entry range_min="-1e99" range_max="0">negative</entry>
          <entry value="0">Null</entry>
          <entry range_min="0" range_max="1e99">positive</entry>
        </mapping>

On closer inspection, you can see that the "0" occurs three times.
The rule here is that all values that have individual definitions
are prioritized higher than the values within a range of values.
This makes it possible to define special names (in this case the
"zero") for individual values.

Special mapping values
----------------------

There are two mapping values that are treated separately:

 *  ``NULL``: is applied if the value is empty
 *  ``*``: is applied if no previously defined mapping for the
    value was found

.. code-block:: xml

    <mapping name="Error">
        <entry value="NULL">Error</entry>
        <entry value="*">Ok</entry>
    </mapping>

If the backend does not return any value, the mapping returns the
value *Error*, otherwise *Ok*.

Formulas (beginners)
--------------------

Sometimes it is also necessary to convert values
before presentation, e.g. to use other units.

"x" is the input value that the formula needs to be modified
to match the value "y".

More complex functions and calculations with multiple values
can not be performed here, an external logic engine (linkknx or
similar) must be used for this. However, it is quite possible
to use the given JavaScript functions. More below.

.. code-block:: xml

        <mapping name="Convert_kW">
          <formula>y = x*1000</formula>
        </mapping>

For example, you can convert ° C to ° F:

.. widget-example::

        <settings selector=".widget_container[data-type='group']">
         <screenshot name="mappong_formula">
          <data address="3/6/0">8.4</data>
         </screenshot>
        </settings>
        <meta>
         <mappings>
          <mapping name="C-to-F">
           <formula>y = x*1.8+32</formula>
          </mapping>
         </mappings>
        </meta>
        <group nowidget="true">
            <info format="%.1f C">
              <label>Outsidetemperature</label>
              <address transform="DPT:9.001" mode="read">3/6/0</address>
            </info>
            <info format="%.1f F" mapping="C-to-F">
              <label>Outsidetemperature</label>
              <address transform="DPT:9.001" mode="read">3/6/0</address>
            </info>
        </group>

With this example, faulty sensors can be marked in an overview page.
Sensors usually provide numeric values. If these remain off, e.g. the
expire binding in openHAB returns a negative value. The mapping would
return an *OK* or *not OK*:

.. code-block:: xml

    <mapping name="SensorAlarm">
      <formula>y = (x >= 0) ? "OK" : "not OK";</formula>
    </mapping>

.. figure:: _static/sensor_alarme.png

Formulas (Advanced)
-------------------

If it is known which exact object type it is, the concrete
JavaScript methods can also be used in a formula.

If, for example, openHAB is used as the backend, there is the
Item-Type *DateTime*. This data type is mapped to the JavaScript
counterpart so that its methods can be applied directly.

Without a mapping or formula, the output of an openHAB DateTime
item looks like this:

.. widget-example::
    :hide-source: true

        <settings>
         <screenshot name="oh_datetime">
            <data address="Sunrise_Time">2016-08-21T03:57:50</data>
         </screenshot>
        </settings>
        <info format="%s Uhr">
            <address transform="OH:datetime">Sunrise_Time</address>
        </info>

However, if you only want to have the time in the output, you can
do this with the following mapping:

.. widget-example::

        <settings>
         <screenshot name="mapping_oh_datetime">
            <data address="Sunrise_Time">2016-08-21T03:57:50</data>
         </screenshot>
        </settings>
        <meta>
         <mappings>
          <mapping name="HourMinute">
            <formula>y = x &amp;&amp; x.constructor === Date ? x.getHours() + ':' + x.getMinutes() : x;</formula>
          </mapping>
         </mappings>
        </meta>
        <info format="%s o'Clock" class="value_right" mapping="HourMinute">
            <address transform="OH:datetime">Sunrise_Time</address>
        </info>

.. CAUTION::
    The OH data types are completely defined in lowercase! This must
    also be written in the CV-Config, otherwise the mapping will not
    work. *DateTime* is not equal to *datetime*!

The openHAB DateTime data type is mapped to a JavaScript file.
`Here <http://www.w3schools.com/jsref/jsref_obj_date.asp>`__ is the
reference of the available JavaScript methods that can be called on
this object.

Example mappings
----------------

.. HINT::

    For copy and paste use a UTF-8 capable editor!

Wind and wind strength
^^^^^^^^^^^^^^^^^^^^^^

For weather data in km / h:

.. code-block:: xml

        <mapping name="kmh2bft">
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
        </mapping>

        <mapping name="kmh2wind_text">
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
        </mapping>

For weather data in m/s:

.. code-block:: xml

        <mapping name="ms2bft">
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
        </mapping>

        <mapping name="ms2wind_text">
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
        </mapping>

        <mapping name="ms2wind_fulltext">
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
        </mapping>

wind direction
^^^^^^^^^^^^^^

.. code-block:: xml

        <mapping name="Windrichtung_°">
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
        </mapping>

Blinds, venetian blinds and external blinds
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

          <mapping name="Blinds">
            <entry value="0">
              <icon name="fts_window_2w"/>
            </entry>
            <entry range_min="0.01" range_max="14.99">
              <icon name="fts_shutter_10"/>
            </entry>
            <entry range_min="15" range_max="24.99">
              <icon name="fts_shutter_20"/>
            </entry>
            <entry range_min="25" range_max="34.99">
              <icon name="fts_shutter_30"/>
            </entry>
            <entry range_min="35" range_max="44.99">
              <icon name="fts_shutter_40"/>
            </entry>
            <entry range_min="45" range_max="54.99">
              <icon name="fts_shutter_50"/>
            </entry>
            <entry range_min="55" range_max="64.99">
              <icon name="fts_shutter_60"/>
            </entry>
            <entry range_min="65" range_max="74.99">
              <icon name="fts_shutter_70"/>
            </entry>
            <entry range_min="75" range_max="84.99">
              <icon name="fts_shutter_80"/>
            </entry>
            <entry range_min="85" range_max="99.99">
              <icon name="fts_shutter_90"/>
            </entry>
            <entry value="100">
              <icon name="fts_shutter_100"/>
            </entry>
          </mapping>
          <mapping name="Lamella">
            <entry value="0">
              <icon name="fts_blade_arc_00"/>
            </entry>
            <entry range_min="0.01" range_max="14.99">
              <icon name="fts_blade_arc_10"/>
            </entry>
            <entry range_min="15" range_max="24.99">
              <icon name="fts_blade_arc_20"/>
            </entry>
            <entry range_min="25" range_max="34.99">
              <icon name="fts_blade_arc_30"/>
            </entry>
            <entry range_min="35" range_max="44.99">
              <icon name="fts_blade_arc_40"/>
            </entry>
            <entry range_min="45" range_max="54.99">
              <icon name="fts_blade_arc_50"/>
            </entry>
            <entry range_min="55" range_max="64.99">
              <icon name="fts_blade_arc_60"/>
            </entry>
            <entry range_min="65" range_max="74.99">
              <icon name="fts_blade_arc_70"/>
            </entry>
            <entry range_min="75" range_max="84.99">
              <icon name="fts_blade_arc_80"/>
            </entry>
            <entry range_min="85" range_max="99.99">
              <icon name="fts_blade_arc_90"/>
            </entry>
            <entry value="100">
              <icon name="fts_blade_arc_100"/>
            </entry>
          </mapping>
