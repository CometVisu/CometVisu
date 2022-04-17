(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
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
  
  ************************************************************************ */

  /**
   * qooxdoo profiler.
   *
   * All functions of qooxdoo classes (constructors, members, statics) can be profiled
   * using this class.
   *
   * To enable profiling this class must be loaded <b>before</b> <code>qx.Class</code> is
   * loaded. This can be achieved by making <code>qx.core.Aspect</code> and
   * <code>qx.dev.Profile</code> a load time dependency of <code>qx.Class</code>.
   * Further more the variant <code>qx.aspects</code> must be set to <code>on</code>.
   */
  qx.Bootstrap.define("qx.dev.Profile", {
    statics: {
      /**
       * Storage for profiling data
       *
       * @internal
       */
      __P_162_0: {},

      /**
       * Array for call stack-like data types.
       *
       * @internal
       */
      __P_162_1: [],

      /**
       * Flag marking profiler run.
       *
       * @internal
       */
      __P_162_2: true,

      /**
       * Profiler execution time. Subtracted for more accurate calculations.
       *
       * @internal
       */
      __P_162_3: undefined,

      /**
       * Amount of times to run calculation of profiler overhead.
       *
       * @internal
       */
      __P_162_4: 4000,

      /**
       * Clear profiling data and start profiling.
       */
      start: function start() {
        this.__P_162_2 = true;
        this.__P_162_0 = {};

        this.__P_162_1.splice(0, this.__P_162_1.length - 2);
      },

      /**
       * Stop profiling.
       */
      stop: function stop() {
        this.__P_162_2 = false;
      },

      /**
       * Return the profiling data as JSON data structure.
       *
       * Example:
       * <pre class="javascript">
       * {
       *   "qx.core.ObjectRegistry.toHashCode (static)":{
       *     *     "totalTime":3,
       *     "ownTime":3,
       *     "callCount":218,
       *     "subRoutineCalls":0,
       *     "name":"qx.core.ObjectRegistry.toHashCode",
       *     "type":"static"
       *   },
       *   "qx.core.Object.addListener (member)":{
       *     "totalTime":19,
       *     "ownTime":12,
       *     "callCount":59,
       *     "subRoutineCalls":251,
       *     "name":"qx.core.Object.addListener",
       *     "type":"member"
       *   },
       *   "qx.ui.table.cellrenderer.Default (constructor)":{
       *     "totalTime":2,
       *     "ownTime":1,
       *     "callCount":1,
       *     "subRoutineCalls":4,
       *     "name":"qx.ui.table.cellrenderer.Default",
       *     "type":"constructor"
       *   }
       * }
       * </pre>
       *
       * @return {Map} The current profiling data.
       */
      getProfileData: function getProfileData() {
        return this.__P_162_0;
      },

      /**
       * Show profiling results in a popup window. The results are sorted by the
       * function's own time.
       *
       * @param maxLength {Integer?100} maximum number of entries to display.
       */
      showResults: function showResults(maxLength) {
        this.stop();
        this.normalizeProfileData();
        var data = Object.values(this.__P_162_0);
        data = data.sort(function (a, b) {
          return a.calibratedOwnTime < b.calibratedOwnTime ? 1 : -1;
        });
        data = data.slice(0, maxLength || 100);
        var str = ["<table><tr><th>Name</th><th>Type</th><th>Own time</th><th>Avg time</th><th>calls</th></tr>"];

        for (var i = 0; i < data.length; i++) {
          var profData = data[i];

          if (profData.name == "qx.core.Aspect.__calibrateHelper") {
            continue;
          }

          str.push("<tr><td>");
          str.push(profData.name, "()");
          str.push("</td><td>");
          str.push(profData.type);
          str.push("</td><td>");
          str.push(profData.calibratedOwnTime.toPrecision(3));
          str.push("ms</td><td>");
          str.push((profData.calibratedOwnTime / profData.callCount).toPrecision(3));
          str.push("ms</td><td>");
          str.push(profData.callCount);
          str.push("</td></tr>");
        }

        str.push("</table>");
        var win = window.open("about:blank", "profileLog");
        var doc = win.document;
        doc.open();
        doc.write("<html><head><style type='text/css'>body{font-family:monospace;font-size:11px;background:white;color:black;}</style></head><body>");
        doc.write(str.join(""));
        doc.write("</body></html>");
        doc.close();
      },

      /**
       * Measure the overhead of calling a wrapped function vs. calling an
       * unwrapped function.
       *
       * @lint ignoreDeprecated(eval)
       *
       * @param count {Integer} Number of iterations to measure.
       * @return {Number} Overhead of a wrapped function call in milliseconds.
       */
      __P_162_5: function __P_162_5(count) {
        // we use eval to unroll the loop because we don't want to measure the loop overhead.
        // Measure wrapped function
        var fcn;
        var code = ["var fcn = function(){ var fcn=qx.dev.Profile.__calibrateHelper;"];

        for (var i = 0; i < count; i++) {
          code.push("fcn();");
        }

        code.push("};");
        eval(code.join(""));
        var start = new Date();
        fcn();
        var end = new Date();
        var profTime = end - start; // Measure unwrapped function

        var code = ["var plainFunc = function() {};", "var fcn = function(){ var fcn=plainFunc;"];

        for (var i = 0; i < count; i++) {
          code.push("fcn();");
        }

        code.push("};");
        eval(code.join(""));
        var start = new Date();
        fcn();
        var end = new Date();
        var plainTime = end - start; // Compute per call overhead

        return (profTime - plainTime) / count;
      },

      /**
       * Helper to measure overhead.
       */
      __P_162_6: function __P_162_6() {},

      /**
       * Normalize profiling data by subtracting the overhead of wrapping from the
       * function's own time.
       */
      normalizeProfileData: function normalizeProfileData() {
        if (this.__P_162_3 == undefined) {
          this.__P_162_3 = this.__P_162_5(this.__P_162_4);
        }

        for (var key in this.__P_162_0) {
          var profileData = this.__P_162_0[key];
          profileData.calibratedOwnTime = Math.max(profileData.ownTime - profileData.subRoutineCalls * this.__P_162_3, 0);
          profileData.calibratedAvgTime = profileData.calibratedOwnTime / profileData.callCount;
        }
      },

      /**
       * This function will be called before each function call. (Start timing)
       *
       * @param fullName {String} Full name of the function including the class name.
       * @param fcn {Function} Function to time.
       * @param type {String} Function type as in parameter with same name to
       *                      {@link qx.core.Aspect#addAdvice}
       * @param args {arguments} The arguments passed to the wrapped function
       */
      profileBefore: function profileBefore(fullName, fcn, type, args) {
        var me = qx.dev.Profile;

        if (!me.__P_162_2) {
          return;
        }

        var callData = {
          subRoutineTime: 0,
          subRoutineCalls: 0
        };

        me.__P_162_1.push(callData);

        callData.startTime = new Date();
      },

      /**
       * This function will be called after each function call. (Stop timing)
       *
       * @param fullName {String} Full name of the function including the class name.
       * @param fcn {Function} Function to time.
       * @param type {String} Function type as in parameter with same name to
       *                      {@link qx.core.Aspect#addAdvice}
       * @param args {arguments} The arguments passed to the wrapped function
       * @param returnValue {var} return value of the wrapped function.
       */
      profileAfter: function profileAfter(fullName, fcn, type, args, returnValue) {
        var me = qx.dev.Profile;

        if (!me.__P_162_2) {
          return;
        }

        var endTime = new Date();

        var callData = me.__P_162_1.pop();

        var totalTime = endTime - callData.startTime;
        var ownTime = totalTime - callData.subRoutineTime;

        if (me.__P_162_1.length > 0) {
          var lastCall = me.__P_162_1[me.__P_162_1.length - 1];
          lastCall.subRoutineTime += totalTime;
          lastCall.subRoutineCalls += 1;
        }

        var fcnKey = fullName + " (" + type + ")";

        if (me.__P_162_0[fcnKey] === undefined) {
          me.__P_162_0[fcnKey] = {
            totalTime: 0,
            ownTime: 0,
            callCount: 0,
            subRoutineCalls: 0,
            name: fullName,
            type: type
          };
        }

        var functionData = me.__P_162_0[fcnKey];
        functionData.totalTime += totalTime;
        functionData.ownTime += ownTime;
        functionData.callCount += 1;
        functionData.subRoutineCalls += callData.subRoutineCalls;
      }
    },
    defer: function defer(statics) {}
  });
  qx.dev.Profile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Profile.js.map?dt=1650225650955