.. replaces:: CometVisu/0.8.x/format/de

.. _format:

Format
======

Über das Format-Attribut kann die Formatierung der Anzeige von Werten
beeinflusst werden. Dazu wird die Syntax des vom "printf" bekannten
Formats benutzt. **Man beachte dabei den Punkt zwischen dem % und der
Kommastelle!**

+----------+--------------------------------------+------------+
| Format   | Ausgabe                              | Beispiel   |
+----------+--------------------------------------+------------+
| %.0f     | Ein Wert ohne Nachkommastellen       | 31         |
+----------+--------------------------------------+------------+
| %.1f     | Ein Wert mit einer Nachkommastelle   | 31.0       |
+----------+--------------------------------------+------------+
| %.2f     | Ein Wert mit 2 Nachkommastellen      | 31.00      |
+----------+--------------------------------------+------------+
| %.3f     | Ein Wert mit 3 Nachkommastellen      | 31.000     |
+----------+--------------------------------------+------------+
| %.4f     | Ein Wert mit 4 Nachkommastellen      | 31.0000    |
+----------+--------------------------------------+------------+

Unter Format kann auch eine Einheit eingetragen werden. Diese wird
einfach hinter den Dezimaltrenner gesetzt. Beispielsweise:

+-------------------+---------------------------------------------------------+--------------------+
| Format            | Ausgabe                                                 | Beispiel           |
+-------------------+---------------------------------------------------------+--------------------+
| %.0f %%           | Ein Wert ohne Nachkommastellen mit % als Einheit        | 31 %               |
+-------------------+---------------------------------------------------------+--------------------+
| %.1f °C           | Ein Wert mit einer Nachkommastelle und °C als Einheit   | 31.0 °C            |
+-------------------+---------------------------------------------------------+--------------------+
| %.2f km/h         | Ein Wert mit 2 Nachkommastellen und km/h als Einheit    | 31.00 km/h         |
+-------------------+---------------------------------------------------------+--------------------+

.. HINT::
    Wenn man ein % Zeichen verwenden möchte muss man %% nutzen (sonst gibt
    es je nach verwendetem Browser Fehlermeldungen, da das einzelne % dann
    evt. als Steuerzeichen interpretiert wird)
