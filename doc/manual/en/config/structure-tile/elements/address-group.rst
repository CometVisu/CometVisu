.. _tile-element-address-group:

Address groups - Calculating with address values
================================================

.. api-doc:: cv.ui.structure.tile.elements.AddressGroup

A ``<cv-address-group>`` can be used to perform calculations with the numerical values of
several ``<cv-address>`` elements. Using the following simplest example
the two values of the group addresses ``1/1/0`` and ``1/1/1`` are added together and the resulting
value can then be displayed in a widget.

.. hint::

    If the calculation results in an erroneous result (e.g. when dividing by 0),
    an empty result is reported. In this case, the ``<cv-address-group>`` attribute
    ``data-valid="false"`` will be added.

.. code-block:: xml

    <cv-address-group operator="+">
        <cv-address transform="DPT:7.001" mode="read">1/1/0</cv-address>
        <cv-address transform="DPT:7.001" mode="read">1/1/1</cv-address>
    </cv-address-group>

The following basic calculations are possible: addition ``operator="+"``, subtraction ``operator="-"``, multiplication ``operator="*"``
and division ``operator="/"``. In addition, the result can be rounded to an integer
``round="true"`` and/or multiplied by a factor ``factor="100"``.

Nesting can also be used to make more complex calculations. For example,
the result of the formula ``round(100.0 * (1/1/0 - 1/1/1) / (1/1/2 + 1/1/0))``
can be displayed in a :ref: 'Info widget<tile-info>'.

.. code-block:: xml

    <cv-info format="%d%%">
        <cv-address-group slot="address" operator="/" round="true" factor="100">
            <cv-address-group operator="-">
                <cv-address transform="DPT:7.001" mode="read">1/1/0</cv-address>
                <cv-address transform="DPT:7.001" mode="read">1/1/1</cv-address>
            </cv-address-group>
            <cv-address-group operator="+">
                <cv-address transform="DPT:7.001" mode="read">1/1/0</cv-address>
                <cv-address transform="DPT:7.001" mode="read">1/1/2</cv-address>
            </cv-address-group>
        </cv-address-group>
    <cv-info>

.. hint:: 

    It is always better to do such calculations in the backend.
    The ``<cv-address-group>`` should only be used if this is not possible.

.. parameter-information:: cv-address-group tile

