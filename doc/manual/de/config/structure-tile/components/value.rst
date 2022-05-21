.. _tile-component-value:

Value
======

.. api-doc:: cv.ui.structure.tile.components.Value


Beschreibung
------------

Die Value-Komponente stellt einen Wert dar. Sie ist eine rein passive Komponente und sendet selbst keine Werte zum Backend.
Für die Darstellung der Werte stehen unterschiedliche Arten zur Verfügung, von einfachem Text über Icons
bis hin zu Fortschrittsbalken.

Text
^^^^

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile">
        <screenshot name="cv-value-label" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value secondary"/>
    </cv-value>

Icon
^^^^

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile">
        <screenshot name="cv-value-icon-off" margin="10 10 -30 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-icon-on" margin="10 10 -30 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-value mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="read">1/4/2</cv-address>
        <cv-icon class="value"/>
    </cv-value>

Fortschrittsbalken
^^^^^^^^^^^^^^^^^^


.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile" wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value>
        <cv-address transform="DPT:5.001" mode="readwrite">1/4/2</cv-address>
        <meter class="value" min="0" max="100"/>
    </cv-value>


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-value tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-value tile
