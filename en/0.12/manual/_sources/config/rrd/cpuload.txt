

CPU load for Linux Systeme
--------------------------

The CPU load of a Linux system (1 min, 5 min, 15 min) can be filled
with this script in **a** RRD database. (This must be taken into
account in the visualization, the datasourceIndex must be set)

This script works if it is saved (and executable) under
``/var/www/rrd/cpuload``

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


The following line must be added in /etc/crontab to call the script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/cpuload

