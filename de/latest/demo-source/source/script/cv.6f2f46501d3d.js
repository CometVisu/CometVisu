/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This mixin implements the key methods of the {@link qx.ui.window.IDesktop}.
 *
 * @ignore(qx.ui.window.Window)
 * @ignore(qx.ui.window.Window.*)
 */
qx.Mixin.define("qx.ui.window.MDesktop",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * The currently active window
     */
    activeWindow :
    {
      check : "qx.ui.window.Window",
      apply : "_applyActiveWindow",
      event : "changeActiveWindow",
      init  : null,
      nullable : true
    }
  },


  events:
  {
    /**
     * Fired when a window was added.
     */
    windowAdded: "qx.event.type.Data",

    /**
     * Fired when a window was removed.
     */
    windowRemoved: "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __windows : null,
    __manager: null,


    /**
     * Get the desktop's window manager. Each desktop must have a window manager.
     * If none is configured the default window manager {@link qx.ui.window.Window#DEFAULT_MANAGER_CLASS}
     * is used.
     *
     * @return {qx.ui.window.IWindowManager} The desktop's window manager
     */
    getWindowManager : function()
    {
      if (!this.__manager) {
        this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
      }
      return this.__manager;
    },


    /**
     * Whether the configured layout supports a maximized window
     * e.g. is a Canvas.
     *
     * @return {Boolean} Whether the layout supports maximized windows
     */
    supportsMaximize : function() {
      return true;
    },

    /**
     * Sets the desktop's window manager
     *
     * @param manager {qx.ui.window.IWindowManager} The window manager
     */
    setWindowManager : function(manager)
    {
      if (this.__manager) {
        this.__manager.setDesktop(null);
      }

      manager.setDesktop(this);
      this.__manager = manager;
    },


    /**
     * Event handler. Called if one of the managed windows changes its active
     * state.
     *
     * @param e {qx.event.type.Event} the event object.
     */
    _onChangeActive : function(e)
    {
      if (e.getData()) {
        this.setActiveWindow(e.getTarget());
      } else if (this.getActiveWindow() == e.getTarget()) {
        this.setActiveWindow(null);
      }
    },


    // property apply
    _applyActiveWindow : function(value, old) {
      this.getWindowManager().changeActiveWindow(value, old);
      this.getWindowManager().updateStack();
    },


    /**
     * Event handler. Called if one of the managed windows changes its modality
     *
     * @param e {qx.event.type.Event} the event object.
     */
    _onChangeModal : function(e) {
      this.getWindowManager().updateStack();
    },


    /**
     * Event handler. Called if one of the managed windows changes its visibility
     * state.
     */
    _onChangeVisibility : function() {
      this.getWindowManager().updateStack();
    },


    /**
     * Overrides the method {@link qx.ui.core.Widget#_afterAddChild}
     *
     * @param win {qx.ui.core.Widget} added widget
     */
    _afterAddChild : function(win)
    {
      if (qx.Class.isDefined("qx.ui.window.Window") && win instanceof qx.ui.window.Window) {
        this._addWindow(win);
      }
    },


    /**
     * Handles the case, when a window is added to the desktop.
     *
     * @param win {qx.ui.window.Window} Window, which has been added
     */
    _addWindow : function(win)
    {
      if (!this.getWindows().includes(win))
      {
        this.getWindows().push(win);

        this.fireDataEvent("windowAdded", win);

        win.addListener("changeActive", this._onChangeActive, this);
        win.addListener("changeModal", this._onChangeModal, this);
        win.addListener("changeVisibility", this._onChangeVisibility, this);
      }

      if (win.getActive()) {
        this.setActiveWindow(win);
      }

      this.getWindowManager().updateStack();
    },


    /**
     * Overrides the method {@link qx.ui.core.Widget#_afterRemoveChild}
     *
     * @param win {qx.ui.core.Widget} removed widget
     */
    _afterRemoveChild : function(win)
    {
      if (qx.Class.isDefined("qx.ui.window.Window") && win instanceof qx.ui.window.Window) {
        this._removeWindow(win);
      }
    },


    /**
     * Handles the case, when a window is removed from the desktop.
     *
     * @param win {qx.ui.window.Window} Window, which has been removed
     */
    _removeWindow : function(win)
    {
      if (this.getWindows().includes(win))
      {
        qx.lang.Array.remove(this.getWindows(), win);

        this.fireDataEvent("windowRemoved", win);

        win.removeListener("changeActive", this._onChangeActive, this);
        win.removeListener("changeModal", this._onChangeModal, this);
        win.removeListener("changeVisibility", this._onChangeVisibility, this);

        this.getWindowManager().updateStack();
      }
    },


    /**
     * Get a list of all windows added to the desktop (including hidden windows)
     *
     * @return {qx.ui.window.Window[]} Array of managed windows
     */
    getWindows : function()
    {
      if (!this.__windows) {
        this.__windows = [];
      }
      return this.__windows;
    }
  },





  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeArray("__windows");
    this._disposeObjects("__manager");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This mixin blocks events and can be included into all widgets.
 *
 * The {@link #block} and {@link #unblock} methods provided by this mixin can be used
 * to block any event from the widget. When blocked,
 * the blocker widget overlays the widget to block, including the padding area.
 *
 * The ({@link #blockContent} method can be used to block child widgets with a
 * zIndex below a certain value.
 */
qx.Mixin.define("qx.ui.core.MBlocker",
{
  properties :
  {
    /**
     * Color of the blocker
     */
    blockerColor  :
    {
      check : "Color",
      init : null,
      nullable: true,
      apply : "_applyBlockerColor",
      themeable: true
    },


    /**
     * Opacity of the blocker
     */
    blockerOpacity :
    {
      check : "Number",
      init : 1,
      apply : "_applyBlockerOpacity",
      themeable: true
    }
  },


  members :
  {
    __blocker : null,


    /**
     * Template method for creating the blocker item.
     * @return {qx.ui.core.Blocker} The blocker to use.
     */
    _createBlocker : function() {
      return new qx.ui.core.Blocker(this);
    },


    // property apply
    _applyBlockerColor : function(value, old) {
      this.getBlocker().setColor(value);
    },


    // property apply
    _applyBlockerOpacity : function(value, old) {
      this.getBlocker().setOpacity(value);
    },

    /**
     * Block all events from this widget by placing a transparent overlay widget,
     * which receives all events, exactly over the widget.
     */
    block : function() {
      this.getBlocker().block();
    },


    /**
     * Returns whether the widget is blocked.
     *
     * @return {Boolean} Whether the widget is blocked.
     */
    isBlocked : function() {
      return this.__blocker && this.__blocker.isBlocked();
    },


    /**
     * Unblock the widget blocked by {@link #block}, but it takes care of
     * the amount of {@link #block} calls. The blocker is only removed if
     * the number of {@link #unblock} calls is identical to {@link #block} calls.
     */
    unblock : function() {
      if (this.__blocker) {
        this.__blocker.unblock();
      }
    },


    /**
     * Unblock the widget blocked by {@link #block}, but it doesn't take care of
     * the amount of {@link #block} calls. The blocker is directly removed.
     */
    forceUnblock : function() {
      if (this.__blocker) {
        this.__blocker.forceUnblock();
      }
    },


    /**
     * Block direct child widgets with a zIndex below <code>zIndex</code>
     *
     * @param zIndex {Integer} All child widgets with a zIndex below this value
     *     will be blocked
     */
    blockContent : function(zIndex) {
      this.getBlocker().blockContent(zIndex);
    },


    /**
     * Get the blocker
     *
     * @return {qx.ui.core.Blocker} The blocker
     */
    getBlocker : function() {
      if (!this.__blocker) {
        this.__blocker = this._createBlocker();
      }
      return this.__blocker;
    }
  },


  destruct : function() {
    this._disposeObjects("__blocker");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This class blocks events and can be included into all widgets.
 *
 * The {@link #block} and {@link #unblock} methods provided by this class can be used
 * to block any event from the widget. When blocked,
 * the blocker widget overlays the widget to block, including the padding area.
 *
 * @ignore(qx.ui.root.Abstract)
 */
qx.Class.define("qx.ui.core.Blocker",
{
  extend : qx.core.Object,


  events :
  {
    /**
     * Fires after {@link #block} executed.
     */
    blocked : "qx.event.type.Event",


    /**
     * Fires after {@link #unblock} executed.
     */
    unblocked : "qx.event.type.Event"
  },


  /**
   * Creates a blocker for the passed widget.
   *
   * @param widget {qx.ui.core.Widget} Widget which should be added the blocker
   */
  construct: function(widget)
  {
    this.base(arguments);
    this._widget = widget;

    widget.addListener("resize", this.__onBoundsChange, this);
    widget.addListener("move", this.__onBoundsChange, this);
    widget.addListener("disappear", this.__onWidgetDisappear, this);

    if (qx.Class.isDefined("qx.ui.root.Abstract") &&
        widget instanceof qx.ui.root.Abstract) {
      this._isRoot = true;
      this.setKeepBlockerActive(true);
    }

    // dynamic theme switch
    if (qx.core.Environment.get("qx.dyntheme")) {
      qx.theme.manager.Meta.getInstance().addListener(
        "changeTheme", this._onChangeTheme, this
      );
    }

    this.__activeElements = [];
    this.__focusElements = [];
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Color of the blocker
     */
    color  :
    {
      check : "Color",
      init : null,
      nullable: true,
      apply : "_applyColor",
      themeable: true
    },


    /**
     * Opacity of the blocker
     */
    opacity :
    {
      check : "Number",
      init : 1,
      apply : "_applyOpacity",
      themeable: true
    },


    /**
     * If this property is enabled, the blocker created with {@link #block}
     * will always stay activated. This means that the blocker then gets all keyboard
     * events, this is useful to block keyboard input on other widgets.
     * Take care that only one blocker instance will be kept active, otherwise your
     * browser will freeze.
     *
     * Setting this property to true is ignored, if the blocker is attached to a
     * widget with a focus handler, as this would mean that the focus handler
     * tries to activate the widget behind the blocker.
     *
     * fixes:
     *     https://github.com/qooxdoo/qooxdoo/issues/9449
     *     https://github.com/qooxdoo/qooxdoo/issues/8104
     */
    keepBlockerActive :
    {
      check : "Boolean",
      init : false
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __blocker : null,
    __blockerCount : 0,

    __activeElements  : null,
    __focusElements   : null,

    __timer : null,

    _widget : null,
    _isRoot : false,

    __appearListener : null,


    /**
     * Adjust html element size on layout resizes.
     *
     * @param e {qx.event.type.Data} event object
     */
    __onBoundsChange : function(e)
    {
      var data = e.getData();

      if (this.isBlocked()) {
        this._updateBlockerBounds(data);
      }
    },


    /**
     * Widget re-appears: Update blocker size/position and attach to (new) parent
     */
    __onWidgetAppear : function()
    {
      this._updateBlockerBounds(this._widget.getBounds());
      if (this._widget.isRootWidget()) {
        this._widget.getContentElement().add(this.getBlockerElement());
      } else {
        this._widget.getLayoutParent().getContentElement().add(this.getBlockerElement());
      }
    },


    /**
     * Remove the blocker if the widget disappears
     */
    __onWidgetDisappear : function()
    {
      if (this.isBlocked()) {
        this.getBlockerElement().getParent().remove(this.getBlockerElement());
        this._widget.addListenerOnce("appear", this.__onWidgetAppear, this);
      }
    },


    /**
     * set the blocker's size and position
     * @param bounds {Map} Map with the new width, height, left and top values
     */
    _updateBlockerBounds : function(bounds)
    {
      this.getBlockerElement().setStyles({
        width: bounds.width + "px",
        height: bounds.height + "px",
        left: bounds.left + "px",
        top: bounds.top + "px"
      });
    },


    // property apply
    _applyColor : function(value, old)
    {
      var color = qx.theme.manager.Color.getInstance().resolve(value);
      this.__setBlockersStyle("backgroundColor", color);
    },


    // property apply
    _applyOpacity : function(value, old)
    {
      this.__setBlockersStyle("opacity", value);
    },


    /**
     * Handler for the theme change.
     * @signature function()
     */
    _onChangeTheme : qx.core.Environment.select("qx.dyntheme",
    {
      "true" : function() {
        this._applyColor(this.getColor());
      },
      "false" : null
    }),


    /**
     * Set the style to all blockers (blocker and content blocker).
     *
     * @param key {String} The name of the style attribute.
     * @param value {String} The value.
     */
    __setBlockersStyle : function(key, value)
    {
      var blockers = [];
      this.__blocker && blockers.push(this.__blocker);

      for (var i = 0; i < blockers.length; i++) {
        blockers[i].setStyle(key, value);
      }
    },


    /**
     * Backup the current active and focused widget.
     */
    _backupActiveWidget : function()
    {
      var focusHandler = qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
      var activeWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getActive());
      var focusedWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getFocus());

      this.__activeElements.push(activeWidget);
      this.__focusElements.push(focusedWidget);

      if (activeWidget) {
        activeWidget.deactivate();
      }

      if (focusedWidget) {
        focusedWidget.blur();
      }
    },


    /**
     * Restore the current active and focused widget.
     */
    _restoreActiveWidget : function()
    {
      var widget;

      var focusElementsLength = this.__focusElements.length;
      if (focusElementsLength > 0)       {
        widget = this.__focusElements.pop();

        if (widget && !widget.isDisposed() && widget.isFocusable()) {
          widget.focus();
        }
      }

      var activeElementsLength = this.__activeElements.length;
      if (activeElementsLength > 0) {
        widget = this.__activeElements.pop();

        if (widget && !widget.isDisposed()) {
          widget.activate();
        }
      }
    },


    /**
     * Creates the blocker element.
     *
     * @return {qx.html.Element} The blocker element
     */
    __createBlockerElement : function() {
      return new qx.html.Blocker(this.getColor(), this.getOpacity());
    },


    /**
     * Get/create the blocker element
     *
     * @param widget {qx.ui.core.Widget} The blocker will be added to this
     * widget's content element
     * @return {qx.html.Element} The blocker element
     */
    getBlockerElement : function(widget)
    {
      if (!this.__blocker)
      {
        this.__blocker = this.__createBlockerElement();
        this.__blocker.setStyle("zIndex", 15);

        if (!widget) {
          if (this._isRoot) {
            widget = this._widget;
          } else {
            widget = this._widget.getLayoutParent();
          }
        }

        widget.getContentElement().add(this.__blocker);
        this.__blocker.exclude();
      }
      return this.__blocker;
    },


    /**
     * Block all events from this widget by placing a transparent overlay widget,
     * which receives all events, exactly over the widget.
     */
    block : function()
    {
      this._block();
    },


    /**
     * Adds the blocker to the appropriate element and includes it.
     *
     * @param zIndex {Number} All child widgets with a zIndex below this value will be blocked
     * @param blockContent {Boolean} append the blocker to the widget's content if true
     */
    _block : function(zIndex, blockContent) {
      if (!this._isRoot && !this._widget.getLayoutParent()) {
        this.__appearListener = this._widget.addListenerOnce("appear", this._block.bind(this, zIndex));
        return;
      }

      var parent;
      if (this._isRoot || blockContent) {
        parent = this._widget;
      } else {
        parent = this._widget.getLayoutParent();
      }

      var blocker = this.getBlockerElement(parent);
      if (zIndex != null) {
        blocker.setStyle("zIndex", zIndex);
      }

      this.__blockerCount++;
      if (this.__blockerCount < 2)
      {
        this._backupActiveWidget();

        var bounds = this._widget.getBounds();
        // no bounds -> widget not yet rendered -> bounds will be set on resize
        if (bounds) {
          this._updateBlockerBounds(bounds);
        }

        blocker.include();
        if (!blockContent) {
          blocker.activate();
        }

        blocker.addListener("deactivate", this.__activateBlockerElement, this);
        blocker.addListener("keypress", this.__stopTabEvent, this);
        blocker.addListener("keydown", this.__stopTabEvent, this);
        blocker.addListener("keyup", this.__stopTabEvent, this);

        this.fireEvent("blocked", qx.event.type.Event);
      }
    },


    /**
     * Returns whether the widget is blocked.
     *
     * @return {Boolean} Whether the widget is blocked.
     */
    isBlocked : function() {
      return this.__blockerCount > 0;
    },


    /**
     * Unblock the widget blocked by {@link #block}, but it takes care of
     * the amount of {@link #block} calls. The blocker is only removed if
     * the number of {@link #unblock} calls is identical to {@link #block} calls.
     */
    unblock : function()
    {
      if (this.__appearListener) {
        this._widget.removeListenerById(this.__appearListener);
      }

      if (!this.isBlocked()){
        return;
      }

      this.__blockerCount--;
      if (this.__blockerCount < 1) {
        this.__unblock();
        this.__blockerCount = 0;
      }
    },


    /**
     * Unblock the widget blocked by {@link #block}, but it doesn't take care of
     * the amount of {@link #block} calls. The blocker is directly removed.
     */
    forceUnblock : function()
    {
      if (!this.isBlocked()){
        return;
      }

      this.__blockerCount = 0;
      this.__unblock();
    },


    /**
     * Unblock the widget blocked by {@link #block}.
     */
    __unblock : function()
    {
      this._restoreActiveWidget();

      var blocker = this.getBlockerElement();
      blocker.removeListener("deactivate", this.__activateBlockerElement, this);
      blocker.removeListener("keypress", this.__stopTabEvent, this);
      blocker.removeListener("keydown", this.__stopTabEvent, this);
      blocker.removeListener("keyup", this.__stopTabEvent, this);
      blocker.exclude();

      this.fireEvent("unblocked", qx.event.type.Event);
    },


    /**
     * Block direct child widgets with a zIndex below <code>zIndex</code>
     *
     * @param zIndex {Integer} All child widgets with a zIndex below this value
     *     will be blocked
     */
    blockContent : function(zIndex) {
      this._block(zIndex, true);
    },


    /**
     * Stops the passed "Tab" event.
     *
     * @param e {qx.event.type.KeySequence} event to stop.
     */
    __stopTabEvent : function(e) {
      if (e.getKeyIdentifier() == "Tab") {
        e.stop();
      }
    },


    /**
     * Sets the blocker element to active.
     */
    __activateBlockerElement : function() {
      //
      // If this._widget is attached to the focus handler as a focus root,
      // activating the blocker after this widget was deactivated,
      // leads to the focus handler re-activate the widget behind
      // the blocker, loosing tab handling for this._widget which is
      // visually in front. Hence we prevent activating the
      // blocker in this situation.
      //
      // fixes:
      //  https://github.com/qooxdoo/qooxdoo/issues/9449
      //  https://github.com/qooxdoo/qooxdoo/issues/8104
      //
      if (this.getKeepBlockerActive() &&
          !qx.ui.core.FocusHandler.getInstance().isFocusRoot(this._widget)) {
        this.getBlockerElement().activate();
      }
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    // remove dynamic theme listener
    if (qx.core.Environment.get("qx.dyntheme")) {
      qx.theme.manager.Meta.getInstance().removeListener(
        "changeTheme", this._onChangeTheme, this
      );
    }

    this._widget.removeListener("resize", this.__onBoundsChange, this);
    this._widget.removeListener("move", this.__onBoundsChange, this);
    this._widget.removeListener("appear", this.__onWidgetAppear, this);
    this._widget.removeListener("disappear", this.__onWidgetDisappear, this);

    if (this.__appearListener) {
      this._widget.removeListenerById(this.__appearListener);
    }

    this._disposeObjects("__blocker", "__timer");
    this.__activeElements = this.__focusElements =
      this._widget = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The blocker element is used to block interaction with the application.
 *
 * It is usually transparent or semi-transparent and blocks all events from
 * the underlying elements.
 */
qx.Class.define("qx.html.Blocker",
{
  extend : qx.html.Element,

  /**
   * @param backgroundColor {Color?null} the blocker's background color. This
   *    color can be themed and will be resolved by the blocker.
   * @param opacity {Number?0} The blocker's opacity
   */
  construct : function(backgroundColor, opacity)
  {
    var backgroundColor = backgroundColor ?
        qx.theme.manager.Color.getInstance().resolve(backgroundColor) : null;

    var styles = {
      position: "absolute",
      opacity : opacity || 0,
      backgroundColor : backgroundColor
    };

    // IE needs some extra love here to convince it to block events.
    if ((qx.core.Environment.get("engine.name") == "mshtml"))
    {
      styles.backgroundImage = "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")";
      styles.backgroundRepeat = "repeat";
    }

    this.base(arguments, "div", styles);

    this.addListener("mousedown", this._stopPropagation, this);
    this.addListener("mouseup", this._stopPropagation, this);
    this.addListener("click", this._stopPropagation, this);
    this.addListener("dblclick", this._stopPropagation, this);
    this.addListener("mousemove", this._stopPropagation, this);
    this.addListener("mouseover", this._stopPropagation, this);
    this.addListener("mouseout", this._stopPropagation, this);
    this.addListener("mousewheel", this._stopPropagation, this);
    this.addListener("roll", this._stopPropagation, this);
    this.addListener("contextmenu", this._stopPropagation, this);
    this.addListener("pointerdown", this._stopPropagation, this);
    this.addListener("pointerup", this._stopPropagation, this);
    this.addListener("pointermove", this._stopPropagation, this);
    this.addListener("pointerover", this._stopPropagation, this);
    this.addListener("pointerout", this._stopPropagation, this);
    this.addListener("tap", this._stopPropagation, this);
    this.addListener("dbltap", this._stopPropagation, this);
    this.addListener("swipe", this._stopPropagation, this);
    this.addListener("longtap", this._stopPropagation, this);
    this.addListener("appear", this.__refreshCursor, this);
    this.addListener("disappear", this.__refreshCursor, this);
  },

  members :
  {
    /**
     * Stop the event propagation from the passed event.
     *
     * @param e {qx.event.type.Mouse} mouse event to stop propagation.
     */
    _stopPropagation : function(e) {
      e.stopPropagation();
    },


    /**
     * Refreshes the cursor by setting it to <code>null</code> and then to the
     * old value.
     */
    __refreshCursor : function() {
      var currentCursor = this.getStyle("cursor");
      this.setStyle("cursor", null, true);
      this.setStyle("cursor", currentCursor, true);
    }
  }
});
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
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Each focus root delegates the focus handling to instances of the FocusHandler.
 */
qx.Class.define("qx.ui.core.FocusHandler",
{
  extend : qx.core.Object,
  type : "singleton",




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Create data structure
    this.__roots = {};
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __roots : null,
    __activeChild : null,
    __focusedChild : null,
    __currentRoot : null,


    /**
     * Connects to a top-level root element (which initially receives
     * all events of the root). This are normally all page and application
     * roots, but no inline roots (they are typically sitting inside
     * another root).
     *
     * @param root {qx.ui.root.Abstract} Any root
     */
    connectTo : function(root)
    {
      // this.debug("Connect to: " + root);
      root.addListener("keypress", this.__onKeyPress, this);
      root.addListener("focusin", this._onFocusIn, this, true);
      root.addListener("focusout", this._onFocusOut, this, true);
      root.addListener("activate", this._onActivate, this, true);
      root.addListener("deactivate", this._onDeactivate, this, true);
    },

    /**
     * Registers a widget as a focus root. A focus root comes
     * with an separate tab sequence handling.
     *
     * @param widget {qx.ui.core.Widget} The widget to register
     */
    addRoot : function(widget)
    {
      // this.debug("Add focusRoot: " + widget);
      this.__roots[widget.$$hash] = widget;
    },


    /**
     * Deregisters a previous added widget.
     *
     * @param widget {qx.ui.core.Widget} The widget to deregister
     */
    removeRoot : function(widget)
    {
      // this.debug("Remove focusRoot: " + widget);
      delete this.__roots[widget.$$hash];
    },


    /**
     * Get the active widget
     *
     * @return {qx.ui.core.Widget|null} The active widget or <code>null</code>
     *    if no widget is active
     */
    getActiveWidget : function() {
      return this.__activeChild;
    },


    /**
     * Whether the given widget is the active one
     *
     * @param widget {qx.ui.core.Widget} The widget to check
     * @return {Boolean} <code>true</code> if the given widget is active
     */
    isActive : function(widget) {
      return this.__activeChild == widget;
    },


    /**
     * Get the focused widget
     *
     * @return {qx.ui.core.Widget|null} The focused widget or <code>null</code>
     *    if no widget has the focus
     */
    getFocusedWidget : function() {
      return this.__focusedChild;
    },


    /**
     * Whether the given widget is the focused one.
     *
     * @param widget {qx.ui.core.Widget} The widget to check
     * @return {Boolean} <code>true</code> if the given widget is focused
     */
    isFocused : function(widget) {
      return this.__focusedChild == widget;
    },


    /**
     * Whether the given widgets acts as a focus root.
     *
     * @param widget {qx.ui.core.Widget} The widget to check
     * @return {Boolean} <code>true</code> if the given widget is a focus root
     */
    isFocusRoot : function(widget) {
      return !!this.__roots[widget.$$hash];
    },





    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Internal event handler for activate event.
     *
     * @param e {qx.event.type.Focus} Focus event
     */
    _onActivate : function(e)
    {
      var target = e.getTarget();
      this.__activeChild = target;
      //this.debug("active: " + target);

      var root = this.__findFocusRoot(target);
      if (root != this.__currentRoot) {
        this.__currentRoot = root;
      }
    },


    /**
     * Internal event handler for deactivate event.
     *
     * @param e {qx.event.type.Focus} Focus event
     */
    _onDeactivate : function(e)
    {
      var target = e.getTarget();
      if (this.__activeChild == target) {
        this.__activeChild = null;
      }
    },


    /**
     * Internal event handler for focusin event.
     *
     * @param e {qx.event.type.Focus} Focus event
     */
    _onFocusIn : function(e)
    {
      var target = e.getTarget();
      if (target != this.__focusedChild)
      {
        this.__focusedChild = target;
        target.visualizeFocus();
      }
    },


    /**
     * Internal event handler for focusout event.
     *
     * @param e {qx.event.type.Focus} Focus event
     */
    _onFocusOut : function(e)
    {
      var target = e.getTarget();
      if (target == this.__focusedChild)
      {
        this.__focusedChild = null;
        target.visualizeBlur();
      }
    },


    /**
     * Internal event handler for TAB key.
     *
     * @param e {qx.event.type.KeySequence} Key event
     */
    __onKeyPress : function(e)
    {
      if (e.getKeyIdentifier() != "Tab") {
        return;
      }

      if (!this.__currentRoot) {
        return;
      }

      // Stop all key-events with a TAB keycode
      e.stopPropagation();
      e.preventDefault();

      // Support shift key to reverse widget detection order
      var current = this.__focusedChild;
      if (!e.isShiftPressed()) {
        var next = current ? this.__getWidgetAfter(current) : this.__getFirstWidget();
      } else {
        var next = current ? this.__getWidgetBefore(current) : this.__getLastWidget();
      }

      // If there was a widget found, focus it
      if (next) {
        next.tabFocus();
      }
    },




    /*
    ---------------------------------------------------------------------------
      UTILS
    ---------------------------------------------------------------------------
    */

    /**
     * Finds the next focus root, starting with the given widget.
     *
     * @param widget {qx.ui.core.Widget} The widget to find a focus root for.
     * @return {qx.ui.core.Widget|null} The focus root for the given widget or
     * <code>true</code> if no focus root could be found
     */
    __findFocusRoot : function(widget)
    {
      var roots = this.__roots;
      while (widget)
      {
        if (roots[widget.$$hash]) {
          return widget;
        }

        widget = widget.getLayoutParent();
      }

      return null;
    },





    /*
    ---------------------------------------------------------------------------
      TAB SUPPORT IMPLEMENTATION
    ---------------------------------------------------------------------------
    */

    /**
     * Compares the order of two widgets
     *
     * @param widget1 {qx.ui.core.Widget} Widget A
     * @param widget2 {qx.ui.core.Widget} Widget B
     * @return {Integer} A sort() compatible integer with values
     *   small than 0, exactly 0 or bigger than 0.
     */
    __compareTabOrder : function(widget1, widget2)
    {
      if (widget1 === widget2) {
        return 0;
      }

      // Sort-Check #1: Tab-Index
      var tab1 = widget1.getTabIndex() || 0;
      var tab2 = widget2.getTabIndex() || 0;

      if (tab1 != tab2) {
        return tab1 - tab2;
      }

      // Computing location
      var el1 = widget1.getContentElement().getDomElement();
      var el2 = widget2.getContentElement().getDomElement();

      var Location = qx.bom.element.Location;

      var loc1 = Location.get(el1);
      var loc2 = Location.get(el2);

      // Sort-Check #2: Top-Position
      if (loc1.top != loc2.top) {
        return loc1.top - loc2.top;
      }

      // Sort-Check #3: Left-Position
      if (loc1.left != loc2.left) {
        return loc1.left - loc2.left;
      }

      // Sort-Check #4: zIndex
      var z1 = widget1.getZIndex();
      var z2 = widget2.getZIndex();

      if (z1 != z2) {
        return z1 - z2;
      }

      return 0;
    },


    /**
     * Returns the first widget.
     *
     * @return {qx.ui.core.Widget} Returns the first (positioned) widget from
     *    the current root.
     */
    __getFirstWidget : function() {
      return this.__getFirst(this.__currentRoot, null);
    },


    /**
     * Returns the last widget.
     *
     * @return {qx.ui.core.Widget} Returns the last (positioned) widget from
     *    the current root.
     */
    __getLastWidget : function() {
      return this.__getLast(this.__currentRoot, null);
    },


    /**
     * Returns the widget after the given one.
     *
     * @param widget {qx.ui.core.Widget} Widget to start with
     * @return {qx.ui.core.Widget} The found widget.
     */
    __getWidgetAfter : function(widget)
    {
      var root = this.__currentRoot;
      if (root == widget) {
        return this.__getFirstWidget();
      }

      while (widget && widget.getAnonymous()) {
        widget = widget.getLayoutParent();
      }

      if (widget == null) {
        return [];
      }

      var result = [];
      this.__collectAllAfter(root, widget, result);
      result.sort(this.__compareTabOrder);

      var len = result.length;
      return len > 0 ? result[0] : this.__getFirstWidget();
    },


    /**
     * Returns the widget before the given one.
     *
     * @param widget {qx.ui.core.Widget} Widget to start with
     * @return {qx.ui.core.Widget} The found widget.
     */
    __getWidgetBefore : function(widget)
    {
      var root = this.__currentRoot;
      if (root == widget) {
        return this.__getLastWidget();
      }

      while (widget && widget.getAnonymous()) {
        widget = widget.getLayoutParent();
      }

      if (widget == null) {
        return [];
      }

      var result = [];
      this.__collectAllBefore(root, widget, result);
      result.sort(this.__compareTabOrder);

      var len = result.length;
      return len > 0 ? result[len - 1] : this.__getLastWidget();
    },






    /*
    ---------------------------------------------------------------------------
      INTERNAL API USED BY METHODS ABOVE
    ---------------------------------------------------------------------------
    */

    /**
     * Collects all widgets which are after the given widget in
     * the given parent widget. Append all found children to the
     * <code>list</code>.
     *
     * @param parent {qx.ui.core.Widget} Parent widget
     * @param widget {qx.ui.core.Widget} Child widget to start with
     * @param result {Array} Result list
     */
    __collectAllAfter : function(parent, widget, result)
    {
      var children = parent.getLayoutChildren();
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        // Filter spacers etc.
        if (!(child instanceof qx.ui.core.Widget)) {
          continue;
        }

        if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible())
        {
          if (child.isTabable() && this.__compareTabOrder(widget, child) < 0) {
            result.push(child);
          }

          this.__collectAllAfter(child, widget, result);
        }
      }
    },


    /**
     * Collects all widgets which are before the given widget in
     * the given parent widget. Append all found children to the
     * <code>list</code>.
     *
     * @param parent {qx.ui.core.Widget} Parent widget
     * @param widget {qx.ui.core.Widget} Child widget to start with
     * @param result {Array} Result list
     */
    __collectAllBefore : function(parent, widget, result)
    {
      var children = parent.getLayoutChildren();
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        // Filter spacers etc.
        if (!(child instanceof qx.ui.core.Widget)) {
          continue;
        }

        if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible())
        {
          if (child.isTabable() && this.__compareTabOrder(widget, child) > 0) {
            result.push(child);
          }

          this.__collectAllBefore(child, widget, result);
        }
      }
    },


    /**
     * Find first (positioned) widget. (Sorted by coordinates, zIndex, etc.)
     *
     * @param parent {qx.ui.core.Widget} Parent widget
     * @param firstWidget {qx.ui.core.Widget?null} Current first widget
     * @return {qx.ui.core.Widget} The first (positioned) widget
     */
    __getFirst : function(parent, firstWidget)
    {
      var children = parent.getLayoutChildren();
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        // Filter spacers etc.
        if (!(child instanceof qx.ui.core.Widget)) {
          continue;
        }

        // Ignore focus roots completely
        if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible())
        {
          if (child.isTabable())
          {
            if (firstWidget == null || this.__compareTabOrder(child, firstWidget) < 0) {
              firstWidget = child;
            }
          }

          // Deep iteration into children hierarchy
          firstWidget = this.__getFirst(child, firstWidget);
        }
      }

      return firstWidget;
    },


    /**
     * Find last (positioned) widget. (Sorted by coordinates, zIndex, etc.)
     *
     * @param parent {qx.ui.core.Widget} Parent widget
     * @param lastWidget {qx.ui.core.Widget?null} Current last widget
     * @return {qx.ui.core.Widget} The last (positioned) widget
     */
    __getLast : function(parent, lastWidget)
    {
      var children = parent.getLayoutChildren();
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        // Filter spacers etc.
        if (!(child instanceof qx.ui.core.Widget)) {
          continue;
        }

        // Ignore focus roots completely
        if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible())
        {
          if (child.isTabable())
          {
            if (lastWidget == null || this.__compareTabOrder(child, lastWidget) > 0) {
              lastWidget = child;
            }
          }

          // Deep iteration into children hierarchy
          lastWidget = this.__getLast(child, lastWidget);
        }
      }

      return lastWidget;
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeMap("__roots");
    this.__focusedChild = this.__activeChild = this.__currentRoot = null;
  }
});
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Shared implementation for all root widgets.
 */
qx.Class.define("qx.ui.root.Abstract",
{
  type : "abstract",
  extend : qx.ui.core.Widget,

  include :
  [
    qx.ui.core.MChildrenHandling,
    qx.ui.core.MBlocker,
    qx.ui.window.MDesktop
  ],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Register as root for the focus handler
    qx.ui.core.FocusHandler.getInstance().addRoot(this);

    // Directly add to visibility queue
    qx.ui.core.queue.Visibility.add(this);

    this.initNativeHelp();

    this.addListener("keypress", this.__preventScrollWhenFocused, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "root"
    },

    // overridden
    enabled :
    {
      refine : true,
      init : true
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },

    /**
     *  Sets the global cursor style
     *
     *  The name of the cursor to show when the mouse pointer is over the widget.
     *  This is any valid CSS2 cursor name defined by W3C.
     *
     *  The following values are possible:
     *  <ul><li>default</li>
     *  <li>crosshair</li>
     *  <li>pointer (hand is the ie name and will mapped to pointer in non-ie).</li>
     *  <li>move</li>
     *  <li>n-resize</li>
     *  <li>ne-resize</li>
     *  <li>e-resize</li>
     *  <li>se-resize</li>
     *  <li>s-resize</li>
     *  <li>sw-resize</li>
     *  <li>w-resize</li>
     *  <li>nw-resize</li>
     *  <li>text</li>
     *  <li>wait</li>
     *  <li>help </li>
     *  <li>url([file]) = self defined cursor, file should be an ANI- or CUR-type</li>
     *  </ul>
     *
     * Please note that in the current implementation this has no effect in IE.
     */
    globalCursor :
    {
      check : "String",
      nullable : true,
      themeable : true,
      apply : "_applyGlobalCursor",
      event : "changeGlobalCursor"
    },


    /**
     * Whether the native context menu should be globally enabled. Setting this
     * property to <code>true</code> will allow native context menus in all
     * child widgets of this root.
     */
    nativeContextMenu :
    {
      refine : true,
      init : false
    },


    /**
     * If the user presses F1 in IE by default the onhelp event is fired and
     * IE’s help window is opened. Setting this property to <code>false</code>
     * prevents this behavior.
     */
    nativeHelp :
    {
      check : "Boolean",
      init : false,
      apply : "_applyNativeHelp"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __globalCursorStyleSheet : null,

    // overridden
    isRootWidget : function() {
      return true;
    },


    /**
     * Get the widget's layout manager.
     *
     * @return {qx.ui.layout.Abstract} The widget's layout manager
     */
    getLayout : function() {
      return this._getLayout();
    },


    // property apply
    _applyGlobalCursor : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(value, old) {
        // empty implementation
      },

      // This would be the optimal solution.
      // For performance reasons this is impractical in IE
      "default" : function(value, old)
      {
        var Stylesheet = qx.bom.Stylesheet;

        var sheet = this.__globalCursorStyleSheet;
        if (!sheet) {
          this.__globalCursorStyleSheet = sheet = Stylesheet.createElement();
        }

        Stylesheet.removeAllRules(sheet);

        if (value) {
          Stylesheet.addRule(sheet, "*", qx.bom.element.Cursor.compile(value).replace(";", "") + " !important");
        }
      }
    }),


    // property apply
    _applyNativeContextMenu : function(value, old)
    {
      if (value) {
        this.removeListener("contextmenu", this._onNativeContextMenu, this, true);
      } else {
        this.addListener("contextmenu", this._onNativeContextMenu, this, true);
      }
    },


    /**
     * Stops the <code>contextmenu</code> event from showing the native context menu
     *
     * @param e {qx.event.type.Mouse} The event object
     */
    _onNativeContextMenu : function(e)
    {
      if (e.getTarget().getNativeContextMenu()) {
        return;
      }
      e.preventDefault();
    },


    /**
    * Fix unexpected scrolling when pressing "Space" while a widget is focused.
    *
    * @param e {qx.event.type.KeySequence} The KeySequence event
    */
    __preventScrollWhenFocused: function(e) {
      // Require space pressed
      if (e.getKeyIdentifier() !== "Space") {
        return;
      }

      var target = e.getTarget();

      // Require focused. Allow scroll when container or root widget.
      var focusHandler = qx.ui.core.FocusHandler.getInstance();
      if (!focusHandler.isFocused(target)) {
        return;
      }

      // Require that widget does not accept text input
      var el = target.getContentElement();
      var nodeName = el.getNodeName();
      var domEl = el.getDomElement();
      if (nodeName === "input" || nodeName === "textarea" || (domEl && domEl.contentEditable === "true")) {
        return;
      }

      // do not prevent "space" key for natively focusable elements
      nodeName = qx.dom.Node.getName(e.getOriginalTarget());
      if (nodeName && ["input", "textarea", "select", "a"].indexOf(nodeName) > -1) {
        return;
      }

      // Ultimately, prevent default
      e.preventDefault();
    },


    // property apply
    _applyNativeHelp : function(value, old)
    {
      if (qx.core.Environment.get("event.help")) {
        if (old === false) {
          qx.bom.Event.removeNativeListener(document, "help", (function() {return false;}));
        }

        if (value === false) {
          qx.bom.Event.addNativeListener(document, "help", (function() {return false;}));
        }
      }
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__globalCursorStyleSheet = null;
  },




  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics, members) {
    qx.ui.core.MChildrenHandling.remap(members);
  }
});
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
     * Fabian Jakobs (fjakobs)
     * Alexander Steitz (aback)

