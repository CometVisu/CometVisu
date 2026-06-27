.. _tile-element-styling:

Styling
=======

.. HINT::

    The functionality of the stylings in the Tile structure does not differ from the stylings in the Pure structure.
    Only the name of the element in the configuration file is different: ``<cv-styling>``.

With the styling tag, colors can be assigned to elements at respective values.

For example, OFF can be displayed in red and ON in green (or vice versa).

Here is a list of possible colors that are included by default in the CometVisu:

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

    The colors can vary depending on the design.

With this styling, 0 (often OFF) is displayed in green and 1 (often ON) in red.

.. code-block:: xml

     <cv-styling name="GreenRed">
        <entry value="0">green</entry>
        <entry value="1">red</entry>
     </cv-styling>

To show an element with the opposite colors, the following style tag must be created.
Now the element is red when the value is 0.

.. code-block:: xml

     <cv-styling name="Red_Green">
        <entry value="0">red</entry>
        <entry value="1">green</entry>
     </cv-styling>

The styling tag can also be used for sliders. Here the value for the range in which the color is displayed is defined.
In the following example as follows:

-  from -100 to 0: blue
-  the value 0: purple
-  values > 0: red

.. code-block:: xml

     <cv-styling name="BluePurpleRed">
        <entry range-min="-100" range-max="0">blue</entry>
        <entry value="0">purple</entry>
        <entry range-min="0" range-max="100">red</entry>
     </cv-styling>

.. IMPORTANT::

    How the colors are actually displayed in the design depends on the definition in the CSS for the respective design.

**The colors can also be specified in the HTML code. For example:
#F33333**
