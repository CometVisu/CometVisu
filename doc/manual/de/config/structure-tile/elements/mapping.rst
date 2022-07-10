.. _tile-element-mapping:

Mapping
=======

.. HINT::

    Die Funktionalität der Mappings in der Tile-Struktur unterscheidet nicht nicht von den Mappings in der Pure-Struktur.
    Lediglich der Names des Elements in der Konfigurationsdatei ist anders: ``<cv-mapping>``.

Mit dem Element "cv-mapping" können verschiedene Werte, die auf dem Bus
gesendet werden für die Visualisierung unterschiedliche Bezeichnungen
bekommen. Als einfachstes Beispiel kann z.B. eine angezeigte "0" als
"Aus" dargestellt werden, währenddessen die "1" mit "Ein" bezeichnet
werden kann. Hierbei können die Begriffe ("An", "Aus" ...) beliebig
gewählt werden. Mapping ist Bestandteil der <cv-meta>-Sektion im XML. Die
Mapping-Definition bekommt einen eindeutigen Namen, auf den man sich im
späteren Verlauf für die unterschiedlichsten Visualisierungselemente
beziehen kann.

Mapping von Werten zu Text
--------------------------

Eine einfache Definition im Meta-Bereich sieht folgendermaßen aus:

.. code-block:: xml

        <cv-mapping name="AusAn">
          <entry value="0">Aus</entry>
          <entry value="1">An</entry>
        </cv-mapping>

Dies würde bei Benutzung mit z.B. einem :ref:`Info-Widget <tile-info>`

Statt 0 und 1:

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile" selector="cv-info">
        <screenshot name="cv-value-nomapping-off" margin="10 10 0 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-nomapping-on" margin="10 10 0 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-info>
        <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/2</cv-address>
    </cv-info>

An und Aus anzeigen:

.. widget-example::
    :hide-source: true
    :shots-per-row: 2

    <settings design="tile" selector="cv-info">
        <screenshot name="cv-value-mapping-off" margin="10 10 0 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-mapping-on" margin="10 10 0 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="AusAn">
          <entry value="0">Aus</entry>
          <entry value="1">An</entry>
        </cv-mapping>
    </cv-meta>
    <cv-info mapping="AusAn">
        <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/2</cv-address>
    </cv-info>

Die Farbe kann durch die Definition des :ref:`Stylings <tile-element-styling>` bestimmt werden.

Mapping von Werten in Icons
---------------------------

Sofern ein Status per Icon angezeigt werden soll, kann man ein Mapping benutzen, um statt Werten (z.B. 0 oder 1) Icons
anzuzeigen.

Die Definition im Meta-Bereich sieht dann folgendermaßen aus:

.. widget-example::
    :hide-screenshots: true

    <settings design="tile">
        <screenshot name="cv-switch-mapping-off" margin="0 10 10 0">
            <data address="1/4/0">0</data>
        </screenshot>
        <screenshot name="cv-switch-mapping-on" margin="0 10 10 0">
            <data address="1/4/0">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="1">ri-lightbulb-fill</entry>
            <entry value="0">ri-lightbulb-line</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="1">active</entry>
            <entry value="0">inactive</entry>
        </cv-styling>
    </cv-meta>
    <cv-switch mapping="light" styling="button">
        <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
        <span slot="primaryLabel">Schalter</span>
        <span slot="secondaryLabel">Ein/Aus</span>
    </cv-switch>


So würde bei Benutzung mit z.B. einem :ref:`Switch-Widget <tile-switch>`, je nach Status
unterschiedliche Icons angezeigt:

.. list-table::
    :class: image-float

    * - .. figure:: _static/cv-switch-mapping-off.png
            :alt: Switch off

      - .. figure:: _static/cv-switch-mapping-on.png
            :alt: Switch on

Die Farbe der Icons wird hierbei über das Styling gesteuert.

Mapping von nicht-binären Werten
--------------------------------

