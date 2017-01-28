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

<h4>Simple example</h4>
<pre class="sunlight-highlight-xml">
&lt;speech lang=&quot;en&quot;&gt;
 &lt;address transform=&quot;OH:string&quot; mode=&quot;read&quot;&gt;Speak&lt;/address&gt;
&lt;/speech&gt;
</pre>

<h4>Example preventing repetition within a timeout and use mapping</h4>
<pre class="sunlight-highlight-xml">
...
&lt;meta&gt;
 &lt;plugins&gt;
   &lt;plugin name=&quot;speech&quot; /&gt;
 &lt;/plugins&gt;
 &lt;mappings&gt;
   &lt;mapping name=&quot;speak&quot;&gt;
     &lt;entry value=&quot;0&quot;&gt;Hello, welcome home&lt;/entry&gt;
     &lt;entry value=&quot;1&quot;&gt;Please close all windows&lt;/entry&gt;
     &lt;entry value=&quot;2&quot;&gt;Please close all doors&lt;/entry&gt;
   &lt;/mapping&gt;
 &lt;/mappings&gt;
&lt;/meta&gt;
...
&lt;speech lang=&quot;en&quot; repeat-timout=&quot;300&quot; mapping=&quot;speak&quot;&gt;
 &lt;address transform=&quot;DPT:5.010&quot; mode=&quot;read&quot;&gt;Speak&lt;/address&gt;
&lt;/speech&gt;
</pre>



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
        <layout colspan="4" />
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
        <layout colspan="4" />
        <label>speech</label>
        <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
    </speech>

Examples
--------

It is possible to manually edit the :doc:`visu_config.xml <../../../xml-format>` and add an entry
for the speech plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.