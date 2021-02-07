.. _editor:

Graphical editor
================

The graphical editor can be opened at the :ref:`manager <manager>` where as an
alternative also a text based editor can be opened. With the editor you can
modify a configuration without knowing anything of the :ref:`XML syntax <xml-format>`.

Overview
--------

The editor consists out of three parts:

.. figure:: _static/editor.png

At the top is a menu bar, on the left the sctructure of the configuration
and on the right attributes of the selected element.

The options of the menu bar are:

save
  Store the current state of the configuration.

complex
  Toggle display of enhanced configuration options.

preview
  Show a preview of the current state of the configuration without replacing
  the current version.

manager
  Return to the :ref:`manager <manager>`.

Operation
---------

When an element on the left is clicked it's attribute table will be displayed
on the right when it is available for this element type.

To add additional elements the future parent element must be clicked with the
right mouse button.

.. figure:: _static/editor_node_right_click.png

A context menu will appear with options for:

add child
  Add a new child element.

remove
  Delete the element.

cut
  Cut out the element.

copy
  Copy the element.

paste
  Paste the cut or copied element.

sort
  Sort the elements (when possible here).

.. figure:: _static/editor_sort.png

To sort elements in the context menu "sort" must be selected. Then yellow
boxes will appear as placeholders for possible future positions of the element.
Once clicked on one of those the element will be moved to that position.
