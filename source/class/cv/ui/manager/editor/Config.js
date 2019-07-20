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

    _initClient: function () {
      this._client = cv.io.rest.Client.getConfigClient();
      this._client.addListener('getSuccess', this._onModelValueChange, this);
      this._client.addListener('updateSuccess', this._onSaved, this);
    },

    _loadFile: function () {
      this._client.get({section: '*', key: '*'});
    },

    _onModelValueChange: function (ev) {
      this.setContent(ev.getData());
    },

    // overridden
    _applyContent: function(value) {
      var model = this._listController.getModel();
      model.removeAll();

      Object.keys(value).forEach(function (sectionName) {
        var section = new cv.ui.manager.model.config.Section(sectionName);
        Object.keys(value[sectionName]).forEach(function (optionKey) {
          section.addOption(optionKey, value[sectionName][optionKey]);
        }, this);
        model.push(section);
      }, this);
    },

    // overridden
    getCurrentContent: function () {
      return this.getContent();
    },

    _onDeleteSection: function (ev) {
      var section = ev.getData();
      var model = this._listController.getModel();
      model.remove(section);
    },

    save: function () {
      var data = qx.util.Serializer.toNativeObject(this._listController.getModel());
      this._client.saveSync(null, data, function (err) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else {
          cv.ui.manager.snackbar.Controller.info(this.tr('Hidden config has been saved'));
          this._onSaved();
        }
      }, this);
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
