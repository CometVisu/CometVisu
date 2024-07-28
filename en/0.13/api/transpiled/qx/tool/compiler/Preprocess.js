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

  var fs = require("fs");
  qx.Class.define("qx.tool.compiler.Preprocess", {
    extend: qx.core.Object,
    construct: function construct(path) {
      qx.core.Object.constructor.call(this);
      this.__P_483_0 = path;
    },
    members: {
      __P_483_0: null,
      run: function run(outputTo, cb) {
        var t = this;
        fs.readFile(this.__P_483_0, {
          encoding: "utf8"
        }, function (err, data) {
          if (err) {
            cb(err);
          } else {
            t._process(data, function (data) {
              if (typeof outputTo == "string") {
                fs.writeFile(outputTo, data, {
                  encoding: "utf8"
                }, cb);
              } else if (typeof outputTo == "function") {
                outputTo(data, cb);
              } else {
                cb(null, data);
              }
            });
          }
        });
      },
      _process: function _process(data, cb) {
        data = data.replace(/(''|"")?\/\*#([^\n]+)([\s\S]*)\*\//gm, function (match, quotes, cmd, body) {
          var quote = quotes[0];
          if (quote == "'") {
            body = body.replace(/'/gm, "\\'");
          } else {
            body = body.replace(/"/gm, '\\"');
          }
          var result = "";
          body.split("\n").forEach(function (line, index) {
            if (index == 0) {
              return;
            }
            if (index > 1) {
              result += " + \n";
            }
            result += quote + line + "\\n" + quote;
          });
          return result;
        });
        cb(data);
      }
    }
  });
  qx.tool.compiler.Preprocess.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Preprocess.js.map?dt=1722153841017