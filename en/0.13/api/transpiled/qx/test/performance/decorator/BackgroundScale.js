(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.performance.decorator.AbstractDecorator": {
        "require": true
      },
      "qx.ui.decoration.Decorator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.performance.decorator.BackgroundScale", {
    extend: qx.test.performance.decorator.AbstractDecorator,
    members: {
      createDecorator: function createDecorator() {
        return new qx.ui.decoration.Decorator().set({
          backgroundImage: "decoration/selection.png",
          backgroundRepeat: "scale"
        });
      }
    }
  });
  qx.test.performance.decorator.BackgroundScale.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BackgroundScale.js.map?dt=1726089056448