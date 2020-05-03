(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.AbstractMethodPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Method": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ConstructorPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Constructor", "qxl/apiviewer/image/constructor18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && dao.getName() == "construct";
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getConstructor();
      }
    }
  });
  qxl.apiviewer.ui.panels.ConstructorPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConstructorPanel.js.map?dt=1588501559761