.. _customizing:

Anpassungen vornehmen
=====================

Die CometVisu kann auf viele verschiedene Weisen an die eigenen Bedürfnisse angepasst werden. Im Folgenden
werden die verschiedenen Möglichkeiten - sortiert nach Komplexitätsgrad - im Detail beschrieben.

===   =============================    ================    ===================================================
\     Anpassung                        Veränderung          Beschreibung
===   =============================    ================    ===================================================
1.    Eigene CSS-Regeln                Optisch             Überschreiben der vorhandenen CSS-Regeln eines Designs durch das Laden von zusätzlichen CSS-Dateien.
2.    Eigene Icons einbinden           Optisch             Neben den mitgelieferten Icons können eigene Icons über die Konfigurationsdatei hinzugefügt werden.
3.    Widgets durch ``class``          Optisch             Viele Widgets können individualisiert werden durch Hinzufügen des ``class`` Attributs und dazu passenden CSS-Regeln.
4.    Eigenes Design schreiben         Optisch             Sollten zusätzliche CSS-Regeln nicht ausreichen, kann ein neues Design erstellt werden.
5.    Eigene Widgets schreiben         Inhaltlich          Hinzufügen neuer Widgets durch Plugins.
6.    Eigene Struktur schreiben        Inhaltlich          Die Umwandlung der Konfigurationsdateien in HTML-Code, kann durch erstellen einer neuen Struktur komplett verändert werden.
===   =============================    ================    ===================================================


.. _custom_cssrules:

Vorhandenes Design verändern
----------------------------

Die vorhandenen Designs können durch eigene CSS-Regeln angepasst werden. Im Meta-Bereich der Konfigurationsdatei
können dazu Pfade zu CSS-Dateien angegeben werden, die zusätzlich zu den CSS-Dateien des CometVisu-Designs geladen werden.

Die entsprechende CSS-Dateien können über den :ref:`Manager <manager>` hochgeladen werden,
sofern man keinen Zugriff auf den Server hat auf dem die CometVisu liegt.


.. code-block:: xml
    :caption: Auszug einer Konfigurationsdatei, die 2 zusätzliche CSS-Dateien lädt:

    <pages... design="metal">
        <meta>
            <files>
                <file type="css">resource/config/media/my-custom-style.css</file>
                <file type="css">resource/config/media/my-other-custom-style.css</file>
                ...
            </files>
            ...
        </meta>
        ...
    </pages>

.. HINT::
    In früheren CometVisu-Versionen (<= 0.10.x) mussten die CSS-Regeln in die ``custom.css`` Datei des jeweiligen
    Designs eingetragen werden. Auch wenn dies weiterhin funktioniert, wird empfohlen diese Regeln in eine neue Datei zu kopieren
    und über den hier beschriebenen Weg einzubinden. Der alte Weg wird nur aus Gründen der Kompatibilität aufrecht erhalten und
    in zukünftigen Versionen entfernt werden.


Eigene Icons einbinden
----------------------

Mit dieser Option wird der Name des Icons definiert, welches sich unter dem in ``uri`` angegebenen Verzeichnis befindet.
Auf die so definierten Icons kann dann im weiteren Verlauf über den einfacher zu merkenden Namen zugegriffen werden.
Die Verzeichnisangabe ist im Beispiel relativ zur CV Installation.
Hier wurden vorher die Icons in einem eigenen Unterverzeichnis abgelegt.

.. code-block:: xml
    :caption: Hinzufügen eines zusätzlichen Icons

    <pages...>
        <meta>
            ...
            <icons>
                <icon-definition name="Icon1" uri="./resource/config/media/icon1.png"/>
            </icons>
            ...
        </meta>
        ...
        <text>
          <label><icon name="Icon1"></icon></label>
        </text>
    </pages>

.. _custom_css:

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
                <file type="css">resource/config/media/my-custom-style.css</file>
            </files>
            ...
        </meta>
        <page>
            <switch class="fancy">...</switch>
        </page>
    </pages>

.. code-block:: css
    :caption: CSS-Regeln für das Switch-Widget in der `resource/config/media/my-custom-style.css` Datei

    .switch.custom_fancy {
        color: pink;
    }


Eigenes Design schreiben
------------------------

