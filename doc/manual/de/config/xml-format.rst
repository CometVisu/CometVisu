.. replaces:: CometVisu/XML-Elemente
    XML-Elemente

.. _xml-format:

XML-Struktur
============

Eine XML-Datei besteht aus verschiedenen "Elementen", die insgesamt
einen Baum darstellen. Ein Element kann weitere Elemente einschließen.
Über "Attribute" kann ein Element Werte annehmen. Einige dieser
Attribute müssen zwingend vergeben werden.

.. _xml-format_header:

Der Header der visu_config.xml
------------------------------

Die Konfigurationsdatei beginnt immer mit folgenden beiden Zeilen:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="pure" xsi:noNamespaceSchemaLocation="visu_config.xsd">

In der zweiten Zeile sind folgende Einstellungen relevant:

+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| Option                     | Beschreibung                                                                                                 | Werte                                                                      | Zwingend   |
+============================+==============================================================================================================+============================================================================+============+
| ``design="pure"``          | Mit dieser Option wird das Standard-Design festgelegt, dass auf die Visualisierung angewendet werden soll    | pure, metal, discreet, discreet_sand, discreet_slim, alaska, alaska_slim   | JA         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``screensave_time="60"``   | Mit dieser Option kann festgelegt werden, nach welcher Zeit auf eine bestimmte Seite zurückgekehrt wird      | beliebige Angabe in Sekunden                                               | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``screensave_page="main"`` | Mit dieser Option kann festgelegt werden, auf welche Seite nach Ablauf von ``sceensave_time`` angezeigt wird | Angabe der Seite-ID zB. "id_1" bzw. Seitenname zB. "Main"                  | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend="mqtt"``         | Mit dieser Option kann das Backend festgelegt werden und die vom Server gesendete Information übersteuern    | knxd, oh, mqtt                                                             | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend-url="ws://..."`` | Nur für MQTT: URL der WebSocket Schnittstelle des MQTT Brokers                                               |                                                                            | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``username="user"``        | Nur für MQTT: Benutzername des MQTT Brokers                                                                  |                                                                            | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``password="secret"``      | Nur für MQTT: Passwort des MQTT brokers                                                                      |                                                                            | NEIN       |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+


Als nächstes kommen in der visu_config.xml innerhalb des meta-tags alle Definitionen für
Plugins, Mappings, Stylings, Icons und die Statusleiste. Die richtige Reihenfolge ist dabei
einzuhalten!


Nachstehend wird werden der Reihe nach ein Überblick über die Optionen im meta-tag gegeben.

.. _xml-format_files:

Zusätzliche Dateien einbinden
-----------------------------

| **Verfügbar seit Version**: 0.11.0


===========================  ============================================   =================================  ===============
Option                       Beschreibung                                   Werte                              Zwingend
===========================  ============================================   =================================  ===============
``<file type=" "></file>``   Mit dieser Option können zusätzliche Dateien   Pfad zur Datei                     NEIN
                             (CSS oder Javascript) geladen werden
===========================  ============================================   =================================  ===============

.. code-block:: xml

    <meta>
        <files>
            <file type="css">resource/config/media/style.css</file>
            <file type="js" content="plugin">resource/config/media/MyCustomWidget.js</file>
        </plugins>
        ...
    </meta>

Siehe auch :ref:`custom_css` und :ref:`custom_plugins`.

.. _xml-format_plugins:

Plugins
-------

+--------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------+------------+
| Option                   | Beschreibung                                                                                                                                         | Werte                            | Zwingend   |
+==========================+======================================================================================================================================================+==================================+============+
| ``<plugin name=" "/>``   | Mit dieser Option werden die Plugins eingebunden. Hier wird der Name des Plugins eingetragen. Pro Plugin muss ein solcher Eintrag angelegt werden.   | z.B. clock oder diagram          | NEIN       |
+--------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------+------------+

.. code-block:: xml

    <meta>
        <plugins>
            <plugin name="clock"/>
        </plugins>
        ...
    </meta>


