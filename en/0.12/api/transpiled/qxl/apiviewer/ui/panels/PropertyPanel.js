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
      "qxl.apiviewer.dao.Property": {},
      "qx.lang.String": {},
      "qx.util.StringBuilder": {},
      "qx.lang.Array": {},
      "qx.dev.Tokenizer": {}
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
  qx.Class.define("qxl.apiviewer.ui.panels.PropertyPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Properties", "qxl/apiviewer/image/property18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Property;
      },
      _canShowInherited: function _canShowInherited() {
        return true;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        var arr = daoClass.getProperties();

        if (showInherited) {
          arr = arr.concat(daoClass.getMixinProperties());
        }

        return arr;
      },
      __P_545_0: function __P_545_0(node, currentClassDocNode) {
        if (node.isRefined()) {
          return "";
        }

        if (node.isPrivate()) {
          var access = "__";
          var name = node.getName().substring(2);
        } else if (node.isProtected()) {
          access = "_";
          name = node.getName().substring(1);
        } else {
          access = "";
          name = node.getName();
        }

        name = qx.lang.String.firstUp(name);
        var generatedMethods = [];
        generatedMethods.push("{@link #" + access + "set" + name + "}</td><td> Set the property value.");

        if (!node.isPropertyGroup()) {
          generatedMethods.push("{@link #" + access + "get" + name + "}</td><td> Get the property value.");
          generatedMethods.push("{@link #" + access + "init" + name + "}</td><td> Call apply method with the init value.");
        }

        generatedMethods.push("{@link #" + access + "reset" + name + "}</td><td> Reset the property value.");

        if (node.getType() == "Boolean") {
          generatedMethods.push("{@link #" + access + "toggle" + name + "}</td><td> Toggle the property value.");
          generatedMethods.push("{@link #" + access + "is" + name + "}</td><td> Check whether the property equals <code>true</code>.");
        }

        var textHtml = new qx.util.StringBuilder();
        textHtml.add("<div class=\"item-detail-headline\">", "Generated methods:", "</div>", "<div class=\"item-detail-text\">");
        textHtml.add("<table><tr><td>");
        textHtml.add(generatedMethods.join("</td></tr><tr><td>"));
        textHtml.add("</td></tr></table>");
        textHtml.add("</div>");
        return qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(textHtml.get(), currentClassDocNode);
      },
      __P_545_1: function __P_545_1(node) {
        var attributes = [];

        if (node.isNullable()) {
          attributes.push("This property allows 'null' values");
        }

        if (node.isInheritable()) {
          attributes.push("The property value can be inherited from a parent object.");
        }

        if (node.isThemeable()) {
          attributes.push("The property value can be set using appearance themes.");
        }

        if (node.isPropertyGroup()) {
          attributes.push("The property is a property group.");
        }

        if (node.isRefined()) {
          attributes.push("The property refines the init value of an existing property.");
        }

        if (attributes.length > 0) {
          var textHtml = new qx.util.StringBuilder();
          textHtml.add("<div class=\"item-detail-headline\">", "Property attributes:", "</div>", "<div class=\"item-detail-text\">");
          textHtml.add("<ul><li>");
          textHtml.add(attributes.join("</li><li>"));
          textHtml.add("</li></ul>");
          textHtml.add("</div>");
          return textHtml.get();
        }

        return "";
      },

      /**
       * Creates the HTML showing whether the item is refined
       *
       * @param node {qxl.apiviewer.dao.ClassItem} item to get the the information from
       * @return {String} HTML fragment
       */
      __P_545_2: function __P_545_2(node) {
        if (node.isRefined()) {
          var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Refined property:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getOverriddenFrom().getFullName() + "#" + node.getName()), "</div>");
          return html.get();
        }

        return "";
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },

      /**
       * Creates the HTML showing the information about a property.
       *
       * @param node {Map} the doc node of the property.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @param showDetails {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the property.
       */
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        // Add the description
        var textHtml = new qx.util.StringBuilder(qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails));

        if (showDetails) {
          // Add allowed values
          var allowedValue = null;
          var possibleValues = qx.lang.Array.clone(node.getPossibleValues());

          if (possibleValues.length > 0) {
            if (node.isNullable()) {
              possibleValues.push("null");
            }

            allowedValue = "<code>" + possibleValues.join("</code>, <code>") + "</code>";
          } else if (node.getClassname()) {
            allowedValue = "instances of " + node.getClassname();
          } else if (node.getInstance()) {
            allowedValue = "instances of " + node.getInstance() + " or sub classes";
          } else if (node.getType()) {
            allowedValue = "any " + node.getType();
          }

          if (allowedValue) {
            textHtml.add("<div class=\"item-detail-headline\">", "Allowed values:", "</div>", "<div class=\"item-detail-text\">");
            textHtml.add(allowedValue, "</div>");
          } // Add check


          if (node.getCheck()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Check:", "</div>", "<div class=\"javascript\">", qx.dev.Tokenizer.javaScriptToHtml(node.getCheck()), "</div>");
          } // Add default value


          if (!node.isPropertyGroup()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Init value:", "</div>", "<div class=\"item-detail-text\">", "<code>", node.getDefaultValue() ? node.getDefaultValue() : "null", "</code>", "</div>");
          } // add event


          if (node.getEvent() && !node.isRefined()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Change event:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml("#" + node.getEvent(), node.getClass(), true, true), "</div>");
          } // add apply method


          if (node.getApplyMethod() && !node.isRefined()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Apply method:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml("#" + node.getApplyMethod(), node.getClass(), true, true), "</div>");
          }

          textHtml.add(this.__P_545_1(node));
          textHtml.add(this.__P_545_0(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createIncludedFromHtml(node, currentClassDocNode));
          textHtml.add(this.__P_545_2(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInfoRequiredByHtml(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "property"));
        }

        return textHtml.get();
      }
    }
  });
  qxl.apiviewer.ui.panels.PropertyPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PropertyPanel.js.map?dt=1643139889851