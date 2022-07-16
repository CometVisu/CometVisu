.. _tile-media-player:

Das Media-Player Widget
=======================

.. api-doc:: cv.ui.structure.tile.Controller

Beschreibung
------------

Mit dem Media-Player-Widget bietet die Möglichkeit ein Musik-Abspielgerät zu steuern. Das Widget zeigt
den aktuellen Song an, bietet die Möglichkeit das Abspielen zu starten oder zu stoppen, ein Lied vor oder
zurück zu springen. Ebenso kann angezeigt werden wie viel vom aktuellen Lied schon abgespielt wurde
und die Lautstärke geregelt werden.

Für Start/Stop, Lied vor und zurück kommen :ref:`Buttons <tile-component-button>` zum Einsatz und für die Lautstärke ein
:ref:`Slider <tile-component-slider>`.

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
            <caption>Ohne Hintergrundbild</caption>
        </screenshot>
        <screenshot name="cv-media-player-bg" margin="0 10 10 0">
            <data address="1/4/0">Kings of Leon</data>
            <data address="1/4/1">Sex is on Fire</data>
            <data address="1/4/3">1</data>
            <data address="1/4/5">180</data>
            <data address="1/4/4">120</data>
            <data address="1/4/6">75</data>
            <data address="1/4/7">resource/icons/comet_icon_512x512_ff8000.png</data>
            <caption>Mit Hintergrundbild</caption>
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

Das Widget nutzt folgende Adressen:

========================= ================================
Song-Titel                ``slot="titleAddress"``
Album / Künstler          ``slot="subtitleAddress"``
Lied zurück               ``slot="previousAddress"``
Start / Stop              ``slot="playPauseAddress"``
Aktuelle Spielzeit        ``slot="playTimeAddress"``
Gesamtspielzeit           ``slot="durationAddress"``
Lied vor                  ``slot="nextAddress"``
Lautstärke                ``slot="volumeAddress"``
Widget                    ``slot="tileAddress"``
========================= ================================

Die Adressen für das Widget selbst ``slot="tileAddress"`` sind optional und ermöglichen mittels des
:ref:`target <tile-element-address-target>`-Attributs einige Besonderheiten.

So kann z.B. die Sichtbarkeit des Widgets gesteuert werden, um es auszublenden, wenn der Musik-Player gerade nicht
zur Verfügung steht. Wie in dem Beispiel zu sehen ist würde das Widget entfernt, wenn auf der Address "1/4/8" der Wert "0" empfangen würde.
Wird der Wert "1" empfangen wird es wieder sichtbar. Dieses Verhalten wird durch ``target="show-exclude"`` aktiviert.

Ebenso ist es möglich z.B. das Cover des aktuell gespielten Songs als Hintergrundbild der Kachel zu zeigen.
Dazu dient dieser Eintrag aus dem Beispiel ``<cv-address slot="tileAddress" transform="DPT:24.001" mode="read" target="background-image">1/4/7</cv-address>``.
Auf der Adresse muss dazu entweder die URL des Bilds geliefert werden unter der die CometVisu dieses Bild laden kann, oder
das Bild direkt als `Data-URI <https://de.wikipedia.org/wiki/Data-URL>`_. Letztes wird mit den Beschränkungen bgzl. der
Datenmenge, die auf dem KNX-Bus gesendet werden können mit dem KNX-Backend wohl nicht möglich sein, aber z.B. das
openHAB-Backend kann solche Daten ausliefern.


Erlaubte Attribute im Media-Player-Element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. parameter-information:: cv-media-player tile


Erlaubte Kind-Elemente und deren Attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. elements-information:: cv-media-player tile
