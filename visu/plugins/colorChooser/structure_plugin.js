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
 * This is a custom function that extends the available widgets.
 * It's purpose is to change the design of the visu during runtime
 * to demonstrate all available
 */
VisuDesign_Custom.prototype.addCreator("colorChooser", {
      create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'colorChooser' );
                var label = '<div class="label">' + page.textContent + '</div>';
                var actor = '<div class="actor">';
                actor += '</div>';
                ret_val.append(label)
                    .append($(actor)
                    .data({
                        'mapping' : $(page).attr('mapping'),
                        'styling' : $(page).attr('styling'),
                        'type'    : 'toggle'
                    })
                    .farbtastic( function(color){
                      var r = parseInt(color.substring(1, 3), 16) * 100 / 255;
                      var g = parseInt(color.substring(3, 5), 16) * 100 / 255;
                      var b = parseInt(color.substring(5, 7), 16) * 100 / 255;
                      var a_r =  $(page).attr('address_r');
                      var a_g =  $(page).attr('address_g');
                      var a_b =  $(page).attr('address_b');
                      var datatype =  $(page).attr('datatype');
                      visu.write( a_r, r, datatype );
                      visu.write( a_g, g, datatype );
                      visu.write( a_b, b, datatype );
                    })) ;
                return ret_val;
          },
      attributes: {
            address_r:  {type: "address", required: true},
            address_g:  {type: "address", required: true},
            address_b:  {type: "address", required: true},
            datatype:   {type: "datatype", required: true},
      },
      content: {type: "string", required: true}
});

/**
 * Include the needed stuff
 */
$( 'head' ).append( '<script type="text/javascript" src="plugins/colorChooser/farbtastic/farbtastic.js"></script>' );
$( 'head' ).append( '<link rel="stylesheet" href="plugins/colorChooser/farbtastic/farbtastic.css" type="text/css" />' );

