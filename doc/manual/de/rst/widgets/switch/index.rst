.. raw:: mediawiki

   {{TOCright}}

Beschreibung
------------

Das Switch Widget fügt der Visualisierung eine Schaltfläche hinzu. Mit
dieser können z.B. Ein/Aus Schalter realisiert werden.

.. widget_example::
    :hide-source: true

        <meta>
            <screenshot name="switch">
                <caption>Einfacher Switch</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <switch on_value="1" off_value="0">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Es kann über ein `Mapping <CometVisu/0.8.x/mapping/de>`__ eine Ersetzung
der 0/1 im Switch durch Texte oder Symbole vorgenommen werden (z.B.
An/Aus statt 0/1 oder Icons für Fensterkontakte, Alarme, Lampen etc.).
Zur CometVisu gehört die umfangreiche Sammlung an Icons für die
verschiedensten Zwecke. Weitere Informationen findet man auf der
Dokumentations-Seite für das `Mapping <CometVisu/0.8.x/mapping/de>`__.

.. widget_example::
    :hide-source: true

        <meta>
            <screenshot name="switch_mapping">
                <caption>Einfacher Switch</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <cv-meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Aus</entry>
                    <entry value="1">An</entry>
                </mapping>
            </mappings>
        </cv-meta>
        <switch on_value="1" off_value="0" mapping="OnOff">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

und/oder über ein `Styling <CometVisu/0.8.x/styling/de>`__ Farben
gesetzt werden (z.B. An in rot und Aus in Grün)

.. widget_example::
    :hide-source: true

        <meta>
            <screenshot name="switch_styling">
                <caption>Einfacher Switch</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <cv-meta>
            <stylings>
                <styling name="RedGreen">
                    <entry value="1">red</entry>
                    <entry value="0">green</entry>
                </styling>
            </stylings>
        </cv-meta>
        <switch on_value="1" off_value="0" styling="RedGreen">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Natürlich kann man auch beides gleichzeitig nutzen:

.. widget_example::
    :hide-source: true

    <meta>
        <screenshot name="switch_mapping_styling">
            <data address="1/4/0">0</data>
        </screenshot>
    </meta>
    <cv-meta>
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
    </cv-meta>
    <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen">
        <label>Kanal 1</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </switch>

Parameter
---------

.. parameter_information:: switch


Parameter im Editor
-------------------

.. widget_example::
    :editor: elements
    :scale: 75

        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

.. widget_example::
    :editor: attributes
    :scale: 75

        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>


Erlaubte Elemente
-----------------

.. elements_information:: switch

+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Parameter                     | Werte                                               | Beschreibung                                                                                                                                                                                                                                                                                                |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **label**                     | Text                                                | Hier wird der Name und ggf. ein Icon eingetragen. Dies erscheint links neben dem Switch. Beispielsweise: **Spot Fernseher**                                                                                                                                                                                 |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **address**                   | KNX Gruppenaddresse                                 | Hier werden die Gruppenadressen für Schalten, sowie optional für Rückmeldungen eingetragen.                                                                                                                                                                                                                 |
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

Parameter im Editor
-------------------

+-------------------------------+---------------------------------------------+
| .. figure:: switch1_080.jpg   | .. figure:: switch2_080.jpg                 |
|    :alt: screenshot: menu     |    :alt: screenshot: optionen des Widgets   |
|                               |                                             |
|    screenshot: menu           |    screenshot: optionen des Widgets         |
+-------------------------------+---------------------------------------------+
| .. figure:: switch3_080.jpg   | .. figure:: switch4_080.jpg                 |
|    :alt: screenshot: menu     |    :alt: screenshot: optionen des Widgets   |
|                               |                                             |
|    screenshot: menu           |    screenshot: optionen des Widgets         |
+-------------------------------+---------------------------------------------+

XML Syntax minimal
------------------

Alternativ kann man für das switch Widget auch von Hand einen Eintrag in
der `visu\_config.xml <CometVisu/XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das switch Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <meta>
            <screenshot name="switch_simple">
                <caption>Einfacher Switch</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <switch on_value="1" off_value="0">
          <label>Kanal 1</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das switch Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <meta>
            <screenshot name="switch_complete">
                <caption>Switch mit mapping + styling</caption>
                <data address="1/4/0">1</data>
            </screenshot>
        </meta>
        <cv-meta>
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
        </cv-meta>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>
