(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.Abstract": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Function "renderer" for Progressive.
   * This is a renderer that simply calls the function provided by the data
   * element.
   */
  qx.Class.define("qx.ui.progressive.renderer.FunctionCaller", {
    extend: qx.ui.progressive.renderer.Abstract,
    members: {
      // overridden
      render: function render(state, element) {
        element.data(state.getUserData());
      }
    }
  });
  qx.ui.progressive.renderer.FunctionCaller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FunctionCaller.js.map?dt=1717235415095