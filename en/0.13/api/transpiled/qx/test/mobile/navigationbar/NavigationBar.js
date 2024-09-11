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
      "qx.ui.mobile.navigationbar.NavigationBar": {},
      "qx.ui.mobile.navigationbar.BackButton": {},
      "qx.ui.mobile.navigationbar.Title": {},
      "qx.ui.mobile.navigationbar.Button": {}
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

  qx.Class.define("qx.test.mobile.navigationbar.NavigationBar", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testCreate: function testCreate() {
        var bar = new qx.ui.mobile.navigationbar.NavigationBar();
        this.getRoot().add(bar);
        var back = new qx.ui.mobile.navigationbar.BackButton("Back");
        bar.add(back);
        var title = new qx.ui.mobile.navigationbar.Title("Title");
        bar.add(title);
        var button = new qx.ui.mobile.navigationbar.Button("Action");
        bar.add(button);
        this.assertEquals(3, bar.getChildren().length);
        back.destroy();
        title.destroy();
        button.destroy();
        bar.destroy();
      }
    }
  });
  qx.test.mobile.navigationbar.NavigationBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NavigationBar.js.map?dt=1726089056211