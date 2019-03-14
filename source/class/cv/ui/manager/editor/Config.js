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
    this._setLayout(new qx.ui.layout.VBox());
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _initClient: function () {
      this._client = cv.io.rest.Client.getConfigFileClient();
      this._client.addListener('getSuccess', this._onModelValueChange, this);
      this._client.addListener('updateSuccess', this._onSaved, this);
    },

    _loadFile: function () {
      this._client.get({section: '*'});
    },

    _onModelValueChange: function (ev) {
      this.setContent(ev.getData());
      this.resetValid();
      this.resetModified();
      this.resetSaveable();
    },

    // overridden
    _applyContent: function(value) {
      this._removeAll();

      var widget;
      Object.keys(value).forEach(function (sectionName) {
        widget = new qx.ui.form.TextField(sectionName);
        this._add(widget);
      }, this);
      console.log(value);
    },

    // overridden
    getCurrentContent: function () {
      return this.getContent();
    }
  }
});