Mapping funktioniert nicht nur bei binären Datentypen.
Ein Türkontakt liefert 0 bei geschlossener Tür, 1 bei offener Tür und 2
bei gekippter Tür. Das Mapping ersetzt die wenig aussagekräftige Zahl
durch die entsprechenden Icons aus dem bei der CometVisu mitgeliefertem
`KNX User Forum Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__

.. widget-example::
    :shots-per-row: 3

    <settings design="tile">
        <screenshot name="mapping_door_closed">
            <data address="1/1/0">0</data>
        </screenshot>
        <screenshot name="mapping_door_open">
            <data address="1/1/0">1</data>
        </screenshot>
        <screenshot name="mapping_door_tilt">
            <data address="1/1/0">2</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="AufZuTuerSymbol">
            <entry value="0">knxuf-fts_door</entry>
            <entry value="1">knxuf-fts_door_open</entry>
            <entry value="2">knxuf-fts_door_tilt</entry>
        </cv-mapping>
        <cv-styling name="AufZuTuer">
            <entry value="0">green</entry>
            <entry value="1">red</entry>
            <entry value="2">orange</entry>
        </cv-styling>
    </cv-meta>
    <cv-tile>
        <cv-row colspan="3" row="first">
            <label class="secondary">Haustür</label>
        </cv-row>
        <cv-row colspan="3" row="2">
            <cv-value mapping="AufZuTuerSymbol" styling="AufZuTuer">
                <cv-address transform="DPT:4.001" mode="read">1/1/0</cv-address>
                <cv-icon class="value" size="xxx-large"/>
            </cv-value>
        </cv-row>
    </cv-tile>

Wertebereiche
-------------

Es können auch Wertbereiche für die entsprechende Darstellung gewählt
werden:

.. code-block:: xml

    <cv-mapping name="Vorzeichen">
      <entry range_min="-1e99" range_max="0">Negativ</entry>
      <entry value="0">Null</entry>
      <entry range_min="0" range_max="1e99">Positiv</entry>
    </cv-mapping>

Bei genauer Betrachtung sieht man, dass die "0" drei mal vorkommt. Hier
gilt die Regel, dass alle Werte, die Einzeldefinitionen haben, höher
priorisiert werden, als die Werte innerhalb eines Wertebereichs. Dadurch
ist es möglich, für einzelne Werte Sonderbezeichnungen (in diesem Fall
die "Null") zu definieren.

Besondere Mapping-Werte
-----------------------

Es gibt zwei Mapping Werte die gesondert behandelt werden:

 * ``NULL``: wird angewendet, wenn der Wert leer ist
 * ``*``: wird angewendet, wenn kein vorher definiertes Mapping für den Wert gefunden wurde

.. code-block:: xml

    <cv-mapping name="Fehler">
        <entry value="NULL">Fehler</entry>
        <entry value="*">Ok</entry>
    </cv-mapping>

Liefert das Backend keine Wert, liefert das Mapping den Wert *Fehler* zurück, ansonsten *Ok*.

Formeln (Einsteiger)
--------------------

Manchmal ist es auch nötig, Werte vor der Darstellung umzurechnen, z.B.
um andere Einheiten zu benutzen.

"x" ist der Eingangswert, den die Formel passend modifiziert auf den
Wert "y" zuweisen muss.

Komplexere Funktionen und Berechnungen mit mehreren Werten können hier
nicht durchgeführt werden, dafür muss eine externe Logik Engine (linknx
o.ä.) eingesetzt werden. Allerdings ist es durchaus möglich, die
gegebenen JavaScript-Funktionen zu verwenden. Mehr dazu weiter unten.

.. code-block:: xml

    <cv-mapping name="Umrechnen_kW">
      <formula>y = x*1000</formula>
    </cv-mapping>

Beispielsweise kann man damit °C in °F umrechnen:

.. widget-example::

    <settings design="tile" selector="cv-group">
        <screenshot name="mapping_formula">
            <data address="3/6/0">8.4</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="C-to-F">
            <formula>y = x*1.8+32</formula>
        </cv-mapping>
    </cv-meta>
    <cv-group open="true">
        <cv-info format="%.1f C">
            <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
            <span slot="label">Aussentemperatur</span>
        </cv-info>
        <cv-info format="%.1f F" mapping="C-to-F">
            <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
            <span slot="label">Aussentemperatur</span>
        </cv-info>
    </cv-group>

Mit diesem Beispiel können fehlerhafte Sensoren in einer Übersichtsseite markiert werden.
Sensoren liefern in der Regel nummerische Werte. Bleiben diesen aus, kann z.B. das expire-Binding
in openHAB einen negativen Wert zurückliefern. Das Mapping würde ein *OK* oder *not OK* liefern:

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="mapping-sensor-alarm-ok">
            <data address="3/6/0">0</data>
        </screenshot>
        <screenshot name="mapping-sensor-alarm-notok">
            <data address="3/6/0">-1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="SensorAlarm">
            <formula>y = (x >= 0) ? "OK" : "not OK";</formula>
        </cv-mapping>
    </cv-meta>
    <cv-info mapping="SensorAlarm">
        <cv-address slot="address" mode="read" transform="DPT:9.001">3/6/0</cv-address>
        <span slot="label">BWM WZ</span>
    </cv-info>

Formeln (Advanced)
------------------

Wenn bekannt ist, um welchen exakten Objekt-Typ es sich handelt, können
in einer Formel auch die konkreten JavaScript-Methoden verwendet werden.

Wird bspw. openHAB als Backend verwendet, gibt es dort den Item-Type
*DateTime*. Dieser Datentyp wird auf das JavaScript-Gegenstück gemappt,
so dass dessen Methoden direkt angewendet werden können.

Ohne Mapping resp. Formel sieht der Output eines openHAB-DateTime-Items
bspw. so aus:

.. widget-example::

    <settings design="tile">
        <screenshot name="mapping-oh-datetime">
            <data address="Sunrise_Time">2022-08-21T15:57:50</data>
        </screenshot>
    </settings>
    <cv-info format="%s Uhr" value-size="normal">
        <cv-address slot="address" transform="OH:datetime">Sunrise_Time</cv-address>
    </cv-info>

Möchte man jedoch lediglich die Uhrzeit im Output haben, so geht das mit
folgendem Mapping:

.. widget-example::

    <settings design="tile">
        <screenshot name="mapping_oh_time">
            <data address="Sunrise_Time">2022-08-21T15:57:50</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="HourMinute">
            <formula>y = x &amp;&amp; x.constructor === Date ? x.getHours() + ':' + x.getMinutes() : x;</formula>
        </cv-mapping>
    </cv-meta>
    <cv-info format="%s Uhr" mapping="HourMinute" value-size="normal">
        <cv-address slot="address" transform="OH:datetime">Sunrise_Time</cv-address>
    </cv-info>


.. CAUTION::
    Die OH-Datentypen sind vollständig in Kleinbuchstaben
    definiert! Das muss in der CV-Konfig auch so geschrieben werden, sonst
    wird das Mapping nicht funktionieren. *DateTime* ist nicht gleich
    *datetime*!

Der openHAB-DateTime-Datentyp wird auf ein JavaScript-Date gemappt.
`Hier <http://www.w3schools.com/jsref/jsref_obj_date.asp>`__ findet sich
die Referenz der verfügbaren JavaScript-Methoden, welche man auf diesem
Objekt aufrufen kann.

