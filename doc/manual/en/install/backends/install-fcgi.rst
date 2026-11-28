.. _fcgi:

FastCGI backend (cometvisu-knx-fcgi)
====================================

Since CometVisu 1.0.0 the recommended way to connect the CometVisu to the
KNX bus is the FastCGI backend ``cometvisu-knx-fcgi``. Up to version 1.2.1
it was named ``cometvisu-knxd-fcgi``.

The backend implements the CometVisu protocol with the endpoints ``l``
(login), ``r`` (read) and ``w`` (write) and serves it on a FastCGI socket
that is opened by the backend itself. The web server only has to forward
the three URL paths to that socket - no CGI programs are needed any more.

The protocol itself is specified in the CometVisu wiki
(`Protocol <https://github.com/CometVisu/CometVisu/wiki/Protocol>`__).

Transports
----------

The backend supports three transports for the access to the KNX bus. The
transport has to be selected explicitly, there is no default.

.. list-table::
   :header-rows: 1
   :widths: auto

   * - ``KNX_TRANSPORT``
     - Bus access
     - Prerequisite
   * - ``knxd``
     - a local ``knxd`` daemon over its Unix socket
     - ``knxd`` installed and running
   * - ``ip-tunnel``
     - KNXnet/IP tunneling client
     - a KNX IP interface or KNX IP router that offers a free tunnel
   * - ``ip-routing``
     - KNXnet/IP multicast routing member
     - a KNX IP router in the same network segment (multicast)

The transports ``ip-tunnel`` and ``ip-routing`` need **no knxd at all**.
With them the CometVisu behaves like a classical KNX device:

- With ``ip-tunnel`` the backend connects to the KNX IP interface or
  KNX IP router as a tunneling client and gets an individual address
  assigned from that device.
- With ``ip-routing`` the backend joins the KNXnet/IP multicast group and
  participates in the routing like a KNX IP router. It uses its own
  individual address (``KNX_IP_INDIVIDUAL_ADDR``), which must be a free
  physical address of the installation.

.. note::

    The old backend with the CGI programs ``eibread-cgi`` and
    ``eibwrite-cgi`` of ``eibd``/``knxd`` still works, but is no longer
    recommended. It is described in :doc:`install-eibd`.

Installation
------------

Prerequisites
~~~~~~~~~~~~~

The backend is written in C++ and has to be built from the sources. On a
Debian or Ubuntu system the build dependencies are installed with:

.. code-block:: bash

    sudo apt install libfcgi-dev cmake g++
    sudo apt install knxd-dev     # only for KNX_TRANSPORT=knxd

``knxd-dev`` is only needed when the ``knxd`` transport is compiled in.
It is not needed for ``ip-tunnel`` and ``ip-routing``.

Build
~~~~~

.. code-block:: bash

    git clone https://github.com/CometVisu/cometvisu-knx-fcgi.git
    cd cometvisu-knx-fcgi
    cmake -B build -DCMAKE_BUILD_TYPE=Release
    cmake --build build -j$(nproc)
    sudo cmake --install build --prefix /usr/local

This installs the executable ``/usr/local/bin/cometvisu-knx-fcgi``.

A binary without any ``knxd`` dependency can be built with:

.. code-block:: bash

    cmake -B build -DCMAKE_BUILD_TYPE=Release -DKNX_BUILD_KNXD_TRANSPORT=OFF

.. note::

    ``--help`` lists all environment variables. At startup the backend
    logs the effective transport configuration and the most important
    limits.

Starting the backend
~~~~~~~~~~~~~~~~~~~~

The backend has to run permanently in the background. It opens the FastCGI
socket itself and serves it with a pool of worker processes. A systemd
unit for a local ``knxd`` on the same machine looks like this:

.. code-block:: ini

    [Unit]
    Description=CometVisu KNX FastCGI backend
    After=network-online.target

    [Service]
    Environment=KNX_TRANSPORT=knxd
    Environment=FCGI_SOCKET=/run/cometvisu-fcgi/fcgi.sock
    Environment=FCGI_WORKERS=9
    RuntimeDirectory=cometvisu-fcgi
    RuntimeDirectoryMode=0750
    User=www-data
    Group=www-data
    ExecStart=/usr/local/bin/cometvisu-knx-fcgi
    Restart=always

    [Install]
    WantedBy=multi-user.target

The variables in the ``[Service]`` section are described in
`Settings`_ below. When the service runs as the user of the web server,
the web server can access the Unix socket directly. Otherwise the web
server user has to be member of the group of the socket, because the
socket is created with the mode ``0660``.

.. code-block:: bash

    sudo systemctl daemon-reload
    sudo systemctl enable --now cometvisu-fcgi

For a KNXnet/IP transport only ``KNX_TRANSPORT`` and the matching
``KNX_IP_*`` variables differ, e.g.:

