Das UrlTrigger Widget
=====================

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen


Parameter
---------

.. parameter_information:: urltrigger


Parameter im Editor
-------------------

.. widget_example::
    :editor: attributes
    :scale: 75

        <urltrigger>
          <layout colspan="4" />
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </urltrigger>


Elemente
--------

.. elements_information:: urltrigger

Elemente im Editor
------------------

.. widget_example::
    :editor: elements
    :scale: 75

        <urltrigger>
          <layout colspan="4" />
          <label>UrlTrigger</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </urltrigger>

XML Syntax minimal
------------------

Alternativ kann man für das UrlTrigger Widget auch von Hand einen Eintrag in
der `visu\_config.xml <../XML-Elemente>`__ hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das UrlTrigger Widget aus dem folgenden Screenshot erzeugt:

.. widget_example::

        <meta>
            <screenshot name="urltrigger_simple">
                <caption>UrlTrigger, einfaches Beispiel</caption>
                <data address="1/4/0">0</data>
            </screenshot>
        </meta>
        <urltrigger>
          <label>UrlTrigger</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </urltrigger>


Die zweite address Zeile ist zwar streng genommen optional, jedoch macht
ein Switch-Widget ohne die Rückmeldeaddresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier der Beispielcode der das UrlTrigger Widget mit den allen gezeigten
Eigenschaften einfügt, inkl. der benutzten Mappings / Stylings:

.. widget_example::

        <meta>
            <screenshot name="urltrigger_complete">
                <caption>UrlTrigger mit mapping + styling</caption>
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
        <urltrigger mapping="OnOff" styling="RedGreen">
          <label>UrlTrigger</label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </urltrigger>
