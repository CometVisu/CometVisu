.. _tile-element-state-notification:

Status-Benachrichtigung
=======================

Die Benachrichtigungen im Meta-Bereich bieten die selbe Funktionalität wie in :ref:`Pure-Struktur<notifications>`.
Der Einzige Unterschied in der Benutzung ist, dass das umschließende ``<notification>``-Element in der Tile-Struktur
nicht benötigt wird, sie dafür aber den ``cv-``-Präfix im Elementnamen haben.
Es ist also ausreichend, sie so zu benutzen:

.. code-block:: xml
    :caption: Einfaches Beispiel zeigt eine Nachricht in der Nachrichtenzentrale, wenn die Wohnzimmerlampe eingeschaltet ist.

    <cv-meta>
        <cv-state-notification target="notificationCenter" unique="true">
            <title-template>Wohnzimmerlicht</title-template>
            <message-template>eingeschaltet um {{ time }} Uhr</message-template>
            <condition>1</condition>
            <addresses>
                <address transform="OH:switch">Light_FF_Living</address>
            </addresses>
        </cv-state-notification>
        ...
    </cv-meta>

Für die allgemeine Erklärung zu den Features der Benachrichtigung wird daher an dieser Stelle auch nicht eingegangen und
auf die entsprechende Dokumentation der :ref:`Pure-Struktur<notifications>` verwiesen. Es gibt jedoch durch die Einführung
des neuen :ref:`System-Backends <tile-backend-system>` die Möglichkeit die Benachrichtigungen ein-/aus zu schalten, oder
deren Priorität zu verändern. Möchte man das oben gezeigte Beispiel nur manuell einschalten, da geht das indem man
eine ID vergibt (``id="lightWZ"``) und die Benachrichtigung erstmal deaktiviert (``enabled="false"``):

.. code-block:: xml

    <cv-meta>
        <cv-state-notification id="lightWZ" target="notificationCenter" unique="true" enabled="false">
            <title-template>Wohnzimmerlicht</title-template>
            <message-template>eingeschaltet um {{ time }} Uhr</message-template>
            <condition>1</condition>
            <addresses>
                <address transform="OH:switch">Light_FF_Living</address>
            </addresses>
        </cv-state-notification>
        ...
    </cv-meta>

Jetzt kann man an beliebiger Stelle in der Config einen :ref:`Switch <tile-switch>` einfügen mit dem man die
Benachrichtigung einschalten kann:

.. code-block:: xml

    <cv-meta>
        <cv-mapping name="Notification">
            <entry value="0">ri-notification-off-line</entry>
            <entry value="1">ri-notification-line</entry>
        </cv-mapping>
    </cv-meta>
    ...
    <cv-switch mapping="Notification">
        <cv-address slot="address" backend="system">notification:lightWZ:enabled</cv-address>
        <cv-icon slot="icon">ri-notification-line</cv-icon>
        <span slot="secondaryLabel">Licht WZ</span>
    </cv-switch>

Dazu benötigt der Switch eine Adresse für das ``backend="system"`` mit dem Wert ``notification:lightWZ:enabled``.
Die Adresse setzt sich zusammen aus dem immer benötigten Präfix ``notification:``, gefolgt von der ID der Benachrichtigung
und dem Attribut, welches verändert werden soll ``enabled``.
Möchte man die Priorität der Benachrichtigung verändern, kann man das mit folgendem Switch erreichen:

.. code-block:: xml

    <cv-meta>
        <cv-styling name="NotificationSeverity">
            <entry value="urgent">active</entry>
            <entry value="normal">inactive</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch styling="NotificationSeverity" on-value="urgent" off-value="normal">
        <cv-address slot="address" backend="system">notification:lightWZ:severity</cv-address>
        <cv-icon slot="icon">ri-alert-line</cv-icon>
        <span slot="secondaryLabel">Licht WZ</span>
    </cv-switch>

.. parameter-information:: cv-state-notification tile
