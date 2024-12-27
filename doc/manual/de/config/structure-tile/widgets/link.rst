.. _tile-link:

Das Link Widget
===============

.. api-doc:: cv.ui.structure.tile.Controller


Beschreibung
------------

Das Link-Widget öffnet eine URL in einem neuen Tab oder der selbe Seite.
Es besteht aus einem Icon und einem optionalen Text.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-link"/>
    </settings>

    <cv-link href="https://www.google.de">
        <cv-icon slot="icon">ri-google-fill</cv-icon>
        <span slot="label">Google</span>
    </cv-link>

Als alternative kann auch ein Bild verwendet werden:

.. code-block:: xml

    <cv-link href="https://www.google.de">
        <cv-image slot="icon" src="resources/config/media/image.png" />
        <span slot="label">Google</span>
    </cv-link>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-link tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-link tile
