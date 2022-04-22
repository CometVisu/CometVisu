.. _tile-shutter:

Das Shutter Widget
=================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Das Shutter-Widget enhält Buttons zur Bedienung einer Rolllade und zeigt deren aktuelle Position an.
Mit den drei Buttons lässt sich die Rolllade hoch- oder runterfahren oder stoppen.
Die Buttons werden in der mittleren Zeile angezeigt, die Position in der obersten und in der
untersten Zeile kann man z.B. den Namen/den Ort der Rolllade anzeigen.


.. widget-example::

    <settings design="tile">
        <screenshot name="cv-shutter" margin="0 10 10 0">
            <data address="1/4/0">0</data>
        </screenshot>
    </settings>
    <cv-meta>
        <cv-mapping name="light">
            <entry value="1">ri-lightbulb-fill</entry>
            <entry value="0">ri-lightbulb-line</entry>
        </cv-mapping>
        <cv-styling name="button">
            <entry value="1">active</entry>
            <entry value="0">inactive</entry>
        </cv-styling>
    </cv-meta>
    <cv-shutter styling="button">
        <cv-address slot="downAddress" transform="OH:rollershutter" mode="write" value="100" backend="main">Shutter_FF_Living</cv-address>
        <cv-address slot="stopAddress" transform="OH:rollershutter" mode="write" value="STOP" backend="main">Shutter_FF_Living</cv-address>
        <cv-address slot="upAddress" transform="OH:rollershutter" mode="write" value="0" backend="main">Shutter_FF_Living</cv-address>
        <cv-address slot="positionAddress" transform="OH:number" mode="read" backend="main">Shutter_FF_Living</cv-address>
        <span slot="primaryLabel">Default</span>
    </cv-shutter>