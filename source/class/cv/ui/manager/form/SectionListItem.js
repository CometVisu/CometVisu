/**
 * This widgets shows and editable config section in a list.
 */
qx.Class.define('cv.ui.manager.form.SectionListItem', {
  extend: qx.ui.core.Widget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    var grid = new qx.ui.layout.Grid(8, 8);
    grid.setColumnFlex(1, 1);
    grid.setColumnAlign(0, 'left', 'top');
    this._setLayout(grid);
    this._createChildControl('section-title');
    this._createChildControl('options-title');
    this._createChildControl('list');
    this._createChildControl('delete');
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-editor-config-section'
    },

    model: {
      check: "cv.ui.manager.model.config.Section",
      nullable: false,
      apply: '_applyModel'
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    'delete': 'qx.event.type.Data'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _listController: null,

    _applyModel: function (value, old) {
      var nameField = this.getChildControl('name');
      this.__unbindModel(old);
      if (value) {
        value.bind('name', nameField, 'value');
        nameField.bind('value', value, 'name');
        value.bind('options', this._listController, 'model');
        // add at least one empty entry, when there are no options
        if (value.getOptions().length === 0) {
          value.getOptions().push(new cv.ui.manager.model.config.Option('', ''));
        }
      }
    },

    __unbindModel: function (model) {
      if (model) {
        var nameField = this.getChildControl('name');
        if (this._listController) {
          model.removeRelatedBindings(this._listController);
        }
        model.removeRelatedBindings(nameField);
        nameField.removeRelatedBindings(model);
      }
    },

    _onDeleteOption: function (ev) {
      var option = ev.getData();
      this.getModel().getOptions().remove(option);
    },

    _onAddOption: function () {
      this.getModel().getOptions().push(new cv.ui.manager.model.config.Option('', ''));
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'section-title':
           control = new qx.ui.basic.Label(this.tr('Section'));
           this._add(control, {row: 0, column: 0});
           break;

         case 'name':
           control = new qx.ui.form.TextField();
           control.set({
             liveUpdate: true,
             required: true
           });
           this._add(control, {row: 0, column: 1});
           break;

         case 'delete':
           control = new qx.ui.form.Button(null, '@MaterialIcons/delete/22');
           control.setToolTipText(this.tr('Delete section'));
           control.addListener('execute', function() {
             this.fireDataEvent('delete', this.getModel());
           }, this);
           this._add(control, {row: 0, column: 2});
           break;

         case 'options-title':
           control = new qx.ui.basic.Label(this.tr('Entries'));
           this._add(control, {row: 1, column: 0});
           break;

         case 'list':
           control = new qx.ui.form.List();
           control.setEnableInlineFind(false);
           this._listController = new qx.data.controller.List(null, control);
           this._listController.setDelegate({
             createItem: function () {
               return new cv.ui.manager.form.OptionListItem();
             },
             configureItem: function (item) {
               item.addListener('delete', this._onDeleteOption, this);
               item.addListener('add', this._onAddOption, this);
             }.bind(this),
             bindItem: function (controller, item, index) {
               controller.bindProperty('', 'model', null, item, index);
             }
           });
           this._add(control, {row: 1, column: 1});
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
    this.__unbindModel(this.getModel());
    this._disposeObjects('_listController');
  }
});