Beispiel-Mappings
-----------------

.. HINT::

    bei copy&paste einen UTF-8 fähigen Editor nutzen!

Wind und Windstärke
^^^^^^^^^^^^^^^^^^^

Für Wetterdaten in km/h:

.. code-block:: xml

    <cv-mapping name="kmh2bft">
        <entry range_min="0" range_max="2">0</entry>
        <entry range_min="2" range_max="5">1</entry>
        <entry range_min="5" range_max="11">2</entry>
        <entry range_min="11" range_max="19">3</entry>
        <entry range_min="19" range_max="28">4</entry>
        <entry range_min="28" range_max="38">5</entry>
        <entry range_min="38" range_max="49">6</entry>
        <entry range_min="49" range_max="61">7</entry>
        <entry range_min="61" range_max="74">8</entry>
        <entry range_min="74" range_max="88">9</entry>
        <entry range_min="88" range_max="102">10</entry>
        <entry range_min="102" range_max="117">11</entry>
        <entry range_min="117" range_max="1e99">12</entry>
    </cv-mapping>

    <cv-mapping name="kmh2wind_text">
        <entry range_min="0" range_max="2">Windstille</entry>
        <entry range_min="2" range_max="5">leiser Zug</entry>
        <entry range_min="5" range_max="11">leichte Brise</entry>
        <entry range_min="11" range_max="19">schwache Brise</entry>
        <entry range_min="19" range_max="28">maessige Brise</entry>
        <entry range_min="28" range_max="38">frische Brise</entry>
        <entry range_min="38" range_max="49">starker Wind</entry>
        <entry range_min="49" range_max="61">steifer Wind</entry>
        <entry range_min="61" range_max="74">stuermischer Wind</entry>
        <entry range_min="74" range_max="88">Sturm</entry>
        <entry range_min="88" range_max="102">schwerer Sturm</entry>
        <entry range_min="102" range_max="117">orkanartiker Sturm</entry>
        <entry range_min="117" range_max="1e99">Orkan</entry>
    </cv-mapping>

