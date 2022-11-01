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
  construct() {
    super();
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
          qx.event.Timer.once(
            function () {
              this.getMessages().remove(message);
            },
            this,
            message.duration
          );
        }
      }.bind(this)
    });

    // as the Mixins constructor has not been called yet, the messages array has not been initialized
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
    __domElement: null,
    __timer: null,
    __opened: false,

    /**
     * Attach to dom element and style it
     */
    _init() {
      if (!this.__domElement) {
        // check if there is one (might be restored from cache)
        this.__domElement = document.querySelector(this.getRootElementId());
        if (!this.__domElement) {
          this.__domElement = qx.dom.Element.create('div', {
            id: this.getRootElementId()
          });
        }
      }
      if (document.querySelectorAll(this.getRootElementId()).length === 0) {
        document.body.appendChild(this.__domElement);
      }
      if (document.querySelectorAll('#ToastTemplate').length === 0) {
        const template = qx.dom.Element.create('script', {
          id: 'ToastTemplate',
          type: 'text/template',
          html:
            '<div class="toast {{severity}}{{#actions}} selectable{{/actions}}" title="{{tooltip}}" id="' +
            this.getMessageElementId() +
            '{{ id }}"><div class="content">{{&message}}</div></div>'
        });

        document.body.appendChild(template);
      }
      this._list = new qx.data.controller.website.List(this._messages, this.__domElement, 'ToastTemplate');

      qx.event.Registration.addListener(this.__domElement, 'tap', this._onListTap, this);
    },

    _performAction(message) {
      if (message.actions) {
        return false;
      }
      // default is to delete the toast
      return this.deleteMessage(message.id);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    if (this.__timer) {
      this.__timer.stop();
      this.__timer = null;
    }
    if (this.__domElement) {
      this.__domElement.parentNode.removeChild(this.__domElement);
      this.__domElement = null;
    }
  }
});
