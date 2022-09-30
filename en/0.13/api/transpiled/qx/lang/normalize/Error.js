(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.EcmaScript": {
        "defer": "load",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "ecmascript.error.toString": {
          "defer": true,
          "className": "qx.bom.client.EcmaScript"
        }
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
   * This class is responsible for the normalization of the native 'Error' object.
   * It contains a simple bugfix for toString which might not print out the proper
   * error message.
   *
   * @group (Polyfill)
   */
  qx.Bootstrap.define("qx.lang.normalize.Error", {
    statics: {
      /**
       * Returns a string representation of the Error object.
       *
       * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/toString">MDN documentation</a> |
       * <a href="http://es5.github.com/#x15.11.4.4">Annotated ES5 Spec</a>
       *
       * @return {String} Error message
       */
      toString: function toString() {
        var name = this.name || "Error";
        var message = this.message || "";

        if (name === "" && message === "") {
          return "Error";
        }

        if (name === "") {
          return message;
        }

        if (message === "") {
          return name;
        }

        return name + ": " + message;
      }
    },
    defer: function defer(statics) {
      // toString
      if (!qx.core.Environment.get("ecmascript.error.toString")) {
        Error.prototype.toString = statics.toString;
      }
    }
  });
  qx.lang.normalize.Error.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Error.js.map?dt=1664560760031