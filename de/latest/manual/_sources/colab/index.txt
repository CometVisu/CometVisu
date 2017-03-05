**************************
Hilf dem CometVisu Projekt
**************************

Die Mitarbeit am CometVisu Projekt ist problemlos möglich und auch höchst willkommen!
Hierbei sind nicht nur Entwickler angesprochen, die neue Features oder Bugfixes beitragen möchten, sondern
auch Anwender, die ihre eigenen Erfahrungen in die Verbesserung der Dokumentation einfliessen lassen möchten.

Allgemeine Vorbereitungen
-------------------------

Grundsätzlich gibt es keinen Unterschied in der Vorgehensweise, zwischen Änderungen am Sourcecode und Änderungen an
der Dokumentation, daher werden die Vorbereitungen dazu hier in allgemeiner Weise beschrieben. Die im folgenden beschriebenen
Schritte müssen einmalig gemacht werden.

Sowohl der Sourcecode als auch die Dokumentation werden im offiziellen Github-Repository des CometVisu-Projekts verwaltet:
`<https://github.com/CometVisu/CometVisu>`__

Um Mitzuarbeiten braucht man also einen kostenlosen Account bei Github. Ist dieser erstellt, muss man das CometVisu-Projekt
*forken*. Dazu führt man folgende Schritte aus:

#. Auf github.com einloggen
#. Auf diese Seite gehen `<https://github.com/CometVisu/CometVisu>`__
#. Auf den "Fork"-Button oben rechts klicken und den Anweisungen folgen

Damit hat man eine private Kopie des CometVisu-Repositories erstellt in dem man nach belieben eigene Ändungen vornehmen kann.
Natürlich ist es einfacher, wenn man die Dateien auf seinem lokalen Rechner hat um sie dort bearbeiten zu können.
Dazu muss man seine private Kopie des CometVisu-Repositories *clonen*. Zum lokalen Arbeiten mit den Dateien braucht man einen
*git client*. Diesen gibt es z.B. für die Kommandozeile aber auch in diversen grafischen Ausführungen. Da die Vorgehensweisen
und Begriffe bei allen Clients ähnlich sind, wird im weiteren Verlauf der Kommandozeilen-Client als Referenz benutzt.
Zum 'clonen' des Repositories führt man folgende Schritte aus:

#. Kommandozeile öffnen
#. in einen Ordner gehen in dem der Unterordner des Projekts erstellt werden soll
#. ``git clone https://github.com/<ihr-github-benutzername>/CometVisu.git`` (<ihr-github-benutzername> ersetzen durch den eigenen Benutzernamen)

das wars schon, die lokale Arbeitskopie liegt dann im *CometVisu* Unterordner. Damit sind alle Vorbereitungen getroffen.

Allgemeine Vorgehensweise
-------------------------

Wenn man nun eine Änderung durchführen möchte, sollte man sich an die hier beschriebene Vorgehensweise halten. Auch
wenn Sie auf den ersten Blick unnötig kompliziert erscheinen, vor allem wenn man nur Kleinigkeiten ändern möchte.
Die Erfahrungswerte zeigen, dass man auf Dauer weniger Probleme hat, wenn man sich immer an diesen Workflow hält und
er damit zu Gewohnheit wird. Und so sieht der Workflow aus, zunächst als Übersicht ohne Details:

1. Neuen *branch* erstellen
2. die gewünschten Änderungen durchführen
3. Änderungen im lokalen Repository speichern (das ist was anderes als "Datei speichern")
4. Die Schritte 2. + 3. können beliebig oft wiederholt werden, bis man der Meinung ist, das man alle Änderungen gemacht hat
5. Änderungen ins private Github Repository laden
6. beantragen, dass die Änderungen ins offizielle Repository übernommen werden

Und nun noch einmal dieselben Schritte im Detail:

1. Auf Kommandozeile in das Verzeichnis mit dem lokalen Repository wechseln
   ``git checkout -b name-des-branches`` (Der Name des neuen Branches kann frei gewählt werden, es darf nur kein existierender sein)
2. Die gewünschten Dateien mit einem Editor nach Wahl bearbeiten und speichern
3. ``git commit -a -m "Kurze Beschreibung der Änderung"`` (Die Beschreibung nach Möglichkeit auf Englisch formulieren). 
   Mit ``git status`` kann zunächst nochmal geprüft werden, welche Änderungen alle *commited* werden. 
4. s.o.
5. ``git push``
6. Auf die Github-Seite des private Repositories gehen und auf *new pull request* klicken.
   Auf der folgenden Seite *Comparing changes* rechts neben dem Button *head fork: <benutzername>/CometVisu* findet
   sich der Button *compare: <branch-name>*. Drauf klicken und den Branch mit den Änderungen auswählen.
   Dann bekommt man nochmal eine Übersicht mit den Änderungen und kann auf den grünen Button namens
   *Create pull request* (grüner Button oben links) klicken.
   Dann kann man nochmal Beschreiben, welche Änderungen der Pull-Request beeinhaltet.
   In der Regel ist das aber bereits ausreichend vorausgefüllt und man kann durch klicken auf
   "Create pull request" (grüner Button unten rechts). Damit ist der Pull-Request erstellt

Jetzt muss man warten bis einer der Maintainer des CometVisu-Projekts des Pull-Request *reviewed*.
Außerdem werden einige automatisierte Checks auf dem Pull-Request ausgeführt um mögliche Probleme zu erkennen.
Sollte alles in Ordnung sein, wird der Pull-Request vom Maintainer *gemerged* und damit sind die Änderungen
Teil des CometVisu-Projekts. Sollte der Maintainer Verbesserungsvorschläge haben, wird er dies durch Kommentare
im Pull-Request tun. Ist dies der Fall, kommt nun der Vorteil des im Schritt 1. erstellen extra Branches zum Tragen.
Man muss nähmlich nur die Schritte 2., 3. und 5. ausführen um die Korrekturwünsche des Maintainers auszuführen.
Damit sind die Änderungen automatisch Teil des vorhandenen Pull-Requests.

