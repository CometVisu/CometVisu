.. _tile-component-chart:

Chart
=====

.. api-doc:: cv.ui.structure.tile.components.Chart


Beschreibung
------------

Das Chart-Element ermöglicht die Visualisierung von historischen Werten als Diagramm.
Dazu muss das Chart-Element mindestens ein ``<dataset>`` Kind-Element enthalten.
Für jedes ``<dataset>`` wird in dem Chart z.B. eine Linie eingezeichnet.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/temp-chart.json" target-path="/rest/persistence/items/Temperature_FF_Living" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-temp"/>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Wohnzimmer" y-format="%.1f °C" series="day" refresh="300" colspan="3" rowspan="3">
                <dataset chart-type="line" src="openhab://Temperature_FF_Living"/>
            </cv-chart>
        </cv-tile>
    </cv-widget>

Das Beispiel zeigt den Temperaturverlauf der letzten 24 Stunden, der exakte, formatierte Temperaturwert für
einen Zeitpunkt im Chart wird als Tooltip angezeigt, wenn man mit dem Mauszeiger über den Chart fährt.
Damit der Chart eine gewisse Größe erreicht wird hier eine Kachel mit doppelter Breite ``<cv-tile size="2x1">`` benutzt
und der Chart selbst soll die gesamte Kachel ausfüllen ``<cv-chart ... colspan="3" rowspan="3">``.

Konfiguration der Datenquelle
#############################

Im ``src``-Attribute des ``dataset``-Elements wird eine URL angegeben die die Datenquelle definiert. Bisher werden
openHAB (`Persistence <https://www.openhab.org/docs/configuration/persistence.html>`_), InfluxDB und RRD als Datenquellen unterstützt.

**Konfiguration einer openHAB-Quelle**

``openhab://<Item-Name>`` wobei <Item-Name> ein beliebiger Item-Name in openHAB sein kann, für den historische Daten aufgezeichnet werden.
Es ist zusätzlich möglich einen spezielle Persistence-Service anzugeben, falls man mehrere benutzt:
``openhab://<service-id>@<Item-Name>``, gibt man diesen nicht an wird der in openHAB konfigurierte default-Persistence Service benutzt.

**Konfiguration einer InfluxDB-Quelle**

``flux://<organization>@<bucket>/<measurement>/<field>`` Optional können Angaben für die
`aggregationWindow-Funktion <https://docs.influxdata.com/flux/v0.x/stdlib/universe/aggregatewindow/>`_ als
Query-Parameter angehängt werden. Diese benötigen den Präfix ``ag-``. Beispiel:
``flux://cometvisu@cv-bucket/Temperature/value?ag-every=1d&amp;ag-fn=mean`` würde in folgende Flux-Query an die
Datenbank geschickt:

.. code-block::

    from(bucket:"cv-bucket")
      |> range(start: <start-zeit>, stop: <end-zeit>)
      |> filter(fn: (r) => r._measurement == "Temperature" and r._field == "value")
      |> aggregateWindow(every: 1d, fn: mean)

Wird nur ``ag-every`` angegeben, dann wird "mean" als Standard-Wert für ``ag-fn`` genommen. Wird beides nicht
angeben, werden die Werte anhand der vom Chart benutzen ``series`` automatisch bestimmt.

Für komplexere Datenbankanfragen kann auch direkt der Code der Flux-Query als Text-Inhalt des ``<dataset>``-Elements
angegeben werden. Im ``src``-Attribute muss dann lediglich noch die Organisation und der Hinweis, dass die Query "inline"
angegeben wurde angegeben werden.

.. code-block:: xml

    <dataset src="flux://openhab@inline">
        from(bucket:"openhab")
            |> range(start: -2d)
            |> filter(fn: (r) => r._measurement == "Counter" and r._field == "value")
            |> aggregateWindow(every: 1d, fn: last)
            |> difference()
    </dataset>

