.. _%%%WIDGET_NAME_LOWER%%%:

%%%HEADLINE%%%

.. api-doc:: %%%WIDGET_NAME%%%

Beschreibung
------------

.. todo::

    Widget Beschreibung hinzufügen inkl. Beispielen, vorhandene Beispiele korrigieren, vervollständigen


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des %%%WIDGET_NAME%%%-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im %%%WIDGET_NAME%%%-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: %%%WIDGET_NAME_LOWER%%%

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <%%%WIDGET_NAME_LOWER%%%>
        <layout colspan="4" />
        <label>Kanal 1<icon name="control_on_off"/></label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </%%%WIDGET_NAME_LOWER%%%>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: %%%WIDGET_NAME_LOWER%%%

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <%%%WIDGET_NAME_LOWER%%%>
        <layout colspan="4" />
        <label>%%%WIDGET_NAME%%%</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </%%%WIDGET_NAME_LOWER%%%>

XML Syntax
----------

Alternativ kann man für das %%%WIDGET_NAME%%% Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das %%%WIDGET_NAME%%% Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

    <settings>
        <screenshot name="%%%WIDGET_NAME_LOWER%%%_simple">
            <caption>%%%WIDGET_NAME%%%, einfaches Beispiel</caption>
            <data address="1/4/0">0</data>
        </screenshot>
    </settings>
    <%%%WIDGET_NAME_LOWER%%%>
        <label>%%%WIDGET_NAME%%%</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
        <address transform="DPT:1.001" mode="read">1/4/0</address>
    </%%%WIDGET_NAME_LOWER%%%>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.