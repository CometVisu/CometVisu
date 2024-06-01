(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.lang.Array": {}
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

  qx.Class.define("qx.test.ui.virtual.layer.LayerMock", {
    extend: qx.ui.virtual.layer.Abstract,
    construct: function construct() {
      qx.ui.virtual.layer.Abstract.constructor.call(this);
      this.calls = [];
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      updateLayerData: function updateLayerData() {
        this.calls.push(["updateLayerData", qx.lang.Array.fromArguments(arguments)]);
        qx.test.ui.virtual.layer.LayerMock.superclass.prototype.updateLayerData.call(this);
      },
      _updateLayerData: function _updateLayerData() {
        this.calls.push(["_updateLayerData", qx.lang.Array.fromArguments(arguments)]);
      },
      fullUpdate: function fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        this.calls.push(["fullUpdate", qx.lang.Array.fromArguments(arguments)]);
        qx.test.ui.virtual.layer.LayerMock.superclass.prototype.fullUpdate.call(this, firstRow, firstColumn, rowSizes, columnSizes);
      },
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        this.calls.push(["_fullUpdate", qx.lang.Array.fromArguments(arguments)]);
      },
      updateLayerWindow: function updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        this.calls.push(["updateLayerWindow", qx.lang.Array.fromArguments(arguments)]);
        qx.test.ui.virtual.layer.LayerMock.superclass.prototype.updateLayerWindow.call(this, firstRow, firstColumn, rowSizes, columnSizes);
      },
      _updateLayerWindow: function _updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        this.calls.push(["_updateLayerWindow", qx.lang.Array.fromArguments(arguments)]);
      }
    }
  });
  qx.test.ui.virtual.layer.LayerMock.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LayerMock.js.map?dt=1717235396417