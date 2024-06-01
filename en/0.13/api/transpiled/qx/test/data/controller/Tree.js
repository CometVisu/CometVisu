(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true,
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.core.Object": {
        "construct": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.io.ImageLoader": {},
      "qx.ui.tree.Tree": {},
      "qx.data.controller.Tree": {},
      "qx.ui.tree.TreeFolder": {},
      "qx.ui.core.queue.Dispose": {}
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
   * @ignore(qx.test.MyTreeNode)
   * @ignore(qx.test.TreeEndNode)
   * @ignore(qx.test.TreeNode)
   */

  qx.Class.define("qx.test.data.controller.Tree", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    construct: function construct() {
      qx.dev.unit.TestCase.constructor.call(this);

      // define a test class
      qx.Class.define("qx.test.TreeNode", {
        extend: qx.core.Object,
        construct: function construct() {
          qx.core.Object.constructor.call(this);
          this.setChildren(new qx.data.Array());
          this.setAltChildren(new qx.data.Array());
        },
        properties: {
          children: {
            check: "qx.data.Array",
            event: "changeChild",
            nullable: true
          },
          altChildren: {
            check: "qx.data.Array",
            event: "changeChild",
            nullable: true
          },
          name: {
            check: "String",
            init: "root",
            event: "changeName"
          },
          name2: {
            check: "String",
            init: "root2",
            event: "changeName"
          },
          icon: {
            check: "String",
            event: "changeIcon",
            nullable: true
          },
          icon2: {
            check: "String",
            event: "changeIcon2",
            nullable: true
          },
          color: {
            check: "String",
            event: "changeColor",
            init: "green",
            nullable: true
          }
        },
        destruct: function destruct() {
          if (this.getChildren()) {
            this.getChildren().setAutoDisposeItems(true);
            this.getChildren().dispose();
          }
          if (this.getAltChildren()) {
            this.getAltChildren().setAutoDisposeItems(true);
            this.getAltChildren().dispose();
          }
        }
      });
    },
    members: {
      __P_333_0: null,
      __P_333_1: null,
      __P_333_2: null,
      __P_333_3: null,
      __P_333_4: null,
      __P_333_5: null,
      setUp: function setUp() {
        // prevent the icon load error with this stub
        this.stub(qx.io.ImageLoader, "load");
        this.__P_333_0 = new qx.ui.tree.Tree();

        // create a model
        //        this.__model
        //        /    |      \
        // this.__a  this.__b  this.__c
        this.__P_333_1 = new qx.test.TreeNode();
        this.__P_333_3 = new qx.test.TreeNode();
        this.__P_333_3.set({
          name: "a",
          name2: "a2",
          icon: "icon a",
          icon2: "icon a2",
          color: "red"
        });
        this.__P_333_4 = new qx.test.TreeNode();
        this.__P_333_4.set({
          name: "b",
          name2: "b2",
          icon: "icon b",
          icon2: "icon b2",
          color: "blue"
        });
        this.__P_333_5 = new qx.test.TreeNode();
        this.__P_333_5.set({
          name: "c",
          name2: "c2",
          icon: "icon c",
          icon2: "icon c2",
          color: "white"
        });
        this.__P_333_1.getChildren().push(this.__P_333_3, this.__P_333_4, this.__P_333_5);
        this.__P_333_1.getAltChildren().push(this.__P_333_5, this.__P_333_4, this.__P_333_3);

        // create the controller
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, "children", "name");
        this.__P_333_2.setIconPath("icon");
      },
      tearDown: function tearDown() {
        this.__P_333_2.dispose();
        this.__P_333_1.dispose();
        this.__P_333_0.dispose();

        // clear the stub
        this.getSandbox().restore();
      },
      testRemoveBindingsRecursive: function testRemoveBindingsRecursive() {
        // reform the model tree
        this.__P_333_1.getChildren().remove(this.__P_333_5);
        this.__P_333_3.getChildren().push(this.__P_333_5);
        var cFolder = this.__P_333_0.getRoot().getChildren()[0].getChildren()[0];
        this.assertNotNull(cFolder, "Third node does not exist");
        this.assertEquals("c", cFolder.getLabel());

        // remove the model node
        this.__P_333_3.getChildren().remove(this.__P_333_5);
        // check if its disposed and the bindings have been removed
        this.__P_333_5.setName("affe");
        this.assertEquals("c", cFolder.getLabel());

        // destroy is async --> wait for it!
        this.wait(100, function () {
          this.assertTrue(cFolder.isDisposed());
        }, this);
      },
      testModelChange: function testModelChange() {
        // set model to null
        this.__P_333_2.setModel(null);

        // set the same model again (forces the tree to redraw)
        this.__P_333_2.setModel(this.__P_333_1);
        var d = new qx.test.TreeNode();
        d.setName("d");
        var model = this.__P_333_1;
        // add the new model
        this.wait(100, function () {
          model.getChildren().push(d);
        });

        // d will be disposed by the model
      },
      testFolderCreation: function testFolderCreation() {
        // Test if the tree nodes exist
        this.assertNotNull(this.__P_333_0.getRoot(), "Root node does not exist");
        this.assertNotNull(this.__P_333_0.getRoot().getChildren()[0], "First node does not exist");
        this.assertNotNull(this.__P_333_0.getRoot().getChildren()[1], "Second node does not exist");
        this.assertNotNull(this.__P_333_0.getRoot().getChildren()[2], "Third node does not exist");
      },
      testFolderLabelInitial: function testFolderLabelInitial() {
        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testFolderLabelChangeName: function testFolderLabelChangeName() {
        // change the names
        this.__P_333_1.setName("ROOT");
        this.__P_333_3.setName("A");
        this.__P_333_4.setName("B");
        this.__P_333_5.setName("C");
        // check the initial Labels
        this.assertEquals("ROOT", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("A", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("B", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("C", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testFolderLabelPropertyChange: function testFolderLabelPropertyChange() {
        // change the label path
        this.__P_333_2.setLabelPath("name2");
        // check the initial Labels
        this.assertEquals("root2", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a2", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b2", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c2", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testChildPush: function testChildPush() {
        var d = new qx.test.TreeNode();
        d.setName("d");
        var children = this.__P_333_1.getChildren();
        children.push(d);

        // Test if the tree nodes exist
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
        this.assertEquals("d", this.__P_333_0.getRoot().getChildren()[3].getLabel(), "New node has a wrong name");
      },
      testChildPop: function testChildPop() {
        var children = this.__P_333_1.getChildren();
        children.pop();
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertUndefined(this.__P_333_0.getRoot().getChildren()[2], "There is still a third node!");
      },
      testChildShift: function testChildShift() {
        var children = this.__P_333_1.getChildren();
        children.shift();
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertUndefined(this.__P_333_0.getRoot().getChildren()[2], "There is still a third node!");
      },
      testChildUnshift: function testChildUnshift() {
        var d = new qx.test.TreeNode();
        d.setName("d");
        var children = this.__P_333_1.getChildren();
        children.unshift(d);

        // Test if the tree nodes exist
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("d", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[3].getLabel(), "Fourth node has a wrong name");
      },
      testTreeDeep: function testTreeDeep() {
        // remove all children
        this.__P_333_1.getChildren().pop();
        this.__P_333_1.getChildren().pop();
        this.__P_333_1.getChildren().pop();

        // create a straight tree
        // this.__model
        //      \
        //    this.__a
        //        \
        //      this.__b
        //          \
        //        this.__c
        this.__P_333_1.getChildren().push(this.__P_333_3);
        this.__P_333_3.getChildren().push(this.__P_333_4);
        this.__P_333_4.getChildren().push(this.__P_333_5);

        // test for the model
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[0].getChildren()[0].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[0].getChildren()[0].getChildren()[0].getLabel(), "Third node has a wrong name");
      },
      testBig: function testBig() {
        // build up the model instances
        var aa = new qx.test.TreeNode();
        aa.setName("aa");
        var bb = new qx.test.TreeNode();
        bb.setName("bb");
        var cc = new qx.test.TreeNode();
        cc.setName("cc");
        var bbb = new qx.test.TreeNode();
        bbb.setName("bbb");
        var AA = new qx.test.TreeNode();
        AA.setName("AA");

        // tie the model together
        //          this.__model
        //          /     |      \
        //   this.__a  this.__b  this.__c
        //     /  \        |         |
        //    aa  AA      bb        cc
        //                 |
        //                bbb
        bb.getChildren().push(bbb);
        this.__P_333_4.getChildren().push(bb);
        this.__P_333_3.getChildren().push(aa, AA);
        this.__P_333_5.getChildren().push(cc);

        // check the initial Labels
        // root layer
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");

        // first layer
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "a node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "b node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "c node has a wrong name");

        // second layer
        this.assertEquals("aa", this.__P_333_0.getRoot().getChildren()[0].getChildren()[0].getLabel(), "aa node has a wrong name");
        this.assertEquals("AA", this.__P_333_0.getRoot().getChildren()[0].getChildren()[1].getLabel(), "AA node has a wrong name");
        this.assertEquals("bb", this.__P_333_0.getRoot().getChildren()[1].getChildren()[0].getLabel(), "bb node has a wrong name");
        this.assertEquals("cc", this.__P_333_0.getRoot().getChildren()[2].getChildren()[0].getLabel(), "cc node has a wrong name");

        // third layer
        this.assertEquals("bbb", this.__P_333_0.getRoot().getChildren()[1].getChildren()[0].getChildren()[0].getLabel(), "bbb node has a wrong name");
      },
      testChildReverse: function testChildReverse() {
        // reverse the children
        this.__P_333_1.getChildren().reverse();
        // check the labels
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "Third node has a wrong name");
      },
      testChangeChildPath: function testChangeChildPath() {
        // change the child path
        this.__P_333_2.setChildPath("altChildren");
        // check the labels
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testChangeTarget: function testChangeTarget() {
        // create a new tree
        var tree = new qx.ui.tree.Tree();

        // set the new tree as target
        this.__P_333_2.setTarget(tree);

        // check the new folders
        this.assertEquals("a", tree.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", tree.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", tree.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // check if the old tree is empty
        this.assertNull(this.__P_333_0.getRoot(), "Former tree is not empty.");
        tree.dispose();
      },
      testChangeModel: function testChangeModel() {
        // create a new model
        //     this.__model
        //        /    \
        // this.__a  this.__b
        var model = new qx.test.TreeNode();
        var a = new qx.test.TreeNode();
        a.setName("A");
        var b = new qx.test.TreeNode();
        b.setName("B");
        model.getChildren().push(a, b);

        // set the new model
        this.__P_333_2.setModel(model);

        // check the folders
        this.assertEquals("A", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("B", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.__P_333_2.setModel(null);
        model.dispose();
      },
      testIconPath: function testIconPath() {
        this.assertEquals(null, this.__P_333_0.getRoot().getIcon(), "Root node has a wrong icon");
        this.assertEquals("icon a", this.__P_333_0.getRoot().getChildren()[0].getIcon(), "First node has a wrong icon");
        this.assertEquals("icon b", this.__P_333_0.getRoot().getChildren()[1].getIcon(), "Second node has a wrong icon");
        this.assertEquals("icon c", this.__P_333_0.getRoot().getChildren()[2].getIcon(), "Third node has a wrong icon");
      },
      testIconPathChange: function testIconPathChange() {
        // change the icon path
        this.__P_333_2.setIconPath("icon2");

        // test the binding
        this.assertEquals(null, this.__P_333_0.getRoot().getIcon(), "Root node has a wrong icon");
        this.assertEquals("icon a2", this.__P_333_0.getRoot().getChildren()[0].getIcon(), "First node has a wrong icon");
        this.assertEquals("icon b2", this.__P_333_0.getRoot().getChildren()[1].getIcon(), "Second node has a wrong icon");
        this.assertEquals("icon c2", this.__P_333_0.getRoot().getChildren()[2].getIcon(), "Third node has a wrong icon");
      },
      testIconChange: function testIconChange() {
        // change the icon values
        this.__P_333_1.setIcon("AFFE");
        this.__P_333_3.setIcon("ICON A");
        this.__P_333_4.setIcon("ICON B");
        this.__P_333_5.setIcon("ICON C");

        // test the new icon values
        this.assertEquals("AFFE", this.__P_333_0.getRoot().getIcon(), "Root node has a wrong icon");
        this.assertEquals("ICON A", this.__P_333_0.getRoot().getChildren()[0].getIcon(), "First node has a wrong icon");
        this.assertEquals("ICON B", this.__P_333_0.getRoot().getChildren()[1].getIcon(), "Second node has a wrong icon");
        this.assertEquals("ICON C", this.__P_333_0.getRoot().getChildren()[2].getIcon(), "Third node has a wrong icon");
      },
      testSelection: function testSelection() {
        // open the tree so that the selection can be done
        this.__P_333_0.getRoot().setOpen(true);
        // select the first object
        this.__P_333_0.addToSelection(this.__P_333_0.getRoot().getChildren()[0]);
        // test the selection
        this.assertEquals(this.__P_333_3, this.__P_333_2.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_333_2.getSelection().length, "Selection length is wrong.");

        // select the second object
        this.__P_333_0.addToSelection(this.__P_333_0.getRoot().getChildren()[1]);
        // test the selection
        this.assertEquals(this.__P_333_4, this.__P_333_2.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_333_2.getSelection().length, "Selection length is wrong.");
      },
      testSelectionBackMultiple: function testSelectionBackMultiple() {
        // open the tree so that the selection can be done
        this.__P_333_0.getRoot().setOpen(true);
        // select the second and third object
        this.__P_333_0.setSelectionMode("multi");

        // add the some elements to the selection
        this.__P_333_2.getSelection().push(this.__P_333_3);
        this.__P_333_2.getSelection().push(this.__P_333_4);

        // test the selection
        this.assertEquals(this.__P_333_3, this.__P_333_2.getSelection().getItem(0), "Add to selection does not work.");
        this.assertEquals(this.__P_333_4, this.__P_333_2.getSelection().getItem(1), "Add to selection does not work.");
      },
      testSelectionAfterDelete: function testSelectionAfterDelete() {
        // open the tree so that the selection can be done
        this.__P_333_0.getRoot().setOpen(true);

        // add c to the selection
        this.__P_333_2.getSelection().push(this.__P_333_5);
        // remove the c node
        var temp = this.__P_333_1.getChildren().splice(2, 1);
        temp.setAutoDisposeItems(true);
        temp.dispose();
        // check if the selection is empty
        this.assertEquals(0, this.__P_333_2.getSelection().length, "Remove from selection does not work!");

        // add b to the selection
        this.__P_333_2.getSelection().push(this.__P_333_4);

        // remove the first element of the controller 'this.__a'
        temp = this.__P_333_1.getChildren().shift();
        temp.dispose();

        // check if the selected item in the list is "b"
        this.assertTrue(this.__P_333_2.getSelection().contains(this.__P_333_4), "Selection array wrong!");
        this.assertEquals("b", this.__P_333_0.getSelection()[0].getLabel(), "Remove from selection does not work!");
      },
      testSelectInvisible: function testSelectInvisible() {
        // add c to the selection
        this.__P_333_2.getSelection().push(this.__P_333_5);

        // check if the selection worked
        this.assertEquals(1, this.__P_333_2.getSelection().length, "Adding of an non visible element should not work.");
      },
      testLabelOptions: function testLabelOptions() {
        // create the options
        var options = {
          converter: function converter(data, model) {
            return data + model.getName2();
          }
        };

        // create the controller
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, "children", "name");
        this.__P_333_2.setLabelOptions(options);

        // test the converter
        this.assertEquals("rootroot2", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("aa2", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("bb2", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("cc2", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testIconOptions: function testIconOptions() {
        // create the options
        var options = {
          converter: function converter(data, model) {
            if (data != null) {
              return data + model.getName();
            }
            return null;
          }
        };

        // create the controller
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, "children", "name");
        this.__P_333_2.setIconPath("icon");
        this.__P_333_2.setIconOptions(options);

        // test the converter
        this.assertNull(this.__P_333_0.getRoot().getIcon(), "Root node has a wrong icon");
        this.assertEquals("icon aa", this.__P_333_0.getRoot().getChildren()[0].getIcon(), "First node has a wrong icon");
        this.assertEquals("icon bb", this.__P_333_0.getRoot().getChildren()[1].getIcon(), "Second node has a wrong icon");
        this.assertEquals("icon cc", this.__P_333_0.getRoot().getChildren()[2].getIcon(), "Third node has a wrong icon");
      },
      testItemWithoutChildren: function testItemWithoutChildren() {
        // create new Object
        qx.Class.define("qx.test.TreeEndNode", {
          extend: qx.core.Object,
          properties: {
            name: {
              check: "String",
              init: "root",
              event: "changeName"
            },
            icon: {
              check: "String",
              event: "changeIcon",
              nullable: true
            }
          }
        });
        var endNode = new qx.test.TreeEndNode();
        endNode.setName("ENDE");
        this.__P_333_1.getChildren().push(endNode);
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
        this.assertEquals("ENDE", this.__P_333_0.getRoot().getChildren()[3].getLabel(), "Fourth node has a wrong name");
      },
      testSetLateModel: function testSetLateModel() {
        this.__P_333_2.dispose();
        // create the controller
        this.__P_333_2 = new qx.data.controller.Tree(null, this.__P_333_0, "children", "name");
        this.__P_333_2.setModel(this.__P_333_1);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testSetLateTarget: function testSetLateTarget() {
        this.__P_333_2.dispose();
        // create the controller
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, null, "children", "name");
        this.__P_333_2.setTarget(this.__P_333_0);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testSetLateTargetAndModel: function testSetLateTargetAndModel() {
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(null, null, "children", "name");
        this.__P_333_2.setTarget(this.__P_333_0);
        this.__P_333_2.setModel(this.__P_333_1);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // redo the test and set the modeln and target in different order
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(null, null, "children", "name");
        this.__P_333_2.setModel(this.__P_333_1);
        this.__P_333_2.setTarget(this.__P_333_0);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testSetLateChildPath: function testSetLateChildPath() {
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, null, "name");
        this.__P_333_2.setChildPath("children");

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testSetLateLabelPath: function testSetLateLabelPath() {
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, "children");
        this.__P_333_2.setLabelPath("name");

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testSetLateAll: function testSetLateAll() {
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree();

        // set the needed properties
        this.__P_333_2.setLabelPath("name");
        this.__P_333_2.setChildPath("children");
        this.__P_333_2.setModel(this.__P_333_1);
        this.__P_333_2.setTarget(this.__P_333_0);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testDelegateConfigure: function testDelegateConfigure() {
        // create the delegate
        var delegate = new qx.core.Object();
        delegate.configureItem = function (item) {
          item.setUserData("a", true);
        };
        this.__P_333_2.setDelegate(delegate);

        // check the initial Labels
        this.assertTrue(this.__P_333_0.getRoot().getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[0].getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[1].getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[2].getUserData("a"), "Delegation not working.");
        this.__P_333_2.setDelegate(null);
        delegate.dispose();
      },
      testDelegateConfigureLate: function testDelegateConfigureLate() {
        // clear up the setup
        this.__P_333_2.dispose();
        var controller = new qx.data.controller.Tree(null, this.__P_333_0, "children", "name");
        var delegate = {
          configureItem: function configureItem(item) {
            item.setUserData("a", true);
          }
        };
        controller.setDelegate(delegate);
        controller.setModel(this.__P_333_1);

        // check the initial Labels
        this.assertTrue(this.__P_333_0.getRoot().getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[0].getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[1].getUserData("a"), "Delegation not working.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[2].getUserData("a"), "Delegation not working.");
        controller.dispose();
      },
      testDelegateCreateLate: function testDelegateCreateLate() {
        var delegate = {
          createItem: function createItem() {
            var folder = new qx.ui.tree.TreeFolder();
            folder.setUserData("my", true);
            return folder;
          }
        };
        this.__P_333_2.setDelegate(delegate);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // check if the folders are the self created folders
        this.assertTrue(this.__P_333_0.getRoot().getUserData("my"), "Default folders found.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[0].getUserData("my"), "Default folders found.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[1].getUserData("my"), "Default folders found.");
        this.assertTrue(this.__P_333_0.getRoot().getChildren()[2].getUserData("my"), "Default folders found.");
      },
      testDelegateCreateFirst: function testDelegateCreateFirst() {
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree();
        var delegate = {
          createItem: function createItem() {
            var folder = new qx.ui.tree.TreeFolder();
            folder.setUserData("my", true);
            return folder;
          }
        };
        var tree = new qx.ui.tree.Tree();
        this.__P_333_2.setDelegate(delegate);
        this.__P_333_2.setChildPath("children");
        this.__P_333_2.setLabelPath("name");
        this.__P_333_2.setModel(this.__P_333_1);
        this.__P_333_2.setTarget(tree);

        // check the initial Labels
        this.assertEquals("root", tree.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", tree.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", tree.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", tree.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // check if the folders are the self created folders
        this.assertTrue(tree.getRoot().getUserData("my"), "Default folders found.");
        this.assertTrue(tree.getRoot().getChildren()[0].getUserData("my"), "Default folders found.");
        this.assertTrue(tree.getRoot().getChildren()[1].getUserData("my"), "Default folders found.");
        this.assertTrue(tree.getRoot().getChildren()[2].getUserData("my"), "Default folders found.");
        tree.destroy();
      },
      testDelegateBindLate: function testDelegateBindLate() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
            controller.bindProperty("color", "textColor", null, item, id);
          }
        };
        this.__P_333_2.setDelegate(delegate);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // check the names
        this.assertEquals("green", this.__P_333_0.getRoot().getTextColor(), "Root node has a wrong name");
        this.assertEquals("red", this.__P_333_0.getRoot().getChildren()[0].getTextColor(), "First node has a wrong name");
        this.assertEquals("blue", this.__P_333_0.getRoot().getChildren()[1].getTextColor(), "Second node has a wrong name");
        this.assertEquals("white", this.__P_333_0.getRoot().getChildren()[2].getTextColor(), "Third node has a wrong name");
        this.__P_333_1.setColor("black");
        this.assertEquals("black", this.__P_333_0.getRoot().getTextColor(), "Root node has a wrong name");
      },
      testDelegateBindFirst: function testDelegateBindFirst() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
            controller.bindProperty("color", "textColor", null, item, id);
          }
        };
        var tree = new qx.ui.tree.Tree();
        this.__P_333_2.setDelegate(delegate);
        this.__P_333_2.setChildPath("children");
        this.__P_333_2.setLabelPath("name");
        this.__P_333_2.setModel(this.__P_333_1);
        this.__P_333_2.setTarget(tree);

        // check the initial Labels
        this.assertEquals("root", tree.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", tree.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", tree.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", tree.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");

        // check the names
        this.assertEquals("green", tree.getRoot().getTextColor(), "Root node has a wrong name");
        this.assertEquals("red", tree.getRoot().getChildren()[0].getTextColor(), "First node has a wrong name");
        this.assertEquals("blue", tree.getRoot().getChildren()[1].getTextColor(), "Second node has a wrong name");
        this.assertEquals("white", tree.getRoot().getChildren()[2].getTextColor(), "Third node has a wrong name");
        this.__P_333_1.setColor("black");
        this.assertEquals("black", tree.getRoot().getTextColor(), "Root node has a wrong name");
        tree.dispose();
      },
      testDelegateBindPropertyReverse: function testDelegateBindPropertyReverse() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindProperty("name", "appearance", null, item, id);
            controller.bindPropertyReverse("name", "appearance", null, item, id);
            controller.bindPropertyReverse("color", "backgroundColor", null, item, id);
          }
        };
        this.__P_333_2.setDelegate(delegate);

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getAppearance(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getAppearance(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getAppearance(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getAppearance(), "Third node has a wrong name");

        // check the reverse binding
        this.__P_333_0.getRoot().setAppearance("ROOT");
        this.assertEquals("ROOT", this.__P_333_1.getName(), "Reverse binding not ok!");
        this.__P_333_0.getRoot().getChildren()[0].setBackgroundColor("#123456");
        this.assertEquals("#123456", this.__P_333_3.getColor(), "Reverse binding not ok!");

        // invoke a removing and setting of the bindings with the new bindItem
        delegate.bindItem = function (controller, item, id) {
          controller.bindProperty("name", "appearance", null, item, id);
        };
        this.__P_333_2.setDelegate(null);
        this.__P_333_2.setDelegate(delegate);
        this.__P_333_0.getRoot().setAppearance("123");
        this.assertEquals("ROOT", this.__P_333_1.getName(), "Removing not ok");
        this.__P_333_0.getRoot().getChildren()[0].setBackgroundColor("#654321");
        this.assertEquals("#123456", this.__P_333_3.getColor(), "Removing not ok");
      },
      testDelegateAddItem: function testDelegateAddItem() {
        var a = new qx.test.TreeNode();
        a.setName("new");
        // set a delegate
        this.__P_333_2.setDelegate({
          createItem: function createItem() {
            return new qx.ui.tree.TreeFolder();
          }
        });

        // flush the dispose queue
        qx.ui.core.queue.Dispose.flush();
        // add the new model
        this.__P_333_1.getChildren().push(a);
      },
      testResetModel: function testResetModel() {
        this.__P_333_2.resetModel();
        this.assertNull(this.__P_333_0.getRoot(), "Tree is not empty.");
      },
      testChangeChildrenArray: function testChangeChildrenArray() {
        // create the new children array
        var children = new qx.data.Array();
        var a = new qx.test.TreeNode();
        a.setName("new");
        children.push(a);
        var oldChildren = this.__P_333_3.getChildren();

        // change the children array
        //        this.__model
        //        /    |      \
        // this.__a  this.__b  this.__c
        //    |
        //   a
        this.__P_333_3.setChildren(children);
        oldChildren.dispose();

        // Test if the tree nodes exist
        this.assertNotUndefined(this.__P_333_0.getRoot(), "Root node does not exist");
        this.assertNotUndefined(this.__P_333_0.getRoot().getChildren()[0], "First node does not exist");
        this.assertNotUndefined(this.__P_333_0.getRoot().getChildren()[0].getChildren()[0], "New node does not exist");

        // test if its the proper node
        this.assertEquals("new", this.__P_333_0.getRoot().getChildren()[0].getChildren()[0].getLabel());
      },
      testInheritedChildren: function testInheritedChildren() {
        qx.Class.define("qx.test.MyTreeNode", {
          extend: qx.test.TreeNode
        });

        // init (copy of setUp)
        this.__P_333_0.dispose();
        this.__P_333_1.dispose();
        this.__P_333_3.dispose();
        this.__P_333_4.dispose();
        this.__P_333_5.dispose();
        this.__P_333_0 = new qx.ui.tree.Tree();

        // create a model
        //        this.__model
        //        /    |      \
        // this.__a  this.__b  this.__c
        this.__P_333_1 = new qx.test.MyTreeNode();
        this.__P_333_3 = new qx.test.MyTreeNode();
        this.__P_333_3.set({
          name: "a",
          name2: "a2",
          icon: "icon a",
          icon2: "icon a2",
          color: "red"
        });
        this.__P_333_4 = new qx.test.MyTreeNode();
        this.__P_333_4.set({
          name: "b",
          name2: "b2",
          icon: "icon b",
          icon2: "icon b2",
          color: "blue"
        });
        this.__P_333_5 = new qx.test.MyTreeNode();
        this.__P_333_5.set({
          name: "c",
          name2: "c2",
          icon: "icon c",
          icon2: "icon c2",
          color: "white"
        });
        this.__P_333_1.getChildren().push(this.__P_333_3, this.__P_333_4, this.__P_333_5);
        this.__P_333_1.getAltChildren().push(this.__P_333_5, this.__P_333_4, this.__P_333_3);

        // create the controller
        this.__P_333_2.dispose();
        this.__P_333_2 = new qx.data.controller.Tree(this.__P_333_1, this.__P_333_0, "children", "name");

        // check the initial Labels
        this.assertEquals("root", this.__P_333_0.getRoot().getLabel(), "Root node has a wrong name");
        this.assertEquals("a", this.__P_333_0.getRoot().getChildren()[0].getLabel(), "First node has a wrong name");
        this.assertEquals("b", this.__P_333_0.getRoot().getChildren()[1].getLabel(), "Second node has a wrong name");
        this.assertEquals("c", this.__P_333_0.getRoot().getChildren()[2].getLabel(), "Third node has a wrong name");
      },
      testRemoveEvents: function testRemoveEvents() {
        // BUG #3566

        var nodes = [];
        for (var i = 0; i < 50; ++i) {
          nodes[i] = new qx.test.TreeNode();
          if (i != 0) {
            nodes[parseInt(Math.random() * i, 10)].getChildren().push(nodes[i]);
          }
        }
        var tree = new qx.ui.tree.Tree();
        var controller = new qx.data.controller.Tree(nodes[0], tree, "children", "name");
        for (var i = 0; i < nodes.length; ++i) {
          nodes[i].getChildren().removeAll(); // THIS THROWS AN EXCEPTION ON 2ND ELEMENT...
        }
        controller.dispose();
        tree.dispose();
        for (var i = 0; i < nodes.length; ++i) {
          nodes[i].dispose();
        }
      },
      testBindItemDouble: function testBindItemDouble() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindProperty("color", "textColor", null, item, id);
            controller.bindProperty("color", "textColor", null, item, id);
          }
        };
        var self = this;
        this.assertException(function () {
          self.__P_333_2.setDelegate(delegate);
        }, Error, /textColor/.g);
      },
      testBindItemDoubleReverse: function testBindItemDoubleReverse() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindPropertyReverse("color", "textColor", null, item, id);
            controller.bindPropertyReverse("color", "textColor", null, item, id);
          }
        };
        var self = this;
        this.assertException(function () {
          self.__P_333_2.setDelegate(delegate);
        }, Error, /textColor/.g);
      }
    }
  });
  qx.test.data.controller.Tree.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tree.js.map?dt=1717235388478