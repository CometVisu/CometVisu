
.. note::

    The installation of ``eibd`` or ``knxd`` is only needed when the
    :doc:`FastCGI backend <install-fcgi>` is used with the ``knxd``
    transport. Its transports ``ip-tunnel`` and ``ip-routing`` do not need
    a knxd at all. For a new installation the FastCGI backend with one of
    the KNXnet/IP transports is the recommended setup.

Install eibd
---------------------
The eibd service connects the server with the KNX/EIB Bus and supports
interfaces such as USB, TPUART or EIBnet/IP Routing and Tunneling. eibd 
was developed by TU Wien is not developed any further. Nevertheless eibd is
still often used and known as stable service.

Link to official install packages:

    - `deb Pakete <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibdeb>`__
    - `rpm Pakete <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibrpm>`__ 
    - `nslu2 <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibnslu>`__

Install knxd
---------------------

Due to the development deadlock at eibd the fork knxd was formed.
knxd is a KNX router that runs on all Linux computers and can
communicate with all known KNX interfaces.
The knxd must be compiled from the source code. A
configuration and compilation manual for debian Server can
be found on the `knxd github page <https://github.com/knxd/knxd>` __.
