/* VirtualSelectBox.js 
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
