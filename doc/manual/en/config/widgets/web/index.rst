.. _web:

The Web widget
==============

.. api-doc:: Web

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds an area to the visu, where external websites can be displayed.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Web widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Web-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: web

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <web src="https://www.cometvisu.org">
        <layout colspan="4" />
    </web>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: web

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <web src="https://www.cometvisu.org">
        <layout colspan="4" />
        <label>Web</label>
    </web>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Web widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
