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
      "qx.ui.form.DateField": {},
      "qx.dev.unit.RequirementError": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.form.DateField", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_396_0 = new qx.ui.form.DateField();
        this.getRoot().add(this.__P_396_0);
      },
      tearDown: function tearDown() {
        this.__P_396_0.destroy();
        qx.test.ui.form.DateField.superclass.prototype.tearDown.call(this);
      },
      "test: setting value sets date of chooser": function testSettingValueSetsDateOfChooser() {
        var datefield = this.__P_396_0,
          chooser = datefield.getChildControl("list"),
          date = new Date();
        datefield.setValue(date);
        this.assertEquals(date, chooser.getValue());
      },
      "test: choosing date fills in formatted date": function testChoosingDateFillsInFormattedDate() {
        var datefield = this.__P_396_0,
          textfield = datefield.getChildControl("textfield"),
          chooser = datefield.getChildControl("list"),
          date = new Date(),
          dateStr = this.formatDate(date);
        chooser.setValue(date);

        // Fake "execute" on calendar popup
        datefield._onChangeDate();
        this.assertEquals(dateStr, textfield.getValue());
      },
      formatDate: function formatDate(date) {
        return this.__P_396_0.getDateFormat().format(date);
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.ui.form.DateField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DateField.js.map?dt=1726089058096