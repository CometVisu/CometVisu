(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.ui.BodyBlocker": {},
      "qx.dom.Element": {},
      "qx.lang.Type": {},
      "cv.util.IconTools": {},
      "cv.ui.util.ProgressBar": {},
      "cv.core.notifications.ActionRegistry": {},
      "cv.ui.PopupHandler": {},
      "qx.locale.Manager": {},
      "qx.event.Registration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(type) {
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
      getCurrentDomElement: function getCurrentDomElement() {
        return this.__domElement;
      },

      /**
       * Create the popup element
       *
       * @param attributes {Map} content of the popup like title, content, position, styling etc.
       * @return {Element} Popup as DOM Element
       */
      create: function create(attributes) {
        cv.ui.BodyBlocker.getInstance().block(attributes.unique, attributes.topic);
        var closable = !attributes.hasOwnProperty("closable") || attributes.closable;
        var body = document.querySelector('body');
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
          body.appendChild(ret_val);
          this.__elementMap.close = ret_val.querySelector("div.popup_close");
          addCloseListeners = true;
        } else {
          isNew = false;
          ret_val = this.__domElement;
          ret_val.setAttribute("class", classes.join(" "));

          if (closable && !this.__elementMap.close) {
            this.__domElement.close = qx.dom.Element.create("div", {
              "class": "popup_close",
              "html": "X"
            });
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
            this.__elementMap.title = qx.dom.Element.create("div", {
              "class": "head"
            });
            ret_val.appendChild(this.__elementMap.title);
          }

          if (qx.lang.Type.isString(attributes.title)) {
            this.__elementMap.title.innerHTML = "" + attributes.title;
          } else {
            this.__elementMap.title.appendChild(attributes.title);
          }
        }

        if (attributes.content || attributes.icon || attributes.progress) {
          if (!this.__elementMap.content) {
            this.__elementMap.content = qx.dom.Element.create("div", {
              "class": "main"
            });
            ret_val.appendChild(this.__elementMap.content);
          }

          if (attributes.content) {
            if (!this.__elementMap.messageContent) {
              this.__elementMap.messageContent = qx.dom.Element.create("div", {
                "class": "message"
              });
              qx.dom.Element.insertBegin(this.__elementMap.messageContent, this.__elementMap.content);
            }

            if (qx.lang.Type.isString(attributes.content)) {
              this.__elementMap.messageContent.innerHTML = attributes.content;
            } else {
              this.__elementMap.messageContent.parentNode.replaceChild(attributes.content, this.__elementMap.messageContent);

              this.__elementMap.messageContent = attributes.content;
            }
          } else {
            this.destroyElement("messageContent");
          }

          if (attributes.icon) {
            if (!this.__elementMap.icon) {
              var iconClasses = attributes.iconClasses ? " " + attributes.iconClasses : "";
              this.__elementMap.icon = qx.dom.Element.create("div", {
                "html": cv.util.IconTools.svgKUF(attributes.icon)(null, null, "icon" + iconClasses)
              });
              qx.dom.Element.insertBegin(this.__elementMap.icon, this.__elementMap.content);
            } else {
              var use = this.__elementMap.icon.querySelector("use");

              var currentIconPath = use.getAttribute("xlink:href");

              if (!currentIconPath.endsWith("#kuf-" + attributes.icon)) {
                var parts = currentIconPath.split("#");
                use.setAttribute("xlink:href", parts[0] + "#kuf-" + attributes.icon);
              }
            }
          } else {
            this.destroyElement("icon");
          }

          if (attributes.progress) {
            if (!this.__elementMap.progress) {
              var bar = new cv.ui.util.ProgressBar();
              this.__elementMap.progress = bar.getDomElement();

              this.__elementMap.content.appendChild(this.__elementMap.progress);
            }

            this.__elementMap.progress.$$widget.setValue(attributes.progress);
          } else {
            this.destroyElement("progress");
          }
        }

        if (attributes.actions && Object.getOwnPropertyNames(attributes.actions).length > 0) {
          if (!this.__elementMap.actions) {
            this.__elementMap.actions = qx.dom.Element.create("div", {
              "class": "actions"
            });
            ret_val.appendChild(this.__elementMap.actions);
          } else {
            // clear content
            this.__elementMap.actions.innerHTML = "";
          }

          var actionTypes = Object.getOwnPropertyNames(attributes.actions).length;
          Object.getOwnPropertyNames(attributes.actions).forEach(function (type, index) {
            var typeActions = Array.isArray(attributes.actions[type]) ? attributes.actions[type] : [attributes.actions[type]];
            var target = this.__elementMap.actions;
            var wrapper = null;

            if (cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)] && cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)].getWrapper) {
              wrapper = cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)].getWrapper();
            } else {
              wrapper = qx.dom.Element.create('div', actionTypes > index + 1 ? {
                style: "margin-bottom: 20px"
              } : {});
            }

            target.appendChild(wrapper);
            target = wrapper;
            typeActions.forEach(function (action) {
              var actionButton = cv.core.notifications.ActionRegistry.createActionElement(type, action);

              if (actionButton) {
                actionButton.$$handler && actionButton.$$handler.addListener('close', function () {
                  this.close();
                }, this);
                target.appendChild(actionButton);
              }
            }, this);
          }, this);
        } else {
          this.destroyElement("actions");
        }

        if (attributes.width) {
          ret_val.style.width = attributes.width;
        }

        if (attributes.height) {
          ret_val.style.height = attributes.height;
        }

        var anchor = {
          x: -1,
          y: -1,
          w: 0,
          h: 0
        };
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

        var ret_valRect = ret_val.getBoundingClientRect(),
            placement = cv.ui.PopupHandler.placementStrategy(anchor, {
          w: Math.round(ret_valRect.right - ret_valRect.left),
          h: Math.round(ret_valRect.bottom - ret_valRect.top)
        }, {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }, align);
        ret_val.style.left = placement.x;
        ret_val.style.top = placement.y;

        if (!closable) {
          var reload = "<div class=\"reload\"><a href=\"javascript:location.reload(true);\">" + qx.locale.Manager.tr('Reload').toString() + '</a>' + '</div>';
          ret_val.insertAdjacentHTML('beforeend', reload);
        }

        if (closable && addCloseListeners) {
          this.addListener('close', this.close, this);
          qx.event.Registration.addListener(ret_val, 'tap', function () {
            // note: this will call two events - one for the popup itself and
            //       one for the popup_background.
            this.fireEvent('close');
          }, this);
          var close = ret_val.querySelector(".popup_close");
          qx.event.Registration.addListener(close, 'tap', function () {
            this.fireEvent('close');
          }, this);
        }

        attributes.id = this.__counter;

        if (isNew) {
          ret_val.style.display = 'block';
          this.__counter++;
        }

        return ret_val;
      },
      destroyElement: function destroyElement(name) {
        if (this.__elementMap[name]) {
          this.__elementMap[name].parentNode.removeChild(this.__elementMap[name]);

          delete this.__elementMap[name];
        }
      },

      /**
       * Closes this popup
       */
      close: function close() {
        if (this.__domElement) {
          cv.ui.BodyBlocker.getInstance().unblock(this.__domElement.$$topic);

          this.__domElement.parentNode.removeChild(this.__domElement);

          this.__domElement = null;
          this.__elementMap = {};
        } else {
          cv.ui.BodyBlocker.getInstance().unblock();
        }
      },
      isClosed: function isClosed() {
        return this.__domElement === null;
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this.close();
    }
  });
  cv.ui.Popup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Popup.js.map?dt=1589219114635