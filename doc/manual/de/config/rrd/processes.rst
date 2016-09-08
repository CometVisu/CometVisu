.. replaces:: CometVisu/0.8.x/etc/rrd/processes/de/

Anzahl der Prozess auf Linux System
-----------------------------------

Die Anzahl der aktiven Prozesse auf einem Linux-System kann man mit diesem Script in eine RRD Datenbank füllen:

Dieses Script funktioniert so wenn es unter /var/www/rrd/processes gespeichert (und ausführbar) ist

.. code-block:: bash

    #!/bin/bash

    cd /var/www/rrd

    # create database if not exists
    [ -f processes.rrd ] || {
    /usr/bin/rrdtool create processes.rrd --step 300 \
    DS:processes:GAUGE:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    # mit Hilfe von ps und wc die Anzahl der Prozesse ermitteln
    PROZESSE=$(ps hax|wc -l)

    # zum Schluss kommen die Daten in die Datenbank
    # N steht für das aktuelle Datum und Uhrzeit
    /usr/bin/rrdtool update processes.rrd N:$PROZESSE

Im /etc/crontab muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/processes