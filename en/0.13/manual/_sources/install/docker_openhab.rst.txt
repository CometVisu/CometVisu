.. _Docker_OpenHAB_Installation:

Installing on an Ubuntu system with openHAB and Docker
======================================================

1. Prerequisites
----------------

To run CometVisu with openHAB and Docker the following things are needed:

1. server with working openHAB installation.
2. Docker CE and Docker Compose.

.. HINT::

    No additional web server, such as Apache or similar with PHP support installed is needed, as this is
    is all part of the container.
    The above items are all that is required to get up and running successfully.


2. Installing Docker-CE and Compose on the server
-------------------------------------------------

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


3. System preparations
----------------------

.. code-block:: console

    # Add current user to group *Docker*
    sudo usermod -aG docker $USER

After that re-login with that user.

.. code-block:: console

    # create folder resource/config for the current user
    sudo mkdir -p resource/config

    # create an example XML-file in resource/config
    sudo nano resource/config/visu_config.xml

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="pure" xsi:noNamespaceSchemaLocation="../visu_config.xsd" lib_version="8">
    <meta>
        <statusbar>
        <status type="html"><![CDATA[
                <img src="resource/icons/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
                -<a href=".?forceReload=true">Reload</a>
                -<a href="?config=demo">Widget Demo</a>
                ]]></status>
        <status type="html" condition="!edit" hrefextend="config"><![CDATA[
                - <a href="edit_config.html">Edit</a>
                ]]></status>
        <status type="html" condition="edit" hrefextend="all"><![CDATA[
                - <a href=".">normal Mode</a>
            ]]></status>
        <status type="html"><![CDATA[
            - <a href="check_config.php">Check Config</a>
            <div style="float:right;padding-right:0.5em">Version: SVN</div>
            ]]></status>
        </statusbar>
    </meta>
    <page name="Start page">
    </page>
    </pages>


.. code-block:: console

    # create backup and media folders
    sudo mkdir -p resource/config/media
    sudo mkdir -p resource/config/backup

    # set access rights for the web server
    sudo chown -hR www-data:www-data resource/config


4. Install CometVisu via Docker
-------------------------------
Install the docker container now

.. code-block:: docker

    # create yaml file
    sudo nano docker-compose.yaml

    # example content to configure the docker container to use openHAB as backend

    version: '3.4'
    services:
        cometvisu:
            image: "cometvisu/cometvisu:latest"
            restart: always
            ports:
            - 80:80
            volumes:
                - ./resource/config:/var/www/html/resource/config
            environment:
                BACKEND_NAME: "openhab"
                BACKEND_OPENHAB: "/rest/"
                BACKEND_PROXY_SOURCE: "/rest"
                BACKEND_PROXY_TARGET: "http://<IP-Openhab2>:8080/rest"

.. HINT::
    Please make sure that you use 2 spaces for indentation when you edit the YAML-file.

.. code-block:: console

    # start the docker container
    docker-compose up -d

    # find out the name if the running container
    docker-compose ps

    # find out the IP address of the docker container, <name> must be replaced with the correct container name
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <name>

You can access the CometVisu in your browser with the URL ``http://<container-IP>:``.
