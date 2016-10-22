.. _gauge:

The gauge plugin
================

.. api-doc:: gauge

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

This plugins integrates Gauge (in canavas) into the visualization


short documentation

attributes:
 * type: WindDirection | Radial | Linear
 * subtype: type1 | type2 | type3 | type4 | type5
 * titleString: optional, "name"
 * unitString: optional, "units"
 * minValue: optional, "measuring range"
 * maxValue: optional, "measuring range"
 * ledVisible: optional, "true", "false"
 * lcdVisible: optional, "true", "false"
 * lcdDecimals: optional, integer
 * trendVisible: optional, "true" , "false"
 * size: optional, preset "150"
 * threshold: optional, ""
 * thresholdRising: optional, "true" , "false" - default is "false"
 * background: optional
 * framedesign: optional
 * valueColor: optional, default is "RED"
 * target: optional, if defined jump to the page with the specified name


.. ###END-WIDGET-DESCRIPTION###


Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the gauge plugins can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the gauge-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: gauge

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge>
        <layout colspan="4" />
    </gauge>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: gauge

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <meta>
        <plugins>
            <plugin name="gauge" />
        </plugins>
    </meta>
    <gauge>
        <layout colspan="4" />
        <label>gauge</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </gauge>

Examples
--------

It is possible to manually edit the :doc:`visu_config.xml <../../../xml-format>` and add an entry
for the gauge plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.