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
  construct: function () {
    this.base(arguments);
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
    __initialSectionCount: 0,

    _initClient: function () {
      this._client = cv.io.rest.Client.getConfigClient();
      this._client.addListener('getSuccess', this._onModelValueChange, this);
      this._client.addListener('updateSuccess', this._onSaved, this);
    },

    _loadFile: function (file) {
      if (file) {
        this._client.get({section: '*', key: '*'});
      }
    },

    _onModelValueChange: function (ev) {
      this.setContent(ev.getData());
    },

    // overridden
    _applyContent: function(value) {
      var model = this._listController.getModel();
      model.removeAll();

      this.__initialSectionCount = Object.keys(value).length;

      Object.keys(value).forEach(function (sectionName) {
        var section = new cv.ui.manager.model.config.Section(sectionName);
        Object.keys(value[sectionName]).forEach(function (optionKey) {
          section.addOption(optionKey, value[sectionName][optionKey]);
        }, this);
        model.push(section);
      }, this);

      this.__checkForModification();
    },

    // overridden
    getCurrentContent: function () {
      return this.getContent();
    },

    _onDeleteSection: function (ev) {
      var section = ev.getData();
      var model = this._listController.getModel();
      model.remove(section);
      this.__checkForModification();
    },

    // compare current controller model with the loaded config content
    __checkForModification: function () {
      var file = this.getFile();
      if (this.__initialSectionCount !== this._listController.getModel().length) {
        file.setModified(true);
        return;
      }
      var modified = this.getChildControl('list').getChildren().some(function (sectionListItem) {
        return sectionListItem.isModified();
      }, this);
      file.setModified(modified);
    },

    save: function () {
      // check for duplicate section names of keys
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
        }
        // check for key duplicates in this sections options
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
        var data = qx.util.Serializer.toNativeObject(this._listController.getModel());
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
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'list':
           control = new qx.ui.form.List();
           control.setEnableInlineFind(false);
           this._listController = new qx.data.controller.List(new qx.data.Array(), control);
           this._listController.setDelegate({
             createItem: function () {
               return new cv.ui.manager.form.SectionListItem();
             },

             configureItem: function (item) {
               item.addListener('delete', this._onDeleteSection, this);
               item.addListener('changeModified', this.__checkForModification, this);
             }.bind(this),

             bindItem: function (controller, item, index) {
               controller.bindProperty('', 'model', null, item, index);
             }
           });
           this._add(control, {flex: 1});
           break;

         case 'buttons':
           control = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
           this._add(control);
           break;

         case 'add-section':
           control = new qx.ui.form.Button(this.tr('Add section'));
           control.addListener('execute', function () {
             this._listController.getModel().push(new cv.ui.manager.model.config.Section(''));
             this.__checkForModification();
           }, this);
           this.getChildControl('buttons').add(control);
           break;
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
    this._disposeObjects('_model', '_listController');
  }
});
