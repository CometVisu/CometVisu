.. _tile-component-slider:

Slider
=======

.. api-doc:: cv.ui.structure.tile.components.Slider


Beschreibung
------------

Die Slider-Komponente dient, ebenso wie der :ref:`Spinner <tile-component-spinner>`, zur Anzeige und Einstellung eines Zahlenwertes innerhalb eines festgelegten Zahlenbereichs.
Ein klassischer Anwendungsfall wäre die Einstellung eines Dimm- oder Lautstärkewerts. Der Slider besteht aus einem
horizontalen Balken, welcher den Wertebereich darstellt und einem Button den man darüber verschieben kann, um den aktuellen
Wert einzustellen.

.. widget-example::

    <settings design="tile" selector="cv-slider" wrap-in="cv-tile" wrapped-position="row='2' colspan='3'">
        <screenshot name="cv-slider-volume" margin="0 0 0 0">
            <data address="1/4/1">60</data>
        </screenshot>
    </settings>
    <cv-slider min="0" max="100" format="%d %%">
        <cv-address transform="DPT:5.001">1/4/1</cv-address>
        <cv-icon class="decrease">ri-volume-down-line</cv-icon>
        <cv-icon class="increase">ri-volume-up-line</cv-icon>
    </cv-slider>

Der Wertebereich wird über die Attribute ``min`` und ``max`` begrenzt. Über ``step-width`` kann man festlegen,
wie viel sich der Wert erhöht/reduziert wenn man den Slider bedient.
Die Anzeige des Werts als Text über dem Slider kann mit ``hide-value="true"`` abgeschaltet und per ``format``-Attribut
:ref:`formatiert <format>` werden.

Damit während der Bedienung nicht jede Wert-Änderung direkt ans Backend geschickt wird und diese ggf. damit überlastet
 wird, kann man mit ``throttle-interval`` die Zeit in Millisekunden festlegen, die zwischen zwei Wert-Änderungen mindestens vergeht.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-slider tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-slider tile
