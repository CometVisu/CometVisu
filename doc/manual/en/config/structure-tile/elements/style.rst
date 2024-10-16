.. _tile-element-style:

CSS-Style
=========

Description
-----------

The style element allows the direct embedding of CSS rules.
This makes it easy to manipulate the UI with just a few lines to suit personal needs.

.. code:: xml

    <cv-meta>
        <style>
            :root {
                --primaryColor: #4869aa;
            }
        </style>
    </cv-meta>

The ``<style>`` element is a standard `HTML style element <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style>`_.
To see which variables the tile design uses and what effects it has when you change them, it is recommended to open
the browser's developer tools and play with the values there.