Mit dieser Anfrage wird der Zeitbereich allerdings auf die letzten 2 Tage (``range(start: -2d)``) festgelegt und ist
somit nicht mehr variabel und überschreibt bzw. deaktiviert die Möglichkeit per ``selection`` andere Zeitserien
auswählen zu können. Um dieses Feature nutzen zu können muss man einen Platzhalter einfügen und auch das ``aggregateWindow``
weglassen (dieses wird automatisch passend zu ausgewählten Zeitserie gewählt). Die obere Anfrage würde also so aussehen:

.. code-block:: xml

    <dataset src="flux://openhab@inline">
        from(bucket:"openhab")
            |> range($$RANGE$$)
            |> filter(fn: (r) => r._measurement == "Counter" and r._field == "value")
            |> difference()
    </dataset>

.. hint::

    Da die CometVisu selbst nicht prüfen kann, ob der Flux-Code korrekt ist, empfiehlt es sich die Query
    in der UI der InfluxDB zusammenzustellen und den funktionieren Code dann zu kopieren.

.. hint::

    Wenn mehrere Inline-Queries in einem Chart verwendet werden, muss der Wert des ``src``-Attributs innerhalb dieses Charts eindeutig sein.
    Dazu kann man einfach eine fortlaufende Nummer anhängen, z.B. ``flux://openhab@inline#1`` und ``flux://openhab@inline#2``.

Die URI des InfluxDB-Servers und ein Token für die Authentifizierung der Anfragen müssen in der :ref:`Versteckten Konfigurationen <hidden-config>`
unter der Sektion "influx" angegeben werden. In dieser Sektion sind folgende Schlüssel-Wert Einträge erforderlich.

+----------------+-----------------------------------+
| Schlüssel      | Wert                              |
+----------------+-----------------------------------+
| uri            | `http://<influx-server>:8062`     |
+----------------+-----------------------------------+
| token          | `API Token (kann in der Influx-UI |
|                | generiert werden)`                |
+----------------+-----------------------------------+
| config         | flux                              |
+----------------+-----------------------------------+

Die Werte für "uri" und "token" müssen entsprechend angepasst werden, der Wert für "config" muss "flux" sind damit
die Kommunikation korrekt funktionieren kann.

**Konfiguration einer RRD-Quelle**

``rrd://<dateiname-ohne-rrd>`` Für die RRD-Datenquelle muss der Dateiname ohne das ".rrd" am Ende angegeben werden.
Zusätzlich können als Query-Parameter hinzugefügt werden:

