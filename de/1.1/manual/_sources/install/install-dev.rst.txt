.. replaces:: CometVisu/HowTo%3A_Entwicklerversion_auf_dem_WireGate

Entwicklerversion auf dem Wiregate
==================================


Auf dieser Seite wird erklärt, wie man die Entwicklerversion
der CometVisu auf dem WireGate installieren kann. Für andere Geräte ist diese Anleitung prinzipiell
ebenfalls geeignet - da es dort allerdings Unterschiede zum WireGate geben kann, können
wir hier nicht auf diese Unterschiede eingehen. Sollte also eine andere
Plattform verwendet werden, so muss dieser Text intelligent gelesen
werden und in der Durchführung geeignet angepasst werden.

Grundsätzlich ist dies die Anleitung für Anwender.
Die Informationen für Entwickler sind dem `GitHub CometVisu Wiki <https://github.com/CometVisu/CometVisu/wiki>`__
zu entnehmen.

Ohne Versionskontrolle
----------------------

.. important::
   
   Hier wird die Installation der Entwicklerversion erklärt! Produktive Systeme sollten nur 
   ein veröffentlichtes `Release <https://github.com/CometVisu/CometVisu/releases>` nehmen.

Wenn man nur die aktuellste Entwickler-Version ausprobieren möchte
(natürlich nur auf eigenes Risiko!), dann kann man diese ohne
Versionskontrollsystem installieren. Für den "üblichen" Branch
CometVisu/CometVisu -> develop lädt man dazu die Datei

`https://github.com/CometVisu/CometVisu/archive/develop.zip <https://github.com/CometVisu/CometVisu/archive/develop.zip>`__

und installiert diese wie unter :doc:`update-other` beschrieben.

Um jedoch eine richtige Entwickler-Version zu installieren, über die man
auch Änderungen zurückspielen kann, gelten die im folgenden beschriebenen Punkte.

Mit Versionskontrolle
---------------------

Vorbereitung
^^^^^^^^^^^^

Voraussetzung
"""""""""""""

Der Code der CometVisu ist auf
`GitHub <https://github.com/CometVisu/CometVisu>`__ zu finden. Da das
WireGate den git Client nicht vorinstalliert mitbringt, muss man als
erstes diesen installieren.

Installation mit Paketen
""""""""""""""""""""""""

Auf neueren Debian basierten Systemen kann man git leicht über die
Kommandozeile (z.B. remote üer eine SSH-Verbindung) als root mit diesem
Befehl installieren:

.. code-block:: bash

    apt-get install git-core

.. _install-no-pakets:

Installation ohne Pakete
""""""""""""""""""""""""

Da die aktuell (Stand: 12.04.2015) für das Wiregate verfügbare
Git-Version zu alt ist (diese ist inkompatibel mit GitHub), muss man
dort Git "per Hand" installieren. Es gibt zwei Möglichkeiten dies zu
tun. Man kann die aktuelle Git version selber installieren und
compilieren - empfohlene Variante - oder man kann die master.zip Datei
verwenden.

Aktuelle Git Version selbst installieren und compilieren
""""""""""""""""""""""""""""""""""""""""""""""""""""""""

.. code-block:: bash

    apt-get install tcl
    apt-get install tk
    apt-get install python-apt
    apt-get install python-software-properties
    apt-get install zlib1g-dev
    apt-get install build-essential autoconf
    apt-get install gettext
    cd /usr/local/src
    wget https://www.kernel.org/pub/software/scm/git/git-2.4.1.tar.gz
    tar -xzvf git-2.4.1.tar.gz
    cd git-2.4.1
    make configure
    ./configure
    make
    make install
    cd ..
    rm -rf git-2.4.1
    rm git-2.4.1.tar.gz

Sollte die Installation/Konfiguration von python-software-properties
abbrechen, dann hilft folgendes Kommando:

.. CAUTION::

    Es gibt Hinweise, dass aktuell (13.01.2016) das nächste Kommando die WireGate-Installation
    beschädigen kann! Bitte nur ausführen, wenn man weiß, was man macht!

.. code-block:: bash

    cp -f /usr/bin/python2.5 /usr/bin/python
    dpkg --configure -a

Die Installation kann überprüft werden mit folgendem Kommando:

.. code-block:: bash

    git --version

master.zip Datei verwenden
""""""""""""""""""""""""""

Hierzu nimmt man die Datei von

`https://github.com/git/git/archive/master.zip <https://github.com/git/git/archive/master.zip>`__

