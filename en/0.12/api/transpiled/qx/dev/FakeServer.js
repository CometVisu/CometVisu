(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {},
      "qx.dev.unit.Sinon": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * A wrapper around Sinon.JS's FakeXMLHttpRequest and FakeServer features that
   * allows quick and simple configuration of mock HTTP backends for testing and
   * development.
   * Automatically creates URL filtering rules to ensure that only configured
   * requests are faked while others will be processed normally by the browser's
   * XHR implementation.
   *
   * The following example shows how to configure mock responses for two different
   * requests:
   * <pre class="javascript">
   *   var responseData = [
   *     {
   *       method: "GET",
   *       url: /\/api\/resource\/\d+/,
   *       response : function(request) {
   *         var status = 200;
   *         var headers = { "Content-Type": "application/json" };
   *         var responseData = {
   *           description: "Mock REST response for resource " + request.url
   *         };
   *         var body = qx.lang.Json.stringify(responseData);
   *         request.respond(status, headers, body);
   *       }
   *     },
   *     {
   *       method: "GET",
   *       url: "/users/{userId}",
   *       response: [
   *         200,
   *         { "Content-Type": "application/json" },
   *         qx.lang.Json.stringify({userId: 'someUser'})
   *       ]
   *     }
   *   ];
   *
   *   qx.dev.FakeServer.getInstance().configure(responseData);
   * </pre>
   */
  qx.Bootstrap.define("qx.dev.FakeServer", {
    extend: Object,
    construct: function construct() {
      var clazz = qx.dev.FakeServer;

      if (!clazz.$$allowconstruct) {
        var msg = clazz + " is a singleton! It is not possible to instantiate it directly." + "Use the static getInstance() method instead.";
        throw new Error(msg);
      }

      this.getFakeServer();
      this.__P_150_0 = [];
    },
    statics: {
      $$instance: null,
      $$allowconstruct: false,

      /**
       * Helper method to handle singletons
       *
       * @internal
       * @return {Object} The singleton instance
       */
      getInstance: function getInstance() {
        if (!this.$$instance) {
          this.$$allowconstruct = true;
          this.$$instance = new this();
          delete this.$$allowconstruct;
        }

        return this.$$instance;
      }
    },
    members: {
      __P_150_1: null,
      __P_150_2: null,
      __P_150_0: null,
      __P_150_3: null,

      /**
       * Configures a set of fake HTTP responses. Each response is defined as a map
       * that must provide the following keys:
       * <ul>
       *   <li><code>method</code> HTTP method to respond to, e.g. <code>PUT</code></li>
       *   <li><code>url</code> URL used to match requests to fake responses. Can be
       *   a RegExp or a String. REST-style parameter placeholders in curly braces
       *   will be replaced with wildcards, e.g. the string "/resource/{resourceId}"
       *   is interpreted as the RegExp <code>/\/resource\/\{.*?\}/</code>
       *   <li><code>response</code> This can be either:
       *     <ul>
       *       <li>a string: This will be the response body, status code will be 200</li>
       *       <li>an array containing the status code, a map of response headers and
       *         the response text, e.g. <code>[200, { "Content-Type": "text/html" }, "OK"]</code>
       *       </li>
       *       <li>a function: This will be called with a FakeXMLHttpRequest object as
       *       the only argument. Its <code>respond</code> method must be called to send a response.
       *       See <a href="http://sinonjs.org/docs/#respond">Sinon.JS: Respond</a> for details.
       *       </li>
       *     </ul>
       *   </li>
       * </ul>
       *
       * @param responseData {Map[]} An array of response description maps.
       */
      configure: function configure(responseData) {
        responseData.forEach(function (item) {
          var urlRegExp = item.url instanceof RegExp ? item.url : this._getRegExp(item.url);
          var response = [item.method, urlRegExp];
          var hasResponse = false;

          for (var i = 0, l = this.__P_150_0.length; i < l; i++) {
            var old = this.__P_150_0[i];
            hasResponse = old[0] == response[0] && old[1] == response[1];
          }

          if (!hasResponse) {
            this.__P_150_0.push(response);
          }

          this.respondWith(item.method, urlRegExp, item.response);
        }.bind(this));

        var filter = this.__P_150_3 = this.__P_150_4();

        this.addFilter(filter);
      },

      /**
       * Adds a URL filtering function to decide whether a request should be handled
       * by the FakeServer or passed to the regular XMLHttp implementation.
       * See <a href="http://sinonjs.org/docs/#filtered-requests">Sinon.JS: Filtered Requests</a>
       * for details.
       *
       * @param filter {Function} URL filter function. Will be called with the
       * following arguments: <code>method</code>, <code>url</code>, <code>async</code>,
       * <code>username</code>, <code>password</code>. Must return <code>true</code>
       * if the request should not be faked.
       */
      addFilter: function addFilter(filter) {
        this.__P_150_1.FakeXMLHttpRequest.addFilter(filter);
      },

      /**
       * Remove a filter that was added with {@link #addFilter}
       * @param filter {Function} filter function to remove
       */
      removeFilter: function removeFilter(filter) {
        qx.lang.Array.remove(this.__P_150_1.FakeXMLHttpRequest.filters, filter);
      },

      /**
       * Removes a response that was configured with {@link #configure}
       * @param method {String} HTTP method of the response
       * @param url {String|RegExp} URL of the response
       */
      removeResponse: function removeResponse(method, url) {
        qx.lang.Array.remove(this.__P_150_1.FakeXMLHttpRequest.filters, this.__P_150_3);
        var urlRegExp = url instanceof RegExp ? url : this._getRegExp(url);
        this.__P_150_0 = this.__P_150_0.filter(function (response) {
          return response[0] != method || response[1].toString() != urlRegExp.toString();
        });
        this.__P_150_2.responses = this.__P_150_2.responses.filter(function (response) {
          return response.method != method || response.url.toString() != urlRegExp.toString();
        });
        this.removeFilter(this.__P_150_3);
        this.__P_150_3 = this.__P_150_4();
        this.addFilter(this.__P_150_3);
      },

      /**
       * Defines a fake XHR response to a matching request.
       *
       * @param method {String} HTTP method to respond to, e.g. "GET"
       * @param urlRegExp {RegExp} Request URL must match match this expression
       * @param response {Function|Array|String} Response to send. See
       * <a href="http://sinonjs.org/docs/#fakeServer">Sinon.JS: Fake Server</a> for details.
       */
      respondWith: function respondWith(method, urlRegExp, response) {
        this.getFakeServer().respondWith(method, urlRegExp, response);
      },

      /**
       * Creates and configures a FakeServer if necessary and returns it.
        * @return {Object} FakeServer object
       */
      getFakeServer: function getFakeServer() {
        if (!this.__P_150_2) {
          var sinon = this.__P_150_1 = qx.dev.unit.Sinon.getSinon();
          sinon.FakeXMLHttpRequest.useFilters = true;
          this.__P_150_2 = sinon.sandbox.useFakeServer();
          this.__P_150_2.autoRespond = true;
        }

        return this.__P_150_2;
      },

      /**
       * Stops the FakeServer and removes all configured responses and/or filters.
       */
      restore: function restore() {
        this.__P_150_0 = [];
        this.removeFilter(this.__P_150_3);
        this.__P_150_3 = null;

        this.__P_150_2.restore();

        this.__P_150_2 = null;
      },

      /**
       * Returns a RegExp using the given pattern. Curly brackets and anything
       * between are replaced with wildcards (.*?)
       *
       * @param pattern {String} RegExp pattern
       * @return {RegExp} Regular Expression
       */
      _getRegExp: function _getRegExp(pattern) {
        pattern = pattern.replace(/\{[^\/]*?\}/g, ".*?");
        return new RegExp(pattern);
      },

      /**
       * Returns a filter function that ensures only requests matching configured
       * fake responses will be intercepted.
       * @return {Function} filter function
       */
      __P_150_4: function __P_150_4() {
        var responses = this.__P_150_0;
        return function (method, url, async, username, password) {
          for (var i = 0, l = responses.length; i < l; i++) {
            var filterMethod = responses[i][0];
            var regExp = responses[i][1];

            if (method == filterMethod && regExp.test(url)) {
              return false;
            }
          }

          return true;
        };
      }
    },
    destruct: function destruct() {
      this.restore();
      this.__P_150_2 = this.__P_150_1 = null;
    }
  });
  qx.dev.FakeServer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FakeServer.js.map?dt=1613908102863