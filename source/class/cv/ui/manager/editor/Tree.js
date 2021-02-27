/**
 * New XML-Editor base on a node truee
 */
qx.Class.define('cv.ui.manager.editor.Tree', {
  extend: cv.ui.manager.editor.AbstractEditor,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());
    this._handledActions = ['save'];

    // init schema
    const schema = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri('visu_config.xsd'));
    schema.addListenerOnce('ready', function () {
      console.log('schema has been loaded');
    }, this);

    // Load Schema
    this._draw();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /^(demo)?\/?visu_config.*\.xml/,
    TITLE: qx.locale.Manager.tr('Xml-editor'),
    ICON: cv.theme.dark.Images.getIcon('xml', 18)
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _currentContent: null,

    _draw: function () {

    },

    _loadFile: function (file) {
      if (file) {
        var match = /.*visu_config_?(.*)\.xml/.exec(file.getName());
        if (match) {

        }
      }
    },

    save: function (filename, callback) {
      if (filename) {

      }
    },

    getCurrentContent: function () {
      return this._currentContent;
    },

    _onContentChanged: function () {
      this.getFile().setModified(true);
    },

    isSupported: function (file) {
      return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName()) && file.isWriteable();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
  }
});
