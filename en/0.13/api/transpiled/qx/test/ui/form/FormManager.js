(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "construct": true,
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.form.renderer.AbstractRenderer": {
        "construct": true
      },
      "qx.ui.form.renderer.IFormRenderer": {},
      "qx.ui.form.Form": {},
      "qx.ui.form.TextField": {},
      "qx.util.Validate": {},
      "qx.ui.form.Button": {},
      "qx.ui.form.RepeatButton": {},
      "qx.ui.control.DateChooser": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.List": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.Slider": {},
      "qx.ui.form.Spinner": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.groupbox.CheckGroupBox": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.groupbox.RadioGroupBox": {},
      "qx.ui.form.renderer.Single": {},
      "qx.ui.form.renderer.SinglePlaceholder": {},
      "qx.ui.form.renderer.Double": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.DummyFormRenderer)
   */

  qx.Class.define("qx.test.ui.form.FormManager", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MMock,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);

      // create the test renderer
      qx.Class.define("qx.test.DummyFormRenderer", {
        extend: qx.ui.form.renderer.AbstractRenderer,
        implement: qx.ui.form.renderer.IFormRenderer,
        construct: function construct(form) {
          this.groups = [];
          this.buttons = [];
          qx.ui.form.renderer.AbstractRenderer.constructor.call(this, form);
        },
        properties: {
          buttons: {},
          groups: {}
        },
        members: {
          addItems: function addItems(items, names, title, itemsOptions, headerOptions) {
            this.groups.push({
              items: items,
              names: names,
              title: title,
              headerOptions: headerOptions,
              options: itemsOptions
            });
          },
          addButton: function addButton(button, options) {
            this.buttons.push({
              button: button,
              options: options
            });
          }
        }
      });
    },
    members: {
      __P_399_0: null,
      __P_399_1: null,
      __P_399_2: null,
      setUp: function setUp() {
        this.__P_399_0 = new qx.ui.form.Form();
        this.__P_399_1 = new qx.ui.form.TextField();
        this.__P_399_2 = new qx.ui.form.TextField();
      },
      tearDown: function tearDown() {
        this.__P_399_2.dispose();
        this.__P_399_1.dispose();
        this.__P_399_0.dispose();
      },
      testValidationContext: function testValidationContext() {
        var self = this;
        // add the widgets
        this.__P_399_0.add(this.__P_399_2, "TF2", function () {
          self.assertEquals(1, this.a);
        }, null, {
          a: 1
        });
        this.__P_399_0.validate();
      },
      testAddTwo: function testAddTwo() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[0].items[1], this.__P_399_2);

        // check the names
        this.assertEquals(view.groups[0].names[0], "TF1");
        this.assertEquals(view.groups[0].names[1], "TF2");
        view.dispose();
      },
      testRemove: function testRemove() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[0].items[1], this.__P_399_2);
        view.dispose();

        // remove twice to see if the remove is reported correctly
        this.assertTrue(this.__P_399_0.remove(this.__P_399_1));
        this.assertFalse(this.__P_399_0.remove(this.__P_399_1));

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_2);
        view.dispose();
      },
      testAddTwoWithValidator: function testAddTwoWithValidator() {
        // add the widgets
        this.__P_399_1.setRequired(true);
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2", qx.util.Validate.email());

        // validation should fail
        this.assertFalse(this.__P_399_0.validate());
        this.assertFalse(this.__P_399_1.getValid());
        this.assertFalse(this.__P_399_2.getValid());

        // correct the values
        this.__P_399_1.setValue("a");
        this.__P_399_2.setValue("ab@cd.ef");

        // validation should be ok
        this.assertTrue(this.__P_399_0.validate());
        this.assertTrue(this.__P_399_1.getValid());
        this.assertTrue(this.__P_399_2.getValid());

        // check the validation manager itself
        this.assertTrue(this.__P_399_0.getValidationManager().validate());
      },
      testAddTwoWithHeader: function testAddTwoWithHeader() {
        this.__P_399_0.addGroupHeader("affe");

        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[0].items[1], this.__P_399_2);

        // check the names
        this.assertEquals(view.groups[0].names[0], "TF1");
        this.assertEquals(view.groups[0].names[1], "TF2");

        // check the title
        this.assertEquals("affe", view.groups[0].title);
        view.dispose();
      },
      testRemoveHeader: function testRemoveHeader() {
        this.__P_399_0.addGroupHeader("affe0");
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addGroupHeader("affe1");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[1].items[0], this.__P_399_2);

        // check the title
        this.assertEquals("affe0", view.groups[0].title);
        this.assertEquals("affe1", view.groups[1].title);
        view.dispose();

        // remove twice to see if the remove is reported correctly
        this.assertTrue(this.__P_399_0.removeGroupHeader("affe1"));
        this.assertFalse(this.__P_399_0.removeGroupHeader("affe1"));

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[0].items[1], this.__P_399_2);
        this.assertEquals("affe0", view.groups[0].title);
        view.dispose();
      },
      testAddTwoWithTwoGroups: function testAddTwoWithTwoGroups() {
        this.__P_399_0.addGroupHeader("affe");
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addGroupHeader("affee");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[1].items[0], this.__P_399_2);

        // check the names
        this.assertEquals(view.groups[0].names[0], "TF1");
        this.assertEquals(view.groups[1].names[0], "TF2");

        // check the title
        this.assertEquals("affe", view.groups[0].title);
        this.assertEquals("affee", view.groups[1].title);
        view.dispose();
      },
      testAddTwoButtons: function testAddTwoButtons() {
        var b1 = new qx.ui.form.Button();
        var b2 = new qx.ui.form.RepeatButton();
        this.__P_399_0.addButton(b1);
        this.__P_399_0.addButton(b2);

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the buttons
        this.assertEquals(b1, view.buttons[0].button);
        this.assertEquals(b2, view.buttons[1].button);
        b2.dispose();
        b1.dispose();
        view.dispose();
      },
      testRemoveButton: function testRemoveButton() {
        var b1 = new qx.ui.form.Button();
        var b2 = new qx.ui.form.RepeatButton();
        this.__P_399_0.addButton(b1);
        this.__P_399_0.addButton(b2);

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the buttons
        this.assertEquals(b1, view.buttons[0].button);
        this.assertEquals(b2, view.buttons[1].button);
        view.dispose();

        // remove twice to see if the remove is reported correctly
        this.assertTrue(this.__P_399_0.removeButton(b1));
        this.assertFalse(this.__P_399_0.removeButton(b1));

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the button
        this.assertEquals(b2, view.buttons[0].button);
        view.dispose();
        b2.dispose();
        b1.dispose();
      },
      testAddTwoWithButtons: function testAddTwoWithButtons() {
        var b1 = new qx.ui.form.Button();
        var b2 = new qx.ui.form.RepeatButton();

        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addButton(b1);
        this.__P_399_0.add(this.__P_399_2, "TF2");
        this.__P_399_0.addButton(b2);

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(view.groups[0].items[0], this.__P_399_1);
        this.assertEquals(view.groups[0].items[1], this.__P_399_2);

        // check the names
        this.assertEquals(view.groups[0].names[0], "TF1");
        this.assertEquals(view.groups[0].names[1], "TF2");

        // check the buttons
        this.assertEquals(b1, view.buttons[0].button);
        this.assertEquals(b2, view.buttons[1].button);
        b2.dispose();
        b1.dispose();
        view.dispose();
      },
      testAddTwoWithOptions: function testAddTwoWithOptions() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1", null, "tf1", null, {
          a: 1
        });
        this.__P_399_0.add(this.__P_399_2, "TF2", null, "tf2", null, {
          a: 2
        });

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the items
        this.assertEquals(1, view.groups[0].options[0].a);
        this.assertEquals(2, view.groups[0].options[1].a);
        view.dispose();
      },
      testAddTwoWithButtonsOptions: function testAddTwoWithButtonsOptions() {
        var b1 = new qx.ui.form.Button();
        var b2 = new qx.ui.form.RepeatButton();

        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addButton(b1, {
          a: 1
        });
        this.__P_399_0.add(this.__P_399_2, "TF2");
        this.__P_399_0.addButton(b2, {
          a: 2
        });

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the buttons options
        this.assertEquals(1, view.buttons[0].options.a);
        this.assertEquals(2, view.buttons[1].options.a);
        b2.dispose();
        b1.dispose();
        view.dispose();
      },
      testAddTwoWithHeaderOptions: function testAddTwoWithHeaderOptions() {
        this.__P_399_0.addGroupHeader("affe", {
          a: 1
        });
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addGroupHeader("affee", {
          a: 2
        });
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // get the view
        var view = new qx.test.DummyFormRenderer(this.__P_399_0);

        // check the title
        this.assertEquals(1, view.groups[0].headerOptions.a);
        this.assertEquals(2, view.groups[1].headerOptions.a);
        view.dispose();
      },
      testResetter: function testResetter() {
        // set the init values of the textfields
        this.__P_399_1.setValue("aaaa");
        this.__P_399_2.setValue("bbbb");

        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2");

        // set some other values
        this.__P_399_1.setValue("111");
        this.__P_399_2.setValue("222");
        this.__P_399_0.reset();

        // check
        this.assertEquals("aaaa", this.__P_399_1.getValue());
        this.assertEquals("bbbb", this.__P_399_2.getValue());
      },
      testAll: function testAll() {
        var widgets = [];
        widgets.push(new qx.ui.control.DateChooser());
        widgets.push(new qx.ui.form.CheckBox());
        widgets.push(new qx.ui.form.ComboBox());
        widgets.push(new qx.ui.form.DateField());
        widgets.push(new qx.ui.form.List());
        widgets.push(new qx.ui.form.PasswordField());
        widgets.push(new qx.ui.form.RadioButton());
        widgets.push(new qx.ui.form.SelectBox());
        widgets.push(new qx.ui.form.Slider());
        widgets.push(new qx.ui.form.Spinner());
        widgets.push(new qx.ui.form.TextArea());
        widgets.push(new qx.ui.form.TextField());
        widgets.push(new qx.ui.groupbox.CheckGroupBox());
        widgets.push(new qx.ui.form.RadioButtonGroup());
        widgets.push(new qx.ui.groupbox.RadioGroupBox());

        // add all
        for (var i = 0; i < widgets.length; i++) {
          this.__P_399_0.add(widgets[i], "name" + i);
        }

        // reset
        this.__P_399_0.reset();

        // validate
        this.assertTrue(this.__P_399_0.validate());

        // get rid of the widgets
        for (var i = 0; i < widgets.length; i++) {
          widgets[i].dispose();
        }
      },
      testGetItems: function testGetItems() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1", null, "a");
        this.__P_399_0.add(this.__P_399_2, "TF2", null, "b");
        var items = this.__P_399_0.getItems();
        this.assertEquals(items.a, this.__P_399_1);
        this.assertEquals(items.b, this.__P_399_2);
      },
      testGetItemsFallback: function testGetItemsFallback() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "T F 2");
        var items = this.__P_399_0.getItems();
        this.assertEquals(items.TF1, this.__P_399_1);
        this.assertEquals(items.TF2, this.__P_399_2);
      },
      testGetItemsMixedWithGroups: function testGetItemsMixedWithGroups() {
        // add the widgets
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.add(this.__P_399_2, "TF2", null, "b");
        this.__P_399_0.addGroupHeader("x");
        var tf3 = new qx.ui.form.TextField();
        this.__P_399_0.add(tf3, "TF3");
        var items = this.__P_399_0.getItems();
        this.assertEquals(items.TF1, this.__P_399_1);
        this.assertEquals(items.b, this.__P_399_2);
        this.assertEquals(items.TF3, tf3);
        tf3.destroy();
      },
      testRedefineResetter: function testRedefineResetter() {
        // just call the method and check if its not throwing an error
        // all other stuff is tested in the resetter unit tests
        this.__P_399_0.redefineResetter();
      },
      testEvent: function testEvent() {
        var handler = this.spy();
        this.__P_399_0.addListener("change", handler);
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.assertCalledOnce(handler);
        this.__P_399_0.addGroupHeader("GROUP");
        this.assertCalledTwice(handler);
        this.__P_399_0.add(this.__P_399_2, "TF2");
        this.assertEquals(3, handler.callCount);
        this.__P_399_0.remove(this.__P_399_1);
        this.assertEquals(4, handler.callCount);
        this.__P_399_0.removeGroupHeader("GROUP");
        this.assertEquals(5, handler.callCount);
        var b = new qx.ui.form.Button();
        this.__P_399_0.addButton(b);
        this.assertEquals(6, handler.callCount);
        this.__P_399_0.removeButton(b);
        this.assertEquals(7, handler.callCount);
        b.dispose();
      },
      testSingleRenderer: function testSingleRenderer() {
        var b1 = new qx.ui.form.Button();

        // add the widgets
        this.__P_399_0.addGroupHeader("header");
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addButton(b1);

        // just check if the renderer is created without an error
        new qx.ui.form.renderer.Single(this.__P_399_0).dispose();
        b1.dispose();
      },
      testSinglePlaceholderRenderer: function testSinglePlaceholderRenderer() {
        var b1 = new qx.ui.form.Button();

        // add the widgets
        this.__P_399_0.addGroupHeader("header");
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addButton(b1);

        // just check if the renderer is created without an error
        new qx.ui.form.renderer.SinglePlaceholder(this.__P_399_0).dispose();
        b1.dispose();
      },
      testDoubleRenderer: function testDoubleRenderer() {
        var b1 = new qx.ui.form.Button();

        // add the widgets
        this.__P_399_0.addGroupHeader("header");
        this.__P_399_0.add(this.__P_399_1, "TF1");
        this.__P_399_0.addButton(b1);

        // just check if the renderer is created without an error
        new qx.ui.form.renderer.Double(this.__P_399_0).dispose();
        b1.dispose();
      },
      testGetItem: function testGetItem() {
        var f1 = new qx.ui.form.TextField();
        var f2 = new qx.ui.form.TextField();
        var f3 = new qx.ui.form.TextField();
        this.__P_399_0.add(f1, "a");
        this.__P_399_0.add(f2, "c");
        this.__P_399_0.add(f3, "label", null, "x");
        this.assertIdentical(f1, this.__P_399_0.getItem("a"));
        this.assertNull(this.__P_399_0.getItem("b"));
        this.assertIdentical(f2, this.__P_399_0.getItem("c"));
        this.assertNull(this.__P_399_0.getItem("label"));
        this.assertIdentical(f3, this.__P_399_0.getItem("x"));
        [f1, f2, f3].forEach(function (o) {
          o.dispose();
        });
      }
    }
  });
  qx.test.ui.form.FormManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormManager.js.map?dt=1722153831701