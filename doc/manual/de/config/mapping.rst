.. _mapping:

Mapping
=======

.. TODO::
    Beispiele / Screenshots hinzufügen

Bedeutung
---------

Mit dem Element "Mapping" können verschiedene Werte, die auf dem Bus
gesendet werden für die Visualisierung unterschiedliche Bezeichnungen
bekommen. Als einfachstes Beispiel kann z.B. eine angezeigte "0" als
"Aus" dargestellt werden, währenddessen die "1" mit "Ein" bezeichnet
werden kann. Hierbei können die Begriffe ("An", "Aus" ...) beliebig
gewählt werden. Mapping ist Bestandteil der Meta-Sektion im XML. Alle
Mappings zusammen werden von einem ... Tag umschlossen. Die
Mapping-Definition bekommt einen eindeutigen Namen, auf den man sich im
späteren Verlauf für die unterschiedlichsten Visualisierungselemente
beziehen kann.

Mapping von Werten zu Text
--------------------------

Eine einfache Definition im Meta-Bereich sieht folgendermaßen aus:

.. code-block:: xml

        <mapping name="AusAn">
          <entry value="0">Aus</entry>
          <entry value="1">An</entry>
        </mapping>

Dies würde bei Benutzung mit z.B. einem :doc:`Switch-Widget <widgets/switch/index>`

Statt 0 und 1:

.. figure:: switch-basic.png
   :alt: switch-basic.png

   switch-basic.png

An und Aus anzeigen:

.. figure:: switch-mapping.png
   :alt: switch-mapping.png

   switch-mapping.png

Die Farbe kann durch die Definition des :doc:`Styling <styling>` bestimmt werden.

Mapping von Werten in Icons
---------------------------

Die CometVisu enthält das umfangreichen `KNX User Forum
Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__

Eine Übersicht der verfügbaren Icons findet man am einfachsten auf dem
Rechner auf dem die CometVisu läuft unter
http://<IP>/visu/icon/knx-uf-iconset/showicons.php

Man kann damit Mapping nutzen um statt Werten (z.B. 0 oder 1) Icons
anzuzeigen.

Die Definition im Meta-Bereich sieht dann folgendermaßen aus:

.. code-block:: xml

          <mapping name="On_Off_Symbol">
            <entry value="0">
              <icon name="light_light_dim_00" color="grey"/>
            </entry>
            <entry value="1">
              <icon name="light_light_dim_100" color="white"/>
            </entry>
          </mapping>

So würde bei Benutzung mit z.B. einem :doc:`Switch-Widget <widgets/switch/index>`

statt 0 und 1:

.. figure:: switch-basic.png
   :alt: switch-basic.png

   switch-basic.png

die Birne mit Status in der Schaltfläche anzeigt werden:

.. figure:: mapping-icons.png
   :alt: mapping-icons.png

   mapping-icons.png

Die Farbe eines Icons wird hierbei NICHT über das Styling gesteuert,
sondern direkt im Mapping.

Mapping von nicht-binären Werten
--------------------------------

Mapping funktioniert nicht nur bei binären Datentypen:

.. code-block:: xml

          <mapping name="AufZuTuerSymbol">
            <entry value="0">
              <icon name="fts_door" color="green"/>
            </entry>
            <entry value="1">
              <icon name="fts_door_open" color="red"/>
            </entry>
            <entry value="2">
              <icon name="fts_door_tilt" color="orange"/>
            </entry>
          </mapping>

Ein Türkontakt liefert 0 bei geschlossener Tür, 1 bei offener Tür und 2
bei gekippter Tür. Das Mapping ersetzt die wenig aussagekräftige Zahl
durch die entsprechenden Icons aus dem bei der CometVisu mitgeliefertem
`KNX User Forum Iconset <http://knx-user-forum.de/knx-uf-iconset/>`__

.. figure:: Mapping-doors.png
   :alt: Mapping-doors.png

   Mapping-doors.png

Wertebereiche
-------------

Es können auch Wertbereiche für die entsprechende Darstellung gewählt
werden:

.. code-block:: xml

        <mapping name="Vorzeichen">
          <entry range_min="-1e99" range_max="0">Negativ</entry>
          <entry value="0">Null</entry>
          <entry range_min="0" range_max="1e99">Positiv</entry>
        </mapping>

Bei genauer Betrachtung sieht man, dass die "0" drei mal vorkommt. Hier
gilt die Regel, dass alle Werte, die Einzeldefinitionen haben, höher
priorisiert werden, als die Werte innerhalb eines Wertebereichs. Dadurch
ist es möglich, für einzelne Werte Sonderbezeichnungen (in diesem Fall
die "Null") zu definieren.

Formeln (Einsteiger)
--------------------

Manchmal ist es auch nötig, Werte vor der Darstellung umzurechnen, z.B.
um andere Einheiten zu benutzen.

"x" ist der Eingangswert, den die Formel passend modifiziert auf den
Wert "y" zuweisen muss.

Komplexere Funktionen und Berechnungen mit mehreren Werten können hier
nicht durchgeführt werden, dafür muss eine externe Logik Engine (linkknx
o.ä.) eingesetzt werden. Allerdings ist es durchaus möglich, die
gegebenen JavaScript-Funktionen zu verwenden. Mehr dazu weiter unten.

.. code-block:: xml

        <mapping name="Umrechnen_kW">
          <formula>y = x*1000</formula>
        </mapping>

Beispielsweise kann man damit °C in °F umrechnen:

