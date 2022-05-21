.. _tile-info:

Das Info Widget
===============

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Info-Widget stellt einen Wert mit optionaler Einheit und einem erklärendem zusätzlichen Text dar.
Es kann z.B. genutzt werden um Temperaturen oder Verbrauchswerte darzustellen.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info" margin="0 10 10 0">
            <data address="1/4/2">21.5</data>
        </screenshot>
    </settings>
    <cv-info format="%.2f">
        <cv-address slot="address" mode="read" transform="DPT:9.001">1/4/2</cv-address>
        <span slot="label">Wohnzimmer</span>
        <span slot="unit">°C</span>
    </cv-info>

Es muss ein ``<cv-address slot="address">`` angegeben werden über den der anzuzeigende Wert übermittelt wird.
Zusätzlich kann eine Einheit für den Werte mit ``<span slot="unit">`` angegeben werden und eine Beschriftung
über ``<span slot="label">``. Über das ``format``-Attribut kann der Wert :ref:`formatiert <format>` werden.

Es ist also auch möglich die Einheit über die Formatierung mit anzugeben, dann steht sie neben dem Wert und nicht
darunter.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info-format" margin="0 10 10 0">
            <data address="1/4/2">21.5</data>
        </screenshot>
    </settings>
    <cv-info format="%.1f°C">
        <cv-address slot="address" mode="read" transform="DPT:9.001">1/4/2</cv-address>
        <span slot="label">Wohnzimmer</span>
    </cv-info>


Erlaubte Attribute im Info-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-info tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-info tile
