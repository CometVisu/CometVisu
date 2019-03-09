/**
 * Main toolbar on top.
 */
qx.Class.define('cv.ui.manager.MenuBar', {
  extend: qx.ui.menubar.MenuBar,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._commandGroup = qx.core.Init.getApplication().getCommandManager().getActive();
    this._draw();
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    "new": "qx.event.type.Data",
    "save": "qx.event.type.Event"
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _commandGroup: null,

    _draw: function () {
      this._createChildControl('file');
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case "file":
           control = new qx.ui.menubar.Button(this.tr('File'), null, this.getChildControl('file-menu'));
           this.add(control);
           break;

         case 'file-menu':
           control = new qx.ui.menu.Menu();
           control.add(this.getChildControl('new-file-button'));
           control.add(this.getChildControl('new-folder-button'));
           control.add(new qx.ui.menu.Separator());
           control.add(this.getChildControl('save-button'));
           break;

         case 'new-file-button':
           control = new qx.ui.menu.Button(this.tr('New file'), null, this._commandGroup.get('new-file'));
           // Todo open dialog to request file name
           control.addListener('execute', function () {
             this.fireDataEvent('new', 'file');
           }, this);
           break;

         case 'new-folder-button':
           control = new qx.ui.menu.Button(this.tr('New folder'), null, this._commandGroup.get('new-folder'));
           // Todo open dialog to request folder name
           control.addListener('execute', function () {
             this.fireDataEvent('new', 'folder');
           }, this);
           break;

         case 'save-button':
           control = new qx.ui.menu.Button(this.tr('Save'), null, this._commandGroup.get('save'));
           control.setEnabled(false);
           control.addListener('execute', function () {
             this.fireEvent('save');
           }, this);
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
    this._commandGroup = null;
  }
});