.. _xml-format_mappings:

Mappings
--------

+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+
| Option                                     | Beschreibung                                                                                                                   | Werte       | Zwingend   |
+============================================+================================================================================================================================+=============+============+
| ``<mapping name=" ">``                     | Mit dieser Option wird der Name des Mappings definiert. Dieser wird auch im Web-Editor bei entsprechenden Widgets angezeigt.   | z.B.        | JA         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+
| ``<entry value="WERT">NAME</entry>``       | Mit dieser Option wird einem Wert ein Namen zugewiesen. Für jeden möglichen Wert muss ein solcher Eintrag angelegt werden.     | z.B. Stop   | JA         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+

.. code-block:: xml

    <meta>
        ...
        <mappings>
            <mapping name="Start/Stop">
                <entry value="0">Stop</entry>
                <entry value="1">Start</entry>
            </mapping>
        </mappings>
        ...
    </meta>

.. _xml-format_stylings:

Stylings
--------

+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+
| Option                                      | Beschreibung                                                                                                                   | Werte      | Zwingend   |
+=============================================+================================================================================================================================+============+============+
| ``<styling name=" ">``                      | Mit dieser Option wird der Name des Stylings definiert. Dieser wird auch im Web-Editor bei entsprechenden Widgets angezeigt.   | z.B.       | JA         |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+
| ``<entry value="WERT">FARBE</entry>``       | Mit dieser Option wird einem Wert eine Farbe zugewiesen.                                                                       | z.B. red   | JA         |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+

.. code-block:: xml

    <meta>
        ...
        <stylings>
            <styling name="RedGreen">
                <entry value="0">red</entry>
                <entry value="1">green</entry>
            </styling>
        </stylings>
        ...
    </meta>

.. _xml-format_icons:

Icons
-----

+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+
| Option                                        | Beschreibung                                                                                                                                                                                                                                                                                                                                                                            | Werte   | Zwingend   |
+===============================================+=========================================================================================================================================================================================================================================================================================================================================================================================+=========+============+
| ``<icon-definition name=" " uri="WERT">``     | Mit dieser Option wird der Name des Icons definiert, welches sich unter dem in uri angegebenen Verzeichnis befindet. Auf die so definierten Icons kann dann im weiteren Verlauf über den einfacher zu merkenden Namen zugegriffen werden. Die Verzeichnisangabe ist im Beispiel relativ zur CV installation. Hier wurden vorher die Icons in einem eigenen Unterverzeichnis abgelegt.   | z.B.    | NEIN       |
+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+

.. code-block:: xml

    <meta>
        ...
        <icons>
            <icon-definition name="Icon1" uri="./icon/unterverzeichnis/icon1.png"/>
        </icons>
        ...
    </meta>

