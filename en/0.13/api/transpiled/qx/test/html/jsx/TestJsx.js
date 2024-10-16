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
      "qx.html.Element": {
        "construct": true
      },
      "qx.html.Text": {},
      "qx.html.JsxRef": {},
      "qx.data.Array": {},
      "qx.html.Slot": {},
      "qx.html.Jsx": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019-2021 Zenesis Ltd, https://zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Will Johnson (WillsterJohnson)
  
  ************************************************************************ */

  qx.Class.define("qx.test.html.jsx.TestJsx", {
    extend: qx.dev.unit.TestCase,
    members: {
      testBasics: function testBasics() {
        var html = qx.html.Jsx.createElement("div", {
          id: "el1"
        }, "Hello", qx.html.Jsx.createElement("div", {
          id: "el2",
          class: "hello",
          style: "border: 1px solid"
        }), " World");
        this.assertEquals(true, html instanceof qx.html.Element);
        this.assertEquals(3, html.getChildren().length);
        var el2 = html.getChildren()[1];
        this.assertEquals(true, html.getChildren()[0] instanceof qx.html.Text);
        this.assertEquals(true, el2 instanceof qx.html.Element);
        this.assertEquals(true, html.getChildren()[2] instanceof qx.html.Text);
        this.assertEquals("el1", html.getAttribute("id"));
        this.assertEquals("el2", el2.getAttribute("id"));
        this.assertEquals("1px solid", el2.getStyle("border"));
      },
      testRefs: function testRefs() {
        var myRef = new qx.html.JsxRef();
        var html = qx.html.Jsx.createElement("div", null, qx.html.Jsx.createElement("div", {
          ref: myRef
        }));
        this.assertTrue(html.getChildren()[0] === myRef.getValue());
      },
      testCustomElements: function testCustomElements() {
        var CustomElem = function CustomElem(_ref) {
          var who = _ref.who;
          return qx.html.Jsx.createElement("p", null, "Hello, ", who);
        };
        var myCustomElem = qx.html.Jsx.createElement(CustomElem, {
          who: "world"
        });
        this.assertTrue(myCustomElem instanceof qx.html.Element);
        this.assertEquals("p", myCustomElem.getNodeName());
      },
      testClassElements: function testClassElements() {
        var Cls = qx.Class.define(null, {
          extend: qx.html.Element,
          construct: function construct(_ref2) {
            var attr1 = _ref2.attr1;
            qx.html.Element.constructor.call(this);
            this.add(qx.html.Jsx.createElement("p", {
              attr1: attr1
            }));
          }
        });
        var myCls = qx.html.Jsx.createElement(Cls, {
          attr1: "val1"
        });
        var p = myCls.getChildren()[0];
        this.assertTrue(myCls instanceof qx.html.Element);
        this.assertEquals("div", myCls.getNodeName());
        this.assertEquals("p", p.getNodeName());
        this.assertEquals("val1", p.getAttribute("attr1"));
      },
      testSpreadAttrs: function testSpreadAttrs() {
        var attrs = {
          attr1: "val1"
        };
        var myElem = qx.html.Jsx.createElement("div", attrs);
        this.assertTrue(myElem instanceof qx.html.Element);
        this.assertEquals("val1", myElem.getAttribute("attr1"));
      },
      testAnonFragments: function testAnonFragments() {
        var myElem = qx.html.Jsx.createElement(qx.html.Jsx.FRAGMENT, null, qx.html.Jsx.createElement("div", null), qx.html.Jsx.createElement("div", null));
        this.assertTrue(myElem instanceof qx.data.Array);
        this.assertEquals(2, myElem.length);
        var plainArray = myElem.toArray();
        this.assertTrue(plainArray[0] instanceof qx.html.Element);
        this.assertTrue(plainArray[1] instanceof qx.html.Element);
      },
      testComments: function testComments() {
        var hasComment = qx.html.Jsx.createElement(qx.html.Jsx.FRAGMENT, null, qx.html.Jsx.createElement("div", null));

        // it didn't throw, so we're good
        this.assertTrue(true);
      },
      testSlots: function testSlots() {
        var CustomElem = function CustomElem() {
          return qx.html.Jsx.createElement("div", null, qx.html.Jsx.createElement("slot", {
            name: "named"
          }), qx.html.Jsx.createElement("slot", null));
        };
        var usage = qx.html.Jsx.createElement(CustomElem, null, qx.html.Jsx.createElement("p", null), qx.html.Jsx.createElement("div", {
          slot: "named"
        }));
        var slotNamed = usage.getSlots().get("named");
        var div = slotNamed.getChildren()[0];
        var slotDefault = usage.getSlots().get(qx.html.Slot.DEFAULT);
        var p = slotDefault.getChildren()[0];
        this.assertTrue(usage instanceof qx.html.Element);
        this.assertEquals(2, usage.getChildren().length);
        this.assertEquals("div", div.getNodeName());
        this.assertEquals("p", p.getNodeName());
      },
      testSlotFallbackContent: function testSlotFallbackContent() {
        var CustomElem = function CustomElem() {
          return qx.html.Jsx.createElement("div", null, qx.html.Jsx.createElement("slot", null, qx.html.Jsx.createElement("p", null, "fallback")));
        };
        var usage = qx.html.Jsx.createElement(CustomElem, null);
        var slot = usage.getSlots().get(qx.html.Slot.DEFAULT);
        var p = slot.getDefaultChildren()[0];
        this.assertTrue(usage instanceof qx.html.Element);
        this.assertEquals(1, usage.getChildren().length);
        this.assertEquals("p", p.getNodeName());
        this.assertEquals("fallback", p.getText());
      },
      testCssCustomProperties: function testCssCustomProperties() {
        var CustomElem = function CustomElem() {
          return qx.html.Jsx.createElement("p", {
            style: "color: var(--my-custom-property, blue);"
          });
        };
        var unstyled = qx.html.Jsx.createElement(CustomElem, null);
        var domElem = unstyled.getDomElement(true);
        this.assertTrue(unstyled instanceof qx.html.Element);
        this.assertEquals("p", unstyled.getNodeName());
        document.body.appendChild(domElem);
        this.assertEquals("rgb(0, 0, 255)", getComputedStyle(domElem).color);
        document.body.removeChild(domElem);
        var red = qx.html.Jsx.createElement(CustomElem, {
          "__my-custom-property": "red"
        });
        var redElem = red.getDomElement(true);
        this.assertTrue(red instanceof qx.html.Element);
        this.assertEquals("p", red.getNodeName());
        document.body.appendChild(redElem);
        this.assertEquals("rgb(255, 0, 0)", getComputedStyle(redElem).color);
        document.body.removeChild(redElem);
      }
    }
  });
  qx.test.html.jsx.TestJsx.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestJsx.js.map?dt=1729101240704