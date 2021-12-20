.. _tile-switch:

Das Switch Widget
=================

.. api-doc:: TileSwitch

Beschreibung
------------

Das Switch Widget fügt der Visualisierung eine Schaltfläche hinzu. Mit
dieser können z.B. Ein/Aus Schalter realisiert werden. Das Verhalten des Schalters kann über den Modus der
hinzugefügten Adressen gesteuert werden. Das normale Verhalten beinhaltet einen Wechsel zwischen 2 Zuständen (an / aus).
Ein Klick auf den Schalter löst einen Wechsel zwischen diesen Zuständen aus, es wird also immer der Wert gesendet,
der gerade nicht aktiv ist.

Das Switch-Widget besteht aus einem zentrierten Button mit optionalen Titel und Untertitel darunter.

Der Schalter kann sich aber auch wie ein Trigger verhalten, d.h. er wechselt nicht zwischen Zuständen sondern
beim Klick auf den Schalter wird immer der selbe Wert gesendet.

Als dritte Variante kann sich der Schalter wie ein Taster verhalten und unterschiedliche Werte beim Drücken und beim
Loslassen schicken. Anwendungsbeispiel für dieses Verhalten wäre z.B. ein Türöffner: Beim Klicken des Buttons wird
der Türöffner eingeschaltet und beim Loslassen des Buttons wird der Türöffner wieder ausgeschaltet.

Schalter
--------

Für den Schalter-Modus muss das Switch-Widget den aktuellen Zustand lesen und schreiben können, daher
wird eine schreibende und eine lesende Adresse benötigt (kann auch die selbe sein).
Bei jeden Klick wird zwischen den beiden Zuständen (an / aus) umgeschaltet.

.. widget-example::

        <settings design="tile">
            <screenshot name="cv-switch-off" margin="0 10 10 0">
                <data address="1/4/0">0</data>
            </screenshot>
            <screenshot name="cv-switch-on" margin="0 10 10 0">
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <cv-meta>
            <cv-mapping name="light">
                <entry value="1">ri-lightbulb-fill</entry>
                <entry value="0">ri-lightbulb-line</entry>
            </cv-mapping>
            <cv-styling name="button">
                <entry value="1">active</entry>
                <entry value="0">inactive</entry>
            </cv-styling>
        </cv-meta>
        <cv-switch mapping="light" styling="button">
            <cv-address slot="address" transform="DPT:1.001">1/4/0</cv-address>
            <span slot="primaryLabel">Schalter</span>
            <span slot="secondaryLabel">Ein/Aus</span>
        </cv-switch>



Trigger
-------

Ein Trigger sendet immer den gleichen Wert zum Backend. Er muss daher den aktuellen Zustand nicht kennen und
benötigt daher nur eine schreibende Adresse mit einem fixen Wert ``mode="write" value="1"``.
Dieser Wert wird auch für das Mapping / Styling benutzt, sofern angegeben.

.. widget-example::

            <settings design="tile">
                <screenshot name="cv-trigger" margin="0 10 10 0">
                </screenshot>
            </settings>
            <cv-meta>
                <cv-mapping name="light">
                    <entry value="1">ri-lightbulb-fill</entry>
                    <entry value="0">ri-lightbulb-line</entry>
                </cv-mapping>
                <cv-styling name="button">
                    <entry value="1">active</entry>
                    <entry value="0">inactive</entry>
                </cv-styling>
            </cv-meta>
            <cv-switch mapping="light" styling="button">
                <cv-address slot="address" transform="DPT:1.001" mode="write" value="1">1/4/0</cv-address>
                <span slot="primaryLabel">Trigger</span>
                <span slot="secondaryLabel">Sendet immer 1</span>
            </cv-switch>


Taster
------

Ein Taster sendet unterschiedliche Werte beim Drücken und Loslassen des Buttons. Dazu benötigt man jeweils eine
Adresse für jedes dieser Events (up bzw. down). Über das ``on`` Attribut einer Adresse kann man festlegen, bei welchem Event
der Wert des `value`-Attributs gesendet wird. Eine <cv-address> mit ``mode="write" value="1" on="down"`` schickt also
den Wert ``1`` beim Drücken des Buttons an das Backend und eine <cv-address> mit ``mode="write" value="0" on="up"`` schickt
den Wert ``0`` beim Loslassen des Buttons.

.. widget-example::

            <settings design="tile">
                <screenshot name="cv-pushbutton" margin="0 10 10 0">
                </screenshot>
            </settings>
            <cv-meta>
                <cv-mapping name="light">
                    <entry value="1">ri-lightbulb-fill</entry>
                    <entry value="0">ri-lightbulb-line</entry>
                </cv-mapping>
                <cv-styling name="button">
                    <entry value="1">active</entry>
                    <entry value="0">inactive</entry>
                </cv-styling>
            </cv-meta>
            <cv-switch mapping="light" styling="button">
                <cv-address slot="address" transform="DPT:1.001" mode="write" value="1" on="down">1/4/0</cv-address>
                <cv-address slot="address" transform="DPT:1.001" mode="write" value="0" on="up">1/4/0</cv-address>
                <cv-address slot="address" transform="DPT:1.001" mode="read">1/4/0</cv-address>
                <span slot="primaryLabel">Taster</span>
            </cv-switch>

Erlaubte Attribute im Switch-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-switch tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-switch tile
