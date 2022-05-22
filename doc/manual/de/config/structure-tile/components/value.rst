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

Die einfachste Variante ist es den Wert einfach als Text anzuzeigen.

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

Über das ``format``-Attribut kann der Wert :ref:`formatiert <format>` werden. Die Textfarbe kann über einen
zusätzlichen Eintrag in das ``class``-Attribut des ``<label>``-Elements beeinflusst werden. Es stehen hier
eine Primäre und eine Sekundäre Textfarbe zur Verfügung. Um welche Farben es sich dabei konkret handelt ist
abhängig vom jeweiligen Design. In dem Beispiel oben wurde die sekundäre Textfarbe verwendet ``class="secondary"``.

.. HINT::

    Der ``value``-Eintrag im ``class``-Attribut des ``<label>``-Elements ist zwingend erforderlich, da hierüber
    der Value-Komponente mitgeteilt wird wo der Wert hineingeschrieben werden soll. Fehlt dieser Eintrag wird
    kein Wert angezeigt.

Um die Primärfarbe zu nutzen muss das label folgendermaßen aussehen.

.. code:: xml

    <label class="value primary"/>

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-value" wrap-in="cv-tile">
        <screenshot name="cv-value-label-primary" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value primary"/>
    </cv-value>

Zusätzlich kann man die Text-Größe einstellen, ebenfalls über einen zusätzlichen Eintrag in das ``class``-Attribut.
Es stehen folgende Möglichkeiten zur Verfügung: ``medium`` und ``large``. Wobei medium kleiner als die Standarggröße ist
und large größer.

.. code:: xml

    <label class="value large"/>


.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-value" wrap-in="cv-tile">
        <screenshot name="cv-value-label-large" margin="10 10 0 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value large"/>
    </cv-value>

Icon
^^^^

Wird ein ``cv-icon`` als ``class="value"`` benutzt, kann das Icon über ein Mapping und dessen Farbe über Styling
wert abhängig beeinflusst werden.

.. HINT::

    Hier darf das ``cv-value`-Element kein ``format`` benutzen, da sonst das Mapping und das Styling nicht mehr
    funktionieren würden.

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

Um einen Fortschritt anzuzeigen gibt es zwei Darstellungsmöglichkeiten: einen horizontalen Fortschrittsbalken oder
eine runden oder halb-runden Fortschrittsbalken.

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile" wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
            <caption>horizontaler Fortschrittsbalken</caption>
        </screenshot>
    </settings>
    <cv-value>
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <meter class="value" min="0" max="100"/>
    </cv-value>



.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile" wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress-round" margin="10 10 10 10">
            <data address="1/4/2">75</data>
            <caption>runder Fortschrittsbalken</caption>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-round-progress class="value"/>
    </cv-value>



.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-tile" wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress-semi-round" margin="10 10 10 10">
            <data address="1/4/2">75</data>
            <caption>halb-runder Fortschrittsbalken</caption>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-round-progress class="value" type="semiCircle"/>
    </cv-value>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-value tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-value tile
