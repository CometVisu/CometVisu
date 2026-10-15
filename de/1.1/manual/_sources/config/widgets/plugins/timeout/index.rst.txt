.. _timeout:

Das Timeout Plugin
==================

.. api-doc:: cv.plugins.Timeout

Beschreibung
------------

Mit dem Timeout-Plugin wird erreicht, dass die CometVisu nach Ablauf einer bestimmten Zeit wieder eine definierte Seite 
angezeigt wird. Das Timeout-Plugin aktiviert bei jedem Seitenwechsel (inkl. Page-Aufruf per GA) einen Timer, der
durch jegliche Benutzerinteraktion (zB. Mauszeigerbewegung oder -klick) zurückgesetzt wird. Nach Ablauf eines 
festgelegten Timeouts ohne Aktivität wird die angegebene Seite der Visualisierung aktiviert.

Das Timeout-Plugin hat kein sichtbares Widget. 


Erlaubte Attribute im Diagramm-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: timeout

Das timeout-Plugin hat keine Kind-Elemente. 

XML Syntax
----------

Das Plugin muss im <meta>-tag unter den Plugins aufgelistet sein. Im einem page-widget ist der 
Code ``<timeout time="60" target="Main1"/>`` einzutragen.

Nachstehend ein vollständiges Config-File für eine Visualisierungsseite mit Timeout-Plugin.

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="metal" xsi:noNamespaceSchemaLocation="./visu_config.xsd" lib_version="8">
        <meta>
            <plugins>
                <plugin name="timeout"/>
            </plugins>
        </meta>
        <page name="Main1" showtopnavigation="false" showfooter="false" shownavbar-top="false">  
            <timeout time="60" target="Main1"/>
            <text align="left">
                <layout colspan="2"/>
                <label>Seite Main</label>
            </text>
            <page name="Seite2" showtopnavigation="false" showfooter="false" shownavbar-top="false">
                <layout colspan="2"/>
                <text align="left">
                    <layout colspan="2" colspan-m="6" colspan-s="12"/>
                    <label>Seite2</label>
                </text>
            </page>    
        </page>
    </pages>