Im dieser Zip-Datei befindet sich ein Readme mit dem Make-Befehl, den
man ausführen muss.

Wenn es Schwierigkeiten gibt, müssen evtl. folgende Libraries
nachinstalliert werden:

.. code-block:: bash

    apt-get install libexpat1-dev build-essential libcurl4-openssl-dev libssl-dev gettext

Auf GitHub
""""""""""

Wenn die Versionsverwaltung an sich installiert ist, muss man sich auf
`GitHub <https://github.com/>`__ einen Account anlegen, so man noch
keinen besitzt.

Auf GitHub geht man nun zum CometVisu Repository unter
`CometVisu/CometVisu <https://github.com/CometVisu/CometVisu>`__ klickt
rechts oben auf "Fork" um einen Fork dieses Repositorys zu erstellen.

Wenn man nun auf seine eigene GitHub Seite geht, dann erscheint auf der
rechten Seite unter "HTTPS clone URL" eine URL die man sich merken muss
(bzw. in die Zwischenablage kopiert). Diese URL hat die Form
``https://github.com/<Accountname>/CometVisu.git``

Installation
^^^^^^^^^^^^

Es wird die Installation mit Git empfohlen. Als Fallback steht
allerdings SVN (bzw. Subversion) weiterhin zur Verfügung.

Git
"""

Der eigene Fork der CometVisu wird nun durch einen simplen Befehl
installiert:

.. code-block:: bash

    cd /var/www
    git clone https://github.com/<Accountname>/CometVisu.git CometVisuGit

Unter Umständen funktioniert der Abruf via https nicht, dann sollte der Fork über folgenden
Befehl initialisiert werden:

.. code-block:: bash

    cd /var/www
    git clone git://github.com/<Accountname>/CometVisu.git CometVisuGit

Als Ergebnis sollte nun als Ausgabe ein Text ähnlich diesem erscheinen:

.. code-block:: bash

    Klone nach 'CometVisuGit'...
    remote: Counting objects: 20347, done.
    remote: Compressing objects: 100% (5220/5220), done.
    remote: Total 20347 (delta 14950), reused 20280 (delta 14905)
    Empfange Objekte: 100% (20347/20347), 48.50 MiB | 346.00 KiB/s, Fertig.
    Löse Unterschiede auf: 100% (14950/14950), Fertig.
    Prüfe Konnektivität... Fertig.
    Checke Dateien aus: 100% (1175/1175), Fertig.

Sollte das Klonen erfolgreich gewesen sein, wird diese Version als
*origin* geführt. Im Anschluss kann man dann noch das Hauptrepository
als *upstream* hinzufügen:

.. code-block:: bash

    git remote add upstream https://github.com/CometVisu/CometVisu.git

Subversion
""""""""""

Falls das Git clone nicht funktioniert hat und eine Fehlermeldung wie

.. code-block:: bash

    error: The requested URL returned error: 403
    warning: remote HEAD refers to nonexistent ref, unable to checkout.

erschienen ist, kann es sein, dass die installierte Git Version zu alt
ist.

Wenn man nun nicht nach :ref:`install-no-pakets` eine neuere Git-Version
installieren möchte, kann man nun als Alternative auf Subversion (wie
bei dem bisherigen Repository auf SourceForge) setzen. Dies ist zwar
nicht die empfohlene Lösung - aber immerhin fast so gut wie der direkte
Zugang mit Git.

Nähere Infos zum Arbeiten mit Subversion auf GitHub steht in dem Artikel
`1 <https://help.github.com/articles/support-for-subversion-clients/>`__.

Zur Installation der CometVisu mit Subversion geht man nun auf der
GitHub-Seite bei seinem Fork (s.o.) am rechten Rand zu "You can clone
with HTTPS, SSH, or Subversion." und klickt dort auf das Wort
"Subversion". Nun kopiert man sich unter dem nun erscheinenden
"Subversion checkout URL" die URL. Diese sollte die Form ``https://github.com/<Accountname>/CometVisu``
haben.

An der WireGate Kommandozeile führt man nun diese Befehle aus:

.. code-block:: bash
    
    cd /var/www
    svn co --depth empty https://github.com/<Accountname>/CometVisu CometVisuGitSVN 

Nach etwas warten, sollte als Bestätigung ein Text ähnlich diesem
erscheinen:

.. code-block:: bash

    Ausgecheckt, Revision 1342.

Nun kann man in der Installation weiter gehen und diese Befehle
ausführen:

.. code-block:: bash

    cd CometVisuGitSVN/
    svn up trunk

Wenn nun am Bildschirm viele Zeilen mit Dateinamen auftauchen, war der
Befehl erfolgreich. Komplettiert wird dieser nun durch

.. code-block:: bash

    svn up --depth empty branches
    cd ..
    ln -s CometVisuGitSVN/trunk/src visu_git

Herzlichen Glückwunsch! Unter ``http://wiregate/visu_git/`` sollte jetzt die
CometVisu laufen!

Weitere Schritte
""""""""""""""""

