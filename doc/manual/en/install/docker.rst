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

The container is configured by environment variables. For the connection to
the KNX bus it contains the FastCGI backend ``cometvisu-knx-fcgi`` (up to
FastCGI backend version 1.2.1: ``cometvisu-knxd-fcgi``) together with Apache
and PHP, so no additional software is needed.

Backend and web server
......................

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Parameter
     - Default
     - Description
   * - ``BACKEND_NAME``
     - ``knxd``
     - Backend name: ``knxd`` (KNX), ``openhab`` or ``mqtt``. For the KNX bus
       the name is ``knxd`` for all transports.
   * - ``BACKEND_KNXD``
     - ``<CGI_URL_PATH>l``
     - URL of the ``l`` (login) resource of the KNX backend.
   * - ``BACKEND_OPENHAB``
     - ``<CGI_URL_PATH>``
     - Path to the openHAB REST-API.
   * - ``BACKEND_MQTT``
     - *(empty)*
     - URL of the MQTT broker (WebSocket interface).
   * - ``CGI_URL_PATH``
     - ``/cgi-bin/``
     - **Deprecated:** URL prefix of the ``cgi-bin`` resources.
   * - ``BACKEND_PROXY_SOURCE``
     - *(empty)*
     - Proxy paths starting with this value, e.g. ``/rest`` for the openHAB
       backend.
   * - ``BACKEND_PROXY_TARGET``
     - *(empty)*
     - Target URL for proxying the requests to ``BACKEND_PROXY_SOURCE``,
       e.g. ``http://<openhab-server-ip-address>:8080/rest`` for the openHAB
       backend.
   * - ``APACHE_PORT``
     - ``80``
     - Expert option: port Apache listens on inside the container. When
       changed, publish with ``-p <host-port>:<APACHE_PORT>``.
   * - ``ACCESS_LOG``
     - ``false``
     - Show the access log of the web server when set to ``true``.
   * - ``STOP_ON_BAD_HEALTH``
     - ``true``
     - Stop the container on a failed health check when set to ``true``.

KNX connection (FastCGI backend)
................................

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Parameter
     - Default
     - Description
   * - ``KNX_TRANSPORT``
     - ``knxd``
     - Transport to the KNX bus: ``knxd``, ``ip-tunnel`` or ``ip-routing``.
       An empty value means ``knxd``; an unknown value stops the container.
   * - ``FCGI_SOCKET``
     - ``/run/cometvisu-fcgi.sock``
     - FastCGI listen socket of the backend. Apache forwards
       ``/cgi-bin/l``, ``/cgi-bin/r`` and ``/cgi-bin/w`` to it.
   * - ``FCGI_WORKERS``
     - ``9``
     - Number of worker processes (2 - 256). Two workers are reserved for
       ``/w`` and ``/l``, so ``FCGI_WORKERS - 2`` clients can long-poll at
       the same time.
   * - ``LONGPOLL_TIMEOUT_SEC``
     - ``300``
     - Maximum duration of a long-poll of ``/r`` in seconds.
   * - ``KNX_TX_MAX_PER_SEC``
     - ``10``
     - Upper bound for outgoing KNX telegrams per second over all clients.
   * - ``DEBUG_BACKEND``
     - *(unset)*
     - Set to ``1`` to enable the debug logging of the FastCGI backend.
   * - ``NO_ENTRYPOINT_KNXD``
     - ``false``
     - **Only for ``KNX_TRANSPORT=knxd``:** ``false``: the container starts
       the bundled ``knxd``. ``extern``: do **not** start the ``knxd`` and
       use the socket of an external ``knxd`` (see ``KNXD_SOCKET``).
       ``true``: start neither the ``knxd`` nor the FastCGI backend. The
       ``ip-*`` transports ignore this variable and always start the
       FastCGI backend.
   * - ``KNXD_SOCKET``
     - ``/run/knx``
     - **Only for ``KNX_TRANSPORT=knxd``:** path to the Unix socket of an
       external ``knxd``. Only used with ``NO_ENTRYPOINT_KNXD=extern``.

