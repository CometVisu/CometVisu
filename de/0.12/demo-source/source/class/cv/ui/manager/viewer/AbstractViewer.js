/**
 * Abstract base class for all widgets that can display file items.
 */
qx.Class.define('cv.ui.manager.viewer.AbstractViewer', {
  extend: qx.ui.core.Widget,
  implement: [
    cv.ui.manager.editor.IEditor,
    cv.ui.manager.IActionHandler
  ],
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    file: {
      check: 'cv.ui.manager.model.FileItem',
      nullable: true,
      apply: '_applyFile',
      event: 'changeFile'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    canHandleAction: function () {
      return false;
    },
    handleAction: function () {},
    save: function () {},
    getCurrentContent: function () {},

    _applyFile: function (file, old) {
      // show icon for file type
    },

    // overridden
    _createChildControlImpl : function (id) {
      var control;

      switch (id) {
        case 'scroll':
          control = new qx.ui.container.Scroll();
          this._add(control);
          break;

        case 'image':
          control = new qx.ui.basic.Atom();
          this.getChildControl('scroll').add(control);
          control.getChildControl('icon').addListener('resize', this._scaleImage, this);
          break;
      }

      return control || this.base(arguments, id);
    }
  }
});
