.. _tile-link:

The link widget
===============

.. api-doc:: cv.ui.structure.tile.Controller


Description
-----------

The link widget opens a URL in a new tab or the same page.
It consists of an icon and an optional text.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-link"/>
    </settings>

    <cv-link href="https://www.google.de">
        <cv-icon slot="icon">ri-google-fill</cv-icon>
        <span slot="label">Google</span>
    </cv-link>

As an alternative, an image can also be used:

.. code-block:: xml

    <cv-link href="https://www.google.de">
        <cv-image slot="icon" src="resources/config/media/image.png" />
        <span slot="label">Google</span>
    </cv-link>

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-link tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-link tile
