.. _navbar:

The NavBar widget
=================

.. api-doc:: NavBar

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

With the widget navbar, you can add a navigation menu to the entire visu.
The menu can be displayed on a page (top, bottom, left, right).


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the NavBar widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

The ``dynamic`` attribute allows to dynamically show and hide the navbar.
The show and hide is only implemented for the left navbar and requires a
touch capable device. To show you must swipe from the left end of the screen
horizontal to the middle, to hide you must swipe to the left.

+-------------+------------------------------------+------------------------------------+
| ``dynamic`` | Mobile device                      | Big screen                         |
+=============+====================================+====================================+
| *empty*     | Navbar can be shown and hidden.    | Navbar is always shown.            |
|             | After start it is hidden.          |                                    |
+-------------+------------------------------------+------------------------------------+
| true        | Navbar can be shown and hidden.    | Navbar can be shown and hidden.    |
|             | After start it is hidden.          | After start it is shown.           |
+-------------+------------------------------------+------------------------------------+
| false       | Navbar is always shown.            | Navbar is always shown.            |
+-------------+------------------------------------+------------------------------------+

Allowed attributes in the NavBar-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: navbar

.. .. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <navbar>
        <layout colspan="4" />
    </navbar>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All widgets are allowed in the page widget.

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the NavBar widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

