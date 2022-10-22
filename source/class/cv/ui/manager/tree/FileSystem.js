/* FileSystem.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * Shows filesystem content in a tree.
 */
qx.Class.define('cv.ui.manager.tree.FileSystem', {
  extend: qx.ui.core.Widget,
  include: [cv.ui.manager.upload.MDragUpload],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(rootFolder) {
    super();
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

    getMimetypeFromSuffix(suffix) {
      return Object.keys(this.MIMETYPES).find(function (mime) {
        return this.MIMETYPES[mime] === suffix;
      }, this);
    },

    isAccepted(mimetype) {
      return Object.prototype.hasOwnProperty.call(this.MIMETYPES, mimetype);
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    changeSelection: 'qx.event.type.Data'
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

    reload() {
      const tree = this.getChildControl('tree');
      const openPaths = tree.getOpenNodes().map(function (node) {
        return node.getFullPath();
      });
      const root = tree.getModel();
      root.reload(function () {
        this.getChildControl('tree').refresh();
        root.setOpen(true);
        openPaths.forEach(this.openPath, this);
      }, this);
    },

    openPath(path) {
      const root = this.getChildControl('tree').getModel();
      if (path === '.') {
        root.setOpen(true);
      } else {
        root.setOpen(true);
        root.openPath(path);
      }
    },

    refresh() {
      this.getChildControl('tree').refresh();
    },

    _applyRootFolder(value) {
      if (value) {
        const tree = this.getChildControl('tree');
        tree.setModel(value);
        value.load(function () {
          tree.setHideRoot(true);
        }, this);
      }
    },

    _applySelectedNode(value) {
      const tree = this.getChildControl('tree');
      const contextMenu = cv.ui.manager.contextmenu.GlobalFileItem.getInstance();
      contextMenu.configure(value);
      if (value) {
        tree.setContextMenu(contextMenu);
      }
    },

    setSelection(node) {
      this.getChildControl('tree').getSelection().replace([node]);
    },

    _onDblTapTreeSelection() {
      const sel = this.getSelectedNode();
      if (sel) {
        if (this.__selectionTimer) {
          this.__selectionTimer.stop();
        }
        // only files show a different behaviour when double-clicked (permanent vs. preview mode)
        if (sel.getType() === 'file') {
          this.fireDataEvent('changeSelection', {
            node: sel,
            mode: 'dbltap'
          });
        }
      }
    },

    _onChangeTreeSelection() {
      if (this.__selectionTimer) {
        this.__selectionTimer.stop();
      }
      if (this.__ignoreSelectionChange === true) {
        return;
      }
      const tree = this.getChildControl('tree');
      const sel = tree.getSelection();
      if (sel.length > 0) {
        const node = sel.getItem(0);
        this.setSelectedNode(node);
        // wait for double tap
        if (node.getType() === 'file') {
          this.__selectionTimer = qx.event.Timer.once(
            function () {
              this.fireDataEvent('changeSelection', {
                node: this.getSelectedNode(),
                mode: 'tap'
              });

              this.__selectionTimer = null;
            },
            this,
            this.__doubleTapWaitingTime
          );
        } else {
          this.fireDataEvent('changeSelection', {
            node: node,
            mode: 'tap'
          });
        }
      } else {
        tree.resetContextMenu();
        this.resetSelectedNode();
      }
    },

    _onFsItemRightClick(ev) {
      const tree = this.getChildControl('tree');
      const widget = ev.getTarget();
      if (widget instanceof cv.ui.manager.tree.VirtualFsItem) {
        const node = widget.getModel();
        if (node) {
          this.__ignoreSelectionChange = true;
          tree.getSelection().replace([node]);
          this.setSelectedNode(node);
          this.fireDataEvent('changeSelection', {
            node: node,
            mode: 'contextmenu'
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
    _onEnableTree(ev) {
      this.getChildControl('tree').setEnabled(ev.getData());
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case 'tree':
          control = new qx.ui.tree.VirtualTree(null, 'name', 'children');
          control.set({
            selectionMode: 'single',
            minWidth: 250,
            showTopLevelOpenCloseIcons: true
          });

          cv.ui.manager.model.Preferences.getInstance().bind('quickPreview', control, 'openMode', {
            converter(value) {
              return value ? 'tap' : 'dbltap';
            }
          });

          control.setDelegate({
            createItem: function () {
              const item = new cv.ui.manager.tree.VirtualFsItem();
              item.addListener('dbltap', this._onDblTapTreeSelection, this);
              item.addListener('contextmenu', this._onFsItemRightClick, this);
              return item;
            }.bind(this),

            // Bind properties from the item to the tree-widget and vice versa
            bindItem(controller, item, index) {
              controller.bindProperty('', 'model', null, item, index);
              controller.bindPropertyReverse('open', 'open', null, item, index);
              controller.bindProperty('open', 'open', null, item, index);
              controller.bindProperty('readable', 'enabled', null, item, index);
              controller.bindProperty('icon', 'icon', null, item, index);
              controller.bindProperty('editing', 'editing', null, item, index);
            }
          });

          control.getSelection().addListener('change', this._onChangeTreeSelection, this);
          this._add(control);
          break;
      }

      if (!control) {
        control = this._createMDragUploadChildControlImpl(id);
      }

      return control || super._createChildControlImpl(id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    qx.event.message.Bus.unsubscribe('cv.manager.tree.enable', this._onEnableTree, this);

    this._disposeObjects('_dateFormat', '_timeFormat', '_replacementManager');
  }
});
