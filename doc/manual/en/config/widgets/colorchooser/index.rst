.. _colorchooser:

The ColorChooser widget
=======================

.. api-doc:: ColorChooser

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The ColorChooser let you select and display a color, e.g. for lighting effects.
It supports a RGB light source with red, green and blue light components as well
as a RGBW light source that also has a white channel.


.. ###END-WIDGET-DESCRIPTION###

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_example" sleep="1000">
            <caption>The ColorChooser</caption>
            <data address="1/2/59" type="float">50</data>
            <data address="1/2/60" type="float">60</data>
            <data address="1/2/61" type="float">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-box;T:2500-15000;Y">
      <layout colspan="6" rowspan="6"/>
      <label>ColorChooser</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Simple mode
^^^^^^^^^^^

For most use cases the simple mode will be sufficient. It is optimized for
a simple configuration by ignoring a perfect color consistency between lighting
and display.

Widget components: slider
"""""""""""""""""""""""""

The ColorChooser offers different possibilities and combinations for selecting
and displaying of a color. There are sliders for a direct control of a
color channel, but also some for a indirect modification of a channel by
representing a part of a color in the way a human is experiencing it.

========== =====================================================================
``RGB-r``  red channel - direct control of RGB-lighting
``RGB-g``  green channel - direct control of RGB-lighting
``RGB-b``  blue channel - direct control of RGB-lighting
``RGBW-r`` red channel - direct control of RGBW-lighting
``RGBW-g`` green channel - direct control of RGBW-lighting
``RGBW-b`` blue channel - direct control of RGBW-lighting
``RGBW-w`` white channel - direct control of RGBW-lighting
``h``      hue of the HSV-color space, indirect control
``s``      saturation of the HSV-color space, indirect control
``v``      value, the brightness of the HSV-color space, indirect control
``T``      color temperature of white, indirect control
``Y``      brightness of the xyY-color space, indirect control
``LCh-L``  lightness of the L*C*h° CIE color space, indirect control
``LCh-C``  chroma of the L*C*h° CIE color space, indirect control
``LCh-h``  hue of the L*C*h° CIE color space, indirect control
========== =====================================================================

The slider for the color temperature is special as it controls the hue als
well as the saturation at the same time, so that a given color temperature of
white will be set. When you also want to control the brightness it is recommended
to use ``Y`` for that.

It is possible to configure the color temperature range that is used for the
``T`` slider by stating it separated by a colon. E.g. ``T:2000-10000`` would
create a slider going from 2000 Kelvin to 10000 Kelvin.

Example: RGB slider
...................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_rgb" sleep="1000">
            <caption>ColorChooser, RGB slider</caption>
            <data address="1/2/59" type="float">90</data>
            <data address="1/2/60" type="float">80</data>
            <data address="1/2/61" type="float">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="RGB-r;RGB-g;RGB-b">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser RGB slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Example: RGBW slider
....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_rgbw" sleep="1000">
            <caption>ColorChooser, RGBW slider</caption>
            <data address="1/2/59" type="float">90</data>
            <data address="1/2/60" type="float">100</data>
            <data address="1/2/61" type="float">0</data>
            <data address="1/2/62" type="float">80</data>
        </screenshot>
    </settings>
    <colorchooser controls="RGBW-r;RGBW-g;RGBW-b;RGBW-w">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser RGBW slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-b">1/2/61</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-w">1/2/62</address>
    </colorchooser>

Example: HSV slider
...................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_hsv" sleep="1000">
            <caption>ColorChooser, HSV slider</caption>
            <data address="1/2/59" type="float">99</data>
            <data address="1/2/60" type="float">80</data>
            <data address="1/2/61" type="float">90</data>
        </screenshot>
    </settings>
    <colorchooser controls="h;s;v">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser HSV slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="h">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="s">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="v">1/2/61</address>
    </colorchooser>

Example: color temperature and brightness slider
................................................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_TY" sleep="1000">
            <caption>ColorChooser, color temperature and brightness slider</caption>
            <data address="1/2/59" type="float">45.1</data>
            <data address="1/2/60" type="float">68.6</data>
            <data address="1/2/61" type="float">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="T:2000-10000;Y">
      <layout colspan="6" rowspan="3"/>
      <label>ColorChooser T and Y slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Example: LCh slider
....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_LCh" sleep="1000">
            <caption>ColorChooser, LCh slider</caption>
            <data address="1/2/59" type="float">42.7</data>
            <data address="1/2/60" type="float">0</data>
            <data address="1/2/61" type="float">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-L;LCh-C;LCh-h">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser LCh slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Widget components: color selection wheel