.. code-block:: ini

    # KNX IP interface / router as tunnel
    Environment=KNX_TRANSPORT=ip-tunnel
    Environment=KNX_IP_HOST=192.168.0.10

    # KNX IP router in the local network (multicast)
    Environment=KNX_TRANSPORT=ip-routing
    Environment=KNX_IP_IFACE=eth0
    Environment=KNX_IP_INDIVIDUAL_ADDR=15.15.250

Web server
----------

The CometVisu uses the default backend URL ``/cgi-bin/`` with the
resources ``l``, ``r`` and ``w``. These three paths have to be forwarded
to the FastCGI socket of the backend.

Apache
~~~~~~

.. code-block:: bash

    sudo a2enmod proxy_fcgi
    sudo a2enconf cometvisu-fcgi

.. code-block:: apache

    # /etc/apache2/conf-available/cometvisu-fcgi.conf
    ProxyPass "/cgi-bin/l" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/l"
    ProxyPass "/cgi-bin/r" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/r"
    ProxyPass "/cgi-bin/w" "unix:/run/cometvisu-fcgi/fcgi.sock|fcgi://localhost/w"

When the backend listens on a TCP port instead of a Unix socket, use
``fcgi://127.0.0.1:9000`` as target.

nginx
~~~~~

.. code-block:: nginx

    location ~ ^/cgi-bin/(l|r|w)$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/cometvisu-fcgi/fcgi.sock;
    }

lighttpd
~~~~~~~~

.. code-block:: lighttpd

    server.modules += ( "mod_fastcgi" )

    fastcgi.server = (
        "/cgi-bin/" => ((
            "socket"       => "/run/cometvisu-fcgi/fcgi.sock",
            "check-local"  => "disable"
        ))
    )

.. note::

    The program ``rrdfetch`` for the :ref:`diagram plugin <diagram>` is
    still an ordinary CGI program in ``/usr/lib/cgi-bin/`` and is forwarded
    to that directory independently of the FastCGI backend.

.. warning::

    The backend does not do any authentication of its own - the ``/l``
    credentials are not validated. Authentication has to be done by the
    web server (or the reverse proxy in front of it). The backend must
    never be reachable directly from an untrusted network.

Settings
--------

The backend is configured with environment variables. The transport is
selected with ``KNX_TRANSPORT``; an unset or unknown value is a startup
error.

Common settings
~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Default
     - Description
   * - ``KNX_TRANSPORT``
     - *(required)*
     - ``knxd``, ``ip-tunnel`` or ``ip-routing``.
   * - ``FCGI_SOCKET``
     - *(required)*
     - Listen socket: a filesystem path for a Unix socket or
       ``host:port`` for TCP. The backend opens the socket itself. A Unix
       socket gets the mode ``0660``. A TCP socket has no authentication,
       so bind it to a loopback address (``127.0.0.1:9000``).
   * - ``FCGI_WORKERS``
     - ``20``
     - Number of worker processes (1 - 256). Two workers are kept free for
       ``/w`` and ``/l``, so at most ``FCGI_WORKERS - 2`` clients can
       long-poll at the same time.
   * - ``LONGPOLL_TIMEOUT_SEC``
     - ``300``
     - Maximum time for a long-poll of ``/r`` in seconds (1 - 330).
   * - ``FCGI_CONNECTION_TIMEOUT_SEC``
     - ``330``
     - Maximum time a FastCGI connection may spend without progress.
   * - ``KNX_TX_MAX_PER_SEC``
     - ``10``
     - Upper bound for outgoing KNX telegrams per second over all clients
       (1 - 1000).
   * - ``KNX_CACHE_CAPACITY``
     - ``16384``
     - Number of group addresses kept in the shared cache.
   * - ``SESSION_TTL_SEC``
     - ``1800``
     - Lifetime of a session in seconds.
   * - ``SESSION_MAX``
     - ``10000``
     - Maximum number of concurrent sessions.
   * - ``BASE_URL``
     - *(unset)*
     - URL prefix that the backend advertises in the login response.
   * - ``ADDRESS_PREFIX``
     - *(empty)*
     - Namespace for addresses without a namespace
       (``ADDRESS_PREFIX=KNX`` turns ``1/2/3`` into ``KNX:1/2/3``).
   * - ``LOGIN_EXTRA_CONFIG``
     - *(unset)*
     - Raw JSON members that are appended to the configuration of the
       login response.
   * - ``DEBUG_BACKEND``
     - *(unset)*
     - ``1`` enables debug logging of all requests and bus traffic to
       stderr.

The variables ``FCGI_WORKERS``, ``LONGPOLL_TIMEOUT_SEC`` and
``KNX_TX_MAX_PER_SEC`` mainly have to be adapted to the number of
simultaneous users:

