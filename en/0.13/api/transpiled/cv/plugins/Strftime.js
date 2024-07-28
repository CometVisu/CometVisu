(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "cv.util.ScriptLoader": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Strftime.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * This plugins integrates formatted date and clock strings into based on strftime.
   *
   * @author Michael Hausl [michael at hausl dot com]
   * @since 0.8.0
   * @asset(plugins/strftime/strftime.css)
   */
  qx.Class.define('cv.plugins.Strftime', {
    extend: cv.ui.structure.pure.AbstractWidget,
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      format: {
        check: 'String',
        init: '%c'
      },
      locale: {
        check: 'String',
        nullable: true
      }
    },
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      __P_17_0: {},
      __P_17_1: 0,
      __P_17_2: null,
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       */
      parse: function parse(xml, path, flavour, pageType) {
        return cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          lang: {
            target: 'locale'
          },
          format: {
            "default": '%c'
          }
        };
      },
      uniqid: function uniqid() {
        return this.__P_17_1++;
      },
      startTimer: function startTimer() {
        if (!this.__P_17_2) {
          this.__P_17_2 = new qx.event.Timer(1000);
        }
        if (!this.__P_17_2.isEnabled()) {
          this.__P_17_2.start();
        }
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_17_3: false,
      __P_17_4: null,
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="strftime_value"></div>';
      },
      // overridden
      getValueElement: function getValueElement() {
        if (!this.__P_17_4) {
          this.__P_17_4 = this.getDomElement().querySelector('.strftime_value');
        }
        return this.__P_17_4;
      },
      // overridden
      _onDomReady: function _onDomReady() {
        cv.plugins.Strftime.startTimer();
        cv.plugins.Strftime.__P_17_2.addListener('interval', this.__P_17_5, this);
      },
      __P_17_5: function __P_17_5() {
        var elem = this.getValueElement();
        var d = new Date();
        d.locale = this.getLocale();
        elem.innerText = d.strftime(this.getFormat());
      }
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      cv.plugins.Strftime.__P_17_2.removeListener('interval', this.__P_17_5, this);
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addStyles('plugins/strftime/strftime.css');
      cv.parser.pure.WidgetParser.addHandler('strftime', statics);
      cv.ui.structure.WidgetFactory.registerClass('strftime', statics);

      // extend locales by German and French
      Date.ext.locales.de = {
        a: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        A: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        b: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        B: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        c: '%a %d %b %Y %T %Z',
        p: ['', ''],
        P: ['', ''],
        x: '%d.%m.%Y',
        X: '%T'
      };
      Date.ext.locales.fr = {
        a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        A: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        b: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
        B: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        c: '%a %d %b %Y %T %Z',
        p: ['', ''],
        P: ['', ''],
        x: '%d.%m.%Y',
        X: '%T'
      };
    }
  });
  cv.plugins.Strftime.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Strftime.js.map?dt=1722153800217