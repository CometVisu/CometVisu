/* FileItem.js
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
qx.Class.define('cv.ui.manager.contextmenu.FileItem', {
  extend: qx.ui.menu.Menu,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(file, noCompare) {
    super();
    this._noCompare = noCompare === true;
    this._commandGroup = qx.core.Init.getApplication().getCommandManager().getActive();
    this._init();
    this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat('medium'));

    this._timeFormat = new qx.util.format.DateFormat(qx.locale.Date.getTimeFormat('medium'));

    if (file) {
      this.configure(file);
    }

    // only react to events when this menu is visible
    this.addListener('appear', function () {
      this.setActive(true);
    });
    this.addListener('disappear', function () {
      this.setActive(false);
    });
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-file-contextmenu'
    },

    /* This flag enables the event handling for this menu */
    active: {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _commandGroup: null,
    _selectedNode: null,
    _dateFormat: null,
    _timeFormat: null,
    _renameDialog: null,
    _noCompare: false,

    configure(file) {
      this._selectedNode = file;
      if (file) {
        const isFolder = file.getType() === 'dir';
        const folder = isFolder ? file : file.getParent();
        let isBackup = false;
        if ((folder && folder.getFullPath().startsWith('backup')) || file.getFullPath().startsWith('backup')) {
          isBackup = true;
        }
        if (!isFolder) {
          this.getChildControl('new-file-button').exclude();
          this.getChildControl('new-folder-button').exclude();
        } else {
          this.getChildControl('new-file-button').set({
            enabled: folder && !isBackup ? folder.isWriteable() : false,
            visibility: 'visible'
          });

          this.getChildControl('new-folder-button').set({
            enabled: folder && !isBackup ? folder.isWriteable() : false,
            visibility: 'visible'
          });
        }
        this.getChildControl('clone-file-button').setVisibility(
          file.isConfigFile() && !isBackup ? 'visible' : 'excluded'
        );

        this.getChildControl('convert-file-button').setVisibility(
          file.isConfigFile() && !file.isMounted() && !isBackup ? 'visible' : 'excluded'
        );

        this.getChildControl('delete-button').setLabel(file.isTrash() ? this.tr('Clear') : this.tr('Delete'));

        // create compare menu
        if (!this._noCompare) {
          const compareMenu = this.getChildControl('compare-menu');
          compareMenu.removeAll();
          if (!isBackup) {
            this.getChildControl('compare-with-button').show();
            const backups = cv.ui.manager.model.BackupFolder.getInstance().getBackupFiles(file);

            this.getChildControl('compare-with-button').setEnabled(backups.length > 0);

            backups.sort(function (a, b) {
              return b.date.getTime() - a.date.getTime();
            });
            let group = null;
            backups.forEach(function (backupEntry) {
              const date = this._dateFormat.format(backupEntry.date);
              if (group !== date) {
                if (group !== null) {
                  compareMenu.add(new qx.ui.menu.Separator());
                }
                const groupButton = new qx.ui.menu.Button(date);
                groupButton.setEnabled(false);
                compareMenu.add(groupButton);
                group = date;
              }
              const button = new qx.ui.menu.Button(
                this.tr('Backup from %1', this._timeFormat.format(backupEntry.date))
              );

              button.setUserData('file', backupEntry.file);
              button.addListener('execute', this._onCompareWith, this);
              compareMenu.add(button);
            }, this);
          } else {
            this.getChildControl('compare-with-button').exclude();
          }
        }

        const defaultHandler = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);

        // open with menu
        const openWithMenu = this.getChildControl('open-with-menu');
        openWithMenu.removeAll();
        if (!isBackup) {
          this.getChildControl('open-with-button').show();
          const availableHandlers = cv.ui.manager.control.FileHandlerRegistry.getInstance().getAllFileHandlers(file);

          // this menu only makes sense when there is more than one option to select from
          this.getChildControl('open-with-button').setEnabled(availableHandlers.length > 1);

          availableHandlers.sort(function (a, b) {
            return a.Clazz.constructor.TITLE.toString().localeCompare(b.Clazz.constructor.TITLE.toString());
          });
          availableHandlers.forEach(function (handlerConf) {
            const button = new qx.ui.menu.Button(
              handlerConf.Clazz.constructor.TITLE,
              handlerConf.Clazz.constructor.ICON
            );

            button.setAppearance('open-with-button');
            if (defaultHandler.Clazz.classname === handlerConf.Clazz.classname) {
              button.addState('default');
            }
            button.setUserData('handlerId', handlerConf.Clazz.classname);
            button.addListener('execute', this._onOpenWith, this);
            openWithMenu.add(button);
          }, this);
        } else {
          this.getChildControl('open-with-button').exclude();
        }

        // validate button
        this.getChildControl('validate-config-button').setVisibility(
          file.isConfigFile() && !file.isMounted() && !isBackup ? 'visible' : 'excluded'
        );

        // replacement button
        if (!isFolder && !isBackup) {
          this.getChildControl('replace-button').show();
          this._replacementManager.setFilename(file.getName());
          this._replacementManager.setFolder(file.getParent());
        } else {
          this.getChildControl('replace-button').exclude();
        }
        // buttons that need write access
        ['replace-button', 'rename-button'].forEach(function (controlName) {
          this.getChildControl(controlName).setEnabled(
            !file.isFake() && file.isWriteable() && !isBackup && !file.isTrash()
          );
        }, this);
        this.getChildControl('delete-button').setEnabled(!file.isFake() && file.isWriteable());
        this.getChildControl('download-button').setEnabled(!file.isFake() && file.getType() === 'file');

        this.getChildControl('restore-button').setVisibility(file.isInTrash() || isBackup ? 'visible' : 'excluded');
      } else {
        this.getChildControl('delete-button').set({
          label: this.tr('Delete'),
          enabled: false
        });

        this.getChildControl('replace-button').exclude();
        this.getChildControl('download-button').setEnabled(false);
        this.getChildControl('restore-button').exclude();
      }
    },

    _init() {
      if (!this._noNew) {
        this.add(this.getChildControl('new-file-button'));
      }
      this.add(this.getChildControl('clone-file-button'));
      this.add(this.getChildControl('convert-file-button'));
      if (!this._noNew) {
        this.add(this.getChildControl('new-folder-button'));
      }
      this.add(new qx.ui.menu.Separator());
      this.add(this.getChildControl('open-button'));
      this.add(this.getChildControl('open-with-button'));
      if (!this._noCompare) {
        this.add(this.getChildControl('compare-with-button'));
      }
      this.add(new qx.ui.menu.Separator());
      this.add(this.getChildControl('rename-button'));
      this.add(this.getChildControl('delete-button'));
      this.add(this.getChildControl('restore-button'));
      this.add(new qx.ui.menu.Separator());
      this.add(this.getChildControl('download-button'));
      let sep = new qx.ui.menu.Separator();
      let button = this.getChildControl('replace-button');
      this.add(sep);
      this.add(button);
      button.bind('visibility', sep, 'visibility');
      sep = new qx.ui.menu.Separator();
      button = this.getChildControl('validate-config-button');
      button.bind('visibility', sep, 'visibility');
      this.add(sep);
      this.add(button);
    },

    _onCompareWith(ev) {
      if (this.isActive()) {
        const compareWith = ev.getTarget().getUserData('file');
        qx.event.message.Bus.dispatchByName(
          'cv.manager.compareFiles',
          new cv.ui.manager.model.CompareFiles(compareWith, this._selectedNode)
        );
      }
    },

    _onOpenWith(ev) {
      if (this.isActive()) {
        const handlerId = ev.getTarget().getUserData('handlerId');
        qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
          file: this._selectedNode,
          handler: handlerId
        });
      }
    },

    _onRename() {
      if (this._selectedNode && this.isActive()) {
        if (!this._renameDialog) {
          this._renameDialog = new cv.ui.manager.dialog.Prompt({
            message: this.tr('New name'),
            callback: name => {
              if (name && name !== this._selectedNode.getName()) {
                cv.ui.manager.control.FileController.getInstance().rename(this._selectedNode, name);
              }
            },
            context: this,
            value: this._selectedNode.getName(),
            caption: this.tr('Rename file'),
            filter: /[\w\d_\-\.\s]/
          });
        } else {
          this._renameDialog.setValue(this._selectedNode.getName());
          this._renameDialog.setCallback(name => {
            if (name && name !== this._selectedNode.getName()) {
              cv.ui.manager.control.FileController.getInstance().rename(this._selectedNode, name);
            }
          });
        }
        this._renameDialog.show();
      }
    },

    _onDownload() {
      if (this._selectedNode && this.isActive()) {
        cv.ui.manager.control.FileController.getInstance().download(this._selectedNode);
      }
    },

    _onRestore() {
      if (this._selectedNode && this.isActive()) {
        cv.ui.manager.control.FileController.getInstance().restore(this._selectedNode);
      }
    },

    _onValidate() {
      if (this._selectedNode && this.isActive()) {
        cv.ui.manager.control.FileController.getInstance().validate(this._selectedNode);
      }
    },

    _onClone() {
      if (this._selectedNode && this.isActive()) {
        qx.event.message.Bus.dispatchByName('cv.manager.action.clone', {
          file: this._selectedNode
        });
      }
    },

    _onConvert() {
      if (this._selectedNode && this.isActive()) {
        qx.event.message.Bus.dispatchByName('cv.manager.action.convertToTile', {
          file: this._selectedNode
        });
      }
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case 'new-file-button':
          control = new qx.ui.menu.Button(this.tr('New file'), cv.theme.dark.Images.getIcon('new-file', 18));

          control.addListener('execute', () => {
            if (this._selectedNode.isConfigFile()) {
              qx.event.message.Bus.dispatchByName('cv.manager.action.new-config-file', this._selectedNode.getParent());
            } else {
              qx.event.message.Bus.dispatchByName(
                'cv.manager.action.new-file',
                this._selectedNode.getType() === 'dir' ? this._selectedNode : this._selectedNode.getParent()
              );
            }
          });
          break;

        case 'clone-file-button':
          control = new qx.ui.menu.Button(this.tr('Clone file'), cv.theme.dark.Images.getIcon('clone-file', 18));

          control.exclude();
          control.addListener('execute', this._onClone, this);
          break;

        case 'new-folder-button':
          control = new qx.ui.menu.Button(this.tr('New folder'), cv.theme.dark.Images.getIcon('new-folder', 18));

          control.addListener('execute', () => {
            qx.event.message.Bus.dispatchByName(
              'cv.manager.action.new-folder',
              this._selectedNode.getType() === 'dir' ? this._selectedNode : this._selectedNode.getParent()
            );
          });
          break;

        case 'rename-button':
          control = new qx.ui.menu.Button(this.tr('Rename'), cv.theme.dark.Images.getIcon('rename', 18));

          control.addListener('execute', this._onRename, this);
          break;

        case 'delete-button':
          control = new qx.ui.menu.Button(this.tr('Delete'), cv.theme.dark.Images.getIcon('delete', 18));

          control.addListener('execute', () => {
            qx.event.message.Bus.dispatchByName('cv.manager.action.delete', this._selectedNode);
          });
          break;

        case 'download-button':
          control = new qx.ui.menu.Button(this.tr('Download'), cv.theme.dark.Images.getIcon('download', 18));

          control.addListener('execute', this._onDownload, this);
          break;

        case 'open-button':
          control = new qx.ui.menu.Button(this.tr('Open'), cv.theme.dark.Images.getIcon('open', 18));

          control.addListener('execute', () => {
            qx.event.message.Bus.dispatchByName('cv.manager.open', this._selectedNode);
          });
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

        case 'replace-button':
          control = new com.zenesis.qx.upload.UploadMenuButton(
            this.tr('Replace'),
            cv.theme.dark.Images.getIcon('upload', 18)
          );

          control.exclude();
          this._replacementManager = new cv.ui.manager.upload.UploadMgr();
          this._replacementManager.setForce(true);
          this._replacementManager.addWidget(control);
          break;

        case 'compare-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'compare-with-button':
          control = new qx.ui.menu.Button(
            this.tr('Compare with...'),
            cv.theme.dark.Images.getIcon('compare', 18),
            null,
            this.getChildControl('compare-menu')
          );

          break;

        case 'open-with-button':
          control = new qx.ui.menu.Button(
            this.tr('Open with...'),
            cv.theme.dark.Images.getIcon('open-with', 18),
            null,
            this.getChildControl('open-with-menu')
          );

          break;

        case 'open-with-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'convert-file-button':
          control = new qx.ui.menu.Button(
            this.tr('Convert to tile structure'),
            cv.theme.dark.Images.getIcon('convert', 18)
          );

          control.addListener('execute', this._onConvert, this);
          break;
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
    this._commandGroup = null;
    this._renameDialog = null;
    this._disposeObjects('_dateFormat', '_timeFormat');
  }
});