Egal ob mit Git oder mit SVN installiert wurde sollte man im Anschluss
diese Schritte durchführen:

Um die Visu Config über den Editor auch speichern zu können müssen für
die Datei noch Schreibrechte eingerichtet werden:

.. code-block:: bash

    chmod a+rw /var/www/visu_git/config/visu_config.xml

Der Backup Ordner braucht auch Schreibrechte:

.. code-block:: bash

    chmod a+rw /var/www/visu_git/config/backup

Und die Vorschau auch:

.. code-block:: bash

    chmod a+rw
    /var/www/visu_git/config/visu_config_previewtemp.xml

Jetzt ist die Demo-Visu über ``http://wiregatexxx/visu_git/`` erreichbar.

Der Visu-Editor steht unter ``http://wiregateXXX/visu_git/editor/`` zur Verfügung.

.. IMPORTANT::

   Die CometVisu kann durch einfaches Löschen des Verzeichnisses restlos entfernt werden.
   Auch für eine Neuinstallation (erneutes SVN Checkout) wenn das SVN Update nicht mehr
   funktionieren sollte, muss das Verzeichnis gelöscht werden. Dabei empfiehlt es sich den Inhalt
   des Verzeichnis */config/* zu sichern. Ansonsten werden auch die eigenen Configs gelöscht!


Nutzung
-------

Wenn alles vorbereitet wurde, d.h. der Versionskontrollsystem wurde
installiert und die CometVisu ausgecheckt, dann kann man in die Nutzung
übergehen.

Hierbei muss man beachten, dass es durch die verteilte Struktur des Git
nun mehrere Repositories gibt - und dort auch noch verschiedene
Branches:

-  ``CometVisu/CometVisu -> master`` - **das** Hauptrepository
   und Hauptbranch. Hier stehen nur die offiziellen Releases.
-  ``CometVisu/CometVisu -> develop`` - der Entwicklungsbranch
   im Hauptrepository. Hier findet die Hauptentwicklung statt. Der
   Zustand der Dateien in diesem Branch sollte immer funktionsfähig
   sein.
-  ``CometVisu/CometVisu -> <weitere>`` - unter
   `GitHub->Branches <https://github.com/CometVisu/CometVisu/branches>`__
   sind alle weiteren Branches zu finden. Hier werden manche Features
   für den Entwicklungsbranch vorbereitet.
-  ``<Accountname>/CometVisu -> ...`` - Die Branches unter dem Fork die **
   gehören. Meist wird dort *master* verwendet - oder bei der
   Entwicklung von Patches oder Features extra ein (weiterer) Branch
   angelegt, der nach Fertigstellung und einem Pull nach
   ``CometVisu/CometVisu -> develop`` wieder geschlossen wird.
-  ``Der lokale Rechner (bzw. das WireGate) -> ...`` - die lokalen Branches.

Dies bedeutet, dass es im wesentlichen drei verschiedene Orte für die
Dateien gibt:

.. code-block:: bash

    CometVisu (upstream) <-> ** (origin) <-> lokal auf dem WireGate

Um diese Orte synchron zu halten müssen verschiedene Schritte
durchgeführt werden.

Generisch
^^^^^^^^^

In diesem Kapitel wird die Synchronisierung von

.. code-block:: bash

    CometVisu (upstream) <-> ** (origin)

beschrieben.

Update des GitHub Forks
"""""""""""""""""""""""

.. code-block:: bash

    CometVisu (upstream) -> ** (origin)

Um die letzten Änderungen des Entwicklung-Branches
CometVisu/CometVisu -> develop in den eigenen Fork zu
übernehmen, benötigt man einen *Pull*. Dies führt man am einfachsten
über die GitHub Seite des eigenen Forks ``https://github.com/<Accountname>/CometVisu``
aus.

Man klickt auf den *Pull Request* Button:

.. figure:: _static/GitHub_Pull_Request_Button.png

Man stellt sicher, dass der *base fork* dem eigenen Fork entspricht
(also *<Accountname>*) und *head fork* auf ``CometVisu/CometVisu`` steht:

.. figure:: _static/GitHub_Comparing_Changes.png

Man klickt auf *Create pull request* und auf der folgenden Seite (wo
man bei Bedarf noch einen entsprechenden Commit-Kommentar eintragen
kann) wieder *Create pull request*.

Auf der nun folgenden Seite erscheint (hoffentlich...) ***This pull
request can be automatically merged.*** - hier klickt man dann auch
wieder *Merge pull request*:

.. figure:: _static/GitHub_automatically_merged.png

Am Schluss muss man noch auf *Configm merge* klicken:

.. figure:: _static/GitHub_confirm_merge.png

Update des Hauptrepositorys auf GitHub
""""""""""""""""""""""""""""""""""""""
.. code-block:: bash

    CometVisu (upstream) <- ** (origin)

Dieser Schritt ist notwendig um die eigenen Änderungen in den
Hauptentwickungs-Branch zu bekommen.

Um nun vom eigenen Fork in nach ``CometVisu/CometVisu -> develop`` zu kommen, verwendet man als Subversion-Nutzer
am besten die GitHub Seite. Dies Funktioniert genau so wie Punkt #2 des Abschnittes
"Update des GitHub Forks", nur dass hier unter *base fork*
``CometVisu/CometVisu`` stehen muss und unter *head fork* das
``<Accountname>/CometVisu``.

Git
^^^

Wenn die Installation wie oben durchgeführt wurde, dann sind alle
Branches unter ``CometVisu/CometVisu`` als upstream bekannt und die
unter ``<Accountname/CometVisu`` als origin.

Dies lässt sich einfach durch den Befehl ``git remote -v``
überprüfen:

.. code-block:: bash

    $ git remote -v
    origin  https://github.com/<Accountname>/CometVisu.git (fetch)
    origin  https://github.com/<Accountname>/CometVisu.git>  (push)
    upstream https://github.com/CometVisu/CometVisu.git  (fetch)
    upstream https://github.com/CometVisu/CometVisu.git  (push)

Update auf dem WireGate
"""""""""""""""""""""""
.. code-block:: bash

    ** (origin) -> lokal auf dem WireGate

Die Arbeit mit Git kann in dieser kurzen Anleitung leider nicht erklärt
werden. Hier bitte in geeigneten Quellen nachschlagen!

Das wesentliche Kommando dafür ist:

.. code-block:: bash

    git pull

Update auf GitHub
"""""""""""""""""
.. code-block:: bash

    <Accountname> (origin) <- lokal auf dem WireGate

Um eigene Änderungen nach GitHub zu veröffentlichen braucht man mehrere
- aber dafür einfache - Schritte.

Durch den Upload der eigenen Änderungen wird nun zuerst ``<Accountname>/CometVisu`` aktualisiert.
Von dort kann man nun per Pull-Request diese Änderungen in das Hauptrepository
``CometVisu/CometVisu`` überführen. Bei dem Pull-Request kann man auch aussuchen in welchen
Branch dort integriert werden soll. Diesen Pull-Request kann man natürlich auch über die Kommandozeile mit
Git erstellen - oder aber sehr komfortabel über die GitHub Seite.

Die Arbeit mit Git kann in dieser kurzen Anleitung leider nicht  erklärt werden.
Hier bitte in geeigneten Quellen nachschlagen! Das grundlegendste Kommando in diesem Kontext ist allerdings:

.. code-block:: bash

    git add .
    git commit
    git push

Subversion
^^^^^^^^^^

Update auf dem WireGate
"""""""""""""""""""""""
.. code-block:: bash

    <Accountname> (origin) -> lokal auf dem WireGate

Zum Updaten der lokalen Dateien auf dem WireGate verwendet man:

.. code-block:: bash

    cd /var/www/visu_git
    svn update .

Update nach GitHub
""""""""""""""""""
.. code-block:: bash

    <Accountname> (origin) <- lokal auf dem WireGate

Um eigene Änderungen nach GitHub zu veröffentlichen braucht man mehrere
- aber dafür einfache - Schritte.

Durch den Upload der eigenen Änderungen wird nun zuerst ``<Accountname>/CometVisu`` aktualisiert.
Von dort kann man nun per Pull-Request diese Änderungen in das Hauptrepository ``CometVisu/CometVisu``
überführen. Bei dem Pull-Request kann man auch aussuchen in welchen Branch dort integriert werden soll.
Durch den Befehl

.. code-block:: bash

    svn ci --username <GitHub Login>

können eigene Änderungen nach GitHub in den eigenen Fork übertragen werden.
