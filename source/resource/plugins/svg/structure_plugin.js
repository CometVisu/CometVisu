/* structure_plugin.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

/**
 * @author christian523
 * @since 2012
 */
define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";

  Class('cv.structure.pure.Svg', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Update, cv.role.Refresh],

    after: {
      initialize: function() {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          var $actor = $(this.getActor());
          $actor.svg({loadURL:'plugins/svg/rollo.svg'});
        }, this);
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor"></div>';
      }
    },

    methods: {
      handleUpdate: function(value) {
        var element = $(this.getDomElement());
        var linewidth=3;
        var space = 1;
        var total = linewidth + space;
        var line_qty = 48 / total;
        for(var i = 0; i<=Math.floor(value/line_qty);i++) {
          element.find('#line'+(i+1)).attr('y1',9+total*(i)+((h%line_qty)/line_qty)*total);
          element.find('#line'+(i+1)).attr('y2',9+total*(i)+((h%line_qty)/line_qty)*total);
        }
        for(var i = Math.floor(h/line_qty)+1; i<=line_qty;i++) {
          element.find('#line'+(i+1)).attr('y1',9);
          element.find('#line'+(i+1)).attr('y2',9);
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("svg", cv.structure.pure.Svg);
});