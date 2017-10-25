.. _navbar:

Das Navbar Widget
===================

.. api-doc:: Navbar

Beschreibung
------------

Mit dem Navbar-Widget kann man ein (auf der jeweiligen Seite) permanent sichtbares Navigationsmenü erstellen, 
das auf jeder Seite der Visualisierung getrennt konfiguriert oder auch ausgeblendet werden kann.  

Am häufigsten werden im Navbar PageJump-Widgets zur Navigation platziert. Besonders praktisch ist auch die 
Anzeige der Uhrzeit- bzw. des  Datums mit dem strftime-Plugin. 

Je Seite können bis zu 4 Navbars konfiguriert werden, am häufigsten werden aber nur 1-2 Navbars verwendet. 
Die Sichtbarkeit der Navbars kann über die Attribute des Page-Elementes zB. ``showtopnavigation="true"`` gesteuert
werden.

.. figure:: _static/pagejump_komplex.png


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Navbar-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. 

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.

Über das ``scope``-Attribut kann die Vererbung des Navbars auf die nächsten Unterseiten gesteuert werden. Mit ``scope="0"``
erfolgt keine Vererbung, d.h. der Navbar mussfür jede Seite individuell definiert werden. 

Mit ``scope="1"`` wird der Navbar auf das nächste Page-Element vererbt, d.h. eine weitere Navbar-Definition auf 
der Unterseite wird zusätzlich zum Navbar der übergeordneten Page angezeigt, mit ``scope="2"`` wird um 2 Ebenen 
vererbt, usw.


Erlaubte Attribute im Navbar-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: navbar

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Im Navbar können grundsätzlich alle verfügbaren Widget-Elemente eingesetzt werden. Am häufigsten werden im Navbar 
jedoch PageJump-Widgets platziert, die zusätzlich durch Gruppen-, Line und Text-Widgets optisch gestaltet werden 
können. Besonders praktisch ist auch die Anzeige der Uhrzeit- bzw. des  Datums mit dem strftime-Plugin. 


XML Syntax
----------

Alternativ kann man für das Navbar Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier ein komplexes Beispiel für ein Navigationsmenü in einer Navbar:


.. widget-example::

    <settings selector="#navbarTop .navbar">
        <screenshot name="pagejump_komplex">
            <caption>Navbar mit PageJump-Widgets</caption>
            <data address="1/0/0" type="float">20.5</data>
            <data address="1/0/1" type="float">21.5</data>
            <data address="1/0/2" type="float">22</data>
            <data address="1/0/3" type="float">18</data>
        </screenshot>
    </settings>
    <navbar position="top" dynamic="true">
        <pagejump target="Übersicht">
            <layout colspan="0" />
            <label>
                <icon name="control_building_empty" />
                Übersicht
            </label>
        </pagejump>
        <line>
            <layout colspan="0" />
        </line>
        <pagejump target="Wohnzimmer">
            <layout colspan="0" />
            <label>
                <icon name="scene_livingroom" />
                Wohnen
            </label>
            <widgetinfo>
                <info format="%d">
                    <layout colspan="0" />
                    <address transform="DPT:9.001" mode="read" variant="">1/0/0</address>
                </info>
            </widgetinfo>
        </pagejump>
        <pagejump target="Esszimmer">
            <layout colspan="0" />
            <label>
                <icon name="scene_dinner" />
                Essen
            </label>
            <widgetinfo>
                <info format="%d">
            <layout colspan="0" />
            <address transform="DPT:9.001" mode="read" variant="">1/0/1</address>
                </info>
            </widgetinfo>
        </pagejump>
        <pagejump target="Schlafzimmer">
            <layout colspan="0" />
            <label>
                <icon name="scene_sleeping" />
                Schlafen
            </label>
            <widgetinfo>
                <info format="%d">
                    <layout colspan="0" />
                    <address transform="DPT:9.001" mode="read" variant="">1/0/2</address>
                </info>
            </widgetinfo>
        </pagejump>
        <pagejump target="Büro">
            <layout colspan="0" />
            <label>
                <icon name="it_pc" />
                Büro
            </label>
        </pagejump>
        <pagejump target="Küche">
            <layout colspan="0" />
            <label>
                <icon name="scene_baking_oven" /> Küche
            </label>
            <widgetinfo>
                <info format="%d">
                    <layout colspan="0" />
                    <address transform="DPT:9.001" mode="read" variant="">1/0/3</address>
                </info>
            </widgetinfo>
        </pagejump>
        <pagejump target="Bad">
            <layout colspan="0" />
            <label>
                <icon name="scene_bath" />
                Bad
            </label>
        </pagejump>
        <pagejump target="Flure">
            <layout colspan="0" />
            <label>
                <icon name="scene_hall" />
                Flure
            </label>
        </pagejump>
        <pagejump target="Garage">
            <layout colspan="0" />
            <label>
                <icon name="fts_garage" />
                Garage
            </label>
        </pagejump>
        <line>
            <layout colspan="0" />
        </line>
        <pagejump target="Multiroom">
            <layout colspan="0" />
            <label>
                <icon name="audio_sound" />
                Audio
            </label>
        </pagejump>
        <pagejump target="Temperaturen">
            <layout colspan="0" />
            <label>
                <icon name="temp_temperature" />
                Temperatur
            </label>
        </pagejump>
        <pagejump target="Netzwerk">
            <layout colspan="0" />
            <label>
                <icon name="it_network" />
                Netzwerk
            </label>
        </pagejump>
    </navbar>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.

