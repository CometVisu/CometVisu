/* HasAnimatedButton.js
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

qx.Mixin.define("cv.ui.common.HasAnimatedButton", {
  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct() {
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

    __initListeners() {
      let actors = this.__getActors();
      if (this.isBindClickToWidget()) {
        actors = [this.getInteractionElement()];
      }
      actors.forEach(function (actor) {
        qx.event.Registration.addListener(
          actor,
          "pointerdown",
          this.buttonPressed,
          this
        );
      }, this);
    },

    __getActors() {
      const actors = [this.getActor()];
      if (this.getActors) {
        this.getActors().forEach(function (a) {
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
    buttonPressed(event) {
      const actor = event.getCurrentTarget();
      this.__downTarget = actor;
      qx.event.Registration.addListener(
        document,
        "pointerup",
        this.buttonReleased,
        this
      );
      const buttons = this.isBindClickToWidget() ? this.__getActors() : [actor];
      this.__updateButtons(buttons, true);
      this.__olid = qx.event.Registration.addListener(
        actor,
        "pointerout",
        function () {
          this.__updateButtons(buttons, false);
        },
        this
      );
      this.__ilid = qx.event.Registration.addListener(
        actor,
        "pointerover",
        function () {
          this.__updateButtons(buttons, true);
        },
        this
      );
    },

    __updateButtons(buttons, pressed) {
      if (pressed) {
        buttons.forEach(function (button) {
          if (button) {
            button.classList.add("switchPressed");
            button.classList.remove("switchUnpressed");
          }
        });
      } else {
        buttons.forEach(function (button) {
          if (button) {
            button.classList.add("switchUnpressed");
            button.classList.remove("switchPressed");
          }
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
    buttonReleased(event) {
      qx.event.Registration.removeListener(
        document,
        "pointerup",
        this.buttonReleased,
        this
      );
      const actor = this.__downTarget;
      const buttons = this.isBindClickToWidget() ? this.__getActors() : [actor];
      this.__updateButtons(buttons, false);
      if (this.__olid) {
        qx.event.Registration.removeListenerById(actor, this.__olid);
      }
      if (this.__ilid) {
        qx.event.Registration.removeListenerById(actor, this.__ilid);
      }
      this.__olid = null;
      this.__ilid = null;
      this.__downTarget = null;
    },
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    qx.event.Registration.addListener(
      document,
      "pointerup",
      this.buttonReleased,
      this
    );
  },
});
