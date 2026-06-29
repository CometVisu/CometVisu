
Number of process on Linux system
---------------------------------

The number of active processes on a Linux system can be filled into
an RRD database with this script. This script works as it is stored
(and executable) under /var/www/rrd/processes

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

    # Use ps and wc to determine the number of processes
    PROZESSE=$(ps hax|wc -l)

    # Finally, the data comes into the database
    # N stands for the current date and time
    /usr/bin/rrdtool update processes.rrd N:$PROZESSE

The following line must be added in /etc/crontab to call the script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/processes