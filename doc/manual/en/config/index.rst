
******************************
Configuration of the CometVisu
******************************

.. toctree::
    :hidden:

    manager
    editor

CometVisu is configured by editing the XML-formatted configuration
file "visu_config.xml" in the respective subdirectory "./config" of
the CometVisu installation. This can be done either with a text-based
editor or with the integrated graphical editor. However, the use of
the graphical editor assumes that the CometVisu is delivered by a
PHP-enabled web server (e.g. Apache or Lighttpd) and that the configuration
file is writable by it.

The easiest way to access the various configuration files is via
:doc:`Manager <manager>`.

Depending on the backend used and the installation procedures,
the CometVisu tree is located in different places:

-   If the CometVisu should be connected directly to the KNX bus telegram
    traffic with the help of the knxd daemon (KNX is then the backend),
    the CometVisu is manually added to the directory tree
    "/var/www/visu..." of the web server (e.g. Apache or Lighttpd)
    The web server usually listens on port 80 in the default setting.

-   Since version 0.12 the special binding is no longer needed to use openHAB as a backend for the CometVisu.
    It is recommended to use the CometVisu docker container.
    Information on how to install and configure the container to use openHAB as backend can be found :ref:`here <Docker_OpenHAB_Installation>`


.. hint::

    For further Information on the location of the CometVisu
    see the Install Section

If the XML-formatted configuration file "visu_config.xml" is to be
edited directly by the (advanced) user, it is advisable to use an
XML-compatible editor for this, which i.a. coloring syntax for better
readability (e.g., Textwrangler on MacOSX, WordPad ++, Notepad ++
or MS XML Editor 2007 on Windows, and on Linux, for example,
vi with ": syntax on").

General information about the CometVisu XML format can be found
:doc:`here <xml-format>`, information on the individual widgets in
the respective sub-pages.

Some widgets and plugins require additional information that should
not be included in the config file, as it is freely readable to
the web browser (depending on the environment installed, the transport
can be encrypted using HTTPS, but the content is handled by the Users
on the browser with appropriate tricks readable). By using the
:doc:`Hidden Configurations <hidden-config>` this information can
remain on the better protected server.

After saving, no process reboot is necessary, but you should reload
the page and clear the browser cache.

If the XML file is invalid, an error message is displayed when
loading the Visu in the web browser. This usually gives exact
information about where in the file the error lies. You can also
force the check with the link "Check Config"
in the footer or by appending check_config.php to the URL.

.. toctree::
    :hidden:

    hidden-config
    url-params

Exact descriptions of the available URL parameters can be found
under :doc:`URL Parameters <url-params>`.

.. _visu-config-details:

Pages and structure of CometVisu
---------------------------------

Basics
^^^^^^

For visualization and triggering of actions such as Switching or
blinds up/down uses the CometVisu so-called widgets. Widgets can be
understood as graphical building blocks arranged on a page to be
displayed. A widget consists of the actual visible area that receives
and redirects mouse or touch events, and invisible objects that specify
how the widget works in more detail.

A distinction is made between the following widgets:

-   Operation (here, for example, the switch widget for switching)

-   Presentation (these have only informative function)

-   Arrangement or grouping of other widgets or navigation within
    the different pages of the visualization (other widgets)

A small exception are the plugin widgets. These must be included in
the "meta section" of the configuration file before use.

Working with the configuration file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The structure of the xml-formatted configuration file is
divided into several sections, within which all other entries are
nested and enclosed by tags:

-  :ref:`The xml-Header <xml-format_header>`
-  :ref:`Plugins <xml-format_plugins>`
-  :ref:`Mappings <xml-format_mappings>`
-  :ref:`Stylings <xml-format_stylings>`
-  :ref:`Icons <xml-format_icons>`
-  :ref:`Statusbar <xml-format_statusbar>`
-  :ref:`Format of the Visu-Pages <xml-format_pages>`

.. toctree::
    :hidden:

    xml-format

Navigation elements in the CometVisu
------------------------------------

