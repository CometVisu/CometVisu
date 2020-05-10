(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Function": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Methods to work with the delegate pattern.
   */
  qx.Class.define("qx.util.Delegate", {
    statics: {
      /**
       * Returns the delegate method given my its name.
       *
       * @param delegate {Object} The delegate object to check the method.
       * @param specificMethod {String} The name of the delegate method.
       * @return {Function|null} The requested method or null, if no method is set.
       */
      getMethod: function getMethod(delegate, specificMethod) {
        if (qx.util.Delegate.containsMethod(delegate, specificMethod)) {
          return qx.lang.Function.bind(delegate[specificMethod], delegate);
        }

        return null;
      },

      /**
       * Checks, if the given delegate is valid or if a specific method is given.
       *
       * @param delegate {Object} The delegate object.
       * @param specificMethod {String} The name of the method to search for.
       * @return {Boolean} True, if everything was ok.
       */
      containsMethod: function containsMethod(delegate, specificMethod) {
        var Type = qx.lang.Type;

        if (Type.isObject(delegate)) {
          return Type.isFunction(delegate[specificMethod]);
        }

        return false;
      }
    }
  });
  qx.util.Delegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Delegate.js.map?dt=1589124714243