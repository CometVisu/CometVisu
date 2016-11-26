/* _common.js
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

qx.Mixin.define("cv.role.HasChildren", {

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    children: {
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
      childs.forEach(function (child, i) {
        var childData = cv.xml.Parser.parse(child, path + '_' + i, flavour, pageType);
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
     * @param xml
     * @param path
     */
    getStoragePath: function (xml, path) {
      if (xml.length === 1) {
        xml = xml[0]
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
    getChildrenDomString: function (noWidgetContainer) {
      var container = '';

      this.getChildren().forEach(function (path) {
        var data = cv.data.Model.getInstance().getWidgetData(path);
        var widget = cv.structure.WidgetFactory.createInstance(data.$$type, data);
        if (widget) {
          widget.setParentWidget(this);
          var subelement = widget.getDomString();
          if (undefined === subelement)
            return;
          if (noWidgetContainer === true) {
            container += subelement;
          } else {
            container += '<div class="widget_container '
              + (data.rowspanClass ? data.rowspanClass : '')
              + (data.containerClass ? data.containerClass : '')
              + ('break' === data.$$type ? 'break_container' : '') // special case for break widget
              + '" id="' + path + '" data-type="' + data.$$type + '">' + subelement + '</div>';
          }
        }
      }, this);
      return container;
    },

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

  // defer: function() {
  //   // cv.xml.Parser.addHook(this.classname.split(".").pop().toLowerCase(), cv.role.HasChildren.parse, this);
  // }
});