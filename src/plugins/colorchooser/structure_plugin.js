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

define( ['structure_custom', 'css!plugins/colorchooser/farbtastic/farbtastic.css', 'plugins/colorchooser/farbtastic/farbtastic' ], function( VisuDesign_Custom ) {
  "use strict";

  /**
   * This is a custom function that extends the available widgets.
   * It's purpose is to change the design of the visu during runtime
   * to demonstrate all available
   */
  VisuDesign_Custom.prototype.addCreator("colorchooser", {
  create: function( page, path ) {
    var $p = $(page);
    var layout = templateEngine.design.setWidgetLayout( $p, path );
    var ret_val = '<div class="widget clearfix colorChooser' + layout + '">';
    var labelElement = $p.find('label')[0];
    ret_val += labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = templateEngine.design.makeAddressList( $p,
      function( src, transform, mode, variant ) {
        return [ true, variant ];
      },
      path
    );

    var actor = '<div class="actor" />';
    var data = templateEngine.widgetDataInsert( path, {
        'address' : address,
        'value_r' : 0, // The currenty displayed value
        'value_g' : 0, // The currenty displayed value
        'value_b' : 0, // The currenty displayed value
        'bus_r'   : 0, // The current value on the bus
        'bus_g'   : 0, // The current value on the bus
        'bus_b'   : 0, // The current value on the bus
        'rateLimiter' : false, // is the rate limiter active?
        'type'    : 'colorChooser',
        'path'    : path
      });
    
    templateEngine.postDOMSetupFns.push( function(){
      var $actor = $( '#' + path + ' .actor' );
      $actor.farbtastic( function(color){
        data.value_r = parseInt(color.substring(1, 3), 16) * 100 / 255.0;
        data.value_g = parseInt(color.substring(3, 5), 16) * 100 / 255.0;
        data.value_b = parseInt(color.substring(5, 7), 16) * 100 / 255.0;
        function rateLimitedSend( a ) {
          var modified = false;
          var address = data.address;
          var r  = data.value_r;
          var g  = data.value_g;
          var b  = data.value_b;
          var br = data.bus_r;
          var bg = data.bus_g;
          var bb = data.bus_b;
          var v;
          for( var addr in address )
          {
            if( !(address[addr][1] & 2) ) { continue; } // skip when write flag not set
            switch( address[addr][2] )
            {
              case 'r':
                v = Transform[address[addr][0]].encode( r );
                if( v !== Transform[address[addr][0]].encode( br ) )
                {
                  templateEngine.visu.write( addr, v );
                  modified = true;
                }
                break;
              case 'g':
                v = Transform[address[addr][0]].encode( g );
                if( v !== Transform[address[addr][0]].encode( bg ) )
                {
                  templateEngine.visu.write( addr, v );
                  modified = true;
                }
                break;
              case 'b':
                v = Transform[address[addr][0]].encode( b );
                if( v !== Transform[address[addr][0]].encode( bb ) )
                {
                  templateEngine.visu.write( addr, v );
                  modified = true;
                }
                break;
              case 'rgb':
                var rgb = [r*255/100.0,g*255/100.0,b*255/100.0];
                var brgb = [br*255/100.0,bg*255/100.0,bb*255/100.0];
                v = Transform[address[addr][0]].encode( rgb );
                var bv = Transform[address[addr][0]].encode( brgb );
                if( v[0] !== bv[0] || v[1] !== bv[1] || v[2] !== bv[2] )
                {
                  templateEngine.visu.write( addr, v );
                  modified = true;
                }
                break;
            }
          }

          if( modified ) 
          {
            data.bus_r = data.value_r;
            data.bus_g = data.value_g;
            data.bus_b = data.value_b;
            data.rateLimiter = true;
            setTimeout( function(){rateLimitedSend( a );}, 250 ); // next call in 250ms
          } else {
            data.rateLimiter = false;
          }
        }
        if( data.rateLimiter === false ) {// already requests going?
          rateLimitedSend($actor);
        }
      });
    });

    return ret_val + actor + '</div>';
  },
  update: function( ga, data ) {
    function toHex( x ) { var r = parseInt( x ).toString(16); return r.length == 1 ? '0'+r : r; }
    var 
      element    = $(this),
      wData      = templateEngine.widgetDataGetByElement( this ),
      value      = templateEngine.transformDecode( wData.address[ ga ][0], data ),
      farbtastic = jQuery.farbtastic( element.find('.actor') ),
      color      = farbtastic.color || '#000000';
      
    switch( wData.address[ ga ][2] )
    {
      case 'r':
        wData.bus_r = value;
        color = color.substring(0,1) +
                toHex( value*255/100 )+
                color.substring(3);
        break;
        
      case 'g':
        wData.bus_g = value;
        color = color.substring(0,3) +
                toHex( value*255/100 )+
                color.substring(5);
        break;
        
      case 'b':
        wData.bus_b = value;
        color = color.substring(0,5) +
                toHex( value*255/100 )+
                color.substring(7);
        break;
      case 'rgb':
        wData.bus_r = value[0];
        wData.bus_g = value[1];
        wData.bus_b = value[2];
        color = color.substring(0,1) +
        toHex( value[0]*255/100 )+
        toHex( value[1]*255/100 )+
        toHex( value[2]*255/100 )+
        color.substring(7);
        break;
    }
    farbtastic.setColor( color );
  }
});

  /**
   * Include the needed stuff
   */
  //$.getCSS('plugins/colorchooser/farbtastic/farbtastic.css', {}, function() {
  //    $.includeScripts('plugins/colorchooser/farbtastic/farbtastic.js', templateEngine.pluginLoaded);
  //});

});