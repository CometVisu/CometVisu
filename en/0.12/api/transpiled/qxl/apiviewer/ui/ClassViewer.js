(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.event.GestureHandler": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ui.panels.ConstructorPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.EventPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.StaticMethodsPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.ConstantPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.PropertyPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.MethodPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.ChildControlsPanel": {
        "construct": true
      },
      "qx.util.ResourceManager": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qxl.apiviewer.dao.Class": {},
      "qx.util.LibraryManager": {},
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.panels.InfoPanel": {},
      "qx.dom.Element": {},
      "qx.bom.element.Class": {},
      "qx.bom.element.Scroll": {},
      "qx.bom.element.Style": {},
      "qxl.apiviewer.TreeUtil": {},
      "qx.event.Timer": {},
      "qxl.apiviewer.UiModel": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.revision": {},
        "qx.version": {},
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

  /**
   * Shows the class details.
   * @require(qx.module.event.GestureHandler)
   */
  qx.Class.define("qxl.apiviewer.ui.ClassViewer", {
    extend: qxl.apiviewer.ui.AbstractViewer,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qxl.apiviewer.ui.AbstractViewer.constructor.call(this);
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ConstructorPanel("constructor"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.EventPanel("events", true, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.StaticMethodsPanel("static methods"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ConstantPanel("constants", false, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.PropertyPanel("properties", true, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.MethodPanel("methods"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ChildControlsPanel("child controls"));
      this.getContentElement().setAttribute("class", "ClassViewer");

      this._init(null);
    },

    /*
    *****************************************************************************
     STATICS
    *****************************************************************************
    */
    statics: {
      /** {Map} The primitive types. These types will not be shown with links. */
      PRIMITIVES: {
        "var": true,
        "void": true,
        "undefined": true,
        "arguments": true,
        "null": true,
        "varargs": true,
        "Boolean": true,
        "String": true,
        "Number": true,
        "Integer": true,
        "PositiveNumber": true,
        "PositiveInteger": true,
        "Float": true,
        "Double": true,
        "Color": true,
        "Error": true,
        "RegExp": true,
        "Object": true,
        "Array": true,
        "Map": true,
        "Function": true,
        "Date": true,
        "Node": true,
        "Element": true,
        "Document": true,
        "Window": true,
        "Event": true
      },
      MDC_LINKS: {
        "Event": "https://developer.mozilla.org/en/DOM/event",
        "Window": "https://developer.mozilla.org/en/DOM/window",
        "Document": "https://developer.mozilla.org/en/DOM/document",
        "Element": "https://developer.mozilla.org/en/DOM/element",
        "Node": "https://developer.mozilla.org/en/DOM/node",
        "Date": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date",
        "Function": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function",
        "Array": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array",
        "Object": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        "Map": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        "RegExp": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp",
        "Error": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error",
        "Number": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number",
        "Boolean": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean",
        "String": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String",
        "undefined": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/undefined",
        "arguments": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/arguments",
        "Font": "https://developer.mozilla.org/en/CSS/font",
        "Color": "https://developer.mozilla.org/en/CSS/color"
      },

      /**
       * {Map} Replacement rules for placeholders in the source view URI.
       * Functions will be called with the current @link{qxl.apiviewer.dao.Node} as the
       * only parameter and must return a string.
      * */
      SOURCE_VIEW_MACROS: {
        classFilePath: function classFilePath(node) {
          var classNode = node.getClass ? node.getClass() : node;
          return classNode.getFullName().replace(/\./gi, "/") + ".js";
        },
        lineNumber: function lineNumber(node) {
          if (node.getLineNumber && typeof node.getLineNumber() == "number") {
            return String(node.getLineNumber());
          }

          return "0";
        },
        qxGitBranch: function qxGitBranch(node) {
          return qx.core.Environment.get("qx.revision") ? // e.g. "master:47ac02f"
          qx.core.Environment.get("qx.revision").split(":")[1] : qx.core.Environment.get("qx.version") ? // e.g. "2.1.2"
          "release_" + qx.core.Environment.get("qx.version").replace(/\./g, "_") : "master";
        }
      },

      /**
       * Creates the HTML showing an image. Optionally with overlays
       *
       * @param imgUrl {String|String[]} the URL of the image. May be a string or an array of
       *          strings (for overlay images).
       * @param tooltip {String} the tooltip to show.
       * @param styleAttributes {String} the style attributes to add to the image.
       * @return {String} HTML fragment for the image
       */
      createImageHtml: function createImageHtml(imgUrl, tooltip, styleAttributes) {
        if (typeof imgUrl == "string") {
          return "<img src=\"" + qx.util.ResourceManager.getInstance().toUri(imgUrl) + "\" class=\"img\"" + (styleAttributes ? " style=\"" + styleAttributes + "\"" : "") + "/>";
        }

        if (styleAttributes) {
          styleAttributes += ";vertical-align:top";
        } else {
          styleAttributes = "vertical-align:top";
        }

        return qxl.apiviewer.ui.ClassViewer.createOverlayImageHtml(18, 18, imgUrl, tooltip, styleAttributes);
      },

      /**
       * Creates HTML that shows an overlay image (several images on top of each other).
       * The resulting HTML will behave inline.
       *
       * @param width {Integer} the width of the images.
       * @param height {Integer} the height of the images.
       * @param imgUrlArr {String[]} the URLs of the images. The last image will be
       *          painted on top.
       * @param toolTip {String?null} the tooltip of the icon.
       * @param styleAttributes {String?null} custom CSS style attributes.
       * @return {String} the HTML with the overlay image.
       */
      createOverlayImageHtml: function createOverlayImageHtml(width, height, imgUrlArr, toolTip, styleAttributes) {
        var html = "";
        var style;

        if (qx.core.Environment.get("engine.name") == "webkit") {
          html = "<span style=\"display:inline;position:relative;top:-2px;width:" + width + "px;height:" + height + "px" + (styleAttributes ? ";" + styleAttributes : "") + "\">";
        } else {
          html = "<span style=\"display:inline-block;display:inline;padding-right:18px;position:relative;top:-2px;left:0;width:" + width + "px;height:" + height + "px" + (styleAttributes ? ";" + styleAttributes : "") + "\">";
        }

        if (qx.core.Environment.get("engine.name") == "webkit") {
          style = "position:absolute;top:0px;left:0px;padding-right:18px;";
        } else if (qx.core.Environment.get("engine.name") == "opera") {
          style = "margin-right:-18px;";
        } else {
          style = "position:absolute;top:0px;left:0px";
        }

        for (var i = 0; i < imgUrlArr.length; i++) {
          html += "<img";

          if (toolTip) {
            html += " title=\"" + toolTip + "\"";
          }

          html += " style=\"" + style + "\" src=\"" + qx.util.ResourceManager.getInstance().toUri(imgUrlArr[i]) + "\"/>";
        }

        html += "</span>";
        return html;
      },

      /**
       * Returns the source view URI for a doc node. This is determined by getting
       * the value for the "sourceViewUri" key from the library that contains the
       * item represented by the node. Placeholders of the form %{key} in the URI
       * are then resolved by applying the rules defined in the SOURCE_VIEW_MACROS
       * map.
       *
       * @param node {qxl.apiviewer.dao.Node} the documentation node for the title
       * @return {String|null} Source view URI or <code>null</code> if it couldn't
       * be determined
       */
      getSourceUri: function getSourceUri(node) {
        var classNode;

        if (node instanceof qxl.apiviewer.dao.Class) {
          classNode = node;
        } else {
          classNode = node.getClass();
        } // get the library's top-level namespace


        var libNs = classNode.getFullName().split(".")[0];

        if (!qx.util.LibraryManager.getInstance().has(libNs)) {
          return null;
        }

        var sourceViewUri = qx.util.LibraryManager.getInstance().get(libNs, "sourceViewUri");

        if (!sourceViewUri) {
          return null;
        }

        var replacements = this.SOURCE_VIEW_MACROS;

        for (var key in replacements) {
          var macro = "%{" + key + "}";

          if (sourceViewUri.indexOf(macro) >= 0 && typeof replacements[key] == "function") {
            var replacement = replacements[key](node);

            if (typeof replacement == "string") {
              sourceViewUri = sourceViewUri.replace(new RegExp(macro), replacement);
            }
          }
        }

        if (sourceViewUri.indexOf("%{") >= 0) {
          return null;
        }

        return sourceViewUri;
      }
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns the HTML fragment for the title
       *
       * @param classNode {qxl.apiviewer.dao.Class} the class documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        var objectName = "Class";

        switch (classNode.getType()) {
          case "mixin":
            objectName = "Mixin";
            break;

          case "interface":
            objectName = "Interface";
            break;
        }

        var titleHtml = new qx.util.StringBuilder();
        titleHtml.add("<small>", classNode.getPackageName(), "</small>");
        titleHtml.add("<span class=\"type\">");

        if (classNode.isAbstract()) {
          titleHtml.add("Abstract ");
        } else if (classNode.isStatic()) {
          titleHtml.add("Static ");
        } else if (classNode.isSingleton()) {
          titleHtml.add("Singleton ");
        }

        titleHtml.add(objectName, " </span>");
        var className = classNode.getName();
        var sourceUri = qxl.apiviewer.ui.ClassViewer.getSourceUri(classNode);

        if (sourceUri) {
          className = "<a href=\"" + sourceUri + "\" target=\"_blank\" title=\"View Source\">" + className + "</a>";
        }

        titleHtml.add(qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(classNode, className));
        return titleHtml.get();
      },
      _getTocHtml: function _getTocHtml(classNode) {
        var _this = this;

        var tocHtml = document.createDocumentFragment();
        var lastTocItem = null;
        this.getPanels().forEach(function (panel) {
          var items = panel.getPanelItemObjects(_this.getDocNode(), _this.getShowInherited() || _this.getShowIncluded());

          if (items.length == 0) {
            return;
          }

          if (lastTocItem) {
            tocHtml.appendChild(document.createTextNode(" | "));
          }

          var tocItem = qx.dom.Element.create("span");
          qx.bom.element.Class.add(tocItem, "tocitem"); // add icon in front of the TOC item

          tocItem.innerHTML = qxl.apiviewer.ui.ClassViewer.createImageHtml(panel.getPanelIcon(), panel.getPanelTitle()) + " ";
          q(tocItem).on("tap", function (firstItem) {
            return function () {
              this.__P_527_0(firstItem);

              qx.bom.element.Scroll.intoView(panel.getTitleElement(), null, "left", "top");

              if (!panel.getIsOpen()) {
                this.togglePanelVisibility(panel);
              }
            }.bind(this);
          }.bind(_this)(items[0]), false);
          var textSpan = qx.dom.Element.create("span");

          if (panel instanceof qxl.apiviewer.ui.panels.StaticMethodsPanel && qx.core.Environment.get("engine.name") == "webkit") {
            qx.bom.element.Style.set(textSpan, "margin-left", "25px");
          }

          textSpan.appendChild(document.createTextNode(" "));
          textSpan.appendChild(document.createTextNode(panel.getPanelTitle()));
          tocItem.appendChild(textSpan);
          tocHtml.appendChild(tocItem);
          lastTocItem = tocItem;
        });
        return tocHtml;
      },

      /**
       * @param classNode
       * @return {Promise}
       */
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        var _this2 = this;

        var subObjectsName = "sub classes";
        var desc = classNode.getDescription();

        switch (classNode.getType()) {
          case "mixin":
            subObjectsName = "sub mixins";
            break;

          case "interface":
            subObjectsName = "sub interfaces";
            break;
        }

        var classHtml = new qx.util.StringBuilder(); // Add the class description

        if (desc !== "") {
          classHtml.add("<div class=\"class-description\">", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode), "</div>");
        }

        var seeAlso = qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(classNode);

        if (seeAlso) {
          if (classHtml.length > 0) {
            classHtml.splice(-1, 0, seeAlso);
          } else {
            classHtml.add(seeAlso);
          }
        }

        if (classNode.getErrors().length > 0) {
          classHtml.add("<div class=\"class-description\">", qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(classNode, classNode), "</div>");
        } // Add the class hierarchy


        if (classNode.getType() === "interface") {
          classHtml.add(this.__P_527_1(classNode));
        } else {
          classHtml.add(this.__P_527_2(classNode));
        }

        return classNode.getChildClasses().then(function (childClasses) {
          classHtml.add(_this2.__P_527_3(childClasses, "Direct " + subObjectsName + ":"));
          classHtml.add(_this2.__P_527_3(classNode.getInterfaces(), "Implemented interfaces:"));
          classHtml.add(_this2.__P_527_3(classNode.getMixins(), "Included mixins:"));
          return classNode.getImplementations();
        }).then(function (classes) {
          classHtml.add(_this2.__P_527_3(classes, "Implementations of this interface:"));
          return classNode.getIncluder();
        }).then(function (classes) {
          classHtml.add(_this2.__P_527_3(classes, "Classes including this mixin:"));

          if (classNode.isDeprecated()) {
            classHtml.add("<h2 class=\"warning\">", "Deprecated:", "</h2>");
            classHtml.add("<p>");
            desc = classNode.getDeprecationText();

            if (desc) {
              classHtml.add(qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode));
            } else {
              classHtml.add("This ", classNode.getType(), " is deprecated!");
            }

            classHtml.add("</p>");
          }

          if (classNode.isInternal()) {
            classHtml.add("<h2 class=\"warning\">", "Internal:", "</h2>");
            classHtml.add("<p>");
            var type = classNode.getType();

            if (type == "bootstrap") {
              type += " class";
            }

            classHtml.add("This ", type, " is internal!");
            classHtml.add("</p>");
          }

          return classHtml.get();
        });
      },

      /**
       * Create a HTML fragment containing information of dependent classes
       * like implemented interfaces, included mixins, direct sub classes, ...
       *
       * @param dependentClasses {qxl.apiviewer.dao.Class[]} array of dependent classes
       * @param title {String} headline
       * @return {String} HTML Fragement
       */
      __P_527_3: function __P_527_3(dependentClasses, title) {
        var result = "";

        if (dependentClasses.length > 0) {
          result = new qx.util.StringBuilder("<h2>", title, "</h2>");

          for (var i = 0; i < dependentClasses.length; i++) {
            if (i !== 0) {
              result.add(", ");
            }

            result.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(dependentClasses[i], null, true, false));
          }

          result = result.get();
        }

        return result;
      },

      /**
       * Generate HTML fragment to display the inheritance hierarchy of a class.
       *
       * @param classNode {qxl.apiviewer.dao.Class} class node
       * @return {String} HTML fragemnt
       */
      __P_527_2: function __P_527_2(classNode) {
        var ClassViewer = qxl.apiviewer.ui.ClassViewer; // Create the class hierarchy

        var classHtml = new qx.util.StringBuilder("<h2>", "Inheritance hierarchy:", "</h2>");
        var classHierarchy = classNode.getClassHierarchy(true);
        classHtml.add(ClassViewer.createImageHtml("qxl/apiviewer/image/class18.gif"), "<span style=\"white-space: nowrap;\"><a href=\"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object\" target=\"_blank\" title=\"Object\">Object</a></span>");
        var indent = 0;

        for (var i = classHierarchy.length - 1; i >= 0; i--) {
          if (qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i]) && classHierarchy[i] === Object) {
            continue;
          }

          classHtml.add("<div>");
          classHtml.add(ClassViewer.createImageHtml("qxl/apiviewer/image/nextlevel.gif", null, "margin-left:" + indent + "px"), !qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i]) ? ClassViewer.createImageHtml(qxl.apiviewer.TreeUtil.getIconUrl(classHierarchy[i])) : ClassViewer.createImageHtml("qxl/apiviewer/image/class18.gif"));

          if (i !== 0) {
            if (!qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i])) {
              classHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(classHierarchy[i].getFullName(), null, false));
            } else {
              // it is safe to get the name of the type of the object as below, because only standard native objects are used here.
              // the method below returns Object for user defined objects
              var name = Object.prototype.toString.call(new classHierarchy[i]()).match(/^\[object (.*)\]$/)[1];
              classHtml.add("<span style=\"white-space: nowrap;\"><a href=\"" + qxl.apiviewer.ui.ClassViewer.MDC_LINKS[name] + "\" target=\"_blank\" title=\"" + name + "\">" + name + "</a></span>");
            }
          } else {
            classHtml.add(classHierarchy[i].getFullName());
          }

          indent += 18;
          classHtml.add("</div>");
        }

        return classHtml.get();
      },

      /**
       * Generate HTML fragment to display the inheritance hierarchy of an Interface.
       *
       * @param classNode {qxl.apiviewer.dao.Class} class node
       * @return {String} HTML fragemnt
       */
      __P_527_1: function __P_527_1(classNode) {
        var ClassViewer = qxl.apiviewer.ui.ClassViewer;
        var TreeUtil = qxl.apiviewer.TreeUtil;
        var InfoPanel = qxl.apiviewer.ui.panels.InfoPanel;
        var hierarchy = classNode.getInterfaceHierarchy();
        var html = new qx.util.StringBuilder(); // show nothing if we don't have a hierarchy

        if (hierarchy.length <= 1) {
          return html;
        }

        html.add("<h2>", "Inheritance hierarchy:", "</h2>");
        var indent = 0;

        for (var i = hierarchy.length - 1; i >= 0; i--) {
          var name = hierarchy[i].getFullName();
          var icon = TreeUtil.getIconUrl(hierarchy[i]);
          html.add("<div>");

          if (hierarchy[i].getSuperInterfaces().length > 0) {
            html.add(ClassViewer.createImageHtml("qxl/apiviewer/image/nextlevel.gif", null, "margin-left:" + indent + "px"));
            html.add(ClassViewer.createImageHtml(icon));
            html.add(i !== 0 ? InfoPanel.createItemLinkHtml(name, null, false) : name);
            indent += 18;
          } else {
            html.add(ClassViewer.createImageHtml(icon));
            html.add(InfoPanel.createItemLinkHtml(name, null, false));
          }

          html.add("</div>");
        }

        return html.get();
      },

      /**
       * Highlights an item (property, method or constant) and scrolls it visible.
       *
       * @param itemName {String} the name of the item to highlight.
       * @return {Boolean} whether the item name was valid and could be selected.
       */
      showItem: function showItem(itemName) {
        var itemNode;
        var nameMap = {
          "event": "events",
          "method_public": "methods",
          "method_protected": "methods",
          "method_private": "methods",
          "property": "properties",
          "property_private": "properties",
          "property_protected": "properties",
          "constant": "constants",
          "childcontrol": "childControls"
        }; // special handling for constructor methods since the constructor
        // cannot be obtained with the "getItem" (which works on lists)

        if (itemName == "construct") {
          itemNode = this.getDocNode().getConstructor();
        } else if (itemName.indexOf("!") != -1) {
          var parts = itemName.split("!");
          itemNode = this.getDocNode().getItemByListAndName(nameMap[parts[1]], parts[0]);

          if (!itemNode) {
            itemNode = this.getDocNode().getItem(parts[0]);
          }
        } else {
          itemNode = this.getDocNode().getItem(itemName);
        }

        if (!itemNode) {
          return false;
        } // Show properties, private or protected methods if they are hidden


        this.__P_527_0(itemNode);

        var panel = this._getPanelForItemNode(itemNode);

        if (!panel.getIsOpen()) {
          this.togglePanelVisibility(panel);
        }

        var itemElement = panel.getItemElement(itemNode.getName());

        if (!itemElement) {
          return false;
        }

        var elem = itemElement.parentNode.parentNode; // Handle mark

        if (this._markedElement) {
          this._markedElement.className = qxl.apiviewer.ui.panels.InfoPanel.getItemCssClasses(this._markedItemNode);
        }

        elem.className = "marked";
        this._markedElement = elem;
        this._markedItemNode = itemNode; // Use a timeout as pragmatic solution
        // Replace this later on with a kind of post-processing
        // to get rid off this timer

        qx.event.Timer.once(function (e) {
          qx.bom.element.Scroll.intoView(elem, null, "left", "top");
        }, this, 0);
        return true;
      },

      /**
       * Programatically enables the button to show private, protected function or
       * properties so that the selected item can be shown.
       * @param itemNode
       */
      __P_527_0: function __P_527_0(itemNode) {
        var uiModel = qxl.apiviewer.UiModel.getInstance(); // Check for property

        if (itemNode.isFromProperty && itemNode.isFromProperty()) {
          uiModel.setExpandProperties(true);

          if (itemNode.isProtected()) {
            uiModel.setShowProtected(true);
          }

          if (itemNode.isPrivate()) {
            uiModel.setShowPrivate(true);
          }

          if (itemNode.isInternal()) {
            uiModel.setShowInternal(true);
          }
        } else {
          // Check for privates
          if (itemNode.isPrivate()) {
            uiModel.setShowPrivate(true);
          } // Check for internals


          if (itemNode.isInternal()) {
            uiModel.setShowInternal(true);
          } else if (itemNode.isProtected()) {
            // Check for protected
            uiModel.setShowProtected(true);
          }
        }
      },

      /**
       * Gets the node panel for a doc node.
       *
       * @param itemNode {qxl.apiviewer.dao.Class} the doc node of the item.
       * @return {InfoPanel} the item's info panel instance
       */
      _getPanelForItemNode: function _getPanelForItemNode(itemNode) {
        var panels = this.getPanels();

        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];

          if (panel.canDisplayItem(itemNode)) {
            return panel;
          }
        }

        return null;
      }
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._titleElem = this._classDescElem = this._markedElement = this._markedItemNode = null;
    }
  });
  qxl.apiviewer.ui.ClassViewer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassViewer.js.map?dt=1612700601101