Für Wetterdaten in m/s:

.. code-block:: xml

    <cv-mapping name="ms2bft">
        <entry range_min="0" range_max="0.3">0</entry>
        <entry range_min="0.3" range_max="1.6">1</entry>
        <entry range_min="1.6" range_max="3.4">2</entry>
        <entry range_min="3.4" range_max="5.5">3</entry>
        <entry range_min="5.5" range_max="8.0">4</entry>
        <entry range_min="8.0" range_max="10.8">5</entry>
        <entry range_min="10.8" range_max="13.9">6</entry>
        <entry range_min="13.9" range_max="17.2">7</entry>
        <entry range_min="17.2" range_max="20.8">8</entry>
        <entry range_min="20.8" range_max="24.5">9</entry>
        <entry range_min="24.5" range_max="28.5">10</entry>
        <entry range_min="28.5" range_max="32.7">11</entry>
        <entry range_min="32.7" range_max="1e99">12</entry>
    </cv-mapping>

    <cv-mapping name="ms2wind_text">
        <entry range_min="0" range_max="0.3">Windstille</entry>
        <entry range_min="0.3" range_max="1.6">leiser Zug</entry>
        <entry range_min="1.6" range_max="3.4">leichte Brise</entry>
        <entry range_min="3.4" range_max="5.5">schwache Brise</entry>
        <entry range_min="5.5" range_max="8.0">maessige Brise</entry>
        <entry range_min="8.0" range_max="10.8">frische Brise</entry>
        <entry range_min="10.8" range_max="13.9">starker Wind</entry>
        <entry range_min="13.9" range_max="17.2">steifer Wind</entry>
        <entry range_min="17.2" range_max="20.8">stuermischer Wind</entry>
        <entry range_min="20.8" range_max="24.5">Sturm</entry>
        <entry range_min="24.5" range_max="28.5">schwerer Sturm</entry>
        <entry range_min="28.5" range_max="32.7">orkanartiger Sturm</entry>
        <entry range_min="32.7" range_max="1e99">Orkan</entry>
    </cv-mapping>

    <cv-mapping name="ms2wind_fulltext">
        <entry range_min="0" range_max="0.2">Windstille - Keine Luftbewegung. Rauch steigt senkrecht empor</entry>
        <entry range_min="0.2" range_max="1.5">Geringer Wind - Kaum merklich. Rauch treibt leicht ab</entry>
        <entry range_min="1.5" range_max="3.3">Leichter Wind - Blätter rascheln. Wind im Gesicht spürbar</entry>
        <entry range_min="3.3" range_max="5.4">Schwacher Wind - Blätter und dünne Zweige bewegen sich, Wimpel werden gestreckt </entry>
        <entry range_min="5.4" range_max="7.9">Mäßiger Wind - Zweige bewegen sich, loses Papier wird vom Boden gehoben</entry>
        <entry range_min="7.9" range_max="10.9">Frischer Wind - Größere Zweige und Bäume bewegen sich, Wind deutlich hörbar </entry>
        <entry range_min="10.9" range_max="13.8">Starker Wind - Dicke Äste bewegen sich, hörbares Pfeifen an Drahtseilen, in Telefonleitungen</entry>
        <entry range_min="13.8" range_max="17.1">Steifer Wind - Bäume schwanken, Widerstand beim Gehen gegen den Wind</entry>
        <entry range_min="17.1" range_max="20.7">Stürmischer Wind - Große Bäume werden bewegt, Fensterläden werden geöffnet, Zweige brechen von Bäumen, beim Gehen erhebliche Behinderung</entry>
        <entry range_min="20.7" range_max="24.4">Sturm - Äste brechen, kleiner Schäden an Häusern, Ziegel und Rauchhauben werden von Dächern gehoben, Gartenmöbel werden umgeworfen und verweht, beim Gehen erhebliche Behinderung</entry>
        <entry range_min="24.4" range_max="28.4">schwerer Sturm - Bäume werden entwurzelt, Baumstämme brechen, Gartenmöbel werden weggeweht, größere Schäden an Häusern; selten im Landesinneren</entry>
        <entry range_min="28.4" range_max="32.6">orkanartiker Sturm - heftige Böen, schwere Sturmschäden, schwere Schäden an Wäldern (Windbruch), Dächer werden abgedeckt, Autos werden aus der Spur geworfen, dicke Mauern werden beschädigt, Gehen ist unmöglich; sehr selten im Landesinneren</entry>
        <entry range_min="32.6" range_max="1e99">Orkan - Schwerste Sturmschäden und Verwüstungen; sehr selten im Landesinneren</entry>
    </cv-mapping>

