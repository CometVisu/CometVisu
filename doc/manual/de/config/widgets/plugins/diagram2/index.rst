.. _diagram2:

Das Diagram2 Plugin
===================

.. api-doc:: cv.plugins.diagram2.AbstractDiagram2

Beschreibung
------------

Das Diagram2-Plugin zeichnet den zeitlichen Verlauf von Messwerten. Es ist der Nachfolger des
:ref:`diagram`-Plugins und benutzt dafür D3 statt flot. Die Konfiguration ist dieselbe: Attribute,
Kind-Elemente, Voreinstellungen und Aussehen entsprechen dem alten Plugin, nur die Widget-Namen
lauten ``diagram2`` und ``diagram2_info``. Dadurch lassen sich beide Plugins nebeneinander in
derselben Konfiguration betreiben und direkt vergleichen.

Wie beim alten Plugin wird das Diagramm standardmäßig als Widget dargestellt (Inline-Diagramm).
Mit ``popup="true"`` öffnet ein Klick zusätzlich eine Vollbildansicht, in der das Diagramm
verschoben und gezoomt werden kann. Je nach Widgetgröße lässt sich über ``previewlabels`` und
``legend`` festlegen, ob Achsenbeschriftungen und Legende im Inline-Diagramm erscheinen.

Soll statt des Diagramms ein aktueller Wert als Widget angezeigt werden, der beim Anklicken das
Diagramm öffnet, ist :ref:`diagram2_info` das passende Widget.

Eingebunden wird das Plugin wie jedes andere im ``meta``-Bereich der Hauptkonfiguration:

.. code-block:: xml

    <plugins>
      <plugin name="diagram2"/>
    </plugins>

.. hint::

    Die Plugin-Liste wird ausschließlich aus der Hauptkonfiguration gelesen. Steht ein
    ``<diagram2>`` in einer über ``<include>`` eingebundenen Datei, muss der ``<plugin>``-Eintrag
    trotzdem in der Hauptkonfiguration stehen.

Datenquellen
------------

Jede Datenreihe ist ein eigenes Kind-Element. Welche Quellen zur Verfügung stehen, hängt vom
verwendeten Backend ab:

=============  ========================================================================================
``<rrd>``      RRD-Datei auf dem Server, wie beim alten Plugin. Der Inhalt ist der Name ohne die
               Endung ``.rrd``, ``datasourceIndex`` wählt die Spalte innerhalb der Datei.
``<influx>``   Messreihe aus einer InfluxDB, gefiltert über ``<and>``, ``<or>`` und ``<tag>``.
``<openhab>``  Item aus der openHAB-Persistenz. Der Inhalt ist der Item-Name.
``<demo>``     Erzeugte Daten, nur in einer Demo-Konfiguration sinnvoll.
=============  ========================================================================================

Die Attribute der Datenreihen sind für alle Quellen weitgehend dieselben: ``yaxis`` ordnet die
Reihe einer Achse zu — der Wert ist der **Name** der Achse, also der Inhalt des zugehörigen
``<axis>``-Elements; ohne Angabe landet die Reihe auf der ersten Achse. ``color`` und ``label``
bestimmen Farbe und Beschriftung in der Legende, ``scaling`` und ``offset`` rechnen die Rohwerte
um, ``style`` wählt zwischen ``lines``, ``bars`` und ``points``, ``fill``, ``steps``, ``barWidth``
und ``align`` bestimmen die Darstellung, und ``resolution`` sowie ``consolidationFunction``
(bei ``<rrd>`` und ``<influx>``) steuern, wie die Werte für den dargestellten
Zeitraum zusammengefasst werden. ``fillMissing`` schließt Lücken — bei ``<rrd>`` gibt es dieses
Attribut nicht.

Die möglichen Werte von ``consolidationFunction`` und ``fillMissing`` sowie die Filter-Elemente und
das ``authentication``-Attribut innerhalb von ``<influx>`` sind beim alten Plugin beschrieben und
gelten unverändert: :ref:`diagram`.

.. code-block:: xml

    <diagram2 series="day" period="3" popup="true" previewlabels="true" legend="both" legendposition="nw">
      <layout colspan="12" rowspan="6"/>
      <axis unit=" °C" label="Temperatur" position="left" decimals="1">temperature</axis>
      <axis unit=" %" label="Feuchte" position="right" min="0" max="100" decimals="0">humidity</axis>
      <influx measurement="haus/temperatur" color="#FF0000" label="Aussen [°C]" yaxis="temperature"/>
      <influx measurement="haus/feuchte" color="#00A0FF" label="Feuchte [%]" yaxis="humidity"/>
    </diagram2>

