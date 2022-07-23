.. _tile-component-image:

Image
=====

.. api-doc:: cv.ui.structure.tile.components.Image


Beschreibung
------------

Die Image-Komponente dient zu Anzeige eines Bildes. Optional kann dieses Bild in regelmäßigen Abständen
automatisiert neu geladen werden.

.. widget-example::

    <settings design="tile" selector="img" wrap-in="cv-tile" wrapper-class="screenshots" wrapped-position="">
        <screenshot name="cv-image" margin="-60 0 -60 0">
        </screenshot>
    </settings>
    <cv-image src="resource/icons/comet_128_ff8000.png" />

Die Größe des Bilds entspricht immer der Kachel in der das Bild benutzt wird, d.h. das Bild füllt die Kachel komplett
aus ohne verzerrt zu werden.

Bei einem Klick auf das Bild wird es aktualisiert. Zusätzlich kann über das optionale ``refresh``-Attribut
festgelegt werden in welchem Interval in Sekunden das Bild neu geladen wird.
Ebenso kann das Aktualisieren des Bildes durch eingehende Daten vom Backend ausgelöst werden.

.. code-block:: xml

    <cv-image src="http://webcam/snapshot.jpeg">
        <cv-address transform="DPT:1.001" mode="read" target="refresh">1/4/0</cv-address>
    </cv-image>

In diesem Fall würde das Bild jedes mal neu geladen wenn die CometVisu für die Adresse ``1/4/0`` den Wert "1" empfängt.
So kann z.B. das Bild einer Kamera an der Eingangstür aktualisiert werden, wenn es geklingelt hat.

Sollte eine Authentifizierung erforderlich sein um das Bild laden zu können, so kann diese über die Attribute
``auth-type``, ``username`` und ``password`` definiert werden. Bisher wird nur die `"Basic"-Authentifizierung <https://de.wikipedia.org/wiki/HTTP-Authentifizierung#Basic_Authentication>`_./
unterstützt. Sofern es dabei Probleme gibt kann das Laden den Bildes über einen Proxy im Backend benutzt werden indem
man das ``proxy``-Attribut auf ``true`` setzt.

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-image tile

