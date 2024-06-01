(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.Grow": {},
      "qx.ui.core.Widget": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Martijn Evers, The Netherlands
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martijn Evers (mever)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.ui.core.AbstractScrollArea.fixture.CustomWidget)
   */
  qx.Class.define("qx.test.ui.core.AbstractScrollArea", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MMock,
    members: {
      /** @type {qx.test.ui.core.AbstractScrollArea.fixture.CustomWidget} */
      __P_383_0: null,
      /** @type {qx.ui.container.Composite} */
      __P_383_1: null,
      setUp: function setUp() {
        qx.Class.define("qx.test.ui.core.AbstractScrollArea.fixture.CustomWidget", {
          extend: qx.ui.core.scroll.AbstractScrollArea,
          members: {
            /**
             * @param widget {qx.ui.core.LayoutItem}
             */
            setSingleChild: function setSingleChild(widget) {
              this.getChildControl("pane").add(widget);
            },
            /**
             * @param side {String} Either 'x' or 'y'.
             * @returns {boolean}
             */
            hasScrollBar: function hasScrollBar(side) {
              this._computeScrollbars();
              return this._isChildControlVisible("scrollbar-" + side);
            }
          }
        });
        this.__P_383_1 = new qx.ui.container.Composite(new qx.ui.layout.Grow());
        this.__P_383_1.set({
          maxWidth: 100,
          maxHeight: 100,
          width: 100,
          height: 100
        });
        this.__P_383_0 = new qx.test.ui.core.AbstractScrollArea.fixture.CustomWidget();
        this.__P_383_1.add(this.__P_383_0);
        this.getRoot().add(this.__P_383_1);
        qx.test.ui.core.AbstractScrollArea.superclass.prototype.setUp.call(this);
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        qx.Class.undefine("qx.test.ui.core.AbstractScrollArea.fixture.CustomWidget");
        qx.test.ui.core.AbstractScrollArea.superclass.prototype.tearDown.call(this);
      },
      /**
       * @param expected {qx.ui.core.Widget|Bounds}
       * @param actual {qx.ui.core.Widget}
       */
      assertBounds: function assertBounds(expected, actual) {
        var expectedBounds, actualBounds;
        if (expected instanceof qx.ui.core.Widget) {
          expectedBounds = expected.getBounds();
        } else {
          expectedBounds = expected;
        }
        actualBounds = actual.getBounds();
        this.assertIdentical(expectedBounds.top, actualBounds.top);
        this.assertIdentical(expectedBounds.left, actualBounds.left);
        this.assertIdentical(expectedBounds.width, actualBounds.width);
        this.assertIdentical(expectedBounds.height, actualBounds.height);
      },
      "test default behaviour": function testDefaultBehaviour() {
        var inner = new qx.ui.core.Widget();
        this.__P_383_0.setSingleChild(inner);
        this.flush();
        this.assertBounds(inner, this.__P_383_0);
      },
      "test smaller widget than container": function testSmallerWidgetThanContainer() {
        var inner = new qx.ui.core.Widget();
        inner.set({
          minWidth: 80,
          minHeight: 80
        });
        this.__P_383_0.setSingleChild(inner);
        this.flush();
        this.assertBounds(inner, this.__P_383_0);
        this.assertFalse(this.__P_383_0.hasScrollBar("x"));
        this.assertFalse(this.__P_383_0.hasScrollBar("y"));
      },
      "test bigger widget than container": function testBiggerWidgetThanContainer() {
        var inner = new qx.ui.core.Widget();
        inner.set({
          minWidth: 120,
          minHeight: 120
        });
        this.__P_383_0.setSingleChild(inner);
        this.flush();
        this.assertBounds({
          left: 0,
          top: 0,
          width: 100,
          height: 100
        }, this.__P_383_0);
        this.assertBounds({
          left: 0,
          top: 0,
          width: 120,
          height: 120
        }, inner);
        this.assertTrue(this.__P_383_0.hasScrollBar("x"));
        this.assertTrue(this.__P_383_0.hasScrollBar("y"));
      },
      "test bigger preferred widget than container": function testBiggerPreferredWidgetThanContainer() {
        var inner = new qx.ui.core.Widget();
        inner.set({
          width: 120,
          height: 120
        });
        this.__P_383_0.setSingleChild(inner);
        this.flush();
        this.assertBounds({
          left: 0,
          top: 0,
          width: 100,
          height: 100
        }, this.__P_383_0);
        this.assertBounds({
          left: 0,
          top: 0,
          width: 100,
          height: 100
        }, inner);
        this.assertFalse(this.__P_383_0.hasScrollBar("x"));
        this.assertFalse(this.__P_383_0.hasScrollBar("y"));
      },
      "test bigger widget than smaller preferred container": function testBiggerWidgetThanSmallerPreferredContainer() {
        var inner = new qx.ui.core.Widget();
        inner.set({
          minWidth: 120,
          minHeight: 120
        });
        this.__P_383_0.setSingleChild(inner);
        this.__P_383_1.set({
          width: 100,
          height: 100
        });
        this.__P_383_1.resetMaxWidth();
        this.__P_383_1.resetMaxHeight();
        this.flush();
        this.assertBounds({
          left: 0,
          top: 0,
          width: 100,
          height: 100
        }, this.__P_383_0);
        this.assertBounds({
          left: 0,
          top: 0,
          width: 120,
          height: 120
        }, inner);
        this.assertTrue(this.__P_383_0.hasScrollBar("x"));
        this.assertTrue(this.__P_383_0.hasScrollBar("y"));
      }
    }
  });
  qx.test.ui.core.AbstractScrollArea.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractScrollArea.js.map?dt=1717235393363