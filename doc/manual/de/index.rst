.. replaces:: CometVisu/0.8.x/manual/de
    Benutzerhandbuch
    CometVisu/0.8.1/manual/de
    CometVisu/Benutzerhandbuch
    CometVisu/handbook/de
    CometVisu/manual/de
    CometVisu/0.8.0/manual/de
    CometVisu/Manual

#############################
Willkommen bei der CometVisu!
#############################

CometVisu ist eine webbasierte Visualisierungslösung für den Bereich der
Hausautomation. Sie kann direkt auf den KNX-Bus zugreifen (über
den eibd, bzw. knxd) oder auf alles aus der
`OpenHAB <http://www.openhab.org/>`__-Welt. Die aktuelle Version wird
auf `Github <http://github.com/CometVisu/CometVisu>`__ veröffentlicht.

.. _system-voraussetzungen:

Systemvoraussetzungen
---------------------

Die Bedienung durch die Anwender erfolgt über einen Webbrowser. Die
meisten aktuellen Browser werden unterstützt.

Durch Angabe von :doc:`Parametern im URL <config/url-params>` kann
man zusätzlich die CometVisu beeinflussen, zum Bespiel andere Configs
oder Design laden, ebenso aber die Darstellung für Mobilgeräte wie z.B.
Smartphones erzwingen.

Bedienung der CometVisu
-----------------------

Das Hauptmenü befindet sich in der Fußzeile und besteht normalerweise
aus verschiedenen Links:

-  "**CometVisu.org**" Link auf die Homepage des Projekts CometVisu
-  "**Reload**" um die aktuelle Seite neu aufzurufen.
-  "**Widget Demo**": Zeigt die verschiedenen Bedienelemente und ihre
   Verwendungsmöglichkeiten auf.
-  "**Edit**:" Wechselt in den Editor.
-  "**Check Config**": Tool, um die Konfigurationsdatei auf syntaktische
   Fehler zu überprüfen. "config visu\_config is valid XML" bedeutet,
   dass die Konfigurationsdatei formal in Ordnung ist, darunter wird dir
   aktuelle Konfigurationsdatei angezeigt. Sollten Fehler in der Datei
   vorliegen, so werden diese in der Darstellung hervorgehoben.


.. hint::
    Über die Config-Datei kann man den Inhalt der Fußzeile den eigenen
    Bedürfnissen anpassen


CometVisu-Designs
-----------------

-  Metal -> das wohl beliebteste Design
-  Pure
-  Diskreet
-  Discreet Sand
-  Discreet Slim
-  Alaska
-  Alaska Slim

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
    devel/index
    faq
    tutorial/index

