/* IconAtom.js 
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
 * Atom with cv.ui.manager.viewer.SvgIcon instead ob an qx.ui.basic.Image
 */
qx.Class.define('cv.ui.manager.core.IconAtom', {
  extend: qx.ui.basic.Atom,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (label, icon) {
    this.base(arguments, label, icon);
    this._fontIconRegex = /^\<i.*class=".*(knxuf-|ri-)([^\s"]+).*".*\<\/i\>$/;
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-icon'
    },

    model: {
      check: 'Array',
      apply: '_applyModel'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _fontIconRegex: null,
    _iconChildControlName: null,

    _applyModel: function (value) {
      if (value) {
        const [name, icon] = value;
        this.setLabel(name);
        this.setIcon(icon);
      }
    },

    _applyIcon(value, old) {
      if (value) {
        if (this._fontIconRegex.test(value)) {
          this._iconChildControlName = 'htmlIcon';
          const icon = this.getChildControl(this._iconChildControlName, true);
          if (icon) {
            icon.setValue(value);
          }
        } else {
          this._iconChildControlName = 'icon';
          const icon = this.getChildControl(this._iconChildControlName, true);
          if (icon) {
            icon.setSource(value);
          }
        }
      } else {
        this._iconChildControlName = 'icon';
      }
      this._handleIcon();
    },

    _handleIcon() {
      if (this.getIcon() == null || this.getShow() === 'label') {
        this._excludeChildControl(this._iconChildControlName);
      } else {
        this._showChildControl(this._iconChildControlName);
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
      let control;

      switch (id) {
         case 'icon':
           control = new cv.ui.manager.basic.Image(this.getIcon());
           control.set({
             anonymous: true,
             scale: true,
             maxHeight: 64
           });
           this._addAt(control, 0);
           if (this.getIcon() === null || this.getShow() === 'label') {
             control.exclude();
           }
           break;

        case 'htmlIcon':
          control = new qx.ui.basic.Label(this.getIcon());
          control.set({
            anonymous: true,
            rich: true,
            height: 64,
            width: 64
          });
          this._addAt(control, 0);
          if (this.getIcon() === null || this.getShow() === 'label') {
            control.exclude();
          }
       }

       return control || this.base(arguments, id);
    }
  }
});
