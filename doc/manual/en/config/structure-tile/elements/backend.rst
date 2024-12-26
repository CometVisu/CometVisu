.. _tile-element-backend:

Configuration of the backend connection
=======================================

.. api-doc:: cv.ui.structure.tile.elements.Backend

The tile structure supports simultaneous connection to any number of backends. It is possible to establish a
connection to an MQTT broker and use this in parallel to the default backend connection.

.. parameter-information:: cv-backend tile

There are a few rules to follow when using multiple backends:

1. At least one backend must be defined in the configuration file otherwise there will be no communication.
2. There cannot be two cv-backend elements with the same name. The default name of a backend is "main",
   i.e. the ``<cv-backend>`` element without the ``name`` attribute is given the name "main" (and therefore only one cv-backend
   element without name is allowed)

**How the name of a backend is determined**

If no ``name`` attribute exists, the name of the backend is determined according to the following rules:
The first `cv-backend`` entry without a ``name`` attribute is given the name "main", for the following entries
the name corresponds to the value of the ``type`` attribute.

.. HINT::

    The name ``system`` is reserved for the internal :ref:`system backend <tile-backend-system>` and must not be used.

Example for the simultaneous use of the KNXD and MQTT backend:

.. code:: xml

    <cv-backend type="knxd" uri="/cgi-bin/l" />
    <cv-backend type="mqtt" uri="ws://mqtt:9001/" />

In this case, all ``cv-address`` elements without ``name`` attribute (or with ``name="main"``) use the default backend
and all ``cv-address`` elements with ``name="mqtt"`` use the MQTT backend.


Connection to KNXD / EIBD
-------------------------

.. code:: xml

    <cv-backend type="knxd" />

The KNXD/EIBD does not yet require any access data, so the attributes “username” and “password” are not used here.
If you use CometVisu in the official Docker container, you also do not need to define the ``uri`` attribute
because this value is determined there differently.

Connection to openHAB
---------------------

.. code:: xml

    <cv-backend type="openhab" username="<access-token>"/>

An API token is required for the openHAB backend, which you can generate yourself in the openHAB UI:
https://www.openhab.org/docs/configuration/apitokens.html.
If you use the CometVisu in the official Docker container, you also do not need to add the ``uri`` attribute
because this value is determined there differently.
If you serve the CometVisu with an own web server, it must act as a proxy for the connection
to the openHAB server. For example, if an Apache HTTP server is used, the following must added to its
configuration file:

.. code-block:: apache

    ProxyPass /rest http://openhab:8080/rest
    ProxyPassReverse http://openhab:8888/rest /rest

The following entry must then be used to connect to openHAB.

.. code:: xml

    <cv-backend type="openhab" username="<access-token>" uri="/rest/" />

.. HINT::

    In openHAB created scenes (or rules) can also be startet via the openHAB backend.
    To do this, an address must be used with the following syntax: ``<cv-address mode="write" value="1">scene:123456abcd</cv-address>``.
    Scenes / rules have no status, so the value is always set to 1 and only the mode ``write`` can be used.
    It is important here to use the prefix ``scene:`` followed by the ID of the scene / rule.
    The value of ``value`` is irrelevant here, since it is not sent to the backend when activating the scene/rule, it is only used
    to give a small visual feedback in the UI when the scene is clicked.


Connection to an MQTT-Broker
----------------------------

.. code:: xml

    <cv-backend type="mqtt" uri="ws://mqtt:9001/"/>

The MQTT broker must support websocket connections so that CometVisu can communicate with it.
If the broker requires access data, these can be specified using the ``username`` and ``password`` attributes.


.. _tile-backend-system:

Access to internal state and functions
--------------------------------------

A special backend that is always present and does not need to be configured separately is the system backend.

Backend connections
...................

With this backend you can, for example, build a switch that displays the connection status to a backend and
when you click on it the connection restarts.

.. code-block:: xml

    <cv-meta>
        <cv-mapping name="Connected">
            <entry value="0">ri-link-unlink-m</entry>
            <entry value="1">ri-link-m</entry>
        </cv-mapping>
        <cv-styling name="RedActive">
            <entry value="0">red</entry>
            <entry value="1">active</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch mapping="Connected" styling="RedActive">
        <cv-address slot="address" backend="system" mode="write" value="restart">backend:main</cv-address>
        <cv-address slot="address" backend="system" mode="read">backend:main:connected</cv-address>
        <span slot="primaryLabel">Connection</span>
        <span slot="secondaryLabel">openHAB</span>
    </cv-switch>

Browser actions
...............

Another alternative is a button to reload the browser window.

.. code-block:: xml

    <cv-switch>
        <cv-address slot="address" backend="system" mode="write" value="reload">browser</cv-address>
        <cv-icon slot="icon">ri-refresh-line</cv-icon>
        <span slot="primaryLabel">Reload</span>
    </cv-switch>

Alternatively, you can use ``value="forced-reload"`` to ensure that the CometVisu files have actually been reloaded
and the browser cache is bypassed.

Page navigation
...............

This backend also offers an alternative to the page jumps known from the Pure structure, with which a
navigation to a specific page is possible.

.. code-block:: xml

    <cv-switch styling="tile-button">
      <cv-address slot="address" backend="system" value="floorplan">nav:current-page</cv-address>
      <cv-icon slot="icon">ri-external-link-line</cv-icon>
      <span slot="primaryLabel">Rooms</span>
    </cv-switch>

When you click on this widget, the page with the id "floorplan" (``<page id="floorplan">``) will be opened.

Trigger HTTP-Requests
.....................

Simple HTTP requests can be triggered, for example to start actions in external systems.

.. code-block:: xml

    <cv-button size="small" style="position: absolute; top: 0; right: 0; color: red">
      <cv-address mode="write" backend="system">https://somewhere/delete?this</cv-address>
      <cv-icon class="ri-delete-bin-line"/>
    </cv-button>

A CORS error often occurs when calling URLs from external websites, because calling an external URL is considered a security risk.
This can be circumvented by using CometVisu's internal proxy function.
To do this, the URLs to be called must be expanded with “:proxy”. For the above example it would be:
``https://somewhere/delete?this`` -> ``https:proxy://somewhere/delete?this``.


Light- /Dark-Theme
..................

If the design supports light & dark themes, the theme can also be changed via the system backend.

.. code-block:: xml

    <cv-meta>
        <cv-styling name="LightTheme">
          <entry value="light">active</entry>
          <entry value="dark">inactive</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch on-value="light" off-value="dark" mapping="" styling="LightTheme">
      <cv-address slot="address" backend="system">theme</cv-address>
      <cv-icon slot="icon">ri-sun-line</cv-icon>
      <span slot="primaryLabel">Light-Theme</span>
    </cv-switch>


Internal states
...............

You can also use the system backend to write internal states and thus trigger actions within the
visualization with a mouse click. This can be used, for example, to create a button that triggers a refresh
of a :ref:`image <tile-component-image>` or a :ref:`list model <tile-component-list>` when clicked.

.. code-block:: xml

    <cv-button>
      <cv-address mode="write" backend="system">state:refresh-image</cv-address>
      <cv-icon class="ri-refresh-line"/>
    </cv-button>

    <cv-image src="http://webcam/snapshot.jpeg">
        <cv-address mode="read" target="refresh" backend="system">state:refresh-image</cv-address>
    </cv-image>
