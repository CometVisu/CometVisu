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
            <data address="1/4/2">2</data>
        </screenshot>
    </settings>
    <cv-status format="%d offen">
        <cv-icon slot="icon" size="x-large">knxuf-fts_window_1w_open</cv-icon>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <span slot="label">Fenster</span>
    </cv-status>

Es muss ein ``<cv-address slot="address">`` angegeben werden über den der anzuzeigende Wert übermittelt wird.
Zusätzlich kann eine Beschriftung über ``<span slot="label">`` hinzugefügt werden.
Über das ``format``-Attribut kann der Wert :ref:`formatiert <format>` und mit zusätzlichem Text versehen werden.

Es ist auch möglich das Icon über ein Mapping anzupassen um, je nach Wert, ein Icon für offene oder geschlossene Fenster
anzuzeigen. Über ein zusätzliches Styling kann man das Icon auch noch entsprechend einfärben.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-status-closed" margin="0 10 10 0">
            <data address="1/4/2">0</data>
        </screenshot>
        <screenshot name="cv-status-opened" margin="0 10 10 0">
            <data address="1/4/2">1</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="WindowOpen">
            <entry value="0">knxuf-fts_window_1w</entry>
            <entry range-min="1">knxuf-fts_window_1w_open</entry>
        </cv-mapping>
        <cv-styling name="OpenAlert">
            <entry range-min="1">red</entry>
        </cv-styling>
    </cv-meta>
    <cv-status format="%d offen">
        <cv-value slot="icon" mapping="WindowOpen" styling="OpenAlert">
            <cv-icon size="x-large" class="value">knxuf-fts_window_1w_open</cv-icon>
            <cv-address transform="DPT:5.010" mode="read">1/4/2</cv-address>
        </cv-value>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
        <span slot="label">Fenster</span>
    </cv-status>

Dazu wird für den "icon"-slot kein einfaches :ref:`cv-icon <tile-element-icon>` sondern ein
:ref:`cv-value <tile-component-value>` mit darin liegendem :ref:`cv-icon <tile-element-icon>` verwendet.
Dadurch hat man die Möglichkeit ein mapping/styling für dieses Icon zu definieren. Damit das Value-Element die selben
Werte benutzt, wie das Status-Element muss hier nochmal die selbe :ref:`cv-address <tile-element-address>`-Element benutzt werden.

Um weitere Details zum Status zu liefern kann dieses Widget mit einem :ref:`Popup <tile-component-popup>` verknüpft werden.
Beim Klick auf das Status-Widgets öffnet sich dann ein Popup mit weiteren Informationen.


Erlaubte Attribute im Status-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-status tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-status tile
