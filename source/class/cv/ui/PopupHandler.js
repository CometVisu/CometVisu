/* PopupHandler.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @class cv.ui.PopupHandler
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

    init: function() {
      this.addPopup('unknown', {
        /**
         * Description
         * @method create
         * @param {} attributes
         * @return ret_val
         */
        create: function (attributes) {
          var reposition = false;
          var ret_val = qx.bom.Html.clean(['<div class="popup" style="display:none"><div class="popup_close">X</div></div><div class="popup_background" style="display:none" />'],
            null, qx.bom.Selector.query('body')[0])[0];
          qx.bom.element.Class.add(ret_val, this.type);

          if (attributes.title) {
            var head = qx.bom.Html.clean(['<div class="head" />'], null, qx.bom.Selector(".popup", ret_val)[0])[0];
            qx.bom.Html.clean([attributes.title], null, head)[0];
          }

          if (attributes.content) {
            var content = qx.bom.Html.clean(['<div class="main" />'], null, qx.bom.Selector(".popup", ret_val)[0])[0];
            qx.bom.Html.clean([attributes.content], null, content)[0];
          }

          if (attributes.width) {
            qx.bom.element.Style.add(ret_val, "width", attributes.width);
            reposition = true;
          }

          if (attributes.height) {
            qx.bom.element.Style.add(ret_val, "height", attributes.height);
            reposition = true;
          }

          var anchor = {x: -1, y: -1, w: 0, h: 0};
          var align;
          if (attributes.position) {
            if (attributes.position.offset) {
              var offset = attributes.position.offset();
              anchor.x = offset.left;
              anchor.y = offset.top;
              anchor.w = attributes.position.width();
              anchor.h = attributes.position.height();
            } else {
              if (attributes.position.hasOwnProperty('x')) anchor.x = attributes.position.x;
              if (attributes.position.hasOwnProperty('y')) anchor.y = attributes.position.y;
              if (attributes.position.hasOwnProperty('w')) anchor.w = attributes.position.w;
              if (attributes.position.hasOwnProperty('h')) anchor.h = attributes.position.h;
              if (anchor.w == 0 && anchor.h == 0) align = 5;
            }
          }
          if (attributes.align !== undefined) align = attributes.align;
          var placement = this.placementStrategy(
            anchor,
            {w: qx.bom.Dimension.getWidth(ret_val), h: qx.bom.Dimension.getHeight(ret_val)},
            {w: qx.bom.ViewPort.getWidth(), h: qx.bom.ViewPort.getHeight()},
            align
          );

          qx.bom.element.Style.add(ret_val, 'left', placement.x);
          qx.bom.element.Style.add(ret_val, 'top', placement.y);

          qx.event.Registration.addListener(ret_val, 'close', this.close, this);
          qx.event.Registration.addListener(ret_val, 'tap', function () {
            // note: this will call two events - one for the popup itself and
            //       one for the popup_background.
            qx.event.Registration.fireEvent(ret_val, 'close');
          }, this);
          qx.event.Registration.addListener(qx.bom.Selector.query(".popup_close", ret_val), 'tap', function () {
            // note: this will call two events - one for the popup itself and
            //       one for the popup_background.
            qx.event.Registration.fireEvent(ret_val, 'close');
          });

          qx.bom.element.Style.add(ret_val, 'display', 'block');
          qx.bom.element.Class.add(qx.bom.Selector.query('#centerContainer')[0], 'inactiveMain');
          return ret_val;
        },
        /**
         * Description
         * @method close
         * @param {} event
         */
        close: function (event) {
          qx.bom.element.Class.remove(qx.bom.Selector.query('#centerContainer')[0], 'inactiveMain');
          qx.dom.Element.remove(event.getTarget());
        }
      });

      this.addPopup('info', qx.lang.Object.clone(this.getPopup('unknown'), true));
      this.addPopup('warning', qx.lang.Object.clone(this.getPopup('unknown'), true));
      this.addPopup('error', qx.lang.Object.clone(this.getPopup('unknown'), true));
    },

    /**
     * Show a popup of type "type". The attributes is an type dependend object
     * This function returnes a jQuery object that points to the whole popup, so
     * it's content can be easily extended
     */
    showPopup: function (type, attributes) {
      return this.getPopup(type).create(attributes);
    },

    /**
     * Remove the popup. The parameter is the element returned by the
     * showPopup function
     */
    removePopup: function (popup) {
      qx.dom.Element.remove(popup);
    },

    /**
     * Add a popup to the internal list
     * @param name {String} name of the popup
     * @param object {Object} the popup
     */
    addPopup: function (name, object) {
      this.popups[name] = object;
      this.popups[name].type = name;
    },

    /**
     * Retrieve a popup by name
     * @param name {String} name of the popup
     * @returns {Object}
     */
    getPopup: function(name) {
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
     * @param anchor
     * @param popup
     * @param page
     * @param preference
     * @return {Map}
     */
    placementStrategy: function( anchor, popup, page, preference ) {
      var position_order = [8, 2, 6, 4, 9, 3, 7, 1, 5, 0];
      if (preference !== undefined) position_order.unshift(preference);

      for (var pos in position_order) {
        var xy = {};
        switch (position_order[pos]) {
          case 0: // page center - will allways work
            return {x: (page.w - popup.w) / 2, y: (page.h - popup.h) / 2};

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
        }

        // test if that solution is valid
        if (xy.x >= 0 && xy.y >= 0 && xy.x + popup.w <= page.w && xy.y + popup.h <= page.h)
          return xy;
      }

      return {x: 0, y: 0}; // sanity return
    }
  },

  defer: function(statics) {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", statics.init, this);
  }
});