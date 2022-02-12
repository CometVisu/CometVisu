*************
Tile-Struktur
*************

Die CometVisu bot seit jeher die Möglichkeit weitere Strukturen neben der vorhandenen pure-Struktur einzubinden.
Die Strukturen sind dafür verantwortlich eine Config-Datei im Browser darzustellen. Normalerweise geschieht dies
indem die Config-Datei eingelesen wird und daraus HTML-Code generiert wird.
Die Tile-Struktur geht hier einen anderen Weg, indem sie `Web-Components <https://wiki.selfhtml.org/wiki/HTML/Web_Components>`_
benutzt für spezielle Elemente und ansonsten bereits von Browser darstellbarer HTML-Code ist. Config-Dateien für die Tile-Struktur werden also
nicht in HTML-Code umgewandelt sondern direkt in den Browser geladen.

.. HINT::

    Bisherige Config-Dateien sind nicht mit der Tile-Struktur kompatibel! Dasselbe gilt für die bisher bekannten Plugins!
    Ebenso benötigen die benutzen Features einen modernen Browser (Chrome, Firefox, Safari, Edge in einer aktuellen Version)
    Der Internet Explorer wird in keiner Version unterstützt!

Neue Features:

* Multi-Backend fähig
* Flexiblerer Einsatz von `Templates <https://wiki.selfhtml.org/wiki/HTML/Web_Components/template>`_
    * Templates erklären
    * Slots erklären
    * Wie benutzt man eigene Templates in der Config (oder extern laden)
* Alternativer Ansatz für die Implementierung von Plugins

Grundsätzlicher Aufbau
======================

Wie der Name schon suggeriert setzt sich eine Visualisierung in der Tile-Struktur aus einzelnen Kacheln (engl. Tile)
zusammen. Die Inhalte in den Kacheln sind in maximal 3 Zeilen mit jeweils 3 Spalten angeordnet, wobei hier ähnlich
wie in Tabellen ein Inhaltselement mehrere Zeilen und / oder Spalten belegen kann.

+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+

Innerhalb den Zellen einer Kachel können nun die von der Tile-Struktur vordefiniertem Komponenten frei platziert werden.
Beispiele für diese Komponenten sind z.B. einfacher Text, ein Button, Bild oder komplexere Anzeigeelemente wie Charts.

Für häufig benötigte Dinge liefert die Tile-Struktur bereits Kacheln mit vor-definiertem Inhalt mit. So enthält das
Switch-Widget z.B. eine Button in der mittleren Zelle und einen zentrierte Text in der Zeile darunter.


Widgets
-------

* Switch
* Info
* Shutter
* Status
* MediaPlayer

.. toctree::

    widgets/switch


Navigation / Seitenstruktur
---------------------------

* Pages
* Navbar / MainNav / SideNav
* Details-Element

Komponenten
-----------

* Button
* Value
* Image
* RoundProgress
* Select
* Spinner
* Slider
* Chart


Eigene Widgets definieren
-------------------------

Wie definiert man ein Template für ein Custom-Widget
