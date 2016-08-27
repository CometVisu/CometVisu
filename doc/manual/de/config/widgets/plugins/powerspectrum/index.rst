.. _powerspectrum:

Das PowerSpectrum Plugin
========================

Beschreibung
------------

Das Plugin erzeugt ein Diagramm, dass das aktuelle Strom- oder Spannungspektrum
der Stromversorgung darstellen kann. Hierzu werden die KNX Diagramme verarbeitet,
die das Enertex Smart Meter versenden kann.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

**Erlaubte Attribute im Switch-Element**

.. parameter_information:: powerspectrum

.. widget_example::
    :editor: attributes
    :scale: 75

        <caption>Attribute im Editor (vereinfachte Ansicht)</caption>
        <powerspectrum type="current" singlephase="false" limitname="Grenze" limitcolor="#999999" name1="Phase U" color1="#ff0000" name2="Phase V" color2="#00ff00" name3="Phase W" color3="#0000ff">
          <layout colspan="6" rowspan="6" />
          <label>All: I</label>
          <address transform="DPT:Harmonics" variant="spectrum1" mode="read">4/4/219</address>
          <address transform="DPT:9.021" variant="I1" mode="read">4/4/211</address>
          <address transform="DPT:Harmonics" variant="spectrum2" mode="read">4/4/229</address>
          <address transform="DPT:9.021" variant="I2" mode="read">4/4/221</address>
          <address transform="DPT:Harmonics" variant="spectrum3" mode="read">4/4/239</address>
          <address transform="DPT:9.021" variant="I3" mode="read">4/4/231</address>
        </powerspectrum>


**Erlaubte Kind-Elemente und deren Attribute**

.. elements_information:: powerspectrum

XML Syntax minimal
------------------

Alternativ kann man für das switch Widget auch von Hand einen Eintrag in
der `visu\_config.xml <CometVisu/XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!
