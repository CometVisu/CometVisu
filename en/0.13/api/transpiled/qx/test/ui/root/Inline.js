(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dom.Element": {},
      "qx.bom.element.Style": {},
      "qx.ui.root.Inline": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.root.Inline", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__P_427_0 = qx.dom.Element.create("div");
        var inlineStyle = "position:absolute;top:50px;left:50px;width:200px;height:200px";
        qx.bom.element.Style.setCss(this.__P_427_0, inlineStyle);
        qx.dom.Element.insertBegin(this.__P_427_0, document.body);
      },
      tearDown: function tearDown() {
        qx.dom.Element.remove(this.__P_427_0);
      },
      testAppearEvent: function testAppearEvent() {
        var _this = this;
        var inlineRoot = new qx.ui.root.Inline(this.__P_427_0);
        inlineRoot.addListener("appear", function (e) {
          _this.resume(function () {
            this.assertTrue(qx.dom.Element.isInDom(inlineRoot.getContentElement().getDomElement()));
          }, _this);
        });
        this.wait();
      }
    }
  });
  qx.test.ui.root.Inline.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Inline.js.map?dt=1722153832835