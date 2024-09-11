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
      "qx.test.ui.list.MAssert": {
        "require": true
      },
      "qx.core.Object": {
        "construct": true
      },
      "qx.data.marshal.MEventBubbling": {},
      "qx.data.Array": {
        "construct": true
      },
      "qx.core.ObjectRegistry": {},
      "qx.ui.tree.VirtualTree": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.ui.tree.virtual.Leaf)
   * @ignore(qx.test.ui.tree.virtual.Node)
   */

  qx.Class.define("qx.test.ui.tree.virtual.AbstractTreeTest", {
    type: "abstract",
    extend: qx.test.ui.LayoutTestCase,
    include: [qx.dev.unit.MMock, qx.test.ui.list.MAssert],
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
      qx.Class.define("qx.test.ui.tree.virtual.Leaf", {
        extend: qx.core.Object,
        include: qx.data.marshal.MEventBubbling,
        construct: function construct(name) {
          qx.core.Object.constructor.call(this);
          this.setName(name);
        },
        properties: {
          name: {
            check: "String",
            event: "changeName",
            apply: "_applyEventPropagation",
            nullable: true
          }
        },
        members: {
          toString: function toString() {
            return this.getName();
          },
          equals: function equals(item) {
            return this.getName() === item.getName();
          }
        }
      });
      qx.Class.define("qx.test.ui.tree.virtual.Node", {
        extend: qx.test.ui.tree.virtual.Leaf,
        construct: function construct(name, children) {
          qx.test.ui.tree.virtual.Leaf.constructor.call(this, name);
          if (children == null) {
            children = new qx.data.Array();
          }
          this.setChildren(children);
        },
        properties: {
          children: {
            check: "qx.data.Array",
            event: "changeChildren",
            apply: "_applyEventPropagation",
            nullable: true
          }
        },
        destruct: function destruct() {
          if (!qx.core.ObjectRegistry.inShutDown) {
            var children = this.getChildren();
            for (var i = 0; i < children.getLength(); i++) {
              children.getItem(i).dispose();
            }
            children.dispose();
            this.setChildren(null);
          }
        }
      });
    },
    members: {
      tree: null,
      setUp: function setUp() {
        qx.test.ui.tree.virtual.AbstractTreeTest.superclass.prototype.setUp.call(this);
        this.tree = new qx.ui.tree.VirtualTree();
        this.getRoot().add(this.tree);
      },
      tearDown: function tearDown() {
        qx.test.ui.tree.virtual.AbstractTreeTest.superclass.prototype.tearDown.call(this);
        this.tree.dispose();
        this.tree = null;
        if (this.model != null) {
          this.model.dispose();
          this.model = null;
        }
      },
      createModel: function createModel(level) {
        var root = new qx.test.ui.tree.virtual.Node("Root node");
        this._createNodes(root, level);
        return root;
      },
      createModelAndSetModel: function createModelAndSetModel(level) {
        this.model = this.createModel(level);
        this.tree.setLabelPath("name");
        this.tree.setChildProperty("children");
        this.tree.setModel(this.model);
        return this.model;
      },
      getVisibleItemsFrom: function getVisibleItemsFrom(parent, openNodes) {
        var expected = [];
        if (parent.getChildren() != null) {
          for (var i = 0; i < parent.getChildren().getLength(); i++) {
            var child = parent.getChildren().getItem(i);
            expected.push(child);
            if (openNodes.indexOf(child) > -1) {
              var otherExpected = this.getVisibleItemsFrom(child, openNodes);
              expected = expected.concat(otherExpected);
            }
          }
        }
        return expected;
      },
      /*
      ---------------------------------------------------------------------------
        HELPER METHODS TO CREATE A TREE STRUCTURE
      ---------------------------------------------------------------------------
      */
      _createNodes: function _createNodes(parent, level) {
        if (level > 0) {
          for (var i = 0; i < 5; i++) {
            var item = new qx.test.ui.tree.virtual.Node("Node " + this.__P_435_0(parent) + i);
            parent.getChildren().push(item);
            this._createNodes(item, level - 1);
            this._createLeafs(item);
          }
        }
      },
      _createLeafs: function _createLeafs(parent) {
        for (var i = 0; i < 5; i++) {
          var child = new qx.test.ui.tree.virtual.Leaf("Leaf " + this.__P_435_0(parent) + i);
          parent.getChildren().push(child);
        }
      },
      __P_435_0: function __P_435_0(item) {
        var name = item.getName();
        var prefix = "";
        if (name.startsWith("Node")) {
          prefix = name.substr(5, name.length - 5) + ".";
        }
        return prefix;
      }
    },
    destruct: function destruct() {
      if (qx.Class.isDefined("qx.test.ui.tree.virtual.Leaf")) {
        qx.Class.undefine("qx.test.ui.tree.virtual.Leaf");
      }
      if (qx.Class.isDefined("qx.test.ui.tree.virtual.Node")) {
        qx.Class.undefine("qx.test.ui.tree.virtual.Node");
      }
    }
  });
  qx.test.ui.tree.virtual.AbstractTreeTest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractTreeTest.js.map?dt=1726089059970