- Each user of the CometVisu keeps one long-poll open. With the default of
  20 workers, 18 long-polls are possible at the same time.
- ``KNX_TX_MAX_PER_SEC`` protects the bus from too many outgoing
  telegrams. The KNX bus itself becomes unreliable above about 20 to 30
  telegrams per second.

``knxd`` transport
~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Default
     - Description
   * - ``KNXD_SOCKET``
     - ``/run/knx``
     - Path to the Unix socket of the ``knxd``.

The group address cache of the ``knxd`` must be enabled, otherwise the
backend cannot read the current values from the bus. The backend uses
exactly **one** client connection of the ``knxd`` for all workers, so the
number of client connections of the ``knxd`` does not depend on
``FCGI_WORKERS`` any more. It only has to leave room for that connection
and, if needed, for tools like ``knxtool``.

``ip-tunnel`` transport
~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
     - Default
     - Description
   * - ``KNX_IP_HOST``
     - *(required)*
     - Address of the KNX IP interface or KNX IP router.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP UDP port.
   * - ``KNX_IP_LOCAL_ADDR``
     - *(OS choice)*
     - Local address that is advertised to the device. Helpful when the
       backend runs behind NAT or on a multi-homed host.
   * - ``KNX_IP_NAT``
     - ``0``
     - ``1`` enables the NAT mode of the tunneling connection.
   * - ``KNX_IP_HEARTBEAT_SEC``
     - ``60``
     - Interval of the connection state request (10 - 86400).
   * - ``KNX_IP_ACK_TIMEOUT_MS``
     - ``1000``
     - Timeout before a telegram is repeated (10 - 60000).
   * - ``KNX_IP_RETRIES``
     - ``3``
     - Number of repetitions per telegram (1 - 10).

.. note::

    A KNX IP interface usually only offers a small number of tunneling
    connections (often 4). One of them is used by the CometVisu. Other
    ETS connections may have to be closed or the device may have to offer
    more tunnels.

``ip-routing`` transport
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: auto

   * - Variable
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
     - Individual address used as the source of the routing telegrams.
       This must be a free physical address of the installation - a
       router rejects the address ``0.0.0``.
   * - ``KNX_IP_PORT``
     - ``3671``
     - KNXnet/IP UDP port.

.. warning::

    With ``ip-routing`` every participant of the multicast group can send
    telegrams into the bus and read all bus traffic. The backend only
    belongs in a trusted network segment (or a dedicated VLAN).

.. note::

    With ``ip-routing`` the CometVisu is a full routing participant. Only
    use it when the KNX IP router is configured accordingly and no other
    software on the same host does the same routing with the same
    individual address.

.. note::

    Use ``cometvisu-knx-fcgi --discover`` to list all KNXnet/IP devices
    that answer in the local network with their individual and multicast
    address.

Diagnostics
-----------

The status of the backend can be checked with a simple request:

.. code-block:: bash

    curl "http://localhost/cgi-bin/l"

The answer contains the protocol version, a session and - during normal
operation - the version of the backend.

While the bus connection is lost, the backend adds an outage block to the
responses of ``/r`` and ``/w``. The key of that block is ``knxd`` for the
``knxd`` transport and ``bus`` for the KNXnet/IP transports. The current
CometVisu front end only evaluates the key ``knxd``, so an outage of an
``ip-tunnel`` or ``ip-routing`` connection is not shown in the user
interface yet - the values simply stop changing.

Debug output for all requests and the bus traffic is enabled with
``DEBUG_BACKEND=1``:

.. code-block:: ini

    [Service]
    Environment=DEBUG_BACKEND=1

Upgrading from 1.x
------------------

Version 2.0 changed four things that a deployment has to follow:

.. list-table::
   :header-rows: 1
   :widths: auto

   * - 1.x
     - 2.0
   * - binary ``cometvisu-knxd-fcgi``
     - binary ``cometvisu-knx-fcgi``
   * - transport implicitly ``knxd``
     - ``KNX_TRANSPORT`` has to be set explicitly
   * - started by ``spawn-fcgi`` on stdin/stdout
     - ``FCGI_SOCKET`` is required, the backend opens the socket itself
   * - ``/r`` and ``/w`` worked without the session parameter ``s``
     - both require the session from ``/l``

Deployments that still start the binary under the old name can provide a
symbolic link ``cometvisu-knxd-fcgi -> cometvisu-knx-fcgi``. Everything else
needs an explicit setting: ``KNX_TRANSPORT=knxd`` keeps the old bus
access, and the web server has to be switched from CGI to the FastCGI
socket as described above.

Docker container
----------------

The official CometVisu Docker container already contains the FastCGI
backend and configures it automatically. The connection modes are
described in :doc:`../docker`.
