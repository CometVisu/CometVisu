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
      "qx.html.Node": {
        "construct": true,
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
      "qx.event.Registration": {},
      "qx.event.handler.Focus": {},
      "qx.event.dispatch.MouseCapture": {},
      "qx.dom.Element": {},
      "qx.bom.element.Attribute": {},
      "qx.lang.Object": {},
      "qx.bom.element.Style": {},
      "qx.lang.Array": {},
      "qx.core.Id": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.html.Text": {},
      "qx.bom.element.Location": {},
      "qx.bom.element.Dimension": {},
      "qx.util.DeferredCall": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
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
    extend: qx.html.Node,
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
      qx.html.Node.constructor.call(this, tagName || "div");
      this.__P_236_0 = styles || null;
      this.__P_236_1 = attributes || null;
      if (attributes) {
        for (var key in attributes) {
          if (!key) {
            throw new Error("Invalid unnamed attribute in " + this.classname);
          }
        }
      }
      this.initCssClass();
      this.registerProperty("innerHtml", null, function (value) {
        if (this._domNode) {
          this._domNode.innerHTML = value;
        }
      }, function (writer, property, name) {
        if (property.value) {
          writer(property.value);
        }
      });
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
      /** @type {Integer} number of roots */
      _hasRoots: 0,
      /** @type {Element} the default root to use */
      _defaultRoot: null,
      /** @type {Map} Contains the modified {@link qx.html.Element}s. The key is the hash code. */
      _modified: {},
      /** @type {Map} Contains the {@link qx.html.Element}s which should get hidden or visible at the next flush. The key is the hash code. */
      _visibility: {},
      /** @type {Map} Contains the {@link qx.html.Element}s which should scrolled at the next flush */
      _scroll: {},
      /** @type {Array} List of post actions for elements. The key is the action name. The value the {@link qx.html.Element}. */
      _actions: [],
      /**  @type {Map} List of all selections. */
      __P_236_2: {},
      __P_236_3: null,
      __P_236_4: null,
      __P_236_5: null,
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
        qx.html.Element.__P_236_6.schedule();
      },
      /**
       * Flush the global modified list
       */
      flush: function flush() {
        var obj;
        {
          // blur elements, which will be removed
          var focusHandler = this.__P_236_7();
          var focusedDomElement = focusHandler.getFocus();
          if (focusedDomElement && this.__P_236_8(focusedDomElement)) {
            focusHandler.blur(focusedDomElement);
          }

          // deactivate elements, which will be removed
          var activeDomElement = focusHandler.getActive();
          if (activeDomElement && this.__P_236_8(activeDomElement)) {
            qx.bom.Element.deactivate(activeDomElement);
          }

          // release capture for elements, which will be removed
          var captureDomElement = this.__P_236_9();
          if (captureDomElement && this.__P_236_8(captureDomElement)) {
            qx.bom.Element.releaseCapture(captureDomElement);
          }
        }
        var later = [];
        var modified = qx.html.Element._modified;
        for (var hc in modified) {
          obj = modified[hc];
          // Ignore all hidden elements except iframes
          // but keep them until they get visible (again)
          if (obj._willBeSeeable() || obj.classname == "qx.html.Iframe") {
            // Separately queue rendered elements
            if (obj._domNode && qx.dom.Hierarchy.isRendered(obj._domNode)) {
              later.push(obj);
            }

            // Flush invisible elements first
            else {
              obj.flush();
            }

            // Cleanup modification list
            delete modified[hc];
          }
        }
        for (var i = 0, l = later.length; i < l; i++) {
          obj = later[i];
          obj.flush();
        }

        // Process visibility list
        var visibility = this._visibility;
        for (var hc in visibility) {
          obj = visibility[hc];
          var element = obj._domNode;
          if (!element) {
            delete visibility[hc];
            continue;
          }
          // hiding or showing an object and deleting it right after that may
          // cause an disposed object in the visibility queue [BUG #3607]
          if (!obj.$$disposed) {
            element.style.display = obj.isVisible() ? "" : "none";
            // also hide the element (fixed some rendering problem in IE<8 & IE8 quirks)
            if (qx.core.Environment.get("engine.name") == "mshtml") {
              if (!(document.documentMode >= 8)) {
                element.style.visibility = obj.isVisible() ? "visible" : "hidden";
              }
            }
          }
          delete visibility[hc];
        }
        {
          // Process scroll list
          var scroll = this._scroll;
          for (var hc in scroll) {
            obj = scroll[hc];
            var elem = obj._domNode;
            if (elem && elem.offsetWidth) {
              var done = true;

              // ScrollToX
              if (obj.__P_236_10 != null) {
                obj._domNode.scrollLeft = obj.__P_236_10;
                delete obj.__P_236_10;
              }

              // ScrollToY
              if (obj.__P_236_11 != null) {
                obj._domNode.scrollTop = obj.__P_236_11;
                delete obj.__P_236_11;
              }

              // ScrollIntoViewX
              var intoViewX = obj.__P_236_12;
              if (intoViewX != null) {
                var child = intoViewX.element.getDomElement();
                if (child && child.offsetWidth) {
                  qx.bom.element.Scroll.intoViewX(child, elem, intoViewX.align);
                  delete obj.__P_236_12;
                } else {
                  done = false;
                }
              }

              // ScrollIntoViewY
              var intoViewY = obj.__P_236_13;
              if (intoViewY != null) {
                var child = intoViewY.element.getDomElement();
                if (child && child.offsetWidth) {
                  qx.bom.element.Scroll.intoViewY(child, elem, intoViewY.align);
                  delete obj.__P_236_13;
                } else {
                  done = false;
                }
              }

              // Clear flag if all things are done
              // Otherwise wait for the next flush
              if (done) {
                delete scroll[hc];
              }
            }
          }
          var activityEndActions = {
            releaseCapture: 1,
            blur: 1,
            deactivate: 1
          };

          // Process action list
          for (var i = 0; i < this._actions.length; i++) {
            var action = this._actions[i];
            var element = action.element._domNode;
            if (!element || !activityEndActions[action.type] && !action.element._willBeSeeable()) {
              continue;
            }
            var args = action.args;
            args.unshift(element);
            qx.bom.Element[action.type].apply(qx.bom.Element, args);
          }
          this._actions = [];
        }

        // Process selection
        for (var hc in this.__P_236_2) {
          var selection = this.__P_236_2[hc];
          var elem = selection.element._domNode;
          if (elem) {
            qx.bom.Selection.set(elem, selection.start, selection.end);
            delete this.__P_236_2[hc];
          }
        }

        // Fire appear/disappear events
        qx.event.handler.Appear.refresh();
      },
      /**
       * Get the focus handler
       *
       * @return {qx.event.handler.Focus} The focus handler
       */
      __P_236_7: function __P_236_7() {
        {
          if (!this.__P_236_3) {
            var eventManager = qx.event.Registration.getManager(window);
            this.__P_236_3 = eventManager.getHandler(qx.event.handler.Focus);
          }
          return this.__P_236_3;
        }
      },
      /**
       * Get the mouse capture element
       *
       * @return {Element} The mouse capture DOM element
       */
      __P_236_9: function __P_236_9() {
        {
          if (!this.__P_236_4) {
            var eventManager = qx.event.Registration.getManager(window);
            this.__P_236_4 = eventManager.getDispatcher(qx.event.dispatch.MouseCapture);
          }
          return this.__P_236_4.getCaptureElement();
        }
      },
      /**
       * Whether the given DOM element will become invisible after the flush
       *
       * @param domElement {Element} The DOM element to check
       * @return {Boolean} Whether the element will become invisible
       */
      __P_236_8: function __P_236_8(domElement) {
        var element = this.fromDomElement(domElement);
        return element && !element._willBeSeeable();
      },
      /**
       * Finds the Widget for a given DOM element
       *
       * @param domElement {DOM} the DOM element
       * @return {qx.ui.core.Widget} the Widget that created the DOM element
       * @deprecated {6.1} see qx.html.Node.fromDomNode
       */
      fromDomElement: function fromDomElement(domElement) {
        return qx.html.Node.fromDomNode(domElement);
      },
      /**
       * Sets the default Root element
       *
       * @param root {Element} the new default root
       */
      setDefaultRoot: function setDefaultRoot(root) {
        this._defaultRoot = root;
      },
      /**
       * Returns the default root
       *
       * @return {Element} the default root
       */
      getDefaultRoot: function getDefaultRoot() {
        return this._defaultRoot;
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * @type{String} The primary CSS class for this element
       *
       * The implementation will add and remove this class from the list of classes,
       * this property is provided as a means to easily set the primary class.  Because
       * SCSS supports inheritance, it's more useful to be able to allow the SCSS
       * definition to control the inheritance hierarchy of classes.
       *
       * For example, a dialog could be implemented in code as a Dialog class derived from
       * a Window class, but the presentation may be so different that the theme author
       * would choose to not use inheritance at all.
       */
      cssClass: {
        init: null,
        nullable: true,
        check: "String",
        apply: "_applyCssClass"
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

      /** @type {Boolean} Marker for always visible root nodes (often the body node) */
      __P_236_14: false,
      __P_236_12: null,
      __P_236_13: null,
      __P_236_10: null,
      __P_236_11: null,
      __P_236_15: null,
      __P_236_16: null,
      __P_236_0: null,
      __P_236_1: null,
      /*
       * @Override
       */
      _createDomElement: function _createDomElement() {
        return qx.dom.Element.create(this._nodeName);
      },
      /*
       * @Override
       */
      serialize: function serialize(writer) {
        if (this.__P_236_17) {
          this.importQxObjectIds();
          this.__P_236_17 = false;
        }
        return qx.html.Element.superclass.prototype.serialize.call(this, writer);
      },
      /*
       * @Override
       */
      _serializeImpl: function _serializeImpl(writer) {
        writer("<", this._nodeName);

        // Copy attributes
        var data = this.__P_236_1;
        if (data) {
          var Attribute = qx.bom.element.Attribute;
          for (var key in data) {
            writer(" ");
            Attribute.serialize(writer, key, data[key]);
          }
        }

        // Copy styles
        var data = this.__P_236_0 || {};
        if (!this.isVisible()) {
          data = qx.lang.Object.clone(data);
          data.display = "none";
        }
        if (Object.keys(data).length) {
          var Style = qx.bom.element.Style;
          var css = Style.compile(data);
          if (css) {
            writer(' style="', css, '"');
          }
        }

        // Copy properties
        var data = this._properties;
        if (data) {
          for (var key in this._properties) {
            var property = this._properties[key];
            if (property.serialize) {
              writer(" ");
              property.serialize.call(this, writer, key, property);
            } else if (property.value !== undefined && property.value !== null) {
              writer(" ");
              var value = JSON.stringify(property.value);
              writer(key, "=", value);
            }
          }
        }

        // Children
        if (!this._children || !this._children.length) {
          if (qx.html.Element.__P_236_5[this._nodeName]) {
            writer(">");
          } else {
            writer("></", this._nodeName, ">");
          }
        } else {
          writer(">");
          for (var i = 0; i < this._children.length; i++) {
            this._children[i]._serializeImpl(writer);
          }
          writer("</", this._nodeName, ">");
        }
      },
      /**
       * Connects a widget to this element, and to the DOM element in this Element.  They
       * remain associated until disposed or disconnectWidget is called
       *
       * @param widget {qx.ui.core.Widget} the widget to associate
       * @deprecated {6.1} see connectObject
       */
      connectWidget: function connectWidget(widget) {
        return this.connectObject(widget);
      },
      /**
       * Disconnects a widget from this element and the DOM element.  The DOM element remains
       * untouched, except that it can no longer be used to find the Widget.
       *
       * @param qxObject {qx.core.Object} the Widget
       * @deprecated {6.1} see disconnectObject
       */
      disconnectWidget: function disconnectWidget(widget) {
        return this.disconnectObject(widget);
      },
      /*
       * @Override
       */
      _addChildImpl: function _addChildImpl(child) {
        qx.html.Element.superclass.prototype._addChildImpl.call(this, child);
        this.__P_236_17 = true;
      },
      /*
       * @Override
       */
      _removeChildImpl: function _removeChildImpl(child) {
        qx.html.Element.superclass.prototype._removeChildImpl.call(this, child);
        this.__P_236_17 = true;
      },
      /*
       * @Override
       */
      getQxObject: function getQxObject(id) {
        if (this.__P_236_17) {
          this.importQxObjectIds();
          this.__P_236_17 = false;
        }
        return qx.html.Element.superclass.prototype.getQxObject.call(this, id);
      },
      /**
       * When a tree of virtual dom is loaded via JSX code, the paths in the `data-qx-object-id`
       * attribute are relative to the JSX, and these attribuite values need to be loaded into the
       * `qxObjectId` property - while resolving the parent parts of the path.
       *
       * EG
       *  <div data-qx-object-id="root">
       *    <div>
       *      <div data-qx-object-id="root/child">
       *
       * The root DIV has to take on the qxObjectId of "root", and the third DIV has to have the
       * ID "child" and be owned by the first DIV.
       *
       * This function imports and resolves those IDs
       */
      importQxObjectIds: function importQxObjectIds() {
        var _this = this;
        var thisId = this.getQxObjectId();
        var thisAttributeId = this.getAttribute("data-qx-object-id");
        if (thisId) {
          this.setAttribute("data-qx-object-id", thisId, true);
        } else if (thisAttributeId) {
          this.setQxObjectId(thisAttributeId);
        }
        var resolveImpl = function resolveImpl(node) {
          if (!(node instanceof qx.html.Element)) {
            return;
          }
          var id = node.getQxObjectId();
          var attributeId = node.getAttribute("data-qx-object-id");
          if (id) {
            if (attributeId && !attributeId.endsWith(id)) {
              _this.warn("Attribute ID ".concat(attributeId, " is not compatible with the qxObjectId ").concat(id, "; the qxObjectId will take prescedence"));
            }
            node.setAttribute("data-qx-object-id", id, true);
          } else if (attributeId) {
            var segs = attributeId ? attributeId.split("/") : [];

            // Only one segment is easy, add directly to the parent
            if (segs.length == 1) {
              var parentNode = _this;
              parentNode.addOwnedQxObject(node, attributeId);

              // Lots of segments
            } else if (segs.length > 1) {
              var _parentNode = null;

              // If the first segment is the outer parent
              if (segs[0] == thisAttributeId || segs[0] == thisId) {
                // Only two segments, means that the parent is the outer and the last segment
                //  is the ID of the node being examined
                if (segs.length == 2) {
                  _parentNode = _this;

                  // Otherwise resolve it further
                } else {
                  // Extract the segments, exclude the first and last, and that leaves us with a relative ID path
                  var subId = qx.lang.Array.clone(segs);
                  subId.shift();
                  subId.pop();
                  subId = subId.join("/");
                  _parentNode = _this.getQxObject(subId);
                }

                // Not the outer node, then resolve as a global.
              } else {
                _parentNode = qx.core.Id.getQxObject(attributeId);
              }
              if (!_parentNode) {
                throw new Error("Cannot resolve object id ancestors, id=".concat(attributeId));
              }
              _parentNode.addOwnedQxObject(node, segs[segs.length - 1]);
            }
          }
          var children = node.getChildren();
          if (children) {
            children.forEach(resolveImpl);
          }
        };
        var children = this.getChildren();
        if (children) {
          children.forEach(resolveImpl);
        }
      },
      /*
      ---------------------------------------------------------------------------
        SUPPORT FOR ATTRIBUTE/STYLE/EVENT FLUSH
      ---------------------------------------------------------------------------
      */
      /**
       * Copies data between the internal representation and the DOM. This
       * simply copies all the data and only works well directly after
       * element creation. After this the data must be synced using {@link #_syncData}
       *
       * @param fromMarkup {Boolean} Whether the copy should respect styles
       *   given from markup
       */
      _copyData: function _copyData(fromMarkup, propertiesFromDom) {
        qx.html.Element.superclass.prototype._copyData.call(this, fromMarkup, propertiesFromDom);
        var elem = this._domNode;

        // Copy attributes
        var data = this.__P_236_1;
        if (data) {
          var Attribute = qx.bom.element.Attribute;
          if (fromMarkup) {
            var str;
            var classes = {};
            str = this.getAttribute("class");
            (str ? str.split(" ") : []).forEach(function (name) {
              if (name.startsWith("qx-")) {
                classes[name] = true;
              }
            });
            str = Attribute.get(elem, "class");
            {
              if (str instanceof window.SVGAnimatedString) {
                str = str.baseVal;
              }
            }
            (str ? str.split(" ") : []).forEach(function (name) {
              return classes[name] = true;
            });
            classes = Object.keys(classes);
            var segs = classes;
            if (segs.length) {
              this.setCssClass(segs[0]);
              this.setAttribute("class", classes.join(" "));
            } else {
              this.setCssClass(null);
              this.setAttribute("class", null);
            }
          }
          for (var key in data) {
            Attribute.set(elem, key, data[key]);
          }
        }

        // Copy styles
        var data = this.__P_236_0;
        if (data) {
          var Style = qx.bom.element.Style;
          if (fromMarkup) {
            Style.setStyles(elem, data);
          } else {
            // Set styles at once which is a lot faster in most browsers
            // compared to separate modifications of many single style properties.
            Style.setCss(elem, Style.compile(data));
          }
        }

        // Copy visibility
        if (!fromMarkup) {
          var display = elem.style.display || "";
          if (display == "" && !this.isVisible()) {
            elem.style.display = "none";
          } else if (display == "none" && this.isVisible()) {
            elem.style.display = "";
          }
        } else {
          var display = elem.style.display || "";
          this.setVisible(display != "none");
        }
      },
      /**
       * Synchronizes data between the internal representation and the DOM. This
       * is the counterpart of {@link #_copyData} and is used for further updates
       * after the element has been created.
       *
       */
      _syncData: function _syncData() {
        qx.html.Element.superclass.prototype._syncData.call(this);
        var elem = this._domNode;
        var Attribute = qx.bom.element.Attribute;
        var Style = qx.bom.element.Style;

        // Sync attributes
        var jobs = this.__P_236_16;
        if (jobs) {
          var data = this.__P_236_1;
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
          this.__P_236_16 = null;
        }

        // Sync styles
        var jobs = this.__P_236_15;
        if (jobs) {
          var data = this.__P_236_0;
          if (data) {
            var styles = {};
            for (var key in jobs) {
              styles[key] = data[key];
            }
            Style.setStyles(elem, styles);
          }
          this.__P_236_15 = null;
        }
      },
      /*
      ---------------------------------------------------------------------------
        DOM ELEMENT ACCESS
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the element's root flag, which indicates
       * whether the element should be a root element or not.
       * @param root {Boolean} The root flag.
       */
      setRoot: function setRoot(root) {
        if (root && !this.__P_236_14) {
          qx.html.Element._hasRoots++;
        } else if (!root && this.__P_236_14) {
          qx.html.Element._hasRoots--;
        }
        this.__P_236_14 = root;
      },
      /*
       * @Override
       */
      isRoot: function isRoot() {
        return this.__P_236_14;
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
        if (this._domNode) {
          throw new Error("Could not overwrite existing element!");
        }

        // Prepare extraction
        // We have a IE specific issue with "Unknown error" messages
        // when we try to use the same DOM node again. I am not sure
        // why this happens. Would be a good performance improvement,
        // but does not seem to work.
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          var helper = document.createElement("div");
        } else {
          var helper = qx.dom.Element.getHelperElement();
        }

        // Extract first element
        helper.innerHTML = html;
        this.useElement(helper.firstChild);
        return this._domNode;
      },
      /**
       * Uses an existing element instead of creating one. This may be interesting
       * when the DOM element is directly needed to add content etc.
       *
       * @param elem {Element} Element to reuse
       * @deprecated {6.1} see useNode
       */
      useElement: function useElement(elem) {
        this.useNode(elem);
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
        if (tabIndex >= 0 && focusable[this._nodeName]) {
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
        return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this._nodeName];
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
        var col = qxWeb(this._domNode);
        if (col.isPlaying()) {
          col.stop();
        }
        // create the element right away
        if (!this._domNode) {
          this.flush();
          col.push(this._domNode);
        }
        if (this._domNode) {
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
        var col = qxWeb(this._domNode);
        if (col.isPlaying()) {
          col.stop();
        }
        if (this._domNode) {
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
      /*
       * @Override
       */
      _applyVisible: function _applyVisible(value, oldValue) {
        qx.html.Element.superclass.prototype._applyVisible.call(this, value, oldValue);
        if (value) {
          if (this._domNode) {
            qx.html.Element._visibility[this.toHashCode()] = this;
            qx.html.Element._scheduleFlush("element");
          }

          // Must be sure that the element gets included into the DOM.
          if (this._parent) {
            this._parent._scheduleChildrenUpdate();
          }
        } else {
          if (this._domNode) {
            qx.html.Element._visibility[this.toHashCode()] = this;
            qx.html.Element._scheduleFlush("element");
          }
        }
      },
      /**
       * Marks the element as visible which means that a previously applied
       * CSS style of display=none gets removed and the element will inserted
       * into the DOM, when this had not already happened before.
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      show: function show() {
        this.setVisible(true);
        return this;
      },
      /**
       * Marks the element as hidden which means it will kept in DOM (if it
       * is already there, but configured hidden using a CSS style of display=none).
       *
       * @return {qx.html.Element} this object (for chaining support)
       */
      hide: function hide() {
        this.setVisible(false);
        return this;
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
        var thisEl = this._domNode;
        var childEl = elem.getDomElement();
        if (direct !== false && thisEl && thisEl.offsetWidth && childEl && childEl.offsetWidth) {
          qx.bom.element.Scroll.intoViewX(childEl, thisEl, align);
        } else {
          this.__P_236_12 = {
            element: elem,
            align: align
          };
          qx.html.Element._scroll[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        }
        delete this.__P_236_10;
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
        var thisEl = this._domNode;
        var childEl = elem.getDomElement();
        if (direct !== false && thisEl && thisEl.offsetWidth && childEl && childEl.offsetWidth) {
          qx.bom.element.Scroll.intoViewY(childEl, thisEl, align);
        } else {
          this.__P_236_13 = {
            element: elem,
            align: align
          };
          qx.html.Element._scroll[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        }
        delete this.__P_236_11;
      },
      /**
       * Scrolls the element to the given left position.
       *
       * @param x {Integer} Horizontal scroll position
       * @param lazy {Boolean?false} Whether the scrolling should be performed
       *    during element flush.
       */
      scrollToX: function scrollToX(x, lazy) {
        var thisEl = this._domNode;
        if (lazy !== true && thisEl && thisEl.offsetWidth) {
          thisEl.scrollLeft = x;
          delete this.__P_236_10;
        } else {
          this.__P_236_10 = x;
          qx.html.Element._scroll[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        }
        delete this.__P_236_12;
      },
      /**
       * Get the horizontal scroll position.
       *
       * @return {Integer} Horizontal scroll position
       */
      getScrollX: function getScrollX() {
        var thisEl = this._domNode;
        if (thisEl) {
          return thisEl.scrollLeft;
        }
        return this.__P_236_10 || 0;
      },
      /**
       * Scrolls the element to the given top position.
       *
       * @param y {Integer} Vertical scroll position
       * @param lazy {Boolean?false} Whether the scrolling should be performed
       *    during element flush.
       */
      scrollToY: function scrollToY(y, lazy) {
        var thisEl = this._domNode;
        if (lazy !== true && thisEl && thisEl.offsetWidth) {
          thisEl.scrollTop = y;
          delete this.__P_236_11;
        } else {
          this.__P_236_11 = y;
          qx.html.Element._scroll[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        }
        delete this.__P_236_13;
      },
      /**
       * Get the vertical scroll position.
       *
       * @return {Integer} Vertical scroll position
       */
      getScrollY: function getScrollY() {
        var thisEl = this._domNode;
        if (thisEl) {
          return thisEl.scrollTop;
        }
        return this.__P_236_11 || 0;
      },
      /**
       * Disables browser-native scrolling
       */
      disableScrolling: function disableScrolling() {
        this.enableScrolling();
        this.scrollToX(0);
        this.scrollToY(0);
        this.addListener("scroll", this.__P_236_18, this);
      },
      /**
       * Re-enables browser-native scrolling
       */
      enableScrolling: function enableScrolling() {
        this.removeListener("scroll", this.__P_236_18, this);
      },
      __P_236_19: null,
      /**
       * Handler for the scroll-event
       *
       * @param e {qx.event.type.Native} scroll-event
       */
      __P_236_18: function __P_236_18(e) {
        if (!this.__P_236_19) {
          this.__P_236_19 = true;
          this._domNode.scrollTop = 0;
          this._domNode.scrollLeft = 0;
          delete this.__P_236_19;
        }
      },
      /*
      ---------------------------------------------------------------------------
        TEXT SUPPORT
      ---------------------------------------------------------------------------
      */
      /*
       * Sets the text value of this element; it will delete children first, except
       * for the first node which (if it is a Text node) will have it's value updated
       *
       * @param value {String} the text to set
       */
      setText: function setText(value) {
        var self = this;
        var children = this._children ? qx.lang.Array.clone(this._children) : [];
        if (children[0] instanceof qx.html.Text) {
          children[0].setText(value);
          children.shift();
          children.forEach(function (child) {
            self.remove(child);
          });
        } else {
          children.forEach(function (child) {
            self.remove(child);
          });
          this.add(new qx.html.Text(value));
        }
      },
      /**
       * Returns the text value, accumulated from all child nodes
       *
       * @return {String} the text value
       */
      getText: function getText() {
        var result = [];
        if (this._children) {
          this._children.forEach(function (child) {
            result.push(child.getText());
          });
        }
        return result.join("");
      },
      /**
       * Get the selection of the element.
       *
       * If the underlaying DOM element is not yet created, this methods returns
       * a null value.
       *
       * @return {String|null}
       */
      getTextSelection: function getTextSelection() {
        var el = this._domNode;
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
        var el = this._domNode;
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
        var el = this._domNode;
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
        var el = this._domNode;
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
        var el = this._domNode;
        if (el) {
          qx.bom.Selection.set(el, start, end);
          return;
        }

        // if element not created, save the selection for flushing
        qx.html.Element.__P_236_2[this.toHashCode()] = {
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
        var el = this._domNode;
        if (el) {
          qx.bom.Selection.clear(el);
        }
        delete qx.html.Element.__P_236_2[this.toHashCode()];
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
       * Note that "actions" are functions in `qx.bom.Element` and only apply to
       * environments with a user interface.  This will throw an error if the user
       * interface is headless
       *
       * @param action {String} action to queue
       * @param args {Array} optional list of arguments for the action
       */
      __P_236_20: function __P_236_20(action, args) {
        {
          var actions = qx.html.Element._actions;
          actions.push({
            type: action,
            element: this,
            args: args || []
          });
          qx.html.Element._scheduleFlush("element");
        }
      },
      /**
       * Focus this element.
       *
       * If the underlaying DOM element is not yet created, the
       * focus is queued for processing after the element creation.
       *
       * Silently does nothing when in a headless environment
       */
      focus: function focus() {
        {
          this.__P_236_20("focus");
        }
      },
      /**
       * Mark this element to get blurred on the next flush of the queue
       *
       * Silently does nothing when in a headless environment
       *
       */
      blur: function blur() {
        {
          this.__P_236_20("blur");
        }
      },
      /**
       * Mark this element to get activated on the next flush of the queue
       *
       * Silently does nothing when in a headless environment
       *
       */
      activate: function activate() {
        {
          this.__P_236_20("activate");
        }
      },
      /**
       * Mark this element to get deactivated on the next flush of the queue
       *
       * Silently does nothing when in a headless environment
       *
       */
      deactivate: function deactivate() {
        {
          this.__P_236_20("deactivate");
        }
      },
      /**
       * Captures all mouse events to this element
       *
       * Silently does nothing when in a headless environment
       *
       * @param containerCapture {Boolean?true} If true all events originating in
       *   the container are captured. If false events originating in the container
       *   are not captured.
       */
      capture: function capture(containerCapture) {
        {
          this.__P_236_20("capture", [containerCapture !== false]);
        }
      },
      /**
       * Releases this element from a previous {@link #capture} call
       *
       * Silently does nothing when in a headless environment
       */
      releaseCapture: function releaseCapture() {
        {
          this.__P_236_20("releaseCapture");
        }
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
        if (!this.__P_236_0) {
          this.__P_236_0 = {};
        }
        if (this.__P_236_0[key] == value) {
          return this;
        }
        this._applyStyle(key, value, this.__P_236_0[key]);
        if (value == null) {
          delete this.__P_236_0[key];
        } else {
          this.__P_236_0[key] = value;
        }

        // Uncreated elements simply copy all data
        // on creation. We don't need to remember any
        // jobs. It is a simple full list copy.
        if (this._domNode) {
          // Omit queuing in direct mode
          if (direct) {
            qx.bom.element.Style.set(this._domNode, key, value);
            return this;
          }

          // Dynamically create if needed
          if (!this.__P_236_15) {
            this.__P_236_15 = {};
          }

          // Store job info
          this.__P_236_15[key] = true;

          // Register modification
          qx.html.Element._modified[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        }
        return this;
      },
      /**
       * Called by setStyle when a value of a style changes; this is intended to be
       * overridden to allow the element to update properties etc according to the
       * style
       *
       * @param key {String} the style value
       * @param value {String?} the value to set
       * @param oldValue {String?} The previous value (not from DOM)
       */
      _applyStyle: function _applyStyle(key, value, oldValue) {
        // Nothing
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
        if (!this.__P_236_0) {
          this.__P_236_0 = {};
        }
        if (this._domNode) {
          // Dynamically create if needed
          if (!this.__P_236_15) {
            this.__P_236_15 = {};
          }
          for (var key in map) {
            var value = map[key];
            if (this.__P_236_0[key] == value) {
              continue;
            }
            this._applyStyle(key, value, this.__P_236_0[key]);
            if (value == null) {
              delete this.__P_236_0[key];
            } else {
              this.__P_236_0[key] = value;
            }

            // Omit queuing in direct mode
            if (direct) {
              Style.set(this._domNode, key, value);
              continue;
            }

            // Store job info
            this.__P_236_15[key] = true;
          }

          // Register modification
          qx.html.Element._modified[this.toHashCode()] = this;
          qx.html.Element._scheduleFlush("element");
        } else {
          for (var key in map) {
            var value = map[key];
            if (this.__P_236_0[key] == value) {
              continue;
            }
            this._applyStyle(key, value, this.__P_236_0[key]);
            if (value == null) {
              delete this.__P_236_0[key];
            } else {
              this.__P_236_0[key] = value;
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
        return this.__P_236_0 ? this.__P_236_0[key] : null;
      },
      /**
       * Returns a map of all styles. Do not modify the result map!
       *
       * @return {Map} All styles or <code>null</code> when none are configured.
       */
      getAllStyles: function getAllStyles() {
        return this.__P_236_0 || null;
      },
      /*
      ---------------------------------------------------------------------------
        CSS CLASS SUPPORT
      ---------------------------------------------------------------------------
      */
      __P_236_21: function __P_236_21() {
        var map = {};
        (this.getAttribute("class") || "").split(" ").forEach(function (name) {
          if (name) {
            map[name.toLowerCase()] = name;
          }
        });
        return map;
      },
      __P_236_22: function __P_236_22(map) {
        var primaryClass = this.getCssClass();
        var arr = [];
        if (primaryClass) {
          arr.push(primaryClass);
          delete map[primaryClass.toLowerCase()];
        }
        qx.lang.Array.append(arr, Object.values(map));
        return arr.length ? arr.join(" ") : null;
      },
      /**
       * Adds a css class to the element.
       *
       * @param name {String} Name of the CSS class.
       * @return {Element} this, for chaining
       */
      addClass: function addClass(name) {
        var _this2 = this;
        var classes = this.__P_236_21();
        var primaryClass = (this.getCssClass() || "").toLowerCase();
        name.split(" ").forEach(function (name) {
          var nameLower = name.toLowerCase();
          if (nameLower == primaryClass) {
            _this2.setCssClass(null);
          }
          classes[nameLower] = name;
        });
        this.setAttribute("class", this.__P_236_22(classes));
        return this;
      },
      /**
       * Removes a CSS class from the current element.
       *
       * @param name {String} Name of the CSS class.
       * @return {Element} this, for chaining
       */
      removeClass: function removeClass(name) {
        var _this3 = this;
        var classes = this.__P_236_21();
        var primaryClass = (this.getCssClass() || "").toLowerCase();
        name.split(" ").forEach(function (name) {
          var nameLower = name.toLowerCase();
          if (nameLower == primaryClass) {
            _this3.setCssClass(null);
          }
          delete classes[nameLower];
        });
        this.setAttribute("class", this.__P_236_22(classes));
        return this;
      },
      /**
       * Removes all CSS classed from the current element.
       */
      removeAllClasses: function removeAllClasses() {
        this.setCssClass(null);
        this.setAttribute("class", "");
      },
      /**
       * Apply method for cssClass
       */
      _applyCssClass: function _applyCssClass(value, oldValue) {
        var classes = this.__P_236_21();
        if (oldValue) {
          oldValue.split(" ").forEach(function (name) {
            return delete classes[name.toLowerCase()];
          });
        }
        if (value) {
          value.split(" ").forEach(function (name) {
            return classes[name.toLowerCase()] = name;
          });
        }
        this.setAttribute("class", this.__P_236_22(classes));
      },
      /*
      ---------------------------------------------------------------------------
        SIZE AND POSITION SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the size and position of this element; this is just a helper method that wraps
       * the calls to qx.bom.*
       *
       * Supported modes:
       *
       * * <code>margin</code>: Calculate from the margin box of the element (bigger than the visual appearance: including margins of given element)
       * * <code>box</code>: Calculates the offset box of the element (default, uses the same size as visible)
       * * <code>border</code>: Calculate the border box (useful to align to border edges of two elements).
       * * <code>scroll</code>: Calculate the scroll box (relevant for absolute positioned content).
       * * <code>padding</code>: Calculate the padding box (relevant for static/relative positioned content).
       *
       * @param mode {String} the type of size required, see above
       * @return {Object} a map, containing:
       *  left, right, top, bottom - document co-ords
       *  content - Object, containing:
       *    width, height: maximum permissible content size
       */
      getDimensions: function getDimensions(mode) {
        if (!this._domNode) {
          return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            content: {
              width: 0,
              height: 0
            }
          };
        }
        var loc = qx.bom.element.Location.get(this._domNode, mode);
        loc.content = qx.bom.element.Dimension.getContentSize(this._domNode);
        loc.width = loc.right - loc.left;
        loc.height = loc.bottom - loc.top;
        return loc;
      },
      /**
       * Detects whether the DOM Node is visible
       */
      canBeSeen: function canBeSeen() {
        if (this._domNode && this.isVisible()) {
          var rect = this._domNode.getBoundingClientRect();
          if (rect.top > 0 || rect.left > 0 || rect.width > 0 || rect.height > 0) {
            return true;
          }
        }
        return false;
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
        if (!this.__P_236_1) {
          this.__P_236_1 = {};
        }
        if (this.__P_236_1[key] == value) {
          return this;
        }
        if (value == null) {
          delete this.__P_236_1[key];
        } else {
          this.__P_236_1[key] = value;
        }
        if (key == "data-qx-object-id") {
          this.setQxObjectId(value);
        }

        // Uncreated elements simply copy all data
        // on creation. We don't need to remember any
        // jobs. It is a simple full list copy.
        if (this._domNode) {
          // Omit queuing in direct mode
          if (direct) {
            qx.bom.element.Attribute.set(this._domNode, key, value);
            return this;
          }

          // Dynamically create if needed
          if (!this.__P_236_16) {
            this.__P_236_16 = {};
          }

          // Store job info
          this.__P_236_16[key] = true;

          // Register modification
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
        return this.__P_236_1 ? this.__P_236_1[key] : null;
      }
    },
    /*
     *****************************************************************************
        DEFER
     *****************************************************************************
     */
    defer: function defer(statics) {
      statics.__P_236_6 = new qx.util.DeferredCall(statics.flush, statics);
      statics.__P_236_5 = {};
      ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].forEach(function (tagName) {
        statics.__P_236_5[tagName] = true;
      });
    },
    /*
    *****************************************************************************
       DESTRUCT
    *****************************************************************************
    */
    destruct: function destruct() {
      var hash = this.toHashCode();
      if (hash) {
        delete qx.html.Element._modified[hash];
        delete qx.html.Element._scroll[hash];
      }
      this.setRoot(false);
      this.__P_236_1 = this.__P_236_0 = this.__P_236_16 = this.__P_236_15 = this.__P_236_12 = this.__P_236_13 = null;
    }
  });
  qx.html.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1677017701903