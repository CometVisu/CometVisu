.. replaces:: CometVisu/0.8.x/etc/rrd/ifHCoctets/de
    CometVisu/0.8.x/etc/rrd/ifHCoctets

Internet-Bandbreite
-------------------

Die genutzte Internet-Bandbreite kann man mit diesem Script in eine RRD Datenbank füllen:

Es werden über das SNMP Protokoll die 64-bit Counter der Interface-Statistiken ausgelesen und beide
Richtungen in eine RRD Datenbank geschrieben. Dies muss später bei der Visualisierung beachtet werden
(der datasourceIndex muss gesetzt werden)

Um dieses Script benutzen zu können muss der Router SNMP unterstützen und es muss eine READ-Community
konfiguriert werden. Zudem muss der Router die IF-MIB nach RFC2233 unterstützen, dies sollte jedoch heute
bei allen Geräten gegeben sein.

Es muss angepasst werden:

* SNMP community (im Beispiel GEHEIMECOMMUNITY)
* IP-Addresse des Routers (im Beispiel 192.168.1.1)
* evt. der Interface-Index (im Beispiel .1 in IF-MIB::ifHCInOctets.1, hier können andere Zahlen erforderlich sein - notfalls probieren)

Dieses Script funktioniert so wenn es unter /var/www/rrd/xxx gespeichert (und ausführbar) ist.

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

Im /etc/crontab muss folgende Zeile hinzugefügt werden, um das Script alle 5 Minuten aufzurufen:

.. code-block:: bash

    */5 *   * * *   root    /var/www/rrd/network_internet