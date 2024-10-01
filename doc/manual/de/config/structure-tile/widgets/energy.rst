.. _tile-energy:

Das Energy Widget
=================

.. api-doc:: cv.ui.structure.tile.components.Flow

Beschreibung
------------

Mit dem Energy-Widget lassen sich die Energieflüsse innerhalb eines Hauses darstellen.
In der Standardkonfiguration zeigt das Widget aktuelle Werte der elektrischen Leistung (Watt)
und deren Flussrichtung für folgende Typen an: Photovoltaik-Inverter, Batteriespeicher, diverse Verbraucher
und den Hauptstromzähler. Diese Elemente werden eingeblendet, sofern man eine ``<cv-address>`` für 
den entsprechenden Slot hinzufügt. Ein komplettes Beispiel würde so aussehen:

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-energy-full" margin="0 10 10 0">
            <data address="1/4/27">13200</data>
            <data address="1/4/25">386</data>
            <data address="1/4/43">40</data>
            <data address="1/4/42">614</data>
            <data address="1/4/44">11000</data>
            <data address="1/4/45">3000</data>
        </screenshot>
    </settings>
    <cv-energy>
        <cv-address slot="pv-power" transform="DPT:12.001" mode="read">1/4/27</cv-address>
        <cv-address slot="battery-power" transform="DPT:13.001" mode="read">1/4/42</cv-address>
        <cv-address slot="battery-other" transform="DPT:5.001" mode="read" target="progress">1/4/43</cv-address>
        <cv-address slot="grid-power" transform="DPT:13.001" mode="read">1/4/25</cv-address>
        <cv-address slot="charger-power" transform="DPT:12.001" mode="read">1/4/44</cv-address>
        <cv-address slot="heatpump-power" transform="DPT:12.001" mode="read">1/4/45</cv-address>             
    </cv-energy>

Hier sieht man unten zwei Großverbraucher in Form eine Wallbox die gerade 11kW verbraucht und einer Wärmepumpe mit
3kW Verbrauch. Die in der Mitte angezeigten 200W ist der sonstige Hausverbrauch und wird automatisch berechnet als
Differenz der Summe der Verbrauchs- und Bezugsleistung (13200 + 614 + 386 - 11000 - 3000 = 200).

Die Flussrichtung der Energie wird zum einen durch die Pfeilspitzen und zum anderen auch durch Farbänderung dargestellt.
Das Farbschema definiert Farben für PV-Erzeugung (``--pvColor``), Batterie-Ladung (``--batteryInjectColor``),
Batterie-Endladung (``--batteryConsumeColor``), Netzbezug (``--gridConsumeColor``) und Netzeinspeisung (``--gridInjectColor``).
Diese werden als CSS-Variablen definiert und können somit einfach durch einen :ref:`CSS-Style <tile-element-style>`
geändert werden.

Wenn man nun z.B. keine Wallbox und keinen Batteriespeicher hat, werden diese Werte nicht angezeigt:

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-energy-partial">
            <data address="1/4/27">13200</data>
            <data address="1/4/25">-10000</data>
            <data address="1/4/45">3000</data>
        </screenshot>
    </settings>
    <cv-energy>
        <cv-address slot="pv-power" transform="DPT:12.001" mode="read">1/4/27</cv-address>
        <cv-address slot="grid-power" transform="DPT:13.001" mode="read">1/4/25</cv-address>
        <cv-address slot="heatpump-power" transform="DPT:12.001" mode="read">1/4/45</cv-address>
    </cv-energy>

Anpassungsmöglichkeiten
-----------------------

Die bisher beschriebene Verwendungsweise des Energy-Widgets mit ``<cv-address slot="...`` dient lediglich der einfachen,
schnellen Benutzung und deckt nur einige Standard-Anwendungsfälle ab. Es besteht aber die Möglichkeit einen komplett
individuellen Aufbau zu realisieren. Man kann die im Energy-Widget benutzten ``<cv-power-entity>``-Elemente frei platzieren
und individuell konfigurieren. Wenn man keine Adressen angibt, dann hat man ein leeres Widget, das einzige was automatisch
hinzugefügt wird sobald es mindestens ein anderes Element gibt ist das Haus in der Mitte.

