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
      "qx.dom.Hierarchy": {},
      "qx.bom.Iframe": {},
      "qx.util.ResourceManager": {},
      "qx.util.Uri": {},
      "qx.event.Registration": {}
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

  qx.Class.define("qx.test.dom.Hierarchy", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__P_343_0 = qx.dom.Element.create("div");
        document.body.appendChild(this.__P_343_0);
        this.__P_343_1 = qx.dom.Element.create("div");
        this.__P_343_2 = qx.dom.Element.create("div");
        document.body.appendChild(this.__P_343_2);
        qx.bom.element.Style.set(this.__P_343_2, "display", "none");
        this.__P_343_3 = qx.dom.Element.create("div");
        this.__P_343_2.appendChild(this.__P_343_3);
      },
      tearDown: function tearDown() {
        if (this.__P_343_4) {
          this.__P_343_0.removeChild(this.__P_343_4);
          this.__P_343_4 = null;
        }
        if (this.__P_343_5) {
          document.body.removeChild(this.__P_343_5);
          this.__P_343_5 = null;
        }
        document.body.removeChild(this.__P_343_0);
        this.__P_343_0 = null;
        this.__P_343_1 = null;
        document.body.removeChild(this.__P_343_2);
        this.__P_343_2 = null;
        if (this.__P_343_6) {
          document.body.removeChild(this.__P_343_6);
          this.__P_343_6 = null;
        }
      },
      testIsRendered: function testIsRendered() {
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__P_343_0));
        this.assertFalse(qx.dom.Hierarchy.isRendered(this.__P_343_1));
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__P_343_2));
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__P_343_3));
      },
      testIsRenderedIframe: function testIsRenderedIframe() {
        this.__P_343_6 = qx.bom.Iframe.create();
        var src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        src = qx.util.Uri.getAbsolute(src);
        qx.bom.Iframe.setSource(this.__P_343_6, src);
        document.body.appendChild(this.__P_343_6);
        qx.event.Registration.addListener(this.__P_343_6, "load", function (e) {
          this.resume(function () {
            this.assertTrue(qx.dom.Hierarchy.isRendered(this.__P_343_6));
          }, this);
        }, this);
        this.wait(10000);
      },
      testContains: function testContains() {
        this.assertTrue(qx.dom.Hierarchy.contains(document.body, this.__P_343_0));
        this.__P_343_4 = qx.dom.Element.create("div");
        this.__P_343_0.appendChild(this.__P_343_4);
        this.assertTrue(qx.dom.Hierarchy.contains(this.__P_343_0, this.__P_343_4));
        this.assertFalse(qx.dom.Hierarchy.contains(this.__P_343_4, this.__P_343_0));
        this.__P_343_5 = qx.dom.Element.create("div");
        document.body.appendChild(this.__P_343_5);
        this.assertFalse(qx.dom.Hierarchy.contains(this.__P_343_0, this.__P_343_5));
      },
      testGetCommonParent: function testGetCommonParent() {
        this.__P_343_5 = qx.dom.Element.create("div");
        document.body.appendChild(this.__P_343_5);
        this.assertEquals(document.body, qx.dom.Hierarchy.getCommonParent(this.__P_343_0, this.__P_343_5));
        this.__P_343_4 = qx.dom.Element.create("div");
        this.__P_343_0.appendChild(this.__P_343_4);
        this.assertEquals(this.__P_343_0, qx.dom.Hierarchy.getCommonParent(this.__P_343_0, this.__P_343_4));
      }
    }
  });
  qx.test.dom.Hierarchy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Hierarchy.js.map?dt=1735383860765