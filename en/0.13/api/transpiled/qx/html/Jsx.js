function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.data.Array": {},
      "qx.lang.Type": {},
      "qx.html.Text": {},
      "qx.html.JsxRef": {},
      "qx.log.Logger": {},
      "qx.html.Factory": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019 Zenesis Ltd http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (https://github.com/johnspackman)
       * Will Johnson (WillsterJohnson)
       * Alexander Lopez (https://github.com/alecsgone)
  
     This class includes work from on https://github.com/alecsgone/jsx-render; at the time of writing,
     the https://github.com/alecsgone/jsx-render repo is available under an MIT license.
  
  ************************************************************************ */

  /**
   * This class includes work from on https://github.com/alecsgone/jsx-render; at the time of writing,
   * the https://github.com/alecsgone/jsx-render repo is available under an MIT license.
   */
  qx.Class.define("qx.html.Jsx", {
    extend: qx.core.Object,
    statics: {
      /**
       * Creates an element.
       *
       * Fragments are supported if the tagname is `qx.html.Jsx.FRAGMENT`; but in this case,
       * an `qx.data.Array` is returned.
       *
       * Custom tags are supported, the attributes will be passed to the function as a single object. Example;
       * ```jsx
       * const CustomTag = (attrs, children) => <div id={attrs.id}>{children}</div>;
       *
       * const myElem = (
       *   <CustomTag id="myId">
       *     <span>My content</span>
       *   </CustomTag>
       * );
       * ```
       *
       * @param tagname {String|Function} the name of the tag
       * @param attributes {Record<string, any>} map of attribute values
       * @param children {qx.html.Node[]} array of children
       * @return {qx.html.Element|qx.data.Array}
       */
      createElement: function createElement(tagname, attributes) {
        var _attributes;
        var children = qx.lang.Array.fromArguments(arguments, 2);
        (_attributes = attributes) !== null && _attributes !== void 0 ? _attributes : attributes = {};

        // CSS CUSTOM PROPERTIES
        var cssCustomProperties = {};
        for (var key in attributes) {
          if (key.startsWith("__")) {
            cssCustomProperties[key.replace(/^__/, "--")] = attributes[key];
            delete attributes[key];
          }
        }

        // ANONYMOUS FRAGMENT
        if (tagname == qx.html.Jsx.FRAGMENT) {
          var arr = new qx.data.Array();
          var _addChildrenFragment = function addChildrenFragment(children) {
            var _iterator = _createForOfIteratorHelper(children),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var child = _step.value;
                if (child instanceof qx.data.Array || qx.lang.Type.isArray(child)) {
                  _addChildrenFragment(child);
                } else {
                  arr.push(child);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          };
          _addChildrenFragment(children);
          return arr;
        }

        // CUSTOM ELEMENT
        if (typeof tagname === "function") {
          var _attributes2;
          // handle constructors and plain functions
          var _element = qx.Class.isClass(tagname) ? new tagname(attributes) : tagname(attributes);
          for (var _key in cssCustomProperties) {
            _element.setStyle(_key, cssCustomProperties[_key], true);
          }
          _element.setIsCustomElement(true);
          if (children) {
            var _injectChildren = function injectChildren(children) {
              var _iterator2 = _createForOfIteratorHelper(children),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var child = _step2.value;
                  if (child instanceof qx.data.Array || qx.lang.Type.isArray(child)) {
                    _injectChildren(child);
                  } else if (typeof child == "string") {
                    _element.inject(new qx.html.Text(child));
                  } else if (typeof child == "number") {
                    _element.inject(new qx.html.Text("" + child));
                  } else {
                    _element.inject(child);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            };
            _injectChildren(children);
          }
          if ((_attributes2 = attributes) !== null && _attributes2 !== void 0 && _attributes2.slot) {
            _element.setAttributes({
              slot: attributes.slot
            });
          }
          return _element;
        }
        var newAttrs = {};
        var eventHandlers = {};
        var innerHtml = null;
        var refs = [];
        if (attributes) {
          var reactWorkaroundProps = ["className", "htmlFor", "xlinkHref"];
          var alt = {
            className: "class",
            htmlFor: "for",
            xlinkHref: "xlink:href"
          };
          for (var _key2 in attributes) {
            var prop = _key2;
            if (reactWorkaroundProps.includes(prop)) {
              attributes[alt[prop]] = attributes[prop];
              prop = alt[prop];
            }
            if (prop === "ref") {
              if (attributes.ref instanceof qx.html.JsxRef || typeof attributes.ref === "function") {
                refs.push(attributes.ref);
              } else {
                qx.log.Logger.warn("Unsupported type of \"ref\" argument: ".concat(_typeof(attributes.ref)));
              }
            } else if (prop === "dangerouslySetInnerHTML") {
              // eslint-disable-next-line no-underscore-dangle
              innerHtml = attributes[prop].__P_250_0;
            } else if (qx.html.Jsx.SYNTHETIC_EVENTS[prop]) {
              var eventName = prop.replace(/^on/, "").toLowerCase();
              eventHandlers[eventName] = attributes[prop];
            } else {
              // any other prop will be set as attribute
              newAttrs[prop] = attributes[prop];
            }
          }
        }
        var element;
        if (tagname.startsWith("qx:")) {
          switch (tagname) {
            // TODO: add this in future - an enhanced fragment enabling features like slot targeting
            // case "qx:fragment": {}

            // TODO: add this in future - children of this element are added to the document head,
            // eg to dynamically include assets without dirtying the DOM
            // case "qx:head": {}

            // anything we want!
            // case "qx:...": {}
            default:
              {
                throw new Error("Unknown QX NameSpace tag: ".concat(tagname, ". The qx:* namespace is reserved for internally defined tags with special behaviors."));
              }
          }
        }
        // MAYBE: add a custom registry like the above qx:*, but for user-defined behaviors
        else {
          element = qx.html.Factory.getInstance().createElement(tagname, newAttrs);
        }

        // SLOT
        if (tagname === "slot") {
          if (children) {
            var _addDefaultChildren = function addDefaultChildren(children) {
              var _iterator3 = _createForOfIteratorHelper(children),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var child = _step3.value;
                  if (child instanceof qx.data.Array || qx.lang.Type.isArray(child)) {
                    _addDefaultChildren(child);
                  } else if (typeof child == "string") {
                    element.addDefaultChild(new qx.html.Text(child));
                  } else if (typeof child == "number") {
                    element.addDefaultChild(new qx.html.Text("" + child));
                  } else {
                    element.addDefaultChild(child);
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            };
            _addDefaultChildren(children);
            element.sealDefaultChildren();
          }
          return element;
        }
        if (children) {
          var _addChildren = function addChildren(children) {
            var _iterator4 = _createForOfIteratorHelper(children),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var child = _step4.value;
                if (child instanceof qx.data.Array || qx.lang.Type.isArray(child)) {
                  _addChildren(child);
                } else if (typeof child == "string") {
                  element.add(new qx.html.Text(child));
                } else if (typeof child == "number") {
                  element.add(new qx.html.Text("" + child));
                } else {
                  element.add(child);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          };
          _addChildren(children);
        }
        if (innerHtml) {
          element.setProperty("innerHtml", innerHtml);
        }
        for (var _eventName in eventHandlers) {
          element.addListener(_eventName, eventHandlers[_eventName]);
        }
        for (var _i = 0, _refs = refs; _i < _refs.length; _i++) {
          var ref = _refs[_i];
          if (ref instanceof qx.html.JsxRef) {
            ref.setValue(element);
          } else {
            ref(element, attributes);
          }
        }
        return element;
      },
      /** @deprecated Use {@link qx.html.Jsx.SYNTHETIC_EVENTS} instead */
      SYNTETIC_EVENTS: null,
      /** @type {Map} map of event names, all values are `true` */
      SYNTHETIC_EVENTS: null,
      /** @type {string} tagname for anonymous (native) fragments */
      FRAGMENT: "qx.html.Jsx.FRAGMENT"
    },
    defer: function defer(statics) {
      var MOUSE_EVENTS = ["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp"];
      var TOUCH_EVENTS = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
      var KEYBOARD_EVENTS = ["onKeyDown", "onKeyPress", "onKeyUp"];
      var FOCUS_EVENTS = ["onFocus", "onBlur"];
      var FORM_EVENTS = ["onChange", "onInput", "onInvalid", "onSubmit"];
      var UI_EVENTS = ["onScroll"];
      var IMAGE_EVENTS = ["onLoad", "onError"];
      var syntheticEvents = [MOUSE_EVENTS, TOUCH_EVENTS, KEYBOARD_EVENTS, FOCUS_EVENTS, FORM_EVENTS, UI_EVENTS, IMAGE_EVENTS];
      var SYNTHETIC_EVENTS = {};
      for (var _i2 = 0, _syntheticEvents = syntheticEvents; _i2 < _syntheticEvents.length; _i2++) {
        var arr = _syntheticEvents[_i2];
        var _iterator5 = _createForOfIteratorHelper(arr),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var key = _step5.value;
            SYNTHETIC_EVENTS[key] = true;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      qx.html.Jsx.SYNTHETIC_EVENTS = SYNTHETIC_EVENTS;
      /* deprecated: misspelled */
      qx.html.Jsx.SYNTETIC_EVENTS = SYNTHETIC_EVENTS;
    }
  });
  qx.html.Jsx.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsx.js.map?dt=1735341771932