Einfaches Beispiel
^^^^^^^^^^^^^^^^^^

Als einfaches Beispiel soll nun ein Balkonkraftwerk und der Hauptstromzähler angezeigt werden. Da dies, zusammen mit
dem Haus, nur 3 Elemente sind, genügt hier ein Widget mit halber Höhe ``size="1x0.5"``.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-energy-simple">
            <data address="1/4/27">400</data>
            <data address="1/4/25">-200</data>
        </screenshot>
    </settings>
    <cv-energy size="1x0.5" rows="1" view-box="0 0 3 1" house-row="0">
        <cv-power-entity type="pv" connect-to="house" row="0" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/27</cv-address>
        </cv-power-entity>
        <cv-power-entity type="grid" id="grid" connect-to="house" row="0" column="2">
            <cv-address transform="DPT:13.001" mode="read">1/4/25</cv-address>
        </cv-power-entity>
    </cv-energy>

Die geänderte Größe benötigt noch ein paar zusätzliche Anpassungen. Zunächst benötigen wir für die 3 Elemente nur
eine Zeile ``row="1"`` (der Standard-Wert sind 3 Zeilen und 3 Spalten). Ebenso muss nun die ViewBox angepasst werden,
die den sichtbaren Bereich des Widgets angibt. Die ersten beiden Werte geben die Start-Spalte und -Zeile des sichtbaren
Bereichs an und die letzten beiden die angezeigten Spalten und Zeilen vom Start gesehen. Die ``view-box="0 0 3 1"``
zeigt also den gesamten Bereich eines Layouts mit 3 Spalten und einer Zeile an.
Als letztes muss noch die Position des Hauses verändert werden, dieses ist immer in Spalte 1 und Zeile 1 platziert (
was bei einen 3x3 Layout die Mitte ist, da immer bei 0 angefangen wird zu zählen).
Da wir hier nur eine Zeile haben, positionieren wir das Haus in dieser ``house-row="0"``.

.. _tile-energy-flow:

Bestimmung der "Flussrichtung"
++++++++++++++++++++++++++++++

Einige Leistungswerte können auch negativ werden und definieren so die Flussrichtung. Gibt der Hauptzähler z.B.
einen negativen Werte aus, bedeutet dass, das diese Leistung gerade ins Netz eingespeist wird. Ein positiver Wert
bedeutet, dass diese Leistung gerade aus dem Netz bezogen wird. Bei einem Batteriespeicher kann der Wert ebenfalls negativ werden,
wenn die Batterie geladen wird. PV und Verbraucherzähler liefern i.d.R. nur positive Werte auch wenn sie direkt gegenüber gestellt
unterschiedliche Richtungen darstellen (Erzeugung vs. Verbrauch).

Die Darstellung der Energieflüsse zwischen zwei Elementen wird über das ``connect-to`` Attribut definiert.
Das Netz (``<cv-power-entity type="grid" id="grid">``) ist mit dem Haus verbunden durch ``connect-to="house"``.
Ein positiver Wert bedeutet dann das die Energie vom Netz in Richtung Haus fließt (Netzbezug) und ein negativer
Wert bedeutet, dass die Energy vom Haus in Richtung Netz fließt (Netzeinspeisung).

Das selbe gilt für den Wechselrichter (``<cv-power-entity type="pv">``), nur das es hier nur Positive Werte geben kann,
die dann in Richtung Haus fließen.

.. hint::

    Wie bereits erwähnt liefern Verbraucherzähler auch nur positive Werte, obwohl hier technisch gesehen
    Energie vom Haus in einen Verbraucher fließt. Daher muss die Verbindung eines Verbrauchers
    zum Haus mit ``connect-from="house"`` angegeben werden.


Komplexes Beispiel
^^^^^^^^^^^^^^^^^^

