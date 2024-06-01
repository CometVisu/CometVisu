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
      "qx.ui.form.Slider": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.Slider", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_413_0 = new qx.ui.form.Slider().set({
          width: 100,
          appearance: "test-slider"
        });
        this.getRoot().add(this.__P_413_0);
        this.flush();
      },
      tearDown: function tearDown() {
        this.__P_413_0.destroy();
      },
      testKnobPositionAfterBlur: function testKnobPositionAfterBlur() {
        this.__P_413_0.setValue(0);
        this.flush();
        var pos0 = this.__P_413_0.getChildControl("knob").getContentElement().getStyle("left");
        this.__P_413_0.setValue(30);
        this.flush();
        var pos30 = this.__P_413_0.getChildControl("knob").getContentElement().getStyle("left");
        this.__P_413_0.focus();
        this.flush();
        var posFocus = this.__P_413_0.getChildControl("knob").getContentElement().getStyle("left");
        this.assertNotEquals(pos0, posFocus);
        this.assertEquals(pos30, posFocus);
      },
      testInitOrientation: function testInitOrientation() {
        var newSlider1 = new qx.ui.form.Slider();
        this.assertIdentical(newSlider1.getOrientation(), "horizontal");
        var newSlider2 = new qx.ui.form.Slider("horizontal");
        this.assertIdentical(newSlider2.getOrientation(), "horizontal");
        var newSlider3 = new qx.ui.form.Slider("vertical");
        this.assertIdentical(newSlider3.getOrientation(), "vertical");
      },
      testSlideMethods: function testSlideMethods() {
        var min = this.__P_413_0.getMinimum();
        var max = this.__P_413_0.getMaximum();
        this.__P_413_0.slideToBegin();
        this.assertIdentical(this.__P_413_0.getValue(), min);
        this.__P_413_0.slideToEnd();
        this.assertIdentical(this.__P_413_0.getValue(), max);
        var singleStep = this.__P_413_0.getSingleStep();
        var before = this.__P_413_0.getValue();
        this.__P_413_0.slideForward();
        this.assertIdentical(this.__P_413_0.getValue(), Math.min(before + singleStep, max));
        before = this.__P_413_0.getValue();
        this.__P_413_0.slideBack();
        this.assertIdentical(this.__P_413_0.getValue(), Math.max(before - singleStep, min));
        var pageStep = this.__P_413_0.getPageStep();
        before = this.__P_413_0.getValue();
        this.__P_413_0.slidePageForward();
        this.assertIdentical(this.__P_413_0.getValue(), Math.min(before + pageStep, max));
        before = this.__P_413_0.getValue();
        this.__P_413_0.slidePageBack();
        this.assertIdentical(this.__P_413_0.getValue(), Math.max(before - pageStep, min));
      }
    }
  });
  qx.test.ui.form.Slider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slider.js.map?dt=1717235394405