(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "require": true
      },
      "qxl.apiviewer.dao.Package": {}
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
  qx.Class.define("qxl.apiviewer.ui.panels.PackagePanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Package;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getPackages();
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getFullName(), null, false, true);
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return node.getFullName();
      },
      getItemTextHtml: function getItemTextHtml(node, getDocNode, showDetails) {
        if (showDetails) {
          return qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(node.getDescription(), node);
        }

        return qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getPackage(), showDetails);
      },
      getItemTooltip: function getItemTooltip(classNode, currentClassDocNode) {
        return "Package";
      },
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
      },

      /**
       * Updates an info panel.
       *
       * @param classViewer {qxl.apiviewer.ui.ClassViewer} parent class viewer widget.
       * @param currentClassDocNode {qxl.apiviewer.dao.Class} the currently displayed class
       */
      update: function update(classViewer, currentClassDocNode) {
        var _this = this;

        if (!this.getElement()) {
          return;
        }

        return this.setDocNodeAsync(currentClassDocNode).then(function () {
          var nodeArr = currentClassDocNode.getPackages();

          if (nodeArr && nodeArr.length > 0) {
            classViewer.sortItems(nodeArr);
          }

          _this._displayNodes(nodeArr, currentClassDocNode);
        });
      }
    }
  });
  qxl.apiviewer.ui.panels.PackagePanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PackagePanel.js.map?dt=1589400527652