(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.lang.normalize.Array": {
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.OOUtil": {}
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
  
  ************************************************************************ */

  /**
   * This class is used to define mixins (similar to mixins in Ruby).
   *
   * Mixins are collections of code and variables, which can be merged into
   * other classes. They are similar to classes but don't support inheritance.
   *
   * See the description of the {@link #define} method how a mixin is defined.
   *
   * @require(qx.lang.normalize.Array)
   */
  qx.Bootstrap.define("qx.Mixin", {
    statics: {
      /*
      ---------------------------------------------------------------------------
         PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Define a new mixin.
       *
       * Example:
       * <pre class='javascript'>
       * qx.Mixin.define("name",
       * {
       *   include: [SuperMixins],
       *
       *   properties: {
       *     tabIndex: {type: "number", init: -1}
       *   },
       *
       *   members:
       *   {
       *     prop1: "foo",
       *     meth1: function() {},
       *     meth2: function() {}
       *   }
       * });
       * </pre>
       *
       * @param name {String} name of the mixin
       * @param config {Map ? null} Mixin definition structure. The configuration map has the following keys:
       *   <table>
       *     <tr><th>Name</th><th>Type</th><th>Description</th></tr>
       *     <tr><th>construct</th><td>Function</td><td>An optional mixin constructor. It is called on instantiation each
       *         class including this mixin. The constructor takes no parameters.</td></tr>
       *     <tr><th>destruct</th><td>Function</td><td>An optional mixin destructor.</td></tr>
       *     <tr><th>include</th><td>Mixin[]</td><td>Array of mixins, which will be merged into the mixin.</td></tr>
       *     <tr><th>statics</th><td>Map</td><td>
       *         Map of statics of the mixin. The statics will not get copied into the target class. They remain
       *         accessible from the mixin. This is the same behaviour as statics in interfaces ({@link qx.Interface#define}).
       *     </td></tr>
       *     <tr><th>members</th><td>Map</td><td>Map of members of the mixin.</td></tr>
       *     <tr><th>properties</th><td>Map</td><td>Map of property definitions. For a description of the format of a property definition see
       *           {@link qx.core.Property}.</td></tr>
       *     <tr><th>events</th><td>Map</td><td>
       *         Map of events the mixin fires. The keys are the names of the events and the values are
       *         corresponding event type classes.
       *     </td></tr>
       *   </table>
       *
       * @return {qx.Mixin} The configured mixin
       */
      define: function define(name, config) {
        if (config) {
          // Normalize include
          if (config.include && !(qx.Bootstrap.getClass(config.include) === "Array")) {
            config.include = [config.include];
          } // Validate incoming data


          // Create Interface from statics
          var mixin = config.statics ? config.statics : {};
          qx.Bootstrap.setDisplayNames(mixin, name);

          for (var key in mixin) {
            if (mixin[key] instanceof Function) {
              mixin[key].$$mixin = mixin;
            }
          } // Attach configuration


          if (config.construct) {
            mixin.$$constructor = config.construct;
            qx.Bootstrap.setDisplayName(config.construct, name, "constructor");
          }

          if (config.include) {
            mixin.$$includes = config.include;
          }

          if (config.properties) {
            mixin.$$properties = config.properties;
          }

          if (config.members) {
            mixin.$$members = config.members;
            qx.Bootstrap.setDisplayNames(config.members, name + ".prototype");
          }

          for (var key in mixin.$$members) {
            if (mixin.$$members[key] instanceof Function) {
              mixin.$$members[key].$$mixin = mixin;
            }
          }

          if (config.events) {
            mixin.$$events = config.events;
          }

          if (config.destruct) {
            mixin.$$destructor = config.destruct;
            qx.Bootstrap.setDisplayName(config.destruct, name, "destruct");
          }
        } else {
          var mixin = {};
        } // Add basics


        mixin.$$type = "Mixin";
        mixin.name = name; // Attach toString

        mixin.toString = this.genericToString; // Assign to namespace

        mixin.basename = qx.Bootstrap.createNamespace(name, mixin); // Store class reference in global mixin registry

        this.$$registry[name] = mixin; // Return final mixin

        return mixin;
      },

      /**
       * Check compatibility between mixins (including their includes)
       *
       * @param mixins {Mixin[]} an array of mixins
       * @throws {Error} when there is a conflict between the mixins
       * @return {Boolean} <code>true</code> if the mixin passed the compatibility check
       */
      checkCompatibility: function checkCompatibility(mixins) {
        var list = this.flatten(mixins);
        var len = list.length;

        if (len < 2) {
          return true;
        }

        var properties = {};
        var members = {};
        var events = {};
        var mixin;

        for (var i = 0; i < len; i++) {
          mixin = list[i];

          for (var key in mixin.events) {
            if (events[key]) {
              throw new Error('Conflict between mixin "' + mixin.name + '" and "' + events[key] + '" in member "' + key + '"!');
            }

            events[key] = mixin.name;
          }

          for (var key in mixin.properties) {
            if (properties[key]) {
              throw new Error('Conflict between mixin "' + mixin.name + '" and "' + properties[key] + '" in property "' + key + '"!');
            }

            properties[key] = mixin.name;
          }

          for (var key in mixin.members) {
            if (members[key]) {
              throw new Error('Conflict between mixin "' + mixin.name + '" and "' + members[key] + '" in member "' + key + '"!');
            }

            members[key] = mixin.name;
          }
        }

        return true;
      },

      /**
       * Checks if a class is compatible to the given mixin (no conflicts)
       *
       * @param mixin {Mixin} mixin to check
       * @param clazz {Class} class to check
       * @throws {Error} when the given mixin is incompatible to the class
       * @return {Boolean} true if the mixin is compatible to the given class
       */
      isCompatible: function isCompatible(mixin, clazz) {
        var list = qx.util.OOUtil.getMixins(clazz);
        list.push(mixin);
        return qx.Mixin.checkCompatibility(list);
      },

      /**
       * Returns a mixin by name
       *
       * @param name {String} class name to resolve
       * @return {Class} the class
       */
      getByName: function getByName(name) {
        return this.$$registry[name];
      },

      /**
       * Determine if mixin exists
       *
       * @param name {String} mixin name to check
       * @return {Boolean} true if mixin exists
       */
      isDefined: function isDefined(name) {
        return this.getByName(name) !== undefined;
      },

      /**
       * Determine the number of mixins which are defined
       *
       * @return {Number} the number of mixins
       */
      getTotalNumber: function getTotalNumber() {
        return qx.Bootstrap.objectGetLength(this.$$registry);
      },

      /**
       * Generates a list of all mixins given plus all the
       * mixins these includes plus... (deep)
       *
       * @param mixins {Mixin[] ? []} List of mixins
       * @return {Array} List of all mixins
       */
      flatten: function flatten(mixins) {
        if (!mixins) {
          return [];
        } // we need to create a copy and not to modify the existing array


        var list = mixins.concat();

        for (var i = 0, l = mixins.length; i < l; i++) {
          if (mixins[i].$$includes) {
            list.push.apply(list, this.flatten(mixins[i].$$includes));
          }
        }

        return list;
      },

      /**
       * This method is used to determine the base method to call at runtime, and is used
       * by Mixins where the mixin method calls `this.base()`.  It is only required by the
       * compiler, and not the generator.
       *
       * The problem is that while Mixin's cannot override the same methods in a single class,
       * they can override methods that were implemented in a base base - but the compiler
       * cannot emit compile-time code which knows the base class method because that depends
       * on the class that the mixin is mixed-into.
       *
       * This method will search the hierarchy of the class at runtime, and figure out the 
       * nearest superclass method to call; the result is cached, and it is acceptable for
       * a mixin's method to override a method mixed into a superclass.
       *
       * Technically, this method should be private - it is internal and no notification will
       * be given if the API changes.  However, because it needs to be called by generated code
       * in any class, it has to appear as public.  Do not use it directly.
       *
       * @param clazz {Class} the class that is to be examined
       * @param mixin {Mixin} the mixin that is calling `this.base`
       * @param methodName {String} the name of the method in `mixin` that is calling `this.base`
       * @return {Function} the base class function to call
       */
      baseClassMethod: function baseClassMethod(clazz, mixin, methodName) {
        {
          if (clazz.$$mixinBaseClassMethods && clazz.$$mixinBaseClassMethods[mixin.name] !== undefined && clazz.$$mixinBaseClassMethods[mixin.name][methodName] !== undefined) {
            return clazz.$$mixinBaseClassMethods[mixin.name][methodName];
          }

          var mixedInAt = null;
          var mixedInIndex = -1;

          for (var searchClass = clazz; searchClass; searchClass = searchClass.superclass) {
            if (searchClass.$$flatIncludes) {
              var pos = searchClass.$$flatIncludes.indexOf(mixin);

              if (pos > -1) {
                mixedInAt = searchClass;
                mixedInIndex = pos;
              }
            }
          }

          var fn = null;

          if (mixedInAt) {
            for (var i = mixedInIndex - 1; i > -1; i--) {
              var peerMixin = mixedInAt.$$flatIncludes[i];

              if (peerMixin.$$members[methodName]) {
                fn = peerMixin.$$members[methodName];
                break;
              }
            }

            if (!fn && mixedInAt.superclass) {
              fn = mixedInAt.superclass.prototype[methodName];
            }
          }

          if (fn) {
            if (!clazz.$$mixinBaseClassMethods) {
              clazz.$$mixinBaseClassMethods = {};
            }

            if (!clazz.$$mixinBaseClassMethods[mixin.name]) {
              clazz.$$mixinBaseClassMethods[mixin.name] = {};
            }

            clazz.$$mixinBaseClassMethods[mixin.name][methodName] = fn;
          } else {}

          return fn;
        }
      },

      /*
      ---------------------------------------------------------------------------
         PRIVATE/INTERNAL API
      ---------------------------------------------------------------------------
      */

      /**
       * This method will be attached to all mixins to return
       * a nice identifier for them.
       *
       * @internal
       * @return {String} The mixin identifier
       */
      genericToString: function genericToString() {
        return "[Mixin " + this.name + "]";
      },

      /** Registers all defined mixins */
      $$registry: {},

      /** @type {Map} allowed keys in mixin definition */
      __P_88_0: null,

      /**
       * Validates incoming configuration and checks keys and values
       *
       * @signature function(name, config)
       * @param name {String} The name of the class
       * @param config {Map} Configuration map
       */
      __P_88_1: function __P_88_1(name, config) {}
    }
  });
  qx.Mixin.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mixin.js.map?dt=1664441195374