Windrichtung
^^^^^^^^^^^^

.. code-block:: xml

    <cv-mapping name="Windrichtung_°">
        <entry range_min="0" range_max="11.25">Nord</entry>
        <entry range_min="11.25" range_max="33.75">Nordnordost</entry>
        <entry range_min="33.75" range_max="56.25">Nordost</entry>
        <entry range_min="56.25" range_max="78.75">Ostnordost</entry>
        <entry range_min="78.75" range_max="101.25">Ost</entry>
        <entry range_min="101.25" range_max="123.75">Ostsüdost</entry>
        <entry range_min="123.75" range_max="146.25">Südost</entry>
        <entry range_min="146.25" range_max="168.75">Südsüdost</entry>
        <entry range_min="168.75" range_max="191.25">Süd</entry>
        <entry range_min="191.25" range_max="213.75">Südsüdwest</entry>
        <entry range_min="213.75" range_max="236.25">Südwest</entry>
        <entry range_min="236.25" range_max="258.75">Westsüdwest</entry>
        <entry range_min="258.75" range_max="281.25">West</entry>
        <entry range_min="281.25" range_max="303.75">Westnordwest</entry>
        <entry range_min="303.75" range_max="326.25">Nordwest</entry>
        <entry range_min="326.25" range_max="348.75">Nordnordwest</entry>
        <entry range_min="348.75" range_max="360">Nord</entry>
    </cv-mapping>
