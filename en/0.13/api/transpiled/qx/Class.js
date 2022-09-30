(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Mixin": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Array": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Date": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Error": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Function": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.String": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Object": {
        "require": true,
        "defer": "runtime"
      },
      "qx.lang.normalize.Number": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Property": {
        "require": true
      },
      "qx.core.Environment": {},
      "qx.util.OOUtil": {
        "require": true
      },
      "qx.lang.Type": {}
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
       * John Spackman (john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * This class is one of the most important parts of qooxdoo's
   * object-oriented features.
   *
   * Its {@link #define} method is used to create qooxdoo classes.
   *
   * Each instance of a class defined by {@link #define} has
   * the following keys attached to the constructor and the prototype:
   *
   * <table>
   * <tr><th><code>classname</code></th><td>The fully-qualified name of the class (e.g. <code>"qx.ui.core.Widget"</code>).</td></tr>
   * <tr><th><code>basename</code></th><td>The namespace part of the class name (e.g. <code>"qx.ui.core"</code>).</td></tr>
   * <tr><th><code>constructor</code></th><td>A reference to the constructor of the class.</td></tr>
   * <tr><th><code>superclass</code></th><td>A reference to the constructor of the super class.</td></tr>
   * </table>
   *
   * Each method may access static members of the same class by using
   * <code>this.self(arguments)</code> ({@link qx.core.Object#self}):
   * <pre class='javascript'>
   * statics : { FOO : "bar" },
   * members: {
   *   baz: function(x) {
   *     this.self(arguments).FOO;
   *     ...
   *   }
   * }
   * </pre>
   *
   * Each overriding method may call the overridden method by using
   * <code>this.base(arguments [, ...])</code> ({@link qx.core.Object#base}). This is also true for calling
   * the constructor of the superclass.
   * <pre class='javascript'>
   * members: {
   *   foo: function(x) {
   *     this.base(arguments, x);
   *     ...
   *   }
   * }
   * </pre>
   *
   * By using <code>qx.Class</code> within an app, the native JS data types are
   * conveniently polyfilled according to {@link qx.lang.normalize}.
   * 
   * Annotations can be added to classes, constructors, destructors, and methods, properties, and statics - 
   * see <code>qx.Annotation</code> for examples and means access annotations at runtime.
   *
   * @require(qx.Interface)
   * @require(qx.Mixin)
   * @require(qx.lang.normalize.Array)
   * @require(qx.lang.normalize.Date)
   * @require(qx.lang.normalize.Error)
   * @require(qx.lang.normalize.Function)
   * @require(qx.lang.normalize.String)
   * @require(qx.lang.normalize.Object)
   * @require(qx.lang.normalize.Number)
   */
  qx.Bootstrap.define("qx.Class", {
    statics: {
      /**
       * A static reference to the property implementation in the case it
       * should be included.
       */
      __P_86_0: true ? qx.core.Property : null,

      /*
      ---------------------------------------------------------------------------
         PUBLIC METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Define a new class using the qooxdoo class system. This sets up the
       * namespace for the class and generates the class from the definition map.
       *
       * Example:
       * <pre class='javascript'>
       * qx.Class.define("name",
       * {
       *   extend : Object, // superclass
       *   implement : [Interfaces],
       *   include : [Mixins],
       *
       *   statics:
       *   {
       *     CONSTANT : 3.141,
       *
       *     publicMethod: function() {},
       *     _protectedMethod: function() {},
       *     __privateMethod: function() {}
       *   },
       *
       *   properties:
       *   {
       *     "tabIndex": { check: "Number", init : -1 }
       *   },
       *
       *   members:
       *   {
       *     publicField: "foo",
       *     publicMethod: function() {},
       *
       *     _protectedField: "bar",
       *     _protectedMethod: function() {},
       *
       *     __privateField: "baz",
       *     __privateMethod: function() {}
       *   }
       * });
       * </pre>
       *
       * @param name {String?null} Name of the class. If <code>null</code>, the class
       *   will not be added to any namespace which could be handy for testing.
       * @param config {Map ? null} Class definition structure. The configuration map has the following keys:
       *     <table>
       *       <tr><th>Name</th><th>Type</th><th>Description</th></tr>
       *       <tr><th>type</th><td>String</td><td>
       *           Type of the class. Valid types are "abstract", "static" and "singleton".
       *           If unset it defaults to a regular non-static class.
       *       </td></tr>
       *       <tr><th>extend</th><td>Class</td><td>The super class the current class inherits from.</td></tr>
       *       <tr><th>implement</th><td>Interface | Interface[]</td><td>Single interface or array of interfaces the class implements.</td></tr>
       *       <tr><th>include</th><td>Mixin | Mixin[]</td><td>Single mixin or array of mixins, which will be merged into the class.</td></tr>
       *       <tr><th>construct</th><td>Function</td><td>The constructor of the class.</td></tr>
       *       <tr><th>statics</th><td>Map</td><td>Map of static members of the class.</td></tr>
       *       <tr><th>properties</th><td>Map</td><td>Map of property definitions. For a description of the format of a property definition see
       *           {@link qx.core.Property}.</td></tr>
       *       <tr><th>members</th><td>Map</td><td>Map of instance members of the class.</td></tr>
       *       <tr><th>environment</th><td>Map</td><td>Map of environment settings for this class. For a description of the format of a setting see
       *           {@link qx.core.Environment}.</td></tr>
       *       <tr><th>events</th><td>Map</td><td>
       *           Map of events the class fires. The keys are the names of the events and the values are the
       *           corresponding event type class names.
       *       </td></tr>
       *       <tr><th>defer</th><td>Function</td><td>Function that is called at the end of processing the class declaration. It allows access to the declared statics, members and properties.</td></tr>
       *       <tr><th>destruct</th><td>Function</td><td>The destructor of the class.</td></tr>
       *     </table>
       * @return {Class} The defined class
       */
      define: function define(name, config) {
        if (!config) {
          config = {};
        } // Normalize include to array


        if (config.include && !(qx.Bootstrap.getClass(config.include) === "Array")) {
          config.include = [config.include];
        } // Normalize implement to array


        if (config.implement && !(qx.Bootstrap.getClass(config.implement) === "Array")) {
          config.implement = [config.implement];
        } // Normalize type


        var implicitType = false;

        if (!config.hasOwnProperty("extend") && !config.type) {
          config.type = "static";
          implicitType = true;
        } // Validate incoming data


        // Create the class
        var clazz = this.__P_86_1(name, config.type, config.extend, config.statics, config.construct, config.destruct, config.include); // Initialise class and constructor/destructor annotations


        ["@", "@construct", "@destruct"].forEach(function (id) {
          this.__P_86_2(clazz, id, null, config[id]);
        }, this); // Members, properties, events and mixins are only allowed for non-static classes

        if (config.extend) {
          // Attach properties
          if (config.properties) {
            this.__P_86_3(clazz, config.properties, true);
          } // Attach members


          if (config.members) {
            this.__P_86_4(clazz, config.members, true, true, false);
          } // Process events


          if (config.events) {
            this.__P_86_5(clazz, config.events, true);
          } // Include mixins
          // Must be the last here to detect conflicts


          if (config.include) {
            for (var i = 0, l = config.include.length; i < l; i++) {
              this.__P_86_6(clazz, config.include[i], false);
            }
          }
        } // If config has a 'extend' key but it's null or undefined
        else if (config.hasOwnProperty('extend') && false) {
            throw new Error('"extend" parameter is null or undefined');
          } // Process environment


        if (config.environment) {
          for (var key in config.environment) {
            qx.core.Environment.add(key, config.environment[key]);
          }
        } // Interface support for non-static classes


        if (config.implement) {
          for (var i = 0, l = config.implement.length; i < l; i++) {
            this.__P_86_7(clazz, config.implement[i]);
          }
        }

        // Process defer
        if (config.defer) {
          config.defer.self = clazz;
          qx.Bootstrap.addPendingDefer(clazz, function () {
            clazz = qx.Class.getByName(clazz.classname);
            config.defer(clazz, clazz.prototype, {
              add: function add(name, config) {
                // build pseudo properties map
                var properties = {};
                properties[name] = config; // execute generic property handler

                qx.Class.__P_86_3(clazz, properties, true);
              }
            });
          });
        }

        return clazz;
      },

      /**
       * Removes a class from qooxdoo defined by {@link #define}
       *
       * @param name {String} Name of the class
       */
      undefine: function undefine(name) {
        // first, delete the class from the registry
        delete this.$$registry[name]; // delete the class reference from the namespaces and all empty namespaces

        var ns = name.split("."); // build up an array containing all namespace objects including window

        var objects = [window];

        for (var i = 0; i < ns.length; i++) {
          objects.push(objects[i][ns[i]]);
        } // go through all objects and check for the constructor or empty namespaces


        for (var i = objects.length - 1; i >= 1; i--) {
          var last = objects[i];
          var parent = objects[i - 1];

          if (qx.Bootstrap.isFunction(last) || qx.Bootstrap.objectGetLength(last) === 0) {
            delete parent[ns[i - 1]];
          } else {
            break;
          }
        }
      },

      /**
       * Whether the given class exists
       *
       * @signature function(name)
       * @param name {String} class name to check
       * @return {Boolean} true if class exists
       */
      isDefined: qx.util.OOUtil.classIsDefined,

      /**
       * Determine the total number of classes
       *
       * @return {Number} the total number of classes
       */
      getTotalNumber: function getTotalNumber() {
        return qx.Bootstrap.objectGetLength(this.$$registry);
      },

      /**
       * Find a class by its name
       *
       * @signature function(name)
       * @param name {String} class name to resolve
       * @return {Class} the class
       */
      getByName: qx.Bootstrap.getByName,

      /**
       * Include all features of the given mixin into the class. The mixin must
       * not include any methods or properties that are already available in the
       * class. This would only be possible using the {@link #patch} method.
       *
       * @param clazz {Class} An existing class which should be augmented by including a mixin.
       * @param mixin {Mixin} The mixin to be included.
       */
      include: function include(clazz, mixin) {
        qx.Class.__P_86_6(clazz, mixin, false);
      },

      /**
       * Include all features of the given mixin into the class. The mixin may
       * include features, which are already defined in the target class. Existing
       * features of equal name will be overwritten.
       * Please keep in mind that this functionality is not intended for regular
       * use, but as a formalized way (and a last resort) in order to patch
       * existing classes.
       * 
       * <b>WARNING</b>: You may break working classes and features.
       *
       * @param clazz {Class} An existing class which should be modified by including a mixin.
       * @param mixin {Mixin} The mixin to be included.
       * @return {Class} the new class definition
       */
      patch: function patch(clazz, mixin) {
        qx.Class.__P_86_6(clazz, mixin, true);

        return qx.Class.getByName(clazz.classname);
      },

      /**
       * Detects whether the object is a Class (and not an instance of a class)
       * 
       *  @param obj {Object?} the object to inspect
       *  @return {Boolean} true if it is a class, false if it is anything else
       */
      isClass: function isClass(obj) {
        return obj && obj.$$type === "Class" && obj.constructor === obj;
      },

      /**
       * Whether a class is a direct or indirect sub class of another class,
       * or both classes coincide.
       *
       * @param clazz {Class} the class to check.
       * @param superClass {Class} the potential super class
       * @return {Boolean} whether clazz is a sub class of superClass.
       */
      isSubClassOf: function isSubClassOf(clazz, superClass) {
        if (!clazz) {
          return false;
        }

        if (clazz == superClass) {
          return true;
        }

        if (clazz.prototype instanceof superClass) {
          return true;
        }

        return false;
      },

      /**
       * Returns the definition of the given property. Returns null
       * if the property does not exist.
       *
       * @signature function(clazz, name)
       * @param clazz {Class} class to check
       * @param name {String} name of the class to check for
       * @return {Map|null} whether the object support the given event.
       */
      getPropertyDefinition: qx.util.OOUtil.getPropertyDefinition,

      /**
       * Returns a list of all properties supported by the given class
       *
       * @param clazz {Class} Class to query
       * @return {String[]} List of all property names
       */
      getProperties: function getProperties(clazz) {
        var list = [];

        while (clazz) {
          if (clazz.$$properties) {
            list.push.apply(list, Object.keys(clazz.$$properties));
          }

          clazz = clazz.superclass;
        }

        return list;
      },

      /**
       * Returns the class or one of its superclasses which contains the
       * declaration for the given property in its class definition. Returns null
       * if the property is not specified anywhere.
       *
       * @param clazz {Class} class to look for the property
       * @param name {String} name of the property
       * @return {Class | null} The class which includes the property
       */
      getByProperty: function getByProperty(clazz, name) {
        while (clazz) {
          if (clazz.$$properties && clazz.$$properties[name]) {
            return clazz;
          }

          clazz = clazz.superclass;
        }

        return null;
      },

      /**
       * Whether a class has the given property
       *
       * @signature function(clazz, name)
       * @param clazz {Class} class to check
       * @param name {String} name of the property to check for
       * @return {Boolean} whether the class includes the given property.
       */
      hasProperty: qx.util.OOUtil.hasProperty,

      /**
       * Returns the event type of the given event. Returns null if
       * the event does not exist.
       *
       * @signature function(clazz, name)
       * @param clazz {Class} class to check
       * @param name {String} name of the event
       * @return {String|null} Event type of the given event.
       */
      getEventType: qx.util.OOUtil.getEventType,

      /**
       * Whether a class supports the given event type
       *
       * @signature function(clazz, name)
       * @param clazz {Class} class to check
       * @param name {String} name of the event to check for
       * @return {Boolean} whether the class supports the given event.
       */
      supportsEvent: qx.util.OOUtil.supportsEvent,

      /**
       * Whether a class directly includes a mixin.
       *
       * @param clazz {Class} class to check
       * @param mixin {Mixin} the mixin to check for
       * @return {Boolean} whether the class includes the mixin directly.
       */
      hasOwnMixin: function hasOwnMixin(clazz, mixin) {
        return clazz.$$includes && clazz.$$includes.indexOf(mixin) !== -1;
      },

      /**
       * Returns the class or one of its superclasses which contains the
       * declaration for the given mixin. Returns null if the mixin is not
       * specified anywhere.
       *
       * @param clazz {Class} class to look for the mixin
       * @param mixin {Mixin} mixin to look for
       * @return {Class | null} The class which directly includes the given mixin
       */
      getByMixin: function getByMixin(clazz, mixin) {
        var list, i, l;

        while (clazz) {
          if (clazz.$$includes) {
            list = clazz.$$flatIncludes;

            for (i = 0, l = list.length; i < l; i++) {
              if (list[i] === mixin) {
                return clazz;
              }
            }
          }

          clazz = clazz.superclass;
        }

        return null;
      },

      /**
       * Returns a list of all mixins available in a given class.
       *
       * @signature function(clazz)
       * @param clazz {Class} class which should be inspected
       * @return {Mixin[]} array of mixins this class uses
       */
      getMixins: qx.util.OOUtil.getMixins,

      /**
       * Whether a given class or any of its superclasses includes a given mixin.
       *
       * @param clazz {Class} class to check
       * @param mixin {Mixin} the mixin to check for
       * @return {Boolean} whether the class includes the mixin.
       */
      hasMixin: function hasMixin(clazz, mixin) {
        return !!this.getByMixin(clazz, mixin);
      },

      /**
       * Whether a given class directly includes an interface.
       *
       * This function will only return "true" if the interface was defined
       * in the class declaration ({@link qx.Class#define}) using the "implement"
       * key.
       *
       * @param clazz {Class} class or instance to check
       * @param iface {Interface} the interface to check for
       * @return {Boolean} whether the class includes the mixin directly.
       */
      hasOwnInterface: function hasOwnInterface(clazz, iface) {
        return clazz.$$implements && clazz.$$implements.indexOf(iface) !== -1;
      },

      /**
       * Returns the class or one of its super classes which contains the
       * declaration of the given interface. Returns null if the interface is not
       * specified anywhere.
       *
       * @signature function(clazz, iface)
       * @param clazz {Class} class to look for the interface
       * @param iface {Interface} interface to look for
       * @return {Class | null} the class which directly implements the given interface
       */
      getByInterface: qx.util.OOUtil.getByInterface,

      /**
       * Returns a list of all interfaces a given class has to implement.
       *
       * @param clazz {Class} class which should be inspected
       * @return {Interface[]} array of interfaces this class implements
       */
      getInterfaces: function getInterfaces(clazz) {
        var list = [];

        while (clazz) {
          if (clazz.$$implements) {
            list.push.apply(list, clazz.$$flatImplements);
          }

          clazz = clazz.superclass;
        }

        return list;
      },

      /**
       * Whether a given class or any of its super classes includes a given interface.
       *
       * This function will return "true" if the interface was defined
       * in the class declaration ({@link qx.Class#define}) of the class
       * or any of its super classes using the "implement"
       * key.
       *
       * @signature function(clazz, iface)
       * @param clazz {Class} class to check
       * @param iface {Interface} the interface to check for
       * @return {Boolean} whether the class includes the interface.
       */
      hasInterface: qx.util.OOUtil.hasInterface,

      /**
       * Whether a given class complies to an interface.
       *
       * Checks whether all methods defined in the interface are
       * implemented. The class does not need to implement
       * the interface explicitly in the <code>extend</code> key.
       *
       * @param obj {Object} class to check
       * @param iface {Interface} the interface to check for
       * @return {Boolean} whether the class conforms to the interface.
       */
      implementsInterface: function implementsInterface(obj, iface) {
        var clazz = obj.constructor;

        if (this.hasInterface(clazz, iface)) {
          return true;
        }

        if (qx.Interface.objectImplements(obj, iface)) {
          return true;
        }

        if (qx.Interface.classImplements(clazz, iface)) {
          return true;
        }

        return false;
      },

      /**
       * Helper method to handle singletons
       *
       * @internal
       * @return {Object} The singleton instance
       */
      getInstance: function getInstance() {
        if (this.$$instance === null) {
          throw new Error("Singleton instance of " + this + " is requested, but not ready yet. This is most likely due to a recursive call in the constructor path.");
        }

        if (!this.$$instance) {
          this.$$allowconstruct = true;
          this.$$instance = null; // null means "object is being created"; needed for another call of getInstance() during instantiation

          this.$$instance = new this();
          delete this.$$allowconstruct;
        }

        return this.$$instance;
      },

      /**
       * Retreive all subclasses of a given class
       *
       * @param clazz {Class} the class which should be inspected
       * 
       * @return {Object} class name hash holding the references to the subclasses or null if the class does not exist.
       */
      getSubclasses: function getSubclasses(clazz) {
        if (!clazz) {
          return null;
        }

        var subclasses = {};
        var registry = qx.Class.$$registry;

        for (var name in registry) {
          if (registry[name].superclass && registry[name].superclass == clazz) {
            subclasses[name] = registry[name];
          }
        }

        return subclasses;
      },

      /*
      ---------------------------------------------------------------------------
         PRIVATE/INTERNAL BASICS
      ---------------------------------------------------------------------------
      */

      /**
       * This method will be attached to all classes to return
       * a nice identifier for them.
       *
       * @internal
       * @return {String} The class identifier
       */
      genericToString: function genericToString() {
        return "[Class " + this.classname + "]";
      },

      /** Stores all defined classes */
      $$registry: qx.Bootstrap.$$registry,

      /** @type {Map} allowed keys in non-static class definition */
      __P_86_8: null,

      /** @type {Map} allowed keys in static class definition */
      __P_86_9: null,

      /**
       * Validates an incoming configuration and checks for proper keys and values
       *
       * @signature function(name, config)
       * @param name {String} The name of the class
       * @param config {Map} Configuration map
       */
      __P_86_10: function __P_86_10(name, config) {},

      /**
       * Validates the interfaces required by abstract base classes
       *
       * @signature function(clazz)
       * @param clazz {Class} The configured class.
       */
      __P_86_11: function __P_86_11(clazz) {},

      /**
       * Attaches an annotation to a class
       *
       * @param clazz {Map} Static methods or fields
       * @param group {String} Group name
       * @param key {String} Name of the annotated item
       * @param anno {Object} Annotation object
       */
      __P_86_2: function __P_86_2(clazz, group, key, anno) {
        if (anno !== undefined) {
          if (clazz.$$annotations === undefined) {
            clazz.$$annotations = {};
            clazz.$$annotations[group] = {};
          } else if (clazz.$$annotations[group] === undefined) {
            clazz.$$annotations[group] = {};
          }

          if (!qx.lang.Type.isArray(anno)) {
            anno = [anno];
          }

          if (key) {
            clazz.$$annotations[group][key] = anno;
          } else {
            clazz.$$annotations[group] = anno;
          }
        }
      },

      /**
       * Creates a class by type. Supports modern inheritance etc.
       *
       * @param name {String} Full name of the class
       * @param type {String} type of the class, i.e. "static", "abstract" or "singleton"
       * @param extend {Class} Superclass to inherit from
       * @param statics {Map} Static methods or fields
       * @param construct {Function} Constructor of the class
       * @param destruct {Function} Destructor of the class
       * @param mixins {Mixin[]} array of mixins of the class
       * @return {Class} The generated class
       */
      __P_86_1: function __P_86_1(name, type, extend, statics, construct, destruct, mixins) {
        var isStrictMode = function isStrictMode() {
          return typeof this == 'undefined';
        };

        var clazz;

        if (!extend && true) {
          // Create empty/non-empty class
          clazz = statics || {};
          qx.Bootstrap.setDisplayNames(clazz, name);
        } else {
          clazz = {};

          if (extend) {
            // Create default constructor
            if (!construct) {
              construct = this.__P_86_12();
            }

            clazz = this.__P_86_13(construct, name, type); // Add singleton getInstance()

            if (type === "singleton") {
              clazz.getInstance = this.getInstance;
            }

            qx.Bootstrap.setDisplayName(construct, name, "constructor");
          } // Copy statics


          if (statics) {
            qx.Bootstrap.setDisplayNames(statics, name);
            var key;

            for (var i = 0, a = Object.keys(statics), l = a.length; i < l; i++) {
              key = a[i];
              var staticValue = statics[key];

              if (key.charAt(0) === '@') {
                continue;
              }

              {
                clazz[key] = staticValue;
              } // Attach annotations

              this.__P_86_2(clazz, "statics", key, statics["@" + key]);
            }
          }
        } // Create namespace


        var basename = name ? qx.Bootstrap.createNamespace(name, clazz) : ""; // Store names in constructor/object

        clazz.classname = name;

        if (!isStrictMode()) {
          try {
            clazz.name = name;
          } catch (ex) {// Nothing
          }
        }

        clazz.basename = basename; // Store type info

        clazz.$$type = "Class";

        if (type) {
          clazz.$$classtype = type;
        } // Attach toString


        if (!clazz.hasOwnProperty("toString")) {
          clazz.toString = this.genericToString;
        }

        if (extend) {
          qx.Bootstrap.extendClass(clazz, construct, extend, name, basename); // Store destruct onto class

          if (destruct) {
            clazz.$$destructor = destruct;
            qx.Bootstrap.setDisplayName(destruct, name, "destruct");
          }
        } // Store class reference in global class registry


        this.$$registry[name] = clazz; // Return final class object

        return clazz;
      },

      /*
      ---------------------------------------------------------------------------
         PRIVATE ADD HELPERS
      ---------------------------------------------------------------------------
      */

      /**
       * Attach events to the class
       *
       * @param clazz {Class} class to add the events to
       * @param events {Map} map of event names the class fires.
       * @param patch {Boolean ? false} Enable redefinition of event type?
       */
      __P_86_5: function __P_86_5(clazz, events, patch) {
        if (clazz.$$events) {
          for (var key in events) {
            clazz.$$events[key] = events[key];
          }
        } else {
          clazz.$$events = events;
        }
      },

      /**
       * Attach properties to classes
       *
       * @param clazz {Class} class to add the properties to
       * @param properties {Map} map of properties
       * @param patch {Boolean ? false} Overwrite property with the limitations of a property
                 which means you are able to refine but not to replace (esp. for new properties)
       */
      __P_86_3: function __P_86_3(clazz, properties, patch) {
        // check for the property module
        var config;

        if (patch === undefined) {
          patch = false;
        }

        var proto = clazz.prototype;

        for (var name in properties) {
          config = properties[name]; // Check incoming configuration

          // Store name into configuration
          config.name = name; // Add config to local registry

          if (!config.refine) {
            if (clazz.$$properties === undefined) {
              clazz.$$properties = {};
            }

            clazz.$$properties[name] = config;
          } // Store init value to prototype. This makes it possible to
          // overwrite this value in derived classes.


          if (config.init !== undefined) {
            clazz.prototype["$$init_" + name] = config.init;
          } // register event name


          if (config.event !== undefined) {
            // break if no events layer loaded
            var event = {};
            event[config.event] = "qx.event.type.Data";

            if (config.async) {
              event[config.event + "Async"] = "qx.event.type.Data";
            }

            this.__P_86_5(clazz, event, patch);
          } // Remember inheritable properties


          if (config.inheritable) {
            this.__P_86_0.$$inheritable[name] = true;

            if (!proto.$$refreshInheritables) {
              this.__P_86_0.attachRefreshInheritables(clazz);
            }
          }

          if (!config.refine) {
            this.__P_86_0.attachMethods(clazz, name, config);
          } // Add annotations


          this.__P_86_2(clazz, "properties", name, config["@"]);
        }
      },

      /**
       * Validates the given property
       *
       * @signature function(clazz, name, config, patch)
       * @param clazz {Class} class to add property to
       * @param name {String} name of the property
       * @param config {Map} configuration map
       * @param patch {Boolean ? false} enable refine/patch?
       */
      __P_86_14: null,

      /**
       * Attach members to a class
       *
       * @param clazz {Class} clazz to add members to
       * @param members {Map} The map of members to attach
       * @param patch {Boolean ? false} Enable patching of
       * @param base {Boolean ? true} Attach base flag to mark function as members
       *     of this class
       * @param wrap {Boolean ? false} Whether the member method should be wrapped.
       *     this is needed to allow base calls in patched mixin members.
       */
      __P_86_4: function __P_86_4(clazz, members, patch, base, wrap) {
        var proto = clazz.prototype;
        var key, member;
        qx.Bootstrap.setDisplayNames(members, clazz.classname + ".prototype");

        for (var i = 0, a = Object.keys(members), l = a.length; i < l; i++) {
          key = a[i];
          member = members[key];

          // Annotations are not members
          if (key.charAt(0) === '@') {
            var annoKey = key.substring(1);

            if (members[annoKey] === undefined) {
              this.__P_86_2(clazz, "members", annoKey, members[key]);
            }

            continue;
          } // If it's a property accessor, we need to install it now so that this.base can refer to it


          if (proto[key] != undefined && proto[key].$$install) {
            proto[key].$$install();
          } // Added helper stuff to functions
          // Hint: Could not use typeof function because RegExp objects are functions, too
          // Protect to apply base property and aspect support on special attributes e.g.
          // classes which are function like as well.


          if (base !== false && member instanceof Function && member.$$type == null) {
            if (false && wrap == true) {
              // wrap "patched" mixin member
              member = this.__P_86_15(member, proto[key]);
            } else if (wrap != true) {
              // Configure extend (named base here)
              // Hint: proto[key] is not yet overwritten here
              if (proto[key]) {
                member.base = proto[key];
              }

              member.self = clazz;
            }
          } // Attach member


          proto[key] = member; // Attach annotations

          this.__P_86_2(clazz, "members", key, members["@" + key]);
        }
      },

      /**
       * Wraps a member function of a mixin, which is included using "patch". This
       * allows "base" calls in the mixin member function.
       *
       * @param member {Function} The mixin method to wrap
       * @param base {Function} The overwritten method
       * @return {Function} the wrapped mixin member
       */
      __P_86_15: function __P_86_15(member, base) {
        {
          throw new Error("This function should not be used except with code compiled by the generator (ie python toolchain)");
        }
      },

      /**
       * Add a single interface to a class
       *
       * @param clazz {Class} class to add interface to
       * @param iface {Interface} the Interface to add
       */
      __P_86_7: function __P_86_7(clazz, iface) {
        // Store interface reference
        var list = qx.Interface.flatten([iface]);

        if (clazz.$$implements) {
          clazz.$$implements.push(iface);
          clazz.$$flatImplements.push.apply(clazz.$$flatImplements, list);
        } else {
          clazz.$$implements = [iface];
          clazz.$$flatImplements = list;
        }
      },

      /**
       * Include all features of the mixin into the given class, recursively.
       *
       * @param clazz {Class} The class onto which the mixin should be attached.
       * @param mixin {Mixin} Include all features of this mixin
       * @param patch {Boolean} Overwrite existing fields, functions and properties
       */
      __P_86_6: function __P_86_6(clazz, mixin, patch) {
        if (this.hasMixin(clazz, mixin)) {
          return;
        } // Attach content


        var list = qx.Mixin.flatten([mixin]);
        var entry;

        for (var i = 0, l = list.length; i < l; i++) {
          entry = list[i]; // Attach events

          if (entry.$$events) {
            this.__P_86_5(clazz, entry.$$events, patch);
          } // Attach properties (Properties are already readonly themselves, no patch handling needed)


          if (entry.$$properties) {
            this.__P_86_3(clazz, entry.$$properties, patch);
          } // Attach members (Respect patch setting, but dont apply base variables)


          if (entry.$$members) {
            this.__P_86_4(clazz, entry.$$members, patch, patch, patch);
          }
        } // Store mixin reference


        if (clazz.$$includes) {
          clazz.$$includes.push(mixin);
          clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes, list);
        } else {
          clazz.$$includes = [mixin];
          clazz.$$flatIncludes = list;
        }
      },

      /*
      ---------------------------------------------------------------------------
         PRIVATE FUNCTION HELPERS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the default constructor.
       * This constructor just calls the constructor of the base class.
       *
       * @return {Function} The default constructor.
       */
      __P_86_12: function __P_86_12() {
        function defaultConstructor() {
          defaultConstructor.base.apply(this, arguments);
        }

        return defaultConstructor;
      },

      /**
       * Generate a wrapper of the original class constructor in order to enable
       * some of the advanced OO features (e.g. abstract class, singleton, mixins)
       *
       * @param construct {Function} the original constructor
       * @param name {String} name of the class
       * @param type {String} the user specified class type
       * @return {Function} The wrapped constructor
       */
      __P_86_13: function __P_86_13(construct, name, type) {
        var _wrapper = function wrapper() {
          var clazz = _wrapper;
          // Execute default constructor
          var retval = clazz.$$original.apply(this, arguments); // Initialize local mixins

          if (clazz.$$includes) {
            var mixins = clazz.$$flatIncludes;

            for (var i = 0, l = mixins.length; i < l; i++) {
              if (mixins[i].$$constructor) {
                mixins[i].$$constructor.apply(this, arguments);
              }
            }
          }

          // Return optional return value
          return retval;
        };

        // Store original constructor
        _wrapper.$$original = construct; // Store wrapper into constructor (needed for base calls etc.)

        construct.wrapper = _wrapper; // Return generated wrapper

        return _wrapper;
      }
    },
    defer: function defer() {}
  });
  qx.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1664557332707