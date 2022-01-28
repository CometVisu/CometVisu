.. replaces:: CometVisu/0.8.x/widgets/switch/de/
    CometVisu/0.8.0/switch/de
    CometVisu/Widget/switch/de
    CometVisu/switch
    CometVisu/switch_(Deutsch)

.. _switch:

Das Switch Widget
=================

.. api-doc:: Switch

Beschreibung
------------

Das Switch Widget fügt der Visualisierung eine Schaltfläche hinzu. Mit
dieser können z.B. Ein/Aus Schalter realisiert werden.


.. uml::
    :align: center

    title Switch
    state An
    state Aus
    An --> Aus : sende off_value bei Klick
    Aus --> An : sende on_value bei Klick

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch">
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <switch on_value="1" off_value="0">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Es kann über ein :ref:`Mapping <mapping>` eine Ersetzung
der 0/1 im Switch durch Texte oder Symbole vorgenommen werden (z.B.
An/Aus statt 0/1 oder Icons für Fensterkontakte, Alarme, Lampen etc.).
Zur CometVisu gehört die umfangreiche Sammlung an Icons für die
verschiedensten Zwecke. Weitere Informationen findet man auf der
Dokumentations-Seite für das :ref:`Mapping <mapping>`.

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch_mapping">
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Aus</entry>
                    <entry value="1">An</entry>
                </mapping>
            </mappings>
        </meta>
        <switch on_value="1" off_value="0" mapping="OnOff">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

und/oder über ein :ref:`Styling <styling>` Farben
gesetzt werden (z.B. An in rot und Aus in Grün)

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="switch_styling">
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <meta>
            <stylings>
                <styling name="RedGreen">
                    <entry value="0">red</entry>
                    <entry value="1">green</entry>
                </styling>
            </stylings>
        </meta>
        <switch on_value="1" off_value="0" styling="RedGreen">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Natürlich kann man auch beides gleichzeitig nutzen:

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="switch_mapping_styling">
            <data address="1/4/0">1</data>
        </screenshot>
    </settings>
    <meta>
        <mappings>
            <mapping name="OnOff">
                <entry value="0">Aus</entry>
                <entry value="1">An</entry>
            </mapping>
        </mappings>
        <stylings>
            <styling name="RedGreen">
                <entry value="0">red</entry>
                <entry value="1">green</entry>
            </styling>
        </stylings>
    </meta>
    <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen">
        <label>Kanal 1</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </switch>

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Switch-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente des Switch-Widgets. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Switch-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: switch

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: switch

..  +-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Parameter                     | Werte                                               | Beschreibung                                                                                                                                                                                                                                                                                                |
    +-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | **label**                     | Text                                                | Hier wird der Name und ggf. ein Icon eingetragen. Dies erscheint links neben dem Switch. Beispielsweise: **Spot Fernseher**                                                                                                                                                                                 |
    +-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | **address**                   | KNX Gruppenadresse                                 | Hier werden die Gruppenadressen für Schalten, sowie optional für Rückmeldungen eingetragen.                                                                                                                                                                                                                 |
    |                               |                                                     |                                                                                                                                                                                                                                                                                                             |
    |                               | mit Parametern                                      | Typisch sind mindestens zwei Gruppenaddressen nötig. Eine **readwrite** GA für das eigentliche Schalten sowie eine **read** GA für das dazu gehörige Rückmelde/Statusobjekt.                                                                                                                                |
    |                               |                                                     |                                                                                                                                                                                                                                                                                                             |
    |                               |                                                     | Diese werden folgendermassen eingerichtet:                                                                                                                                                                                                                                                                  |
    |                               |                                                     |                                                                                                                                                                                                                                                                                                             |
    |                               |                                                     | -  Klicken sie auf das Pluszeichen über der Adressliste.                                                                                                                                                                                                                                                    |
    |                               |                                                     | -  Klicken sie in das eingefügte aber noch leere Feld.                                                                                                                                                                                                                                                      |
    |                               |                                                     | -  Wenn die Gruppenadresse für die Schaltfunktion im Wiregate importiert wurden, können sie die entsprechende Adresse aus dem Auswahlmenue auswählen. Anderenfalls müssen sie den Haken hinter dem Adressfeld entfernen und die Adresse manuell nach dem Format **x/y/z** also z.B. **1/2/59** eintragen.   |
    |                               |                                                     | -  Beim Auswählen einer importierten Gruppenadresse erscheint ggf. auch der richtige Datenpunkttyp unter Transforms. Anderenfalls muss dort von Hand der DPT 1.001 "Switch" ausgewählt werden.                                                                                                              |
    |                               |                                                     | -  Unter Variant muss nichts eingegeben werden.                                                                                                                                                                                                                                                             |
    |                               |                                                     | -  Danach einmal auf save klicken.                                                                                                                                                                                                                                                                          |
    |                               |                                                     |                                                                                                                                                                                                                                                                                                             |
    |                               |                                                     | Wenn die Rückmeldung über eine zusätzliche oder separate Gruppenadresse erfolgt, müssen die oben genannten Schritte für jede Rückmeldung widerholt werden. Dabei einfach zusätzlich noch den Haken bei **readonly** setzen.                                                                                 |
    +-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

XML Syntax minimal
------------------

Alternativ kann man für das switch Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das switch Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="switch_simple">
                <caption>Einfacher Switch</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <switch on_value="1" off_value="0">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeadresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das switch Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget-example::

        <settings>
            <screenshot name="switch_complete">
                <caption>Switch mit mapping + styling</caption>
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Aus</entry>
                    <entry value="1">An</entry>
                </mapping>
            </mappings>
            <stylings>
                <styling name="RedGreen">
                    <entry value="1">red</entry>
                    <entry value="0">green</entry>
                </styling>
            </stylings>
        </meta>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
