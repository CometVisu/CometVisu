.. replaces:: CometVisu/0.8.x/etc/rrd/de/

.. _rrd_introduction:

RRD Einführung & Beispiele
==========================

.. HINT::

    Dieser Abschnitt kann ignoriert werden, wenn ein openHAB-Backend benutzt wird.
    Hilfe bei der Anzeige von Diagrammen mit dem openHAB-Backend sind in der Dokumentation
    des :ref:`Diagram-Plugins <diagram>` zu finden.

Allgemeine Infos über RRD
-------------------------

Die CometVisu-Diagramme werden über RRD generiert.

Diese werden üblicherweise im Verzeichnis ``/var/www/rrd`` abgelegt.

Allgemeine Infos zu RRD findet man auf englisch
`hier <http://oss.oetiker.ch/rrdtool/doc/index.en.html>`__ und natürlich
bei
`Wikipedia <http://de.wikipedia.org/w/index.php?title=RRDtool&oldid=125588545>`__

Infos zum Erzeugen von RRD Datenbanken findet man auf englisch
`hier <http://oss.oetiker.ch/rrdtool/doc/rrdcreate.en.html>`__

Infos zum Aktualisieren/Befüllen von RRD-Datenbanken findet man auf
englisch `hier <http://oss.oetiker.ch/rrdtool/doc/rrdupdate.en.html>`__

RRD und die CometVisu
---------------------

Zum Anzeigen eines Diagramms in der CometVisu ist nötig:

-  CometVisu-Diagramm-Plugin
-  RRD Datei
-  auf CometVisu abgestimmtes rrdtool (entweder ein zusätzliches Script
   oder ein `RRDtool mit Patches <CometVisu/rrdtool>`__)

(beides ist auf dem wiregate und auf dem Raspberry Pi image
standardmäßig verfügbar)

.. code-block:: bash

    root@Traumhaus:/var/www/rrd# cat /etc/crontab
    # /etc/crontab: system-wide crontab
    # Unlike any other crontab you don't have to run the 'crontab'
    # command to install the new version when you edit this file
    # and files in /etc/cron.d. These files also have username fields,
    # that none of the other crontabs do.

    SHELL=/bin/sh
    PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

    # m h dom mon dow user  command

    # etliche Zeilen entfernt, bitte NICHT diese Datei per copy&paste nutzen sondern die RRD-Crons unten an die bestehende Datei anhängen!!!``

    */5 *   * * *   root    /var/www/rrd/cputemp
    */5 *   * * *   root    /var/www/rrd/processes
    */5 *   * * *   root    /var/www/rrd/cpuload
    */5 *   * * *   root    /var/www/rrd/cpuload15

``*/5 * * * *`` bedeutet hierbei das der Job jederzeit alle 5 Minuten
ausgeführt wird. Der kleinste Zeitabstand der mit der crontab
realisierbar ist ist ``*/1``, also jede Minute.

Der Aktualisierungsabstand sollte zur RRD Datenbank passen!

Anlegen der RRD-Datenbank
-------------------------

Die RRD Datei/Datenbank muss zunächst angelegt werden.

Hierfür muss man sich beim Anlegen der Datenbank überlegen wie viele
Datensätze gespeichert werden sollen. Die Datenbank wird dann erstellt
und mit "NaN" (Not A Number - kein Wert vorhanden) Werten gefüllt. Die
Größe der Datenbank ändert sich dann nicht mehr.

Dies bedeutet das wenn die maximale Anzahl Datensätze in einer Tabelle
erreicht sind wird mit dem Eintragen eines neues Wertes der älteste
verworfen. Dies ist jedoch kein Problem da regelmäßig Werte
zusammengefasst werden.

In der Praxis heißt das das die Auflösung der Werte mit zunehmendem
Zeitabstand zu "jetzt" geringer wird. (z.B. minütliche Werte für die
letzten 7 Tage, stündliche Werte für die letzten 4 Wochen, tägliche
Werte für die letzten 2 Jahre etc...)

"Befüllen" der RRD-Datenbank
----------------------------

Die RRD Datei/Datenbank muss regelmäßig mit Daten befüllt werden - wenn
dies nicht geschieht erkennt RRD das und trägt automatische NaN ein -
damit bleiben die Zusammenfassungen korrekt.

Hierfür ruft man das das rrdtool auf mit dem Parameter "update" und
übergibt einen Zeitstempel (oder N für "Now", also aktuelle Zeit) sowie
die Werte die in die Datenbank aufgenommen werden sollen.

Am, einfachsten lässt sich dieses über ein kurzes Shellscript erledigen,
das man dann per cron regelmäßig ausführen lässt.

Fehlersuche
-----------

wenn RRD basierte Daten nicht wie vorgesehen angezeigt werden kann man
direkt in die Datenbank schauen ob überhaupt (sinnvolle) Werte vorhanden
sind. Hierfür gibt es das

.. code-block:: bash

    rrdtool dump

Kommando. Dieses stellt die Datenbank als Text dar. Man sollte dann
Zeilen mit NaN (Not a Number = Kein Wert vorhanden) ausfiltern sowie nur
Daten-Zeilen mit anschauen. Dies kann man z.B. mit dem grep-Kommando
machen:

.. code-block:: bash

    rrdtool dump NAMEDERDATENBANK.rrd | grep row | grep -v NaN

Beispiele für RRDs
------------------

.. HINT::

    Diese Beispiele funktionieren nicht mit openHAB

(die Beispiel-Scripte erzeugen beim ersten Aufruf die RRD Datenbank,
danach aktualisieren sie die Datenbank)

-  :doc:`rrd/cpuload` - die CPU load (1 Min, 5 Min, 15 Min wird in eine RRD Datenbank geschrieben

-  :doc:`rrd/processes` - die Anzahl der laufenden Prozesse wird in eine RRD Datenbank geschrieben

-  :doc:`rrd/pi_cputemp` - internen Temperatur-Sensor der Raspberry CPU abfragen und im RRD speichern

-  :doc:`rrd/knx_linknx` - Schreiben eines mit Linknx persistent abgelegten KNX-Wertes (hier
   eine Temperatur eines RTR) in einer RRD Datenbank.

-  :doc:`rrd/1wire_owfs` - direktes Lesen eines 1wire-Temperatur-Sensors in eine RRD Datenbank

für fortgeschrittene Anwender (Anpassungen im Script sind wahrscheinlich erforderlich)

-  :doc:`rrd/ifHCoctets` - Internet-Überwachung per SNMP - es sind Anpassungen erforderlich!

.. toctree::
    :hidden:
    :glob:

    rrd/*
