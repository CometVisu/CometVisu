(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {
        "construct": true
      },
      "qx.event.handler.DragDrop": {
        "construct": true
      },
      "qx.ui.core.Widget": {},
      "qx.core.Init": {},
      "qx.lang.Object": {},
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 David Pérez Carmona
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * David Perez Carmona (david-perez)
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Provides resizing behavior to any widget.
   */
  qx.Mixin.define("qx.ui.core.MResizable", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      // Register listeners to the content
      var content = this.getContentElement();
      content.addListener("pointerdown", this.__P_282_0, this, true);
      content.addListener("pointerup", this.__P_282_1, this);
      content.addListener("pointermove", this.__P_282_2, this);
      content.addListener("pointerout", this.__P_282_3, this);
      content.addListener("losecapture", this.__P_282_4, this); // Get a reference of the drag and drop handler

      var domElement = content.getDomElement();

      if (domElement == null) {
        domElement = window;
      }

      this.__P_282_5 = qx.event.Registration.getManager(domElement).getHandler(qx.event.handler.DragDrop);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Whether the top edge is resizable */
      resizableTop: {
        check: "Boolean",
        init: true
      },

      /** Whether the right edge is resizable */
      resizableRight: {
        check: "Boolean",
        init: true
      },

      /** Whether the bottom edge is resizable */
      resizableBottom: {
        check: "Boolean",
        init: true
      },

      /** Whether the left edge is resizable */
      resizableLeft: {
        check: "Boolean",
        init: true
      },

      /**
       * Property group to configure the resize behaviour for all edges at once
       */
      resizable: {
        group: ["resizableTop", "resizableRight", "resizableBottom", "resizableLeft"],
        mode: "shorthand"
      },

      /** The tolerance to activate resizing */
      resizeSensitivity: {
        check: "Integer",
        init: 5
      },

      /** Whether a frame replacement should be used during the resize sequence */
      useResizeFrame: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_282_5: null,
      __P_282_6: null,
      __P_282_7: null,
      __P_282_8: null,
      __P_282_9: null,
      __P_282_10: null,
      __P_282_11: null,
      RESIZE_TOP: 1,
      RESIZE_BOTTOM: 2,
      RESIZE_LEFT: 4,
      RESIZE_RIGHT: 8,

      /*
      ---------------------------------------------------------------------------
        CORE FEATURES
      ---------------------------------------------------------------------------
      */

      /**
       * Get the widget, which draws the resize/move frame. The resize frame is
       * shared by all widgets and is added to the root widget.
       *
       * @return {qx.ui.core.Widget} The resize frame
       */
      _getResizeFrame: function _getResizeFrame() {
        var frame = this.__P_282_6;

        if (!frame) {
          frame = this.__P_282_6 = new qx.ui.core.Widget();
          frame.setAppearance("resize-frame");
          frame.exclude();
          qx.core.Init.getApplication().getRoot().add(frame);
        }

        return frame;
      },

      /**
       * Creates, shows and syncs the frame with the widget.
       */
      __P_282_12: function __P_282_12() {
        var location = this.getContentLocation();

        var frame = this._getResizeFrame();

        frame.setUserBounds(location.left, location.top, location.right - location.left, location.bottom - location.top);
        frame.show();
        frame.setZIndex(this.getZIndex() + 1);
      },

      /*
      ---------------------------------------------------------------------------
        RESIZE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Computes the new boundaries at each interval
       * of the resize sequence.
       *
       * @param e {qx.event.type.Pointer} Last pointer event
       * @return {Map} A map with the computed boundaries
       */
      __P_282_13: function __P_282_13(e) {
        // Detect mode
        var resizeActive = this.__P_282_7; // Read size hint

        var hint = this.getSizeHint();
        var range = this.__P_282_11; // Read original values

        var start = this.__P_282_10;
        var width = start.width;
        var height = start.height;
        var left = start.left;
        var top = start.top;
        var diff;

        if (resizeActive & this.RESIZE_TOP || resizeActive & this.RESIZE_BOTTOM) {
          diff = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop())) - this.__P_282_9;

          if (resizeActive & this.RESIZE_TOP) {
            height -= diff;
          } else {
            height += diff;
          }

          if (height < hint.minHeight) {
            height = hint.minHeight;
          } else if (height > hint.maxHeight) {
            height = hint.maxHeight;
          }

          if (resizeActive & this.RESIZE_TOP) {
            top += start.height - height;
          }
        }

        if (resizeActive & this.RESIZE_LEFT || resizeActive & this.RESIZE_RIGHT) {
          diff = Math.max(range.left, Math.min(range.right, e.getDocumentLeft())) - this.__P_282_8;

          if (resizeActive & this.RESIZE_LEFT) {
            width -= diff;
          } else {
            width += diff;
          }

          if (width < hint.minWidth) {
            width = hint.minWidth;
          } else if (width > hint.maxWidth) {
            width = hint.maxWidth;
          }

          if (resizeActive & this.RESIZE_LEFT) {
            left += start.width - width;
          }
        }

        return {
          // left and top of the visible widget
          viewportLeft: left,
          viewportTop: top,
          parentLeft: start.bounds.left + left - start.left,
          parentTop: start.bounds.top + top - start.top,
          // dimensions of the visible widget
          width: width,
          height: height
        };
      },

      /**
       * @type {Map} Maps internal states to cursor symbols to use
       *
       * @lint ignoreReferenceField(__resizeCursors)
       */
      __P_282_14: {
        1: "n-resize",
        2: "s-resize",
        4: "w-resize",
        8: "e-resize",
        5: "nw-resize",
        6: "sw-resize",
        9: "ne-resize",
        10: "se-resize"
      },

      /**
       * Updates the internally stored resize mode
       *
       * @param e {qx.event.type.Pointer} Last pointer event
       */
      __P_282_15: function __P_282_15(e) {
        var location = this.getContentLocation();
        var pointerTolerance = this.getResizeSensitivity();
        var pointerLeft = e.getDocumentLeft();
        var pointerTop = e.getDocumentTop();

        var resizeActive = this.__P_282_16(location, pointerLeft, pointerTop, pointerTolerance); // check again in case we have a corner [BUG #1200]


        if (resizeActive > 0) {
          // this is really a | (or)!
          resizeActive = resizeActive | this.__P_282_16(location, pointerLeft, pointerTop, pointerTolerance * 2);
        }

        this.__P_282_7 = resizeActive;
      },

      /**
       * Internal helper for computing the proper resize action based on the
       * given parameters.
       *
       * @param location {Map} The current location of the widget.
       * @param pointerLeft {Integer} The left position of the pointer.
       * @param pointerTop {Integer} The top position of the pointer.
       * @param pointerTolerance {Integer} The desired distance to the edge.
       * @return {Integer} The resize active number.
       */
      __P_282_16: function __P_282_16(location, pointerLeft, pointerTop, pointerTolerance) {
        var resizeActive = 0; // TOP

        if (this.getResizableTop() && Math.abs(location.top - pointerTop) < pointerTolerance && pointerLeft > location.left - pointerTolerance && pointerLeft < location.right + pointerTolerance) {
          resizeActive += this.RESIZE_TOP; // BOTTOM
        } else if (this.getResizableBottom() && Math.abs(location.bottom - pointerTop) < pointerTolerance && pointerLeft > location.left - pointerTolerance && pointerLeft < location.right + pointerTolerance) {
          resizeActive += this.RESIZE_BOTTOM;
        } // LEFT


        if (this.getResizableLeft() && Math.abs(location.left - pointerLeft) < pointerTolerance && pointerTop > location.top - pointerTolerance && pointerTop < location.bottom + pointerTolerance) {
          resizeActive += this.RESIZE_LEFT; // RIGHT
        } else if (this.getResizableRight() && Math.abs(location.right - pointerLeft) < pointerTolerance && pointerTop > location.top - pointerTolerance && pointerTop < location.bottom + pointerTolerance) {
          resizeActive += this.RESIZE_RIGHT;
        }

        return resizeActive;
      },

      /*
      ---------------------------------------------------------------------------
        RESIZE EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for the pointer down event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __P_282_0: function __P_282_0(e) {
        // Check for active resize
        if (!this.__P_282_7 || !this.getEnabled() || e.getPointerType() == "touch") {
          return;
        } // Add resize state


        this.addState("resize"); // Store pointer coordinates

        this.__P_282_8 = e.getDocumentLeft();
        this.__P_282_9 = e.getDocumentTop(); // Cache bounds

        var location = this.getContentLocation();
        var bounds = this.getBounds();
        this.__P_282_10 = {
          top: location.top,
          left: location.left,
          width: location.right - location.left,
          height: location.bottom - location.top,
          bounds: qx.lang.Object.clone(bounds)
        }; // Compute range

        var parent = this.getLayoutParent();
        var parentLocation = parent.getContentLocation();
        var parentBounds = parent.getBounds();
        this.__P_282_11 = {
          left: parentLocation.left,
          top: parentLocation.top,
          right: parentLocation.left + parentBounds.width,
          bottom: parentLocation.top + parentBounds.height
        }; // Show frame if configured this way

        if (this.getUseResizeFrame()) {
          this.__P_282_12();
        } // Enable capturing


        this.capture(); // Stop event

        e.stop();
      },

      /**
       * Event handler for the pointer up event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __P_282_1: function __P_282_1(e) {
        // Check for active resize
        if (!this.hasState("resize") || !this.getEnabled() || e.getPointerType() == "touch") {
          return;
        } // Hide frame afterwards


        if (this.getUseResizeFrame()) {
          this._getResizeFrame().exclude();
        } // Compute bounds


        var bounds = this.__P_282_13(e); // Sync with widget


        this.setWidth(bounds.width);
        this.setHeight(bounds.height); // Update coordinate in canvas

        if (this.getResizableLeft() || this.getResizableTop()) {
          this.setLayoutProperties({
            left: bounds.parentLeft,
            top: bounds.parentTop
          });
        } // Clear mode


        this.__P_282_7 = 0; // Remove resize state

        this.removeState("resize"); // Reset cursor

        this.resetCursor();
        this.getApplicationRoot().resetGlobalCursor(); // Disable capturing

        this.releaseCapture();
        e.stopPropagation();
      },

      /**
       * Event listener for <code>losecapture</code> event.
       *
       * @param e {qx.event.type.Event} Lose capture event
       */
      __P_282_4: function __P_282_4(e) {
        // Check for active resize
        if (!this.__P_282_7) {
          return;
        } // Reset cursor


        this.resetCursor();
        this.getApplicationRoot().resetGlobalCursor(); // Remove drag state

        this.removeState("move"); // Hide frame afterwards

        if (this.getUseResizeFrame()) {
          this._getResizeFrame().exclude();
        }
      },

      /**
       * Event handler for the pointer move event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __P_282_2: function __P_282_2(e) {
        if (!this.getEnabled() || e.getPointerType() == "touch") {
          return;
        }

        if (this.hasState("resize")) {
          var bounds = this.__P_282_13(e); // Update widget


          if (this.getUseResizeFrame()) {
            // Sync new bounds to frame
            var frame = this._getResizeFrame();

            frame.setUserBounds(bounds.viewportLeft, bounds.viewportTop, bounds.width, bounds.height);
          } else {
            // Update size
            this.setWidth(bounds.width);
            this.setHeight(bounds.height); // Update coordinate in canvas

            if (this.getResizableLeft() || this.getResizableTop()) {
              this.setLayoutProperties({
                left: bounds.parentLeft,
                top: bounds.parentTop
              });
            }
          } // Full stop for event


          e.stopPropagation();
        } else if (!this.hasState("maximized") && !this.__P_282_5.isSessionActive()) {
          this.__P_282_15(e);

          var resizeActive = this.__P_282_7;
          var root = this.getApplicationRoot();

          if (resizeActive) {
            var cursor = this.__P_282_14[resizeActive];
            this.setCursor(cursor);
            root.setGlobalCursor(cursor);
          } else if (this.getCursor()) {
            this.resetCursor();
            root.resetGlobalCursor();
          }
        }
      },

      /**
       * Event handler for the pointer out event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __P_282_3: function __P_282_3(e) {
        if (e.getPointerType() == "touch") {
          return;
        } // When the pointer left the window and resizing is not yet
        // active we must be sure to (especially) reset the global
        // cursor.


        if (this.getCursor() && !this.hasState("resize")) {
          this.resetCursor();
          this.getApplicationRoot().resetGlobalCursor();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.getCursor()) {
        this.getApplicationRoot().resetGlobalCursor();
      }

      if (this.__P_282_6 != null && !qx.core.ObjectRegistry.inShutDown) {
        this.__P_282_6.destroy();

        this.__P_282_6 = null;
      }

      this.__P_282_5 = null;
    }
  });
  qx.ui.core.MResizable.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MResizable.js.map?dt=1642098049977