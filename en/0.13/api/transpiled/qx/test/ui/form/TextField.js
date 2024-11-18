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
      "qx.ui.form.TextField": {}
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
       * Henner Kollmann
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.TextField", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_416_0 = new qx.ui.form.TextField();
        this.getRoot().add(this.__P_416_0);
      },
      tearDown: function tearDown() {
        this.__P_416_0.destroy();
        this.__P_416_0 = null;
        qx.test.ui.form.TextField.superclass.prototype.tearDown.call(this);
      },
      "test: get default length": function test_get_default_length() {
        var l = this.__P_416_0.getMaxLength();
        this.assertEquals(Infinity, l);
      },
      "test: set max length": function test_set_max_length() {
        this.__P_416_0.setMaxLength(4);
        var l = this.__P_416_0.getMaxLength();
        this.assertEquals(4, l);
      },
      "test: reset max length": function test_reset_max_length() {
        this.__P_416_0.setMaxLength(4);
        var l = this.__P_416_0.getMaxLength();
        this.assertEquals(4, l);
        this.__P_416_0.resetMaxLength();
        var l = this.__P_416_0.getMaxLength();
        this.assertEquals(Infinity, l);
      },
      "test: validate input with filter": function test_validate_input_with_filter() {
        this.__P_416_0.setFilter(/[0-9]/);
        var s = this.__P_416_0._validateInput("a");
        this.assertEquals("", s);
        var s = this.__P_416_0._validateInput("111");
        this.assertEquals("111", s);
      },
      "test: validate input with complex filter": function test_validate_input_with_complex_filter() {
        this.__P_416_0.setFilter(/^(\+|-)?\d*$/);
        var s = this.__P_416_0._validateInput("a");
        this.assertEquals("", s);
        var s = this.__P_416_0._validateInput("1");
        this.assertEquals("1", s);
        var s = this.__P_416_0._validateInput("-");
        this.assertEquals("-", s);
        var s = this.__P_416_0._validateInput("111");
        this.assertEquals("111", s);
        var s = this.__P_416_0._validateInput("-111");
        this.assertEquals("-111", s);
        var s = this.__P_416_0._validateInput("-11-1");
        this.assertEquals("", s);
      },
      "test: validate input with complex filter 2": function test_validate_input_with_complex_filter_2() {
        this.__P_416_0.setFilter(/^xy$/);
        var s = this.__P_416_0._validateInput("x? y?");
        this.assertEquals("", s);
      },
      __P_416_0: null
    }
  });
  qx.test.ui.form.TextField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextField.js.map?dt=1731948120389