.. replaces:: CometVisu/Installation/WireGate/en
    CometVisu/en/0.12/manual/install/wiregate.html

.. _generic:

Prerequisites for the installation
==================================

To be able to use the CometVisu the system needs to
fulfill a few prerequisites.

These are

-  a backend to connect the KNX bus
-  [optional] rrdtool for diagrams
-  [optional] InfluxDB for diagrams
-  a web server with (optional but recommended) PHP support
-  the CometVisu software package

.. note::

    To be able to use the :ref:`Manager <manager>` or the :ref:`Editor <editor>`
    the prerequisite is PHP 7. The core of the CometVisu itself can be used
    without PHP though.

Backend
-------

To be able to connect the devices with the CometVisu you need a "backend".

.. note::

    The CometVisu supports only one backend at the same time. The simultaneous
    connection to multiple backends is not supported.

There are different possibilities:

knxd / eibd
~~~~~~~~~~~

For a direct connection to the KNX bus the knxd is used.
The installation of the backend is described under
:doc:`backends/install-eibd`.

.. toctree::
    :hidden:

    backends/install-eibd

openHAB
~~~~~~~

To use openHAB as backend you can refer to
:doc:`openhab`
and
:doc:`docker_openhab`.

MQTT
~~~~

To use the CometVisu as one of the MQTT participant you need a MQTT broker
that can be contacted with WebSockets.

ioBroker
~~~~~~~~

The installation of the "Web socket" adapter is required. This adapter will
be used for data exchange.

Backend configuration
~~~~~~~~~~~~~~~~~~~~~

To configure the CometVisu to use a given backend different possibilities are
available, listed below.
There a later listed method overrules those above it, e.g. the values from the
config file will be used even when those are set differently with docker
environment variables.

HTTP header / Docker environment variable
.........................................

.. spelling:word-list::

    OpenHAB
    Url
    url
    LoginUrl
    mqtt
    username
    password

The web server can pass setup information in the HTTP header of the
config file. By using the official docker image of the CometVisu this can
be achieved by setting the corresponding ``ENVIRONMENT`` parameters.

================================ ================ ===========
HTTP header                      ``ENVIRONMENT``  use
-------------------------------- ---------------- -----------
X-CometVisu-Backend-Name         BACKEND_NAME     Name like ``knxd``, ``openhab`` or ``mqtt``
X-CometVisu-Backend-KNXD-Url     BACKEND_KNXD     URL of the knxd login resource
X-CometVisu-Backend-MQTT-Url     BACKEND_MQTT     URL of the MQTT login resource
X-CometVisu-Backend-ioBroker-Url BACKEND_IOBROKER URL of the ioBroker login resource
X-CometVisu-Backend-OpenHAB-Url  BACKEND_OPENHAB  Only openHAB: path to the REST-API
X-CometVisu-Backend-LoginUrl     CGI_URL_PATH     Deprecated: URL of the knxd or openHAB login resource
X-CometVisu-Backend-User         BACKEND_USERNAME Deprecated: user name, when needed for the MQTT broker or openHAB
X-CometVisu-Backend-Pass         BACKEND_PASSWORD Deprecated: password, when needed for the MQTT broker or openHAB
================================ ================ ===========

.. warning::

    The user name and password for the MQTT broker are stored in pain text
    and are transported like that over the network!

Config file
...........

In the all containing ``<pages>`` element the different parameters can be set
as attributes:

==================== ===========
attribute            use
-------------------- -----------
backend              Name like ``knxd``, ``openhab`` or ``mqtt``
backend-knxd-url     URL of the knxd login resource
backend-mqtt-url     URL of the MQTT login resource
backend-iobroker-url URL of the ioBroker login resource
backend-openhab-url  Only openHAB: path to the REST-API
backend-url          Deprecated: URL of the MQTT WebSocket
username             Deprecated: User name, when needed for openHAB
password             Deprecated: Password, when needed for openHAB
==================== ===========

Example:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <pages backend="mqtt" backend-url="wss://web.server:443/mqtt/ws" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="pure" xsi:noNamespaceSchemaLocation="../visu_config.xsd">
      <meta>
        <plugins>
    ...

URL
...

By the URL parameter ``backend`` the backend can also be selected. This is
only relevant for special cases like development or testing. It also requires
that the access URLs are set by one of the other methods.

