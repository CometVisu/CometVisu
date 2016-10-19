.. _include:

Das Include Widget
==================

.. api-doc:: Switch

Beschreibung
------------

Das Include Widget ist im eigentlichen kein Widget, denn es bewirkt keine sichtbaren Änderungen
in der Visualisierung.

Mit Hilfe des Include-Elements kann man seine visu_config.xml Datei in mehrere Dateien aufteilen.
Das kann bei sehr großen Dateien, hilfreich sein, den Überblick zu bewahren, wenn man den XML-Code direkt
bearbeiten möchte.

.. code-block:: xml

    <page>
        <include src="Wohnzimmer.xml"/>
        <include src="Schlafzimmer.xml"/>
        ...
    </page>

Wie im Beispiel zu sehen, kann man z.B. für jeden Raum eine eigene XML-Datei anlegen und diese dann mittels
``include`` an der gewünschten Stelle in der eigentlichen *visu_config.xml* einbinden.


