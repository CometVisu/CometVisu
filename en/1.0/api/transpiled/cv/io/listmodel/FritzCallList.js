function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      "cv.io.listmodel.IListModel": {
        "require": true
      },
      "cv.util.MStringTransforms": {
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "cv.io.Fetch": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {},
      "cv.io.listmodel.Registry": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* FritzCallList.js
   *
   * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   * Data retrieval for FritzBox calllists retrieves via TR64 (using the same PHP backend as the TR64 plugin).
   */
  qx.Class.define('cv.io.listmodel.FritzCallList', {
    extend: qx.core.Object,
    implement: cv.io.listmodel.IListModel,
    include: cv.util.MStringTransforms,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.initModel(new qx.data.Array());
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      // this event is sent when the model itself wants to trigger a list refresh.
      refresh: 'qx.event.type.Event'
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      REQUIRES: ['php']
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      model: {
        check: 'qx.data.Array',
        deferredInit: true
      },
      device: {
        check: 'String',
        init: '',
        apply: '_applyDevice'
      },
      max: {
        check: 'Number',
        init: 0,
        transform: '_parseInt'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_6_0: null,
      _applyDevice: function _applyDevice() {
        // reset calllistUrl when device has changed
        this.__P_6_0 = null;
      },
      _init: function _init() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var url, response, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                url = 'resource/plugins/tr064/soap.php?device=' + _this.getDevice() + '&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList';
                _this.debug('requesting soap url');
                _context.p = 1;
                _context.n = 2;
                return cv.io.Fetch.fetch(url);
              case 2:
                response = _context.v;
                if (response) {
                  if (typeof response === 'string') {
                    _this.__P_6_0 = response;
                  } else {
                    cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
                      title: qx.locale.Manager.tr('TR-064 communication response error'),
                      severity: 'urgent',
                      message: qx.locale.Manager.tr('Reading URL "%1" failed with content: "%2"', url, JSON.stringify(response))
                    });
                    _this.__P_6_0 = '<fail>';
                  }
                }
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                // else:
                cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
                  title: qx.locale.Manager.tr('TR-064 communication error'),
                  severity: 'urgent',
                  message: qx.locale.Manager.tr('Reading URL "%1" failed with status "%2": "%2"', _t.url, _t.status, _t.statusText)
                });
                _this.__P_6_0 = '<fail>';
              case 4:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      },
      refresh: function refresh() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var model, url, response, data, itemList, _iterator, _step, item, childrenList, entry, _iterator2, _step2, child, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (_this2.__P_6_0) {
                  _context2.n = 1;
                  break;
                }
                _context2.n = 1;
                return _this2._init();
              case 1:
                model = _this2.getModel();
                model.removeAll();
                if (!(_this2.__P_6_0 === '<fail>')) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2);
              case 2:
                url = 'resource/plugins/tr064/proxy.php?device=' + _this2.getDevice() + '&uri=' + _this2.__P_6_0 + '%26max=' + _this2.getMax();
                _context2.p = 3;
                _context2.n = 4;
                return cv.io.Fetch.fetch(url);
              case 4:
                response = _context2.v;
                if (response) {
                  data = new window.DOMParser().parseFromString(response, 'text/xml');
                  itemList = data.getElementsByTagName('Call');
                  _iterator = _createForOfIteratorHelper(itemList);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      item = _step.value;
                      childrenList = item.children;
                      entry = {};
                      _iterator2 = _createForOfIteratorHelper(childrenList);
                      try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                          child = _step2.value;
                          entry[child.nodeName] = child.textContent;
                        }
                      } catch (err) {
                        _iterator2.e(err);
                      } finally {
                        _iterator2.f();
                      }
                      model.push(entry);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                }
                _context2.n = 9;
                break;
              case 5:
                _context2.p = 5;
                _t2 = _context2.v;
                if (!(_t2.status === 404)) {
                  _context2.n = 8;
                  break;
                }
                _context2.n = 6;
                return _this2._init();
              case 6:
                _context2.n = 7;
                return _this2.refresh();
              case 7:
                _context2.n = 9;
                break;
              case 8:
                cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
                  title: qx.locale.Manager.tr('TR-064 communication error'),
                  severity: 'urgent',
                  message: qx.locale.Manager.tr('Reading URL "%1" failed with status "%2": "%2"', _t2.url, _t2.status, _t2.statusText)
                });
                model.removeAll();
              case 9:
                return _context2.a(2);
            }
          }, _callee2, null, [[3, 5]]);
        }))();
      },
      handleEvent: function handleEvent() {
        return false;
      }
    },
    defer: function defer(clazz) {
      cv.io.listmodel.Registry.register(clazz);
    }
  });
  cv.io.listmodel.FritzCallList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FritzCallList.js.map?dt=1782705765143