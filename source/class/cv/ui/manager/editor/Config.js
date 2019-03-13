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
      console.log(value);
      this.getChildControl('label').setValue(qx.lang.Json.stringify(value));
    },

    // overridden
    getCurrentContent: function () {
      return this.getContent();
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       var control;

       switch (id) {
         case "label":
           control = new qx.ui.basic.Label();
           this._add(control, {flex: 1});
           break;
       }

       return control || this.base(arguments, id);
    },
  }
});
