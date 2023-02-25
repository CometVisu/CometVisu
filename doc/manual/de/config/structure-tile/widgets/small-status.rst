.. _tile-small-status:

Das kleine Status Widget
========================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das kleine Status-Widget kombiniert ein Icon/Wert mit einem Text. Es erfüllt den selben Zweck die das :ref:`Status-Widget <tile-status>`, benötigt
dafür aber weniger Fläche. Da dieses Widget nicht den Standardmaßen entspricht wird empfohlen, es nur im Header / Footer
einzusetzen und nicht mit anderen Widgets zu vermischen. Dies ist zwar technisch kein Problem jedoch bekommt
man dadurch optische Brüche im Layout die keinen harmonischen Eindruck hinterlassen.

In diesem Widget kann oben ein Icon oder Wert angezeigt werden und unten ein Text. Das Icon kann entweder fest, oder
Status-Abhängig sein, ebenso kann der untere Text entweder einen festen Wert oder aber den Status beinhalten.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">impro
        <screenshot name="cv-small-status">
            <data address="1/4/0">0</data>
        </screenshot>
        <screenshot name="cv-small-status-open">
            <data address="1/4/0">2</data>
        </screenshot>
    </settings>
    <cv-small-status format="%d an">
        <cv-icon slot="icon">ri-lightbulb-line</cv-icon>
        <cv-address slot="address" transform="DPT:5.001" mode="read">1/4/0</cv-address>
    </cv-small-status>

Es muss ein ``<cv-address slot="address">`` angegeben werden über den der anzuzeigende Wert übermittelt wird.
Der Wert wird in diesem Fall innerhalb des Texts unten angezeigt, welcher über das ``format``-Attribut definiert wird.
Das Icon ist fest definiert und ändert sich nicht (``slot="icon"``).
Sofern nicht anders angegeben wird das Icon bei Werten > 0 eingefärbt.

Es ist auch möglich das Icon über ein Mapping anzupassen um, je nach Wert, ein Icon für offene oder geschlossene Fenster
anzuzeigen. Möchte eine andere Einfärbung erreicht als die voreingestellte so kann man ein eigenes Styling definieren.

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
    <cv-small-status format="%d offen" mapping="WindowOpen" styling="WindowOpen">
        <cv-icon slot="icon">knxuf-fts_window_1w_open</cv-icon>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
    </cv-small-status>

Man kann auch den Wert selbst darstellen anstelle des Icons, um z.B. eine Temperatur anzuzeigen.

.. widget-example::

    <settings design="tile">
        <screenshot name="cv-small-status-label">
            <data address="1/4/2">17</data>
        </screenshot>
    </settings>
    <cv-small-status value-format="%d°" styling="">
        <label slot="value" style="font-size: 32px"/>
        <label slot="label" class="secondary">Außen</label>
        <cv-address slot="address" transform="DPT:5.010" mode="read">1/4/2</cv-address>
    </cv-small-status>

Damit das vordefinierte Styling die Werte nicht einfärbt, wird es in diesem Fall durch ``styling=""`` deaktiviert.

Man kann dieses Widget mit einen Popup verbinden, um bei einem Klick weitere Details anzeigen zu können. So könnte z.B.
ein Popup mit Wetterinformationen angezeigt werden.

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


Erlaubte Attribute im Small-Status-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-small-status tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-small-status tile
