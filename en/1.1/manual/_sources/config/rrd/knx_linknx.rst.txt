
Temperature from KNX with linknx
--------------------------------

linknx has the option of marking KNX objects as "persistent".

Example:

.. code-block:: xml

    <object type="9.xxx" id="temp_office" gad="2/1/0" flags="cwu" init="persist" log="false">
        Temperature Office
    </object>

These values are then stored in /tmp as text files and
can easily be written to an RRD database.

This script works like this if it is stored (and executable)
under /var/www/rrd/linknx_temp_office

.. code-block:: bash

    #!/bin/bash
    #
    # update .rrd database text file from linknx
    #
    # $Id: update_cputemp 275 2013-05-16 05:20:56Z lenik $

    cd /var/www/rrd

    # create database if not exists
    [ -f linknx_temp_office.rrd ] || {
    /usr/bin/rrdtool create linknx_temp_office.rrd --step 300 \
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
    temp=`cat /var/lib/linknx/temp_office`


    # Update database
    rrdtool update linknx_temp_office.rrd N:$temp

The following line must be added in /etc/crontab to call the script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/linknx_temp_office