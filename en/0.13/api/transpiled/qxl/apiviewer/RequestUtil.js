(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.Promise": {},
      "qx.io.remote.Request": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.RequestUtil", {
    extend: qx.core.Object,
    statics: {
      get: function get(url, opts) {
        return new qx.Promise(function (resolve, reject) {
          var req = new qx.io.remote.Request(url);
          req.setAsynchronous(true);
          req.setTimeout(180000);
          req.setProhibitCaching(false);

          if (opts) {
            req.set(opts);
          }

          req.addListener("completed", function (evt) {
            resolve(evt.getContent());
          });
          req.addListener("failed", function () {
            return reject();
          });
          req.addListener("aborted", function () {
            return reject();
          });
          req.send();
        });
      }
    }
  });
  qxl.apiviewer.RequestUtil.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RequestUtil.js.map?dt=1664788538623