Graph tool - RRDtool
--------------------

An optional but much-recommended component is rrdtool to
provide the data for creating graphs. There are many ways
to pass data to rrds and the use of rrdtool is documented
in depth. The installation of rrdtool for CometVisu is
described under :doc:`RRDtool <install-rrd>`.

.. toctree::
    :hidden:

    install-rrd

Time series from an InfluxDB database are supported without any additional
external software, only PHP is required.

Web server
----------

The relevant files to connect via eibd/knxd are CGI programs, usually
located at ``/usr/lib/cgi-bin/``. They must be executable for the account
of the web server. This could be enforced by:

.. code-block:: bash

    chmod +x /usr/lib/cgi-bin/r
    chmod +x /usr/lib/cgi-bin/l
    chmod +x /usr/lib/cgi-bin/w
    chmod +x /usr/lib/cgi-bin/rrdfetch

When these files are symbolic links also the link targets (located e.g. at
``/usr/local/bin`` or ``/usr/share/knxd/examples/bin``) must be executable
as well.

To be able to use additional components like the editor the web server must
support PHP.

lighttpd
~~~~~~~~

For the lighttpd web server an example configuration is given. (Other web
servers are also possible, of course). Please make sure that you are
changing the example parameters to fit your need.

To install lighttpd on a Debian or Ubuntu system:

.. code-block:: bash

    apt-get install lighttpd


/etc/lighttpd/lighttpd.conf

.. code-block:: lighttpd

    server.modules = (
            "mod_access",
            "mod_alias",
            "mod_compress",
            "mod_redirect",
    #       "mod_rewrite",
    )

    server.document-root        = "/var/www"
    server.upload-dirs          = ( "/var/cache/lighttpd/uploads" )
    server.errorlog             = "/var/log/lighttpd/error.log"
    server.pid-file             = "/var/run/lighttpd.pid"
    server.username             = "www-data"
    server.groupname            = "www-data"

    index-file.names            = ( "index.php", "index.html",
                                    "index.htm", "default.htm",
                                   " index.lighttpd.html" )

    url.access-deny             = ( "~", ".inc" )

    static-file.exclude-extensions = ( ".php", ".pl", ".fcgi" )

    ## Use ipv6 if available
    #include_shell "/usr/share/lighttpd/use-ipv6.pl"

    dir-listing.encoding        = "utf-8"
    server.dir-listing          = "enable"

    compress.cache-dir          = "/var/cache/lighttpd/compress/"
    compress.filetype           = ( "application/x-javascript", "text/css", "text/html", "text/plain" )

    include_shell "/usr/share/lighttpd/create-mime.assign.pl"
    include_shell "/usr/share/lighttpd/include-conf-enabled.pl"

/etc/lighttpd/conf-enabled/10-cgi.conf

.. code-block:: lighttpd

    # /usr/share/doc/lighttpd-doc/cgi.txt

    server.modules += ( "mod_cgi" )

    $HTTP["url"] =~ "^/cgi-bin/" {
            cgi.assign = ( "" => "" )
    }

    ## Warning this represents a security risk, as it allow to execute any file
    ## with a .pl/.py even outside of /usr/lib/cgi-bin.
    #
    cgi.assign      = (
            ".pl"  => "/usr/bin/perl",
            ".php" => "/usr/bin/php-cgi",
            ".py"  => "/usr/bin/python",
    )

/etc/lighttpd/conf-enabled/11-cgi-cometvisu.conf

.. code-block:: lighttpd

    ### Add cgi for cometvisu
    alias.url += ( "/cgi-bin/" => "/usr/lib/cgi-bin/" )
    compress.filetype += ("application/javascript", "application/xml", "application/octet-stream")

Installing CometVisu
--------------------

The CometVisu can be downloaded at https://github.com/CometVisu/CometVisu and
unpacked at the web root, most likely in it's own directory (e.g.
``/var/www/visu/``).

The released versions of the CometVisu are located at
https://github.com/CometVisu/CometVisu/releases.

A documentation of an install procedure for the  `Raspberry
Pi <http://de.wikipedia.org/wiki/Raspberry_Pi>`__ is
available under :doc:`CometVisu auf Raspberry Pi <raspberry>`.

Testing the installed CometVisu
-------------------------------

Just open http://MyServer/visu/ in the browser.

Have fun!
