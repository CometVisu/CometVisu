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
  include: [
    cv.ui.manager.control.MFileEventHandler
  ],
  implement: [cv.ui.manager.IActionHandler, cv.ui.manager.control.IFileEventHandler],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._checkEnvironment();
    this.initOpenFiles(new qx.data.Array());
    this.__actionDispatcher = cv.ui.manager.control.ActionDispatcher.getInstance();
    this.__actionDispatcher.setMain(this);

    this.__initCommands();
    this._draw();

    qx.event.message.Bus.subscribe('cv.manager.*', this._onManagerEvent, this);
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    ROOT: null
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
      apply: '_applyCurrentFolder',
      event: 'changeCurrentFolder'
    },

    currentSelection: {
      check: 'cv.ui.manager.model.FileItem',
      nullable: true,
      apply: '_applyCurrentSelection',
      event: 'changeCurrentSelection'
    },

    deleteableSelection: {
      check: 'Boolean',
      init: false,
      event: 'changeDeleteableSelection'
    },

    renameableSelection: {
      check: 'Boolean',
      init: false,
      event: 'changeRenameableSelection'
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

    _checkEnvironment: function () {
      cv.io.rest.Client.getFsClient().checkEnvironmentSync(function (err, res) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else if (res) {
          res.forEach(function (env) {
            switch (env.entity) {
              case '.':
                // config folder must be writeable
                if ((env.state & 1) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder does not exists'));
                } else if ((env.state & 2) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder is not readable'));
                } else if ((env.state & 4) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder is not writeable'));
                }
                break;

              case 'backup':
                if ((env.state & 4) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('backup folder is not writeable'));
                }
                break;

              case 'media':
                if ((env.state & 4) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('media folder is not writeable'));
                }
                break;
            }
          }, this);
        }
      }, this);
    },

    canHandleAction: function (actionName) {
      return ['close', 'quit', 'hidden-config', 'new-file', 'new-config-file', 'new-folder', 'delete', 'upload'].includes(actionName);
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
          this._onCreate('file');
          break;

        case 'new-config-file':
          cv.io.rest.Client.getFsClient().readSync({path: '.templates/visu_config.xml'}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Cannot load config template'));
            } else {
              this._onCreate('config', res);
            }
          }, this);
          break;

        case 'new-folder':
          this._onCreate('dir');
          break;

        case 'delete':
          this._onDelete();
          break;

        case 'upload':
          // nothing to to, this is handled in another way
          break;

        default:
          this.warn(actionName + ' handling is not implemented yet!');
          break;
      }
    },

    _handleFileEvent: function (ev) {
      var data = ev.getData();
      if (data.action === 'deleted') {
        // check if file is currently opened and close it
        var openFiles = this.getOpenFiles().copy();
        openFiles.some(function (openFile) {
          if (openFile.getFile().isRelated(data.path)) {
            this.closeFile(openFile);
          }
        }, this);
      }
    },

    _onManagerEvent: function (ev) {
      var data = ev.getData();
      switch (ev.getName()) {
        case 'cv.manager.compareFiles':
          this.openFile(data, false);
          break;

        case 'cv.manager.openWith':
          this.openFile(data.file || this.getCurrentSelection(), false, data.handler);
          break;

        case 'cv.manager.open':
          this.openFile(data || this.getCurrentSelection(), false);
          break;
      }
    },

    /**
     * open selected file in preview mode
     * @private
     */
    _onChangeTreeSelection: function (ev) {
      var data = ev.getData();
      if ((cv.ui.manager.model.Preferences.getInstance().isQuickPreview() && data.mode === 'tap') || data.mode === 'dbltap') {
        this.__openSelectedFile(data.node, data.mode);
      }
      var node = data.node;
      if (node) {
        if (data.node.getType() === 'file') {
          this.setCurrentFolder(data.node.getParent());
        } else {
          this.setCurrentFolder(node);
        }
        this.setCurrentSelection(node);
      } else {
        this.resetCurrentFolder();
        this.resetCurrentSelection();
      }
    },

    __openSelectedFile: function (node, mode) {
      if (node) {
        if (node.getType() === 'file') {
          this.openFile(node, mode === 'tap');
        } else if (mode === 'dbltap') {
          // edit folder name on dbltap
          node.setEditing(true);
        }
      }
    },

    _applyCurrentFolder: function (value, old) {
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        value.bind('writeable', this, 'writeableFolder');
      } else {
        this.resetWriteableFolder();
      }
    },

    _applyCurrentSelection: function (value, old) {
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        value.bind('writeable', this, 'deleteableSelection');
        value.bind('inTrash', this, 'renameableSelection', {
          converter: function (value) {
            return !value;
          }
        });
      } else {
        this.resetDeleteableSelection();
      }
    },

    _onChangeFileSelection: function () {
      var sel = this._openFilesController.getSelection();
      if (sel.length > 0) {
        var openFile = sel.getItem(0);
        var file = openFile.getFile();
        var editorConfig;
        var handlerId = openFile.getHandlerId();
        if (handlerId) {
          editorConfig = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandlerById(handlerId);
        } else {
          editorConfig = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);
        }
        if (!editorConfig.instance) {
          editorConfig.instance = new editorConfig.Clazz();
          editorConfig.instance.setFile(file);
          this._stack.add(editorConfig.instance);
        } else {
          editorConfig.instance.setFile(file);
        }
        this._stack.setSelection([editorConfig.instance]);
        this.__actionDispatcher.setFocusedWidget(editorConfig.instance);
      }
    },

    openFile: function (file, preview, handlerId) {
      var openFiles = this.getOpenFiles();
      var openFile;
      if (!handlerId) {
        var handlerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);

        if (!handlerConf) {
          // no handler
          cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('Cannot open file: "%1"', file.getName()));
          return;
        } else {
          handlerId = handlerConf.Clazz.classname;
        }
      }
      var isOpen = openFiles.some(function (of) {
        if (of.getFile() === file && handlerId === of.getHandlerId()) {
          openFile = of;
          return true;
        }
      });
      if (!openFile) {
        openFile = new cv.ui.manager.model.OpenFile(file, handlerId);
      }
      if (preview === true) {
        if (!openFile.isPermanent()) {
          if (this.__previewFileIndex !== null && !openFiles.getItem(this.__previewFileIndex).isPermanent()) {
            openFiles.setItem(this.__previewFileIndex, openFile);
          } else {
            this.__previewFileIndex = openFiles.length;
            openFiles.push(openFile);
          }
          // do not 'downgrade' the permanent state
          openFile.setPermanent(false);
        }
      } else {
        if (!isOpen && (this.__previewFileIndex === null || openFiles.indexOf(openFile) !== this.__previewFileIndex)) {
          openFiles.push(openFile);
        }
        openFile.setPermanent(true);
        this.__previewFileIndex = null;
      }
      this._openFilesController.getTarget().setModelSelection([openFile]);
    },

    closeFile: function (openFile) {
      var file = openFile.getFile();
      openFile.resetPermanent();
      var currentSelection = this._openFilesController.getSelection();
      var selectionIndex = -1;
      var openFiles = this.getOpenFiles();
      if (currentSelection.length > 0 && currentSelection.getItem(0) === openFile) {
        // we need to select another file after this one got closed
        selectionIndex = openFiles.indexOf(openFile);
      }
      openFiles.remove(openFile);
      if (this.getOpenFiles().length === 0) {
        this._stack.resetSelection();
        this.__actionDispatcher.resetFocusedWidget();
        this.__previewFileIndex = null;
      }
      if (selectionIndex > 0) {
        this._openFilesController.getSelection().replace(openFiles.getItem(selectionIndex - 1));
      } else if (selectionIndex === 0 && openFiles.length > 0) {
        this._openFilesController.getSelection().replace(openFiles.getItem(0));
      }

      if (file instanceof cv.ui.manager.model.CompareFiles) {
        var fileHandlerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);
        fileHandlerConf.instance.clear();
        if (openFiles.filter(function (openFile) {
          return openFile.getFile() instanceof cv.ui.manager.model.CompareFiles;
        }).length === 0) {
          fileHandlerConf.instance.destroy();
          fileHandlerConf.instance = null;
        }
      } else if (window.monaco && openFile.getHandlerId() === 'cv.ui.manager.editor.Source') {
        // close textmodel in monaco editor if exists
        var oldModel = window.monaco.editor.getModel(file.getUri());
        if (oldModel) {
          oldModel.dispose();
        }
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
      // group.add('delete', new qx.ui.command.Command('Del'));

      var renameCommand = new qx.ui.command.Command('F2');
      group.add('rename', renameCommand);
      this.bind('renameableSelection', renameCommand, 'enabled');

      // edit commands (adding cut/copy/paste command will deactivate the native browser functions)
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
          parent: this._tree.getRootFolder(),
          readable: true,
          writeable: true,
          overrideIcon: true,
          icon: cv.theme.dark.Images.getIcon('hidden-config', 15),
          type: "file"
        });
      }
      if (this.getOpenFiles().includes(this._hiddenConfigFakeFile)) {
        this.closeFile(this._hiddenConfigFakeFile);
      } else {
        this.openFile(this._hiddenConfigFakeFile, false);
      }
    },

    _onDelete: function () {
      var item = this.getCurrentSelection();
      if (item) {
        var message;
        if (item.isTrash()) {
          message = qx.locale.Manager.tr('Do you really want to clear the trash?');
        } else if (item.isInTrash()) {
          message = item.getType() === 'file' ?
            qx.locale.Manager.tr('Do you really want to delete this file from the trash?') :
            qx.locale.Manager.tr('Do you really want to delete this folder from the trash?');
        } else {
          message = item.getType() === 'file' ?
            qx.locale.Manager.tr('Do you really want to delete this file?') :
            qx.locale.Manager.tr('Do you really want to delete this folder?');
        }
        dialog.Dialog.confirm(message, function (confirmed) {
          if (confirmed) {
            cv.ui.manager.control.FileController.getInstance().delete(item);
          }
        }, this, qx.locale.Manager.tr('Confirm deletion'));
      }
    },

    _onChangeStackSelection: function (ev) {
      var selection = ev.getData();
      var openFiles = [];
      // sync tab selection with currently visible page
      selection.forEach(function(page) {
        var openFile = this.getOpenFiles().toArray().find(function (openFile) {
          return openFile.getFile() === page.getFile() && openFile.getHandlerId() === page.classname;
        });
        if (openFile) {
          openFiles.push(openFile);
        }
      }, this);

      this._openFilesController.getSelection().replace(openFiles);
    },

    _onCreate: function (type, content) {
      var currentFolder = this.getCurrentFolder();
      console.log(currentFolder);
      if (!currentFolder) {
        return;
      }
      var message, existsMessage;
      if (type === 'config') {
        message = qx.locale.Manager.tr('Please enter the name of the new configuration (without "visu_config_" at the beginning and ".xml" at the end)');
        existsMessage = qx.locale.Manager.tr('A configuration with this name already exists.');
      } else if (type === 'file') {
        message = qx.locale.Manager.tr('Please enter the file name.');
        existsMessage = qx.locale.Manager.tr('A file with this name already exists.');
      } else {
        message = qx.locale.Manager.tr('Please enter the folder name.');
        existsMessage = qx.locale.Manager.tr('A folder with this name already exists.');
      }
      var handlePrompt = function (name) {
        if (!name) {
          // canceled
          return;
        }
        var filename = name;
        // add visu_config_..-xml
        if (type === 'config') {
          var match = /visu[_-]config[_-]([\w\d_-]+)(\.xml)?/.exec(name);
          if (match) {
            name = match[1];
          }
          filename = 'visu_config_' + name + '.xml';
        }
        // check if name does not exist
        var exists = currentFolder.getChildren().some(function (child) {
          if (child.getName() === filename) {
            return true;
          }
        }, this);

        if (exists) {
          cv.ui.manager.snackbar.Controller.error(existsMessage);
          dialog.Dialog.prompt(message, handlePrompt, this, name);
        } else {
          var item = new cv.ui.manager.model.FileItem(filename, currentFolder.getPath(), currentFolder);
          item.addListener('changeModified', function (ev) {
            console.error(ev.getData());
          });
          item.set({
            type: type === 'config' ? 'file' : type,
            readable: true,
            writeable: true,
            loaded: true,
            modified: true,
            temporary: true,
            parentFolder: currentFolder.getFullPath(),
            content: content || ''
          });
          currentFolder.addChild(item);
          currentFolder.sortElements();
          this._tree.refresh();
          this._tree.setSelection(item);
          this.openFile(item, false);
        }
      };

      dialog.Dialog.prompt(message, handlePrompt, this);
    },

    /**
     * Finds next droppable parent of the given element. Maybe the element itself as well.
     *
     * Looks for the attribute <code>qxDroppable</code> with the value <code>on</code>.
     *
     * @param elem {Element} The element to query
     * @return {Element} The next parent element which is droppable. May also be <code>null</code>
     */
    __findDroppable : function (elem) {
      while (elem && elem.nodeType === 1) {
        if (elem.getAttribute("qxDroppable") === "on") {
          return elem;
        }

        elem = elem.parentNode;
      }

      return null;
    },

    // overridden
    _draw: function () {

      var root = new qx.ui.root.Inline(this.__getRoot(), true, true);
      root.addListenerOnce('appear', function () {
        // disable file drop
        var element = root.getContentElement().getDomElement();
        element.addEventListener('drop', function (ev) {
          var target = this.__findDroppable(ev.target);
          if (!target) {
            ev.preventDefault();
          }
        }.bind(this));
        element.addEventListener('dragover', function (ev) {
          var target = this.__findDroppable(ev.target);
          if (!target) {
            ev.preventDefault();
          }
        }.bind(this));
      }, this);
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

      var uploadButton = this._menuBar.getButton('upload');
      var uploadManager = new cv.ui.manager.upload.UploadMgr(uploadButton);
      this.bind('currentFolder', uploadManager, 'folder');

      this._pane = new qx.ui.splitpane.Pane();
      main.add(this._pane, {edge: 'center'});

      var rootFolder = cv.ui.manager.model.FileItem.ROOT = new cv.ui.manager.model.FileItem('.');
      var fakeIconFile = new cv.ui.manager.model.FileItem('CometVisu-Icons', '.', rootFolder).set({
        type: 'file',
        overrideIcon: true,
        writeable: false,
        readable: true,
        open: true,
        loaded: true,
        fake: true,
        icon: cv.theme.dark.Images.getIcon('icons', 18)
      });
      // TODO: needs to be verified by the backend
      rootFolder.set({
        overrideIcon: true,
        writeable: true,
        readable: true,
        open: true,
        fakeChildren: [fakeIconFile],
        icon: cv.theme.dark.Images.getIcon('home', 18)
      });
      this.setCurrentFolder(rootFolder);
      this._tree = new cv.ui.manager.tree.FileSystem(rootFolder);
      this._tree.addListener("changeSelection", this._onChangeTreeSelection, this);

      // left container
      var leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // left toobar
      var leftBar = new qx.ui.toolbar.ToolBar();
      leftBar.setAppearance('cv-toolbar');
      var buttonConfig = this._menuBar.getButtonConfiguration();

      function createButton (name) {
        var args = buttonConfig[name].args;
        var button = new qx.ui.toolbar.Button(null, args[1].replace(/\/[0-9]+$/, '/15'), args[2]);
        button.setAppearance('cv-toolbar-button');
        button.setToolTipText(args[0]);
        return button;
      }
      var newButton = new qx.ui.toolbar.MenuButton(null,
        cv.theme.dark.Images.getIcon('new-file', 15),
        this._menuBar.getChildControl('new-menu')
      );
      var upload = createButton('upload');
      uploadManager.addWidget(upload);
      var deleteSelection = createButton('delete');
      deleteSelection.addListener('execute', this._onDelete, this);

      this.bind('writeableFolder', buttonConfig['new-file'].args[2], 'enabled');
      this.bind('writeableFolder', buttonConfig['new-folder'].args[2], 'enabled');

      var download = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('download', 15));
      download.setAppearance('cv-toolbar-button');
      download.setToolTipText(qx.locale.Manager.tr('Download'));
      download.addListener('execute', function () {
        cv.ui.manager.control.FileController.getInstance().download(this.getCurrentSelection());
      }, this);
      // download button is only enabled when a file is selected
      this.bind('currentSelection', download, 'enabled', {
        converter: function (file) {
          return !!file && file.getType() === 'file' && !file.isFake();
        }
      });
      this.bind('currentSelection', deleteSelection, 'enabled', {
        converter: function (file) {
          return !!file && file.isWriteable() && !file.isFake();
        }
      });

      // config check
      var checkConfig = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('validate', 15));
      checkConfig.setAppearance('cv-toolbar-button');
      checkConfig.setToolTipText(qx.locale.Manager.tr('Validate'));
      checkConfig.addListener('execute', function () {
        cv.ui.manager.control.FileController.getInstance().validate(this.getCurrentSelection());
      }, this);
      // download button is only enabled when a file is selected
      this.bind('currentSelection', checkConfig, 'enabled', {
        converter: function (file) {
          return !!file && file.isConfigFile();
        }
      });

      var reload = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 15));
      reload.setAppearance('cv-toolbar-button');
      reload.setToolTipText(qx.locale.Manager.tr('Reload'));
      reload.addListener('execute', this._tree.reload, this._tree);

      var createPart = new qx.ui.toolbar.Part();
      createPart.set({
        marginLeft: 0
      });
      createPart.add(newButton);
      createPart.add(upload);
      createPart.add(download);
      leftBar.add(createPart);

      leftBar.add(checkConfig);
      leftBar.add(deleteSelection);

      leftBar.add(new qx.ui.core.Spacer(), {flex: 1});
      leftBar.add(reload);

      leftContainer.add(leftBar);
      leftContainer.add(this._tree, {flex: 1});
      this._pane.add(leftContainer, 0);
      cv.ui.manager.model.Preferences.getInstance().bind('expertMode', leftContainer, 'visibility', {
        converter: function (value) {
          return value ? 'visible' : 'excluded';
        }
      });

      this._mainContent = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // tab list
      var list = new qx.ui.form.List(true);
      // list.setAppearance('open-files-tabs');
      list.set({
        decorator: null,
        minHeight: 38,
        height: 38,
        padding: 0
      });
      this._openFilesController = new qx.data.controller.List(this.getOpenFiles(), list, "file.name");
      this._openFilesController.setDelegate({
        createItem: function () {
          var item = new cv.ui.manager.form.FileTabItem();
          item.addListener('close', this._onCloseFile, this);
          return item;
        }.bind(this),

        bindItem: function (controller, item, index) {
          controller.bindDefaultProperties(item, index);
          controller.bindProperty('file.permanent', 'permanent', null, item, index);
          controller.bindProperty('file.modified', 'modified', null, item, index);
          controller.bindProperty('icon', 'icon', null, item, index);
          controller.bindProperty('closeable', 'closeable', null, item, index);
        }
      });
      list.addListener('changeSelection', this._onChangeFileSelection, this);
      this._mainContent.add(list);

      this._stack = new qx.ui.container.Stack();
      this._stack.addListener('changeSelection', this._onChangeStackSelection, this);
      this._mainContent.add(this._stack, {flex: 1});
      this._pane.add(this._mainContent, 1);

      var startOpenFile = new cv.ui.manager.model.OpenFile(rootFolder, 'cv.ui.manager.Start');
      startOpenFile.setCloseable(false);
      console.log(startOpenFile);
      this.getOpenFiles().push(startOpenFile);
      list.setModelSelection([startOpenFile]);
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
    this.__actionDispatcher = null;

    qx.event.message.Bus.unsubscribe('cv.manager.*', this._onManagerEvent, this);

    // destroy the singleton instance
    delete cv.ui.manager.Main.$$instance;
  },

  defer: function(statics) {
    // initialize on load
    statics.getInstance();

    // load backupFolder
    cv.ui.manager.model.BackupFolder.getInstance();
  }
});
