Automatisierte Tests
====================

Die CometVisu nutzt zwei Arten von automatisierten Softwaretests: Unittests und End-to-End Tests.
Bei Unittest geht es darum einzelne Funktionen innerhalb des Sourcecodes zu testen. 
Wenn man z.B. eine `add`-Funktion hat, die zwei Zahlen addiert, dann ruft ein Unittest diese 
Funktion auf, übergibt ihr zwei Zahlen und prüft ob das Ergebnis korrekt ist.

End-to-End Tests prüfen eher das "Große Ganze" und simulieren das Benutzervehalten.
Hierbei wird also die CometVisu voll-automatisiert in einem Browser geöffnet und die Tests
bedienen die Visu wie ein Benutzer und prüfen ob eine Aktion die gewünschten Veränderungen bewirkt.
Zu kann man z.B. prüfen ob das Klicken auf einen Switch den passenden Wert an das Backend liefert und
wenn das Backend ein Update für den Switch liefert, dieser diesen entsprechend anzeigt.

Unittests
----------

Als Testrunner für die Unittests kommt `Karma <https://karma-runner.github.io>`__ zum Einsatz.
Ausgeführt werden die Tests über das Kommandozeilen-Tool Grunt.
Falls noch nicht geschehen, müssen also einmalig folgende Kommandos im Wurzelverzeichnis des
CometVisu Projekts zur Vorbereitung ausgeführt werden.

.. code-block:: bash

    npm install
    sudo npm -g install grunt-cli


Die vorhandenen Unittests kann man dann mit folgendem Befehl ausführen:

.. code-block:: bash

    grunt karma:travis


Dies führt die Tests inkl. eine Code-Coverage Analyse aus. Die Code-Coverage zeigt als Ergebnis an wieviel
Prozent des Sourcecodes durch Tests abgedeckt wurde, die Ausgabe sieht so aus:

.. code-block:: bash

    =============================== Coverage summary ===============================
    Statements   : 42.14% ( 1308/3104 )
    Branches     : 32.35% ( 584/1805 )
    Functions    : 46.99% ( 211/449 )
    Lines        : 41.8% ( 1233/2950 )
    ================================================================================


Einen ausführlicheren Coverage Report findet man unter ``./coverage/<browser-name>/index.html``. Wobei
der Browser Name dem des den ausführenden Browsers entspeicht. Zur Zeit ist dies der für Headless-Testing
entwickelte (auf Chrome basierende) PhantomJS. Theoretisch sind hier aber alle auf dem lokalen System
installierten Browser möglich. In dem ausführlichen Coverage Report, kann man bis hinunter in einzelne
Sourcecode Dateien navigieren und dort sehen, welche Zeilen noch nicht getestet wurde. Das ist sehr 
nützlich, um zu sehen an welchen Stellen die Tests noch verfollständigt werden müssen

Eigene Tests schreiben
----------------------

Die Unittests werden mit Hilfe des `Jasmine Frameworks <http://jasmine.github.io/2.4/introduction.html>`__ 
geschrieben. Dadurch ist es möglich die Test fast in natürlicher Sprache zu schreiben. Der Grundaufbau eines
Tests sieht so aus:

.. code-block:: javascript

	describe("Meine Testsuite", function() {
	  it("should add two numbers", function() {
	    expect(add(4, 5).toBe(9);
	  });
	});

Dieser Code testet eine ``add``-Funktion die einfach zwei Zahlen addiert.

Zu finden sind die vorhandenen Tests im ``test/karma`` Untervezeichnis. Möchte man nun einen neuen Test für eine (fiktive)
Sourcecode Datei unter ``src/structure/pure/new-widget.js`` schreiben, legt man die neue Datei ``test/karma/structure/pure/new-widget-spec.js`` an.
Wichtig ist hier, dass der Name der Testdatei auf ``-spec`` endet, sonst wird sie vom Testrunner nicht gefunden.

Innerhalb der Testdatei gibt es jetzt noch eine Besonderheit zu beachten. Die CometVisu nutzt `RequireJS <http://requirejs.org>`__
um Javascript Module zu laden (vergleichbar mit der ``import`` Anweisung in anderen Programmiersprachen). Man muss nun also
natürlich zunächst die Source-Datei die man testen möchte auf diesem Weg laden. Man braucht nun also zunächst den Modulnamen der zu
testenden Datei. Diese werden in der ``src/main.js`` definiert, dort sollte ein Eintrag nach folgendem Muster zu finden sein
``'widget_new-widget': 'structure/pure/new-widget',``.

Der Test für diese Datei sollte nun folgendermaßen aussehen (es werden hier noch 3 weitere Module importiert, die man eigentlich für die 
meisten Tests braucht und daher als default angesehen werden sollten):

.. code-block:: javascript

  define( ['TemplateEngine', '_common', 'CometVisuMockup', 'widget_new-widget'], function(engine, design, ClientMockup) {

    describe("testing the new-widget", function() {

      var templateEngine = engine.getInstance();
      templateEngine.visu = new ClientMockup();

      it("should test whatever the new-widget does", function() {
	// write your test and assertions here

      });
      it("should test another part of the new-widget", function() {
	// write another test
      });

      ...

    });
  });


Als Beispiele, wie man Tests schreibt und welche Dinge man wie testen kann, sollten die vorhandenen Tests dienen
