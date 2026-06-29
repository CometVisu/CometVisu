.. _xml-format:

XML-Structure
=============

An XML file consists of various "elements" that together represent
a tree. An element can include other elements. Via "Attributes" an
element can accept values. Some of these attributes must be assigned.

.. _xml-format_header:

The Header of visu_config.xml
------------------------------

The configuration file always starts with the following two lines:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" design="pure" xsi:noNamespaceSchemaLocation="visu_config.xsd">

The following settings are relevant in the second line:

+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| Option                     | Description                                                                                                  | Values                                                                     | Necessary  |
+============================+==============================================================================================================+============================================================================+============+
| ``design="pure"``          | This option sets the default design to apply to the visualization                                            | pure, metal, discreet, discreet_sand, discreet_slim, alaska, alaska_slim   | YES        |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``screensave_time="60"``   | This option can be used to set the time after which a particular page is returned                            | any value in seconds                                                       | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``screensave_page="main"`` | This option allows you to specify which page will be displayed after ``sceensave_time`` has expired          | Specification of the page ID eg. "id_1" or page name e.g. "Main"           | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend="mqtt"``         | This option sets the backend to use - overriding the information sent from the server                        | ``knxd``, ``openhab``, ``mqtt``                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend-knxd-url=""``    | URL of the knxd login resource                                                                               |                                                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend-mqtt-url=""``    | URL of the MQTT login resource                                                                               |                                                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend-openhab-url=""`` | Path to the openHAB REST-API                                                                                 | Usually ``/rest/``                                                         | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``backend-url="/rest/"``   | Deprecated, only for openHAB: URL of the connection to the MQTT broker web sockets                           |                                                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``username="user"``        | Deprecated, only for openHAB: user name                                                                      |                                                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``password="secret"``      | Deprecated, only for openHAB: password                                                                       |                                                                            | NO         |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+
| ``lib_version="9"``        | Version of the CometVisu-library. This value is only required for the upgrade script.                        | The CometVisu version 0.12.0 uses the value ``9``                          | YES        |
+----------------------------+--------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+------------+

Next in the visu_config.xml within the meta tag are all definitions for
plugins, mappings, stylings, icons and the status bar. The correct
order must be adhered to!

The following is an overview of the options in the meta-tag.

.. _xml-format_files:

Include additional files
------------------------

| **Available since version**: 0.11.0
|

===========================  ============================================   =================================  ===============
Option                       Description                                    Values                             Necessary
===========================  ============================================   =================================  ===============
``<file type=" "></file>``   With this option additional files (CSS or      Path to the file                   NO
                             Javascript) can be loaded
===========================  ============================================   =================================  ===============

.. code-block:: xml

    <meta>
        <files>
            <file type="css">resource/config/media/style.css</file>
            <file type="js" content="plugin">resource/config/media/MyCustomWidget.js</file>
        </files>
        ...
    </meta>

see also :ref:`custom_css` and :ref:`custom_plugins`.

.. _xml-format_plugins:

Plugins
-------

+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------+--------------------------------+------------+
| Option                   | Description                                                                                                                          | Values                         | Necessary  |
+==========================+======================================================================================================================================+================================+============+
| ``<plugin name=" "/>``   | With this option the plugins are included. Here the name of the plugin is entered. For each plugin such an entry must be created.    | z.B. clock or diagram          | NO         |
+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------+--------------------------------+------------+

.. code-block:: xml

    <meta>
        <plugins>
            <plugin name="clock"/>
        </plugins>
        ...
    </meta>


.. _xml-format_mappings:

Mappings
--------

+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------+-------------+------------+
| Option                                     | Description                                                                                                         | Values      | Necessary  |
+============================================+=====================================================================================================================+=============+============+
| ``<mapping name=" ">``                     | This option defines the name of the mapping. This is also displayed in the web editor with corresponding widgets.   | e.g. Name   | YES        |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------+-------------+------------+
| ``<entry value="WERT">NAME</entry>``       | This option assigns a name to a value. For every possible value, such an entry must be created.                     | e.g. Stop   | YES        |
+--------------------------------------------+---------------------------------------------------------------------------------------------------------------------+-------------+------------+

.. code-block:: xml

    <meta>
        ...
        <mappings>
            <mapping name="Start/Stop">
                <entry value="0">Stop</entry>
                <entry value="1">Start</entry>
            </mapping>
        </mappings>
        ...
    </meta>

.. _xml-format_stylings:

Stylings
--------

