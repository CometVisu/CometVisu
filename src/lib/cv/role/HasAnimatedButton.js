/* _common.js
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

define(['joose'], function() {
  Role("cv.role.HasAnimatedButton", {
    requires: ['action', 'downaction'],

    before: {

      /**
       * Create an action handling that shows a button press animation.
       * When the action is not set, it will be searched for - so that widgets
       * with bind_click_to_widget will also work.
       * @method downaction
       * @param {} path
       * @param {} actor
       */
      downaction: function(path, actor, isCanceled) {
        if( !actor )
          actor = this.getActor();
        if (!actor.length) {
          actor = $(actor);
        }
        actor.addClass('switchPressed');
        actor.removeClass('switchUnpressed');
      },

      /**
       * Create an action handling that shows a button unpress animation.
       * When the action is not set, it will be searched for - so that widgets
       * with bind_click_to_widget will also work.
       * @method action
       * @param {} path
       * @param {} actor
       */
      action: function(path, actor, isCanceled) {
        if( !actor )
          actor = this.getActor();
        if (!actor.length) {
          actor = $(actor);
        }
        actor.addClass('switchUnpressed');
        actor.removeClass('switchPpressed');
      }
    }
  });
});