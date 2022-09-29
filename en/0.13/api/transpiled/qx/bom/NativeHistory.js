(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.History": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.event.GlobalError": {},
      "qx.bom.Event": {},
      "qx.event.Idle": {},
      "qx.lang.Type": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Default history manager implementation. Either polls for URL fragment
   * identifier (hash) changes or uses the native "hashchange" event.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @internal
   */
  qx.Class.define("qx.bom.NativeHistory", {
    extend: qx.bom.History,
    implement: [qx.core.IDisposable],
    construct: function construct() {
      qx.bom.History.constructor.call(this);

      this.__P_107_0();
    },
    members: {
      __P_107_1: null,

      /**
       * Attach hash change listeners
       */
      __P_107_0: function __P_107_0() {
        if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT) {
          var boundFunc = qx.lang.Function.bind(this.__P_107_2, this);
          this.__P_107_1 = qx.event.GlobalError.observeMethod(boundFunc);
          qx.bom.Event.addNativeListener(window, "hashchange", this.__P_107_1);
        } else {
          qx.event.Idle.getInstance().addListener("interval", this.__P_107_2, this);
        }
      },

      /**
       * Remove hash change listeners
       */
      __P_107_3: function __P_107_3() {
        if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT) {
          qx.bom.Event.removeNativeListener(window, "hashchange", this.__P_107_1);
        } else {
          qx.event.Idle.getInstance().removeListener("interval", this.__P_107_2, this);
        }
      },

      /**
       * hash change event handler
       */
      __P_107_2: function __P_107_2() {
        var currentState = this._readState();

        if (qx.lang.Type.isString(currentState) && currentState != this.getState()) {
          this._onHistoryLoad(currentState);
        }
      },

      /**
       * Browser dependent function to read the current state of the history
       *
       * @return {String} current state of the browser history
       */
      _readState: function _readState() {
        return this._decode(this._getHash());
      },

      /**
       * Save a state into the browser history.
       *
       * @param state {String} state to save
       */
      _writeState: qx.core.Environment.select("engine.name", {
        "opera": function opera(state) {
          qx.event.Timer.once(function () {
            this._setHash(this._encode(state));
          }, this, 0);
        },
        "default": function _default(state) {
          this._setHash(this._encode(state));
        }
      })
    },
    destruct: function destruct() {
      this.__P_107_3();
    }
  });
  qx.bom.NativeHistory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NativeHistory.js.map?dt=1664441198004