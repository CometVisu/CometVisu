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
    this.__elementMap = {};
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
    __elementMap: null,

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
      cv.ui.BodyBlocker.getInstance().block(attributes.unique, attributes.topic);
      var closable = !attributes.hasOwnProperty("closable") || attributes.closable;
      var body = qx.bom.Selector.query('body')[0];
      var ret_val;
      var classes = ["popup", "popup_background", this.getType()];
      var isNew = true;
      var addCloseListeners = false;
      if (attributes.type) {
        classes.push(attributes.type);
      }

      if (!this.__domElement) {
        ret_val = this.__domElement = qx.dom.Element.create("div", {
          id: "popup_" + this.__counter,
          "class": classes.join(" "),
          style: "display:none",
          html: closable ? '<div class="popup_close">X</div>' : ""
        });
        qx.dom.Element.insertEnd(ret_val, body);
        this.__elementMap.close = qx.bom.Selector.query("div.popup_close", ret_val);
        addCloseListeners = true;
      } else {
        isNew = false;
        ret_val = this.__domElement;
        qx.bom.element.Attribute.set(ret_val, "class", classes.join(" "));
        if (closable && !this.__elementMap.close) {
          this.__domElement.close = qx.dom.Element.create("div", {"class": "popup_close", "html": "X"});
          qx.dom.Element.insertBegin(this.__domElement.close, body);
          addCloseListeners = true;
        } else if (!closable) {
          this.destroyElement("close");
        }
      }

      this.__domElement.$$topic = attributes.topic;
      this.__domElement.$$page = attributes.page;

      if (attributes.title) {
        if (!this.__elementMap.title) {
          this.__elementMap.title = qx.dom.Element.create("div", {"class": "head"});
          qx.dom.Element.insertEnd(this.__elementMap.title, ret_val);
        }

        if (qx.lang.Type.isString(attributes.title)) {
          qx.bom.element.Attribute.set(this.__elementMap.title, "html", "" + attributes.title);
        } else {
          qx.dom.Element.insertEnd(attributes.title, this.__elementMap.title);
        }

      }

      if (attributes.content || attributes.icon || attributes.progress) {
        if (!this.__elementMap.content) {
          this.__elementMap.content = qx.dom.Element.create("div", {"class": "main"});
          qx.dom.Element.insertEnd(this.__elementMap.content, ret_val);
        }

        if (attributes.content) {
          if (!this.__elementMap.messageContent) {
            this.__elementMap.messageContent = qx.dom.Element.create("div", {"class": "message"});
            qx.dom.Element.insertBegin(this.__elementMap.messageContent, this.__elementMap.content);
          }
          if (qx.lang.Type.isString(attributes.content)) {
            qx.bom.element.Attribute.set(this.__elementMap.messageContent, "html", attributes.content);
          } else {
            qx.dom.Element.replaceChild(attributes.content, this.__elementMap.messageContent);
            this.__elementMap.messageContent = attributes.content;
          }
        } else {
          this.destroyElement("messageContent");
        }
        
        if (attributes.icon) {
          if (!this.__elementMap.icon) {
            var iconClasses = attributes.iconClasses ? " "+attributes.iconClasses : "";
            this.__elementMap.icon = qx.dom.Element.create("div", {"html": cv.util.IconTools.svgKUF(attributes.icon)(null, null, "icon" + iconClasses)});
            qx.dom.Element.insertBegin(this.__elementMap.icon, this.__elementMap.content);
          } else {
            var use = qx.bom.Selector.query("use", this.__elementMap.icon)[0];
            var currentIconPath = qx.bom.element.Attribute.get(use, "xlink:href");
            if (!currentIconPath.endsWith("#kuf-"+attributes.icon)) {
              var parts = currentIconPath.split("#");
              qx.bom.element.Attribute.set(use, "xlink:href", parts[0]+"#kuf-"+attributes.icon);
            }
          }
        } else  {
          this.destroyElement("icon");
        }

        if (attributes.progress) {
          if (!this.__elementMap.progress) {
            var bar = new cv.ui.util.ProgressBar();
            this.__elementMap.progress = bar.getDomElement();
            qx.dom.Element.insertEnd(this.__elementMap.progress, this.__elementMap.content);
          }
          this.__elementMap.progress.$$widget.setValue(attributes.progress);
        } else {
          this.destroyElement("progress");
        }
      }

      if (attributes.actions && Object.getOwnPropertyNames(attributes.actions).length > 0) {
        if (!this.__elementMap.actions) {
          this.__elementMap.actions = qx.dom.Element.create("div", {"class": "actions"});
          qx.dom.Element.insertEnd(this.__elementMap.actions, ret_val);
        } else {
          // clear content
          qx.bom.element.Attribute.set(this.__elementMap.actions, "html", "");
        }
        var actionTypes = Object.getOwnPropertyNames(attributes.actions).length;
        Object.getOwnPropertyNames(attributes.actions).forEach(function (type, index) {
          var typeActions = qx.lang.Type.isArray(attributes.actions[type]) ? attributes.actions[type] : [attributes.actions[type]];

          var target = this.__elementMap.actions;
          var wrapper = null;
          if (cv.core.notifications.actions[qx.lang.String.firstUp(type)] && cv.core.notifications.actions[qx.lang.String.firstUp(type)].getWrapper) {
            wrapper = cv.core.notifications.actions[qx.lang.String.firstUp(type)].getWrapper();
          } else {
            wrapper = qx.dom.Element.create('div', (actionTypes > index + 1) ? {style: "margin-bottom: 20px"} : {});
          }
          qx.dom.Element.insertEnd(wrapper, target);
          target = wrapper;
          typeActions.forEach(function (action) {
            var actionButton = cv.core.notifications.ActionRegistry.createActionElement(type, action);
            if (actionButton) {
              actionButton.$$handler && actionButton.$$handler.addListener('close', function () {
                this.close();
              }, this);
              qx.dom.Element.insertEnd(actionButton, target);
            }
          }, this);
        }, this);
      } else {
        this.destroyElement("actions");
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

      if (!closable) {
        var reload = '<div class="reload">' +
          '<a href="javascript:location.reload(true);">' +
          qx.locale.Manager.tr('Reload').toString() +
          '</a>' +
          '</div>';
        ret_val.insertAdjacentHTML('beforeend', reload);
      }

      if (closable && addCloseListeners) {
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

      attributes.id = this.__counter;
      if (isNew) {
        qx.bom.element.Style.set(ret_val, 'display', 'block');
        this.__counter++;
      }
      return ret_val;
    },

    destroyElement: function(name) {
      if (this.__elementMap[name]) {
        qx.dom.Element.remove(this.__elementMap[name]);
        delete this.__elementMap[name];
      }
    },

    /**
     * Closes this popup
     */
    close: function () {
      if (this.__domElement) {
        cv.ui.BodyBlocker.getInstance().unblock(this.__domElement.$$topic);
        qx.dom.Element.remove(this.__domElement);
        this.__domElement = null;
        this.__elementMap = {};
      } else {
        cv.ui.BodyBlocker.getInstance().unblock();
      }
    },

    isClosed: function(){
      return this.__domElement === null;
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this.close();
  }
});