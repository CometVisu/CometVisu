Installation on a Debian System with openHAB
============================================

Overview
--------

For the operation of CometVisu with openHAB the following things are needed:

1.  Server with working openHAB installation (all examples refer to
    an openHAB installation on a Debian based system via the supplied
    package manager ``apt``, with other distributions the paths used
    in this manual may have to be adapted.
2.  A webserver with PHP-support installed.
3.  An unpacked release of CometVisu on the server
4.  An API-Token for openHAB

.. HINT::

    Since version 0.12.0 no special openHAB bindings are required, the CometVisu communicates directly with
    openHABs build-in REST API.

It is assumed that point 1 has already been met and only the following
points are discussed below.

2. Webserver installieren
-------------------------

.. code-block:: console

    # Install web server with PHP
    sudo apt install apache2 php libapache2-mod-php php-soap

Replace the content of the file ``/etc/apache2/sites-enabled/000-default.conf`` with the following
(please replace ``<openhab>`` with the IP address or the hostname of the openHAB server,
if everything runs on one server, you can use ``localhost``).

.. code-block:: apacheconf

    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        Header set X-CometVisu-Backend-LoginUrl "/rest/cv/l"
        Header set X-CometVisu-Backend-Name "openhab"

        ProxyPass /rest http://<openhab>:8080/rest
        ProxyPassReverse http://<openhab>:8080/rest /rest

        <Directory /var/www/html>
            Require all granted
            AllowOverride all
        </Directory>
    </VirtualHost>


2. CometVisu Installation on the Server
---------------------------------------

The CometVisu can be downloaded here:
https://github.com/CometVisu/CometVisu/releases. The unpacked package
contains the folder *cometvisu/release*, which must be copied to
the server in the following path */var/www/html*. In
addition, appropriate rights must still be set for the openHAB user
and some configuration directories must be created.

All this can be done by the following console commands:

.. code-block:: console

    # Copy the release directory to the right place
    cp -r cometvisu/release /var/www/cometvisu

    # Customize user rights for openHAB
    chown -R openhab:openhab /var/www/cometvisu

    # Customize configuration directories
    mkdir -p /etc/openhab2/cometvisu/resource/config
    mkdir -p /etc/openhab2/cometvisu/resource/designs

    # Customize user rights for openHAB
    chown -R openhab:openhab /etc/openhab2/cometvisu

The two directories */etc/openhab2/cometvisu/resource/config* and
*/etc/openhab2/cometvisu/resource/designs* will contain the CometVisu
configurations and are protected from upgrades by the separate
location. Only if these directories are not present, CometVisu
will search the configuration in */var/www/cometvisu/resource/config*.

3.-5. openHAB Configuration
---------------------------

So that openHAB can communicate with the CometVisu, the
corresponding extension is to be installed via the PaperUI
(http: // openhab_address: 8080) -> Add-ons -> User
Interfaces -> CometVisu. If you also want to use the CometVisu
editor, install the extension *PHP support for CometVisu*.

.. figure:: _static/openhab_paperui_user_interfaces.png

   PaperUI - Add-ons - User Interfaces

The openHAB configuration file cometvisu.cfg, like all other
configurations of the openHAB extensions, is located under
*/etc/openhab2/services/* and should contain the following entries:

.. code-block:: ini

    # Path on the server where the CometVisu is located
    webFolder=/var/www/cometvisu/

    # Relative path in the browser under which the CometVisu should be accessible
    webAlias=/cometvisu


The CometVisu can then be reached directly under the URL
``http://openhab_address:8080/cometvisu/?Config = <name>`` in
the browser, where ``<name>`` is the name of
the ``visu_config_ <name> Derives .xml``.
