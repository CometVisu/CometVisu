.. _customizing:

Anpassungen vornehmen
=====================

Die CometVisu kann auf viele verschiedene Weisen an die eigenen Bedürfnisse angepasst werden. Im Folgenden
werden die verschiedenen Möglichkeiten - sortiert nach Komplexitätsgrad - im Detail beschrieben.

===   =============================    ================    ===================================================
\     Anpassung                        Veränderung          Beschreibung
===   =============================    ================    ===================================================
1.    Eigene CSS-Regeln                Optisch             Überschreiben der vorhandenen CSS-Regeln eines Designs durch das Laden von zusätzlichen CSS-Dateien
2.    Widgets durch ``class``          Optisch             Viele Widgets können individualisiert werden durch Hinzufügen des ``class`` Attributs und dazu passenden CSS-Regeln
3.    Eigene Widgets schreiben         Inhaltlich          Hinzufügen neuer Widgets durch Plugins.
4.    Eigenes Design schreiben         Optisch             Sollten zusätzliche CSS-Regeln nicht ausreichen, kann ein neuen Design erstellt werden
5.    Eigene Struktur schreiben        Inhaltlich          Die Umwandlung der Konfigurationsdateien in HTML-Code, kann durch erstellen einer neuen Struktur komplett verändert werden
===   =============================    ================    ===================================================

Vorhandenes Design verändern
----------------------------

Die vorhandenen Designs können durch eigene CSS-Regeln angepasst werden. Im Meta-Bereich der Konfigurationsdatei
können dazu Pfade zu CSS-Dateien angegben werden, die zusätzlich zu den CSS-Dateien des CometVisu-Designs geladen werden.

.. code-block:: xml
    :caption: Auszug einer Konfigurationsdatei, die 2 zusätzliche CSS-Dateien lädt:

    <pages... design="metal">
        <meta>
            <files>
                <file type="css">resource/my-custom-style.css</file>
                <file type="css">resource/my-other-custom-style.css</file>
                ...
            </files>
            ...
        </meta>
        ...
    </pages>

Einzelne Widgets durch CSS-Klassen verändern
--------------------------------------------

Bei vielen Widgets ist es möglich in der Konfigurationsdatei ein ``class`` Attribut anzugeben, welches dann für eigene
CSS-Regeln benutzt werden kann. Hierdurch hat man die Möglichkeit etwas gezielter einzelne Widgets optisch zu verändern.

.. HINT::
    Der Wert des in der Konfigurationsdatei angegebenen ``class`` Attribut wird mit einem ``custom_`` Präfix versehen.
    Also aus ``<switch class="fancy"..`` wird der HTML-Code ``<div class="switch custom_fancy"...``


.. code-block:: xml
    :caption: Ein individualisiertes Switch-Widget

    <pages... design="metal">
        <meta>
            <files>
                <file type="css">resource/my-custom-style.css</file>
            </files>
            ...
        </meta>
        <page>
            <switch class="fancy">...</switch>
        </page>
    </pages>

.. code-block:: css
    :caption: CSS-Regeln für das Switch-Widget in der `resource/my-custom-style.css` Datei

    .switch.custom_fancy {
        color: pink;
    }
