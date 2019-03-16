/**
 * Default XML-Editor included as iframe.
 */
qx.Class.define('cv.ui.manager.editor.Xml', {
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
    this.__basePath = qx.util.Uri.getAbsolute(window.location.pathname + qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/../editor/editor.html');
    this._draw();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /visu_config.*\.xml/
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _draw: function () {

    },

    _loadFile: function (file) {
      if (this._iframe) {
        this._iframe.destroy();
      }
      var match = /.*visu_config(.*)\.xml/.exec(file.getName());
      if (match) {
        this._iframe = new qx.ui.embed.Iframe(qx.util.Uri.appendParamsToUrl(this.__basePath, 'embed=1&config=' + match[1]));
        this._add(this._iframe);
      }
    },

    getCurrentContent: function () {
      return this._editor.getValue();
    },

    _onContentChanged: function (e) {
      console.log(e);
      this.setModified(true);
    },

    isSupported: function (file) {
      return cv.ui.manager.editor.Xml.SUPPORTED_FILES.test(file.getName());
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
