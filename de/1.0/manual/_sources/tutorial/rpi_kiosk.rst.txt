*********************************************
Raspberry Pi: Client einrichten (Kiosk Modus)
*********************************************

Der CometVisu Client läuft in einem üblichen Web-Browser. Soll dieser jedoch
nicht auf einem "normalen" Gerät wie PC, Tablet oder Smartphone laufen, sondern
auf einem Touch-Panel wie einem in die Wand eingelassenem Display, so wünscht
man sich eine Darstellung im Vollbild ohne weitere, externe Navigations- und
Kontrollelemente. Eine solche Darstellung läuft auch unter der Bezeichnung
"Kiosk Modus".

Als Basis bietet sich ein Raspberry Pi (RPi) an, da dieser von der Performance
absolut ausreichend ist und nur einen sehr geringen Stromverbrauch aufweist.

Durch die beiden HDMI Ports eines Raspberry Pi 4 können bei geschickter
Konfiguration auch zwei Touch-Panels gleichzeitig und unabhängig voneinander
angesteuert werden, was hier im zweiten Teil umgesetzt wird.

.. NOTE::

    Für dieses Tutorial wird ein Raspberry Pi vorausgesetzt, der wie im
    :doc:`ersten Teil dieser Tutorial-Serie <rpi_prequesites>` vorbereitet
    wurde. Es sind aber auch ganz andere Systeme, wie z.B. ein NUC, möglich.

    Als Server für die CometVisu kann ein Raspberry Pi wie aus dem Tutorial-Teil
    :doc:`CometVisu in Docker installieren <rpi_cometvisu>` verwendet werden.
    Es ist dabei möglich, dass dies gleichzeitig genau der gleiche Raspberry Pi
    ist, auf dem nun der Kiosk-Modus eingerichtet wird. Als Server kann aber
    auch ein beliebiges anderes System dienen, wie beispielsweise der
    `Timberwolf Server <https://www.timberwolf.io/>`__, bei dem die CometVisu als vorbereitete App verfügbar ist.

    Der Kiosk-Modus ist aber so universell, der kann auch 1:1 für beliebige
    andere Anwendungen genutzt werden bei denen ein Browser im Vollbild laufen
    soll.

Einrichten des Kiosk-Modus
==========================

Ergebnis dieses Tutorials ist ein Kiosk Modus mit Chrome als Browser und nur
der minimal notwendigen Umgebung. Daher wird bewusst auf einen Windowmanager
verzichtet und eine reine X11 Umgebung verwendet.

Als erstes sind dazu die notwendigen Software-Komponenten zu installieren: ::

    sudo apt-get update
    sudo apt-get install --no-install-recommends xorg xinput chromium-browser

Hardware einrichten
-------------------

Auch wenn die Hardware (das Display und das Touch Interface) in der Regel sehr
gut automatisch erkannt werden, so gibt es manchmal Kleinigkeiten die
angepasst werden müssen.

Beispiel: eGalax TouchScreen
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Der eGalax TouchScreen eines HomeCockpit Minor von 2009 wird leicht falsch erkannt, was
sich durch eine ``udev`` Regel schnell lösen lässt. Hierzu wird die neue
Datei ``/etc/udev/rules.d/91-libinput-egalax-local.rules`` angelegt und befüllt
mit dem Inhalt: ::

    ACTION=="add|change", KERNEL=="event[0-9]*", ENV{ID_VENDOR_ID}=="0eef", ENV{ID_MODEL_ID}=="0001", ENV{ID_INPUT_TABLET}="", ENV{ID_INPUT_TOUCHSCREEN}="1"

Dieses Vorgehen ist ein Beispiel für genau diese Hardware. Sollte andere
Hardware verwendet werden und dort Probleme auftreten, so lässt sich meist
über eine Internet-Recherche eine ähnliche Lösung finden.

Touchscreen kalibrieren
^^^^^^^^^^^^^^^^^^^^^^^

Sollte der Touchscreen die Berührungen nicht richtig an die Bildschirm-Koordinaten
übertragen, so muss dieser kalibriert werden. Hierzu muss ``xinput_calibrator``
installiert werden: ::

    sudo apt-get install --no-install-recommends xinput_calibrator

Dies wird nun gestartet: ::

    sudo xinit xinput_calibrator

Nach erfolgter Kalibrierung werden auf der Konsole die neuen Kalibrierdaten
ausgegeben.

