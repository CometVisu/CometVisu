.. _tile-component-button:

Button
======

.. api-doc:: cv.ui.structure.tile.components.Button


Beschreibung
------------

.. widget-example::

    <settings design="tile" selector="cv-button" wrap-in="cv-tile">
        <screenshot name="cv-button-off" margin="10 10 10 10">
            <data address="1/4/2">0</data>
            <caption>Ausgeschaltet</caption>
        </screenshot>
        <screenshot name="cv-button-on" margin="10 10 10 10">
            <data address="1/4/2">1</data>
            <caption>Eingeschaltet</caption>
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
    <cv-button class="round-button" mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-button tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-button tile
