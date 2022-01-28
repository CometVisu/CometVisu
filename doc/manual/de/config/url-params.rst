.. replaces:: CometVisu/URL_parameter/de

URL-Parameter
=============

Das Verhalten der CometVisu lässt sich teilweise durch URL-Parameter
anpassen. Da sich diese Parameter mit in den Favoriten des Browsers
abspeichern lassen, kann so effektiv und schnell auf die entsprechenden
Varianten zugegriffen werden.

Verwendung
----------

Diese Parameter werden einfach hinten an die URL gehängt, durch ein "?"
(erster URL Parameter), bzw. durch ein "&" (alle weiteren URL Parameter)
getrennt.

Beispiele:

+--------------------------------------------+------------------------------------------------+
| Beschreibung                               | URL                                            |
+============================================+================================================+
| Standard                                   | http://server/visu/                            |
+--------------------------------------------+------------------------------------------------+
| Ein Parameter für eine andere Config       | http://server/visu/?config=demo                |
+--------------------------------------------+------------------------------------------------+
| Ein Parameter für ein anderes Design       | http://server/visu/?design=pure                |
+--------------------------------------------+------------------------------------------------+
| Mehrere Parameter werden mit & verknüpft   | http://server/visu/?config=demo&design=metal   |
+--------------------------------------------+------------------------------------------------+

Parameter
---------

*config* - Config-Datei
~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``config`` wird eine andere Config-Datei ausgewählt.

Also z.B. ``config=NAME`` - Diese Config-Datei muss dann unter dem Namen
``visu_config_NAME.xml`` entweder im config-Verzeichnis der Visu oder im
``config/demo`` Verzeichnis der Visu liegen.

*design* - Design
~~~~~~~~~~~~~~~~~

Durch den Parameter ``design`` wird das Design in der Config-Datei
übersteuert.

*forceReload* - Cache übersteuern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``forceReload`` mit dem Wert *true* (also zusammen
``forceReload=true``) werden alle Dateien sicher neu geladen.

Dies kann nach einem Anpassen der Config-Datei wichtig sein.

*startpage* - Startseite
~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``startpage`` kann die Unter-Seite festgelegt werden,
die nach dem Laden der Visu als erstes angezeigt wird.

