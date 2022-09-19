.. _tile-component-select:

Select
======

.. api-doc:: cv.ui.structure.tile.components.Select


Beschreibung
------------

Die Select-Komponente ermöglicht es einen Wert aus einer vorgegebenen Liste auszuwählen.
Ein möglicher Anwendungsfall ist zum Beispiel die Auswahl des Betriebsmodus eines Raumtemperaturreglers.
Es wird der aktuell ausgewählte Wert angezeigt (sofern Icons benutzt werden, wird nur dieses angezeigt
ohne den zugehörigen Text) und bei Klick auf die Komponente öffnet sich die Liste
mit möglichen Werten aus der dann einer ausgewählt werden kann.

.. widget-example::

    <settings design="tile" selector="cv-select" wrap-in="cv-tile" wrapped-position="colspan='3' row='middle' column='middle'">
        <screenshot name="cv-select-auto">
            <data address="1/4/2">0</data>
            <caption>Normalansicht</caption>
        </screenshot>
        <screenshot name="cv-select-comfort" clickpath="cv-select" margin="0 0 200 0">
            <data address="1/4/2">0</data>
            <caption>mit geöffneter Auswahlliste</caption>
        </screenshot>
    </settings>
    <cv-select>
        <cv-address transform="DPT:20.102">1/4/2</cv-address>
        <cv-option key="0">
            <cv-icon>ri-character-recognition-line</cv-icon>Auto
        </cv-option>
        <cv-option key="1">
            <cv-icon>ri-temp-cold-line</cv-icon>Komfort
        </cv-option>
        <cv-option key="2">
            <cv-icon>ri-shut-down-line</cv-icon>Aus
        </cv-option>
        <cv-option key="3">
            <cv-icon>ri-leaf-line</cv-icon>Eco
        </cv-option>
        <cv-option key="4">
            <cv-icon>ri-shield-line</cv-icon>Frostschutz
        </cv-option>
    </cv-select>

Um den aktuellen Wert anzeigen zu können wird eine lesende ``cv-address`` benötigt, um den
Wert verändern zu können eine schreibende. In dem Beispiel is die Address beides (default).
Die Einträge in der Auswahlliste werden durch ``cv-option``-Elemente definiert.
Diese haben einen ``key`` was dem Wert entspricht der von der Adresse gelesen wird oder dorthin geschickt wird und
einen Inhalt, welcher sich in dem Beispiel aus einer Kombination aus einem :ref:`Icon <tile-component-icon>` und einem Text zusammensetzt.


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-select tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-select tile

