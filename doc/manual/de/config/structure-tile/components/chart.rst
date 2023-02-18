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
            <fixture source-file="source/test/fixtures/temp-chart.json" target-path="charts/Temperature_FF_Living" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-temp"/>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Wohnzimmer" y-format="%.1f °C" series="day" refresh="300" colspan="3" rowspan="3">
                <dataset chart-type="line" src="Temperature_FF_Living" />
            </cv-chart>
        </cv-tile>
    </cv-widget>

Das Beispiel zeigt den Temperaturverlauf der letzten 24 Stunden, der exakte, formatierte Temperaturwert für
einen Zeitpunkt im Chart wird als Tooltip angezeigt, wenn man mit dem Mauszeiger über den Chart fährt.
Damit der Chart eine gewisse Größe erreicht wird hier eine Kachel mit doppelter Breite ``<cv-tile size="2x1">`` benutzt
und der Chart selbst soll die gesamte Kachel ausfüllen ``<cv-chart ... colspan="3" rowspan="3">``.

Es ist auch möglich mehrere Linien in einem Chart darzustellen und diese farblich von einander abzugrenzen.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="charts/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="charts/PV_Energy_Today" mime-type="application/json"/>
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
                <dataset src="Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
                <dataset src="PV_Energy_Today" color="#FF9900" title="Produktion" />
              </cv-chart>
        </cv-tile>
    </cv-widget>

Die rote Linie zeigt den täglichen Bezug aus dem Stromnetz in kWh und der orange Bereich stellt dem die täglich PV-Produktion in kWh gegenüber.

Das Chart-Element bietet auch die Möglichkeit ein Balkendiagramm darzustellen:

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="charts/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
            <fixture source-file="source/test/fixtures/pv-chart.json" target-path="charts/PV_Energy_Today" mime-type="application/json"/>
        </fixtures>
        <screenshot name="cv-chart-pv-bar">
            <caption>Zwei Balken in einem Chart.</caption>
        </screenshot>
    </settings>
    <cv-widget size="2x1">
        <cv-tile>
            <cv-chart title="Strom" y-format="%.1f kWh" series="month" refresh="300" colspan="3" rowspan="3" x-format="%d. %b">
                <dataset src="Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false" chart-type="bar"/>
                <dataset src="PV_Energy_Today" color="#FF9900" title="Produktion" chart-type="bar"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>

Möchte man auf andere Zeitserien wechseln und innerhalb der gerade ausgewählten navigieren, so kann man diese mit
dem ``selection``-Attribut freischalten. Dieses kann man mit einer Komma-separierten Listen der erlaubten Zeitserien
füllen, oder einfach mit ``all`` for alle.

.. widget-example::

    <settings design="tile" selector="cv-widget">
        <fixtures>
            <fixture source-file="source/test/fixtures/grid-import-chart.json" target-path="charts/Meter_Energy_Grid_Import_Today" mime-type="application/json"/>
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
                <dataset src="Meter_Energy_Grid_Import_Today" title="Netzbezug" color="#FF0000" show-area="false"/>
              </cv-chart>
        </cv-tile>
    </cv-widget>

Navigation
^^^^^^^^^^



Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-chart tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-chart tile

