***************************
Tile-Struktur
***************************

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

.. toctree::

    widgets/switch


TODO:

* Unterschiede Kacheln (Switch, Shutter), Komponenten (Label, Button) und erlaubten HTML-Elemente (details)

