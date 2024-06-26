.. _audio:

The Audio widget
================

.. api-doc:: Audio

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

The audio widget embeds an audio file, which can be automatically played by incoming data


.. ###END-WIDGET-DESCRIPTION###

Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the Audio widget can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the Audio-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: audio

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [1]_</caption>
    <audio src="sound.mp3" id="example">
        <layout colspan="4" />
        <label>Audio</label>
    </audio>


Allowed child-elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: audio

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <audio src="sound.mp3" id="example">
        <layout colspan="4" />
        <label>Audio</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </audio>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the Audio widget.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten

.. code-block:: xml

    
    <audio id="audio_widget" src="path/to/audio_file.mp3">
      <layout colspan="4"/>
      <label>Audio</label>
      <address transform="DPT:1.001" mode="read">0/0/0</address>
    </audio>
        
    

.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [1] The simple view might not show everything. To see all elements/attributes use the expert view.
