/**
 * This widgets shows and editable config option in a list.
 */
qx.Class.define('cv.ui.manager.form.OptionListItem', {
  extend: qx.ui.core.Widget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox(8));
    this._createChildControl('key');
    this._createChildControl('value');
    this._createChildControl('delete');
    this._createChildControl('add');
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-editor-config-option'
    },

    model: {
      check: "cv.ui.manager.model.config.Option",
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
    'delete': 'qx.event.type.Data',
    'add': 'qx.event.type.Event'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyModel: function (value, old) {
      var keyField = this.getChildControl('key');
      var valueField = this.getChildControl('value');
      this.__unbindModel(old);
      if (value) {
        // bi-directional bind
        value.bind('key', keyField, 'value');
        value.bind('value', valueField, 'value');
        keyField.bind('value', value, 'key');
        valueField.bind('value', value, 'value');
      }
    },

    __unbindModel: function (model) {
      if (model) {
        var keyField = this.getChildControl('key');
        var valueField = this.getChildControl('value');
        if (model) {
          model.removeRelatedBindings(keyField);
          model.removeRelatedBindings(valueField);
          keyField.removeRelatedBindings(model);
          valueField.removeRelatedBindings(model);
        }
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'key':
           control = new qx.ui.form.TextField();
           control.set({
             liveUpdate: true,
             required: true
           });
           this._add(control, {flex: 1});
           break;

         case 'value':
           control = new qx.ui.form.TextField();
           control.set({
             liveUpdate: true
           });
           this._add(control, {flex: 1});
           break;

         case 'delete':
           control = new qx.ui.form.Button(null, '@MaterialIcons/delete/22');
           control.setToolTipText(this.tr('Delete option'));
           control.addListener('execute', function() {
             this.fireDataEvent('delete', this.getModel());
           }, this);
           this._add(control);
           break;

         case 'add':
           control = new qx.ui.form.Button(null, '@MaterialIcons/add/22');
           control.setToolTipText(this.tr('Add option'));
           control.addListener('execute', function() {
             this.fireEvent('add');
           }, this);
           this._add(control);
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
  }
});
