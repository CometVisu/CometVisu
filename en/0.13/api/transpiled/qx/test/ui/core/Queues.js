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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.core.queue.Manager": {},
      "qx.ui.core.Widget": {},
      "qx.ui.core.queue.Widget": {},
      "qx.ui.core.queue.Appearance": {},
      "qx.ui.core.queue.Visibility": {},
      "qx.ui.core.queue.Dispose": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.core.Queues", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_388_0: null,
      __P_388_1: null,
      __P_388_2: null,
      __P_388_3: null,
      setUp: function setUp() {
        // ensure an empty dispose queue before starting the test
        qx.ui.core.queue.Manager.flush();
        this.__P_388_0 = new qx.ui.core.Widget();
        this.__P_388_0.$$hash = 10e5;
        this.__P_388_1 = new qx.ui.core.Widget();
        this.__P_388_1.$$hash = 1000001;
        this.__P_388_2 = new qx.ui.core.Widget();
        this.__P_388_2.$$hash = 1000002;
        this.__P_388_3 = new qx.ui.core.Widget();
        this.__P_388_3.$$hash = 1000003;
      },
      tearDown: function tearDown() {
        // dispose the widgets
        this.__P_388_0.dispose();
        this.__P_388_1.dispose();
        this.__P_388_2.dispose();
        this.__P_388_3.dispose();
      },
      testWidgetOrder: function testWidgetOrder() {
        qx.ui.core.queue.Widget.add(this.__P_388_3);
        qx.ui.core.queue.Widget.add(this.__P_388_2);
        qx.ui.core.queue.Widget.add(this.__P_388_1);
        qx.ui.core.queue.Widget.add(this.__P_388_0);
        var spy1 = this.spy(this.__P_388_0, "syncWidget");
        var spy2 = this.spy(this.__P_388_1, "syncWidget");
        var spy3 = this.spy(this.__P_388_2, "syncWidget");
        var spy4 = this.spy(this.__P_388_3, "syncWidget");
        qx.ui.core.queue.Widget.flush();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertCalledOnce(spy3);
        this.assertCalledOnce(spy4);
        this.assertCallOrder(spy4, spy3, spy2, spy1);
      },
      testAppearanceOrder: function testAppearanceOrder() {
        qx.ui.core.queue.Appearance.add(this.__P_388_3);
        qx.ui.core.queue.Appearance.add(this.__P_388_2);
        qx.ui.core.queue.Appearance.add(this.__P_388_1);
        qx.ui.core.queue.Appearance.add(this.__P_388_0);
        var spy1 = this.spy(this.__P_388_0, "syncAppearance");
        var spy2 = this.spy(this.__P_388_1, "syncAppearance");
        var spy3 = this.spy(this.__P_388_2, "syncAppearance");
        var spy4 = this.spy(this.__P_388_3, "syncAppearance");
        var stub = this.stub(qx.ui.core.queue.Visibility, "isVisible").returns(true);
        qx.ui.core.queue.Appearance.flush();
        stub.restore();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertCalledOnce(spy3);
        this.assertCalledOnce(spy4);
        this.assertCallOrder(spy4, spy3, spy2, spy1);
      },
      testDisposeOrder: function testDisposeOrder() {
        qx.ui.core.queue.Dispose.add(this.__P_388_3);
        qx.ui.core.queue.Dispose.add(this.__P_388_2);
        qx.ui.core.queue.Dispose.add(this.__P_388_1);
        qx.ui.core.queue.Dispose.add(this.__P_388_0);
        var spy1 = this.spy(this.__P_388_0, "dispose");
        var spy2 = this.spy(this.__P_388_1, "dispose");
        var spy3 = this.spy(this.__P_388_2, "dispose");
        var spy4 = this.spy(this.__P_388_3, "dispose");
        qx.ui.core.queue.Dispose.flush();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertCalledOnce(spy3);
        this.assertCalledOnce(spy4);
        this.assertCallOrder(spy4, spy3, spy2, spy1);
      },
      testVisibilityOrder: function testVisibilityOrder() {
        qx.ui.core.queue.Visibility.add(this.__P_388_3);
        qx.ui.core.queue.Visibility.add(this.__P_388_2);
        qx.ui.core.queue.Visibility.add(this.__P_388_1);
        qx.ui.core.queue.Visibility.add(this.__P_388_0);
        var spy1 = this.spy(this.__P_388_0, "isRootWidget");
        var spy2 = this.spy(this.__P_388_1, "isRootWidget");
        var spy3 = this.spy(this.__P_388_2, "isRootWidget");
        var spy4 = this.spy(this.__P_388_3, "isRootWidget");
        qx.ui.core.queue.Visibility.flush();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertCalledOnce(spy3);
        this.assertCalledOnce(spy4);
        this.assertCallOrder(spy4, spy3, spy2, spy1);
      },
      testWidgetAddJobs: function testWidgetAddJobs() {
        qx.ui.core.queue.Widget.add(this.__P_388_3, "job4");
        qx.ui.core.queue.Widget.add(this.__P_388_2, "job3");
        qx.ui.core.queue.Widget.add(this.__P_388_1);
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job1");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job1");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job3");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job2");
        var spy1 = this.spy(this.__P_388_0, "syncWidget");
        var spy2 = this.spy(this.__P_388_1, "syncWidget");
        var spy3 = this.spy(this.__P_388_2, "syncWidget");
        var spy4 = this.spy(this.__P_388_3, "syncWidget");
        qx.ui.core.queue.Widget.flush();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertCalledOnce(spy3);
        this.assertCalledOnce(spy4);
        this.assertCallOrder(spy4, spy3, spy2, spy1);
        this.assertTrue(spy1.args[0][0].job1);
        this.assertTrue(spy1.args[0][0].job2);
        this.assertTrue(spy1.args[0][0].job3);
        this.assertTrue(spy2.args[0][0]["$$default"]);
        this.assertTrue(spy3.args[0][0].job3);
        this.assertTrue(spy4.args[0][0].job4);
      },
      testWidgetRemoveJobs: function testWidgetRemoveJobs() {
        qx.ui.core.queue.Widget.add(this.__P_388_1);
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job1");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job1");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job3");
        qx.ui.core.queue.Widget.add(this.__P_388_0, "job2");
        qx.ui.core.queue.Widget.remove(this.__P_388_0, "job1");
        var spy1 = this.spy(this.__P_388_0, "syncWidget");
        var spy2 = this.spy(this.__P_388_1, "syncWidget");
        qx.ui.core.queue.Widget.flush();
        this.assertCalledOnce(spy1);
        this.assertCalledOnce(spy2);
        this.assertTrue(spy1.args[0][0].job2);
        this.assertTrue(spy1.args[0][0].job3);
        this.assertUndefined(spy1.args[0][0].job1);
        this.assertTrue(spy2.args[0][0]["$$default"]);
      }
    }
  });
  qx.test.ui.core.Queues.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Queues.js.map?dt=1735222431130