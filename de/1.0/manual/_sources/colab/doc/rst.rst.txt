Die RST-Syntax
==============

Überschriften
-------------

Überschriften werden in RST durch "unterstreichen" des Textes mit bestimmten Sonderzeichen definiert.
Zu beachten ist hier, das die Sonderzeichen mindestens genauso lang sind wie der Text selbst.
Auch wenn die RST-Syntax bei der Benutzung der Sonderzeichen relativ tolerant ist, wird für die CometVisu Dokumentation
folgende Definition festgelegt.

.. code-block:: rst

    ######################
    Komplette Teilbereiche
    ######################

    *******
    Kapitel
    *******

    Sektionen
    =========

    Unter-Sektionen
    ---------------

    Unter-Unter-Sektionen
    ^^^^^^^^^^^^^^^^^^^^^

    Paragraphen
    """""""""""

Die kompletten Teilbereiche, sind den Teilen Api, Benutzerhandbuch und Tutorials vorbehalten und dürfen ansonsten
innerhalb der Dokumentation nicht vorkommen, alle anderen können mit bedacht verwendet werden.

Inline Markup
-------------

Soll der Text in der Dokumentation besonders formatiert (z.B. fett, kursiv, usw.) oder
Referenzen / Links eingebaut werden benötigt man eine spezielle Syntax innerhalb des Textes.

Zur Formatierung eines Textes, wird der Text ebenfalls von Sonderzeichen umrahmt, so kann man ein Wort z.B. fett
formatieren indem man in mit zwei Sternchen umfasst (`**fetter Text**`), weitere Möglichkeiten sind.

* **Fett**: ``**fetter Text**`` => **fetter Text**
* **Kursiv**: ``*kursiver Text*`` => *kursiver Text*
* **Code-Beispiele**: ````Code im Text```` => ``Code im Text``

Listen
^^^^^^

Für unnummerierte Listen wird jede Zeile mit ``*`` gestartet, bei nummerierten mit ``#.``. Mit entsprechender
Einrückung der Zeilen sind auch verschachtelte Listen möglich.

Links und Referenzen
^^^^^^^^^^^^^^^^^^^^

Die Grundsätzliche Syntax von Links enthält einen Title und den Link selbst in folgender Struktur:
```Titel des Links <URL des Links>`__``. Natürlich kann man auch auf andere Dokumente innerhalb der Dokumentation verweisen:
``:doc:`Titel <relativer/pfad/zum/document>```. Zu beachten ist hierbei, dass man die `.rst` Dateiendung weglassen muss.
Möchte man also ein Dokument namens *dok.rst* im Unterverzeichnis *test* verlinkten, sieht das so aus:
``:doc:`test/dok```. Der Titel des Links ist optional, wird er weggelassen, wird der Seitentitel des verlinkten Dokuments
als Titel benutzt (also die Überschrift auf der höchsten Ebene innerhalb des Dokuments).


Direktiven
----------

Für Dinge die über reinen Text hinaus gehen (z.B. Bilder, Hinweise, Warnungen, usw.) werden Direktiven verwendet.
Diese dürfen im Gegensatz zum bereits behandelten *inline Markup* nicht in der selben Zeile wie der "normale" Text
stehen sondern benötigen eine Leerzeile vor und hinter der Direktive. Direktiven bestehen aus einem Namen, Parametern
Optionen und dem Inhalt und sind immer nach folgendem Prinzip aufgebaut:

.. code-block:: rst

   .. <name>:: <parameter1> <parameter2> ...
        :<option1>: <optionswert1>
        :<option2>: <optionswert2>
        ....

        <Inhalt der Direktive>

Eine Direktive startet immer mit 2 Punkten gefolgt von einem Leerzeichen. Darauf folgt der Name und dann direkt, ohne
Leerzeichen 2 Doppelpunkte. Weiterhin zu beachten ist, dass die Optionen durch Doppelpunkte eingefasst und durch eine Leerzeile
vom Inhalt getrennt sind, außerdem sind Optionen und Inhalt eingerückt.

Das einzige, was zwingend erforderlich ist, ist der Name. Parameter, Optionen und Inhalt sind optional und unterscheiden
sich in Menge und vorhandensein von Direktive zu Direktive. Im folgenden werden nun die wichtigsten Direktiven vorgestellt.

Text-Blöcke
^^^^^^^^^^^

Einfache Direktiven, mit denen ein farblich hervorgehobener Textblock mit vorgegebenem Titel erstellt werden können,
um damit Hinweise, Informationen, Warnungen usw. zu definieren. Diese Direktiven haben keine Parameter und Optionen,
lediglich einen Inhalt.

Mögliche Textblöcke sind: attention, caution, danger, error, hint, important, note, tip, warning.
Möchte man den Leser also z.B. auf etwas wichtiges Hinweisen, kann man folgendes schreiben.

.. code-block:: rst

    .. IMPORTANT::

        Dies ist ein wichtiger Hinweis.

Was dann so formatiert wird:

.. IMPORTANT::

    Dies ist ein wichtiger Hinweis.

Bilder
^^^^^^

Bilder werden mit der *figure*-Direktive eingebunden. Es gibt zwar auch eine *image*-Direktive,
aber die *figure*-Direktive erlaubt komplexe Bildunterschriften.

.. code-block:: rst

    .. figure:: <pfad-zum-bild>

        Dies ist die Bildunterschift

Die komplette Syntax dieser Direktive kann in der
`offiziellen Dokumentation <http://docutils.sourceforge.net/docs/ref/rst/directives.html#figure>`__
nachgelesen werden.

.. include:: directives.rst