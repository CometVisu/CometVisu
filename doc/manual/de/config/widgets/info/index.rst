.. replaces:: CometVisu/0.8.0/info/de
    CometVisu/0.8.0/info/de)
    CometVisu/0.8.x/widgets/info/de/
    CometVisu/Widget/info/de
    CometVisu/info
    CometVisu/info_(Deutsch)

.. _info:

Das Info Widget
===============

.. api-doc:: Info

Beschreibung
------------

Das Info Widget fügt der Visualisierung einen dynamischen Text hinzu. Dies ermöglicht die Anzeige von Werten von Gruppenadressen hinzu, beispielsweise Temperaturen, Texte, etc.

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="info_simple_example">
            <caption>Beispiel Info Widget</caption>
            <data address="3/3/1">103</data>
        </screenshot>
    </settings>
    <info>
        <label>Zaehler</label>
        <address transform="DPT:13.001" mode="read">3/3/1</address>
    </info>

Die Ausgabewerte können formatiert werden (Anzahl der Nachkomma-Stellen, Einheiten etc.)

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="info_format">
            <caption>Beispiel Info Widget mit Formatierung</caption>
            <data address="3/6/0">10.7</data>
        </screenshot>
    </settings>
    <info format="%.1f °C">
        <label>Aussentemperatur</label>
        <address transform="DPT:9.001" mode="read">3/6/0</address>
    </info>

Zusätzlich kann über ein :ref:`Mapping <mapping>` eine Ersetzung der Zahlen durch Texte oder Symbole vorgenommen werden
(z.B. An/Aus statt 0/1 oder Icons für Fensterkontakte). Zur CometVisu gehört die umfangreiche Sammlung
an Icons für die verschiedensten Zwecke. Weitere Informationen findet man auf der Dokumentations-Seite
für das :ref:`Mapping <mapping>`.

.. widget-example::
    :hide-source: true

        <settings>
            <screenshot name="info_mapping">
                <caption>Beispiel Info Widget mit Mapping in Icons</caption>
                <data address="3/4/2">0</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="AufZuTuerSymbol">
                    <entry value="0">
                        <icon name="fts_door" color="green"/>
                    </entry>
                    <entry value="1">
                        <icon name="fts_door_open" color="red"/>
                    </entry>
                    <entry value="2">
                        <icon name="fts_door_tilt" color="orange"/>
                    </entry>
                </mapping>
            </mappings>
        </meta>
        <info mapping="AufZuTuerSymbol">
            <label>Kuechentuer</label>
            <address transform="DPT:5.010" mode="read">3/4/2</address>
        </info>

und/oder über ein :ref:`Styling <styling>` Farben gesetzt werden (z.B. negative Zahlen in Rot)

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="info_styling">
            <caption>Beispiel Info Widget mit Styling</caption>
            <data address="3/2/1">0</data>
        </screenshot>
    </settings>
    <meta>
        <mappings>
            <mapping name="On_Off">
                <entry value="0">Aus</entry>
                 <entry value="1">An</entry>
            </mapping>
        </mappings>
        <stylings>
            <styling name="Green_Red">
                <entry value="0">green</entry>
                <entry value="1">red</entry>
            </styling>
        </stylings>
    </meta>
    <info mapping="On_Off" styling="Green_Red">
        <label>Wasseralarm</label>
        <address transform="DPT:1.002" mode="readwrite">3/2/1</address>
    </info>

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Info-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Info-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: info

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <info mapping="Open_Close" styling="Green_Red" format="%.1f°C">
          <label>Aussentemperatur</label>
          <address transform="DPT:9.001" mode="read">3/6/0</address>
        </info>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: info

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <info>
            <label>Zaehler</label>
            <address transform="DPT:13.001" mode="read">3/3/1</address>
        </info>

XML Syntax minimal
------------------

Alternativ kann man für das Info Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Info Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="info_simple_xml">
                <caption>Info, einfaches Beispiel</caption>
                <data address="3/3/1">103</data>
            </screenshot>
        </settings>
        <info>
          <label>Zaehler</label>
          <address transform="DPT:13.001" mode="read">3/3/1</address>
        </info>


Die 2. address Zeile ist zwar streng genommen optional, jedoch macht
ein Info-Widget ohne die Rückmeldeadresse in der Praxis keinen Sinn,
da es dann Ereignisse vom Bus (wie z.B. Zentral-Aus, Treppenlicht) nicht
mitbekommt und den Status falsch anzeigt.

XML Syntax komplett
-------------------

Hier eine Beispielcode der das Info Widget aus dem folgenden Screenshot erzeugt:

.. code-block:: xml

    <info mapping="AufZuTuerSymbol">
      <label>Kuechentuer</label>
      <address transform="DPT:5.010" mode="read">3/4/2</address>
    </info>

    <info mapping="On_Off" styling="Green_Red">
      <label>Wasseralarm</label>
      <address transform="DPT:1.002" mode="readwrite">3/2/1</address>
    </info>

    <info mapping="Open_Close" styling="Green_Red">
      <label>Kuechenfenster</label>
      <address transform="DPT:1.009" mode="read">3/4/0</address>
    </info>

    <info format="%.1f°C">
      <label>Aussentemperatur</label>
      <address transform="DPT:9.001" mode="read">3/6/0</address>
    </info>

Beispiele
---------

Anzeige Fenster-/Türstatus
^^^^^^^^^^^^^^^^^^^^^^^^^^

Status einer Terrassentür und -fenster (mit Kontakten im Fenstergriff - Unterscheidung geschlossen/gekippt/offen)

.. widget-example::

    <settings selector=".widget_container[data-type='group']">
        <screenshot name="info_complex">
            <data address="3/4/2">0</data>
            <data address="3/4/6">1</data>
        </screenshot>
    </settings>
    <meta>
        <mappings>
         <mapping name="AufZuTuerSymbol">
            <entry value="0">
              <icon name="fts_door" color="green"/>
            </entry>
            <entry value="1">
              <icon name="fts_door_open" color="red"/>
            </entry>
            <entry value="2">
              <icon name="fts_door_tilt" color="orange"/>
            </entry>
          </mapping>
          <mapping name="AufZuFensterSymbol">
            <entry value="0">
              <icon name="fts_window_1w" color="green"/>
            </entry>
            <entry value="1">
              <icon name="fts_window_1w_open" color="red"/>
            </entry>
            <entry value="2">
              <icon name="fts_window_1w_tilt" color="orange"/>
            </entry>
          </mapping>
        </mappings>
    </meta>
    <group nowidget="true">
        <info mapping="AufZuTuerSymbol">
          <label>Terassentuer</label>
          <address transform="DPT:5.010" mode="read">3/4/2</address>
        </info>
        <info mapping="AufZuFensterSymbol">
          <label>Wohnzimmer-Fenster</label>
          <address transform="DPT:5.010" mode="read">3/4/6</address>
        </info>
    </group>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
