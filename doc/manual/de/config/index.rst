Konfiguration der CometVisu
===========================

Grundsätzliches
^^^^^^^^^^^^^^^

Zur Visualisierung und zum Auslösen von Aktionen wie z.B. Schalten oder
Jalousien verfahren bedient sich CometVisu sogenannter Widgets. Widgets
können als grafische Bausteine verstanden werden, die auf einer darzustellenden
Seite (page) angeordnet werden.
Ein Widget besteht aus dem eigentlichen sichtbaren Bereich, der Maus-
oder Tastereignisse empfängt und weiterleitet und aus nicht sichtbaren Objekten,
durch welche die Funktionsweise des Widget detaillierter festgelegt werden.

Es wird zwischen Widgets zur

- Bedienung (hier z.B. das switch-Widget zum Schalten),

- Darstellung (diese haben ausschließlich informative Funktion),

- Anordnung oder Gruppierung anderer Widgets oder zur Navigation innerhalb der verschiednen Seiten der Visualisierung (Sonstige Widgets)

unterschieden.

Eine kleine Ausnahme stellen die Plugin-Widgets dar. Diese müssen vor Verwendung
in der “meta-Sektion” der Konfigurationsdatei eingebunden sein.


Anbindung an das Backend
^^^^^^^^^^^^^^^^^^^^^^^^

Je nach verwendetem Backend und der Vorgehensweisen bei der Installation befindet
sich der CometVisu-Verzeichnisbaum an unterschiedlichen Stellen:

- Soll die CometVisu mit Hilfe des knxd-daemons unmittelbar an den KNX-Bus-Telegrammverkehr angebunden werden (KNX ist dann das Backend), wird die CometVisu manuell in den Vezeichnisbaum "/var/www/visu…" des Webservers (z.B. Apache oder Lighttpd) installiert. Der Webserver lauscht in der default-Einstellung in der Regel am Port 80.

- Wird openHAB als Backend für die CometVisu eingesetzt, müssen sich die CometVisu-Dateien im openHAB-Verzeichnisbaum befinden. Der openHAB-eigene Webserver wird in der default-Einstellung über Port 8080 angesprochen und ist nicht php-fähig. In diesem Fall muß man sich mit einem texbasierten Editor begnügen oder den wohlmöglich parallel laufenden Webserver (z.B. Apache oder Lighttpd) "umlenken“.

- Wurde openHAB automatisiert via apt-get installiert, wird die CometVisu manuell in "/usr/share/openhab/webapps/visu…" installiert.

- Wurde openHAB manuell z.B. in "/opt/openHAB" installiert, wird die CometVisu manuell in "/opt/openhab/www/visu..." installiert.

.. TODO::

    Wird openHAB2 als backend für die CometVisu eingesetzt, ...  


Bearbeiten der Konfigurationsdatei „visu_config.xml
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Die Konfiguration der CometVisu erfolgt durch Bearbeiten der XML-formatierten
Konfigurationsdatei „visu_config.xml“ im jeweiligen Unterverzeichnis "./config"
der CometVisu-Installation. Dies kann entweder mit einem textbasierten Editor
oder mit dem integrierten grafischen Editor erfolgen.

Soll die XML-formatierte Konfigurationsdatei „visu_config.xml“ durch den
(fortgeschrittenen) Anwender direkt bearbeitet werden, ist es sehr ratsam,
hierzu einen XML-fähigen Editor zu verwenden, welcher u.a. die Syntax der besseren
Lesbarkeit einfärbt (z.B. Textwrangler auf MacOSX, WordPad++, Notepad++ oder
MS XML Editor 2007 unter Windows und unter Linux z.B. vi mit ":syntax on").

Allgemeine Informationen über das CometVisu XML Format findet man
`hier <CometVisu/XML-Elemente>`__, Informationen zu den einzelnen
Widgets in den jeweiligen Unterseiten.

Die Verwendung des grafischen Editors setzt jedoch voraus, dass die CometVisu von einem php-fähigen
Webserver (z.B Apache oder Lighttpd) ausgeliefert wird und die Konfigurationsdatei
durch diesen beschreibbar ist.

Nach dem Speichern ist keinerlei Neustart von Prozessen nötig, jedoch
sollte man die Seite neu laden und den Browser-Cache löschen.

Wenn die XML Datei ungültig ist wird beim Laden der Visu im Webbrowser
eine Fehlermeldung angezeigt. Diese gibt im Normalfall schon genaue
Hinweise wo in der Datei der Fehler liegt. Man kann die Überprüfung (und
Darstellung) auch mit dem Link "Check Config" in der Fusszeile oder
durch Anhängen von check\_config.php an den URL erzwingen.







Seiten und Struktur der CometVisu
---------------------------------



Der Aufbau einer Visualisierung beginnt normalerweise mit dem Skizzieren eines
groben Konzepts dessen, was man wie und wo darstellen möchte. Dreh- und Angelpunkt
ist hier die Startseite der Visualisierug mit Hilfe eines page-Widget.

