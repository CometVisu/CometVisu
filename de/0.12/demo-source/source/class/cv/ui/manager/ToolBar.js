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
  construct: function (uploadManager, showOnly) {
    this.base(arguments);

    if (showOnly) {
      this.__showOnly = showOnly;
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
    __showOnly: null,

    __show: function (name) {
      return this.__showOnly === null || this.__showOnly.includes(name);
    },

    _init: function () {
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

      if (this.__show('new-menu')) {
        newButton = new qx.ui.toolbar.MenuButton(null,
          cv.theme.dark.Images.getIcon('new-file', 15),
          this._menuBar.getChildControl('new-menu')
        );
        this.bind('folder.writeable', newButton, 'enabled');
        createPart.add(newButton);
      } else {
        if (this.__show('new-config-file')) {
          newButton = this._createButton('new-config-file', cv.theme.dark.Images.getIcon('new-file', 15));
          this.bind('folder.writeable', newButton, 'enabled');
          this.bind('folder', newButton, 'visibility', {
            converter: function (folder) {
              return folder === cv.ui.manager.model.FileItem.ROOT ? 'visible' : 'excluded';
            }
          });
          newButton.addListener('execute', function () {
            qx.event.message.Bus.dispatchByName('cv.manager.action.new-config-file', this.getFolder());
          }, this);
          createPart.add(newButton);
        } else if (this.__show('new-file')) {
          newButton = this._createButton('new-file', null, true);
          this.bind('folder.writeable', newButton, 'enabled');
          newButton.addListener('execute', function () {
            qx.event.message.Bus.dispatchByName('cv.manager.action.new-file', this.getFolder());
          }, this);
          createPart.add(newButton);
        }
        if (this.__show('new-folder')) {
          newButton = this._createButton('new-folder', cv.theme.dark.Images.getIcon('new-folder', 15), true);
          this.bind('folder.writeable', newButton, 'enabled');
          newButton.addListener('execute', function () {
            qx.event.message.Bus.dispatchByName('cv.manager.action.new-folder', this.getFolder());
          }, this);
          createPart.add(newButton);
        }
      }

      if (this.__show('upload')) {
        var upload = this._createButton('upload');
        this._uploadManager.addWidget(upload);
        this.bind('folder.writeable', upload, 'enabled');
        createPart.add(upload);
      }

      if (this.__show('delete')) {
        var deleteSelection = this._createButton('delete');
        deleteSelection.addListener('execute', function () {
          fileController.delete(this.getFile());
        }, this);
        this.bind('file', deleteSelection, 'enabled', {
          converter: function (file) {
            return !!file && file.isWriteable() && !file.isFake();
          }
        });
        this.add(deleteSelection);
      }

      if (this.__show('download')) {
        var download = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('download', 15));
        download.setAppearance('cv-toolbar-button');
        download.setToolTipText(qx.locale.Manager.tr('Download'));
        download.addListener('execute', function () {
          fileController.download(this.getFile());
        }, this);
        // download button is only enabled when a file is selected
        this.bind('file', download, 'enabled', {
          converter: function (file) {
            return !!file && file.getType() === 'file' && !file.isFake();
          }
        });
        createPart.add(download);
      }

      if (this.__show('validate')) {
        // config check
        var checkConfig = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('validate', 15));
        checkConfig.setAppearance('cv-toolbar-button');
        checkConfig.setToolTipText(qx.locale.Manager.tr('Validate'));
        checkConfig.addListener('execute', function () {
          fileController.validate(this.getFile());
        }, this);

        // validate button is only enabled when a file is selected
        this.bind('file', checkConfig, 'enabled', {
          converter: function (file) {
            return !!file && file.isConfigFile();
          }
        });
        this.add(checkConfig);
      }

      if (this.__show('reload')) {
        var reload = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 15));
        reload.setAppearance('cv-toolbar-button');
        reload.setToolTipText(qx.locale.Manager.tr('Reload'));
        reload.addListener('execute', function () {
          this.fireEvent('reload');
        }, this);
        this.add(new qx.ui.core.Spacer(), {flex: 1});
        this.add(reload);
      }
    },

    _createButton: function (name, icon, doNotUseCommand) {
      var args = this._menuButtonConfig[name].args;
      var button = new qx.ui.toolbar.Button(null, icon || args[1].replace(/\/[0-9]+$/, '/15'), !doNotUseCommand ? args[2] : null);
      button.setAppearance('cv-toolbar-button');
      button.setToolTipText(args[0]);
      return button;
    },

    _applyFile: function () {

    },

    _applyFolder: function (value) {
      if (this._uploadManager) {
        if (value) {
          this._uploadManager.setFolder(value)
        } else {
          this._uploadManager.resetFolder()
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._menuButtonConfig = null;
    this._uploadManager = null;
    this.__menuBar = null;
  }
});
