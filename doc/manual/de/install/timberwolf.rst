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

Volumes anlegen
~~~~~~~~~~~~~~~

Volume für Konfigurationsdateien
................................

Zuerst ist ein Volume anzulegen um dort die Konfigurationsdateien abzulegen
und diese über Neustarts und Aktualisierungen des Containers hinweg
beizubehalten.

Die notwendigen Schritte sind: Volumes -> Add Volume -> Name: ``CometVisuConfig`` -> Create the Volume

.. figure:: _static/portainer_volume_add.png
   :scale: 50 %

   Volume im Portainer anlegen

Dieses Volume kann von außen mit den Config-Dateien befüllt werden - oder
am besten über den :doc:`Manager <manager>`.

Volume für RRD
..............

Dieser Schritt ist optional und nur notwendig, wenn das :doc:`Diagram Plugin <diagram>`
mit RRD Dateien genutzt werden sollen. Bei der reinen Verwendung der InfluxDB
kann dieser Schritt übersprungen werden.

Die Schritte für das Anlegen des *Volume für Konfigurationsdateien* ist zu
wiederholen, jedoch wird hier sinnvoller Weise der Name ``CometVisuRRD``
gewählt.

Das Befüllen dieses Containers muss extern erfolgen, z.B. durch einen anderen
Container, der diesen RRD-Container gleichzeitig mit einbindet.

**Wichtig:** Das interne Format der RRD Dateien ist Architektur spezifisch.
So können die RRD-Dateien vom WireGate (32 Bit Architektur) nicht direkt auf
dem Timberwolf (64 Bit Architektur) verwendet werden [#]_.

.. [#] Um den Inhalt einer RRD Datei ``RRD_Name`` von einer Architektur auf eine
  andere zu übertragen muss auf dem Quell-System (also z.B. dem WireGate) der
  Befehl

  .. code-block:: bash

     rrdtool dump /var/www/rrd/RRD_Name.rrd > RRD_Name.xml

  ausgeführt werden. Auf dem Ziel-System (also z.B. einem Container auf dem
  Timberwolf) wird dann mit dem Befehl

  .. code-block:: bash

     ...

die neue RRD-Datei angelegt.

Anlegen des Containers
~~~~~~~~~~~~~~~~~~~~~~

Unter Containers -> Add Container

- Name: ``CometVisu``
- Image configuration Name: ``cometvisu/cometvisu:latest``
- Port mapping: host 18080, container 80
- Advanced container settings:

  - Volumes: Volume mapping ``container``: ``/var/www/html/config`` ⭢ ``volume``: ``CometVisuConfig``
  - Env: Environment variables ``name``: ``CGI_URL_PATH`` mit ``value``: ``/proxy/visu/cgi-bin/``

.. figure:: _static/portainer_container_add.png

   Container im Portainer anlegen

.. figure:: _static/portainer_container_volumes_add.png

   Container *Volumes* im Portainer konfigurieren

.. figure:: _static/portainer_container_env_add.png

   Container *Env* im Portainer konfigurieren

.. figure:: _static/portainer_container_restart_add.png

   Container *Restart policy* im Portainer konfigurieren

Dann über "Deploy the container" diesen erzeugen.

Proxy einrichten
~~~~~~~~~~~~~~~~

In der Timberwolf Oberfläche: Einstellungen -> Remotezugriff -> Reverse Proxy: cvtest/ und http://127.0.0.1:18080/ eintragen, dann auf Add gehen

Nun sollte die CometVisu unter https://<URL des Timberwolf>/proxy/cvtest/ aufrufbar sein.

Aktualisieren
-------------

Containers -> CometVisuTest -> Duplicate/Edit

Dort unter Actions -> Deploy the Container

Replace

Aufräumen: Unused Images löschen

Entwicklungsversion
-------------------

Grundsätzlich sind für die jeweils aktuelle Entwicklungsversion die gleichen
Schritte wie für das Release durchzuführen.

Wie unter :doc:`Docker <docker>` beschrieben hat die neueste
Entwicklunglungsversion den Tag ``testing``. Somit ist unter *Anlegen des
Containers* als ``name`` ``cometvisu/cometvisu:testing`` zu verwenden.

Um für Fehlerberichte u.ä. eine einheitliche Umgebung zu haben, ist die
Empfehlung die Testing Version mit diesen Parametern zu installieren:

- Container:

  - Name: CometVisuTest
  - : ``cometvisu/cometvisu:testing``
  - Port mapping: host 28080, container 80
  - Advanced container settings: Env: ``name``: ``CGI_URL_PATH`` mit ``value``: ``/proxy/visutest/cgi-bin/``

- Proxy:

  - Reverse Proxy: ``visutest/`` ``http://127.0.0.1:28080/``