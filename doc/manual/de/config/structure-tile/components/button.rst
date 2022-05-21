.. _tile-component-button:

Button
======

.. api-doc:: cv.ui.structure.tile.components.Button


Beschreibung
------------

Der Button unterstützt unterschiedliche Betriebsmodi, die im folgenden beschrieben werden.

Schalter
^^^^^^^^

Ein Schalter-Button erlaubt das Senden und Darstellen eines Zustands. Das einfachste Beispiel hierfür ist ein An/Aus-Schalter.
Der Button zeigt den aktuellen Zustand an und wechselt beim Klicken zwischen den beiden möglichen Zuständen.

.. widget-example::

    <settings design="tile" selector="cv-button" wrap-in="cv-tile" wrapper-class="screenshots">
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
    <cv-button mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>

Um die Darstellung des aktuellen Zustands zu verbessern wird in dem Beispiel ein "mapping" verwendet, welches
bewirkt das je nach Zustand ein anderes Icon benutzt wird. Zusätzlich wird über ein "styling" noch die Farbe des
Icons und der Umrandung des Buttons je nach Zustand unterschiedlich gesetzt.


Trigger
^^^^^^^

Ein Trigger-Button sendet dann beim Klicken immer einen festen Wert an das Backend. Hier ist der gesendete Wert also
nicht wie beim Schalter abhängig vom aktuellen Zustand, sondern es wird immer ein und der selbe Wert gesendet.
Eingestellt wird dieser Modus indem der zu sendende feste Wert in dem <cv-address>-Element angeben wird:

.. code-block:: xml

    <cv-address transform="DPT:1.001" mode="readwrite" value="1">1/4/2</cv-address>


Taster
^^^^^^^

Ein Taster-Button sendet einen Wert beim Drücken des Buttons und beim Loslassen des Buttons einen anderen.
Im Trigger- und Schalter-Modus wird nur ein Wert beim Loslassen des Buttons gesendet (einfacher Klick).
Auch dieser Modus wird über das <cv-address>-Element aktiviert. Genauer gesagt benötigt man hier zwei Adressen:

.. code-block:: xml

    <cv-address transform="DPT:1.001" mode="readwrite" value="1" on="down">1/4/2</cv-address>
    <cv-address transform="DPT:1.001" mode="readwrite" value="0" on="up">1/4/2</cv-address>

Hier wird als beim Drücken (``on="down"``) der Wert ``1`` an ``1/4/2`` gesendet und beim Loslassen (``on="up"``) der Wert ``0``.


Weitere Eigenschaften
^^^^^^^^^^^^^^^^^^^^^

Runder Button
+++++++++++++

Als zusätzliche Option kann der Button als Kreis dargestellt werden, dazu muss lediglich dem <cv-button>-Element
ein ``class="round-button"`` hinzugefügt werden.

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-button" wrap-in="cv-tile" wrapper-class="screenshots">
        <screenshot name="cv-button-round-off" margin="10 10 10 10">
            <data address="1/4/2">0</data>
            <caption>Ausgeschaltet</caption>
        </screenshot>
        <screenshot name="cv-button-round-on" margin="10 10 10 10">
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

.. code-block:: xml

    <cv-button class="round-button" mapping="light" styling="button">


Fortschrittsanzeige
+++++++++++++++++++

Der Rand des Buttons kann auch genutzt werden um einen Prozentwert darzustellen. So kann man z.B. den Fortschritt
eines gerade spielenden Liedes, eine Lautstärke oder den Helligkeitswert eines Dimmers darstellen.

.. HINT::

    Damit der Rand des Buttons und der Fortschrittsbalken übereinander liegen sollte hier immer der runde
    Button verwendet werden.

.. widget-example::

    <settings design="tile" selector="cv-button" wrap-in="cv-tile">
        <screenshot name="cv-button-progress" margin="10 10 10 10">
            <data address="1/4/1">75</data>
            <data address="1/4/2">1</data>
            <caption>75% Helligkeit </caption>
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
        <cv-address transform="DPT:5.001" mode="read" target="progress">1/4/1</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>


Zusätzliche Beschriftung
++++++++++++++++++++++++

Optional kann der Button über ein ``text``-Attribut eine zusätzliche Beschriftung erhalten.

.. code-block:: xml

    <cv-button class="round-button" mapping="light" styling="button" text="Licht">

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-button" wrap-in="cv-tile">
        <screenshot name="cv-button-text" margin="10 10 24 10">
            <data address="1/4/1">75</data>
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
    <cv-button class="round-button" mapping="light" styling="button" text="Licht">
        <cv-address transform="DPT:1.001" mode="readwrite">1/4/2</cv-address>
        <cv-icon class="value">ri-question-mark</cv-icon>
    </cv-button>


Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-button tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-button tile
