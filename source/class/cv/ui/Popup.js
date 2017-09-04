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
      cv.ui.BodyBlocker.getInstance().block();
      var closable = !attributes.hasOwnProperty("closable") || attributes.closable;
      var body = qx.bom.Selector.query('body')[0];
      var ret_val = this.__domElement = qx.dom.Element.create("div", {
        id: "popup_"+this.__counter,
        "class": "popup popup_background "+this.getType(),
        style: "display:none",
        html: closable ? '<div class="popup_close">X</div>' : ""
      });
      qx.dom.Element.insertEnd(ret_val, body);

      if (attributes.title) {
        var title = qx.dom.Element.create("div", { "class": "head"});
        qx.dom.Element.insertEnd(title, ret_val);

        if (qx.lang.Type.isString(attributes.title)) {
          qx.bom.element.Attribute.set(title, "html", ""+attributes.title);
        } else {
          qx.dom.Element.insertEnd(attributes.title, title);
        }

      }

      if (attributes.content) {
        var content = qx.dom.Element.create("div", { "class": "main"});
        qx.dom.Element.insertEnd(content, ret_val);
        if (qx.lang.Type.isString(attributes.content)) {
          var html = ""+attributes.content;
          if (attributes.icon) {
            var icon = qx.util.ResourceManager.getInstance().toUri("icon/knx-uf-iconset.svg")+"#kuf-"+attributes.icon;
            html = '<svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+icon+'"></use></svg>'+html;
          }
          qx.bom.element.Attribute.set(content, "html", html);
        } else {
          qx.dom.Element.insertEnd(attributes.content, content);
        }
      }

      if (attributes.actions && Object.getOwnPropertyNames(attributes.actions).length > 0) {
        var actions = qx.dom.Element.create("div", {"class": "actions"});

        Object.getOwnPropertyNames(attributes.actions).forEach(function(type) {
          var actionButton = cv.core.notifications.ActionRegistry.createActionElement(type, attributes.actions[type]);
          qx.dom.Element.insertEnd(actionButton, actions);
        });
        qx.dom.Element.insertEnd(actions, ret_val);
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

      if (closable) {
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
      }

      qx.bom.element.Style.set(ret_val, 'display', 'block');
      attributes.id = this.__counter;
      this.__counter++;
      return ret_val;
    },

    /**
     * Closes this popup
     */
    close: function () {
      cv.ui.BodyBlocker.getInstance().unblock();
      if (this.__domElement) {
        qx.dom.Element.remove(this.__domElement);
        this.__domElement = null;
      }
    },

    isClosed: function(){
      return this.__domElement === null;
    }
  }
});