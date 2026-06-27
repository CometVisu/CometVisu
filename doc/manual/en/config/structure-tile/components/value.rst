.. _tile-component-value:

Value
======

.. api-doc:: cv.ui.structure.tile.components.Value


Description
-----------

The Value component represents a value. It is a purely passive component and does not send any values to the backend itself.
There are different ways to display the values, from simple text to icons and progress bars.

Text
^^^^

The simplest way is to display the value as text.

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-widget" >
        <screenshot name="cv-value-label" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value secondary"/>
    </cv-value>

The value can be :ref:`formatted <format>` via the ``format`` attribute. The text color can be influenced by an
additional entry in the ``class`` attribute of the ``<label>`` element. There are a primary and a secondary text
color available. The specific colors depend on the respective design. In the example above, the secondary text
color was used ``class="secondary"``.

.. HINT::

    The ``value`` entry in the ``class`` attribute of the ``<label>`` element is mandatory, as it tells the value
    component where to write the value. If this entry is missing, no value will be displayed.

To use the primary color, the ``<label>`` must look like this.

.. code:: xml

    <label class="value primary"/>

.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-value" wrap-in="cv-widget" >
        <screenshot name="cv-value-label-primary" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value primary"/>
    </cv-value>

In addition, the text size can be set via an additional entry in the ``class`` attribute. The following options are
available: ``medium`` and ``large``. Where medium is smaller than the standard size and large is larger.

.. code:: xml

    <label class="value large"/>


.. widget-example::
    :hide-source: true

    <settings design="tile" selector="cv-value" wrap-in="cv-widget" >
        <screenshot name="cv-value-label-large" margin="10 10 0 10">
            <data address="1/4/2">75</data>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <label class="value large"/>
    </cv-value>

Icon
^^^^

If an :ref:`Icon <tile-component-icon>` is used as ``class="value"``, the icon can be influenced value-dependent via a
mapping and its color via styling.

.. HINT::

    The ``cv-value`` element must not use a ``format`` here, as otherwise the mapping and styling would no longer work.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile" selector="cv-value" wrap-in="cv-widget" >
        <screenshot name="cv-value-icon-off" margin="10 10 -30 10">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-value-icon-on" margin="10 10 -30 10">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="0">ri-lightbulb-line</entry>
            <entry value="1">ri-lightbulb-fill</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="0">inactive</entry>
            <entry range-min="1">active</entry>
        </cv-styling>
    </cv-meta>
    <cv-value mapping="light" styling="button">
        <cv-address transform="DPT:1.001" mode="read">1/4/2</cv-address>
        <cv-icon class="value"/>
    </cv-value>

Progress bar
^^^^^^^^^^^^

To display a progress, there are two display options: a horizontal progress bar or a round or semi-round progress bar.

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-widget"  wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress" margin="10 10 -30 10">
            <data address="1/4/2">75</data>
            <caption>horizontal progress bar</caption>
        </screenshot>
    </settings>
    <cv-value>
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <meter class="value" min="0" max="100"/>
    </cv-value>



.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-widget"  wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress-round" margin="10 10 10 10">
            <data address="1/4/2">75</data>
            <caption>round progress bar</caption>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-round-progress class="value"/>
    </cv-value>



.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-widget"  wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress-semi-round" margin="10 10 10 10">
            <data address="1/4/2">75</data>
            <caption>semi-circular progress bar</caption>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-round-progress class="value" type="semiCircle"/>
    </cv-value>

.. widget-example::

    <settings design="tile" selector="cv-value" wrap-in="cv-widget"  wrapped-position="row='middle' colspan='3'">
        <screenshot name="cv-value-progress-semi-round-color" margin="10 10 10 10">
            <data address="1/4/2">75</data>
            <caption>semi-circular progress bar with different color</caption>
        </screenshot>
    </settings>
    <cv-value format="%d%%">
        <cv-address transform="DPT:5.001" mode="read">1/4/2</cv-address>
        <cv-round-progress class="value" type="semiCircle" foreground-color="#FF0000"/>
    </cv-value>

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-value tile

Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-value tile
