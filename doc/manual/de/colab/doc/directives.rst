Eigene Direktiven
=================

Neben den vorhandenen Sphinx/Docutils Direktiven werden in der CometVisu Dokumentation auch einige
Direktiven genutzt, die dabei helfen, die Dokumentation einfacher auf einem aktuellen Stand zu halten.
Folgende Direktiven werden zur Zeit unterstützt:

+-----------------------+-----------------------------------------------------------------------------------------------+
| Name                  | Beschreibung                                                                                  |
+=======================+===============================================================================================+
| widget-example        | Ermöglicht Beispielcode für Widgets aus dem automatisch Screenshots erstellt werden kann.     |
+-----------------------+-----------------------------------------------------------------------------------------------+
| parameter-information | Zeigt alle Attribute eines Widgets mit erlaubten Werten und kurzer Erklärung als Tabelle an.  |
+-----------------------+-----------------------------------------------------------------------------------------------+
| elements-information  | Zeigt alle erlaubten Unter-Elemente eines Widgets inkl. deren Attributen als Tabelle an.      |
+-----------------------+-----------------------------------------------------------------------------------------------+
| api-doc               | Bindet Informationen aus der Source-Code Dokumentation ein (@author und @since)               |
+-----------------------+-----------------------------------------------------------------------------------------------+
| replaces              | Hiermit lässt sich festlegen, welche Seiten des alten Wikis diese Seite ersetzt               |
+-----------------------+-----------------------------------------------------------------------------------------------+

Die *widget-example* Direktive
------------------------------

Die *widget-example* Direktive erlaubt Beispiel-Code einer CometVisu config aus der später vollautomatisch
einer oder mehrere Screenshots generiert werden und zusammen mit dem Beispiel-Code in die Dokumentation eingebunden
werden.

Das folgende Beispiel:

.. code-block:: rst

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

erzeugt diesen Eintrag in der Dokumentation:

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

Der Inhalt der Direktive orientiert sich am Aufbau der normalen CometVisu Konfigurationsdatei und ist ebenfalls
ein XML-Dokument. Er besteht im Wesentlichen aus 3 Bereichen:

#. **<settings>** Hier werden die Screenshots und Untertitel definiert.
#. **<meta>** Hier ist alles erlaubt, was auch innerhalb des *<meta>*-Elements der Konfigurationsdatei erlaubt ist
   (z.B. Laden von Plugins, Definition von Mappings, Stylings usw.)
#. **Alles andere** Alles was nicht innerhalb eines *<settings>* oder *<meta>*-Elements ist, wird als Beispielcode
   interpretiert. Hier ist also alles erlaubt, was innerhalb eines *<page>*-Elements der Konfigurationsdatei
   erlaubt ist (z.B. Widgets, Groups, usw.)

Die Bereiche 1. und 2. sind optional und können auch weggelassen werden, wenn man also z.B. nur 1 Screenshot
vom Beispielcode ohne Untertitel benötigt kann der *<settings>*-Teil auch weggelassen werden.

Darüber hinaus gibt es noch diverse Optionen mit denen das Aussehen des Beispiel-Codes und des zu gehörigen
Screenshots beeinflusst werden können

#. `linenos`: Wenn angegeben, wird der Beispielcode mit Zeilennummern angegeben
#. `lineno-start`: Zahl bei der die Zeilennummern starten sollen (Default: 1)
#. `scale`: Prozentangabe mit der der Screenshot verkleinert werden kann (Default: 100)
#. `hide-source`: *true* oder *false*. (Default: *false*), zeigt den Beispielcode nicht an wenn *true*
#. `editor`: *attributes* oder *elements*. Macht einen Screenshot vom Beispielcode im Editor und nicht vom Widget selbst
#. `align`: *left*, *center* oder *right*. Definiert die Position des Screenshots (Default: *left*)

Ein vollständiges Beispiel mit allen Optionen:

.. code-block:: rst

    .. widget-example::
        :linenos:
        :linenos-start: 1
        :scale: 75
        :hide-source: true
        :editor: attributes
        :align: center

        ....


Der *<settings>*-Bereich
^^^^^^^^^^^^^^^^^^^^^^^^

Dieser Bereich wird definiert durch das `<settings>`-Element und dieses kann durch Attribute und Unterelemente
verfeinert werden.

