.. _roundbar:

The Roundbar widget
===================

.. api-doc:: Roundbar

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds a dynamic field to the visu that can represent values from the BUS
(e.g. 14-byte text or temperature measurements).


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Info widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Roundbar-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: roundbar

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <roundbar>
        <layout colspan="2" />
        <address transform="DPT:1.001" mode="read">1/1/0</address>
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
        <address transform="DPT:9.001" mode="read">1/1/0</address>
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

    
        <settings>
            <screenshot name="roundbar_simple">
                <caption>Roundbar, simple example</caption>
                <data address="3/3/1">10.3</data>
            </screenshot>
        </settings>
        <roundbar>
            <layout colspan="2" rowspan="2"/>
            <address transform="DPT:9.001" mode="read">3/3/1</address>
        </roundbar>
        

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.