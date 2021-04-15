.. replaces:: Colorchooser_(Deutsch)
    CometVisu/0.8.0/ColorChooser/de
    CometVisu/0.8.x/widgets/colorchooser/de/
    CometVisu/ColorChooser
    CometVisu/ColorChooser_(Deutsch)
    CometVisu/Widget/ColorChooser/de

.. _colorchooser:

Das ColorChooser Plugin
=======================

.. api-doc:: cv.plugins.ColorChooser

Beschreibung
------------

Der ColorChooser fügt der Visu einen Farbwahlkreis hinzu. Damit können RGB-Anwendungen realisiert werden.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des ColorChooser-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im ColorChooser-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Keine.

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: colorchooser

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
    	    <plugin name="colorchooser" />
        </plugins>
    </meta>
    <colorchooser>
      <label>RGB Kueche</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

.. IMPORTANT::

    Pro Farbe (Rot, Grün, Blau) muss eine Gruppenadresse angelegt werden.
    Für OpenHAB Color Items gilt diese Einschränkung nicht, sie können mit
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

XML Syntax
----------

Alternativ kann man für das ColorChooser Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das ColorChooser Plugin aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="colorchooser_simple">
            <caption>colorchooser, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="colorchooser" />
        </plugins>
    </meta>
    <colorchooser>
      <layout colspan="6" rowspan="4"/>
      <label>RGB Kueche</label>
      <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
      <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
      <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
    </colorchooser>

ToDo für Doku
-------------

Warum zeigen zwei ColorChooser eine komplett unterschiedliche Anzeige?
- Wenn per RGB gekoppelt, aber ein HSV Chooser, dann ist aufgrund der nicht
exakt möglichen umrechnung von RGB nach HSV eine unterschiedliche Anzeige möglich, obwohl die selbe Farbe repräsentiert wird

Wenn die Farben im Chooser nicht zu denen der Beleuchtung passen:
- Dim-Kuven checken

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.