Soll die Startseite einen Navigationsbereich enthalten, über welchen z.B. die pages
einzelner Räume ausgewählt werden sollen, wird in diese der Baustein navbar-Widget
als child eingefügt. Das navbar-Widget selbst bekommt dann wiederum pagejump-Widget
childreen mit Verweisen zu den Ziel-pages. Die Ziel-pages können an nahezu jeder
Stelle eingefügt werden, da diese über ihre Benennung angesprochen werden.

So langsam wird man dann auch schon damit beginnen wollen, die einzelnen pages mit
Leben zu füllen, wie zum Beispiel "Wieviele Schalter auf der Wohnzimmer-Seite?".
Das Prinzip ist nun schon klar:
Das page-Widget "Wohnzimmer" bekommt ein paar switch-Widget childreen, welche dann
irgendwie wahllos auf der Wohnzimmer-Seite erscheinen.
Also Kommando kurz zurück, dem page-Widget "Wohnzimmer" zuerst ein group-Widget child
zuordnen und diesem dann die gewünschten switch-Widget childreen.

Im Rahmen dieses Tuns wird man sehr schnell die child-child-Struktur des prinzipiellen
Aufbaus der CometVisu erfassen, welche in der Konfigurationsdatei durch die durch Tags
umschlossenen Verschachtelungen abgebildet wird.

Der große Vorteil des grafischen Editors zeigt sich besonders zu Beginn der Arbeit mit
der CometVisu. Der grafische Editor läßt nur mögliche child-child-Beziehungen zu und
führt eine Syntaxprüfung durch. Widgets lassen sich mit ihm verschieben und er beinhaltet
eine preview-Funktion, um Einfügungen und Änderungen unmittelbar zu visualisieren.
Vor dem "preview" aber unbedingt erst ein "save", sonst gehen alle Änderungen seit
dem letzten "save" verloren.
 
Nach und nach nimmt die Visualisierung nun Form und Gestalt an, hat aber noch keine
Funktionalität. Diese wird durch Zuordnen von Elementen einschließlich deren Attribute
für die einzelnen Widgets erreicht. Auch hier gilt wieder das child-child-Prinzip.
Am Beispiel des switch-Widget bedeutet dies, es muß das Element "address" mit den
Attributen "transform" und "mode" hinzugefügt werden.
Das Element "address" ist hierbei im Sinne einer KNX-Gruppenaddresse zu verstehen.
Mit dem Attribut "transform" wird festgelegt, ob Hilfe des knxd-daemon unmittelbar
auf wahre Gruppenadresse des KNX-Busses oder ob auf ein in openHAB definiertes item
referenziert werden soll. Das Attribut "mode" spezifiziert den Umgang mit der
"address" näher, wobei hier nur die selbsterklärenden Werte "disable", "read", "write"
und "readwrite" möglich sind (Syntaxprüfung des grafischen Editors).    

Eine Auflistung der möglichen Elemente, deren Attribute sowie deren Werte eines Widget
ist in der jeweiligen Widget-Beschreibung zu finden. Der grafische Editor regt zum
"just do it and try" an, sofern man die Reihenfolge "save -> preview" beachtet.



Arbeiten mit der Konfigurationsdatei
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Der strukturierte Aufbau der xml-formatierte Konfigurationsdatei ist in mehrere
Sektionen unterteilt, innerhalb derer alle weiteren Einträge verschachtelt und durch
Tags umschlossen aufgenommen werden.

.. TODO::

    Beschreibung

Navigationselemente in der CometVisu
------------------------------------

.. TODO::

    Beschreibung

Elemente für Konvertierung und Formatierung in der CometVisu
------------------------------------------------------------

In der CometVisu können Werte auf verschiedenste Art und Weisen
dargestellt werden. Hierfür können genutzt werden:

.. toctree::
    :hidden:
    :glob:

    *

-  :doc:`Format <format>` von Werten z.B. auf Anzahl der
   Nachkommastellen, Einheiten etc.
-  :doc:`Mapping <mapping>` erlaubt das Ersetzen von
   Zahlenwerten durch Texte (z.B. An/Aus statt 1/0) und Icons. (z.B. für
   Fensterkontakte)
-  :doc:`Styling <styling>` erlaubt das wertabhängige
   Färben von Werten (z.B. An in rot und Aus in Grün)
-  :doc:`Flavour <flavour>` ermöglich in einigen Designs
   für einige Widgets noch zusätzliche Optionen.

Widgets in der CometVisu
------------------------

Widgets sind die einzelnen Elemente aus denen eine CometVisu-Site
zusammengebaut wird. Diese können entweder fest in der CometVisu
eingebaut sein oder per Plugin-Schnittstelle intergriert.

Die Beschreibung der Widgets kann man hier nachlesen:

.. toctree::

    widgets/index

CometVisu - Beispiele
---------------------

.. TODO::

    Hinzufügen

sonstiges
---------

.. TODO::

    Hinzufügen de
