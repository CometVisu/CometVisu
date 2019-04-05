/**
 * Shows the available icons.
 */
qx.Class.define('cv.ui.manager.viewer.Icons', {
  extend: cv.ui.manager.viewer.AbstractViewer,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox(8));
    this._createChildControl('filter');
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /^CometVisu-Icons$/,
    TITLE: qx.locale.Manager.tr('Show icons'),
    ICON: cv.theme.dark.Images.getIcon('icons', 18)
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _controller: null,
    _completeModel: null,

    _applyFile: function () {
      var container = this.getChildControl('list');
      if (!this._controller) {
        this._completeModel = new qx.data.Array();
        this._controller = new qx.data.controller.List(null, container);
        this._controller.setDelegate({
          createItem: function () {
            return new cv.ui.manager.core.IconAtom();
          },

          bindItem: function (controller, item, index) {
            controller.bindProperty('', 'label', null, item, index);
          }
        });
      }
      this._completeModel.removeAll();

      // as the file is just a fake file, we do not really care about it
      Object.keys(cv.IconConfig.DB).filter(function (name) {
        var entry = cv.IconConfig.DB[name];
        return entry['*'] && entry['*']['*'] && qx.lang.Type.isFunction(entry['*']['*']['*']);
      }).forEach(function (name) {
        this._completeModel.push(name);
      }, this);

      if (this.getChildControl('filter').getValue()) {
        this._onFilter();
      } else {
        this._controller.setModel(this._completeModel);
      }
    },

    _onFilter: function () {
      var filterString = this.getChildControl('filter').getValue();
      var filtered = this._completeModel.filter(function (name) {
        return name.includes(filterString);
      });
      this._controller.setModel(filtered);
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {

         case 'filter':
           control = new qx.ui.form.TextField();
           control.set({
             placeholder: this.tr('Filter icons by name...'),
             liveUpdate: true,
             margin: 8
           });
           control.addListener('changeValue', this._onFilter, this);
           this._addAt(control, 0);
           break;

         case 'scroll':
           control = new qx.ui.container.Scroll();
           this._addAt(control, 1, {flex: 1});
           break;

         case 'list':
           control = new qx.ui.container.Composite(new qx.ui.layout.Flow(8, 8));
           this.getChildControl('scroll').add(control);
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
    this._disposeObjects('_controller')
  }
});
