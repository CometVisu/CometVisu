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
      "qx.ui.form.TextField": {},
      "qx.ui.form.validation.Manager": {},
      "qx.lang.Type": {},
      "qx.core.ValidationError": {},
      "qx.ui.form.validation.AsyncValidator": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.Spinner": {},
      "qx.core.Object": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.VirtualSelectBox": {},
      "qx.data.marshal.Json": {}
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
  qx.Class.define("qx.test.ui.form.FormValidator", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
    },
    members: {
      __P_400_0: null,
      __P_400_1: null,
      __P_400_2: null,
      __P_400_3: null,
      setUp: function setUp() {
        this.__P_400_0 = new qx.ui.form.TextField();
        this.__P_400_1 = new qx.ui.form.TextField();
        this.__P_400_2 = new qx.ui.form.TextField();
        this.__P_400_3 = new qx.ui.form.validation.Manager();
      },
      tearDown: function tearDown() {
        this.__P_400_3.dispose();
        this.__P_400_0.dispose();
        this.__P_400_1.dispose();
        this.__P_400_2.dispose();
      },
      // validator
      __P_400_4: function __P_400_4(value, formItem) {
        var isString = qx.lang.Type.isString(value);
        var valid = isString && value.length > 0;
        valid ? formItem.setInvalidMessage("") : formItem.setInvalidMessage("fail");
        return valid;
      },
      __P_400_5: function __P_400_5(value) {
        var isString = qx.lang.Type.isString(value);
        if (!isString || value.length == 0) {
          throw new qx.core.ValidationError("fail");
        }
      },
      __P_400_6: function __P_400_6(validator, value) {
        window.setTimeout(function () {
          var valid = value != null && value.length > 0;
          validator.setValid(valid, "fail");
        }, 100);
      },
      // context //////////////////////
      testSyncContext: function testSyncContext() {
        var self = this;
        this.__P_400_3.add(this.__P_400_0, function (value, formItem) {
          self.assertEquals(1, this.a);
        }, {
          a: 1
        });
        this.__P_400_3.validate();
      },
      testSync2Context: function testSync2Context() {
        var self = this;
        this.__P_400_3.add(this.__P_400_0, function (value, formItem) {
          self.assertEquals(1, this.a);
        }, {
          a: 1
        });
        this.__P_400_3.add(this.__P_400_1, function (value, formItem) {
          self.assertEquals(2, this.a);
        }, {
          a: 2
        });
        this.__P_400_3.validate();
      },
      testAsyncContext: function testAsyncContext() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(1, this.a);
        });
        this.__P_400_3.add(this.__P_400_0, asyncValidator, {
          a: 1
        });
        this.__P_400_3.validate();
        asyncValidator.dispose();
      },
      testAsync2Context: function testAsync2Context() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(1, this.a);
        });
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(2, this.a);
        });
        this.__P_400_3.add(this.__P_400_0, asyncValidator, {
          a: 1
        });
        this.__P_400_3.add(this.__P_400_1, asyncValidator2, {
          a: 2
        });
        this.__P_400_3.validate();
        asyncValidator.dispose();
        asyncValidator2.dispose();
      },
      testSyncFormContext: function testSyncFormContext() {
        var self = this;
        this.__P_400_3.setValidator(function () {
          self.assertEquals(1, this.a);
        });
        this.__P_400_3.setContext({
          a: 1
        });
        this.__P_400_3.validate();
      },
      testAsyncFormContext: function testAsyncFormContext() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function () {
          self.assertEquals(1, this.a);
        });
        this.__P_400_3.setValidator(asyncValidator);
        this.__P_400_3.setContext({
          a: 1
        });
        this.__P_400_3.validate();
        asyncValidator.dispose();
      },
      // //////////////////////////////
      //  sync self contained ///////////////
      testSyncSelfContained1NotNull: function testSyncSelfContained1NotNull() {
        this.__P_400_3.add(this.__P_400_0, this.__P_400_4);

        // validate = fail (no text entered)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertFalse(this.__P_400_0.getValid());

        // check the invalid messages
        this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);

        // enter text in the usernamen
        this.__P_400_0.setValue("affe");

        // validate = true
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_3.getValid());
        this.assertTrue(this.__P_400_0.getValid());

        // remove the username
        this.__P_400_0.resetValue();

        // validate = fail
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertFalse(this.__P_400_0.getValid());
      },
      testSyncSelfContained1NotNullRadioButtonGroup: function testSyncSelfContained1NotNullRadioButtonGroup() {
        var rbg = new qx.ui.form.RadioButtonGroup();
        rbg.setRequired(true);
        rbg.getRadioGroup().setAllowEmptySelection(true);
        var rb1 = new qx.ui.form.RadioButton("a");
        var rb2 = new qx.ui.form.RadioButton("b");
        rbg.add(rb1);
        rbg.add(rb2);
        this.__P_400_3.add(rbg);

        // validate = fail (no text entered)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertFalse(rbg.getValid());

        // select something
        rbg.setSelection([rb1]);

        // validate = true
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_3.getValid());
        this.assertTrue(rbg.getValid());
        rbg.dispose();
      },
      testSyncSelfContained1NotNullEvents: function testSyncSelfContained1NotNullEvents(attributes) {
        this.__P_400_3.add(this.__P_400_0, this.__P_400_4);
        var self = this;
        this.assertEventFired(this.__P_400_3, "changeValid", function () {
          self.__P_400_3.validate();
        }, function (e) {
          self.assertFalse(e.getData());
          self.assertNull(e.getOldData());
        });

        // make the form valid
        this.__P_400_0.setValue("affe");
        this.assertEventFired(this.__P_400_3, "changeValid", function () {
          self.__P_400_3.validate();
        }, function (e) {
          self.assertTrue(e.getData());
          self.assertFalse(e.getOldData());
        });
      },
      __P_400_7: function __P_400_7(validator) {
        this.__P_400_3.add(this.__P_400_0, validator);
        this.__P_400_3.add(this.__P_400_1, validator);
        this.__P_400_3.add(this.__P_400_2, validator);

        // validate = fail (no text entered)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertFalse(this.__P_400_1.getValid());
        this.assertFalse(this.__P_400_2.getValid());

        // check the invalid messages
        this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_1.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_2.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[1]);
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[2]);
        this.assertEquals(3, this.__P_400_3.getInvalidMessages().length);

        // enter text to the two passwordfields
        this.__P_400_1.setValue("1");
        this.__P_400_2.setValue("2");

        // validate again = fail (username empty)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());

        // check the invalid messages
        this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
        this.assertEquals(1, this.__P_400_3.getInvalidMessages().length);

        // enter text in the usernamen
        this.__P_400_0.setValue("affe");

        // validate = true
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());
        this.assertEquals(0, this.__P_400_3.getInvalidMessages().length);

        // remove the username
        this.__P_400_0.resetValue();

        // validate last time = false
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());
        this.assertEquals(1, this.__P_400_3.getInvalidMessages().length);
      },
      testSyncSelfContained3NotNull: function testSyncSelfContained3NotNull() {
        this.__P_400_7(this.__P_400_4);
      },
      testSyncSelfContained3NotNullError: function testSyncSelfContained3NotNullError() {
        this.__P_400_7(this.__P_400_5);
      },
      // //////////////////////////////
      // sync related //////////////
      __P_400_8: function __P_400_8(validator) {
        this.__P_400_3.add(this.__P_400_0);
        this.__P_400_3.add(this.__P_400_1);
        this.__P_400_3.add(this.__P_400_2);
        this.__P_400_1.setValue("affe");
        this.__P_400_3.setValidator(validator);
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessage());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
        this.__P_400_2.setValue("affe");
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_3.getValid());
        this.assertEquals(0, this.__P_400_3.getInvalidMessages().length);
      },
      testSyncRelatedNoIndividual: function testSyncRelatedNoIndividual() {
        this.__P_400_8(function (formItems, manager) {
          var valid = formItems[1].getValue() == formItems[2].getValue();
          if (!valid) {
            manager.setInvalidMessage("fail");
          }
          return valid;
        });
      },
      testSyncRelatedNoIndividualError: function testSyncRelatedNoIndividualError() {
        this.__P_400_8(function (formItems, manager) {
          if (formItems[1].getValue() != formItems[2].getValue()) {
            throw new qx.core.ValidationError("fail");
          }
        });
      },
      testSyncRelatedWithIndividual: function testSyncRelatedWithIndividual() {
        this.__P_400_3.add(this.__P_400_0, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, this.__P_400_4);
        this.__P_400_1.setValue("affe");
        this.__P_400_3.setValidator(function (formItems, manager) {
          var valid = formItems[1].getValue() == formItems[2].getValue();
          if (!valid) {
            manager.setInvalidMessage("fail");
          }
          return valid;
        });

        // false: username and password2 empty && password 1 != password2
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertFalse(this.__P_400_2.getValid());
        var messages = this.__P_400_3.getInvalidMessages();
        this.assertEquals("fail", this.__P_400_3.getInvalidMessage());
        this.assertEquals("fail", messages[0]);
        this.assertEquals("fail", messages[1]);
        this.assertEquals("fail", messages[2]);
        this.assertEquals(3, messages.length);
        this.__P_400_2.setValue("affe");

        // fail: username empty
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
        this.assertEquals(1, this.__P_400_3.getInvalidMessages().length);
        this.__P_400_0.setValue("user");

        // ok
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_3.getValid());
        this.assertEquals(0, this.__P_400_3.getInvalidMessages().length);
        this.assertTrue(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());

        // change back to not valid
        this.__P_400_1.setValue("user");

        // not ok
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_3.getValid());
        this.assertEquals(1, this.__P_400_3.getInvalidMessages().length);
        this.assertTrue(this.__P_400_0.getValid());
      },
      // //////////////////////////////
      // required /////////////////////
      testRequired: function testRequired() {
        // set all 3 fields to required
        this.__P_400_0.setRequired(true);
        this.__P_400_1.setRequired(true);
        this.__P_400_2.setRequired(true);

        // add the fields to the form manager
        this.__P_400_3.add(this.__P_400_0);
        this.__P_400_3.add(this.__P_400_1);
        this.__P_400_3.add(this.__P_400_2);

        // validate = fail (no text entered)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertFalse(this.__P_400_1.getValid());
        this.assertFalse(this.__P_400_2.getValid());

        // enter text to the two passwordfields
        this.__P_400_1.setValue("1");
        this.__P_400_2.setValue("2");

        // validate again = fail (username empty)
        this.assertFalse(this.__P_400_3.validate());
        this.assertFalse(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());

        // enter text in the usernamen
        this.__P_400_0.setValue("affe");

        // validate last time = true
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(this.__P_400_0.getValid());
        this.assertTrue(this.__P_400_1.getValid());
        this.assertTrue(this.__P_400_2.getValid());
      },
      testRequiredFieldMessage: function testRequiredFieldMessage() {
        // set a global and an individual required field message
        this.__P_400_3.setRequiredFieldMessage("affe");
        this.__P_400_1.setRequiredInvalidMessage("AFFEN");

        // set fields to required
        this.__P_400_0.setRequired(true);
        this.__P_400_1.setRequired(true);

        // add the fields to the form manager
        this.__P_400_3.add(this.__P_400_0);
        this.__P_400_3.add(this.__P_400_1);

        // validate = fail (no text entered)
        this.assertFalse(this.__P_400_3.validate());

        // check the messages
        this.assertEquals("affe", this.__P_400_0.getInvalidMessage());
        this.assertEquals("AFFEN", this.__P_400_1.getInvalidMessage());
      },
      testRequiredNumberZero: function testRequiredNumberZero() {
        // initialize with value 1
        var spinner = new qx.ui.form.Spinner(-1, 1, 1);
        spinner.setRequired(true);
        this.__P_400_3.add(spinner);

        // validate --> should be valid due to value 1 set
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(spinner.getValid());
        spinner.setValue(0);
        // validate --> should be valid due to value 0 set
        this.assertTrue(this.__P_400_3.validate());
        this.assertTrue(spinner.getValid());
        spinner.dispose();
      },
      // //////////////////////////////
      // Async self contained //////////
      testAsyncSelfContained1NotNullFail: function testAsyncSelfContained1NotNullFail() {
        var _this = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator);
        this.__P_400_3.addListener("complete", function () {
          _this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertFalse(this.__P_400_0.getValid());
            this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
          }, _this);
        });
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncSelfContained1NotNull: function testAsyncSelfContained1NotNull() {
        var _this2 = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator);
        this.__P_400_0.setValue("affe");
        this.__P_400_3.addListener("complete", function () {
          _this2.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
          }, _this2);
        });
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncSelfContained3NotNullFail: function testAsyncSelfContained3NotNullFail() {
        var _this3 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this3.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertFalse(this.__P_400_0.getValid());
            this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
            this.assertEquals("fail", this.__P_400_1.getInvalidMessage());
            this.assertEquals("fail", this.__P_400_2.getInvalidMessage());
            this.assertEquals(3, this.__P_400_3.getInvalidMessages().length);
            this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
            this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[1]);
            this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[2]);
          }, _this3);
        });
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncSelfContained3NotNull: function testAsyncSelfContained3NotNull() {
        var _this4 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this4.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
          }, _this4);
        });

        // add values to all three input fields
        this.__P_400_0.setValue("a");
        this.__P_400_1.setValue("b");
        this.__P_400_2.setValue("c");
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncSelfContained2NotNullFailMixed: function testAsyncSelfContained2NotNullFailMixed() {
        var _this5 = this;
        // BUG #3735
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(function (validator, value) {
          window.setTimeout(function () {
            validator.setValid(false, "fail");
          }, 300);
        });
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(function (validator, value) {
          window.setTimeout(function () {
            validator.setValid(true, "WIN");
          }, 500);
        });
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_0.setValid(false);
        this.__P_400_1.setValid(false);
        this.__P_400_2.setValid(false);
        this.__P_400_3.addListener("complete", function () {
          _this5.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertFalse(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this5);
        });
        this.__P_400_0.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncSelfContained3NotNullHalfFail: function testAsyncSelfContained3NotNullHalfFail() {
        var _this6 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this6.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertFalse(this.__P_400_0.getValid());
            this.assertEquals("fail", this.__P_400_0.getInvalidMessage());
            this.assertEquals("fail", this.__P_400_3.getInvalidMessages()[0]);
            this.assertEquals(1, this.__P_400_3.getInvalidMessages().length);
          }, _this6);
        });

        // add values to all three input fields
        this.__P_400_1.setValue("b");
        this.__P_400_2.setValue("c");
        this.__P_400_3.validate();
        this.wait();
      },
      // //////////////////////////////
      // Async related //////////
      testAsyncRelated3NotNullFail: function testAsyncRelated3NotNullFail() {
        var _this7 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this7.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this7);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_0.setValue("u");
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("b");
        this.__P_400_3.validate();
        this.wait();
      },
      testAsyncRelated3NotNull: function testAsyncRelated3NotNull() {
        var _this8 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, asyncValidator2);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this8.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this8);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_0.setValue("u");
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      // //////////////////////////////
      // Mixed self contained //////////
      testMixedSelfContained3NotNullAsyncFail: function testMixedSelfContained3NotNullAsyncFail() {
        var _this9 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, this.__P_400_4);
        this.__P_400_3.addListener("complete", function () {
          _this9.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertFalse(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this9);
        });
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("b");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedSelfContained3NotNullSyncFail: function testMixedSelfContained3NotNullSyncFail() {
        var _this10 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, this.__P_400_4);
        this.__P_400_3.addListener("complete", function () {
          _this10.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertFalse(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this10);
        });
        this.__P_400_0.setValue("a");
        this.__P_400_2.setValue("b");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedSelfContained3NotNullSync: function testMixedSelfContained3NotNullSync() {
        var _this11 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, this.__P_400_4);
        this.__P_400_3.addListener("complete", function () {
          _this11.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this11);
        });
        this.__P_400_0.setValue("a");
        this.__P_400_1.setValue("b");
        this.__P_400_2.setValue("c");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedSelfContained2SyncRequired: function testMixedSelfContained2SyncRequired(attribute) {
        var _this12 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_1.setRequired(true);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1);
        this.__P_400_3.addListener("complete", function () {
          _this12.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertFalse(this.__P_400_1.getValid());
          }, _this12);
        });
        this.__P_400_0.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      // //////////////////////////////
      // Mixed related //////////
      testMixedRelated3NotNull: function testMixedRelated3NotNull() {
        var _this13 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this13.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this13);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_0.setValue("u");
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedRelated3NotNullSyncFail: function testMixedRelated3NotNullSyncFail() {
        var _this14 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this14.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertFalse(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this14);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_0.setValue("u");
        this.__P_400_2.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedRelated3NotNullAsyncFail: function testMixedRelated3NotNullAsyncFail() {
        var _this15 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this15.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertFalse(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this15);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("a");
        this.__P_400_3.validate();
        this.wait();
      },
      testMixedRelated3NotNullAsyncFormFail: function testMixedRelated3NotNullAsyncFormFail() {
        var _this16 = this;
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__P_400_6);
        this.__P_400_3.add(this.__P_400_0, asyncValidator1);
        this.__P_400_3.add(this.__P_400_1, this.__P_400_4);
        this.__P_400_3.add(this.__P_400_2, asyncValidator3);
        this.__P_400_3.addListener("complete", function () {
          _this16.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__P_400_3.isValid());
            this.assertTrue(this.__P_400_0.getValid());
            this.assertTrue(this.__P_400_1.getValid());
            this.assertTrue(this.__P_400_2.getValid());
          }, _this16);
        });
        this.__P_400_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));
        this.__P_400_0.setValue("u");
        this.__P_400_1.setValue("a");
        this.__P_400_2.setValue("b");
        this.__P_400_3.validate();
        this.wait();
      },
      // //////////////////////////////
      // add error ////////////////////
      testAddWrong: function testAddWrong() {
        this.assertException(function () {
          this.__P_400_3.add(new qx.core.Object());
        });
        this.assertException(function () {
          this.__P_400_3.add(123);
        });
        this.assertException(function () {
          this.__P_400_3.add({});
        });
      },
      testAddSelectBoxWithValidator: function testAddSelectBoxWithValidator() {
        var box = new qx.ui.form.SelectBox();
        this.assertException(function () {
          this.__P_400_3.add(box, function () {});
        });
        box.dispose();
      },
      // //////////////////////////////
      // remove ///////////////////////
      testRemove: function testRemove() {
        this.__P_400_3.add(this.__P_400_0, function (value, formItem) {
          this.assertFalse(true, "validation method called!");
        }, this);
        this.assertEquals(this.__P_400_0, this.__P_400_3.remove(this.__P_400_0));
        this.__P_400_3.validate();
      },
      // //////////////////////////////
      // get items ////////////////////
      testGetItems: function testGetItems() {
        this.__P_400_3.add(this.__P_400_0);
        this.__P_400_3.add(this.__P_400_1);
        var items = this.__P_400_3.getItems();
        this.assertInArray(this.__P_400_0, items);
        this.assertInArray(this.__P_400_1, items);
      },
      // //////////////////////////////
      // validate //////////////////////
      testValidateDataBindingSelection: function testValidateDataBindingSelection() {
        "use strict";

        var vsb = new qx.ui.form.VirtualSelectBox();
        vsb.setRequired(true);
        this.__P_400_3.add(vsb);
        this.__P_400_3.validate();
        this.assertFalse(vsb.isValid());
        var m = qx.data.marshal.Json.createModel(["a", "b"]);
        vsb.setModel(m);
        this.__P_400_3.validate();
        this.assertTrue(vsb.isValid());
        vsb.dispose();
        m.dispose();
      }
    }
  });
  qx.test.ui.form.FormValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormValidator.js.map?dt=1717235394099