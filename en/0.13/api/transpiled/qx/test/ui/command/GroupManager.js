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
      "qx.ui.command.GroupManager": {},
      "qx.ui.command.Group": {},
      "qx.ui.command.Command": {}
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
       * Mustafa Sak (msak)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.command.GroupManager", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      testGroupManager: function testGroupManager() {
        var handler = this.spy();
        var manager = new qx.ui.command.GroupManager();
        var group = new qx.ui.command.Group();
        var cmd = new qx.ui.command.Command("Meta+T");
        var group2 = new qx.ui.command.Group();
        var cmd2 = new qx.ui.command.Command("Meta+T");
        cmd.addListener("execute", handler);
        cmd2.addListener("execute", handler);
        group.add("cmd", cmd);
        group2.add("cmd2", cmd2);
        manager.add(group);
        manager.add(group2);
        manager.setActive(group);
        cmd.execute();
        cmd2.execute();
        this.assertCallCount(handler, 1);
        manager.setActive(group);
        cmd.execute();
        cmd2.execute();
        this.assertCallCount(handler, 2);
        manager.unblock(group);
        cmd.execute();
        cmd2.execute();
        this.assertCallCount(handler, 3);
        manager.block(group);
        cmd.execute();
        cmd2.execute();
        this.assertCallCount(handler, 3);
      },
      "test: add and remove group": function test_add_and_remove_group() {
        var manager = new qx.ui.command.GroupManager();
        var group = new qx.ui.command.Group();
        var cmd = new qx.ui.command.Command("Meta+T");
        var group2 = new qx.ui.command.Group();
        var cmd2 = new qx.ui.command.Command("Meta+T");
        manager.add(group);
        manager.add(group2);
        manager.setActive(group);
        manager.remove(group);
        this.assertFalse(manager.has(group));
        this.assertNull(manager.getActive(group));
      }
    }
  });
  qx.test.ui.command.GroupManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GroupManager.js.map?dt=1722153831018