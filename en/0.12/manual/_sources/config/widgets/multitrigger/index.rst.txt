.. _multitrigger:

The MultiTrigger widget
=======================

.. api-doc:: MultiTrigger

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds a widget with multiple buttons to the visu.
Thus, e.g. change the operating mode of the heating system
(Comfort -> Night -> Absent -> Frost protection) or create scene functions.


.. ###END-WIDGET-DESCRIPTION###

.. hint::
    Since version 0.12.0 multiple buttons are possible, in older versions the buttons were limited to 4.

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the MultiTrigger widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the MultiTrigger-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: multitrigger

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <multitrigger>
        <layout colspan="6" />
        <label>Source</label>
        <address transform="DPT:5.001" mode="readwrite">9/6/1</address>
        <buttons>
            <button label="HTML1">0</button>
            <button label="HTML2">1</button>
            <button label="VGA">2</button>
            <button label="-"></button>
        </buttons>
    </multitrigger>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: multitrigger

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <multitrigger>
        <layout colspan="6" />
        <label>Source</label>
        <address transform="DPT:5.001" mode="readwrite">9/6/1</address>
        <buttons>
            <button label="HTML1">0</button>
            <button label="HTML2">1</button>
            <button label="VGA">2</button>
            <button label="-"></button>
        </buttons>
    </multitrigger>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the MultiTrigger widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.