.. _tile-component-plugin:

Plugin
......

.. api-doc:: cv.ui.structure.tile.components.Plugin

The plugin component embeds compatible CometVisu plugins inside the tile structure.
The wrapper loads the plugin code and renders its output directly at the place of the ``<cv-plugin>`` element.
This is useful for content that already exists as a plugin, for example weather information inside a popup.

Within the tile schema, ``<cv-plugin>`` is currently mainly used with the OpenWeatherMap plugin.
Additional plugins can be integrated in the same way when the configuration schema is extended accordingly.

.. code-block:: xml

    <cv-small-status value-format="%d°" styling="">
        <label slot="value" style="font-size: 32px"/>
        <label slot="label" class="secondary">Outside</label>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <cv-popup slot="popup" modal="true">
            <cv-plugin>
                <openweathermap q="Somewhere" owID="12345677" appid="123456789" lang="en"/>
            </cv-plugin>
        </cv-popup>
    </cv-small-status>

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-plugin tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-plugin tile