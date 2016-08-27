Willkommen bei der CometVisu!
=============================

CometVisu ist eine webbasierte Visualisierungslösung für den Bereich der
Hausautomation. Sie kann direkt auf den KNX-Bus zugreifen (über
den eibd, bzw. knxd) oder auf alles aus der
`OpenHAB <http://www.openhab.org/>`__-Welt. Die aktuelle Version wird
auf `Github <http://github.com/CometVisu/CometVisu>`__ veröffentlicht.

.. CAUTION::
    Diese Dokumentation wird zu Zeit von Grund auf neu aufgebaut ist
    daher nicht vollständig. Solange noch nicht alle Inhalte übertragen
    worden sind, dient das bekannte `CometVisu-Wiki <http://www.cometvisu.org>`__
    als weitere Informationsquelle.

Systemvoraussetzungen
---------------------

Die **Bedienung** durch die Anwender erfolgt über einen Webbrowser. Die
meisten aktuellen Browser werden unterstützt.

Durch Angabe von `Parametern im URL <CometVisu/URL_parameter/de>`__ kann
man zusätzlich die CometVisu beeinflussen, zum Bespiel andere Configs
oder Design laden, ebenso aber die Darstellung für Mobilgeräte wie z.B.
Smartphones erzwingen.

Bedienung der CometVisu
-----------------------

Das Hauptmenü befindet sich in der Fußzeile und besteht normalerweise
aus verschiedenen Links:

-  Link auf die Homepage des Projekts CometVisu
-  "**Reload**" um die aktuelle Seite neu aufzurufen.

        *Achtung*: Im Editormodus gehen ohne Nachfrage alle nicht
        abgespeicherten Änderungen verloren!

-  "**Widget Demo**": Zeigt die verschiedenen Bedienelemente und ihre
   Verwendungsmöglichkeiten auf.
-  "**Edit**:" Wechselt in den Editor.
-  "**Check Config**": Tool, um die Konfigurationsdatei auf syntaktische
   Fehler zu überprüfen. "config visu\_config is valid XML" bedeutet,
   dass die Konfigurationsdatei formal in Ordnung ist, darunter wird dir
   aktuelle Konfigurationsdatei angezeigt..


.. hint::
    Über die Config-Datei kann man den Inhalt der Fußzeile den eigenen
    Bedürfnissen anpassen


Update der CometVisu
--------------------

falls eine Version 0.8 schon installiert war kann die Installation
direkt aktualisiert werden auf dem
`WireGate <CometVisu/0.8.x/manual/updatewiregate/de>`__ oder `anderen
Installationen <CometVisu/0.8.x/manual/updateother/de>`__

CometVisu-Designs
-----------------

-  `Metal <CometVisu/demo_config/swiss/de>`__ das wohl beliebteste
   Design
-  `Pure <CometVisu/0.8.x/designs/pure/de/>`__
-  `Diskreet <CometVisu/0.8.x/designs/diskreet/de/>`__
-  `Discreet Sand <CometVisu/0.8.x/designs/discreet_sand/de/>`__
-  `Discreet Slim <CometVisu/0.8.x/designs/discreet_slim/de/>`__
-  `Alaska <CometVisu/0.8.x/designs/alaska/de/>`__
-  `Alaska Slim <CometVisu/0.8.x/designs/alaska_slim/de/>`__

Es ist auch möglich eigene Design zu implementieren.

Farben in der CometVisu
-----------------------

werden grundsätzlich hexadezimal im `0xRGB
Format <http://de.wikipedia.org/wiki/Hexadezimale_Farbdefinition>`__
angegeben.

Hilfe, Beispiele und Farbwerte findet man
`hier <http://www.z1-web.de/Webmaster-Tools-HTML-HEX_Farbcodes_Tools>`__
oder `hier <http://de.selfhtml.org/helferlein/farben.htm>`__

.. toctree::
    :hidden:
    :glob:

    install/index
    config/index
    colab/index

