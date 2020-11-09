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
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {}
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

  /**
   * Module for on demand class data loading.
   */
  qx.Class.define("qxl.apiviewer.ClassLoader", {
    extend: qx.core.Object,
    statics: {
      __P_520_0: null,
      setBaseUri: function setBaseUri(baseUri) {
        this.__P_520_0 = baseUri;
      },
      getBaseUri: function getBaseUri() {
        return this.__P_520_0;
      },
      loadClassList: function loadClassList(classes, callback, self) {
        var _this = this;

        if (!classes.length) {
          callback && callback.call(self || this, []);
          return new qx.Promise.resolve([]);
        }

        var all = classes.map(function (clazz) {
          return clazz.load();
        });
        return qx.Promise.all(all).then(function () {
          return callback && callback.call(self || _this, classes);
        }).then(function () {
          return classes;
        });
      },
      getClassOrPackage: function getClassOrPackage(name) {
        if (name) {
          var cls = qxl.apiviewer.dao.Class.getClassByName(name);

          if (cls) {
            return qxl.apiviewer.dao.Class.isNativeObject(cls) ? null : cls;
          }
        }

        var pkg = qxl.apiviewer.dao.Package.getPackage(name);
        return pkg;
      }
    }
  });
  qxl.apiviewer.ClassLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassLoader.js.map?dt=1604955498356