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
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.data.singlevalue.TextFieldDummy", {
    extend: qx.core.Object,
    construct: function construct(value) {
      qx.core.Object.constructor.call(this);
      if (value != null) {
        this.setValue(value);
      }
    },
    properties: {
      appearance: {
        check: "String",
        event: "changeAppearance",
        init: ""
      },
      enabled: {
        check: "Boolean",
        event: "changeEnabled",
        init: true
      },
      zIndex: {
        check: "Integer",
        event: "changeZIndex",
        nullable: true
      },
      floatt: {
        event: "changeFloatt"
      },
      value: {
        check: "String",
        event: "changeValue",
        nullable: true
      },
      backgroundColor: {
        check: "String",
        event: "changeBackgroundColor",
        init: ""
      }
    }
  });
  qx.test.data.singlevalue.TextFieldDummy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextFieldDummy.js.map?dt=1722153826455