Since version 2.0 the FastCGI backend uses exactly **one** connection to
the ``knxd`` for all workers. ``FCGI_WORKERS`` is therefore independent of
``KNX_CLIENT_PAS``; the number of client connections of the ``knxd`` only
has to leave room for that one connection and, if needed, for tools like
``knxtool``.

Transport ``knxd`` (``knxd`` inside the container)
..................................................

This is the default. The container starts a bundled ``knxd`` and the
FastCGI backend. The most important parameter is ``KNX_INTERFACE`` which
has to be adapted to the local system.

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Parameter
     - Default
     - Description
   * - ``KNX_INTERFACE``
     - *(empty)*
     - KNX interface for the ``knxd``, in the form
       ``<backend>:<address>:<port>``. **Required** when the container
       starts the ``knxd``. ``iptn:<ip>:<port>`` selects KNXnet/IP
       tunneling, e.g. ``iptn:192.168.0.10:3671``.
   * - ``KNX_PA``
     - ``1.1.238``
     - Physical address (PA) of the ``knxd``.
   * - ``KNX_CLIENT_PAS``
     - ``1.1.239:10``
     - Physical address and number of client connections
       (``<address>:<count>``) that the ``knxd`` offers. At least 2
       connections are required.
   * - ``KNX_INTERFACE_OPTIONS``
     - ``-B single -A retry-delay=1``
     - Additional parameters for the KNX interface of the ``knxd``.
   * - ``KNXD_PARAMETERS``
     - *(empty)*
     - Complete parameter set for the ``knxd``. When set, all other
       ``knxd`` parameters are ignored.

The documentation of the bundled ``knxd`` version can be consulted at the
`knxd wiki <https://github.com/knxd/knxd/wiki/Command-line-parameters>`__.

Example (a KNX IP interface at ``192.168.0.10``):

.. code-block:: bash

    docker run -d -p 8080:80 \
      -e KNX_INTERFACE=iptn:192.168.0.10:3671 \
      -e KNX_PA=1.1.238 \
      cometvisu/cometvisu:latest

Transport ``knxd`` (external ``knxd``)
......................................

When a ``knxd`` already runs outside of the container (e.g. on the host or in
another container) it must not be started twice. Set
``NO_ENTRYPOINT_KNXD=extern`` to skip starting the bundled ``knxd``. The
FastCGI backend is still started and connects to the socket given by
``KNXD_SOCKET``:

.. code-block:: bash

    docker run -d -p 8080:80 \
      -v /run:/host-run:ro \
      -e NO_ENTRYPOINT_KNXD=extern \
      -e KNXD_SOCKET=/host-run/knx \
      -e BACKEND_NAME=knxd \
      -e BACKEND_KNXD=https://server.local/cgi-bin/l \
      cometvisu/cometvisu:latest

Notes for this mode:

- Mount the **directory** containing the socket rather than the socket file
  itself. A bind mount of the socket file keeps pointing to the old inode
  when the external ``knxd`` is restarted and recreates the socket.
- ``KNX_PA``, ``KNX_CLIENT_PAS``, ``KNX_INTERFACE``,
  ``KNX_INTERFACE_OPTIONS`` and ``KNXD_PARAMETERS`` are ignored - the
  external ``knxd`` brings its own configuration. Its group cache must be
  enabled for reads.
- ``NO_ENTRYPOINT_KNXD=true`` starts neither the ``knxd`` nor the FastCGI
  backend. Use it only when you provide the FastCGI backend yourself (e.g.
  as a socket mounted into the container); otherwise the ``knxd`` backend
  is unavailable and ``/cgi-bin/l`` fails.

Transport ``ip-tunnel`` - no knxd
.................................

With ``KNX_TRANSPORT=ip-tunnel`` the container does **not** start the
bundled ``knxd`` (regardless of ``NO_ENTRYPOINT_KNXD``). The FastCGI backend
connects directly to a KNX IP interface or KNX IP router as a tunneling
client, i.e. the CometVisu behaves like a classical KNX device.

