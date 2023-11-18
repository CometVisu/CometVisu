function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.dev.StackTrace": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "defer": "runtime",
        "require": true
      },
      "qx.lang.Array": {},
      "qx.log.appender.RingBuffer": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Function": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * John Spackman (john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * Main qooxdoo logging class.
   *
   * Used as central logging feature by qx.core.Object.
   *
   * Extremely modular and lightweight to support logging at bootstrap and
   * at shutdown as well.
   *
   * * Supports dynamic appenders to push the output to the user
   * * Supports buffering of the last 50 messages (configurable)
   * * Supports different debug levels ("debug", "info", "warn" or "error")
   * * Simple data serialization for incoming messages
   *
   * Typical use of this class is via qx.core.MLogging which is included into most
   * classes, so you would use "this.debug(...)" etc, but qx.log.Logger.debug(),
   * .warn(), .error(), .info(), and .trace() can be used directly for static code.
   *
   * The first parameter is expected to be the context object, ie the object which
   * is sending the log; this can be null but that will prevent the filtering from
   * filtering on class name so ideally it will be a real qx.core.Object derived
   * object.  Other parameters are any Javascript object which will be serialized
   * into the log message
   *
   * <pre class="javascript">
   *  qx.log.Logger.warn(myObject, "This is a message to log", myParam, otherData);
   * </pre>
   *
   *
   * The output of logging is controlled by "appenders", which are classes that
   * accept a log message and output it somehow (see examples in qx.log.appender.*);
   * typical examples are qx.log.appender.Console which outputs to the browser
   * console, or qx.log.appender.Native which outputs messages into a popup
   * window as part of your Qooxdoo UI.
   *
   * While it's quick and easy to add logging calls to code as and when you need it,
   * it is often convenient to control which logging calls output messages at runtime
   * rather than having to edit code. @see qx.log.Logger#addFilter
   *
   * @require(qx.dev.StackTrace)
   */
  qx.Bootstrap.define("qx.log.Logger", {
    statics: {
      /*
      ---------------------------------------------------------------------------
        CONFIGURATION
      ---------------------------------------------------------------------------
      */

      __P_280_0: "debug",
      /**
       * Configures the minimum log level required for new messages.
       *
       * @param value {String} One of "debug", "info", "warn" or "error".
       */
      setLevel: function setLevel(value) {
        this.__P_280_0 = value;
      },
      /**
       * Returns the currently configured minimum log level required for new
       * messages.
       *
       * @return {Integer} Debug level
       */
      getLevel: function getLevel() {
        return this.__P_280_0;
      },
      /**
       * Configures the number of messages to be kept in the buffer.
       *
       * @param value {Integer} Any positive integer
       */
      setTreshold: function setTreshold(value) {
        this.__P_280_1.setMaxMessages(value);
      },
      /**
       * Returns the currently configured number of messages to be kept in the
       * buffer.
       *
       * @return {Integer} Treshold value
       */
      getTreshold: function getTreshold() {
        return this.__P_280_1.getMaxMessages();
      },
      /*
      ---------------------------------------------------------------------------
        APPENDER MANAGEMENT
      ---------------------------------------------------------------------------
      */

      /** @type {Map} Map of all known appenders by ID */
      __P_280_2: [],
      /** @type {Map} Map of all known appenders by name */
      __P_280_3: {},
      /** @type {Array} Array of filters to apply when selecting appenders to append to */
      __P_280_4: [],
      /** @type {Integer} Last free appender ID */
      __P_280_5: 0,
      /**
       * Registers the given appender and inserts the last cached messages.
       *
       * Note that an appender is named by it's class name, unless it has a property
       * called `appenderName`
       *
       * @param appender {Class} A static appender class supporting at
       *   least a <code>process()</code> method to handle incoming messages.
       */
      register: function register(appender) {
        if (appender.$$id) {
          return;
        }

        // Register appender
        var id = this.__P_280_5++;
        var appenderName = appender.appenderName || appender.classname;
        this.__P_280_2[id] = appender;
        this.__P_280_3[appenderName] = appender;
        appender.$$id = id;

        // Insert previous messages
        var entries = this.__P_280_1.getAllLogEvents();
        for (var i = 0, l = entries.length; i < l; i++) {
          var entry = entries[i];
          var appenders = this.__P_280_6(entry.loggerName, entry.level);
          if (appenders[appenderName]) {
            appender.process(entry);
          }
        }
      },
      /**
       * Unregisters the given appender
       *
       * @param appender {Class} A static appender class
       */
      unregister: function unregister(appender) {
        var id = appender.$$id;
        if (id == null) {
          return;
        }
        var appenderName = appender.appenderName || appender.classname;
        delete this.__P_280_3[appenderName];
        delete this.__P_280_2[id];
        delete appender.$$id;
      },
      /**
       * Adds a filter that specifies the appenders to use for a given logger name (classname).
       *
       * By default, every log entry is output to all appenders but you can change this
       * behaviour by calling qx.log.Logger.addFilter; every log message is associated
       * with a class and a logging level (ie debug, warn, info, error, etc) and you can
       * apply a filter on either one.
       *
       * For example, to restrict the output to only allow qx.ui.* classes to output debug
       * logging information you would use this:
       *
       *  <pre class="javascript">
       *    qx.log.Logger.addFilter(/^qx\.ui/, null, "debug");
       *  </pre>
       *
       * Note that while the default is to log everything, as soon as you apply one filter
       * you are specifying an exhaustive list of classes; so if you use the above example,
       * the ONLY classes that will be able to log is qx.ui.*.  If you want to use multiple
       * classes to the output, just add more addFilter calls.
       *
       * The logging level (eg "debug", "error", etc) is greater than or equal to - so in
       * the above example, debug, error, warn, and info will be output but trace will not.
       *
       * The second parameter to addFilter is the classname of the appender to use; this
       * allows you to specify that log messages only go to one destination; for example:
       *
       *  <pre class="javascript">
       *    qx.log.Logger.addFilter(/^qx\.ui/, "qx.log.appender.Console", "warn");
       *    qx.log.Logger.addFilter(/^qx\.io/, "qx.log.appender.Native", "debug");
       *    qx.log.Logger.addFilter(/^qx\.io/, "qx.log.appender.Console", "error");
       *  </pre>
       *
       * In this example, qx.ui.* will only go to the Console appender and only if a warning
       * is issued; qx.io.* will go to Native for debug, error, warn, and info and to
       * Console for error, warn, and info
       *
       * Note that an appender is named by it's class name, unless it has a property
       * called `appenderName`.
       *
       * @param logger {String|RegExp} the pattern to match in the logger name
       * @param appenderName {String?} the name of the appender class, if undefined then all appenders
       * @param level {String?} the minimum logging level to use the appender, if undefined the default level is used
       */
      addFilter: function addFilter(logger, appenderName, level) {
        if (typeof logger == "string") {
          logger = new RegExp(logger);
        }
        this.__P_280_4.push({
          loggerMatch: logger,
          level: level || this.__P_280_0,
          appenderName: appenderName
        });
      },
      /**
       * Reset all filters
       */
      resetFilters: function resetFilters() {
        this.__P_280_4 = [];
      },
      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Sending a message at level "debug" to the logger.
       *
       * @param object {Object} Contextual object (either instance or static class)
       * @param message {var} Any number of arguments supported. An argument may
       *   have any JavaScript data type. All data is serialized immediately and
       *   does not keep references to other objects.
       */
      debug: function debug(object, message) {
        qx.log.Logger.__P_280_7("debug", arguments);
      },
      /**
       * Sending a message at level "info" to the logger.
       *
       * @param object {Object} Contextual object (either instance or static class)
       * @param message {var} Any number of arguments supported. An argument may
       *   have any JavaScript data type. All data is serialized immediately and
       *   does not keep references to other objects.
       */
      info: function info(object, message) {
        qx.log.Logger.__P_280_7("info", arguments);
      },
      /**
       * Sending a message at level "warn" to the logger.
       *
       * @param object {Object} Contextual object (either instance or static class)
       * @param message {var} Any number of arguments supported. An argument may
       *   have any JavaScript data type. All data is serialized immediately and
       *   does not keep references to other objects.
       */
      warn: function warn(object, message) {
        qx.log.Logger.__P_280_7("warn", arguments);
      },
      /**
       * Sending a message at level "error" to the logger.
       *
       * @param object {Object} Contextual object (either instance or static class)
       * @param message {var} Any number of arguments supported. An argument may
       *   have any JavaScript data type. All data is serialized immediately and
       *   does not keep references to other objects.
       */
      error: function error(object, message) {
        qx.log.Logger.__P_280_7("error", arguments);
      },
      /**
       * Prints the current stack trace at level "info"
       *
       * @param object {Object?} Contextual object (either instance or static class)
       * @param message {var} Any number of arguments supported. An argument may
       *   have any JavaScript data type. All data is serialized immediately and
       *   does not keep references to other objects.
       */
      trace: function trace(object, message) {
        if (qx.log.Logger.isLoggerEnabled("trace", object)) {
          var trace = qx.dev.StackTrace.getStackTrace();
          var args = qx.lang.Array.fromArguments(arguments);
          args.push(trace.join("\n"));
          qx.log.Logger.__P_280_7("trace", args);
        }
      },
      /**
       * Prints a method deprecation warning and a stack trace if the setting
       * <code>qx.debug</code> is set to <code>true</code>.
       *
       * @param fcn {Function} reference to the deprecated function. This is
       *     arguments.callee if the calling method is to be deprecated.
       * @param msg {String?} Optional message to be printed.
       */
      deprecatedMethodWarning: function deprecatedMethodWarning(fcn, msg) {},
      /**
       * Prints a class deprecation warning and a stack trace if the setting
       * <code>qx.debug</code> is set to <code>true</code>.
       *
       * @param clazz {Class} reference to the deprecated class.
       * @param msg {String?} Optional message to be printed.
       */
      deprecatedClassWarning: function deprecatedClassWarning(clazz, msg) {},
      /**
       * Prints an event deprecation warning and a stack trace if the setting
       * <code>qx.debug</code> is set to <code>true</code>.
       *
       * @param clazz {Class} reference to the deprecated class.
       * @param event {String} deprecated event name.
       * @param msg {String?} Optional message to be printed.
       */
      deprecatedEventWarning: function deprecatedEventWarning(clazz, event, msg) {},
      /**
       * Prints a mixin deprecation warning and a stack trace if the setting
       * <code>qx.debug</code> is set to <code>true</code>.
       *
       * @param clazz {Class} reference to the deprecated mixin.
       * @param msg {String?} Optional message to be printed.
       */
      deprecatedMixinWarning: function deprecatedMixinWarning(clazz, msg) {},
      /**
       * Prints a constant deprecation warning and a stacktrace if the setting
       * <code>qx.debug</code> is set to <code>true</code> AND the browser supports
       * __defineGetter__!
       *
       * @param clazz {Class} The class the constant is attached to.
       * @param constant {String} The name of the constant as string.
       * @param msg {String} Optional message to be printed.
       */
      deprecatedConstantWarning: function deprecatedConstantWarning(clazz, constant, msg) {},
      /**
       * Prints a deprecation warning and a stacktrace when a subclass overrides
       * the passed method name. The deprecation is only printed if the setting
       * <code>qx.debug</code> is set to <code>true</code>.
       *
       *
       * @param object {qx.core.Object} Instance to check for overriding.
       * @param baseclass {Class} The baseclass as starting point.
       * @param methodName {String} The method name which is deprecated for overriding.
       * @param msg {String?} Optional message to be printed.
       */
      deprecateMethodOverriding: function deprecateMethodOverriding(object, baseclass, methodName, msg) {},
      /**
       * Deletes the current buffer. Does not influence message handling of the
       * connected appenders.
       *
       */
      clear: function clear() {
        this.__P_280_1.clearHistory();
      },
      /*
      ---------------------------------------------------------------------------
        INTERNAL LOGGING IMPLEMENTATION
      ---------------------------------------------------------------------------
      */

      /** @type {qx.log.appender.RingBuffer} Message buffer of previously fired messages. */
      __P_280_1: new qx.log.appender.RingBuffer(50),
      /** @type {Map} Numeric translation of log levels */
      __P_280_8: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
      },
      /** @type {Map} cache of appenders for a given logger and level */
      __P_280_9: {},
      /**
       * Detects the name of the logger to use for an object
       *
       * @param object {Object} Contextual object (either instance or static class)
       * @return {String} Logger name
       */
      __P_280_10: function __P_280_10(object) {
        if (object) {
          if (object.classname) {
            return object.classname;
          }
          if (typeof object == "string") {
            return object;
          }
        }
        return "[default]";
      },
      /**
       * Detects whether a logger level is enabled for an object
       *
       * @param level {String} One of "trace", "debug", "info", "warn" or "error"
       * @param object {Object} Contextual object (either instance or static class)
       * @return {Boolean} True if the logger is enabled
       */
      isLoggerEnabled: function isLoggerEnabled(level, object) {
        var loggerName = this.__P_280_10(object);
        var appenders = this.__P_280_6(loggerName, level);
        return !!Object.keys(appenders).length;
      },
      /**
       * Internal logging main routine.
       *
       * @param level {String} One of "trace", "debug", "info", "warn" or "error"
       * @param args {Array} List of other arguments, where the first is
       *   taken as the context object.
       */
      __P_280_7: function __P_280_7(level, args) {
        // Get object and determine appenders
        var object = args.length < 2 ? null : args[0];
        var loggerName = this.__P_280_10(object);
        var appenders = this.__P_280_6(loggerName, level);
        if (!Object.keys(appenders).length) {
          return;
        }

        // Serialize and cache
        var start = object ? 1 : 0;
        var items = [];
        for (var i = start, l = args.length; i < l; i++) {
          items.push(this.__P_280_11(args[i], true));
        }

        // Build entry
        var time = new Date();
        var entry = {
          time: time,
          offset: time - qx.Bootstrap.LOADSTART,
          level: level,
          loggerName: loggerName,
          items: items,
          // store window to allow cross frame logging
          win: window
        };

        // Add relation fields
        if (object) {
          if (qx.Bootstrap.isQxCoreObject(object)) {
            entry.object = object.toHashCode();
          }
          if (object.$$type) {
            entry.clazz = object;
          } else if (object.constructor) {
            entry.clazz = object.constructor;
          }
        }
        this.__P_280_1.process(entry);

        // Send to appenders
        for (var classname in appenders) {
          appenders[classname].process(entry);
        }
      },
      /**
       * Finds the appenders for a given classname
       *
       * @param className {String} Name of the class
       * @param level {String} the minimum logging level to use the appender
       * @return {Array} list of appenders
       */
      __P_280_6: function __P_280_6(className, level) {
        var levels = this.__P_280_8;

        // If no filters, then all appenders apply
        if (!this.__P_280_4.length) {
          // Check the default level
          if (levels[level] < levels[this.__P_280_0]) {
            return [];
          }
          return this.__P_280_3;
        }

        // Check the cache
        var cacheId = className + "|" + level;
        var appenders = this.__P_280_9[cacheId];
        if (appenders !== undefined) {
          return appenders;
        }
        appenders = {};
        for (var i = 0; i < this.__P_280_4.length; i++) {
          var filter = this.__P_280_4[i];

          // Filters only apply to certain levels
          if (levels[level] < levels[filter.level]) {
            continue;
          }

          // No duplicates
          if (filter.appenderName && appenders[filter.appenderName]) {
            continue;
          }

          // Test
          if (!filter.loggerMatch || filter.loggerMatch.test(className)) {
            if (filter.appenderName) {
              appenders[filter.appenderName] = this.__P_280_3[filter.appenderName];
            } else {
              return this.__P_280_9[cacheId] = this.__P_280_3;
            }
          }
        }
        return this.__P_280_9[cacheId] = appenders;
      },
      /**
       * Detects the type of the variable given.
       *
       * @param value {var} Incoming value
       * @return {String} Type of the incoming value. Possible values:
       *   "undefined", "null", "boolean", "number", "string",
       *   "function", "array", "error", "map",
       *   "class", "instance", "node", "stringify", "unknown"
       */
      __P_280_12: function __P_280_12(value) {
        if (value === undefined) {
          return "undefined";
        } else if (value === null) {
          return "null";
        }
        if (value.$$type) {
          return "class";
        }
        var type = _typeof(value);
        if (type === "function" || type == "string" || type === "number" || type === "boolean") {
          return type;
        } else if (type === "object") {
          if (value.nodeType) {
            return "node";
            // In Gecko, DOMException doesn't inherit from Error
          } else if (value instanceof Error || value.name && value.message) {
            return "error";
          } else if (value.classname) {
            return "instance";
          } else if (value instanceof Array) {
            return "array";
          } else if (value instanceof Date) {
            return "date";
          } else {
            return "map";
          }
        }
        if (value.toString) {
          return "stringify";
        }
        return "unknown";
      },
      /**
       * Serializes the incoming value. If it is a singular value, the result is
       * a simple string. For an array or a map the result can also be a
       * serialized string of a limited number of individual items.
       *
       * @param value {var} Incoming value
       * @param deep {Boolean?false} Whether arrays and maps should be
       *    serialized for a limited number of items
       * @return {Map} Contains the keys <code>type</code>, <code>text</code> and
       * <code>trace</code>.
       */
      __P_280_11: function __P_280_11(value, deep) {
        var type = this.__P_280_12(value);
        var text = "unknown";
        var trace = [];
        switch (type) {
          case "null":
          case "undefined":
            text = type;
            break;
          case "string":
          case "number":
          case "boolean":
          case "date":
            text = value;
            break;
          case "node":
            if (value.nodeType === 9) {
              text = "document";
            } else if (value.nodeType === 3) {
              text = "text[" + value.nodeValue + "]";
            } else if (value.nodeType === 1) {
              text = value.nodeName.toLowerCase();
              if (value.id) {
                text += "#" + value.id;
              }
            } else {
              text = "node";
            }
            break;
          case "function":
            text = qx.lang.Function.getName(value) || type;
            break;
          case "instance":
          case "class":
          case "stringify":
            text = value.toString();
            break;
          case "error":
            trace = qx.dev.StackTrace.getStackTraceFromError(value);
            text = (value.basename ? value.basename + ": " : "") + value.toString();
            break;
          case "array":
            if (deep) {
              text = [];
              for (var i = 0, l = value.length; i < l; i++) {
                if (text.length > 20) {
                  text.push("...(+" + (l - i) + ")");
                  break;
                }
                text.push(this.__P_280_11(value[i], false));
              }
            } else {
              text = "[...(" + value.length + ")]";
            }
            break;
          case "map":
            if (deep) {
              var temp;

              // Produce sorted key list
              var sorted = [];
              for (var key in value) {
                sorted.push(key);
              }
              sorted.sort();

              // Temporary text list
              text = [];
              for (var i = 0, l = sorted.length; i < l; i++) {
                if (text.length > 20) {
                  text.push("...(+" + (l - i) + ")");
                  break;
                }

                // Additional storage of hash-key
                key = sorted[i];
                temp = this.__P_280_11(value[key], false);
                temp.key = key;
                text.push(temp);
              }
            } else {
              var number = 0;
              for (var key in value) {
                number++;
              }
              text = "{...(" + number + ")}";
            }
            break;
        }
        return {
          type: type,
          text: text,
          trace: trace
        };
      }
    },
    defer: function defer(statics) {
      var logs = qx.Bootstrap.$$logs;
      for (var i = 0; i < logs.length; i++) {
        statics.__P_280_7(logs[i][0], logs[i][1]);
      }
      qx.Bootstrap.debug = statics.debug;
      qx.Bootstrap.info = statics.info;
      qx.Bootstrap.warn = statics.warn;
      qx.Bootstrap.error = statics.error;
      qx.Bootstrap.trace = statics.trace;
    }
  });
  qx.log.Logger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Logger.js.map?dt=1700345599209