""""""""""""""""""""""""""""""""""""""""

There are also combined, more complex interactions possible:

================ ================================================================================================
``box``          Color selection wheel with quadratic brightness and saturation selector, HSV color space
``triangle``     Color selection wheel with triangular brightness and saturation selector, HSV color space
``LCh-box``      Color selection wheel with quadratic brightness and saturation selector, L*C*h° CIE color space
``LCh-triangle`` Color selection wheel with triangular brightness and saturation selector, L*C*h° CIE color space
================ ================================================================================================

Example: combined chooser ``box``
.................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_box">
            <caption>ColorChooser, combined chooser: box</caption>
        </screenshot>
    </settings>
    <colorchooser controls="box">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser box</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Example: combined chooser ``triangle``
......................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_triangle">
            <caption>ColorChooser, combined chooser: triangle</caption>
        </screenshot>
    </settings>
    <colorchooser controls="triangle">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser triangle</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Example: combined chooser ``LCh-box``
.....................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_LCh_box">
            <caption>ColorChooser, combined chooser: LCh-box</caption>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-box">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser LCh-box</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Example: combined chooser ``LCh-triangle``
..........................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_LCh_triangle">
            <caption>ColorChooser, combined chooser: LCh-triangle</caption>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-triangle">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser LCh-triangle</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

.. NOTE::

    In the simple mode it is recommended to use the color selection wheel in the
    HSV color space. In the professional mode, when the chromaticity coordinates
    are configured, the L*C*h° color space should be used for best color
    alignment.

Dim curves
""""""""""

The eye doesn't measure brightness in a linear fashion but in a logarithmic
way to be able to see at a dark night as well as during high noon. Different
lighting systems, like DALI, take that into account and thus use a non linear
dim curve, so that the brightness of the light has a better match to the selected
dim value. Although this is a desirable mechanism it prevents the mixing of
different light colors as this requires a linear dim curve.

Using the attributes ``r_curve``, ``g_curve``, ``b_curve`` and ``w_curve`` it
is possible to configure the dim curve used by the lighting system and
compensate it for color mixing. Apart from defining a look up table (intended
for the use at the professional mode) the keywords ``linear``, ``exponential``
and ``logarithmic`` allow a simple use of the most common types of curve.

.. note::

    Configuring a dim curve is only required when the communication is
    done in raw color components (``r``, ``g``, ``b`` and perhaps ``w``).
    Using a complete color in ``HSV`` or - in the best case - as ``xyY`` color
    a dim curve isn't necessary.

The correct value is stated in the documentation of the lighting system, but
it is important to consider the lights, the drivers and the bus gateways, as
each component might use a non linear behavior.

It is possible to do a quick check whether the selected curve is right or way
off. For that the red channel has to be set to 100%, the green to 50% and the
blue to 0% (when you are also using a white channel is must also be 0%).
When the dim curves are set correctly the light color should now be a saturated
orange.

When the light color is different and no curve has been configured this table
shows the correct curve to use for compensation:

