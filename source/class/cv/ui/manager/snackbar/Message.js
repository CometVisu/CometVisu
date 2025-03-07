/* Message.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * View component that shows a snackbar message.
 */
qx.Class.define('cv.ui.manager.snackbar.Message', {
  extend: qx.ui.core.Widget,
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this._setLayout(new qx.ui.layout.HBox(8));
    this.addListener('appear', this._onAppear, this);
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    close: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-snackbar-msg'
    },

    model: {
      check: 'cv.ui.manager.model.Message',
      nullable: true,
      apply: '_applyModel'
    },

    timeout: {
      check: 'Number',
      init: 5000,
      apply: '_applyTimeout'
    },

    type: {
      check: ['alert', 'hint', 'warning', 'error'],
      nullable: true,
      apply: '_applyType'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _timer: null,

    _applyModel(value, old) {
      if (old) {
        old.removeRelatedBindings(this);
        old.removeRelatedBindings(this.getChildControl('content'));
      }
      if (value) {
        value.bind('title', this.getChildControl('content'), 'value');
        value.bind('type', this, 'type');
        value.bind('sticky', this, 'timeout', {
          converter(value) {
            return value ? 0 : 5000;
          }
        });

        this.getChildControl('close');
      }
    },

    _applyType(value) {
      if (value) {
        this.setDecorator(this.getAppearance() + '-' + value);
      } else {
        this.setDecorator(this.getAppearance());
      }
    },

    _applyTimeout(value) {
      if (this._timer) {
        this._timer.stop();
        if (value === 0) {
          this._timer = null;
        }
      }
    },

    _onAppear() {
      const timeout = this.getTimeout();
      if (this._timer) {
        this._timer.stop();
      }
      if (timeout > 0) {
        this._timer = qx.event.Timer.once(this.close, this, timeout);
      }
    },

    close() {
      this.fireDataEvent('close', this.getModel());
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case 'icon':
          control = new qx.ui.basic.Image();
          this._addAt(control, 0);
          break;

        case 'content':
          control = new qx.ui.basic.Label();
          control.set({
            rich: true,
            wrap: true
          });

          this._addAt(control, 1, { flex: 1 });
          break;

        case 'close':
          control = new qx.ui.basic.Image(cv.theme.dark.Images.getIcon('close', 15));

          control.addListener('tap', this.close, this);
          this._addAt(control, 2);
          break;
      }

      return control || super._createChildControlImpl(id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeObjects('_timer');
  }
});
