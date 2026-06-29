.. _customizing:

Customize CometVisu
===================

The CometVisu can be customized in many different ways to your own
needs. In the following, the different possibilities - sorted by
degree of complexity - are described in detail.

===   ======================    ===========    ===================================================
\     Adjustment                Changes        Description
===   ======================    ===========    ===================================================
1.    Own CSS-Rules             Appearance     Override the existing CSS rules of a theme by loading additional CSS files.
2.    Use own Icons             Appearance     In addition to the included icons, custom icons can be added via the configuration file.
3.    Widgets with ``class``    Appearance     Many widgets can be customized by adding the ``class`` attribute and matching CSS rules.
4.    Write own Design          Appearance     If additional CSS rules are not enough, a new design can be created.
5.    Write own Widgets         Content        Add new widgets through plugins.
6.    Write own Structure       Content        The conversion of the configuration files into HTML code can be completely changed by creating a new structure.
===   ======================    ===========    ===================================================


.. _custom_cssrules:

Change existing design
----------------------

The existing designs can be adapted by own CSS rules. In the metafile of the
configuration file, paths to CSS files can be specified, which are loaded
in addition to the CSS files of the CometVisu design.

The CSS-files can be uploaded with the :ref:`Manager <manager>`,
if it is not possible to access the servers filesystem directly.


.. code-block:: xml
    :caption: Extracting a configuration file that loads 2 additional CSS files:

    <pages... design="metal">
        <meta>
            <files>
                <file type="css">resource/config/media/my-custom-style.css</file>
                <file type="css">resource/config/media/my-other-custom-style.css</file>
                ...
            </files>
            ...
        </meta>
        ...
    </pages>

.. HINT::
    In earlier versions of CometVisu (<= 0.10.x) the CSS rules had to be entered
    in the ``custom.css`` file of the respective design. Although this still works, it is
    recommended to copy these rules into a new file and integrate them using the path
    described here. The old way will only be maintained for reasons of
    compatibility and will be removed in future versions.


Include your own icons
----------------------

This option defines the name of the icon, which is located under the
directory specified in ``uri``. The icons defined in this way can then
be accessed via the name that is easier to remember. The directory
specification is in the example relative to the CV installation.

Here, the icons were previously stored in a separate subdirectory.

.. code-block:: xml
    :caption: Add an additional icon

    <pages...>
        <meta>
            ...
            <icons>
                <icon-definition name="Icon1" uri="./resource/config/media/icon1.png"/>
            </icons>
            ...
        </meta>
        ...
        <text>
          <label><icon name="Icon1"></icon></label>
        </text>
    </pages>

.. _custom_css:

Change individual widgets through CSS classes
---------------------------------------------

With many widgets it is possible to specify a ``class`` attribute in the
configuration file, which can then be used for own CSS rules. This gives
you the opportunity to visually change individual widgets.

.. HINT::
    The value of the ``class`` attribute specified in the configuration
    file is given a ``custom_`` prefix. So from ``<switch class = "fancy"...``
    the HTML code ``<div class="switch custom_fancy"...``


.. code-block:: xml
    :caption: An individualized switch widget

    <pages... design="metal">
        <meta>
            <files>
                <file type="css">resource/config/media/my-custom-style.css</file>
            </files>
            ...
        </meta>
        <page>
            <switch class="fancy">...</switch>
        </page>
    </pages>

.. code-block:: css
    :caption: CSS rules for the switch widget in the file `resource/config/media/my-custom-style.css`

    .switch.custom_fancy {
        color: pink;
    }


Write your own design
---------------------

In addition to the already described possibilities for optical
adjustments, there is a further possibility to write a completely new design.

A CometVisu design consists of at least the following files:

*   *basic.css*: Main CSS file with all the rules needed for the design
*   *mobile.css*: CSS rules for small screen mobile devices (may be blank)
*   *design_setup.js*: Optional Javascript file that can make adjustments that
     are not possible via CSS (may be empty)

.. HINT::
    To develop and test a new design, the source version of CometVisu is
    ready. This can be obtained by cloning the git repository, executing
    `./generate source` (clone once and each time a new file is added to the design).


.. _custom_plugins:

Write your own widgets via plugins
----------------------------------

New widgets can be added via plugins. This is a good entry point into the
CometVisu development as you get to know the possibilities of the system.
As documentation of the possibilities of your own widget the source code
of the existing plugins can be used. This chapter is more about how you
can integrate such a plugin into the CometVisu.

Here is a distinction between two ways in which plugins are integrated
into the CometVisu.

