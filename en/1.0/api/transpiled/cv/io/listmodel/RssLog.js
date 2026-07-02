function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.io.listmodel.IListModel": {
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.util.ResourceManager": {},
      "qx.io.request.Xhr": {},
      "cv.Application": {},
      "qx.locale.Manager": {},
      "cv.ui.PopupHandler": {},
      "cv.io.listmodel.Registry": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* RssLog.js
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
   * Data retrieval for RssLog database.
   */
  qx.Class.define('cv.io.listmodel.RssLog', {
    extend: qx.core.Object,
    implement: cv.io.listmodel.IListModel,
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
      database: {
        check: 'String',
        nullable: true,
        apply: '_applyRequestData'
      },
      filter: {
        check: 'String',
        nullable: true,
        apply: '_applyRequestData'
      },
      future: {
        check: 'String',
        nullable: true,
        apply: '_applyRequestData'
      },
      limit: {
        check: 'Number',
        init: 0,
        transform: '_parseInt',
        apply: '_applyRequestData'
      }
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      finished: 'qx.event.type.Data',
      // this event is sent when the model itself wants to trigger a list refresh.
      refresh: 'qx.event.type.Event'
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_7_0: null,
      _parseInt: function _parseInt(value) {
        if (typeof value === 'string') {
          return parseInt(value);
        }
        return value;
      },
      _applyRequestData: function _applyRequestData(value, old, name) {
        if (this.__P_7_0) {
          var data = this.__P_7_0.getRequestData();
          if (value) {
            data[name] = value;
          } else if (Object.prototype.hasOwnProperty.call(data, name)) {
            delete data[name];
          }
        }
      },
      getRequestData: function getRequestData() {
        var requestData = {};
        if (this.getDatabase()) {
          requestData.database = this.getDatabase();
        }
        if (this.getFilter()) {
          requestData.f = this.getFilter();
        }
        if (this.getLimit()) {
          requestData.limit = this.getLimit();
        }
        if (this.getFuture()) {
          requestData.future = this.getFuture();
        }
        requestData.j = 1;
        return requestData;
      },
      _getUrl: function _getUrl() {
        return qx.util.ResourceManager.getInstance().toUri('plugins/rsslog/rsslog.php');
      },
      _initRequest: function _initRequest() {
        var _this = this;
        var url = this._getUrl();
        if (!url) {
          this.error('no url to query!');
          return;
        }
        this.__P_7_0 = new qx.io.request.Xhr(url);
        this.__P_7_0.set({
          accept: 'application/json',
          requestData: this.getRequestData(),
          method: 'GET'
        });
        this.__P_7_0.addListener('success', this.__P_7_1, this);
        this.__P_7_0.addListener('error', function (ev) {
          _this.error('C: #rss_%s, Error: %s, Feed: %s', _this.getPath(), ev.getTarget().getResponse(), _this.__P_7_0.getUrl());
          _this.fireDataEvent('finished', false);
        });
        this.__P_7_0.addListener('timeout', function (ev) {
          _this.error('C: #rss_%s, timeout, Feed: %s', _this.getPath(), _this.__P_7_0.getUrl());
          _this.fireDataEvent('finished', false);
        });
      },
      _convertResponse: function _convertResponse(data) {
        return data.responseData.feed.entries;
      },
      __P_7_1: function __P_7_1(ev) {
        var response = ev.getTarget().getResponse();
        if (typeof response === 'string') {
          // no json -> error
          this.error('Expected JSON, but got response MIME:', ev.getTarget().getResponseContentType());
          this.error(response);
          this.fireDataEvent('finished', false);
        } else {
          var model = this.getModel();
          var data = this._convertResponse(response);
          var _iterator = _createForOfIteratorHelper(data),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;
              if (entry.mapping) {
                entry.mappedState = cv.Application.structureController.mapValue(entry.mapping, entry.state);
              }
              if (entry.publishedDate) {
                try {
                  entry.published = new Date(entry.publishedDate);
                } catch (e) {}
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          model.replace(data);
          this.fireDataEvent('finished', true);
        }
      },
      refresh: function refresh() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!_this2.__P_7_0) {
                  _this2._initRequest();
                }
                _context.p = 1;
                _context.n = 2;
                return _this2._sendWithPromise();
              case 2:
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                _this2.error(_t.message);
              case 4:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      },
      handleEvent: function handleEvent(ev, data, model) {
        var _this3 = this;
        var handled = false;
        var requestData = {};
        if (this.getDatabase()) {
          requestData.database = this.getDatabase();
        }
        var needsConfirmation = false;
        var confirmTitle = '';
        var confirmMessage = '';
        switch (data.action) {
          case 'toggle-state':
            requestData.u = model.id;
            requestData.state = model.state === '0' ? '1' : '0';
            handled = true;
            break;
          case 'delete':
            requestData.d = model.id;
            needsConfirmation = data['no-confirm'] !== 'true';
            confirmTitle = qx.locale.Manager.tr('Confirm deletion');
            confirmMessage = qx.locale.Manager.tr('Do you really want to delete this entry?');
            handled = true;
            break;
          default:
            this.error('unhandled event ', data.action);
            break;
        }
        if (handled) {
          var req = new qx.io.request.Xhr(this.__P_7_0.getUrl());
          req.set({
            method: 'GET',
            accept: 'application/json',
            requestData: requestData
          });
          req.addListener('success', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _this3.fireEvent('refresh');
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          })));
          if (needsConfirmation) {
            cv.ui.PopupHandler.confirm(confirmTitle, confirmMessage, function (confirmed) {
              if (confirmed) {
                req.send();
              }
            });
          } else {
            req.send();
          }
        }
        return handled;
      },
      _sendWithPromise: function _sendWithPromise() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, new Promise(function (resolve, reject) {
                  _this4.addListenerOnce('finished', function (ev) {
                    if (ev.getData()) {
                      resolve();
                    } else {
                      reject(new Error('request failed'));
                    }
                  });
                  _this4.__P_7_0.send();
                }));
            }
          }, _callee3);
        }))();
      }
    },
    defer: function defer(clazz) {
      cv.io.listmodel.Registry.register(clazz);
    }
  });
  cv.io.listmodel.RssLog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RssLog.js.map?dt=1782967136568