+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------+------------+------------+
| Option                                      | Description                                                                                                        | Values     | Necessary  |
+=============================================+====================================================================================================================+============+============+
| ``<styling name=" ">``                      | This option defines the name of the styling. This is also displayed in the web editor with corresponding widgets.  | e.g. name  | YES        |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------+------------+------------+
| ``<entry value="WERT">FARBE</entry>``       | This option assigns a color to a value.                                                                            | e.g. red   | YES        |
+---------------------------------------------+--------------------------------------------------------------------------------------------------------------------+------------+------------+

.. code-block:: xml

    <meta>
        ...
        <stylings>
            <styling name="RedGreen">
                <entry value="0">red</entry>
                <entry value="1">green</entry>
            </styling>
        </stylings>
        ...
    </meta>

.. _xml-format_icons:

Icons
-----

+-----------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+
| Option                                        | Description                                                                                                                                                                                                                                                                                                                                     | Values  | Necessary  |
+===============================================+=================================================================================================================================================================================================================================================================================================================================================+=========+============+
| ``<icon-definition name=" " uri="WERT">``     | This option defines the name of the icon, which is located under the directory specified in uri. The icons defined in this way can then be accessed via the name that is easier to remember. The directory specification in the example is relative to the CV installation. Here, the icons were previously stored in a separate subdirectory.  | e.g.    | NO         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------+------------+

.. code-block:: xml

    <meta>
        ...
        <icons>
            <icon-definition name="Icon1" uri="./icon/subfolder/icon1.png"/>
        </icons>
        ...
    </meta>

.. HINT::

    If the icons have been uploaded with the :doc:`Manager <manager>` they are stored in the path
    ``resource/config/media/``. An uploaded icon with the filename ``logo.svg`` kan be included with the following
    line: ``<icon-definition name="Logo" uri="resource/config/media/logo.svg"`.
    The path ``resource/config/media/`` is valid for CometVisu versions >=0.11.x. For versions <=0.10.x the path
    ``config/media/`` is valid.

.. _xml-format_statusbar:

Footer
---------

The status bar (footer) is located at the bottom of the screen and allows e.g. external links (via URL).

.. code-block:: xml

    <meta>
        ...
        <statusbar>
            <status type="html"><![CDATA[
                <img src="resource/icons/comet_64_ff8000.png" alt="CometVisu" /> by <a href="http://www.cometvisu.org/">CometVisu.org</a>
                - <a href=".?forceReload=true">Reload</a>
                - <a href="?config=demo">Widget Demo</a>
                ]]></status>
            <status type="html" condition="!edit" hrefextend="config"><![CDATA[
                - <a href="edit_config.html">Edit</a>
                ]]></status>
            <status type="html" condition="edit" hrefextend="all"><![CDATA[
                - <a href=".">normal Mode</a>
                ]]></status>
            <status type="html"><![CDATA[
                - <a href="check_config.php">Check Config</a>
                <div style="float:right;padding-right:0.5em">Version: SVN</div>
                ]]></status>
        </statusbar>
    </meta>

.. _xml-format_templates:

Templates
---------

| **Available since version**: 0.11.0
|

In the meta area, templates for frequently used configuration sections
can be created. In general, one would like to show e.g. his heating in every
room in the same way. However, this can consist of several widgets, e.g. a slider
for displaying and operating the valve position, an info widget for displaying
the current actual temperature and an InfoTrigger widget for the current setpoint
temperature. This structure is the same in every room, only the used address
changes. With a template you have to write this structure only once and can
reuse it in every room.

In the template definition, placeholders are used for variables, which are then
replaced by the corresponding values when using the template. The following example
shows how to define and use a template.

.. code-block:: xml
    :caption: Example of a template for a heater and its use in different rooms

    <pages>
        <meta>
            <templates>
                <template name="Heating">
                    <group name="Heating">
                      {{{ additional_content }}}
                      <slide min="0" max="100" format="%d%%">
                        <label>
                          <icon name="sani_heating" />
                          Heating
                        </label>
                        <address transform="OH:dimmer" variant="">{{ control_address }}</address>
                      </slide>
                      <info format="%.1f °C">
                        <label>
                          <icon name="temp_temperature" />
                          actual value
                        </label>
                        <address transform="OH:number" variant="">{{ currenttemp_address }}</address>
                      </info>
                      <infotrigger uplabel="+" upvalue="0.5" downlabel="-"
                                   downvalue="-0.5" styling="BluePurpleRedTemp"
                                   infoposition="middle" format="%.1f °C" change="absolute" min="15" max="25">
                        <label>
                          <icon name="temp_control" />
                          setpoint
                        </label>
                        <address transform="OH:number" variant="">{{ targettemp_address }}</address>
                      </infotrigger>
                    </group>
                </template>
            </templates>
        </meta>
        <page>
            <page name="Living room">
                ...
                <template name="Heating">
                  <value name="control_address">Heating_FF_Living</value>
                  <value name="currenttemp_address">Temperature_FF_Living</value>
                  <value name="targettemp_address">Temperature_FF_Living_Target</value>
                </template>
                ...
            </page>
            <page name="Kitchen">
                ...
                <template name="Heating">
                  <value name="control_address">Heating_FF_Kitchen</value>
                  <value name="currenttemp_address">Temperature_FF_Kitchen</value>
                  <value name="targettemp_address">Temperature_FF_Kitchen_Target</value>
                  <value name="additional_content">
                    <text><label>Heating Kitchen</label></text>
                  </value>
                </template>
                ...
            </page>
        </page>
    </pages>

.. HINT::
    The templates use `mustache.js <https://github.com/janl/mustache.js>`_. For
    more information, the mustache.js documentation can be consulted.

