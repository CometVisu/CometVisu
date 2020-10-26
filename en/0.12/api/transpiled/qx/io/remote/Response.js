(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
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
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * This class is used to work with the result of a HTTP request.
   */
  qx.Class.define("qx.io.remote.Response", {
    extend: qx.event.type.Event,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** State of the response. */
      state: {
        check: "Integer",
        nullable: true
      },

      /** Status code of the response. */
      statusCode: {
        check: "Integer",
        nullable: true
      },

      /** Content of the response. */
      content: {
        nullable: true
      },

      /** The headers of the response. */
      responseHeaders: {
        check: "Object",
        nullable: true,
        apply: "_applyResponseHeaders"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_215_0: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */
      // overridden
      clone: function clone(embryo) {
        var clone = qx.io.remote.Response.prototype.clone.base.call(this, embryo);
        clone.setType(this.getType());
        clone.setState(this.getState());
        clone.setStatusCode(this.getStatusCode());
        clone.setContent(this.getContent());
        clone.setResponseHeaders(this.getResponseHeaders());
        return clone;
      },

      /**
       * Returns a specific response header
       * @param vHeader {String} Response header name
       * @return {Object | null} The header value or null;
       */
      getResponseHeader: function getResponseHeader(vHeader) {
        if (this.__P_215_0) {
          return this.__P_215_0[vHeader.toLowerCase()] || null;
        }

        return null;
      },

      /**
       * Keep lower-cased shadow of response headers for later
       * case-insensitive matching.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyResponseHeaders: function _applyResponseHeaders(value, old) {
        var lowerHeaders = {};

        if (value !== null) {
          Object.keys(value).forEach(function (key) {
            lowerHeaders[key.toLowerCase()] = value[key];
          });
          this.__P_215_0 = lowerHeaders;
        }
      }
    }
  });
  qx.io.remote.Response.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Response.js.map?dt=1603737130928