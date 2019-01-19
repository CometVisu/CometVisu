.. replaces:: CometVisu/Widget/diagram_inline/de
    CometVisu/Widget/diagram_popup/de

.. _diagram:

Das Diagram Plugin
==================

.. api-doc:: cv.plugins.diagram.AbstractDiagram

.. TODO::

    openHAB Ergänzungen

Beschreibung
------------

Das Diagram-Plugin bietet die Möglichkeit den zeitlichen Verlauf von Messwerten etc. zu visualisieren. Die Datenquelle 
muss im rrd-Format vorliegen. Genaueres dazu im Abschnitt :ref:`RRD-Einführung & Beispiele <rrd_introduction>`.

Das Diagramm wird standardmäßig im Inline-Modus als Widget dargestellt. Zusätzlich kann die Option Popup 
aktiviert werden, so dass das Diagramm nach dem Anklicken im Vollbildmodus erscheint. Je nach Widgetgröße kann
für die Inline Ansicht festgelegt werden ob Legende bzw. Achsenbeschriftungen angezeigt werden sollen.


.. figure:: _static/Diagram_simple_inline2.png
    
   Diagramm als Widget (Inline-Diagramm) mit 5 Datenreihen und rechts unten als kleine Voransicht

.. figure:: _static/Diagram_simple_popup.png
    
   Diagramm Popup das nach dem Anklicken des Diagramms angezeigt wird.


Wenn ein Anzeigewert als Aufruf für das Popup dienen soll, muss das ``diagram_info``-Plugin verwendet werden.
Genauere Informationen dazu unter :ref:`diagram_info`.


Detaillierte Einstellungen
--------------------------

Das Diagram-Plugin ist eines der Widgets mit den umfangreichsten Konfigurationsmöglichkeiten. Viele der Attribute-
bzw. Elemente sind aber optional für verschiedene Sonderanwendungen, so dass bereits mit wenigen Einstellungen
sehr ansehnliche Diagramme in der CometVisu dargestellt werden können.


Erlaubte Attribute im Diagramm-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram

.. _diagram_influx:

Im ``<influx>`` Element kann über das ``authentication`` Attribut auf einen entsprechenden Eintrag aus der
:ref:`versteckten Konfiguration <hidden-config>` verwiesen werden (als Default wird als Name `influx` angenommen).

Die in der versteckte Konfiguration verwendeten Schlüssel/Wert-Paare sind:

+-----------+-----------------------------------------------------------------------------+----------------------------+
|Schlüssel  |Wert                                                                         |Beispiel                    |
+===========+=============================================================================+============================+
|uri        |Die URI für den Zugriff auf die InfluxDB (optional)                          |http://localhost:8086/query |
+-----------+-----------------------------------------------------------------------------+----------------------------+
|user       |Der Benutzername für die InfluxDB                                            |InfluxDBTestUser            |
+-----------+-----------------------------------------------------------------------------+----------------------------+
|pass       |Das Passwort für die InfluxDB                                                |``Xsdwfw324SEs``            |
+-----------+-----------------------------------------------------------------------------+----------------------------+
|selfsigned |Erlaube selbst signierte HTTPS Verbindung zum Server, wenn Wert ``true`` ist |``false``                   |
+-----------+-----------------------------------------------------------------------------+----------------------------+

Im ``<influx>`` Element können über ``<add>``, ``<or>`` und ``<tag>`` Elemente
die anzuzeigenden Daten gefiltert werden.


.. code-block:: xml

    <diagram width="600" height="300" series="fullday" period="8">
      <influx field="Val" fillMissing="linear" style="lines" fill="true" measurement="timeseries_db/KNX_LINE1" authentication="influx">
        <and>
          <tag key="PA" operator="=" value="1.2.3"/>
          <or>
            <tag key="GA" operator="=" value="4/2/0"/>
            <tag key="GA" operator="=" value="4/2/1"/>
          </or>
        </and>
      </influx>
      <rrd datasourceIndex="0" consolidationFunction="AVERAGE" fill="true">26.F25EE7000000_hum</rrd>
    </diagram>

.. figure:: _static/Diagram_influx_editor.png

   Beispiel Influx-Datenquelle mit Filtern

XML Syntax minimal
------------------

Alternativ kann man für das Diagram-Widget auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Nachstehend ein einfaches Beispiel für das Diagram als Widget mit Popup-Funktion inkl. Beispielcode. 

.. figure:: _static/Diagram_simple_inline3.png

.. code-block:: xml

    <diagram  period="24" refresh="300" series="hour" gridcolor="#707070" popup="true" previewlabels="true" legend="both" legendposition="nw">
        <layout colspan="6" rowspan="6"/>
        <axis unit="°C" label="Temperatur"/>
        <rrd color="#FF0000" label="Solar RL [°C]">28.9B3172020000_temp</rrd>
        <rrd color="#FF00FF" label="Buffer 190cm [°C]">28.56A61B030000_temp</rrd>
        <rrd color="#FFFF00" label="Buffer 160cm [°C]">28.DCA672020000_temp</rrd>
        <rrd color="#00FF00" label="Buffer 100cm [°C]">28.EEA21B030000_temp</rrd>
        <rrd color="#0000FF" label="Buffer 40cm [°C]">28.E7E17D020000_temp</rrd>
    </diagram>


