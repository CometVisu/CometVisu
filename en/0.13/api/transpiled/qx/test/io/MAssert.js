(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Json": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Mixin containing special assert methods
   */
  qx.Mixin.define("qx.test.io.MAssert", {
    members: {
      /**
       * Deep equal comparison, using Sinon's `deepEqual` comparison.
       * Two values are "deep equal" if:
       *
       *   - They are equal, according to samsam.identical
       *   (https://sinonjs.github.io/samsam/)
       *   - They are both date objects representing the same time
       *   - They are both arrays containing elements that are all deepEqual
       *   - They are objects with the same set of properties, and each property
       *     in obj1 is deepEqual to the corresponding property in obj2
       *
       * Supports cyclic objects.
       * @param {*} expected
       * @param {*} actual
       * @param {String?} msg
       */
      assertDeepEquals: function assertDeepEquals(expected, actual, msg) {
        if (!msg) {
          msg = "Failed to assert that ".concat(qx.lang.Json.stringify(actual), " deeply equals ").concat(qx.lang.Json.stringify(expected), ".");
        }
        this.assert(qx.lang.Object.equals(expected, actual), msg);
      },
      /**
       * Asserts that a string fragment is contained in a result
       * @param {String} expectedFragment
       * @param {String} actual
       * @param {String?} msg
       */
      assertContains: function assertContains(expectedFragment, actual, msg) {
        this.assertString(expectedFragment);
        this.assertString(actual);
        if (!msg) {
          msg = "Failed to assert that '".concat(actual, "' contains '").concat(expectedFragment, "'.");
        }
        this.assert(actual.includes(expectedFragment), msg);
      },
      PROMISE: {
        map: null,
        PENDING: "pending",
        FULFILLED: "fulfilled",
        REJECTED: "rejected"
      },
      /**
       * Observes a promise so that its state can later be determined for the assertPromise*()
       * methods.
       * @param {Promise} promise
       */
      observePromise: function observePromise(promise) {
        var _this = this;
        if (!this.PROMISE.map) {
          this.PROMISE.map = new WeakMap();
        }
        var state = this.PROMISE.PENDING;
        promise.then(function () {
          return state = _this.PROMISE.FULFILLED;
        }, function () {
          return state = _this.PROMISE.REJECTED;
        });
        var stateFn = function stateFn() {
          return state;
        };
        this.PROMISE.map.set(promise, stateFn);
      },
      /**
       * Returns the state of the given promise, which is either "pending", "fulfilled", or "rejected".
       * Requires that the observePromise() method has previously been called with given promise.
       * @param {Promise} promise
       * @returns {String}
       */
      getPromiseState: function getPromiseState(promise) {
        var stateFn = this.PROMISE.map && this.PROMISE.map.get(promise);
        if (!stateFn) {
          throw new Error("Promise is not being observed, call observePromise() first.");
        }
        return stateFn();
      },
      /**
       * Asserts that the given promise object is still pending
       * @param {Promise} promise
       * @param {String?} msg Optional failure message
       */
      assertPromisePending: function assertPromisePending(promise, msg) {
        var state = this.getPromiseState(promise);
        this.assert(state == this.PROMISE.PENDING, msg || "Promise should be pending, but is ".concat(state, "."));
      },
      /**
       * Asserts that the given promise object is settled, i.e. has either
       * been fulfilled or rejected
       * @param {Promise} promise
       * @param {String?} msg Optional failure message
       */
      assertPromiseSettled: function assertPromiseSettled(promise, msg) {
        var state = this.getPromiseState(promise);
        this.assert(state != this.PROMISE.PENDING, msg || "Promise should be settled, but is pending.");
      },
      /**
       * Asserts that the given promise object has been fulfilled
       * @param {Promise} promise
       * @param {String?} msg Optional failure message
       */
      assertPromiseFulfilled: function assertPromiseFulfilled(promise, msg) {
        var state = this.getPromiseState(promise);
        this.assert(state == this.PROMISE.FULFILLED, msg || "Promise should be fulfilled, but is ".concat(state, "."));
      },
      /**
       * Asserts that the given promise object has been rejected
       * @param {Promise} promise
       * @param {String?} msg Optional failure message
       */
      assertPromiseRejected: function assertPromiseRejected(promise, msg) {
        var state = this.getPromiseState(promise);
        this.assert(state == this.PROMISE.REJECTED, msg || "Promise should be rejected, but is ".concat(state, "."));
      }
    }
  });
  qx.test.io.MAssert.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MAssert.js.map?dt=1782595063128