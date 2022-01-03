.. _colorchooser:

The ColorChooser widget
=======================

.. api-doc:: ColorChooser

Descripton
----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The ColorChooser let you select and display a color, e.g. for lighting effects.
It supports a RGB light source with red, green and blue light components as well
as a RGBW light source that also has a white channel.


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
Soll-Farbe             reale Farbe            zur Kompensation zu verwendende Dim-Kurve
---------------------- ---------------------- -----------------------------------------
:linearorange:`------` :logorange:`------`    `logarithmic`
:linearorange:`------` :linearorange:`------` `linear`
:linearorange:`------` :exporange:`------`    `exponential`
====================== ====================== =========================================

Meist reicht die Einstellung der korrekten Dim-Kurve aus, um bereits eine gute
Farbdarstellung zu bekommen. Sollte es jedoch auch nach einer Korrektur bei einer
RGB-Beleuchtung, wenn die Helligkeit auf 100% und die Sättigung auf 0% steht,
einen Farbstich geben und nicht neutral Weiß leuchten, so kann über die
``r_strength``, ``g_strength`` und ``b_strength`` Werte eine Korrektur erfolgen.
Dies ist auch bei einer RGBW-Beleuchtung möglich, jedoch wird das Abschätzen
der Werte noch schwieriger als bei einer RGB-Beleuchtung, so dass hier am
besten eine Messung der realen Werte durchgeführt werden sollte. Dies wird im
Abschnitt für den professionellen Modus beschrieben.

Professional mode
^^^^^^^^^^^^^^^^^

Für professionelle Anwendungen wie in der Architektur, Kunstgallerien oder
Yachten lässt sich der einfache Modus leicht auf eine farbverbindliche Nutzung
erweitern.

.. note::

    Beste Ergebnisse benötigen einen kalibrierten Bildschirm. Da für die
    Darstellung bewusst nur der sRGB-Farbraum verwendet wird sollte aber auch auf
    unkalibrierten Geräten (wie z.B. Smartphones und Tablets) eine akzeptable
    Darstellung möglich sein. Trotz der Einschränkung der Bildschirmdarstellung auf
    sRGB lässt sich durch den ColorChooser der komplette Farbraum, der durch die
    Leuchtmittel möglich ist, nutzen.

Der professionelle Modus unterscheidet sich vom einfachen Modus dadurch, dass
die Farborte des verwendeten Leuchtmittels mit angegeben werden, so wie deren
Dim-Verhalten.

Die besten Ergebnisse werden erreicht, wenn für den roten, grünen, blauen und, so
vorhanden, weißen Kanal die Farborte und Helligkeiten mit einem Spektralfotometer
gemessen werden und als ``x`` und ``y`` Koordinaten des CIE-Normfarbsystem übergeben
werden. Aus der Messung kann dann auch die Dim-Kurve als Tabelle, so wie die maximale
Helligkeit übernommen werden.
Aufgrund der Alterung des Leuchtmittels sollten - genau so wie bei der
Monitor-Kalibierung - die Dim-Kurven regelmäßig bestimmt werden und die
Konfigurationsdatei entsprechend angepasst werden. Die Häufigkeit der Messung
richtet sich dabei nach dem Anspruch an die zu erreichende Farbtreue.

Ohne Messgerät, aber mit einem Datenblatt des verwendeten Leuchtmittels, lassen
sich auch noch gute Ergebnisse erzielen. Wenn für die Farben keine ``x`` und ``y``
Koordinaten angegeben werden, aber zumindest die Wellenlängen, so können diese
alternativ verwendet werden. Dies führt nur bei einer monochromatischen Lichtquelle
wie einem Laser zu einem korrektem Ergebnis, jedoch besitzen auch RGB-LEDs ein
annähernd monochromatische Verhalten. Bei dem weißen Kanal kann statt der
xy-Koordinaten auch die Farbtemperatur verwendet werden. Sollte eine Abweichung
von der Black-Body-Kurve berücksichtig werden müssen, so muss dies jedoch über eine
Angabe in xy-Koordinaten erfolgen.

Die Helligkeitsangabe muss keine spezifische physikalische Einheit (wie Lumen
oder Lumen/Meter bei LED-Strips) haben, hier verwendet der ColorChooser nur die
relative Größe der Werte untereinander.

Um beste Ergebnisse zwischen Bildschirm-Darstellung und Beleuchtungsfarbe
zu erhalten, sollte das Widget-Element nicht im HSV sondern im L*C*h°-Modus
verwendet werden. Die Kommunikation über den Bus sollte im xy bzw. xyY oder
L*a*b* Farbraum erfolgen, da hier die Umrechnung in die Ansteuerung des
Leuchtmittels aktornah passiert und so eine akkuratere Farbwiedergabe zu erwarten
ist. Eine Kommunikation im HSV-Farbraum würde auch noch eine gute Farbwiedergabe
ermöglichen. Für eine direkte Ansteuerung über RGB bzw. RGBW Werte ist eine
korrekt eingestellte Dim-Kurve unabdingbar.

