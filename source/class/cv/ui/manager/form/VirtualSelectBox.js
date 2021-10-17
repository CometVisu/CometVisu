/**
 * qx.ui.form.VirtualSelectBox that uses cv.ui.manager.form.ListItem as 'atom' childcontrol.
 */
qx.Class.define('cv.ui.manager.form.VirtualSelectBox', {
  extend: qx.ui.form.VirtualSelectBox,

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
        case 'atom':
          control = new cv.ui.manager.form.ListItem('');
          control.setCenter(false);
          control.setAnonymous(true);

          this._add(control, {flex:1});
          break;
      }

      return control || this.base(arguments, id, hash);
    }
  }
});
