.. _include:

Das Include Widget
==================

.. api-doc:: Switch

Beschreibung
------------

Das Include Widget ist im eigentlichen Sinn kein Widget, denn es bewirkt keine sichtbaren Änderungen
in der Visualisierung.

Mit Hilfe des Include-Elements kann man seine visu_config.xml Datei in mehrere Dateien aufteilen.
Das kann bei sehr großen Dateien, hilfreich sein, den Überblick zu bewahren, wenn man den XML-Code direkt
bearbeiten möchte. Außerdem können bei mehreren visu_config_<variable>.xml Dateien redundante Abschnitte ausgelagert werden.

.. code-block:: xml

    <page>
        <include src="config/Wohnzimmer.xml"/>
        <include src="config/Schlafzimmer.xml"/>
        ...
    </page>

Wie im Beispiel zu sehen, kann man z.B. für jeden Raum eine eigene XML-Datei anlegen und diese dann mittels
``include`` an der gewünschten Stelle in der eigentlichen *visu_config.xml* einbinden.

.. hint::
    Der Pfad zu den inkludierten Dateien muss relativ zum ``resource``-Verzeichnis angegeben werden.
    Wenn die einzubindende Datei im config-Ordner liegt, muss also ``src=config/<dateiname>``
    angegeben werden (siehe Beispielcode oben).

.. hint::
    Der Abschnitt zwischen ``<meta> ... </meta>`` kann nicht ausgelagert werden.

