.. _tile-dynamic:

The dynamic widget
==================

.. api-doc:: cv.ui.structure.tile.widgets.Dynamic

The ``Dynamic`` widget allows to display other parts of the visualization dynamically. It can be used, for example,
to display the display elements of a room on an overview page when you are currently in this room.
For this you need a ``<cv-address>`` element, which contains information about the room you are currently in and a
``<cv-group>`` for this room.

.. code-block:: xml

    <cv-page id="start" name="Dashboard" icon="ri-dashboard-line">
        <cv-dynamic>
            <cv-ref selector="#floorplan > cv-group[name=Living]" when="Livingroom" modify-selector="cv-group" modify-attribute="open:true"/>
            <cv-ref selector="#floorplan > cv-group[name=Dining]" when="Diningroom" modify-selector="cv-group" modify-attribute="open:true"/>
            <cv-address transform="OH:String" mode="read">Presence</cv-address>
        </cv-dynamic>
    </cv-page>
    <cv-page id="floorplan" name="Rooms" icon="knxuf-control_building_empty">
        <cv-group name="Living" icon="knxuf-scene_livingroom">
            ...
        </cv-group>
        <cv-group name="Dining" icon="knxuf-scene_dinner">
           ...
        </cv-group>
    </cv-page>

With the help of a ``<cv-ref>`` element you specify what should be displayed when.
The ``selector`` attribute specifies which element(s) should be displayed. This is a CSS selector that selects one or more elements.
These are copied and inserted into the visualization when the value of the ``when`` attribute of the ``<cv-ref>`` element matches the value of the ``<cv-address>`` element.

In this example, the group ``Living`` is displayed when the value of ``Presence`` is ``Livingroom``.
The group ``Dining`` is displayed when the value of ``Presence`` is ``Diningroom``.

There is also the possibility to change the attributes of the copied elements. If you want to display a ``<cv-group>`` dynamically that is actually closed,
then you can display the copy of this group as automatically opened by changing the ``open`` attribute of the ``cv-group`` to ``true``.

If you do not want to copy the entire group but only its content, you can adjust the ``selector`` of the ``<cv-ref>`` element as follows.

.. code-block:: xml

    ...
    <cv-dynamic>
        <cv-ref selector="#floorplan > cv-group[name=Living] > *:not(summary)" when="Livingroom" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-ref selector="#floorplan > cv-group[name=Dining] > *:not(summary)" when="Diningroom" modify-selector="cv-group" modify-attribute="open:true"/>
        ...
    </cv-dynamic>
    ...

Show content only for certain clients
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The CometVisu offers the possibility to pass a client ID via URL (e.g. ``http://cometvisu/?clientID=Tablet_Livingroom``).
This is available in the "system" backend at the address ``client:id``.
This way you can display parts of the visualization only for certain clients.

.. code-block:: xml

    ...
    <cv-dynamic>
        <cv-ref selector="#floorplan > cv-group[name=Living]" when="Tablet_Livingroom" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-ref selector="#floorplan > cv-group[name=Dining]" when="Tablet_Diningroom" modify-selector="cv-group" modify-attribute="open:true"/>
        <cv-address transform="OH:String" mode="read" backend="system">client:id</cv-address>
    </cv-dynamic>
    ...


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-dynamic tile
