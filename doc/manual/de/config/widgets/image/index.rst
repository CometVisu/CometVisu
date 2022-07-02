.. replaces:: CometVisu/0.8.0/image/de
    CometVisu/0.8.x/widgets/image/de/
    CometVisu/Widget/image/de
    CometVisu/image
    CometVisu/image_(Deutsch)

.. _image:

Das Image Widget
================

.. api-doc:: Image

Beschreibung
------------

Das Image Widget fügt der Visualisierung ein statisches Bild oder ein Kamerabild hinzu.

Es gibt zwei Möglichkeiten die URL des Bildes anzugeben. Einmal über den ``src``-Parameter,
oder als Alternative über den Wert einer Gruppenadresse.

.. hint::

    Die Möglichkeit Bilder über den Wert einer Gruppenadresse zu übermitteln wurde in
    Version 0.12 eingeführt.

Das Bild muss als URL angegeben werden. Wenn man Dateien anzeigen möchte müssen diese über
http erreichbar auf dem CV-System oder einem anderen Server liegen.

Als Dateiformate können alle Formate verwendet werden, die vom für die CV genutzten
Browser unterstützen werden. Vorzugweise sollten das PNG, GIF und JPG sein.

.. widget-example::
    :hide-source: true

    <settings>
        <screenshot name="image_simple"/>
    </settings>
    <image src="resource/icons/comet_128_ff8000.png"/>


Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des Image-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im Image-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: image

Die gültigen Werte für ``cachecontrol`` sind:

``full``
    Standard. Durch Erweitern der URL um einen Zeitstempel wird
    sichergestellt, dass immer eine neue Version geladen wird. Der
    Server muss dies jedoch unterstützen.

``force``
    Durch aufwändigere, interne Maßnahmen wird versucht eine
    Aktualisierung des Bildes zu erzwingen.

``weak``
    Die URL wird nur durch einen Anker (Raute) mit Zeitstempel erweitert.
    Server die Bilder bei ``full`` nicht übertragen sind jedoch meist
    mit ``weak`` kompatibel. Jedoch müssen hier die Cache-Parameter
    im HTTP-Header vom Server richtig gesetzt werden so wie der Browser
    korrekt reagieren.

``none``
    Die URL wird nicht verändert, dass eine Aktualisierung des Bildes
    durch den Cache verhindert wird ist jedoch wahrscheinlich.

Die gültigen Werte für ``placeholder`` sind:

``none``
    Standard. Keine spezielle Behandlung.

``src``
    Benutze die URL, die in 'src' definiert wurde. In diesem Fall wird die 'src'-URL als Fallback benutzt,
    wenn die per Gruppen-Adresse übermittelte URL leer ist.

``hide``
    Zeigt ein transparentes Platzhalter Bild, um den Platz zu reservieren.

``exclude``
    Zeigt das Bild nicht an und beansprucht auch den Platz nicht.

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

        <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
        <image src="/resource/icons/comet_128_ff8000.png"/>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: image

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <image src="/resource/icons/comet_128_ff8000.png">
            <label>Beschreibung der Grafik</label>
        </image>

XML Syntax minimal
------------------

Alternativ kann man für das Image Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das Image Widget aus dem oben gezeigten Screenshot erzeugt:

.. code-block:: xml

    <image src="icons/comet_128_ff8000.png"/>


XML Syntax komplett
-------------------

Hier der Beispielcode der das Image-Widget mit den allen gezeigten
Eigenschaften einfügt:

.. widget-example::

    <settings>
        <screenshot name="image_complete"/>
    </settings>
    <image src="icons/comet_128_ff8000.png" width="300px" height="200px" refresh="300">
        <label>Beschreibung der Grafik</label>
    </image>


.. code-block:: xml

Beispiel für die Übermittlung eines Bildes per Gruppenadresse. Da der KNX-Bus die Übermittlung
von langen Texten nicht ermöglicht, ist diese Variante eher für die Alternativen Backends gedacht.
Dieses Beispiel nutzt ein openHAB-Item.

    <image>
        <address transform="OH:string">CovertArt</address>
    </image>

.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.
