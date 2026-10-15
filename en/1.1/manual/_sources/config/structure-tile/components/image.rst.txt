.. _tile-component-image:

Image
=====

.. api-doc:: cv.ui.structure.tile.components.Image


Description
-----------

The image component is used to display an image. Optionally, this image can be automatically reloaded at regular intervals.

.. widget-example::

    <settings design="tile" selector="img" wrap-in="cv-widget"  wrapper-class="screenshots" wrapped-position="">
        <screenshot name="cv-image" margin="-60 0 -60 0">
        </screenshot>
    </settings>
    <cv-image src="resource/icons/comet_128_ff8000.png" />

The size of the image always corresponds to the tile in which the image is used, i.e. the image fills the tile completely
without being distorted.

The image is updated by clicking on it. In addition, the image can be reloaded at regular intervals using the optional
``refresh`` attribute. In addition, the image can be updated by incoming data from the backend.

.. code-block:: xml

    <cv-image src="http://webcam/snapshot.jpeg">
        <cv-address transform="DPT:1.001" mode="read" target="refresh">1/4/0</cv-address>
    </cv-image>

In this case, the image is reloaded every time the CometVisu receives the value "1" for the address ``1/4/0``.
This way, for example, the image of a camera at the entrance door can be updated when the doorbell rings.

If authentication is required to load the image, it can be defined using the ``auth-type``, ``username`` and ``password`` attributes.
So far only `"Basic" authentication <https://de.wikipedia.org/wiki/HTTP-Authentifizierung#Basic_Authentication>`_ is supported.
If there are problems loading the image, the image can be loaded via a proxy in the backend by setting the ``proxy`` attribute to ``true``.
However, the URL must be added to the "proxy.whitelist" section of the :ref:`hidden configuration <hidden-config>`.
For this, a new entry must be created in the section, the key can be chosen arbitrarily
and as a value either the complete URL or a regular expression is entered which is valid for this URL.

Example with exact URL:

.. code-block:: json

    "proxy.whitelist": {
        "server": "http://webcam/snapshot.jpeg"
    }

Example with regular expression (starts and ends with "/"), which allows all URLs containing "webcam":

.. code-block:: json

    "proxy.whitelist": {
        "server": "/^.+webcam\/.*$/"
    }

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-image tile

