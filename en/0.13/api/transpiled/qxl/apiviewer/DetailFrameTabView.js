(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.TabView": {
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
  qx.Class.define("qxl.apiviewer.DetailFrameTabView", {
    extend: qx.ui.tabview.TabView,

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      add: function add(page) {
        qxl.apiviewer.DetailFrameTabView.prototype.add.base.call(this, page);

        if (this.getChildren().length == 1) {
          this.getChildren()[0].setShowCloseButton(false);
        } else {
          for (var i = 0, l = this.getChildren().length; i < l; i++) {
            this.getChildren()[i].setShowCloseButton(true);
          }
        }
      },
      remove: function remove(page) {
        if (this.getChildren().length > 1) {
          qxl.apiviewer.DetailFrameTabView.prototype.remove.base.call(this, page);

          if (this.getChildren().length == 1) {
            this.getChildren()[0].setShowCloseButton(false);
          }
        }
      }
    }
  });
  qxl.apiviewer.DetailFrameTabView.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DetailFrameTabView.js.map?dt=1643473498651