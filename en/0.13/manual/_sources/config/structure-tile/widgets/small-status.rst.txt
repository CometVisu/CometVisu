.. _tile-small-status:

The small status widget
=======================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The small status widget combines an icon/value with a text. It serves the same purpose as the :ref:`status widget <tile-status>`, but requires
less space. Since this widget does not conform to the standard dimensions, it is recommended to use it only in the header/footer
and not to mix it with other widgets. This is not a technical problem, but it creates visual breaks in the layout that do not leave a harmonious impression.

In this widget, an icon or value can be displayed at the top and text at the bottom. The icon can be either fixed or
status-dependent, as can the lower text either contain a fixed value or the status.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-small-status">
            <data address="1/4/0">0</data>
        </screenshot>
        <screenshot name="cv-small-status-open">
            <data address="1/4/0">2</data>
        </screenshot>
    </settings>
    <cv-small-status format="%d on">
        <cv-icon slot="icon">ri-lightbulb-line</cv-icon>
        <cv-address slot="address" transform="DPT:5.001" mode="read">1/4/0</cv-address>
    </cv-small-status>

It is required to specify a ``<cv-address slot="address">`` through which the value to be displayed is transmitted.
In this case, the value is displayed below the text, which is defined via the ``format`` attribute.
The icon is fixed and does not change (``slot="icon"``).
Unless otherwise specified, the icon is colored for values > 0.

It is also possible to adjust the icon via a mapping to display an icon for open or closed windows, for example, depending on the value.
If a different coloring is desired than the preset one, an individual styling can be defined.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-small-status-mapping">
            <data address="1/4/2">2</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="WindowOpen">
            <entry value="0">knxuf-fts_window_1w</entry>
            <entry range-min="1">knxuf-fts_window_1w_open</entry>
        </cv-mapping>
        <cv-styling name="WindowOpen">
            <entry range-min="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-small-status format="%d open" mapping="WindowOpen" styling="WindowOpen">
        <cv-icon slot="icon">knxuf-fts_window_1w_open</cv-icon>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
    </cv-small-status>

You can also display the value itself instead of the icon, for example, to display a temperature.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-small-status-label">
            <data address="1/4/2">17</data>
        </screenshot>
    </settings>
    <cv-small-status value-format="%d°" styling="">
        <label slot="value" style="font-size: 32px"/>
        <label slot="label" class="secondary">Outside</label>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
    </cv-small-status>

To prevent the predefined styling from coloring the values, it is deactivated in this case by ``styling=""``.

This widget can be connected to a popup to display additional details when clicked. For example, a popup with weather information could be displayed.

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

Allowed attributes in the Small-Status-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-small-status tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-small-status tile
