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
      "qx.ui.form.VirtualComboBox": {},
      "qx.data.Array": {},
      "qx.data.marshal.Json": {},
      "qx.lang.String": {},
      "qx.bom.String": {}
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
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.form.virtual.VirtualComboBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_419_0: null,
      __P_419_1: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualComboBox.superclass.prototype.setUp.call(this);
        this.__P_419_0 = new qx.ui.form.VirtualComboBox();
        this.getRoot().add(this.__P_419_0);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualComboBox.superclass.prototype.tearDown.call(this);
        this.__P_419_0.destroy();
        this.__P_419_0 = null;
        this.__P_419_1.dispose();
        this.flush();
      },
      __P_419_2: function __P_419_2() {
        var model = new qx.data.Array();
        for (var i = 0; i < 100; i++) {
          model.push("item " + (i + 1));
        }
        return model;
      },
      __P_419_3: function __P_419_3() {
        var model = new qx.data.Array();
        for (var i = 0; i < 100; i++) {
          model.push("<b>item " + (i + 1) + "</b>");
        }
        return model;
      },
      __P_419_4: function __P_419_4() {
        var rawData = [{
          firstname: "James",
          lastname: "Kirk"
        }, {
          firstname: "Jean-Luc",
          lastname: "Picard"
        }, {
          firstname: "Benjamin",
          lastname: "Sisko"
        }];
        var model = qx.data.marshal.Json.createModel(rawData);
        return model;
      },
      testPreselectOnOpen: function testPreselectOnOpen() {
        this.__P_419_1 = this.__P_419_2();
        this.__P_419_0.setModel(this.__P_419_1);
        this.__P_419_0.setValue("i");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        this.__P_419_0.close();
        this.flush();
        // Preselection may not change the actual value
        this.assertNotEquals("item 1", this.__P_419_0.getValue());
        this.assertEquals("i", this.__P_419_0.getValue());
      },
      testSelectFirstMatch: function testSelectFirstMatch() {
        this.__P_419_1 = this.__P_419_2();
        this.__P_419_0.setModel(this.__P_419_1);
        this.__P_419_0.setValue("item 4");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        var preselected = this.__P_419_0.getChildControl("dropdown")._preselected;
        this.assertEquals("item 4", preselected);
        this.assertEquals("item 4", this.__P_419_0.getValue());
      },
      testSelectFirstMatchWithSortedModel: function testSelectFirstMatchWithSortedModel() {
        this.__P_419_1 = this.__P_419_2();
        this.__P_419_0.setModel(this.__P_419_1);
        var delegate = {
          // invert sort order
          sorter: function sorter(a, b) {
            return a < b ? 1 : a > b ? -1 : 0;
          }
        };
        this.__P_419_0.setDelegate(delegate);
        this.__P_419_0.setValue("item 4");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        var preselected = this.__P_419_0.getChildControl("dropdown")._preselected;
        this.assertEquals("item 49", preselected);
        this.assertEquals("item 4", this.__P_419_0.getValue());

        // The virtual list uses a timeout to asynchronously flush the layout
        // queue and scroll the (pre)selected item into view. tearDown is called
        // before this timer's callback so the list container tries to scroll a
        // disposed widget which causes an exception. To get around this, we use
        // a timeout to delay the tearDown call.
        var that = this;
        window.setTimeout(function () {
          that.resume();
        }, 100);
        this.wait(200);
      },
      testSelectFirstMatchWithFilteredModel: function testSelectFirstMatchWithFilteredModel() {
        this.__P_419_1 = this.__P_419_2();
        this.__P_419_0.setModel(this.__P_419_1);
        var delegate = {
          // remove even-numbered items
          filter: function filter(item) {
            var num = parseInt(/([0-9]+)/.exec(item)[1], 10);
            return num % 2 ? true : false;
          }
        };
        this.__P_419_0.setDelegate(delegate);
        this.__P_419_0.setValue("item 22");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        // item 22 is not in the list, nothing should be preselected
        var preselected = this.__P_419_0.getChildControl("dropdown")._preselected;
        this.assertNull(preselected);
        this.assertEquals("item 22", this.__P_419_0.getValue());
      },
      testSelectFirstMatchWithFormatter: function testSelectFirstMatchWithFormatter() {
        this.__P_419_1 = this.__P_419_3();
        this.__P_419_0.setModel(this.__P_419_1);
        var delegate = {
          configureItem: function configureItem(item) {
            item.setRich(true);
          }
        };
        this.__P_419_0.setDelegate(delegate);
        this.__P_419_0.setDefaultFormat(function (data) {
          if (data) {
            data = qx.lang.String.stripTags(data);
            data = qx.bom.String.unescape(data);
          }
          return data;
        });
        this.__P_419_0.setValue("item 4");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        var preselected = this.__P_419_0.getChildControl("dropdown")._preselected;
        this.assertEquals("<b>item 4</b>", preselected);
        this.assertEquals("item 4", this.__P_419_0.getValue());
      },
      testSelectFirstMatchByLabelPath: function testSelectFirstMatchByLabelPath() {
        this.__P_419_1 = this.__P_419_4();
        this.__P_419_0.setLabelPath("lastname");
        this.__P_419_0.setModel(this.__P_419_1);
        this.__P_419_0.setValue("Si");
        this.flush();
        this.__P_419_0.open();
        this.flush();
        var preselected = this.__P_419_0.getChildControl("dropdown")._preselected.getLastname();
        this.assertEquals("Sisko", preselected);
        this.assertEquals("Si", this.__P_419_0.getValue());
      },
      testEmptySelection: function testEmptySelection() {
        this.__P_419_0.setLabelPath("label");
        var rawData = [{
          label: "foo"
        }];
        var model = this.__P_419_1 = qx.data.marshal.Json.createModel(rawData);
        this.__P_419_0.setModel(model);
        var selection = this.__P_419_0.getChildControl("dropdown").getSelection();
        selection.push(this.__P_419_0.getModel().getItem(0));
        selection.removeAll();
      },
      testOpenWithUnrenderedWidget: function testOpenWithUnrenderedWidget() {
        var cb = new qx.ui.form.VirtualComboBox();
        cb.open();
        this.getRoot().add(cb);
      }
    }
  });
  qx.test.ui.form.virtual.VirtualComboBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualComboBox.js.map?dt=1722153832297