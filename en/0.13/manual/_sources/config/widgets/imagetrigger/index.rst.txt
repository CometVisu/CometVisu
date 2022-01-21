.. _imagetrigger:

The ImageTrigger widget
=======================

.. api-doc:: ImageTrigger

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Adds an image like the {@link cv.ui.structure.pure.Image} widget, but additionally the image can be changed by incoming
data and can send data to the backend by clicking on it.
There are two modes to react on incoming data:


 * ``type="show"``: Hides the image when incoming data === 0
 * ``type="select"``: Changes the image by appending the incoming data to the initial configured image source, or hide it when incoming data === 0

Example:

.. code-block:: xml

    <imagetrigger src="resource/icons/comet" suffix="svg" sendValue="clicked" type="select">
       <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
    </imagetrigger>



initially shows nothing. When the CometVisu receives the string ``_icon`` in address ``0/0/0``,
the image ``icons/comet_opt_icon.svg`` is shown. When the CometVisu receives '0' on address ``0/0/0``,
this image is hidden.


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the ImageTrigger widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the ImageTrigger-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: imagetrigger

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <imagetrigger src="resource/icons/CometVisu_" suffix="png">
        <layout colspan="4" />
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </imagetrigger>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: imagetrigger

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <imagetrigger src="resource/icons/CometVisu_" suffix="png">
        <layout colspan="4" />
        <label>ImageTrigger</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </imagetrigger>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the ImageTrigger widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    
    <imagetrigger src="resource/icons/CometVisu_" suffix="png" sendValue="clicked" type="select" width="45px" height="32px">
       <layout colspan="1"/>
       <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
     </imagetrigger>
        
.. code-block:: xml

    
    <imagetrigger src="resource/icons/CometVisu_orange" suffix="png" sendValue="clicked" type="show" width="45px" height="32px">
       <layout colspan="0"/>
       <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
     </imagetrigger>
        
    

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.