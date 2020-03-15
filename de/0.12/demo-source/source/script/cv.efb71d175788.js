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
 * This is a cross browser storage implementation. The API is aligned with the
 * API of the HTML web storage (http://www.w3.org/TR/webstorage/) which is also
 * the preferred implementation used. As fallback for IE < 8, we use user data.
 * If both techniques are unsupported, we supply a in memory storage, which is
 * of course, not persistent.
 */
qx.Bootstrap.define("qx.bom.Storage", {
  statics : {
    __impl : null,

    /**
     * Get an instance of a local storage.
     * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
     *   An instance of a storage implementation.
     */
    getLocal : function() {
      // always use HTML5 web storage if available
      if (qx.core.Environment.get("html.storage.local")) {
        return qx.bom.storage.Web.getLocal();
      } else if (qx.core.Environment.get("html.storage.userdata")) { // IE <8 fallback
        // as fallback,use the userdata storage for IE5.5 - 8
        return qx.bom.storage.UserData.getLocal();
      }
      // as last fallback, use a in memory storage (this one is not persistent)
      return qx.bom.storage.Memory.getLocal();
    },


    /**
     * Get an instance of a session storage.
     * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
     *   An instance of a storage implementation.
     */
    getSession : function() {
      // always use HTML5 web storage if available
      if (qx.core.Environment.get("html.storage.local")) {
        return qx.bom.storage.Web.getSession();
      } else if (qx.core.Environment.get("html.storage.userdata")) { // IE <8 fallback
        // as fallback,use the userdata storage for IE5.5 - 8
        return qx.bom.storage.UserData.getSession();
      }
      // as last fallback, use a in memory storage (this one is not persistent)
      return qx.bom.storage.Memory.getSession();
    }
  }
});
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
  statics : {
    __local : null,
    __session : null,

    /**
     * Static accessor for the local storage.
     * @return {qx.bom.storage.Web} An instance of a local storage.
     */
    getLocal : function() {
      if (this.__local) {
        return this.__local;
      }
      return this.__local = new qx.bom.storage.Web("local");
    },


    /**
     * Static accessor for the session storage.
     * @return {qx.bom.storage.Web} An instance of a session storage.
     */
    getSession : function() {
      if (this.__session) {
        return this.__session;
      }
      return this.__session = new qx.bom.storage.Web("session");
    }
  },


  /**
   * Create a new instance. Usually, you should take the static
   * accessors to get your instance.
   *
   * @param type {String} type of storage, either
   *   <code>local</code> or <code>session</code>.
   */
  construct : function(type) {
    this.__type = type;
  },


  members : {
    __type : null,


    /**
     * Returns the internal used storage (the native object).
     *
     * @internal
     * @return {Storage} The native storage implementation.
     */
    getStorage : function() {
      return window[this.__type + "Storage"];
    },


    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function() {
      return this.getStorage(this.__type).length;
    },


    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value) {
      value = qx.lang.Json.stringify(value);
      try {
        this.getStorage(this.__type).setItem(key, value);
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
    getItem : function(key) {
      var item = this.getStorage(this.__type).getItem(key);

      if (qx.lang.Type.isString(item)) {
        item = qx.lang.Json.parse(item);
      // special case for FF3
      } else if (item && item.value && qx.lang.Type.isString(item.value)) {
        item = qx.lang.Json.parse(item.value);
      }

      return item;
    },


    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key) {
      this.getStorage(this.__type).removeItem(key);
    },


    /**
     * Deletes every stored item in the storage.
     */
    clear : function() {
      var storage = this.getStorage(this.__type);
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
    getKey : function(index) {
      return this.getStorage(this.__type).key(index);
    },


    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope) {
      var length = this.getLength();
      for (var i = 0; i < length; i++) {
        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
      }
    }
  }
});
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
  statics : {
    __local : null,
    __session : null,

    // global id used as key for the storage
    __id : 0,

    /**
     * Returns an instance of {@link qx.bom.storage.UserData} used to store
     * data persistent.
     * @return {qx.bom.storage.UserData} A storage instance.
     */
    getLocal : function() {
      if (this.__local) {
        return this.__local;
      }
      return this.__local = new qx.bom.storage.UserData("local");
    },


    /**
     * Returns an instance of {@link qx.bom.storage.UserData} used to store
     * data persistent.
     * @return {qx.bom.storage.UserData} A storage instance.
     */
    getSession : function() {
      if (this.__session) {
        return this.__session;
      }
      return this.__session = new qx.bom.storage.UserData("session");
    }
  },


  /**
   * Create a new instance. Usually, you should take the static
   * accessors to get your instance.
   *
   * @param storeName {String} type of storage.
   */
  construct : function(storeName) {
    // create a dummy DOM element used for storage
    this.__el = document.createElement("div");
    this.__el.style["display"] = "none";
    document.getElementsByTagName("head")[0].appendChild(this.__el);
    this.__el.addBehavior("#default#userdata");
    this.__storeName = storeName;
    // load the inital data which might be stored
    this.__el.load(this.__storeName);

    // set up the internal reference maps
    this.__storage = {};
    this.__reference = {};

    // initialize
    var value = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
    while (value != undefined) {
      value = qx.lang.Json.parse(value);
      // save the data in the internal storage
      this.__storage[value.key] = value.value;
      // save the reference
      this.__reference[value.key] = "qx" + qx.bom.storage.UserData.__id;
      qx.bom.storage.UserData.__id++;
      value = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
    }
  },


  members : {
    __el : null,
    __storeName : "qxtest",

    // storage which holds the key and the value
    __storage : null,

    // reference store which holds the key and the key used to store
    __reference : null,

    /**
     * Returns the map used to keep a in memory copy of the stored data.
     * @return {Map} The stored data.
     * @internal
     */
    getStorage : function() {
      return this.__storage;
    },


    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function() {
      return Object.keys(this.__storage).length;
    },


    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value) {
      // override case
      if (this.__reference[key]) {
        var storageKey = this.__reference[key];
      // new case
      } else {
        var storageKey = "qx" + qx.bom.storage.UserData.__id;
        qx.bom.storage.UserData.__id++;
      }

      // build and save the data used to store both, key and value
      var storageValue = qx.lang.Json.stringify({key: key, value: value});
      this.__el.setAttribute(storageKey, storageValue);
      this.__el.save(this.__storeName);

      // also update the internal mappings
      this.__storage[key] = value;
      this.__reference[key] = storageKey;
    },


    /**
     * Returns the stored item.
     *
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getItem : function(key) {
      return this.__storage[key] || null;
    },


    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key) {
      // check if the item is available
      var storageName = this.__reference[key];
      if (storageName == undefined) {
        return;
      }

      // remove the item
      this.__el.removeAttribute(storageName);
      // decrease the id because we removed one item
      qx.bom.storage.UserData.__id--;

      // update the internal maps
      delete this.__storage[key];
      delete this.__reference[key];

      // check if we have deleted the last item
      var lastStoreName = "qx" + qx.bom.storage.UserData.__id;
      if (this.__el.getAttribute(lastStoreName)) {
        // if not, move the last item to the deleted spot
        var lastItem = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
        this.__el.removeAttribute(lastStoreName);
        this.__el.setAttribute(storageName, lastItem);

        // update the reference map
        var lastKey = qx.lang.Json.parse(lastItem).key;
        this.__reference[lastKey] = storageName;
      }
      this.__el.save(this.__storeName);
    },


    /**
     * Deletes every stored item in the storage.
     */
    clear : function() {
      // delete all entries from the storage
      for (var key in this.__reference) {
        this.__el.removeAttribute(this.__reference[key]);
      }
      this.__el.save(this.__storeName);
      // reset the internal maps
      this.__storage = {};
      this.__reference = {};
    },


    /**
     * Returns the named key at the given index.
     * @param index {Integer} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getKey : function(index) {
      return Object.keys(this.__storage)[index];
    },


    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope) {
      var length = this.getLength();
      for (var i = 0; i < length; i++) {
        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
      }
    }
  }
});
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
 * Fallback storage implementation which offers the same API as every other storage
 * but is not persistent. Basically, its just a storage API on a JavaScript map.
 *
 * @require(qx.bom.storage.Memory#getLength)
 * @require(qx.bom.storage.Memory#setItem)
 * @require(qx.bom.storage.Memory#getItem)
 * @require(qx.bom.storage.Memory#removeItem)
 * @require(qx.bom.storage.Memory#clear)
 * @require(qx.bom.storage.Memory#getKey)
 * @require(qx.bom.storage.Memory#forEach)
 */
