(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {},
      "qx.Class": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Zenesis Limited (http://www.zenesis.com)
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * This class provides static API methods that allow the annotations of a class
   * to be inspected at runtime.
   * 
   * Annotations are added to a class when the class is defined and is an array of
   * zero or more objects; annotations are always seen to be an array, but the contents
   * of that array is not type checked and is never changed (you should not change
   * the array at runtime).
   * 
   * Annotations in the class definition are easily recognisable by the "@" symbol,
   * either as a prefix to a special keyword such as "construct", or as the prefix
   * to the name of the member which is being annotated.  The only exception to this
   * is that classes and properties don't need to be named, they just need a "@" 
   * property.
   * 
   * For example:
   * 
   * <pre class='javascript'>
   * qx.Class.define("foo.MyClass", {
   *  "@": [ "my-class-annotation" ], // Class annotations,
   *  "@construct": [ "my-constructor-annotation" ], // Constructor annotations,
   *  "@destruct": [ "my-destructor-annotation" ], // Destructor annotations,
   *  
   *  properties: {
   *    myProperty: {
   *      "@": [ "some-property-anno" ],
   *      init: null,
   *      nullable: true
   *    }
   *  },
   *  
   *  members: {
   *    "@myMethod": [ new foo.annotations.MyAnnotation(1, "test") ],
   *    myMethod: function() {
   *      // ... snip ...
   *    }
   *  },
   *  
   *  statics: {
   *    "@myStatic": [ "a static anno" ],
   *    myStatic: function() {
   *      // ... snip ... 
   *    }
   *  }
   * });
   * </pre>
   * 
   * Note that the annotation can be anything - a string can be easy and quick, but an
   * instance of a class may be appropriate for sophisticated needs (see the myMethod 
   * example above).
   * 
   * The static methods in this class allow you to programmatically get the annotations
   * that were defined; getClass() returns the class annotations, getMethod returns the 
   * annotions for the named method, etc.
   * 
   * When classes derive from each other, the default methods get the annotations for
   * the class and for the super classes as well; the array will be populated so that
   * the class's annotations are at the start, followed by it's super class, and so
   * on.  If you only want the annotations of the class and not those from the superclass,
   * use one of the getOwnXxxx methods instead.
   * 
   */
  qx.Bootstrap.define("qx.Annotation", {
    statics: {
      /**
       * Returns a list of annotations, exclusively from this class
       * @param clazz {Class} the class to inspect
       * @param name {String} the name (eg method name) to look for
       * @param group {String} the group to look in if applicable (eg "methods")
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      __getOwnAnnos: function __getOwnAnnos(clazz, name, group, annoClass) {
        if (clazz.$$annotations === undefined) {
          return [];
        }

        var annos = group ? clazz.$$annotations[group] : clazz.$$annotations;
        var match = annos && annos[name];

        if (!match) {
          return [];
        }

        if (annoClass) {
          match = match.filter(function (anno) {
            return anno instanceof annoClass;
          });
        }

        return match;
      },

      /**
       * Returns a list of annotations, from this class and superclasses
       * @param clazz {Class} the starting class to inspect
       * @param name {String} the name (eg method name) to look for
       * @param group {String} the group to look in if applicable (eg "methods")
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      __getAnnos: function __getAnnos(clazz, name, group, annoClass) {
        var result = [];

        for (var tmp = clazz; tmp; tmp = tmp.superclass) {
          if (tmp.$$annotations !== undefined) {
            var annos = group ? tmp.$$annotations[group] : tmp.$$annotations;
            var src = annos && annos[name];

            if (src) {
              if (annoClass) {
                src = src.filter(function (anno) {
                  return anno instanceof annoClass;
                });
              }

              qx.lang.Array.append(result, src);
            }
          }
        }

        return result;
      },

      /**
       * Returns the class annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnClass: function getOwnClass(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@", null, annoClass);
      },

      /**
       * Returns the class annotations, from this class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getClass: function getClass(clazz, annoClass) {
        return this.__getAnnos(clazz, "@", null, annoClass);
      },

      /**
       * Returns the class constructor's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnConstructor: function getOwnConstructor(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@construct", null, annoClass);
      },

      /**
       * Returns the class constructor's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getConstructor: function getConstructor(clazz, annoClass) {
        return this.__getAnnos(clazz, "@construct", null, annoClass);
      },

      /**
       * Returns the class destructor's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnDestructor: function getOwnDestructor(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@destruct", null, annoClass);
      },

      /**
       * Returns the class destructor's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getDestructor: function getDestructor(clazz, annoClass) {
        return this.__getAnnos(clazz, "@destruct", null, annoClass);
      },

      /**
       * Returns the class member's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} member name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnMember: function getOwnMember(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "members", annoClass);
      },

      /**
       * Returns the class member's annotations, from the class and superclass
       * @param clazz {Class} the class to inspect
       * @param name {String} member name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getMember: function getMember(clazz, name, annoClass) {
        return this.__getAnnos(clazz, name, "members", annoClass);
      },

      /**
       * Returns the class property's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} property name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnProperty: function getOwnProperty(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "properties", annoClass);
      },

      /**
       * Returns the class property's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param name {String} property name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getProperty: function getProperty(clazz, name, annoClass) {
        return this.__getAnnos(clazz, name, "properties", annoClass);
      },

      /**
       * Returns a list of property names that implement a given annotation.
       * @param clazz {Class} the class to inspect
       * @param annotation {String|Object} annotation to look for
       * @return {String[]} the property names, never null
       */
      getPropertiesByAnnotation: function getPropertiesByAnnotation(clazz, annotation) {
        var properties = [];
        qx.Class.getProperties(clazz).forEach(function (property) {
          if (qx.Annotation.getProperty(clazz, property).includes(annotation)) {
            properties.push(property);
          }
        });
        return properties;
      },

      /**
       * Returns the class static's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} static name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getStatic: function getStatic(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "statics", annoClass);
      }
    }
  });
  qx.Annotation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Annotation.js.map?dt=1587971381585