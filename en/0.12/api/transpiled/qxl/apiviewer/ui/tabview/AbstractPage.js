(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.Page": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qxl.apiviewer.TreeUtil": {},
      "qx.event.Timer": {},
      "qxl.apiviewer.UiModel": {}
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
       * Christian Hagendorn (chris_schmidt)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.tabview.AbstractPage", {
    extend: qx.ui.tabview.Page,
    type: "abstract",
    construct: function construct() {
      qx.ui.tabview.Page.constructor.call(this);
      this.setLayout(new qx.ui.layout.Canvas());
      this.setShowCloseButton(true);
      this._bindings = [];
      this._viewer = this._createViewer(); // while using edge 0, we need to set the padding to 0 as well [BUG #4688]

      this.add(this._viewer, {
        edge: 0
      });
      this.setPadding(0);

      this.__P_540_0(this._viewer);
    },
    properties: {
      classNode: {
        apply: "_applyClassNode",
        async: true
      }
    },
    members: {
      _viewer: null,
      _bindings: null,
      _createViewer: function _createViewer() {
        throw new Error("Abstract method call!");
      },
      _applyClassNode: function _applyClassNode(value, old) {
        var _this = this;

        return this._viewer.setDocNodeAsync(value).then(function () {
          _this.setLabel(value.getFullName());

          _this.setIcon(qxl.apiviewer.TreeUtil.getIconUrl(value));

          _this.setUserData("nodeName", value.getFullName());

          qx.event.Timer.once(function (e) {
            this._viewer.getContentElement().scrollToY(0);
          }, _this, 0);
        });
      },
      __P_540_0: function __P_540_0(viewer) {
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        var bindings = this._bindings;
        bindings.push(uiModel.bind("showInherited", viewer, "showInherited"));
        bindings.push(uiModel.bind("showIncluded", viewer, "showIncluded"));
        bindings.push(uiModel.bind("expandProperties", viewer, "expandProperties"));
        bindings.push(uiModel.bind("showProtected", viewer, "showProtected"));
        bindings.push(uiModel.bind("showPrivate", viewer, "showPrivate"));
        bindings.push(uiModel.bind("showInternal", viewer, "showInternal"));
      },
      __P_540_1: function __P_540_1() {
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        var bindings = this._bindings;

        while (bindings.length > 0) {
          var id = bindings.pop();
          uiModel.removeBinding(id);
        }
      }
    },
    destruct: function destruct() {
      this.__P_540_1();

      this._viewer.destroy();

      this._viewer = null;
    }
  });
  qxl.apiviewer.ui.tabview.AbstractPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractPage.js.map?dt=1645980685691