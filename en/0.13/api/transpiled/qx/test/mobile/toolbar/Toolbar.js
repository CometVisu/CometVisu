(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.ui.mobile.toolbar.ToolBar": {},
      "qx.ui.mobile.toolbar.Button": {},
      "qx.bom.element.Dimension": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  qx.Class.define("qx.test.mobile.toolbar.Toolbar", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      __P_364_0: function __P_364_0() {
        var toolBar = new qx.ui.mobile.toolbar.ToolBar();
        this.getRoot().add(toolBar);
        return toolBar;
      },
      __P_364_1: function __P_364_1(toolBar, toolbarKidsNumber) {
        var childrenLength = toolBar.getContentElement().childNodes.length;
        this.assertEquals(toolbarKidsNumber, childrenLength);
      },
      testAdd: function testAdd() {
        var toolBar = this.__P_364_0();
        var button1 = new qx.ui.mobile.toolbar.Button("Button 1");
        toolBar.add(button1);
        this.__P_364_1(toolBar, 1);
        var button2 = new qx.ui.mobile.toolbar.Button("Button with long name 2");
        toolBar.add(button2);
        this.__P_364_1(toolBar, 2);
        var button3 = new qx.ui.mobile.toolbar.Button("Button 3");
        toolBar.add(button3);
        this.__P_364_1(toolBar, 3);
        this.assertEquals(qx.bom.element.Dimension.getWidth(button1.getContainerElement()), qx.bom.element.Dimension.getWidth(button2.getContainerElement()));
        this.assertEquals(qx.bom.element.Dimension.getWidth(button3.getContainerElement()), qx.bom.element.Dimension.getWidth(button2.getContainerElement()));
        button1.destroy();
        button2.destroy();
        button3.destroy();
        toolBar.destroy();
      },
      testRemove: function testRemove() {
        var toolBar = this.__P_364_0();
        var button1 = new qx.ui.mobile.toolbar.Button("Button 1");
        toolBar.add(button1);
        var button2 = new qx.ui.mobile.toolbar.Button("Button 2");
        toolBar.add(button2);
        var button3 = new qx.ui.mobile.toolbar.Button("Button 3");
        toolBar.add(button3);
        this.__P_364_1(toolBar, 3);
        toolBar.remove(button2);
        this.__P_364_1(toolBar, 2);
        toolBar.remove(button1);
        this.__P_364_1(toolBar, 1);
        toolBar.remove(button3);
        this.__P_364_1(toolBar, 0);
        button1.destroy();
        button2.destroy();
        button3.destroy();
        toolBar.destroy();
      }
    }
  });
  qx.test.mobile.toolbar.Toolbar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Toolbar.js.map?dt=1735341779714