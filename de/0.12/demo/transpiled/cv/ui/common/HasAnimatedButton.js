(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      this.addListenerOnce("domReady", this.__P_146_0, this);
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_146_1: null,
      __P_146_2: null,
      __P_146_3: null,
      __P_146_0: function __P_146_0() {
        var actors = this.__P_146_4();

        if (this.isBindClickToWidget()) {
          actors = [this.getInteractionElement()];
        }

        actors.forEach(function (actor) {
          qx.event.Registration.addListener(actor, "pointerdown", this.buttonPressed, this);
        }, this);
      },
      __P_146_4: function __P_146_4() {
        var actors = [this.getActor()];

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
      buttonPressed: function buttonPressed(event) {
        var actor = event.getCurrentTarget();
        this.__P_146_3 = actor;
        qx.event.Registration.addListener(document, "pointerup", this.buttonReleased, this);
        var buttons = this.isBindClickToWidget() ? this.__P_146_4() : [actor];

        this.__P_146_5(buttons, true);

        this.__P_146_1 = qx.event.Registration.addListener(actor, "pointerout", function () {
          this.__P_146_5(buttons, false);
        }, this);
        this.__P_146_2 = qx.event.Registration.addListener(actor, "pointerover", function () {
          this.__P_146_5(buttons, true);
        }, this);
      },
      __P_146_5: function __P_146_5(buttons, pressed) {
        if (pressed) {
          buttons.forEach(function (button) {
            if (button) {
              button.classList.add('switchPressed');
              button.classList.remove('switchUnpressed');
            }
          });
        } else {
          buttons.forEach(function (button) {
            if (button) {
              button.classList.add('switchUnpressed');
              button.classList.remove('switchPressed');
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
      buttonReleased: function buttonReleased(event) {
        qx.event.Registration.removeListener(document, "pointerup", this.buttonReleased, this);
        var actor = this.__P_146_3;
        var buttons = this.isBindClickToWidget() ? this.__P_146_4() : [actor];

        this.__P_146_5(buttons, false);

        if (this.__P_146_1) {
          qx.event.Registration.removeListenerById(actor, this.__P_146_1);
        }

        if (this.__P_146_2) {
          qx.event.Registration.removeListenerById(actor, this.__P_146_2);
        }

        this.__P_146_1 = null;
        this.__P_146_2 = null;
        this.__P_146_3 = null;
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      qx.event.Registration.addListener(document, "pointerup", this.buttonReleased, this);
    }
  });
  cv.ui.common.HasAnimatedButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HasAnimatedButton.js.map?dt=1619362529791