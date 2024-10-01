.. _tile-element-address:

Addresses - communication with the backend
==========================================

.. api-doc:: cv.ui.structure.tile.elements.Address

Most widgets use one or more ``cv-address`` elements to
communicate with the backend, which provides the relevant information
from the KNX bus, OpenHAB or MQTT. The content is the address itself.
The attributes can be used to determine the behavior of the widget in relation to the address:

.. parameter-information:: address tile

.. note::

    In the KNX environment it is common that only one address is defined as ``write``
    and one or more addresses as ``read``. Usually different addresses are used for read and write.

    This principle is exactly the same as with all other KNX
    components where the value is set via one address and the feedback is received via another address.

Backend attribute
-----------------

Several backends can be defined in the tile structure with which the CometVisu can communicate at the same time.
For example, a connection to an MQTT broker can be established in addition to the KNX backend.
It is even possible to be connected to multiple backends of the same type at the same time.
Each configured :ref:`Backend <tile-element-backend>` has a unique name, which is set by the ``name`` attribute.
If this is not specified, the name corresponds to the value of the ``type`` attribute.
So if you have defined the following 3 backends:

.. code:: xml

    <cv-backend type="openhab" username="..."/>
    <cv-backend name="si" default="true" type="simulated"/>
    <cv-backend name="mqtt-broker" type="mqtt" uri="ws://mqtt:9001/"/>

you can use them in the ``<cv-address>`` elemts in the following way:

.. code:: xml

    <!-- Default backend -->
    <cv-address transform="DPT:1001">1/0/0</cv-address>

    <!-- openHAB backend -->
    <cv-address transform="OH:switch" backend="openhab">Switch_Item</cv-address>

    <!-- MQTT backend -->
    <cv-address transform="MQTT:number" backend="mqtt-broker">/topic/baz</cv-address>


.. _tile-element-address-target:

Target attribute
----------------

The possible values and their effects for the ``target`` attribute always depend on the element in
which the ``<cv-address>`` element is used. Therefore, only a few examples are given here that work in all
widgets/components.

Control visibility
..................

There are two ways to influence visibility:

* ``target="show-hide"``: Makes the widget invisible but doesn't change the layout, it creates an empty area
* ``target="show-exclude"``: Removes the widget from the layout, no empty space is created

In this example, the entire tile would be deleted from the layout if the backend sends the value 0 for that address
If a 1 is sent, the tile will be shown again.

.. code:: xml

    <cv-widget>
        <cv-tile>
            <cv-address transform="DPT:1.001" mode="read" target="show-exclude">1/0/0</cv-address>
        </cv-tile>
    <cv-widget>

Deactivate widgets
..................

In this example, the entire tile, including all controls within it would be deactivated and no longer respond
to user interactions such as mouse clicks.

.. code:: xml

    <cv-widget>
        <cv-tile>
            <cv-address transform="DPT:1.001" mode="read" target="enabled">1/0/0</cv-address>
        </cv-tile>
    </cv-widget>

Mark widget as outdated
.......................

Especially with widgets that display a value, it is important to know that this value is current.
If you have the opportunity to get the time of the last update from the backend, you can
use that to mark the widget as outdated if it has been too long since the last update.

.. widget-example::

    <settings design="tile" selector="cv-info">
        <screenshot name="cv-info-outdated">
            <data address="1/4/2">21.5</data>
            <data address="1/4/3" type="time">00:00:00</data>
        </screenshot>
    </settings>
    <cv-info format="%.2f">
        <cv-address slot="address" mode="read" transform="DPT:9.001">1/4/2</cv-address>
        <cv-address slot="tileAddress" transform="DPT:10.001" mode="read" target="last-update:120">1/4/3</cv-address>
        <span slot="label">Living room</span>
        <span slot="unit">°C</span>
    </cv-info>

The ``target="last-update:120"`` indicates that the time cannot be more than 120 seconds ago, otherwise
the widget will be marked as obsolete.

This feature is available in all predefined widgets. You can also use it in your own widgets,
you just have to leave out the slot attribute from the example.

.. code:: xml

    <cv-widget>
        <cv-tile>
            <cv-address transform="DPT:10.001" mode="read" target="last-update:120">1/4/3</cv-address>
        </cv-tile>
    </cv-widget>


Transform
---------

For the backend specific valid values of the respective backend for ``transform``
the corresponding "namespace" is separated by a colon in front of the respective
data type written. The valid values for the backends are:

KNX
...

.. backend-transform:: DPT

OpenHab
.......

.. backend-transform:: OH

MQTT
....

.. backend-transform:: MQTT

Communication with MQTT can be specified further via additional attributes in the ``<address>`` element:

================ =================================================================================
``selector``     The JSON path, if the communication object is transmitted as JSON.
``retain``       If ``true`` sets the retain flag so that the data is immediately made available
                 to new communication participants on the MQTT.
``qos``          Sets the QOS value.
``ignore-error`` Ignores conversion errors that e.G. do not match to the ``selector``.
================ =================================================================================

Example:
^^^^^^^^^

To address a numeric value at the topic ``/topic/baz`` that is transmitted in a JSON like

.. code-block:: json

    {
      "foo": [
        {"bar": 0}
        {"bar": 1}
      ]
    }

the ``<cv-address>`` element would look like this:

.. code-block:: xml

     <cv-address transform="MQTT:number" selector="foo[1].bar" retain="true">/topic/baz</cv-address>

Raw-values / Test:
..................

The ``transform`` values without a namespace are essentially just for the
development of CometVisu, but in special cases can also be relevant in productive environments:

.. backend-transform::
