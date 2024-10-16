.. _tile-media-player:

The media-player widget
=======================

.. api-doc:: cv.ui.structure.tile.Controller

Description
-----------

The media player widget provides the possibility to control a music player. The widget shows the current song,
offers the possibility to start or stop playing, to skip a song forward or backward. It also shows how much of the
current song has already been played and allows to adjust the volume.

The widget uses :ref:`buttons <tile-component-button>` for start/stop, skip forward and backward and a
:ref:`slider <tile-component-slider>` for the volume.

.. widget-example::
    :shots-per-row: 2

    <settings design="tile">
        <screenshot name="cv-media-player" margin="0 10 10 0">
            <data address="1/4/0">Kings of Leon</data>
            <data address="1/4/1">Sex is on Fire</data>
            <data address="1/4/3">1</data>
            <data address="1/4/5">180</data>
            <data address="1/4/4">120</data>
            <data address="1/4/6">75</data>
            <caption>No background image</caption>
        </screenshot>
        <screenshot name="cv-media-player-bg" margin="0 10 10 0">
            <data address="1/4/0">Kings of Leon</data>
            <data address="1/4/1">Sex is on Fire</data>
            <data address="1/4/3">1</data>
            <data address="1/4/5">180</data>
            <data address="1/4/4">120</data>
            <data address="1/4/6">75</data>
            <data address="1/4/7">resource/icons/comet_icon_512x512_ff8000.png</data>
            <caption>With background image</caption>
        </screenshot>
    </settings>
    <cv-media-player>
        <cv-address slot="subtitleAddress" transform="DPT:24.001" mode="read">1/4/0</cv-address>
        <cv-address slot="titleAddress" transform="DPT:24.001" mode="read">1/4/1</cv-address>
        <cv-address slot="previousAddress" transform="DPT:1.001" value="0" mode="write">1/4/2</cv-address>
        <cv-address slot="playPauseAddress" transform="DPT:1.001">1/4/3</cv-address>
        <cv-address slot="playTimeAddress" transform="DPT:5.010" mode="read" target="progress">1/4/4</cv-address>
        <cv-address slot="durationAddress" transform="DPT:5.010" mode="read" target="store:duration">1/4/5</cv-address>
        <cv-address slot="nextAddress" transform="DPT:1.001" value="1" mode="write">1/4/2</cv-address>
        <cv-address slot="volumeAddress" transform="DPT:5.001">1/4/6</cv-address>
        <cv-address slot="tileAddress" transform="DPT:24.001" mode="read" target="background-image">1/4/7</cv-address>
        <cv-address slot="tileAddress" transform="DPT:1.001" mode="read" target="show-exclude">1/4/8</cv-address>
    </cv-media-player>


The widget uses the following addresses:

========================= ================================
song title                ``slot="titleAddress"``
album / artist            ``slot="subtitleAddress"``
previous song             ``slot="previousAddress"``
start / stop              ``slot="playPauseAddress"``
current playtime          ``slot="playTimeAddress"``
total playtime            ``slot="durationAddress"``
next song                 ``slot="nextAddress"``
volume                    ``slot="volumeAddress"``
widget                    ``slot="tileAddress"``
========================= ================================

The addresses for the widget itself ``slot="tileAddress"`` are optional and allow some special features using the
:ref:`target <tile-element-address-target>` attribute.

For example, the visibility of the widget can be controlled to hide it when the music player is not available.
As shown in the example, the widget would be removed if the value "0" were received on the address "1/4/8".
If the value "1" is received, it will be visible again. This behavior is activated by ``target="show-exclude"``.

It is also possible to show the cover of the currently played song as the background image of the tile.
This is done with the entry from the example ``<cv-address slot="tileAddress" transform="DPT:24.001" mode="read" target="background-image">1/4/7</cv-address>``.
The address must either provide the URL of the image that the CometVisu can load, or
the image directly as a `Data-URI <https://en.wikipedia.org/wiki/Data_URI_scheme>`_. The latter will probably not be possible with the KNX backend due to the restrictions on the
amount of data that can be sent on the KNX bus, but e.g. the openHAB backend can deliver such data.

The media player widget supports an optional :ref:`menu <tile-item-menu>` by adding one or more
``<cv-menu-item slot="menu">`` elements.

.. code-block:: xml

    <cv-media-player>
       <cv-menu-item slot="menu" name="Favoriten" action="popup" icon="ri-star-line">...</cv-menu-item>
       <cv-menu-item slot="menu" name="Stumm" action="toggleState" icon="ri-volume-mute-line">...</cv-menu-item>
        ...
    </cv-media-player>


Allowed attributes in the media player element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-media-player tile


Allowed child elements and their attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-media-player tile
