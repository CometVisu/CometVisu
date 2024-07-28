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
      "qx.bom.element.Dataset": {}
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
       * Gabriel Munteanu (gabios)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Dataset", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        var div = document.createElement("div");
        div.id = "el";
        this._el = div;
        document.body.appendChild(div);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this._el);
      },
      testSetAttribute: function testSetAttribute() {
        var Dataset = qx.bom.element.Dataset;
        Dataset.set(this._el, "maxAge", "100");
        this.assertEquals("100", Dataset.get(this._el, "maxAge"));
        this.assertEquals("100", this._el.getAttribute("data-max-age"));
      },
      testSetAttributeWithUndefinedValue: function testSetAttributeWithUndefinedValue() {
        var Dataset = qx.bom.element.Dataset;
        Dataset.set(this._el, "age", undefined);
        this.assertNull(this._el.getAttribute("data-age"));
        this.assertUndefined(Dataset.get(this._el, "age", undefined));
        Dataset.set(this._el, "age2", null);
        this.assertNull(this._el.getAttribute("data-age2"));
        this.assertUndefined(Dataset.get(this._el, "age2", null));
      },
      testGetAttribute: function testGetAttribute() {
        var Dataset = qx.bom.element.Dataset;
        this.assertUndefined(Dataset.get(this._el, "salary"));
        this._el.setAttribute("data-salary", "20");
        this.assertEquals("20", Dataset.get(this._el, "salary"));
      },
      testRemoveAttribute: function testRemoveAttribute() {
        var Dataset = qx.bom.element.Dataset;
        Dataset.set(this._el, "age", "44");
        Dataset.remove(this._el, "age");
        this.assertNull(this._el.getAttribute("age"));
        this.assertUndefined(Dataset.get(this._el, "age"));
      }
    }
  });
  qx.test.bom.Dataset.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dataset.js.map?dt=1722151828982