For navigation inside the visualization, the Cometvisu offers numerous
options for the user:

-  The :ref:`Page widget <page>` calls the associated subpage.
-  The Top Navigation Display shows the current path and allows you to
   navigate back to parent pages.
-  The back button of the browser or the operating system (e.g. iOS, Android)
-  The Navbar widget in conjunction with page jump widgets.
-  The :ref:`Pagejump widget <pagejump>` allows to call any subpage.
-  The :ref:`Group widget <group>` can also call any subpage with the
   option ``target =``.
-  A special feature is the :ref:`Statusbar <xml-format_statusbar>` at
   the bottom of the screen. From there you can call e.g. external URLs.

.. figure:: _static/Navigation_withDescription.png

   Overview of the most important navigation elements.

Furthermore, various functionalities are implemented which result in navigation
without user intervention:

-  A KNX group address can be used to jump to a subpage when the attribute
   ``ga=x/y/z`` is entered in the corresponding :ref:`Page Definition <page>`.
-  The options ``screensave_time`` and ``screensave_page``. This will call a
   specified page after a defined time has elapsed.
-  The :ref:`timeout plugin <timeout>` works similar to the screensave
   function, but will also run if the subpage is called via GA.

The available designs
---------------------

* :doc:`Metal <examples/swiss>`-> probably the most popular design
* Pure -> Standard-Design
* Diskreet
* Diskreet Sand
* Diskreet Slim
* Alaska
* Alaska Slim


Changes of the metal design
---------------------------

In version 0.12 the metal design has been revised. In order to achieve a cleaner, modern look all
background gradients, text shadows and the font have been replaced.

Those changes can be easily reverted by loading an additional css file.
You can achieve this, by adding the following text to the meta section of your configuration file.

.. code-block:: xml

    <meta>
        <files>
            <file type="css">resource/designs/metal/version1.css</file>
        </files>
        ...
    </meta>


Basic elements for designing the layout
---------------------------------------

In the CometVisu the size and arrangement of the widgets can be controlled
with the child element ``Layout``. Thus, a responsive design can be realized,
that adapts to the display size of the terminal from which the CometVisu
is viewed. This happens not only at the time of the URL call, but dynamically
e.g. also when turning the terminal from landscape to portrait or when changing
the window size on the PC.

Within the widgets there are different attributes like ``width``, ``height``,
etc. available. This can be used to control the size of the widget content
(e.g. image and diagram size, etc.).

Detailed descriptions of formatting the widget size and content:

.. toctree::
    :hidden:

    layout
    size-attributes

-  :doc:`Layout <layout>` sets the size and arrangement of widgets
-  :doc:`Width und Height <size-attributes>` affects the size of
   the widget content



Elements for conversion and formatting in the CometVisu
-------------------------------------------------------

In the CometVisu values can be displayed in many different ways. For
this purpose can be used:

.. toctree::
    :hidden:

    flavour
    format
    mapping
    styling

-  :doc:`Format <format>` of values e.g. on number of decimal
   places, units etc.
-  :doc:`Mapping <mapping>` allows the replacement of numerical
   values with texts (e.g. on/off instead of 1/0) and icons
   (e.g. for window contacts)
-  :doc:`Styling <styling>` allows value-dependent coloring of
   values (for example, on in red and off in green)
-  :doc:`Flavour <flavour>` allow additional options for some
   widgets in some designs.

Widgets in the CometVisu
------------------------

Widgets are the individual elements that make up a CometVisu site.
These can either be permanently installed in the CometVisu or
integrated via plug-in interface.

The description of the widgets can be read here:

.. toctree::

    widgets/index

To configure the communication of the widget with the backend ``address``
elements are used. They are described in the :ref:`chapter address <address>`.

.. toctree::
    :hidden:

    address

CometVisu - Examples
--------------------

Here are several examples of visualizations that are in productive use.

.. toctree::
    :maxdepth: 1
    :glob:

    examples/*


Miscellaneous
-------------

.. toctree::
    :maxdepth: 1

    notifications
    rrd_examples
    hydraulik
    customizing
