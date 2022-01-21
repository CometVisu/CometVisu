***
FAQ
***

Frequently asked questions are answered here:

Does CometVisu work with Internet Explorer?
-------------------------------------------

NO. Unfortunately at the moment Internet Explorer is not supported.
This is due to the many peculiarities that need to be programmed and
maintained specifically for the Internet Explorer. But since CometVisu
is an open source project, anyone who has the skills to do so is
welcome to work on it as well as to make it compatible with Internet
Explorer. At the moment, the user only has access to one of the many,
free ones Browsers such as Firefox, Google Chrome or Safari. A list of
compatible browsers can be found here: :ref:`system-requirements`

Can the CometVisu also be operated on other servers or hardware?
----------------------------------------------------------------

YES. But this requires a lot of Linux knowledge. Basically,
the CometVisu runs on any Linux based hardware for which there is a
*eibd* and a webserver. A finished installation package that is
very comfortable by any user without Linux knowledge can currently
be installed only for the WireGate Multifunction Gateway.
The installation on the WireGate is described here: :doc:`install/wiregate`.
Basically, the CometVisu protocol can also be implemented on systems
where no eibd is running, or which are not connected to KNX at all.
Finished solutions are not known to us at the moment.

Is there password protection for the built-in editor or visualization?
----------------------------------------------------------------------

NO. At the moment, neither user administration nor password protection
is integrated in the CometVisu. However, there is the possibility
for advanced users of hand-held e.g. remove the link to the editor
from the status bar.
Currently there is also a possibility to realize an automatic page
change by group address. It is also possible to hide pages so that
they can only be accessed via a group address (for example, external
login for special pages). This feature is currently under
development and therefore not released!

Can multiple designs be used simultaneously on different devices?
-----------------------------------------------------------------

YES. This is easily possible because the display of the
visualization is taken over by the client browser. Therefore, there
may be slight differences in the appearance of the same theme in
different browsers. It is only necessary to create a separate config
file for each design, since the design to be used is stored there.

Can I design my own design for the CometVisu?
---------------------------------------------

YES. That is easily possible. However, knowledge in website
creation (HTML and especially CSS) is necessary. This allows the
design to adapt to your own wishes.

Can I develop my own widgets for CometVisu?
-------------------------------------------

YES. The CometVisu was specially designed so that everyone can
develop their own widgets. The file *structure\_custom.js*
is available for this purpose. This file will not be overwritten
by future updates. The widgets are programmed in JavaScript.


Can I participate in the development of CometVisu?
--------------------------------------------------

YES. We can use every helping hand. At the moment we are still
urgently looking for programmers to help fix bugs and further develop
CometVisu. But even "tolerable" beta testers reporting the bug, for
example, in the 
`bug tracker <https://github.com/CometVisu/CometVisu/issues>`__
are welcome.

Likewise, any help in completing this documentation is welcome. If
you are interested in joining CometVisu, please contact us at
`knx-user-forum <http://knx-user-forum.de>`__ in subforum CometVisu.

Information on the possibilities of cooperation can be found here: :doc:`colab/index`
