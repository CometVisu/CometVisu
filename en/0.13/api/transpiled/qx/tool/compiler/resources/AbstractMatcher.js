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
      "qx.lang.Type": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2019 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  /**
   * Basic helper base class for matching files
   */
  qx.Class.define("qx.tool.compiler.resources.AbstractMatcher", {
    extend: qx.core.Object,
    type: "abstract",
    /**
     * Constructor
     *
     * @param match {Array[String]|String|RegEx?} the reg ex to match filenames, or the extension,
     * or an array of extensions
     */
    construct: function construct(match) {
      qx.core.Object.constructor.call(this);
      if (match) {
        if (qx.lang.Type.isArray(match)) {
          match = match.map(function (elem) {
            if (elem[0] != ".") {
              elem = "." + elem;
            }
            return elem;
          });
          this.__P_493_0 = function (filename) {
            return match.some(function (elem) {
              return filename.endsWith(elem);
            });
          };
        } else if (typeof match == "string") {
          if (match[0] != ".") {
            match = "." + match;
          }
          this.__P_493_0 = function (filename) {
            return filename.endsWith(match);
          };
        } else {
          this.__P_493_0 = function (filename) {
            return match.test(filename);
          };
        }
      }
    },
    members: {
      __P_493_0: null,
      /**
       * Called to determine whether this handler is appropriate for the given filename;
       * default implementation is to check the RegEx passed to the constructor
       *
       * @param filename {String} the name of the resource
       * @param library {qx.tool.compiler.app.Library} the library its in
       */
      matches: function matches(filename, library) {
        return this.__P_493_0 !== null && this.__P_493_0(filename);
      }
    }
  });
  qx.tool.compiler.resources.AbstractMatcher.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractMatcher.js.map?dt=1731948129521