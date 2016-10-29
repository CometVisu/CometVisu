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

    requires: ['getPathSuffix'],

    has: {
      children: { is: 'rw', init: [] }
    },

    my: {
      after: {
        parse: function( xml, path, flavour, pageType ) {
          var $p = $(xml);
          var data = templateEngine.widgetDataGet( path + this.getPathSuffix());

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
      }
    },

    methods: {

      getChildrenDomString: function() {
        var container = '';
        Joose.A.each( this.getChildren(), function(path) {
          var data = templateEngine.widgetDataGet(path);
          var widget = cv.structure.pure.WidgetFactory.createInstance(data.$$type, data);
          if (widget) {
            var subelement = widget.getDomString();
            if( undefined === subelement )
              return;
            container += '<div class="widget_container '
              + (data.rowspanClass ? data.rowspanClass : '')
              + (data.containerClass ? data.containerClass : '')
              + ('break' === data.type ? 'break_container' : '') // special case for break widget
              + '" id="'+path+'" data-type="'+data.$$type+'">' + subelement + '</div>';
          }
        }, this);
        return container;
      }
    }
  });
});