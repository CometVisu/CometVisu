.. _long-polling:

Long polling
^^^^^^^^^^^^

Lesende Anfragen
****************

Beim Long polling stellt die CometVisu eine Verbindung zum Backend her und lässt diese offen bis das Backend Daten sendet.
Die initiale Anfrage nach allen Werten beantwortet das Backend sofort. Die darauffolgenden Anfragen werden beantwortet,
sobald ein neuer Wert eintrifft. Dieser wird dann an die CometVisu gesendet, worauf die Verbindung geschlossen und sofort
wieder aufgebaut wird.

.. HINT::

    Als Besonderheit ist hier noch der interne *Watchdog* zu nennen, welcher eine Long polling Anfrage automatisch
    beendet und neu started, wenn innerhalb von 60 Sekunden keine Antwort gekommen ist.

Schreibende Anfragen
********************

Wenn ein neuer Wert an das Backend gesendet werden soll (weil z.B. der Benutzer ein Widget bedient hat), wird
eine neue Anfrage, die vollkommen unabhängig von den lesenden Anfragen ist, an das Backend gesendet.
Hier bestätigt das Backend auch lediglich das erfolgreiche Empfangen der Anfrage, neue Werte werden immer nur über
die lesenden Anfragen gesendet.
