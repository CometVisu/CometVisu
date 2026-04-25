.. _tile-component-breadcrumbs:

Breadcrumbs
...........

.. api-doc:: cv.ui.structure.tile.components.Breadcrumbs

The breadcrumbs component generates a navigation path to the currently visible :ref:`page <tile-component-page>`.
It is typically placed in the ``<header>`` or ``<footer>`` together with a :ref:`menu <tile-component-menu>` and updates automatically
whenever the current page changes.

.. figure:: ../_static/tile-nav-breadcrumb.png

    Breadcrumb navigation for the current page.

To save vertical space on smaller screens, breadcrumbs support the attribute ``hide-on-scroll="true"``.
This hides the breadcrumb bar while the content in ``<main>`` is scrolled and shows it again when the scroll position returns to the top.

.. code-block:: xml

    <header>
        <nav hide-on-scroll="true">
            <cv-menu model="pages"/>
        </nav>
        <cv-breadcrumbs hide-on-scroll="true"/>
    </header>

Allowed attributes
^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-breadcrumbs tile