+-------------------+--------------------------------------------------------------------------------------------------------------------+
| Element           | Attribut                                                                                                           |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
|                   | Name              | Inhalt            | Beschreibung                                                               |
+===================+===================+===================+============================================================================+
| <settings>        | design            | Name eines Designs| In welchem Design der Screenshot aufgenommen werden soll (Default: metal)  |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | selector          | Css-Selector      | Definiert den Bereich des Screenshots                                      |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | sleep             | Zahl              | Initiale Wartezeit in ms bevor der Screenshot aufgenommen wird             |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        |                   | #text             | Untertitel des Beispielcodes                                               |
|   <caption>       |                   |                   |                                                                            |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        | name              | Text              | Dateiname des Screenshots                                                  |
|   <screenshot>    +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | clickpath         | CSS-Selector      | CSS-Pfad zu einem Element, das angeklickt werden soll vor dem Screenshot   |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | waitfor           | CSS-Selector      | CSS-Pfad zu einem Element, das sichtbar sein soll vor dem Screenshot       |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | sleep             | Zahl              | Wartezeit zwischen Senden der Daten und Screenshot                         |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        | address           | Gruppenadresse   | Sende Daten an diese Adresse bevor der Screenshot gemacht wird             |
|   <screenshot>    +-------------------+-------------------+----------------------------------------------------------------------------+
|      <data>       | type              | *float* oder *int*| Falls echte Zahlenwerte gesendet werden müssen                             |
+                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | #text             | Text              | Inhalt der Daten die gesendet werden sollen                                |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+

Die *parameter-information* Direktive
-------------------------------------

Diese Direktive erzeugt automatisch eine Tabellenübersicht mit den Attributen des Widgets. Diese Daten werden
aus der Schema-Definition (visu_config.xsd) ausgelesen.
Diese Direktive hat keine Optionen und keinen Inhalt und nur einen Parameter der den Widget-Namen enthält.

Dieses Beispiel erzeugt die Attribut-Tabelle für das Switch-Widget.

.. code-block:: rst

    .. parameter-information:: switch

.. parameter-information:: switch

Die *elements-information* Direktive
------------------------------------

Diese Direktive erzeugt automatisch eine Tabellenübersicht mit den erlaubten Unter-Elementen eines Widgets. Diese Daten werden
aus der Schema-Definition (visu_config.xsd) ausgelesen.
Diese Direktive hat keine Optionen und keinen Inhalt und nur einen Parameter der den Widget-Namen enthält.

Dieses Beispiel erzeugt die Element-Tabelle für das Switch-Widget.

.. code-block:: rst

    .. elements-information:: switch

.. elements-information:: switch

Die *api-doc* Direktive
-----------------------

Diese Direktive liest wichtige Informationen aus der Source-Code Dokumentation eines Widgets oder Plugins.
Momentan sind das die Werte der ``@author`` und ``@since`` Angaben.

.. IMPORTANT::

    Wichtig ist hierbei, dass der Name des Widgets exakt dem Namen der Sourcecode-Datei ohne Dateiendung
    entspricht, also z.B. für ``structure/pure/Switch.js`` nimmt man ``.. api-doc:: Switch``
    (Groß-/Kleinschreibung beachten). Bei Plugins muss der Ordnername des Plugins angegeben werden, also
    z.B. für ``plugins/clock/`` nimmt man ``.. api-doc:: clock``

Beispiel für das Switch-Widget:

.. code-block:: rst

    .. api-doc:: Switch

erzeugt folgenden Inhalt:

.. api-doc:: Switch

Die *replaces* Directive
------------------------

Durch diese Direktive lasst sich definieren, welche Seiten des alten Wikis durch diese Handbuch-Seite ersetzt werden.
Es können mehrere Wiki-Seiten angegeben werden. Diese Direktive fügt der Dokumentation keinen Inhalt hinzu,
sondern wird dazu verwendet automatisch Weiterleitungen zu erstellen.

.. code-block:: rst

    .. replaces:: CometVisu/0.8.x/widgets/switch/de/
        CometVisu/0.8.0/switch/de
        CometVisu/Widget/switch/de
        CometVisu/switch
        CometVisu/switch_(Deutsch)
