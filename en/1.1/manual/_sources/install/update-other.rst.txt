Update CometVisu on other Devices
=================================

**Download the Instructions**

.. code-block:: bash

    cd /var/www
    wget -O CometVisu0.9.2.zip  https://github.com/CometVisu/CometVisu/releases/download/v0.9.2/CometVisu-0.9.2.zip

**Unpack the Files**

.. code-block:: bash

    unzip CometVisu0.9.2.zip 

**Rename the Folders**

.. code-block:: bash

    mv cometvisu/ release_0.9.2

**OPTIONAL: Delete the downloaded Files**

.. code-block:: bash

    rm ./CometVisu0.9.2.zip 

**Copy the Configuration into the new Visu Folder**

.. code-block:: bash

    cp visu/config/visu_config*.xml release_0.9.2/release/config/

**doublecheck the privileges**

.. code-block:: bash

    chmod -f a+w release_0.9.2/release/config release_0.9.2/release/config/*.xml release_0.9.2/release/config/backup release_0.9.2/release/config/backup/*.xml

**EITHER remove an old backup and create a new backup from
the current deprecated installation**

.. code-block:: bash

    rm -Rf ./visu.bak
    mv ./visu cometvisu.bak

**OR alternative procedure WITHOUT deleting old versions (rename to any_name)**

.. code-block:: bash

    mv ./visu any_name

**Generating a link to call the Visu with the known url
can be done here again**

.. code-block:: bash

    ln -s release_0.9.2/release/ visu

Call the Visu then known as
``http://name_oder_ip_addresse/visu`` - At the first start, if necessary,
the configuration will be automatically converted.
