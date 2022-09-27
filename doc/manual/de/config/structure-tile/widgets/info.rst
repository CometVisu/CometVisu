.. _tile-info:

Das Info Widget
===============

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Info-Widget stellt einen Wert mit optionaler Einheit und einem erklärendem zusätzlichen Text dar.
Es kann z.B. genutzt werden um Temperaturen oder Verbrauchswerte darzustellen.
Für die Darstellung des Werts wird ein :ref:`Value <tile-component-value>` genutzt.


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

Es ist natürlich auch mögliche eine der anderen Darstellungsformen der :ref:`Value <tile-component-value>`
zu benutzen. Um Zahlen darzustellen bietet sich z.B. ein Fortschrittsbalken an.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-info-progress" margin="0 10 10 0">
            <data address="1/4/2">66</data>
        </screenshot>
    </settings>
    <cv-info format="%d%%">
        <cv-address slot="address" mode="read" transform="DPT:5.001">1/4/2</cv-address>
        <cv-round-progress slot="value-component" type="semiCircle"/>
        <span slot="label">Lautstärke</span>
    </cv-info>

Oder ein :ref:`Icon <tile-component-icon>` um z.B. den Fensterstatus darzustellen.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-info-icon-closed" margin="0 10 10 0">
            <data address="1/4/2">0</data>
            <caption>Fenster geschlossen</caption>
        </screenshot>
        <screenshot name="cv-info-icon-opened" margin="0 10 10 0">
            <data address="1/4/2">1</data>
            <caption>Fenster geöffnet</caption>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="WindowOpen">
            <entry value="0">knxuf-fts_window_1w</entry>
            <entry value="1">knxuf-fts_window_1w_open</entry>
        </cv-mapping>
        <cv-styling name="WindowOpen">
            <entry value="0">green</entry>
            <entry value="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-info mapping="WindowOpen" styling="WindowOpen">
        <cv-address slot="address" mode="read" transform="DPT:1.001">1/4/2</cv-address>
        <cv-icon slot="value-component" size="xxx-large"/>
        <span slot="label">Fenster WZ</span>
    </cv-info>


Erlaubte Attribute im Info-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-info tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-info tile
