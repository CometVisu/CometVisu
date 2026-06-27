.. _clock:

The clock plugin
================

.. api-doc:: cv.plugins.Clock

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

This plugins integrates a clock into the visualization



.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the clock plugins can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the gauge-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: clock

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: clock

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the gauge plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

This example clock plugin is created by the following code:

.. widget-example::

    <settings>
        <screenshot name="clock_pure_simple" sleep="2000">
            <caption>Clock plugin</caption>
            <data address="12/7/10" type="time">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="2" rowspan="2" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

Custom clock face
-----------------

The attribute ``src`` allows the use of a custom clock face. It must be
supplied as a SVG file and follow the described standard defined below:

* The hands and their elements must be contained in a SVG group each and have
  the corresponding ID:

  * ``Hour24`` - the 24h hand
  * ``Hour`` - the hour hand
  * ``Minute`` - the minute hand
  * ``Second`` - the second hand
  * ``AM`` - the "AM" display for the morning
  * ``PM`` - the "PM" display for afternoon
  * ``Digits`` - the numerical display of the time
  * ``Hour24Group`` - the clock face of the 24h hand
* The hands will be positioned by a rotation around the origin. So it is usually
  required that the hands are within an additional SVG group that moves them
  to the desired position.
* When the config file hides elements the corresponding layer is hidden by
  a ``display="none"``.
* For a quick start the clock face "full" can be used and modified by an SVG
  editor like Inkscape.

The CometVisu comes with these clock faces:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_full" sleep="2000">
            <caption>Clock face "full": plugins/clock/clock_full.svg</caption>
            <data address="12/7/10" type="time">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_full.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_simple" sleep="2000">
            <caption>Clock face "simple": plugins/clock/clock_simple.svg</caption>
            <data address="12/7/10" type="time">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_simple.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="clock_pure" sleep="2000">
            <caption>Clock face "pure": plugins/clock/clock_pure.svg</caption>
            <data address="12/7/10" type="time">22:10:22</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="clock" />
        </plugins>
    </meta>
    <clock src="plugins/clock/clock_pure.svg">
        <layout colspan="3" rowspan="4" />
        <address transform="DPT:10.001" mode="readwrite">12/7/10</address>
    </clock>

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
