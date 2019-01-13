.. _rss:

The rss plugin
==============

.. api-doc:: Rss

Description
-----------

.. ###START-WIDGET-DESCRIPTION### Please do not change the following content. Changes will be overwritten

This plugins integrates zrssfeed to display RSS-Feeds via Google-API 
and a parser for local feeds using jQuery 1.5+ into CometVisu.
rssfeedlocal is derived from simplerss and zrssfeed
rssfeedlocal is mainly meant to be used with rsslog.php and plugins


.. code-block:: xml

      <rss src="/visu/plugins/rss/rsslog.php" refresh="300" link="false" title="false"></rss>
      <rss src="http://www.tagesschau.de/xml/rss2" refresh="300">Test API</rss>
      <rss src="/visu/plugins/rss/tagesschau-rss2.xml" refresh="300" header="true" date="true"></rss>




.. ###END-WIDGET-DESCRIPTION###


Settings
--------

For a general understanding of how the configuration files are structured and what elements and attributes are
it is recommended to read this section first: :ref:`visu-config-details`.

The behaviour and appearance of the rss plugins can be influenced by using certain attributes and elements.
The following tables show the allowed attributes and elements and their possible values.
The screenshots show, how both can be edited in the :ref:`editor <editor>`.

Attributes underlined by ..... are mandatory, all the others are optional and be omitted.

Allowed attributes in the rss-element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: rss

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attributes in the editor (simple view) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="rss" />
        </plugins>
    </meta>
    <rss src="rss.xml" header="true">
        <layout colspan="4" />
    </rss>


Allowed child-elements und their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: rss

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elements in the editor</caption>
    <meta>
        <plugins>
            <plugin name="rss" />
        </plugins>
    </meta>
    <rss src="rss.xml" header="true">
        <layout colspan="4" />
        <label>rss</label>
    </rss>

Examples
--------

It is possible to manually edit the :ref:`visu_config.xml <xml-format>` and add an entry
for the rss plugin.

.. CAUTION::
    Make sure that you only use UTF-8 encoded characters by settings the encoding in your
    XML-editor to UTF-8 mode!

.. ###START-WIDGET-EXAMPLES### Please do not change the following content. Changes will be overwritten


.. ###END-WIDGET-EXAMPLES###

.. rubric:: Footnotes

.. [#f1] The simple view might not show everything. To see all elements/attributes use the expert view.