.. _tile-component-chart:

Chart
=====

.. api-doc:: cv.ui.structure.tile.components.Chart


Beschreibung
------------

Das Chart-Element ermöglicht die Visualisierung von historischen Werten als Diagramm.
Dazu muss das Chart-Element mindestens ein ``<dataset>`` Kind-Element enthalten.
Für jedes ``<dataset>`` wird in dem Chart z.B. eine Linie eingezeichnet.

.. code:: xml

    <cv-tile size="2x1">
        <cv-chart title="Wohnzimmer" y-format="%.1f °C" series="day" refresh="300" colspan="3" rowspan="2">
            <dataset type="line" src="Temperature_FF_Living" />
        </cv-chart>
    </cv-tile>


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-chart tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-chart tile

