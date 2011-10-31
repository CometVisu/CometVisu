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
      var color     = this.getAttribute('variant'  );
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
        'value_r' : 0, // The currenty displayed value
        'value_g' : 0, // The currenty displayed value
        'value_b' : 0, // The currenty displayed value
        'bus_r'   : 0, // The current value on the bus
        'bus_g'   : 0, // The current value on the bus
        'bus_b'   : 0, // The current value on the bus
        'rateLimiter' : false, // is the rate limiter active?
        'type'    : 'colorChooser'
      });
      $actor.farbtastic( function(color){
        $actor.data( 'value_r', parseInt(color.substring(1, 3), 16) * 100 / 255.0 );
        $actor.data( 'value_g', parseInt(color.substring(3, 5), 16) * 100 / 255.0 );
        $actor.data( 'value_b', parseInt(color.substring(5, 7), 16) * 100 / 255.0 );
        function rateLimitedSend( a ) {
          var modified = false;
          var address = a.data( 'address' );
          var r  = a.data( 'value_r' );
          var g  = a.data( 'value_g' );
          var b  = a.data( 'value_b' );
          var br = a.data( 'bus_r' );
          var bg = a.data( 'bus_g' );
          var bb = a.data( 'bus_b' );
          for( var addr in address )
          {
            if( address[addr][2] == true ) continue; // skip read only
            switch( address[addr][1] )
            {
              case 'r':
                var v = Transform[address[addr][0]].encode( r );
                if( v != Transform[address[addr][0]].encode( br ) )
                {
                  visu.write( addr.substr(1), v );
                  modified = true;
                }
                break;
              case 'g':
                var v = Transform[address[addr][0]].encode( g );
                if( v != Transform[address[addr][0]].encode( bg ) )
                {
                  visu.write( addr.substr(1), v );
                  modified = true;
                }
                break;
              case 'b':
                var v = Transform[address[addr][0]].encode( b );
                if( v != Transform[address[addr][0]].encode( bb ) )
                {
                  visu.write( addr.substr(1), v );
                  modified = true;
                }
                break;
            }
          }

          if( modified ) 
          {
            a.data( 'bus_r', a.data( 'value_r' ) );
            a.data( 'bus_g', a.data( 'value_g' ) );
            a.data( 'bus_b', a.data( 'value_b' ) );
            a.data( 'rateLimiter', true );
            setTimeout( function(){rateLimitedSend( a );}, 250 ); // next call in 250ms
          } else {
            a.data( 'rateLimiter', false );
          }
        }
        if( $actor.data( 'rateLimiter' ) == false ) // already requests going?
          rateLimitedSend( $actor ); 
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
    element.data( 'bus_r', value );
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
    element.data( 'bus_g', value );
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
    element.data( 'bus_b', value );
    function toHex( x ) { var r = parseInt( x ).toString(16); return r.length == 1 ? '0'+r : r; }
    var color = jQuery.farbtastic( element ).color || '#000000';
    color = color.substring(0,5) +
            toHex( value*255/100 )+
            color.substring(7);
    jQuery.farbtastic( element ).setColor( color );
  },
    attributes: {
    },
    elements: {
      label:      { type: 'string',    required: true, multi: false },
      address:    { type: 'address',   required: true, multi: true }
    },
    content:      false
});

/**
 * Include the needed stuff
 */
$( 'head' ).append( '<script type="text/javascript" src="plugins/colorchooser/farbtastic/farbtastic.js"></script>' );
$( 'head' ).append( '<link rel="stylesheet" href="plugins/colorchooser/farbtastic/farbtastic.css" type="text/css" />' );

