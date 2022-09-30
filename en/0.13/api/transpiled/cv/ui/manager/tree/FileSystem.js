(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.upload.MDragUpload": {
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "cv.ui.manager.contextmenu.GlobalFileItem": {},
      "qx.event.Timer": {},
      "cv.ui.manager.tree.VirtualFsItem": {},
      "qx.ui.tree.VirtualTree": {},
      "cv.ui.manager.model.Preferences": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(rootFolder) {
      qx.ui.core.Widget.constructor.call(this);

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
      getMimetypeFromSuffix: function getMimetypeFromSuffix(suffix) {
        return Object.keys(this.MIMETYPES).find(function (mime) {
          return this.MIMETYPES[mime] === suffix;
        }, this);
      },
      isAccepted: function isAccepted(mimetype) {
        return Object.prototype.hasOwnProperty.call(this.MIMETYPES, mimetype);
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
      __P_49_0: null,
      __P_49_1: 500,
      __P_49_2: false,
      _replacementManager: null,
      reload: function reload() {
        var tree = this.getChildControl('tree');
        var openPaths = tree.getOpenNodes().map(function (node) {
          return node.getFullPath();
        });
        var root = tree.getModel();
        root.reload(function () {
          this.getChildControl('tree').refresh();
          root.setOpen(true);
          openPaths.forEach(this.openPath, this);
        }, this);
      },
      openPath: function openPath(path) {
        var root = this.getChildControl('tree').getModel();

        if (path === '.') {
          root.setOpen(true);
        } else {
          root.setOpen(true);
          root.openPath(path);
        }
      },
      refresh: function refresh() {
        this.getChildControl('tree').refresh();
      },
      _applyRootFolder: function _applyRootFolder(value) {
        if (value) {
          var tree = this.getChildControl('tree');
          tree.setModel(value);
          value.load(function () {
            tree.setHideRoot(true);
          }, this);
        }
      },
      _applySelectedNode: function _applySelectedNode(value) {
        var tree = this.getChildControl('tree');
        var contextMenu = cv.ui.manager.contextmenu.GlobalFileItem.getInstance();
        contextMenu.configure(value);

        if (value) {
          tree.setContextMenu(contextMenu);
        }
      },
      setSelection: function setSelection(node) {
        this.getChildControl('tree').getSelection().replace([node]);
      },
      _onDblTapTreeSelection: function _onDblTapTreeSelection() {
        var sel = this.getSelectedNode();

        if (sel) {
          if (this.__P_49_0) {
            this.__P_49_0.stop();
          } // only files show a different behaviour when double-clicked (permanent vs. preview mode)


          if (sel.getType() === 'file') {
            this.fireDataEvent('changeSelection', {
              'node': sel,
              'mode': 'dbltap'
            });
          }
        }
      },
      _onChangeTreeSelection: function _onChangeTreeSelection() {
        if (this.__P_49_0) {
          this.__P_49_0.stop();
        }

        if (this.__P_49_2 === true) {
          return;
        }

        var tree = this.getChildControl('tree');
        var sel = tree.getSelection();

        if (sel.length > 0) {
          var node = sel.getItem(0);
          this.setSelectedNode(node); // wait for double tap

          if (node.getType() === 'file') {
            this.__P_49_0 = qx.event.Timer.once(function () {
              this.fireDataEvent('changeSelection', {
                'node': this.getSelectedNode(),
                'mode': 'tap'
              });
              this.__P_49_0 = null;
            }, this, this.__P_49_1);
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
      _onFsItemRightClick: function _onFsItemRightClick(ev) {
        var tree = this.getChildControl('tree');
        var widget = ev.getTarget();

        if (widget instanceof cv.ui.manager.tree.VirtualFsItem) {
          var node = widget.getModel();

          if (node) {
            this.__P_49_2 = true;
            tree.getSelection().replace([node]);
            this.setSelectedNode(node);
            this.fireDataEvent('changeSelection', {
              'node': node,
              'mode': 'contextmenu'
            });
            this.__P_49_2 = false;
          }
        }
      },

      /**
       * Handle message on 'cv.manager.tree.enable' topic.
       * @param ev {Event}
       * @protected
       */
      _onEnableTree: function _onEnableTree(ev) {
        this.getChildControl('tree').setEnabled(ev.getData());
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'tree':
            control = new qx.ui.tree.VirtualTree(null, 'name', 'children');
            control.set({
              selectionMode: 'single',
              minWidth: 250,
              showTopLevelOpenCloseIcons: true
            });
            cv.ui.manager.model.Preferences.getInstance().bind('quickPreview', control, 'openMode', {
              converter: function converter(value) {
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
              bindItem: function bindItem(controller, item, index) {
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

        return control || cv.ui.manager.tree.FileSystem.superclass.prototype._createChildControlImpl.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.manager.tree.enable', this._onEnableTree, this);

      this._disposeObjects('_dateFormat', '_timeFormat', '_replacementManager');
    }
  });
  cv.ui.manager.tree.FileSystem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileSystem.js.map?dt=1664557328210