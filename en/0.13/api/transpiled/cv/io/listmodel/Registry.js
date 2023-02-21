function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.listmodel.IListModel": {},
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Registry for all classes that implement cv.io.listmodel.IListModel.
   */
  qx.Class.define('cv.io.listmodel.Registry', {
    type: 'static',
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      _REG: {},
      /**
       *
       * @param modelClass {Class}
       */
      register: function register(modelClass) {
        if (qx.Class.hasInterface(modelClass, cv.io.listmodel.IListModel)) {
          var className = modelClass.basename.toLowerCase();
          this._REG[className] = modelClass;
        }
      },
      /**
       *
       * @param name {String}
       */
      get: function get(name) {
        name = name.toLowerCase();
        if (Object.prototype.hasOwnProperty.call(this._REG, name)) {
          var clazz = this._REG[name];
          if (clazz.REQUIRES) {
            var _iterator = _createForOfIteratorHelper(clazz.REQUIRES),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var check = _step.value;
                switch (check) {
                  case 'php':
                    if (!qx.core.Init.getApplication().getServerHasPhpSupport()) {
                      return null;
                    }
                    break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          return clazz;
        }
        return null;
      }
    }
  });
  cv.io.listmodel.Registry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Registry.js.map?dt=1677017672002