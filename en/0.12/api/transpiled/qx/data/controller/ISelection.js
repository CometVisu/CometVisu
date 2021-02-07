(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
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
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Interface for data binding classes offering a selection.
   */
  qx.Interface.define("qx.data.controller.ISelection", {
    members: {
      /**
       * Setter for the selection.
       * @param value {qx.data.IListData} The data of the selection.
       */
      setSelection: function setSelection(value) {},

      /**
       * Getter for the selection list.
       * @return {qx.data.IListData} The current selection.
       */
      getSelection: function getSelection() {},

      /**
       * Resets the selection to its default value.
       */
      resetSelection: function resetSelection() {}
    }
  });
  qx.data.controller.ISelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ISelection.js.map?dt=1612698468079