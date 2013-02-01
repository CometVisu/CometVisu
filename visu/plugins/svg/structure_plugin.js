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
VisuDesign_Custom.prototype.addCreator('svg', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix image" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    ret_val.append( extractLabel( $e.find('label')[0], flavour ) );

    var address = {};
    $e.find('address').each( function(){ 
      var src = this.textContent;
      var transform = this.getAttribute('transform');
      var color     = this.getAttribute('variant'  );
      var readonly  = this.getAttribute('readonly' );
      templateEngine.addAddress( src );
      address[ '_' + src ] = [ transform, color, readonly=='true' ];
    });

    var actor = '<div class="actor"></div>';

    var $actor = $(actor);
    $actor.svg({loadURL:'plugins/svg/rollo.svg'});


    var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
    $actor.data( {
      'address':   address, 
      'refresh':   refresh
    } ).each(templateEngine.setupRefreshAction); // abuse "each" to call in context...
    for( var addr in address ) {
      $actor.bind( addr, this.update );
    }
    ret_val.append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var h = defaultUpdate( e, d, element );
	var linewidth=3;
    var space = 1;
	var total = linewidth + space;
	var line_qty = 48 / total;
    for(var i = 0; i<=Math.floor(h/line_qty);i++) {
      	element.find('#line'+(i+1)).attr('y1',9+total*(i)+((h%line_qty)/line_qty)*total);
      	element.find('#line'+(i+1)).attr('y2',9+total*(i)+((h%line_qty)/line_qty)*total);
    } 
    for(var i = Math.floor(h/line_qty)+1; i<=line_qty;i++) {  
      	element.find('#line'+(i+1)).attr('y1',9);
      	element.find('#line'+(i+1)).attr('y2',9);
    }
  }
}); 