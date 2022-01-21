
Update CometVisu on Wiregate
============================

**Download the Instructions**

.. code-block:: bash

    cd /var/www
    wget -O CometVisu0.8.5.tar.bz2  http://sourceforge.net/projects/openautomation/files/CometVisu/CometVisu_0.8.5.tar.bz2/download

**Unpack the Files**

.. code-block:: bash

    tar xvf CometVisu0.8.5.tar.bz2

**OPTIONAL: Delete the downloaded Files**

.. code-block:: bash

    rm ./CometVisu0.8.5.tar.bz2

**Copy the Configuration into the new Visu Folder**

.. code-block:: bash

    cp cometvisu/config/visu_config*.xml release_0.8.5/release/config/

**EITHER remove an old backup and create a new backup from
the current deprecated installation**

.. code-block:: bash

    rm -Rf ./cometvisu.bak
    mv ./cometvisu cometvisu.bak

**OR alternative procedure WITHOUT deleting old versions (rename to any_name)**

.. code-block:: bash

    mv ./cometvisu any_name

'''Generating a link to call the Visu with the known url
can be done here again '''

.. code-block:: bash

    ln -s release_0.8.5/release/cometvisu

Call the Visu then known as
``http://name_oder_ip_addresse/visu`` - At the first start, if necessary,
the configuration will be automatically converted.
