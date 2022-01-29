.. _openweathermap:

Das OpenweatherMap Plugin
=========================

.. api-doc:: cv.plugins.OpenweatherMap

Beschreibung
------------

Das OpenweatherMap Plugin fügt der Visu ein Widget für die Wettervorhersage
hinzu.


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des OpenweatherMap-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im OpenweatherMap-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: openweathermap


.. IMPORTANT::
    Der Wert des Attributs `appid` muss durch den eigenen Schlüssel ersetzt werden!

Das OpenweatherMap nutzt den Web-Service von https://openweathermap.org/ um
die aktuellen Wetterdaten bzw. Vorhersage darstellen zu können. Um auf diese
Daten zugreifen zu können benötigt man einen Schlüssel, der dort auf der
Homepage kostenlos erzeugt werden kann und im Attribut `appid` angegeben
werden muss.

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: openweathermap

Keine.

XML Syntax
----------

Alternativ kann man für das OpenweatherMap Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

.. IMPORTANT::
    Der Wert des Attributs `appid` muss durch den eigenen Schlüssel ersetzt werden!

Hier der minimale Beispielcode der das OpenweatherMap Plugin aus dem folgenden,
Screenshot erzeugt:

.. figure:: _static/weather.png

.. code-block:: xml

    <meta>
        <plugins>
            <plugin name="openweathermap" />
        </plugins>
    </meta>
    ...
    <openweathermap q="Munich" appid="..." />



.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
