(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.ui.form.TextArea": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.type.Array": {},
      "qx.dev.unit.RequirementError": {},
      "qx.ui.core.queue.Dispose": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.form.TextArea", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MRequirements,
    members: {
      __P_416_0: null,
      setUp: function setUp() {
        var textArea = this.__P_416_0 = new qx.ui.form.TextArea();
        this.getRoot().add(textArea);
      },
      hasNoBuggyIe: function hasNoBuggyIe() {
        return qx.core.Environment.get("engine.name") != "mshtml" || qx.core.Environment.get("browser.documentmode") > 10;
      },
      //
      // "Plain" textarea
      //
      "test: textarea set value": function test_textarea_set_value() {
        var textArea = this.__P_416_0;
        textArea.setValue("Affe");
        this.flush();
        this.assertEquals("Affe", textArea.getValue());
      },
      "test: textarea set minimal line-height": function test_textarea_set_minimal_lineHeight() {
        var textArea = this.__P_416_0;
        this.flush();
        var heightInitial = textArea.getSizeHint().height;
        textArea.setMinimalLineHeight(1);
        this.flush();
        var heightSmall = textArea.getSizeHint().height;
        var msg = "Widget height must decrease (was: " + heightInitial + " is: " + heightSmall + ")";
        this.assert(heightSmall < heightInitial, msg);
      },
      //
      // Auto-Size
      //
      "test: textarea with autoSize grows when input would trigger scrollbar": function test_textarea_with_autoSize_grows_when_input_would_trigger_scrollbar() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.setAutoSize(true);
        this.flush();
        textArea.setValue("Affe\nMaus\nElefant");
        this.flush();
        var heightSmall = textArea.getSizeHint().height;

        // Grow
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();
        var heightTall = textArea.getSizeHint().height;
        var msg = "Widget height must increase (was: " + heightSmall + " is: " + heightTall + ")";
        this.assert(heightTall > heightSmall, msg);
      },
      "test: textarea with autoSize shrinks when removal would hide scrollbar": function test_textarea_with_autoSize_shrinks_when_removal_would_hide_scrollbar() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.setAutoSize(true);
        this.flush();
        textArea.setValue("Affe\nMaus\nElefant");
        this.flush();

        // Grow
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();
        var heightTall = textArea.getSizeHint().height;

        // Shrink
        textArea.setValue("Affe\nMaus\nElefant");
        this.flush();
        var heightShrink = textArea.getSizeHint().height;
        var msg = "Widget height must decrease (was: " + heightTall + " is: " + heightShrink + ")";
        this.assert(heightShrink < heightTall, msg);
      },
      "test: textarea with autoSize does not shrink below original height": function test_textarea_with_autoSize_does_not_shrink_below_original_height() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.setAutoSize(true);
        this.flush();
        var originalHeight = textArea.getBounds().height;
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();

        // Shrink
        textArea.setValue("Affe\nMaus\nElefant");
        var heightShrink = textArea.getSizeHint().height;
        this.flush();
        var msg = "Widget height must not shrink below original height (is: " + heightShrink + " original: " + originalHeight + ")";
        this.assert(!(heightShrink < originalHeight), msg);
      },
      "test: textarea with autoSize shows scroll-bar when above maxHeight": function test_textarea_with_autoSize_shows_scrollBar_when_above_maxHeight() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          maxHeight: 50,
          value: "Affe\nMaus\nElefant"
        });
        this.flush();

        // Grow
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();
        var overflow = textArea.getContentElement().getStyle("overflowY");
        this.assertEquals("auto", overflow);
      },
      "test: textarea with autoSize shows scroll-bar when finally above maxHeight": function test_textarea_with_autoSize_shows_scrollBar_when_finally_above_maxHeight() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          value: "Affe\nMaus\nElefant"
        });
        this.flush();

        // Grow
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();

        // Limit height
        textArea.setMaxHeight(50);
        this.flush();
        var overflow = textArea.getContentElement().getStyle("overflowY");
        this.assertEquals("auto", overflow);
      },
      "test: textarea with autoSize hides scroll-bar when finally below maxHeight": function test_textarea_with_autoSize_hides_scrollBar_when_finally_below_maxHeight() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          maxHeight: 50
        });
        this.flush();

        // Grow
        textArea.setValue("Affe\nMaus\nElefant\nGiraffe\nTiger");
        this.flush();

        // Shrink
        textArea.setValue("Affe");
        this.flush();
        var overflow = textArea.getContentElement().getStyle("overflowY");
        this.assertEquals("hidden", overflow);
      },
      "test: textarea with autoSize respects initial value": function test_textarea_with_autoSize_respects_initial_value() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          value: this.__P_416_1()
        });
        var textAreaNoValue = new qx.ui.form.TextArea();
        textAreaNoValue.set({
          autoSize: true,
          value: ""
        });
        this.getRoot().add(textAreaNoValue, {
          left: 100
        });
        this.flush();
        var heightValue = textArea.getBounds().height;
        var heightNoValue = textAreaNoValue.getBounds().height;
        var msg = "Must be higher with long value than without value";
        this.assert(heightValue > heightNoValue, msg);
        textAreaNoValue.destroy();
      },
      "test: textarea with autoSize respects initial wrap": function test_textarea_with_autoSize_respects_initial_wrap() {
        this.require(["noBuggyIe"]);
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          wrap: false,
          minimalLineHeight: 2,
          value: this.__P_416_1()
        });

        // No wrap
        this.flush();
        var heightInitial = textArea.getBounds().height;

        // Wrap
        textArea.setWrap(true);
        this.flush();

        // No wrap
        textArea.setWrap(false);
        this.flush();
        var heightFinal = textArea.getBounds().height;
        this.assertEquals(heightInitial, heightFinal);
      },
      "test: textarea with autoSize shrinks when long line is unwrapped": function test_textarea_with_autoSize_shrinks_when_long_line_is_unwrapped() {
        this.require(["noBuggyIe"]);
        if (!this.__P_416_2()) {
          this.skip();
        }
        var textArea = this.__P_416_0;
        textArea.setAutoSize(true);
        this.flush();

        // Grow
        var longValue = this.__P_416_1();
        textArea.setValue(longValue);
        this.flush();
        var wrapHeight = textArea.getSizeHint().height;

        // Shrink
        textArea.setWrap(false);
        this.flush();
        var noWrapHeight = textArea.getSizeHint().height;
        var msg = "Must shrink when long line is unwrapped";
        this.assertNotEquals(wrapHeight, noWrapHeight, msg);
        this.assert(noWrapHeight < wrapHeight, msg);
      },
      "test: textarea with autoSize grows when long line is wrapped": function test_textarea_with_autoSize_grows_when_long_line_is_wrapped() {
        this.require(["noBuggyIe"]);
        if (!this.__P_416_2()) {
          this.skip();
        }
        var textArea = this.__P_416_0;
        textArea.set({
          autoSize: true,
          wrap: true
        });
        this.flush();

        // Does not work unfortunately
        //
        // var longValue = new qx.type.Array(50).map(function() {
        //   return "AffeMausElefantGiraffeTiger";
        // }).join("");

        var longValue = this.__P_416_1();

        // Wrap
        textArea.setValue(longValue);
        this.flush();
        var initialWrapHeight = textArea.getSizeHint().height;

        // Unwrap
        textArea.setWrap(false);
        this.flush();
        var noWrapHeight = textArea.getSizeHint().height;

        // Wrap
        textArea.setWrap(true);
        this.flush();
        var wrapHeight = textArea.getSizeHint().height;
        var msg = "Must grow when long line is unwrapped";
        this.assertNotEquals(wrapHeight, noWrapHeight, msg);
        this.assert(wrapHeight > noWrapHeight, msg);
        msg = "Must be same height when wrap is toggled";
        this.assertEquals(initialWrapHeight, wrapHeight, msg);
      },
      __P_416_1: function __P_416_1() {
        var val = new qx.type.Array(50);
        for (var i = 0; i < val.length; i++) {
          val[i] = "AAAAA ";
        }
        return val.join("");
      },
      __P_416_2: function __P_416_2() {
        // Opera ignores changes to wrap settings
        // once the textarea is in the DOM
        return qx.core.Environment.get("engine.name") != "opera";
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      },
      tearDown: function tearDown() {
        qx.test.ui.form.TextArea.superclass.prototype.tearDown.call(this);
        this.__P_416_0.destroy();
        qx.ui.core.queue.Dispose.flush();
      }
    }
  });
  qx.test.ui.form.TextArea.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextArea.js.map?dt=1735383864753