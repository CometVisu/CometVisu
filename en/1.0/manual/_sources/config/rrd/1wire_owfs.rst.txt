

Temperature from 1wire (local 1wire interface with owfs)
----------------------------------------------------------

If you use 1wire you can use this script to read the values directly
from a 1wire sensor and fill it into an RRD database. Here the 1wire sensor
has the ID 28.AB8BCB040000, this must be adjusted! This script works like
this if it is stored (and executable) under /var/www/rrd/1wire_temp_outside.

.. code-block:: bash

    #!/bin/bash
    #

    cd /var/www/rrd

    # create database if not exists
    [ -f 1wire_temp_outside.rrd ] || {
    /usr/bin/rrdtool create 1wire_temp_outside.rrd --step 300 \
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

    /usr/bin/rrdtool update 1wire_temp_outside.rrd N:$TEMPERATURE

The following line must be added in /etc/crontab to call the script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/1wire_temp_outside