Konfiguration der CometVisu
===========================
Die Konfiguration der CometVisu erfolgt durch Bearbeiten der Konfigurationsdatei „visu_config.xml“ im jeweiligen Unterverzeichnis …/visu/config der CometVisu-Installation. Die im XML-formatierte Konfiguratiosdatei kann entweder mit einem textbasierten Editor oder mit dem grafischen Editor erfolgen. Die Verwendung des grafischen Editors setzt jedoch voraus, daß die Konfigurationsdatei entsprechend in die Struktur eines php-fähigen Webservers (z.B. apache oder lighttdp) eingebunden und beschreibar ist.

Je nach verwendetem backend und der Vorgehensweisen bei der Installation befindet sich der CometVisu-Verzeichnisbaum an unterschiedlichen Stellen:

- Soll die CometVisu mit Hilfe des knxd-daemons unmittelbar an den KNX-Bus-Telegrammverkehr (backend=KNX) angebunden werden, wird die CometVisu in der Regel manuell in den Vezeichnisbaum des Webservers (z.B. apache oder lighttpd) installiert.
- /usr/share/openhab/webapps/visu… (bei automatisierter Installation via apt-get)
- /opt/openhab/www/visu… (bei manueller Installation)
- …

und  Im Normalfall wird der Webserver über Port 80 angesprochen.

Wird openHAB als backend für die CometVisu eingesetzt, müssen sich die CometVisu-Dateien im openHAB-Verzeichnisbaum befinden. Der openHAB-eigene Webserver wird in der default-Einstellung über Port 8080 angesprochen und ist nicht php-fähig. In diesem Fall muß man sich mit einem texbasierten Editor begnügen oder „apache / lighttdp umlenken“.

Wird openHAB2 als backend für die CometVisu eingesetzt, ….. 


Der Editor bearbeitet direkt diese Konfigurationsdatei. Hierfür muss die
Konfigurationsdatei für den Webserver Prozess (oder alle Prozesse)
beschreibar sein.

Die Konfiguration ist XML formatiert und kann von fortgeschrittenen
Anwendern auch direkt bearbeitet werden. (Man sollte dafür dann einen
Editor nutzen, der mit XML umgehen kann und/oder die Syntax einfärbt
(z.B. Textwrangler auf MacOSX, WordPad++ oder MS XML Editor 2007 unter
Windows und unter Linux z.B. vi mit ":syntax on").

Allgemeine Informationen über das CometVisu XML Format findet man
`hier <CometVisu/XML-Elemente>`__, Informationen zu den einzelnen
Widgets in den jeweiligen Unterseiten.

Nach dem Speichern ist keinerlei Neustart von Prozessen nötig, jedoch
sollte man die Seite neu laden und den Browser-Cache löschen.

Wenn die XML Datei ungültig ist wird beim Laden der Visu im Webbrowser
eine Fehlermeldung angezeigt. Diese gibt im Normalfall schon genaue
Hinweise wo in der Datei der Fehler liegt. Man kann die Überprüfung (und
Darstellung) auch mit dem Link "Check Config" in der Fusszeile oder
durch Anhängen von check\_config.php an den URL erzwingen.

Seiten und Struktur der CometVisu
---------------------------------

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

    Hinzufügen der alten Inhalte (RRD-Beispiele, Animierter Hydraulikplan)
