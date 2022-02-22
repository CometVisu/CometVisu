(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.ChildControl": {},
      "qx.util.StringBuilder": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Daniel Wagner (d_wagner)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ChildControlsPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Child Controls", "qxl/apiviewer/image/childcontrol18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.ChildControl;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getChildControls();
      },
      getItemTypeHtml: function getItemTypeHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var", true);
      },
      getItemTitleHtml: function getItemTitleHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        var textHtml = new qx.util.StringBuilder(node.getDescription());

        if (showDetails) {
          textHtml.add("<div class=\"item-detail-headline\">", "Default value:", "</div>", "<div class=\"item-detail-text\">", "<code>", node.getDefaultValue() ? node.getDefaultValue() : "null", "</code>", "</div>");
        }

        return textHtml.get();
      }
    }
  });
  qxl.apiviewer.ui.panels.ChildControlsPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ChildControlsPanel.js.map?dt=1645562017623