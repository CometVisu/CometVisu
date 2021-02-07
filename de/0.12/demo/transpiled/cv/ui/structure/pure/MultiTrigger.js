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
      "qx.util.DeferredCall": {},
      "qx.event.Registration": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* MultiTrigger.js 
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
   * Adds a widget with multiple buttons to the visu.
   * Thus, e.g. change the operating mode of the heating system
   * (Comfort -> Night -> Absent -> Frost protection) or create scene functions.
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.MultiTrigger', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.Update, cv.ui.common.HasAnimatedButton],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      showstatus: {
        check: "Boolean",
        init: false
      },
      elementsPerLine: {
        check: "Number",
        init: 2
      },
      buttonConfiguration: {
        check: 'Object',
        nullable: false
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
        // create the actor
        var ret_val = '<div class="actor_container" style="float:left">';
        var mapping = this.getMapping();
        var elementsPerLine = this.getElementsPerLine();
        var config = this.getButtonConfiguration();
        var indices = Object.keys(config).sort();
        indices.forEach(function (i) {
          var buttonConfig = config[i];
          var label = buttonConfig.label;

          if (mapping) {
            var mappedValue = this.defaultValueHandling(undefined, buttonConfig.value);

            if (mappedValue !== buttonConfig.value || !label) {
              label = '';
              this.defaultValue2DOM(mappedValue, function (e) {
                label += e;
              });
            }
          }

          if (label) {
            ret_val += '<div class="actor switchUnpressed"><div class="value">' + label + '</div></div>';
          }

          if (elementsPerLine > 0 && i % elementsPerLine === 0) {
            ret_val += '<br/>';
          }
        }, this);
        return ret_val + '</div>';
      },
      getActors: function getActors() {
        return this.getDomElement().querySelectorAll('.actor_container .actor');
      },
      // overridden, only transform the value, do not apply it to DOM
      _processIncomingValue: function _processIncomingValue(address, data) {
        return this.applyTransform(address, data);
      },

      /**
       * Handles the incoming data from the backend for this widget
       */
      handleUpdate: function handleUpdate() {
        var children = this.getActors();
        var buttonConfiguration = this.getButtonConfiguration();
        children.forEach(function (actor) {
          var index = Array.prototype.indexOf.call(children, actor) + 1;

          if (buttonConfiguration.hasOwnProperty(index)) {
            var isPressed = '' + this.getBasicValue() === '' + buttonConfiguration[index].value; // compare as string
            // delay this a little bit to give the HasAnimatedButton stuff time to finish
            // otherwise it might override the settings here

            new qx.util.DeferredCall(function () {
              actor.classList.remove(isPressed ? 'switchUnpressed' : 'switchPressed');
              actor.classList.add(isPressed ? 'switchPressed' : 'switchUnpressed');
            }, this).schedule();
          }
        }, this);
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       */
      getActionValue: function getActionValue(event) {
        var index = Array.prototype.indexOf.call(this.getDomElement().querySelectorAll('.actor_container .actor'), event.getCurrentTarget()) + 1;
        return this.getButtonConfiguration()[index].value;
      },
      // overridden
      initListeners: function initListeners() {
        if (this.isAnonymous()) {
          return;
        }

        this.getActors().forEach(function (actor) {
          qx.event.Registration.addListener(actor, "tap", this.action, this);
          qx.event.Registration.addListener(actor, "pointerdown", this._onPointerDown, this);
        }, this);
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("multitrigger", statics);
    }
  });
  cv.ui.structure.pure.MultiTrigger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MultiTrigger.js.map?dt=1612691003127