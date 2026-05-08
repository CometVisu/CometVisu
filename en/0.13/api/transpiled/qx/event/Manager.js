function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Event": {
        "require": true,
        "construct": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.core.ObjectRegistry": {
        "construct": true
      },
      "qx.event.GlobalError": {
        "construct": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qx.lang.Array": {},
      "qx.event.IEventHandler": {},
      "qx.log.Logger": {},
      "qx.event.Pool": {},
      "qx.event.Utils": {},
      "qx.util.DisposeUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Sebastian Werner (wpbasti)
       * John Spackman (johnspackman)
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Wrapper for browser DOM event handling for each browser window/frame.
   *
   * @require(qx.bom.Event)
   */
  qx.Class.define("qx.event.Manager", {
    extend: Object,
    implement: [qx.core.IDisposable],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * Creates a new instance of the event handler.
     *
     * @param win {Window} The DOM window this manager handles the events for
     * @param registration {qx.event.Registration} The event registration to use
     */
    construct: function construct(win, registration) {
      // Assign window object
      this.__P_218_0 = win;
      this.__P_218_1 = qx.core.ObjectRegistry.toHashCode(win);
      this.__P_218_2 = registration;

      // Register to the page unload event.
      // Only for iframes and other secondary documents.
      if (win.qx !== qx) {
        var self = this;
        var _method = function method() {
          qx.bom.Event.removeNativeListener(win, "unload", _method);
          self.dispose();
        };
        {
          qx.bom.Event.addNativeListener(win, "unload", qx.event.GlobalError.observeMethod(_method));
        }
      }

      // Registry for event listeners
      this.__P_218_3 = new Map();

      // The handler and dispatcher instances
      this.__P_218_4 = {};
      this.__P_218_5 = {};
      this.__P_218_6 = {};
      this.__P_218_7 = new qx.util.DeferredCall(function () {
        this.__P_218_8 = null;
      }, this);
      this.__P_218_7.$$blackListCleaner = true;
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {Integer} Last used ID for an event */
      __P_218_9: 0,
      /**
       * Returns an unique ID which may be used in combination with a target and
       * a type to identify an event entry.
       *
       * @return {String} The next free identifier (auto-incremented)
       */
      getNextUniqueId: function getNextUniqueId() {
        return this.__P_218_9++ + "";
      },
      /**
       * @type {Array} private list of global event monitor functions
       */
      __P_218_10: [],
      /**
       * Adds a global event monitor function which is called for each event fired
       * anywhere in the application. The function is called with the signature
       * (target: {@link qx.core.Object}, event: {@link qx.event.type.Event}).
       * Since for performance reasons, the original event object is passed,
       * the monitor function must not change this event in any way.
       *
       * @param fn {Function} Monitor function
       * @param context {Object?} Optional execution context of the function
       */
      addGlobalEventMonitor: function addGlobalEventMonitor(fn, context) {
        qx.core.Assert.assertFunction(fn);
        fn.$$context = context;
        this.__P_218_10.push(fn);
      },
      /**
       * Removes a global event monitor function that had
       * previously been added.
       * @param fn {Function} The global monitor function
       */
      removeGlobalEventMonitor: function removeGlobalEventMonitor(fn) {
        qx.core.Assert.assertFunction(fn);
        qx.lang.Array.remove(this.__P_218_10, fn);
      },
      /**
       * Remove all registered event monitors
       */
      resetGlobalEventMonitors: function resetGlobalEventMonitors() {
        qx.event.Manager.__P_218_10 = [];
      },
      /**
       * Returns the global event monitor. Not compatible with the {@link
       * qx.event.Manager.addGlobalEventMonitor} API. Will be removed in v7.0.0
       *
       * @deprecated {6.0}
       * @return {Function?} the global monitor function
       */
      getGlobalEventMonitor: function getGlobalEventMonitor() {
        return this.__P_218_10[0];
      },
      /**
       * Sets the global event monitor. Not compatible with the {@link
       * qx.event.Manager.addGlobalEventMonitor} API. Will be removed in
       * v7.0.0. Use {@link qx.event.Manager.addGlobalEventMonitor} instead.
       *
       * @deprecated {6.0}
       * @param fn {Function?} the global monitor function
       */
      setGlobalEventMonitor: function setGlobalEventMonitor(fn) {
        qx.core.Assert.assertFunction(fn);
        this.__P_218_10[0] = fn;
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_218_2: null,
      __P_218_3: null,
      __P_218_5: null,
      __P_218_11: null,
      __P_218_4: null,
      __P_218_6: null,
      __P_218_0: null,
      __P_218_1: null,
      __P_218_8: null,
      __P_218_7: null,
      /*
      ---------------------------------------------------------------------------
        HELPERS
      ---------------------------------------------------------------------------
      */
      /**
       * Get the window instance the event manager is responsible for
       *
       * @return {Window} DOM window instance
       */
      getWindow: function getWindow() {
        return this.__P_218_0;
      },
      /**
       * Get the hashcode of the manager's window
       *
       * @return {String} The window's hashcode
       */
      getWindowId: function getWindowId() {
        return this.__P_218_1;
      },
      /**
       * Returns an instance of the given handler class for this manager(window).
       *
       * @param clazz {Class} Any class which implements {@link qx.event.IEventHandler}
       * @return {Object} The instance used by this manager
       */
      getHandler: function getHandler(clazz) {
        var handler = this.__P_218_4[clazz.classname];
        if (handler) {
          return handler;
        }
        return this.__P_218_4[clazz.classname] = new clazz(this);
      },
      /**
       * Returns an instance of the given dispatcher class for this manager(window).
       *
       * @param clazz {Class} Any class which implements {@link qx.event.IEventHandler}
       * @return {Object} The instance used by this manager
       */
      getDispatcher: function getDispatcher(clazz) {
        var dispatcher = this.__P_218_5[clazz.classname];
        if (dispatcher) {
          return dispatcher;
        }
        return this.__P_218_5[clazz.classname] = new clazz(this, this.__P_218_2);
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER MANAGEMENT
      ---------------------------------------------------------------------------
      */
      /**
       * Get a copy of all event listeners for the given combination
       * of target, event type and phase.
       *
       * This method is especially useful and for event handlers to
       * to query the listeners registered in the manager.
       *
       * @param target {Object} Any valid event target
       * @param type {String} Event type
       * @param capture {Boolean ? false} Whether the listener is for the
       *       capturing phase of the bubbling phase.
       * @return {Array|null} Array of registered event handlers. May return
       *       null when no listener were found.
       */
      getListeners: function getListeners(target, type, capture) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          return null;
        }
        var entryKey = type + (capture ? "|capture" : "|bubble");
        var entryMap = targetMap.get(entryKey);
        if (entryMap && entryMap.size > 0) {
          var listeners = _toConsumableArray(entryMap.values());
          return new Proxy(listeners, {
            deleteProperty: function deleteProperty(target, property) {
              if (property !== "length") {
                var listener = target[property];
                entryMap["delete"](listener.unique);
              }
              delete target[property];
              return true;
            },
            set: function set(target, property, value, receiver) {
              if (property !== "length") {
                if (!value.unique) {
                  throw new Error("Cannot store a listener without a unique id. Use addListener()");
                }
                entryMap[value.unique] = value;
              }
              target[property] = value;
              return true;
            }
          });
        }
        return null;
      },
      /**
       * Returns all registered listeners.
       *
       * @internal
       *
       * @return {Object} All registered listeners. The key is the hash code for an object.
       */
      getAllListeners: function getAllListeners() {
        return Object.fromEntries(this.__P_218_3.entries().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            targetKey = _ref2[0],
            targetMap = _ref2[1];
          return [targetKey, Object.fromEntries(targetMap.entries().map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              entryKey = _ref4[0],
              entryMap = _ref4[1];
            var listeners = _toConsumableArray(entryMap.values());
            var proxy = new Proxy(listeners, {
              deleteProperty: function deleteProperty(target, property) {
                if (property !== "length") {
                  var listener = target[property];
                  entryMap["delete"](listener.unique);
                }
                delete target[property];
                return true;
              },
              set: function set(target, property, value, receiver) {
                if (property !== "length") {
                  if (!value.unique) {
                    throw new Error("Cannot store a listener without a unique id. Use addListener()");
                  }
                  entryMap[value.unique] = value;
                }
                target[property] = value;
                return true;
              }
            });
            return [entryKey, proxy];
          }))];
        }));
      },
      /**
       * Returns a serialized array of all events attached on the given target.
       *
       * @param target {Object} Any valid event target
       * @return {Map[]} Array of maps where everyone contains the keys:
       *   <code>handler</code>, <code>self</code>, <code>type</code> and <code>capture</code>.
       */
      serializeListeners: function serializeListeners(target) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        var result = [];
        if (targetMap) {
          var indexOf, type, capture;
          var _iterator = _createForOfIteratorHelper(targetMap),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                entryKey = _step$value[0],
                entryMap = _step$value[1];
              indexOf = entryKey.indexOf("|");
              type = entryKey.substring(0, indexOf);
              capture = entryKey.charAt(indexOf + 1) === "c";
              result = result.concat(_toConsumableArray(entryMap.values().map(function (entry) {
                return {
                  self: entry.context,
                  handler: entry.handler,
                  type: type,
                  capture: capture
                };
              })));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        return result;
      },
      /**
       * This method might be used to temporally remove all events
       * directly attached to the given target. This do not work
       * have any effect on bubbling events normally.
       *
       * This is mainly thought for detaching events in IE, before
       * cloning them. It also removes all leak scenarios
       * when unloading a document and may be used here as well.
       *
       * @internal
       * @param target {Object} Any valid event target
       * @param enable {Boolean} Whether to enable or disable the events
       */
      toggleAttachedEvents: function toggleAttachedEvents(target, enable) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (targetMap) {
          var indexOf, type, capture;
          var _iterator2 = _createForOfIteratorHelper(targetMap.keys()),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var entryKey = _step2.value;
              indexOf = entryKey.indexOf("|");
              type = entryKey.substring(0, indexOf);
              capture = entryKey.charCodeAt(indexOf + 1) === 99; // checking for character "c".

              if (enable) {
                this.__P_218_12(target, type, capture);
              } else {
                this.__P_218_13(target, type, capture);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      },
      /**
       * Check whether there are one or more listeners for an event type
       * registered at the target.
       *
       * @param target {Object} Any valid event target
       * @param type {String} The event type
       * @param capture {Boolean ? false} Whether to check for listeners of
       *         the bubbling or of the capturing phase.
       * @return {Boolean} Whether the target has event listeners of the given type.
       */
      hasListener: function hasListener(target, type, capture) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          return false;
        }
        var entryKey = type + (capture ? "|capture" : "|bubble");
        var entryMap = targetMap.get(entryKey);
        return Boolean(entryMap && entryMap.size > 0);
      },
      /**
       * Imports a list of event listeners at once. This only
       * works for newly created elements as it replaces
       * all existing data structures.
       *
       * Works with a map of data. Each entry in this map should be a
       * map again with the keys <code>type</code>, <code>listener</code>,
       * <code>self</code>, <code>capture</code> and an optional <code>unique</code>.
       *
       * The values are identical to the parameters of {@link #addListener}.
       * For details please have a look there.
       *
       * @param target {Object} Any valid event target
       * @param list {Map} A map where every listener has an unique key.
       */
      importListeners: function importListeners(target, list) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          targetMap = new Map();
          this.__P_218_3.set(targetKey, targetMap);
        }
        for (var listKey in list) {
          var item = list[listKey];
          var entryKey = item.type + (item.capture ? "|capture" : "|bubble");
          var entryMap = targetMap.get(entryKey);
          if (!entryMap) {
            entryMap = new Map();
            targetMap.set(entryKey, entryMap);
          }
          if (entryMap.size === 0) {
            // This is the first event listener for this type and target
            // Inform the event handler about the new event
            // they perform the event registration at DOM level if needed
            this.__P_218_12(target, item.type, item.capture);
          }

          // Add listener to map
          var unique = item.unique || qx.event.Manager.getNextUniqueId();
          entryMap.set(unique, {
            handler: item.listener,
            context: item.self,
            unique: unique
          });
        }
      },
      /**
       * Add an event listener to any valid target. The event listener is passed an
       * instance of {@link qx.event.type.Event} containing all relevant information
       * about the event as parameter.
       *
       * @param target {Object} Any valid event target
       * @param type {String} Name of the event e.g. "click", "keydown", ...
       * @param listener {Function} Event listener function
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener. When not given, the corresponding dispatcher
       *         usually falls back to a default, which is the target
       *         by convention. Note this is not a strict requirement, i.e.
       *         custom dispatchers can follow a different strategy.
       * @param capture {Boolean ? false} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event. The default is
       *         to attach the event handler to the bubbling phase.
       * @return {String} An opaque ID, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       * @throws {Error} if the parameters are wrong
       */
      addListener: function addListener(target, type, listener, self, capture) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          targetMap = new Map();
          this.__P_218_3.set(targetKey, targetMap);
        }
        var entryKey = type + (capture ? "|capture" : "|bubble");
        var entryMap = targetMap.get(entryKey);
        if (!entryMap) {
          entryMap = new Map();
          targetMap.set(entryKey, entryMap);
        }
        if (entryMap.size === 0) {
          // This is the first event listener for this type and target
          // Inform the event handler about the new event
          // they perform the event registration at DOM level if needed
          this.__P_218_12(target, type, capture);
        }

        // Add listener to map
        var unique = qx.event.Manager.getNextUniqueId();
        entryMap.set(unique, {
          handler: listener,
          context: self,
          unique: unique
        });
        return entryKey + "|" + unique;
      },
      /**
       * Get the event handler class matching the given event target and type
       *
       * @param target {Object} The event target
       * @param type {String} The event type
       * @return {qx.event.IEventHandler|null} The best matching event handler or
       *     <code>null</code>.
       */
      findHandler: function findHandler(target, type) {
        var isDomNode = false,
          isWindow = false,
          isObject = false,
          isDocument = false;
        var key;
        if (target.nodeType === 1) {
          isDomNode = true;
          key = "DOM_" + target.tagName.toLowerCase() + "_" + type;
        } else if (target.nodeType === 9) {
          isDocument = true;
          key = "DOCUMENT_" + type;
        }

        // Please note:
        // Identical operator does not work in IE (as of version 7) because
        // document.parentWindow is not identical to window. Crazy stuff.
        else if (target == this.__P_218_0) {
          isWindow = true;
          key = "WIN_" + type;
        } else if (target.classname) {
          isObject = true;
          key = "QX_" + target.classname + "_" + type;
        } else {
          key = "UNKNOWN_" + target + "_" + type;
        }
        var cache = this.__P_218_6;
        if (cache[key]) {
          return cache[key];
        }
        var classes = this.__P_218_2.getHandlers();
        var IEventHandler = qx.event.IEventHandler;
        var clazz, instance, supportedTypes, targetCheck;
        for (var i = 0, l = classes.length; i < l; i++) {
          clazz = classes[i];

          // shortcut type check
          supportedTypes = clazz.SUPPORTED_TYPES;
          if (supportedTypes && !supportedTypes[type]) {
            continue;
          }

          // shortcut target check
          targetCheck = clazz.TARGET_CHECK;
          if (targetCheck) {
            // use bitwise & to compare for the bitmask!
            var found = false;
            if (isDomNode && (targetCheck & IEventHandler.TARGET_DOMNODE) != 0) {
              found = true;
            } else if (isWindow && (targetCheck & IEventHandler.TARGET_WINDOW) != 0) {
              found = true;
            } else if (isObject && (targetCheck & IEventHandler.TARGET_OBJECT) != 0) {
              found = true;
            } else if (isDocument && (targetCheck & IEventHandler.TARGET_DOCUMENT) != 0) {
              found = true;
            }
            if (!found) {
              continue;
            }
          }
          instance = this.getHandler(classes[i]);
          if (clazz.IGNORE_CAN_HANDLE || instance.canHandleEvent(target, type)) {
            cache[key] = instance;
            return instance;
          }
        }
        return null;
      },
      /**
       * This method is called each time an event listener for one of the
       * supported events is added using {qx.event.Manager#addListener}.
       *
       * @param target {Object} Any valid event target
       * @param type {String} event type
       * @param capture {Boolean} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event.
       * @throws {Error} if there is no handler for the event
       */
      __P_218_12: function __P_218_12(target, type, capture) {
        var handler = this.findHandler(target, type);
        if (handler) {
          handler.registerEvent(target, type, capture);
          return;
        }
      },
      /**
       * Remove an event listener from an event target.
       *
       * @param target {Object} Any valid event target
       * @param type {String} Name of the event
       * @param listener {Function} The pointer to the event listener
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener.
       * @param capture {Boolean ? false} Whether to remove the event listener of
       *         the bubbling or of the capturing phase.
       * @return {Boolean} Whether the event was removed successfully (was existant)
       * @throws {Error} if the parameters are wrong
       */
      removeListener: function removeListener(target, type, listener, self, capture) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          return false;
        }
        var entryKey = type + (capture ? "|capture" : "|bubble");
        var entryMap = targetMap.get(entryKey);
        if (!entryMap) {
          return false;
        }
        var deleted = false;
        var _iterator3 = _createForOfIteratorHelper(entryMap.entries().filter(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              eK = _ref6[0],
              e = _ref6[1];
            return e.handler === listener && e.context === self;
          })),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _slicedToArray(_step3.value, 2),
              _entryKey = _step3$value[0],
              entry = _step3$value[1];
            deleted = true;
            entryMap["delete"](_entryKey);
            this.__P_218_14(_entryKey);
            if (entryMap.size === 0) {
              this.__P_218_13(target, type, capture);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return deleted;
      },
      /**
       * Removes an event listener from an event target by an ID returned by
       * {@link #addListener}.
       *
       * @param target {Object} The event target
       * @param id {String} The ID returned by {@link #addListener}
       * @return {Boolean} <code>true</code> if the handler was removed
       */
      removeListenerById: function removeListenerById(target, id) {
        var split = id.split("|");
        var type = split[0];
        var capture = split[1].charCodeAt(0) === 99; // detect leading "c"
        var unique = split[2];
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          return false;
        }
        var entryKey = type + (capture ? "|capture" : "|bubble");
        var entryMap = targetMap.get(entryKey);
        if (!entryMap) {
          return false;
        }
        var entry = entryMap.get(unique);
        if (entry) {
          entryMap["delete"](unique);
          this.__P_218_14(entry.unique);
          if (entryMap.size === 0) {
            this.__P_218_13(target, type, capture);
          }
          return true;
        }
        return false;
      },
      /**
       * Remove all event listeners, which are attached to the given event target.
       *
       * @param target {Object} The event target to remove all event listeners from.
       * @return {Boolean} Whether the events were existant and were removed successfully.
       */
      removeAllListeners: function removeAllListeners(target) {
        var targetKey = target.$$hash || qx.core.ObjectRegistry.toHashCode(target);
        var targetMap = this.__P_218_3.get(targetKey);
        if (!targetMap) {
          return false;
        }

        // Deregister from event handlers
        var split, type, capture;
        var _iterator4 = _createForOfIteratorHelper(targetMap),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _step4$value = _slicedToArray(_step4.value, 2),
              entryKey = _step4$value[0],
              entryMap = _step4$value[1];
            if (entryMap && entryMap.size > 0) {
              // This is quite expensive, see bug #1283
              split = entryKey.split("|");
              var _iterator5 = _createForOfIteratorHelper(entryMap.keys()),
                _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var uniqueKey = _step5.value;
                  this.__P_218_14(uniqueKey);
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
              entryMap.clear();
              type = split[0];
              capture = split[1] === "capture";
              this.__P_218_13(target, type, capture);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        this.__P_218_3["delete"](targetKey);
        return true;
      },
      /**
       * Internal helper for deleting the internal listener  data structure for
       * the given targetKey.
       *
       * @param targetKey {String} Hash code for the object to delete its
       *   listeners.
       *
       * @internal
       */
      deleteAllListeners: function deleteAllListeners(targetKey) {
        this.__P_218_3["delete"](targetKey);
      },
      /**
       * This method is called each time the an event listener for one of the
       * supported events is removed by using {qx.event.Manager#removeListener}
       * and no other event listener is listening on this type.
       *
       * @param target {Object} Any valid event target
       * @param type {String} event type
       * @param capture {Boolean} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event.
       * @throws {Error} if there is no handler for the event
       */
      __P_218_13: function __P_218_13(target, type, capture) {
        var handler = this.findHandler(target, type);
        if (handler) {
          handler.unregisterEvent(target, type, capture);
          return;
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT DISPATCH
      ---------------------------------------------------------------------------
      */
      /**
       * Dispatches an event object using the qooxdoo event handler system. The
       * event will only be visible in event listeners attached using
       * {@link #addListener}. After dispatching the event object will be pooled
       * for later reuse or disposed.
       *
       * @param target {Object} Any valid event target
       * @param event {qx.event.type.Event} The event object to dispatch. The event
       *     object must be obtained using {@link qx.event.Registration#createEvent}
       *     and initialized using {@link qx.event.type.Event#init}.
       * @return {Boolean|qx.Promise} whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       * @throws {Error} if there is no dispatcher for the event
       */
      dispatchEvent: function dispatchEvent(target, event) {
        // Show the decentrally fired events to one or more global monitor functions
        var monitors = qx.event.Manager.__P_218_10;
        if (monitors.length) {
          for (var i = 0; i < monitors.length; i++) {
            var preventDefault = event.getDefaultPrevented();
            try {
              monitors[i].call(monitors[i].$$context, target, event);
            } catch (ex) {
              qx.log.Logger.error("Error in global event monitor function " + monitors[i].toString().slice(0, 50) + "...");

              // since 6.0.0-beta-2020051X: throw a real error to stop execution instead of just a warning
              throw ex;
            }
            if (preventDefault != event.getDefaultPrevented()) {
              // since 6.0.0-beta-2020051X: throw a real error to stop execution instead of just a warning
              throw new Error("Unexpected change by global event monitor function, modifications to event " + event.getType() + " is not allowed.");
            }
          }
        }

        // Preparations
        var type = event.getType();
        if (!event.getBubbles() && !this.hasListener(target, type)) {
          qx.event.Pool.getInstance().poolObject(event);
          return true;
        }
        if (!event.getTarget()) {
          event.setTarget(target);
        }

        // Interacion data
        var classes = this.__P_218_2.getDispatchers();
        var instance;

        // Loop through the dispatchers
        var dispatched = false;
        var tracker = {};
        for (var i = 0, l = classes.length; i < l; i++) {
          instance = this.getDispatcher(classes[i]);

          // Ask if the dispatcher can handle this event
          if (instance.canDispatchEvent(target, event, type)) {
            qx.event.Utils.track(tracker, instance.dispatchEvent(target, event, type));
            dispatched = true;
            break;
          }
        }
        if (!dispatched) {
          return true;
        }
        return qx.event.Utils.then(tracker, function () {
          // check whether "preventDefault" has been called
          var preventDefault = event.getDefaultPrevented();

          // Release the event instance to the event pool
          qx.event.Pool.getInstance().poolObject(event);
          return !preventDefault;
        });
      },
      /**
       * Dispose the event manager
       */
      dispose: function dispose() {
        // Remove from manager list
        this.__P_218_2.removeManager(this);
        qx.util.DisposeUtil.disposeMap(this, "__P_218_4");
        qx.util.DisposeUtil.disposeMap(this, "__P_218_5");

        // Dispose data fields
        this.__P_218_3 = this.__P_218_0 = this.__P_218_11 = null;
        this.__P_218_2 = this.__P_218_6 = null;
      },
      /**
       * Add event to blacklist.
       *
       * @param uid {String} unique event id
       */
      __P_218_14: function __P_218_14(uid) {
        if (this.__P_218_8 === null) {
          this.__P_218_8 = {};
          this.__P_218_7.schedule();
        }
        this.__P_218_8[uid] = true;
      },
      /**
       * Check if the event with the given id has been removed and is therefore blacklisted for event handling
       *
       * @param uid {String} unique event id
       * @return {boolean}
       */
      isBlacklisted: function isBlacklisted(uid) {
        return this.__P_218_8 !== null && this.__P_218_8[uid] === true;
      }
    }
  });
  qx.event.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1778272824560