Beispiel: ::

    pi@visu:~ $ sudo xinit xinput_calibrator
    Calibrating EVDEV driver for "eGalax Inc. USB TouchController Touchscreen" id=9
            current calibration values (from XInput): min_x=2058, max_x=3998 and min_y=120, max_y=3952

    Doing dynamic recalibration:
            Setting calibration data: 62, 4004, 143, 3949
            --> Making the calibration permanent <--
      copy the snippet below into '/etc/X11/xorg.conf.d/99-calibration.conf' (/usr/share/X11/xorg.conf.d/ in some distro's)
    Section "InputClass"
            Identifier      "calibration"
            MatchProduct    "eGalax Inc. USB TouchController Touchscreen"
            Option  "Calibration"   "62 4004 143 3949"
            Option  "SwapAxes"      "1"
    EndSection

Wie bereits aus der Ausgabe von ``xinput_calibrator`` angegeben muss nun in
die neue Datei ``/etc/X11/xorg.conf.d/99-calibration.conf`` der ganze Bereich
ab ``Section`` kopiert werden. Hier können auch weitere Anpassungen vorgenommen
werden, wie beispielsweise auf einen anderen Treiber zu wechseln. So muss bei
dem konkreten Touch-Display die Datei ``99-calibration.conf`` lauten: ::

    Section "InputClass"
            Identifier      "calibration"
            MatchProduct    "eGalax Inc. USB TouchController Touchscreen"
            Option  "Calibration"   "62 4004 143 3949"
            Option  "SwapAxes"      "1"
            Driver "evdev"
    EndSection

Software einrichten
-------------------

Erster Test
^^^^^^^^^^^

Für einen ersten Test kann nun bereits zum ersten mal der Web-Browser gestartet
werden: ::

    sudo xinit chromium-browser

Um den Test zu beenden lässt sich der Browser über :kbd:`Strg` + :kbd:`C` auf
der Konsole wieder beenden.

Sollte bei diesem Test der Bildschirm, bzw. das Touch Interface nicht korrekt
reagiert haben, so ist dies mit einer der weiter oben beschriebenen Methoden
zu korrigieren. Erst wenn der Browser sich erfolgreich bedienen lässt kann in
diesem Tutorial zum nächsten Punkt weiter gegangen werden.

Browser einrichten
^^^^^^^^^^^^^^^^^^

Als ``root`` wird nun die Datei ``/root/start_browser.sh`` mit diesem Inhalt
angelegt: ::

    #!/bin/sh

    # DEBUG
    xsetroot -solid green

    # allow any local user to use the X server
    /usr/bin/xhost local:

    # run the browser as the user "pi"
    /usr/bin/sudo -H -u pi -- /usr/bin/chromium-browser \
      --window-position=0,0            \
      --window-size=1024,769           \
      --no-first-run                   \
      -disable-dev-tools               \
      -disable-hang-monitor            \
      -disable-java                    \
      -disable-logging                 \
      -disable-metrics                 \
      -disable-metrics-reporting       \
      -disable-plugins                 \
      -disable-popup-blocking          \
      -disable-prompt-on-repost        \
      -start-maximized                 \
      --disable-popup-blocking         \
      --disable-infobars               \
      --disable-session-crashed-bubble \
      --incognito                      \
      --kiosk                          \
      --user-data-dir=/tmp/browser     \
      http://192.168.0.30/cometvisu/

Die Zeile ``--window-size=1024,769`` ist entsprechend der Bildschirmauflösung
anzupassen. Der Wert ``1024,769`` hat sich als geeignet für Bildschirme mit
einer Auflösung von 1024x768 herausgestellt, d.h. einen Wert für die Höhe der
um einen Pixel größer ist als die Bildschirmauflösung. Durch das
``xsetroot -solid green`` am Anfang lässt sich leicht testen ob der Browser
ausreichend groß ist, da ein nicht abgedeckter Bildschirmbereich grün sichtbar
bleibt. Wenn alles zur Zufriedenheit läuft kann diese Zeile mit einem ``#``
am Anfang auskommentiert werden, so dass in Zukunft kein grünes Aufblinken
sichtbar ist.

Außerdem ist die letzte Zeile (``http://193.168.0.30/cometvisu/``) auf die
URL anzupassen, die der Browser anzeigen soll.

Über ``sudo chmod a+x /root/start_browser.sh`` wird die Datei nun noch als
ausführbar markiert.

Ob die Einrichtung erfolgreich ist lässt sich mit ::

    sudo xinit /root/start_browser.sh

testen.

Zertifikate installieren (optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wenn die CometVisu über eine TLS verschlüsselte Verbindung (also mit dem
HTTPS-Protokoll) ausgeliefert wird, was dringend empfohlen wird um die
erweiterten Browser-Features frei zu schalten, so muss der Browser das
Zertifikat kennen. Für eine Anwendung im Intranet können jedoch nur selbst
signierte Zertifikate zum Einsatz kommen, die der Browser prinzipbedingt
nicht kennen kann.

Als erstes ist die Software für der Zertifikate-Management zu installieren: ::

    sudo apt-get install --no-install-recommends libnss3-tools

Nun muss das Zertifikat auf den Raspberry Pi übertragen werden. Wenn die
CometVisu auf dem Raspberry Pi selbst gehostet wird, so ist von dort das
Zertifikat zu besorgen. Wenn die CometVisu beispielsweise auf dem `Timberwolf
Server <https://www.timberwolf.io/>`__ läuft, so kann das notwendige Zertifikat
über ::

    wget https://update.timberwolf.io/timberwolf%20web%20ca.crt

in das aktuelle Arbeitsverzeichnis geladen werden. Über einen Befehl wie ::

    certutil -d sql:/home/pi/.pki/nssdb -A -t "CT,C,C" -n "Timberwolf Web CA - Elaborated Networks GmbH" -i timberwolf\ web\ ca.crt

lässt sich dieses nun für den User ``pi`` installieren.

Automatischer Start einrichten
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wenn der Browser sich manuell erfolgreich starten lässt, so kann nun eingerichtet
werden, dass dieser nach einem Boot-Vorgang automatisch gestartet wird. Hierzu
muss der ``systemd`` ein entsprechendes Ziel bekommen.

Als ``root`` muss daher die Datei ``/etc/systemd/system/display-manager.service``
mit diesem Inhalt erstellt werden: ::

    [Unit]
    Description=Direct browser starter
    After=network.target

    # Ordering
    Conflicts=plymouth-quit-wait.service
    After=systemd-user-sessions.service plymouth-start.service plymouth-quit-wait.service
    OnFailure=plymouth-quit.service

    [Service]
    ExecStart=/usr/bin/xinit /root/start_browser.sh -- -background none vt7
    Restart=always
    RestartSec=1s
    EnvironmentFile=-/etc/default/locale

    [Install]
    WantedBy=multi-user.target

Mit ``systemctl start display-manager.service`` lässt sich das neue Target testen.

Aktiviert wird es mit: ::

    systemctl enable display-manager.service

Nach einem Neustart sollte nun wie gewünscht der Browser mit der richtigen
URL im Vollbild erscheinen. Die grundlegende Kiosk-Einrichtung ist hiermit
abgeschlossen.

Powermanagement
---------------

Neben allgemeinen Einstellungen, die je nach System bisschen Energie sparen
können (bei dem Raspberry Pi aber nur sehr geringe Auswirkung haben), ist
das wichtigste Thema das Powermanagement des Displays. Neben dem Stromverbrauch
kann auch durch das Deaktivieren des Displays auch dessen Lebensdauer verlängert
werden.

Ob das Ausschalten des Displays eine Option ist oder nicht hängt vom
Anwendungsfall ab. Eine Anzeigetafel in einem 24/7 benutzten Raum (z.B. im
Passagierbereich eines Flughafens) wird in der Regel durchlaufen. Aber bereits
Anzeigen in einem Museum müssen nur während der Öffnungszeiten aktiv sein, d.h.
hier kann mit einer Zeitsteuerung gearbeitet werden. Im Bereich der
Gebäudeautomatisierung, wie eben auch im Smart Home, bietet es sich an die
Bildschirmaktivierung mit einem Bewegungsmelder oder Präsenzmelder zu
verknüpfen.

Automatisches Bildschirmabschalten verhindern
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wenn nur über externe Quellen der Bildschirm geschaltet werden soll, so muss
verhindert werden, dass sich dieser über einen Bildschirmschoner selber
ausschaltet.

Hierzu ist die Datei ``/root/start_browser.sh`` am Anfang (nach der Zeile
``#!/bin/sh`` um diese Zeilen zu erweitern: ::

    # disable screen saver and simple timeout based display power management
    /usr/bin/xset dpms 0 0 0
    /usr/bin/xset s off
    /usr/bin/xset -dpms

Bildschirm aktivieren und deaktivieren
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Da ein Raspberry Pi selbst keinen Schlafzustand kennt und aus einem Halt
nicht über ein Wake on LAN aufgeweckt werden kann bietet sich nur ein
Powermanagement der Bildschirme über DPMS an.

Alternative 1: Manuelle Steuerung
"""""""""""""""""""""""""""""""""

Grundsätzlich kann der Bildschirm mit dem Befehl ::

    xset -display :0 dpms force off

ausgeschaltet werden und mit ::

    xset -display :0 dpms force on

wieder angeschaltet werden. Um ein selbständiges Ausschalten zu verhindern
sollten dabei noch die vier Zeilen aus dem Abschnitt "Automatisches
Bildschirmabschalten verhindern" eingefügt werden.

Alternative 2: Halbautomatische Steuerung
"""""""""""""""""""""""""""""""""""""""""

Gerade im Bereich der Heimautomatisierung bietet sich jedoch die halbautomatische
Variante an. Hier wird der Bildschirm nach einem Timeout ausgeschaltet.
Eingeschaltet wird er von einem extern gesendetem Kommando (das z.B. von einem
Bewegungsmelder oder Präsenzmelder getriggert wird). Außerdem lässt sich hier
der Bildschirm über eine Berührung aktivieren, falls der Bewegungsmelder nicht
reagieren sollte.

Für den Timer ist die Datei ``/root/start_browser.sh`` am Anfang (nach der Zeile
``#!/bin/sh`` um diese Zeilen zu erweitern: ::

    /usr/bin/xset s off
    /usr/bin/xset +dpms
    # schalte nach 5 Minuten aus
    /usr/bin/xset dpms 0 0 300

Die letzte Zeile kann je nach Bedarf angepasst werden: die ``300`` sind in
Sekunden die Dauer die nach der letzten Bedienung (oder des externen Triggers)
abgewartet wird bis der Bildschirm abgeschaltet wird.

Um extern triggern zu können wird auf dem Raspberry Pi das Programm ``xdotool``
benötigt, dass noch installiert werden muss: ::

    sudo apt-get install --no-install-recommends xdotool

Von einem Automatisierungsserver muss nun zum Aktivieren des Bildschirms über
SSH als ``root`` der Befehl ::

    DISPLAY=:0 xdotool mousemove_relative 1 0 mousemove_relative -- -1 0

gesendet werden.

Rechner schlafen legen und aufwecken
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. NOTE::

    Dieser Abschnitt eignet sich nicht für einen Raspberry Pi (zumindest nicht
    für die Versionen 1 bis 4, die bei Erstellung dieses Tutorials aktuell waren).
    Jedoch bei anderen Kiosk-Rechnern, insbesondere welchen die auf PC Technik
    basieren, kann als Alternative zum Powermanagement mit DPMS auch der ganze
    Rechner schlafen gelegt werden (Suspend to RAM) um Strom zu sparen und den
    Bildschirm zu deaktivieren.

Für den Schlaf-Befehl muss vom Kontroll-Rechner (der Automatisierungs-Server)
über SSH als ``root`` der Befehl ::

    systemctl suspend

gesendet werden. Ein komplettes Herunterfahren wäre über den Befehl ::

    systemctl poweroff

möglich.

Ein Aufwecken wäre dann über Wake on LAN (WOL) möglich.

Start-Animation
---------------

Damit bei einem Start des Raspberry Pi die für Nicht-Techniker unschönen
Boot-Meldungen hinter einen schönen Animation versteckt werden kann der
``plymouth`` Service eingerichtet werden. Hier gibt es auch eine `Animation
extra für die CometVisu <https://github.com/CometVisu/Misc/tree/master/plymouth>`__.

Zum Installieren werden diese Befehle benötigt: ::

    sudo apt-get install --no-install-recommends plymouth
    wget -O CometVisu_Misc.zip https://github.com/CometVisu/Misc/archive/refs/heads/master.zip
    unzip CometVisu_Misc.zip "Misc-master/plymouth/cometvisu/*"
    sudo mv Misc-master/plymouth/cometvisu /usr/share/plymouth/themes/
    rm -rf Misc-master/ CometVisu_Misc.zip

Ob die Installation funktioniert hat sieht man über
``plymouth-set-default-theme -l``, wenn in der Liste ``cometvisu`` auftaucht.
Aktiviert wird nun das CometVisu Plymouth Theme über ::

    sudo plymouth-set-default-theme -R cometvisu

Damit beim Boot-Vorgang der Plymouth Bootscreen angezeigt wird muss noch in die
Datei ``/boot/cmdline.txt`` die Zeile um diese Einträge verlängert werden: ::

    logo.nologo loglevel=1 quiet splash vt.global_cursor_default=0 plymouth.ignore-serial-consoles

Um den "Regenboden-Screen" beim Start des Raspberry Pi zu unterdrücken kann
außerdem (als ``root``) in der Datei ``/boot/config.txt`` am Ende diese
Zeile angehängt werden: ::

    disable_splash=1

.. NOTE::

    Da der Boot-Vorgang am Raspberry Pi sehr schnell passiert ist es gut
    möglich, dass der Plymouth Splash Screen nur kurz sichtbar ist.

Erweiterung auf zwei unabhängige Touch Panels
=============================================

Durch die bei dem Raspberry Pi vorhandenen doppelten HDMI Ausgänge bietet es
sich an zwei Touch Screens mit nur einem Raspberry Pi zu betreiben. Hierdurch
kann Strom, aber auch Administrationsaufwand und Anschaffungskosten eingespart
werden. Die große Flexibilität von Linux kann hier auch ihre Stärke ausspielen,
da es bei X11 möglich ist zwei unabhängige Cursor gleichzeitig zu nutzen.

Die allgemeine Einrichtung von zwei Displays folgt dem im vorderen Teil
beschriebenen Vorgehen.

Mit zwei Displays erweitert der Raspberry Pi beide zu einem großen Bildschirm.
Für einen Arbeitsplatz ist dieses Verhalten gewünscht, bei zwei getrennt
montierten Displays ist dieses Vorgehen jedoch nicht von Vorteil, bei der
Analyse von Problemen hilft es jedoch dieses Verhalten im Hinterkopf zu behalten.

In dem Tutorial werden nun beide Displays aus Sicht des Raspberry Pi direkt
nebeneinander als ein großer, virtueller Bildschirm positioniert, auch wenn
die beiden Touch Screens natürlich getrennt voneinander montiert werden.

Um nun die richtige Reihenfolge festzulegen wird die Datei
``/etc/X11/xorg.conf.d/90-dualscreen.conf`` angelegt und befüllt mit: ::

    Section "Monitor"
            Identifier "HDMI-1"
            Option     "Primary" "true"
    EndSection

    Section "Monitor"
            Identifier "HDMI-2"
            Option     "LeftOf" "HDMI-1"
    EndSection

Mit dieser Datei wird das Display an HDMI Ausgang 2 links von dem am HDMI
Ausgang 1 dargestellt.

Als zweites sollen auf beiden Displays jeweils ein eigener Browser erscheinen.
Hierzu ist die Datei ``/root/start_browser.sh`` am Ende um einen weiteren
Aufruf des Browser zu erweitern. **Wichtig:** da der Aufruf des Browsers nicht
sofort "zurückkehrt" muss der **erste(!)** Browser nach seinem Aufruf sofort
in den Hintergrund geschickt werden. Dies erreicht man, in dem am Ende des
Aufrufs ein ``&`` angehängt wird. Somit könnte die Datei z.B. so aussehen: ::

    #!/bin/sh

    # DEBUG
    xsetroot -solid green

    # allow any local user to use the X server
    /usr/bin/xhost local:

    # run the first browser as the user "pi"
    /usr/bin/sudo -H -u pi -- /usr/bin/chromium-browser \
      --window-position=0,0            \
      --window-size=1024,769           \
      --no-first-run                   \
      -disable-dev-tools               \
      -disable-hang-monitor            \
      -disable-java                    \
      -disable-logging                 \
      -disable-metrics                 \
      -disable-metrics-reporting       \
      -disable-plugins                 \
      -disable-popup-blocking          \
      -disable-prompt-on-repost        \
      -start-maximized                 \
      --disable-popup-blocking         \
      --disable-infobars               \
      --disable-session-crashed-bubble \
      --incognito                      \
      --kiosk                          \
      --user-data-dir=/tmp/browser1    \
      http://192.168.0.30/cometvisu/ &

    # run the second browser as the user "pi"
    /usr/bin/sudo -H -u pi -- /usr/bin/chromium-browser \
      --window-position=1024,0         \
      --window-size=1024,769           \
      --no-first-run                   \
      -disable-dev-tools               \
      -disable-hang-monitor            \
      -disable-java                    \
      -disable-logging                 \
      -disable-metrics                 \
      -disable-metrics-reporting       \
      -disable-plugins                 \
      -disable-popup-blocking          \
      -disable-prompt-on-repost        \
      -start-maximized                 \
      --disable-popup-blocking         \
      --disable-infobars               \
      --disable-session-crashed-bubble \
      --incognito                      \
      --kiosk                          \
      --user-data-dir=/tmp/browser2    \
      http://192.168.0.30/cometvisu/

Auch wichtig ist, dass ``--user-data-dir`` auf zwei unterschiedliche
Verzeichnisse verweist, da sonst Chrome seine beiden Fenster nur übereinander
legen würde. Neben diesem Parameter muss auch noch ``--window-position``
basierend der konkreten Bildschirmgröße angepasst werden, da hiermit das zweite
Browserfenster auf den zweiten Bildschirm verschoben wird.
