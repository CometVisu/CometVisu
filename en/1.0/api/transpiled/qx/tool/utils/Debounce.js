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
      "qx.Promise": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Class for debouncing a call, with promise support
   */
  qx.Class.define("qx.tool.utils.Debounce", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param {Function?} fn function to call, can be null if you override `_runImpl`
     * @param {Integer?} timeout the timeout
     */
    construct: function construct(fn, timeout) {
      qx.core.Object.constructor.call(this);
      this.__P_523_0 = fn;
      if (timeout) {
        this.setTimeout(timeout);
      }
    },
    properties: {
      /** The timeout before firing the method */
      timeout: {
        init: 250,
        nullable: false,
        check: "Integer",
        event: "changeTimeout"
      },
      /** What to do if triggered while the function is still executing:
       *  "ignore" means do nothing, allow the method to fire
       *  "restart" means to restart the timer
       *  "immediate" mean to allow the function to run again immediately after it stops
       *  "queue" means to schedule the function to run again
       */
      repeatedTrigger: {
        init: "ignored",
        nullable: false,
        check: ["ignore", "restart", "repeat", "queue"],
        apply: "_applyRepeatedTrigger",
        event: "changeRepeatedTrgger"
      }
    },
    members: {
      /** @type{Function} the function to call */
      __P_523_0: null,
      /** @type{Boolean} that there is a repeated invocation queued */
      __P_523_1: false,
      /**
       * Apply for `repeatedTrigger`
       *
       * @param {Boolean} value
       */
      _applyQueueRepeats: function _applyQueueRepeats(value) {
        if (!value && this.__P_523_1) {
          this.__P_523_1 = false;
        }
      },
      /**
       * Runs the function, completes when the function completes.  The function returns
       * whatever the callback function returned
       *
       * @return {var?}
       */
      run: function run() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var promise, repeatedTrigger;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                promise = _this.__P_523_2;
                if (!promise) {
                  _context.n = 2;
                  break;
                }
                repeatedTrigger = _this.getRepeatedTrigger();
                if (repeatedTrigger == "restart") {
                  // If there is a timer id then  we can restart it, otherwise it is already executing
                  if (_this.__P_523_3) {
                    _this._cancelTimer();
                    _this._startTimer();
                  }
                } else if (repeatedTrigger == "queue" || repeatedTrigger == "immediate") {
                  _this.__P_523_1 = true;
                }
                _context.n = 1;
                return promise;
              case 1:
                return _context.a(2, _context.v);
              case 2:
                _this._startTimer();
                promise = _this.__P_523_2 = new qx.Promise();
                _context.n = 3;
                return promise;
              case 3:
                return _context.a(2, _context.v);
            }
          }, _callee);
        }))();
      },
      /**
       * Starts the timer
       */
      _startTimer: function _startTimer() {
        var _this2 = this;
        this.__P_523_3 = setTimeout(function () {
          return _this2._onTimeout();
        }, this.getTimeout());
      },
      /**
       * Cancels the timer
       */
      _cancelTimer: function _cancelTimer() {
        if (this.__P_523_3) {
          clearTimeout(this.__P_523_3);
          this.__P_523_3 = null;
        }
      },
      /**
       * Called when the timeout has elapsed
       */
      _onTimeout: function _onTimeout() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var promise, result, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _this3.__P_523_3 = null;
                promise = _this3.__P_523_2;
                _context2.p = 1;
                result = null;
              case 2:
                if (!true) {
                  _context2.n = 7;
                  break;
                }
                _context2.n = 3;
                return _this3._runImpl();
              case 3:
                result = _context2.v;
                if (!_this3.__P_523_1) {
                  _context2.n = 5;
                  break;
                }
                if (!(_this3.getRepeatedTrigger() == "queue")) {
                  _context2.n = 4;
                  break;
                }
                _this3._startTimer();
                return _context2.a(2);
              case 4:
                _context2.n = 6;
                break;
              case 5:
                return _context2.a(3, 7);
              case 6:
                _context2.n = 2;
                break;
              case 7:
                _this3.__P_523_2 = null;
                promise.resolve(result);
                _context2.n = 9;
                break;
              case 8:
                _context2.p = 8;
                _t = _context2.v;
                promise.reject(_t);
              case 9:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 8]]);
        }))();
      },
      /**
       * Called to run the actual code
       */
      _runImpl: function _runImpl() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this4.__P_523_0();
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.utils.Debounce.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Debounce.js.map?dt=1782967164764