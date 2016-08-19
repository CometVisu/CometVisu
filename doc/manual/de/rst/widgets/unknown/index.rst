Das Unknown Widget
==================

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen


Parameter
---------

.. parameter_information:: unknown


Parameter im Editor
-------------------

.. widget_example::
    :editor: attributes
    :scale: 75

        <unknown>
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </unknown>


Elemente
--------

.. elements_information:: unknown

Elemente im Editor
------------------

.. widget_example::
    :editor: elements
    :scale: 75

        <unknown>
          <layout colspan="4" />
          <label>Unknown</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </unknown>

XML Syntax minimal
------------------

Alternativ kann man für das Unknown Widget auch von Hand einen Eintrag in
der `visu\_config.xml <../XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Unknown Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <meta>
            <screenshot name="unknown_simple">
                <caption>Unknown, einfaches Beispiel</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <unknown>
          <label>Unknown</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </unknown>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das Unknown Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <meta>
            <screenshot name="unknown_complete">
                <caption>Unknown mit mapping + styling</caption>
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
        <unknown mapping="OnOff" styling="RedGreen">
          <label>Unknown</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </unknown>
