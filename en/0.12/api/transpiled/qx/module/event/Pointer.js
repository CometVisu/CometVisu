(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Event": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.dom.Pointer": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Normalization for pointer events. Pointer events are hardware-agnostic and
   * will be fired regardless of which input type of input device is used (e.g. mouse or touchscreen).
   *
   * @require(qx.module.Event)
   * @require(qx.module.event.Pointer#getPointerType) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getViewportLeft) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getViewportTop) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getDocumentLeft) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getDocumentTop) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getScreenLeft) // static code analysis - this method has to referenced
   * @require(qx.module.event.Pointer#getScreenTop) // static code analysis - this method has to referenced
   *
   * @group (Event_Normalization)
   */
  qx.Bootstrap.define("qx.module.event.Pointer", {
    statics: {
      /**
       * List of event types to be normalized
       */
      TYPES: ["pointerdown", "pointerup", "pointermove", "pointercancel", "pointerover", "pointerout"],

      /**
       * Returns the device type which the event triggered. This can be one
       * of the following strings: <code>mouse</code>, <code>pen</code>
       * or <code>touch</code>.
       *
       * @return {String} The type of the pointer.
       */
      getPointerType: function getPointerType() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the horizontal coordinate at which the event occurred relative
       * to the viewport.
       *
       * @return {Number} The horizontal mouse position
       */
      getViewportLeft: function getViewportLeft() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the vertical coordinate at which the event occurred relative
       * to the viewport.
       *
       * @return {Number} The vertical mouse position
       * @signature function()
       */
      getViewportTop: function getViewportTop() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the horizontal position at which the event occurred relative to the
       * left of the document. This property takes into account any scrolling of
       * the page.
       *
       * @return {Number} The horizontal mouse position in the document.
       */
      getDocumentLeft: function getDocumentLeft() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the vertical position at which the event occurred relative to the
       * top of the document. This property takes into account any scrolling of
       * the page.
       *
       * @return {Number} The vertical mouse position in the document.
       */
      getDocumentTop: function getDocumentTop() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the horizontal coordinate at which the event occurred relative to
       * the origin of the screen coordinate system.
       *
       * Note: This value is usually not very useful unless you want to
       * position a native popup window at this coordinate.
       *
       * @return {Number} The horizontal mouse position on the screen.
       */
      getScreenLeft: function getScreenLeft() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Get the vertical coordinate at which the event occurred relative to
       * the origin of the screen coordinate system.
       *
       * Note: This value is usually not very useful unless you want to
       * position a native popup window at this coordinate.
       *
       * @return {Number} The vertical mouse position on the screen.
       */
      getScreenTop: function getScreenTop() {
        // stub for documentation. Implementation is in qx.event.type.dom.Pointer
        return false;
      },

      /**
       * Manipulates the native event object, adding methods if they're not
       * already present
       *
       * @param event {Event} Native event object
       * @param element {Element} DOM element the listener was attached to
       * @return {Event} Normalized event object
       * @internal
       */
      normalize: function normalize(event, element) {
        if (!event) {
          return event;
        }

        qx.event.type.dom.Pointer.normalize(event);
        return event;
      }
    },
    defer: function defer(statics) {
      qxWeb.$registerEventNormalization(qx.module.event.Pointer.TYPES, statics.normalize);
    }
  });
  qx.module.event.Pointer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pointer.js.map?dt=1648073864568