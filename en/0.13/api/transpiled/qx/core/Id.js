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
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  /**
   * Provides a registry of top level objects
   */
  qx.Class.define("qx.core.Id", {
    extend: qx.core.Object,
    type: "singleton",
    members: {
      __P_159_0: null,
      __P_159_1: null,

      /*
       * @Override
       */
      _createQxObject: function _createQxObject(id) {
        // Create the object, but don't add it to the list of owned objects
        var result = this._createQxObjectImpl(id);

        return result;
      },

      /*
       * @Override
       */
      _createQxObjectImpl: function _createQxObjectImpl(id) {
        if (this.__P_159_0) {
          var obj = this.__P_159_0[id];

          if (obj !== undefined) {
            return obj;
          }
        }

        switch (id) {
          case "application":
            return qx.core.Init.getApplication() || undefined;
        }

        return undefined;
      },

      /**
       * Returns an object path which can be used to locate an object anywhere in the application
       * with a call to `qx.core.Id.getQxObject()`.
       *
       * This will return null if it is not possible to calculate a path because one of the
       * ancestors has a null `qxObjectId`.
       *
       * This will also return null if the top-most ancestor is not one of the globals registered
       * with `registerObject` or a known global (such as the application); however, by passing
       * `true` as the `suppressWarnings` parameter, this will prevent errors from appearing in
       * the console when this happens
       *
       * @param obj {qx.core.Object} the object
       * @param suppressWarnings {Boolean?} default: false; silently returns null if an ID cannot be created
       * @return {String} full path to the object
       */
      getAbsoluteIdOf: function getAbsoluteIdOf(obj, suppressWarnings) {
        if (this.__P_159_1 && this.__P_159_1[obj.toHashCode()]) {
          return obj.getQxObjectId();
        }

        var segs = [];
        var application = qx.core.Init.getApplication();

        while (obj) {
          var id = obj.getQxObjectId();

          if (!id) {
            if (!suppressWarnings) {
              this.error("Cannot determine an absolute Object ID because one of the ancestor ObjectID's is null (got as far as " + segs.join('/') + ")");
            }

            return null;
          }

          segs.unshift(id);
          var owner = obj.getQxOwner();

          if (owner) {
            // Find the ID of the owner, *if* it is registered as a top level object
            var ownerId = null;

            if (owner === application) {
              ownerId = "application";
            } else {
              ownerId = this.__P_159_1 && this.__P_159_1[owner.toHashCode()] || null;
            } // When we have found the ID of a top level object, add it to the path and stop


            if (ownerId) {
              segs.unshift(ownerId);
              break;
            }
          } else {
            if (!suppressWarnings) {
              this.error("Cannot determine a global absolute Object ID because the topmost object is not registered");
            }

            return null;
          }

          obj = owner;
        }

        var path = segs.join("/");
        return path;
      },

      /**
       * Registers an object with an ID; as this is registering a global object which is the root of a tree
       * of objects with IDs, the `id` parameter can be provided to set the ID used for the root object - this
       * allows an object to be registered under a well known, common name without affecting the API of the
       * object.
       *
       * @param obj {qx.core.Object} the object to register
       * @param id {String?} the ID to register the object under, otherwise the object's own Object Id is used
       */
      register: function register(obj, id) {
        if (!this.__P_159_0) {
          this.__P_159_0 = {};
          this.__P_159_1 = {};
        }

        if (!id) {
          id = obj.getQxObjectId();
        }

        this.__P_159_0[id] = obj;
        this.__P_159_1[obj.toHashCode()] = id;

        obj._cascadeQxObjectIdChanges();
      },

      /**
       * Unregisters a previously registered object with an ID
       *
       * @param data {Object|String} the object to unregister, or the ID of the object
       * @return {Boolean} whether there was an object to unregister
       */
      unregister: function unregister(data) {
        if (!this.__P_159_0) {
          return false;
        }

        var id;

        if (typeof data == "string") {
          id = data;
        } else {
          var hash = data.toHashCode();
          id = this.__P_159_1[hash];

          if (!id) {
            return false;
          }
        }

        var obj = this.__P_159_0[id];

        if (obj) {
          delete this.__P_159_0[id];
          delete this.__P_159_1[obj.toHashCode()];

          obj._cascadeQxObjectIdChanges();

          return true;
        }

        return false;
      },

      /**
       * Returns a map of the objects that have been registered as id roots, with
       * the topmost part of the ID as key.
       * @return {Object}
       */
      getRegisteredObjects: function getRegisteredObjects() {
        return this.__P_159_0;
      }
    },
    statics: {
      /**
       * Returns a top level instance
       *
       * @param id {String} the ID to look for
       * @return {qx.core.Object?} the object
       */
      getQxObject: function getQxObject(id) {
        return this.getInstance().getQxObject(id);
      },

      /**
       * Helper for `qx.core.Id.getAbsoluteIdOf`
       *
       * @param obj {qx.core.Object} the object
       * @param suppressWarnings {Boolean?} default: false; silently returns null if an ID cannot be created
       * @return {String} full path to the object
       */
      getAbsoluteIdOf: function getAbsoluteIdOf(obj, suppressWarnings) {
        return this.getInstance().getAbsoluteIdOf(obj, suppressWarnings);
      }
    }
  });
  qx.core.Id.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Id.js.map?dt=1664557339136