* ``ds``: Auswählen einer der verfügbaren Consolidation Functions des RRDTools (http://rrdtool.org).
* ``res``: Die Standard-Auflösung für die Daten aus der RRD-Datei kann überschrieben werden mit einem eigenen Sekunden-Wert.

Beispiel: ``rrd://<dateiname-ohne-rrd>?ds=AVERAGE&resolution=3600``


Hinzufügen weiterer Quellen mittels Plugins
###########################################

Da die CometVisu nicht alle Datenquellen direkt unterstützt, können weitere Datenquellen über Plugins hinzugefügt werden.
Dazu muss ein Plugin erstellt werden, welches die Datenquelle abfragt und die Daten an das Chart-Element weitergibt.
Die Erstellung und Einbindung dieses Plugin besteht aus 3 Schritten:

1. Javascript-Datei im config/media-Verzeichnis erstellen.
2. Darin eine Klasse anlegen mit folgendem Code als Basis erweitert um die gewünschte Funktionalität:
   https://github.com/CometVisu/CometVisu/blob/develop/source/resource/demo/templates/ChartSourcePlugin.js
3. Laden dieser Datei in der CometVisu-Konfiguration, dazu im ``<cv-meta>``-Element folgendes hinzufügen:
   ``<cv-loader type="js" src="resource/config/media/<Dateiname>.js"/>`` und Namen der neuen Datei eintragen.

Weitere Erklärungen finden sich im Source-Code der Dateivorlage.

Weitere Beispiele
#################

Es ist auch möglich mehrere Linien in einem Chart darzustellen und diese farblich von einander abzugrenzen.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="/rest/persistence/items/PV_Energy_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv">
            <caption>Zwei Linien in einem Chart.</caption>
        </screenshot>
        <screenshot name="cv-chart-pv-tooltip" hover-on="cv-chart > svg" waitfor="cv-chart > div.tooltip">
            <caption>Tooltip mit Einzelwert.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
                <dataset src="openhab://PV_Energy_Today" color="#FF9900" title="Produktion" />
              </cv-chart>
        </cv-tile>
    </cv-widget>

Die rote Linie zeigt den täglichen Bezug aus dem Stromnetz in kWh und der orange Bereich stellt dem die täglich PV-Produktion in kWh gegenüber.

Das Chart-Element bietet auch die Möglichkeit ein Balkendiagramm darzustellen:

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="/rest/persistence/items/PV_Energy_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-bar">
            <caption>Zwei Balken in einem Chart.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false" chart-type="bar"/>
                <dataset src="openhab://PV_Energy_Today" color="#FF9900" title="Produktion" chart-type="bar"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>

Möchte man auf andere Zeitserien wechseln und innerhalb der gerade ausgewählten navigieren, so kann man diese mit
dem ``selection``-Attribut freischalten. Dieses kann man mit einer Komma-separierten Listen der erlaubten Zeitserien
füllen, oder einfach mit ``all`` for alle.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-nav">
            <caption>Zeitserienauswahl mit Navigation.</caption>
        </screenshot>
        <screenshot name="cv-chart-pv-nav-open" clickpath="label.clickable" waitfor="div.popup.series">
            <caption>Zeitserienauswahl geöffnet</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" selection="week,month,year" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>


Einfache Linien
###############

Um bestimmte Stellen im Chart hervorzuheben / zu markieren können horizontale und vertikale Linien eingefügt werden.
Mit einer vertikalen Linie kann eine bestimmte Zeit markiert werden (z.B. die aktuelle Zeit oder Mitternacht).
Mit einer horizontalen Linie kann ein bestimmter Wert markiert werden (z.B. ein Schwellwert), oder auch ein Durchschnitts-,
Höchst- oder Tiefstwert.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-h-lines">
            <caption>Chart mit horizontalen Linien.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" selection="month" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
                <h-line src="openhab://Meter_Energy_Grid_Import_Today" show-value="true" color="#FF0000" value="max" format="%.1f"/>
                <h-line src="openhab://Meter_Energy_Grid_Import_Today" show-value="true" color="#CCCCCC" value="avg" format="%.1f"/>
                <h-line src="openhab://Meter_Energy_Grid_Import_Today" show-value="true" color="#FFFF00" value="min" format="%.1f"/>
                <h-line color="#FFFFFF" value="5" />
              </cv-chart>
        </cv-tile>
    </cv-widget>

Dazu wird eine ``<h-line>`` mit der selben Datenquelle wie die Linie erstellt und der Wert ``avg`` für den Durchschnitt
in ``value`` angegeben. Der Durchschnittswert wird dann als horizontale Linie im Chart dargestellt.
Mit ``show-value="true"`` wird festgelegt, dass der Wert neben der Linie angezeigt wird.
Weitere Werte für ``value`` sind ``min``, ``max`` oder ein fixer Wert.

Auch Inline-Queries können auf diesem Weg wieder verwendet werden:

.. code-block:: xml

    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" selection="month" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://inline#1" title="Netzbezug" color="#FF0000" show-area="false">
                    ...
                <dataset>
                <dataset src="openhab://inline#2" title="Einspeisung" color="#00FF00" show-area="false">
                    ...
                <dataset>
                <h-line src="openhab://inline#1" show-value="true" color="#FF0000" value="avg" format="%.1f"/>
                <h-line src="openhab://inline#2" show-value="true" color="#CCCCCC" value="avg" format="%.1f"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>


**Vertikale Linien**

Bei den vertikalen Linien können momentan nur fixe Werte angegeben werden.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="/rest/persistence/items/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-v-lines">
            <caption>Chart mit vertikaler Linie.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" selection="day" y-format="%.1f kWh" series="day" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="openhab://Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
                <v-line color="#FFFFFF" value="2022-12-02T12:00:00" />
              </cv-chart>
        </cv-tile>
    </cv-widget>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-chart tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-chart tile

