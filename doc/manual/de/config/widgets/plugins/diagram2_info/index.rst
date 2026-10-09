.. _diagram2_info:

Das Diagram2_Info Plugin
========================

.. api-doc:: cv.plugins.diagram2.AbstractDiagram2

Beschreibung
------------

Das Diagram2_Info-Plugin zeigt als Widget den aktuellen Wert einer Adresse an. Mit
``popup="true"`` öffnet ein Klick darauf ein Vollbild-Diagramm, das den zeitlichen Verlauf
darstellt. Es ist der Nachfolger von :ref:`diagram_info` und zeichnet mit D3.

Der angezeigte Wert kommt aus dem ``<address>``-Element und wird über ``format`` aufbereitet — wie
bei jedem anderen Info-Widget. Das Diagramm im Popup wird genauso konfiguriert wie bei
:ref:`diagram2`: über ``<axis>`` und die Datenquellen ``<rrd>``, ``<influx>``, ``<openhab>`` und
``<demo>``. Auch die Bedienung im Popup — verschieben, zoomen, Nachladen des
sichtbaren Bereichs — ist dieselbe.

Ohne ``popup="true"`` bleibt es bei der reinen Wertanzeige; das Widget ist dann nicht anklickbar.

Soll das Diagramm selbst als Widget erscheinen, ist :ref:`diagram2` das passende Widget.

.. code-block:: xml

    <diagram2_info series="day" period="3" popup="true" format="%.1f °C">
      <layout colspan="3"/>
      <label>Aussentemperatur</label>
      <axis unit=" °C" decimals="1">temperature</axis>
      <influx measurement="haus/temperatur" color="#FF0000"/>
      <address transform="DPT:9.001">4/2/0</address>
    </diagram2_info>

Detaillierte Einstellungen
--------------------------

Erlaubte Attribute im Diagramm-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram2_info


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram2_info
