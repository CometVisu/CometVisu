.. _size-attributes:

====================================
Ändern der Größe von Widget-Inhalten 
====================================

In folgenden Widgets stehen neben dem Kind-Element ``layout`` (legt die äußeren Widget-Abmessungen fest) weitere 
Attribute wie zB. ``width`` und ``height`` zur Beeinflussung des Inhaltes zur Verfügung:

-  :doc:`Image <widgets/image/index>`
-  :doc:`Video <widgets/video/index>`
-  :doc:`Web <widgets/web/index>`
-  :doc:`Diagram <widgets/plugins/diagram/index>`
-  RSSlog
-  RSS
-  :doc:`Gauge <widgets/plugins/gauge/index>`

Grundsätzlich wird empfohlen, zu Beginn ohne diese Attribute zu beginnen, da in den meisten Fällen die Größe des 
Inhaltes automatisch an die Widgetgröße angepasst wird.  Trotzdem kann es in einigen Fällen sinnvoll sein, zusätzlich
das ``width`` oder ``height`` Attribut zu verwenden.

Die Angabe erfolgt im CSS-Format und kann dabei in Pixel, Prozent oder relativ zur Schriftgröße erfolgen. 


Größenangaben in Pixel
----------------------

Die Angabe in Pixel erfolgt im Format ``width="300px"`` bzw. ``height="200px"``. 

.. IMPORTANT::

      Mit der Angabe in Pixel wird im Verhältnis zur Viewportgröße skaliert und nicht bezogen auf die physikalische 
      Auflösung des Displays. Die Viewport Größe ist für jedes Gerät auf Basis der Displaygröße (Bildschirmdiagonale) 
      definiert. Eine Übersicht liefert zB. `<viewportsizes.com>`__


Größenangaben in Prozent
------------------------

Die Angabe in Prozent erfolgt im Format ``width="100%"`` bzw. ``height="100%"``.

Die Prozentzahl bezieht sich dabei auf den sichtbaren Bereich der Widget-Größe. D.h. mit ``width=100%`` wird der Inhalt
auf die gesamte Widgetbreite skaliert (sowohl vergrößert als auch verkleinert), mit ``width=50%`` wird das Widget zur
Hälfte ausgefüllt.


Größenangaben relativ zur Schriftgröße
--------------------------------------

Die Angabe erfolgt im Format ``width="50em"`` bzw. ``height="30em"``. Die Einheit "em" ist dabei die Standardschriftgröße
des Textes in der  Cometvisu. 

