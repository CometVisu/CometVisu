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

define(['joose'], function() {
  Role("cv.role.HasChildren", {

    has: {
      children: { is: 'rw', init: [] }
    },

    my: {
      after: {
        parse: function( xml, path, flavour, pageType ) {
          var $p = $(xml);
          var data = templateEngine.widgetDataGet(this.getStoragePath(xml, path));

          if (!data.children) {
            data.children = [];
          }
          var childs = $p.children().not('layout');
          Joose.A.each(childs, function(child, i) {
            var childData = cv.xml.Parser.parse(child, path + '_' + i, flavour, pageType );
            if (childData && childData.path) {
              data.children.push(childData.path);
            }
          }, this);
          return data;
        }
      },

      methods: {
        /**
         * Returns the path where the widget data is stored, usually this is the same path, but there are
         * exceptions for pages which are handled here
         * @param xml
         * @param path
         */
        getStoragePath: function(xml, path) {
          switch(xml.nodeName) {
            case "page":
              return path+"_";
            default:
              return path;
          }
        }
      }
    },

    methods: {

      getChildrenDomString: function(noWidgetContainer) {
        var container = '';
        // TODO: refactor that data is not needed anymore
        Joose.A.each( this.getChildren(), function(path) {
          var data = templateEngine.widgetDataGet(path);
          var widget = cv.structure.WidgetFactory.createInstance(data.$$type, data);
          if (widget) {
            var subelement = widget.getDomString();
            if( undefined === subelement )
              return;
            if (noWidgetContainer === true) {
              container += subelement;
            } else {
              container += '<div class="widget_container '
                + (data.rowspanClass ? data.rowspanClass : '')
                + (data.containerClass ? data.containerClass : '')
                + ('break' === data.type ? 'break_container' : '') // special case for break widget
                + '" id="' + path + '" data-type="' + data.$$type + '">' + subelement + '</div>';
            }
          }
        }, this);
        return container;
      },

      getParent: function() {
        var path = this.getPath();
        var type = this.$$type;
        if (type === "page") {
          if (path === "id_") {
            // root page has no parent
            return null;
          }
        } else {
          if (path === "id") {
            // root element has no parent
            return null;
          }
        }
        var parentPath = path.substr(0, path.length - 2);
        var parent = cv.structure.WidgetFactory.getInstanceById(parentPath);
        if (parent) {
          return parent;
        }
      }
    }
  });
});