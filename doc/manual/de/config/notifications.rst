.. _notifications:

Benachrichtigungen
==================

.. api-doc:: cv.core.notifications.Router

Beschreibung
------------

Das ``state-notification`` Element im Meta-Bereich der Konfiguration erlaubt es Benachrichtigungen zu erstellen wenn
ein neuer Wert für ein Widget vom Backend hochgemeldet wird. Diese Benachrichtigungen können als Popup oder
als Eintrag in der Benachrichtigungszentrale angezeigt werden.

Sobald Nachrichten in der Benachrichtigungszentrale vorhanden sind, wird die Anzahl der Nachrichten am oberen rechten
Rand des Browserfensters und im Favicon (im Browser-Tab) anzeigt. Sollten Nachrichten mit höherer Priotität darunter
sein, wird dies durch farbigen Hintergrund gekennzeichnet.

.. code-block:: xml
    :caption: Einfaches Beispiel zeigt eine Nachricht in der Nachrichtenzentrale, wenn die Wohnzimmerlampe eingeschaltet ist.

    <notifications>
        <state-notification target="notificationCenter" unique="true">
            <title-template>Wohnzimmerlicht</title-template>
            <message-template>eingeschaltet um {{ time }} Uhr</message-template>
            <condition>ON</condition>
            <addresses>
                <address transform="OH:switch">Light_FF_Living</address>
            </addresses>
        </state-notification>
    </notifications>

**Erklärung:**

Über dass ``address`` Element (mehrere sind möglich) wird festgelegt, dass bei eingehenden Status-Updates für diese
Addresse eine Nachricht generiert wird. Eine Nachricht besteht aus einem Titel und dem Nachrichteninhalt.
Die beiden Elemente ``title-template`` und ``message-template`` bestimmen den Inhalt der beiden Nachrichtenteile.
Bei den Templates handelt es sich um `Mustache <https://github.com/janl/mustache.js>`__-Templates,
bei denen bestimmte Platzhalter an eine beliebige Stelle in den Text eingefügt werden können.
Folgende Platzhalter stehen zur Verfügung:

=========== =================================================
Name        Inhalt
=========== =================================================
``address`` Adresse von der das Status-Update gekommen ist
``value``   Wert des Status-Updates
``date``    Datum des Empfangs
``time``    Zeit des Empfangs
=========== =================================================

Das Beispiel würde folgenden Nachricht erzeugen:

.. code-block:: text

    Wohnzimmerlicht
    eingeschaltet um 12:45 Uhr


Über ``target="notificationCenter"`` wird festgelegt, dass diese Benachrichtigung in der Nachrichtenzentrale
am linken Rand der Visu angezeigt wird. Ein weiterer möglicher Wert wäre hier ``popup``, um die Nachricht
als Popup anzuzeigen.

``unique="true"`` legt fest, dass die Nachricht nur einmal angezeigt wird, und zwar nur, wenn der Wert des
Status-Updates gleich dem ``<condition>`` festgelegten Wert ``ON`` entsprich, d.h. die Nachricht wird angezeigt,
wenn die Lampe eingeschaltet ist, wenn sie ausgeschaltet wird, wird die Nachricht automatisch gelöscht.


Erklärung zu den Attributen im state-notification-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: state-notification


Weitere Beispiele
-----------------

.. code-block:: xml
    :caption: Komplexes Beispiel mit Benachrichtungen für Bewegungen inkl. Mapping

    <mappings>
        <mapping name="Motion_name">
            <entry value="Motion_FF_Corridor">Flur OG</entry>
            <entry value="Motion_FF_Kitchen">Küche</entry>
            <entry value="Motion_FF_Dining">Esszimmer</entry>
        </mapping>
        ...
    </mappings>
    ...
    <notifications>
        <state-notification name="motion" target="notificationCenter" unique="true" severity="high">
            <title-template>Bewegungsalarm</title-template>
            <message-template>Bewegung erkannt: {{ address }}, {{ time }}</message-template>
            <condition>ON</condition>
            <addresses address-mapping="Motion_name">
                <address transform="OH:switch">Motion_FF_Dining</address>
                <address transform="OH:switch">Motion_FF_Corridor</address>
                <address transform="OH:switch">Motion_FF_Kitchen</address>
            </addresses>
        </state-notification>
    </notifications>

Dieses Beispiel zeigt ein Benachrichtigung wenn einer der Bewegungsmelder eine Bewegung liefert
mit hoher Priorität (``severity="high"``, wird orange markiert).

Um den etwas kryptischen Adressennamen in ein lesbares Format zu bringen wird ein :ref:`Mapping <mapping>` benutzt.
Wenn der Bewegungsmelder mit dem Namen *Motion_FF_Corridor* nun eine Bewegung signalisiert würde die Nachricht
folgenden Inhalt haben:

.. code-block:: text

    Bewegungsalarm
    Bewegung erkannt: Flur OG, 12:45

