.. replaces:: CometVisu/0.8.x/Howto%3A_Animierter_Hydraulikplan

Anleitung zum Erstellen eines Animierten Hydraulikplans
=======================================================

Voraussetzung
-------------

-  Inkscape

Wir erstellen einen Puffer
--------------------------

-  Inkscape Starten
-  Rechteck erstellen

.. figure:: _static/Puffer1.png
   :alt: Puffer1.png

-  Füllen und Kontur auswählen

.. figure:: _static/Puffer2.png
   :alt: Puffer2.png

-  Farbe der Kontur auf Grau stellen

.. figure:: _static/Puffer3.png
   :alt: Puffer3.png

-  Breite der Kontur einstellen

.. figure:: _static/Puffer4.png
   :alt: Puffer4.png

-  Ergebnis

.. figure:: _static/Puffer5.png
   :alt: Puffer5.png

-  Füllung mit Farbverlauf erstellen

.. figure:: _static/Puffer6.png
   :alt: Puffer6.png

-  Mit der Bearbeitungsfunktion zwei Farben für den Verlauf zuweisen

   -  Farbe 1 (rot) Zuweisen mit 100% Deckung

.. figure:: _static/Puffer7.png
   :alt: Puffer7.png

-  

   -  Farbe zwei (blau) mit 50% Deckung

.. figure:: _static/Puffer8.png
   :alt: Puffer8.png

-  Farbverlauf ändern

   -  es gibt zwei Möglichkeiten

      -  Objekt drehen

.. figure:: _static/Puffer9.png
   :alt: Puffer9.png

-
   -
      -  Farbverlauflinie verschieben

.. figure:: _static/Puffer10.png
   :alt: Puffer10.png

-  Ecken abrunden

.. figure:: _static/Puffer11.png
   :alt: Puffer11.png

Wir erstellen Leitungen
-----------------------

Rohre werden mit dem Freihandlinien Zeichner erstellt. Es ist damit
möglich auch gerade Linien zu Zeichnen Am Startpunkt mit der Maus
klicken. Am Zielpunk wider klicken, fertig ist die Gerade. Wenn man mit
der neuen Linie am letzten Kästchen der alte Linie beginnt werden
die Linien zusammenhängen. Die Zeichenrichtung bestimmt wie später die
Animation läuft. Von rechts nach links gezeichnet, Flüssigkeit fließt
von rechts nach links.

|Rohr1.png| |Rohr2.png|

-  Linie ein Volumen geben

   -  Füllung der Kontur

      -  Muster der Kontur

.. figure:: _static/Rohr3.png
   :alt: Rohr3.png

-
   -
      -  Farbe der Kontur

.. figure:: _static/Rohr4.png
   :alt: Rohr4.png

.. figure:: _static/Rohr5.png
   :alt: Rohr5.png

-  Dem Objekt einen Namen zuweisen. Wird später für die Animation
   benötigt.

   -  Linie mit der rechten Maustaste anklicken

      -  Objekteigenschaften wählen

.. figure:: _static/Rohr6.png
   :alt: Rohr6.png

-  ID ändern

.. figure:: _static/Rohr7.png
   :alt: Rohr7.png

XML-File anpassen (Inkscape)
----------------------------

Nun kommt das Geheimnis der animierten Leitungen

-  Gruppen Bilden

Die benötigte Werte können nur eingetragen werden, wenn die Leitung als
Gruppe definiert wurde.

.. figure:: _static/XML1.png
   :alt: XML1.png

-  Parameter der Gruppe zuordnen

   -  id="<eindeutige id>"
   -  class="pipe_group show_flow flow_control"
   -  data-cometvisu-active="1/0/3"

Die Parameter pipe_group, show_flow, data-cometvisu-active und
flow_control bedeuten:

-  pipe_group => aus dem Pfad wird eine Röhrenform erzeugt
-  show_flow => wird eine fliesende (abstraktes) Fluid "simuliert".
-  data-cometvisu-active="<ga>" => animiert die Flüssigkeit bei aktiver GA
-  flow_control => Animation

.. figure:: _static/XML2.png
   :alt: XML2.png

XML-File anpassen (Editor)
--------------------------

Es ist auch möglich die SVG Datei direkt per Editor zu bearbeiten. Basis
ist die Leitung als Gruppe eingefasst

-  Mit einem Editor die svg Datei öffnen und nach dem Kenner (blaues
   Rohr) suchen

.. figure:: _static/XML3.png
   :alt: XML3.png

-  den Abschnitt mit dem folgendem Code anreichern.

.. code-block:: xml

   <g
   id="<eindeutige id>"
   class="pipe_group show_flow flow_control"
   data-cometvisu-active="1/0/3">
   <path />
   </g>

.. figure:: _static/XML4.png
   :alt: XML4.png

Das Fertige Ergebnis im Webbrowser
----------------------------------

.. figure:: _static/XML5.png
   :alt: XML5.png

.. |Rohr1.png| image:: _static/Rohr1.png
.. |Rohr2.png| image:: _static/Rohr2.png

