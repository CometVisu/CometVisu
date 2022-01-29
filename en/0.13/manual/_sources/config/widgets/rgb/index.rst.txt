.. _rgb:

The Rgb widget
==============

.. api-doc:: Rgb

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

With the RGB widget you can display a colour in the visu.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Rgb widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Rgb-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: rgb

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <rgb>
        <layout colspan="4" />
        <address transform="DPT:5.001" mode="readwrite" variant="r">1/1/0</address>
        <address transform="DPT:5.001" mode="readwrite" variant="g">1/1/1</address>
        <address transform="DPT:5.001" mode="readwrite" variant="b">1/1/2</address>
    </rgb>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: rgb

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <rgb>
        <layout colspan="4" />
        <label>Rgb</label>
        <address transform="DPT:5.001" mode="readwrite" variant="r">1/1/0</address>
        <address transform="DPT:5.001" mode="readwrite" variant="g">1/1/1</address>
        <address transform="DPT:5.001" mode="readwrite" variant="b">1/1/2</address>
    </rgb>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Rgb widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
