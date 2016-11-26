/* DynamicScriptLoader.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

qx.Class.define('cv.util.DynamicScriptLoader', {
  extend: qx.util.DynamicScriptLoader,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(scriptArr) {
    var queue = (qx.lang.Type.isString(scriptArr) ? [ scriptArr ] : qx.lang.Array.clone(scriptArr));
    if (cv.Config.forceReload === true) {
      // make sure that no cached script are loaded
      for (var i=0, l = queue.length; i<l; i++) {
        queue[i] = qx.util.ResourceManager.getInstance().toUri(queue[i])+"?"+Date.now();
      }
    }
    this.base(arguments, queue);
  }
});