.. HINT::

    Wenn die Icons über den :doc:`Manager <manager>` hochgeladen wurden, befinden sie sich im Pfad
    ``resource/config/media/``. Ein hochgeladenes Icon mit dem Dateiname ``logo.svg`` kann demnach mit folgender
    Zeile eingebunden werden: ``<icon-definition name="Logo" uri="resource/config/media/logo.svg"`.
    Der Pfad ``resource/config/media/`` gilt für CometVisu Versionen >=0.11.x. Für Versionen <=0.10.x gilt der Pfad
    ``config/media/``.

.. _xml-format_statusbar:

Statusbar
---------

Der Statusbar befindet sich am unteren Bildschirmrand und erlaubt z.B. das Anzeigen von externen Links (über URL). 

.. code-block:: xml

    <meta>
        ...
        <statusbar>
            <status type="html"><![CDATA[
                <img src="resource/icons/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
                - <a href=".?forceReload=true">Reload</a>
                - <a href="?config=demo">Widget Demo</a>
                ]]></status>
            <status type="html" condition="!edit" hrefextend="config"><![CDATA[
                - <a href="edit_config.html">Edit</a>
                ]]></status>
            <status type="html" condition="edit" hrefextend="all"><![CDATA[
                - <a href=".">normal Mode</a>
                ]]></status>
            <status type="html"><![CDATA[
                - <a href="check_config.php">Check Config</a>
                <div style="float:right;padding-right:0.5em">Version: SVN</div>
                ]]></status>
        </statusbar>
    </meta>

.. _xml-format_templates:

Templates
---------

| **Verfügbar seit Version**: 0.11.0
|

Im Metabereich können Templates für oft verwendete Konfigurationsausschnitte erstellt werden. In der Regel möchte man z.B.
seine Heizungs in jeden Raum auf die gleiche Weise darstellen. Diese kann aber aus mehrere Widgets bestehen, z.B. einem
Slider zur Darstellung und Bedienung der Ventilstellung, einem Info-Widget zur Anzeige der aktuellen Ist-Temperatur
und einem InfoTrigger-Widget für die aktuelle Soll-Temperatur. Diese Struktur ist in jedem Raum gleich, lediglich
die benutzen Adresse ändern sich. Mit einem Template muss man diese Struktur nur einmal schreiben und kann sie in
jedem Raum wiederverwenden.

In der Template-Definition werden Platzhalter für Variablen verwendet, welche dann beim benutzen des Templates durch
die entsprechenden Werte ersetzt werden. Das folgende Beispiel zeigt, wie man ein Template definiert und benutzt.

.. code-block:: xml
    :caption: Beispiel eines Templates für eine Heizung und dessen Verwendung in verschiedenen Räumen

    <pages>
        <meta>
            <templates>
                <template name="Heizung">
                    <group name="Heizung">
                      {{{ additional_content }}}
                      <slide min="0" max="100" format="%d%%">
                        <label>
                          <icon name="sani_heating" />
                          Heizung
                        </label>
                        <address transform="OH:dimmer" variant="">{{ control_address }}</address>
                      </slide>
                      <info format="%.1f °C">
                        <label>
                          <icon name="temp_temperature" />
                          Ist
                        </label>
                        <address transform="OH:number" variant="">{{ currenttemp_address }}</address>
                      </info>
                      <infotrigger uplabel="+" upvalue="0.5" downlabel="-"
                                   downvalue="-0.5" styling="BluePurpleRedTemp"
                                   infoposition="middle" format="%.1f °C" change="absolute" min="15" max="25">
                        <label>
                          <icon name="temp_control" />
                          Soll
                        </label>
                        <address transform="OH:number" variant="">{{ targettemp_address }}</address>
                      </infotrigger>
                    </group>
                </template>
            </templates>
        </meta>
        <page>
            <page name="Wohnzimmer">
                ...
                <template name="Heizung">
                  <value name="control_address">Heating_FF_Living</value>
                  <value name="currenttemp_address">Temperature_FF_Living</value>
                  <value name="targettemp_address">Temperature_FF_Living_Target</value>
                </template>
                ...
            </page>
            <page name="Küche">
                ...
                <template name="Heizung">
                  <value name="control_address">Heating_FF_Kitchen</value>
                  <value name="currenttemp_address">Temperature_FF_Kitchen</value>
                  <value name="targettemp_address">Temperature_FF_Kitchen_Target</value>
                  <value name="additional_content">
                    <text><label>Heizung Küche</label></text>
                  </value>
                </template>
                ...
            </page>
        </page>
    </pages>

.. HINT::
    Für die Templates wird `mustache.js <https://github.com/janl/mustache.js>`_ benutzt. Für weitere Informationen
    kann die mustache.js Dokumentation zu Rate gezogen werden.

Alternativ zum obigen Beispiel, kann der Inhalt des Templates auch in eine externe Datei ausgelagert werden.

