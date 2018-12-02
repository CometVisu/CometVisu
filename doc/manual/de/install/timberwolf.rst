.. _timberwolf:

Installation auf dem Timberwolf mittels Portainer
=================================================

Um die CometVisu auf dem `Timberwolf <https://wiregate.de/>`_-Server zu
installieren wird die dort verwendete Administrationsoberfläche
`Portainer <https://portainer.io/>`_ verwendet.

Installation
------------

Volume für Konfigurationsdateien
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Zuerst ist ein Volume anzulegen um dort die Konfigurationsdateien abzulegen
und diese über Neustarts und Aktualisierungen des Contianers hinweg
beizubehalten.

.. figure:: _static/portainer_volume_add.png
   :scale: 50 %

   Volume im Portainer anlegen

Aktualisieren
-------------