.. replaces:: CometVisu/0.8.x/etc/rrd/pi_cputemp/de/

CPU Temperatur für Raspberry Pi
-------------------------------

Die aktuelle CPU Temperatur des Raspberry Pi kann man mit diesem Script in eine RRD Datenbank füllen:

Dieses Script funktioniert so wenn es unter /var/www/rrd/cputemp gespeichert (und ausführbar) ist

.. code-block:: bash

    #!/bin/bash
    #
    # update .rrd database with CPU temperature
    #
    # $Id: update_cputemp 275 2013-05-16 05:20:56Z lenik $

    cd /var/www/rrd

    # create database if not exists
    [ -f cputemp.rrd ] || {
    /usr/bin/rrdtool create cputemp.rrd --step 300 \
    DS:cputemp:GAUGE:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    # read the temperature and convert 59234 into 59.234 (degrees celsius)
    TEMPERATURE=`cat /sys/class/thermal/thermal_zone0/temp`
    TEMPERATURE=`echo -n ${TEMPERATURE:0:2}; echo -n .; echo -n ${TEMPERATURE:2}`

    /usr/bin/rrdtool update cputemp.rrd `date +%s`:$TEMPERATURE

Im /etc/crontab muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/cputemp