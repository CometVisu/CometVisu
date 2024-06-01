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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo-compiler
   *
   *    Copyright:
   *      2011-2021 Zenesis Limited, http://www.zenesis.com
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
   * ************************************************************************/

  /**
   * A Part collects together all of the javascript files required for a single
   * part (load on demand) and merges them together as required.
   */
  qx.Class.define("qx.tool.compiler.targets.meta.Part", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param target {Target} the target doing the compilation
     * @param name {String} the name of the part
     * @param partIndex {Integer}
     */
    construct: function construct(target, name, partIndex) {
      qx.core.Object.constructor.call(this);
      this.__P_507_0 = target;
      this.__P_507_1 = name;
      this.__P_507_2 = partIndex;
      this.__P_507_3 = [];
      this.__P_507_4 = {};
    },
    members: {
      __P_507_0: null,
      __P_507_1: null,
      __P_507_2: -1,
      __P_507_3: null,
      __P_507_4: null,
      addPackage: function addPackage(pkg) {
        if (!this.__P_507_4[pkg.toHashCode()]) {
          this.__P_507_3.push(pkg);
          this.__P_507_4[pkg.toHashCode()] = pkg;
        }
      },
      hasPackage: function hasPackage(pkg) {
        return Boolean(this.__P_507_4[pkg.toHashCode()]);
      },
      getDefaultPackage: function getDefaultPackage() {
        return this.__P_507_3[0] || null;
      },
      serializeInto: function serializeInto(parts) {
        var arr = parts[this.__P_507_1] = [];
        this.__P_507_3.forEach(function (pkg) {
          return arr.push(String(pkg.getPackageIndex()));
        });
      }
    }
  });
  qx.tool.compiler.targets.meta.Part.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Part.js.map?dt=1717235405886