Bedienung im Popup
------------------

Das Inline-Diagramm ist unbeweglich; verschieben und zoomen geht nur in der Popup-Ansicht:

* **Verschieben**: mit gedrückter Maustaste ziehen, oder mit einem Finger wischen.
* **Zoomen**: Doppelklick zoomt um den Faktor 1,5 hinein, das Mausrad zoomt in beide Richtungen,
  zwei Finger zoomen über die Spreizgeste. Der Punkt unter dem Zeiger bleibt dabei stehen.
* Gezoomt und verschoben wird nur die Zeitachse. Die Werteachsen ziehen nur mit, wenn
  ``zoomYAxis="true"`` gesetzt ist.
* Nach jeder Geste werden die Daten für den neuen Zeitbereich nachgeladen. Das Ende bleibt dabei
  die aktuelle Zeit, der Anfang wandert mit dem sichtbaren Ausschnitt.

Strichstärken und Gitterfarbe
-----------------------------

Vier Attribute bestimmen, wie kräftig gezeichnet wird — jedes für sich, jedes mit dem bisherigen
Bild als Vorgabe:

===============  ==========  ======================================================
Attribut         Vorgabe     wirkt auf
===============  ==========  ======================================================
``gridwidth``    ``1``       Gitterlinien, Achsenlinien und Teilstriche
``gridopacity``  ``0.4``     die Deckkraft der Gitterlinien, 0 bis 1
``borderwidth``  ``1``       den Rahmen um die Zeichenfläche
``linewidth``    s. unten    die Graphen samt Balken- und Punktumrissen
===============  ==========  ======================================================

``gridopacity`` betrifft nur die Gitterlinien; Rahmen, Achsen und Teilstriche sind immer deckend.

Ohne ``linewidth`` zeichnet diagram2 seine Linien mit 1,5 und die Umrisse von Balken und Punkten
mit 1 — also genau wie bisher; ein gesetzter Wert gilt für alle drei.

Das alte Plugin zeichnet kräftiger: Rahmen und Graphen mit 2, die Gitterlinien ebenfalls mit 1,
diese aber in voller Gitterfarbe. Mit ``borderwidth="2" linewidth="2" gridopacity="1"`` sieht ein
``diagram2`` also aus wie ein ``diagram``. Der :ref:`diagram2_migration` führt das im Zusammenhang
aus.

Unterschiede zu ``diagram``
---------------------------

Bewusste Abweichungen vom alten Plugin:

* ``popup`` wird ausgewertet. Ohne dieses Attribut öffnet ein Klick kein Diagramm, und das Widget
  sieht auch nicht mehr nach einem Bedienelement aus. Das alte Plugin öffnet das Popup immer.
* Der Strich ist schlanker und das Gitter blasser, siehe oben; mit drei Attributen ist das alte
  Bild wiederhergestellt.
* Die Einheit einer Achse wird tatsächlich angezeigt — an der Achsenbeschriftung und im Tooltip.
  ``diagram`` zeigt sie an keiner der beiden Stellen, obwohl das ``unit``-Attribut dort ebenfalls
  gelesen wird.
* ``zoomYAxis`` gilt für beide Gesten. Ohne das Attribut bleibt die Werteachse stehen, gleich ob
  gezogen oder gezoomt wird; ``diagram`` bindet nur das Zoomen daran und nimmt die Werteachse beim
  Ziehen immer mit.
* Punkte (``style="points"``) haben 2 px Radius statt 3 px.
* Die Zeitachse dünnt ihre Beschriftung aus, wenn der Platz nicht reicht, statt die Beschriftungen
  überlappen zu lassen.
* Gezeichnet wird mit D3. jQuery und die acht flot-Skripte werden nicht mehr geladen.

Gleich bleiben Attributsatz und Kind-Elemente, die Achsen mit ihren Rändern und Tick-Abständen,
Legende, Tooltip, ``refresh``, die Farbreihenfolge und die Voreinstellungen.

Detaillierte Einstellungen
--------------------------

Erlaubte Attribute im Diagramm-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram2


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram2

.. toctree::
    :titlesonly:
    :hidden:

    migration
