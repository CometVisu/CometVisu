.. _tile-element-address-group:

Adress-Gruppen - Rechnen mit Address-Werten
===========================================

.. api-doc:: cv.ui.structure.tile.elements.AddressGroup

Mit einer ``<cv-address-group>`` können Berechnungen mit den numerischen Werte von 
mehreren ``<cv-address>``-Elementen vorgenommen werden. Mit dem folgenden einfachsten Beispiel 
werden die beiden Werte der Gruppenaddressen ``1/1/0`` und ``1/1/1`` addiert und der resultierende
Wert kann dann in einem Widget angezeigt werden.

.. code-block:: xml

    <cv-address-group operator="+">
        <cv-address transform="DPT:7.001" mode="read">1/1/0</cv-address>
        <cv-address transform="DPT:7.001" mode="read">1/1/1</cv-address>
    </cv-address-group>

Neben der Addition ``operator="+"`` sind auch Subtraktion ``operator="-"``, Multiplikation ``operator="*"``
und Division ``operator="/"`` möglich. Zusätzlich kann das Ergbnis auf eine Ganzzahl gerundet werden
``round="true"`` und/oder mit einem Faktor multipliziert werden ``factor="100"``.

Durch Verschachtelung können auch komplexere Berechnungen vorgenommen werden. So kann z.B.
das Ergebnis der Formel ``round(100.0 * (1/1/0 - 1/1/1) / (1/1/2 + 1/1/0))`` 
in einem :ref:`Info-Widget<tile-info>` dargestellt werden.

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

    Es ist grundsätzlich immer besser solche Berechnungen im Backend vorzunehmen.
    Die ``<cv-address-group>`` sollte nur verwendet werden, wenn dies nicht möglich ist.

.. parameter-information:: cv-address-group tile

