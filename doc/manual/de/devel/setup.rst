.. _development_setup:

******************************
Setup der Entwicklungsumgebung
******************************

Der Einstieg in die CometVisu Entwicklung ist einfach, jedoch sollte die
Entwicklungsumgebung passen damit man optimal unterstützt wird. In diesem
Kapitel werden verschiedene Setups vorgestellt, so dass je nach eigenem Fokus
ein optimales Setup dabei sein sollte.

Grundsätzlich ist bei der Einrichtung der Entwicklungsumgebung auf verschiedene
Randbedingungen zu achten. Welches Betriebssystem läuft auf dem
Entwicklung-Computer? Wo läuft der Server? Ein dedizierter Computer? Ein
Docker-Container?

Tester
------

Tester sind meist fortgeschrittene Anwender aber oft keine Entwickler. Der
Fokus liegt darauf ohne Aufwand bei bestehendem Code unter Anleitung
eines Entwickler kleine Modifikationen durchführen zu können und wertvolle
Rückmeldungen geben zu können.

Annahmen:
=========

:Entwicklungscomputer: Windows, MacOS oder Linux
:CometVisu Server: Dedizierter Server, ggf. mit CometVisu in einem Docker-Container

Setup:
======

Im einfachsten Fall reicht es im Web-Browser über Strg+Umschalt+I die
Entwicklungskonsole zu öffnen:

.. figure:: _static/browser_development.png
    :scale: 50%

    Entwicklungskonsole im Chrome Browser

Hier sind vor Allem die Reiter "Elements" (HTML-/DOM-Struktur der CometVisu),
"Sources" (der Source-Code) und "Network" im Rahmen der Analyse wichtig.

Der Reiter "Elements" bietet auch Zugriff auf die verwendeten CSS Regeln und
ist daher ein optimaler Einstiegspunkt um eigene Designanspassungen an der
CometVisu vor zu nehmen.

Unter "Sources" kann live der Source-Code geändert werden. Diese Änderungen
gehen jedoch über einen Reload der Seite verloren. Hierzu bietet es sich
an eine bereits fertig kompilierte Entwicklungsversion zu installieren. Dies
kann normaler Weise parallel zu einem produktiv verwendeten Release erfolgen.

.. warning:: Entwicklungversionen sollten nicht produktiv genutzt werden!

Die jeweils aktuellste Entwicklungsversion wird täglich als so genanntes
`nightly` automatisch erzeugt und wird unter
https://bintray.com/cometvisu/CometVisu/CometVisu
bereit gestellt.

Außerdem werden die Docker-Container ``testing`` bzw. ``testing-arm`` mit jedem
Code-Update erzeugt. Für Vergleiche mit älteren Versionen (z.B. um eine
Regression einkreisen zu können) gibt es mit ``testing-<Datum>`` auch hier
Nightlies.

Sowohl der kompilierte Code also auch die Docker-Container lassen sich wie
ein fertiges Release installieren.

Durch Zugriff auf die installierten Dateien können nun auch Änderungen am
Code vorgenommen werden, die ab einem neuen Laden der Seite enthalten sind
und bleiben.

Gelegenheitsentwickler
----------------------

Möchte ohne großen Installations-Aufwand kleine Anpassungen am Code vornehmen,
beispielsweise ein :ref:`Plugin <custom_plugins>` erstellen.

Fortgeschrittener Entwickler
----------------------------

Möchte tiefer in den Code einsteigen, ein zum Entwickeln geeigneter Text-Editor
oder gar eine Entwicklungsumgebung ist bereits vorhanden und nun geht es darum
in alle Aspekte der CometVisu und ihrer Erzeugung eingreifen zu können.

Hard Core Entwickler
--------------------

Ist bereit das Entwicklungssystem so aufzubauen, dass alle Änderungen am Code
mit maximaler Effizienz durchgeführt werden können.

Annahmen:
=========

:Entwicklungscomputer: Linux (andere Betriebssysteme sollten auch leicht
  möglich sein, werden hier aber nicht explizit betrachtet)
