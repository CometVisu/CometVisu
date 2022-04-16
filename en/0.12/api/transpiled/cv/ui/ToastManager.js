(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.core.notifications.IHandler": {
        "require": true
      },
      "cv.ui.MHandleMessage": {
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "cv.TemplateEngine": {
        "construct": true
      },
      "qx.dom.Element": {},
      "qx.data.controller.website.List": {},
      "qx.event.Registration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ToastManager.js 
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
   * Handles toast positioning in the gui.
   */
  qx.Class.define('cv.ui.ToastManager', {
    extend: qx.core.Object,
    implement: cv.core.notifications.IHandler,
    include: cv.ui.MHandleMessage,
    type: 'singleton',

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.set({
        rootElementId: 'toast-list',
        messageElementId: 'toast_'
      });
      this.setDelegate({
        prepareMessage: function (message) {
          // all toast messages need a duration
          if (!Object.prototype.hasOwnProperty.call(message, 'duration')) {
            message.duration = this.getMessageDuration();
          }
        }.bind(this),
        postHandleMessage: function (message, config, payload) {
          if (payload.action === 'added' || payload.action === 'replaced') {
            // add removal listener
            qx.event.Timer.once(function () {
              this.getMessages().remove(message);
            }, this, message.duration);
          }
        }.bind(this)
      }); // as the Mixins constructor has not been called yet, the messages array has not been initialized
      // so we defer this call here to make sure everything is in place

      new qx.util.DeferredCall(function () {
        cv.TemplateEngine.getInstance().executeWhenDomFinished(this._init, this);
      }, this).schedule();
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      /**
       * Default time in MS a toast message is visible
       */
      messageDuration: {
        check: 'Number',
        init: 5000
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_494_0: null,
      __P_494_1: null,
      __P_494_2: false,

      /**
       * Attach to dom element and style it
       */
      _init: function _init() {
        if (!this.__P_494_0) {
          // check if there is one (might be restored from cache)
          this.__P_494_0 = document.querySelector(this.getRootElementId());

          if (!this.__P_494_0) {
            this.__P_494_0 = qx.dom.Element.create('div', {
              'id': this.getRootElementId()
            });
          }
        }

        if (document.querySelectorAll(this.getRootElementId()).length === 0) {
          document.body.appendChild(this.__P_494_0);
        }

        if (document.querySelectorAll('#ToastTemplate').length === 0) {
          var template = qx.dom.Element.create('script', {
            id: 'ToastTemplate',
            type: 'text/template',
            html: '<div class="toast {{severity}}{{#actions}} selectable{{/actions}}" title="{{tooltip}}" id="' + this.getMessageElementId() + '{{ id }}"><div class="content">{{&message}}</div></div>'
          });
          document.body.appendChild(template);
        }

        this._list = new qx.data.controller.website.List(this._messages, this.__P_494_0, 'ToastTemplate');
        qx.event.Registration.addListener(this.__P_494_0, 'tap', this._onListTap, this);
      },
      _performAction: function _performAction(message) {
        if (message.actions) {
          return false;
        } // default is to delete the toast


        return this.deleteMessage(message.id);
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      if (this.__P_494_1) {
        this.__P_494_1.stop();

        this.__P_494_1 = null;
      }

      if (this.__P_494_0) {
        this.__P_494_0.parentNode.removeChild(this.__P_494_0);

        this.__P_494_0 = null;
      }
    }
  });
  cv.ui.ToastManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToastManager.js.map?dt=1650119491915