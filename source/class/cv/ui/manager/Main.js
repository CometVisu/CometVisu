/**
 * Main class of the CometVisu file manager.
 * @author Tobias Bräutigam
 * @since 0.12.0
 *
 * @asset(manager/*)
 */
qx.Class.define('cv.ui.manager.Main', {
  extend: qx.core.Object,
  type: 'singleton',
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
    iconfont.material.Load;
    cv.ui.manager.model.BackupFolder.getInstance();
    this._checkEnvironment();
    this.initOpenFiles(new qx.data.Array());
    this.__actionDispatcher = cv.ui.manager.control.ActionDispatcher.getInstance();
    this.__actionDispatcher.setMain(this);

    this.__initCommands();
    this._draw();

    qx.event.message.Bus.subscribe('cv.manager.*', this._onManagerEvent, this);

    // Initialize tooltip manager
    qx.ui.tooltip.Manager.getInstance();
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
    },

    visible: {
      check: 'Boolean',
      init: true,
      event: 'changeVisible',
      apply: '_applyVisible'
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
    _oldCommandGroup: null,
    _managerCommands: null,
    _mainContent: null,
    _openFilesController: null,
    _hiddenConfigFakeFile: null,
    __actionDispatcher: null,

    _applyVisible: function (value) {
      const manager = qx.core.Init.getApplication().getCommandManager();
      if (value) {
        manager.setActive(this._managerCommands);
        qx.bom.element.Style.set(this.__getRoot(), 'display', 'block');
      } else {
        manager.setActive(this._oldCommandGroup);
        qx.bom.element.Style.set(this.__getRoot(), 'display', 'none');
      }
    },

    _checkEnvironment: function () {
      cv.io.rest.Client.getFsClient().checkEnvironmentSync(function (err, res) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else if (res) {
          res.forEach(function (env) {
            let refreshActions = false;
            switch (env.entity) {
              case '.':
                // config folder must be writeable
                if ((env.state & 1) === 0) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder does not exists'));
                } else if ((env.state & 2) === 0) {
                  cv.ui.manager.model.FileItem.ROOT.setReadable(false);
                  refreshActions = true;
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder is not readable'));
                } else if ((env.state & 4) === 0) {
                  cv.ui.manager.model.FileItem.ROOT.setWriteable(false);
                  refreshActions = true;
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('config folder is not writeable'));
                }
                if (refreshActions) {
                  const widget = this.__actionDispatcher.getFocusedWidget();
                  this.__actionDispatcher.resetFocusedWidget();
                  this.__actionDispatcher.setFocusedWidget(widget);
                }
                break;

              case 'backup':
                if ((env.state & 4) === 0 && (env.state & 1) === 1) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('backup folder is not writeable'));
                }
                break;

              case 'media':
                if ((env.state & 4) === 0 && (env.state & 1) === 1) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('media folder is not writeable'));
                }
                break;

              case 'hidden.php':
                if ((env.state & 4) === 0 && (env.state & 1) === 1) {
                  cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Hidden configuration file (hidden.php) not writeable'));
                }
                break;
            }
          }, this);
        }
      }, this);
    },

    canHandleAction: function (actionName) {
      if (actionName === 'delete' && this.getCurrentSelection() && !this.getCurrentSelection().isWriteable()) {
        // needs a writeable file
        return false;
      }
      let actions = ['close', 'quit', 'about'];
      const currentFolder = this.getCurrentFolder();
      if (currentFolder.isWriteable()) {
        actions.push('new-file');
        actions.push('new-folder');
        actions.push('delete');
        actions.push('upload');
        actions.push('clone');
      }
      if (cv.ui.manager.model.FileItem.ROOT.isWriteable()) {
        actions.push('new-config-file');
      }
      return actions.includes(actionName);
    },

    handleAction: function (actionName, data) {
      switch (actionName) {
        case 'close':
          if (!data) {
            this.closeCurrentFile();
          } else {
            this.closeFile(data);
          }
          break;

        case 'quit':
          this.setVisible(false);
          break;

        case 'new-file':
          this._onCreate('file', null, data);
          break;

        case 'new-config-file':
          cv.io.rest.Client.getFsClient().readSync({path: '.templates/visu_config.xml'}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Cannot load config template'));
            } else {
              this._onCreate('config', res, cv.ui.manager.model.FileItem.ROOT);
            }
          }, this);
          break;

        case 'clone':
          cv.io.rest.Client.getFsClient().readSync({path: data.file.getFullPath()}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Cannot load file content'));
            } else if (data.file.isConfigFile()) {
                // config files need to be cloned in the root folder
                this._onCreate('config', res, cv.ui.manager.model.FileItem.ROOT);
              } else {
                this._onCreate('file', res);
              }
          }, this);
          break;

        case 'new-folder':
          this._onCreate('dir', null, data);
          break;

        case 'delete':
          this._onDelete(data);
          break;

        case 'upload':
          // nothing to to, this is handled in another way
          break;

        case 'about':
          this._showAbout();
          break;

        default:
          this.warn(actionName + ' handling is not implemented yet!');
          break;
      }
    },

    configureButton: function (button) {},
    unConfigureButton: function (button) {},

    _handleFileEvent: function (ev) {
      const data = ev.getData();
      if (data.action === 'deleted') {
        // check if file is currently opened and close it
        const openFiles = this.getOpenFiles().copy();
        openFiles.some(function (openFile) {
          if (openFile.getFile().isRelated(data.path)) {
            this.closeFile(openFile);
          }
          return false;
        }, this);
        if (this.getCurrentFolder() && this.getCurrentFolder().getFullPath() === data.path) {
          this.resetCurrentFolder();
        }
      } else {
        this.warn('unhandled file event', data.action);
      }
      this._tree.refresh();
    },

    __findConfigFile: function (name) {
      let file = null;
      let demoFolder = null;
      cv.ui.manager.model.FileItem.ROOT.getChildren().some(child => {
        if (child.getName() === 'demo') {
          demoFolder = child;
        } else if (child.getName() === name) {
          file = child;
          return true;
        }
        return false;
      });
      if (!file && demoFolder) {
        if (name.startsWith('demo/')) {
          name = name.substr(5);
        }
        // check demo configs
        demoFolder.getChildren().some(child => {
          if (child.getName() === name) {
            file = child;
            return true;
          }
          return false;
        });
      }
      return file;
    },

    _onManagerEvent: function (ev) {
      let data = ev.getData();
      switch (ev.getName()) {
        case 'cv.manager.compareFiles':
          this.openFile(data, false);
          break;

        case 'cv.manager.openWith':
          if (typeof data.file === 'string') {
            // this can only by a file in the root dir (a config)
            data.file = this.__findConfigFile(data.file);
          }
          this.openFile(data.file || this.getCurrentSelection(), false, data.handler, null, data.handlerOptions);
          break;

        case 'cv.manager.open':
          if (typeof data === 'string') {
            // this can only by a file in the root dir (a config)
            data = this.__findConfigFile(data);
          }
          this.openFile(data || this.getCurrentSelection(), false);
          break;
      }
    },

    /**
     * open selected file in preview mode
     * @param ev
     * @private
     */
    _onChangeTreeSelection: function (ev) {
      const data = ev.getData();
      if ((cv.ui.manager.model.Preferences.getInstance().isQuickPreview() && data.mode === 'tap') || data.mode === 'dbltap') {
        this.__openSelectedFile(data.node, data.mode);
      }
      const node = data.node;
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
      const sel = this._openFilesController.getSelection();
      if (sel.length > 0) {
        const openFile = sel.getItem(0);
        const file = openFile.getFile();
        let editorConfig;
        const handlerId = openFile.getHandlerId();
        if (handlerId) {
          editorConfig = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandlerById(handlerId);
        } else {
          editorConfig = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);
        }
        if (!editorConfig.instance) {
          editorConfig.instance = new editorConfig.Clazz();
        }
        if (!editorConfig.instance.isReady()) {
          editorConfig.instance.addListenerOnce('changeReady', () => {
            editorConfig.instance.setFile(file);
          }, this);
        } else {
          editorConfig.instance.setFile(file);
        }
        if (this._stack.indexOf(editorConfig.instance) < 0) {
          this._stack.add(editorConfig.instance);
        }
        if (editorConfig.instance instanceof cv.ui.manager.editor.AbstractEditor) {
          editorConfig.instance.setHandlerOptions(openFile.getHandlerOptions());
        }
        this._stack.setSelection([editorConfig.instance]);
        this.__actionDispatcher.setFocusedWidget(editorConfig.instance);

        cv.ui.manager.core.GlobalState.getInstance().setOpenedFocusedFile(file);
      } else {
        cv.ui.manager.core.GlobalState.getInstance().resetOpenedFocusedFile();
      }
    },

    /**
     * @param file {cv.ui.manager.model.FileItem} the file to open
     * @param preview {Boolean} open the file in preview mode
     * @param handlerId {String} use this handler to open the file (classname as string)
     * @param handlerType {String} use a special handler type, e.g. 'edit' if you want to open the file with an editor and not a viewer
     * @param handlerOptions
     */
    openFile: function (file, preview, handlerId, handlerType, handlerOptions) {
      const openFiles = this.getOpenFiles();
      let openFile;
      let handlerConf;
      if (!handlerId) {
        handlerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file, handlerType);

        if (!handlerConf) {
          // no handler
          cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('Cannot open file: "%1"', file.getName()));
          return;
        } 
          handlerId = handlerConf.Clazz.classname;
      } else {
        // check if this handler opens the file in a external frame that is not connected to the manager
        handlerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandlerById(handlerId);
        if (!handlerConf.instance) {
          handlerConf.instance = new handlerConf.Clazz();
        }
        if (handlerConf.instance.isExternal()) {
          handlerConf.instance.setFile(file);
          return;
        }
      }
      const isOpen = openFiles.some(function (of) {
        if (of.getFile() === file && handlerId === of.getHandlerId()) {
          openFile = of;
          return true;
        }
        return false;
      });
      if (!openFile) {
        openFile = new cv.ui.manager.model.OpenFile(file, handlerId);
      }
      if (handlerOptions) {
        openFile.setHandlerOptions(handlerOptions);
      } else {
        openFile.resetHandlerOptions();
      }
      if (preview === true) {
        if (!openFile.isPermanent()) {
          if (this.__previewFileIndex !== null && openFiles.getItem(this.__previewFileIndex) && !openFiles.getItem(this.__previewFileIndex).isPermanent()) {
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

    closeFile: function (openFile, force) {
      if (openFile instanceof cv.ui.manager.model.FileItem) {
        // find the opened file
        const found = this.getOpenFiles().some(function (f) {
          if (f.getFile().getFullPath() === openFile.getFullPath()) {
            openFile = f;
            return true;
          }
          return false;
        });
        if (!found) {
          return;
        }
      }
      if (!openFile || !openFile.isCloseable()) {
        return;
      }
      const file = openFile.getFile();

      // check if this file is modified
      if (file.isModified() && !force) {
        // check if temporary
        let message = qx.locale.Manager.tr('This file has unsaved changes that will be lost when you close it. Do you really want to close the file?');
        if (file.isTemporary()) {
          message = qx.locale.Manager.tr('This file has not been saved on the backend yet. It will be lost when you close it. Do you really want to close the file?');
        }
        qxl.dialog.Dialog.confirm(message, function (confirmed) {
          if (confirmed) {
            file.resetModified();
            this.closeFile(openFile, true);
            if (file.isTemporary()) {
              qx.event.message.Bus.dispatchByName('cv.manager.file', {
                action: 'deleted',
                path: file.getFullPath()
              });
            }
          }
        }, this, qx.locale.Manager.tr('Unsaved changes'));
        return;
      }
      if (openFile instanceof cv.ui.manager.model.OpenFile) {
        openFile.resetPermanent();
      }
      const currentSelection = this._openFilesController.getSelection();
      let selectionIndex = -1;
      const openFiles = this.getOpenFiles();
      if (currentSelection.length > 0 && currentSelection.getItem(0) === openFile) {
        // we need to select another file after this one got closed
        selectionIndex = openFiles.indexOf(openFile);
      }
      openFiles.remove(openFile);
      const currentHandler = this._stack.getSelection()[0];
      if (qx.Class.hasInterface(currentHandler.constructor, cv.ui.manager.editor.IEditor)) {
        // reset the handlers file
        currentHandler.resetFile();
      }
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
        const fileHandlerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);
        fileHandlerConf.instance.clear();
        if (openFiles.filter(function (openFile) {
          return openFile.getFile() instanceof cv.ui.manager.model.CompareFiles;
        }).length === 0) {
          fileHandlerConf.instance.destroy();
          fileHandlerConf.instance = null;
        }
      } else if (window.monaco && openFile.getHandlerId() === 'cv.ui.manager.editor.Source') {
        // close textmodel in monaco editor if exists
        const oldModel = window.monaco.editor.getModel(file.getUri());
        if (oldModel) {
          oldModel.dispose();
        }
      }
    },

    closeCurrentFile: function () {
      const selected = this._openFilesController.getSelection().length > 0 ? this._openFilesController.getSelection().getItem(0) : null;
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
      const group = this._managerCommands = new qx.ui.command.Group();
      group.add('save', new qx.ui.command.Command('Ctrl+S'));
      group.add('save-as', new qx.ui.command.Command('Ctrl+Shift+S'));
      // this command will close the browser window, thats not what we want
      // group.add('close', new qx.ui.command.Command('Ctrl+W'));
      group.add('new-file', new qx.ui.command.Command('Ctrl+N'));
      group.add('new-folder', new qx.ui.command.Command('Ctrl+Shift+N'));
      group.add('quit', new qx.ui.command.Command('Ctrl+Q'));
      // group.add('delete', new qx.ui.command.Command('Ctrl+Del'));

      const renameCommand = new qx.ui.command.Command('F2');
      group.add('rename', renameCommand);
      this.bind('renameableSelection', renameCommand, 'enabled');

      group.add('undo', new qx.ui.command.Command('Ctrl+Z'));
      group.add('redo', new qx.ui.command.Command('Ctrl+Y'));

      // edit commands (adding cut/copy/paste command will deactivate the native browser functions)
      // and as we cannot simulate pasting from clipboard, we do not use them here
      group.add('cut', new qx.ui.command.Command('Ctrl+X'));
      group.add('copy', new qx.ui.command.Command('Ctrl+C'));
      group.add('paste', new qx.ui.command.Command('Ctrl+V'));

      group.add('help', new qx.ui.command.Command('F1'));

      const manager = qx.core.Init.getApplication().getCommandManager();
      this._oldCommandGroup = manager.getActive();
      manager.add(group);
      manager.setActive(group);
    },

    _onDelete: function (file) {
      const item = file || this.getCurrentSelection();
      if (item) {
        cv.ui.manager.control.FileController.getInstance().delete(item);
      }
    },

    _onChangeStackSelection: function (ev) {
      const selection = ev.getData();
      const openFiles = [];
      // sync tab selection with currently visible page
      selection.forEach(function(page) {
        const openFile = this.getOpenFiles().toArray().find(function (openFile) {
          return openFile.getFile() === page.getFile() && openFile.getHandlerId() === page.classname;
        });
        if (openFile) {
          openFiles.push(openFile);
        }
      }, this);

      this._openFilesController.getSelection().replace(openFiles);
    },

    __getFileNamePrompt: function (message, callback, context, value, caption) {
      const prompt = new cv.ui.manager.dialog.Prompt({
        message: message,
        callback: callback || null,
        context: context || null,
        value: value || null,
        caption: caption || '',
        filter: /[\w\d_\-\.\s]/
      });
      prompt.show();
      return prompt;
    },

    _onCreate: function (type, content, folder) {
      const currentFolder = folder || this.getCurrentFolder();
      if (!currentFolder) {
        return;
      }
      let message;
      let existsMessage;
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
      const handlePrompt = function (name) {
        if (!name) {
          // canceled
          return;
        }
        let filename = name;
        // add visu_config_..-xml
        if (type === 'config') {
          const match = /visu[_-]config[_-]([\w\d_-]+)(\.xml)?/.exec(name);
          if (match) {
            name = match[1];
          }
          filename = 'visu_config_' + name + '.xml';
        }
        // check if name does not exist
        const exists = currentFolder.getChildren().some(function (child) {
          return (child.getName() === filename && child.getType() === type);
        }, this);

        if (exists) {
          cv.ui.manager.snackbar.Controller.error(existsMessage);
          this.__getFileNamePrompt(message, handlePrompt, this, name);
        } else {
          const item = new cv.ui.manager.model.FileItem(filename, currentFolder.getFullPath(), currentFolder);
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
          if (type === 'dir') {
            // create directory directly
            cv.io.rest.Client.getFsClient().createSync({
              path: item.getFullPath(),
              type: type
            }, null, function (err) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('Folder has been created'));
                item.set({
                  modified: false,
                  temporary: false
                });
                qx.event.message.Bus.dispatchByName(item.getBusTopic(), {
                  type: 'created',
                  file: item,
                  data: '',
                  source: this
                });
              }
            }, this);
          }
          currentFolder.addChild(item);
          currentFolder.sortElements();
          this._tree.refresh();
          this._tree.setSelection(item);
          // do not open new folders
          if (type !== 'dir') {
            // open the file in an editor
            this.openFile(item, false, null, 'edit');
          }
        }
      };

      this.__getFileNamePrompt(message, handlePrompt, this);
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
        if (elem.getAttribute('qxDroppable') === 'on') {
          return elem;
        }

        elem = elem.parentNode;
      }

      return null;
    },

    // overridden
    _draw: function () {
      const domRoot = this.__getRoot();
      const root = new qx.ui.root.Inline(domRoot, true, true);
      this.bind('visible', root, 'visibility', {
        converter: function (visible) {
          return visible ? 'visible' : 'excluded';
        }
      });
      root.addListenerOnce('appear', function () {
        // disable file drop
        const element = root.getContentElement().getDomElement();
        element.addEventListener('drop', function (ev) {
          const target = this.__findDroppable(ev.target);
          if (!target) {
            ev.preventDefault();
          }
        }.bind(this));
        element.addEventListener('dragover', function (ev) {
          const target = this.__findDroppable(ev.target);
          if (!target) {
            ev.preventDefault();
          }
        }.bind(this));
      }, this);
      qx.core.Init.getApplication().setRoot(root);
      root.setLayout(new qx.ui.layout.Canvas());

      const snackbar = cv.ui.manager.snackbar.Controller.getInstance();
      root.add(snackbar, {
        bottom: 10,
        left: 200
      });

      /**
       *
       */
      function resize() {
        const bounds = root.getBounds();
        snackbar.setLayoutProperties({
          bottom: 10,
          left: Math.round(bounds.width / 2) - 150
        });
        snackbar.setMaxHeight(bounds.height - 40);
      }
      root.addListener('resize', resize, this);
      root.addListener('appear', resize, this);
      window.addEventListener('resize', function () {
        // sync window height with manager height
        domRoot.style.height = window.innerHeight + 'px';
      });

      const main = new qx.ui.container.Composite(new qx.ui.layout.Dock());
      root.add(main, {edge: 0});
      // menu on top
      const menuBar = cv.ui.manager.MenuBar.getInstance();
      main.add(menuBar, {edge: 'north'});

      const uploadButton = menuBar.getButton('upload');
      const uploadManager = new cv.ui.manager.upload.UploadMgr(uploadButton);
      this.bind('currentFolder', uploadManager, 'folder');

      this._pane = new qx.ui.splitpane.Pane();
      main.add(this._pane, {edge: 'center'});

      const rootFolder = cv.ui.manager.model.FileItem.ROOT = new cv.ui.manager.model.FileItem('.');
      const fakeIconFile = cv.ui.manager.model.FileItem.getIconFile();
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
      this._tree.addListener('changeSelection', this._onChangeTreeSelection, this);

      // left container
      const leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // left toolbar
      const leftBar = new cv.ui.manager.ToolBar(uploadManager);
      this.bind('currentFolder', leftBar, 'folder');
      this.bind('currentSelection', leftBar, 'file');
      leftBar.addListener('reload', this._tree.reload, this._tree);

      // globally bind writeable folder to command for new files
      const buttonConfig = menuBar.getButtonConfiguration();
      this.bind('writeableFolder', buttonConfig['new-file'].args[2], 'enabled');
      this.bind('writeableFolder', buttonConfig['new-folder'].args[2], 'enabled');
      // this.bind('deleteableSelection', buttonConfig['delete'].args[2], 'enabled');

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
      const list = new qx.ui.form.List(true);
      list.setAppearance('open-files-tabs');
      this._openFilesController = new qx.data.controller.List(this.getOpenFiles(), list, 'file.name');
      this._openFilesController.setDelegate({
        createItem: function () {
          const item = new cv.ui.manager.form.FileTabItem();
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

      const startOpenFile = new cv.ui.manager.model.OpenFile(rootFolder, 'cv.ui.manager.Start');
      startOpenFile.setCloseable(false);
      this.getOpenFiles().push(startOpenFile);
      list.setModelSelection([startOpenFile]);
    },

    _showAbout: function () {
      const dialogConf = {
        caption: qx.locale.Manager.tr('About'),
        modal: true,
        minWidth: Math.min(500, qx.bom.Viewport.getWidth()),
        maxHeight: qx.bom.Viewport.getHeight(),
        message: `
<div class="about-cv">
 <img src="resource/icons/comet_icon_128x128_ff8000.png" width="128" height="128"/>
 <h2>CometVisu ${cv.Version.VERSION}</h2>
 <div class="info">
   <label for="date">${qx.locale.Manager.tr('Build date')}: </label><span id="date">${cv.Version.DATE}</span><br/>
   <label for="build">${qx.locale.Manager.tr('Build revision')}: </label><span id="build">${cv.Version.REV}</span><br/>
   <label for="lib-version">${qx.locale.Manager.tr('Library version')}: </label><span id="lib-version">${cv.Version.LIBRARY_VERSION}</span>
 </div>
</div>`};
      new cv.ui.manager.dialog.BigAlert(dialogConf).show();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects(
      '_pane', '_tree', '_stack', '_mainContent', '_openFilesController'
    );
    // restore former command group
    const application = qx.core.Init.getApplication();
    const manager = application.getCommandManager();
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
  }
});