************************************************************************ */

/**
 * This classes could be used to insert qooxdoo islands into existing
 * web pages. You can use the isles to place any qooxdoo powered widgets
 * inside a layout made using traditional HTML markup and CSS.
 *
 * The size of the widget in each dimension can either be determined by the
 * size hint of the inline's children or by the size of the root DOM element. If
 * <code>dynamicX</code>/<code>dynamicY</code> is true the width/height of the DOM
 * element is used.
 *
 * This class uses {@link qx.ui.layout.Basic} as default layout. The layout
 * can be changed using the {@link #setLayout} method.
 *
 * To position popups and tooltips please have a look at {@link qx.ui.root.Page}.
 *
 * @use(qx.event.handler.ElementResize)
 * @ignore(qx.ui.popup, qx.ui.popup.Manager.*)
 * @ignore(qx.ui.menu, qx.ui.menu.Manager.*)
 */
qx.Class.define("qx.ui.root.Inline",
{
  extend : qx.ui.root.Abstract,
  include : [qx.ui.core.MLayoutHandling],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param el {Element} DOM element to use as isle for qooxdoo content. Please
   *    note that existing content gets removed on the first layout flush.
   * @param dynamicX {Boolean} If <code>true</code> the widget's width is
   *    determined by the DOM element's width. Otherwise the children's size hint
   *    is used.
   * @param dynamicY {Boolean} If <code>true</code> the widget's height is
   *    determined by the DOM element's height. Otherwise the children's size hint
   *    is used.
   */
  construct : function(el, dynamicX, dynamicY)
  {
    // check the parameter
    if (qx.core.Environment.get("qx.debug")) {
      this.assertElement(el, "Please use a DOM element to create an inline root.");
    }

    // Temporary storage of element to use
    this.__elem = el;

    // Avoid any problems with dynamic resizing
    el.style.overflow = "hidden";

    // Avoid any problems with broken layout
    el.style.textAlign = "left";

    this.__dynX = dynamicX || false;
    this.__dynY = dynamicY || false;
    this.__initDynamicMode();

    this.base(arguments);

    // Use static layout
    this._setLayout(new qx.ui.layout.Basic());

    // Directly schedule layout for root element
    qx.ui.core.queue.Layout.add(this);

    // Register as root
    qx.ui.core.FocusHandler.getInstance().connectTo(this);

    // Avoid the automatically scroll in to view.
    // See http://bugzilla.qooxdoo.org/show_bug.cgi?id=3236 for details.
    if ((qx.core.Environment.get("engine.name") == "mshtml")) {
      this.setKeepFocus(true);
    }

    // Resize handling for the window
    var window = qx.dom.Node.getWindow(el);
    qx.event.Registration.addListener(window, "resize", this._onWindowResize, this);

    // quick fix for [BUG #7680]
    this.getContentElement().setStyle("-webkit-backface-visibility", "hidden");
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __dynX : false,
    __dynY : false,
    __elem : null,


    /**
     * Performs several checks for dynamic mode and adds the "resize" listener
     */
    __initDynamicMode : function()
    {
      if (this.__dynX || this.__dynY)
      {
        // Check the DOM element for an usable width and height
        var elementDimensions = qx.bom.element.Dimension.getSize(this.__elem);

        if (this.__dynX && elementDimensions.width < 1) {
          throw new Error("The root element " + this.__elem + " of " + this +
            " needs a width when its width size should be used!");
        }

        if (this.__dynY)
        {
          if (elementDimensions.height < 1) {
            throw new Error("The root element " + this.__elem + " of " + this +
            " needs a height when its height size should be used!");
          }

          // check for implicit height. Set the height explicit to prevent that
          // the element grows indefinitely
          if (elementDimensions.height >= 1 &&
              qx.bom.element.Style.get(this.__elem, "height", 3) == "") {
            qx.bom.element.Style.set(this.__elem, "height", elementDimensions.height + "px");
          }
        }

        qx.event.Registration.addListener(this.__elem, "resize", this._onResize, this);
      }
    },


    // overridden
    _createContentElement : function()
    {
      var el = this.__elem;

      if (this.__dynX || this.__dynY)
      {
        var rootEl = document.createElement("div");
        el.appendChild(rootEl);
      } else {
        rootEl = el;
      }

      var root = new qx.html.Root(rootEl);

      // Make relative
      rootEl.style.position = "relative";

      // Store reference to the widget in the DOM element.
      root.connectWidget(this);

      // fire event asynchronously, otherwise the browser will fire the event
      // too early and no listener will be informed since they're not added
      // at this time
      qx.event.Timer.once(function(e) {
        this.fireEvent("appear");
      }, this, 0);

      return root;
    },


    /**
     * Listener for the element's resize event
     *
     * @param e {qx.event.type.Event} Event object
     */
    _onResize : function(e)
    {
      var data = e.getData();
      if (
        (data.oldWidth !== data.width) && this.__dynX ||
        (data.oldHeight !== data.height) && this.__dynY
      ) {
        qx.ui.core.queue.Layout.add(this);
      }
    },


    /**
     * Listener for the window's resize event.
     */
    _onWindowResize : function() {
      // close all popups
      if (qx.ui.popup && qx.ui.popup.Manager) {
        qx.ui.popup.Manager.getInstance().hideAll();
      }

      // close all menus
      if (qx.ui.menu && qx.ui.menu.Manager) {
        qx.ui.menu.Manager.getInstance().hideAll();
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      var dynX = this.__dynX;
      var dynY = this.__dynY;

      if (!dynX || !dynY) {
        var hint = this.base(arguments);
      } else {
        hint = {};
      }

      var Dimension = qx.bom.element.Dimension;

      if (dynX)
      {
        var width = Dimension.getContentWidth(this.__elem);
        hint.width = width;
        hint.minWidth = width;
        hint.maxWidth = width;
      }

      if (dynY)
      {
        var height = Dimension.getContentHeight(this.__elem);
        hint.height = height;
        hint.minHeight = height;
        hint.maxHeight = height;
      }

      return hint;
    }
  },





  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics, members) {
    qx.ui.core.MLayoutHandling.remap(members);
  },


  /*
  *****************************************************************************
     DESTRUCT
  *****************************************************************************
  */

  destruct : function()
  {
    qx.event.Registration.removeListener(this.__elem, "resize", this._onResize, this);
    this.__elem = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This handler fires a <code>resize</code> event if the size of a DOM element
 * changes.
 * 
 * NOTE: Instances of this class must be disposed of after use
 *
 */
qx.Class.define("qx.event.handler.ElementResize",
{
  extend : qx.core.Object,
  implement : [ qx.event.IEventHandler, qx.core.IDisposable ],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param manager {qx.event.Manager} Event manager for the window to use
   */
  construct : function(manager)
  {
    this.base(arguments);

    this.__manager = manager;
    this.__elements = {};

    this.__timer = new qx.event.Timer(200);
    this.__timer.addListener("interval", this._onInterval, this);
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** @type {Integer} Priority of this handler */
    PRIORITY : qx.event.Registration.PRIORITY_NORMAL,


    /** @type {Map} Supported event types */
    SUPPORTED_TYPES :
    {
      resize : true
    },


    /** @type {Integer} Which target check to use */
    TARGET_CHECK : qx.event.IEventHandler.TARGET_DOMNODE,


    /** @type {Integer} Whether the method "canHandleEvent" must be called */
    IGNORE_CAN_HANDLE : false
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __elements : null,
    __manager : null,
    __timer : null,


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER INTERFACE
    ---------------------------------------------------------------------------
    */

    // interface implementation
    canHandleEvent : function(target, type) {
      return target.tagName.toLowerCase() !== "body";
    },


    // interface implementation
    registerEvent : function(target, type, capture)
    {
      var hash = qx.core.ObjectRegistry.toHashCode(target);

      var elements = this.__elements;
      if (!elements[hash])
      {
        elements[hash] = {
          element: target,
          width: qx.bom.element.Dimension.getWidth(target),
          height: qx.bom.element.Dimension.getHeight(target)
        };
        this.__timer.start();
      }
    },


    // interface implementation
    unregisterEvent : function(target, type, capture)
    {
      var hash = qx.core.ObjectRegistry.toHashCode(target);

      var elements = this.__elements;
      if (elements[hash])
      {
        delete elements[hash];

        if (qx.lang.Object.isEmpty(elements)) {
          this.__timer.stop();
        }
      }
    },


    /**
     * Checks elements for width and height changes and fires resize event
     * if needed.
     *
     * @param e {qx.event.type.Data} The incoming data event
     */
    _onInterval : function(e)
    {
      var elements = this.__elements;
      for (var key in elements)
      {
        var data = elements[key];

        var el = data.element;
        var width = qx.bom.element.Dimension.getWidth(el);
        var height = qx.bom.element.Dimension.getHeight(el);

        if (data.height !== height || data.width !== width)
        {
          qx.event.Registration.fireNonBubblingEvent(
            el,
            "resize",
            qx.event.type.Data,
            [{
              width: width,
              oldWidth: data.width,
              height: height,
              oldHeight: data.height
            }]
          );

          data.width = width;
          data.height = height;
        }
      }
    }
  },





  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this.__manager = this.__elements = null;
    this._disposeObjects("__timer");
  },






  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics) {
    qx.event.Registration.addHandler(statics);
  }
});
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A basic layout, which supports positioning of child widgets by absolute
 * left/top coordinates. This layout is very simple but should also
 * perform best.
 *
 * *Features*
 *
 * * Basic positioning using <code>left</code> and <code>top</code> properties
 * * Respects minimum and maximum dimensions without shrinking/growing
 * * Margins for top and left side (including negative ones)
 * * Respects right and bottom margins in the size hint
 * * Auto-sizing
 *
 * *Item Properties*
 *
 * <ul>
 * <li><strong>left</strong> <em>(Integer)</em>: The left coordinate in pixel</li>
 * <li><strong>top</strong> <em>(Integer)</em>: The top coordinate in pixel</li>
 * </ul>
 *
 * *Details*
 *
 * The default location of any widget is zero for both
 * <code>left</code> and <code>top</code>.
 *
 * *Example*
 *
 * Here is a little example of how to use the basic layout.
 *
 * <pre class="javascript">
 * var container = new qx.ui.container.Composite(new qx.ui.layout.Basic());
 *
 * // simple positioning
 * container.add(new qx.ui.core.Widget(), {left: 10, top: 10});
 * container.add(new qx.ui.core.Widget(), {left: 100, top: 50});
 * </pre>
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/layout/basic.html'>
 * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
 */
qx.Class.define("qx.ui.layout.Basic",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    verifyLayoutProperty : qx.core.Environment.select("qx.debug",
    {
      "true" : function(item, name, value)
      {
        this.assert(name == "left" || name == "top", "The property '"+name+"' is not supported by the Basic layout!");
        this.assertInteger(value);
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight, padding)
    {
      var children = this._getLayoutChildren();
      var child, size, props, left, top;

      // Render children
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];
        size = child.getSizeHint();
        props = child.getLayoutProperties();

        left = padding.left + (props.left || 0) + child.getMarginLeft();
        top = padding.top + (props.top || 0) + child.getMarginTop();

        child.renderLayout(left, top, size.width, size.height);
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var child, size, props;
      var neededWidth=0, neededHeight=0;
      var localWidth, localHeight;


      // Iterate over children
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];
        size = child.getSizeHint();
        props = child.getLayoutProperties();

        localWidth = size.width + (props.left || 0) + child.getMarginLeft() + child.getMarginRight();
        localHeight = size.height + (props.top || 0) + child.getMarginTop() + child.getMarginBottom();

        if (localWidth > neededWidth) {
          neededWidth = localWidth;
        }

        if (localHeight > neededHeight) {
          neededHeight = localHeight;
        }
      }


      // Return hint
      return {
        width : neededWidth,
        height : neededHeight
      };
    }
  }
});
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

************************************************************************ */

/**
 * This is the root element for a set of {@link qx.html.Element}s.
 *
 * To make other elements visible these elements must be inserted
 * into an root element at any level.
 *
 * A root element uses an existing DOM element where is assumed that
 * this element is always visible. In the easiest case, the root element
 * is identical to the document's body.
 */
qx.Class.define("qx.html.Root",
{
  extend : qx.html.Element,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a root element
   *
   * @param elem {Element?null} DOM element to use
   */
  construct : function(elem)
  {
    this.base(arguments);

    if (elem != null) {
      this.useElement(elem);
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Sets the element to an already existing node. It will be
     * assumed that this DOM element is already visible e.g.
     * like a normal displayed element in the document's body.
     *
     * @param elem {Element} the dom element to set
     * @throws {Error} if the element is assigned again
     */
    useElement : function(elem)
    {
      // Base call
      this.base(arguments, elem);

      // Mark as root
      this.setRoot(true);

      // Register for synchronization
      qx.html.Element._modified[this.$$hash] = this;
    }
  }
});
