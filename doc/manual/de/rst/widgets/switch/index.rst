.. raw:: mediawiki

   {{TOCright}}

Beschreibung
------------

Das Switch Widget fügt der Visualisierung eine Schaltfläche hinzu. Mit
dieser können z.B. Ein/Aus Schalter realisiert werden.

.. figure:: switch-basic.png
   :alt: Beispiel xxx widget

   Beispiel xxx widget

Es kann über ein `Mapping <CometVisu/0.8.x/mapping/de>`__ eine Ersetzung
der 0/1 im Switch durch Texte oder Symbole vorgenommen werden (z.B.
An/Aus statt 0/1 oder Icons für Fensterkontakte, Alarme, Lampen etc.).
Zur CometVisu gehört die umfangreiche Sammlung an Icons für die
verschiedensten Zwecke. Weitere Informationen findet man auf der
Dokumentations-Seite für das `Mapping <CometVisu/0.8.x/mapping/de>`__.

.. figure:: switch-mapping.png
   :alt: Beispiel xxx widget mit Mapping in Icons

   Beispiel xxx widget mit Mapping in Icons

und/oder über ein `Styling <CometVisu/0.8.x/styling/de>`__ Farben
gesetzt werden (z.B. An in rot und Aus in Grün)

.. figure:: switch-styling.png
   :alt: Beispiel Switch widget mit Styling

   Beispiel Switch widget mit Styling

Natürlich kann man auch beides gleichzeitig nutzen:

.. figure:: switch-mapping-und-styling.png
   :alt: Beispiel switch widget mit Styling und Mapping

   Beispiel switch widget mit Styling und Mapping

Parameter
---------

+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Parameter                     | Werte                                               | Beschreibung                                                                                                                                                                                                                                                                                                |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **label**                     | Text                                                | Hier wird der Name und ggf. ein Icon eingetragen. Dies erscheint links neben dem Switch. Beispielsweise: **Spot Fernseher**                                                                                                                                                                                 |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **address**                   | KNX Gruppenaddresse mit Parametern                  | Hier werden die Gruppenadressen für Schalten, sowie optional für Rückmeldungen eingetragen.                                                                                                                                                                                                                 |
|                               |                                                     |                                                                                                                                                                                                                                                                                                             |
|                               |                                                     | Typisch sind mindestens zwei Gruppenaddressen nötig. Eine **readwrite** GA für das eigentliche Schalten sowie eine **read** GA für das dazu gehörige Rückmelde/Statusobjekt.                                                                                                                                |
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
| **on\_value**                 | **1** oder **0**                                    | Hier wird der Wert eingetragen, der beim Einschalten gesendet werden soll.                                                                                                                                                                                                                                  |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **off\_value**                | **0** oder **1**                                    | Hier wird der Wert eingetragen, der beim Ausschalten gesendet werden soll.                                                                                                                                                                                                                                  |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **mapping**                   | Name des `Mapping <CometVisu/0.8.x/mapping/de>`__   | Mit mapping wird die Anzeige der Schaltfläche beeinflusst. z.B. **0/1** wird als **Aus/An** angezeigt. Es können auch Icons auf der Schaltfläche angezeigt werden (die Farbe der Icons wird vom mapping bestimmt)                                                                                           |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **styling**                   | Name des `Styling <CometVisu/0.8.x/styling/de>`__   | Mit styling wird die Farbe der Schaltfläche beeinflusst. Z.B. **Aus** wird **rot** und **An** wird **grün** angezeigt.                                                                                                                                                                                      |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **align**                     | **left**, **center** und **right**                  | Mit align kann die Ausrichtung des Textes innerhalb der Schaltfläche beeinflusst werden.                                                                                                                                                                                                                    |
+-------------------------------+-----------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **bind\_click\_to\_widget**   | **true** oder **false**                             | Mit dieser Option wird festgelegt ob die gesammte Fläche des Widgets zum schalten verwendet werden kann oder nur der Button. Visuell gibt es keinen Unterschied.                                                                                                                                            |
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

Alternativ kann man für das XXX Widget auch von Hand einen Eintrag in
der `visu\_config.xml <CometVisu/XML-Elemente>`__ hinzufügen.

**WICHTIG: In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!**

Hier der minimale Beispielcode der das XXX Widget mit den oben gezeigten
Eigenschaften einfügt:

.. code:: xml

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

Hier der Beispielcode der das XXX Widget mit den allen oben gezeigten
Eigenschaften einfügt:

.. code:: xml

        <switch on_value="1" off_value="0" mapping="On_Off" styling="Green_Red" bind_click_to_widget="true">
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

Beispiele
---------
