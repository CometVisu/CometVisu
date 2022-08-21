(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.bom.element.Location": {},
      "qx.bom.element.Dimension": {},
      "qx.util.placement.Placement": {},
      "qx.ui.mobile.core.Blocker": {},
      "qx.lang.Function": {},
      "qx.event.Registration": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.basic.Atom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Gabriel Munteanu (gabios)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The popup represents a widget that gets shown above other widgets,
   * usually to present more info/details regarding an item in the application.
   *
   * There are 3 usages for now:
   *
   * <pre class='javascript'>
   * var widget = new qx.ui.mobile.form.Button("Error!");
   * var popup = new qx.ui.mobile.dialog.Popup(widget);
   * popup.show();
   * </pre>
   * Here we show a popup consisting of a single buttons alerting the user
   * that an error has occurred.
   * It will be centered to the screen.
   * <pre class='javascript'>
   * var label = new qx.ui.mobile.basic.Label("Item1");
   * var widget = new qx.ui.mobile.form.Button("Error!");
   * var popup = new qx.ui.mobile.dialog.Popup(widget, label);
   * popup.show();
   * widget.addListener("tap", function(){
   *   popup.hide();
   * });
   *
   * </pre>
   *
   * In this case everything is as above, except that the popup will get shown next to "label"
   * so that the user can understand that the info presented is about the "Item1"
   * we also add a tap listener to the button that will hide out popup.
   *
   * Once created, the instance is reused between show/hide calls.
   *
   * <pre class='javascript'>
   * var widget = new qx.ui.mobile.form.Button("Error!");
   * var popup = new qx.ui.mobile.dialog.Popup(widget);
   * popup.placeTo(25,100);
   * popup.show();
   * </pre>
   *
   * Same as the first example, but this time the popup will be shown at the 25,100 coordinates.
   *
   *
   */
  qx.Class.define("qx.ui.mobile.dialog.Popup", {
    extend: qx.ui.mobile.core.Widget,
    statics: {
      ROOT: null
    },

    /**
     * @param widget {qx.ui.mobile.core.Widget} the widget that will be shown in the popup
     * @param anchor {qx.ui.mobile.core.Widget?} optional parameter, a widget to attach this popup to
     */
    construct: function construct(widget, anchor) {
      qx.ui.mobile.core.Widget.constructor.call(this);
      this.exclude();

      if (qx.ui.mobile.dialog.Popup.ROOT == null) {
        qx.ui.mobile.dialog.Popup.ROOT = qx.core.Init.getApplication().getRoot();
      }

      qx.ui.mobile.dialog.Popup.ROOT.add(this);
      this.__P_359_0 = anchor;

      if (widget) {
        this._initializeChild(widget);
      }
    },
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "popup"
      },

      /**
       * The label/caption/text of the qx.ui.mobile.basic.Atom instance
       */
      title: {
        apply: "_applyTitle",
        nullable: true,
        check: "String",
        event: "changeTitle"
      },

      /**
       * Any URI String supported by qx.ui.mobile.basic.Image to display an icon
       */
      icon: {
        check: "String",
        apply: "_applyIcon",
        nullable: true,
        event: "changeIcon"
      },

      /**
       * Whether the popup should be displayed modal.
       */
      modal: {
        init: false,
        check: "Boolean",
        nullable: false
      },

      /**
       * Indicates whether the a modal popup should disappear when user taps/clicks on Blocker.
       */
      hideOnBlockerTap: {
        check: "Boolean",
        init: false
      }
    },
    members: {
      __P_359_1: false,
      __P_359_2: null,
      __P_359_3: null,
      __P_359_0: null,
      __P_359_4: null,
      __P_359_5: null,
      __P_359_6: null,

      /**
       * Event handler. Called whenever the position of the popup should be updated.
       */
      _updatePosition: function _updatePosition() {
        // Traverse single anchor classes for removal, for preventing 'domupdated' event if no CSS classes changed.
        var anchorClasses = ['top', 'bottom', 'left', 'right', 'anchor'];

        for (var i = 0; i < anchorClasses.length; i++) {
          this.removeCssClass(anchorClasses[i]);
        }

        if (this.__P_359_0) {
          this.addCssClass('anchor');
          var rootHeight = qx.ui.mobile.dialog.Popup.ROOT.getHeight();
          var rootWidth = qx.ui.mobile.dialog.Popup.ROOT.getWidth();
          var rootPosition = qx.bom.element.Location.get(qx.ui.mobile.dialog.Popup.ROOT.getContainerElement());
          var anchorPosition = qx.bom.element.Location.get(this.__P_359_0.getContainerElement());
          var popupDimension = qx.bom.element.Dimension.getSize(this.getContainerElement());
          this.__P_359_6 = popupDimension;
          var computedPopupPosition = qx.util.placement.Placement.compute(popupDimension, {
            width: rootPosition.left + rootWidth,
            height: rootPosition.top + rootHeight
          }, anchorPosition, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, "bottom-left", "keep-align", "keep-align"); // Reset Anchor.

          this._resetPosition();

          var isTop = anchorPosition.top > computedPopupPosition.top;
          var isLeft = anchorPosition.left > computedPopupPosition.left;
          computedPopupPosition.top = computedPopupPosition.top - rootPosition.top;
          computedPopupPosition.left = computedPopupPosition.left - rootPosition.left;
          var isOutsideViewPort = computedPopupPosition.top < 0 || computedPopupPosition.left < 0 || computedPopupPosition.left + popupDimension.width > rootWidth || computedPopupPosition.top + popupDimension.height > rootHeight;

          if (isOutsideViewPort) {
            this._positionToCenter();
          } else {
            if (isTop) {
              this.addCssClass('bottom');
            } else {
              this.addCssClass('top');
            }

            if (isLeft) {
              this.addCssClass('right');
            } else {
              this.addCssClass('left');
            }

            this.placeTo(computedPopupPosition.left, computedPopupPosition.top);
          }
        } else if (this.__P_359_2) {
          // No Anchor
          this._positionToCenter();
        }
      },

      /**
       * This method shows the popup.
       * First it updates the position, then registers the event handlers, and shows it.
       */
      show: function show() {
        if (!this.__P_359_1) {
          qx.core.Init.getApplication().fireEvent("popup");

          this.__P_359_7(); // Move outside of viewport


          this.placeTo(-1000, -1000); // Needs to be added to screen, before rendering position, for calculating
          // objects height.

          qx.ui.mobile.dialog.Popup.prototype.show.base.call(this); // Now render position.

          this._updatePosition();
        }

        this.__P_359_1 = true;

        if (this.getModal() === true) {
          qx.ui.mobile.core.Blocker.getInstance().show();

          if (this.getHideOnBlockerTap()) {
            qx.ui.mobile.core.Blocker.getInstance().addListener("tap", this.hide, this);
          }
        }
      },

      /**
       * Hides the popup.
       */
      hide: function hide() {
        if (this.__P_359_1) {
          this.__P_359_8();

          this.exclude();
        }

        this.__P_359_1 = false;

        if (this.getModal()) {
          qx.ui.mobile.core.Blocker.getInstance().hide();
        }

        qx.ui.mobile.core.Blocker.getInstance().removeListener("tap", this.hide, this);
      },

      /**
       * Hides the popup after a given time delay.
       * @param delay {Integer} time delay in ms.
       */
      hideWithDelay: function hideWithDelay(delay) {
        if (delay) {
          qx.lang.Function.delay(this.hide, delay, this);
        } else {
          this.hide();
        }
      },

      /**
       * Returns the shown state of this popup.
       * @return {Boolean} whether the popup is shown or not.
       */
      isShown: function isShown() {
        return this.__P_359_1;
      },

      /**
       * Toggles the visibility of this popup.
       */
      toggleVisibility: function toggleVisibility() {
        if (this.__P_359_1 == true) {
          this.hide();
        } else {
          this.show();
        }
      },

      /**
       * This method positions the popup widget at the coordinates specified.
       * @param left {Integer} - the value the will be set to container's left style property
       * @param top {Integer} - the value the will be set to container's top style property
       */
      placeTo: function placeTo(left, top) {
        this._setStyle("left", left + "px");

        this._setStyle("top", top + "px");
      },

      /**
       * Tracks the user tap on root and hides the widget if <code>pointerdown</code> event
       * occurs outside of the widgets bounds.
       * @param evt {qx.event.type.Pointer} the pointer event.
       */
      _trackUserTap: function _trackUserTap(evt) {
        var clientX = evt.getViewportLeft();
        var clientY = evt.getViewportTop();
        var popupLocation = qx.bom.element.Location.get(this.getContainerElement());
        var isOutsideWidget = clientX < popupLocation.left || clientX > popupLocation.left + this.__P_359_6.width || clientY > popupLocation.top + this.__P_359_6.height || clientY < popupLocation.top;

        if (isOutsideWidget) {
          this.hide();
        }
      },

      /**
       * Centers this widget to window's center position.
       */
      _positionToCenter: function _positionToCenter() {
        var container = this.getContainerElement();
        container.style.position = "absolute";
        container.style.marginLeft = -parseInt(container.offsetWidth / 2) + "px";
        container.style.marginTop = -parseInt(container.offsetHeight / 2) + "px";
        container.style.left = "50%";
        container.style.top = "50%";
      },

      /**
       * Resets the position of this element (left, top, margins...)
       */
      _resetPosition: function _resetPosition() {
        var container = this.getContainerElement();
        container.style.left = "0px";
        container.style.top = "0px";
        container.style.marginLeft = null;
        container.style.marginTop = null;
      },

      /**
       * Registers all needed event listeners
       */
      __P_359_7: function __P_359_7() {
        qx.core.Init.getApplication().addListener("stop", this.hide, this);
        qx.core.Init.getApplication().addListener("popup", this.hide, this);
        qx.event.Registration.addListener(window, "resize", this._updatePosition, this);

        if (this.__P_359_0) {
          this.__P_359_0.addCssClass("anchor-target");

          qx.ui.mobile.dialog.Popup.ROOT.addListener("pointerdown", this._trackUserTap, this);
        }
      },

      /**
       * Unregisters all needed event listeners
       */
      __P_359_8: function __P_359_8() {
        qx.core.Init.getApplication().removeListener("stop", this.hide, this);
        qx.core.Init.getApplication().removeListener("popup", this.hide, this);
        qx.event.Registration.removeListener(window, "resize", this._updatePosition, this);

        if (this.__P_359_0) {
          this.__P_359_0.removeCssClass("anchor-target");

          qx.ui.mobile.dialog.Popup.ROOT.removeListener("pointerdown", this._trackUserTap, this);
        }
      },

      /**
       * This method creates the container where the popup's widget will be placed
       * and adds it to the popup.
       * @param widget {qx.ui.mobile.core.Widget} - what to show in the popup
       *
       */
      _initializeChild: function _initializeChild(widget) {
        if (this.__P_359_2 == null) {
          this.__P_359_2 = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());

          this.__P_359_2.setDefaultCssClass("popup-content");

          this._add(this.__P_359_2);
        }

        if (this._createTitleWidget()) {
          this.__P_359_2.remove(this._createTitleWidget());

          this.__P_359_2.add(this._createTitleWidget());
        }

        this.__P_359_2.add(widget, {
          flex: 1
        });

        widget.addListener("domupdated", this._updatePosition, this);
        this.__P_359_4 = widget;
      },

      /**
       * Creates the title atom widget.
       *
       * @return {qx.ui.mobile.basic.Atom} The title atom widget.
       */
      _createTitleWidget: function _createTitleWidget() {
        if (this.__P_359_5) {
          return this.__P_359_5;
        }

        if (this.getTitle() || this.getIcon()) {
          this.__P_359_5 = new qx.ui.mobile.basic.Atom(this.getTitle(), this.getIcon());

          this.__P_359_5.addCssClass('popup-title');

          return this.__P_359_5;
        } else {
          return null;
        }
      },
      // property apply
      _applyTitle: function _applyTitle(value, old) {
        if (value) {
          if (this.__P_359_5) {
            this.__P_359_5.setLabel(value);
          } else {
            this.__P_359_5 = new qx.ui.mobile.basic.Atom(value, this.getIcon());

            this.__P_359_5.addCssClass('popup-title');

            if (this.__P_359_4) {
              this.__P_359_2.addBefore(this._createTitleWidget(), this.__P_359_4);
            } else {
              if (this.__P_359_2) {
                this.__P_359_2.add(this._createTitleWidget());
              }
            }
          }
        }
      },
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        if (value) {
          if (this.__P_359_5) {
            this.__P_359_5.setIcon(value);
          } else {
            this.__P_359_5 = new qx.ui.mobile.basic.Atom(this.getTitle(), value);

            this.__P_359_5.addCssClass('popup-title');

            if (this.__P_359_4) {
              this.__P_359_2.addBefore(this._createTitleWidget(), this.__P_359_4);
            } else {
              if (this.__P_359_2) {
                this.__P_359_2.add(this._createTitleWidget());
              }
            }
          }
        }
      },

      /**
       * Adds the widget that will be shown in this popup. This method can be used in the case when you have removed the widget from the popup
       * or you haven't passed it in the constructor.
       * @param widget {qx.ui.mobile.core.Widget} - what to show in the popup
       */
      add: function add(widget) {
        this.removeWidget();

        this._initializeChild(widget);
      },

      /**
       * A widget to attach this popup to.
       *
       * @param widget {qx.ui.mobile.core.Widget} The anchor widget.
       */
      setAnchor: function setAnchor(widget) {
        this.__P_359_0 = widget;

        this._updatePosition();
      },

      /**
       * Returns the title widget.
       *
       * @return {qx.ui.mobile.basic.Atom} The title widget.
       */
      getTitleWidget: function getTitleWidget() {
        return this.__P_359_5;
      },

      /**
       * This method removes the widget shown in the popup.
       * @return {qx.ui.mobile.core.Widget|null} The removed widget or <code>null</code>
       * if the popup doesn't have an attached widget
       */
      removeWidget: function removeWidget() {
        if (this.__P_359_4) {
          this.__P_359_4.removeListener("domupdated", this._updatePosition, this);

          this.__P_359_2.remove(this.__P_359_4);

          return this.__P_359_4;
        } else {
          return null;
        }
      }
    },
    destruct: function destruct() {
      this.__P_359_8();

      this._disposeObjects("__P_359_2");

      this.__P_359_1 = this.__P_359_3 = this._anchor = this.__P_359_4 = this.__P_359_6 = null;
    }
  });
  qx.ui.mobile.dialog.Popup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Popup.js.map?dt=1661116931962