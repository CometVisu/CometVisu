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

Die Optionen der Menüleiste sind:

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

Erweitertes Setup
-----------------

Der Editor versucht den Anwender zu unterstützen in dem manche Daten als
Drop-Down-Liste vorbefüllt werden. Die meisten Daten kann der Editor
selbständig ableiten, manche benötigen aber eine Unterstützung durch den Anwender.

Adressen *(cgi-bin Backend für eibd/knxd)*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Die KNX Gruppen-Adressen für die ``<address>`` Elemente können auf dem
WireGate der dort vorhandenen Datenbank entnommen werden. Auf anderen Systemen,
die das cgi-bin Backend verwenden,
können damit kompatible Dateien über den :doc:`Manager <manager>` unter den
Medien-Dateien hochgeladen werden. Hierzu sind diese drei Dateien nötig:

eibga.conf
""""""""""

Diese Datei enthält eine Liste aller Gruppenadressen mit Beschreibung und
Datenpunkt:

.. code-block:: ini

    [1/0/42]
    short = Wohnzimmer
    DPTSubId = 1.001
    ga = 1/0/42
    name = Wohnzimmer - Indirekte Beleuchtung - EinAus
    DPTId = 1
    DPT_SubTypeName = DPT_Switch

    [1/3/42]
    short = Wohnzimmer
    DPTSubId = 5.001
    ga = 1/3/42
    name = Wohnzimmer - Indirekte Beleuchtung - Rückmeldung Wert
    DPTId = 5
    DPT_SubTypeName = DPT_Scaling

    [1/5/42]
    short = Wohnzimmer
    DPTSubId = 5.001
    ga = 1/5/42
    name = Wohnzimmer - Indirekte Beleuchtung - Wert
    DPTId = 5
    DPT_SubTypeName = DPT_Scaling

    ...

eibga_hg.conf
"""""""""""""

Diese Datei enthält die Liste der Hauptgruppen:

.. code-block:: ini

    [0]

    name = Zentral

    [1]

    name = Beleuchtung

    ...

eibga_mg.conf
"""""""""""""

Diese Datei enthält die Liste der Mittelgruppen:

.. code-block:: ini

    [0]

    name = Kontakt

    [1]

    name = Rückmeldung

    ...