Die Anpassung in die andere Richtung, indem man ein größeres Widget mit mehr Spalten versieht funktioniert natürlich auch.
Für die folgende Erklärung soll ein erweitertes Setup bestehend aus einem Batteriespeicher mit eigenem PV-Eingang,
einem Hybrid-Wechselrichter mit 2 PV-Eingängen an dem auch der Speicher angeschlossen ist und natürlich wieder dem
Hauptzähler dargestellt werden. Noch dazu sollen nun nicht nur die aktuellen Leistungswerte sondern auch die Energiewerte
des aktuellen Tages dargestellt werden, inkl. dem Eigenverbrauchswert und dem Autarkiegrad.
Dazu wird das Widget vergrößert und mit 6 Spalten versehen.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-energy-complex1">
            <data address="1/4/26">600</data>
            <data address="1/4/27">200</data>
            <data address="1/4/28">200</data>
            <data address="1/4/42">400</data>
            <data address="1/4/43">40</data>
            <data address="1/4/30">800</data>
            <data address="1/4/25">-200</data>
            <data address="1/1/1">5</data>
            <data address="1/1/2">8</data>
            <data address="1/1/3">2</data>
            <data address="1/1/4">1</data>
            <data address="1/1/5">3</data>
            <data address="1/1/6">1</data>
        </screenshot>
    </settings>
    <cv-energy size="2x1" columns="6" view-box="0 0 6 3" house-row="2" center-x="false">
        <cv-power-entity id="battery-pv" type="pv" icon="knxuf-scene_solar_panel" connect-to="battery" row="0" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/26</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv1" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="1">
            <cv-address transform="DPT:12.001" mode="read">1/4/27</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv2" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="2">
            <cv-address transform="DPT:12.001" mode="read">1/4/28</cv-address>
        </cv-power-entity>
        <cv-power-entity type="battery" id="battery" connect-to="inverter" row="1" column="0">
           <cv-address transform="DPT:13.001" mode="read">1/4/42</cv-address>
           <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/43</cv-address>
        </cv-power-entity>
        <cv-power-entity icon="knxuf-scene_power_inverter" id="inverter" connect-to="house" row="1" column="1">
            <cv-address transform="DPT:13.001" mode="read">1/4/30</cv-address>
        </cv-power-entity>
        <cv-power-entity type="grid" id="grid" connect-to="house" row="2" column="2">
            <cv-address transform="DPT:13.001" mode="read">1/4/25</cv-address>
        </cv-power-entity>

        <cv-energy-entity id="pv-today" type="pv" row="0" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/1</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="consumed-today" type="consumer" icon="knxuf-control_building_empty" row="1" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-consume-today" type="battery" row="0" column="4" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/3</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-inject-today" type="battery" row="1" column="4" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/4</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-consume-today" type="grid" row="0" column="5" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-inject-today" type="grid" row="1" column="5" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
        </cv-energy-entity>
        <cv-svg-text-value format="%d%%" row="2" column="3" colspan="1.5" title="Autarkie">
            <!-- math.round(100.0 * (PV_Energy_Today - Energy_Grid_Export_Today) / (Energy_Grid_Import_Today + PV_Energy_Today)) -->
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address-group operator="+">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
                </cv-address-group>
            </cv-address-group>
        </cv-svg-text-value>
        <cv-svg-text-value format="%d%%" row="2" column="4.5" colspan="1.5" title="Eigenverbr.">
            <!-- math.round(100.0 * (PV_Energy_Today - Energy_Grid_Export_Today) / PV_Energy_Today) -->
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
            </cv-address-group>
        </cv-svg-text-value>
    </cv-energy>

Die Anpassung von Größe, Spaltenzahl und ViewBox erfolgt genau wie im einfachen Beispiel. Neu ist hier lediglich die
Angabe ``center-x="false"``. Damit wird die automatische, horizontale Zentrierung des Inhalts der ersten und letzten
Spalte deaktiviert.

Die Tages-Energiewerte werden durch die ``<cv-energy-entity>``-Elemente dargestellt. In der obersten Zeile sieht man die
Energie die heute durch die PV-Module erzeugt, aus der Batterie entladen uns aus dem Netz bezogen wurde.
In der zweiten Zeile sieht man die Energie die heute selbst verbraucht, in die Batterie geladen und ins Netz eingespeist
wurde. Es wird das selbe Farbschema wie bei den Leistungswerten benutzt.

Die unterste Zeile zeigt den Autarkie-Wert (wie viel der verbrauchten Energie wurde selbst erzeugt) und den Eigenverbrauchsanteil
(wie viel der erzeugten Energie wurde selbst verbraucht). Beide Werte werden aus den Werte in den beiden oberen Zeilen
berechnet. Für die Darstellung der Werte als einfachen, formatierten Text mit Überschrift wird ein ``<cv-svg-text-value>``-Element
benutzt.

