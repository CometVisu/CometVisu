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
      "qx.bom.Element": {},
      "qx.event.Registration": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Element", {
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
      testAddListener: function testAddListener() {
        var listener = function listener() {};
        qx.bom.Element.addListener(this._el, "click", listener, this, false);
        this.assertTrue(qx.bom.Element.hasListener(this._el, "click", false));
        qx.bom.Element.removeListener(this._el, "click", listener, this, false);
        this.assertFalse(qx.bom.Element.hasListener(this._el, "click", false));
      },
      testRemoveListenerById: function testRemoveListenerById() {
        var id = qx.bom.Element.addListener(this._el, "click", function () {}, this, false);
        this.assertTrue(qx.bom.Element.hasListener(this._el, "click", false));
        qx.bom.Element.removeListenerById(this._el, id);
        this.assertFalse(qx.bom.Element.hasListener(this._el, "click", false));
      },
      testFocus: function testFocus() {
        qx.event.Registration.addListener(this._el, "focus", function () {
          this.resume(function () {
            this.info("Element focused.");
          }, this);
        }, this);
        var self = this;
        window.setTimeout(function () {
          qx.bom.Element.focus(self._el);
        }, 100);
        this.wait();
      },
      testBlur: function testBlur() {
        qx.event.Registration.addListener(this._el, "blur", function () {
          this.resume(function () {
            this.info("Element blurred.");
          }, this);
        }, this);
        var self = this;
        window.setTimeout(function () {
          qx.bom.Element.focus(self._el);
          qx.bom.Element.blur(self._el);
        }, 100);
        this.wait();
      },
      testActivate: function testActivate() {
        qx.bom.Element.activate(this._el);
        this.warn("needs better test!");
      },
      testDeactivate: function testDeactivate() {
        qx.bom.Element.deactivate(this._el);
        this.warn("needs better test!");
      },
      testCapture: function testCapture() {
        qx.bom.Element.capture(this._el);
        this.warn("needs better test!");
      },
      testReleaseCapture: function testReleaseCapture() {
        qx.bom.Element.releaseCapture(this._el);
        this.warn("needs better test!");
      },
      testClone: function testClone() {
        var clone = qx.bom.Element.clone(this._el);
        this.assertElement(clone, "Cloning of the element failed!");
        this.assertEquals(clone.id, "el", "Cloning of the element failed! Attribute 'id' was not cloned.");
        this.assertEquals(clone.nodeName.toLowerCase(), "div", "Cloning of the element failed! Different node name.");
      }
    }
  });
  qx.test.bom.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1735222425387