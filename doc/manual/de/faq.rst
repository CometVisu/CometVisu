.. replaces:: CometVisu/FAQ_(Deutsch)

***
FAQ
***

In der FAQ werden häufig gestellte Fragen beantwortet:

Läuft die CometVisu auch mit dem Internet Explorer?
---------------------------------------------------

NEIN. Leider wird im Moment der Internet Explorer nicht unterstützt.
Dies ist den vielen Eigenheiten geschuldet, die speziell für den
Internet Explorer programmiert und unterhalten werden müssten. Da es
sich bei der CometVisu aber um ein OpenSource Projekt handelt, darf
jeder, der die Fähigkeiten dazu hat, gerne daran mit arbeiten und auch
die Kompatibilität zum Internet Explorer herstellen. Im Moment bleibt
für den Anwender nur die Nutzung mit einem der vielen, kostenlosen
Browsern wie zum Beispiel Firefox, Google Chrome oder Safari. Eine Liste
der kompatiblen Browsern findet sich hier: :ref:`system-voraussetzungen`

Kann die CometVisu auf beliebigen Servern oder Hardware betrieben werden?
-------------------------------------------------------------------------

JA. Dazu ist aber einiges an Linux-Kenntnissen erforderlich.
Grundsätzlich läuft die CometVisu auf jeder Linux basierten Hardware für
die es einen *eibd* und einen Webserver gibt.
Grundsätzlich lässt sich das CometVisu-Protokoll auch auf Systemen
implementieren, auf denen kein eibd läuft, oder die gar nicht mit KNX in
Verbindung stehen. Fertige Lösungen sind uns dafür aber zur Zeit nicht
bekannt.

.. note:: Die einfachste Möglichkeit die CometVisu zu installieren und später
    mit Updates aktuell zu halten ist als :ref:`Docker Container <docker>`.

Gibt es für den eingebauten Editor oder die Visualisierung einen Passwortschutz?
--------------------------------------------------------------------------------

NEIN. Momentan ist in der CometVisu weder eine Benutzerverwaltung noch
ein Passwortschutz integriert. Es gibt aber für fortgeschrittene
Benutzer die Möglichkeit von Hand z.B. den Link zum Editor aus der
Statuszeile zu entfernen.

Momentan wird auch an einer Möglichkeit entwickelt um einen
automatischen Seitenwechsel per Gruppenadresse zu realisieren. Auch das
ausblenden von Seiten ist möglich, damit diese zum Beispiel nur über
eine Gruppenadresse erreichbar ist (z.B. Externes Login für
Spezialseiten). Diese Funktion ist aber momentan noch in der Entwicklung
und deshalb nicht freigegeben!

Können mehrere Designs gleichzeitig auf verschiedenen Geräten genutzt werden?
-----------------------------------------------------------------------------

JA. Das ist problemlos möglich, da die Darstellung der Visualisierung
vom Client-Browser übernommen wird. Deshalb kann es auch geringfügige
Differenzen in der Darstellung des gleichen Designs in verschiedenen
Browsern geben. Es muss nur für jedes Design eine eigene Konfig-Datei
angelegt werden, da dort das zu verwendende Design abgelegt ist.

Kann ich mein eigenes Design für die CometVisu entwickeln?
----------------------------------------------------------

JA. Dass ist problemlos möglich. Dazu sind aber Kenntnisse in
Webseiten-Erstellung (HTML und v.a. CSS) nötig. Damit lässt sich das
Design den eigenen Wünschen anpassen.

Kann ich für die CometVisu eigene Widgets entwickeln?
-----------------------------------------------------

JA. Die CometVisu wurde speziell darauf ausgelegt, dass jeder nach
belieben eigene Widgets entwickeln kann. Für diesen Zweck steht die
Datei *structure\_custom.js* zur Verfügung. Diese Datei wird von
zukünftigen Updates nicht überschrieben. Die Widgets werden in
JavaScript programmiert.


Kann ich mich an der Entwicklung der CometVisu beteiligen?
----------------------------------------------------------

JA. Wir können jede helfende Hand gebrauchen. Im Moment suchen wir noch
dringend Programmierer die helfen Bugs zu beheben und die CometVisu
weiter zu entwickeln. Aber auch "leidensfähige" Beta-Tester die Fehler
zum Beispiel im
`Bug-Tracker <https://github.com/CometVisu/CometVisu/issues>`__
melden sind gerne willkommen.
Ebenso ist jede Hilfe bei der Vervollständigung dieser Dokumentation willkommen.
Falls du Interesse daran hast, an der CometVisu mitzuwirken, dann melde dich bitte im
`knx-user-forum <http://knx-user-forum.de>`__ in Unterforum CometVisu.

Informationen zu den Möglichkeiten der Mitarbeit gibt es hier: :doc:`colab/index`
