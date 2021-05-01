(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "cv.ui.common.HandleLongpress": {
        "require": true
      },
      "qx.event.Registration": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* InfoTrigger.js 
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

  /**
   * Adds an element to the visu that contains two buttons and a value indication for feedback
   * from the BUS. (E.g. for multimedia control
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.InfoTrigger', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.Update, cv.ui.common.HasAnimatedButton, cv.ui.common.HandleLongpress],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      'downValue': {
        check: "Number",
        init: 0
      },
      'shortDownValue': {
        check: "Number",
        nullable: true
      },
      'downLabel': {
        check: "String",
        nullable: true
      },
      'upValue': {
        check: "Number",
        init: 0
      },
      'shortUpValue': {
        check: "Number",
        nullable: true
      },
      'upLabel': {
        check: "String",
        nullable: true
      },
      'isAbsolute': {
        check: "Boolean",
        init: false
      },
      'min': {
        check: "Number",
        init: 0
      },
      'max': {
        check: "Number",
        init: 255
      },
      'infoPosition': {
        check: ["left", "middle", "right"],
        init: 'middle'
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        // create buttons + info
        var ret_val = '<div style="float:left;">';
        var actordown = '<div class="actor switchUnpressed downlabel" ';

        if (this.getAlign()) {
          actordown += 'style="text-align: ' + this.getAlign() + '" ';
        }

        actordown += '>';
        actordown += '<div class="label">' + (this.getDownLabel() || '-') + '</div>';
        actordown += '</div>';
        var actorup = '<div class="actor switchUnpressed uplabel" ';

        if (this.getAlign()) {
          actorup += 'style="text-align: ' + this.getAlign() + '" ';
        }

        actorup += '>';
        actorup += '<div class="label">' + (this.getUpLabel() || '+') + '</div>';
        actorup += '</div>';
        var actorinfo = '<div class="actor switchInvisible" ';

        if (this.getAlign()) {
          actorinfo += 'style="text-align: ' + this.getAlign() + '" ';
        }

        actorinfo += '><div class="value">-</div></div>';

        switch (this.getInfoPosition()) {
          case 'middle':
            ret_val += actordown;
            ret_val += actorinfo;
            ret_val += actorup;
            break;

          case 'right':
            ret_val += actordown;
            ret_val += actorup;
            ret_val += actorinfo;
            break;

          default:
            ret_val += actorinfo;
            ret_val += actordown;
            ret_val += actorup;
            break;
        }

        return ret_val + '</div>';
      },
      getActors: function getActors() {
        return this.getDomElement().querySelectorAll(".actor.uplabel, .actor.downlabel");
      },
      // overridden
      initListeners: function initListeners() {
        this.getActors().forEach(function (actor) {
          qx.event.Registration.addListener(actor, "pointerdown", this._onPointerDown, this);
        }, this);
      },
      __P_46_0: function __P_46_0(element) {
        while (!element.classList.contains('actor')) {
          element = element.parentNode;

          if (element.classList.contains('widget')) {
            // thats too far
            return null;
          }
        }

        return element;
      },
      _onLongTap: function _onLongTap(event) {
        this.__P_46_1(false, this.__P_46_0(event.getCurrentTarget()).classList.contains('downlabel'));
      },
      _action: function _action(event) {
        this.__P_46_1(true, this.__P_46_0(event.getCurrentTarget()).classList.contains('downlabel'));
      },
      __P_46_1: function __P_46_1(isShort, isDown) {
        var value;

        if (isShort && this.getShortDownValue() !== null && this.getShortUpValue() !== null) {
          value = isDown ? this.getShortDownValue() : this.getShortUpValue();
        } else {
          value = isDown ? this.getDownValue() : this.getUpValue();
        }

        var bitMask = isShort ? 1 : 2;

        if (this.getIsAbsolute()) {
          var bvalue = parseFloat(this.getBasicValue());

          if (isNaN(bvalue)) {
            bvalue = 0; // anything is better than NaN...
          }

          value = bvalue + value;
          value = Math.max(value, this.getMin());
          value = Math.min(value, this.getMax());
        }

        this.sendToBackend(value, function (address) {
          return !!(address.variantInfo & bitMask);
        });
      },
      getDownActor: function getDownActor() {
        return this.getDomElement().querySelector(".actor.downlabel");
      },
      getUpActor: function getUpActor() {
        return this.getDomElement().querySelector(".actor.uplabel");
      },
      getInfoActor: function getInfoActor() {
        return this.getDomElement().querySelector(".actor.switchInvisible");
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("infotrigger", statics);
    }
  });
  cv.ui.structure.pure.InfoTrigger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=InfoTrigger.js.map?dt=1619884691050