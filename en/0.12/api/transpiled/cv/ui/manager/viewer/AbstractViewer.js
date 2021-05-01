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
      "cv.ui.manager.editor.IEditor": {
        "require": true
      },
      "cv.ui.manager.IActionHandler": {
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.ui.container.Scroll": {},
      "qx.ui.basic.Atom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Abstract base class for all widgets that can display file items.
   */
  qx.Class.define('cv.ui.manager.viewer.AbstractViewer', {
    extend: qx.ui.core.Widget,
    implement: [cv.ui.manager.editor.IEditor, cv.ui.manager.IActionHandler],
    type: 'abstract',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

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
      },

      /**
       * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
       */
      external: {
        check: 'Boolean',
        init: false
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      canHandleAction: function canHandleAction() {
        return false;
      },
      handleAction: function handleAction() {},
      save: function save() {},
      getCurrentContent: function getCurrentContent() {},
      _applyFile: function _applyFile(file, old) {// show icon for file type
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
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

        return control || cv.ui.manager.viewer.AbstractViewer.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  cv.ui.manager.viewer.AbstractViewer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractViewer.js.map?dt=1619883137854