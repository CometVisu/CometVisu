.. replaces:: CometVisu/0.8.x/manual/updatewiregate/de

Update der CometVisu auf dem Wiregate
=====================================

**Download der Installationsdatei**

.. code-block:: bash

    cd /var/www
    wget -O CometVisu0.8.5.tar.bz2  http://sourceforge.net/projects/openautomation/files/CometVisu/CometVisu_0.8.5.tar.bz2/download

**Entpacken der Dateien**

.. code-block:: bash

    tar xvf CometVisu0.8.5.tar.bz2

**OPTIONAL: Entfernen des Downloads**

.. code-block:: bash

    rm ./CometVisu0.8.5.tar.bz2

**Kopieren der Konfigurationsdatei in die neue Installation**

.. code-block:: bash

    cp cometvisu/config/visu_config*.xml release_0.8.5/release/config/

**ENTWEDER entfernen eines alten Backups und Erzeugen eines neuen Backup
aus der jetzt veralteten aktuellen Installation**

.. code-block:: bash

    rm -Rf ./cometvisu.bak
    mv ./cometvisu cometvisu.bak

**ODER alternatives Vorgehen OHNE Löschen alter Versionen (irgendeiname
durch z.B. CV-0.8.x oder so was ersetzen)**

.. code-block:: bash

    mv ./cometvisu irgendeinname

'''Erzeugen eines Links um die Visu mit dem bekannten URL aufrufen zu
können - hier wieder '''

.. code-block:: bash

    ln -s release_0.8.5/release/ cometvisu

Aufruf der Visu dann wie bekannt unter
``http://name_oder_ip_addresse/cometvisu`` - Beim ersten Start wird
falls erforderlich angeboten die Konfiguration automatisch zu
konvertieren.
