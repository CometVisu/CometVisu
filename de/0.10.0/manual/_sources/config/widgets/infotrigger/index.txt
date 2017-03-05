.. replaces:: CometVisu/0.8.0/infotrigger/de
    CometVisu/0.8.x/widgets/infotrigger/de/
    CometVisu/Widget/infotrigger/de
    CometVisu/infotrigger
    CometVisu/infotrigger_(Deutsch)

.. _infotrigger:

Das InfoTrigger Widget
======================

.. api-doc:: InfoTrigger

Beschreibung
------------

Das Infotrigger Widget fügt der Visu zwei Schaltflächen und ein Textfeld für Rückmeldungen hinzu.
Damit können z.B. **Multimedia Steuerungen** realisiert werden.
Es kann in 2 verschiedenen Betriebsarten eingesetzt werden. Entweder als einfacher Doppeltrigger mit fixem
Ausgangswert oder mit absolutem Wert, der internen berechnet wird. Erstes Szenario ist beispielsweise
ein Lautstärkeregler (+1 / -1 oder auch +5 / -5). Im zweiten Szenario wird immer von der Visu der
gesendete Wert berechnet (Raumtemperatur per +/- Tasten in 4 Schritten von 18° auf 22°
geregelt -> gesendet wird 19,20,21,22°).

.. figure:: _static/infotrigger_simple.png

Einstellungen
-------------

Für eine grundsätzliche Erklärung des Aufbaus der Konfiguration und der Definition der im folgenden benutzten
Begriffe (Elemente, Attribute) sollte zunächst dieser Abschnitt gelesen werden: :ref:`visu-config-details`.

Das Verhalten und Aussehen des InfoTrigger-Widgets kann durch die Verwendung von Attributen und Elementen beeinflusst werden.
Die folgenden Tabellen zeigen die erlaubten Attribute und Elemente. In den Screenshots sieht man, wie
beides über den :ref:`Editor <editor>` bearbeitet werden kann.

Nur die mit ..... unterstrichenen Attribute/Elemente müssen zwingend angegeben werden, alle anderen sind optional und können
daher weg gelassen werden.


Erlaubte Attribute im InfoTrigger-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: infotrigger

.. widget-example::
    :editor: attributes
    :scale: 75
    :align: center

    <caption>Attribute im Editor (vereinfachte Ansicht) [#f1]_</caption>
    <infotrigger uplabel="-" upvalue="0" downlabel="+" downvalue="1" align="center" infoposition="middle" change="relative">
       <label>Lautstärke:</label>
       <address transform="DPT:1.001" mode="readwrite" variant="relative">9/5/4</address>
       <address transform="DPT:16.000" mode="readwrite" variant="absolute">9/5/9</address>
    </infotrigger>

Wichtig für den Betrieb
"""""""""""""""""""""""

Je nachdem, in welchem Modus das Widget betrieben werden soll, muss die Option "**change**" eingestellt werden.

* Wenn für die beiden Schaltflächen je ein fixer Wert gesendet werden soll, muss hier die Option
  "**relative**" ausgewählt werden.
* Wenn die beiden Schaltflächen aber einen absoluten Wert senden sollen, der sich je nach Rückmeldung ändert,
  muss die Option "**absolute**" ausgewählt werden.

Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: infotrigger

.. widget-example::
    :editor: elements
    :scale: 75
    :align: center

        <caption>Elemente im Editor</caption>
        <infotrigger uplabel="-" upvalue="0" downlabel="+" downvalue="1" align="center" infoposition="middle" change="relative">
           <label>Lautstärke:</label>
           <address transform="DPT:1.001" mode="readwrite" variant="relative">9/5/4</address>
           <address transform="DPT:16.000" mode="readwrite" variant="absolute">9/5/9</address>
        </infotrigger>

XML Syntax
----------

Alternativ kann man für das InfoTrigger Widget auch von Hand einen Eintrag in
der :doc:`visu_config.xml <../../xml-format>` hinzufügen.

.. CAUTION::
    In der Config selbst dürfen NUR UTF-8 Zeichen verwendet
    werden. Dazu muss ein auf UTF-8 eingestellter Editor verwendet werden!

Hier der minimale Beispielcode der das InfoTrigger Widget aus dem folgenden Screenshot erzeugt:

.. widget-example::

        <settings>
            <screenshot name="infotrigger_simple">
                <caption>InfoTrigger, einfaches Beispiel</caption>
                <data address="9/5/9">50</data>
            </screenshot>
        </settings>
        <infotrigger uplabel="-" upvalue="0" downlabel="+" downvalue="1" align="center" infoposition="middle" change="relative">
          <label>Lautstärke:</label>
          <address transform="DPT:1.001" mode="readwrite" variant="relative">9/5/4</address>
          <address transform="DPT:16.000" mode="readwrite" variant="absolute">9/5/9</address>
        </infotrigger>




.. rubric:: Fußnoten

.. [#f1] In der vereinfachten Ansicht sind ggf. einige Dinge ausgeblendet. In der Expertenansicht ist alles zu sehen.