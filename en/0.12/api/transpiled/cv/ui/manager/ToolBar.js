(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.toolbar.ToolBar": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.MenuBar": {
        "construct": true
      },
      "cv.ui.manager.upload.UploadMgr": {},
      "cv.ui.manager.control.FileController": {},
      "qx.ui.toolbar.Part": {},
      "qx.ui.toolbar.MenuButton": {},
      "cv.theme.dark.Images": {},
      "cv.ui.manager.model.FileItem": {},
      "qx.event.message.Bus": {},
      "qx.ui.toolbar.Button": {},
      "qx.locale.Manager": {},
      "qx.ui.core.Spacer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ToolBar.js 
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
   *
   */
  qx.Class.define('cv.ui.manager.ToolBar', {
    extend: qx.ui.toolbar.ToolBar,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(uploadManager, showOnly) {
      qx.ui.toolbar.ToolBar.constructor.call(this);

      if (showOnly) {
        this.__P_26_0 = showOnly;
      }

      this._menuBar = cv.ui.manager.MenuBar.getInstance();
      this._menuButtonConfig = this._menuBar.getButtonConfiguration();
      this._uploadManager = uploadManager;

      this._init();
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      'reload': 'qx.event.type.Event'
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-toolbar'
      },
      folder: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_applyFolder',
        event: 'changeFolder'
      },
      file: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_applyFile',
        event: 'changeFile'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _menuButtonConfig: null,
      _uploadManager: null,
      _menuBar: null,
      __P_26_0: null,
      __P_26_1: function __P_26_1(name) {
        return this.__P_26_0 === null || this.__P_26_0.includes(name);
      },
      _init: function _init() {
        if (!this._uploadManager) {
          this._uploadManager = new cv.ui.manager.upload.UploadMgr();
        }

        var fileController = cv.ui.manager.control.FileController.getInstance();
        var createPart = new qx.ui.toolbar.Part();
        createPart.set({
          marginLeft: 0
        });
        this.add(createPart);
        var newButton;

        if (this.__P_26_1('new-menu')) {
          newButton = new qx.ui.toolbar.MenuButton(null, cv.theme.dark.Images.getIcon('new-file', 15), this._menuBar.getChildControl('new-menu'));
          this.bind('folder.writeable', newButton, 'enabled');
          createPart.add(newButton);
        } else {
          if (this.__P_26_1('new-config-file')) {
            newButton = this._createButton('new-config-file', cv.theme.dark.Images.getIcon('new-file', 15));
            this.bind('folder.writeable', newButton, 'enabled');
            this.bind('folder', newButton, 'visibility', {
              converter: function converter(folder) {
                return folder === cv.ui.manager.model.FileItem.ROOT ? 'visible' : 'excluded';
              }
            });
            newButton.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.action.new-config-file', this.getFolder());
            }, this);
            createPart.add(newButton);
          } else if (this.__P_26_1('new-file')) {
            newButton = this._createButton('new-file', null, true);
            this.bind('folder.writeable', newButton, 'enabled');
            newButton.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.action.new-file', this.getFolder());
            }, this);
            createPart.add(newButton);
          }

          if (this.__P_26_1('new-folder')) {
            newButton = this._createButton('new-folder', cv.theme.dark.Images.getIcon('new-folder', 15), true);
            this.bind('folder.writeable', newButton, 'enabled');
            newButton.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.action.new-folder', this.getFolder());
            }, this);
            createPart.add(newButton);
          }
        }

        if (this.__P_26_1('upload')) {
          var upload = this._createButton('upload');

          this._uploadManager.addWidget(upload);

          this.bind('folder.writeable', upload, 'enabled');
          createPart.add(upload);
        }

        if (this.__P_26_1('delete')) {
          var deleteSelection = this._createButton('delete');

          deleteSelection.addListener('execute', function () {
            fileController["delete"](this.getFile());
          }, this);
          this.bind('file', deleteSelection, 'enabled', {
            converter: function converter(file) {
              return !!file && file.isWriteable() && !file.isFake();
            }
          });
          this.add(deleteSelection);
        }

        if (this.__P_26_1('download')) {
          var download = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('download', 15));
          download.setAppearance('cv-toolbar-button');
          download.setToolTipText(qx.locale.Manager.tr('Download'));
          download.addListener('execute', function () {
            fileController.download(this.getFile());
          }, this); // download button is only enabled when a file is selected

          this.bind('file', download, 'enabled', {
            converter: function converter(file) {
              return !!file && file.getType() === 'file' && !file.isFake();
            }
          });
          createPart.add(download);
        }

        if (this.__P_26_1('validate')) {
          // config check
          var checkConfig = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('validate', 15));
          checkConfig.setAppearance('cv-toolbar-button');
          checkConfig.setToolTipText(qx.locale.Manager.tr('Validate'));
          checkConfig.addListener('execute', function () {
            fileController.validate(this.getFile());
          }, this); // validate button is only enabled when a file is selected

          this.bind('file', checkConfig, 'enabled', {
            converter: function converter(file) {
              return !!file && file.isConfigFile();
            }
          });
          this.add(checkConfig);
        }

        if (this.__P_26_1('reload')) {
          var reload = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 15));
          reload.setAppearance('cv-toolbar-button');
          reload.setToolTipText(qx.locale.Manager.tr('Reload'));
          reload.addListener('execute', function () {
            this.fireEvent('reload');
          }, this);
          this.add(new qx.ui.core.Spacer(), {
            flex: 1
          });
          this.add(reload);
        }
      },
      _createButton: function _createButton(name, icon, doNotUseCommand) {
        var args = this._menuButtonConfig[name].args;
        var button = new qx.ui.toolbar.Button(null, icon || args[1].replace(/\/[0-9]+$/, '/15'), !doNotUseCommand ? args[2] : null);
        button.setAppearance('cv-toolbar-button');
        button.setToolTipText(args[0]);
        return button;
      },
      _applyFile: function _applyFile() {},
      _applyFolder: function _applyFolder(value) {
        if (this._uploadManager) {
          if (value) {
            this._uploadManager.setFolder(value);
          } else {
            this._uploadManager.resetFolder();
          }
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._menuButtonConfig = null;
      this._uploadManager = null;
      this.__P_26_2 = null;
    }
  });
  cv.ui.manager.ToolBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToolBar.js.map?dt=1647153215218