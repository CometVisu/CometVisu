.. _Docker_OpenHAB_Installation:

Installing on an Ubuntu system with openHAB and Docker.
=======================================================

1. Prerequisites
------------------

To run CometVisu with openHAB and Docker the following things are needed:

1. server with working openHAB installation.
2. Docker CE and Docker Compose.

.. HINT::

    No additional web server, such as Apache or similar with PHP support installed is needed, as this is
    is all part of the container.
    The above items are all that is required to get up and running successfully.


2. Installing Docker-CE and Compose on the server.
--------------------------------------------------

This can all be done by running the following console commands:

.. code-block:: console

    # Update
    sudo apt-get update

    # Install prerequisites
    sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

    # add the Docker GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # add Docker repository key
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    # Update again
    sudo apt-get update

    # Install docker-ce and compose
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose


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

.. code-block: xml

    <pages
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        username="oh.CometVisu.NxR3..."
        design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd" scroll_speed="0" lib_version="9">


Now, the CometVisu is directly accessible in the browser with the URL ``http://<server>/?config=<name>``,
where ``<name>`` is derived from the name of the ``visu_config_<name>.xml``.
