
CometVisu von swiss (Metal)
===========================

This is where swiss' visually productive Visu is presented.

| **Design**: Metal
| **Plugins**: rsslog, strftime, diagram
| **Config**: :download:`visu_config_metal_swiss.xml <_static/visu_config_metal_swiss.xml>`
| **Live-Demo**: `Live-Demo <http://demo.wiregate.de/visu-svn_neu/?config=metal_swiss>`__
|

Screenshots
-----------

+--------------------------------------------------+--------------------------------------------------+--------------------------------------------------+
| .. figure:: _static/Example_Metal_swiss_01.jpg   | .. figure:: _static/Example_Metal_swiss_03.jpg   | .. figure:: _static/Example_Metal_swiss_04.jpg   |
|    :alt: Screenshot Metal                        |    :alt: Screenshot Metal                        |    :alt: Screenshot Metal                        |
|    :width: 200px                                 |    :width: 200px                                 |    :width: 200px                                 |
|                                                  |                                                  |                                                  |
|    Screenshot Metal                              |    Screenshot Metal                              |    Screenshot Metal                              |
+--------------------------------------------------+--------------------------------------------------+--------------------------------------------------+
| .. figure:: _static/Example_Metal_swiss_05.jpg   | .. figure:: _static/Example_Metal_swiss_06.jpg   |                                                  |
|    :alt: Screenshot Metal                        |    :alt: Screenshot Metal                        |                                                  |
|    :width: 200px                                 |    :width: 200px                                 |                                                  |
|                                                  |                                                  |                                                  |
|    Screenshot Metal                              |    Screenshot Metal                              |                                                  |
+--------------------------------------------------+--------------------------------------------------+--------------------------------------------------+

The highlights at a glance
---------------------------

Time display in the Navbar
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: _static/Example_Metal_swiss_02.jpg
    :alt: Screenshot Zeit/Datum
    :width: 200px

    Screenshot Time/Date

.. HINT::

    For the time display the *strftime* plugin is used. To activate
    it must be added in the meta area of the config under plugins.
    The *class* attribute only appears in the editor if the
    *complex* mode has been activated.


The time display (inspired by netsrac) was as follows
built-in:

In the Navbar, a **Group** widget was inserted at the top of
the page with the name "Current Time". Within this **Group**
is another **Group** widget with the attribute **nowidget="true"**.
Then, from top to bottom, a **strftime**, a **break** followed
by another **strftime** widget were inserted.

The upper **strftime** widget which displays the time has
the following parameters:

.. code-block:: ini

    lang="de"
    format="%H:%M"
    class="timebig"

The lower **strftime** indicating the date has the following parameters:

.. code-block:: ini

    lang="de"
    format="%A, %d. %B %Y"
    class="timedate"

In config.xml, this section looks like this:

.. code-block:: xml

           <group name="Actual time">
              <layout colspan="12"/>
              <group nowidget="true">
                <layout colspan="12"/>
                <strftime lang="de" format="%H:%M" class="timebig">
                  <layout colspan="12"/>
                </strftime>
                <strftime lang="de" format="%A, %d. %B %Y" class="timedate">
                  <layout colspan="12"/>
                </strftime>
              </group>
            </group>

For formatting (color, font size and font) the following css rules must be added to the visu:

.. code-block:: css

    .custom_timebig {
        padding: 0;
        margin: 0;
        color: #75d5ff;
        min-height: 0mm;
        line-height: 8mm;
        font: bold 12mm "Lucida Grande", Lucida, Verdana, sans-serif;
    }

    .custom_timebig > div.strftime_value {
        text-align: center;
        line-height: 14mm;
    }

    .custom_timedate {
        padding: 0;
        margin: 0;
        min-height: 0mm;
        line-height: 8mm;
        font: bold 3mm "Lucida Grande", Lucida, Verdana, sans-serif;
    }

    .custom_timedate > div.strftime_value {
            text-align: center;
    }

Howto include custom css rules is described in chapter :ref:`Customize Cometvisu <custom_cssrules>`.