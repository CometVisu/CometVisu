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
  var async = require("async");
  qx.Class.define("qx.tool.utils.files.FindFiles", {
    extend: qx.core.Object,
    construct: function construct(root) {
      qx.core.Object.constructor.call(this);
      this.__P_517_0 = root;
    },
    properties: {
      matchFiles: {
        init: null,
        nullable: true,
        check: "RegEx"
      }
    },
    members: {
      __P_517_0: null,
      scan: function scan(notify, cb) {
        cb = cb || function () {};
        var t = this;
        function scanImpl(path, cb) {
          async.waterfall([function (cb) {
            fs.readdir(path, cb);
          }, function (files, cb) {
            async.forEach(files, function (file, cb) {
              fs.stat(path + "/" + file, function (err, stat) {
                if (err) {
                  cb(err);
                  return;
                }
                if (stat.isDirectory()) {
                  scanImpl(path + "/" + file, cb);
                  return;
                }
                if (stat.isFile()) {
                  t._onFindFile(path + "/" + file, notify, cb);
                  return;
                }
                cb();
              });
            }, cb);
          }], cb);
        }
        scanImpl(this.__P_517_0, cb);
      },
      _onFindFile: function _onFindFile(file, notify, cb) {
        var re = this.getMatchFiles();
        if (re && !re.test(file)) {
          return;
        }
        notify(file, cb);
      }
    }
  });
  qx.tool.utils.files.FindFiles.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FindFiles.js.map?dt=1717235407401