Alternative Darstellungsmöglichkeiten
+++++++++++++++++++++++++++++++++++++

Mit dem bereits erwähnten ViewBox-Attribut hat man die Möglichkeit nur einen Teil des Widget-Inhalts sichtbar zu machen.
Damit kann man die Größe des Widgets wieder auf die Standardgröße setzen, womit nur die Leistungswerte angezeigt werden.
Die Tageswerte sind durch scrollen innerhalb des Widgets erreichbar.

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-energy-complex-left">
            <caption>Initiale Ansicht</caption>
            <data address="1/4/26">600</data>
            <data address="1/4/27">200</data>
            <data address="1/4/28">200</data>
            <data address="1/4/42">400</data>
            <data address="1/4/43">40</data>
            <data address="1/4/30">800</data>
            <data address="1/4/25">-200</data>
            <data address="1/1/1">5</data>
            <data address="1/1/2">8</data>
            <data address="1/1/3">2</data>
            <data address="1/1/4">1</data>
            <data address="1/1/5">3</data>
            <data address="1/1/6">1</data>
        </screenshot>
        <screenshot name="cv-energy-complex-right" clickpath=".pagination.right" sleep="500">
            <caption>Ansicht nach Klick auf rechten Rand</caption>
        </screenshot>
    </settings>
    <cv-energy columns="6" view-box="0 0 3 3" house-row="2" center-x="false">
        <cv-power-entity id="battery-pv" type="pv" icon="knxuf-scene_solar_panel" connect-to="battery" row="0" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/26</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv1" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="1">
            <cv-address transform="DPT:12.001" mode="read">1/4/27</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv2" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="2">
            <cv-address transform="DPT:12.001" mode="read">1/4/28</cv-address>
        </cv-power-entity>
        <cv-power-entity type="battery" id="battery" connect-to="inverter" row="1" column="0">
           <cv-address transform="DPT:13.001" mode="read">1/4/42</cv-address>
           <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/43</cv-address>
        </cv-power-entity>
        <cv-power-entity icon="knxuf-scene_power_inverter" id="inverter" connect-to="house" row="1" column="1">
            <cv-address transform="DPT:13.001" mode="read">1/4/30</cv-address>
        </cv-power-entity>
        <cv-power-entity type="grid" id="grid" connect-to="house" row="2" column="2">
            <cv-address transform="DPT:13.001" mode="read">1/4/25</cv-address>
        </cv-power-entity>
        <cv-energy-entity id="pv-today" type="pv" row="0" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/1</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="consumed-today" type="consumer" icon="knxuf-control_building_empty" row="1" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-consume-today" type="battery" row="0" column="4" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/3</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-inject-today" type="battery" row="1" column="4" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/4</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-consume-today" type="grid" row="0" column="5" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-inject-today" type="grid" row="1" column="5" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
        </cv-energy-entity>
        <cv-svg-text-value format="%d%%" row="2" column="3" colspan="1.5" title="Autarkie">
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address-group operator="+">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
                </cv-address-group>
            </cv-address-group>
        </cv-svg-text-value>
        <cv-svg-text-value format="%d%%" row="2" column="4.5" colspan="1.5" title="Eigenverbr.">
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
            </cv-address-group>
        </cv-svg-text-value>
    </cv-energy>

.. code:: xml

    <cv-energy columns="6" view-box="0 0 3 3" house-row="2" center-x="false">
    ...

Hier wurde lediglich das ``size``-Attribut entfernt und die 3. Zahl im ``view-box``-Attribut geändert,
dadurch werden nur 3 Spalten angezeigt in einem Widget in Standardgröße. Navigieren innerhalb des des Widgets
kann man einmal durch direktes Scrollen oder durch eine Klick auf unsichtbare Bereiche am rechten und linken Rand.
Durch einen Doppelklick kommt man immer wieder zurück zur initialen Ansicht.

Vollbild-Ansicht
++++++++++++++++

