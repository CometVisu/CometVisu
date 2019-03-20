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
  implement: cv.ui.manager.IActionHandler,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.initOpenFiles(new qx.data.Array());
    this.__actionDispatcher = cv.ui.manager.control.ActionDispatcher.getInstance();
    this.__actionDispatcher.setMain(this);
    this.__initCommands();
    this._draw();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    __editors: {},

    // use this one when no one else fits
    __defaultEditor: {
      Clazz: cv.ui.manager.editor.Source,
      instance: null
    },

    _configEditors: {
      xml: {
        Clazz: cv.ui.manager.editor.Xml,
        instance: null,
        preview: false
      },
      source: this.__defaultEditor
    },

    /**
     * Registers an editor for a specific file, that is identified by the given selector.
     * @param selector {String} filename-/path or regular expression.
     * @param clazz {qx.ui.core.Widget} widget class that handles those type of files
     */
    registerFileEditor: function (selector, clazz) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertTrue(qx.Interface.classImplements(clazz, cv.ui.manager.editor.IEditor));
      }
      this.__editors[selector] = {
        Clazz: clazz,
        instance: null,
        regex: selector.startsWith('/') && selector.endsWith('/') ? new RegExp(selector.substring(1, selector.length-1)) : null
      };
    },

    getFileEditor: function (file) {
      var found = null;
      if (file.isConfigFile()) {
        found = this._configEditors[cv.ui.manager.model.Preferences.getInstance().getDefaultConfigEditor()];
      }
      if (!found) {
        Object.keys(this.__editors).some(function (key) {
          if ((key.regex && key.regex.test(file.getFullPath())) || key === file.getFullPath()) {
            found = this.__editors[key];
            return true;
          }
        }, this);
      }
      return found || this.__defaultEditor;
    }
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
    },

    /**
     * Current selected folder (if a file is selected its parent folder) is writeable.
     */
    writeableFolder: {
      check: 'Boolean',
      init: false,
      event: 'changeWriteableFolder'
    },

    currentFolder: {
      check: 'cv.ui.manager.model.FileItem',
      nullable: true,
      apply: '_applyCurrentFolder'
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
    _menuBar: null,
    _oldCommandGroup: null,
    _mainContent: null,
    _openFilesController: null,
    _hiddenConfigFakeFile: null,
    __actionDispatcher: null,

    canHandleAction: function (actionName) {
      return ['close', 'quit', 'hidden-config', 'new-file', 'new-folder'].includes(actionName);
    },

    handleAction: function (actionName) {
      switch (actionName) {
        case 'hidden-config':
          this._onOpenHiddenConfig();
          break;

        case 'close':
          this.closeCurrentFile();
          break;

        case 'quit':
          this.dispose();
          break;

        case 'new-file':
          this._onCreateFile();
          break;

        case 'new-folder':
          this._onCreateFolder();
          break;

        default:
          this.warn(actionName + ' handling is not implemented yet!');
          break;
      }
    },

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
          this.setCurrentFolder(node.getParent());
        } else {
          this.setCurrentFolder(node);
        }
      } else {
        this.resetWriteableFolder();
      }
    },

    _applyCurrentFolder: function (value, old) {
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        value.bind('writeable', this, 'writeableFolder');
      }
    },

    _onChangeFileSelection: function () {
      var sel = this._openFilesController.getSelection();
      if (sel.length > 0) {
        var node = sel.getItem(0);
        if (node.getType() === 'file') {
          var editorConfig = cv.ui.manager.Main.getFileEditor(node);
          if (!editorConfig.instance) {
            editorConfig.instance = new editorConfig.Clazz();
            this._stack.add(editorConfig.instance);
          } else {
            this._stack.setSelection([editorConfig.instance]);
          }
          editorConfig.instance.setFile(node);
          this.__actionDispatcher.setFocusedWidget(editorConfig.instance);
        }
      }
    },

    openFile: function (file, preview) {
      var openFiles = this.getOpenFiles();
      var isOpen = openFiles.includes(file);
      if (preview === true) {
        if (!file.isPermanent()) {
          if (this.__previewFileIndex !== null && !openFiles.getItem(this.__previewFileIndex).isPermanent()) {
            openFiles.setItem(this.__previewFileIndex, file);
          } else {
            this.__previewFileIndex = openFiles.length;
            openFiles.push(file);
          }
        }
        // do not 'downgrade' the permanent state
        if (!file.isPermanent()) {
          file.setPermanent(false);
        }
      } else {
        if (!isOpen && (this.__previewFileIndex === null || openFiles.indexOf(file) !== this.__previewFileIndex)) {
          openFiles.push(file);
        }
        file.setPermanent(true);
        this.__previewFileIndex = null;
      }
      this._openFilesController.getTarget().setModelSelection([file]);
    },

    closeFile: function (file) {
      file.resetPermanent();
      this.getOpenFiles().remove(file);
      if (this.getOpenFiles().length === 0) {
        this._stack.resetSelection();
        this.__actionDispatcher.resetFocusedWidget();
        this.__previewFileIndex = null;
      }

      // close textmodel in monaci editor if exists
      var oldModel = window.monaco.editor.getModel(file.getUri());
      if (oldModel) {
        oldModel.dispose();
      }
    },

    closeCurrentFile: function () {
      var selected = this._openFilesController.getSelection().length > 0 ? this._openFilesController.getSelection().getItem(0) : null;
      if (selected) {
        this.closeFile(selected);
      }
    },

    _onCloseFile: function (ev) {
      this.closeFile(ev.getData());
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
      // this command will close the browser window, thats not what we want
      // group.add('close', new qx.ui.command.Command('Ctrl+W'));
      group.add('new-file', new qx.ui.command.Command('Ctrl+N'));
      group.add('new-folder', new qx.ui.command.Command('Ctrl+Shift+N'));
      group.add('quit', new qx.ui.command.Command('Ctrl+Q'));

      // edit commands (adding cut/copy/paste command will deactive the native browser functions)
      // and as we cannot simulate pasting from clipboard, we do not use them here
      // group.add('cut', new qx.ui.command.Command('Ctrl+X'));
      // group.add('copy', new qx.ui.command.Command('Ctrl+C'));
      // group.add('paste', new qx.ui.command.Command('Ctrl+V'));

      var manager = qx.core.Init.getApplication().getCommandManager();
      this._oldCommandGroup = manager.getActive();
      manager.add(group);
      manager.setActive(group);
    },

    _onOpenHiddenConfig: function () {
      if (!this._hiddenConfigFakeFile) {
        this._hiddenConfigFakeFile = new cv.ui.manager.model.FileItem('hidden.php').set({
          hasChildren: false,
          parentFolder: "",
          parent: this._tree.getModel(),
          readable: true,
          writeable: true,
          overrideIcon: true,
          icon: '@MaterialIcons/settings/15',
          type: "file"
        });
      }
      if (this.getOpenFiles().includes(this._hiddenConfigFakeFile)) {
        this.closeFile(this._hiddenConfigFakeFile);
      } else {
        this.openFile(this._hiddenConfigFakeFile, false);
      }
    },

    _onCreateFile: function () {
      this._onCreate('file');
    },

    _onCreateFolder: function () {
      this._onCreate('dir');
    },

    _onCreate: function (type) {
      var currentFolder = this.getCurrentFolder();
      if (!currentFolder) {
        return;
      }
      var folderItem = new cv.ui.manager.model.FileItem('', currentFolder.getPath(), currentFolder);
      folderItem.set({
        type: type,
        readable: true,
        writeable: true,
        loaded: true,
        editing: true,
        modified: true,
        parentFolder: currentFolder.getFullPath()
      });
      folderItem.setUserData('new', true);
      currentFolder.addChild(folderItem);
      currentFolder.sortElements();
      this._tree.refresh();

      folderItem.addListenerOnce('editing', function (ev) {
        // TODO: save the changes
        currentFolder.sortElements();
        this._tree.refresh();
      }, this);
    },

    // overridden
    _draw: function () {

      var root = new qx.ui.root.Inline(this.__getRoot(), true, true);
      qx.core.Init.getApplication().setRoot(root);
      root.setLayout(new qx.ui.layout.Canvas());

      var snackbar = cv.ui.manager.snackbar.Controller.getInstance();
      root.add(snackbar, {
        bottom: 10,
        left: 200
      });

      function resize() {
        var bounds = root.getBounds();
        snackbar.setLayoutProperties({
          bottom: 10,
          left: Math.round(bounds.width / 2) - 150
        });
        snackbar.setMaxHeight(bounds.height - 40);
      }
      root.addListener('resize', resize, this);
      root.addListener('appear', resize, this);

      var main = new qx.ui.container.Composite(new qx.ui.layout.Dock());
      root.add(main, {edge: 0});
      // menu on top
      this._menuBar = new cv.ui.manager.MenuBar();
      main.add(this._menuBar, {edge: 'north'});

      this._pane = new qx.ui.splitpane.Pane();
      main.add(this._pane, {edge: 'center'});

      var rootFolder = new cv.ui.manager.model.FileItem('.');
      // TODO: needs to be verified by the backend
      rootFolder.set({
        writeable: true,
        readable: true,
        open: true
      });
      this._tree = new qx.ui.tree.VirtualTree(rootFolder, 'name', 'children');
      rootFolder.load(function () {
        this._tree.setHideRoot(true);
      }, this);
      this._tree.set({
        selectionMode: 'single',
        minWidth: 250,
        openMode: 'tap'
      });
      this._tree.setDelegate({
        createItem: function () {
          var item = new cv.ui.manager.tree.VirtualFsItem();
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
          controller.bindProperty("editing", "editing", null, item, index);
        }
      });
      this._tree.getSelection().addListener("change", this._onChangeTreeSelection, this);

      // left container
      var leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // left toobar
      var leftBar = new qx.ui.toolbar.ToolBar();
      var buttonConfig = this._menuBar.getButtonConfiguration();
      var newFile = new qx.ui.toolbar.Button(null, buttonConfig['new-file'].args[1].replace(/\/[0-9]+$/, '/15'), buttonConfig['new-file'].args[2]);
      newFile.setToolTipText(buttonConfig['new-file'].args[0]);
      // newFile.addListener('execute', this._onCreateFile, this);

      this.bind('writeableFolder', buttonConfig['new-file'].args[2], 'enabled');
      var newFolder = new qx.ui.toolbar.Button(null, buttonConfig['new-folder'].args[1].replace(/\/[0-9]+$/, '/15'), buttonConfig['new-folder'].args[2]);
      newFolder.setToolTipText(buttonConfig['new-folder'].args[0]);
      // newFolder.addListener('execute', this._onCreateFolder, this);
      this.bind('writeableFolder', buttonConfig['new-folder'].args[2], 'enabled');

      var reload = new qx.ui.toolbar.Button(null, '@MaterialIcons/sync/15');
      reload.setToolTipText(qx.locale.Manager.tr('Reload'));
      reload.addListener('execute', function () {
        rootFolder.reload(function () {
          rootFolder.setOpen(true);
          this._tree.refresh();
        }, this);
      }, this);

      var createPart = new qx.ui.toolbar.Part();
      createPart.set({
        marginLeft: 0
      });
      createPart.add(newFile);
      createPart.add(newFolder);
      leftBar.add(createPart);

      leftBar.add(new qx.ui.core.Spacer(), {flex: 1});
      leftBar.add(reload);

      leftContainer.add(leftBar);
      leftContainer.add(this._tree, {flex: 1});
      this._pane.add(leftContainer, 0);

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
          var item = new cv.ui.manager.form.FileTabItem();
          item.addListener('close', this._onCloseFile, this);
          return item;
        }.bind(this),

        bindItem: function (controller, item, index) {
          controller.bindDefaultProperties(item, index);
          controller.bindProperty('permanent', 'permanent', null, item, index);
          controller.bindProperty('modified', 'modified', null, item, index);
        }
      });
      list.addListener('changeSelection', this._onChangeFileSelection, this);
      this._mainContent.add(list);

      this._stack = new qx.ui.container.Stack();
      this._mainContent.add(this._stack, {flex: 1});
      this._pane.add(this._mainContent, 1);
    },

    getMenuBar: function () {
      return this._menuBar;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects(
      '_pane', '_tree', '_stack', '_menuBar', '_mainContent', '_openFilesController',
      '_hiddenConfigFakeFile'
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

    // cleanup editor instances
    if (cv.ui.manager.Main.__defaultEditor.instance) {
      cv.ui.manager.Main.__defaultEditor.instance.dispose();
      cv.ui.manager.Main.__defaultEditor.instance = null;
    }
    Object.keys(cv.ui.manager.Main.__editors).forEach(function (regex) {
      if (cv.ui.manager.Main.__editors[regex].instance) {
        cv.ui.manager.Main.__editors[regex].instance.dispose();
        cv.ui.manager.Main.__editors[regex].instance = null;
      }
    });
    this.__actionDispatcher = null;
  },

  defer: function(statics) {
    // initialize on load
    statics.getInstance();

    // register special file editors
    statics.registerFileEditor("hidden.php", cv.ui.manager.editor.Config);
  }
});
