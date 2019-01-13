.. _editor:

Grafischer Editor
=================

Der grafische Editor wird über den :ref:`Manager <manager>` aufgerufen, wo es
alternativ auch einen Text-Editor gibt. Im Editor lässt sich eine Konfiguration
anpassen ohne dass man sich mit den Regeln der :ref:`XML Syntax <xml-format>`
auseinander setzen muss.

Aufbau
------

Der Editor besteht aus drei Teilen:

.. figure:: _static/editor.png

Oben ist eine Menü-Leiste, links wird die Struktur der Konfiguration dargestellt
und rechts können die Attribute für ein Element angepasst werden.

Die Optinen der Menüleiste sind:

save
  Speichert den aktuellen Stand der Konfiguration.

complex
  Schaltet erweiterte Konfigurationsmöglichkeiten frei.

preview
  Zeigt eine Vorschau des aktuellen Stands der Konfiguration an ohne die
  bestehende Version zu überschreiben.

manager
  Kehrt zum :ref:`Manager <manager>` zurück.

Bedienung
---------

Wenn links ein Element angeklickt wird, so erscheint rechts eine Tabelle mit den
dazugehörigen Attributen, wenn für diesen Element-Typen verfügbar.

Um weitere Elemente hinzuzufügen, muss man das zukünftige Eltern-Element mit
der rechten Maustaste anklicken.

.. figure:: _static/editor_node_right_click.png

In dem dann erscheinenden Kontext-Menü gibt es Optionen für:

add child
  Ein Kind-Element hinzufügen.

remove
  Element löschen.

cut
  Element ausschneiden.

copy
  Element kopieren.

paste
  Ausgeschnittenes oder kopiertes Element einfügen.

sort
  Elemente umsortieren (wenn an dieser Stelle möglich).

.. figure:: _static/editor_sort.png

Um Elemente zu sortieren wird bei einem im Kontext-Menü "sort" ausgewählt. In
der dann erscheinenden Darstellung kann durch Klicken auf einen der gelben
Platzhalter dieses Element dorthin verschoben werden.