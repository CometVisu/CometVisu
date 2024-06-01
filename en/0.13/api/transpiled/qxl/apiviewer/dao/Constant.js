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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qxl.apiviewer.dao.Constant", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      this._value = meta.value;
    },
    members: {
      _value: undefined,
      getValue: function getValue() {
        return this._value;
      }
    }
  });
  qxl.apiviewer.dao.Constant.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Constant.js.map?dt=1717235425672