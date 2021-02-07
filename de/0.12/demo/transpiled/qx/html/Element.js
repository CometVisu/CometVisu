(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Animation": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.Element": {},
      "qx.dom.Hierarchy": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.element.Scroll": {},
      "qx.bom.Selection": {},
      "qx.event.handler.Appear": {},
      "qx.event.Registration": {
        "defer": "runtime"
      },
      "qx.event.handler.Focus": {},
      "qx.event.dispatch.MouseCapture": {},
      "qx.dom.Element": {},
      "qx.core.Id": {},
      "qx.bom.element.Attribute": {},
      "qx.bom.element.Style": {},
      "qx.lang.Array": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.event.Manager": {},
      "qx.util.DeferredCall": {
        "defer": "runtime"
      },
      "qx.core.ObjectRegistry": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "module.objectid": {},
        "css.userselect": {
          "className": "qx.bom.client.Css"
        },
        "css.userselect.none": {
          "className": "qx.bom.client.Css"
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
  
  ************************************************************************ */

  /**
   * High-performance, high-level DOM element creation and management.
   *
   * Includes support for HTML and style attributes. Elements also have
   * got a powerful children and visibility management.
   *
   * Processes DOM insertion and modification with advanced logic
   * to reduce the real transactions.
   *
   * From the view of the parent you can use the following children management
   * methods:
   * {@link #getChildren}, {@link #indexOf}, {@link #hasChild}, {@link #add},
   * {@link #addAt}, {@link #remove}, {@link #removeAt}, {@link #removeAll}
   *
   * Each child itself also has got some powerful methods to control its
   * position:
   * {@link #getParent}, {@link #free},
   * {@link #insertInto}, {@link #insertBefore}, {@link #insertAfter},
   * {@link #moveTo}, {@link #moveBefore}, {@link #moveAfter},
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @require(qx.module.Animation)
   */
  qx.Class.define("qx.html.Element", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Creates a new Element
     *
     * @param tagName {String?"div"} Tag name of the element to create
     * @param styles {Map?null} optional map of CSS styles, where the key is the name
     *    of the style and the value is the value to use.
     * @param attributes {Map?null} optional map of element attributes, where the
     *    key is the name of the attribute and the value is the value to use.
     */
    construct: function construct(tagName, styles, attributes) {
      qx.core.Object.constructor.call(this); // {String} Set tag name

      this.__P_209_0 = tagName || "div";
      this.__P_209_1 = styles || null;
      this.__P_209_2 = attributes || null;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /*
      ---------------------------------------------------------------------------
        STATIC DATA
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} If debugging should be enabled */
      DEBUG: false,

      /** @type {Map} Contains the modified {@link qx.html.Element}s. The key is the hash code. */
      _modified: {},

      /** @type {Map} Contains the {@link qx.html.Element}s which should get hidden or visible at the next flush. The key is the hash code. */
      _visibility: {},

      /** @type {Map} Contains the {@link qx.html.Element}s which should scrolled at the next flush */
      _scroll: {},

      /** @type {Array} List of post actions for elements. The key is the action name. The value the {@link qx.html.Element}. */
      _actions: [],

      /**  @type {Map} List of all selections. */
      __P_209_3: {},
      __P_209_4: null,
      __P_209_5: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC ELEMENT FLUSH
      ---------------------------------------------------------------------------
      */

      /**
       * Schedule a deferred element queue flush. If the widget subsystem is used
       * this method gets overwritten by {@link qx.ui.core.queue.Manager}.
       *
       * @param job {String} The job descriptor. Should always be <code>"element"</code>.
       */
      _scheduleFlush: function _scheduleFlush(job) {
        qx.html.Element.__P_209_6.schedule();
      },

      /**
       * Flush the global modified list
       */
      flush: function flush() {
        var obj;

        // blur elements, which will be removed
        var focusHandler = this.__P_209_7();

        var focusedDomElement = focusHandler.getFocus();

        if (focusedDomElement && this.__P_209_8(focusedDomElement)) {
          focusHandler.blur(focusedDomElement);
        } // decativate elements, which will be removed


        var activeDomElement = focusHandler.getActive();

        if (activeDomElement && this.__P_209_8(activeDomElement)) {
          qx.bom.Element.deactivate(activeDomElement);
        } // release capture for elements, which will be removed


        var captureDomElement = this.__P_209_9();

        if (captureDomElement && this.__P_209_8(captureDomElement)) {
          qx.bom.Element.releaseCapture(captureDomElement);
        }

        var later = [];
        var modified = this._modified;

        for (var hc in modified) {
          obj = modified[hc]; // Ignore all hidden elements except iframes
          // but keep them until they get visible (again)

          if (obj.__P_209_10() || obj.classname == "qx.html.Iframe") {
            // Separately queue rendered elements
            if (obj.__P_209_11 && qx.dom.Hierarchy.isRendered(obj.__P_209_11)) {
              later.push(obj);
            } // Flush invisible elements first
            else {
                obj.__P_209_12();
              } // Cleanup modification list


            delete modified[hc];
          }
        }

        for (var i = 0, l = later.length; i < l; i++) {
          obj = later[i];

          obj.__P_209_12();
        } // Process visibility list


        var visibility = this._visibility;

        for (var hc in visibility) {
          obj = visibility[hc];
          var element = obj.__P_209_11;

          if (!element) {
            delete visibility[hc];
            continue;
          }

          // hiding or showing an object and deleting it right after that may
          // cause an disposed object in the visibility queue [BUG #3607]
          if (!obj.$$disposed) {
            element.style.display = obj.__P_209_13 ? "" : "none"; // also hide the element (fixed some rendering problem in IE<8 & IE8 quirks)

            if (qx.core.Environment.get("engine.name") == "mshtml") {
              if (!(document.documentMode >= 8)) {
                element.style.visibility = obj.__P_209_13 ? "visible" : "hidden";
              }
            }
          }

          delete visibility[hc];
        } // Process scroll list


        var scroll = this._scroll;

        for (var hc in scroll) {
          obj = scroll[hc];
          var elem = obj.__P_209_11;

          if (elem && elem.offsetWidth) {
            var done = true; // ScrollToX

            if (obj.__P_209_14 != null) {
              obj.__P_209_11.scrollLeft = obj.__P_209_14;
              delete obj.__P_209_14;
            } // ScrollToY


            if (obj.__P_209_15 != null) {
              obj.__P_209_11.scrollTop = obj.__P_209_15;
              delete obj.__P_209_15;
            } // ScrollIntoViewX


            var intoViewX = obj.__P_209_16;

            if (intoViewX != null) {
              var child = intoViewX.element.getDomElement();

              if (child && child.offsetWidth) {
                qx.bom.element.Scroll.intoViewX(child, elem, intoViewX.align);
                delete obj.__P_209_16;
              } else {
                done = false;
              }
            } // ScrollIntoViewY


            var intoViewY = obj.__P_209_17;

            if (intoViewY != null) {
              var child = intoViewY.element.getDomElement();

              if (child && child.offsetWidth) {
                qx.bom.element.Scroll.intoViewY(child, elem, intoViewY.align);
                delete obj.__P_209_17;
              } else {
                done = false;
              }
            } // Clear flag if all things are done
            // Otherwise wait for the next flush


            if (done) {
              delete scroll[hc];
            }
          }
        }

        var activityEndActions = {
          "releaseCapture": 1,
          "blur": 1,
          "deactivate": 1
        }; // Process action list

        for (var i = 0; i < this._actions.length; i++) {
          var action = this._actions[i];
          var element = action.element.__P_209_11;

          if (!element || !activityEndActions[action.type] && !action.element.__P_209_10()) {
            continue;
          }

          var args = action.args;
          args.unshift(element);
          qx.bom.Element[action.type].apply(qx.bom.Element, args);
        }

        this._actions = []; // Process selection

        for (var hc in this.__P_209_3) {
          var selection = this.__P_209_3[hc];
          var elem = selection.element.__P_209_11;

          if (elem) {
            qx.bom.Selection.set(elem, selection.start, selection.end);
            delete this.__P_209_3[hc];
          }
        } // Fire appear/disappear events


        qx.event.handler.Appear.refresh();
      },

      /**
       * Get the focus handler
       *
       * @return {qx.event.handler.Focus} The focus handler
       */
      __P_209_7: function __P_209_7() {
        if (!this.__P_209_4) {
          var eventManager = qx.event.Registration.getManager(window);
          this.__P_209_4 = eventManager.getHandler(qx.event.handler.Focus);
        }

        return this.__P_209_4;
      },

      /**
       * Get the mouse capture element
       *
       * @return {Element} The mouse capture DOM element
       */
      __P_209_9: function __P_209_9() {
        if (!this.__P_209_5) {
          var eventManager = qx.event.Registration.getManager(window);
          this.__P_209_5 = eventManager.getDispatcher(qx.event.dispatch.MouseCapture);
        }

        return this.__P_209_5.getCaptureElement();
      },

      /**
       * Whether the given DOM element will become invisible after the flush
       *
       * @param domElement {Element} The DOM element to check
       * @return {Boolean} Whether the element will become invisible
       */
      __P_209_8: function __P_209_8(domElement) {
        var element = this.fromDomElement(domElement);
        return element && !element.__P_209_10();
      },

      /**
       * Finds the Widget for a given DOM element
       *
       * @param domElement {DOM} the DOM element
       * @return {qx.ui.core.Widget} the Widget that created the DOM element
       */
      fromDomElement: function fromDomElement(domElement) {
        return domElement.$$elementObject;
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        PROTECTED HELPERS/DATA
      ---------------------------------------------------------------------------
      */
      __P_209_0: null,

      /** @type {Element} DOM element of this object */
      __P_209_11: null,

      /** @type {qx.ui.core.Widget} the Widget this element is attached to */
      __P_209_18: null,

      /** @type {Boolean} Marker for always visible root nodes (often the body node) */
      __P_209_19: false,

      /** @type {Boolean} Whether the element should be included in the render result */
      __P_209_20: true,

      /** @type {Boolean} Whether the element should be visible in the render result */
      __P_209_13: true,
      __P_209_16: null,
      __P_209_17: null,
      __P_209_14: null,
      __P_209_15: null,
      __P_209_21: null,
      __P_209_22: null,
      __P_209_23: null,
      __P_209_1: null,
      __P_209_2: null,
      __P_209_24: null,
      __P_209_25: null,
      __P_209_26: null,
      __P_209_27: null,
      __P_209_28: null,

      /**
       * Add the element to the global modification list.
       *
       */
      _scheduleChildrenUpdate: function _scheduleChildrenUpdate() {
        if (this.__P_209_27) {
          return;
        }

        this.__P_209_27 = true;
        qx.html.Element._modified[this.toHashCode()] = this;

        qx.html.Element._scheduleFlush("element");
      },

      /**
       * Internal helper to generate the DOM element
       *
       * @return {Element} DOM element
       */
      _createDomElement: function _createDomElement() {
        return qx.dom.Element.create(this.__P_209_0);
      },

      /**
       * Connects a widget to this element, and to the DOM element in this Element.  They
       * remain associated until disposed or disconnectWidget is called
       *
       * @param widget {qx.ui.core.Widget} the widget
       */
      connectWidget: function connectWidget(widget) {
        this.__P_209_18 = widget;

        if (this.__P_209_11) {
          this.__P_209_11.$$widget = widget.toHashCode();
          this.__P_209_11.$$widgetObject = widget;
        }

        if (qx.core.Environment.get("module.objectid")) {
          this.updateObjectId();
        }
      },

      /**
       * Disconnects a widget from this element and the DOM element.  The DOM element remains
       * untouched, except that it can no longer be used to find the Widget.
       *
       * @param widget {qx.ui.core.Widget} the Widget
       */
      disconnectWidget: function disconnectWidget(widget) {
        delete this.__P_209_18;

        if (this.__P_209_11) {
          this.__P_209_11.$$widget = "";
          delete this.__P_209_11.$$widgetObject;
        }

        if (qx.core.Environment.get("module.objectid")) {
          this.updateObjectId();
        }
      },

      /**
       * Connects a DOM element to this Element; if this Element is already connected to a Widget
       * then the Widget is also connected.
       *
       * @param domElement {DOM} the DOM element to associate
       */
      __P_209_29: function __P_209_29(domElement) {
        ;
        this.__P_209_11 = domElement;
        domElement.$$elementObject = this;
        domElement.$$element = this.toHashCode();

        if (this.__P_209_18) {
          domElement.$$widget = this.__P_209_18.toHashCode();
          domElement.$$widgetObject = this.__P_209_18;
        }
      },

      /*
      ---------------------------------------------------------------------------
        FLUSH OBJECT
      ---------------------------------------------------------------------------
      */

      /**
       * Syncs data of an HtmlElement object to the DOM.
       *
       */
      __P_209_12: function __P_209_12() {
        var length;
        var children = this.__P_209_26;

        if (children) {
          length = children.length;
          var child;

          for (var i = 0; i < length; i++) {
            child = children[i];

            if (child.__P_209_13 && child.__P_209_20 && !child.__P_209_11) {
              child.__P_209_12();
            }
          }
        }

        if (!this.__P_209_11) {
          this.__P_209_29(this._createDomElement());

          this._copyData(false);

          if (children && length > 0) {
            this._insertChildren();
          }
        } else {
          this._syncData();

          if (this.__P_209_27) {
            this._syncChildren();
          }
        }

        delete this.__P_209_27;
      },

      /*
      ---------------------------------------------------------------------------
        SUPPORT FOR CHILDREN FLUSH
      ---------------------------------------------------------------------------
      */

      /**
       * Append all child nodes to the DOM
       * element. This function is used when the element is initially
       * created. After this initial apply {@link #_syncChildren} is used
       * instead.
       *
       */
      _insertChildren: function _insertChildren() {
        var children = this.__P_209_26;
        var length = children.length;
        var child;

        if (length > 2) {
          var domElement = document.createDocumentFragment();

          for (var i = 0; i < length; i++) {
            child = children[i];

            if (child.__P_209_11 && child.__P_209_20) {
              domElement.appendChild(child.__P_209_11);
            }
          }

          this.__P_209_11.appendChild(domElement);
        } else {
          var domElement = this.__P_209_11;

          for (var i = 0; i < length; i++) {
            child = children[i];

            if (child.__P_209_11 && child.__P_209_20) {
              domElement.appendChild(child.__P_209_11);
            }
          }
        }
      },

      /**
       * Synchronize internal children hierarchy to the DOM. This is used
       * for further runtime updates after the element has been created
       * initially.
       *
       */
      _syncChildren: function _syncChildren() {
        var dataChildren = this.__P_209_26;
        var dataLength = dataChildren.length;
        var dataChild;
        var dataEl;
        var domParent = this.__P_209_11;
        var domChildren = domParent.childNodes;
        var domPos = 0;
        var domEl;

        // Remove children from DOM which are excluded or remove first
        for (var i = domChildren.length - 1; i >= 0; i--) {
          domEl = domChildren[i];
          dataEl = qx.html.Element.fromDomElement(domEl);

          if (!dataEl || !dataEl.__P_209_20 || dataEl.__P_209_28 !== this) {
            domParent.removeChild(domEl);
          }
        } // Start from beginning and bring DOM in sync
        // with the data structure


        for (var i = 0; i < dataLength; i++) {
          dataChild = dataChildren[i]; // Only process visible childs

          if (dataChild.__P_209_20) {
            dataEl = dataChild.__P_209_11;
            domEl = domChildren[domPos];

            if (!dataEl) {
              continue;
            } // Only do something when out of sync
            // If the data element is not there it may mean that it is still
            // marked as visible=false


            if (dataEl != domEl) {
              if (domEl) {
                domParent.insertBefore(dataEl, domEl);
              } else {
                domParent.appendChild(dataEl);
              }
            } // Increase counter


            domPos++;
          }
        } // User feedback

      },

      /*
      ---------------------------------------------------------------------------
        SUPPORT FOR ATTRIBUTE/STYLE/EVENT FLUSH
      ---------------------------------------------------------------------------
      */
      updateObjectId: function updateObjectId() {
        // Copy Object Id
        if (qx.core.Environment.get("module.objectid")) {
          var id = null;

          if (this.__P_209_18 && this.__P_209_18.getQxObjectId()) {
            id = qx.core.Id.getAbsoluteIdOf(this.__P_209_18, true) || null;
          }

          this.setAttribute("data-qx-object-id", id, true);
        }
      },

      /**
       * Copies data between the internal representation and the DOM. This
       * simply copies all the data and only works well directly after
       * element creation. After this the data must be synced using {@link #_syncData}
       *
       * @param fromMarkup {Boolean} Whether the copy should respect styles
       *   given from markup
       */
      _copyData: function _copyData(fromMarkup) {
        var elem = this.__P_209_11; // Copy attributes

        var data = this.__P_209_2;

        if (data) {
          var Attribute = qx.bom.element.Attribute;

          for (var key in data) {
            Attribute.set(elem, key, data[key]);
          }
        } // Copy styles


        var data = this.__P_209_1;

        if (data) {
          var Style = qx.bom.element.Style;

          if (fromMarkup) {
            Style.setStyles(elem, data);
          } else {
            // Set styles at once which is a lot faster in most browsers
            // compared to separate modifications of many single style properties.
            Style.setCss(elem, Style.compile(data));
          }
        } // Copy properties


        var data = this.__P_209_24;

        if (data) {
          for (var key in data) {
            this._applyProperty(key, data[key]);
          }
        } // Attach events


        var data = this.__P_209_25;

        if (data) {
          // Import listeners
          qx.event.Registration.getManager(elem).importListeners(elem, data); // Cleanup event map
          // Events are directly attached through event manager
          // after initial creation. This differs from the
          // handling of styles and attributes where queuing happens
          // through the complete runtime of the application.

          delete this.__P_209_25;
        }
      },

      /**
       * Synchronizes data between the internal representation and the DOM. This
       * is the counterpart of {@link #_copyData} and is used for further updates
       * after the element has been created.
       *
       */
      _syncData: function _syncData() {
        var elem = this.__P_209_11;
        var Attribute = qx.bom.element.Attribute;
        var Style = qx.bom.element.Style; // Sync attributes

        var jobs = this.__P_209_22;

        if (jobs) {
          var data = this.__P_209_2;

          if (data) {
            var value;

            for (var key in jobs) {
              value = data[key];

              if (value !== undefined) {
                Attribute.set(elem, key, value);
              } else {
                Attribute.reset(elem, key);
              }
            }
          }

          this.__P_209_22 = null;
        } // Sync styles


        var jobs = this.__P_209_21;

        if (jobs) {
          var data = this.__P_209_1;

          if (data) {
            var styles = {};

            for (var key in jobs) {
              styles[key] = data[key];
            }

            Style.setStyles(elem, styles);
          }

          this.__P_209_21 = null;
        } // Sync misc


        var jobs = this.__P_209_23;

        if (jobs) {
          var data = this.__P_209_24;

          if (data) {
            var value;

            for (var key in jobs) {
              this._applyProperty(key, data[key]);
            }
          }

          this.__P_209_23 = null;
        } // Note: Events are directly kept in sync

      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE HELPERS/DATA
      ---------------------------------------------------------------------------
      */

      /**
       * Walk up the internal children hierarchy and
       * look if one of the children is marked as root.
       *
       * This method is quite performance hungry as it
       * really walks up recursively.
       * @return {Boolean} <code>true</code> if the element will be seeable
       */
      __P_209_10: function __P_209_10() {
        var pa = this; // Any chance to cache this information in the parents?

        while (pa) {
          if (pa.__P_209_19) {
            return true;
          }

          if (!pa.__P_209_20 || !pa.__P_209_13) {
            return false;
          }

          pa = pa.__P_209_28;
        }

        return false;
      },

      /**
       * Internal helper for all children addition needs
       *
       * @param child {var} the element to add
       * @throws {Error} if the given element is already a child
       *     of this element
       */
      __P_209_30: function __P_209_30(child) {
        if (child.__P_209_28 === this) {
          throw new Error("Child is already in: " + child);
        }

        if (child.__P_209_19) {
          throw new Error("Root elements could not be inserted into other ones.");
        } // Remove from previous parent


        if (child.__P_209_28) {
          child.__P_209_28.remove(child);
        } // Convert to child of this object


        child.__P_209_28 = this; // Prepare array

        if (!this.__P_209_26) {
          this.__P_209_26 = [];
        } // Schedule children update


        if (this.__P_209_11) {
          this._scheduleChildrenUpdate();
        }
      },

      /**
       * Internal helper for all children removal needs
       *
       * @param child {qx.html.Element} the removed element
       * @throws {Error} if the given element is not a child
       *     of this element
       */
      __P_209_31: function __P_209_31(child) {
        if (child.__P_209_28 !== this) {
          throw new Error("Has no child: " + child);
        } // Schedule children update


        if (this.__P_209_11) {
          this._scheduleChildrenUpdate();
        } // Remove reference to old parent


        delete child.__P_209_28;
      },

      /**
       * Internal helper for all children move needs
       *
       * @param child {qx.html.Element} the moved element
       * @throws {Error} if the given element is not a child
       *     of this element
       */
      __P_209_32: function __P_209_32(child) {
        if (child.__P_209_28 !== this) {
          throw new Error("Has no child: " + child);
        } // Schedule children update


        if (this.__P_209_11) {
          this._scheduleChildrenUpdate();
        }
      },

      /*
      ---------------------------------------------------------------------------
        CHILDREN MANAGEMENT (EXECUTED ON THE PARENT)
      ---------------------------------------------------------------------------
      */

      /**
       * Returns a copy of the internal children structure.
       *
       * Please do not modify the array in place. If you need
       * to work with the data in such a way make yourself
       * a copy of the data first.
       *
       * @return {Array} the children list
       */
      getChildren: function getChildren() {
        return this.__P_209_26 || null;
      },

      /**
       * Get a child element at the given index
       *
       * @param index {Integer} child index
       * @return {qx.html.Element|null} The child element or <code>null</code> if
       *     no child is found at that index.
       */
      getChild: function getChild(index) {
        var children = this.__P_209_26;
        return children && children[index] || null;
      },

      /**
       * Returns whether the element has any child nodes
       *
       * @return {Boolean} Whether the element has any child nodes
       */
      hasChildren: function hasChildren() {
        var children = this.__P_209_26;
        return children && children[0] !== undefined;
      },

      /**
       * Find the position of the given child
       *
       * @param child {qx.html.Element} the child
       * @return {Integer} returns the position. If the element
       *     is not a child <code>-1</code> will be returned.
       */
      indexOf: function indexOf(child) {
        var children = this.__P_209_26;
        return children ? children.indexOf(child) : -1;
      },

      /**
       * Whether the given element is a child of this element.
       *
       * @param child {qx.html.Element} the child
       * @return {Boolean} Returns <code>true</code> when the given
       *    element is a child of this element.
       */
      hasChild: function hasChild(child) {
        var children = this.__P_209_26;
        return children && children.indexOf(child) !== -1;
      },

      /**
       * Append all given children at the end of this element.
       *
       * @param varargs {qx.html.Element} elements to insert
       * @return {qx.html.Element} this object (for chaining support)
       */
      add: function add(varargs) {
        if (arguments[1]) {
          for (var i = 0, l = arguments.length; i < l; i++) {
            this.__P_209_30(arguments[i]);
          }

          this.__P_209_26.push.apply(this.__P_209_26, arguments);
        } else {
          this.__P_209_30(varargs);

          this.__P_209_26.push(varargs);
        } // Chaining support


        return this;
      },

      /**
       * Inserts a new element into this element at the given position.
       *
       * @param child {qx.html.Element} the element to insert
       * @param index {Integer} the index (starts at 0 for the
       *     first child) to insert (the index of the following
       *     children will be increased by one)
       * @return {qx.html.Element} this object (for chaining support)
       */
      addAt: function addAt(child, index) {
        this.__P_209_30(child);

        qx.lang.Array.insertAt(this.__P_209_26, child, index); // Chaining support

        return this;
      },

      /**
       * Removes all given children
       *
       * @param childs {qx.html.Element} children to remove
       * @return {qx.html.Element} this object (for chaining support)
       */
      remove: function remove(childs) {
        var children = this.__P_209_26;

        if (!children) {
          return this;
        }

        if (arguments[1]) {
          var child;

          for (var i = 0, l = arguments.length; i < l; i++) {
            child = arguments[i];

            this.__P_209_31(child);

            qx.lang.Array.remove(children, child);
          }
        } else {
          this.__P_209_31(childs);

          qx.lang.Array.remove(children, childs);
        } // Chaining support


        return this;
      },

      /**
       * Removes the child at the given index
       *
       * @param index {Integer} the position of the
       *     child (starts at 0 for the first child)
       * @return {qx.html.Element} this object (for chaining support)
       */
      removeAt: function removeAt(index) {
        var children = this.__P_209_26;

        if (!children) {
          throw new Error("Has no children!");
        }

        var child = children[index];

        if (!child) {
          throw new Error("Has no child at this position!");
        }

        this.__P_209_31(child);

        qx.lang.Array.removeAt(this.__P_209_26, index); // Chaining support

        return this;
      },

      /**
       * Remove all children from this element.
       *
       * @return {qx.html.Element} A reference to this.
       */
      removeAll: function removeAll() {
        var children = this.__P_209_26;

        if (children) {
          for (var i = 0, l = children.length; i < l; i++) {
            this.__P_209_31(children[i]);
          } // Clear array


          children.length = 0;
        } // Chaining support


        return this;
      },

      /*
      ---------------------------------------------------------------------------
        CHILDREN MANAGEMENT (EXECUTED ON THE CHILD)
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the parent of this element.
       *
       * @return {qx.html.Element|null} The parent of this element
       */
      getParent: function getParent() {
        return this.__P_209_28 || null;
      },

      /**
       * Insert self into the given parent. Normally appends self to the end,
       * but optionally a position can be defined. With index <code>0</code> it
       * will be inserted at the begin.
       *
       * @param parent {qx.html.Element} The new parent of this element
       * @param index {Integer?null} Optional position
       * @return {qx.html.Element} this object (for chaining support)
       */
      insertInto: function insertInto(parent, index) {
        parent.__P_209_30(this);

        if (index == null) {
          parent.__P_209_26.push(this);
        } else {
          qx.lang.Array.insertAt(this.__P_209_26, this, index);
        }

        return this;
      },

      /**
       * Insert self before the given (related) element
       *
       * @param rel {qx.html.Element} the related element
       * @return {qx.html.Element} this object (for chaining support)
       */
      insertBefore: function insertBefore(rel) {
        var parent = rel.__P_209_28;

        parent.__P_209_30(this);

        qx.lang.Array.insertBefore(parent.__P_209_26, this, rel);
        return this;
      },

      /**
       * Insert self after the given (related) element
       *
       * @param rel {qx.html.Element} the related element
       * @return {qx.html.Element} this object (for chaining support)
       */
      insertAfter: function insertAfter(rel) {
        var parent = rel.__P_209_28;

        parent.__P_209_30(this);

        qx.lang.Array.insertAfter(parent.__P_209_26, this, rel);
        return this;
      },

      /**
       * Move self to the given index in the current parent.
       *
       * @param index {Integer} the index (starts at 0 for the first child)
       * @return {qx.html.Element} this object (for chaining support)
       * @throws {Error} when the given element is not child
       *      of this element.
       */
      moveTo: function moveTo(index) {
        var parent = this.__P_209_28;

        parent.__P_209_32(this);

        var oldIndex = parent.__P_209_26.indexOf(this);

        if (oldIndex === index) {
          throw new Error("Could not move to same index!");
        } else if (oldIndex < index) {
          index--;
        }

        qx.lang.Array.removeAt(parent.__P_209_26, oldIndex);
        qx.lang.Array.insertAt(parent.__P_209_26, this, index);
        return this;
      },

      /**
       * Move self before the given (related) child.
       *
       * @param rel {qx.html.Element} the related child
       * @return {qx.html.Element} this object (for chaining support)
       */
      moveBefore: function moveBefore(rel) {
        var parent = this.__P_209_28;
        return this.moveTo(parent.__P_209_26.indexOf(rel));
      },

      /**
       * Move self after the given (related) child.
       *
       * @param rel {qx.html.Element} the related child
       * @return {qx.html.Element} this object (for chaining support)
       */
      moveAfter: function moveAfter(rel) {
        var parent = this.__P_209_28;
        return this.moveTo(parent.__P_209_26.indexOf(rel) + 1);
      },

      /**
       * Remove self from the current parent.
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      free: function free() {
        var parent = this.__P_209_28;

        if (!parent) {
          throw new Error("Has no parent to remove from.");
        }

        if (!parent.__P_209_26) {
          return this;
        }

        parent.__P_209_31(this);

        qx.lang.Array.remove(parent.__P_209_26, this);
        return this;
      },

      /*
      ---------------------------------------------------------------------------
        DOM ELEMENT ACCESS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the DOM element (if created). Please use this with caution.
       * It is better to make all changes to the object itself using the public
       * API rather than to the underlying DOM element.
       *
       * @return {Element|null} The DOM element node, if available.
       */
      getDomElement: function getDomElement() {
        return this.__P_209_11 || null;
      },

      /**
       * Returns the nodeName of the DOM element.
       *
       * @return {String} The node name
       */
      getNodeName: function getNodeName() {
        return this.__P_209_0;
      },

      /**
       * Sets the nodeName of the DOM element.
       *
       * @param name {String} The node name
       */
      setNodeName: function setNodeName(name) {
        this.__P_209_0 = name;
      },

      /**
       * Sets the element's root flag, which indicates
       * whether the element should be a root element or not.
       * @param root {Boolean} The root flag.
       */
      setRoot: function setRoot(root) {
        this.__P_209_19 = root;
      },

      /**
       * Uses existing markup for this element. This is mainly used
       * to insert pre-built markup blocks into the element hierarchy.
       *
       * @param html {String} HTML markup with one root element
       *   which is used as the main element for this instance.
       * @return {Element} The created DOM element
       */
      useMarkup: function useMarkup(html) {
        if (this.__P_209_11) {
          throw new Error("Could not overwrite existing element!");
        } // Prepare extraction
        // We have a IE specific issue with "Unknown error" messages
        // when we try to use the same DOM node again. I am not sure
        // why this happens. Would be a good performance improvement,
        // but does not seem to work.


        if (qx.core.Environment.get("engine.name") == "mshtml") {
          var helper = document.createElement("div");
        } else {
          var helper = qx.dom.Element.getHelperElement();
        } // Extract first element


        helper.innerHTML = html;
        this.useElement(helper.firstChild);
        return this.__P_209_11;
      },

      /**
       * Uses an existing element instead of creating one. This may be interesting
       * when the DOM element is directly needed to add content etc.
       *
       * @param elem {Element} Element to reuse
       */
      useElement: function useElement(elem) {
        if (this.__P_209_11) {
          throw new Error("Could not overwrite existing element!");
        } // Use incoming element


        this.__P_209_29(elem); // Copy currently existing data over to element


        this._copyData(true);
      },

      /**
       * Whether the element is focusable (or will be when created)
       *
       * @return {Boolean} <code>true</code> when the element is focusable.
       */
      isFocusable: function isFocusable() {
        var tabIndex = this.getAttribute("tabIndex");

        if (tabIndex >= 1) {
          return true;
        }

        var focusable = qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

        if (tabIndex >= 0 && focusable[this.__P_209_0]) {
          return true;
        }

        return false;
      },

      /**
       * Set whether the element is selectable. It uses the qooxdoo attribute
       * qxSelectable with the values 'on' or 'off'.
       * In webkit, a special css property will be used (-webkit-user-select).
       *
       * @param value {Boolean} True, if the element should be selectable.
       */
      setSelectable: function setSelectable(value) {
        this.setAttribute("qxSelectable", value ? "on" : "off");
        var userSelect = qx.core.Environment.get("css.userselect");

        if (userSelect) {
          this.setStyle(userSelect, value ? "text" : qx.core.Environment.get("css.userselect.none"));
        }
      },

      /**
       * Whether the element is natively focusable (or will be when created)
       *
       * This ignores the configured tabIndex.
       *
       * @return {Boolean} <code>true</code> when the element is focusable.
       */
      isNativelyFocusable: function isNativelyFocusable() {
        return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__P_209_0];
      },

      /*
      ---------------------------------------------------------------------------
        EXCLUDE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Marks the element as included which means it will be moved into
       * the DOM again and synced with the internal data representation.
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      include: function include() {
        if (this.__P_209_20) {
          return this;
        }

        delete this.__P_209_20;

        if (this.__P_209_28) {
          this.__P_209_28._scheduleChildrenUpdate();
        }

        return this;
      },

      /**
       * Marks the element as excluded which means it will be removed
       * from the DOM and ignored for updates until it gets included again.
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      exclude: function exclude() {
        if (!this.__P_209_20) {
          return this;
        }

        this.__P_209_20 = false;

        if (this.__P_209_28) {
          this.__P_209_28._scheduleChildrenUpdate();
        }

        return this;
      },

      /**
       * Whether the element is part of the DOM
       *
       * @return {Boolean} Whether the element is part of the DOM.
       */
      isIncluded: function isIncluded() {
        return this.__P_209_20 === true;
      },

      /*
      ---------------------------------------------------------------------------
        ANIMATION SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Fades in the element.
       * @param duration {Number} Time in ms.
       * @return {qx.bom.element.AnimationHandle} The animation handle to react for
       *   the fade animation.
       */
      fadeIn: function fadeIn(duration) {
        var col = qxWeb(this.__P_209_11);

        if (col.isPlaying()) {
          col.stop();
        } // create the element right away


        if (!this.__P_209_11) {
          this.__P_209_12();

          col.push(this.__P_209_11);
        }

        if (this.__P_209_11) {
          col.fadeIn(duration).once("animationEnd", function () {
            this.show();
            qx.html.Element.flush();
          }, this);
          return col.getAnimationHandles()[0];
        }
      },

      /**
       * Fades out the element.
       * @param duration {Number} Time in ms.
       * @return {qx.bom.element.AnimationHandle} The animation handle to react for
       *   the fade animation.
       */
      fadeOut: function fadeOut(duration) {
        var col = qxWeb(this.__P_209_11);

        if (col.isPlaying()) {
          col.stop();
        }

        if (this.__P_209_11) {
          col.fadeOut(duration).once("animationEnd", function () {
            this.hide();
            qx.html.Element.flush();
          }, this);
          return col.getAnimationHandles()[0];
        }
      },

      /*
      ---------------------------------------------------------------------------
        VISIBILITY SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Marks the element as visible which means that a previously applied
       * CSS style of display=none gets removed and the element will inserted
       * into the DOM, when this had not already happened before.
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      show: function show() {
        if (this.__P_209_13) {
          return this;
        }

        if (this.__P_209_11) {
          qx.html.Element._visibility[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        } // Must be sure that the element gets included into the DOM.


        if (this.__P_209_28) {
          this.__P_209_28._scheduleChildrenUpdate();
        }

        delete this.__P_209_13;
        return this;
      },

      /**
       * Marks the element as hidden which means it will kept in DOM (if it
       * is already there, but configured hidden using a CSS style of display=none).
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      hide: function hide() {
        if (!this.__P_209_13) {
          return this;
        }

        if (this.__P_209_11) {
          qx.html.Element._visibility[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        this.__P_209_13 = false;
        return this;
      },

      /**
       * Whether the element is visible.
       *
       * Please note: This does not control the visibility or parent inclusion recursively.
       *
       * @return {Boolean} Returns <code>true</code> when the element is configured
       *   to be visible.
       */
      isVisible: function isVisible() {
        return this.__P_209_13 === true;
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls the given child element into view. Only scrolls children.
       * Do not influence elements on top of this element.
       *
       * If the element is currently invisible it gets scrolled automatically
       * at the next time it is visible again (queued).
       *
       * @param elem {qx.html.Element} The element to scroll into the viewport.
       * @param align {String?null} Alignment of the element. Allowed values:
       *   <code>left</code> or <code>right</code>. Could also be null.
       *   Without a given alignment the method tries to scroll the widget
       *   with the minimum effort needed.
       * @param direct {Boolean?true} Whether the execution should be made
       *   directly when possible
       */
      scrollChildIntoViewX: function scrollChildIntoViewX(elem, align, direct) {
        var thisEl = this.__P_209_11;
        var childEl = elem.getDomElement();

        if (direct !== false && thisEl && thisEl.offsetWidth && childEl && childEl.offsetWidth) {
          qx.bom.element.Scroll.intoViewX(childEl, thisEl, align);
        } else {
          this.__P_209_16 = {
            element: elem,
            align: align
          };
          qx.html.Element._scroll[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        delete this.__P_209_14;
      },

      /**
       * Scrolls the given child element into view. Only scrolls children.
       * Do not influence elements on top of this element.
       *
       * If the element is currently invisible it gets scrolled automatically
       * at the next time it is visible again (queued).
       *
       * @param elem {qx.html.Element} The element to scroll into the viewport.
       * @param align {String?null} Alignment of the element. Allowed values:
       *   <code>top</code> or <code>bottom</code>. Could also be null.
       *   Without a given alignment the method tries to scroll the widget
       *   with the minimum effort needed.
       * @param direct {Boolean?true} Whether the execution should be made
       *   directly when possible
       */
      scrollChildIntoViewY: function scrollChildIntoViewY(elem, align, direct) {
        var thisEl = this.__P_209_11;
        var childEl = elem.getDomElement();

        if (direct !== false && thisEl && thisEl.offsetWidth && childEl && childEl.offsetWidth) {
          qx.bom.element.Scroll.intoViewY(childEl, thisEl, align);
        } else {
          this.__P_209_17 = {
            element: elem,
            align: align
          };
          qx.html.Element._scroll[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        delete this.__P_209_15;
      },

      /**
       * Scrolls the element to the given left position.
       *
       * @param x {Integer} Horizontal scroll position
       * @param lazy {Boolean?false} Whether the scrolling should be performed
       *    during element flush.
       */
      scrollToX: function scrollToX(x, lazy) {
        var thisEl = this.__P_209_11;

        if (lazy !== true && thisEl && thisEl.offsetWidth) {
          thisEl.scrollLeft = x;
          delete this.__P_209_14;
        } else {
          this.__P_209_14 = x;
          qx.html.Element._scroll[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        delete this.__P_209_16;
      },

      /**
       * Get the horizontal scroll position.
       *
       * @return {Integer} Horizontal scroll position
       */
      getScrollX: function getScrollX() {
        var thisEl = this.__P_209_11;

        if (thisEl) {
          return thisEl.scrollLeft;
        }

        return this.__P_209_14 || 0;
      },

      /**
       * Scrolls the element to the given top position.
       *
       * @param y {Integer} Vertical scroll position
       * @param lazy {Boolean?false} Whether the scrolling should be performed
       *    during element flush.
       */
      scrollToY: function scrollToY(y, lazy) {
        var thisEl = this.__P_209_11;

        if (lazy !== true && thisEl && thisEl.offsetWidth) {
          thisEl.scrollTop = y;
          delete this.__P_209_15;
        } else {
          this.__P_209_15 = y;
          qx.html.Element._scroll[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        delete this.__P_209_17;
      },

      /**
       * Get the vertical scroll position.
       *
       * @return {Integer} Vertical scroll position
       */
      getScrollY: function getScrollY() {
        var thisEl = this.__P_209_11;

        if (thisEl) {
          return thisEl.scrollTop;
        }

        return this.__P_209_15 || 0;
      },

      /**
       * Disables browser-native scrolling
       */
      disableScrolling: function disableScrolling() {
        this.enableScrolling();
        this.scrollToX(0);
        this.scrollToY(0);
        this.addListener("scroll", this.__P_209_33, this);
      },

      /**
       * Re-enables browser-native scrolling
       */
      enableScrolling: function enableScrolling() {
        this.removeListener("scroll", this.__P_209_33, this);
      },
      __P_209_34: null,

      /**
       * Handler for the scroll-event
       *
       * @param e {qx.event.type.Native} scroll-event
       */
      __P_209_33: function __P_209_33(e) {
        if (!this.__P_209_34) {
          this.__P_209_34 = true;
          this.__P_209_11.scrollTop = 0;
          this.__P_209_11.scrollLeft = 0;
          delete this.__P_209_34;
        }
      },

      /*
      ---------------------------------------------------------------------------
        TEXT SELECTION SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Get the selection of the element.
       *
       * If the underlaying DOM element is not yet created, this methods returns
       * a null value.
       *
       * @return {String|null}
       */
      getTextSelection: function getTextSelection() {
        var el = this.__P_209_11;

        if (el) {
          return qx.bom.Selection.get(el);
        }

        return null;
      },

      /**
       * Get the length of selection of the element.
       *
       * If the underlaying DOM element is not yet created, this methods returns
       * a null value.
       *
       * @return {Integer|null}
       */
      getTextSelectionLength: function getTextSelectionLength() {
        var el = this.__P_209_11;

        if (el) {
          return qx.bom.Selection.getLength(el);
        }

        return null;
      },

      /**
       * Get the start of the selection of the element.
       *
       * If the underlaying DOM element is not yet created, this methods returns
       * a null value.
       *
       * @return {Integer|null}
       */
      getTextSelectionStart: function getTextSelectionStart() {
        var el = this.__P_209_11;

        if (el) {
          return qx.bom.Selection.getStart(el);
        }

        return null;
      },

      /**
       * Get the end of the selection of the element.
       *
       * If the underlaying DOM element is not yet created, this methods returns
       * a null value.
       *
       * @return {Integer|null}
       */
      getTextSelectionEnd: function getTextSelectionEnd() {
        var el = this.__P_209_11;

        if (el) {
          return qx.bom.Selection.getEnd(el);
        }

        return null;
      },

      /**
       * Set the selection of the element with the given start and end value.
       * If no end value is passed the selection will extend to the end.
       *
       * This method only works if the underlying DOM element is already created.
       *
       * @param start {Integer} start of the selection (zero based)
       * @param end {Integer} end of the selection
       */
      setTextSelection: function setTextSelection(start, end) {
        var el = this.__P_209_11;

        if (el) {
          qx.bom.Selection.set(el, start, end);
          return;
        } // if element not created, save the selection for flushing


        qx.html.Element.__P_209_3[this.toHashCode()] = {
          element: this,
          start: start,
          end: end
        };

        qx.html.Element._scheduleFlush("element");
      },

      /**
       * Clears the selection of the element.
       *
       * This method only works if the underlying DOM element is already created.
       *
       */
      clearTextSelection: function clearTextSelection() {
        var el = this.__P_209_11;

        if (el) {
          qx.bom.Selection.clear(el);
        }

        delete qx.html.Element.__P_209_3[this.toHashCode()];
      },

      /*
      ---------------------------------------------------------------------------
        FOCUS/ACTIVATE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Takes the action to process as argument and queues this action if the
       * underlying DOM element is not yet created.
       *
       * @param action {String} action to queue
       * @param args {Array} optional list of arguments for the action
       */
      __P_209_35: function __P_209_35(action, args) {
        var actions = qx.html.Element._actions;
        actions.push({
          type: action,
          element: this,
          args: args || []
        });

        qx.html.Element._scheduleFlush("element");
      },

      /**
       * Focus this element.
       *
       * If the underlaying DOM element is not yet created, the
       * focus is queued for processing after the element creation.
       *
       */
      focus: function focus() {
        this.__P_209_35("focus");
      },

      /**
       * Mark this element to get blurred on the next flush of the queue
       *
       */
      blur: function blur() {
        this.__P_209_35("blur");
      },

      /**
       * Mark this element to get activated on the next flush of the queue
       *
       */
      activate: function activate() {
        this.__P_209_35("activate");
      },

      /**
       * Mark this element to get deactivated on the next flush of the queue
       *
       */
      deactivate: function deactivate() {
        this.__P_209_35("deactivate");
      },

      /**
       * Captures all mouse events to this element
       *
       * @param containerCapture {Boolean?true} If true all events originating in
       *   the container are captured. If false events originating in the container
       *   are not captured.
       */
      capture: function capture(containerCapture) {
        this.__P_209_35("capture", [containerCapture !== false]);
      },

      /**
       * Releases this element from a previous {@link #capture} call
       */
      releaseCapture: function releaseCapture() {
        this.__P_209_35("releaseCapture");
      },

      /*
      ---------------------------------------------------------------------------
        STYLE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Set up the given style attribute
       *
       * @param key {String} the name of the style attribute
       * @param value {var} the value
       * @param direct {Boolean?false} Whether the value should be applied
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      setStyle: function setStyle(key, value, direct) {
        if (!this.__P_209_1) {
          this.__P_209_1 = {};
        }

        if (this.__P_209_1[key] == value) {
          return this;
        }

        if (value == null) {
          delete this.__P_209_1[key];
        } else {
          this.__P_209_1[key] = value;
        } // Uncreated elements simply copy all data
        // on creation. We don't need to remember any
        // jobs. It is a simple full list copy.


        if (this.__P_209_11) {
          // Omit queuing in direct mode
          if (direct) {
            qx.bom.element.Style.set(this.__P_209_11, key, value);
            return this;
          } // Dynamically create if needed


          if (!this.__P_209_21) {
            this.__P_209_21 = {};
          } // Store job info


          this.__P_209_21[key] = true; // Register modification

          qx.html.Element._modified[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        return this;
      },

      /**
       * Convenience method to modify a set of styles at once.
       *
       * @param map {Map} a map where the key is the name of the property
       *    and the value is the value to use.
       * @param direct {Boolean?false} Whether the values should be applied
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      setStyles: function setStyles(map, direct) {
        // inline calls to "set" because this method is very
        // performance critical!
        var Style = qx.bom.element.Style;

        if (!this.__P_209_1) {
          this.__P_209_1 = {};
        }

        if (this.__P_209_11) {
          // Dynamically create if needed
          if (!this.__P_209_21) {
            this.__P_209_21 = {};
          }

          for (var key in map) {
            var value = map[key];

            if (this.__P_209_1[key] == value) {
              continue;
            }

            if (value == null) {
              delete this.__P_209_1[key];
            } else {
              this.__P_209_1[key] = value;
            } // Omit queuing in direct mode


            if (direct) {
              Style.set(this.__P_209_11, key, value);
              continue;
            } // Store job info


            this.__P_209_21[key] = true;
          } // Register modification


          qx.html.Element._modified[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        } else {
          for (var key in map) {
            var value = map[key];

            if (this.__P_209_1[key] == value) {
              continue;
            }

            if (value == null) {
              delete this.__P_209_1[key];
            } else {
              this.__P_209_1[key] = value;
            }
          }
        }

        return this;
      },

      /**
       * Removes the given style attribute
       *
       * @param key {String} the name of the style attribute
       * @param direct {Boolean?false} Whether the value should be removed
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      removeStyle: function removeStyle(key, direct) {
        this.setStyle(key, null, direct);
        return this;
      },

      /**
       * Get the value of the given style attribute.
       *
       * @param key {String} name of the style attribute
       * @return {var} the value of the style attribute
       */
      getStyle: function getStyle(key) {
        return this.__P_209_1 ? this.__P_209_1[key] : null;
      },

      /**
       * Returns a map of all styles. Do not modify the result map!
       *
       * @return {Map} All styles or <code>null</code> when none are configured.
       */
      getAllStyles: function getAllStyles() {
        return this.__P_209_1 || null;
      },

      /*
      ---------------------------------------------------------------------------
        ATTRIBUTE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Set up the given attribute
       *
       * @param key {String} the name of the attribute
       * @param value {var} the value
       * @param direct {Boolean?false} Whether the value should be applied
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      setAttribute: function setAttribute(key, value, direct) {
        if (!this.__P_209_2) {
          this.__P_209_2 = {};
        }

        if (this.__P_209_2[key] == value) {
          return this;
        }

        if (value == null) {
          delete this.__P_209_2[key];
        } else {
          this.__P_209_2[key] = value;
        } // Uncreated elements simply copy all data
        // on creation. We don't need to remember any
        // jobs. It is a simple full list copy.


        if (this.__P_209_11) {
          // Omit queuing in direct mode
          if (direct) {
            qx.bom.element.Attribute.set(this.__P_209_11, key, value);
            return this;
          } // Dynamically create if needed


          if (!this.__P_209_22) {
            this.__P_209_22 = {};
          } // Store job info


          this.__P_209_22[key] = true; // Register modification

          qx.html.Element._modified[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        return this;
      },

      /**
       * Convenience method to modify a set of attributes at once.
       *
       * @param map {Map} a map where the key is the name of the property
       *    and the value is the value to use.
       * @param direct {Boolean?false} Whether the values should be applied
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      setAttributes: function setAttributes(map, direct) {
        for (var key in map) {
          this.setAttribute(key, map[key], direct);
        }

        return this;
      },

      /**
       * Removes the given attribute
       *
       * @param key {String} the name of the attribute
       * @param direct {Boolean?false} Whether the value should be removed
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      removeAttribute: function removeAttribute(key, direct) {
        return this.setAttribute(key, null, direct);
      },

      /**
       * Get the value of the given attribute.
       *
       * @param key {String} name of the attribute
       * @return {var} the value of the attribute
       */
      getAttribute: function getAttribute(key) {
        return this.__P_209_2 ? this.__P_209_2[key] : null;
      },

      /*
      ---------------------------------------------------------------------------
        CSS CLASS SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a css class to the element.
       * @param name {String} Name of the CSS class.
       */
      addClass: function addClass(name) {
        var value = ((this.getAttribute("class") || "") + " " + name).trim();
        this.setAttribute("class", value);
      },

      /**
       * Removes a CSS class from the current element.
       * @param name {String} Name of the CSS class.
       */
      removeClass: function removeClass(name) {
        var currentClass = this.getAttribute("class");

        if (currentClass) {
          this.setAttribute("class", currentClass.replace(name, "").trim());
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Applies a special property with the given value.
       *
       * This property apply routine can be easily overwritten and
       * extended by sub classes to add new low level features which
       * are not easily possible using styles and attributes.
       *
       * @param name {String} Unique property identifier
       * @param value {var} Any valid value (depends on the property)
       * @return {qx.html.Element} this object (for chaining support)
       * @abstract
       */
      _applyProperty: function _applyProperty(name, value) {// empty implementation
      },

      /**
       * Set up the given property.
       *
       * @param key {String} the name of the property
       * @param value {var} the value
       * @param direct {Boolean?false} Whether the value should be applied
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      _setProperty: function _setProperty(key, value, direct) {
        if (!this.__P_209_24) {
          this.__P_209_24 = {};
        }

        if (this.__P_209_24[key] == value) {
          return this;
        }

        if (value == null) {
          delete this.__P_209_24[key];
        } else {
          this.__P_209_24[key] = value;
        } // Uncreated elements simply copy all data
        // on creation. We don't need to remember any
        // jobs. It is a simple full list copy.


        if (this.__P_209_11) {
          // Omit queuing in direct mode
          if (direct) {
            this._applyProperty(key, value);

            return this;
          } // Dynamically create if needed


          if (!this.__P_209_23) {
            this.__P_209_23 = {};
          } // Store job info


          this.__P_209_23[key] = true; // Register modification

          qx.html.Element._modified[this.toHashCode()] = this;

          qx.html.Element._scheduleFlush("element");
        }

        return this;
      },

      /**
       * Removes the given misc
       *
       * @param key {String} the name of the misc
       * @param direct {Boolean?false} Whether the value should be removed
       *    directly (without queuing)
       * @return {qx.html.Element} this object (for chaining support)
       */
      _removeProperty: function _removeProperty(key, direct) {
        return this._setProperty(key, null, direct);
      },

      /**
       * Get the value of the given misc.
       *
       * @param key {String} name of the misc
       * @return {var} the value of the misc
       */
      _getProperty: function _getProperty(key) {
        var db = this.__P_209_24;

        if (!db) {
          return null;
        }

        var value = db[key];
        return value == null ? null : value;
      },

      /*
      ---------------------------------------------------------------------------
        EVENT SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Adds an event listener to the element.
       *
       * @param type {String} Name of the event
       * @param listener {Function} Function to execute on event
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener. When not given, the corresponding dispatcher
       *         usually falls back to a default, which is the target
       *         by convention. Note this is not a strict requirement, i.e.
       *         custom dispatchers can follow a different strategy.
       * @param capture {Boolean ? false} Whether capturing should be enabled
       * @return {var} An opaque id, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       */
      addListener: function addListener(type, listener, self, capture) {
        if (this.$$disposed) {
          return null;
        }

        if (this.__P_209_11) {
          return qx.event.Registration.addListener(this.__P_209_11, type, listener, self, capture);
        }

        if (!this.__P_209_25) {
          this.__P_209_25 = {};
        }

        if (capture == null) {
          capture = false;
        }

        var unique = qx.event.Manager.getNextUniqueId();
        var id = type + (capture ? "|capture|" : "|bubble|") + unique;
        this.__P_209_25[id] = {
          type: type,
          listener: listener,
          self: self,
          capture: capture,
          unique: unique
        };
        return id;
      },

      /**
       * Removes an event listener from the element.
       *
       * @param type {String} Name of the event
       * @param listener {Function} Function to execute on event
       * @param self {Object} Execution context of given function
       * @param capture {Boolean ? false} Whether capturing should be enabled
       * @return {qx.html.Element} this object (for chaining support)
       */
      removeListener: function removeListener(type, listener, self, capture) {
        if (this.$$disposed) {
          return null;
        }

        if (this.__P_209_11) {
          if (listener.$$wrapped_callback && listener.$$wrapped_callback[type + this.toHashCode()]) {
            var callback = listener.$$wrapped_callback[type + this.toHashCode()];
            delete listener.$$wrapped_callback[type + this.toHashCode()];
            listener = callback;
          }

          qx.event.Registration.removeListener(this.__P_209_11, type, listener, self, capture);
        } else {
          var values = this.__P_209_25;
          var entry;

          if (capture == null) {
            capture = false;
          }

          for (var key in values) {
            entry = values[key]; // Optimized for performance: Testing references first

            if (entry.listener === listener && entry.self === self && entry.capture === capture && entry.type === type) {
              delete values[key];
              break;
            }
          }
        }

        return this;
      },

      /**
       * Removes an event listener from an event target by an id returned by
       * {@link #addListener}
       *
       * @param id {var} The id returned by {@link #addListener}
       * @return {qx.html.Element} this object (for chaining support)
       */
      removeListenerById: function removeListenerById(id) {
        if (this.$$disposed) {
          return null;
        }

        if (this.__P_209_11) {
          qx.event.Registration.removeListenerById(this.__P_209_11, id);
        } else {
          delete this.__P_209_25[id];
        }

        return this;
      },

      /**
       * Check if there are one or more listeners for an event type.
       *
       * @param type {String} name of the event type
       * @param capture {Boolean ? false} Whether to check for listeners of
       *         the bubbling or of the capturing phase.
       * @return {Boolean} Whether the object has a listener of the given type.
       */
      hasListener: function hasListener(type, capture) {
        if (this.$$disposed) {
          return false;
        }

        if (this.__P_209_11) {
          return qx.event.Registration.hasListener(this.__P_209_11, type, capture);
        }

        var values = this.__P_209_25;
        var entry;

        if (capture == null) {
          capture = false;
        }

        for (var key in values) {
          entry = values[key]; // Optimized for performance: Testing fast types first

          if (entry.capture === capture && entry.type === type) {
            return true;
          }
        }

        return false;
      },

      /**
       * Serializes and returns all event listeners attached to this element
       * @return {Map[]} an Array containing a map for each listener. The maps
       * have the following keys:
       * <ul>
       *   <li><code>type</code> (String): Event name</li>
       *   <li><code>handler</code> (Function): Callback function</li>
       *   <li><code>self</code> (Object): The callback's context</li>
       *   <li><code>capture</code> (Boolean): If <code>true</code>, the listener is
       * attached to the capturing phase</li>
       * </ul>
       */
      getListeners: function getListeners() {
        if (this.$$disposed) {
          return null;
        }

        if (this.__P_209_11) {
          return qx.event.Registration.getManager(this.__P_209_11).serializeListeners(this.__P_209_11);
        }

        var listeners = [];

        for (var id in this.__P_209_25) {
          var listenerData = this.__P_209_25[id];
          listeners.push({
            type: listenerData.type,
            handler: listenerData.listener,
            self: listenerData.self,
            capture: listenerData.capture
          });
        }

        return listeners;
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      statics.__P_209_6 = new qx.util.DeferredCall(statics.flush, statics);
    },

    /*
    *****************************************************************************
       DESTRUCT
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.toHashCode()) {
        delete qx.html.Element._modified[this.toHashCode()];
        delete qx.html.Element._scroll[this.toHashCode()];
      }

      var el = this.__P_209_11;

      if (el) {
        qx.event.Registration.getManager(el).removeAllListeners(el);
        el.$$element = "";
        delete el.$$elementObject;
        el.$$widget = "";
        delete el.$$widgetObject;
      }

      if (!qx.core.ObjectRegistry.inShutDown) {
        var parent = this.__P_209_28;

        if (parent && !parent.$$disposed) {
          parent.remove(this);
        }
      }

      this._disposeArray("__P_209_26");

      this.__P_209_2 = this.__P_209_1 = this.__P_209_25 = this.__P_209_24 = this.__P_209_22 = this.__P_209_21 = this.__P_209_23 = this.__P_209_11 = this.__P_209_28 = this.__P_209_16 = this.__P_209_17 = null;
    }
  });
  qx.html.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1612691015665