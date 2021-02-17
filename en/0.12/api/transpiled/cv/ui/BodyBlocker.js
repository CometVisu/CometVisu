(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Blocker": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* BodyBlocker.js 
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
  //noinspection JSUnusedGlobalSymbols
  qx.Class.define('cv.ui.BodyBlocker', {
    extend: qx.bom.Blocker,
    type: "singleton",

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.bom.Blocker.constructor.call(this);
      this.__P_510_0 = {};
      this.setBlockerOpacity(0.5);
      this.setBlockerColor("#000000");
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_510_1: null,
      __P_510_0: null,
      __P_510_2: [],

      /**
       * @param topic {String} topic of the message related to this blocker
       * @param unique {Boolean} true if it is a unique message
       */
      block: function block(topic, unique) {
        cv.ui.BodyBlocker.prototype.block.base.call(this, this.__P_510_3());

        if (!this.__P_510_0.hasOwnProperty(topic)) {
          this.__P_510_0[topic] = 1;
        } else if (!unique) {
          this.__P_510_0[topic]++;
        }

        document.querySelectorAll("#centerContainer, #navbarTop, #top, #navbarBottom").forEach(function (elem) {
          elem.classList.add("blurred");
        });
      },
      unblock: function unblock(topic) {
        if (topic) {
          if (this.__P_510_0.hasOwnProperty(topic)) {
            this.__P_510_0[topic]--;

            if (this.__P_510_0[topic] === 0) {
              delete this.__P_510_0[topic];

              if (Object.keys(this.__P_510_0).length === 0) {
                cv.ui.BodyBlocker.prototype.unblock.base.call(this);
                document.querySelectorAll("#centerContainer, #navbarTop, #top, #navbarBottom").forEach(function (elem) {
                  elem.classList.remove("blurred");
                });
              }
            }
          }
        } else {
          // not topic given unblock all
          this.__P_510_0 = {};
          cv.ui.BodyBlocker.prototype.unblock.base.call(this);
          document.querySelectorAll("#centerContainer, #navbarTop, #top, #navbarBottom").forEach(function (elem) {
            elem.classList.remove("blurred");
          });
        }
      },
      __P_510_3: function __P_510_3() {
        if (!this.__P_510_1) {
          this.__P_510_1 = document.querySelector("body");
        }

        return this.__P_510_1;
      }
    }
  });
  cv.ui.BodyBlocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BodyBlocker.js.map?dt=1613588132673