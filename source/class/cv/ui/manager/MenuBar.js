/* MenuBar.js
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
 * Main toolbar on top.
 */
qx.Class.define('cv.ui.manager.MenuBar', {
  extend: qx.ui.menubar.MenuBar,
  type: 'singleton',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this._commandGroup = qx.core.Init.getApplication()
      .getCommandManager()
      .getActive();
    this.__buttons = {};

    this._draw();
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _commandGroup: null,
    __buttons: null,
    __defaultButtonConfiguration: null,
    __buttonConfiguration: null,

    _draw() {
      this._createChildControl('file');
      this._createChildControl('edit');
      this._createChildControl('preferences');
      this.add(new qx.ui.core.Spacer(), { flex: 1 });

      this._createChildControl('title');
      this.add(new qx.ui.core.Spacer(), { flex: 1 });
      this._createChildControl('help');

      const editorGroup = new qx.ui.form.RadioGroup();

      this.__defaultButtonConfiguration = {
        'new-file': {
          menu: 'new-menu',
          args: [
            this.tr('New file'),
            cv.theme.dark.Images.getIcon('new-file', 18),
            this._commandGroup.get('new-file')
          ],

          enabled: true
        },

        'new-folder': {
          menu: 'new-menu',
          args: [
            this.tr('New folder'),
            cv.theme.dark.Images.getIcon('new-folder', 18),
            this._commandGroup.get('new-folder')
          ],

          enabled: true,
          separator: 'after'
        },

        'new-config-file': {
          menu: 'new-menu',
          args: [this.tr('New config file')],
          enabled: true
        },

        upload: {
          menu: 'file-menu',
          clazz: com.zenesis.qx.upload.UploadMenuButton,
          args: [
            this.tr('Upload file'),
            cv.theme.dark.Images.getIcon('upload', 18)
          ],

          enabled: true,
          separator: 'before'
        },

        save: {
          menu: 'file-menu',
          args: [
            this.tr('Save'),
            cv.theme.dark.Images.getIcon('save', 18),
            this._commandGroup.get('save')
          ],

          enabled: false,
          separator: 'before'
        },

        'save-as': {
          menu: 'file-menu',
          args: [
            this.tr('Save as...'),
            null,
            this._commandGroup.get('save-as')
          ],

          enabled: false
        },

        delete: {
          args: [
            this.tr('Delete'),
            cv.theme.dark.Images.getIcon('delete', 18),
            this._commandGroup.get('delete')
          ],

          enabled: false,
          hidden: true
        },

        quit: {
          menu: 'file-menu',
          args: [
            this.tr('Quit'),
            cv.theme.dark.Images.getIcon('quit', 18),
            this._commandGroup.get('quit')
          ],

          enabled: true,
          separator: 'before'
        },

        // edit menu basics
        undo: {
          menu: 'edit-menu',
          args: [
            this.tr('Undo'),
            cv.theme.dark.Images.getIcon('undo', 18),
            this._commandGroup.get('undo')
          ],

          enabled: true
        },

        redo: {
          menu: 'edit-menu',
          args: [
            this.tr('Redo'),
            cv.theme.dark.Images.getIcon('redo', 18),
            this._commandGroup.get('redo')
          ],

          enabled: true
        },

        cut: {
          menu: 'edit-menu',
          args: [
            this.tr('Cut'),
            cv.theme.dark.Images.getIcon('cut', 18),
            this._commandGroup.get('cut')
          ],

          enabled: false,
          separator: 'before'
        },

        copy: {
          menu: 'edit-menu',
          args: [
            this.tr('Copy'),
            cv.theme.dark.Images.getIcon('copy', 18),
            this._commandGroup.get('copy')
          ],

          enabled: false
        },

        paste: {
          menu: 'edit-menu',
          args: [
            this.tr('Paste'),
            cv.theme.dark.Images.getIcon('paste', 18),
            this._commandGroup.get('paste')
          ],

          enabled: false
        },

        // preferences
        'source-editor': {
          menu: 'preferences-menu',
          clazz: qx.ui.menu.RadioButton,
          args: [this.tr('Use text editor')],
          general: true,
          enabled: true,
          properties: {
            model: 'source',
            group: editorGroup
          }
        },

        'xml-editor': {
          menu: 'preferences-menu',
          clazz: qx.ui.menu.RadioButton,
          args: [this.tr('Use xml editor')],
          general: true,
          enabled: true,
          properties: {
            model: 'xml',
            group: editorGroup
          }
        },

        'quick-preview': {
          menu: 'preferences-menu',
          clazz: qx.ui.menu.CheckBox,
          args: [this.tr('Enable quick preview')],
          general: true,
          enabled: true,
          separator: 'before'
        },

        'expert-mode': {
          menu: 'preferences-menu',
          clazz: qx.ui.menu.CheckBox,
          args: [this.tr('Expert mode')],
          general: true,
          enabled: true
        },

        help: {
          menu: 'help-menu',
          args: [
            this.tr('Help'),
            cv.theme.dark.Images.getIcon('help', 18),
            this._commandGroup.get('help')
          ],

          enabled: false
        },

        about: {
          menu: 'help-menu',
          args: [this.tr('About')],
          enabled: false
        }
      };

      this.maintainButtons();

      const prefs = cv.ui.manager.model.Preferences.getInstance();

      prefs.bind('defaultConfigEditor', editorGroup, 'modelSelection', {
        converter(value) {
          return [value];
        }
      });

      editorGroup.getModelSelection().addListener('change', () => {
        prefs.setDefaultConfigEditor(
          editorGroup.getModelSelection().getItem(0)
        );
      });

      this.__bindToPreference('quick-preview', 'quickPreview');
      this.__bindToPreference('expert-mode', 'expertMode');
    },

    __bindToPreference(buttonName, preferenceName) {
      const button = this.getButton(buttonName);
      const prefs = cv.ui.manager.model.Preferences.getInstance();
      prefs.bind(preferenceName, button, 'value');
      button.bind('value', prefs, preferenceName);
    },

    maintainButtons(config) {
      if (!config) {
        config = this.__defaultButtonConfiguration;
      } else {
        config = Object.merge(this.__defaultButtonConfiguration, config);
        this.__buttonConfiguration = config;
      }
      Object.keys(config).forEach(function (id) {
        let button;
        const buttonConf = config[id];
        if (!Object.prototype.hasOwnProperty.call(this.__buttons, id)) {
          // create button
          const label = buttonConf.args[0];
          const icon = buttonConf.args[1];
          const command = buttonConf.args[2];
          const ButtonClass = buttonConf.clazz || qx.ui.menu.Button;
          if (qx.lang.Type.isString(command) || !command) {
            // no command connected
            button = new ButtonClass(label, icon);
            if (command) {
              // just add the string as shortcut hint
              button.getChildControl('shortcut').setValue(command);
            }
          } else {
            button = new ButtonClass(label, icon, command);
            if (qx.core.Environment.get('qx.command.bindEnabled')) {
              button.bind('enabled', command, 'enabled');
            }
          }
          button.addListener('execute', () => {
            qx.event.message.Bus.dispatchByName('cv.manager.action.' + id);
          });
          if (!buttonConf.hidden) {
            const menu = this.getChildControl(buttonConf.menu);
            if (!menu) {
              throw new Error('no menu named ' + buttonConf.menu + ' found!');
            }
            if (buttonConf.separator === 'before') {
              menu.add(new qx.ui.menu.Separator());
            }
            menu.add(button);
            if (buttonConf.separator === 'after') {
              menu.add(new qx.ui.menu.Separator());
            }
          }
          this.__buttons[id] = button;

          if (
            Object.prototype.hasOwnProperty.call(buttonConf, 'onAfterCreate')
          ) {
            buttonConf.onAfterCreate(button);
          }
        } else {
          button = this.__buttons[id];
        }
        button.setEnabled(buttonConf.enabled);
        if (buttonConf.properties) {
          button.set(buttonConf.properties);
        }
      }, this);
    },

    getButton(id) {
      return this.__buttons[id];
    },

    getButtonConfiguration() {
      return this.__buttonConfiguration || this.__defaultButtonConfiguration;
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case 'title':
          control = new qx.ui.basic.Label(this.tr('CometVisu Manager'));
          this.add(control);
          break;

        case 'file':
          control = new qx.ui.menubar.Button(
            this.tr('File'),
            null,
            this.getChildControl('file-menu')
          );

          this.add(control);
          break;

        case 'edit':
          control = new qx.ui.menubar.Button(
            this.tr('Edit'),
            null,
            this.getChildControl('edit-menu')
          );

          this.add(control);
          break;

        case 'help':
          control = new qx.ui.menubar.Button(
            this.tr('Help'),
            null,
            this.getChildControl('help-menu')
          );

          this.add(control);
          break;

        case 'about':
          control = new qx.ui.menubar.Button(
            this.tr('About'),
            null,
            this.getChildControl('help-menu')
          );

          this.add(control);
          break;

        case 'new':
          control = new qx.ui.menu.Button(
            this.tr('New'),
            null,
            null,
            this.getChildControl('new-menu')
          );

          break;

        case 'preferences':
          control = new qx.ui.menubar.Button(
            this.tr('Preferences'),
            null,
            this.getChildControl('preferences-menu')
          );

          this.add(control);
          break;

        case 'new-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'file-menu':
          control = new qx.ui.menu.Menu();
          control.add(this.getChildControl('new'));
          break;

        case 'edit-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'preferences-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'help-menu':
          control = new qx.ui.menu.Menu();
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
  }
});