qx.Bootstrap.define("qx.bom.storage.Memory", {
  statics : {
    __local : null,
    __session : null,

    /**
     * Returns an instance of {@link qx.bom.storage.Memory} which is of course
     * not persisted on reload.
     * @return {qx.bom.storage.Memory} A memory storage.
     */
    getLocal : function() {
      if (this.__local) {
        return this.__local;
      }
      return this.__local = new qx.bom.storage.Memory();
    },


    /**
     * Returns an instance of {@link qx.bom.storage.Memory} which is of course
     * not persisted on reload.
     * @return {qx.bom.storage.Memory} A memory storage.
     */
    getSession : function() {
      if (this.__session) {
        return this.__session;
      }
      return this.__session = new qx.bom.storage.Memory();
    }
  },


  construct : function() {
    this.__storage = {};
  },


  members : {
    __storage : null,


    /**
     * Returns the internal used map.
     * @return {Map} The storage.
     * @internal
     */
    getStorage : function() {
      return this.__storage;
    },


    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function() {
      return Object.keys(this.__storage).length;
    },


    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value) {
      value = qx.lang.Json.stringify(value);
      this.__storage[key] = value;
    },


    /**
     * Returns the stored item.
     *
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getItem : function(key) {
      var item = this.__storage[key];

      if (qx.lang.Type.isString(item)) {
        item = qx.lang.Json.parse(item);
      }
      return item;
    },


    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key) {
      delete this.__storage[key];
    },


    /**
     * Deletes every stored item in the storage.
     */
    clear : function() {
      this.__storage = {};
    },


    /**
     * Returns the named key at the given index.
     * @param index {Integer} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getKey : function(index) {
      var keys = Object.keys(this.__storage);
      return keys[index];
    },


    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope) {
      var length = this.getLength();
      for (var i = 0; i < length; i++) {
        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
      }
    }
  }
});
