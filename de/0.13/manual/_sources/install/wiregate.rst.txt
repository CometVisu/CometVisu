.. replaces:: CometVisu/Installation/WireGate/de

Installation auf dem WireGate
=============================

.. CAUTION::

    Die meisten der hier angegebenen Informationen sind veraltet!

.. HINT::
    Wenn auf dem WireGate bereits die neueste WireGate-Version
    (1.1) installiert wurde, dann ist dort auch die CometVisu 0.8.5 mit
    installiert worden. Weitere Schritte sind zur Installation nicht mehr
    notwendig!

Manuelle Installation auf dem WireGate
--------------------------------------

Hatte man die CometVisu der 0.8er Reihe bereits vorher installiert, so
müssen nur noch die eigenen Config-Dateien übertragen werden. Diese
liegen im Verzeichnis ``/srv/www/release\_*<...>*/release/config/`` und
müssen nun in das Verzeichnis ``/etc/cometvisu/`` kopiert werden.

Beispiel: bewirkt die Kopie der config aus dem "release\_0.8.3" in den
neuen Ordner der cometvisu-0.8

.. code:: bash

    cp /var/www/release_0.8.3/release/config/visu_config*.xml /var/www/cometvisu-0.8/config/

Hatte man vorher die 0.6er Version genutzt (das Paket "cometvisu") dann
muss man beachten, dass sich die URL des Editors geändert hat. Wenn man
einen Link auf den Editor in der Statusbar gesetzt hatte, so sollte man
diese korrigieren. Mit dem neuen Editor benötigt man dazu folgende
Schritte:

#. Den neuen Editor öffnen: ``http://<server-name>/cometvisu/editor/?config=`` -
   sollte hierbei der Hinweis kommen, dass die Config nicht in der
   neueste Version vorliegt, so bitte diese konvertieren (lassen)
#. Durch Klick auf "+" bei "pages" den entsprechenden Baum ausklappen
#. Durch Klick auf "+" bei "meta" den entsprechenden Baum ausklappen
#. Durch Klick auf "+" bei "statusbar" den entsprechenden Baum
   ausklappen
#. Klick in den grauen Bereich bei "Edit" dieses Textfeld zum Bearbeiten
   öffnen (kann eine kurze Verzögerung geben) und ggf. das Textfeld zur
   besseren Übersicht mit dem Handle in der rechten unteren Ecke
   vergrößern
#. Das *<a>*-HTML-Element abändern auf *<a href="editor">*, also z.B. auf *<a href="editor">Edit</a>*
#. Mit Klick ganz oben auf der Seite auf "preview" testen, ob die Seite
   wie gewünscht funktioniert
#. Falls ja: mit Klick ganz oben auf der Seite auf "save" die Config
   abspeichern


Um die neueste Version der CometVisu (0.8.5) auf dem WireGate zu installieren sind folgende Schritte durchzuführen:

#. Installation des aktuellsten CometVisu-Paketes um
   sicher zu stellen, dass alle Abhängigkeiten erfüllt sind - so diese
   Version noch nicht genutzt wird.
#. Anmelden an der Konsole (Linux-Nutzer nehmen einfach ssh, Windows
   Nutzer nehmen z.B. das kostenlose Programm putty)
#. An der Konsole werden diese Befehle benötigt:

.. code:: bash

    cd /var/www
    wget -O CometVisuDownload.tar.gz https://github.com/CometVisu/CometVisu/releases/download/v0.9.2/CometVisu-0.9.2.tar.gz
    tar xvfz CometVisuDownload.tar.gz
    rm ./CometVisuDownload.tar.gz
    ln -s release_0.8.5/release cometvisu
    chmod a+w cometvisu/config/*

Wenn bereits die alte Version genutzt wird, dann noch die Config-Datei
in das neue Verzeichnis kopieren:

.. code:: bash

    cp visu/visu_config.xml cometvisu/config/

Wenn jedoch schon eine Version der Serie 0.8 installiert wurde und es
eine neue Version gibt, kann diese mit diesen Befehlen an der Konsole
aktualisiert werden:

.. code:: bash

    cd /var/www
    wget -O CometVisuDownload.tar.gz https://github.com/CometVisu/CometVisu/releases/download/v0.9.2/CometVisu-0.9.2.tar.gz
    tar xvfz CometVisuDownload.tar.gz
    rm ./CometVisuDownload.tar.gz
    rm -f ./cometvisu.bak
    mv ./cometvisu cometvisu.bak
    ln -s release_0.8.5/release cometvisu
    chmod a+w cometvisu/config/*
    cp cometvisu.bak/config/visu_config*.xml cometvisu/config/

Ergebnis:
^^^^^^^^^

Die CometVisu ist nun unter ``http://wiregateXYZ/cometvisu/`` zu erreichen.

