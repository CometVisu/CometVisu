function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.listmodel.IListModel": {},
      "qx.core.Init": {},
      "cv.io.BackendConnections": {}
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
                  case 'openhab':
                    if (!cv.io.BackendConnections.getClientByType('openhab')) {
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

//# sourceMappingURL=Registry.js.map?dt=1722153798864