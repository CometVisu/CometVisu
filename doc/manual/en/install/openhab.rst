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
    openHAB's build-in REST API.

It is assumed that point 1 has already been met and only the following
points are discussed below.

2. Install webserver
--------------------

.. code-block:: console

    # Install web server with PHP
    sudo apt install apache2 php libapache2-mod-php php-soap

Replace the content of the file ``/etc/apache2/sites-enabled/000-default.conf`` with the following
(please replace ``<openhab>`` with the IP address or the host name of the openHAB server,
if everything runs on one server, you can use ``localhost``).

.. code-block:: apacheconf

    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        Header set X-CometVisu-Backend-OpenHAB-Url "/rest/cv/l"
        Header set X-CometVisu-Backend-Name "openhab"

        ProxyPass /rest http://<openhab>:8080/rest
        ProxyPassReverse http://<openhab>:8080/rest /rest

        <Directory /var/www/html>
            Require all granted
            AllowOverride all
        </Directory>
    </VirtualHost>


3. Installing the CometVisu on the server
-----------------------------------------

The CometVisu can be downloaded here: https://github.com/CometVisu/CometVisu/releases.
The unpacked package contains the folder *cometvisu/release*, which must be copied to the server in the following path
*/var/www/html*.
Furthermore you have to set appropriate permissions for the webserver user and some
configuration directories must be created.
All this can be done with the following console commands:

.. code-block:: console

    # Copy the release directory to the right place
    cp -r cometvisu/release /var/www/html

    # Adjust user rights for the web server
    chown -R www-data:www-data /var/www/html


4. Create API token in openHAB
---------------------------------

For some requests to openHAB the CometVisu needs to be authenticated. You can create credentials in the profile view of the openHAB UI
(accessible by clicking on the username in the lower left corner) to generate an API token. To do this click on
"Create new API token" and enter your credentials (username + password) and a name for the token.
(please leave the field "Token (optional)" empty). This will generate and display a new token. This token must
now be copied (it will only be displayed once at this moment and can't be viewed later) and be entered as
username`` in the ``pages`` element of the CometVisu config file.

.. code-block:: xml

    <pages
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        username="oh.CometVisu.NxR3..."
        design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd" scroll_speed="0" lib_version="9">


Now, the CometVisu is directly accessible in the browser with the URL ``http://<server>/?config=<name>``,
where ``<name>`` is derived from the name of the ``visu_config_<name>.xml``.
