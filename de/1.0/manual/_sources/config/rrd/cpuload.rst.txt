.. replaces:: CometVisu/0.8.x/etc/rrd/cpuload/de/

CPU load für Linux Systeme
--------------------------

Die CPU Load eines Linux-Systems (1 Min, 5 Min, 15 Min) kann man mit diesem Script in **eine** RRD
Datenbank füllen. (Dies muss bei der Visualisierung beachtet werden, es muss der datasourceIndex gesetzt werden)

Dieses Script funktioniert, wenn es unter ``/var/www/rrd/cpuload`` gespeichert (und ausführbar) ist

.. code-block:: bash

    #!/bin/bash

    cd /var/www/rrd

    # create database if not exists
    [ -f cpuload.rrd ] || {
    /usr/bin/rrdtool create cpuload.rrd --step 300 \
    DS:load1:GAUGE:1200:U:U \
    DS:load5:GAUGE:1200:U:U \
    DS:load15:GAUGE:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    LOAD=$(awk '{print $1":"$2":"$3}' < /proc/loadavg)
    /usr/bin/rrdtool update cpuload.rrd N:$LOAD


Im ``/etc/crontab`` muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/cpuload

