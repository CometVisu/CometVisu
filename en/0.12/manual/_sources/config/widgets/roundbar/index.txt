.. _roundbar:

The Roundbar widget
===================

.. api-doc:: Roundbar

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds a display to the visu that can represent values from the BUS
and shows them with a round bar.


.. ###END-WIDGET-DESCRIPTION###

The design can the set in many different details:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="roundbar_complex" sleep="400">
            <caption>Example for complex Roundbar widgets</caption>
            <data address="3/6/0">87.4</data>
            <data address="3/6/1">78.1</data>
            <data address="3/6/2">63.6</data>
            <data address="3/6/3">44.0</data>
        </screenshot>
    </settings>
    <group nowidget="true">
        <layout rowspan="2" colspan="6"/>
        <roundbar format="%.1f °C" fontsize="25" linespace="26">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="50" width="50">3/6/3</address>
          <address transform="DPT:9.001" style="fill:#3f20ff; stroke:#3f20ff" radius="50">3/6/0</address>
          <address transform="DPT:9.001" style="fill:#9f009f; stroke:#9f009f">3/6/2</address>
          <address transform="DPT:9.001" style="fill:#ff003f; stroke:#ff003f">3/6/1</address>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="100" thickness="10">3/6/3</address>
        </roundbar>
        <roundbar preset="B" format="%.1f" axiswidth="2" axiscolor="white" startarrow="0" endarrow="0" fontsize="30" textx="52" texty="-15">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001" style="fill:#555; stroke:none" radius="0" width="49">3/6/0</address>
          <address transform="DPT:9.001" type="pointer" showvalue="false" radius="52" width="-52" thickness="5">3/6/0</address>
        </roundbar>
        <roundbar preset="bridge" axiswidth="10" axiscolor="#555" format="%.1f" start="190" end="-10" min="0" max="100"
              labels=",roundmiddle:30,70,30.0;70,,70.0;85,,85.0;center,horizontal:-6,57,0.0;106,,100.0"
              labelstyle="font-size:60%"
              bboxgrow="12;10"
              ranges="0...30,63,3,yellow;30...70,63,3,green;70...85,63,3,yellow;85...100,63,3,red" texty="10">
          <layout rowspan="2" colspan="2"/>
          <address transform="DPT:9.001">3/6/2</address>
        </roundbar>
    </group>

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Roundbar widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and can be omitted.

Allowed attributes in the Roundbar-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: roundbar

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <roundbar preset="bridge" format="%.1f°C">
      <address transform="DPT:9.001" mode="read">3/6/0</address>
    </roundbar>

Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: roundbar

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <roundbar>
      <layout colspan="2" rowspan="2"/>
      <address transform="DPT:9.001" mode="read">3/3/1</address>
    </roundbar>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Info widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    
    <roundbar>
         <address transform="DPT:9.001" mode="read">3/3/1</address>
     </roundbar>
        

.. ###END-WIDGET-EXAMPLES###

Design elements
---------------

The roundbar widget is assembled by many different elements, some of them are optional and can be
configured by different means. The realisation of the roundbar is basically a SVG block that is
included in the visu page, so it's appearance can be altered by using CSS rules (see also
:ref:`"Change existing design" <custom_cssrules>`).

Indicators
^^^^^^^^^^

The most obvious element is an indicator which is displayed as a round bar or a pointer. A Roundbar widget
can contain multiple indicators at the same time.

.. widget-example::

        <settings>
            <screenshot name="roundbar_indicators" sleep="400">
                <caption>Bar and pointer</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <group nowidget="true">
            <layout colspan="4" rowspan="2"/>
            <roundbar>
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar format="%.1f">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" type="pointer" radius="50" width="-50" thickness="3" mode="read">3/3/1</address>
            </roundbar>
        </group>

Marking
^^^^^^^

To partition the axis markings can be used. The values for the big (major) markings can be chosen freely, the
small (minor) markings are evenly distributed.

