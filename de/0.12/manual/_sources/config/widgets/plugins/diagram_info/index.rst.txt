.. replaces:: CometVisu/0.8.x/widgets/diagramm_info/de/

.. _diagram_info:

Das Diagramm_Info Plugin
========================

.. api-doc:: cv.plugins.diagram.AbstractDiagram

.. TODO::

    Inhalt übertragen + openHAB Ergänzungen

Beschreibung
------------

Das Diagram-Plugin bietet die Möglichkeit als Widget einen aktuellen Wert anzuzeigen, der beim Anklicken
ein Popup-Diagramm öffnet, dass den zeitlichen Verlauf des Wertes visualisiert. Die Datenquelle 
muss im rrd-Format oder in einer Influx-Datenbank vorliegen. Genaueres dazu im
Abschnitt :ref:`RRD-Einführung & Beispiele <rrd_introduction>`.

Soll das Diagramm selbst als Widget angezeigt werdeb, muss das ``diagram``-Plugin verwendet werden.
Genauere Informationen dazu unter :ref:`diagram`.


Detaillierte Einstellungen
--------------------------

Das Diagram-Plugin ist eines der Widgets mit den umfangreichsten Konfigurationsmöglichkeiten. Viele der Attribute-
bzw. Elemente sind aber optional für verschiedene Sonderanwendungen, so dass bereits mit wenigen Einstellungen
sehr ansehnliche Diagramme in der CometVisu dargestellt werden können.


Erlaubte Attribute im Diagramm-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: diagram_info


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: diagram_info
