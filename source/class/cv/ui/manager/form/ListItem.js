/**
 * ListItem that uses cv.ui.manager.basic.Image
 */
qx.Class.define('cv.ui.manager.form.ListItem', {
  extend: qx.ui.form.ListItem,
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    // overridden
    _createChildControlImpl : function(id, hash) {
      let control;

      switch (id) {
        case 'icon':
          control = new cv.ui.manager.basic.Image(this.getIcon());
          control.setAnonymous(true);
          this._addAt(control, 0);
          if (this.getIcon() === null || this.getShow() === 'label') {
            control.exclude();
          }
          break;
      }

      return control || this.base(arguments, id);
    }
  }
});