The image ships the ``KNX_IP_*`` variables empty; the defaults shown below
are the defaults of the FastCGI backend. The container only passes on the
variables that are set, so an empty value never overrides a backend
default.

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Parameter
     - Default
     - Description
   * - ``KNX_IP_HOST``
     - *(empty)*
     - Address of the KNX IP interface or KNX IP router. **Required**.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP UDP port.
   * - ``KNX_IP_LOCAL_ADDR``
     - *(OS choice)*
     - Local address that is advertised to the device. Helpful when the
       container runs behind NAT or on a multi-homed host.
   * - ``KNX_IP_NAT``
     - ``0``
     - ``1`` enables the NAT mode of the tunnel connection.
   * - ``KNX_IP_HEARTBEAT_SEC``
     - ``60``
     - Interval of the connection state request.
   * - ``KNX_IP_ACK_TIMEOUT_MS``
     - ``1000``
     - Timeout before a telegram is repeated.
   * - ``KNX_IP_RETRIES``
     - ``3``
     - Number of repetitions per telegram.

``KNX_INTERFACE``, ``KNX_PA``, ``KNX_CLIENT_PAS``,
``KNX_INTERFACE_OPTIONS``, ``KNXD_PARAMETERS`` and ``KNXD_SOCKET`` are
ignored in this mode. ``NO_ENTRYPOINT_KNXD`` has no effect - the FastCGI
backend is always started.

Example:

.. code-block:: bash

    docker run -d -p 8080:80 \
      -e KNX_TRANSPORT=ip-tunnel \
      -e KNX_IP_HOST=192.168.0.10 \
      -e KNX_IP_NAT=1 \
      cometvisu/cometvisu:latest

Notes:

- A KNX IP interface usually only offers a small number of tunneling
  connections (often 4). One of them is used by the CometVisu. When all
  slots are taken the container cannot connect to the bus.
- With the default Docker bridge network the container is behind NAT, so
  either set ``KNX_IP_NAT=1`` (the device has to support NAT) or run the
  container with ``--network host``.
- When ``--network host`` is used, ``-p`` cannot be used. If port 80 is
  already occupied on the host, set ``APACHE_PORT`` instead.

Transport ``ip-routing`` - no knxd
..................................

With ``KNX_TRANSPORT=ip-routing`` the container does **not** start the
bundled ``knxd`` (regardless of ``NO_ENTRYPOINT_KNXD``). The FastCGI
backend joins the KNXnet/IP multicast group and participates in the
routing like a KNX IP router.

``KNX_INTERFACE``, ``KNX_PA``, ``KNX_CLIENT_PAS``,
``KNX_INTERFACE_OPTIONS``, ``KNXD_PARAMETERS`` and ``KNXD_SOCKET`` are
ignored in this mode. ``NO_ENTRYPOINT_KNXD`` has no effect - the FastCGI
backend is always started.

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Parameter
     - Default
     - Description
   * - ``KNX_IP_MULTICAST``
     - ``224.0.23.12``
     - Multicast group of the KNXnet/IP routing.
   * - ``KNX_IP_IFACE``
     - *(default route)*
     - Network interface for the multicast group.
   * - ``KNX_IP_INDIVIDUAL_ADDR``
     - ``15.15.250``
     - Individual address (``A.B.C``, A and B in ``0..15``, C in ``0..255``,
       not ``0.0.0``) used as the source of the routing telegrams. It must
       be a free physical address of the installation.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP UDP port.

Example:

.. code-block:: bash

    docker run -d --network host \
      -e KNX_TRANSPORT=ip-routing \
      -e KNX_IP_IFACE=eth0 \
      -e KNX_IP_INDIVIDUAL_ADDR=15.15.250 \
      cometvisu/cometvisu:latest

Notes:

- ``--network host`` is required, because multicast traffic does not
  cross the default Docker bridge network.
- The KNX IP router has to be configured for routing and has to be in the
  same network segment.
- ``KNX_IP_INDIVIDUAL_ADDR`` must be a free physical address. A router
  rejects the address ``0.0.0``.
- When port 80 is already occupied on the host, set ``APACHE_PORT``.
- Every participant of the multicast group can read the bus traffic and
  send telegrams. Use this mode only in a trusted network segment.

OpenHAB
.......

Example configuration for the OpenHAB backend (assuming it is running on a
server with the address ``192.168.0.10``):

.. code-block:: bash

    BACKEND_NAME=openhab
    BACKEND_OPENHAB=/rest/
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
