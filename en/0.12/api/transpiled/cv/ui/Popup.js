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
      "qx.event.Registration": {},
      "qx.util.DeferredCall": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Popup.js 
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

      this.__P_524_0 = ['#top', '#navbarTop', '#centerContainer', '#navbarBottom', '#bottom'];
      this.__P_524_1 = {};
    },

    /*
    ******************************************************
      EVENTS
    ******************************************************
    */
    events: {
      'close': 'qx.event.type.Event'
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      type: {
        check: 'String',
        init: ''
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_524_2: 0,
      __P_524_0: null,
      __P_524_3: null,
      __P_524_1: null,
      getCurrentDomElement: function getCurrentDomElement() {
        return this.__P_524_3;
      },

      /**
       * Create the popup element
       *
       * @param attributes {Map} content of the popup like title, content, position, styling etc.
       * @return {Element} Popup as DOM Element
       */
      create: function create(attributes) {
        cv.ui.BodyBlocker.getInstance().block(attributes.unique, attributes.topic);
        var closable = !Object.prototype.hasOwnProperty.call(attributes, 'closable') || attributes.closable;
        var body = document.querySelector('body');
        var ret_val;
        var classes = ['popup', 'popup_background', this.getType()];
        var isNew = true;
        var addCloseListeners = false;

        if (attributes.type) {
          classes.push(attributes.type);
        }

        if (!this.__P_524_3) {
          ret_val = this.__P_524_3 = qx.dom.Element.create('div', {
            id: 'popup_' + this.__P_524_2,
            'class': classes.join(' '),
            style: 'visibility:hidden',
            html: closable ? '<div class="popup_close">X</div>' : ''
          });
          body.appendChild(ret_val);
          this.__P_524_1.close = ret_val.querySelector('div.popup_close');
          addCloseListeners = true;
        } else {
          isNew = false;
          ret_val = this.__P_524_3;
          ret_val.setAttribute('class', classes.join(' '));

          if (closable && !this.__P_524_1.close) {
            this.__P_524_3.close = qx.dom.Element.create('div', {
              'class': 'popup_close',
              'html': 'X'
            });
            qx.dom.Element.insertBegin(this.__P_524_3.close, body);
            addCloseListeners = true;
          } else if (!closable) {
            this.destroyElement('close');
          }
        }

        this.__P_524_3.$$topic = attributes.topic;
        this.__P_524_3.$$page = attributes.page;

        if (attributes.title) {
          if (!this.__P_524_1.title) {
            this.__P_524_1.title = qx.dom.Element.create('div', {
              'class': 'head'
            });
            ret_val.appendChild(this.__P_524_1.title);
          }

          if (qx.lang.Type.isString(attributes.title)) {
            this.__P_524_1.title.innerHTML = '' + attributes.title;
          } else {
            this.__P_524_1.title.appendChild(attributes.title);
          }
        }

        if (attributes.content || attributes.icon || attributes.progress) {
          if (!this.__P_524_1.content) {
            this.__P_524_1.content = qx.dom.Element.create('div', {
              'class': 'main'
            });
            ret_val.appendChild(this.__P_524_1.content);
          }

          if (attributes.content) {
            if (!this.__P_524_1.messageContent) {
              this.__P_524_1.messageContent = qx.dom.Element.create('div', {
                'class': 'message'
              });
              qx.dom.Element.insertBegin(this.__P_524_1.messageContent, this.__P_524_1.content);
            }

            if (qx.lang.Type.isString(attributes.content)) {
              this.__P_524_1.messageContent.innerHTML = attributes.content;
            } else {
              this.__P_524_1.messageContent.parentNode.replaceChild(attributes.content, this.__P_524_1.messageContent);

              this.__P_524_1.messageContent = attributes.content;
            }
          } else {
            this.destroyElement('messageContent');
          }

          if (attributes.icon) {
            if (!this.__P_524_1.icon) {
              var iconClasses = attributes.iconClasses ? ' ' + attributes.iconClasses : '';
              this.__P_524_1.icon = qx.dom.Element.create('div', {
                'html': cv.util.IconTools.svgKUF(attributes.icon)(null, null, 'icon' + iconClasses, true, true)
              });
              qx.dom.Element.insertBegin(this.__P_524_1.icon, this.__P_524_1.content);
            } else {
              var use = this.__P_524_1.icon.querySelector('use');

              var currentIconPath = use.getAttribute('xlink:href');

              if (!currentIconPath.endsWith('#kuf-' + attributes.icon)) {
                var parts = currentIconPath.split('#');
                use.setAttribute('xlink:href', parts[0] + '#kuf-' + attributes.icon);
              }
            }
          } else {
            this.destroyElement('icon');
          }

          if (attributes.progress) {
            if (!this.__P_524_1.progress) {
              var bar = new cv.ui.util.ProgressBar();
              this.__P_524_1.progress = bar.getDomElement();

              this.__P_524_1.content.appendChild(this.__P_524_1.progress);
            }

            this.__P_524_1.progress.$$widget.setValue(attributes.progress);
          } else {
            this.destroyElement('progress');
          }
        }

        if (attributes.actions && Object.getOwnPropertyNames(attributes.actions).length > 0) {
          if (!this.__P_524_1.actions) {
            this.__P_524_1.actions = qx.dom.Element.create('div', {
              'class': 'actions'
            });
            ret_val.appendChild(this.__P_524_1.actions);
          } else {
            // clear content
            this.__P_524_1.actions.innerHTML = '';
          }

          var actionTypes = Object.getOwnPropertyNames(attributes.actions).length;
          Object.getOwnPropertyNames(attributes.actions).forEach(function (type, index) {
            var typeActions = Array.isArray(attributes.actions[type]) ? attributes.actions[type] : [attributes.actions[type]];
            var target = this.__P_524_1.actions;
            var wrapper = null;

            if (cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)] && cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)].getWrapper) {
              wrapper = cv.core.notifications.actions[type.charAt(0).toUpperCase() + type.substr(1)].getWrapper();
            } else {
              wrapper = qx.dom.Element.create('div', actionTypes > index + 1 ? {
                style: 'margin-bottom: 20px'
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
          this.destroyElement('actions');
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
            if (Object.prototype.hasOwnProperty.call(attributes.position, 'x')) {
              anchor.x = attributes.position.x;
            }

            if (Object.prototype.hasOwnProperty.call(attributes.position, 'y')) {
              anchor.y = attributes.position.y;
            }

            if (Object.prototype.hasOwnProperty.call(attributes.position, 'w')) {
              anchor.w = attributes.position.w;
            }

            if (Object.prototype.hasOwnProperty.call(attributes.position, 'h')) {
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

        var ret_valRect = ret_val.getBoundingClientRect();
        var placement = cv.ui.PopupHandler.placementStrategy(anchor, {
          w: Math.round(ret_valRect.right - ret_valRect.left),
          h: Math.round(ret_valRect.bottom - ret_valRect.top)
        }, {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }, align);
        ret_val.style.left = placement.x + 'px';
        ret_val.style.top = placement.y + 'px';

        if (!closable && ret_val.querySelector('.reload') === null) {
          var reload = "<div class=\"reload\"><a href=\"javascript:location.reload(true);\">" + qx.locale.Manager.tr('Reload').toString() + '</a>' + '</div>';
          ret_val.insertAdjacentHTML('beforeend', reload);
        }

        if (closable && addCloseListeners) {
          this.addListener('close', this.close, this);
          qx.event.Registration.addListener(ret_val, 'tap', function () {
            var _this = this;

            // note: this will call two events - one for the popup itself and
            //       one for the popup_background.
            // needs to be delayed to allow links inside the popup
            new qx.util.DeferredCall(function () {
              return _this.fireEvent('close');
            }).schedule();
          }, this);
          var close = ret_val.querySelector('.popup_close');
          qx.event.Registration.addListener(close, 'tap', function () {
            this.fireEvent('close');
          }, this);
        }

        attributes.id = this.__P_524_2;

        if (isNew) {
          ret_val.style.visibility = 'visible';
          this.__P_524_2++;
        }

        return ret_val;
      },
      destroyElement: function destroyElement(name) {
        if (this.__P_524_1[name]) {
          this.__P_524_1[name].parentNode.removeChild(this.__P_524_1[name]);

          delete this.__P_524_1[name];
        }
      },

      /**
       * Closes this popup
       */
      close: function close() {
        if (this.__P_524_3) {
          cv.ui.BodyBlocker.getInstance().unblock(this.__P_524_3.$$topic);

          this.__P_524_3.parentNode.removeChild(this.__P_524_3);

          this.__P_524_3 = null;
          this.__P_524_1 = {};
        } else {
          cv.ui.BodyBlocker.getInstance().unblock();
        }
      },
      isClosed: function isClosed() {
        return this.__P_524_3 === null;
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

//# sourceMappingURL=Popup.js.map?dt=1674150496604