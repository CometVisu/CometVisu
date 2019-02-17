.. _speech:

The Speech plugin
=================

.. api-doc:: Speech

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

Use the Web Speech API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
to make text-to-speech service available. This plugin listens to a address and forwards the
incoming data to the browser TTS engine (if the browser supports it)

**Simple example**

.. code-block:: xml

    <speech lang="en">
     <address transform="OH:string" mode="read">Speak</address>
    </speech>



**Example preventing repetition within a timeout and use mapping**

.. code-block:: xml

    ...
    <meta>
     <plugins>
       <plugin name="speech" />
     </plugins>
     <mappings>
       <mapping name="speak">
         <entry value="0">Hello, welcome home</entry>
         <entry value="1">Please close all windows</entry>
         <entry value="2">Please close all doors</entry>
       </mapping>
     </mappings>
    </meta>
    ...
    <speech lang="en" repeat-timout="300" mapping="speak">
     <address transform="DPT:5.010" mode="read">Speak</address>
    </speech>





.. ###END-WIDGET-DESCRIPTION###


Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the speech plugins can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the speech-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: speech

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
    </meta>
    <speech>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </speech>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: speech

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
    </meta>
    <speech>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </speech>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the speech plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.