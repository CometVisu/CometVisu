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
    __olid: null,
    __ilid: null,
    __downTarget: null,

    __initListeners: function() {
      var actors = this.__getActors();
      if (this.isBindClickToWidget()) {
        actors = [this.getInteractionElement()];
      }
      actors.forEach(function(actor) {
        qx.event.Registration.addListener(actor, "pointerdown", this.buttonPressed, this);
      }, this);
    },

    __getActors : function() {
      var actors = [this.getActor()];
      if (this.getActors) {
        this.getActors().forEach(function(a) {
          if (actors.indexOf(a) === -1) {
            actors.push(a);
          }
        });
      }
      return actors;
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
      this.__downTarget = actor;
      qx.event.Registration.addListener(document, "pointerup", this.buttonReleased, this);
      var buttons = this.isBindClickToWidget() ? this.__getActors() : [actor];
      this.__updateButtons(buttons, true);
      this.__olid = qx.event.Registration.addListener(actor, "pointerout", function() {
        this.__updateButtons(buttons, false);
      }, this);
      this.__ilid = qx.event.Registration.addListener(actor, "pointerover", function() {
        this.__updateButtons(buttons, true);
      }, this);
    },

    __updateButtons: function(buttons, pressed) {
      if (pressed) {
        buttons.forEach(function(button) {
          qx.bom.element.Class.add(button, 'switchPressed');
          qx.bom.element.Class.remove(button, 'switchUnpressed');
        });
      } else {
        buttons.forEach(function(button) {
          qx.bom.element.Class.add(button, 'switchUnpressed');
          qx.bom.element.Class.remove(button, 'switchPressed');
        });
      }
    },

    /**
     * Create an action handling that shows a button unpress animation.
     * When the action is not set, it will be searched for - so that widgets
     * with bind_click_to_widget will also work.
     *
     * @param event {Event} pointerup event
     */
    buttonReleased: function(event) {
      qx.event.Registration.removeListener(document, "pointerup", this.buttonReleased, this);
      var actor = this.__downTarget;
      var buttons = this.isBindClickToWidget() ? this.__getActors() : [actor];
      this.__updateButtons(buttons, false);
      qx.event.Registration.removeListenerById(actor, this.__olid);
      qx.event.Registration.removeListenerById(actor, this.__ilid);
      this.__olid = null;
      this.__ilid = null;
      this.__downTarget = null;
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    qx.event.Registration.addListener(document, "pointerup", this.buttonReleased, this);
  }
});
