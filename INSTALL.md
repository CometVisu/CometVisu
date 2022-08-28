Installation with the eibread-cgi backend:
==========================================

The installation of the CometVisu is very simple. You only need to follow a
few simple steps:

0. Install a web server and (optional but recommended) PHP.

   When you use the WireGate, this is already done for you.
   
1. Install the backend, i.e. the dynamic interface to the web server that is
   connecting to the KNX bus.
   Detailed instructions are given on the web page at:
       https://www.cometvisu.org/CometVisu/en/latest/manual/install/index.html
  
   When you use the WireGate, it should be already installed for you.
   
   When you use any other x86 based debian system, you can get the package
   out of the WireGate repository. It is contained in the package "eibd-clients"
   at http://repo.wiregate.de/wiregate/pool/wiregate-1.0/main/e/
   
2. Copy the directroy "release" on your web server in the web root.
   
   When you use the WireGate, the directroy /var/www/visu_release/ might be
   a good choice; in the following steps it's assumed that this directroy is
   used.
   
   Please make sure that the file permissions (mode) are always kept!
   When you use the zip version of the archive this should have already happened,
   when you use the tar.gz version, please unpack it with the parameter "p", like
     tar -xvpf CometVisu-releaseversion.tar.gz

3. When the permissions were not set correctly or when you just want to be sure, please fix
   them by calling:
   
       chmod -R a+w /var/www/visu_release/config
       
   It will give everyone write permissions for the config files - so it's
   probably too permissive for a shared server, but assuming the typical usage
   of the WireGate it should be fine.
   
Installation with OpenHAB:
==========================

Please look at the Wiki pages for the different openHAB versions: 

For openHAB 1:
https://github.com/openhab/openhab/wiki/CometVisu

For openHAB 2:
https://github.com/openhab/openhab2-addons/tree/master/addons/ui/org.openhab.ui.cometvisu

NOTE:
=====

Please also refer always to the online documentation at 

     http://www.cometvisu.org/

as it will contain the latest information.
