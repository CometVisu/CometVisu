.. _generic:

Prerequisites for the installation
==================================

To be able to use the CometVisu the system needs to fulfill a few prerequisites.

These are

-  a backend to connect the KNX bus
-  [optional] rrdtool for diagrams
-  [optional] InfluxDB for diagrams
-  a web server with (optional but recommended) PHP support
-  the CometVisu software package

Backend - knxd/eibd or OpenHAB
--------------------------------

As a backend an instance of *eibd* or its successor
`knxd <https://github.com/knxd/knxd>`__ can be used as well an
`OpenHAB <https://www.openhab.org/>`__ installation.

Web server
----------

The relevant files to connect via eibd/knxd are CGI programms, usually
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

Testing the installed CometVisu
-------------------------------

Just open http://MyServer/visu/ in the browser.

Have fun!
