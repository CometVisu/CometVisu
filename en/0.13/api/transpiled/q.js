(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qxWeb": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Compatibility class for {@link qxWeb}.
   */
  qx.Bootstrap.define("q", {
    extend: qxWeb
  });

  // make sure it's the same
  // eslint-disable-next-line no-implicit-globals
  q = qxWeb;
  q.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=q.js.map?dt=1726089089448