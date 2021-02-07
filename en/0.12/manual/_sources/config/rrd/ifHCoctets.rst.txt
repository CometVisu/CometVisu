Internet-Bandwidth
------------------

The used Internet bandwidth can be filled with this script in
an RRD database:

The 64-bit counters of the interface statistics are read out
via the SNMP protocol and written in both directions in an RRD
database. This must be considered later during the visualization
(the datasourceIndex must be set)

To use this script, the router must support SNMP and a READ
community must be configured. In addition, the router must
support the IF-MIB RFC2233, but this should be the case today
for all devices.

It needs to be adjusted:

* SNMP community (in the example GEHEIMECOMMUNITY)
* IP address of the router (in the example 192.168.1.1)
* evt. the interface index (in the example.1 in IF-MIB::ifHCInOctets.1, here other numbers may be required - if necessary try)

This script works like this if it is saved (and executable)
under /var/www/rrd/xxx.

.. code-block:: bash

    #!/bin/bash
    #

    cd /var/www/rrd

    # create database if not exists
    [ -f network_internet.rrd ] || {
    /usr/bin/rrdtool create network_internet.rrd --step 60 \
    DS:Internet_IN:COUNTER:1200:U:U \
    DS:Internet_OUT:COUNTER:1200:U:U \
    RRA:AVERAGE:0.5:1:3200 \
    RRA:AVERAGE:0.5:6:3200 \
    RRA:AVERAGE:0.5:36:3200 \
    RRA:AVERAGE:0.5:144:3200 \
    RRA:AVERAGE:0.5:1008:3200 \
    RRA:AVERAGE:0.5:4320:3200 \
    RRA:AVERAGE:0.5:52560:3200 \
    RRA:AVERAGE:0.5:525600:3200
    }

    NET_INTERNET_IN=$(expr $(snmpget -Oqv -v 2c -c GEHEIMECOMMUNITY 192.168.1.1 IF-MIB::ifHCInOctets.1) / 1000 \* 8)
    NET_INTERNET_OUT=$(expr $(snmpget -Oqv -v 2c -c GEHEIMECOMMUNITY 192.168.1.1 IF-MIB::ifHCOutOctets.1) / 1000 \* 8)

    /usr/bin/rrdtool update network_internet.rrd `date +%s`:$NET_INTERNET_IN:$NET_INTERNET_OUT

The following line must be added in /etc/crontab to call the
script every 5 minutes:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/network_internet