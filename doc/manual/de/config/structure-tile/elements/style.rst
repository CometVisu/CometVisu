.. _tile-element-style:

CSS-Style
=========

Beschreibung
------------

Das Style-Element ermöglicht die direkte Einbettung von CSS-Regeln.
So lassen sich auf einfache Weise z.B. die über CSS-Variable definierten
Farben manipulieren und die UI mit nur wenigen Zeilen auf die persönlichen
Bedürfnisse anzupassen.

.. code:: xml

    <cv-meta>
        <style>
            :root {
                --primaryColor: #4869aa;
            }
        </style>
    </cv-meta>


Das ``<style>``-Element ist ein Standard `HTML-Style Element <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style>`_.
Um zu sehen welche Variablen das Tile-Design benutzt und welche Auswirkungen es hat, wenn man diese ändert, empfiehlt
es sich die Entwicklertools des Browsers zu öffnen und dort mit den Werte zu spielen.
