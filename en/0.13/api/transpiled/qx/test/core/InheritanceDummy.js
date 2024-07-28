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
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.core.InheritanceDummy", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.children = [];
    },
    properties: {
      enabled: {
        inheritable: true
      },
      width_: {
        inheritable: true,
        themeable: true
      },
      height_: {
        inheritable: true,
        themeable: true
      },
      left_: {
        inheritable: true,
        themeable: true
      },
      top_: {
        inheritable: true,
        themeable: true
      }
    },
    members: {
      add: function add(child) {
        this.children.push(child);
        child.parent = this;
        child.$$refreshInheritables();
      },
      _getChildren: function _getChildren() {
        return this.children;
      },
      getLayoutParent: function getLayoutParent() {
        return this.parent;
      }
    }
  });
  qx.test.core.InheritanceDummy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=InheritanceDummy.js.map?dt=1722151830338