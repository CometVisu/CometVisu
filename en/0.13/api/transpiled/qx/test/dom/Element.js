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
      "qx.bom.element.Attribute": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*******************************************************************************
   *
   * qooxdoo - the new era of web development
   *
   * http://qooxdoo.org
   *
   * Copyright: 2007-2012 1&1 Internet AG, Germany, http://www.1und1.de
   *
   * License:
   *    MIT: https://opensource.org/licenses/MIT
   *    See the LICENSE file in the project's top-level directory for details.
   *
   * Authors: Fabian Jakobs (fjakobs)
   *
   ******************************************************************************/

  qx.Class.define("qx.test.dom.Element", {
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
      testCreate: function testCreate() {
        var el = qx.dom.Element.create("div", {
          name: "juhu"
        }, window);
        this.assertElement(el);
        this.assertEquals("juhu", qx.bom.element.Attribute.get(el, "name"));
      },
      testEmpty: function testEmpty() {
        this._el.innerHTML = "Juhu";
        qx.dom.Element.empty(this._el);
        this.assertEquals("", this._el.innerHTML);
      }
    }
  });
  qx.test.dom.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1731948115457