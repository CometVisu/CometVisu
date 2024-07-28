(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.ui.container.Stack": {},
      "qx.ui.container.Composite": {}
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
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.container.Stack", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_382_0: null,
      __P_382_1: null,
      __P_382_2: null,
      __P_382_3: null,
      setUp: function setUp() {
        var stack = this.__P_382_0 = new qx.ui.container.Stack();
        var c1 = this.__P_382_1 = new qx.ui.container.Composite();
        var c2 = this.__P_382_2 = new qx.ui.container.Composite();
        var c3 = this.__P_382_3 = new qx.ui.container.Composite();
        c1.set({
          backgroundColor: "#F00",
          width: 200,
          height: 200
        });
        c2.set({
          backgroundColor: "#0F0",
          width: 200,
          height: 200
        });
        c3.set({
          backgroundColor: "#00F",
          width: 200,
          height: 200
        });
      },
      tearDown: function tearDown() {
        this.__P_382_0.destroy();
        this.__P_382_1.destroy();
        this.__P_382_2.destroy();
        this.__P_382_3.destroy();
      },
      /**
       * if stack doesn't have a child selected,
       * the new added child should be selected
       */
      testAddAndSelectChild: function testAddAndSelectChild() {
        this.__P_382_0.add(this.__P_382_1);
        this.assertIdentical(this.__P_382_1, this.__P_382_0.getSelection()[0]);
      },
      /**
       * if stack has a selected child,
       * the new added one should be excluded/hide but not selected.
       */
      testAddAndDontSelectChildInADynamicStack: function testAddAndDontSelectChildInADynamicStack() {
        this.__P_382_0.setDynamic(false);
        this.__P_382_0.add(this.__P_382_1);
        this.__P_382_0.add(this.__P_382_2);
        this.assertIdentical(this.__P_382_1, this.__P_382_0.getSelection()[0]);
        this.assertTrue(this.__P_382_2.isHidden());
      },
      /**
       * if stack has a selected child,
       * the new added one should be excluded/hide but not selected.
       */
      testAddAndDontSelectChildInANonDynamicStack: function testAddAndDontSelectChildInANonDynamicStack() {
        this.__P_382_0.setDynamic(true);
        this.__P_382_0.add(this.__P_382_1);
        this.__P_382_0.add(this.__P_382_2);
        this.assertIdentical(this.__P_382_1, this.__P_382_0.getSelection()[0]);
        this.assertTrue(this.__P_382_2.isExcluded());
      },
      /**
       *if we remove child, selected the first one
       */
      testRemoveSelectedChildSelectFirstOne: function testRemoveSelectedChildSelectFirstOne() {
        this.__P_382_0.add(this.__P_382_1);
        this.__P_382_0.add(this.__P_382_2);
        this.__P_382_0.setSelection([this.__P_382_2]);
        this.__P_382_0.remove(this.__P_382_2);
        this.assertIdentical(this.__P_382_1, this.__P_382_0.getSelection()[0]);
      },
      /**
       * if we remove child, and stack doesn't have any children left,
       * reset selection.
       */
      testRemoveSelectedChildResetSelection: function testRemoveSelectedChildResetSelection() {
        this.__P_382_0.add(this.__P_382_1);
        this.__P_382_0.add(this.__P_382_2);
        this.__P_382_0.add(this.__P_382_3);
        this.__P_382_0.remove(this.__P_382_1);
        this.__P_382_0.remove(this.__P_382_2);
        this.__P_382_0.remove(this.__P_382_3);
        this.assertArrayEquals([], this.__P_382_0.getSelection());
      }
    }
  });
  qx.test.ui.container.Stack.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Stack.js.map?dt=1722151836033