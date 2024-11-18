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
      "qx.ui.layout.Grid": {},
      "qx.ui.container.Composite": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.core.FocusHandler": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.Focus", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      getContainer: function getContainer() {
        if (!this._container) {
          var grid = new qx.ui.layout.Grid(10, 10);
          this._container = new qx.ui.container.Composite(grid).set({
            padding: 20
          });
          this.getRoot().add(this._container);
        }
        return this._container;
      },
      setUp: function setUp() {
        this.flush();
        this.ref = new qx.ui.form.TextField();
        this.addReferenceInput();
        this.ref.focus();
        this.flush();
        this.ref.addListener("blur", this.onRefBlur, this);
        this.ref_blur_called = false;
        this.target_focus_called = false;
        this.target_blur_called = false;
        this.flush();
        this.input = new qx.ui.form.TextField();
        this.input.addListener("focus", this.onInputFocus, this);
        this.input.addListener("blur", this.onInputBlur, this);
      },
      tearDown: function tearDown() {
        qx.test.ui.Focus.superclass.prototype.tearDown.call(this);
        if (this.input) {
          this.input.destroy();
        }
        if (this.ref) {
          this.ref.destroy();
        }
        if (this._container) {
          this._container.destroy();
          this._container = null;
        }
        this.flush();
      },
      addInput: function addInput() {
        this.getContainer().add(this.input, {
          row: 2,
          column: 0
        });
      },
      addReferenceInput: function addReferenceInput() {
        this.getContainer().add(this.ref, {
          row: 1,
          column: 0,
          colSpan: 2
        });
      },
      onRefBlur: function onRefBlur() {
        this.ref_blur_called = true;
      },
      onInputFocus: function onInputFocus() {
        this.target_focus_called = true;
      },
      onInputBlur: function onInputBlur() {
        this.target_blur_called = true;
      },
      testNotInsertedBeforeFlush: function testNotInsertedBeforeFlush() {
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.addInput();
      },
      testExcludedBeforeFlush: function testExcludedBeforeFlush() {
        this.addInput();
        this.input.exclude();
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.input.show();
      },
      testHiddenBeforeFlush: function testHiddenBeforeFlush() {
        this.addInput();
        this.input.hide();
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.input.show();
      },
      testNotInsertedAfterFlush: function testNotInsertedAfterFlush() {
        this.addInput();
        this.flush();
        this.input.getLayoutParent().remove(this.input);
        this.flush();
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.addInput();
      },
      testExcludedAfterFlush: function testExcludedAfterFlush() {
        this.addInput();
        this.flush();
        this.input.getLayoutParent().remove(this.input);
        this.flush();
        this.addInput();
        this.input.exclude();
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.input.show();
      },
      testHiddenAfterFlush: function testHiddenAfterFlush() {
        this.addInput();
        this.flush();
        this.input.getLayoutParent().remove(this.input);
        this.flush();
        this.addInput();
        this.input.hide();
        this.input.focus();
        this.flush();
        this.assertFalse(this.ref_blur_called);
        this.assertFalse(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
        this.input.show();
      },
      testInsertedBeforeFlush: function testInsertedBeforeFlush() {
        this.addInput();
        this.input.focus();
        this.flush();
        this.assertTrue(this.ref_blur_called, "reference must be blurred");
        this.assertTrue(this.target_focus_called, "target must be focused");
        this.assertFalse(this.target_blur_called, "target must not be blurred");
      },
      testFocusRemoveBeforeFlush: function testFocusRemoveBeforeFlush() {
        this.addInput();
        this.input.focus();
        this.flush();
        this.input.getLayoutParent().remove(this.input);
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertTrue(this.target_blur_called);
        this.addInput();
      },
      testFocusExcludeBeforeFlush: function testFocusExcludeBeforeFlush() {
        this.addInput();
        this.input.focus();
        this.flush();
        this.input.exclude();
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertTrue(this.target_blur_called);
        this.input.show();
      },
      testFocusHideBeforeFlush: function testFocusHideBeforeFlush() {
        this.addInput();
        this.input.focus();
        this.flush();
        this.input.hide();
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertTrue(this.target_blur_called);
        this.input.show();
      },
      testInsertedAfterFlush: function testInsertedAfterFlush() {
        this.addInput();
        this.flush();
        this.input.focus();
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertFalse(this.target_blur_called);
      },
      testFocusRemoveAfterFlush: function testFocusRemoveAfterFlush() {
        this.addInput();
        this.input.focus();
        this.flush();
        this.input.getLayoutParent().remove(this.input);
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertTrue(this.target_blur_called);
        this.addInput();
      },
      testFocusExcludeAfterFlush: function testFocusExcludeAfterFlush() {
        this.addInput();
        this.flush();
        this.input.focus();
        this.flush();
        this.input.exclude();
        this.flush();
        this.assertTrue(this.ref_blur_called);
        this.assertTrue(this.target_focus_called);
        this.assertTrue(this.target_blur_called);
        this.input.show();
      },
      testFocusHideAfterFlush: function testFocusHideAfterFlush() {
        this.addInput();
        this.flush();
        this.input.focus();
        this.flush();
        this.input.hide();
        this.flush();
        this.assertTrue(this.ref_blur_called, "reference must be blurred");
        this.assertTrue(this.target_focus_called, "target must be focused");
        this.assertTrue(this.target_blur_called, "target must be blurred");
        this.input.show();
      },
      testFocusComboBox: function testFocusComboBox() {
        var comboBox = new qx.ui.form.ComboBox();
        this.getRoot().add(comboBox);
        comboBox.focus();
        this.flush();
        this.assertEquals(comboBox.getChildControl("textfield"), qx.ui.core.FocusHandler.getInstance().getActiveWidget());
        comboBox.destroy();
      }
    },
    destruct: function destruct() {
      this.ref = this.input = null;
    }
  });
  qx.test.ui.Focus.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Focus.js.map?dt=1731948118987