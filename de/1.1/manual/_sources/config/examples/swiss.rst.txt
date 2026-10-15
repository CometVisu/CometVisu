.. replaces:: CometVisu/demo_config/swiss/de

CometVisu von swiss (Metal)
===========================

Hier wird die produktiv im Einsatz befindliche Visu von swiss vorgestellt.

| **Design**: Metal
| **Plugins**: rsslog, strftime, diagram
|

.. hint ::

    In der Version 0.12 wurde das Metal-Design überarbeitet.
    Die Screenshots auf dieser Seite zeigen noch das alte Design ohne Überarbeitungen.

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

Die Highlights im Überblick
---------------------------

Zeitanzeige in der Navbar
~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: _static/Example_Metal_swiss_02.jpg
    :alt: Screenshot Zeit/Datum
    :width: 200px

    Screenshot Zeit/Datum

.. HINT::

   Zur Zeitanzeige wird das *strftime* Plugin verwendet. Zum Aktivieren muss es im Meta-Bereich der config unter
   Plugins hinzugefügt werden. Das Attribut *class* wird im Editor nur angezeigt, wenn der *complex*-Modus aktiviert wurde.


Die Zeitanzeige (inspiriert von netsrac) wurde folgendermaßen
eingebaut:

In der Navbar wurde an der obersten Stelle ein **Group** Widget
eingefügt mit dem Namen "Aktuelle Zeit". Innerhalb dieser **Group**
befindet sich ein weiteres **Group** Widget mit dem Attribut
**nowidget="true"**. Darin wurden dann, von oben nach unten, ein
**strftime**, ein **break** gefolgt von einem weiteren **strftime**
Widget eingefügt.

Das obere **strftime** Widget, welches die Zeit anzeigt hat folgende Parameter:

.. code-block:: ini

    lang="de"
    format="%H:%M"
    class="timebig"

Das untere **strftime**, welches das Datum anzeigt hat folgende Parameter:

.. code-block:: ini

    lang="de"
    format="%A, %d. %B %Y"
    class="timedate"

In der config.xml sieht dieser Abschnitt wie folgt aus:

.. code-block:: xml

           <group name="Aktuelle Zeit">
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

Für die Formatierung (Farbe, Schriftgröße und Schriftart) müssen folgende CSS-Regeln eingefügt werden:

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

Das Einbinden von eigenen CSS-Regeln wird im Kapitel :ref:`Anpassungen vornehmen <custom_cssrules>` beschrieben.