.. code-block:: xml

        <mapping name="C-to-F">
          <formula>y = x*1.8+32</formula>
        </mapping>

        <info format="%.1f C">
          <label>Aussentemperatur</label>
          <address transform="DPT:9.001" mode="read">3/6/0</address>
        </info>
        <info format="%.1f F" mapping="C-to-F">
          <label>Aussentemperatur</label>
          <address transform="DPT:9.001" mode="read">3/6/0</address>
        </info>

.. figure:: Mapping-formula.png
   :alt: Mapping-formula.png

   Mapping-formula.png

Formeln (Advanced)
------------------

Wenn bekannt ist, um welchen exakten Objekt-Typ es sich handelt, können
in einer Formel auch die konkreten JavaScript-Methoden verwendet werden.

Wird bspw. openHAB als Backend verwendet, gibt es dort den Item-Type
*DateTime*. Dieser Datentyp wird auf das JavaScript-Gegenstück gemappt,
so dass dessen Methoden direkt angewendet werden können.

Ohne Mapping resp. Formel sieht der Output eines openHAB-DateTime-Items
bspw. so aus:

ToDo: Screenshot

Möchte man jedoch lediglich die Uhrzeit im Output haben, so geht das mit
folgendem Mapping:

.. code-block:: xml

        <mapping name="HourMinute">
            <formula>y = x &amp;&amp; x.constructor === Date ? x.getHours() + ':' + x.getMinutes() : x;</formula>
        </mapping>
    ...
        <info format="%s Uhr" class="value_right" mapping="HourMinute">
            <layout colspan="4"/>
        <address transform="OH:datetime">Sunrise_Time</address>
        </info>

Achtung: Die OH-Datentypen sind vollständig in Kleinbuchstaben
definiert! Das muss in der CV-Konfig auch so geschrieben werden, sonst
wird das Mapping nicht funktionieren. *DateTime* ist nicht gleich
*datetime*!

Damit sieht der Output in der Visu dann so aus:

ToDo: Screenshot

Der openHAB-DateTime-Datentyp wird auf ein JavaScript-Date gemappt.
`Hier <http://www.w3schools.com/jsref/jsref_obj_date.asp>`__ findet sich
die Referenz der verfügbaren JavaScript-Methoden, welche man auf diesem
Objekt aufrufen kann.

Beispiel-Mappings
-----------------

bei copy&paste einen UTF-8 fähigen Editor nutzen!

Wind und Windstärke
~~~~~~~~~~~~~~~~~~~

Für Wetterdaten in km/h:

.. code-block:: xml

        <mapping name="kmh2bft">
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
        </mapping>

        <mapping name="kmh2wind_text">
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
        </mapping>

Für Wetterdaten in m/s:

.. code-block:: xml

        <mapping name="ms2bft">
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
        </mapping>

        <mapping name="ms2wind_text">
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
        </mapping>

        <mapping name="ms2wind_fulltext">
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
        </mapping>

Windrichtung
~~~~~~~~~~~~

.. code-block:: xml

        <mapping name="Windrichtung_°">
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
        </mapping>

Rolläden, Raffstores und Jalousien
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

          <mapping name="Jalousie">
            <entry value="0">
              <icon name="fts_window_2w"/>
            </entry>
            <entry range_min="0.01" range_max="14.99">
              <icon name="fts_shutter_10"/>
            </entry>
            <entry range_min="15" range_max="24.99">
              <icon name="fts_shutter_20"/>
            </entry>
            <entry range_min="25" range_max="34.99">
              <icon name="fts_shutter_30"/>
            </entry>
            <entry range_min="35" range_max="44.99">
              <icon name="fts_shutter_40"/>
            </entry>
            <entry range_min="45" range_max="54.99">
              <icon name="fts_shutter_50"/>
            </entry>
            <entry range_min="55" range_max="64.99">
              <icon name="fts_shutter_60"/>
            </entry>
            <entry range_min="65" range_max="74.99">
              <icon name="fts_shutter_70"/>
            </entry>
            <entry range_min="75" range_max="84.99">
              <icon name="fts_shutter_80"/>
            </entry>
            <entry range_min="85" range_max="99.99">
              <icon name="fts_shutter_90"/>
            </entry>
            <entry value="100">
              <icon name="fts_shutter_100"/>
            </entry>
          </mapping>
          <mapping name="Lamelle">
            <entry value="0">
              <icon name="fts_blade_arc_00"/>
            </entry>
            <entry range_min="0.01" range_max="14.99">
              <icon name="fts_blade_arc_10"/>
            </entry>
            <entry range_min="15" range_max="24.99">
              <icon name="fts_blade_arc_20"/>
            </entry>
            <entry range_min="25" range_max="34.99">
              <icon name="fts_blade_arc_30"/>
            </entry>
            <entry range_min="35" range_max="44.99">
              <icon name="fts_blade_arc_40"/>
            </entry>
            <entry range_min="45" range_max="54.99">
              <icon name="fts_blade_arc_50"/>
            </entry>
            <entry range_min="55" range_max="64.99">
              <icon name="fts_blade_arc_60"/>
            </entry>
            <entry range_min="65" range_max="74.99">
              <icon name="fts_blade_arc_70"/>
            </entry>
            <entry range_min="75" range_max="84.99">
              <icon name="fts_blade_arc_80"/>
            </entry>
            <entry range_min="85" range_max="99.99">
              <icon name="fts_blade_arc_90"/>
            </entry>
            <entry value="100">
              <icon name="fts_blade_arc_100"/>
            </entry>
          </mapping>