1.  **Embedded Plugins**: Plugins that come with the CometVisu and go 
    through their build process

    *Advantages:*

        *   Are part of CometVisu and are therefore available to all users. 
            Compatibility with future CometVisu versions is usually guaranteed.
        *   The code is optimized and minified when creating the CometVisu
            release, which shortens the load time
        *   The use of additional auxiliary classes from the Qooxdoo
            framework is easily possible.
        *   Part of the Git version management: all changes to the code are
            recorded and can be reversed if errors occur.

    *Disadvantage:*

        *   Additional configuration needed, so that the plugins can be
            delivered with the CometVisu
        *   To develop the source version of CometVisu is needed
        *   Git knowledge required

2.  **Independent Plugins**: These are Javascript files, which are loaded by CometVisu during initialization

    *Advantages:*

        *   Easy integration
        *   Can be used and developed with a release of the CometVisu

    *Disadvantage:*

        *   Is not part of the CometVisu, the user must take care of himself 
            for compatibility with future CometVisu versions.
        *   No code optimizations possible
        *   Additional dependencies to Qooxdoo classes not possible 
            (which is not part of CometVisu can not be used)


Structure a Widget
~~~~~~~~~~~~~~~~~~

To add a new widget, three things are needed:

1.  A *parser* that can read the widget definition from
    the XML configuration file
2.  A *widget class* that receives the data from the parser and
    generates HTML code that will be incorporated into the GUI. It
    also handles everything in the class that the widget needs. This
    includes e.g. Detecting user interactions and resulting status
    updates sent to the backend, or even presenting status updates
    received from the backend.
3.  An *XSD schema* definition that describes the structure of the
    widget in the XML configuration file (not required for Standalone plug-ins)

Every widget in CometVisu consists of these three things. In the standard
widgets, the *parser* and the *widget class* are divided into two different
files, with plugins both are in one file. The schema definitions can all be
found in the ``visu_config.xsd`` file.

.. HINT::
    Dividing the *parser* and *widget classes* into two files has the
    advantage of making it easier to swap widget classes. All standard
    widget classes are grouped together in a structure called ``Pure``.
    It is possible to exchange this structure with another one. In order
    not to reprogram all parsers in such a case, this separation has been made.


example plugin
~~~~~~~~~~~~~~

A simple example, for a new widget that can be plugged in,
can be found in the ``resource/config/structure_custom.js``.


.. code-block:: javascript

    qx.Class.define('cv.ui.structure.pure.Headline', {
      extend: cv.ui.structure.AbstractWidget,

      statics: {
        // parse element from visu_config*.xml
        parse: function (xml, path, flavour, pageType) {
          var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
          data.content = xml.textContent;
          return data;
        }
      },

      properties: {
        content: {
          check: 'String',
            init: ''
        }
      },

      members: {
        // generate the DOM string to be added to the GUI
        getDomString: function () {
          return '<h1 ' + (this.getClasses() ? 'class="'+this.getClasses()+'"' : '') + '>' + this.getContent() + '</h1>';
        }
      },

      // this function is executed when this file is loaded
      defer: function(statics) {
        // register the parser
        cv.parser.WidgetParser.addHandler("headline", cv.ui.structure.pure.Headline);
        // register the widget
        cv.ui.structure.WidgetFactory.registerClass("headline", statics);
      }
    });

This file provides a widget which adds to the GUI a heading element
with arbitrary text. It can be used in the configuration file as
``<headline> ... </ headline>``. It is important that the widget in the
configuration file is always embedded in a ``<custom>`` element. Since
no schema definition exists for this stand-alone plug-in, this additional
step is necessary so that the schema validator does not mark the
configuration file as invalid.

To use this plugin, the file must be loaded.

.. code-block:: xml

    <pages...>
        <meta>
            <files>
                <file type="js" content="plugin">resource/config/structure_custom.js</file>
                ...
            </files>
            ...
        </meta>
        ...
        <custom>
            <headline>My new widget!</headline>
        </custom>
    </pages>

For the CometVisu to recognize that the file provides a
stand-alone plugin, it must be specified with the attributes
``type="js" content="plugin"``. If this does not happen,
it can happen that the file is loaded at the wrong time and
can not be used due to an error.


Write your own structure
-------------------------

If the HTML code generated by the CometVisu is to be changed, you
have to write a new structure. So far, only the ``pure`` structure
exists in the CometVisu under the path ``cv.ui.structure.pure``.
It contains all widget classes provided by CometVisu. These are
responsible for generating HTML code from a configuration file
read by the *Parsers*.

A new structure changes the generated HTML code, so you always
have to write a new design for this structure.

.. HINT::
    
    The writing of a new structure is planned, but has never
    been implemented. Therefore, it is quite possible that
    further preparatory work is required in order to 
    exchange the structures easily.
