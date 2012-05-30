/* unknown.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('navbar', {
  create: function( navbar, path, flavour, type ) {
    var $n = $(navbar);
    var childs = $n.children();
    var container = $( '<div class="clearfix"/>' );
    if( $n.attr('name') ) container.append( '<h2 ' + hstyle + '>' + $n.attr('name') + '</h2>' );
    $( childs ).each( function(i){
        container.append( create_pages( childs[i], path + '_' + i, flavour ) );
    } );
    
    var dynamic  = $n.attr('dynamic') == 'true' ? true : false;
    var position = $n.attr('position') || 'left';
    switch( position )
    {
      case 'top':
        $('#navbarTop').append( container );
        break;
        
      case 'left':
        $('#navbarLeft').append( container );
        var thisSize = $('#navbarLeft').data('size') || 300; // FIXME - only a temporal solution
        if( dynamic ) navbarSetSize( 'left', thisSize );
        break;
        
      case 'right':
        $('#navbarRight').append( container );
        var thisSize = $('#navbarRight').data('size') || 300; // FIXME - only a temporal solution
        if( dynamic ) navbarSetSize( 'right', thisSize );
        break;
        
      case 'bottom':
        $('#navbarBottom').append( container );
        break;
    }
    navbars[position].dynamic |= dynamic;
    
    var ret_val = $('');
    return ret_val;
  },
  attributes: {
    name:     { type: 'string', required: false },
    position: { type: 'list'  , required: true , list: { top: 'top', left: 'left', right: 'right', bottom: 'bottom' } },
    dynamic:  { type: 'list'  , required: true , list: { 'false': 'Fixed size', 'true': 'Dynamic' } }
  },
  content: true
});