Eine weitere Möglichkeit mehr Details zu sehen bietet die Vollbildansicht des Widgets.

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-energy-complex-fsc">
            <caption>Initiale Ansicht</caption>
            <data address="1/4/26">600</data>
            <data address="1/4/27">200</data>
            <data address="1/4/28">200</data>
            <data address="1/4/42">400</data>
            <data address="1/4/43">40</data>
            <data address="1/4/30">800</data>
            <data address="1/4/25">-200</data>
            <data address="1/1/1">5</data>
            <data address="1/1/2">8</data>
            <data address="1/1/3">2</data>
            <data address="1/1/4">1</data>
            <data address="1/1/5">3</data>
            <data address="1/1/6">1</data>
        </screenshot>
        <screenshot name="cv-energy-complex-fsc-open" clickpath="button.fullscreen" sleep="500" margin="30 30 30 30">
            <caption>Vollbildansicht (verkleinert)</caption>
        </screenshot>
    </settings>
    <cv-energy columns="6" view-box="0 0 3 3" house-row="2" center-x="false" allow-fullscreen="true">
        <cv-power-entity id="battery-pv" type="pv" icon="knxuf-scene_solar_panel" connect-to="battery" row="0" column="0">
            <cv-address transform="DPT:12.001" mode="read">1/4/26</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv1" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="1">
            <cv-address transform="DPT:12.001" mode="read">1/4/27</cv-address>
        </cv-power-entity>
        <cv-power-entity id="pv2" type="pv" icon="knxuf-scene_solar_panel" connect-to="inverter" row="0" column="2">
            <cv-address transform="DPT:12.001" mode="read">1/4/28</cv-address>
        </cv-power-entity>
        <cv-power-entity type="battery" id="battery" connect-to="inverter" row="1" column="0">
           <cv-address transform="DPT:13.001" mode="read">1/4/42</cv-address>
           <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/43</cv-address>
        </cv-power-entity>
        <cv-power-entity icon="knxuf-scene_power_inverter" id="inverter" connect-to="house" row="1" column="1">
            <cv-address transform="DPT:13.001" mode="read">1/4/30</cv-address>
        </cv-power-entity>
        <cv-power-entity type="grid" id="grid" connect-to="house" row="2" column="2">
            <cv-address transform="DPT:13.001" mode="read">1/4/25</cv-address>
        </cv-power-entity>
        <cv-energy-entity id="pv-today" type="pv" row="0" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/1</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="consumed-today" type="consumer" icon="knxuf-control_building_empty" row="1" column="3">
            <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-consume-today" type="battery" row="0" column="4" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/3</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="battery-inject-today" type="battery" row="1" column="4" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/4</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-consume-today" type="grid" row="0" column="5" direction="incoming">
            <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
        </cv-energy-entity>
        <cv-energy-entity id="grid-inject-today" type="grid" row="1" column="5" direction="outgoing">
            <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
        </cv-energy-entity>
        <cv-svg-text-value format="%d%%" row="2" column="3" colspan="1.5" title="Autarkie">
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address-group operator="+">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/5</cv-address>
                </cv-address-group>
            </cv-address-group>
        </cv-svg-text-value>
        <cv-svg-text-value format="%d%%" row="2" column="4.5" colspan="1.5" title="Eigenverbr.">
            <cv-address-group operator="/" round="true" factor="100">
                <cv-address-group operator="-">
                    <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
                    <cv-address transform="DPT:13.013" mode="read">1/1/6</cv-address>
                </cv-address-group>
                <cv-address transform="DPT:13.013" mode="read">1/1/2</cv-address>
            </cv-address-group>
        </cv-svg-text-value>
    </cv-energy>

.. code:: xml

    <cv-energy columns="6" view-box="0 0 3 3" house-row="2" center-x="false" allow-fullscreen="true">
    ...

Wenn man nicht möchte das der Header-Bereich mit dem Button zum Öffnen der Vollbildansicht wertvollen Platz
verbraucht kann man diesen auch ausblenden. Dann wird er nur angezeigt wenn man den Mauszeiger über diesen Bereich
bewegt (oder auf einem Touchscreen in diesen Bereich klickt).

.. code:: xml

    <cv-energy columns="6" view-box="0 0 3 3" house-row="2" center-x="false" allow-fullscreen="true" header="auto-hide">
    ...

Erlaubte Attribute im Energy-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-energy tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-energy tile
