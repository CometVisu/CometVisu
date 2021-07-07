(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menubar.MenuBar": {
        "construct": true,
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.ui.core.Spacer": {},
      "qx.ui.form.RadioGroup": {},
      "cv.theme.dark.Images": {},
      "com.zenesis.qx.upload.UploadMenuButton": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.menu.CheckBox": {},
      "cv.ui.manager.model.Preferences": {},
      "qx.ui.menu.Button": {},
      "qx.lang.Type": {},
      "qx.event.message.Bus": {},
      "qx.ui.menu.Separator": {},
      "qx.ui.basic.Label": {},
      "qx.ui.menubar.Button": {},
      "qx.ui.menu.Menu": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      qx.ui.menubar.MenuBar.constructor.call(this);
      this._commandGroup = qx.core.Init.getApplication().getCommandManager().getActive();
      this.__P_25_0 = {};

      this._draw();
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _commandGroup: null,
      __P_25_0: null,
      __P_25_1: null,
      __P_25_2: null,
      _draw: function _draw() {
        this._createChildControl('file');

        this._createChildControl('edit');

        this._createChildControl('preferences');

        this.add(new qx.ui.core.Spacer(), {
          flex: 1
        });

        this._createChildControl('title');

        this.add(new qx.ui.core.Spacer(), {
          flex: 1
        });

        this._createChildControl('help');

        var editorGroup = new qx.ui.form.RadioGroup();
        this.__P_25_1 = {
          'new-file': {
            menu: 'new-menu',
            args: [this.tr('New file'), cv.theme.dark.Images.getIcon('new-file', 18), this._commandGroup.get('new-file')],
            enabled: true
          },
          'new-folder': {
            menu: 'new-menu',
            args: [this.tr('New folder'), cv.theme.dark.Images.getIcon('new-folder', 18), this._commandGroup.get('new-folder')],
            enabled: true,
            separator: 'after'
          },
          'new-config-file': {
            menu: 'new-menu',
            args: [this.tr('New config file')],
            enabled: true
          },
          'upload': {
            menu: 'file-menu',
            clazz: com.zenesis.qx.upload.UploadMenuButton,
            args: [this.tr('Upload file'), cv.theme.dark.Images.getIcon('upload', 18)],
            enabled: true,
            separator: 'before'
          },
          'save': {
            menu: 'file-menu',
            args: [this.tr('Save'), cv.theme.dark.Images.getIcon('save', 18), this._commandGroup.get('save')],
            enabled: false,
            separator: 'before'
          },
          'save-as': {
            menu: 'file-menu',
            args: [this.tr('Save as...'), null, this._commandGroup.get('save-as')],
            enabled: false
          },
          'delete': {
            args: [this.tr('Delete'), cv.theme.dark.Images.getIcon('delete', 18), this._commandGroup.get('delete')],
            enabled: false,
            hidden: true
          },
          'quit': {
            menu: 'file-menu',
            args: [this.tr('Quit'), cv.theme.dark.Images.getIcon('quit', 18), this._commandGroup.get('quit')],
            enabled: true,
            separator: 'before'
          },
          // edit menu basics
          'undo': {
            menu: 'edit-menu',
            args: [this.tr('Undo'), cv.theme.dark.Images.getIcon('undo', 18), this._commandGroup.get('undo')],
            enabled: true
          },
          'redo': {
            menu: 'edit-menu',
            args: [this.tr('Redo'), cv.theme.dark.Images.getIcon('redo', 18), this._commandGroup.get('redo')],
            enabled: true
          },
          'cut': {
            menu: 'edit-menu',
            args: [this.tr('Cut'), cv.theme.dark.Images.getIcon('cut', 18), this._commandGroup.get('cut')],
            enabled: false,
            separator: 'before'
          },
          'copy': {
            menu: 'edit-menu',
            args: [this.tr('Copy'), cv.theme.dark.Images.getIcon('copy', 18), this._commandGroup.get('copy')],
            enabled: false
          },
          'paste': {
            menu: 'edit-menu',
            args: [this.tr('Paste'), cv.theme.dark.Images.getIcon('paste', 18), this._commandGroup.get('paste')],
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
          'help': {
            menu: 'help-menu',
            args: [this.tr('Help'), cv.theme.dark.Images.getIcon('help', 18), this._commandGroup.get('help')],
            enabled: false
          },
          'about': {
            menu: 'help-menu',
            args: [this.tr('About')],
            enabled: false
          }
        };
        this.maintainButtons();
        var prefs = cv.ui.manager.model.Preferences.getInstance();
        prefs.bind('defaultConfigEditor', editorGroup, 'modelSelection', {
          converter: function converter(value) {
            return [value];
          }
        });
        editorGroup.getModelSelection().addListener('change', function () {
          prefs.setDefaultConfigEditor(editorGroup.getModelSelection().getItem(0));
        }, this);

        this.__P_25_3('quick-preview', 'quickPreview');

        this.__P_25_3('expert-mode', 'expertMode');
      },
      __P_25_3: function __P_25_3(buttonName, preferenceName) {
        var button = this.getButton(buttonName);
        var prefs = cv.ui.manager.model.Preferences.getInstance();
        prefs.bind(preferenceName, button, 'value');
        button.bind('value', prefs, preferenceName);
      },
      maintainButtons: function maintainButtons(config) {
        if (!config) {
          config = this.__P_25_1;
        } else {
          config = Object.merge(this.__P_25_1, config);
          this.__P_25_2 = config;
        }

        Object.keys(config).forEach(function (id) {
          var button;
          var buttonConf = config[id];

          if (!this.__P_25_0.hasOwnProperty(id)) {
            // create button
            var label = buttonConf.args[0];
            var icon = buttonConf.args[1];
            var command = buttonConf.args[2];
            var ButtonClass = buttonConf.clazz || qx.ui.menu.Button;

            if (qx.lang.Type.isString(command) || !command) {
              // no command connected
              button = new ButtonClass(label, icon);

              if (command) {
                // just add the string as shortcut hint
                button.getChildControl('shortcut').setValue(command);
              }
            } else {
              button = new ButtonClass(label, icon, command);
              {
                button.bind('enabled', command, 'enabled');
              }
            }

            button.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.action.' + id);
            }, this);

            if (!buttonConf.hidden) {
              var menu = this.getChildControl(buttonConf.menu);

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

            this.__P_25_0[id] = button;

            if (buttonConf.hasOwnProperty('onAfterCreate')) {
              buttonConf.onAfterCreate(button);
            }
          } else {
            button = this.__P_25_0[id];
          }

          button.setEnabled(buttonConf.enabled);

          if (buttonConf.properties) {
            button.set(buttonConf.properties);
          }
        }, this);
      },
      getButton: function getButton(id) {
        return this.__P_25_0[id];
      },
      getButtonConfiguration: function getButtonConfiguration() {
        return this.__P_25_2 || this.__P_25_1;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'title':
            control = new qx.ui.basic.Label(this.tr('CometVisu Manager'));
            this.add(control);
            break;

          case "file":
            control = new qx.ui.menubar.Button(this.tr('File'), null, this.getChildControl('file-menu'));
            this.add(control);
            break;

          case "edit":
            control = new qx.ui.menubar.Button(this.tr('Edit'), null, this.getChildControl('edit-menu'));
            this.add(control);
            break;

          case "help":
            control = new qx.ui.menubar.Button(this.tr('Help'), null, this.getChildControl('help-menu'));
            this.add(control);
            break;

          case "about":
            control = new qx.ui.menubar.Button(this.tr('About'), null, this.getChildControl('help-menu'));
            this.add(control);
            break;

          case "new":
            control = new qx.ui.menu.Button(this.tr('New'), null, null, this.getChildControl('new-menu'));
            break;

          case "preferences":
            control = new qx.ui.menubar.Button(this.tr('Preferences'), null, this.getChildControl('preferences-menu'));
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

        return control || cv.ui.manager.MenuBar.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._commandGroup = null;
    }
  });
  cv.ui.manager.MenuBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuBar.js.map?dt=1625668962824