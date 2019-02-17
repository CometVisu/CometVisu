.. _switch:

The Switch widget
=================

.. api-doc:: Switch

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The switch widget shows two states (e.g. ON and OFF) and can toggle between them.


.. ###END-WIDGET-DESCRIPTION###

.. uml::
    :align: center

    title Switch
    state On
    state Off
    On --> Off : send off_value at click
    Off --> On : send on_value at click

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch">
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <switch on_value="1" off_value="0">
            <label>Channel 1</label>
            <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
            <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

With a :ref:`mapping <mapping>` it is possible to replace the 0/1 in the
switch with custom texts or icons (e.g. On/Off instead of 0/1 or icons
for window contacs, alarms, lights, etc.).
The CometVisu comes with an extensive collecton of icons for many different
usecases. Further information can be found at the :ref:`mapping documentation <mapping>`.

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch_mapping">
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Off</entry>
                    <entry value="1">On</entry>
                </mapping>
            </mappings>
        </meta>
        <switch on_value="1" off_value="0" mapping="OnOff">
            <label>Kanal 1</label>
            <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
            <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

and / or by the use of a :ref:`styling <styling>` it is possible to set
colors (e.g. On in red and Off in green)

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch_styling">
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <meta>
            <stylings>
                <styling name="RedGreen">
                    <entry value="1">red</entry>
                    <entry value="0">green</entry>
                </styling>
            </stylings>
        </meta>
        <switch on_value="1" off_value="0" styling="RedGreen">
            <label>Kanal 1</label>
            <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
            <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Of course it is possible to combine both at the same time:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="switch_mapping_styling">
            <data address="1/4/0">0</data>
        </screenshot>
    </settings>
    <meta>
        <mappings>
            <mapping name="OnOff">
                <entry value="0">Off</entry>
                <entry value="1">On</entry>
            </mapping>
        </mappings>
        <stylings>
            <styling name="RedGreen">
                <entry value="1">red</entry>
                <entry value="0">green</entry>
            </styling>
        </stylings>
    </meta>
    <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen">
        <label>Kanal 1</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </switch>

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Switch widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Switch-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: switch

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <switch>
        <layout colspan="4" />
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </switch>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: switch

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <switch>
        <layout colspan="4" />
        <label>Switch</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </switch>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Switch widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    ...
    <meta>
     <mappings>
       <mapping name="OnOff">
         <entry value="0">O</entry>
         <entry value="1">I</entry>
       </mapping>
     </mappings>
     <stylings>
       <styling name="GreyGreen">
         <entry value="0">grey</entry>
         <entry value="1">green</entry>
       </styling>
     </stylings>
    </meta>
    ...
    <switch mapping="OnOff" styling="GreyGreen">
      <layout colspan="3"/>
      <label>Switch</label>
      <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
    </switch>
        
    

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.