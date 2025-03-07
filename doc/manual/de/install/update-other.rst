.. replaces:: CometVisu/0.8.x/manual/updateother/de

Update der direkt installierten CometVisu
=========================================

**Download der Installationsdatei**

.. code-block:: bash

    cd /var/www
    wget -O CometVisu0.12.0.zip  https://github.com/CometVisu/CometVisu/releases/download/v0.12.0/CometVisu-0.12.0.zip

**Entpacken der Dateien**

.. code-block:: bash

    unzip CometVisu0.12.0.zip

**Anpassend des Order-Namens**

.. code-block:: bash

    mv cometvisu/ release_0.12.0

**OPTIONAL: Entfernen des Downloads**

.. code-block:: bash

    rm ./CometVisu0.12.0.zip

**Kopieren der Konfigurationsdatei in die neue Installation**

.. code-block:: bash

    cp visu/config/visu_config*.xml release_0.12.0/release/config/

**Sicherstellen der richtigen Berechtigungen**

.. code-block:: bash

    chmod -f a+w release_0.12.0/release/config release_0.12.0/release/config/*.xml release_0.12.0/release/config/backup release_0.12.0/release/config/backup/*.xml

**ENTWEDER entfernen eines alten Backups und Erzeugen eines neuen Backup
aus der jetzt veralteten aktuellen Installation**

.. code-block:: bash

    rm -Rf ./visu.bak
    mv ./visu cometvisu.bak

**ODER alternatives Vorgehen OHNE Löschen alter Versionen (irgendeiname
durch z.B. CV-0.12.x oder so was ersetzen)**

.. code-block:: bash

    mv ./visu irgendeinname

'''Erzeugen eines Links um die Visu mit dem bekannten URL aufrufen zu
können - hier wieder '''

.. code-block:: bash

    ln -s release_0.12.2/release/ visu

Aufruf der Visu dann wie bekannt unter
``http://name_oder_ip_addresse/visu`` - Beim ersten Start wird falls
erforderlich angeboten die Konfiguration automatisch zu konvertieren.
