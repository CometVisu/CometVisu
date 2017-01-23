/* AbstractBasicWidget.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 *
 */
qx.Class.define('cv.structure.AbstractBasicWidget', {
  extend: qx.core.Object,
  type: "abstract",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    for (var prop in props) {
      if (this["set" + qx.Bootstrap.firstUp(prop)] !== undefined) {
        this.set(prop, props[prop]);
      }
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    /**
     * Internal path to the widget
     */
    path : {
      check: "String"
    },

    /**
     * The widget type
     */
    $$type : {
      check: "String"
    },

    /**
     * The parents page type
     */
    pageType  : {
      check: ["text", "2d", "3d"],
      init: "text"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __parentWidget: null,

    setParentWidget: function(value) {
      this.assertInstance(value, cv.structure.AbstractBasicWidget);
      this.__parentWidget = value;
    },

    getParentWidget: function() {
      if (cv.Config.lazyLoading === true && this.__parentWidget === null && this.getPath() !== "id_") {
        // creating parent widget on demand
        var parentData = cv.util.Tree.getParentData(this.getPath());
        // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + this.get$$type() + " (" + this.getPath() + ")");
        var parent = cv.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
        this.setParentWidget(parent);
      }
      return this.__parentWidget;
    },

    /**
     * Returns the DOMElement of this widget
     * @return {Element}
     */
    getDomElement: function() {
      return qx.bom.Selector.query('#'+this.getPath())[0];
    },

    /**
     * Generates the DOM string for this widget
     * @return {String|null}
     */
    getDomString : function() {
      return this._getInnerDomString ? this._getInnerDomString() : null;
    },

    /**
     * Get the widgets parent page (or navbar). This might not be the same as the parent widget.
     * @return {cv.structure.pure.Page|cv.structure.pure.NavBar|null}
     */
    getParentPage: function() {
      var parent = this.getParentWidget();
      while (parent) {
        if (parent.get$$type() === "page" || parent.get$$type() === "navbar") {
          return parent;
        }
        parent = parent.getParentWidget();
      }
      return null;
    }
  }
});
