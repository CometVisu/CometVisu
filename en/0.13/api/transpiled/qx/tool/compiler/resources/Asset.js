function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.lang.Array": {},
      "qx.tool.utils.Promisify": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.Utils": {}
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

  var path = require("upath");
  qx.Class.define("qx.tool.compiler.resources.Asset", {
    extend: qx.core.Object,
    construct: function construct(library, filename, fileInfo) {
      qx.core.Object.constructor.call(this);
      this.__P_505_0 = library;
      this.__filename = filename;
      this.__P_505_1 = fileInfo;
    },
    members: {
      /** {Library} that this asset belongs to */
      __P_505_0: null,
      /** {String} path within the library resources */
      __filename: null,
      /** {Object} the data in the database */
      __P_505_1: null,
      /** {ResourceLoader[]?} array of loaders */
      __P_505_2: null,
      /** {ResourceConverter[]?} array of converters */
      __P_505_3: null,
      /** {Asset[]?} list of assets which refer to this asset (eg for image combining) */
      __P_505_4: null,
      /** {Asset[]?} list of assets which the meta in this asset refers to (eg for image combining) */
      __P_505_5: null,
      /** {Asset[]?} list of assets which this asset depends on */
      __P_505_6: null,
      /** {Asset[]?} list of assets which depend on this asset */
      __P_505_7: null,
      getLibrary: function getLibrary() {
        return this.__P_505_0;
      },
      getFilename: function getFilename() {
        return this.__filename;
      },
      getFileInfo: function getFileInfo() {
        return this.__P_505_1;
      },
      isThemeFile: function isThemeFile() {
        return this.__P_505_1.resourcePath == "themePath";
      },
      getSourceFilename: function getSourceFilename() {
        return path.relative(process.cwd(), this.isThemeFile() ? this.__P_505_0.getThemeFilename(this.__filename) : this.__P_505_0.getResourceFilename(this.__filename));
      },
      getDestFilename: function getDestFilename(target) {
        var filename = null;
        if (this.__P_505_3) {
          filename = this.__P_505_3[this.__P_505_3.length - 1].getDestFilename(target, this);
        }
        return filename ? filename : path.relative(process.cwd(), path.join(target.getOutputDir(), "resource", this.__filename));
      },
      setLoaders: function setLoaders(loaders) {
        this.__P_505_2 = loaders.length ? loaders : null;
      },
      setConverters: function setConverters(converters) {
        this.__P_505_3 = converters.length ? converters : null;
      },
      addMetaReferee: function addMetaReferee(asset) {
        if (!this.__P_505_4) {
          this.__P_505_4 = [];
        }
        if (!qx.lang.Array.contains(this.__P_505_4, asset)) {
          this.__P_505_4.push(asset);
        }
      },
      getMetaReferees: function getMetaReferees() {
        return this.__P_505_4;
      },
      addMetaReferTo: function addMetaReferTo(asset) {
        if (!this.__P_505_5) {
          this.__P_505_5 = [];
        }
        if (!qx.lang.Array.contains(this.__P_505_5, asset)) {
          this.__P_505_5.push(asset);
        }
      },
      getMetaReferTo: function getMetaReferTo() {
        return this.__P_505_5;
      },
      setDependsOn: function setDependsOn(assets) {
        var _this = this;
        if (this.__P_505_6) {
          this.__P_505_6.forEach(function (thatAsset) {
            return delete thatAsset.__P_505_7[_this.getFilename];
          });
        }
        if (assets && assets.length) {
          this.__P_505_6 = assets;
          this.__P_505_1.dependsOn = assets.map(function (asset) {
            return asset.toUri();
          });
          assets.forEach(function (thatAsset) {
            if (!thatAsset.__P_505_7) {
              thatAsset.__P_505_7 = {};
            }
            thatAsset.__P_505_7[_this.getFilename()] = _this;
          });
        } else {
          this.__P_505_6 = null;
          delete this.__P_505_1.dependsOn;
        }
      },
      getDependsOn: function getDependsOn() {
        return this.__P_505_6;
      },
      getDependsOnThisAsset: function getDependsOnThisAsset() {
        return this.__P_505_7 ? Object.values(this.__P_505_7) : null;
      },
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!_this2.__P_505_2) {
                  _context.n = 1;
                  break;
                }
                _context.n = 1;
                return Promise.all(_this2.__P_505_2.map(function (loader) {
                  return loader.load(_this2);
                }));
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      sync: function sync(target) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var destFilename, srcFilename, doNotCopy, destStat, filenames, needsIt, dependsOn, lastTempFilename, rm, _t2;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                destFilename = _this3.getDestFilename(target);
                srcFilename = _this3.getSourceFilename();
                if (!_this3.__P_505_3) {
                  _context4.n = 2;
                  break;
                }
                _context4.n = 1;
                return qx.tool.utils.Promisify.some(_this3.__P_505_3, function (converter) {
                  return converter.isDoNotCopy(srcFilename);
                });
              case 1:
                doNotCopy = _context4.v;
                if (!doNotCopy) {
                  _context4.n = 2;
                  break;
                }
                return _context4.a(2);
              case 2:
                _context4.n = 3;
                return qx.tool.utils.files.Utils.safeStat(destFilename);
              case 3:
                destStat = _context4.v;
                if (!destStat) {
                  _context4.n = 7;
                  break;
                }
                filenames = [_this3.getSourceFilename()];
                if (_this3.__P_505_6) {
                  _this3.__P_505_6.forEach(function (asset) {
                    return filenames.push(asset.getSourceFilename());
                  });
                }
                _context4.n = 4;
                return qx.tool.utils.Promisify.some(filenames, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(filename) {
                    var srcStat;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          _context2.n = 1;
                          return qx.tool.utils.files.Utils.safeStat(filename);
                        case 1:
                          srcStat = _context2.v;
                          return _context2.a(2, srcStat && srcStat.mtime.getTime() > destStat.mtime.getTime());
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 4:
                needsIt = _context4.v;
                if (!(!needsIt && _this3.__P_505_3)) {
                  _context4.n = 6;
                  break;
                }
                _context4.n = 5;
                return qx.tool.utils.Promisify.some(_this3.__P_505_3, function (converter) {
                  return converter.needsConvert(target, _this3, srcFilename, destFilename, _this3.isThemeFile());
                });
              case 5:
                needsIt = _context4.v;
              case 6:
                if (needsIt) {
                  _context4.n = 7;
                  break;
                }
                return _context4.a(2);
              case 7:
                _context4.n = 8;
                return qx.tool.utils.Utils.makeParentDir(destFilename);
              case 8:
                if (!_this3.__P_505_3) {
                  _context4.n = 13;
                  break;
                }
                dependsOn = [];
                if (!(_this3.__P_505_3.length == 1)) {
                  _context4.n = 11;
                  break;
                }
                _context4.n = 9;
                return _this3.__P_505_3[0].convert(target, _this3, srcFilename, destFilename, _this3.isThemeFile());
              case 9:
                _t2 = _context4.v;
                if (_t2) {
                  _context4.n = 10;
                  break;
                }
                _t2 = [];
              case 10:
                dependsOn = _t2;
                _context4.n = 12;
                break;
              case 11:
                lastTempFilename = null;
                qx.tool.utils.Promisify.each(_this3.__P_505_3, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(converter, index) {
                    var tmpSrc, tmpDest, tmpDependsOn, _t;
                    return _regenerator().w(function (_context3) {
                      while (1) switch (_context3.n) {
                        case 0:
                          tmpSrc = lastTempFilename ? lastTempFilename : srcFilename;
                          tmpDest = index === _this3.__P_505_3.length - 1 ? destFilename : path.join(require("os").tmpdir(), path.basename(srcFilename) + "-pass" + (index + 1) + "-");
                          _context3.n = 1;
                          return converter.convert(target, _this3, tmpSrc, tmpDest, _this3.isThemeFile());
                        case 1:
                          _t = _context3.v;
                          if (_t) {
                            _context3.n = 2;
                            break;
                          }
                          _t = [];
                        case 2:
                          tmpDependsOn = _t;
                          tmpDependsOn.forEach(function (str) {
                            return dependsOn.push(str);
                          });
                          lastTempFilename = tmpDest;
                        case 3:
                          return _context3.a(2);
                      }
                    }, _callee3);
                  }));
                  return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              case 12:
                rm = target.getAnalyser().getResourceManager();
                dependsOn = dependsOn.map(function (filename) {
                  return rm.getAsset(path.resolve(filename), true, _this3.isThemeFile());
                }).filter(function (tmp) {
                  return tmp !== _this3;
                });
                _this3.setDependsOn(dependsOn);
                _context4.n = 14;
                break;
              case 13:
                _context4.n = 14;
                return qx.tool.utils.files.Utils.copyFile(srcFilename, destFilename);
              case 14:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      toUri: function toUri() {
        return this.__P_505_0.getNamespace() + ":" + this.__filename;
      },
      toString: function toString() {
        return this.toUri();
      }
    }
  });
  qx.tool.compiler.resources.Asset.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Asset.js.map?dt=1782595072023