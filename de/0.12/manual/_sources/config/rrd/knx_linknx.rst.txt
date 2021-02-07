.. replaces:: CometVisu/0.8.x/etc/rrd/knx_linknx/temperatur/de/

Temperatur vom KNX mit linknx
-----------------------------

linknx hat die Möglichkeit KNX-Objekte als "persistent" zu markieren.

Beispiel:

.. code-block:: xml

    <object type="9.xxx" id="temp_Arbeitszimmer" gad="2/1/0" flags="cwu" init="persist" log="false">
        Temperatur Arbeitszimmer
    </object>

Diese Werte werden dann in /tmp als Textdateien abgelegt und können einfach in eine RRD-Datenbank geschrieben werden.

Dieses Script funktioniert so wenn es unter /var/www/rrd/linknx_temp_arbeitszimmer gespeichert (und ausführbar) ist

.. code-block:: bash

    #!/bin/bash
    #
    # update .rrd database text file from linknx
    #
    # $Id: update_cputemp 275 2013-05-16 05:20:56Z lenik $

    cd /var/www/rrd

    # create database if not exists
    [ -f linknx_temp_arbeitszimmer.rrd ] || {
    /usr/bin/rrdtool create linknx_temp_arbeitszimmer.rrd --step 300 \
    DS:Temperatur:GAUGE:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    # Read temperature from text file
    temp=`cat /var/lib/linknx/temp_Arbeitszimmer`


    # Update database
    rrdtool update linknx_temp_arbeitszimmer.rrd N:$temp

Im /etc/crontab muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/linknx_temp_Arbeitszimmer