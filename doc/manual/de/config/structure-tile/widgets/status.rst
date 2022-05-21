.. _tile-status:

Das Status Widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Status-Widget kombiniert ein Icon mit einem Text. Es dient dazu Status-Information zusammenzufassen,
z.B. die Anzahl der offenen Fenster in der Wohnung.
Das Status-Widget belegt nur die halbe Höhe eines Standard-Widgets.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-status" margin="0 10 10 0">
            <data address="1/4/2">5</data>
        </screenshot>
    </settings>
    <cv-status format="%d offen">
        <cv-icon slot="icon" size="x-large">knxuf-fts_window_1w_open</cv-icon>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <span slot="label">Fenster</span>
    </cv-status>

Es muss ein ``<cv-address slot="address">`` angegeben werden über den der anzuzeigende Wert übermittelt wird.
Zusätzlich kann eine Beschriftung über ``<span slot="label">`` hinzugefügt werden.
Über das ``format``-Attribut kann der Wert :ref:`formatiert <format>` mit zusätzlichem Text versehen werden.



Erlaubte Attribute im Status-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-status tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-status tile
