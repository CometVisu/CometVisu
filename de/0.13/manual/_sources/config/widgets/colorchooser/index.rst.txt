.. replaces:: Colorchooser_(Deutsch)
    CometVisu/0.8.0/ColorChooser/de
    CometVisu/0.8.x/widgets/colorchooser/de/
    CometVisu/ColorChooser
    CometVisu/ColorChooser_(Deutsch)
    CometVisu/Widget/ColorChooser/de
    CometVisu/de/0.11/manual/config/widgets/plugins/colorchooser/

.. _colorchooser:

Der ColorChooser
================

.. api-doc:: ColorChooser

Beschreibung
------------

Mit dem ColorChooser lassen sich Farben auswählen und anzeigen, beispielsweise
für eine Effektbeleuchtung. Sowohl eine RGB-Beleuchtung mit roten, grünen und
blauen Lichtern, aber auch eine RGBW-Beleuchtung mit zusätzlichem weißen
Kanal ist möglich.

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_example" sleep="1000">
            <caption>Der ColorChooser</caption>
            <data address="1/2/59" transform="DPT:5.001">50</data>
            <data address="1/2/60" transform="DPT:5.001">60</data>
            <data address="1/2/61" transform="DPT:5.001">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-box;T:2500-15000;Y">
      <layout colspan="6" rowspan="6"/>
      <label>ColorChooser</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Einfacher Modus
^^^^^^^^^^^^^^^

Für die meisten Anwendungsfälle wird der einfache Modus ausreichen, da hier
zugunsten einer einfachen Konfiguration auf die Details einer farbverbindlichen
Wiedergabe verzichtet wird.

Widget-Komponenten: Slider
""""""""""""""""""""""""""

Der ColorChooser bietet verschiedene Möglichkeiten und Kombinationen um eine
Farbe auszuwählen und anzuzeigen. So gibt es Slider für eine direkte Auswahl, aber
aber solche für eine der menschlichen Wahrnehmung besser entsprechenden
Darstellung:

========== =====================================================================
``RGB-r``  Roter Kanal - direkte Ansteuerung einer RGB-Beleuchtung
``RGB-g``  Grüner Kanal - direkte Ansteuerung einer RGB-Beleuchtung
``RGB-b``  Blauer Kanal - direkte Ansteuerung einer RGB-Beleuchtung
``RGBW-r`` Roter Kanal - direkte Ansteuerung einer RGBW-Beleuchtung
``RGBW-g`` Grüner Kanal - direkte Ansteuerung einer RGBW-Beleuchtung
``RGBW-b`` Blauer Kanal - direkte Ansteuerung einer RGBW-Beleuchtung
``RGBW-w`` Weißer Kanal - direkte Ansteuerung einer RGBW-Beleuchtung
``h``      hue - Farbton des HSV-Farbraums, indirekte Ansteuerung
``s``      saturation - Sättigung des HSV-Farbraums, indirekte Ansteuerung
``v``      value - Helligkeit des HSV-Farbraums, indirekte Ansteuerung
``T``      Farbtemperatur für Weiß, indirekte Ansteuerung
``Y``      Helligkeit im xyY-Farbraum, indirekte Ansteuerung
``LCh-L``  lightness - Helligkeit im L*C*h° CIE Farbraum, indirekte Ansteuerung
``LCh-C``  chroma - Buntheit im L*C*h° CIE Farbraum, indirekte Ansteuerung
``LCh-h``  hue - Farbtonwinkel im L*C*h° CIE Farbraum, indirekte Ansteuerung
========== =====================================================================

Der Slider für die Farbtemperatur nimmt eine Sonderrolle ein, da dieser
gleichzeitig den Farbton als auch die Sättigung so einstellt, dass diese
Farbtemperatur mit der Beleuchtung erreicht wird. Soll die Farbtemperatur noch
um einen Slider für die Helligkeit ergänzt werden, so ist hierfür ``Y`` am
besten geeignet.

Bei dem Farbtemperatur-Slider kann durch einen Doppelpunkt getrennt der
Bereich für die Farbtemperaturen festgelegt werden. So zeigt ``T:2000-10000``
einen Slider der von 2000 Kelvin bis 10000 Kelvin reicht.

Beispiel: RGB-Slider
....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_rgb" sleep="1000">
            <caption>ColorChooser, RGB-Slider</caption>
            <data address="1/2/59" transform="DPT:5.001">90</data>
            <data address="1/2/60" transform="DPT:5.001">80</data>
            <data address="1/2/61" transform="DPT:5.001">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="RGB-r;RGB-g;RGB-b">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser RGB-Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Beispiel: RGBW-Slider
