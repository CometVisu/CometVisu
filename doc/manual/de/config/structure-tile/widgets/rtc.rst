.. _tile-rtc:

Das RTC Widget
==============

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Mit dem RTC-Widget lässt sich eine Raumtemperatur-Regler steuern. Das Widget zeigt die aktuell eingestellte Soll-Temperatur
und bietet die Möglichkeit diese zu ändern, ebenso kann mit dem Widget der Betriebsmodus des Reglers verändert werden
(Normal, Eco, Aus, usw.).
Für die Soll-Temperatur kommt ein :ref:`Spinner <tile-component-spinner>` zum Einsatz und für den Modus ein
:ref:`Select <tile-component-select>`.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-rtc">
            <data address="1/4/0">comfort</data>
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-rtc>
        <cv-address slot="hvacAddress" transform="DPT:20.102">1/4/0</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:9.001">1/4/1</cv-address>
        <span slot="label">Wohnzimmer</span>
    </cv-rtc>

Das Widget benötigt jeweils eine Adresse für die Soll-Temperatur ``slot="temperatureAddress"`` und eine für den Modus
``slot="hvacAddress"``. Eine optionale Beschriftung kann durch ``<span slot="label">Wohnzimmer</span>`` angegeben werden.

Wenn man die Einstellungsmöglichkeit der Soll-Temperatur nur anzeigen möchte, wenn der Regler im Normalbetrieb läuft,
so kann man eine zusätzliche ``temperatureAddress`` mit dem Target ``show-hide`` und einem speziellen :ref:`Mapping <tile-element-mapping>`
angeben.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-rtc-notemp">
            <data address="1/4/0">economy</data>
            <data address="1/4/1">21.5</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="RtcOn" type="boolean">
            <entry value="comfort">true</entry>
            <entry value="economy">false</entry>
            <entry value="building Protection">false</entry>
            <entry value="stondby">false</entry>
        </cv-mapping>
    </cv-meta>
    <cv-rtc>
        <cv-address slot="hvacAddress" transform="DPT:20.102">1/4/0</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:9.001">1/4/1</cv-address>
        <cv-address slot="temperatureAddress" transform="DPT:20.102" mode="read" target="show-hide" mapping="RtcOn">1/4/0</cv-address>
        <span slot="label">Wohnzimmer</span>
    </cv-rtc>

Der Spinner der Soll-Temperatur kann noch feinjustiert wenden indem man die Attribute `m̀in``, ``max``, ``step-width`` und
``format`` angibt. So kann z.B. das Widget auf Fahrenheit umgestellt werden mit: ``<cv-rtc min="0" max="100" format="%d ′F">``.


Erlaubte Attribute im RTC-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-rtc tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-rtc tile