As an alternative to the example above, the content of the template can
also be swapped out to an external file.

.. code-block:: xml
    :caption: Example of a template definition from an external file


    <pages>
        <meta>
            <templates>
                <template name="Heizung" ref="resource/config/media/heating.template.xml"/>
            </templates>
        </meta>
        <page>
            <page name="Living room">
                ...
                <template name="Heating">
                  <value name="control_address">Heating_FF_Living</value>
                  <value name="currenttemp_address">Temperature_FF_Living</value>
                  <value name="targettemp_address">Temperature_FF_Living_Target</value>
                </template>
                ...
            </page>
            <page name="Kitchen">
                ...
                <template name="Heating">
                  <value name="control_address">Heating_FF_Kitchen</value>
                  <value name="currenttemp_address">Temperature_FF_Kitchen</value>
                  <value name="targettemp_address">Temperature_FF_Kitchen_Target</value>
                  <value name="additional_content">
                    <text><label>Heating Kitchen</label></text>
                  </value>
                </template>
                ...
            </page>
        </page>
    </pages>

.. code-block:: xml
    :caption: Content of the external file ``resource/config/media/heizung.template.xml``

    <group name="Heating">
      {{{ additional_content }}}
      <slide min="0" max="100" format="%d%%">
        <label>
          <icon name="sani_heating" />
          Heating
        </label>
        <address transform="OH:dimmer" variant="">{{ control_address }}</address>
      </slide>
      <info format="%.1f °C">
        <label>
          <icon name="temp_temperature" />
          actual value
        </label>
        <address transform="OH:number" variant="">{{ currenttemp_address }}</address>
      </info>
      <infotrigger uplabel="+" upvalue="0.5" downlabel="-"
                               downvalue="-0.5" styling="BluePurpleRedTemp"
                               infoposition="middle" format="%.1f °C" change="absolute" min="15" max="25">
        <label>
          <icon name="temp_control" />
          setpoint
        </label>
        <address transform="OH:number" variant="">{{ targettemp_address }}</address>
      </infotrigger>
    </group>

.. _xml-format_pages:

Structure of the visu pages
---------------------------

First, a page must be created as the start page. This happens with the
topmost container. All other widgets and pages are inside this main page.
The position of the elements is processed from top to bottom.

This looks like this:

.. widget-example::

    <settings selector=".page.activePage">
        <screenshot name="structure_main_page">
            <caption>Mainpage with link to the subpage</caption>
        </screenshot>
        <screenshot name="structure_sub_page" clickpath=".widget.pagelink .actor" waitfor="#id_0_">
            <caption>subpage</caption>
            <data address="1/0/5">0</data>
        </screenshot>
    </settings>
    <meta>
        <plugins>
         <plugin name="clock"/>
        </plugins>
    </meta>
    <page name="Mainpage">
       <page name="Page1">
           <switch on_value="1" off_value="0">
              <label>Spot TV</label>
              <address transform="DPT:1.001" mode="readwrite" variant="">1/0/5</address>
           </switch>
       </page>
       <colorchooser>
          <label>RGB Kitchen</label>
          <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
          <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
          <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
       </colorchooser>
    </page>

This little example creates a main page named
**Start page**. On this home page, a link to a subpage named **Page1**
will be created. On this subpage, a button named **Spot TV** will be
added to the top. Next, the color chooser named **RGB Kitchen** will
be added to the main page.

With this structure arbitrarily complex page structures can be created. For
a description of the individual widgets with their associated XML codes,
see :doc:`Widget Summary <widgets/index>`

In the last line of the config the tag has to be closed. Therefore the
following entry has to be inserted at the end of the file:

.. code-block:: xml

    </pages>

This completes the visu_config.xml and can be transferred to the server.
