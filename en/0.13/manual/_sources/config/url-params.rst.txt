URL-Parameter
=============

The behavior of CometVisu can be partially adjusted by URL parameters.
Since these parameters can also be saved in the favorites of the browser,
the corresponding variants can be accessed as effectively and quickly.

Use
---

These parameters are simply appended to the URL by a "?"
(first URL parameter), separated by a "&" (all other URL parameters).

Examples:

+--------------------------------------------+------------------------------------------------+
| Description                                | URL                                            |
+============================================+================================================+
| Standard                                   | http://server/visu/                            |
+--------------------------------------------+------------------------------------------------+
| A parameter for another config             | http://server/visu/?config=demo                |
+--------------------------------------------+------------------------------------------------+
| A parameter for a different design         | http://server/visu/?design=pure                |
+--------------------------------------------+------------------------------------------------+
| Several parameters are linked with &       | http://server/visu/?config=demo&design=metal   |
+--------------------------------------------+------------------------------------------------+

Parameter
---------

*config* - Config file
~~~~~~~~~~~~~~~~~~~~~~~

The parameter ``config`` selects another config file.

So, for example ``config = NAME`` - This config file must be
under the name ``visu_config_NAME.xml`` either in the config directory
of the Visu or in the ``config/demo`` directory of Visu.

*design* - Design
~~~~~~~~~~~~~~~~~

The parameter ``design`` overrides the design in the config file.

*forceReload* - Cache settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The parameter ``forceReload`` with the value *true* 
(``forceReload=true``) safely reloads all files.

This may be important after customizing the config file.

*startpage* - Start page
~~~~~~~~~~~~~~~~~~~~~~~~

The parameter ``startpage`` can be used to specify the sub-page which
will be displayed first after loading the visu.

The easiest way to directly load a specific start page is to navigate
to the page you want and then save the link that the browser displays.
This always contains the ID of the currently displayed page as *anchor*
part of the URL (e.g. ``http://<server>/cometvisu/?Config=home#id_6_``,
shows the page with the ID ``id_6_``). For this, the *startpage*
parameter is not needed at all.

In addition, it is still possible to specify the name of the start page
via the *startpage* parameter. So if you want to use a subpage with
the name *Bad* as the start page, the URL is 
``http://<server>/cometvisu/?Config=home&startpage=Bad``

Especially if you have distributed visual acuity in several places
in the house, it can make sense to display the subpage that corresponds
to the room first, depending on the Visu location, for a complete config file.

*forceDevice* - Override output device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``forceDevice`` parameter, the value ``mobile`` can be used
to display the page on "large" devices as well as on a small, mobile
device (such as a smartphone). Any other value will display the page
(even on mobile devices) as on the PC.

This is actually only needed for developers.

*maturity* - Maturity
~~~~~~~~~~~~~~~~~~~~~

By the parameter ``maturity`` you can unlock features that are still
in development and thus have unintended cross-effects.

.. code::

    Default: release (maturity=release)
    Options: release (maturity=release), development (maturity=development)

This should only be used by developers!

*backend* - Backend
~~~~~~~~~~~~~~~~~~~

The parameter ``backend`` configures the used backend at runtime. There is
also a ``backend`` parameter in the config to fix this.

.. code::

    Default: cgi-bin (backend=cgi-bin)
    Options: cgi-bin (backend=cgi-bin), openhab (backend=openhab), mqtt

The default value "cgi-bin" (attention, inconsistent with xml
element, default = "cgi"!) is usually correct and does not need to be
changed. "r", "w" and "l" are in /cgi-bin/.

The option "openhab" uses the path necessary for OpenHAB.

*enableQueue* - Queue
~~~~~~~~~~~~~~~~~~~~~

The ``enableQueue`` parameter influences whether all or only the group
addresses required on the current page are queried by the CV. This may
lead to performance improvements.

.. code::

    Default: 0 (enableQueue=0)
    Options: 0 (enableQueue=0), 1 (enableQueue=1)

