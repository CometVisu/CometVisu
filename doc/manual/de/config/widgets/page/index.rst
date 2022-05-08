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

.. spelling::

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