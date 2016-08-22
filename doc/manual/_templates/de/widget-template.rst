%%%HEADLINE%%%

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen


Parameter
---------

.. parameter_information:: %%%WIDGET_NAME_LOWER%%%


Parameter im Editor
-------------------

.. widget_example::
    :editor: attributes
    :scale: 75

        <%%%WIDGET_NAME_LOWER%%%>
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </%%%WIDGET_NAME_LOWER%%%>


Elemente
--------

.. elements_information:: %%%WIDGET_NAME_LOWER%%%

Elemente im Editor
------------------

.. widget_example::
    :editor: elements
    :scale: 75

        <%%%WIDGET_NAME_LOWER%%%>
          <layout colspan="4" />
          <label>%%%WIDGET_NAME%%%</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </%%%WIDGET_NAME_LOWER%%%>

XML Syntax minimal
------------------

Alternativ kann man für das %%%WIDGET_NAME%%% Widget auch von Hand einen Eintrag in
der `visu\_config.xml <../XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das %%%WIDGET_NAME%%% Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <settings>
            <screenshot name="%%%WIDGET_NAME_LOWER%%%_simple">
                <caption>%%%WIDGET_NAME%%%, einfaches Beispiel</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </settings>
        <%%%WIDGET_NAME_LOWER%%%>
          <label>%%%WIDGET_NAME%%%</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </%%%WIDGET_NAME_LOWER%%%>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das %%%WIDGET_NAME%%% Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <settings>
            <screenshot name="%%%WIDGET_NAME_LOWER%%%_complete">
                <caption>%%%WIDGET_NAME%%% mit mapping + styling</caption>
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
        <%%%WIDGET_NAME_LOWER%%% mapping="OnOff" styling="RedGreen">
          <label>%%%WIDGET_NAME%%%</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </%%%WIDGET_NAME_LOWER%%%>
