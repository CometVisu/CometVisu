
#########################
Welcome to the CometVisu!
#########################

CometVisu is a web based visualization for home automation.
It can access the KNX-Bus directly (via eibd/knxd) or use
`OpenHAB <http://www.openhab.org/>`__ as a backend. The current version
can be found on `Github <http://github.com/CometVisu/CometVisu>`__.

.. _system-requirements:

System Requirements
-------------------

Operation by the user takes place via a web browser. The
Most of the current browsers are supported.

By setting :doc:`URL Parameter <config/url-params>` can
you additionally affect the CometVisu, for example by loading other configs
or designs, as well forcing rendering for mobile devices such as mobile
devices (e.g. smartphones).


Operating CometVisu
-------------------

The main menu is in the footer and normally contains
different links:

-   "**CometVisu.org**" link to the projects homepage
-   "**Reload**" to reload the current page
-   "**Widget Demo**" shows different widgets and there usage
-   "**Edit**" opens up the editor.
-   "**Check Config**" This tool will check the config file against
    syntax errors. *config visu\_config is valid XML* signals
    a valid config file. The File will be display beneath. In
    case of errors, they will be highlighted.

    .. hint::
        The content of the footer can be customized by the config XML-File.

Update the CometVisu
--------------------

If a version 0.8 was already installed, the installation
be updated directly on the :doc:`WireGate <install/update-wiregate>` or
:doc:`other installations <install/update-other>`

CometVisu-Designs
-----------------

-  Metal -> the most popular design
-  Pure
-  Diskreet
-  Discreet Sand
-  Discreet Slim
-  Alaska
-  Alaska Slim

It is also possible to implement customized designs.

Colors inside CometVisu
-----------------------

Colors will always be used in hexadezimal format `0xRGB
format <http://de.wikipedia.org/wiki/Hexadezimale_Farbdefinition>`__

Further help, examples and color-codes can be found `here <http://www.z1-web.de/Webmaster-Tools-HTML-HEX_Farbcodes_Tools>`__
or `here <http://de.selfhtml.org/helferlein/farben.htm>`__

.. toctree::
    :hidden:
    :glob:

    install/index
    tutorial/index
    config/index
    colab/index
    devel/index
    faq

