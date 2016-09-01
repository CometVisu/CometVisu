***************************
Konfiguration der CometVisu
===========================
Die Konfiguration der CometVisu erfolgt durch Bearbeiten der XML-formatierten
Konfigurationsdatei „visu_config.xml“ im jeweiligen Unterverzeichnis "./config"
der CometVisu-Installation. Dies kann entweder mit einem textbasierten Editor oder
mit dem integrierten grafischen Editor erfolgen. Die Verwendung des grafischen Editors
setzt jedoch voraus, dass die CometVisu von einem PHP-fähigen Webserver (z.B Apache oder
Lighttpd) ausgeliefert wird und die Konfigurationsdatei durch diesen beschreibbar ist.

Je nach verwendetem Backend und der Vorgehensweisen bei der Installation befindet
sich der CometVisu-Verzeichnisbaum an unterschiedlichen Stellen:

- Soll die CometVisu mit Hilfe des knxd-daemons unmittelbar an den KNX-Bus-Telegrammverkehr angebunden werden (KNX ist dann das Backend), wird die CometVisu manuell in den Vezeichnisbaum "/var/www/visu…" des Webservers (z.B. Apache oder Lighttpd) installiert. Der Webserver lauscht in der default-Einstellung in der Regel am Port 80.

- Wird openHAB als Backend für die CometVisu eingesetzt, müssen sich die CometVisu-Dateien im openHAB-Verzeichnisbaum befinden. Der openHAB-eigene Webserver wird in der default-Einstellung über Port 8080 angesprochen und ist nicht php-fähig. In diesem Fall muß man sich mit einem texbasierten Editor begnügen oder den wohlmöglich parallel laufenden Webserver (z.B. Apache oder Lighttpd) "umlenken“.

- Wurde openHAB automatisiert via apt-get installiert, wird die CometVisu manuell in "/usr/share/openhab/webapps/visu…" installiert.

- Wurde openHAB manuell z.B. in "/opt/openHAB" installiert, wird die CometVisu manuell in "/opt/openhab/www/visu..." installiert.

.. TODO::

    Wird openHAB2 als backend für die CometVisu eingesetzt, ...  

Soll die XML-formatierte Konfigurationsdatei „visu_config.xml“ durch den
(fortgeschrittenen) Anwender direkt bearbeitet werden, ist es sehr ratsam,
hierzu einen XML-fähigen Editor zu verwenden, welcher u.a. die Syntax der besseren
Lesbarkeit einfärbt (z.B. Textwrangler auf MacOSX, WordPad++, Notepad++ oder
MS XML Editor 2007 unter Windows und unter Linux z.B. vi mit ":syntax on").

Allgemeine Informationen über das CometVisu XML Format findet man
:doc:`hier <xml-format>`, Informationen zu den einzelnen
Widgets in den jeweiligen Unterseiten.

Nach dem Speichern ist keinerlei Neustart von Prozessen nötig, jedoch
sollte man die Seite neu laden und den Browser-Cache löschen.

Wenn die XML Datei ungültig ist wird beim Laden der Visu im Webbrowser
eine Fehlermeldung angezeigt. Diese gibt im Normalfall schon genaue
Hinweise wo in der Datei der Fehler liegt. Man kann die Überprüfung (und
Darstellung) auch mit dem Link "Check Config" in der Fusszeile oder
durch Anhängen von check\_config.php an den URL erzwingen.

.. _visu-config-details:

Seiten und Struktur der CometVisu
---------------------------------

.. TODO::

    - Aufbau der Konfiguration (Grundstruktur)
    - *Attribute*: Allgemein erklären
    - *Elemente*: Allgemein erklären


Navigationselemente in der CometVisu
------------------------------------

.. TODO::

    Beschreibung

Die verfügbaren Designs
------------------------

.. toctree::
    :glob:
    :maxdepth: 1

    designs/*

.. TODO::

    Weitere Beispielseiten für die anderen Designs


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
