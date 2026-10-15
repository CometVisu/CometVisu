.. _group:

The Group widget
================

.. api-doc:: Group

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

A group can be used to group a couple of widgets and optionally surround them with a border or name the group.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Group widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Group-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: group

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <group>
        <layout colspan="4" />
    </group>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All widgets and plugins are allowed in a group.

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Group widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    
    <group name="Example Group">
       <layout colspan="6"/>
       <text><label>Some Text</label></text>
       <switch>
         <layout colspan="3"/>
         <label>Switch</label>
         <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
       </switch>
       <info format="%.1f °C">
         <layout colspan="3"/>
         <label>Temperature</label>
         <address transform="DPT:9.001">0/0/1</address>
       </info>
     </group>
        
.. code-block:: xml

    
    <group nowidget="true">
       <layout colspan="6"/>
       <text><label>Some Text</label></text>
       <switch>
         <layout colspan="3"/>
         <label>Switch</label>
         <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
       </switch>
       <info format="%.1f °C">
         <layout colspan="3"/>
         <label>Temperature</label>
         <address transform="DPT:9.001">0/0/1</address>
       </info>
     </group>
        

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