.. note::

    Der ColorChooser verwendet intern den CIE xyY Farbraum. Für die Umrechung
    in den L*a*b* bzw. den L*C*h° Farbraum wird die Normlichtart D65 und ein
    Beobachterwinkel von 10° verwendet.

Beispiel für einen ColorChooser für den OSRAM LINEARlight FLEX Colormix RGBW
LED-Strip "LF700RGBW-G1-830-06" mit Farborten aus dem Datenblatt und einer
Ansteuerung über DALI:

.. widget-example::

    <settings>
        <screenshot name="colorchooser_professional">
            <caption>Triangle-ColorChooser im professionellen Modus</caption>
        </screenshot>
    </settings>
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

    Grundsätzlich ist es möglich mehrere Address-Elemente mit unterschiedlichen
    Farbraum-Arten gleichzeitig zu verwenden, z.B. ``RGB`` und ``HSV``, aber auch
    ``RGB-R``, ``RGB-G``, ``RGB-B`` und gleichzeitig ``RGB`` selbst. Auch wenn dies
    vordergründig zu funktionieren scheint, so kann es unbeabsichtigte
    Seiteneffekte erzeugen die zur Anzeige einer falschen Farbe führen.

.. note::

    Es wird empfohlen nach Möglichkeit für die Übermittlung der Farbinformation
    einen Datentyp zu verwenden, der alle Farbkomponenten in sich vereint (also
    z.B. ``rgb`` statt ``RGB-r``, ``RGB-g`` und ``RGB-b``), da es bei der Verwendung von
    Einzelkomponenten durch den zeitlichen Versatz sonst zu kurzfristigen
    Artefakten in der Darstellung/Animation kommen kann.

.. note::

    Wenn mehere ColorChooser für die gleiche Farbe verwendet werden (z.B. in
    einer Konfiguration, oder bei zwei offnen Instanzen der CometVisu), so ist es
    möglich, dass beide eine leicht unterschiedliche Anzeige haben. Dies passiert,
    wenn eine Farbe ausgewählt wurde, die in dieser Form nicht über den Bus
    übertragen werden kann, da sie mit den vorhandenen Farbkanälen nicht
    darstellbar ist. Dies kann insbesondere bei einem Farbwähler im LCh-Modus
    der Fall sein, wenn die Farbwerte selbst im RGB-Modus übertragen werden.

    Dieses Verhalten kann durch eine Umstellung der Bus-Kommunikation auf den
    xyY-Farbraum lösen.

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

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <colorchooser>
        <label>RGB floor</label>
        <address transform="DPT:232.600" mode="readwrite" variant="rgb">1/2/59</address>
    </colorchooser>


Allowed child-elements und their attributes
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

    Wird am Bus jede Farbe (Rot, Grün, Blau) individuell angesprochen, so muss
    jeweils eine Gruppenadresse mit entsprechendem ``variant`` angelegt werden.
    Für OpenHAB Color Items oder entsprechen kombinierte KNX Datentypen gilt
    diese Einschränkung nicht, sie können beispielsweise mit
    einer Adresse mit dem Zusatz ``variant="rgb"`` angesprochen werden.

Dazu geht man wie folgt vor:

* Auf das Pluszeichen über der Adressliste klicken.
* In das eingefügte, aber noch leere Feld klicken.
* Wenn die Gruppenadresse für die Farben im Wiregate importiert wurden, kann die entsprechende
  Adresse aus dem Auswahlmenü ausgewählt werden. Anderenfalls muss der Haken hinter dem Adressfeld entfernt
  und die Adresse manuell nach dem Format ``x/y/z`` also z.B. ``1/2/59`` eingetragen werden.
* Beim Auswählen einer importierten Gruppenadresse erscheint ggf. der richtige Datenpunkttyp unter Transforms.
  Anderenfalls muss dort von Hand der DPT 5.001 "Scaling" ausgewählt werden.
* Unter Variant muss nun das Kürzel für die Farbe eingegeben werden. z.B. für Rot muss ``r``,
  für Grün ein ``g`` und für Blau ``b`` eingegeben werden.
* Danach einmal auf save klicken und die Schritte für die nächste Farbe wiederholen.

Am Ende sollten drei Einträge in der Adressliste stehen. Mit einem Klick auf OK wird nun der
Farbwahlkreis der aktuellen Visuseite hinzugefügt und kann an einer beliebigen Stelle platziert werden.

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Info widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes