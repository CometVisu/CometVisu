(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.bom.Event": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Dom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 Zenesis Limited, https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman, john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * Defines the event handlers for Video tags - also Audio because they are identical
   */
  qx.Class.define("qx.event.handler.Video", {
    extend: qx.core.Object,
    implement: qx.event.IEventHandler,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_236_0 = qx.lang.Function.listener(this._onNative, this);
    },
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,
      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        abort: 1,
        canplay: 1,
        canplaythrough: 1,
        durationchange: 1,
        emptied: 1,
        ended: 1,
        error: 1,
        loadeddata: 1,
        loadedmetadata: 1,
        loadstart: 1,
        pause: 1,
        play: 1,
        playing: 1,
        progress: 1,
        ratechange: 1,
        seeked: 1,
        seeking: 1,
        stalled: 1,
        suspend: 1,
        timeupdate: 1,
        volumechange: 1,
        waiting: 1
      },
      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,
      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: false
    },
    members: {
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {
        var lower = target.tagName.toLowerCase();
        if (lower === "video" || lower === "audio") {
          return true;
        }
        return false;
      },
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {
        qx.bom.Event.addNativeListener(target, type, this.__P_236_0);
      },
      /**
       * Default event handler for events that do not bubble
       *
       * @signature function(domEvent, eventId)
       * @param domEvent {Event} Native event
       */
      _onNative: qx.event.GlobalError.observeMethod(function (domEvent) {
        var target = qx.bom.Event.getTarget(domEvent);
        qx.event.Registration.fireNonBubblingEvent(target, domEvent.type, qx.event.type.Dom, [domEvent, target, undefined, undefined, domEvent.cancelable]);
      }),
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type) {
        qx.bom.Event.removeNativeListener(target, type, this.__P_236_0);
      }
    },
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics);
    }
  });
  qx.event.handler.Video.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Video.js.map?dt=1735383854422