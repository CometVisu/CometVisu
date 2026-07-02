function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Promisify": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.utils.LogManager": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.compiler.resources.ResourceLoader": {
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

  var imageSize = qx.tool.utils.Promisify.promisify(require("image-size"));
  var log = qx.tool.utils.LogManager.createLog("resource-manager");
  qx.Class.define("qx.tool.compiler.resources.ImageLoader", {
    extend: qx.tool.compiler.resources.ResourceLoader,
    /**
     * Constructor
     *
     * @param {qx.tool.compiler.resources.Manager} manager resource manager
     */
    construct: function construct(manager) {
      qx.tool.compiler.resources.ResourceLoader.constructor.call(this, [".png", ".gif", ".jpg", ".jpeg", ".svg"], manager);
    },
    members: {
      /**
       * @Override
       */
      needsLoad: function needsLoad(filename, fileInfo, stat) {
        if (!fileInfo || fileInfo.width === undefined || fileInfo.height === undefined) {
          return true;
        }
        return qx.tool.compiler.resources.ImageLoader.superclass.prototype.needsLoad.call(this, filename, fileInfo, stat);
      },
      /**
       * @Override
       */
      matches: function matches(filename, library) {
        if (library.isFontAsset(filename)) {
          return false;
        }
        if (filename.endsWith(".svg")) {
          var withoutExt = filename.substring(0, filename.length - 3);
          var manager = this.getManager();
          if (["eot", "woff2", "woff", "ttf"].find(function (ext) {
            return !!manager.findLibraryForResource(withoutExt + ext);
          })) {
            return false;
          }
        }
        return qx.tool.compiler.resources.ImageLoader.superclass.prototype.matches.call(this, filename, library);
      },
      /**
       * @Override
       */
      load: function load(asset) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var filename, fileInfo, dimensions, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                filename = asset.getSourceFilename();
                fileInfo = asset.getFileInfo();
                log.trace("Getting size of " + filename);
                _context.p = 1;
                _context.n = 2;
                return imageSize(filename);
              case 2:
                dimensions = _context.v;
                fileInfo.width = dimensions.width;
                fileInfo.height = dimensions.height;
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                // When we can't get the image size, we don't report it because there are SVG types
                //  that have no size (eg fonts) and it's proved quite hard (or impossible) to
                //  suppress the warning accurately in those cases.  Ultimately, if the image is
                //  corrupt it will be found.
                delete fileInfo.width;
                delete fileInfo.height;
              case 4:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      }
    }
  });
  qx.tool.compiler.resources.ImageLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ImageLoader.js.map?dt=1782967163320