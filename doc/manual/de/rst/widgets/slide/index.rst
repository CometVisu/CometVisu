Das Slide Widget
================

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen


Parameter
---------

.. parameter_information:: slide


Parameter im Editor
-------------------

.. widget_example::
    :editor: attributes
    :scale: 75

        <slide>
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </slide>


Elemente
--------

.. elements_information:: slide

Elemente im Editor
------------------

.. widget_example::
    :editor: elements
    :scale: 75

        <slide>
          <layout colspan="4" />
          <label>Slide</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </slide>

XML Syntax minimal
------------------

Alternativ kann man für das Slide Widget auch von Hand einen Eintrag in
der `visu\_config.xml <../XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Slide Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <meta>
            <screenshot name="slide_simple">
                <caption>Slide, einfaches Beispiel</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <slide>
          <label>Slide</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </slide>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das Slide Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <meta>
            <screenshot name="slide_complete">
                <caption>Slide mit mapping + styling</caption>
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
        <slide mapping="OnOff" styling="RedGreen">
          <label>Slide</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </slide>
