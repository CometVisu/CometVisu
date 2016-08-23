Das DesignToggle Widget
=======================

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen, vorhandene Beispiele korrigieren, vervollständigen


Parameter
---------

.. parameter_information:: designtoggle

.. widget_example::
    :editor: attributes
    :scale: 75

        <caption>Parameter im Editor</caption>
        <designtoggle>
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </designtoggle>


Elemente
--------

.. elements_information:: designtoggle

.. widget_example::
    :editor: elements
    :scale: 75

        <caption>Elemente im Editor</caption>
        <designtoggle>
          <layout colspan="4" />
          <label>DesignToggle</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </designtoggle>

XML Syntax minimal
------------------

Alternativ kann man für das DesignToggle Widget auch von Hand einen Eintrag in
der `visu\_config.xml <../XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das DesignToggle Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <settings>
            <screenshot name="designtoggle_simple">
                <caption>DesignToggle, einfaches Beispiel</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <designtoggle>
          <label>DesignToggle</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </designtoggle>


Die 2. address Zeile ist zwar streng genommen optional, jedoch macht
ein DesignToggle-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das DesignToggle-Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <settings>
            <screenshot name="designtoggle_complete">
                <caption>DesignToggle mit mapping + styling</caption>
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
        <designtoggle mapping="OnOff" styling="RedGreen">
          <label>DesignToggle</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </designtoggle>
