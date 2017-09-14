/* HasAnimatedButton.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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


qx.Mixin.define("cv.ui.common.HasAnimatedButton", {

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function() {
    this.addListenerOnce("domReady", this.__initListeners, this);
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    __initListeners: function() {
      var actors = [this.getActor()];
      if (this.getActors) {
        actors = qx.lang.Array.append(actors, this.getActors());
      }
      actors.forEach(function(actor) {
        qx.event.Registration.addListener(actor, "pointerdown", this.buttonPressed, this);
        qx.event.Registration.addListener(actor, "pointerup", this.buttonReleased, this);
      }, this);
    },

    /**
     * Create an action handling that shows a button press animation.
     * When the action is not set, it will be searched for - so that widgets
     * with bind_click_to_widget will also work.
     *
     * @param event {Event} pointerdown event
     */
    buttonPressed: function(event) {
      var actor = event.getCurrentTarget();
      qx.bom.element.Class.add(actor, 'switchPressed');
      qx.bom.element.Class.remove(actor, 'switchUnpressed');
    },

    /**
     * Create an action handling that shows a button unpress animation.
     * When the action is not set, it will be searched for - so that widgets
     * with bind_click_to_widget will also work.
     *
     * @param event {Event} pointerup event
     */
    buttonReleased: function(event) {
      var actor = event.getCurrentTarget();
      qx.bom.element.Class.add(actor, 'switchUnpressed');
      qx.bom.element.Class.remove(actor, 'switchPressed');
    }
  }
});