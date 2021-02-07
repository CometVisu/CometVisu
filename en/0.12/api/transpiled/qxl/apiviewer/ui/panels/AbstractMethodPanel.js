(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.ClassViewer": {}
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
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.AbstractMethodPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct(caption, icon) {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, caption, icon);
    },
    members: {
      _canShowInherited: function _canShowInherited() {
        return true;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        var arr = daoClass.getMethods();

        if (showInherited) {
          arr = arr.concat(daoClass.getMixinMethods());
        }

        return arr;
      },

      /**
      * Get the title HTML for a method
      *
      * @param method {qxl.apiviewer.dao.Method} The method doc node.
      * @return {String} The HTML fragment of the title.
      */
      getItemTitleHtml: function getItemTitleHtml(method) {
        if (method.isConstructor()) {
          var title = method.getClass().getName();
        } else {
          title = method.getName();
        }

        var titleHtml = new qx.util.StringBuilder(qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(method, title)); // Add the title (the method signature)

        titleHtml.add("<span class=\"method-signature\"><span class=\"parenthesis\">(</span>");
        var params = method.getParams();

        for (var i = 0; i < params.length; i++) {
          var param = params[i];

          if (i != 0) {
            titleHtml.add("<span class=\"separator\">,</span> ");
          }

          titleHtml.add("<span class=\"parameter-type\">", qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(param, "var"), "</span> <code>", param.getName(), "</code>");

          if (param.isOptional()) {
            titleHtml.add("?");
          }
        }

        titleHtml.add("<span class=\"parenthesis\">)</span></span>");
        return titleHtml.get();
      },

      /**
      * Get the type HTML for a method
      *
      * @param method {qxl.apiviewer.dao.Method} The method doc node.
      * @return {String} The HTML fragment of the type.
      */
      getItemTypeHtml: function getItemTypeHtml(method) {
        var typeHtml = new qx.util.StringBuilder();

        if (method.isAbstract() && method.getClass().isAbstract()) {
          typeHtml.add("abstract ");
        }

        if (!method.isConstructor()) {
          typeHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(method.getReturn(), "void"));
        }

        return typeHtml.get();
      },

      /**
      * Creates the HTML showing the information about a method.
      *
      * @param method {qxl.apiviewer.dao.Method} the doc node of the method.
      * @param currentClassDocNode {qxl.apiviewer.dao.Class} the doc node of the currently displayed class
      * @param showDetails {Boolean} whether to show the details.
      * @return {String} the HTML showing the information about the method.
      */
      getItemTextHtml: function getItemTextHtml(method, currentClassDocNode, showDetails) {
        var docClass = method.getClass(); // Add the description

        var textHtml = new qx.util.StringBuilder();

        if (method.isConstructor() && !method.getDescription()) {
          textHtml.add("Creates a new instance of ", docClass.getName(), ".");
        } else {
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(method, docClass, showDetails));
        }

        if (showDetails) {
          // Add Parameters
          var params = method.getParams();

          if (params.length > 0) {
            textHtml.add("<div class=\"item-detail-headline\">", "Parameters:", "</div>");

            for (var i = 0; i < params.length; i++) {
              var param = params[i];
              /*
              var paramType = "";
              var dims = param.getArrayDimensions();
              if (dims) {
                for (let i=0; i<dims; i++) {
                  paramType += "[]";
                }
              }
              */

              var defaultValue = param.getDefaultValue();
              textHtml.add("<div class=\"item-detail-text\">");

              if (defaultValue) {
                textHtml.add("<span class=\"item-detail-optional\">");
              }

              textHtml.add("<code>", param.getName(), "</code>");

              if (defaultValue) {
                textHtml.add(" (" + (param.isOptional() ? "optional; " : "") + "default: ", defaultValue, ") ");
              } else if (param.isOptional()) {
                textHtml.add(" (optional) ");
              }

              textHtml.add("</span>");
              var desc = param.getDescription();

              if (desc) {
                textHtml.add(" ", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass));
              }

              textHtml.add("</div>");
            }
          } // Add return value


          var returnNode = method.getReturn();

          if (returnNode) {
            desc = returnNode.getDescription();

            if (desc) {
              textHtml.add("<div class=\"item-detail-headline\">", "Returns:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass), "</div>");
            }
          }

          var applyToProperties = method.getApplyFor();

          if (applyToProperties && applyToProperties.length > 0) {
            // gabi check
            textHtml.add("<div class=\"item-detail-headline\">", applyToProperties.length == 1 ? "Apply method of property:" : "Apply method of properties:", "</div>", "<div class=\"item-detail-text\">");

            for (var _i = 0; _i < applyToProperties.length; _i++) {
              textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(applyToProperties[_i], method.getClass(), true, true), ", ");
            }

            textHtml.add("</div>");
          } // Add throws


          var throwsEntries = method.getThrows();

          if (throwsEntries.length > 0) {
            textHtml.add("<div class=\"item-detail-headline\">", "Throws:", "</div>");

            for (var _i2 = 0; _i2 < throwsEntries.length; _i2++) {
              var throwsEntry = throwsEntries[_i2];
              var throwsEntryType = throwsEntry.getType() ? throwsEntry.getType() : throwsEntry.getDefaultType();
              textHtml.add("<div class=\"item-detail-text\">");
              textHtml.add("<span class=\"parameter-type\">", throwsEntryType === throwsEntry.getDefaultType() ? throwsEntry.getDefaultType() : qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(throwsEntryType), "</span>");
              desc = throwsEntry.getDescription();

              if (desc) {
                textHtml.add(" ", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass));
              }

              textHtml.add("</div>");
            }
          }

          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createAccessHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createIncludedFromHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createOverwriddenFromHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInfoRequiredByHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(method, "function"));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSourceLinkHtml(method));
        }

        return textHtml.get();
      },

      /**
      * Checks whether a method has details.
      *
      * @param node {Map} the doc node of the method.
      * @param currentClassDocNode {Map} the doc node of the currently displayed class
      * @return {Boolean} whether the method has details.
      */
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        // Get the method node that holds the documentation
        var hasReturn = node.getReturn() && node.getReturn().getDescription();
        return node.getClass() != currentClassDocNode || // method is inherited
        !node.getOverriddenFrom() || node.getRequiredBy().length > 0 || node.getParams().length > 0 || node.getThrows().length > 0 || hasReturn || node.getSee().length > 0 || node.getErrors().length > 0 || node.isDeprecated() || node.getApplyFor() || qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node) || qxl.apiviewer.ui.ClassViewer.getSourceUri(node);
      }
    }
  });
  qxl.apiviewer.ui.panels.AbstractMethodPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractMethodPanel.js.map?dt=1612694019244