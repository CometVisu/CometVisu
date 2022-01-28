.. _image:

The Image widget
================

.. api-doc:: Image

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds an image to your visualization. Using the auto-refresh setting this widget can be used e.g. to show
a camera picture.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Image widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Image-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: image

Valid values for ``cachecontrol`` are:

``full``   Standard. By extending the URL with a timestamp a refresh is
           ensured. Server support is required though.
``force``  Using sophisticated methods an enforcement of the refresh is
           attempted.
``weak``   The URL will be extended by an anchor with timestamp. This will
           work with most servers where ``full`` mode doesn't work. But it
           requires the correct use of HTTP headers by the server as well
           as a correct reaction by the web browser.
``none``   The URL will not be modified. A working refresh can be prevented
           by caching.
           
.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <image src="image.jpg">
        <layout colspan="4" />
    </image>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: image

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <image src="image.jpg">
        <layout colspan="4" />
        <label>Image</label>
    </image>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Image widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. widget-example::

    
    <image src="resource/icons/CometVisu_orange.png" width="45px" height="32px">
      <layout colspan="2" />
    </image>
    

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.