.....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_rgbw" sleep="1000">
            <caption>ColorChooser, RGBW-Slider</caption>
            <data address="1/2/59" transform="DPT:5.001">90</data>
            <data address="1/2/60" transform="DPT:5.001">100</data>
            <data address="1/2/61" transform="DPT:5.001">0</data>
            <data address="1/2/62" transform="DPT:5.001">80</data>
        </screenshot>
    </settings>
    <colorchooser controls="RGBW-r;RGBW-g;RGBW-b;RGBW-w">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser RGBW-Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-b">1/2/61</address>
      <address transform="DPT:5.001" mode="readwrite" variant="RGBW-w">1/2/62</address>
    </colorchooser>

Beispiel: HSV-Slider
....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_hsv" sleep="1000">
            <caption>ColorChooser, HSV-Slider</caption>
            <data address="1/2/59" transform="DPT:5.001">99</data>
            <data address="1/2/60" transform="DPT:5.001">80</data>
            <data address="1/2/61" transform="DPT:5.001">90</data>
        </screenshot>
    </settings>
    <colorchooser controls="h;s;v">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser HSV-Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="h">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="s">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="v">1/2/61</address>
    </colorchooser>

Beispiel: Farbtemperatur- und Helligkeits-Slider
................................................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_TY" sleep="1000">
            <caption>ColorChooser, Farbtemperatur- und Helligkeits-Slider</caption>
            <data address="1/2/59" transform="DPT:5.001">45.1</data>
            <data address="1/2/60" transform="DPT:5.001">68.6</data>
            <data address="1/2/61" transform="DPT:5.001">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="T:2000-10000;Y">
      <layout colspan="6" rowspan="3"/>
      <label>ColorChooser T- und Y-Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Beispiel: LCh-Slider
....................

.. widget-example::

    <settings sleep="500">
        <screenshot name="colorchooser_slider_LCh" sleep="1000">
            <caption>ColorChooser, LCh-Slider</caption>
            <data address="1/2/59" transform="DPT:5.001">42.7</data>
            <data address="1/2/60" transform="DPT:5.001">0</data>
            <data address="1/2/61" transform="DPT:5.001">100</data>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-L;LCh-C;LCh-h">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser LCh-Slider</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Widget-Komponenten: Farbwahlrad
"""""""""""""""""""""""""""""""

Statt der einzelnen Slider gibt es auch kombinierende, komplexere Möglichkeiten:

================ ====================================================================================
``box``          Farbwahlrad mit Quadratischem Helligkeits- und Sättigungswähler, HSV-Farbraum
``triangle``     Farbwahlrad mit dreieckigem Helligkeits- und Sättigungswähler, HSV-Farbraum
``LCh-box``      Farbwahlrad mit Quadratischem Helligkeits- und Sättigungswähler, L*C*h° CIE Farbraum
``LCh-triangle`` Farbwahlrad mit dreieckigem Helligkeits- und Sättigungswähler, L*C*h° CIE Farbraum
================ ====================================================================================

Beispiel: kombinierter Wähler ``box``
.....................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_box">
            <caption>ColorChooser, kombinierte Wähler: box</caption>
        </screenshot>
    </settings>
    <colorchooser controls="box">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser box</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Beispiel: kombinierter Wähler ``triangle``
..........................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_triangle">
            <caption>ColorChooser, kombinierte Wähler: triangle</caption>
        </screenshot>
    </settings>
    <colorchooser controls="triangle">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser triangle</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Beispiel: kombinierter Wähler ``LCh-box``
.........................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_LCh_box">
            <caption>ColorChooser, kombinierte Wähler: LCh-box</caption>
        </screenshot>
    </settings>
    <colorchooser controls="LCh-box">
      <layout colspan="6" rowspan="4"/>
      <label>ColorChooser LCh-box</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

Beispiel: kombinierter Wähler ``LCh-triangle``
..............................................

.. widget-example::

    <settings>
        <screenshot name="colorchooser_complex_LCh_triangle">
            <caption>ColorChooser, kombinierte Wähler: LCh-triangle</caption>
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

    Im einfachen Modus sollten das Farbwahlrad im HSV-Farbraum benutzt
    werden, im professionellen Modus, wenn die Farborte der einzelnen Farben
    konfiguriert wurden, im L*C*h°-Farbraum.

