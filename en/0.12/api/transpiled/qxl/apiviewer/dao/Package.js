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
      "qxl.apiviewer.ClassLoader": {},
      "qxl.apiviewer.RequestUtil": {}
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
  qx.Class.define("qxl.apiviewer.dao.Package", {
    extend: qx.core.Object,
    construct: function construct(packageName) {
      qx.core.Object.constructor.call(this);
      this._packageName = packageName;
      this._classes = {};
      this._packages = {};

      if (packageName) {
        this._parentPackage = qxl.apiviewer.dao.Package.getParentPackage(packageName);

        this._parentPackage.addPackage(this);
      }
    },
    members: {
      _packageName: null,
      _parentPackage: null,
      _classes: null,
      _packages: null,
      _loadingPromise: null,
      _loaded: false,

      /**
       * Loads the class
       *
       * @return {Promise}
       */
      load: function load() {
        var _this = this;

        if (this._loadingPromise) {
          return this._loadingPromise;
        }

        var url = qxl.apiviewer.ClassLoader.getBaseUri() + "/transpiled/" + this._packageName.replace(/\./g, "/") + "/package.txt";
        return this._loadingPromise = qxl.apiviewer.RequestUtil.get(url).then(function (content) {
          _this._desc = content;
          _this._loaded = true;
        })["catch"](function (e) {
          console.error("Couldn't load file: " + url + " " + e.message);
          _this._loaded = true;
        });
      },
      isLoaded: function isLoaded() {
        return this._loaded;
      },
      getName: function getName() {
        return this._packageName;
      },
      getFullName: function getFullName() {
        return this._packageName;
      },
      getDescription: function getDescription() {
        return this._desc || "";
      },
      getClasses: function getClasses() {
        return Object.values(this._classes);
      },
      getPackages: function getPackages() {
        return Object.values(this._packages);
      },
      getPackage: function getPackage() {
        return this._parentPackage;
      },
      addClass: function addClass(clazz) {
        this._classes[clazz.getFullName()] = clazz;
      },
      getClassByName: function getClassByName(name) {
        return this._classes[name];
      },
      getPackageByName: function getPackageByName(name) {
        return this._packages[name];
      },
      addPackage: function addPackage(pkg) {
        this._packages[pkg.getFullName()] = pkg;
      },
      loadDependedClasses: function loadDependedClasses() {
        return qxl.apiviewer.ClassLoader.loadClassList(this.getClasses());
      },
      hasWarning: function hasWarning() {
        return false;
      }
    },
    statics: {
      __rootPackage: null,

      /**
       * Locates a package by name
       *
       * @param name {String} package name, null or "" for top level
       * @return {Package?}
       */
      getPackage: function getPackage(name, create) {
        var root = qxl.apiviewer.dao.Package.__rootPackage;

        if (!root) {
          root = qxl.apiviewer.dao.Package.__rootPackage = new qxl.apiviewer.dao.Package("");
        }

        if (!name) {
          return root;
        }

        var current = root;
        var segs = name.split(".");
        var parentName = "";

        for (var i = 0; i < segs.length; i++) {
          var tmp = current.getPackageByName(parentName + segs[i]);

          if (!tmp) {
            if (!create) {
              return null;
            }

            tmp = new qxl.apiviewer.dao.Package(i == 0 ? segs[i] : current.getFullName() + "." + segs[i]);
          }

          current = tmp;
          parentName += segs[i] + ".";
        }

        return current;
      },

      /**
       * Returns the package that a given package or class is a direct child of
       *
       * @param name {String} the name
       * @return {Package} the package
       */
      getParentPackage: function getParentPackage(name) {
        if (!name) {
          throw new Error("Cannot get the parent package of a root package");
        }

        var pos = name.lastIndexOf(".");

        if (pos < 0) {
          return qxl.apiviewer.dao.Package.getPackage("");
        }

        var parentName = name.substring(0, pos);
        return qxl.apiviewer.dao.Package.getPackage(parentName, true);
      }
    }
  });
  qxl.apiviewer.dao.Package.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Package.js.map?dt=1591115000635