.. code-block:: xml
    :caption: Beispiel einer Template-Definition aus einer externen Datei


    <pages>
        <meta>
            <templates>
                <template name="Heizung" ref="resource/config/media/heizung.template.xml"/>
            </templates>
        </meta>
        <page>
            <page name="Wohnzimmer">
                ...
                <template name="Heizung">
                  <value name="control_address">Heating_FF_Living</value>
                  <value name="currenttemp_address">Temperature_FF_Living</value>
                  <value name="targettemp_address">Temperature_FF_Living_Target</value>
                </template>
                ...
            </page>
            <page name="Küche">
                ...
                <template name="Heizung">
                  <value name="control_address">Heating_FF_Kitchen</value>
                  <value name="currenttemp_address">Temperature_FF_Kitchen</value>
                  <value name="targettemp_address">Temperature_FF_Kitchen_Target</value>
                  <value name="additional_content">
                    <text><label>Heizung Küche</label></text>
                  </value>
                </template>
                ...
            </page>
        </page>
    </pages>

.. code-block:: xml
    :caption: Inhalt der externen Datei ``resource/config/media/heizung.template.xml``

    <group name="Heizung">
      {{{ additional_content }}}
      <slide min="0" max="100" format="%d%%">
        <label>
          <icon name="sani_heating" />
          Heizung
        </label>
        <address transform="OH:dimmer" variant="">{{ control_address }}</address>
      </slide>
      <info format="%.1f °C">
        <label>
          <icon name="temp_temperature" />
          Ist
        </label>
        <address transform="OH:number" variant="">{{ currenttemp_address }}</address>
      </info>
      <infotrigger uplabel="+" upvalue="0.5" downlabel="-"
                               downvalue="-0.5" styling="BluePurpleRedTemp"
                               infoposition="middle" format="%.1f °C" change="absolute" min="15" max="25">
        <label>
          <icon name="temp_control" />
          Soll
        </label>
        <address transform="OH:number" variant="">{{ targettemp_address }}</address>
      </infotrigger>
    </group>

.. _xml-format_pages:

Aufbau der Visu-Seiten
----------------------

Als erstes muss eine Seite als Startseite angelegt werden. Dies
geschieht mit dem obersten Container. Alle weiteren Widgets und Seiten
befinden sich innerhalb dieser Hauptseite. Die Position der Elemente
wird von oben nach unten verarbeitet. Das sieht schematisch so aus:

.. widget-example::

    <settings selector=".page.activePage">
        <screenshot name="structure_main_page">
            <caption>Startseite mit Link zur Unterseite</caption>
        </screenshot>
        <screenshot name="structure_sub_page" clickpath=".widget.pagelink .actor" waitfor="#id_0_">
            <caption>Unterseite</caption>
            <data address="1/0/5">0</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
         <plugin name="clock"/>
        </plugins>
    </meta>
    <page name="Startseite">
       <page name="Seite1">
           <switch on_value="1" off_value="0">
              <label>Spot Fernseher</label>
              <address transform="DPT:1.001" mode="readwrite" variant="">1/0/5</address>
           </switch>
       </page>
       <colorchooser>
          <label>RGB Küche</label>
          <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
          <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
          <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
       </colorchooser>
    </page>

Dieses kleine Beispiel erstellt eine Hauptseite mit dem Namen
**Startseite**. Auf dieser Startseite wird zu oberst ein Link zu einer
Unterseite mit dem Namen **Seite1** angelegt. Auf dieser Unterseite wird
zu oberst eine Schaltfläche mit dem Namen **Spot Fernseher** eingefügt.
Als nächstes wird auf der Hauptseite der Colorchooser mit dem Namen
**RGB Küche** eingefügt.

Mit dieser Struktur können beliebig komplexe Seitenstrukturen angelegt
werden. Eine Beschreibung der einzelnen Widgets mit den zugehörigen XML
Codes finden Sie in der :doc:`Widgetübersicht <widgets/index>`

In der letzten Zeile der Config muss noch der Tag geschlossen werden.
Dafür muss also noch folgender Eintrag am Ende der Datei eingefügt
werden:

.. code-block:: xml

    </pages>

Damit ist die visu_config.xml vollständig und kann auf den Server
übertragen werden.
