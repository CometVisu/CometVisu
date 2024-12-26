(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.selection.AbstractSingleSelectonTest": {
        "require": true
      },
      "qx.ui.container.Stack": {},
      "qx.ui.tabview.Page": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.selection.Stack", {
    extend: qx.test.ui.selection.AbstractSingleSelectonTest,
    members: {
      __P_430_0: null,
      setUp: function setUp() {
        var length = 10;
        this._notInSelection = [];
        this._mode = "";
        var colors = [{
          background: "blue",
          textColor: "white"
        }, {
          background: "red",
          textColor: "black"
        }, {
          background: "green",
          textColor: "black"
        }, {
          background: "yellow",
          textColor: "black"
        }, {
          background: "brown",
          textColor: "white"
        }, {
          background: "aqua",
          textColor: "black"
        }, {
          background: "fuchsia",
          textColor: "black"
        }, {
          background: "silver",
          textColor: "white"
        }, {
          background: "black",
          textColor: "white"
        }, {
          background: "white",
          textColor: "black"
        }];
        this._widget = new qx.ui.container.Stack();
        this.getRoot().add(this._widget);
        for (var i = 0; i < length; i++) {
          var item = this.__P_430_1("Page" + i, colors[i]);
          this._widget.add(item);
          if (i == 5) {
            this._widget.setSelection([item]);
            this._selection = [item];
          } else {
            this._notInSelection.push(item);
          }
        }
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.selection.Stack.superclass.prototype.tearDown.call(this);
        this._widget.destroy();
        this._widget = null;
        this._selection = null;
        this._notInSelection = null;
        this.flush();
      },
      _getChildren: function _getChildren() {
        if (this._widget != null) {
          return this._widget.getChildren();
        } else {
          return [];
        }
      },
      _createTestElement: function _createTestElement(name) {
        return new qx.ui.tabview.Page(name);
      },
      __P_430_1: function __P_430_1(name, colors) {
        var item = new qx.ui.basic.Label(name).set({
          width: 300,
          height: 300,
          allowShrinkX: false,
          allowShrinkY: false,
          backgroundColor: colors.background,
          textColor: colors.textColor,
          padding: 10
        });
        return item;
      }
    }
  });
  qx.test.ui.selection.Stack.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Stack.js.map?dt=1735222432419