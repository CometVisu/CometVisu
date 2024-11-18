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
      "qx.tool.utils.LogManager": {}
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
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
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
  qx.Class.define("qx.tool.utils.Logger", {
    extend: qx.core.Object,
    construct: function construct(id, minLevel) {
      qx.core.Object.constructor.call(this);
      this.set({
        id: id,
        minLevel: minLevel
      });
    },
    properties: {
      id: {
        check: "String"
      },
      minLevel: {
        check: "Integer"
      }
    },
    members: {
      is: function is(level) {
        if (typeof level == "string") {
          level = qx.tool.utils.LogManager.getInstance()._levels[level];
        }
        return this.getMinLevel() <= level;
      },
      log: function log(level, msg) {
        if (this.is(level)) {
          this._output(level, msg);
        }
      },
      _output: function _output(level, msg) {
        qx.tool.utils.LogManager.getInstance().output(this, level, msg);
      },
      trace: function trace(msg) {
        return this.log("trace", msg);
      },
      debug: function debug(msg) {
        return this.log("debug", msg);
      },
      info: function info(msg) {
        return this.log("info", msg);
      },
      warn: function warn(msg) {
        return this.log("warn", msg);
      },
      error: function error(msg) {
        return this.log("error", msg);
      },
      fatal: function fatal(msg) {
        return this.log("fatal", msg);
      }
    }
  });
  qx.tool.utils.Logger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Logger.js.map?dt=1731948132344