:CometVisu Server: Dedizierter Server, ggf. mit CometVisu in einem Docker-Container

Setup:
======

Grundsätzlich wird davon ausgegangen dass auf dem Entwicklungscomputer eine
leistungsfähige IDE, wie beispielsweise die `IntelliJ IDEA
<https://www.jetbrains.com/de-de/idea/>`_ vorhanden ist. Dies wesentlichen
Schritte bei der Einrichtung sind nun:

#. `GitHub <https://github.com/>`_ Account anlegen
#. Auf GitHub ein Fork des `CometVisu/CometVisu Repositories
   <https://github.com/CometVisu/CometVisu>`_ erstellen.
#. Lokal den eigenen Fork ``https://github.com/<Accountname>/CometVisu.git``
   auschecken - dieser läuft unter dem Remote ``origin``.
#. Als weiteren Remote ``https://github.com/CometVisu/CometVisu.git`` unter dem
   Namen ``upstream`` hinzufügen.
#. Die Anweisungen aus https://github.com/CometVisu/CometVisu/blob/develop/DEVELOPMENT.md
   beachten (➔ ``git submodule``, ``npm install``).

Werden nun die Sourcen kompiliert, so wird der Build lokal erzeugt. Je nach
Setup bieten sich nun verschiedene Möglichkeiten an diesen Build dem
Web-Server zu übergeben:

Lokaler Web-Server
  Wenn auf dem Entwicklungscomputer ein Web-Server läuft so muss dieser lediglich
  auf das Ausgabeverzeichnis verwiesen werden.

  :Vorteil: komplett freie Konfigurierbarkeit.
  :Nachteil: Die Anbindung an das Backend muss eingerichtet werden.

Integrierter Web-Server
  Über ``npm run source`` wird ein integrierter Web-Server gestartet der für die
  meisten Anforderungen genügt.

  :Vorteil: keine weitere Installation notwendig.
  :Nachteil: Die Anbindung an das Backend muss eingerichtet werden. PHP muss
    getrennt eingerichtet werden, wenn es verwendet werden soll.

Dedizierter Server
  In der Regel wird die produktiv genutzte CometVisu auf einem eigenen Computer
  als Server laufen. Dieser, oder ein ähnlicher, Computer kann auch genutzt
  werden um die Entwicklungsversion auszuliefern. Am einfachsten wird dazu
  dessen Dateisystem (bzw. der relevante Teil) über ein Netzwerkprotokoll
  an den Entwicklungsrechner weitergereicht und dort über einen ``mount``
  eingebunden. Neben den üblichen Protokollen SMB bzw. CIFS und NFS hat sich
  `sshfs` als praktische Lösung bewährt.

  Durch die Option ``--set outputPath=<path>`` bzw. die Umgebungsvariable
  ``CV_OUTPUT_PATH`` kann dem Compiler ein anderes Ausgabeverzeichnis verwenden.
  Wenn dieses nun auf den Mount des Servers zeigt, kann jede Änderung sofort
  über den Server ausgeliefert werdern, was einen optimalen Entwicklungsworkflow
  erlaubt.

  :Vorteil: Sehr nahe am Zieldesign. So kann beispielsweise auch die
    :ref:`Proxy-Funktion des Timberwolf-Servers <tws_proxy>` verwendet werden um
    die Entwicklungsseiten über HTTPS auszuliefern.
  :Nachteil: Geringer Setup-Aufwand.

Docker-Container
  Die einfachste Möglichkeit die CometVisu aufzusetzen ist die Verwendung
  eines Docker-Containers, dies gilt auch für die Entwicklungsversion. Basierend
  auf der Basis des CometVisu-Containers (``cometvisu/cometvisuabstractbase``)
  ist der Container ``christianmayer/developcometvisucontainer:source`` hier
  ideal, da dieser neben der KNX Busanbindung, Apache und PHP auch noch einen
  SSH-Server mit bringt. Über diesen kann, wie unter `Dedizierter Server`
  bechrieben, das ``WEB_ROOT`` Verzeichnis auf dem Entwicklungsrechner
  eingebunden werden.

