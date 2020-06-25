[![Build Status](https://travis-ci.org/CometVisu/CometVisu.svg?branch=develop)](https://travis-ci.org/CometVisu/CometVisu) [![Coverage Status](https://coveralls.io/repos/github/CometVisu/CometVisu/badge.svg?branch=develop)](https://coveralls.io/github/CometVisu/CometVisu?branch=develop)
[![Join the chat at https://gitter.im/CometVisu/CometVisu](https://badges.gitter.im/CometVisu/CometVisu.svg)](https://gitter.im/CometVisu/CometVisu?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[ ![Download](https://api.bintray.com/packages/cometvisu/CometVisu/CometVisu/images/download.svg?version=nightlies) ](https://bintray.com/cometvisu/CometVisu/CometVisu/0.12-dev/link)

CometVisu is a real-time visualization software using modern web technologies for
building automation applications like smart homes.

It only requires a web browser to display it and a web server as well as a 
backend it can communicate with. The web server can be quite small (routers
should already have enough power) as it is only serving static content. For 
extended features it should support PHP, but that is optional and not required.

How to get it:
==============

The latest releases can be downloaded at:

    https://github.com/CometVisu/CometVisu/releases
    
Note: When you own a WireGate the CometVisu comes already pre-installed.
You will only need to download a new version from GitHub when the shipped version
is outdated (it usually gets updated rather quickly, so try a system update 
first) or you want to start CometVisu development.

How to install it:
==================

Please see the [INSTALL](./INSTALL.md) file.

Instructions for developers:
============================

Please have a look at the [DEVELOPMENT](./DEVELOPMENT.md) file.

Documentation:
==============

The documentation and latest information can be found at:
    
http://www.cometvisu.org/
    
Support:
========

To discuss with the developers you can use the the KNX User Forum
at 

https://knx-user-forum.de/forum/supportforen/cometvisu

(spoken languages are German and English)

Prerequisites:
==============

There are currently two different backends widely used: 

1. eibread-cgi / eibwrite-cgi are directly communicating with the eibd / knxd to have direct access to the KNX bus.
2. OpenHAB can also be used as a backend.

As extended functionality the diagram plugin can be used. This will require 
a rrdtool installation with the added "fetchj" feature.

**Notes on the KNX-backend**  
The KNX-backend uses  
/usr/lib/cgi-bin/l : a dummy-login  
/usr/lib/cgi-bin/r : a symlink to /usr/bin/eibread-cgi  
/usr/lib/cgi-bin/w : a symlink to /usr/bin/eibwrite-cgi  
eibread/write-cgi are part of a modified eibd-clients package here:  
http://repo.wiregate.de/wiregate/pool/wiregate-1.0/main/e/  
(source: bcusdk)  

**Important note on diagram-backend**  
It uses a modified version of rrdtool, adding a "fetchj" option.  
You can find source and Debian-packages here:  
http://repo.wiregate.de/wiregate/pool/wiregate-1.0/main/r/  
http://repo.wiregate.de/wiregate/pool/wiregate-1.0/main/libr/  
