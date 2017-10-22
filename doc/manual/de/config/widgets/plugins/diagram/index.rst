.. replaces:: CometVisu/0.8.x/widgets/diagramm_info/de/
    CometVisu/Widget/diagram_inline/de
    CometVisu/Widget/diagram_popup/de

.. _diagram:

Das Diagram Plugin
==================

.. api-doc:: diagram


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