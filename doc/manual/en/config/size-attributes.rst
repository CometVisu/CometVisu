.. _size-attributes:

=====================
Resize widget content
=====================

In the following widgets are next to the child element ``layout``
(specifies the outer widget dimensions) other attributes such as.
``width`` and ``height`` to influence the content:

-  :doc:`Image <widgets/image/index>`
-  :doc:`Video <widgets/video/index>`
-  :doc:`Web <widgets/web/index>`
-  :doc:`Diagram <widgets/plugins/diagram/index>`
-  RSSlog
-  :doc:`RSS <widgets/plugins/rss/index>`
-  :doc:`Gauge <widgets/plugins/gauge/index>`

Basically, it is recommended to start without these attributes at
the beginning, since in most cases the size of the content is
automatically adjusted to the widget size. However, in some cases
it may make sense to use the ``width`` or ``height`` attribute
in addition.

The information is in CSS format and can be in pixels, percent
or relative to the font size.


Size information in pixels
--------------------------

The specification in pixels takes place in the
format ``width="300px"`` or ``height="200px"``.

.. IMPORTANT::

      The indication in pixels scales in relation to the viewport
      size and not in relation to the physical resolution of the
      display. The viewport size is defined for each device based
      on the display size (screen size). An overview provides e.g.
      `<Viewportsizes.com>`__


Sizes in percent
----------------

The percentage is expressed in the format
``width="100%"`` or ``height="100%"``.

The percentage refers to the visible area of the widget size. That
with ``width=100%`` the content will be scaled (both enlarged
and reduced) to the entire width of the widget, with
``width=50%`` the widget will be half filled.


Size information relative to the font size
------------------------------------------

The specification is in the format ``width="50em"`` or
``height="30em"``. The unit "em" is the standard font size of
the text in the Cometvisu.