Neben den bereits beschriebenen Möglichkeiten der optischen Anpassungen, besteht als weitergehende Möglichkeit ein
komplett neues Design zu schreiben.

Ein CometVisu Design besteht mindestens aus folgenden Dateien:

* *basic.css*: Haupt CSS Datei mit allen Regeln, die für das Design benötigt werden
* *mobile.css*: CSS-Regeln für Mobilgeräte mit kleinem Bildschirm (kann leer sein)
* *design_setup.js*: Optionale Javascript Datei, die Anpassungen vornehmen kann die über CSS nicht möglich sind (kann leer sein)

.. HINT::
    Um ein neues Design entwickeln und testen zu können, ist die Source-Version der CometVisu erforderlich.
    Diese erhält man in dem man das Git-Repository klont, `./generate source` ausführt (einmalig nach klonen und jedesmal,
    wenn eine neue Datei für das Design hinzugefügt wird).


.. _custom_plugins:

Eigene Widgets schreiben über Plugins
-------------------------------------

Neue Widgets können über Plugins hinzugefügt werden. Dies ist ein guter Einstiegspunkt in die CometVisu Entwicklung,
da man die Möglichkeiten des Systems kennen lernt. Als Dokumentation der Möglichkeiten eines eigenen Widgets kann der
Source-Code der vorhandenen Plugins dienen. In diesem Kapitel soll es eher darum gehen, auf welche Wege man ein solches Plugin
in die CometVisu einbinden kann.

Hier wird zwischen zwei Wegen unterschieden, wie Plugins in die CometVisu eingebunden werden.

1. **Eingebettete Plugins**: Plugins, die mit der CometVisu ausgeliefert werden und deren Build-Prozess mit durchlaufen

    *Vorteile:*

    * Sind Teil der CometVisu und stehen somit allen Benutzern zur Verfügung. Kompatibilität mit zukünftigen CometVisu-Versionen ist in der Regel gewährleistet.
    * Der Code wird beim Erstellen des CometVisu-Releases optimiert und minifiziert, was die Ladezeit verkürzt
    * Die Benutzung weiterer Hilfsklassen aus dem Qooxdoo-Framework ist problemlos möglich.
    * Teil der Versionsverwaltung Git: alle Änderungen am Code werden erfasst und können bei Fehler wieder rückgängig gemacht werden.

    *Nachteile:*

    * Zusätzliche Konfiguration nötig, damit die Plugins mit der CometVisu ausgeliefert werden können
    * Zur Entwicklung wird die Source-Version der CometVisu benötigt
    * Git-Kenntnisse erforderlich

2. **Eigenständige Plugins**: Hierbei handelt es sich um Javascript-Dateien, die von der CometVisu beim Initialisieren nachgeladen werden

    *Vorteile:*

    * Einfache Einbindung
    * Kann mit einem Release der CometVisu benutzt und entwickelt werden

    *Nachteile:*

    * Sind nicht Teil der CometVisu, der Benutzer muss sich selbst um Kompatibilität mit zukünftigen CometVisu-Versionen kümmern.
    * Keine Code-Optimierungen möglich
    * Zusätzliche Abhängigkeiten zu Qooxdoo-Klassen nicht möglich (was nicht Teil der CometVisu ist, kann nicht benutzt werden)


Aufbau eines Widgets
~~~~~~~~~~~~~~~~~~~~

Um ein neues Widget hinzuzufügen werden drei Dinge benötigt:

1. Ein *Parser*, der die Widgetdefinition aus der XML-Konfigurationsdatei auslesen kann
2. Eine *Widgetklasse*, die die Daten vom Parser erhält und daraus HTML-Code erzeugt, der in die GUI eingebunden wird.
   Außerdem wird in der Klasse alles behandelt, was das Widget benötigt. Dazu gehört z.B. das Erkennen von Benutzerinteraktionen
   und daraus resultierenden Statusupdates, die zum Backend gesendet werden, oder aber auch das Darstellen von Statusupdates, die
   vom Backend empfangen werden.
3. Eine *XSD-Schema* Definition, die die Struktur des Widgets in der XML-Konfigurationsdatei beschreibt (bei Eigenständigen Plugins nicht erforderlich)

