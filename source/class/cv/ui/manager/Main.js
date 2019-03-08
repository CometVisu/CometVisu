/**
 * Main class of the CometVisu file manager.
 * @author Tobias Bräutigam
 * @since 0.12.0
 */
qx.Class.define('cv.ui.manager.Main', {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._draw();
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __root: null,
    _pane: null,
    _tree: null,
    _stack: null,
    _editor: null,

    __getRoot: function () {
      if (!this.__root) {
        this.__root = qx.dom.Element.create('div', {
          id: 'manager',
          style: 'position: absolute; top: 0; left: 0; right: 0; bottom: 0;'
        });
        qx.dom.Element.insertEnd(this.__root, document.body);
        qx.theme.manager.Meta.getInstance().setTheme(cv.theme.Dark);
      }
      return this.__root;
    },

    // overridden
    _draw: function () {

      var root = new qx.ui.root.Inline(this.__getRoot(), true, true);
      root.setLayout(new qx.ui.layout.Dock());

      this._pane = new qx.ui.splitpane.Pane();
      root.add(this._pane, {edge: 'center'});

      var rootFolder = new cv.ui.manager.model.FileItem('config', '.');
      this._tree = new qx.ui.tree.VirtualTree(rootFolder, 'name', 'children');
      rootFolder.load();
      this._tree.set({
        selectionMode: 'one',
        hideRoot: false,
        minWidth: 300
      });
      this._tree.setDelegate({
        // Bind properties from the item to the tree-widget and vice versa
        bindItem : function(controller, item, index) {
          controller.bindDefaultProperties(item, index);
          controller.bindPropertyReverse("open", "open", null, item, index);
          controller.bindProperty("open", "open", null, item, index);
          controller.bindProperty("icon", "icon", null, item, index);
        }
      });
      this._pane.add(this._tree, 0);
      this._tree.openNode(rootFolder);
      console.log(this._tree);

      this._stack = new qx.ui.container.Stack();
      this._pane.add(this._stack, 1);

      this._editor = new qx.ui.core.Widget();
      this._editor._setLayout(new qx.ui.layout.Grow());
      this._editor._add(new qx.ui.basic.Label('Hello world'));
      this._stack.add(this._editor);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('__root', '_pane', '_tree', '_stack', 'editor');
  },

  defer: function(statics) {
    // initialize on load
    statics.getInstance();
  }
});
