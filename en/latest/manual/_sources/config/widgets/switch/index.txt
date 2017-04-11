.. _switch:

The Switch widget
=================

.. api-doc:: Switch

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The switch widget shows two states (e.g. ON and OFF) and can toggle between them.


.. ###END-WIDGET-DESCRIPTION###

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

It is possible to manually edit the :doc:`visu_config.xml <../../../xml-format>` and add an entry
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