Dim-Kurven
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
    Farbkomponenten (``r``, ``g``, ``b`` und ggf. ``w``) erfolgt. Wird statt dessen eine
    komplette Farbe als ``HSV``, oder im optimalen Fall, als ``xyY``-Farbe übertragen,
    so ist die Angabe einer Dim-Kurve nicht notwendig.

Welcher Wert richtig ist lässt sich aus der Dokumentation der Beleuchtungssystems
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
Wert aus der letzten Spalte als Dim-Kurve zu verwenden:

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

Professioneller Modus
^^^^^^^^^^^^^^^^^^^^^

Für professionelle Anwendungen wie in der Architektur, Kunstgalerien oder
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
von der Black-Body-Kurve berücksichtigt werden müssen, so muss dies jedoch über eine
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

    Der ColorChooser verwendet intern den CIE xyY Farbraum. Für die Umrechnung
    in den L*a*b* bzw. den L*C*h° Farbraum wird die Normlichtart D65 und ein
    Beobachterwinkel von 10° verwendet.

Beispiel für einen ColorChooser für den OSRAM LINEARlight FLEX Colormix RGBW
LED-Strip "LF700RGBW-G1-830-06" mit Farborten aus dem Datenblatt und einer
Ansteuerung über DALI:

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

    Wenn mehrere ColorChooser für die gleiche Farbe verwendet werden (z.B. in
    einer Konfiguration, oder bei zwei offenen Instanzen der CometVisu), so ist es
    möglich, dass beide eine leicht unterschiedliche Anzeige haben. Dies passiert,
    wenn eine Farbe ausgewählt wurde, die in dieser Form nicht über den Bus
    übertragen werden kann, da sie mit den vorhandenen Farbkanälen nicht
    darstellbar ist. Dies kann insbesondere bei einem Farbwähler im LCh-Modus
    der Fall sein, wenn die Farbwerte selbst im RGB-Modus übertragen werden.

    Dieses Verhalten kann durch eine Umstellung der Bus-Kommunikation auf den
    xyY-Farbraum lösen.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des ColorChoosers kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im ColorChooser-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: colorchooser

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <colorchooser>
          <label>RGB Flur</label>
          <address transform="DPT:232.600" mode="readwrite" variant="rgb">1/2/59</address>
        </colorchooser>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: colorchooser

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <colorchooser>
      <label>RGB Flur</label>
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

Als Werte für ``variant`` sind zulässig:

========== =====================================================================
``RGB-r``  Roter Kanal einer RGB-Beleuchtung
``RGB-g``  Grüner Kanal einer RGB-Beleuchtung
``RGB-b``  Blauer Kanal einer RGB-Beleuchtung
``r``      Abkürzung für ``RGB-r``
``g``      Abkürzung für ``RGB-g``
``b``      Abkürzung für ``RGB-b``
``rgb``    Kombinierter Datentyp für RGB-Beleuchtung
``RGBW-r`` Roter Kanal einer RGBW-Beleuchtung
``RGBW-g`` Grüner Kanal einer RGBW-Beleuchtung
``RGBW-b`` Blauer Kanal einer RGBW-Beleuchtung
``RGBW-w`` Weißer Kanal einer RGBW-Beleuchtung
``rgbw``   Kombinierter Datentyp für RGBW-Beleuchtung
``h``      Hue-Kanal einer mit HSV angesteuerten Beleuchtung
``s``      Saturation-Kanal einer mit HSV angesteuerten Beleuchtung
``v``      Value-Kanal einer mit HSV angesteuerten Beleuchtung
``hsv``    Kombinierter Datentyp für mit HSV angesteuerten Beleuchtung
``x``      x-Kanal einer mit xyY angesteuerten Beleuchtung
``y``      y-Kanal einer mit xyY angesteuerten Beleuchtung
``Y``      Y-Kanal einer mit xyY angesteuerten Beleuchtung
``xy``     Kombinierter Datentyp für mit xyY angesteuerten Beleuchtung
``xyY``    Kombinierter Datentyp für mit xyY angesteuerten Beleuchtung
========== =====================================================================

.. note::

    Die für die Kommunikation verwendeten ``variant`` müssen nicht den für
    die Anzeige unter Interaktion verwendeten Widget-Elementen im ``controls``
    Attribut entsprechen. So wäre ein ColorChooser mit HSV-Anzeige aber
    RGB-Buskommunikation zulässig.

XML Syntax
----------

Alternativ kann man für das ColorChooser Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

.. code-block:: xml

    <colorchooser>
      <layout colspan="6" rowspan="4"/>
      <label>RGB Flur</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
