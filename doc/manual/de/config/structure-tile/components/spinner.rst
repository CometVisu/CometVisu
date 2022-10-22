.. _tile-component-spinner:

Spinner
=======

.. api-doc:: cv.ui.structure.tile.components.Spinner


Beschreibung
------------

Die Spinner-Komponente dient, ebenso wie der :ref:`Slider <tile-component-slider>`, zur Anzeige und Einstellung eines Zahlenwertes innerhalb eines festgelegten Zahlenbereichs.
Ein klassischer Anwendungsfall wäre die Einstellung einer Soll-Temperatur. Der aktuelle Wert wird in der Mitte
angezeigt und rechts und links befinden sich zwei Buttons mit denen der Wert in der eingestellten Schrittweite
erhöht oder reduziert werden kann.

.. widget-example::

    <settings design="tile" selector="cv-spinner" wrap-in="cv-tile" wrapped-position="row='2' colspan='3'">
        <screenshot name="cv-spinner" margin="0 0 0 0">
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-spinner format="%.1f °C" min="15" max="25" step-width="0.5">
        <cv-address transform="DPT:9.001" mode="read">1/4/1</cv-address>
        <cv-address transform="DPT:9.001" mode="write">1/4/2</cv-address>
        <label class="value primary"/>
    </cv-spinner>

Der Wertebereich wird über die Attribute ``min`` und ``max`` begrenzt. Über ``step-width`` kann man festlegen,
wie viel sich der Wert erhöht/reduziert wenn man auf einen der Buttons klickt.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-spinner tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-spinner tile
