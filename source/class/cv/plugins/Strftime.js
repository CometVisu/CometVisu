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
    __elements: {},
    __internalCounter: 0,
    __timer: null,

    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse(xml, path, flavour, pageType) {
      return cv.parser.pure.WidgetParser.parseElement(
        this,
        xml,
        path,
        flavour,
        pageType,
        this.getAttributeToPropertyMappings()
      );
    },

    getAttributeToPropertyMappings() {
      return {
        lang: { target: 'locale' },
        format: { default: '%c' }
      };
    },

    uniqid() {
      return this.__internalCounter++;
    },

    startTimer() {
      if (!this.__timer) {
        this.__timer = new qx.event.Timer(1000);
      }
      if (!this.__timer.isEnabled()) {
        this.__timer.start();
      }
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __timerStarted: false,
    __valueElement: null,

    _getInnerDomString() {
      return '<div class="strftime_value"></div>';
    },

    // overridden
    getValueElement() {
      if (!this.__valueElement) {
        this.__valueElement =
          this.getDomElement().querySelector('.strftime_value');
      }
      return this.__valueElement;
    },

    // overridden
    _onDomReady() {
      this.self(arguments).startTimer();
      this.self(arguments).__timer.addListener('interval', this.__update, this);
    },

    __update() {
      const elem = this.getValueElement();
      const d = new Date();
      d.locale = this.getLocale();
      elem.innerText = d.strftime(this.getFormat());
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    this.self(arguments).__timer.removeListener(
      'interval',
      this.__update,
      this
    );
  },

  defer(statics) {
    const loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/strftime/strftime.css');
    cv.parser.pure.WidgetParser.addHandler('strftime', statics);
    cv.ui.structure.WidgetFactory.registerClass('strftime', statics);

    // extend locales by German and French
    Date.ext.locales.de = {
      a: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      A: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag'
      ],

      b: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez'
      ],

      B: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
      ],

      c: '%a %d %b %Y %T %Z',
      p: ['', ''],
      P: ['', ''],
      x: '%d.%m.%Y',
      X: '%T'
    };

    Date.ext.locales.fr = {
      a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      A: [
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi'
      ],

      b: [
        'jan',
        'fév',
        'mar',
        'avr',
        'mai',
        'jun',
        'jui',
        'aoû',
        'sep',
        'oct',
        'nov',
        'déc'
      ],

      B: [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
      ],

      c: '%a %d %b %Y %T %Z',
      p: ['', ''],
      P: ['', ''],
      x: '%d.%m.%Y',
      X: '%T'
    };
  }
});
