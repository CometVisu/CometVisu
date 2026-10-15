Automatisierte Tests
====================

Die CometVisu nutzt zwei Arten von automatisierten Softwaretests: Unittests und End-to-End Tests.
Bei Unittest geht es darum einzelne Funktionen innerhalb des Sourcecodes zu testen. 
Wenn man z.B. eine `add`-Funktion hat, die zwei Zahlen addiert, dann ruft ein Unittest diese 
Funktion auf, übergibt ihr zwei Zahlen und prüft ob das Ergebnis korrekt ist.

End-to-End Tests prüfen eher das "Große Ganze" und simulieren das Benutzerverhalten.
Hierbei wird also die CometVisu voll-automatisiert in einem Browser geöffnet und die Tests
bedienen die Visu wie ein Benutzer und prüfen ob eine Aktion die gewünschten Veränderungen bewirkt.
Zu kann man z.B. prüfen ob das Klicken auf einen Switch den passenden Wert an das Backend liefert und
wenn das Backend ein Update für den Switch liefert, dieser diesen entsprechend anzeigt.

Unittests
---------

Als Testrunner für die Unittests kommt `Karma <https://karma-runner.github.io>`__ zum Einsatz.
Ausgeführt werden die Tests über das Kommandozeilen-Tool Grunt.
Falls noch nicht geschehen, müssen also einmalig folgende Kommandos im Wurzelverzeichnis des
CometVisu Projekts zur Vorbereitung ausgeführt werden.

.. code-block:: bash

    npm install
    sudo npm -g install grunt-cli


Die vorhandenen Unittests kann man dann mit folgendem Befehl ausführen:

.. code-block:: bash

    grunt karma:ci


Dies führt die Tests inkl. eine Code-Coverage Analyse aus. Die Code-Coverage zeigt als Ergebnis an wie viel
Prozent des Sourcecodes durch Tests abgedeckt wurde, die Ausgabe sieht so aus:

.. code-block:: bash

    =============================== Coverage summary ===============================
    Statements   : 42.14% ( 1308/3104 )
    Branches     : 32.35% ( 584/1805 )
    Functions    : 46.99% ( 211/449 )
    Lines        : 41.8% ( 1233/2950 )
    ================================================================================


Einen ausführlicheren Coverage Report findet man unter ``./coverage/<browser-name>/index.html``. Wobei
der Browser Name dem des ausführenden Browsers entspricht. Zur Zeit ist dies der für Headless-Testing
entwickelte (auf Chrome basierende) PhantomJS. Theoretisch sind hier aber alle auf dem lokalen System
installierten Browser möglich. In dem ausführlichen Coverage Report, kann man bis hinunter in einzelne
Sourcecode Dateien navigieren und dort sehen, welche Zeilen noch nicht getestet wurde. Das ist sehr 
nützlich, um zu sehen an welchen Stellen die Tests noch vervollständigt werden müssen

Eigene Tests schreiben
----------------------

Die Unittests werden mit Hilfe des `Jasmine Frameworks <http://jasmine.github.io/2.4/introduction.html>`__ 
geschrieben. Dadurch ist es möglich, die Tests fast in natürlicher Sprache zu schreiben. Der Grundaufbau eines
Tests sieht so aus:

.. code-block:: javascript

	describe("Meine Testsuite", function() {
	  it("should add two numbers", function() {
	    expect(add(4, 5).toBe(9);
	  });
	});

Dieser Code testet eine ``add``-Funktion die einfach zwei Zahlen addiert.

Zu finden sind die vorhandenen Tests im ``source/test/karma`` Unterverzeichnis. Möchte man nun einen neuen Test für eine (fiktive)
Sourcecode Datei unter ``source/ui/structure/pure/NewWidget.js`` schreiben, legt man die neue Datei
``source/test/karma/ui/structure/pure/NewWidget-spec.js`` an.
Wichtig ist hier, dass der Name der Testdatei auf ``-spec`` endet, sonst wird sie vom Testrunner nicht gefunden.

Der Test für diese Datei sollte nun folgendermaßen aussehen:

.. code-block:: javascript

    describe("testing the new-widget", function() {

      it("should test the creation of a new-widget", function() {
        // Hilfsfunktion die den HTML-Code des widgets erzeugt (weitere Hilfsfunktionen sind in source/test/karma/helper-spec.js zu finden)
        // die Hilfsfunktion gibt ein Array mit 2 Elementen zurück, das erste ist die Instanz den Widget-Objekts, das zweite der HTML-Code als String
        var res = this.createTestWidgetString("new-widget", {}, "<label>Test</label>");
        // macht aus dem String ein DOM Element
        var widget = (function(){var div=document.createElement('div');div.innerHTML=res[1];return div.childNodes[0];})();
        // das Widget Object (Instanz der Klasse cv.ui.structure.pure.NewWidget)
        var obj = res[0];

        // prüft ob das DOM Element die CSS Klasse newwidget hat
        expect(widget).toHaveClass('newwidget');
        // prüft ob das DOM Element ein Label mit dem Text 'Test' hat
        expect(widget).toHaveLabel('Test');
        // prüft ob der widget Pfad 'id_0' ist
        expect(obj.getPath()).toBe("id_0");
      });

      it("should test another part of the new-widget", function() {
        // weitere Tests
      });

      ...

    });


Als Beispiele, wie man Tests schreibt und welche Dinge man wie testen kann, sollten die vorhandenen Tests dienen.
