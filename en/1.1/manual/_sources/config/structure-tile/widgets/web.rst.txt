.. _tile-web:

The web widget
==============

.. api-doc:: cv.ui.structure.tile.widgets.Web


Description
-----------

The web widget is used to display an external website. Optionally, this page can be automatically reloaded at regular intervals.

.. code-block:: xml

    <cv-web src="http://www.google.de" refresh="120" style="width: 100%; min-height: 600px;" />

With the optional ``refresh`` attribute, you can specify the interval in seconds at which the page is reloaded.
Size specifications can be set via the style attribute using CSS.

If there are problems with loading the page, the page can be loaded via a proxy in the backend by setting the ``proxy`` attribute to ``true``.
For this purpose, the URL must be added to the "proxy.whitelist" section of the :ref:`hidden configuration <hidden-config>`.
For this, a new entry must be created in the section, the key can be chosen arbitrarily
and as a value either the complete URL or a regular expression is entered which is valid for this URL.

Example with exact URL:

.. code-block:: json

    "proxy.whitelist": {
        "server": "https://www.google.de"
    }

Example with regular expression (starts and ends with "/") which allows all URLs containing "google":

.. code-block:: json

    "proxy.whitelist": {
        "server": "/^.+google\/.*$/"
    }

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-web tile

