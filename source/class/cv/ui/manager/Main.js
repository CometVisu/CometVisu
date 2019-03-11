/**
 * Main class of the CometVisu file manager.
 * @author Tobias Bräutigam
 * @since 0.12.0
 *
 * @asset(manager/*)
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
    this.initOpenFiles(new qx.data.Array());
    this.__initCommands();
    this._draw();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    openFiles: {
      check: 'qx.data.Array',
      deferredInit: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __previewFileIndex: null,
    __root: null,
    _pane: null,
    _tree: null,
    _stack: null,
    _editor: null,
    _menuBar: null,
    _oldCommandGroup: null,
    _mainContent: null,
    _openFilesController: null,

    /**
     * open selected file in preview mode
     * @private
     */
    _onChangeTreeSelection: function () {
     this.__openSelectedFile(true);
    },

    /**
     * Permanantly open file
     * @private
     */
    _onDblTapTreeSelection: function () {
      this.__openSelectedFile(false);
    },

    __openSelectedFile: function (preview) {
      var sel = this._tree.getSelection();
      if (sel.length > 0) {
        var node = sel.getItem(0);
        if (node.getType() === 'file') {
          this.openFile(node, preview);
        }
      }
    },

    _onChangeFileSelection: function () {
      var sel = this._openFilesController.getSelection();
      if (sel.length > 0) {
        var node = sel.getItem(0);
        if (node.getType() === 'file') {
          if (!this._editor) {
            this._editor = new cv.ui.manager.Editor();
            this._menuBar.addListener('save', this._editor.save, this._editor);
            this._editor.bind('saveable', this._menuBar.getChildControl('save-button'), 'enabled');
            this._stack.add(this._editor);
          } else {
            this._stack.setSelection([this._editor]);
          }
          this._editor.setFile(node);
        }
      }
    },

    openFile: function (file, preview) {
      var openFiles = this.getOpenFiles();
      if (preview === true) {
        if (!file.getUserData('permanent')) {
          if (this.__previewFileIndex !== null) {
            openFiles.setItem(this.__previewFileIndex, file);
          } else {
            var length = openFiles.unshift(file);
            this.__previewFileIndex = length - 1;
          }
        }
      } else {
        if (this.__previewFileIndex === null || openFiles.indexOf(file) !== this.__previewFileIndex) {
          openFiles.push(file);
        }
        file.setUserData('permanent', true);
        this.__previewFileIndex = null;
      }
      this._openFilesController.getTarget().setModelSelection([file]);
    },

    _onCloseFile: function (ev) {
      var file = ev.getTarget().getLayoutParent().getModel();
      file.setUserData('permanent', null);
      this.getOpenFiles().remove(file);
      if (this.getOpenFiles().length === 0) {
        this._editor.resetFile();
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
        createItem: function () {
          var item = new qx.ui.tree.VirtualTreeItem();
          item.addListener('dbltap', this._onDblTapTreeSelection, this);
          return item;
        }.bind(this),

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
      this._tree.getSelection().addListener("change", this._onChangeTreeSelection, this);

      this._mainContent = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // tab list
      var list = new qx.ui.form.List(true);
      // list.setAppearance('open-files-tabs');
      list.set({
        decorator: null,
        minHeight: 30,
        height: 30,
        padding: 0
      });
      this._openFilesController = new qx.data.controller.List(this.getOpenFiles(), list, "name");
      this._openFilesController.setDelegate({
        createItem: function () {
          var item = new qx.ui.form.ListItem();
          var icon = item.getChildControl('icon');
          icon.setAnonymous(false);
          icon.setCursor('pointer');
          icon.addListener('tap', this._onCloseFile, this);
          return item;
        }.bind(this),

        configureItem: function (item) {
          item.setAppearance('open-file-item');
        }
      });
      list.addListener('changeSelection', this._onChangeFileSelection, this);
      this._mainContent.add(list);

      this._stack = new qx.ui.container.Stack();
      this._mainContent.add(this._stack, {flex: 1});
      this._pane.add(this._mainContent, 1);

      // menu on top
      this._menuBar = new cv.ui.manager.MenuBar();
      main.add(this._menuBar, {edge: 'north'});
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects(
      '_pane', '_tree', '_stack', 'editor', '_menuBar', '_mainContent', '_openFilesController'
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
