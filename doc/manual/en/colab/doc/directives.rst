Own directives
==============

In addition to the existing Sphinx/Docutils directives, there are also
some special directives in the CometVisu that help to keep the
documentation more up-to-date.

The following directives are currently supported:

+-----------------------+-----------------------------------------------------------------------------------------------+
| Name                  | Description                                                                                   |
+=======================+===============================================================================================+
| widget-example        | Provides sample code for widgets from which screenshots can be automatically created.         |
+-----------------------+-----------------------------------------------------------------------------------------------+
| parameter-information | Displays all attributes of a widget with allowed values and short explanation as a table.     |
+-----------------------+-----------------------------------------------------------------------------------------------+
| elements-information  | Shows all allowed sub-elements of a widget including their attributes as a table.             |
+-----------------------+-----------------------------------------------------------------------------------------------+
| api-doc               | Includes information from the source code documentation (@author and @since).                 |
+-----------------------+-----------------------------------------------------------------------------------------------+
| replaces              | This determines which pages of the old wiki replace this page                                 |
+-----------------------+-----------------------------------------------------------------------------------------------+

The *widget-example* Directive
------------------------------

The *widget-example* directive allows example code of a CometVisu config
from which one or more screenshots will be automatically generated later
and integrated into the documentation together with the example code.

The following example:

.. code-block:: rst

    .. widget-example::

        <settings>
            <screenshot name="switch_complete">
                <caption>Switch with mapping + styling</caption>
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Aus</entry>
                    <entry value="1">An</entry>
                </mapping>
            </mappings>
            <stylings>
                <styling name="RedGreen">
                    <entry value="1">red</entry>
                    <entry value="0">green</entry>
                </styling>
            </stylings>
        </meta>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

generates this entry in the documentation:

.. widget-example::

        <settings>
            <screenshot name="switch_complete">
                <caption>Switch with mapping + styling</caption>
                <data address="1/4/0">1</data>
            </screenshot>
        </settings>
        <meta>
            <mappings>
                <mapping name="OnOff">
                    <entry value="0">Aus</entry>
                    <entry value="1">An</entry>
                </mapping>
            </mappings>
            <stylings>
                <styling name="RedGreen">
                    <entry value="1">red</entry>
                    <entry value="0">green</entry>
                </styling>
            </stylings>
        </meta>
        <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen" bind_click_to_widget="true">
          <label>Kanal 1<icon name="control_on_off"/></label>
          <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
          <address transform="DPT:1.001" mode="read">1/4/0</address>
        </switch>

The content of the directive is based on the structure of the normal
CometVisu configuration file and is also an XML document. It
basically consists of 3 areas:

#. **<settings>** Here are the screenshots and subtitles defined.
#. **<meta>** Everything is allowed here, which is also allowed within
   the *<meta>* element of the configuration file (for example loading
   plugins, defining mappings, styling, etc.)
#. **All other** Anything that is not inside a *<settings>* or *<meta>*
   element is interpreted as a sample code. Everything that is allowed
   within a *<page>* element of the configuration file (such as widgets,
   groups, etc.) is allowed here.

The areas 1 and 2 are optional and may be omitted, so if e.g. only
1 screenshot of the example code without subtitles required, the
*<settings>* - part can also be omitted.

In addition, there are various options with which the appearance
of the example code and the corresponding screenshot can be influenced.

#. `linenos`: If specified, the example code is given with line numbers
#. `lineno-start`: Number at which the line numbers should start (default: 1)
#. `scale`: Percentage with which the screen host can be reduced (default: 100)
#. `hide-source`: *true* or *false*. (Default: *false*), does not display
   the sample code if *true*
#. `editor`: *attributes* or *elements*. Take a screenshot of the example
   code in the editor, not the widget itself
#. `align`: *left*, *center* or *right*. Defines the position of the
   screenshot (Default: *left*)

A complete example with all options:

.. code-block:: rst

    .. widget-example::
        :linenos:
        :linenos-start: 1
        :scale: 75
        :hide-source: true
        :editor: attributes
        :align: center

        ....


The *<settings>*
^^^^^^^^^^^^^^^^

This area is defined by the `<settings>` element and this can be refined
by attributes and subelements.

+-------------------+--------------------------------------------------------------------------------------------------------------------+
| Element           | Attribute                                                                                                          |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
|                   | Name              | Content           | Description                                                                |
+===================+===================+===================+============================================================================+
| <settings>        | design            | Name of a design| In which design the screenshot should be taken (default: metal)              |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | selector          | Css-Selector      | Defines the area of the screenshot                                         |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | sleep             | number            | Initial wait time in ms before the screenshot is taken                     |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        |                   | #text             | Subtitles of the example code                                              |
|   <caption>       |                   |                   |                                                                            |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        | name              | text              | File name of the screenshot                                                |
|   <screenshot>    +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | clickpath         | CSS-Selector      | CSS path to an item to be clicked before the screenshot                    |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | waitfor           | CSS-Selector      | CSS path to an item that should be visible before the screenshot           |
|                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | sleep             | number            | Waiting time between sending the data and screenshot                       |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+
| <settings>        | address           | group address     | Send data to this address before taking the screenshot                     |
|   <screenshot>    +-------------------+-------------------+----------------------------------------------------------------------------+
|      <data>       | type              | *float* or *int*  | If real numbers need to be sent                                            |
+                   +-------------------+-------------------+----------------------------------------------------------------------------+
|                   | #text             | text              | Content of the data to be sent                                             |
+-------------------+-------------------+-------------------+----------------------------------------------------------------------------+

The *parameter-information* Directive
-------------------------------------

This directive automatically creates a table summary with the
widget's attributes. These data are read from the schema definition
(visu_config.xsd). This directive has no options, no content, and only
one parameter that contains the widget name.

This example creates the attribute table for the switch widget.

.. code-block:: rst

    .. parameter-information:: switch

.. parameter-information:: switch

The *elements-information* Directive
------------------------------------

This directive automatically creates a table summary with the allowed
sub-elements of a widget. These data are read from the schema definition
(visu_config.xsd). This directive has no options, no content, and only
one parameter that contains the widget name.

This example creates the element table for the switch widget.

.. code-block:: rst

    .. elements-information:: switch

.. elements-information:: switch

The *api-doc* Directive
-----------------------

This directive reads important information from the source code
documentation of a widget or plugin. Currently these are the values
of the ``@author`` and ``@since`` specifications.

.. IMPORTANT::

    It is important that the name of the widget corresponds exactly
    to the name of the source code file without file extension, e.g.
    for ``structure/pure/Switch.js`` use ``.. api-doc :: Switch``
    (case-sensitive). For plugins, the folder name of the plugin
    must be specified, e.g. for ``plugins/clock/`` you
    take ``.. api-doc :: clock``

Example for the Switch-Widget:

.. code-block:: rst

    .. api-doc:: Switch

generates the following content:

.. api-doc:: Switch

The *replaces* Directive
------------------------

This directive defines which pages of the old wiki are replaced by
this manual page. Several wiki pages can be specified. This
directive does not add any content to the documentation, but is
used to automatically create redirects.

.. code-block:: rst

    .. replaces:: CometVisu/0.8.x/widgets/switch/de/
        CometVisu/0.8.0/switch/de
        CometVisu/Widget/switch/de
        CometVisu/switch
        CometVisu/switch_(Deutsch)

