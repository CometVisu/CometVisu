/* HasChildren.js 
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
 * Mixin for all widgets that can have other widgets as children, this mixin includes the static parsing part
 * and the methods for the widget instance.
 */
qx.Mixin.define("cv.role.HasChildren", {

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    var children = [];
    // create children
    var model = cv.data.Model.getInstance();
    if (cv.Config.lazyLoading === false || cv.Config.TMP.treePath.indexOf(props.path) >= 0) {
      // this.debug(props.$$type+" INIT ["+props.path+"] with "+props.children.length+" children");
      props.children.forEach(function (path) {
        var data = model.getWidgetData(path);
        var widget = cv.structure.WidgetFactory.createInstance(data.$$type, data);
        if (widget) {
          children.push(widget);
          widget.setParentWidget(this);
        }
      }, this);
      this.setChildWidgets(children);
    }
    // if (cv.Config.lazyLoading === true && !this.getParentWidget()) {
    //   new qx.util.DeferredCall(function() {
    //     // initialize the ancestors
    //     var parentData = cv.util.Tree.getParentData(props.path);
    //     if (parentData) {
    //       console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + props.$$type + " (" + props.path + ")");
    //       var parent = cv.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
    //       this.setParentWidget(parent);
    //     }
    //   }, this).schedule();
    // }
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    /**
     * Array with child paths
     */
    children: {
      check: "Array",
      init: []
    },

    /**
     * Array with child widget objects
     */
    childWidgets: {
      check: "Array",
      init: []
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    // this might have been called from the cv.xml.Parser with the including class as context
    parseChildren: function (xml, path, flavour, pageType) {
      var data = cv.data.Model.getInstance().getWidgetData(cv.role.HasChildren.getStoragePath(xml, path));

      if (!data.children) {
        data.children = [];
      }
      var childs = qx.dom.Hierarchy.getChildElements(xml).filter(function(child) {
        return ['layout', 'label', 'address'].indexOf(qx.dom.Node.getName(child)) === -1;
      }, this);
      childs.forEach(function (child, idx) {
        var childData = cv.xml.Parser.parse(child, path + '_' + idx, flavour, pageType);
        if (childData) {
          if (Array.isArray(childData)) {
            for (var i = 0, l = childData.length; i < l; i++) {
              data.children.push(childData[i].path);
            }
          } else if (childData.path) {
            data.children.push(childData.path);
          }
        }
      }, this);
      return data;
    },

    /**
     * Returns the path where the widget data is stored, usually this is the same path, but there are
     * exceptions for pages which are handled here
     *
     * @param xml {Element} widgets XML config element
     * @param path {String} internal widget path e.g. id_0_2
     */
    getStoragePath: function (xml, path) {
      if (xml.length === 1) {
        xml = xml[0];
      }
      switch (xml.nodeName.toLowerCase()) {
        case "page":
          return path + "_";
        default:
          return path;
      }
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    /**
     * Creates the HTML code for the children if this widget
     *
     * @param noWidgetContainer {Boolean} if false: do not surround the childrens with a div-element with class 'widget_container'
     * @return {String} HTML code
     */
    getChildrenDomString: function (noWidgetContainer) {
      var container = '';

      this.getChildWidgets().forEach(function(widget) {
        var subelement = widget.getDomString();
        if (undefined === subelement) {
          return;
        }
        if (noWidgetContainer === true) {
          container += subelement;
        } else {
          container += '<div class="widget_container ' +
            (widget.getRowspanClass ? widget.getRowspanClass() : '') +
            (widget.getContainerClass ? widget.getContainerClass() : '') +
            ('break' === widget.get$$type() ? 'break_container' : '') + // special case for break widget
            '" id="' + widget.getPath() + '" data-type="' + widget.get$$type() + '">' + subelement + '</div>';
        }
      }, this);
      return container;
    },

    /**
     * Find the widgets parent widget
     * @return {cv.structure.AbstractWidget}
     */
    getParent: function () {
      var path = this.getPath();
      var type = this.$$type;
      var parts, parentPath;
      if (type === "page") {
        if (path === "id_") {
          // root page has no parent
          return null;
        }
        parts = path.substr(0, path.length - 1).split("_");
        parts.pop();
        parentPath = parts.join("_") + "_";
      } else {
        if (path === "id") {
          // root element has no parent
          return null;
        }
        parts = path.split("_");
        parts.pop();
        parentPath = parts.join("_");
      }
      if (parentPath) {
        var parent = cv.structure.WidgetFactory.getInstanceById(parentPath);
        if (parent) {
          return parent;
        }
      }
      return null;
    }
  }
});