(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.ObjectRegistry": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.MBinding": {
        "require": true
      },
      "qx.core.MLogging": {
        "require": true
      },
      "qx.core.MEvent": {
        "require": true
      },
      "qx.core.MProperty": {
        "require": true
      },
      "qx.core.MObjectId": {
        "require": true
      },
      "qx.core.MAssert": {
        "require": true
      },
      "qx.core.Property": {
        "require": true
      },
      "qx.core.IDisposable": {},
      "qx.util.Uuid": {},
      "qx.util.DisposeUtil": {},
      "qx.event.Registration": {}
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
   * The qooxdoo root class. All other classes are direct or indirect subclasses of this one.
   *
   * This class contains methods for:
   *
   * * object management (creation and destruction)
   * * interfaces for event system
   * * generic setter/getter support
   * * interfaces for logging console
   * * user friendly OO interfaces like {@link #self} or {@link #base}
   *
   * @require(qx.core.ObjectRegistry)
   */
  qx.Class.define("qx.core.Object", {
    extend: Object,
    include: qx.core.Environment.filter({
      "module.databinding": qx.data.MBinding,
      "module.logger": qx.core.MLogging,
      "module.events": qx.core.MEvent,
      "module.property": qx.core.MProperty,
      "module.objectid": qx.core.MObjectId,
      "qx.debug": qx.core.MAssert
    }),

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance
     */
    construct: function construct() {},

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** Internal type */
      $$type: "Object"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_144_0: true ? qx.core.Property : null,

      /*
      ---------------------------------------------------------------------------
        BASICS
      ---------------------------------------------------------------------------
      */

      /**
       * Return unique hash code of object
       *
       * @return {String} unique hash code of the object
       */
      toHashCode: function toHashCode() {
        if (!this.$$hash && !this.$$disposed) {
          if (false || qx.Class.hasInterface(this.constructor, qx.core.IDisposable)) {
            qx.core.ObjectRegistry.register(this);
          } else {
            qx.core.ObjectRegistry.toHashCode(this);
          }
        }

        return this.$$hash;
      },

      /**
       * Returns a UUID for this object
       * 
       * @return {String} a UUID
       */
      toUuid: function toUuid() {
        if (!this.$$uuid) {
          this.$$uuid = qx.util.Uuid.createUuidV4();
        }

        return this.$$uuid;
      },

      /**
       * Sets a UUID; normally set automatically, you would only set this manually
       * if you have a very special reason to do so - for example, you are using UUIDs which are
       * synchronized from a special source, eg remote server.
       * 
       * This can only be called once, and only if it has not been automatically allocated.  If
       * you really do need to call this, call it as soon after construction as possible to avoid
       * an exception.  
       * 
       * @param uuid {String} an ID which is unique across the whole application
       */
      setExplicitUuid: function setExplicitUuid(uuid) {
        if (Boolean(this.$$uuid)) {
          throw new Error("Cannot change the UUID of an object once set");
        }

        this.$$uuid = uuid;
      },

      /**
       * Returns a string representation of the qooxdoo object.
       *
       * @return {String} string representation of the object
       */
      toString: function toString() {
        return this.classname + "[" + this.toHashCode() + "]";
      },

      /**
       * Call the same method of the super class.
       *
       * @param args {IArguments} the arguments variable of the calling method
       * @param varargs {var?} variable number of arguments passed to the overwritten function
       * @return {var} the return value of the method of the base class.
       */
      base: function base(args, varargs) {
        if (arguments.length === 1) {
          return args.callee.base.call(this);
        } else {
          return args.callee.base.apply(this, Array.prototype.slice.call(arguments, 1));
        }
      },

      /**
       * Returns the static class (to access static members of this class)
       *
       * @param args {arguments} the arguments variable of the calling method
       * @return {var} the return value of the method of the base class.
       */
      self: function self(args) {
        return args.callee.self;
      },

      /*
      ---------------------------------------------------------------------------
        CLONE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       *
       * Returns a clone of this object. Copies over all user configured
       * property values. Do not configure a parent nor apply the appearance
       * styles directly.
       *
       * @return {qx.core.Object} The clone
       */
      clone: function clone() {
        var clazz = this.constructor;
        var clone = new clazz();
        var props = qx.Class.getProperties(clazz);
        var user = this.__P_144_0.$$store.user;
        var setter = this.__P_144_0.$$method.set;
        var name; // Iterate through properties

        for (var i = 0, l = props.length; i < l; i++) {
          name = props[i];

          if (this.hasOwnProperty(user[name])) {
            clone[setter[name]](this[user[name]]);
          }
        } // Return clone


        return clone;
      },

      /*
      ---------------------------------------------------------------------------
        USER DATA
      ---------------------------------------------------------------------------
      */

      /** @type {Map} stored user data */
      __P_144_1: null,

      /**
       * Store user defined data inside the object.
       *
       * @param key {String} the key
       * @param value {Object} the value of the user data
       */
      setUserData: function setUserData(key, value) {
        if (!this.__P_144_1) {
          this.__P_144_1 = {};
        }

        this.__P_144_1[key] = value;
      },

      /**
       * Load user defined data from the object
       *
       * @param key {String} the key
       * @return {Object} the user data
       */
      getUserData: function getUserData(key) {
        if (!this.__P_144_1) {
          return null;
        }

        var data = this.__P_144_1[key];
        return data === undefined ? null : data;
      },

      /**
       * Clears all user defined data from the object.
       */
      resetUserData: function resetUserData() {
        this.__P_144_1 = null;
      },

      /*
      ---------------------------------------------------------------------------
        DISPOSER
      ---------------------------------------------------------------------------
      */

      /**
       * Returns true if the object is disposed.
       *
       * @return {Boolean} Whether the object has been disposed
       */
      isDisposed: function isDisposed() {
        return this.$$disposed || false;
      },

      /**
       * Returns true if the object is being disposed, ie this.dispose() has started but 
       * not finished
       *
       * @return {Boolean} Whether the object is being disposed
       */
      isDisposing: function isDisposing() {
        return this.$$disposing || false;
      },

      /**
       * Dispose this object
       *
       */
      dispose: function dispose() {
        // Check first
        if (this.$$disposed) {
          return;
        } // Mark as disposed (directly, not at end, to omit recursions)


        this.$$disposed = true;
        this.$$disposing = true;
        this.$$instance = null;
        this.$$allowconstruct = null; // Debug output

        // Deconstructor support for classes
        var clazz = this.constructor;
        var mixins;

        while (clazz.superclass) {
          // Processing this class...
          if (clazz.$$destructor) {
            clazz.$$destructor.call(this);
          } // Destructor support for mixins


          if (clazz.$$includes) {
            mixins = clazz.$$flatIncludes;

            for (var i = 0, l = mixins.length; i < l; i++) {
              if (mixins[i].$$destructor) {
                mixins[i].$$destructor.call(this);
              }
            }
          } // Jump up to next super class


          clazz = clazz.superclass;
        }

        this.$$disposing = false; // Additional checks
      },

      /*
      ---------------------------------------------------------------------------
        DISPOSER UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Disconnects and disposes given objects from instance.
       * Only works with qx.core.Object based objects e.g. Widgets.
       *
       * @param varargs {arguments} Names of fields (which store objects) to dispose
       */
      _disposeObjects: function _disposeObjects(varargs) {
        qx.util.DisposeUtil.disposeObjects(this, arguments);
      },

      /**
       * Disconnects and disposes given singleton objects from instance.
       * Only works with qx.core.Object based objects e.g. Widgets.
       *
       * @param varargs {arguments} Names of fields (which store objects) to dispose
       */
      _disposeSingletonObjects: function _disposeSingletonObjects(varargs) {
        qx.util.DisposeUtil.disposeObjects(this, arguments, true);
      },

      /**
       * Disposes all members of the given array and deletes
       * the field which refers to the array afterwards.
       *
       * @param field {String} Name of the field which refers to the array
       */
      _disposeArray: function _disposeArray(field) {
        qx.util.DisposeUtil.disposeArray(this, field);
      },

      /**
       * Disposes all members of the given map and deletes
       * the field which refers to the map afterwards.
       *
       * @param field {String} Name of the field which refers to the map
       */
      _disposeMap: function _disposeMap(field) {
        qx.util.DisposeUtil.disposeMap(this, field);
      }
    },

    /*
    *****************************************************************************
       ENVIRONMENT SETTINGS
    *****************************************************************************
    */
    environment: {
      "qx.debug.dispose.level": 0
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      {
        if (!qx.core.ObjectRegistry.inShutDown) {
          // Cleanup event listeners
          qx.event.Registration.removeAllListeners(this);
        } else {
          // on shutdown, just clear the internal listener map
          qx.event.Registration.deleteAllListeners(this);
        }
      } // Cleanup object registry

      qx.core.ObjectRegistry.unregister(this); // Cleanup user data

      this.__P_144_1 = null; // only of properties are available

      {
        // Cleanup properties
        var clazz = this.constructor;
        var properties;
        var store = this.__P_144_0.$$store;
        var storeUser = store.user;
        var storeTheme = store.theme;
        var storeInherit = store.inherit;
        var storeUseinit = store.useinit;
        var storeInit = store.init;

        while (clazz) {
          properties = clazz.$$properties;

          if (properties) {
            for (var name in properties) {
              if (properties[name].dereference) {
                this[storeUser[name]] = this[storeTheme[name]] = this[storeInherit[name]] = this[storeUseinit[name]] = this[storeInit[name]] = undefined;
              }
            }
          }

          clazz = clazz.superclass;
        }
      }
    }
  });
  qx.core.Object.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Object.js.map?dt=1620512029826