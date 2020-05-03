(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Location.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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
      getHref: function getHref() {
        return window.location.href;
      },

      /**
       * Changes <code>window.location.href</code> to trigger a redirect
       *
       * @param loc {String} - URI of the location the browser should be redirected to
       */
      setHref: function setHref(loc) {
        window.location.href = loc;
      },

      /**
       * Wrapper for calling <code>window.location.reload()</code>
       *
       * @param value {Boolean} parameter to call reload with
       */
      reload: function reload(value) {
        window.location.reload(value);
      },

      /**
       * Wrapper for calling <code>window.open()</code>
       *
       * @param url {String} url to open
       * @param target {String} where to open the window
       */
      open: function open(url, target) {
        window.open(url, target);
      }
    }
  });
  cv.util.Location.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Location.js.map?dt=1588501553852