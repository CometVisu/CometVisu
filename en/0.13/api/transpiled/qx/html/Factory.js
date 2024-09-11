(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.html.Text": {
        "construct": true
      },
      "qx.html.Iframe": {
        "construct": true
      },
      "qx.html.Input": {
        "construct": true
      },
      "qx.html.Slot": {
        "construct": true
      },
      "qx.html.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019-2020 Zenesis Limited, https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (https://github.com/johnspackman, john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * Factory class used to create Virtual DOM instances by JSX support
   */
  qx.Class.define("qx.html.Factory", {
    extend: qx.core.Object,
    type: "singleton",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_245_0 = {};
      this.registerFactory("#text", function (tagName, styles, attributes) {
        return new qx.html.Text("");
      });
      this.registerFactory("iframe", function (tagName, styles, attributes) {
        return new qx.html.Iframe(attributes.src, styles, attributes);
      });
      this.registerFactory("input", function (tagName, styles, attributes) {
        return new qx.html.Input(attributes.type || "text", styles, attributes);
      });
      this.registerFactory("slot", function (tagName, styles, attributes) {
        if (tagName !== "slot") {
          throw new Error("Cannot create slot with tag <".concat(tagName, "> - only <slot> is supported"));
        }
        if (Object.keys(styles).length > 0) {
          throw new Error("Cannot create slot with attribute \"style\" - only the \"name\" attribute is supported");
        }
        Object.keys(attributes).forEach(function (key) {
          if (key !== "name") {
            throw new Error("Cannot create slot with attribute \"".concat(key, "\" - only the \"name\" attribute is supported"));
          }
        });
        return new qx.html.Slot(attributes.name);
      });
    },
    members: {
      __P_245_0: null,
      /**
       * Registers a factory; a factory is either a class, or a function which is
       * called with the parameters (tagName {String}, styles{Map?}, attributes {Map?}), and
       * which is expected to return an {Element}
       *
       * @param tagName {String} the name of the tag
       * @param factory {Class|Function} the function used to create instances for that tagName
       */
      registerFactory: function registerFactory(tagName, factory) {
        tagName = tagName.toLowerCase();
        if (this.__P_245_0[tagName] === undefined) {
          this.__P_245_0[tagName] = [];
        }
        this.__P_245_0[tagName].push(factory);
      },
      /**
       * Called to create an {Element}
       *
       * @param tagName {String} the name of the tag
       * @param attributes {Map?} the attributes to create (including style etc)
       * @return {qx.html.Node}
       */
      createElement: function createElement(tagName, attributes) {
        tagName = tagName.toLowerCase();
        if (attributes) {
          if (window.NamedNodeMap && attributes instanceof window.NamedNodeMap) {
            var newAttrs = {};
            for (var i = attributes.length - 1; i >= 0; i--) {
              newAttrs[attributes[i].name] = attributes[i].value;
            }
            attributes = newAttrs;
          }
          var styles = {};
          if (attributes.style) {
            attributes.style.split(/;/).forEach(function (seg) {
              var pos = seg.indexOf(":");
              var key = seg.substring(0, pos);
              var value = seg.substring(pos + 1).trim();
              if (key) {
                styles[key] = value;
              }
            });
            delete attributes.style;
          }
          var classname = attributes["data-qx-classname"];
          if (classname) {
            var clazz = qx.Class.getByName(classname);
          }
        }
        var factories = this.__P_245_0[tagName];
        if (factories) {
          for (var i = factories.length - 1; i > -1; i--) {
            var factory = factories[i];
            if (factory.classname && qx.Class.getByName(factory.classname) === factory) {
              return new factory(tagName, styles, attributes);
            }
            var element = factory(tagName, styles, attributes);
            if (element) {
              return element;
            }
          }
        }
        return new qx.html.Element(tagName, styles, attributes);
      }
    }
  });
  qx.html.Factory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Factory.js.map?dt=1726089046254