Sind alle Änderungen abgestimmt und übernommen worden, kann der Branch gelöscht werden.
``git branch -D name-des-branches``

Wenn man z.B. schon mit neuen Änderungen in einem neuen Branch begonnen hat, kann man beliebig zwischen den Branches
hin und her wechseln und so sogar mehrere Pull-Requests und Änderungen gleichzeitig bearbeiten ohne diese inhaltlich
zu vermischen. In einen anderen Branch wechseln kann man immer nach einem commit (siehe Schritt 3.) mit
``git checkout name-des-branches``.

Repositories synchron halten
----------------------------
Um die von anderen Entwicklern *gemergeden* Änderungen mit dem eigenen Fork synchron zu halten, muss ein Pull-Request  
vom privaten Repository aus gemacht werden. In der Zeile *This branch is ... commits ahead of CometVisu:develop.* zeigt 
an, wieviele Änderungen seit der letzten Synchronisierung vorgenommen wurden. Direkt daneben befindet sich der Link zum Pull-Request, 
welcher in der darauffolgenden Seite die Änderungen anzeigt, die in das private Repository *gemerged* werden können. Das
Akzeptieren aller Änderungen synchronisiert die Änderungen vom Haupt-Repository auf das private Repository.

.. figure:: doc/_static/pull_request_sync.png

   Pull Request für Synchronisation zwischen Haupt- und privaten Repository

Die lokale Kopie des privaten Repositories muss dann ebenso aktualisiert werden. Dazu muss im lokalen Repository in den Branch 
*develop* gewechselt werden, dort werden alle abgestimmten Änderungen der Entwickler *gemerged*.
``git checkout develop``  
Mit dem Befehl
``git pull``
erfolgt die Synchronisation zwischen lokalem und privatem Repository. Nachdem nun alle Repositories wieder synchron sind, kann wie 
oben unter 1. beschrieben mit neuen Änderungen an der Dokumentation fortgefahren werden. 

.. TODO::

    * weitere nützliche Git-Befehle (branches löschen, status, ...)
    * Eigenen Fork vom Haupt-Repository aktualisieren
    * Merge-Konflikte
    * Ablauf-Diagramm für Workflow Änderung -> Pull-Request

Mithilfe bei der Dokumentation
------------------------------

Die CometVisu Dokumentation wird mit Hilfe des `Sphinx - Python Documentation Generators <http://www.sphinx-doc.org/>`__
erzeugt. Geschrieben wird die Dokumentation daher im reStructuredText-Format (kurz. RST). Hierbei handelt es sich
um eine vereinfachte Auszeichnungssprache, die in der reinen Textform gut lesbar ist und den Vorteil hat, einfach
in andere Formate umgewandelt zu werden [RST-Wiki]_ .

Zum tieferen Einstieg in die Syntax des RST-Formats sind folgende Links geeignet:

* `Cheat sheet <http://openalea.gforge.inria.fr/doc/openalea/doc/_build/html/source/sphinx/rest_syntax.html>`__
* `Sphinx Dokumentation <http://www.sphinx-doc.org/en/stable/rest.html>`__

Eine allgemeine Einführung, welche sowohl die wichtigsten Grundlagen der Syntax liefert, als auch auf spezielle
in der CometVisu Dokumentation benutzten Besonderheiten eingeht, soll jedoch dieser Abschnitt liefern.
Mit dem Wissen dieses Abschnitts sollte es möglich sein, eigene Beiträge für die Dokumentation zu schreiben.

.. toctree::
    :maxdepth: 2

    doc/rst

.. toctree::
    :hidden:

    todos

.. TODO::

    * Lokales Erzeugen der HTML-Doku, inkl. Screenshots

Dokumentation schreiben mit VisualStudio Code
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Der Editor `Visual Studio Code <https://code.visualstudio.com>`__ bietet ein Plugin, mit dessen Hilfe man sich eine
Live Preview der geschriebenen Dokumentation anzeigen lassen kann. Dazu muss zunächst der Editor installiert werden und
darin die Extension ``restructuredtext`` (über den Menüpunkt Anzeigen -> Extensions suchen nach rst) installiert werden.
Nach einmaligem Neuladen des Editors steht diese zur Verfügung. 


Damit die Live Preview funktioniert muss Python installiert sein.
Eine Anleitung um die nötigen Vorraussetzungen zu schaffen findet man hier: 
`Install Sphinx <https://github.com/vscode-restructuredtext/vscode-restructuredtext/blob/master/docs/sphinx.md>`__


Ist alles korrekt eingerichtet, kann man eine RST-Datei aus der Dokumentation öffnen und mit ``Strg+Shift r`` das Live-Preview Fenster öffnen.
Änderungen an der RST-Datei, sollten dann mit kurzer Verzögerung automatisch in Preview Fenster zu sehen sein.

.. figure:: doc/_static/visual_studio_live_preview.png

   Ansicht des Editors mit Live-Preview


Mithilfe bei der Entwicklung
----------------------------

.. TODO::

    * Beschreibung der Grundstruktur, wo was zu finden ist.
    * Einführung ins Build-Systemmit *grunt*
    * Style-Guide
    * JSDoc inkl. widget-examples
    * ..

.. toctree::

    dev/test

.. [RST-Wiki] https://de.wikipedia.org/wiki/ReStructuredText