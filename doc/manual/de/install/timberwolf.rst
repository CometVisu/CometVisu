.. _timberwolf:

Installation auf dem Timberwolf mittels Portainer
=================================================

Um die CometVisu auf dem `Timberwolf <https://wiregate.de/>`_-Server zu
installieren wird die dort verwendete Administrationsoberfläche
`Portainer <https://portainer.io/>`_ verwendet.

Installation
------------

Mit dieser Anleitung wird die CometVisu auf dem Timberwolf Server über HTTPS
unter der Adresse ``https://<mein timberwolf>/proxy/visu/`` aufrufbar sein.

Grundsätzlich eignen sich diese Schritte auch als Referenz für die Installation
über Portainer auf anderen Systemen, jedoch müssen die Schritte im Detail
angepasst werden, da dort üblicherweise keine Proxy zur Verfügung steht, der
die CometVisu über HTTPS zugreifbar macht.

Volume für Konfigurationsdateien
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Zuerst ist ein Volume anzulegen um dort die Konfigurationsdateien abzulegen
und diese über Neustarts und Aktualisierungen des Containers hinweg
beizubehalten.

Die notwendigen Schritte sind: Volumes -> Add Volume -> Name: ``CometVisuConfig`` -> Create the Volume

.. figure:: _static/portainer_volume_add.png
   :scale: 50 %

   Volume im Portainer anlegen

Dieses Volume kann von außen mit den Config-Dateien befüllt werden - oder
am besten über den :doc:`Manager <manager>`.

Anlegen des Containers
~~~~~~~~~~~~~~~~~~~~~~

Unter Containers -> Add Container

- Name: ``CometVisu``
- Image configuration Name: ``cometvisu/cometvisu``
- Port mapping: host 18080, container 80
- Advanced container settings:

  - Volumes: Volume mapping ``container``: ``/var/www/html/config`` ⭢ ``volume``: ``CometVisuConfig``
  - Env: Environment variables ``name``: ``CGI_URL_PATH`` mit ``value``: ``/proxy/visu/cgi-bin/``

Dann über "Deploy the container" diesen erzeugen.

Aktualisieren
-------------