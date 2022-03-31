(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Mixin.define("qxl.apiviewer.MWidgetRegistry", {
    properties: {
      id: {
        check: "String",
        apply: "_applyId",
        nullable: true,
        init: null
      }
    },
    members: {
      _applyId: function _applyId(id, oldId) {
        var statics = qxl.apiviewer.MWidgetRegistry;

        if (oldId) {
          statics.unregister(this, oldId);
        }

        if (id) {
          statics.register(this, id);
        }
      },
      getWidgetById: function getWidgetById(id) {
        return qxl.apiviewer.MWidgetRegistry.getWidgetById(id);
      }
    },
    statics: {
      __P_517_0: {},

      /**
       * Returns the widget registered under the given id by {@link #register}
       *
       * @param id {String} the id of the widget
       * @return {qx.ui.core.Widget} the widget.
       */
      getWidgetById: function getWidgetById(id) {
        return this.__P_517_0[id];
      },

      /**
       * Registers a widget under the given widget id to be used with
       * {@link #getWidgetById}.
       * @param object
       * @param id {String} the id of the widget.
       */
      register: function register(object, id) {
        if (this.__P_517_0[id]) {
          throw new Error("An object with the id '" + id + "' already exists.");
        }

        this.__P_517_0[id] = object;
      },
      unregister: function unregister(object, id) {
        if (this.__P_517_0[id] !== object) {
          throw new Error("The object is not registered with the id '" + id + "'.");
        }

        delete this.__P_517_0[id];
      }
    }
  });
  qxl.apiviewer.MWidgetRegistry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MWidgetRegistry.js.map?dt=1648710514882