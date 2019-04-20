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