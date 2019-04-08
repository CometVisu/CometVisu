/**
 * A qx.ui.form.ListItem with an additional label overlay over the icon to show the file type
 */
qx.Class.define('cv.ui.manager.form.FileListItem', {
  extend: qx.ui.form.ListItem,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-file-item'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _applyModel: function (value, old) {
      this.base(arguments, value, old);
      if (value && value.getType() === 'file') {
        var control = this.getChildControl('file-type');
        var type = value.getName().split('.').pop();

        // do not use file types that are longer than 4 chars (not enough space)
        if (type.length <= 4) {
          switch (type) {
            case 'xml':
              control.setValue('</>');
              break;

            case 'js':
              type = qx.lang.String.firstUp(type); // jshint ignore:line
            case 'css':
            case 'conf':
              control.setValue(type);
              break;
          }
          control.show();
        } else {
          control.exclude();
        }
      } else {
        this.getChildControl('file-type').exclude();
      }
    },

    _maintainFileTypePosition: function () {
      var iconBounds = this.getChildControl('icon').getBounds();
      this.getChildControl('file-type').setUserBounds(
        iconBounds.left,
        Math.round(iconBounds.top + iconBounds.height/2),
        iconBounds.width,
        18
      );
    },

    // overridden
    _createChildControlImpl : function(id) {
      var control;

      switch (id) {
        case 'file-type':
          control = new qx.ui.basic.Label();
          control.set({
            zIndex: 11,
            anonymous: true,
            font: 'title',
            textAlign: 'center',
            textColor: 'background-main'
          });
          var icon = this.getChildControl('icon');
          icon.bind('visibility', control, 'visibility');
          icon.addListener('resize', this._maintainFileTypePosition, this);
          control.setUserBounds(0, 0, 0, 0);
          control.exclude();
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    }
  }
});
