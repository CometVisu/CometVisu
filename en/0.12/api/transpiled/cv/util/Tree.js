(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.data.Model": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Tree.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
   * Tree
   *
   * @author tobiasb
   * @since 2016
   */

  /**
   * Helper methods for the widget tree
   */
  qx.Class.define('cv.util.Tree', {
    type: "static",

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /*
       * *********************************************************
       * Widget tree helper functions
       * ********************************************************
       */
      getChildWidgets: function getChildWidgets(widget, type) {
        return widget.getChildren().filter(function (child) {
          return !type || child.get$$type() === type;
        });
      },

      /**
       * Get the parent widget with optional type filter
       *
       * @param widget {cv.ui.structure.AbstractWidget} start traversing up the with this widget
       * @param type {String?} only return parent of this type
       * @return {cv.ui.structure.AbstractWidget|null}
       */
      getParentWidget: function getParentWidget(widget, type) {
        var parent = widget.getParentWidget();

        while (parent) {
          if (!type || parent.get$$type() === type) {
            return parent;
          }

          parent = parent.getParentWidget();
        }
      },

      /*
       * *********************************************************
       * Widget data tree helper functions
       * ********************************************************
       */
      getParentPageData: function getParentPageData(path) {
        var data = {};
        var isPage = path.substr(-1, 1) === "_"; // path ends with _

        if (!isPage) {
          path = path.substr(0, path.length - 1);
        }

        var parentPath = path;

        if (parentPath === "id_") {
          return null;
        }

        var model = cv.data.Model.getInstance();

        while (Object.keys(data).length === 0 && parentPath.length > 2) {
          data = model.getWidgetData(parentPath);

          if (parentPath === "id_") {
            break;
          }

          var parts = parentPath.substr(0, parentPath.length - 1).split("_");
          parts.pop();
          parentPath = parts.join("_") + "_";
        }

        return data;
      },

      /**
       * Returns the data for the parent entry of the given path
       * @param path {String}
       * @return {var}
       */
      getParentData: function getParentData(path) {
        var data = {};

        function traverseUp(path) {
          var parts = path.split("_");

          if (parts[parts.length - 1] === "") {
            parts.pop();
          } else {
            parts[parts.length - 1] = "";
          }

          return parts.join("_");
        }

        var parentPath = traverseUp(path);

        if (parentPath === "id") {
          // no parent
          return null;
        }

        var model = cv.data.Model.getInstance();

        while (parentPath.length >= 2) {
          data = model.getWidgetData(parentPath);

          if (parentPath === "id_" || data.children && data.children.indexOf(path) >= 0) {
            return data;
          }

          parentPath = traverseUp(parentPath);
        }

        return null;
      },

      /*
      * *********************************************************
      * DOM-Element tree helper functions
      * ********************************************************
      */
      getChildElements: function getChildElements(element, selector) {
        return Array.from(element.childNodes).filter(function (child) {
          if (selector) {
            return Array.prototype.filter.call(child, function (m) {
              return m.matches(selector);
            });
          } else {
            return true;
          }
        }, this);
      },
      getParentPage: function getParentPage(element) {
        return this.getParent(element, "#pages", ".page", 1)[0];
      },
      getParentGroup: function getParentGroup(element) {
        return this.getParent(element, "#pages", ".group", 1)[0];
      },
      getParent: function getParent(element, until, selector, limit) {
        var parents = [];
        var parent = element.parentNode;

        while (parent && parent.getAttribute('id') !== "pages") {
          var found = [parent];

          if (selector) {
            found = Array.prototype.filter.call(found, function (m) {
              return m.matches(selector);
            });
          }

          parents = parents.concat(found);

          if (limit && parents.length >= limit) {
            break;
          }

          if (until && Array.prototype.filter.call([parent], function (m) {
            return m.matches(until);
          }).length > 0) {
            break;
          }

          parent = parent.parentNode;
        }

        return parents;
      },
      getClosest: function getClosest(elem, selector) {
        var findClosest = function findClosest(current) {
          var found = Array.prototype.filter.call([current], function (m) {
            return m.matches(selector);
          });

          if (found.length) {
            return found[0];
          } else {
            current = current.parentNode; // One up

            if (current && current.parentNode) {
              return findClosest(current);
            }
          }
        };

        return findClosest(elem);
      }
    }
  });
  cv.util.Tree.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tree.js.map?dt=1614015674883