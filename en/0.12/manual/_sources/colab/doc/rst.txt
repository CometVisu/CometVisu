The RST-Syntax
==============

Heading
-------------

Headings are defined in RST by "underlining" the text with certain
special characters. It should be noted here that the special characters
are at least as long as the text itself. Although the RST syntax is
relatively tolerant when using the special characters, documentation
for the CometVisu documentation set the following definition.

.. code-block:: rst

    ######################
    Complete sections
    ######################

    *******
    Chapter
    *******

    Sectionen
    =========

    Under-sections
    ---------------

    Under-Under-sections
    ^^^^^^^^^^^^^^^^^^^^^

    Paragraph
    """""""""

The complete sections are reserved for the parts Api, user manual and
tutorials and may otherwise within the documentation do not occur, all
others can be used with care.

Inline Markup
-------------

If the text in the documentation is to be specially formatted (for
example, bold, italic, etc.) or references / links are inserted, a
special syntax is required within the text.

For formatting a text, the text is also framed by special characters,
so you can use a word, for example. Formatting fat by including in with
two asterisks (`**bold text**`), are more options.

* **Bold**: ``**bold Text**`` => **bold Text**
* **italic**: ``*italic Text*`` => *italic Text*
* **Code**: ````Code inside Text```` => ``Code inside Text``

Listings
^^^^^^^^

For non-numbered lists, each line is started with ``*``, and in the case
of numbered files with ``#.``. With appropriate Indentation of the
lines, even nested lists are possible.

Links und Referenzen
^^^^^^^^^^^^^^^^^^^^

The basic syntax of links contains a title and the link itself
in the following structure: ```Title of the link <URL of the link>```.
Of course you can also refer to other documents within the documentation:
``:doc: `title <relative/path/to/document>```. Please note that you have
to omit the ``.rst`` file extension.

If you want to link a document named *dok.rst* in the subdirectory *test*,
it looks like this: ``:doc:`test/dok```. The title of the link is optional,
it is omitted, the page title of the linked document used as the title
(i.e. the top-level heading within the document).

Directives
----------

For things that go beyond plain text (such as images, cues, warnings, etc.),
directives are used. In contrast to the already discussed *inline markup*,
these may not appear in the same line as the "normal" text but need a blank
line in front of and behind the directive. Directives consist of a name,
parameters, options and content. They are always based on the
following principle:

.. code-block:: rst

   .. <name>:: <parameter1> <parameter2> ...
        :<option1>: <optionswert1>
        :<option2>: <optionswert2>
        ....

        <content to write>

A directive always starts with 2 points followed by a space. This is
followed by the name and then directly, without Space 2 colons. It should
also be noted that the options are enclosed by colons and by a blank line
are separate from the content, and options and content are indented.

The only thing that is mandatory is the name. Parameters, options and
content are optional and different in quantity and in the presence of
directive to directive. In the following the most important directives
are presented.

Text-Block
^^^^^^^^^^^

Simple directives that can be used to create a color-coded text block
with a given title, to define notes, information, warnings, etc.
These directives have no parameters and options just a content.

Possible text blocks are: attention, caution, danger, error, hint,
important, note, tip, warning.
So if you want to give the reader e.g. on something important
hints, you can write the following.

.. code-block:: rst

    .. IMPORTANT::

        This is an important note.

What will be formatted like this:

.. IMPORTANT::

    This is an important note.

Images
^^^^^^

Images are included with the *figure* directive. There is also
an *image* directive, but the *figure* directive allows complex captions.

.. code-block:: rst

    .. figure:: <path to image>

        This is the caption

The complete syntax of this directive can be found in the
`official Documentation <http://docutils.sourceforge.net/docs/ref/rst/directives.html#figure>`__


.. include:: directives.rst