.. _colorchooser:

The ColorChooser widget
=======================

.. api-doc:: ColorChooser

Descripton
----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The ColorXChooser let you select and display a color, e.g. for lighting effects.
It supports a RGB light source with red, green and blue light components as well
as a RGBW light source that also has a white channel.

 @widgetexample


          ColorChooser, simple example




   RGB kitchen
   1/2/59
   1/2/60
   1/2/61



.. ###END-WIDGET-DESCRIPTION###

Simple mode
^^^^^^^^^^^

For most use cases the simple mode will be sufficient. It is optimized for
a simple configuration by ignoring a perfect color consistency between lighting
and display.

Widget components
"""""""""""""""""

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
white will be set. When you also want to control the bightness it is recomended
to use ``Y`` for that.

.. widget-example::

    <settings sleep="1500">
        <screenshot name="colorchooser_slider">
            <caption>colorchooser, alle vorhandenen Slider</caption>
            <data address="1/2/59">50</data>
            <data address="1/2/60">60</data>
            <data address="1/2/61">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="RGB-r;RGB-g;RGB-b;RGBW-r;RGBW-g;RGBW-b;RGBW-w;h;s;v;T:2500-20000;Y;LCh-L;LCh-C;LCh-h">
      <layout colspan="6" rowspan="14"/>
      <label>ColorChooser Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Statt der einzelnen Slider gibt es auch kombinierende, komplexere Möglichkeiten:

================ ====================================================================================
``box``          Farbwahlrad mit Quadratischem Helligkeits- und Sättigungswähler, HSV-Farbraum
``triangle``     Farbwahlrad mit dreieckigem Helligkeits- und Sättigungswähler, HSV-Farbraum
``LCh-box``      Farbwahlrad mit Quadratischem Helligkeits- und Sättigungswähler, L*C*h° CIE Farbraum
``LCh-triangle`` Farbwahlrad mit dreieckigem Helligkeits- und Sättigungswähler, L*C*h° CIE Farbraum
================ ====================================================================================

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex">
            <caption>colorchooser, kombinierte Wähler</caption>
        </screenshot>
    </settings>
    <colorchooser controls="box;triangle;LCh-box;LCh-triangle">
      <layout colspan="6" rowspan="16"/>
      <label>ColorChooser</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

.. NOTE::

    Im einfachen Modus sollten das Farbwahlrad im HSV-Farbraum benutzt
    werden, im professionellen Modus, wenn die Farborte der einzelnen Farben
    konfiguriert wurden, im L*C*h°-Farbraum.

Dim curves
""""""""""

Das menschliche Auge nimmt Helligkeit nicht linear sondern logarithmisch war,
dadurch ist es möglich sowohl in dunkler Nacht als auch mittags bei gleißendem
Sonnenschein sehen zu können. Verschiedene Beleuchtungssysteme, wie beispielsweise
DALI, berücksichtigen diese Eigenschaft des Auges und verwenden eine nicht lineare
Dim-Kurve um eine bessere Übereinstimmung zwischen der eingestellten und der
wahrgenommenen Helligkeit zu erreichen. Dieses grundsätzlich sinnvolle Verhalten
ist jedoch bei der Mischung von Farben nachteilig, da hier ein lineares Verhalten
benötigt wird.

Durch die Attribute ``r_curve``, ``g_curve``, ``b_curve`` und ``w_curve`` lassen sich
die Verwendeten Dim-Kurven einstellen um das Verhalten des Beleuchtungssystems
zu kompensieren. Neben der für den professionen Modus gedachten Angabe einer
Dim-Kurve aus Messwerten einer Profilierung lassen sich mit den Schlüsselwerten
``linear``, ``exponential`` und ``logarithmic`` die wichtigsten Kurventypen einstellen.

.. note::

    Die Angabe ein Dim-Kurve wird nur benötigt, wenn die Kommunikation in
    Farbkomponenten (r, g, b und ggf. w) erfolgt. Wird statt dessen eine
    komplette Farbe als HSV, oder im optimalen Fall, als xyY-Farbe übertragen,
    so ist die Angabe einer Dim-Kurve nicht notwendig.

Welcher Wert richtig ist lässt sich aus der Dokumentation der Beleuchtssystems
entnehmen, wobei hier sowohl die Lampen, die Treiber als auch das Bus-Gateway
zu berücksichtigen sind, da hier an jeder Stelle ein nicht lineares Verhalten
möglich sein kann.

Ob die verwendete Kurve korrekt ist lässt sich grob auch ohne Messgerät leicht
abschätzen. Hierzu muss der rote Kanal auf 100%, der grüne auf 50% und der blaue
auf 0% eingestellt werden (der ggf. vorhandene weiße Kanal muss auch auf 0% stehen).
Die Beleuchtungsfarbe sollte nun, wenn die Dim-Kurven richtig eingestellt sind,
einem satten Orange entsprechen.

Sollte die Farbe nicht passen, so ist real eingestellte Farbe (ohne dass eine
Dim-Kurve konfiguriert wurde) mit dieser Tabelle zu vergleichen und der
Wert aus der letzen Spalte als Dim-Kurve zu verwenden:
