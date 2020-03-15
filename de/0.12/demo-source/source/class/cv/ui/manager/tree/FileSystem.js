/**
 * Shows filesystem content in a tree.
 */
qx.Class.define('cv.ui.manager.tree.FileSystem', {
  extend: qx.ui.core.Widget,
  include: [
    cv.ui.manager.upload.MDragUpload
  ],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (rootFolder) {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());
    this.setRootFolder(rootFolder);

    qx.event.message.Bus.subscribe('cv.manager.tree.enable', this._onEnableTree, this);
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
    // appearance: {
    //   refine: true,
    //   init: 'cv-filesystem'
    // },

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
    __ignoreSelectionChange: false,
    _replacementManager: null,

    reload: function () {
      var tree = this.getChildControl('tree');
      var openPaths = tree.getOpenNodes().map(function (node) { return node.getFullPath(); });
      var root = tree.getModel();
      root.reload(function () {
        this.getChildControl('tree').refresh();
        root.setOpen(true);
        openPaths.forEach(this.openPath, this)
      }, this);
    },

    openPath: function (path) {
      var root = this.getChildControl('tree').getModel();
      if (path === '.') {
        root.setOpen(true);
      } else {
        root.setOpen(true);
        root.openPath(path);
      }
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
      var contextMenu = cv.ui.manager.contextmenu.GlobalFileItem.getInstance();
      contextMenu.configure(value);
      if (value) {
        tree.setContextMenu(contextMenu);
      }
    },

    setSelection : function (node) {
      this.getChildControl('tree').getSelection().replace([node]);
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
        tree.resetContextMenu();
        this.resetSelectedNode();
      }
    },

    _onFsItemRightClick: function (ev) {
      var tree = this.getChildControl('tree');
      var widget = ev.getTarget();
      if (widget instanceof cv.ui.manager.tree.VirtualFsItem) {
        var node = widget.getModel();
        if (node) {
          this.__ignoreSelectionChange = true;
          tree.getSelection().replace([node]);
          this.setSelectedNode(node);
          this.fireDataEvent('changeSelection', {
            'node': node,
            'mode': 'contextmenu'
          });
          this.__ignoreSelectionChange = false;
        }
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

    this._disposeObjects('_dateFormat', '_timeFormat', '_replacementManager');
  }
});
