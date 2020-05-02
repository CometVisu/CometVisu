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
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "cv.ui.manager.model.config.Option": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.Button": {},
      "cv.theme.dark.Images": {},
      "qx.ui.form.List": {},
      "qx.data.controller.List": {},
      "cv.ui.manager.form.OptionListItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      var grid = new qx.ui.layout.Grid(8, 8);
      grid.setColumnFlex(1, 1);
      grid.setColumnAlign(0, 'left', 'top');

      this._setLayout(grid);

      this._createChildControl('section-title');

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
      },
      modified: {
        check: 'Boolean',
        init: false,
        event: 'changeModified'
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
      _originalName: null,
      _originalOptions: null,
      _applyModel: function _applyModel(value, old) {
        var nameField = this.getChildControl('name');

        this.__unbindModel(old);

        if (value) {
          value.bind('name', nameField, 'value');
          this._originalName = value.getName();
          this._originalOptions = {};
          value.getOptions().forEach(function (option) {
            option.addListener('change', this.__checkForModification, this);
            this._originalOptions[option.getKey()] = option.getValue();
          }, this);
          nameField.bind('value', value, 'name');
          value.addListener('changeName', this.__checkForModification, this);
          value.bind('options', this._listController, 'model'); // add at least one empty entry, when there are no options

          if (value.getOptions().length === 0) {
            var emptyOption = new cv.ui.manager.model.config.Option('', '');
            value.getOptions().push(emptyOption);
          }
        } else {
          this._originalName = null;
          this._originalOptions = null;
        }
      },
      __unbindModel: function __unbindModel(model) {
        if (model) {
          var nameField = this.getChildControl('name');

          if (this._listController) {
            model.removeRelatedBindings(this._listController);
          }

          model.removeListener('changeName', this.__checkForModification, this);
          model.removeRelatedBindings(nameField);
          nameField.removeRelatedBindings(model);
          model.getOptions().forEach(function (option) {
            option.removeListener('change', this.__checkForModification, this);
          }, this);
        }
      },
      __checkForModification: function __checkForModification() {
        if (this._originalName !== this.getModel().getName()) {
          this.setModified(true);
          return;
        } // check if the still have the same the same amount of options


        if (Object.keys(this._originalOptions).length !== this.getModel().getOptions().length) {
          this.setModified(true);
          return;
        } // compare options one by one


        var modified = this.getModel().getOptions().some(function (option) {
          return !this._originalOptions.hasOwnProperty(option.getKey()) || this._originalOptions[option.getKey()] !== option.getValue();
        }, this);
        this.setModified(modified);
      },
      _onDeleteOption: function _onDeleteOption(ev) {
        var option = ev.getData();
        var options = this.getModel().getOptions();

        if (options.length === 1) {
          // do not delete the last option, just reset its values
          option.resetKey();
          option.resetValue();
        } else {
          var removed = this.getModel().getOptions().remove(option);

          if (removed) {
            removed.removeListener('change', this.__checkForModification, this);
          }
        }

        this.__checkForModification();
      },
      _onAddOption: function _onAddOption() {
        var option = new cv.ui.manager.model.config.Option('', '');
        option.addListener('change', this.__checkForModification, this);
        this.getModel().getOptions().push(option);

        this.__checkForModification();
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'section-title':
            control = new qx.ui.basic.Label(this.tr('Section'));

            this._add(control, {
              row: 0,
              column: 0
            });

            break;

          case 'name':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true,
              required: true
            });

            this._add(control, {
              row: 0,
              column: 1
            });

            break;

          case 'delete':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('delete', 22));
            control.setToolTipText(this.tr('Delete section'));
            control.addListener('execute', function () {
              this.fireDataEvent('delete', this.getModel());
            }, this);

            this._add(control, {
              row: 0,
              column: 2
            });

            break;

          case 'list':
            control = new qx.ui.form.List();
            control.setEnableInlineFind(false);
            this._listController = new qx.data.controller.List(null, control);

            this._listController.setNullValueTitle('header');

            this._listController.setAllowNull(true);

            this._listController.setDelegate({
              createItem: function createItem() {
                return new cv.ui.manager.form.OptionListItem();
              },
              configureItem: function (item) {
                item.addListener('delete', this._onDeleteOption, this);
                item.addListener('add', this._onAddOption, this);
              }.bind(this),
              bindItem: function bindItem(controller, item, index) {
                controller.bindProperty('', 'model', null, item, index);
              }
            });

            this._add(control, {
              row: 1,
              column: 1
            });

            break;
        }

        return control || cv.ui.manager.form.SectionListItem.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_listController');
    }
  });
  cv.ui.manager.form.SectionListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SectionListItem.js.map?dt=1588445991885