This is an experimental feature that may not work as expected, so it
is currently off by default.

*testMode* - Test mode without real backend
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the parameter ``testMode`` you can test the CometVisu rudimentarily
without having a running backend in the background. Normally, the CometVisu
sends the switch-on value at the defined address to the backend when a switch
is actuated. The backend then provides the corresponding feedback about the
status change, which the CometVisu displays again. Missing a backend, you
can not really test the controls of the CometVisu, because without feedback,
the status change is missing and so, for example a switch can never turn on.
With TestMode, the command sent to the backend is simply sent back to
CometVisu as a status update, simulating a simple backend.


However, this simulated backend offers, as already mentioned, only
rudimentary functions. If you have (as usual in the KNX world) different send
and return addresses, this will not work with the TestMode.

.. code::

    Default: 0 (testMode=0)
    Options: 0 (testMode=0), 1 (testMode=1)

.. _enableCache:

*enableCache* - Activate Caching
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The parameter ``enableCache`` can be used to configure caching. This has
the effect that a config is not completely read in every reload and that an
HTML page is generated from it, but that the rendered HTML structure including
all other required data is stored locally in the browser (in the LocalStore).
Each time the Config is loaded, the data is read from the cache, which means
speeding up loading the Visu on low-power devices (e.g. mobile devices).

The cache can be activated via this parameter (=true), deactivated (=false)
or deleted (=invalid).

Deleting causes all values to be deleted from the cache and recreated.

.. code::

    Default: In the release: true, in the developer version: false
    Options: false (enableCache=false), true (enableCache=true), invalid (enableCache=invalid)

.. _reporting:

*reporting* - Record Session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To support an error message, the interaction with the CometVisu can be
recorded and made available to the developers as a replay file. They can thus
see exactly which data has been exchanged between the CometVisu and the backend and which
actions the user has executed. Ideally, an error can be faithfully reproduced
with these log files, making it much easier to fix the problem.

.. code::

    Default: false (reporting=false)
    Options: true  (reporting=true), false (reporting=false)

.. ATTENTION::

    The complete configuration file is saved in the replay files. If
    credentials are in this configuration, make a copy of the configuration
    without such sensitive data and record the session with this configuration.

    Data from the :ref:`hidden config <hidden-config>` is not transferred with.

To record these replay files, you have to load the CometVisu with
``reporting=true``. After reaching the faulty state, you can download the
replay file by entering ``downloadLog()`` in the browser console (open with F12)
and confirming with *enter*. In addition to the automatic download of
the replay file, its content is also shown in the console.
So you can control which data is contained in the file.

.. HINT::

    Since the replay files are played in real time, it is advisable to keep the
    runtime as short as possible. A replay file that runs for 30 minutes or
    more until the problem occurs will make troubleshooting more difficult,
    as the developer may need to play it very often during error analysis and
    resolution.

.. _reportErrors:

*reportErrors* - Automatically send error messages to sentry.io
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another way for developers to improve CometVisu is to enable automatic bug
reports. These reports are sometimes sent completely automatically to a web
service (sentry.io) when an error occurs, which collects, processes and
notifies the CometVisu developers.

Since this in addition to the error sends more information (e.g. about the
browser used) to sentry.io, this functionality must be explicitly
enabled via this URL parameter.

.. code::

    Default: false (reportErrors=false)
    Options: true  (reportErrors=true), false (reportErrors=false)

To activate the error reports, the CometVisu must be loaded with
`reportErrors=true`. CometVisu's error dialogs offer the option of reloading
CometVisu with this parameter, if that has not happened yet. Then the user
can try to reproduce the error again and then send an error report with
further explanations to sentry.io.

.. _log:

*log* - Debug-messages in the browser console
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use this parameter to turn debug messages output on and off in the browser
console. In the developer version, these are turned on by default.

.. code::

    Default: false for Release, true for develop
    Options: true  (log=true), false (log=false)