.. widget-example::

        <settings>
            <screenshot name="roundbar_marking" sleep="400">
                <caption>Big and small markings</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar majorradius="35" majorwidth="15" majorposition="0;20;40;60;80;100" minorradius="45" minorwidth="5" minorspacing="5" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Labels
^^^^^^

The axis can be labeled with different ways. For this the attribute ``labels`` must contain the values separated
by a semicolon:

  ``labels="0;20;40;80;100"``

Each value can have an individual radius as well as an individual text to display:

  ``value,radius``

  ``value,radius,text``

Also the position (``outside``, ``center`` and ``inside``) as well as the orientation
(``horizontal``, ``parallel``, ``perpendicular``, ``roundstart``, ``roundmiddle`` and ``roundend``) can be chosen
and put infront of the text, separated by a colon:

  ``position:value``

  ``,orientation:value``

  ``position,orientation:value``

It is sufficient to put the position, the orientation and also the radius just infront of the first value, all
following values are inheriting this property. For special effects it's possible to change these properties
multiple times:

.. widget-example::

        <settings>
            <screenshot name="roundbar_labels" sleep="400">
                <caption>Labels</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar labels="inside:0,44;25;50;75;100" majorradius="45" majorwidth="5" majorposition="0;25;50;75;100"
            minorradius="48" minorwidth="2" minorspacing="5" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Ranges
^^^^^^

To have a quick overview of the current value it is possible to mark value ranges by a color. For this the
``ranges`` attribute needs a list of range definitions that is separated by a semicolon.

Each range itself consists out of a list that is separated by colons:

  ``value,radius,width,color``

  ``start...end,radius,width,color``

Example:

  ``ranges="0...70,63,3,green;70...100,63,3,red;70,60,9,#ff0"``

This defines three ranges. First one for the values between 0 and 70 with a green arc of radius 63 and a
width of 3. Then a red arc from 70 to 100, also with radius 63 and a width of 3. Last a line is drawn at
value 70 that goes out from radius 60 for 9 units and has the color ``#ff0`` which is a bright yellow.

.. widget-example::

        <settings>
            <screenshot name="roundbar_ranges" sleep="400">
                <caption>Ranges</caption>
                <data address="3/3/1">63.3</data>
            </screenshot>
        </settings>
        <roundbar ranges="0...70,63,3,green;70...100,63,3,red;70,60,9,#ff0" format="%.1f">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

Tips
----

Presets
^^^^^^^

To simplify the configuration there are preset designs. All details of a preset can be overruled by the
configuration file.

.. widget-example::

        <settings>
            <screenshot name="roundbar_presets" sleep="400">
                <caption>Preset "A", "B" and "bridge"</caption>
                <data address="3/3/1">35.8</data>
            </screenshot>
        </settings>
        <group nowidget="true">
            <roundbar preset="A">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar preset="B">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
            <roundbar preset="bridge">
                <layout colspan="2" rowspan="2"/>
                <address transform="DPT:9.001" mode="read">3/3/1</address>
            </roundbar>
        </group>

Debug mode
^^^^^^^^^^

The Roundbar widget tries to fill in the available space as big as possible. To be able to do so it must know
already during the creation of the visu page how big its content can become. Especially for the text parts like
the labels or the value this is not possible in an automated way.

For this the attribute ``bboxgrow`` can add to the automatically determined value a user specified distance.
When it contains a single number this will be added on all sides simultaneously. Separated by a semicolon it is
possible to add specific distances for ``horizontal;vertical``. And for special effects each side can be adjusted
individually by ``left;up;right;down``.

To be able to reach a good result quicker, especially as it is an iterative effort to get the best numbers, the
attribute ``debug`` can be set to ``true`` to get a blue frame to see the automatically derived dimensions and a
green frame for the final dimensions.

.. widget-example::

        <settings>
            <screenshot name="roundbar_debug" sleep="400">
                <caption>Activated debug mode</caption>
                <data address="3/3/1">35.8</data>
            </screenshot>
        </settings>
        <roundbar debug="true" bboxgrow="50;0">
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.