/* structure_plugin.js (c) 2015 by Stefan Borchert [stefan@borchert.cc]
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
 * This plugins integrates a simple link.
 */

define(['structure_custom'], function(VisuDesign_Custom) {
  VisuDesign_Custom.prototype.addCreator("link", {
    create : function(page, path) {
      var $p = $(page);

      var ret_val = $('<a class="link"/>');
      if ( $p.attr('class') ) {
        ret_val.addClass($p.attr('class'));
      }
      if ( $p.attr('text') ) {
        ret_val.html($p.attr('text'));
      }
      if ( $p.attr('href') ) {
        ret_val.attr('href', $p.attr('href'));
      }

      return ret_val;
    }
  });
});
