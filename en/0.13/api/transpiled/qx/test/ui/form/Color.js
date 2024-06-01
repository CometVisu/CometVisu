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
      "qx.ui.form.IColorForm": {},
      "qx.ui.control.ColorSelector": {},
      "qx.ui.control.ColorPopup": {}
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
  qx.Class.define("qx.test.ui.form.Color", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_393_0: function __P_393_0(widget) {
        // check if the interface is implemented
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.IColorForm), "Interface is not implemented.");

        // check for the init value
        this.assertNull(widget.getValue(), "Wrong init value set.");

        // just check if the method is available
        widget.resetValue();

        // check the getter and setter
        widget.setValue("#008000");
        this.assertEquals("#008000", widget.getValue(), "Set or get does not work.");
        var self = this;
        this.assertEventFired(widget, "changeValue", function () {
          widget.setValue("#CCCCCC");
        }, function (e) {
          self.assertEquals("#CCCCCC", e.getData(), "Wrong data in the event.");
        }, "Event is wrong!");

        // test for null values
        widget.setValue(null);
        widget.destroy();
      },
      testColorSelector: function testColorSelector() {
        this.__P_393_0(new qx.ui.control.ColorSelector());
      },
      testColorPopup: function testColorPopup() {
        this.__P_393_0(new qx.ui.control.ColorPopup());
      }
    }
  });
  qx.test.ui.form.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1717235393768