Jedes Widget in der CometVisu besteht aus diesen drei Dingen. Bei den Standard-Widgets sind der *Parser* und die *Widgetklasse* in zwei verschiedenen
Dateien aufgeteilt, bei Plugins ist beides in einer Datei. Die Schemadefinitionen finden sich alle in der ``visu_config.xsd`` Datei.

.. HINT::
    Die Aufteilung der *Parser* und *Widgetklassen* in zwei Dateien bietet den Vorteil, dass es so einfacher möglich ist, die Widgetklassen auszutauschen.
    Alle Standard-Widgetklassen sind zusammengefasst in einer Struktur namens ``Pure``. Es besteht die Möglichkeit diese Struktur durch eine andere auszutauschen.
    Damit man in einem solchen Fall nicht auch alle Parser neu programmieren muss, wurde diese Trennung vorgenommen.


Beispielplugin
~~~~~~~~~~~~~~

Ein einfaches Beispiel, für ein neuen Widget, welches per Plugin eingebunden werden kann ist in der ``resource/config/structure_custom.js`` zu finden.

.. code-block:: javascript

    qx.Class.define('cv.ui.structure.pure.Headline', {
      extend: cv.ui.structure.AbstractWidget,

      statics: {
        // parse element from visu_config*.xml
        parse: function (xml, path, flavour, pageType) {
          var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
          data.content = xml.textContent;
          return data;
        }
      },

      properties: {
        content: {
          check: 'String',
            init: ''
        }
      },

      members: {
        // generate the DOM string to be added to the GUI
        getDomString: function () {
          return '<h1 ' + (this.getClasses() ? 'class="'+this.getClasses()+'"' : '') + '>' + this.getContent() + '</h1>';
        }
      },

      // this function is executed when this file is loaded
      defer: function(statics) {
        // register the parser
        cv.parser.WidgetParser.addHandler("headline", cv.ui.structure.pure.Headline);
        // register the widget
        cv.ui.structure.WidgetFactory.registerClass("headline", statics);
      }
    });


Diese Datei stellt ein Widget zur Verfügung, welches der GUI ein Überschriftelement mit beliebigem Text hinzufügt.
Es kann in der Konfigurationsdatei als ``<headline>...</headline>`` benutzt werden. Wichtig ist hier, dass das
Widget in der Konfigurationsdatei immer in ein ``<custom>`` Element eingebettet wird. Da für dieses eigenständige
Plugin keine Schema-Definition existiert, ist dieser zusätzliche Schritt nötig, damit die Konfigurationsdatei von
einem Schema-Validator nicht als ungültig markiert wird.
Um dieses Plugin benutzen zu können, muss die Datei geladen werden.

.. code-block:: xml

    <pages...>
        <meta>
            <files>
                <file type="js" content="plugin">resource/config/structure_custom.js</file>
                ...
            </files>
            ...
        </meta>
        ...
        <custom>
            <headline>Mein neues Widget!</headline>
        </custom>
    </pages>

Damit die CometVisu erkennt, dass die Datei ein Eigenständiges Plugin bereitstellt muss diese mit den Attributen
``type="js" content="plugin"`` angegeben werden. Geschieht dies nicht, kann es passieren, dass die Datei zu einem falschen
Zeitpunkt geladen wird und dann aufgrund eines Fehlers nicht nutzbar ist.


Eigene Struktur schreiben
-------------------------

Wenn der von der CometVisu erzeugte HTML-Code geändert werden soll, muss man eine neue Struktur schreiben.
Bisher existiert nur die ``pure``-Struktur in der CometVisu unter dem Pfad ``cv.ui.structure.pure``. Darin sind
alle Widgetklassen zu finden, die die CometVisu zur Verfügung stellt. Diese sind dafür verantwortlich aus einer
von den *Parsern* ausgelesenen Konfigurationsdatei HTML-Code zu generieren.

Durch eine neue Struktur ändert sich der erzeugte HTML-Code, daher muss man zusätzlich auch immer ein neues Design für diese
Struktur schreiben.

.. HINT::
  Das Schreiben einer neuen Struktur ist zwar vorgesehen, wurde aber bisher noch nie umgesetzt.
  Daher ist es durchaus möglich, dass hier weitere Vorarbeiten erforderlich sind, um die Strukturen einfach austauschen
  zu können.
