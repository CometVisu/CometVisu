.. _tile-dynamic:

Das Dynamic-Widget
==================

.. api-doc:: cv.ui.structure.tile.widgets.Dynamic

Das ``Dynamic``-Widget ermöglicht es, andere Teile der Visualisierung dynamisch anzuzeigen. Es kann z.B. dazu genutzt werden,
die Anzeige-Elemente eines Raums auf einer Übersichtseite anzuzeigen, wenn man gerade in diesem Raum ist.
Dazu benötigt man ein ``<cv-address>`` Element, welches Informationen über den Raum enthält in dem man sich gerade aufhält und eine
``<cv-group>`` für diesen Raum.

.. code-block:: xml

    <cv-page id="start" name="Übersicht" icon="ri-dashboard-line">
        <cv-dynamic>
            <cv-ref selector="#floorplan > cv-group[name=Wohnzimmer]" when="Wohnzimmer" modify-selector="cv-group" modify-attribute="open:true"/>
            <cv-ref selector="#floorplan > cv-group[name=Esszimmer]" when="Esszimmer" modify-selector="cv-group" modify-attribute="open:true"/>
            <cv-address transform="OH:String" mode="read">Praesenz</cv-address>
        </cv-dynamic>
    </cv-page>
    <cv-page id="floorplan" name="Räume" icon="knxuf-control_building_empty">
        <cv-group name="Wohnzimmer" icon="knxuf-scene_livingroom">
            ...
        </cv-group>
        <cv-group name="Esszimmer" icon="knxuf-scene_dinner">
           ...
        </cv-group>
    </cv-page>

Mit Hilfe eines ``<cv-ref>`` Elements gibt man an was wann angezeigt werden soll.
Das ``selector`` Attribut gibt an, welche(s) Element(e) angezeigt werden sollen. Hierbei handelt es sich um einen CSS-Selektor der ein oder mehrere Elemente auswählt.
Diese werden kopiert und in die Visualisierung eingefügt, wenn der Wert des ``when`` Attributs des ``<cv-ref>`` Elements mit dem Wert des ``<cv-address>`` Elements übereinstimmt.

In diesem Beispiel wird die Gruppe ``Wohnzimmer`` angezeigt, wenn der Wert von ``Praesenz`` den Wert ``Wohnzimmer`` hat.
Die Gruppe ``Esszimmer`` wird angezeigt, wenn der Wert von ``Praesenz`` den Wert ``Esszimmer`` hat.

Es besteht zusätzlich die Möglichkeit die Attribute der kopierten Elemente zu ändern. Wenn man z.B. eine ``<cv-group>`` dynamisch anzeigen möchte die eigentlich geschlossen ist,
dann kann man die Kopie dieser Gruppe als automatisch geöffnet anzeigen lassen, indem man das ``open`` Attribut der ``cv-group`` auf ``true`` ändert.

Möchte man nicht die gesamte Gruppe kopieren sondern nur den Inhalt dieser, dann kann man den ``selector`` des ``<cv-ref>`` Elements folgendermaßen anpassen.

.. code-block:: xml

    ...
    <cv-dynamic>
        <cv-ref selector="#floorplan > cv-group[name=Wohnzimmer] > *:not(summary)" when="Wohnzimmer" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-ref selector="#floorplan > cv-group[name=Esszimmer] > *:not(summary)" when="Esszimmer" modify-selector="cv-group" modify-attribute="open:true"/>
        ...
    </cv-dynamic>
    ...

Inhalt nur für bestimmte Clients anzeigen
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Die CometVisu bietet die Möglichkeit eine Client-ID per URL zu übergeben (z.B. ``http://cometvisu/?clientID=Tablet_Wohnzimmer``).
Diese steht im "system" Backend unter der Adresse ``client:id`` zur Verfügung.
Damit kann man dann Teile der Visualisierung nur für bestimmte Clients anzeigen lassen.

.. code-block:: xml

    ...
    <cv-dynamic>
        <cv-ref selector="#floorplan > cv-group[name=Wohnzimmer]" when="Tablet_Wohnzimmer" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-ref selector="#floorplan > cv-group[name=Esszimmer]" when="Tablet_Esszimmer" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-address transform="OH:String" mode="read" backend="system">client:id</cv-address>
    </cv-dynamic>
    ...


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-dynamic tile
