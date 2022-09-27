(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.editor.AbstractEditor": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.io.rest.Client": {},
      "cv.ui.manager.model.config.Section": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qx.ui.form.List": {},
      "qx.data.controller.List": {},
      "qx.data.Array": {},
      "cv.ui.manager.form.SectionListItem": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Config.js 
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
   * Editor for the (hidden) configuration.
   */
  qx.Class.define('cv.ui.manager.editor.Config', {
    extend: cv.ui.manager.editor.AbstractEditor,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      cv.ui.manager.editor.AbstractEditor.constructor.call(this);
      this._handledActions = ['save'];

      this._setLayout(new qx.ui.layout.VBox(8));

      this._createChildControl('list');

      this._createChildControl('add-section');
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      TITLE: qx.locale.Manager.tr('Hidden configuration')
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-editor-config'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _model: null,
      _listController: null,
      __P_31_0: 0,
      _initClient: function _initClient() {
        this._client = cv.io.rest.Client.getConfigClient();

        this._client.addListener('getSuccess', this._onModelValueChange, this);

        this._client.addListener('updateSuccess', this._onSaved, this);
      },
      _loadFile: function _loadFile(file) {
        if (file) {
          this._client.get({
            section: '*',
            key: '*'
          });
        }
      },
      _onModelValueChange: function _onModelValueChange(ev) {
        if (this.getFile()) {
          this.setContent(ev.getData());
        }
      },
      // overridden
      _applyContent: function _applyContent(value) {
        var model = this._listController.getModel();

        model.removeAll();
        this.__P_31_0 = Object.keys(value).length;
        Object.keys(value).forEach(function (sectionName) {
          var section = new cv.ui.manager.model.config.Section(sectionName);
          Object.keys(value[sectionName]).forEach(function (optionKey) {
            section.addOption(optionKey, value[sectionName][optionKey]);
          }, this);
          model.push(section);
        }, this);

        this.__P_31_1();
      },
      // overridden
      getCurrentContent: function getCurrentContent() {
        return this.getContent();
      },
      _onDeleteSection: function _onDeleteSection(ev) {
        if (this.getFile() && this.getFile().isWriteable()) {
          var section = ev.getData();

          var model = this._listController.getModel();

          model.remove(section);

          this.__P_31_1();
        }
      },
      // compare current controller model with the loaded config content
      __P_31_1: function __P_31_1() {
        var file = this.getFile();

        if (this.__P_31_0 !== this._listController.getModel().length) {
          file.setModified(true);
          return;
        }

        var modified = this.getChildControl('list').getChildren().some(function (sectionListItem) {
          return sectionListItem.isModified();
        }, this);
        file.setModified(modified);
      },
      save: function save() {
        if (!this.getFile() || !this.getFile().isWriteable()) {
          cv.ui.manager.snackbar.Controller.info(this.tr('Hidden configuration file (hidden.php) not writeable'));
          return;
        } // check for duplicate section names of keys


        var model = this._listController.getModel();

        var keys = [];
        var valid = true;
        model.forEach(function (section) {
          var key = section.getName();

          if (!keys.includes(key)) {
            keys.push(key);
          } else {
            valid = false;
            cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Section name duplicate: "%1".', key));
          } // check for key duplicates in this sections options


          var optionKeys = [];
          section.getOptions().forEach(function (option) {
            var optionKey = option.getKey();

            if (!optionKeys.includes(optionKey)) {
              optionKeys.push(optionKey);
            } else {
              valid = false;
              cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Option key duplicate: "%1" in section "%2".', optionKey, key));
            }
          }, this);
        }, this);

        if (valid) {
          var data = {};

          this._listController.getModel().forEach(function (section) {
            var options = {};
            section.getOptions().forEach(function (option) {
              options[option.getKey()] = option.getValue();
            });
            data[section.getName()] = options;
          }, this);

          this._client.saveSync(null, data, function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(this.tr('Saving hidden config failed with error %1 (%2)', err.status, err.statusText));
            } else {
              cv.ui.manager.snackbar.Controller.info(this.tr('Hidden config has been saved'));

              this._onSaved();
            }
          }, this);
        } else {
          cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Section is invalid and has not been saved.'));
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'list':
            control = new qx.ui.form.List();
            control.setEnableInlineFind(false);
            this._listController = new qx.data.controller.List(new qx.data.Array(), control);

            this._listController.setDelegate({
              createItem: function createItem() {
                return new cv.ui.manager.form.SectionListItem();
              },
              configureItem: function (item) {
                item.addListener('delete', this._onDeleteSection, this);
                item.addListener('changeModified', this.__P_31_1, this);
              }.bind(this),
              bindItem: function (controller, item, index) {
                controller.bindProperty('', 'model', null, item, index);
                this.bind('file.writeable', item, 'readOnly', {
                  converter: function converter(value) {
                    return !value;
                  }
                });
              }.bind(this)
            });

            this._add(control, {
              flex: 1
            });

            break;

          case 'buttons':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));

            this._add(control);

            break;

          case 'add-section':
            control = new qx.ui.form.Button(this.tr('Add section'));
            control.addListener('execute', function () {
              this._listController.getModel().push(new cv.ui.manager.model.config.Section(''));

              this.__P_31_1();
            }, this);
            this.bind('file.writeable', control, 'visibility', {
              converter: function converter(value) {
                return value ? 'visible' : 'excluded';
              }
            });
            this.getChildControl('buttons').add(control);
            break;
        }

        return control || cv.ui.manager.editor.Config.superclass.prototype._createChildControlImpl.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_model', '_listController');
    }
  });
  cv.ui.manager.editor.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1664297868225