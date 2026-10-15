.. _address:

Addresses - the communication with the backend
==============================================

Most widgets require one or more ``address`` elements for the communication
with the backend to get the information from the KNX bus, OpenHAB or MQTT.
The content of the element is the address itself, the attributes control
the behavior:

============= ==================================================================
``transform`` set the datatype at the backend, e.g. ``DPT:1.001`` for the KNX
              datapoint type 1.001
``mode``      defines whether the address will only be listened at (``read``),
              written to (``write``) or both (``readwrite``)
``variant``   optional and only relevant for some widgets where multiple
              addresses are required at the same time, e.g. to define the red,
              green and blue channel for a color
============= ==================================================================

Transform
---------

The "namespace" for the backend specific value for ``transform`` is separated
by a colon written in front of the data type. The valid values for the different
backends are:

KNX
...

.. backend-transform:: DPT

OpenHab
.......

.. backend-transform:: OH

MQTT
....

.. backend-transform:: MQTT

Raw-Values / test:
..................

The ``transform`` values without a namespace are mostly for development
purposes of the CometVisu, but in special cases they might also be useful
in the production environment.

.. backend-transform::

Mode
----

.. note::

    In the KNX context it is common to have ``write`` for only one address
    and one or more (different) addresses with ``read``.

    This principle is exactly the same that the KNX components are using to
    set a value and give back the status.
