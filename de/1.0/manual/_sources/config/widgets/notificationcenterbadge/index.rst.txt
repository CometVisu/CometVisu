.. _notificationcenterbadge:

Das NotificationCenterBadge Widget
==================================

.. api-doc:: NotificationCenterBadge

Beschreibung
------------

Das NotificationCenterBadge Widget zeigt an wie viele Nachrichten sich gerade in der Benachrichtigungszentrale
befinden. Durch Klick auf das Widget lässt sich die Benachrichtigungszentrale öffnen.
Wenn man diese Widget nicht benutzt, liefert die Benachrichtigungszentrale ein eigenes Widget, welches nur sichtbar
ist wenn Nachrichten vorhanden sind. Diese liegt allerdings am oberen rechten Rands des Browserfensters und
könnte daher andere Widgets überdecken. Möchte man dies nicht kann man das NotificationCenterBadge Widget benutzen
und frei in der Visu platzieren. Ratsam ist es jedoch dieses Widget in eine auf jeder Seite sichtbaren Navigationsleiste
einzufügen.

**Beispiel:**

.. code-block:: xml

   <notificationcenterbadge align="right" hide-when-empty="true">
        <layout colspan="0" />
   </notificationcenterbadge>

Dieses Beispiel zeigt das Widget nur an wenn Nachrichten vorhanden sind ``hide-when-empty="true"``.
Außerdem wird das Widget rechts platziert (in CSS: ``float: right``) und
``<layout colspan="0"/>`` bewirkt, dass das Widget in der Breite nur soviel Platz belegt wie es wirklich benötigt.


.. HINT::

    Unabhängig davon, ob man dieses Widget benutzt, kann man die Benachrichtigungszentrale immer mit dem
    Tastaturkürzel ``Strg + M`` öffnen.

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des NotificationCenterBadge-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im NotificationCenterBadge-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: notificationcenterbadge

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <notificationcenterbadge align="right" hide-when-empty="true">
        <layout colspan="0" />
    </notificationcenterbadge>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: notificationcenterbadge

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <notificationcenterbadge align="right" hide-when-empty="true">
        <layout colspan="0" />
    </notificationcenterbadge>


XML Syntax
----------

Alternativ kann man für das NotificationCenterBadge Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!


.. widget-example::

    <settings>
        <screenshot name="notificationcenterbadge_center">
            <caption>Badge ohne Nachrichten</caption>
        </screenshot>
    </settings>
    <notificationcenterbadge>
        <layout colspan="0" />
    </notificationcenterbadge>


.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
