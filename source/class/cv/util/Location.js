/**
 * Helper function to proxy access to <code>window.location.*</code> functions.
 * The main purpose of proxying them is to allow them to be spyable in unit tests.
 */
qx.Class.define('cv.util.Location', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Wrapper for getting the <code>window.location.href</code> value.
     *
     * @return {String} URI of the page the browser is currently showing
     */
    getHref: function() {
      return window.location.href;
    },

    /**
     * Changes <code>window.location.href</code> to trigger a redirect
     *
     * @param loc {String} - URI of the location the browser should be redirected to
     */
    setHref: function(loc) {
      window.location.href = loc;
    },

    /**
     * Wrapper for calling <code>window.location.reload()</code>
     *
     * @param value {Boolean} parameter to call reload with
     */
    reload: function(value) {
      window.location.reload(value);
    }
  }

});