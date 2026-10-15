.. replaces:: CometVisu/Installation/Backend/de

Installation von eibd
---------------------
Der eibd Service verbindet den Computer mit dem KNX/EIB Bus
und unterstützt Schnittstellen wie USB, TPUART oder EIBnet/IP
Routing and Tunneling. eibd ist eine Entwicklung der TU Wien
und wird nicht weiter entwickelt. Dennoch ist der eibd noch
häufig im Einsatz und ein stabiler Service.

Der Link zur offiziellen Installationsanleitung

    -  `deb Pakete <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibdeb>`__
    -  `rpm Pakete <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibrpm>`__
    -  `nslu2 <https://www.auto.tuwien.ac.at/~mkoegler/index.php/eibnslu>`__

Installation von knxd
---------------------
Aufgrund des Entwicklungsstillstands bei eibd wurde der Fork knxd gebildet.
knxd ist ein KNX Router, der auf allen Linux Computern läuft und mit allen
bekannten KNX Schnittstellen kommunizieren kann. Der knxd muss aus dem 
Source-Code kompiliert werden. Eine Konfigurations- und Kompilieranleitung
für debian Server ist auf der `knxd github Seite <https://github.com/knxd/knxd>`__
zu finden.
 
.. TODO::

    Inhalte übertragen