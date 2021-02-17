(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.root.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Basic": {
        "construct": true
      },
      "qx.ui.core.queue.Layout": {
        "construct": true
      },
      "qx.ui.core.FocusHandler": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "require": true
      },
      "qx.html.Root": {},
      "qx.bom.Document": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This widget provides a root widget for popups and tooltips if qooxdoo is used
   * inside a traditional HTML page. Widgets placed into a page will overlay the
   * HTML content.
   *
   * For this reason the widget's layout is initialized with an instance of
   * {@link qx.ui.layout.Basic}. The widget's layout cannot be changed.
   *
   * The page widget does not support paddings and decorators with insets.
   *
   * Note: This widget does not support decorations!
   *
   * If you want to place widgets inside existing DOM elements
   * use {@link qx.ui.root.Inline}.
   */
  qx.Class.define("qx.ui.root.Page", {
    extend: qx.ui.root.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param doc {Document} Document to use
     */
    construct: function construct(doc) {
      // Temporary storage of element to use
      this.__P_385_0 = doc;
      qx.ui.root.Abstract.constructor.call(this); // Use a hard-coded basic layout

      this._setLayout(new qx.ui.layout.Basic()); // Set a high zIndex to make sure the widgets really overlay the HTML page.


      this.setZIndex(10000); // Directly add to layout queue

      qx.ui.core.queue.Layout.add(this); // Register resize listener

      this.addListener("resize", this.__P_385_1, this); // Register as root

      qx.ui.core.FocusHandler.getInstance().connectTo(this); // Avoid the automatically scroll in to view.
      // See http://bugzilla.qooxdoo.org/show_bug.cgi?id=3236 for details.

      if (qx.core.Environment.get("engine.name") == "mshtml") {
        this.setKeepFocus(true);
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_385_2: null,
      __P_385_0: null,
      // overridden
      _createContentElement: function _createContentElement() {
        var elem = this.__P_385_0.createElement("div");

        this.__P_385_0.body.appendChild(elem);

        var root = new qx.html.Root(elem);
        root.setStyles({
          position: "absolute",
          textAlign: "left"
        }); // Store reference to the widget in the DOM element.

        root.connectWidget(this); // Mark the element of this root with a special attribute to prevent
        // that qx.event.handler.Focus is performing a focus action.
        // This would end up in a scrolling to the top which is not wanted in
        // an inline scenario
        // see Bug #2740

        if (qx.core.Environment.get("engine.name") == "gecko") {
          root.setAttribute("qxIsRootPage", 1);
        }

        return root;
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var width = qx.bom.Document.getWidth(this._window);
        var height = qx.bom.Document.getHeight(this._window);
        return {
          minWidth: width,
          width: width,
          maxWidth: width,
          minHeight: height,
          height: height,
          maxHeight: height
        };
      },

      /**
       * Adjust html element size on layout resizes.
       *
       * @param e {qx.event.type.Data} event object
       */
      __P_385_1: function __P_385_1(e) {
        // set the size to 0 so make the content element invisible
        // this works because the content element has overflow "show"
        this.getContentElement().setStyles({
          width: 0,
          height: 0
        });
      },

      /**
       * Whether the configured layout supports a maximized window
       * e.g. is a Canvas.
       *
       * @return {Boolean} Whether the layout supports maximized windows
       */
      supportsMaximize: function supportsMaximize() {
        return false;
      },
      // overridden
      _applyPadding: function _applyPadding(value, old, name) {
        if (value && (name == "paddingTop" || name == "paddingLeft")) {
          throw new Error("The root widget does not support 'left', or 'top' paddings!");
        }

        qx.ui.root.Page.prototype._applyPadding.base.call(this, value, old, name);
      }
    },

    /*
    *****************************************************************************
       DESTRUCT
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_385_0 = null;
    }
  });
  qx.ui.root.Page.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Page.js.map?dt=1613588119416