function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.util.ScriptLoader": {},
      "qx.util.ResourceManager": {},
      "qx.log.Logger": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "qx.locale.Number": {},
      "qx.locale.Date": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* D3.js
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
   * Loads the bundled d3 library and applies the locale of the visualisation to it.
   *
   * Everything that draws with d3 waits for {@link cv.util.D3#load}. The script itself is only
   * requested once, no matter how many components ask for it.
   *
   * @asset(libs/d3.min.js)
   * @asset(libs/d3.min.js.map)
   * @ignore(d3)
   */
  qx.Class.define('cv.util.D3', {
    type: 'static',
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      /**
       * The time format locale d3 has been set up with, used to format dates with a pattern.
       * Available once the promise of load() has resolved.
       */
      TF: null,
      __P_791_0: null,
      /**
       * Loads d3 and localizes it. Repeated calls return the same promise.
       * @return {Promise} resolves when window.d3 is usable
       */
      load: function load() {
        if (!cv.util.D3.__P_791_0) {
          cv.util.D3.__P_791_0 = cv.util.D3.__P_791_1().then(function () {
            return cv.util.D3.__P_791_2();
          });
        }
        return cv.util.D3.__P_791_0;
      },
      /**
       * Adds the script tag and waits for the library to appear in the window.
       * @return {Promise}
       */
      __P_791_1: function __P_791_1() {
        return new Promise(/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
            var check, timer, counter, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  check = function check() {
                    return _typeof(window.d3) === 'object';
                  };
                  _context.p = 1;
                  _context.n = 2;
                  return cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
                case 2:
                  _context.n = 4;
                  break;
                case 3:
                  _context.p = 3;
                  _t = _context.v;
                  qx.log.Logger.error(cv.util.D3, 'Error loading D3:', _t);
                  reject(new Error('Error loading d3 library'));
                  return _context.a(2);
                case 4:
                  if (!check()) {
                    _context.n = 5;
                    break;
                  }
                  resolve(true);
                  return _context.a(2);
                case 5:
                  timer = new qx.event.Timer(50);
                  counter = 0;
                  timer.addListener('interval', function () {
                    counter++;
                    if (check()) {
                      timer.stop();
                      resolve(true);
                    } else if (counter > 5) {
                      timer.stop();
                      qx.log.Logger.error(cv.util.D3, 'Error loading D3: D3 did not load within expected time');
                      reject(new Error('Error loading d3 library'));
                    }
                  });
                  timer.start();
                case 6:
                  return _context.a(2);
              }
            }, _callee, null, [[1, 3]]);
          }));
          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      },
      /**
       * Applies the number and date formats of the current locale to d3.
       */
      __P_791_2: function __P_791_2() {
        if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
          d3.formatDefaultLocale({
            decimal: qx.locale.Number.getDecimalSeparator().translate().toString(),
            thousands: qx.locale.Number.getGroupSeparator().translate().toString(),
            grouping: [3],
            currency: ['€', '']
          });
          cv.util.D3.TF = d3.timeFormatDefaultLocale({
            dateTime: '%A, der %e. %B %Y, %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
            days: qx.locale.Date.getDayNames('wide', null, 'format').map(function (t) {
              return t.translate().toString();
            }),
            shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            }),
            months: qx.locale.Date.getMonthNames('wide').map(function (t) {
              return t.translate().toString();
            }),
            shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            })
          });
        } else {
          cv.util.D3.TF = d3.timeFormatDefaultLocale({
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
            days: qx.locale.Date.getDayNames('wide', null, 'format').map(function (t) {
              return t.translate().toString();
            }),
            shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            }),
            months: qx.locale.Date.getMonthNames('wide').map(function (t) {
              return t.translate().toString();
            }),
            shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            })
          });
        }
        return true;
      }
    }
  });
  cv.util.D3.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=D3.js.map?dt=1792082802909