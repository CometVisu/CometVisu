function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Browser": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["runtime.name"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Basic runtime detection for qooxdoo.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   *
   * @ignore(environment)
   * @ignore(process)
   * @ignore(Titanium.*)
   */
  qx.Bootstrap.define("qx.bom.client.Runtime", {
    statics: {
      /**
       * Checks for the name of the runtime and returns it. In general, it checks
       * for rhino and node.js and if that could not be detected, it falls back
       * to the browser name defined by {@link qx.bom.client.Browser#getName}.
       * @return {String} The name of the current runtime.
       * @internal
       * @ignore(environment, process, Titanium.*, Packages)
       */
      getName: function getName() {
        var name = ""; // check for the Rhino runtime

        if ((typeof Packages === "undefined" ? "undefined" : _typeof(Packages)) === "object" && Object.prototype.toString.call(Packages) === "[object JavaPackage]") {
          name = "rhino"; // check for the Node.js runtime
        } else if (typeof process !== "undefined") {
          name = "node.js";
        } else if (typeof Titanium !== "undefined" && typeof Titanium.userAgent !== "undefined") {
          name = "titanium";
        } else {
          // otherwise, we think its a browser
          name = qx.bom.client.Browser.getName();
        }

        return name;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("runtime.name", statics.getName);
    }
  });
  qx.bom.client.Runtime.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Runtime.js.map?dt=1620144804959