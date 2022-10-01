(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractBasicWidget": {
        "construct": true,
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "qx.event.Registration": {},
      "qx.event.message.Bus": {},
      "cv.Application": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Timeout.js 
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
   * This plugins jumps back to a defined page after a given timeout period
   *
   * @author Carsten Tschach (Carsten@Tschach.com)
   * @since 2012
   */
  qx.Class.define('cv.plugins.Timeout', {
    extend: cv.ui.structure.pure.AbstractBasicWidget,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      cv.ui.structure.pure.AbstractBasicWidget.constructor.call(this, props);
      this.__P_16_0 = 0;

      this.__P_16_1();
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       * @return {Map} extracted data from config element as key/value map
       */
      parse: function parse(xml, path, flavour, pageType) {
        return cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'target': {
            'default': 'id_'
          },
          'time': {
            'default': 600,
            transform: parseFloat
          },
          'debug': {
            'default': false,
            transform: function transform(value) {
              return value === 'true';
            }
          }
        };
      }
    },

    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      target: {
        check: 'String',
        init: 'id_'
      },
      time: {
        check: 'Number',
        init: 600
      },
      debug: {
        check: 'Boolean',
        init: false
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_16_0: null,
      __P_16_2: null,
      __P_16_3: null,
      __P_16_4: null,
      __P_16_5: null,
      __P_16_1: function __P_16_1() {
        if (this.isDebug()) {
          this.debug('Timeout Set to : ' + this.getTime());
          this.debug('Target Page: ' + this.getTarget());
        }

        var deltaT = this.getTime() * 100;
        this.__P_16_5 = new qx.event.Timer(deltaT);

        this.__P_16_5.addListener('interval', this.timeoutTrigger, this);

        this.__P_16_5.start(); // Reset Counter on every interaction


        qx.event.Registration.addListener(window, 'useraction', this._onUserAction, this); // Keep track of current page

        qx.event.message.Bus.subscribe('path.pageChanged', function (ev) {
          var path = ev.getData();
          this.__P_16_2 = path;
          this.__P_16_3 = document.querySelector('#' + path + ' div > h1').innerText;
          this.__P_16_0 = 0;
          /* We could trun on and off the above binds if we are already on the right page
            if (timeoutCurrentPage === timeoutTargetPage) {
           console.log("XXXXXX TIMEOUT: Scrolled to Target Page: " + path);
           } else {
           console.log("XXXXXX TIMEOUT: Scrolled to: " + path + " ("+timeoutTargetPage + ")");
           }
           */
        }, this);
      },
      _onUserAction: function _onUserAction() {
        this.__P_16_0 = 0;
      },
      timeoutTrigger: function timeoutTrigger() {
        if (this.isDebug()) {
          this.debug('TIMEOUT: Got Trigger (' + this.__P_16_0 + ')');
        }

        this.__P_16_0++;
        this.__P_16_4 = this.getTarget();

        if (this.__P_16_0 >= 10) {
          this.__P_16_0 = 0;
          var pageNavigationHandler = cv.Application.structureController;

          if (this.__P_16_2 !== this.__P_16_4 && this.__P_16_3 !== this.__P_16_4) {
            if (this.isDebug()) {
              this.debug('TIMEOUT: Got Timeout - Now Goto Page ' + this.__P_16_4);
            }

            pageNavigationHandler.scrollToPage(this.__P_16_4);
            pageNavigationHandler.getCurrentPage().getDomElement().scrollTop = 0; //templateEngine.updateTopNavigation();
          } else {
            if (this.isDebug()) {
              this.debug('TIMEOUT: Already on page ' + this.__P_16_4);
            }

            pageNavigationHandler.getCurrentPage().getDomElement().scrollTop = 0;
          }
        }
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_16_5");
    },
    defer: function defer(statics) {
      cv.parser.pure.WidgetParser.addHandler('timeout', cv.plugins.Timeout);
      cv.ui.structure.WidgetFactory.registerClass('timeout', statics);
    }
  });
  cv.plugins.Timeout.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Timeout.js.map?dt=1664613597799