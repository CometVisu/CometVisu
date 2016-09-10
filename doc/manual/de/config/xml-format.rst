.. replaces:: CometVisu/XML-Elemente
    XML-Elemente

XML-Struktur
============

Eine XML-Datei besteht aus verschiedenen "Elementen", die insgesamt
einen Baum darstellen. Ein Element kann weitere Elemente einschließen.
Über "Attribute" kann ein Element Werte annehmen. Einige dieser
Attribute müssen zwingend vergeben werden.

Die visu_config.xml (Header)
----------------------------

Die Konfigurationsdatei beginnt immer mit folgenden beiden Zeilen:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="pure" xsi:noNamespaceSchemaLocation="visu_config.xsd">

In der zweiten Zeile ist folgende Einstellung relevant:

+---------------------+-------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| Option              | Beschreibung                                                                                                | Werte                                                                      | Zwingend   |
+=====================+=============================================================================================================+============================================================================+============+
| ``design="pure"``   | Mit dieser Option wird das Standard-Design festgelegt, dass auf die Visualisierung angewendet werden soll   | pure, metal, discreet, discreet_sand, discreet_slim, alaska, alaska_slim   | JA         |
+---------------------+-------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+



Als nächstes kommen in der visu_config.xml alle Definitionen für
Plugins, Mappings, Stylings, Icons und die Statusleiste. Die Reihenfolge
ist wie folgt:

.. code-block:: xml

    <meta>
       <plugins>
          <plugin name="colorchooser"/>
       </plugins>

       <mappings>
          <mapping name="Start/Stop">
             <entry value="0">Stop</entry>
             <entry value="1">Start</entry>
          </mapping>
       </mappings>

       <stylings>
          <styling name="RedGreen">
             <entry value="0">red</entry>
             <entry value="1">green</entry>
          </styling>
       </stylings>

       <icons>
          <icon-definition name="Icon1" uri="./icon/unterverzeichnis/icon1.png"/>
       </icons>

       <statusbar>
           <status type="html"><![CDATA[
               <img src="icon/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
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

Die Optionen von oben nach unten im Überblick:

Plugins
-------

+--------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------+------------+
| Option                   | Beschreibung                                                                                                                                         | Werte                            | Zwingend   |
+==========================+======================================================================================================================================================+==================================+============+
| ``<plugin name=" "/>``   | Mit dieser Option werden die Plugins eingebunden. Hier wird der Name des Plugins eingetragen. Pro Plugin muss ein solcher Eintrag angelegt werden.   | z.B. colorchooser oder diagram   | NEIN       |
+--------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------+------------+

Mappings
--------

+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+
| Option                                     | Beschreibung                                                                                                                   | Werte       | Zwingend   |
+============================================+================================================================================================================================+=============+============+
| ``<mapping name=" ">``                     | Mit dieser Option wird der Name des Mappings definiert. Dieser wird auch im Web-Editor bei entsprechenden Widgets angezeigt.   | z.B.        | JA         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+
| ``<entry value="WERT">NAME</entry>``       | Mit dieser Option wird einem Wert ein Namen zugewiesen. Für jeden möglichen Wert muss ein solcher Eintrag angelegt werden.     | z.B. Stop   | JA         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+-------------+------------+

Stylings
--------

+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+
| Option                                      | Beschreibung                                                                                                                   | Werte      | Zwingend   |
+=============================================+================================================================================================================================+============+============+
| ``<styling name=" ">``                      | Mit dieser Option wird der Name des Stylings definiert. Dieser wird auch im Web-Editor bei entsprechenden Widgets angezeigt.   | z.B.       | JA         |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+
| ``<entry value="WERT">FARBE</entry>``       | Mit dieser Option wird einem Wert eine Farbe zugewiesen.                                                                       | z.B. red   | JA         |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------+------------+------------+

Icons
-----

+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+
| Option                                        | Beschreibung                                                                                                                                                                                                                                                                                                                                                                            | Werte   | Zwingend   |
+===============================================+=========================================================================================================================================================================================================================================================================================================================================================================================+=========+============+
| ``<icon-definition name=" " uri="WERT">``     | Mit dieser Option wird der Name des Icons definiert, welches sich unter dem in uri angegebenen Verzeichnis befindet. Auf die so definierten Icons kann dann im weiteren Verlauf über den einfacher zu merkenden Namen zugegriffen werden. Die Verzeichnisangabe ist im Beispiel relativ zur CV installation. Hier wurden vorher die Icons in einem eigenen Unterverzeichnis abgelegt.   | z.B.    | NEIN       |
+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+

Statusbar
---------

.. TODO::

    Statusbar beschreiben

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
         <plugin name="colorchooser"/>
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
werden. Eine Beschreibung der einzelen Widgets mit den zugehörigen XML
Codes finden Sie in der :doc:`Widgetübersicht <widgets/index>`

In der letzten Zeile der Config muss noch der Tag geschlossen werden.
Dafür muss also noch folgender Eintrag am Ende der Datei eingefügt
werden:

.. code-block:: xml

    </pages>

Damit ist die visu_config.xml vollständig und kann auf den Server
übertragen werden.