function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "qx.data.controller.List": {
        "construct": true
      },
      "cv.ui.manager.model.Message": {},
      "cv.ui.manager.snackbar.Message": {},
      "qx.ui.form.List": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Controller.js 
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
   * Main view component responsible for showing a list of snackbar messages.
   */
  qx.Class.define('cv.ui.manager.snackbar.Controller', {
    extend: qx.ui.core.Widget,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.VBox(8));

      this.initMessages(new qx.data.Array());
      qx.event.message.Bus.subscribe('cv.manager.msg.snackbar', this._onMessage, this);
      this._listController = new qx.data.controller.List(this.getMessages(), this.getChildControl('list'));

      this._initDelegate();
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      info: function info(message) {
        var msg = new cv.ui.manager.model.Message();
        msg.set({
          title: message
        });
        qx.event.message.Bus.dispatchByName('cv.manager.msg.snackbar', msg);
      },
      error: function error(message) {
        var msg = new cv.ui.manager.model.Message();

        if (_typeof(message) === 'object' && Object.prototype.hasOwnProperty.call(message, 'statusText')) {
          message = message.statusText;
        }

        msg.set({
          title: message,
          type: 'error',
          sticky: true
        });
        qx.event.message.Bus.dispatchByName('cv.manager.msg.snackbar', msg);
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-snackbar'
      },
      messages: {
        check: 'qx.data.Array',
        deferredInit: true,
        event: 'changeMessages'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _listController: null,
      _onMessage: function _onMessage(ev) {
        var msg = ev.getData();

        if (msg instanceof cv.ui.manager.model.Message) {
          this.getMessages().push(msg);
          this.show();
        }
      },
      _onCloseMessage: function _onCloseMessage(ev) {
        var msg = ev.getData();
        this.getMessages().remove(msg);

        if (this.getMessages().length === 0) {
          this.exclude();
        }
      },
      _initDelegate: function _initDelegate() {
        this._listController.setDelegate({
          createItem: function () {
            var item = new cv.ui.manager.snackbar.Message();
            item.addListener('close', this._onCloseMessage, this);
            return item;
          }.bind(this),
          bindItem: function bindItem(controller, item, index) {
            controller.bindProperty('', 'model', null, item, index);
          }
        });
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'list':
            control = new qx.ui.form.List();

            this._add(control, {
              flex: 1
            });

            break;
        }

        return control || cv.ui.manager.snackbar.Controller.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.manager.msg.snackbar', this._onMessage, this);

      this._disposeObjects('_listController');
    }
  });
  cv.ui.manager.snackbar.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1650225641624