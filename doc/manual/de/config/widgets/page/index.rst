.. replaces:: CometVisu/0.8.x/widgets/page/de

.. _page:

Das Page Widget
===============

.. api-doc:: Page

Beschreibung
------------

Das Page-Widget fügt der Visualisierung eine Seite hinzu. Eine Seite kann beliebig viele Widgets (auch weitere Seiten)
enthalten. Die Seiten dienen dazu die Widgets inhaltlich zusammenzufassen. So kann man z.B. für jeden Raum eine
Seite hinzufügen und dort alle Widgets einfügen, die in diesem Raum vorhanden sind (z.B. alle Lampen, Steckdosen,
Jalousien und sonstigen Informations- und Bedienungsmöglichkeiten innerhalb dieses Raumes.

.. TODO::

    Weitere Erklärungen zum Page-Widget, ggf. Beispiele (aus der Metal-Demo?)

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Page-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Page-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: page

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <page name="Testseite">
          <layout colspan="4" />
          <text><label>Test</label></text>
        </page>

2D Seiten
^^^^^^^^^

Bei 2D Seiten lassen sich die Widgets frei auf der Seite positionieren so wie
ein Hintergrundbild verwenden. Ein typisches Anwendungsbeispiel ist ein
Grundriss als Hintergrundbild, bei dem die für den jeweiligen Raum relevanten
Widgets entsprechend positioniert sind.

Hintergrundbild
...............

Die dargestellte Größe des Hintergrundbildes in Relation zum Browserfenster
lässt sich über das Attribut ``size`` anpassen. Hierbei gilt:

.. figure:: _static/size.svg
    :alt: size Attribut

| Über das Attribut ``backdropalign`` lässt sich die Position des
  Hintergrundbildes verschieben. Ohne Angabe wird dieses zentriert dargestellt,
  was einem Wert von ``50% 50%`` entspricht.
| Mit ``0px 50%`` würde es am linken Rand, aber vertikal zentriert erscheinen
  und mit ``0px 0px`` links oben.

Widgets
.......

Bei den Widgets muss nun das im ``layout`` Element das ``x`` und ``y`` Attribut
zur korrekten Positionierung befüllt werden. Bei diesen Widgets wird ein Wert
mit einer CSS-Einheit benötigt. Typisch sind daher relative Angaben wie ``12%``
oder absolute Angaben in Pixeln wie ``123px``.

.. spelling:word-list::

    Tree
    Styles

.. tip::

    Um die optimalen Werte für die Positionierung bestimmen zu können gibt es
    einen Trick den moderne Browser unterstützen: Den Entwicklungsmodus, der
    über :kbd:`Strg` + :kbd:`Umschalt` + :kbd:`i` aktiviert wird.

    Als erstes positioniert man das Widget grob über die Config-Datei, lädt
    diese Config dann im Browser und öffnet dort den Entwicklermodus.
    Dann klickt man auf das "Box mit Cursor" Icon und anschließend auf das
    zu bearbeitende Widget im Browser-Fenster selbst. Nun wird im DOM-Tree
    dieses Widget angezeigt. Hier muss man nun ggf. ein paar Ebenen nach oben
    gehen und das ``<div class="widget ...`` auswählen. Hier sieht man auch bei
    dem Attribut ``style`` in den Werten ``left`` und ``top`` genau die
    Werte aus der Config-Datei stehen.
    Dieses Werte lassen sich nun ändern (am einfachsten im rechten
    Fensterbereich im Reiter "Styles"). Diese Änderungen werden sofort im
    Browserfenster umgesetzt, so dass sich hier leicht eine Fein-Positionierung
    durchführen lässt. Der gefundene Zielwert muss anschließend nur noch in die
    Config-Datei übernommen werden.

    .. figure:: _static/editor_2d_widgets.png
        :alt: Entwicklermodus
        :target: ../../../_images/editor_2d_widgets.png

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Innerhalb des Page-Widgets sind alle anderen Widgets (auch andere Page-Widgets) erlaubt.


Erklärung zu den Menübezeichnungen
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: _static/menu_expl_page.png
    :alt: Menübezeichnungen
    :target: ../../../_images/menu_expl_page.png

Bus initiierter Seitenwechsel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Kommunikation
.............

Wenn das Attribut ``ga`` auf eine Bus-Adresse gesetzt wird, so kann über eine
Bus-Botschaft daran die Visu-Anzeige auf diese Seite gewechselt werden.

Wird nur das Attribut ``ga`` gesetzt, so wird immer bei einem Wert von 1 (bei KNX:
DPT:1 oder DPT:5) die Seite gewechselt.

Wird das Attribut ``transform`` gesetzt, so wird die Adresse bei ``ga`` mit
diesem Transform als Datentyp interpretiert.

.. warning::

    Die Verwendung von ``ga`` ohne ``transform`` ist veraltet und wird in
    zukünftigen Versionen nicht mehr unterstützt werden.

.. _pageClientAuswahl:

Client-Auswahl
..............

Um den für den Seitenwechsel notwendigen Wert zu definieren oder aber auch um
den Seitenwechsel nur auf einem Teil der Visus zu aktivieren wird das Attribut
``clients`` verwendet. Inhalt ist eine (über Komma getrennte) Liste aus
:ref:`Client-ID <urlClientID>`
mit Doppelpunkt und dem Trigger-Wert. Über die Wildcard ``*`` können mehrere
Clients gleichzeitig angesprochen werden, denen Client-ID mit dem gleichen
Text beginnt.

**Beispiele:**

* ``clients="*:1"``
    Jede Visu reagiert wenn eine ``1`` gesendet wird.
* ``clients="Diele_EG"``
    Nur die Visu ``Diele_EG`` reagiert, es muss eine ``1`` gesendet werden.
* ``clients="Diele_EG:0"``
    Nur die Visu ``Diele_EG`` reagiert, es muss eine ``0`` gesendet werden.
* ``clients="Diele_UG:0, Diele_EG:1"``
    Die Visu ``Diele_UG`` reagiert wenn eine ``0`` gesendet wird, die
    ``Diele_EG`` reagiert, wenn auf die gleiche ``ga`` eine ``1`` gesendet wird.
* ``clients="Diele_*"`` oder ``clients="Diele_*:1"``
    Jeder Client der mit ``Diele_`` anfängt (wie z.B. ``Diele_UG`` und
    ``Diele_EG``) reagiert, es muss eine ``1`` gesendet werden.

Ein möglicher Anwendungsfall wären in der Wand verbaute Touch-Panel PCs die
alle bei Betätigung der Klingel auf die Visu-Seite mit dem Außenkamera-Bild
umschalten sollen (dann würde die Kamera-Seite mit ``clients="Diele_*:1"``
alle Touch-Panels adressieren, die Visu auf dem Handy aber nicht reagieren.
Wenn nun auf die Adresse in ``ga`` eine ``1`` gesendet wird, schalten die
Clients die Seite um).
Auch üblich ist der Anwendungsfall, bei dem beim Öffnen der Haustüre die Visu
in der Diele im Erdgeschoss auf die Seite mit dem Verschluss-Status aller
Fenster gewechselt werden soll (also ``clients="Diele_EG:1"``), damit man beim
Verlassen des Hauses weiß, ob alles sicher abgeschlossen ist.

XML Syntax
----------

Hier der Beispielcode der die Page mit den oben gezeigten Eigenschaften einfügt:

.. code-block:: xml

        <page name="Testseite" visible="true" showtopnavigation="true"
                showfooter="true" shownavbar-top="true" shownavbar-bottom="false"
                shownavbar-left="false" shownavbar-right="false">
        ....
        </page>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
