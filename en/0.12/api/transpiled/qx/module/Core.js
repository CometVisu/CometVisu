(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Attribute": {
        "require": true
      },
      "qx.module.Css": {
        "require": true
      },
      "qx.module.Environment": {
        "require": true
      },
      "qx.module.Event": {
        "require": true
      },
      "qx.module.Manipulating": {
        "require": true
      },
      "qx.module.Polyfill": {
        "require": true
      },
      "qx.module.Traversing": {
        "require": true
      },
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
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Placeholder class which simply defines and includes the core of qxWeb.
   * The core modules are:
   *
   * * {@link qx.module.Attribute}
   * * {@link qx.module.Css}
   * * {@link qx.module.Environment}
   * * {@link qx.module.Event}
   * * {@link qx.module.Manipulating}
   * * {@link qx.module.Polyfill}
   * * {@link qx.module.Traversing}
   *
   * @require(qx.module.Attribute)
   * @require(qx.module.Css)
   * @require(qx.module.Environment)
   * @require(qx.module.Event)
   * @require(qx.module.Manipulating)
   * @require(qx.module.Polyfill)
   * @require(qx.module.Traversing)
   */
  qx.Bootstrap.define("qx.module.Core", {});
  qx.module.Core.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Core.js.map?dt=1660930414494