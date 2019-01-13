.. _urltrigger:

The UrlTrigger widget
=====================

.. api-doc:: UrlTrigger

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The UrlTrigger widget adds a button to the visualization that queries data from a URL in the background.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the UrlTrigger widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the UrlTrigger-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: urltrigger

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <urltrigger url="https://example.com/rest/activate">
        <layout colspan="4" />
    </urltrigger>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: urltrigger

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <urltrigger url="https://example.com/rest/activate">
        <layout colspan="4" />
        <label>UrlTrigger</label>
    </urltrigger>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the UrlTrigger widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.