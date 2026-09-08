.. _diagram2_migration:

Umstieg von ``diagram`` auf ``diagram2``
========================================

``diagram2`` versteht dieselbe Konfiguration wie das ältere :ref:`diagram`-Plugin. Für den Umstieg
werden die Elemente umbenannt, das Plugin eingebunden und — wenn die Diagramme genau wie vorher
aussehen sollen — drei Strichstärken gesetzt.

Schritt 1: Plugin einbinden
---------------------------

Im ``<meta>``-Bereich der **Hauptkonfiguration** (nicht in einer eingebundenen Teildatei):

.. code-block:: xml

    <plugins>
      <plugin name="diagram"/>
      <plugin name="diagram2"/>
    </plugins>

Beide Plugins dürfen nebeneinander stehen. Das ist beim Umstellen praktisch: dasselbe Diagramm
einmal als ``<diagram>`` und einmal als ``<diagram2>`` in dieselbe Seite gesetzt, lassen sich
Achsen, Farben und Beschriftung direkt vergleichen. Ist alles umgestellt, kann der Eintrag
``diagram`` entfallen.

Schritt 2: Elemente umbenennen
------------------------------

============================  ==============================
alt                           neu
============================  ==============================
``<diagram>``                 ``<diagram2>``
``<diagram_info>``            ``<diagram2_info>``
============================  ==============================

Alle Attribute und Kind-Elemente bleiben unverändert — ``series``, ``period``, ``legend``,
``gridcolor``, ``<axis>``, ``<rrd>``, ``<influx>``, ``<openhab>`` und der Rest werden genauso
gelesen wie vorher.

Schritt 3: Strichstärken und Gitterfarbe für das Aussehen von ``diagram``
-------------------------------------------------------------------------

``diagram2`` zeichnet ab Werk feiner und mit blasserem Gitter als das flot-basierte Diagramm. Vier
Attribute stellen das um; ohne sie bleibt es beim bisherigen Bild.

===============  ==========  ===========================================  =============
Attribut         Vorgabe     wirkt auf                                    Wert für v1
===============  ==========  ===========================================  =============
``gridwidth``    ``1``       Gitterlinien, Achsenlinien, Tickmarken       ``1``
``gridopacity``  ``0.4``     Deckkraft der Gitterlinien, 0 bis 1          ``1``
``borderwidth``  ``1``       Rahmen um die Zeichenfläche                  ``2``
``linewidth``    s. unten    Graphen samt Balken- und Punktumrissen       ``2``
===============  ==========  ===========================================  =============

``diagram`` zeichnet seine Gitterlinien in voller ``gridcolor``. Das ist leicht zu verwechseln:
flot selbst würde sie mit 22 % Deckkraft zeichnen, das alte Plugin setzt aber ``grid.tickColor``
ausdrücklich auf die Gitterfarbe, sodass die Regel dort nie greift. ``gridopacity="1"`` trifft
dieses Bild.

Ohne ``linewidth`` bleibt es beim bisherigen Bild von diagram2: Linien 1,5, Umrisse von Balken und
Punkten 1. Ein gesetzter Wert gilt für alle drei.

``gridwidth`` steht bereits auf dem Wert von ``diagram`` — flot zeichnet seine Gitterlinien
ebenfalls mit 1 und nur den Rahmen kräftiger. Für das gewohnte Bild genügen also drei Angaben:

.. code-block:: xml

    <diagram2 series="day" period="3" borderwidth="2" linewidth="2" gridopacity="1" popup="true">
      <layout colspan="12" rowspan="6"/>
      <axis unit=" °C" label="Temperatur" decimals="1">temperature</axis>
      <influx measurement="haus/temperatur" color="#FF0000" label="Aussen [°C]" yaxis="temperature"/>
    </diagram2>

Die Werte gelten für ein Diagramm als Ganzes, nicht je Datenreihe, und für ``<diagram2_info>``
genauso.

Was auch mit diesen Werten anders bleibt
----------------------------------------

* **popup wird ausgewertet.** ``diagram`` öffnet die Vollbildansicht immer, ``diagram2`` nur bei
  ``popup="true"``. Ohne das Attribut ist das Widget nicht anklickbar. Wer das alte Verhalten
  will, setzt es überall dort, wo bisher ein Popup aufging.
* **Einheiten erscheinen jetzt.** ``diagram2`` hängt die ``unit`` einer Achse an die
  Achsenbeschriftung und an den Wert im Tooltip. ``diagram`` liest das Attribut zwar, zeigt es aber
  weder an der Achse noch im Tooltip. Wer das gewohnte Bild behalten will, **entfernt ``unit`` aus
  den ``<axis>``-Elementen**; die Einheit lässt sich stattdessen in den Achsentitel schreiben
  (``label="Temperatur [°C]"``).
* **Punkte sind kleiner.** Bei ``style="points"`` zeichnet ``diagram`` Kreise mit 3 px Radius,
  ``diagram2`` mit 2 px. ``linewidth`` betrifft nur den Umriss, nicht den Radius.
* **``zoomYAxis`` wirkt auf beide Gesten.** In ``diagram`` steuert das Attribut nur das Zoomen; das
  Ziehen verschiebt die Werteachsen dort immer mit. In ``diagram2`` bleibt die Werteachse ohne
  ``zoomYAxis="true"`` bei beiden Gesten stehen. Wer das gewohnte Verhalten will, setzt das
  Attribut überall dort, wo im Popup gezogen wird.
* **Die Zeitachse dünnt aus.** Wird der Platz knapp, lässt ``diagram2`` Beschriftungen weg;
  ``diagram`` lässt sie überlappen.
* **Gezeichnet wird mit D3** statt mit flot. jQuery und die acht flot-Skripte werden für
  ``diagram2`` nicht geladen.

Achsen, Legende, Tooltip, Farbreihenfolge, die 2 % Luft über und unter den Graphen, ``refresh``
und alle Datenquellen verhalten sich gleich.
