(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.splitpane.Slider": {},
      "qx.ui.splitpane.Splitter": {},
      "qx.ui.splitpane.Blocker": {},
      "qx.ui.splitpane.VLayout": {},
      "qx.ui.splitpane.HLayout": {},
      "qx.ui.core.queue.Manager": {},
      "qx.bom.element.Location": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A split panes divides an area into two panes. The ratio between the two
   * panes is configurable by the user using the splitter.
   *
   * @childControl slider {qx.ui.splitpane.Slider} shown during resizing the splitpane
   * @childControl splitter {qx.ui.splitpane.Splitter} splitter to resize the splitpane
   */
  qx.Class.define("qx.ui.splitpane.Pane", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Creates a new instance of a SplitPane. It allows the user to dynamically
     * resize the areas dropping the border between.
     *
     * @param orientation {String} The orientation of the split pane control.
     * Allowed values are "horizontal" (default) and "vertical".
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this);
      this.__P_397_0 = []; // Initialize orientation

      if (orientation) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      } // add all pointer listener to the blocker


      this.__P_397_1.addListener("pointerdown", this._onPointerDown, this);

      this.__P_397_1.addListener("pointerup", this._onPointerUp, this);

      this.__P_397_1.addListener("pointermove", this._onPointerMove, this);

      this.__P_397_1.addListener("pointerout", this._onPointerOut, this);

      this.__P_397_1.addListener("losecapture", this._onPointerUp, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "splitpane"
      },

      /**
       * Distance between pointer and splitter when the cursor should change
       * and enable resizing.
       */
      offset: {
        check: "Integer",
        init: 6,
        apply: "_applyOffset"
      },

      /**
       * The orientation of the splitpane control.
       */
      orientation: {
        init: "horizontal",
        check: ["horizontal", "vertical"],
        apply: "_applyOrientation"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_397_2: null,
      __P_397_3: false,
      __P_397_4: null,
      __P_397_5: null,
      __P_397_6: null,
      __P_397_7: null,
      __P_397_8: null,
      __P_397_0: null,
      __P_397_1: null,
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          // Create and add slider
          case "slider":
            control = new qx.ui.splitpane.Slider(this);
            control.exclude();

            this._add(control, {
              type: id
            });

            break;
          // Create splitter

          case "splitter":
            control = new qx.ui.splitpane.Splitter(this);

            this._add(control, {
              type: id
            });

            control.addListener("move", this.__P_397_9, this);
            break;
        }

        return control || qx.ui.splitpane.Pane.prototype._createChildControlImpl.base.call(this, id);
      },

      /**
       * Move handler for the splitter which takes care of the external
       * triggered resize of children.
       *
       * @param e {qx.event.type.Data} The data even of move.
       */
      __P_397_9: function __P_397_9(e) {
        this.__P_397_10(e.getData());
      },

      /**
       * Creates a blocker for the splitter which takes all bouse events and
       * also handles the offset and cursor.
       *
       * @param orientation {String} The orientation of the pane.
       */
      __P_397_11: function __P_397_11(orientation) {
        this.__P_397_1 = new qx.ui.splitpane.Blocker(orientation);
        this.getContentElement().add(this.__P_397_1);
        var splitter = this.getChildControl("splitter");
        var splitterWidth = splitter.getWidth();

        if (!splitterWidth) {
          splitter.addListenerOnce("appear", function () {
            this.__P_397_10();
          }, this);
        } // resize listener to remove the blocker in case the splitter
        // is removed.


        splitter.addListener("resize", function (e) {
          var bounds = e.getData();

          if (this.getChildControl("splitter").isKnobVisible() && (bounds.height == 0 || bounds.width == 0)) {
            this.__P_397_1.hide();
          } else {
            this.__P_397_1.show();
          }
        }, this);
      },

      /**
       * Returns the blocker used over the splitter. this could be used for
       * adding event listeners like tap or dbltap.
       *
       * @return {qx.ui.splitpane.Blocker} The used blocker element.
       *
       * @internal
       */
      getBlocker: function getBlocker() {
        return this.__P_397_1;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Apply routine for the orientation property.
       *
       * Sets the pane's layout to vertical or horizontal split layout.
       *
       * @param value {String} The new value of the orientation property
       * @param old {String} The old value of the orientation property
       */
      _applyOrientation: function _applyOrientation(value, old) {
        var slider = this.getChildControl("slider");
        var splitter = this.getChildControl("splitter"); // Store boolean flag for faster access

        this.__P_397_6 = value === "horizontal";

        if (!this.__P_397_1) {
          this.__P_397_11(value);
        } // update the blocker


        this.__P_397_1.setOrientation(value); // Dispose old layout


        var oldLayout = this._getLayout();

        if (oldLayout) {
          oldLayout.dispose();
        } // Create new layout


        var newLayout = value === "vertical" ? new qx.ui.splitpane.VLayout() : new qx.ui.splitpane.HLayout();

        this._setLayout(newLayout); // Update states for splitter and slider


        splitter.removeState(old);
        splitter.addState(value);
        splitter.getChildControl("knob").removeState(old);
        splitter.getChildControl("knob").addState(value);
        slider.removeState(old);
        slider.addState(value); // flush (needs to be done for the blocker update) and update the blocker

        qx.ui.core.queue.Manager.flush();

        this.__P_397_10();
      },
      // property apply
      _applyOffset: function _applyOffset(value, old) {
        this.__P_397_10();
      },

      /**
       * Helper for setting the blocker to the right position, which depends on
       * the offset, orientation and the current position of the splitter.
       *
       * @param bounds {Map?null} If the bounds of the splitter are known,
       *   they can be added.
       */
      __P_397_10: function __P_397_10(bounds) {
        var splitter = this.getChildControl("splitter");
        var offset = this.getOffset();
        var splitterBounds = splitter.getBounds();
        var splitterElem = splitter.getContentElement().getDomElement(); // do nothing if the splitter is not ready

        if (!splitterElem) {
          return;
        } // recalculate the dimensions of the blocker


        if (this.__P_397_6) {
          // get the width either of the given bounds or of the read bounds
          var width = null;

          if (bounds) {
            width = bounds.width;
          } else if (splitterBounds) {
            width = splitterBounds.width;
          }

          var left = bounds && bounds.left;

          if (width || !this.getChildControl("splitter").isKnobVisible()) {
            if (isNaN(left)) {
              left = qx.bom.element.Location.getPosition(splitterElem).left;
            }

            this.__P_397_1.setWidth(offset, width || 6);

            this.__P_397_1.setLeft(offset, left);
          } // vertical case

        } else {
          // get the height either of the given bounds or of the read bounds
          var height = null;

          if (bounds) {
            height = bounds.height;
          } else if (splitterBounds) {
            height = splitterBounds.height;
          }

          var top = bounds && bounds.top;

          if (height || !this.getChildControl("splitter").isKnobVisible()) {
            if (isNaN(top)) {
              top = qx.bom.element.Location.getPosition(splitterElem).top;
            }

            this.__P_397_1.setHeight(offset, height || 6);

            this.__P_397_1.setTop(offset, top);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a widget to the pane.
       *
       * Sets the pane's layout to vertical or horizontal split layout. Depending on the
       * pane's layout the first widget will be the left or top widget, the second one
       * the bottom or right widget. Adding more than two widgets will overwrite the
       * existing ones.
       *
       * @param widget {qx.ui.core.Widget} The widget to be inserted into pane.
       * @param flex {Number} The (optional) layout property for the widget's flex value.
       */
      add: function add(widget, flex) {
        if (flex == null) {
          this._add(widget);
        } else {
          this._add(widget, {
            flex: flex
          });
        }

        this.__P_397_0.push(widget);
      },

      /**
       * Removes the given widget from the pane.
       *
       * @param widget {qx.ui.core.Widget} The widget to be removed.
       */
      remove: function remove(widget) {
        this._remove(widget);

        qx.lang.Array.remove(this.__P_397_0, widget);
      },

      /**
       * Returns an array containing the pane's content.
       *
       * @return {qx.ui.core.Widget[]} The pane's child widgets
       */
      getChildren: function getChildren() {
        return this.__P_397_0;
      },

      /*
      ---------------------------------------------------------------------------
        POINTER LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Handler for pointerdown event.
       *
       * Shows slider widget and starts drag session if pointer is near/on splitter widget.
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDown: function _onPointerDown(e) {
        // Only proceed if left pointer button is pressed and the splitter is active
        if (!e.isLeftPressed()) {
          return;
        }

        var splitter = this.getChildControl("splitter"); // Store offset between pointer event coordinates and splitter

        var splitterLocation = splitter.getContentLocation();
        var paneLocation = this.getContentLocation();
        this.__P_397_2 = this.__P_397_6 ? e.getDocumentLeft() - splitterLocation.left + paneLocation.left : e.getDocumentTop() - splitterLocation.top + paneLocation.top; // Synchronize slider to splitter size and show it

        var slider = this.getChildControl("slider");
        var splitterBounds = splitter.getBounds();
        slider.setUserBounds(splitterBounds.left, splitterBounds.top, splitterBounds.width || 6, splitterBounds.height || 6);
        slider.setZIndex(splitter.getZIndex() + 1);
        slider.show(); // Enable session

        this.__P_397_3 = true;

        this.__P_397_1.capture();

        e.stop();
      },

      /**
       * Handler for pointermove event.
       *
       * @param e {qx.event.type.Pointer} pointermove event
       */
      _onPointerMove: function _onPointerMove(e) {
        this._setLastPointerPosition(e.getDocumentLeft(), e.getDocumentTop()); // Check if slider is already being dragged


        if (this.__P_397_3) {
          // Compute new children sizes
          this.__P_397_12(); // Update slider position


          var slider = this.getChildControl("slider");
          var pos = this.__P_397_7;

          if (this.__P_397_6) {
            slider.setDomLeft(pos);

            this.__P_397_1.setStyle("left", pos - this.getOffset() + "px");
          } else {
            slider.setDomTop(pos);

            this.__P_397_1.setStyle("top", pos - this.getOffset() + "px");
          }

          e.stop();
        }
      },

      /**
       * Handler for pointerout event
       *
       * @param e {qx.event.type.Pointer} pointerout event
       */
      _onPointerOut: function _onPointerOut(e) {
        this._setLastPointerPosition(e.getDocumentLeft(), e.getDocumentTop());
      },

      /**
       * Handler for pointerup event
       *
       * Sets widget sizes if dragging session has been active.
       *
       * @param e {qx.event.type.Pointer} pointerup event
       */
      _onPointerUp: function _onPointerUp(e) {
        if (!this.__P_397_3) {
          return;
        } // Set sizes to both widgets


        this._finalizeSizes(); // Hide the slider


        var slider = this.getChildControl("slider");
        slider.exclude(); // Cleanup

        this.__P_397_3 = false;
        this.releaseCapture();
        e.stop();
      },

      /*
      ---------------------------------------------------------------------------
        INTERVAL HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Updates widgets' sizes based on the slider position.
       */
      _finalizeSizes: function _finalizeSizes() {
        var beginSize = this.__P_397_7;
        var endSize = this.__P_397_8;

        if (beginSize == null) {
          return;
        }

        var children = this._getChildren();

        var firstWidget = children[2];
        var secondWidget = children[3]; // Read widgets' flex values

        var firstFlexValue = firstWidget.getLayoutProperties().flex;
        var secondFlexValue = secondWidget.getLayoutProperties().flex; // Both widgets have flex values

        if (firstFlexValue != 0 && secondFlexValue != 0) {
          firstWidget.setLayoutProperties({
            flex: beginSize
          });
          secondWidget.setLayoutProperties({
            flex: endSize
          });
        } // Update both sizes
        else {
            // Set widths to static widgets
            if (this.__P_397_6) {
              firstWidget.setWidth(beginSize);
              secondWidget.setWidth(endSize);
            } else {
              firstWidget.setHeight(beginSize);
              secondWidget.setHeight(endSize);
            }
          }
      },

      /**
       * Computes widgets' sizes based on the pointer coordinate.
       */
      __P_397_12: function __P_397_12() {
        if (this.__P_397_6) {
          var min = "minWidth",
              size = "width",
              max = "maxWidth",
              pointer = this.__P_397_4;
        } else {
          var min = "minHeight",
              size = "height",
              max = "maxHeight",
              pointer = this.__P_397_5;
        }

        var children = this._getChildren();

        var beginHint = children[2].getSizeHint();
        var endHint = children[3].getSizeHint(); // Area given to both widgets

        var allocatedSize = children[2].getBounds()[size] + children[3].getBounds()[size]; // Calculate widget sizes

        var beginSize = pointer - this.__P_397_2;
        var endSize = allocatedSize - beginSize; // Respect minimum limits

        if (beginSize < beginHint[min]) {
          endSize -= beginHint[min] - beginSize;
          beginSize = beginHint[min];
        } else if (endSize < endHint[min]) {
          beginSize -= endHint[min] - endSize;
          endSize = endHint[min];
        } // Respect maximum limits


        if (beginSize > beginHint[max]) {
          endSize += beginSize - beginHint[max];
          beginSize = beginHint[max];
        } else if (endSize > endHint[max]) {
          beginSize += endSize - endHint[max];
          endSize = endHint[max];
        } // Store sizes


        this.__P_397_7 = beginSize;
        this.__P_397_8 = endSize;
      },

      /**
       * Determines whether this is an active drag session
       *
       * @return {Boolean} True if active drag session, otherwise false.
       */
      _isActiveDragSession: function _isActiveDragSession() {
        return this.__P_397_3;
      },

      /**
       * Sets the last pointer position.
       *
       * @param x {Integer} the x position of the pointer.
       * @param y {Integer} the y position of the pointer.
       */
      _setLastPointerPosition: function _setLastPointerPosition(x, y) {
        this.__P_397_4 = x;
        this.__P_397_5 = y;
      }
    },
    destruct: function destruct() {
      this.__P_397_0 = null;
    }
  });
  qx.ui.splitpane.Pane.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pane.js.map?dt=1661116933747