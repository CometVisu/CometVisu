function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.dispatch.Direct": {},
      "qx.event.handler.Object": {},
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {
        "require": true
      },
      "qx.Promise": {},
      "qx.event.type.Data": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This mixin offers basic event handling capabilities. It includes the
   * commonly known methods for managing event listeners and firing events.
   *
   * @use(qx.event.dispatch.Direct)
   * @use(qx.event.handler.Object)
   */
  qx.Mixin.define("qx.core.MEvent", {
    members: {
      /** @type {Class} Pointer to the regular event registration class */
      __P_180_0: qx.event.Registration,
      /**
       * Add event listener to this object.
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener. When not given, the corresponding dispatcher
       *         usually falls back to a default, which is the target
       *         by convention. Note this is not a strict requirement, i.e.
       *         custom dispatchers can follow a different strategy.
       * @param capture {Boolean ? false} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event. The default is
       *         to attach the event handler to the bubbling phase.
       * @return {String} An opaque id, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       */
      addListener: function addListener(type, listener, self, capture) {
        if (!this.$$disposed) {
          return this.__P_180_0.addListener(this, type, listener, self, capture);
        }
        return null;
      },
      /**
       * Add event listener to this object, which is only called once. After the
       * listener is called the event listener gets removed.
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param context {Object ? window} reference to the 'this' variable inside the callback
       * @param capture {Boolean ? false} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event. The default is
       *         to attach the event handler to the bubbling phase.
       * @return {String} An opaque id, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       */
      addListenerOnce: function addListenerOnce(type, listener, context, capture) {
        var self = this; // self is needed to remove the listener inside the callback
        if (!context) {
          context = this;
        }
        var id; // store id in closure context
        var callback = function callback(e) {
          self.removeListenerById(id);
          listener.call(context, e);
        };
        // check for wrapped callback storage
        if (!listener.$$wrapped_callback) {
          listener.$$wrapped_callback = {};
        }
        // store the call for each type in case the listener is
        // used for more than one type [BUG #8038]
        listener.$$wrapped_callback[type + this.toHashCode()] = callback;
        id = this.addListener(type, callback, context, capture);
        return id;
      },
      /**
       * Remove event listener from this object
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param self {Object ? null} reference to the 'this' variable inside the callback
       * @param capture {Boolean} Whether to remove the event listener of
       *   the bubbling or of the capturing phase.
       * @return {Boolean} Whether the event was removed successfully (has existed)
       */
      removeListener: function removeListener(type, listener, self, capture) {
        if (!this.$$disposed) {
          // special handling for wrapped once listener
          if (listener.$$wrapped_callback && listener.$$wrapped_callback[type + this.$$hash]) {
            var callback = listener.$$wrapped_callback[type + this.$$hash];
            delete listener.$$wrapped_callback[type + this.$$hash];
            listener = callback;
          }
          return this.__P_180_0.removeListener(this, type, listener, self, capture);
        }
        return false;
      },
      /**
       * Removes an event listener from an event target by an id returned by
       * {@link #addListener}
       *
       * @param id {String} The id returned by {@link #addListener}
       * @return {Boolean} Whether the event was removed successfully (has existed)
       */
      removeListenerById: function removeListenerById(id) {
        if (!this.$$disposed) {
          return this.__P_180_0.removeListenerById(this, id);
        }
        return false;
      },
      /**
       * Check if there are one or more listeners for an event type.
       *
       * @param type {String} name of the event type
       * @param capture {Boolean ? false} Whether to check for listeners of
       *         the bubbling or of the capturing phase.
       * @return {Boolean} Whether the object has a listener of the given type.
       */
      hasListener: function hasListener(type, capture) {
        return this.__P_180_0.hasListener(this, type, capture);
      },
      /**
       * Dispatch an event on this object
       *
       * @param evt {qx.event.type.Event} event to dispatch
       * @return {Boolean} Whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      dispatchEvent: function dispatchEvent(evt) {
        if (!this.$$disposed) {
          return this.__P_180_0.dispatchEvent(this, evt);
        }
        return true;
      },
      /** @type{Object<String,qx.Promise>} list of pending events, indexed by hash code */
      __P_180_1: null,
      /** @type{qx.Promise} promise that callers are waiting on, ready for when all events are finished */
      __P_180_2: null,
      /**
       * Internal helper method to track promises returned from event handlers
       *
       * @param {var} result the result from the event handler
       * @returns {qx.Promise|var} the value to return
       */
      __P_180_3: function __P_180_3(result) {
        var _this = this;
        {
          if (!qx.Promise.isPromise(result)) {
            return result;
          }
          if (!this.__P_180_1) {
            this.__P_180_1 = {};
          }
          if (!(result instanceof qx.Promise)) {
            result = qx.Promise.resolve(result);
          }
          var hashCode = result.toHashCode();
          var newPromise = result.then(function (result) {
            delete _this.__P_180_1[hashCode];
            var promise = _this.__P_180_2;
            if (promise && Object.keys(_this.__P_180_1).length == 0) {
              _this.__P_180_1 = null;
              _this.__P_180_2 = null;
              promise.resolve();
            }
            return result;
          })["catch"](function (err) {
            delete _this.__P_180_1[hashCode];
            var promise = _this.__P_180_2;
            if (promise && Object.keys(_this.__P_180_1).length == 0) {
              _this.__P_180_1 = null;
              _this.__P_180_2 = null;
              promise.reject(err);
            }
            throw err;
          });
          this.__P_180_1[hashCode] = newPromise;
          return newPromise;
        }
      },
      /**
       * Waits for all pending events to be resolved
       */
      waitForPendingEvents: function waitForPendingEvents() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var promise;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (_this2.__P_180_1) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2);
              case 1:
                if (!_this2.__P_180_2) {
                  _this2.__P_180_2 = new qx.Promise();
                }
                promise = _this2.__P_180_2;
                _context.n = 2;
                return promise;
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Creates and dispatches an event on this object.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {Boolean|qx.Promise} whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireEvent: function fireEvent(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_180_3(this.__P_180_0.fireEvent(this, type, clazz, args));
        }
        return true;
      },
      /**
       * Creates and dispatches an event on this object; equivalent to fireEvent, except that it
       * always returns a promise
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireEventAsync: function fireEventAsync(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_180_3(this.__P_180_0.fireEventAsync(this, type, clazz, args));
        }
        return qx.Promise.resolve(true);
      },
      /**
       * Create an event object and dispatch it on this object.
       * The event dispatched with this method does never bubble! Use only if you
       * are sure that bubbling is not required.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {Boolean} Whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireNonBubblingEvent: function fireNonBubblingEvent(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_180_3(this.__P_180_0.fireNonBubblingEvent(this, type, clazz, args));
        }
        return true;
      },
      /**
       * Create an event object and dispatch it on this object; equivalent to fireNonBubblingEvent,
       * except that it always returns a promise.
       *
       * The event dispatched with this method does never bubble! Use only if you
       * are sure that bubbling is not required.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireNonBubblingEventAsync: function fireNonBubblingEventAsync(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_180_3(this.__P_180_0.fireNonBubblingEventAsync(this, type, clazz, args));
        }
        return qx.Promise.resolve(true);
      },
      /**
       * Creates and dispatches an non-bubbling data event on this object.
       *
       * @param type {String} Event type to fire
       * @param data {var} User defined data attached to the event object
       * @param oldData {var?null} The event's old data (optional)
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @return {Boolean|qx.Promise} whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireDataEvent: function fireDataEvent(type, data, oldData, cancelable) {
        if (!this.$$disposed) {
          if (oldData === undefined) {
            oldData = null;
          }
          return this.__P_180_3(this.__P_180_0.fireEvent(this, type, qx.event.type.Data, [data, oldData, !!cancelable]));
        }
        return true;
      },
      /**
       * Creates and dispatches an non-bubbling data event on this object; equivalent to
       * fireEvent, except that it always returns a promise.
       *
       * @param type {String} Event type to fire
       * @param data {var} User defined data attached to the event object
       * @param oldData {var?null} The event's old data (optional)
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireDataEventAsync: function fireDataEventAsync(type, data, oldData, cancelable) {
        if (!this.$$disposed) {
          if (oldData === undefined) {
            oldData = null;
          }
          return this.__P_180_3(this.__P_180_0.fireEventAsync(this, type, qx.event.type.Data, [data, oldData, !!cancelable]));
        }
        return qx.Promise.resolve(true);
      }
    }
  });
  qx.core.MEvent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MEvent.js.map?dt=1782705774843