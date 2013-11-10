/* structure_custom.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This module defines the custom widget additions to the CometVisu visualisation.
 * @module Structure custom
*/

/**
 * This class defines all the custom changes to the visu
 * @class VisuDesign_Custom
 */
function VisuDesign_Custom() {};                // do NOT change here
VisuDesign_Custom.prototype = basicdesign;      // do NOT change here

/*
 * Custom changes could go here and look e.g. like
****************************************
VisuDesign_Custom.prototype.addCreator("line", {
      create: function( page, path ) {
              return $( '<hr />' );
          },
      attributes: {
      },
      content: false
});
****************************************
 */