.. raw:: html

   <style>
      .exporange    {background-color:#ffe500; color:#ffe500;}
      .linearorange {background-color:#ff7f00; color:#ff7f00;}
      .logorange    {background-color:#ff0800; color:#ff0800;}
   </style>

.. role:: exporange
.. role:: linearorange
.. role:: logorange

====================== ====================== =========================================
target color           real color             dim curve to use for compensation
---------------------- ---------------------- -----------------------------------------
:linearorange:`------` :logorange:`------`    `logarithmic`
:linearorange:`------` :linearorange:`------` `linear`
:linearorange:`------` :exporange:`------`    `exponential`
====================== ====================== =========================================

In most cases it is sufficient to select the correct dim curve for a good
consistent color. But when you select a brightness of 100% and a saturation
of 0% and have a color tint and not a neutral white you can use  ``r_strength``,
``g_strength`` and ``b_strength`` to correct the color.
This is also possible with a RGBW light source but the judgement by eye will
be quite demanding. In this case it's better suited to use a measurement
device as described in the professional mode.

Professional mode
^^^^^^^^^^^^^^^^^

For professional applications like architecture, art galleries or yachting the
simple mode can be easily upgraded to the professional mode where the color
chooser can be used for true color selecting.

.. note::

    Best results require a calibrated display. As, on purpose, only the sRGB
    color space is used for showing the widget also uncalibrated devices
    (like a smart phone or a tablet computer) should still have acceptable
    performance in most cases. Although only the sRGB color space is used the
    ColorChooser does allow the selection of all colors that the lighting
    system does allow.

The difference between the professional and the simple mode is that the
colorimetric locus and the dim behaviour of the channels of the light source are
configured.

Best results will be reached by measuring the colorimetric locus of the red,
green, blue and (when available) white channel by using a spectral photometer
and stating the measured ``x`` and ``y`` coordinates of the CIE xyY color space
as well as the maximal brightness in the config file. This measurement can also provide
a look up table for the dim curve.
Due to aging of the light source those values should be regularly remeasured,
just like any display calibration. The frequency of this measurement depends
on the required color accuracy.

It is still possible to get good results without a measurement device when the
data sheet of the used light source is available. When no values for the ``x``
and ``y`` coordinates are given but instead the wave length of the color it
can be used alternatively. Although this would work only for a monochromatic
light source like a laser, the widely used RGB-LEDs can still be assumed to be
nearly monochromatic. For the white channel it is possible to use the
color temperature instead of the ``xy`` coordinates. A deviation from the
black body curve can't be stated, in such a case the  ``x`` and ``y``
coordinates must be used.

The configured brightness doesn't need to follow a specific physical unit (like
lumen or lumen/meter for LED stripes) as the ColorChooser is using only relative
values.

For a best match between the displayed color and that from the light the
widget element should not be used in the HSV but in the L*C*h° mode. The
bus communication should use the ``xy``, ``xyY`` or L*a*B* color space as then
the conversation to control the light source is happening close to it
reducing any errors in between. A communication in the HSV color space might
still work. A direct control by RGB or RGBW values would require an accurate
configured dim curve.

.. note::

    The ColorChooser is using internally the CIE xyY color space. For the
    conversion in the L*a*b* and the L*C*h° color space it is using the D65
    light with a 10° standard observer.

Example of a ColorChooser for the OSRAM LINEARlight FLEX Colormix RGBW
LED stripe "LF700RGBW-G1-830-06" with the datasheet data and a control via DALI:

.. code-block:: xml

    <colorchooser
        r_wavelength="622" r_strength="80" r_curve="logarithmic"
        g_wavelength="534" g_strength="196" g_curve="logarithmic"
        b_wavelength="468" b_strength="21" b_curve="logarithmic"
        w_x="0.4290" w_y="0.4010" w_strength="400" w_curve="logarithmic"
        controls="LCh-triangle">
      <layout rowspan="4" colspan="6"/>
      <label>LED Strip</label>
      <address transform="DPT:242.600" mode="read" variant="xyY">1/2/60</address>
      <address transform="DPT:242.600" mode="write" variant="xyY">1/2/61</address>
    </colorchooser>

.. warning::

    It is technically possible to use multiple address elements with different
    color space types like ``RGB`` and ``HSV``. It is also technically possible
    to use ``RGB-R``, ``RGB-G``, ``RGB-B`` and at the same time ``RGB``.

    Although it might seem to work it can have unwanted side effects leading
    to the display of a wrong color, so it should be prevented and be considered
    a misconfiguration.

.. note::

    It is recommended to use a bus communication where all color components are
    stated in the same data type (e.g. ``rgb`` instead of ``RGB-r``, ``RGB-g``
    and ``RGB-b``). Otherwise it is possible that for short time periods
    after an external change of the color artefacts in the displayed or
    animated color are shown.

.. note::

    When multiple ColorChooser are used for the same light (e.g. in one
    configuration or by opening the CometVisu in two browsers) it is possible
    that both will show a slightly different color. This happens when a color
    is selected that isn't contained in the color space used on the bus
    communication. This happens most likely with a ColorChooser in LCh mode
    and RGB mode for communication.

    Changing the communication to xyY mode will solve this issue.

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Info widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the colorchooser-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: colorchooser

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [1]_</caption>
    <colorchooser>
        <label>RGB floor</label>
        <address transform="DPT:232.600" mode="readwrite" variant="rgb">1/2/59</address>
    </colorchooser>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: colorchooser

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <colorchooser>
      <label>RGB floor</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

.. IMPORTANT::

    When you need to address each color (red, green and blue) individually you
    need to add a group address with corresponding ``variant`` each. For
    OpenHAB Color Items or one of the combined KNX data types this does not hold,
    here it is e.g. possible to use a ``variant="rgb"`` instead.

Valid values for ``variant`` are:

========== =====================================================================
``RGB-r``  Red channel of RGB lighting
``RGB-g``  Green channel of RGB lighting
``RGB-b``  Blue channel of RGB lighting
``r``      Shortcut for ``RGB-r``
``g``      Shortcut for ``RGB-g``
``b``      Shortcut for ``RGB-b``
``rgb``    Combined data type of RGB lighting
``RGBW-r`` Red channel of RGBW lighting
``RGBW-g`` Green channel of RGBW lighting
``RGBW-b`` Blue channel of RGBW lighting
``RGBW-w`` White channel of RGBW lighting
``rgbw``   Combined data type of RGBW lighting
``h``      Hue channel of HSV controlled lighting
``s``      Saturation channel of HSV controlled lighting
``v``      Value channel of HSV controlled lighting
``hsv``    Combined data type of HSV controlled lighting
``x``      x channel of xyY controlled lighting
``y``      y channel of xyY controlled lighting
``Y``      Y channel of xyY controlled lighting
``xy``     Combined data type of xyY controlled lighting
``xyY``    Combined data type of xyY controlled lighting
========== =====================================================================

.. note::

    The ``variant`` used for communication doesn't necessarily be similar to
    the used widget elements as defined by ``controls``. It is valid to use
    a ColorChooser with a HSV control and RGB bus communication.

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Info widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    
    <colorchooser>
      <layout colspan="6" rowspan="4"/>
      <label>RGB kitchen</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>
        

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [1] The simple view might not show everything. To see all elements/attributes use the expert view.
