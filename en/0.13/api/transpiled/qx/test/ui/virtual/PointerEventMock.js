(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Pointer": {
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

  qx.Class.define("qx.test.ui.virtual.PointerEventMock", {
    extend: qx.event.type.Pointer,
    construct: function construct(type, config) {
      qx.event.type.Pointer.constructor.call(this);
      this.setType(type);
      this.__P_441_0 = config;
    },
    members: {
      clone: function clone() {
        return this;
      },
      getDocumentLeft: function getDocumentLeft() {
        return this.__P_441_0.documentLeft || 0;
      },
      getDocumentTop: function getDocumentTop() {
        return this.__P_441_0.documentTop || 0;
      }
    },
    destruct: function destruct() {
      this.__P_441_0 = null;
    }
  });
  qx.test.ui.virtual.PointerEventMock.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PointerEventMock.js.map?dt=1735222433243