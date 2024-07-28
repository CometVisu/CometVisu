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
      "qx.ui.form.INumberForm": {},
      "qx.ui.form.Spinner": {},
      "qx.ui.form.Slider": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.NumberFormat", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_406_0: function __P_406_0(widget) {
        // check if the interface is implemented
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.INumberForm), "Interface not implemented");

        // check for the init value
        this.assertEquals(0, widget.getValue(), "Wrong init value set.");

        // just check if the method is available
        widget.resetValue();

        // check the getter and setter
        widget.setValue(10);
        this.assertEquals(10, widget.getValue(), "Set or get does not work.");
        var self = this;
        this.assertEventFired(widget, "changeValue", function () {
          widget.setValue(11);
        }, function (e) {
          self.assertEquals(11, e.getData(), "Not the right number in the event.");
          self.assertEquals(10, e.getOldData(), "Wrong old data in the event.");
        }, "Event is wrong!");

        // test for null values
        widget.setValue(null);

        // get rid of the widget
        widget.destroy();
      },
      testSpinner: function testSpinner() {
        this.__P_406_0(new qx.ui.form.Spinner());
      },
      testSlider: function testSlider() {
        this.__P_406_0(new qx.ui.form.Slider());
      }
    }
  });
  qx.test.ui.form.NumberFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NumberFormat.js.map?dt=1722151836895