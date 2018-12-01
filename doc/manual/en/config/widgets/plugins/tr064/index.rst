.. _tr064:

The tr064 Plugin
=================

.. api-doc:: tr064

.. TODO::

    Automatische Screenshot-Generierung (aus Dummy-Daten)

Description
-----------

The plugin is an interface to routers that implement the TR-064 protocol, like
the widely used Fritz!Box. The ``calllist`` widget from this plugin displays
a call list that contains the name of the callers (when known to the router)
as well as the records of the answering machine.

.. widget-example::
    :hide-source: true

        <settings>
          <screenshot name="calllist">
          </screenshot>
        </settings>
        <meta>
          <plugins><plugin name="tr064"/></plugins>
        </meta>
        <calllist device="tr064device">
          <layout colspan="6" rowspan="6" />
        </calllist>

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the powerspectrum plugins can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the calllist-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: calllist

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="tr064" />
        </plugins>
    </meta>
    <calllist device="fritzbox">
        <layout colspan="4" />
    </calllist>

Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: calllist

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
            <plugin name="tr064" />
        </plugins>
    </meta>
    <calllist device="fritzbox">
        <layout colspan="4" />
        <label>TR-064 Calllist</label>
        <address transform="DPT:1.001" mode="read">1/1/0</address>
    </calllist>

XML syntax
----------

Alternatively it is possible to manually add the tr064 plugin entry to the
:doc:`visu_config.xml <../../../xml-format>`.

.. CAUTION::
    In the config only the UTF-8 charset is allowed. So an editor that is
    set to UTF-8 mode must be used.

The minimale example code for the calllist widget to create the shown 
screenshot is:

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <meta>
        <plugins>
            <plugin name="tr064" />
        </plugins>
    </meta>
    <page name="TR-064" type="text">
        <calllist device="fritzbox">
            <label>calllist</label>
        </calllist>
    </page>
    

.. widget-example::

    <settings>
        <screenshot name="calllist_simple">
            <caption>calllist, einfaches Beispiel</caption>
        </screenshot>
    </settings>
    <meta>
        <plugins>
            <plugin name="tr064" />
        </plugins>
    </meta>
    <calllist device="fritzbox">
        <label>calllist</label>
    </calllist>

Prequesites / setup of the server
---------------------------------

To be able to use the plugin the server must support PHP with the extension
of the SoapClient package.

On debian based systems it means that the ``php-soap`` package must be 
installed.

Setup of the Fritz!Box
----------------------

To get access to the call list of the Fritz!Box a user with according permissons
must be created (or an existing user account must be used). This is possible
on the user page:

.. figure:: _static/fritzbox_overview.png

The user itself needs the rights to access the call list:

.. figure:: _static/fritzbox_user.png

That the plugin can access this user account the credentials must be given.
This can be done in the CometVisu manager in the area "hidden configuration"[#f2]_:

.. figure:: _static/hidden_config_en.png

The used name must be given in the calllist widget in the attribute ``device``.

Apart from the manager it is possible to edit the file ``config/hidden.php`` 
manually and add a line like::

    <?php
    // File for configuraions that shouldn't be shared with the user
    $hidden = array(
      'fritzbox' => array('uri' => 'https://192.168.0.1:49443/', 'user' => 'CometVisuTestUser', 'pass' => 'pa3bvNM4j9z4')
    );
    ?>

.. rubric:: Footnotes

.. [#f1] In the simple view some things might be not visible. The expert view
         will show all entries.

.. [#f2] The "hidden configuration" are configuraion datas that are not 
         transmitted to the client any stay on the server. So there information
         is "hidden" to the user. On the server it is still readable in clear
         text. This is also true for the manager.
         
         This by itself doesn't create a secure environment, but it supports
         building one. There at least the manager must be inaccessable to the
         user.