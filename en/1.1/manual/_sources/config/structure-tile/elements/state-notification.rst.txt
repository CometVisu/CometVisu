.. _tile-element-state-notification:

State notifications
===================

.. api-doc:: cv.ui.structure.tile.elements.StateNotification

The notifications in the Meta area offer the same functionality as in :ref:`Pure structure<notifications>`.
The only difference in usage is that the enclosing ``<notification>`` element in the Tile structure is not needed,
but they have the ``cv-`` prefix in the element name.
So it is sufficient to use them like this:

.. code-block:: xml
    :caption: Simple example that shows a message in the message center when the living room light is switched on.

    <cv-meta>
        <cv-state-notification target="notificationCenter" unique="true">
            <title-template>Living room</title-template>
            <message-template>switched on at {{ time }}</message-template>
            <condition>1</condition>
            <addresses>
                <address transform="OH:switch">Light_FF_Living</address>
            </addresses>
        </cv-state-notification>
        ...
    </cv-meta>

A general explanation of the features of the notification is therefore not given here and
reference is made to the corresponding documentation of the :ref:`Pure structure<notifications>`. However, with the introduction
of the new :ref:`System backends <tile-backend-system>`, it is possible to switch the notifications on/off or
to change their priority. If you only want to switch on the above example manually, you can do this by
assigning an ID (``id="lightLR"``) and deactivating the notification first (``enabled="false"``):

.. code-block:: xml

    <cv-meta>
        <cv-state-notification id="lightLR" target="notificationCenter" unique="true" enabled="false">
            <title-template>Living room</title-template>
            <message-template>switched on at {{ time }}</message-template>
            <condition>1</condition>
            <addresses>
                <address transform="OH:switch">Light_FF_Living</address>
            </addresses>
        </cv-state-notification>
        ...
    </cv-meta>

Now you can insert a :ref:`Switch <tile-switch>` at any point in the config to switch the notification on:

.. code-block:: xml

    <cv-meta>
        <cv-mapping name="Notification">
            <entry value="0">ri-notification-off-line</entry>
            <entry value="1">ri-notification-line</entry>
        </cv-mapping>
    </cv-meta>
    ...
    <cv-switch mapping="Notification">
        <cv-address slot="address" backend="system">notification:lightLR:enabled</cv-address>
        <cv-icon slot="icon">ri-notification-line</cv-icon>
        <span slot="secondaryLabel">Light LR</span>
    </cv-switch>

For the switch to work, the switch needs an address for the ``backend="system"`` with the value ``notification:lightLR:enabled``.
The address is composed of the always required prefix ``notification:``, followed by the ID of the notification
and the attribute to be changed ``enabled``.
If you want to change the priority of the notification, you can do so with the following switch:

.. code-block:: xml

    <cv-meta>
        <cv-styling name="NotificationSeverity">
            <entry value="urgent">active</entry>
            <entry value="normal">inactive</entry>
        </cv-styling>
    </cv-meta>
    ...
    <cv-switch styling="NotificationSeverity" on-value="urgent" off-value="normal">
        <cv-address slot="address" backend="system">notification:lightLR:severity</cv-address>
        <cv-icon slot="icon">ri-alert-line</cv-icon>
        <span slot="secondaryLabel">Light LR</span>
    </cv-switch>

.. parameter-information:: cv-state-notification tile
