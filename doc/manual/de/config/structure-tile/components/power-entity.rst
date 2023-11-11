.. _tile-component-power-entity:

Power entity
============

.. api-doc:: cv.ui.structure.tile.components.energy.PowerEntity

.. toctree::
    :hidden:

    SVG round value <svg-round-value>

Beschreibung
------------

Mit der ``<cv-power-entity>``-Komponente lässt sich die elektrische Leistung
eines bestimmten Geräts anzeigen. Es besteht aus einem Icon, einem Wert in der Einheit Watt und
einem farblichen Kreis um beide, der optional auch einen Fortschrittsbalken enthalten kann (z.B.
im den Ladestand einer Batterie anzuzeigen).

Das Power-Entity ist jedoch nur ein :ref:`Svg round value<tile-component-svg-round-value-entity>` mit
vordefiniertem Farbschema, Icon und speziellem Mapping für den Wert. Diese Vereinstllungen
sind an das ``type``-Attribut gebunden.

Es existieren folgende Typen von Power entity Typen:

* pv (Photovoltaik Wechselrichter)
* battery (Batteriespeicher)
* grid (Hauptzähler)
* consumer (Verbraucherzähler)
* charger (Wallbox)
* heatpump (Wärmepumpe)
* house (Hausnetz)

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-power-entity tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-power-entity tile
