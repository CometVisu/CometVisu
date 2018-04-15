.. _controllerinput:

The controllerinput plugin
========================

.. api-doc:: ControllerInput

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The powerspectrum plugin and widget creates a graph to show the power 
spectral data that the Enertex Smartmeter can send on the KNX bus.


.. ###END-WIDGET-DESCRIPTION###


Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the controllerinput plugin can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the controllerinput-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: controllerinput

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="controllerinput" />
        </plugins>
    </meta>
    <controllerinput>
        <layout colspan="4" />
    </controllerinput>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: controllerinput

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <meta>
        <plugins>
            <plugin name="controllerinput" />
        </plugins>
    </meta>
    <controllerinput>
        <layout colspan="4" />
        <label>controllerinput</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </controllerinput>

Examples
--------

It is possible to manually edit the :doc:`visu_config.xml <../../../xml-format>` and add an entry
for the powerspectrum plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

Note about CSS
--------------

The appearance of the ControllerInput is defined by CSS as all the other parts
of the CometVisu. Due to the complexity of the plugin a few hints for the 
Designers of CometVisu designs or user that want to overwrite aspects of the
current design are given.

.. figure:: widgets/plugins/controllerinput/_static/design_schema.png
   :alt: Design schema

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.