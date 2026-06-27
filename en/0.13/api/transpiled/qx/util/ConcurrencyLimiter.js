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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Utility class to limit the number of concurrent executions of async functions.
   *
   * @typedef {Object} TaskEntry
   * @template T
   * @property {() => Promise<T>} task The function to execute.
   * @property {(value: T) => void} resolve The function to call when the task resolves.
   * @property {(reason: any) => void} reject The function to call when the task rejects.
   */
  qx.Class.define("qx.util.ConcurrencyLimiter", {
    extend: qx.core.Object,
    /**
     * @param {Number?Infinity} limit The maximum number of concurrent executions. If Infinity, no limit is applied.
     */
    construct: function construct() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      qx.core.Object.constructor.call(this);
      this.__P_744_0 = limit;
      this.__P_744_1 = [];
      this.__P_744_2 = 0;
    },
    members: {
      /**
       * @type {TaskEntry<*>[]}
       * The tasks that are waiting to be executed
       */
      __P_744_1: null,
      /**
       * Number of currently running tasks.
       */
      __P_744_2: null,
      /**
       * Queues a function to be executed.
       * If the limit is reached, the function will be put on hold until a slot is available.
       *
       * @template T
       * @param {() => Promise<T>} task The function to execute.
       * @returns {Promise<T>} The promise that will be resolved when the function is executed.
       *  If the function rejects, the promise will also reject.
       */
      add: function add(task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
          _this.__P_744_1.push({
            task: task,
            resolve: resolve,
            reject: reject
          });
          _this.__P_744_3();
        });
      },
      /**
       * Checks the queue to see if anything can be executed,
       * and executes the next item in the queue if the limit is not reached.
       * Once the item has finished executing, it will check the queue again.
       */
      __P_744_3: function __P_744_3() {
        var _this2 = this;
        if (this.__P_744_2 == this.__P_744_0) {
          return;
        }
        var next = this.__P_744_1.shift();
        if (!next) {
          return;
        }
        var task = next.task,
          resolve = next.resolve,
          reject = next.reject;
        this.__P_744_2++;
        task().then(resolve, reject)["finally"](function () {
          _this2.__P_744_2--;
          _this2.__P_744_3();
        });
      }
    }
  });
  qx.util.ConcurrencyLimiter.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConcurrencyLimiter.js.map?dt=1782595082080