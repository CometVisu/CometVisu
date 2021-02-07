.. _styling:

Styling
=======

With the styling tag, elements can be assigned colors at respective
values. For example, OFF can be displayed in red and ON in green
(or vice versa).
Here are a list of possible colors that are included by
default in CometVisu:

.. raw:: html

    <table style="text-align:center; margin-bottom:20px" border="1" rules="all">
    <tbody><tr>
    <th style="background:#ffffff; width:150px" align="left"> grey
    </th>
    <td style="background:#808080; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> cyan
    </th>
    <td style="background:#00ffff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> green
    </th>
    <td style="background:#008000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> lime
    </th>
    <td style="background:#00ff00; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> red
    </th>
    <td style="background:#ff0000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> blue
    </th>
    <td style="background:#0000ff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> fuchsia
    </th>
    <td style="background:#ff00ff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> black
    </th>
    <td style="background:#000000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> maroon
    </th>
    <td style="background:#800000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> olive
    </th>
    <td style="background:#808000; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> purple
    </th>
    <td style="background:#800080; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> silver
    </th>
    <td style="background:#c0c0c0; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> white
    </th>
    <td style="background:#ffffff; width:200px" align="center">
    </td></tr>
    <tr>
    <th style="background:#ffffff; width:150px" align="left"> yellow
    </th>
    <td style="background:#ffff00; width:200px" align="center">
    </td></tr></tbody></table>


.. CAUTION::

   The colors may vary depending on the design.

This styling shows 0 (often OFF) in green and 1 (often ON) in red.

.. code-block:: xml

     <styling name="GreenRed">
        <entry value="0">green</entry>
        <entry value="1">red</entry>
     </styling>

To render an element with the opposite colors, the following style
tag must be created. Now the element at a value of 0 has the color red.

.. code-block:: xml

     <styling name="Red_Green">
        <entry value="0">red</entry>
        <entry value="1">green</entry>
     </styling>

Of course, styling tags can also be created for slider. This sets
the value for the area in which the color is displayed.
In the following example as follows:

-  from -100 to 0: blau
-  the value 0: lila
-  values greater 0: rot

.. code-block:: xml

     <styling name="BluePurpleRed">
        <entry range_min="-100" range_max="0">blue</entry>
        <entry value="0">purple</entry>
        <entry range_min="0" range_max="100">red</entry>
     </styling>

.. IMPORTANT::

     How the colors are actually displayed in the design depends
     on the definition in the CSS for the respective designs.

**The colors can also be specified in the HTML code. For example:
#F33333**
