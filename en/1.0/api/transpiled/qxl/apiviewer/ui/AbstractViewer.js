function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.embed.Html": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ObjectRegistry": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.dev.Tokenizer": {},
      "qx.util.StringBuilder": {},
      "qx.Promise": {},
      "qxl.apiviewer.LoadingIndicator": {},
      "qx.dom.Element": {},
      "qx.util.ResourceManager": {},
      "qxl.apiviewer.dao.Package": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
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
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  qx.Class.define("qxl.apiviewer.ui.AbstractViewer", {
    type: "abstract",
    extend: qx.ui.embed.Html,
    construct: function construct() {
      qx.ui.embed.Html.constructor.call(this);
      this._infoPanelHash = {};
      this._infoPanels = [];
      this.setOverflowX("auto");
      this.setOverflowY("auto");
      this.getContentElement().setStyle("-webkit-overflow-scrolling", "touch");
      this.getContentElement().setStyle("touch-action", "pan-y");
      this.getContentElement().setStyle("-ms-touch-action", "pan-y");
      this.setAppearance("detailviewer");
      this._infoPanelHash = {};
      this._infoPanels = [];
      qxl.apiviewer.ObjectRegistry.register(this);
    },
    properties: {
      /** The class to display */
      docNode: {
        init: null,
        nullable: true,
        apply: "_applyDocNode",
        async: true
      },
      /** whether to display inherited items */
      showInherited: {
        check: "Boolean",
        init: false,
        apply: "_updatePanelsWithInheritedMembers"
      },
      /** whether to display included items */
      showIncluded: {
        check: "Boolean",
        init: true,
        apply: "_updatePanelsWithInheritedMembers"
      },
      /** whether to display protected items */
      expandProperties: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display protected items */
      showProtected: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display private items */
      showPrivate: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display internal items */
      showInternal: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      }
    },
    statics: {
      /**
       * Change the target of all external links inside the given element to open in a new browser window.
       *
       * @param el {Element} Root element
       */
      fixLinks: function fixLinks(el) {
        var a = el.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
          if (typeof a[i].href == "string" && a[i].href.indexOf("http://") == 0) {
            a[i].target = "_blank";
          }
        }
      },
      highlightCode: function highlightCode(el) {
        var pres = el.getElementsByTagName("pre");
        for (var i = 0; i < pres.length; i++) {
          var element = pres[i];
          if (element.className !== "javascript") {
            continue;
          }
          if (qx.core.Environment.get("engine.name") == "mshtml") {
            // IE parser treats html added to a pre tag like normal html and removes
            // the whitespaces. To prevent this we create a wrapper element, add
            // to its innerHTML the pre tag and the javaScript code and replace the
            // existing pre element with the wrapper element.
            var preWrapper = document.createElement("div");
            var content = element.textContent || element.innerText;
            preWrapper.innerHTML = '<pre class="javascript">' + qx.dev.Tokenizer.javaScriptToHtml(content, true) + "</pre>";
            element.parentNode.replaceChild(preWrapper, element);
          } else {
            element.innerHTML = qx.dev.Tokenizer.javaScriptToHtml(element.textContent);
          }
        }
      }
    },
    events: {
      synced: "qx.event.type.Event"
    },
    members: {
      _infoPanelHash: null,
      _infoPanels: null,
      __P_823_0: false,
      _init: function _init(pkg) {
        var _this = this;
        this.__P_823_1();
        this.addListenerOnce("appear", function () {
          return _this._syncHtml();
        });
      },
      __P_823_1: function __P_823_1() {
        var html = new qx.util.StringBuilder();
        html.add('<div style="padding:24px;">');

        // Add title
        html.add("<h1></h1>");

        // Add TOC
        html.add('<div class="tocContainer"></div>');

        // Add description
        html.add("<div>", "</div>");

        // render panels
        var panels = this.getPanels();
        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];
          html.add(panel.getPanelHtml(this));
        }
        html.add("</div>");
        this.setHtml(html.get());
      },
      /**
       * Returns the HTML fragment for the title
       *
       * @abstract
       * @param classNode {qxl.apiviewer.dao.Class} the class documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getTocHtml: function _getTocHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      /**
       * Initializes the content of the embedding DIV. Will be called by the
       * HtmlEmbed element initialization routine.
       *
       */
      _syncHtml: function _syncHtml() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var oldTitleElem, element, divArr, panels, i, panel;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                oldTitleElem = _this2._titleElem;
                element = _this2.getContentElement().getDomElement().firstChild;
                divArr = element.childNodes;
                panels = _this2.getPanels();
                qxl.apiviewer.ui.AbstractViewer.fixLinks(element);
                _this2._titleElem = divArr[0];
                _this2._tocElem = divArr[1];
                _this2._classDescElem = divArr[2];
                for (i = 0; i < panels.length; i++) {
                  panel = panels[i];
                  panel.setElement(divArr[i + 3]);
                }
                if (!(oldTitleElem !== _this2._titleElem && _this2.getDocNode())) {
                  _context.n = 1;
                  break;
                }
                _context.n = 1;
                return _this2._applyDocNode(_this2.getDocNode());
              case 1:
                _this2.__P_823_0 = true;
                _this2.fireEvent("synced");
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      isValid: function isValid() {
        return this.__P_823_0;
      },
      addInfoPanel: function addInfoPanel(panel) {
        this._infoPanelHash[panel.toHashCode()] = panel;
        this._infoPanels.push(panel);
      },
      getPanels: function getPanels() {
        return this._infoPanels;
      },
      getPanelFromHashCode: function getPanelFromHashCode(hashCode) {
        return this._infoPanelHash[hashCode];
      },
      /**
       * Updates all info panels
       *
       * @return {qx.Promise}
       */
      _updatePanels: function _updatePanels() {
        var _this3 = this;
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }
        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var panels = this.getPanels();
        var all = panels.map(function (panel) {
          return panel.update(_this3, _this3.getDocNode());
        });
        return qx.Promise.all(all).then(function () {
          return qxl.apiviewer.LoadingIndicator.getInstance().hide();
        });
      },
      /**
       * Updates all info panels and TOC with items reflecting appearance/disappearance of panels
       * due to inherited members
       *
       * @return {qx.Promise}
       */
      _updatePanelsWithInheritedMembers: function _updatePanelsWithInheritedMembers() {
        var _this4 = this;
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }
        return this._updatePanels().then(function () {
          if (_this4._tocElem) {
            qx.dom.Element.empty(_this4._tocElem);
            _this4._tocElem.appendChild(_this4._getTocHtml(_this4.getDocNode()));
          }
        });
      },
      /**
       * Shows the information about a class.
       *
       * @param classNode {qxl.apiviewer.dao.Class} the doc node of the class to show.
       */
      _applyDocNode: function _applyDocNode(classNode) {
        var _this5 = this;
        if (!this._titleElem) {
          return null;
        }
        this._titleElem.innerHTML = this._getTitleHtml(classNode);
        qx.dom.Element.empty(this._tocElem);
        this._tocElem.appendChild(this._getTocHtml(classNode));
        return this._getDescriptionHtml(classNode).then(function (html) {
          _this5._classDescElem.innerHTML = html;
          qxl.apiviewer.ui.AbstractViewer.fixLinks(_this5._classDescElem);
          qxl.apiviewer.ui.AbstractViewer.highlightCode(_this5._classDescElem);

          // Refresh the info viewers
          return _this5._updatePanels();
        });
      },
      /**
       * Event handler. Called when the user tapped a button for showing/hiding the
       * body of an info panel.
       * @param panel
       * @return {qx.Promise}
       */
      togglePanelVisibility: function togglePanelVisibility(panel) {
        try {
          panel.setIsOpen(!panel.getIsOpen());
          var imgElem = panel.getTitleElement().getElementsByTagName("img")[0];
          imgElem.src = qx.util.ResourceManager.getInstance().toUri(panel.getIsOpen() ? "qxl/apiviewer/image/close.gif" : "qxl/apiviewer/image/open.gif");
          return panel.update(this, this.getDocNode());
        } catch (exc) {
          this.error("Toggling info body failed", exc);
        }
        return null;
      },
      /**
       * Sorts the nodes in place.
       *
       * @param nodeArr {qxl.apiviewer.dao.ClassItem[]} array of class items
       */
      sortItems: function sortItems(nodeArr) {
        var WEIGHT = ["qxl.apiviewer.dao.Package", "qxl.apiviewer.dao.Class"];

        // Sort the nodeArr by name
        // Move protected methods to the end
        nodeArr.sort(function (obj1, obj2) {
          if (obj1.classname != obj2.classname) {
            var w1 = WEIGHT.indexOf(obj1.classname);
            var w2 = WEIGHT.indexOf(obj2.classname);
            if (w1 < 0) {
              w1 = 999;
            }
            if (w2 < 0) {
              w2 = 999;
            }
            return w1 < w2 ? -1 : w1 > w2 ? 1 : 0;
          }
          if (obj1 instanceof qxl.apiviewer.dao.Package) {
            var n1 = obj1.getFullName().toLowerCase();
            var n2 = obj2.getFullName().toLowerCase();
            return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
          }
          var sum1 = 0;
          if (obj1.isInternal()) {
            sum1 += 4;
          }
          if (obj1.isPrivate()) {
            sum1 += 2;
          }
          if (obj1.isProtected()) {
            sum1 += 1;
          }
          var sum2 = 0;
          if (obj2.isInternal()) {
            sum2 += 4;
          }
          if (obj2.isPrivate()) {
            sum2 += 2;
          }
          if (obj2.isProtected()) {
            sum2 += 1;
          }
          if (sum1 == sum2) {
            var name1 = obj1.getName();
            var name2 = obj2.getName();
            return name1.toLowerCase() < name2.toLowerCase() ? -1 : 1;
          }
          return sum1 - sum2;
        });
      }
    }
  });
  qxl.apiviewer.ui.AbstractViewer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractViewer.js.map?dt=1782967176349