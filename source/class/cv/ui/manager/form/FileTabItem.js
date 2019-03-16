/**
 *
 */
qx.Class.define('cv.ui.manager.form.FileTabItem', {
  extend: qx.ui.form.ListItem,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    var icon = this.getChildControl('icon');
    icon.setAnonymous(false);
    icon.setCursor('pointer');
    icon.addListener('tap', this._onClose, this);
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    'close': 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'open-file-item'
    },

    permanent: {
      check: 'Boolean',
      init: false,
      apply: '_applyPermanent'
    },

    modified: {
      check: 'Boolean',
      init: false,
      apply: '_applyLabel'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyPermanent: function (value) {
      this.setFont(value ? 'default' : 'italic');
    },

    _applyLabel: function () {
      var label = this.getChildControl("label", true);
      if (label) {
        label.setValue(this.getLabel() + (this.isModified() ? ' *' : ''));
      }

      this._handleLabel();
    },

    _onClose: function () {
      this.fireDataEvent('close', this.getModel());
    }
  }
});
