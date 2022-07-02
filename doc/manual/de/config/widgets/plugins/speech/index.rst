.. _speech:

Das Speech Plugin
=================

.. api-doc:: cv.plugins.Speech

Beschreibung
------------

Das Speech-Plugin fügt kein sichtbares Widget hinzu, sondern aktiviert die Nutzung der in die Browser eingebauten
Sprachausgabe. Hierdurch lassen sich Texte, die vom Backend auf eine bestimmte Adresse (KNX-Gruppenadresse
oder OpenHAB-Item) gesendet werden, als gesprochene Nachricht ausgeben.

Die hier benutzte *Web Speech Api* wird zur Zeit (Okt. 2016) noch nicht von allen Browsern unterstützt.
Der aktuelle Stand und weitere Informationen zu diesem Thema können hier gefunden werden:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des speech-Plugins kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im speech-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: speech

.. .. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
    </meta>
    <speech lang="de" repeat-timeout="300">
        <address transform="OH:string" mode="read">Speak</address>
    </speech>


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: speech

.. .. widget-example::
    :editor: elements
    :scale: 75
    :align: center

    <caption>Elemente im Editor</caption>
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
    </meta>
    <speech lang="de" repeat-timeout="300">
        <address transform="OH:string" mode="read">Speak</address>
    </speech>

XML Syntax
----------

Alternativ kann man für das speech Plugin auch von Hand einen Eintrag in
der :ref:`visu_config.xml <xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Beispiel für die Sprachausgabe in Deutsch:

.. code-block:: xml

    ...
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
    </meta>
    ...
    <speech lang="de">
        <address transform="OH:string" mode="read">Speak</address>
    </speech>

DiesesBeispiel benutzt ein :ref:`Mapping <mapping>` und verhindert, dass der selbe Text
innerhalb von 5 Minuten (=300 Sekunden) nicht wiederholt wird. Wenn also das Backend innerhalb
von 5 Minuten zweimal den selben Text hintereinander an die vom Speech-Plugin benutzte Adresse liefert,
wird dieser ignoriert.


.. code-block:: xml

    ...
    <meta>
        <plugins>
            <plugin name="speech" />
        </plugins>
        <mappings>
            <mapping name="speak">
                <entry value="0">Hallo, willkommen zu Hause</entry>
                <entry value="1">Bitte alle Fenster schließen</entry>
                <entry value="2">Bitte alle Türen schließen</entry>
            </mapping>
        </mappings>
    </meta>
    ...
    <speech lang="de" repeat-timout="300" mapping="speak">
        <address transform="DPT:5.010" mode="read">Speak</address>
    </speech>
