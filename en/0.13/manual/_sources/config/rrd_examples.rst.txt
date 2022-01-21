
.. _rrd_introduction:

RRD introduction & examples
===========================

.. HINT::

    This section can be ignored if an openHAB backend is used. Help
    with displaying diagrams with the openHAB backend can be found
    in the documentation of the :ref:`Diagram plugin <diagram>`.

General information about RRD
-----------------------------

The CometVisu diagrams are generated via RRD. These are usually
stored in the directory ``/var/www/rrd``.

General information about RRD can be found in English
`here <http://oss.oetiker.ch/rrdtool/doc/index.en.html>`__ 
and of course at
`Wikipedia <http://de.wikipedia.org/w/index.php?title=RRDtool&oldid=125588545>`__

Information on creating RRD databases can be found in English
`here <http://oss.oetiker.ch/rrdtool/doc/rrdcreate.en.html>`__

Information on updating / filling RRD databases can be found in English 
`here <http://oss.oetiker.ch/rrdtool/doc/rrdupdate.en.html>`__

RRD and the CometVisu
---------------------

To view a chart in the CometVisu you need:

-   CometVisu Chart Plugin
-   RRD file
-   rrdtool tuned to CometVisu (either an additional script
    or an `RRDtool with patches <CometVisu / rrdtool>`__)

(both are on the wiregate and on the Raspberry Pi image
standard available)

.. code-block:: bash

    root@Traumhaus:/var/www/rrd# cat /etc/crontab
    # /etc/crontab: system-wide crontab
    # Unlike any other crontab you don't have to run the 'crontab'
    # command to install the new version when you edit this file
    # and files in /etc/cron.d. These files also have username fields,
    # that none of the other crontabs do.

    SHELL=/bin/sh
    PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

    # m h dom mon dow user  command

    # several rows away, please do NOT use this file copy & paste but attach the RRD Cron down to the existing File!!!``

    */5 *   * * *   root    /var/www/rrd/cputemp
    */5 *   * * *   root    /var/www/rrd/processes
    */5 *   * * *   root    /var/www/rrd/cpuload
    */5 *   * * *   root    /var/www/rrd/cpuload15

``*/5 * * * *`` means that the job every 5 minutes at any time
is performed. The smallest time interval with the crontab
is realizable is ``*/1``, so every minute.

The update distance should match the RRD database!

Create the RRD database
-----------------------

The RRD file/database must first be created.

For this you have to consider when creating the database how many
records should be stored. The database is then created and populated
with "NaN" (Not A Number) values. The size of the database will then
no longer change.

This means that when the maximum number of records in a table is reached,
the oldest is rejected when a new value is entered. However, this
is not a problem as values are regularly summarized.

In practice this means that the resolution of the values decreases
with increasing time interval to "now". (for example, minute values
for the last 7 days, hourly values for the last 4 weeks, daily
values for the last 2 years etc ...)

"Filling" the RRD database
--------------------------

The RRD file / database must be regularly filled with data - if this
does not happen RRD recognizes this and enters automatic NaN - so
that the summaries remain correct.

To do this, call the rrdtool with the "update" parameter and pass
a time stamp (or N for "Now"), as well as the values to be
included in the database.

The easiest way to do this is via a short shell script, which can
then be executed regularly via cron.

Troubleshooting
---------------

If RRD-based data is not displayed as intended, you can look directly
into the database to see if any (meaningful) values exist. There
is this for that

.. code-block:: bash

    rrdtool dump

Command. This represents the database as text. You should then filter
out lines with NaN (Not a Number) and only look at data lines.
This can be done e.g. with the grep command:

.. code-block:: bash

    rrdtool dump NAMEOFTHEDATABASE.rrd | grep row | grep -v NaN

Examples of RRDs
----------------

.. HINT::

    These examples do not work with openHAB

(the example scripts generate the RRD database at the first
call, then update the database)

-  :doc:`rrd/cpuload` - the CPU load (1 min, 5 min, 15 min) is written to an RRD database

-  :doc:`rrd/processes` - the number of running processes is written to an RRD database

-  :doc:`rrd/pi_cputemp` - Raspberry CPU internal temperature sensor query and save in the RRD

-  :doc:`rrd/knx_linknx` - Writing a KNX value stored persistently with Linknx (here a
   temperature of an RTR) in an RRD database.

-  :doc:`rrd/1wire_owfs` - Direct reading of a 1wire temperature sensor into an RRD database

for advanced users (adjustments in the script are probably required)

-  :doc:`rrd/ifHCoctets` - Internet monitoring via SNMP - adjustments are required!

.. toctree::
    :hidden:
    :glob:

    rrd/*
