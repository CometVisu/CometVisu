.. _tile-component-plugin:

Plugin
......

.. api-doc:: cv.ui.structure.tile.components.Plugin

Die Plugin-Komponente bindet kompatible CometVisu-Plugins innerhalb der Tile-Struktur ein.
Der Wrapper lädt den Plugin-Code und rendert dessen Ausgabe direkt an der Stelle des ``<cv-plugin>``-Elements.
Das ist besonders nützlich für Inhalte, die bereits als Plugin existieren, zum Beispiel Wetterinformationen in einem Popup.

Innerhalb des Tile-Schemas wird ``<cv-plugin>`` derzeit vor allem mit dem OpenWeatherMap-Plugin verwendet.
Weitere Plugins können auf die gleiche Weise eingebunden werden, wenn das Konfigurationsschema entsprechend erweitert wird.

.. code-block:: xml

    <cv-small-status value-format="%d°" styling="">
        <label slot="value" style="font-size: 32px"/>
        <label slot="label" class="secondary">Außen</label>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <cv-popup slot="popup" modal="true">
            <cv-plugin>
                <openweathermap q="Irgendwo" owID="12345677" appid="123456789" lang="de"/>
            </cv-plugin>
        </cv-popup>
    </cv-small-status>

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-plugin tile

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-plugin tile