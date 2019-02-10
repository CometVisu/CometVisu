.. _manager:

The CometVisu Manager
=====================

The manager uses a simple graphical interface to manage (create,
edit, replace, delete) various configuration files.
In addition you can manage the :ref:`hidden configurations <hidden-config>`
as well as media files (for example backdrops).

.. figure:: _static/manager.en.png

Available CometVisu Configurations
----------------------------------

The table lists all available configurations. Names ending with ``*)`` are
demonstration configurations that can be opened but not changed.

View
  Opens the configuration and shows it in the browser.

Check
  Checks the validity of the configuration, i.e. whether the syntax of the
  :ref:`XML file <xml-format>`is valid.

Edit
  Opens the configuration it the :ref:`graphical Editor <editor>`.

Text edit
  Opens the configuration an a text editor in the browser.

Download
  Download of the configuration so that it can be modified or backuped on the
  local machine.

Replace
  Upload of a configuration to replace an existing one.

Delete
  Deletes a configuration.

Available media files
---------------------

Your own configuration can be extended by additional files. Typical examples
are backdrop images or custom CSS rules to modify an existing design.

Hidden configuration
--------------------

Some plugins require addition configuration settings that shouldn't be
transmitted to the browser. This is described in more detail at the
:ref:`hidden configuration <hidden-config>` section of the manual.
