.. _tile-element-styling:

Styling
=======

.. HINT::

    Die Funktionalität der Stylings in der Tile-Struktur unterscheidet nicht nicht von den Stylings in der Pure-Struktur.
    Lediglich der Name des Elements in der Konfigurationsdatei ist anders: ``<cv-styling>``.

Mit dem styling Tag können Elementen bei jeweiligen Werten Farben
zugewiesen werden.

Zum Beispiel kann AUS in rot und AN in grün dargestellt werden (oder
umgekehrt)

Hier eine Liste der möglichen Farben die standardmäßig in der CometVisu
enthalten sind:

.. raw:: html

    <table style="text-align:center; margin-bottom:20px" border="1" rules="all">
    <tbody><tr>
    <th style="background:#ffffff; width:150px" align="left"> grey
    </th>
    <td style="background:#808080; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> cyan
    </th>
    <td style="background:#00ffff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> green
    </th>
    <td style="background:#008000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> lime
    </th>
    <td style="background:#00ff00; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> red
    </th>
    <td style="background:#ff0000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> blue
    </th>
    <td style="background:#0000ff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> fuchsia
    </th>
    <td style="background:#ff00ff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> black
    </th>
    <td style="background:#000000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> maroon
    </th>
    <td style="background:#800000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> olive
    </th>
    <td style="background:#808000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> purple
    </th>
    <td style="background:#800080; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> silver
    </th>
    <td style="background:#c0c0c0; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> white
    </th>
    <td style="background:#ffffff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> yellow
    </th>
    <td style="background:#ffff00; width:200px" align="center">
    </td></tr></tbody></table>


.. CAUTION::

    Die Farben können je nach Design abweichen.

Mit diesem styling wird 0 (oft AUS) in grün und 1 (oft AN) in rot dargestellt.

.. code-block:: xml

     <cv-styling name="GreenRed">
        <entry value="0">green</entry>
        <entry value="1">red</entry>
     </cv-styling>

Um ein Element mit den entgegen gesetzten Farben darzustellen, muss der
folgende style tag erstellt werden. Jetzt hat das Element bei einem Wert
von 0 die Farbe rot.

.. code-block:: xml

     <cv-styling name="Red_Green">
        <entry value="0">red</entry>
        <entry value="1">green</entry>
     </cv-styling>

Styling tags lassen sich natürlich auch für slider erstellen. Hier wird
der Wert für den Bereich festgelegt, in dem die Farbe dargestellt wird.
Im folgenden Beispiel wie folgt:

-  von -100 bis 0: blau
-  der Wert 0: lila
-  Werte größer 0: rot

.. code-block:: xml

     <cv-styling name="BluePurpleRed">
        <entry range-min="-100" range-max="0">blue</entry>
        <entry value="0">purple</entry>
        <entry range-min="0" range-max="100">red</entry>
     </cv-styling>

.. IMPORTANT::

    Wie die Farben dann im Design tatsächlich dargestellt
    werden kommt auf die Definition in der CSS für's jeweilige Designs an.

**Die Farben können auch im HTML-Code angegeben werden. Zum Beispiel:
#F33333**
