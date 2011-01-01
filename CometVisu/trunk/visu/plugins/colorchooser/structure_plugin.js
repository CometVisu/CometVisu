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
VisuDesign_Custom.prototype.addCreator("colorchooser", {
  create: function( page, path ) {
    var $p = $(page);
    var ret_val = $('<div class="widget" />');
    ret_val.addClass( 'colorChooser' );

    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = {};
    $p.find('address').each( function(){ 
      var src = this.textContent;
      var transform = this.getAttribute('transform');
      var color     = this.getAttribute('color'    );
      var readonly  = this.getAttribute('readonly' );
      ga_list.push( src ); 
      address[ '_' + src ] = [ transform, color, readonly=='true' ];
    });

    var actor = '<div class="actor">';
    actor += '</div>';
    var datatype =  $(page).attr('datatype');
    var $actor = $(actor)
      .data({
        'address' : address,
        'value_r' : 0,
        'value_g' : 0,
        'value_b' : 0,
        'type'    : 'colorChooser'
      });
      $actor.farbtastic( function(color){
        var r = parseInt(color.substring(1, 3), 16) * 100 / 255.0;
        var g = parseInt(color.substring(3, 5), 16) * 100 / 255.0;
        var b = parseInt(color.substring(5, 7), 16) * 100 / 255.0;
        var vr = $actor.data('value_r');
        var vg = $actor.data('value_g');
        var vb = $actor.data('value_b');
        $actor.data( 'value_r', vr );
        $actor.data( 'value_g', vg );
        $actor.data( 'value_b', vb );
        for( var addr in address )
        {
          if( address[addr][2] == true ) continue; // skip read only
          switch( address[addr][1] )
          {
            case 'r':
              var v = Transform[address[addr][0]].encode( r );
              if( v != Transform[address[addr][0]].encode( vr ) )
                visu.write( addr.substr(1), v );
              break;
            case 'g':
              var v = Transform[address[addr][0]].encode( g );
              if( v != Transform[address[addr][0]].encode( vg ) )
                visu.write( addr.substr(1), v );
              break;
            case 'b':
              var v = Transform[address[addr][0]].encode( b );
              if( v != Transform[address[addr][0]].encode( vb ) )
                visu.write( addr.substr(1), v );
              break;
          }
        }
      });
    for( var addr in address ) {
      switch( address[addr][1] ) {
        case 'r':
          $actor.bind( addr, this.update_r );
          break;
        case 'g':
          $actor.bind( addr, this.update_g );
          break;
        case 'b':
          $actor.bind( addr, this.update_b );
          break;
      }
    }

    ret_val.append(label).append( $actor );
    return ret_val;
  },
  update_r: function( e, data ) { 
    var element = $(this);
    var value = Transform[ element.data().address[ e.type ][0] ].decode( data );
    element.data( 'value_r', value );
    function toHex( x ) { var r = parseInt( x ).toString(16); return r.length == 1 ? '0'+r : r; }
    var color = jQuery.farbtastic( element ).color || '#000000';
    color = color.substring(0,1) +
            toHex( value*255/100 )+
            color.substring(3);
    jQuery.farbtastic( element ).setColor( color );
  },
  update_g: function( e, data ) { 
    var element = $(this);
    var value = Transform[ element.data().address[ e.type ][0] ].decode( data );
    element.data( 'value_g', value );
    function toHex( x ) { var r = parseInt( x ).toString(16); return r.length == 1 ? '0'+r : r; }
    var color = jQuery.farbtastic( element ).color || '#000000';
    color = color.substring(0,3) +
            toHex( value*255/100 )+
            color.substring(5);
    jQuery.farbtastic( element ).setColor( color );
  },
  update_b: function( e, data ) { 
    var element = $(this);
    var value = Transform[ element.data().address[ e.type ][0] ].decode( data );
    element.data( 'value_b', value );
    function toHex( x ) { var r = parseInt( x ).toString(16); return r.length == 1 ? '0'+r : r; }
    var color = jQuery.farbtastic( element ).color || '#000000';
    color = color.substring(0,5) +
            toHex( value*255/100 )+
            color.substring(7);
    jQuery.farbtastic( element ).setColor( color );
  },
  attributes: {
    address_r: { type: 'address' , required: true },
    address_g: { type: 'address' , required: true },
    address_b: { type: 'address' , required: true },
    datatype:  { type: 'datatype', required: true },
  },
  content: { type: 'string', required: true }
});

/**
 * Include the needed stuff
 */
$( 'head' ).append( '<script type="text/javascript" src="plugins/colorchooser/farbtastic/farbtastic.js"></script>' );
$( 'head' ).append( '<link rel="stylesheet" href="plugins/colorchooser/farbtastic/farbtastic.css" type="text/css" />' );

