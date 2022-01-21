(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Json": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Fallback storage implementation usable in IE browsers. It is recommended to use
   * these implementation only in IE < 8 because IE >= 8 supports
   * {@link qx.bom.storage.Web}.
   *
   * @require(qx.bom.storage.UserData#getLength)
   * @require(qx.bom.storage.UserData#setItem)
   * @require(qx.bom.storage.UserData#getItem)
   * @require(qx.bom.storage.UserData#removeItem)
   * @require(qx.bom.storage.UserData#clear)
   * @require(qx.bom.storage.UserData#getKey)
   * @require(qx.bom.storage.UserData#forEach)
   */
  qx.Bootstrap.define("qx.bom.storage.UserData", {
    statics: {
      __P_128_0: null,
      __P_128_1: null,
      // global id used as key for the storage
      __P_128_2: 0,

      /**
       * Returns an instance of {@link qx.bom.storage.UserData} used to store
       * data persistent.
       * @return {qx.bom.storage.UserData} A storage instance.
       */
      getLocal: function getLocal() {
        if (this.__P_128_0) {
          return this.__P_128_0;
        }

        return this.__P_128_0 = new qx.bom.storage.UserData("local");
      },

      /**
       * Returns an instance of {@link qx.bom.storage.UserData} used to store
       * data persistent.
       * @return {qx.bom.storage.UserData} A storage instance.
       */
      getSession: function getSession() {
        if (this.__P_128_1) {
          return this.__P_128_1;
        }

        return this.__P_128_1 = new qx.bom.storage.UserData("session");
      }
    },

    /**
     * Create a new instance. Usually, you should take the static
     * accessors to get your instance.
     *
     * @param storeName {String} type of storage.
     */
    construct: function construct(storeName) {
      // create a dummy DOM element used for storage
      this.__P_128_3 = document.createElement("div");
      this.__P_128_3.style["display"] = "none";
      document.getElementsByTagName("head")[0].appendChild(this.__P_128_3);

      this.__P_128_3.addBehavior("#default#userdata");

      this.__P_128_4 = storeName; // load the inital data which might be stored

      this.__P_128_3.load(this.__P_128_4); // set up the internal reference maps


      this.__P_128_5 = {};
      this.__P_128_6 = {}; // initialize

      var value = this.__P_128_3.getAttribute("qx" + qx.bom.storage.UserData.__P_128_2);

      while (value != undefined) {
        value = qx.lang.Json.parse(value); // save the data in the internal storage

        this.__P_128_5[value.key] = value.value; // save the reference

        this.__P_128_6[value.key] = "qx" + qx.bom.storage.UserData.__P_128_2;
        qx.bom.storage.UserData.__P_128_2++;
        value = this.__P_128_3.getAttribute("qx" + qx.bom.storage.UserData.__P_128_2);
      }
    },
    members: {
      __P_128_3: null,
      __P_128_4: "qxtest",
      // storage which holds the key and the value
      __P_128_5: null,
      // reference store which holds the key and the key used to store
      __P_128_6: null,

      /**
       * Returns the map used to keep a in memory copy of the stored data.
       * @return {Map} The stored data.
       * @internal
       */
      getStorage: function getStorage() {
        return this.__P_128_5;
      },

      /**
       * Returns the amount of key-value pairs stored.
       * @return {Integer} The length of the storage.
       */
      getLength: function getLength() {
        return Object.keys(this.__P_128_5).length;
      },

      /**
       * Store an item in the storage.
       *
       * @param key {String} The identifier key.
       * @param value {var} The data, which will be stored as JSON.
       */
      setItem: function setItem(key, value) {
        // override case
        if (this.__P_128_6[key]) {
          var storageKey = this.__P_128_6[key]; // new case
        } else {
          var storageKey = "qx" + qx.bom.storage.UserData.__P_128_2;
          qx.bom.storage.UserData.__P_128_2++;
        } // build and save the data used to store both, key and value


        var storageValue = qx.lang.Json.stringify({
          key: key,
          value: value
        });

        this.__P_128_3.setAttribute(storageKey, storageValue);

        this.__P_128_3.save(this.__P_128_4); // also update the internal mappings


        this.__P_128_5[key] = value;
        this.__P_128_6[key] = storageKey;
      },

      /**
       * Returns the stored item.
       *
       * @param key {String} The identifier to get the data.
       * @return {var} The stored data.
       */
      getItem: function getItem(key) {
        return this.__P_128_5[key] || null;
      },

      /**
       * Removes an item form the storage.
       * @param key {String} The identifier.
       */
      removeItem: function removeItem(key) {
        // check if the item is available
        var storageName = this.__P_128_6[key];

        if (storageName == undefined) {
          return;
        } // remove the item


        this.__P_128_3.removeAttribute(storageName); // decrease the id because we removed one item


        qx.bom.storage.UserData.__P_128_2--; // update the internal maps

        delete this.__P_128_5[key];
        delete this.__P_128_6[key]; // check if we have deleted the last item

        var lastStoreName = "qx" + qx.bom.storage.UserData.__P_128_2;

        if (this.__P_128_3.getAttribute(lastStoreName)) {
          // if not, move the last item to the deleted spot
          var lastItem = this.__P_128_3.getAttribute("qx" + qx.bom.storage.UserData.__P_128_2);

          this.__P_128_3.removeAttribute(lastStoreName);

          this.__P_128_3.setAttribute(storageName, lastItem); // update the reference map


          var lastKey = qx.lang.Json.parse(lastItem).key;
          this.__P_128_6[lastKey] = storageName;
        }

        this.__P_128_3.save(this.__P_128_4);
      },

      /**
       * Deletes every stored item in the storage.
       */
      clear: function clear() {
        // delete all entries from the storage
        for (var key in this.__P_128_6) {
          this.__P_128_3.removeAttribute(this.__P_128_6[key]);
        }

        this.__P_128_3.save(this.__P_128_4); // reset the internal maps


        this.__P_128_5 = {};
        this.__P_128_6 = {};
      },

      /**
       * Returns the named key at the given index.
       * @param index {Integer} The index in the storage.
       * @return {String} The key stored at the given index.
       */
      getKey: function getKey(index) {
        return Object.keys(this.__P_128_5)[index];
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
  qx.bom.storage.UserData.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UserData.js.map?dt=1642802389305