=================================
Module: ``structure/pure/Switch``
=================================


.. contents:: Local Navigation
   :local:

Children
========

.. toctree::
   :maxdepth: 1
   
   
Description
===========

<p>The switch widget shows two states (e.g. ON and OFF) and can toggle between them.</p>


.. _module-structure_pure_Switch.create:


Function: ``create``
====================

<p>Creates the widget HTML code</p>

.. js:function:: create(element, path, flavour, type)

    
    :param Element element: <p>DOM-Element</p>
    :param String path: <p>internal path of the widget</p>
    :param String flavour: <p>Flavour of the widget</p>
    :param String type: <p>Page type (2d, 3d, ...)</p>
    :return String: <p>HTML code</p>
    
.. _module-structure_pure_Switch.create:


Function: ``create``
====================



.. js:function:: create()

    
    
.. _module-structure_pure_Switch.update:


Function: ``update``
====================

<p>Handles updates of incoming data for this widget</p>

.. js:function:: update(address, value)

    
    :param String address: <p>Source address of the incoming data</p>
    :param String value: <p>Incoming data</p>
    
.. _module-structure_pure_Switch.update:


Function: ``update``
====================



.. js:function:: update()

    
    
.. _module-structure_pure_Switch.action:


Function: ``action``
====================

<p>Action performed when the switch got clicked</p>

.. js:function:: action(path, actor, isCanceled)

    
    :param String path: <p>Internal path of the widget</p>
    :param Element actor: <p>DOMElement</p>
    :param Boolean isCanceled: <p>If true the action does nothing</p>
    
.. _module-structure_pure_Switch.action:


Function: ``action``
====================



.. js:function:: action()

    
    

.. _module-structure_pure_Switch.on_value:

Member: ``on_value``: 

.. _module-structure_pure_Switch.off_value:

Member: ``off_value``: 

.. _module-structure_pure_Switch.ret_val:

Member: ``ret_val``: 




Examples
========

.. code-block:: javascript
   :caption: Configuration example of a switch widget using mapping and styling<div style="margin-top: 5px; float:left; width: 50%; text-align: center; clear: left"><img id="switch_example_on" src="static/switch_example_on.png" alt="Switch turned on" title="Switch turned on "><label style="margin-left: 10px; clear: left" for="switch_example_on">Switch turned on</label></div><div style="margin-top: 5px; float:left; width: 50%; text-align: center;"><img id="switch_example_off" src="static/switch_example_off.png" alt="Switch turned off" title="Switch turned off "><label style="margin-left: 10px; clear: left" for="switch_example_off">Switch turned off</label></div>

   ...
   <meta>
    <mappings>
      <mapping name="OnOff">
        <entry value="0">O</entry>
        <entry value="1">I</entry>
      </mapping>
    </mappings>
    <stylings>
      <styling name="GreyGreen">
        <entry value="0">grey</entry>
        <entry value="1">green</entry>
      </styling>
    </stylings>
   </meta>
   ...
   <switch mapping="OnOff" styling="GreyGreen">
     <layout colspan="3"/>
     <label>Switch</label>
     <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
   </switch>

