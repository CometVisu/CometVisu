.. _sse:

Server sent events (SSE)
^^^^^^^^^^^^^^^^^^^^^^^^

Lesende Anfragen
****************

Bei *Server sent events* wird eine einmalige lesende Verbindung aufgebaut. Über diese schickt das Backend
initial einmalig alle angefragten Werte, danach nur noch geänderte Werte.

.. HINT::
    Der Browser kümmert sich automatisch um die Wiederherstellung der Verbindung bei Abbrüchen.
    Daher kommt der interne *Watchdog* bei SSE in der Regel nicht zum Einsatz.

Der Browser muss diese Technologie jedoch überstützen.
Eine Übersicht der unterstützen Browser liefert `Caniuse <http://caniuse.com/eventsource/embed/>`__.

Schreibende Anfragen
********************

Wenn ein neuer Wert an das Backend gesendet werden soll (weil z.B. der Benutzer ein Widget bedient hat), wird
eine neue Anfrage, die vollkommen unabhängig von den lesenden Anfragen ist an das Backend gesendet.
Hier bestätigt das Backend auch lediglich das erfolgreiche Empfangen der Anfrage, neue Werte werden immer nur über
die lesenden Anfragen gesendet.