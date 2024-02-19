.. _tile-web:

Web
===

.. api-doc:: cv.ui.structure.tile.widgets.Web


Beschreibung
------------

Das Web-Widget dient zu Anzeige einer externen Webseite. Optional kann diese Seite in regelmäßigen Abständen
automatisiert neu geladen werden.

.. code-block:: xml

    <cv-web src="http://www.google.de" refresh="120" style="width: 100%; min-height: 600px;" />

Über das optionale ``refresh``-Attribut kann festgelegt werden in welchem Interval in Sekunden die Seite neu geladen wird.
Größenangaben können über das style-Attribut per CSS festgelegt werden.

Sofern es dabei Probleme gibt kann das Laden der Seite über einen Proxy im Backend benutzt werden in dem
man das ``proxy``-Attribut auf ``true`` setzt. Hierfür muss jedoch die URL in die "proxy.whitelist" Sektion der
:ref:`Versteckten-Konfiguration <hidden-config>` hinzugefügt werden.
Dafür muss ein neuer Eintrag in der Sektion angelegt werden, der Schlüssel kann beliebig gewählt werden
und als Wert wird entweder die komplette URL oder ein regulärer Ausdruck eingetragen der für diese URL gültig ist.

Beispiel mit exakter URL:

.. code-block:: json

    "proxy.whitelist": {
        "server": "https://www.google.de"
    }

Beispiel mit regulärem Ausdruck (beginnt und endet mit "/"), welcher alle URLs erlaubt, die "webcam" enthalten:

.. code-block:: json

    "proxy.whitelist": {
        "server": "/^.+google\/.*$/"
    }

Erlaubte Attribute
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-web tile

