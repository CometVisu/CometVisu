
CPU Temperature for Raspberry Pi
--------------------------------

The current CPU temperature of the Raspberry Pi can be filled
with this script in an RRD database. This script works like
this if it is stored (and executable) under /var/www/rrd/cputemp

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

The following line must be added in /etc/crontab to call the script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/cputemp