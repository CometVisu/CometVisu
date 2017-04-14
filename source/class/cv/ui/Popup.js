/* Popup.js 
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


//noinspection JSUnusedGlobalSymbols
qx.Class.define('cv.ui.Popup', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(type) {
    if (type) {
      this.setType(type);
    }
    this.__deactivateSelectors = ['#top', '#navbarTop', '#centerContainer', '#navbarBottom', '#bottom'];
  },

  /*
  ******************************************************
    EVENTS
  ******************************************************
  */
  events: {
    "close": "qx.event.type.Event"
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    type: {
      check: "String",
      init: ""
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __counter: 0,
    __deactivateSelectors: null,
    __domElement: null,

    getCurrentDomElement: function() {
      return this.__domElement;
    },

    /**
     * Create the popup element
     *
     * @param attributes {Map} content of the popup like title, content, position, styling etc.
     * @return {Element} Popup as DOM Element
     */
    create: function (attributes) {
      var body = qx.bom.Selector.query('body')[0];
      qx.bom.Html.clean(['<div id="popup_'+this.__counter+'" class="popup popup_background" style="display:none"><div class="popup_close">X</div></div>'],
        null, body);
      var ret_val = this.__domElement = qx.bom.Selector.query("#popup_"+this.__counter, body)[0];

      qx.bom.element.Class.add(ret_val, this.getType());

      if (attributes.title) {
        var title = qx.bom.Html.clean(['<div class="head"></div>'])[0];
        qx.dom.Element.insertEnd(title, ret_val);

        if (qx.lang.Type.isString(attributes.title)) {
          var titleContent = qx.bom.Html.clean([attributes.title])[0];
          qx.dom.Element.insertEnd(titleContent, title);
        } else {
          qx.dom.Element.insertEnd(attributes.title, title);
        }

      }

      if (attributes.content) {
        var content = qx.bom.Html.clean(['<div class="main"></div>'])[0];
        qx.dom.Element.insertEnd(content, ret_val);
        if (qx.lang.Type.isString(attributes.content)) {
          var mainContent =  qx.bom.Html.clean([attributes.content])[0];
          qx.dom.Element.insertEnd(mainContent, content);
        } else {
          qx.dom.Element.insertEnd(attributes.content, content);
        }
      }

      if (attributes.width) {
        qx.bom.element.Style.add(ret_val, "width", attributes.width);
      }

      if (attributes.height) {
        qx.bom.element.Style.add(ret_val, "height", attributes.height);
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
          if (attributes.position.hasOwnProperty('x')) {
            anchor.x = attributes.position.x;
          }
          if (attributes.position.hasOwnProperty('y')) {
            anchor.y = attributes.position.y;
          }
          if (attributes.position.hasOwnProperty('w')) {
            anchor.w = attributes.position.w;
          }
          if (attributes.position.hasOwnProperty('h')) {
            anchor.h = attributes.position.h;
          }
          if (anchor.w === 0 && anchor.h === 0) {
            align = 5;
          }
        }
      }
      if (attributes.align !== undefined) {
        align = attributes.align;
      }
      var placement = cv.ui.PopupHandler.placementStrategy(
        anchor,
        {w: qx.bom.element.Dimension.getWidth(ret_val), h: qx.bom.element.Dimension.getHeight(ret_val)},
        {w: qx.bom.Viewport.getWidth(), h: qx.bom.Viewport.getHeight()},
        align
      );

      qx.bom.element.Style.set(ret_val, 'left', placement.x);
      qx.bom.element.Style.set(ret_val, 'top', placement.y);

      this.addListener('close', this.close, this);
      qx.event.Registration.addListener(ret_val, 'tap', function () {
        // note: this will call two events - one for the popup itself and
        //       one for the popup_background.
        this.fireEvent('close');
      }, this);
      var close = qx.bom.Selector.query(".popup_close", ret_val)[0];
      qx.event.Registration.addListener(close, 'tap', function () {
        this.fireEvent('close');
      }, this);

      cv.report.Record.register(ret_val, "#popup_"+this.__counter, ["tap"]);
      cv.report.Record.register(close, "#popup_"+this.__counter+" .popup_close", ["tap"]);

      qx.bom.element.Style.set(ret_val, 'display', 'block');
      qx.bom.Selector.query(this.__deactivateSelectors.join(",")).forEach(function(elem) {
        qx.bom.element.Class.add(elem, 'inactiveMain');
      }, this);
      this.__counter++;
      return ret_val;
    },

    /**
     * Closes this popup
     */
    close: function () {
      qx.bom.Selector.query(this.__deactivateSelectors.join(",")).forEach(function(elem) {
        qx.bom.element.Class.remove(elem, 'inactiveMain');
      }, this);
      if (this.__domElement) {
        qx.dom.Element.remove(this.__domElement);
        this.__domElement = null;
      }
    }
  }
});