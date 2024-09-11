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
      "qx.bom.element.Class": {}
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

  qx.Class.define("qx.test.bom.Class", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this._el = document.createElement("div");
        document.body.appendChild(this._el);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this._el);
      },
      testAddClass: function testAddClass() {
        var result = qx.bom.element.Class.add(this._el, "vanillebaer");
        this.assertEquals("vanillebaer", this._el.className);
        this.assertEquals("vanillebaer", result);
      },
      testAddClasses: function testAddClasses() {
        qx.bom.element.Class.addClasses(this._el, ["vanillebaer", "schokobaer"]);
        this.assertTrue(qx.bom.element.Class.has(this._el, "vanillebaer"));
        this.assertTrue(qx.bom.element.Class.has(this._el, "schokobaer"));
      },
      testHasClass: function testHasClass() {
        this._el.className = "vanillebaer";
        this.assertTrue(qx.bom.element.Class.has(this._el, "vanillebaer"));
        this.assertFalse(qx.bom.element.Class.has(this._el, "schokobaer"));
      },
      testRemoveClass: function testRemoveClass() {
        this._el.className = "vanillebaer";
        var result = qx.bom.element.Class.remove(this._el, "vanillebaer");
        this.assertEquals("", qx.bom.element.Class.get(this._el));
        this.assertEquals("vanillebaer", result);
      },
      testRemoveClasses: function testRemoveClasses() {
        this._el.className = "vanillebaer schokobaer karamellbaer";
        qx.bom.element.Class.removeClasses(this._el, ["vanillebaer", "schokobaer"]);
        this.assertFalse(qx.bom.element.Class.has(this._el, "vanillebaer"));
        this.assertFalse(qx.bom.element.Class.has(this._el, "schokobaer"));
        this.assertTrue(qx.bom.element.Class.has(this._el, "karamellbaer"));
      },
      testToggleClass: function testToggleClass() {
        this._el.className = "vanillebaer";
        qx.bom.element.Class.toggle(this._el, "vanillebaer");
        this.assertFalse(qx.bom.element.Class.has(this._el, "vanillebaer"));
        qx.bom.element.Class.toggle(this._el, "vanillebaer");
        this.assertTrue(qx.bom.element.Class.has(this._el, "vanillebaer"));
      },
      testReplaceClass: function testReplaceClass() {
        this._el.className = "vanillebaer";
        qx.bom.element.Class.replace(this._el, "vanillebaer", "schokobaer");
        this.assertTrue(qx.bom.element.Class.has(this._el, "schokobaer"));
        this.assertFalse(qx.bom.element.Class.has(this._el, "vanillebaer"));
      }
    }
  });
  qx.test.bom.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1726089050425