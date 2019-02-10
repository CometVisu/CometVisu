.. _infoaction:

The InfoAction widget
=====================

.. api-doc:: InfoAction

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The infoaction widget is a combination of an info/text widget and an "action"-widget, e.g. switch or trigger.

Use case: if you have a group of lights, you can show the number of lights currently switched on
and control the whole group in one widget.


.. ###END-WIDGET-DESCRIPTION###

.. figure:: _static/infoaction_lights.png

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the InfoAction widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the InfoAction-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

None.


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: infoaction

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <infoaction>
      <layout colspan="4" />
      <label>InfoAction</label>
      <widgetinfo>
        <info>
          <address transform="DPT:9.001">0/0/0</address>
        </info>
      </widgetinfo>
      <widgetaction>
        <switch mapping="OnOff" styling="GreyGreen">
          <layout colspan="3"/>
          <address transform="DPT:1.001" mode="readwrite">0/0/1</address>
        </switch>
      </widgetaction>
    </infoaction>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the InfoAction widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    ...
    <meta>
     <mappings>
       <mapping name="OnOff">
         <entry value="0">Off</entry>
         <entry value="1">On</entry>
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
    <infoaction>
     <layout colspan="4"/>
     <label>Lights</label>
     <widgetinfo>
       <info>
        <address transform="DPT:9.001">0/0/0</address>
       </info>
     </widgetinfo>
     <widgetaction>
      <switch mapping="OnOff" styling="GreyGreen">
       <layout colspan="3"/>
       <address transform="DPT:1.001" mode="readwrite">0/0/1</address>
      </switch>
     </widgetaction>
    </infoaction>
        
    
    

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.