function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* IController.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * Interface for structure controllers.
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Interface.define('cv.ui.structure.IController', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      /**
       * The target this structure should be inserted into as CSS selector string
       */
      renderTarget: {
        check: 'String'
      },
      /**
       * Namespace for path ids
       */
      namespace: {
        check: 'String'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * Returns the main HTML structure needed by this structure, this content will be injected to the document
       * body as innerHTML
       * @return {String} HTML code
       */
      getHtmlStructure: function getHtmlStructure() {},
      /**
       * Extract backend specific settings from the config
       * @param xml {XMLDocument} loaded config
       * @return {Boolean} true if backend setting have been parsed
       */
      parseBackendSettings: function parseBackendSettings(xml) {},
      /**
       * Parses structure specific settings
       * @param xml {XMLDocument} loaded config
       */
      parseSettings: function parseSettings(xml) {},
      /**
       * Pre parsing hook, do everything here that is needed before the real parsing process can start
       * @param xml {XMLDocument}
       */
      preParse: function preParse(xml) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Generate the UI code from the config file
       * @param config {Object} loaded config file usually an XMLDocument but other structures might use different formats
       */
      createUI: function createUI(config) {},
      /**
       * Handle fired event from screensaver
       * @return {Array<string>} Array with addresses
       */
      doScreenSave: function doScreenSave() {},
      /**
       * Return the addresses needed to update all states on the initially loaded page
       * @param backendName {string} name of the backend
       * @return {Array<string>} list of addresses
       */
      getInitialAddresses: function getInitialAddresses(backendName) {},
      /**
       * Returns the widget id of the page item initially loaded
       * @returns {String} widget path like 'id_'...
       */
      getInitialPageId: function getInitialPageId() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Check this structure for feature support
       * @param feature {String} name of the feature ti check, e.g. 'navbar'
       * @param subfeature {String?} optional name of a sub feature to check
       */
      supports: function supports(feature, subfeature) {},
      /**
       * handle browser history events that are used to navigate inside the visu
       * @param anchor {String}
       */
      onHistoryRequest: function onHistoryRequest(anchor) {},
      /**
       * Add UI specific information to the sentry scope, if sentry is enabled
       */
      updateSentryScope: function updateSentryScope() {}
    }
  });
  cv.ui.structure.IController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IController.js.map?dt=1782595084398