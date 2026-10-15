.. _wgplugininfo:

The WgPluginInfo widget
=======================

.. api-doc:: WgPluginInfo

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds an dynamic field to the visu that shows live information from a WireGate plugin.

Note: The service helper from
https://raw.githubusercontent.com/OpenAutomationProject/Wiregate/master/tools/wg-plugindb/wg-plugindb.php
must be "installed" in the directory /var/www/ (i.e. the web root)


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the WgPluginInfo widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the WgPluginInfo-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: wgplugininfo

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <wgplugin_info>
        <layout colspan="4" />
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </wgplugin_info>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: wgplugininfo

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <wgplugin_info>
        <layout colspan="4" />
        <label>WgPluginInfo</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </wgplugin_info>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the WgPluginInfo widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
