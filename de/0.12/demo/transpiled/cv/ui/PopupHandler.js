(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.Popup": {},
      "cv.core.notifications.Router": {},
      "qx.event.message.Bus": {},
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* PopupHandler.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
   * Handles all popups
   */
  qx.Class.define('cv.ui.PopupHandler', {
    type: "static",

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      popups: {},
      configs: {},
      init: function init() {
        this.addPopup(new cv.ui.Popup("unknown"));
        this.addPopup(new cv.ui.Popup("info"));
        this.addPopup(new cv.ui.Popup("warning"));
        this.addPopup(new cv.ui.Popup("error")); // register to topics

        cv.core.notifications.Router.getInstance().registerMessageHandler(this, {
          'cv.config.error': {
            type: "error",
            icon: "message_attention"
          },
          'cv.error': {
            type: "error",
            icon: "message_attention"
          },
          'cv.client.connection': {
            type: "error",
            icon: "message_attention",
            deletable: true
          }
        });
        qx.event.message.Bus.subscribe("path.pageLeft", this._onPageChanged, this);
      },

      /**
       * close all popups (except errors) for the page that has been left just now.
       * @param ev {Event}
       */
      _onPageChanged: function _onPageChanged(ev) {
        Object.keys(this.popups).filter(function (type) {
          if (type !== 'error') {
            var popup = this.popups[type];
            var domElement = popup.getCurrentDomElement();

            if (domElement && domElement.$$page === ev.getData()) {
              this.removePopup(popup);
            }
          }
        }, this);
      },
      handleMessage: function handleMessage(message, config) {
        var popupConfig = {
          title: message.title,
          content: message.message,
          closable: config.deletable || message.deletable,
          icon: message.icon || config.icon,
          iconClasses: message.iconClasses,
          actions: message.actions,
          progress: message.progress,
          type: "notification"
        }; // popups are always unique

        if (cv.core.notifications.Router.evaluateCondition(message)) {
          this.showPopup(config.type, popupConfig);
        } else {
          var popup = this.getPopup(config.type);

          if (!popup.isClosed()) {
            popup.close();
          }
        }
      },

      /**
       * Show a popup of type "type". The attributes is an type dependent object
       *
       * @param type {String} popup type
       * @param attributes {Map} popup configuration (content, title, stylings etc)
       * @return {cv.ui.Popup} The popup
       */
      showPopup: function showPopup(type, attributes) {
        var popup = this.getPopup(type); // if (!popup.isClosed()) {
        //   popup.close();
        // }

        popup.create(attributes);
        return popup;
      },

      /**
       * Remove the popup.
       * @param popup {cv.ui.Popup} popup returned by showPopup()
       */
      removePopup: function removePopup(popup) {
        if (popup instanceof cv.ui.Popup) {
          popup.close();
        } else {
          popup.parentNode.removeChild(popup);
        }
      },

      /**
       * Add a popup to the internal list
       * @param object {cv.ui.Popup} the popup
       */
      addPopup: function addPopup(object) {
        qx.core.Assert.assertInstance(object, cv.ui.Popup);
        this.popups[object.getType()] = object;
      },

      /**
       * Retrieve a popup by name
       * @param name {String} name of the popup
       * @return {Object}
       */
      getPopup: function getPopup(name) {
        var p = this.popups[name];

        if (p === undefined) {
          return this.popups.unknown;
        }

        return this.popups[name];
      },

      /**
       * Figure out best placement of popup.
       * A preference can optionally be passed. The position is that of the numbers
       * on the numeric keypad. I.e. a value of "6" means centered above the anchor.
       * A value of "0" means centered to the page
       *
       * @param anchor {Map}
       * @param popup {Map}
       * @param page {Map}
       * @param preference {Number}
       * @return {Map}
       */
      placementStrategy: function placementStrategy(anchor, popup, page, preference) {
        var position_order = [8, 2, 6, 4, 9, 3, 7, 1, 5, 0];

        if (preference !== undefined) {
          position_order.unshift(preference);
        }

        for (var pos in position_order) {
          var xy = {};

          switch (position_order[pos]) {
            case 0:
              // page center - will allways work
              return {
                x: (page.w - popup.w) / 2,
                y: (page.h - popup.h) / 2
              };

            case 1:
              xy.x = anchor.x - popup.w;
              xy.y = anchor.y + anchor.h;
              break;

            case 2:
              xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
              xy.y = anchor.y + anchor.h;
              break;

            case 3:
              xy.x = anchor.x + anchor.w;
              xy.y = anchor.y + anchor.h;
              break;

            case 4:
              xy.x = anchor.x - popup.w;
              xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
              break;

            case 5:
              xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
              xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
              break;

            case 6:
              xy.x = anchor.x + anchor.w;
              xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
              break;

            case 7:
              xy.x = anchor.x - popup.w;
              xy.y = anchor.y - popup.h;
              break;

            case 8:
              xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
              xy.y = anchor.y - popup.h;
              break;

            case 9:
              xy.x = anchor.x + anchor.w;
              xy.y = anchor.y - popup.h;
              break;
          } // test if that solution is valid


          if (xy.x >= 0 && xy.y >= 0 && xy.x + popup.w <= page.w && xy.y + popup.h <= page.h) {
            return xy;
          }
        }

        return {
          x: 0,
          y: 0
        }; // sanity return
      }
    },
    defer: function defer(statics) {
      // qx.event.message.Bus.subscribe("setup.dom.finished", statics.init, statics);
      statics.init();
    }
  });
  cv.ui.PopupHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PopupHandler.js.map?dt=1591014035713