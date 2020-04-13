(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.form.TextField": {},
      "qx.ui.form.Button": {},
      "cv.theme.dark.Images": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.HBox(8));

      this._createChildControl('key');

      this._createChildControl('value');

      this._createChildControl('key-title');

      this._createChildControl('value-title');

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
        nullable: true,
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
      // list controller with allowNull calls setLabel
      setLabel: function setLabel(label) {},
      // list controller with allowNull calls setIcon
      setIcon: function setIcon() {},
      _applyModel: function _applyModel(value, old) {
        var keyField = this.getChildControl('key');
        var valueField = this.getChildControl('value');
        var keyTitleField = this.getChildControl('key-title');
        var valueTitleField = this.getChildControl('value-title');

        this.__unbindModel(old);

        if (value) {
          // bi-directional bind
          value.bind('key', keyField, 'value');
          value.bind('value', valueField, 'value');
          keyField.bind('value', value, 'key');
          valueField.bind('value', value, 'value');
          keyField.show();
          valueField.show();
          keyTitleField.exclude();
          valueTitleField.exclude();
          this.getChildControl('delete').show();
          this.getChildControl('add').show();
        } else {
          keyField.exclude();
          valueField.exclude();
          keyTitleField.show();
          valueTitleField.show();
          this.getChildControl('delete').hide();
          this.getChildControl('add').hide();
        }
      },
      __unbindModel: function __unbindModel(model) {
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
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'key':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true,
              required: true
            });

            this._add(control, {
              width: '40%'
            });

            break;

          case 'value':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true
            });

            this._add(control, {
              width: '40%'
            });

            break;

          case 'delete':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('delete', 22));
            control.setToolTipText(this.tr('Delete option'));
            control.addListener('execute', function () {
              this.fireDataEvent('delete', this.getModel());
            }, this);

            this._add(control);

            break;

          case 'add':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('add', 18));
            control.setToolTipText(this.tr('Add option'));
            control.addListener('execute', function () {
              this.fireEvent('add');
            }, this);

            this._add(control);

            break;

          case 'key-title':
            control = new qx.ui.basic.Label(this.tr('Key'));
            control.exclude();

            this._add(control, {
              width: '40%'
            });

            break;

          case 'value-title':
            control = new qx.ui.basic.Label(this.tr('Value'));
            control.exclude();

            this._add(control, {
              width: '40%'
            });

            break;
        }

        return control || cv.ui.manager.form.OptionListItem.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__unbindModel(this.getModel());
    }
  });
  cv.ui.manager.form.OptionListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OptionListItem.js.map?dt=1586772876995