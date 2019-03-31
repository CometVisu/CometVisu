/**
 * Shows filesystem content in a tree.
 */
qx.Class.define('cv.ui.manager.tree.FileSystem', {
  extend: qx.ui.core.Widget,
  include: [
    cv.ui.manager.upload.MDragUpload,
    cv.ui.manager.control.MFileEventHandler
  ],
  implement: [cv.ui.manager.control.IFileEventHandler],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (rootFolder) {
    this.base(arguments);
    this._commandGroup = qx.core.Init.getApplication().getCommandManager().getActive();
    this._setLayout(new qx.ui.layout.Grow());
    this.setRootFolder(rootFolder);

    qx.event.message.Bus.subscribe('cv.manager.tree.enable', this._onEnableTree, this);

    this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat('medium'));
    this._timeFormat = new qx.util.format.DateFormat(qx.locale.Date.getTimeFormat('medium'));
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    MIMETYPES: {
      'text/xml': 'xml',
      'application/xml': 'xml',
      'text/javascript': 'js',
      'application/x-httpd-php': 'php',
      'text/css': 'css',
      'image/png': 'png',
      'image/svg+xml': 'svg',
      'text/plain': ''
    },

    getMimetypeFromSuffix: function (suffix) {
      return Object.keys(this.MIMETYPES).find(function (mime) {
        return this.MIMETYPES[mime] === suffix;
      }, this);
    },

    isAccepted: function (mimetype) {
      return this.MIMETYPES.hasOwnProperty(mimetype);
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    'changeSelection': 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    rootFolder: {
      check: 'cv.ui.manager.model.FileItem',
      apply: '_applyRootFolder'
    },

    selectedNode: {
      check: 'cv.ui.manager.model.FileItem',
      apply: '_applySelectedNode',
      nullable: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __selectionTimer: null,
    __doubleTapWaitingTime: 500,
    _commandGroup: null,
    _dateFormat: null,
    _timeFormat: null,
    __ignoreSelectionChange: false,

    _handleFileEvent: function (ev) {
      var data = ev.getData();
      switch (data.action) {
        case 'moved':
        case 'added':
        case 'deleted':
        case 'restored':
          this.reload();
          break;
      }
    },

    reload: function () {
      var root = this.getChildControl('tree').getModel();
      root.reload(function () {
        this.getChildControl('tree').refresh();
        root.setOpen(true);
      }, this);
    },

    refresh: function () {
      this.getChildControl('tree').refresh();
    },

    _applyRootFolder: function (value) {
      if (value) {
        var tree = this.getChildControl('tree');
        tree.setModel(value);
        value.load(function () {
          tree.setHideRoot(true);
        }, this);
      }
    },

    _applySelectedNode: function (value) {
      var tree = this.getChildControl('tree');
      if (value) {
        tree.setContextMenu(this.getChildControl('context-menu'));

        this.getChildControl('delete-button').setLabel(value.isTrash() ?
          this.tr('Clear') :
          this.tr('Delete'));

        // create compare menu
        var compareMenu = this.getChildControl('compare-menu');
        compareMenu.removeAll();
        var backups = cv.ui.manager.model.BackupFolder.getInstance().getBackupFiles(value);
        compareMenu.setEnabled(backups.length > 0);
        backups.sort(function (a, b) {
          return b.date.getTime() - a.date.getTime();
        });
        var group = null;
        backups.forEach(function (backupEntry) {
          var date = this._dateFormat.format(backupEntry.date);
          if (group !== date) {
            if (group !== null) {
              compareMenu.add(new qx.ui.menu.Separator());
            }
            var groupButton = new qx.ui.menu.Button(date);
            groupButton.setEnabled(false);
            compareMenu.add(groupButton);
            group = date;
          }
          var button = new qx.ui.menu.Button(this.tr('Backup from %1', this._timeFormat.format(backupEntry.date)));
          button.setUserData('file', backupEntry.file);
          button.addListener('execute', this._onCompareWith, this);
          compareMenu.add(button);
        }, this);

        // open with menu
        var availableHandlers = cv.ui.manager.control.FileHandlerRegistry.getInstance().getAllFileHandlers(value);
        var openWithMenu = this.getChildControl('open-with-menu');
        openWithMenu.removeAll();
        openWithMenu.setEnabled(availableHandlers.length > 0);
        availableHandlers.sort(function (a, b) {
          return a.Clazz.constructor.TITLE.toString().localeCompare(b.Clazz.constructor.TITLE.toString());
        });
        availableHandlers.forEach(function (handlerConf) {
          var button = new qx.ui.menu.Button(handlerConf.Clazz.constructor.TITLE, handlerConf.Clazz.constructor.ICON);
          button.setUserData('handlerId', handlerConf.Clazz.classname);
          button.addListener('execute', this._onOpenWith, this);
          openWithMenu.add(button);
        }, this);

        // validate button
        this.getChildControl('validate-config-button').setVisibility(value.isConfigFile() ? 'visible' : 'excluded');
      } else {
        tree.resetContextMenu();
        this.getChildControl('delete-button').setLabel(this.tr('Delete'));
      }
    },

    setSelection : function (node) {
      this.getChildControl('tree').getSelection().replace([node]);
    },

    _onCompareWith: function (ev) {
      var compareWith = ev.getTarget().getUserData('file');
      qx.event.message.Bus.dispatchByName('cv.manager.compareFiles',
        new cv.ui.manager.model.CompareFiles(compareWith, this.getSelectedNode())
      );
    },

    _onOpenWith: function (ev) {
      var handlerId = ev.getTarget().getUserData('handlerId');
      qx.event.message.Bus.dispatchByName('cv.manager.openWith', {handler: handlerId});
    },

    _onDblTapTreeSelection: function () {
      var sel = this.getSelectedNode();
      if (sel) {
        if (this.__selectionTimer) {
          this.__selectionTimer.stop();
        }
        // only files show a different behaviour when double-clicked (permanent vs. preview mode)
        if (sel.getType() === 'file') {
          this.fireDataEvent('changeSelection', {
            'node': sel,
            'mode': 'dbltap'
          });
        }
      }
    },

    _onChangeTreeSelection: function () {
      if (this.__selectionTimer) {
        this.__selectionTimer.stop();
      }
      if (this.__ignoreSelectionChange === true) {
        return;
      }
      var tree = this.getChildControl('tree');
      var sel = tree.getSelection();
      if (sel.length > 0) {
        var node = sel.getItem(0);
        this.setSelectedNode(node);
        // wait for double tap
        this.getChildControl('restore-button').setVisibility(node.isInTrash() ? 'visible' : 'excluded');
        if (node.getType() === 'file') {
          this.__selectionTimer = qx.event.Timer.once(function () {
            this.fireDataEvent('changeSelection', {
              'node': this.getSelectedNode(),
              'mode': 'tap'
            });
            this.__selectionTimer = null;
          }, this, this.__doubleTapWaitingTime);
        } else {
          this.fireDataEvent('changeSelection', {
            'node': node,
            'mode': 'tap'
          });
        }
      } else {
        this.getChildControl('restore-button').exclude();
        this.resetSelectedNode();
      }
    },

    _onFsItemRightClick: function (ev) {
      var tree = this.getChildControl('tree');
      var widget = ev.getTarget();
      var node = widget.getModel();
      if (node) {
        this.__ignoreSelectionChange = true;
        tree.getSelection().replace([node]);
        this.setSelectedNode(node);
        this.__ignoreSelectionChange = false;
      }
    },

    _onRename: function () {
      var node = this.getSelectedNode();
      if (node) {
        node.setEditing(true);
      }
    },

    _onDownload: function () {
      var node = this.getSelectedNode();
      if (node) {
        node.download();
      }
    },

    _onRestore: function () {
      var node = this.getSelectedNode();
      if (node) {
        node.restore();
      }
    },

    _onValidate: function () {
      var node = this.getSelectedNode();
      if (node) {
        var d = dialog.Dialog.alert(this.tr('Validating %1', node.getFullPath()));
        cv.ui.manager.editor.Worker.getInstance().validateConfig(node).then(function (res) {
          d.close();
          if (res === true) {
            node.setValid(true);
            cv.ui.manager.snackbar.Controller.info(this.tr('%1 has no errors!', node.getFullPath()));
          } else {
            node.setValid(false);
            qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
              file: node,
              handler: 'cv.ui.manager.editor.Source'
            });
            cv.ui.manager.snackbar.Controller.error(this.trn(
              '%1 error found in %2!',
              '%1 errors found in %2!',
              res.length,
              res.length,
              node.getFullPath())
            );
          }
        }.bind(this));
      }
    },

    /**
     * Handle message on 'cv.manager.tree.enable' topic.
     * @param ev {Event}
     * @protected
     */
    _onEnableTree: function (ev) {
      this.getChildControl('tree').setEnabled(ev.getData());
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'tree':
           control = new qx.ui.tree.VirtualTree(null, 'name', 'children');
           control.set({
             selectionMode: 'single',
             minWidth: 250
           });
           cv.ui.manager.model.Preferences.getInstance().bind('quickPreview', control, 'openMode', {
             converter: function (value) {
               return value ? 'tap' : 'dbltap';
             }
           });
           control.setDelegate({
             createItem: function () {
               var item = new cv.ui.manager.tree.VirtualFsItem();
               item.addListener('dbltap', this._onDblTapTreeSelection, this);
               item.addListener('contextmenu', this._onFsItemRightClick, this);
               return item;
             }.bind(this),

             // Bind properties from the item to the tree-widget and vice versa
             bindItem : function(controller, item, index) {
               controller.bindProperty("", "model", null, item, index);
               controller.bindPropertyReverse("open", "open", null, item, index);
               controller.bindProperty("open", "open", null, item, index);
               controller.bindProperty("readable", "enabled", null, item, index);
               controller.bindProperty("icon", "icon", null, item, index);
               controller.bindProperty("editing", "editing", null, item, index);
             }
           });
           control.getSelection().addListener("change", this._onChangeTreeSelection, this);
           this._add(control);
           break;

         case 'context-menu':
           control = new qx.ui.menu.Menu();
           control.add(new qx.ui.menu.Button(this.tr('New file'), cv.theme.dark.Images.getIcon('new-file', 18), this._commandGroup.get('new-file')));
           control.add(new qx.ui.menu.Button(this.tr('New folder'), cv.theme.dark.Images.getIcon('new-folder', 18), this._commandGroup.get('new-folder')));
           control.add(new qx.ui.menu.Separator());
           control.add(this.getChildControl('open-button'));
           control.add(new qx.ui.menu.Button(this.tr('Open with...'), cv.theme.dark.Images.getIcon('open-with', 18), null, this.getChildControl('open-with-menu')));
           control.add(new qx.ui.menu.Button(this.tr('Compare with...'), cv.theme.dark.Images.getIcon('compare', 18), null, this.getChildControl('compare-menu')));
           control.add(new qx.ui.menu.Separator());
           control.add(this.getChildControl('rename-button'));
           control.add(this.getChildControl('delete-button'));
           control.add(this.getChildControl('restore-button'));
           control.add(new qx.ui.menu.Separator());
           control.add(this.getChildControl('download-button'));
           var sep = new qx.ui.menu.Separator();
           var val = this.getChildControl('validate-config-button');
           val.bind('visibility', sep, 'visibility');
           control.add(sep);
           control.add(val);
           break;

         case 'rename-button':
           control = new qx.ui.menu.Button(this.tr('Rename'), cv.theme.dark.Images.getIcon('rename', 18), this._commandGroup.get('rename'));
           control.addListener('execute', this._onRename, this);
           break;

         case 'delete-button':
           control = new qx.ui.menu.Button(this.tr('Delete'), cv.theme.dark.Images.getIcon('delete', 18));
           control.addListener('execute', function () {
             qx.event.message.Bus.dispatchByName('cv.manager.action', 'delete');
           }, this);
           break;

         case 'download-button':
           control = new qx.ui.menu.Button(this.tr('Download'), cv.theme.dark.Images.getIcon('download', 18));
           control.addListener('execute', this._onDownload, this);
           break;

         case 'open-button':
           control = new qx.ui.menu.Button(this.tr('Open'), cv.theme.dark.Images.getIcon('open', 18));
           control.addListener('execute', function () {
             qx.event.message.Bus.dispatchByName('cv.manager.open', null);
           }, this);
           break;

         case 'restore-button':
           control = new qx.ui.menu.Button(this.tr('Restore'), cv.theme.dark.Images.getIcon('trash', 18));
           control.exclude();
           control.addListener('execute', this._onRestore, this);
           break;

         case 'validate-config-button':
           control = new qx.ui.menu.Button(this.tr('Validate'), cv.theme.dark.Images.getIcon('validate', 18));
           control.exclude();
           control.addListener('execute', this._onValidate, this);
           break;

         case 'compare-menu':
           control = new qx.ui.menu.Menu();
           break;

         case 'open-with-menu':
           control = new qx.ui.menu.Menu();
           break;
       }

       if (!control) {
         control = this._createMDragUploadChildControlImpl(id);
       }

       return control || this.base(arguments, id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.message.Bus.unsubscribe('cv.manager.tree.enable', this._onEnableTree, this);
    this._commandGroup = null;

    this._disposeObjects('_dateFormat', '_timeFormat');
  }
});
