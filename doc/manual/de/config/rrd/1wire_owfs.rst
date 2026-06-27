.. replaces:: CometVisu/0.8.x/etc/rrd/1wire_owfs/temperatur/de/

Temperatur vom 1wire (lokale 1wire-Schnittstelle mit owfs)
----------------------------------------------------------

Wenn man 1wire einsetzt kann man mit diesem Script die Werte direkt von einem 1wire Sensor lesen und in eine RRD Datenbank füllen:

Hier hat der 1wire Sensor die ID 28.AB8BCB040000, diese muss angepasst werden!!

Dieses Script funktioniert so wenn es unter /var/www/rrd/1wire_temp_aussen gespeichert (und ausführbar) ist.

.. spelling::

    aussen

.. code-block:: bash

    #!/bin/bash
    #

    cd /var/www/rrd

    # create database if not exists
    [ -f 1wire_temp_aussen.rrd ] || {
    /usr/bin/rrdtool create 1wire_temp_aussen.rrd --step 300 \
    DS:temp:GAUGE:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    # read the temperature (degrees celsius)
    TEMPERATURE=`owget /uncached/28.AB8BCB040000/temperature`

    # remove leading character
    TEMPERATURE=`echo $TEMPERATURE | cut -c 1-`

    /usr/bin/rrdtool update 1wire_temp_aussen.rrd N:$TEMPERATURE

Im /etc/crontab muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/1wire_temp_aussen