Die einfachste Weise direkt eine bestimmte Startseite zu laden, ist es
indem man zu der gewünschten Seite navigiert und sich den Link, den der
Browser dann anzeigt speichert. Dieser enthält immer die ID der gerade
angezeigten Seite als *anchor*-Teil der URL (z.B.
``http://<server>/cometvisu/?config=home#id_6_``, zeigt die Seite mit der ID ``id_6_``).
Hierfür wird der *startpage*-Parameter gar nicht benötigt.

Zusätzlich ist es noch möglich über den *startpage*-Parameter den Namen
der Startseite anzugeben. Wenn man also eine Unterseite mit dem Namen *Bad*
als Startseite nutzen möchte so lautet die URL ``http://<server>/cometvisu/?config=home&startpage=Bad``

Gerade wenn man Visus an mehreren Orten im Haus verteilt hat, kann es
Sinn machen bei einer gesamten Config-Datei je nach Visu-Standort die
Unter-Seite als erstes anzuzeigen, die dem Raum entspricht.

*forceDevice* - Ausgabegerät übersteuern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``forceDevice`` kann durch den Wert ``mobile`` auch
an "großen" Geräten die Seite so wie auf einem kleinen, mobilen Gerät
(z.B. Smartphone) dargestellt werden. Bei jedem anderen Wert wird die
Seite (auch auf Mobilgeräten) wie am PC dargestellt.

Dies wird eigentlich nur für Entwickler benötigt.

*maturity* - Ausgereiftheit
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``maturity`` kann man Features freischalten, die
noch in Entwicklung sind und somit unbeabsichtigte Querwirkungen haben.

.. code::

    Default: release (maturity=release)
    Options: release (maturity=release), development (maturity=development)

Dies sollte nur von Entwicklern benutzt werden!

*backend* - Backend
~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``backend`` wird das verwendete Backend zur Laufzeit
konfiguriert. Es existiert auch ein ``backend`` Parameter in der Config
um dies fest einzustellen.

.. code::

    Default: cgi-bin (backend=cgi-bin)
    Options: cgi-bin (backend=cgi-bin), oh (backend=oh), oh2 (backend=oh2)

Der Default-Wert "cgi-bin" (Achtung, inkonsistent mit xml Element,
default="cgi"!) ist normalerweise richtig und braucht nicht geändert
werden. "r", "w" und "l" liegen dabei in /cgi-bin/.

Bei der Option "oh" wird der für OpenHAB notwendige Pfad verwendet.

*enableQueue* - Queue
~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``enableQueue`` wird beeinflusst ob von der CV alle
oder nur die auf der aktuellen Seite benötigten Gruppenadressen
abgefragt werden. Dies kann unter Umständen zu Performanceverbesserungen
führen.

.. code::

    Default: 0 (enableQueue=0)
    Options: 0 (enableQueue=0), 1 (enableQueue=1)

Dies ein experimentelles Feature, welches unter Umständen nicht wie
gedacht funktioniert, deswegen ist es derzeit standardmäßig
abgeschaltet.

*testMode* - Testmodus ohne echtes Backend
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``testMode`` kann man die CometVisu rudimentär testen ohne
ein laufendes Backend im Hintergrund zu haben. Normalerweise sendet die CometVisu
bei der Betätigung eines Switches den Einschaltwert auf der definierten Adresse zum
Backend. Das Backend liefert dann die entsprechende Rückmeldung über die Statusänderung,
welche die CometVisu dann wiederum anzeigt. Fehlt ein Backend, kann man die Bedienelemente der CometVisu
nicht wirklich testen, weil ohne Rückmeldung die Statusänderung fehlt und man so z.B.
eine Switch niemals einschalten kann. Mit dem TestMode wird der zum Backend gesendete Befehl einfach als
Statusupdate wieder zurück zur CometVisu geschickt und somit ein einfaches Backend simuliert.

Dieses simulierte Backend bietet aber, wie schon erwähnt, nur rudimentäre Funktionen. Hat man z.B.
wie in der KNX-Welt üblich unterschiedliche Sende- und Rückmeldeadressen, wird dies mit dem TestMode nicht
funktionieren.

.. code::

    Default: 0 (testMode=0)
    Options: 0 (testMode=0), 1 (testMode=1)

.. _enableCache:

*enableCache* - Caching aktivieren
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Durch den Parameter ``enableCache`` kann das Caching konfiguriert werden. Dieses bewirkt, dass eine Config
nicht bei jeden Laden komplett neu eingelesen wird und daraus eine HTML-Seite generiert wird, sondern dass
die gerenderte HTML-Struktur inkl. aller weiterer benötigter Daten lokal im Browser gespeichert werden
(im LocalStore). Bei jedem weiteren Laden der Config werden die Daten also aus dem Cache gelesen, was
das Laden der Visu auf leistungsschwachen Geräten wie z.B. Smartphones beschleunigt.

Der Cache kann über diesen Parameter aktiviert (=true), deaktiviert (=false) oder gelöscht werden (=invalid).
Das Löschen bewirkt, dass alle Werte aus dem Cache gelöscht werden und neu angelegt werden.

.. code::

    Default: Im Release: true, in der Entwicklerversion: false
    Options: false (enableCache=false), true (enableCache=true), invalid (enableCache=invalid)

.. _reporting:

*reporting* - Session aufzeichnen
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Zur Unterstützung einer Fehlermeldung, kann die Interaktion mit der CometVisu aufgezeichnet und
den Entwicklern als Replay-Datei zu Verfügung gestellt werden. Diese können damit genau sehen, welche Daten
zwischen der CometVisu und dem Backend geflossen sind und welche Aktionen der Benutzer vorgenommen hat.
Idealerweise lässt sich ein Fehler mit diesen Dateien zuverlässig reproduzieren und erleichtert so die Behebung
des Problems erheblich.

.. code::

    Default: false (reporting=false)
    Options: true  (reporting=true), false (reporting=false)

.. ATTENTION::

    In den replay-Dateien wird die komplette Konfigurationsdatei abgespeichert. Sollten sich Zugangsdaten in dieser
    Konfiguration befinden, sollte eine Kopie der Konfiguration ohne solch sensible Daten erstellt werden
    und die Session mit dieser Konfiguration aufgezeichnet werden.

    Daten aus der :ref:`verstecken Konfiguration <hidden-config>` werden nicht mit übertragen.

Um diese Replay-Dateien aufzuzeichnen, muss man die CometVisu mit dem URL-Parameter `reporting=true` im Querystring laden.
Nachdem man den fehlerhaften Zustand erreicht hat, kann man die Replay-Datei herunterladen indem man in der
Browser-Console (öffnen mit F12) ``downloadLog()`` ein gibt und mit *enter* bestätigt.
Neben dem automatischen Download der Datei, wird der Inhalt ebenfalls auf der Konsole
ausgegeben. So kann man kontrollieren, welche Daten enthalten sind.

.. HINT::

    Da die Replay-Dateien in Echtzeit abgespielt werden, empfiehlt es sich die Laufzeit möglichst kurz zu halten.
    Eine Replay-Datei die 30 Minuten oder mehr läuft bis das Problem zu sehen ist, wird die Fehlerbehebung
    erschweren, da der Entwickler diese ggf. sehr oft abspielen muss während der Fehleranalyse und -behebung.

.. _reportErrors:

*reportErrors* - Fehlermeldungen automatisch an sentry.io senden
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Eine weitere Möglichkeit die Entwickler bei der Verbesserung der CometVisu zu unterstützen, ist das Aktivieren
der automatischen Fehlerberichte. Diese Berichte werden bei Auftreten eines Fehlers teilweise komplett automatisch
an einen Webdienst geschickt (sentry.io), welcher diese sammelt, aufbereitet und die CometVisu-Entwickler benachrichtigt.

Da hierzu neben dem Fehler auch viele Informationen über z.b. den eingesetzten Browser zu sentry.io geschickt werden,
muss diese Funktionalität explizit eingeschaltet werden über diesem URL-Parameter.

.. code::

    Default: false (reportErrors=false)
    Options: true  (reportErrors=true), false (reportErrors=false)

Um die Fehlerreports zu aktivieren muss die CometVisu mit `reportErrors=true` geladen werden. Die Fehlerdialoge
der CometVisu bieten dazu die Option, die CometVisu mit diesem Parameter neu zu laden, sollte das noch nicht passiert sein.
Dann kann der Benutzer versuchen, den Fehler erneut zu reproduzieren und dann einen Fehlerbericht mit weiteren
Erklärungen an sentry.io schicken.

.. _log:

*log* - Debug-Meldungen in der Browserconsole an-/abschalten
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mit diesem Parameter können die Debug-Meldungen auf der Browserkonsole ein- und ausgeschaltet werden.
In der Entwicklerversion sind diese standardmäßig eingeschaltet in einem Release aus.

.. code::

    Default: false im Release, true in Entwicklerversion
    Options: true  (log=true), false (log=false)


.. _worker:

*worker* - ServiceWorker Cache in der Entwicklerversion einschalten

In der Entwicklerversion ist der ServiceWorker zum Caching der Dateien abgeschaltet, damit man Änderungen
während des Entwickelns beim neu Laden direkt testen kann. Mit diesem URL-Parameter kann der ServiceWorker
trotzdem eingeschaltet werden

.. code::

    Default: false (worker=false)
    Options: true  (worker=true) [nur in Entwicklungsversion, in einem Release hat dieser Parameter eine Funktion]
