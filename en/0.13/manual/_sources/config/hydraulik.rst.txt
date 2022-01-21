
Instructions for creating an animated hydraulic plan
====================================================

Requirement
-----------

-  Inkscape

We create a buffer
--------------------------

-  Start Inkscape Start
-  Create a rectangle

.. figure:: _static/Puffer1.png
   :alt: Puffer1.png

-  Select fill and contour

.. figure:: _static/Puffer2.png
   :alt: Puffer2.png

-  Set the color of the outline to gray

.. figure:: _static/Puffer3.png
   :alt: Puffer3.png

-  Set the width of the contour

.. figure:: _static/Puffer4.png
   :alt: Puffer4.png

-  Result

.. figure:: _static/Puffer5.png
   :alt: Puffer5.png

-  Create fill with gradient

.. figure:: _static/Puffer6.png
   :alt: Puffer6.png

-  Use the edit function to apply two colors to the gradient,
   Color 1 (red) Assign with 100% coverage

.. figure:: _static/Puffer7.png
   :alt: Puffer7.png

-  Color two (blue) with 50% coverage

.. figure:: _static/Puffer8.png
   :alt: Puffer8.png

-  Change color gradient by rotate the object

.. figure:: _static/Puffer9.png
   :alt: Puffer9.png

-  Change color gradient by moving the gradient line

.. figure:: _static/Puffer10.png
   :alt: Puffer10.png

-  Round off the corners

.. figure:: _static/Puffer11.png
   :alt: Puffer11.png

We create Pipes
---------------

Pipes are created with the freehand-line draftsman. It is also
possible to draw straight lines Click on the starting point with
the mouse. Click on the target point again, the line is finished.
If you start with the new line at the last box of the old
line, the lines will be connected. The drawing direction
determines how later the animation runs. Drawn from right to
left, fluid flows from right to left.

|Rohr1.png| |Rohr2.png|

-  Give line a volume, Filling the contour, Pattern of the contour

.. figure:: _static/Rohr3.png
   :alt: Rohr3.png

-  Color of the contour

.. figure:: _static/Rohr4.png
   :alt: Rohr4.png

.. figure:: _static/Rohr5.png
   :alt: Rohr5.png

-  Assign a name to the object. Will be needed later for the animation.

   -  Click on the line with the right mouse button

      -  Select object properties

.. figure:: _static/Rohr6.png
   :alt: Rohr6.png

-  Change ID

.. figure:: _static/Rohr7.png
   :alt: Rohr7.png

Customize XML file (Inkscape)
-----------------------------

Now comes the mystery of the animated lines

-  To form groups, The required values can only be entered if the line has
   been defined as a group.

.. figure:: _static/XML1.png
   :alt: XML1.png

-  Assign parameters to the group

   -  id="<unique id>"
   -  class="pipe_group show_flow flow_control"
   -  data-cometvisu-active="1/0/3"

The parameters pipe_group, show_flow, data-cometvisu-active
and flow_control mean:

-  pipe_group => from the path a tubular shape is created
-  show_flow => a flowing (abstract) fluid is "simulated".
-  data-cometvisu-active="<ga>" => animates the fluid when GA is active
-  flow_control => Animation

.. figure:: _static/XML2.png
   :alt: XML2.png

Adapt XML-File (Editor)
-----------------------

It is also possible to edit the SVG file directly via
the editor. Basis is the line framed as a group

-  Open the svg file with an editor and search for the
   ID (blue pipe)

.. figure:: _static/XML3.png
   :alt: XML3.png

-  enrich the section with the following code.

.. code-block:: xml

   <g
   id="<unique id>"
   class="pipe_group show_flow flow_control"
   data-cometvisu-active="1/0/3">
   <path />
   </g>

.. figure:: _static/XML4.png
   :alt: XML4.png

The finished result in the web browser
--------------------------------------

.. figure:: _static/XML5.png
   :alt: XML5.png

.. |Rohr1.png| image:: _static/Rohr1.png
.. |Rohr2.png| image:: _static/Rohr2.png

