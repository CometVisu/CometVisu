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
    this.__initCommands();
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
    _menuBar: null,
    _oldCommandGroup: null,

    _onChangeSelection: function () {
      var sel = this._tree.getSelection();
      if (sel.length > 0) {
        var node = sel.getItem(0);
        if (node.getType() === 'file') {
          this._editor.setFile(node);
        }
      }
    },

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

    __initCommands: function () {
      var group = new qx.ui.command.Group();
      group.add('save', new qx.ui.command.Command('Ctrl+S'));
      group.add('save-as', new qx.ui.command.Command('Ctrl+Shift+S'));
      group.add('close', new qx.ui.command.Command('Ctrl+X'));
      group.add('new-file', new qx.ui.command.Command('Ctrl+N'));
      group.add('new-folder', new qx.ui.command.Command('Ctrl+Shift+N'));
      group.add('quit', new qx.ui.command.Command('Ctrl+Q'));

      var manager = qx.core.Init.getApplication().getCommandManager();
      this._oldCommandGroup = manager.getActive();
      manager.add(group);
      manager.setActive(group);

      group.get('quit').addListener('execute', this.dispose, this);
    },

    // overridden
    _draw: function () {

      var root = new qx.ui.root.Inline(this.__getRoot(), true, true);
      qx.core.Init.getApplication().setRoot(root);
      root.setLayout(new qx.ui.layout.Canvas());

      var main = new qx.ui.container.Composite(new qx.ui.layout.Dock());
      root.add(main, {edge: 0});

      this._pane = new qx.ui.splitpane.Pane();
      main.add(this._pane, {edge: 'center'});

      var rootFolder = new cv.ui.manager.model.FileItem('.');
      this._tree = new qx.ui.tree.VirtualTree(rootFolder, 'name', 'children');
      rootFolder.load(function () {
        this._tree.setHideRoot(true);
      }, this);
      this._tree.set({
        selectionMode: 'one',
        minWidth: 300,
        openMode: 'tap'
      });
      this._tree.setDelegate({
        // Bind properties from the item to the tree-widget and vice versa
        bindItem : function(controller, item, index) {
          controller.bindDefaultProperties(item, index);
          controller.bindPropertyReverse("open", "open", null, item, index);
          controller.bindProperty("open", "open", null, item, index);
          controller.bindProperty("readable", "enabled", null, item, index);
          controller.bindProperty("icon", "icon", null, item, index);
        }
      });
      this._pane.add(this._tree, 0);
      this._tree.openNode(rootFolder);
      this._tree.getSelection().addListener("change", this._onChangeSelection, this);

      this._stack = new qx.ui.container.Stack();
      this._pane.add(this._stack, 1);

      this._editor = new cv.ui.manager.Editor();
      this._stack.add(this._editor);

      // menu on top
      this._menuBar = new cv.ui.manager.MenuBar();
      main.add(this._menuBar, {edge: 'north'});
      this._menuBar.addListener('save', this._editor.save, this._editor);
      this._editor.bind('saveable', this._menuBar.getChildControl('save-button'), 'enabled');
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects(
      '_pane', '_tree', '_stack', 'editor', '_menuBar'
    );
    // restore former command group
    var application = qx.core.Init.getApplication();
    var manager = application.getCommandManager();
    manager.setActive(this._oldCommandGroup);
    this._oldCommandGroup = null;

    // defer the reset to let the dispose queue to be emptied before removing the root
    new qx.util.DeferredCall(function () {
      application.resetRoot();
    }).schedule();

    document.body.removeChild(this.__root);
    this.__root = null;
  },

  defer: function(statics) {
    // initialize on load
    statics.getInstance();
  }
});
