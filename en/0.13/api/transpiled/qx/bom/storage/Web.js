(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Json": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Storage implementation using HTML web storage:
   * http://www.w3.org/TR/webstorage/
   *
   * @require(qx.bom.storage.Web#getLength)
   * @require(qx.bom.storage.Web#setItem)
   * @require(qx.bom.storage.Web#getItem)
   * @require(qx.bom.storage.Web#removeItem)
   * @require(qx.bom.storage.Web#clear)
   * @require(qx.bom.storage.Web#getKey)
   * @require(qx.bom.storage.Web#forEach)
   */
  qx.Bootstrap.define("qx.bom.storage.Web", {
    statics: {
      __P_129_0: null,
      __P_129_1: null,

      /**
       * Static accessor for the local storage.
       * @return {qx.bom.storage.Web} An instance of a local storage.
       */
      getLocal: function getLocal() {
        if (this.__P_129_0) {
          return this.__P_129_0;
        }

        return this.__P_129_0 = new qx.bom.storage.Web("local");
      },

      /**
       * Static accessor for the session storage.
       * @return {qx.bom.storage.Web} An instance of a session storage.
       */
      getSession: function getSession() {
        if (this.__P_129_1) {
          return this.__P_129_1;
        }

        return this.__P_129_1 = new qx.bom.storage.Web("session");
      }
    },

    /**
     * Create a new instance. Usually, you should take the static
     * accessors to get your instance.
     *
     * @param type {String} type of storage, either
     *   <code>local</code> or <code>session</code>.
     */
    construct: function construct(type) {
      this.__P_129_2 = type;
    },
    members: {
      __P_129_2: null,

      /**
       * Returns the internal used storage (the native object).
       *
       * @internal
       * @return {Storage} The native storage implementation.
       */
      getStorage: function getStorage() {
        return window[this.__P_129_2 + "Storage"];
      },

      /**
       * Returns the amount of key-value pairs stored.
       * @return {Integer} The length of the storage.
       */
      getLength: function getLength() {
        return this.getStorage(this.__P_129_2).length;
      },

      /**
       * Store an item in the storage.
       *
       * @param key {String} The identifier key.
       * @param value {var} The data, which will be stored as JSON.
       */
      setItem: function setItem(key, value) {
        value = qx.lang.Json.stringify(value);

        try {
          this.getStorage(this.__P_129_2).setItem(key, value);
        } catch (e) {
          throw new Error("Storage full.");
        }
      },

      /**
       * Returns the stored item.
       *
       * @param key {String} The identifier to get the data.
       * @return {var} The stored data.
       */
      getItem: function getItem(key) {
        var item = this.getStorage(this.__P_129_2).getItem(key);

        if (qx.lang.Type.isString(item)) {
          item = qx.lang.Json.parse(item); // special case for FF3
        } else if (item && item.value && qx.lang.Type.isString(item.value)) {
          item = qx.lang.Json.parse(item.value);
        }

        return item;
      },

      /**
       * Removes an item form the storage.
       * @param key {String} The identifier.
       */
      removeItem: function removeItem(key) {
        this.getStorage(this.__P_129_2).removeItem(key);
      },

      /**
       * Deletes every stored item in the storage.
       */
      clear: function clear() {
        var storage = this.getStorage(this.__P_129_2);

        if (!storage.clear) {
          for (var i = storage.length - 1; i >= 0; i--) {
            storage.removeItem(storage.key(i));
          }
        } else {
          storage.clear();
        }
      },

      /**
       * Returns the named key at the given index.
       * @param index {Integer} The index in the storage.
       * @return {String} The key stored at the given index.
       */
      getKey: function getKey(index) {
        return this.getStorage(this.__P_129_2).key(index);
      },

      /**
       * Helper to access every stored item.
       *
       * @param callback {Function} A function which will be called for every item.
       *   The function will have two arguments, first the key and second the value
       *    of the stored data.
       * @param scope {var} The scope of the function.
       */
      forEach: function forEach(callback, scope) {
        var length = this.getLength();

        for (var i = 0; i < length; i++) {
          var key = this.getKey(i);
          callback.call(scope, key, this.getItem(key));
        }
      }
    }
  });
  qx.bom.storage.Web.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Web.js.map?dt=1648068869263