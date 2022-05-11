(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
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
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.ChildControl", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, parentClass) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, parentClass, meta.controlName);
    },
    members: {
      getDefaultValue: function getDefaultValue() {
        return "";
      }
    }
  });
  qxl.apiviewer.dao.ChildControl.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ChildControl.js.map?dt=1652287886847