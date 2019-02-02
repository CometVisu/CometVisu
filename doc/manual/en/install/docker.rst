.. _docker:

Installation of the Docker container
====================================

The CometVisu project offers officially built Docker containers that are
available at DockerHub
`cometvisu/cometvisu <https://hub.docker.com/r/cometvisu/cometvisu/>`_.

Versions
--------

The newest releases are available as
`tag <https://hub.docker.com/r/cometvisu/cometvisu/tags/>`_ with their release
name as well as ``latest`` for the most current release.

The current development versions can be found by the tag ``testing-<date>`` as
well as ``testing`` alone for the most current one. When during the development
process a new pull request get's merged a new ``testing`` container will be
automatically built and filed under the current date. If a tag does not exist
for this date, it will be created, and if the tag already exists,
it will be overwritten with the newly created container.

Setup
-----

.. _dockerenvironment:

Environment parameters
~~~~~~~~~~~~~~~~~~~~~~

The container gets its configuration by the environment variables.
Available is:

+--------------------+-------------------------+-----------------------------------------------------------------------+
|Parameter           |Default                  |Description                                                            |
+====================+=========================+=======================================================================+
|KNX_INTERFACE       |iptn:172.17.0.1:3700     |Setting this to empty string, will prevent the knxd from being started |
+--------------------+-------------------------+-----------------------------------------------------------------------+
|KNX_PA              |1.1.238                  |Physical address (PA) for the ``knxd``                                 |
+--------------------+-------------------------+-----------------------------------------------------------------------+
|KNXD_PARAMETERS     |-u -d/var/log/eibd.log -c|Additional parameters for the ``knxd``                                 |
+--------------------+-------------------------+-----------------------------------------------------------------------+
|CGI_URL_PATH        |/cgi-bin/                |Set the URL prefix to find the ``cgi-bin`` resources                   |
+--------------------+-------------------------+-----------------------------------------------------------------------+
|BACKEND_PROXY_SOURCE|                         |Proxy paths starting with this value, e.g. ``/rest`` for openHAB       |
|                    |                         |backend                                                                |
+--------------------+-------------------------+-----------------------------------------------------------------------+
|BACKEND_PROXY_TARGET|                         |Target URL for proxying the requests to BACKEND_PROXY_SOURCE, e.g.     |
|                    |                         |`http://<openhab-server-ip-address>:8080/rest` for openHAB backend     |
+--------------------+-------------------------+-----------------------------------------------------------------------+

Classiscal (``knxd`` with ``eibread-cgi``/``eibwrite-cgi``)
...........................................................

For the classical backend a ``knxd`` is used. It connects the CometVisu via
``eibread-cgi`` and ``eibwrite-cgi`` to the KNX bus.

The most important environment parameter is ``KNX_INTERFACE`` which must be
adapted to the local system to connect to the KNX interface.
The documentation for the currently used version 0.0.5.1 of the ``knxd``
can be consulted at the
`knxd wiki <https://github.com/knxd/knxd/wiki/Command-line-parameters/e49c9d1a2a81cb692cc88683920108f032d2b9bc>`__.

OpenHAB
.......

Example configuration for the OpenHAB backend (assuming it is running on a
server with the address ``192.168.0.10``):

.. code-block:: bash

    KNX_INTERFACE=
    CGI_URL_PATH=/rest/
    BACKEND_PROXY_SOURCE=/rest
    BACKEND_PROXY_TARGET=http://192.168.0.10:8080/rest

Volumes
~~~~~~~

Configuration files
...................

To make the configuration data persistent over restarts or new setups like
version upgrades they must be stored in a volume. For this the directory
``/var/www/html/config`` (up to version 0.10.2) or
``/var/www/html/resource/config`` (starting with release 0.11) is exported
as a volume.

RRD (diagram plugin)
....................

For the diagram plugin RRD files with the time series can be supplied.
Those must the located and thus mounted at the path ``/var/www/rrd``.
The RRD files themself have to be filled and updated outside of this container.
For that the RRD volume could be mounted in a different container at the
same time.

Ports
~~~~~

The container exports port 80 for the web server.
