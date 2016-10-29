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
  Role("cv.role.Refresh", {

    has: {
      refresh : { is: 'r', init: 0 }
    },

    my: {
      after: {
        parse: function( xml, path, flavour, widgetType ) {
          var data = templateEngine.widgetDataGet(path);
          $e = $(xml);
          data.refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
        }
      }
    },
    after : {
      initialize : function (props) {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          templateEngine.setupRefreshAction( this.getPath(), this.getRefresh() );
        }, this);
      }
    },
  });
});