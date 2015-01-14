/* slide.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define( ['_common'], function( design ) {
   var basicdesign = design.basicdesign;
 
design.basicdesign.addCreator('slide', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'slide', $e, path, flavour, type, this.update );
    // and fill in widget specific data
    var datatype_min = undefined;
    var datatype_max = undefined;
    $e.find('address').each( function(){ 
      var transform = this.getAttribute('transform');
      if( Transform[ transform ] && Transform[ transform ].range )
      {
        if( !( datatype_min > Transform[ transform ].range.min ) ) 
          datatype_min = Transform[ transform ].range.min;
        if( !( datatype_max < Transform[ transform ].range.max ) ) 
          datatype_max = Transform[ transform ].range.max;
      }
    });
    var min  = parseFloat( $e.attr('min')  || datatype_min || 0   );
    var max  = parseFloat( $e.attr('max')  || datatype_max || 100 );
    var step = parseFloat( $e.attr('step') || 0.5 );
    ret_val.data({
      //???///'events':   $(actor).data( 'events' ),
      'min'     : min,
      'max'     : max,
      'step'    : step,
      'valueInternal': true,
      'inAction': false,
    });
    
    // create the actor
    var $actor = $('<div class="actor">');
    ret_val.append( $actor );
    
    $actor.slider({
      step:    step,
      min:     min,
      max:     max, 
      range:   'min', 
      animate: true,
      start:   this.slideStart,
      change:  this.slideChange
    });
    if( ret_val.data('format')) {
      $actor.on( 'slide', this.slideUpdateValue );
      
      // initially setting a value
      $actor.children('.ui-slider-handle').text(sprintf(ret_val.data( 'format' ),templateEngine.map( undefined, ret_val.data('mapping') )));
    }
    
    return ret_val;
  },
  update: function( e, d ) { 
    var element = $(this),
        actor   = element.find('.actor'),
        data    = element.data();
    
    if( data.inAction )
      return;
    
    var value = templateEngine.transformDecode( data.address[ e.type ][0], d );
    if( data.value != value )
    {
      data.value         = value;
      data.valueInternal = false;
      actor.slider('value', value);
      data.valueInternal = true;
      if( data.format != null )
        actor.children('.ui-slider-handle').text(sprintf( data.format, templateEngine.map( value, data.mapping )));
    }
  },
  slideUpdateValue:function(event,ui) {
    var element = $(this).parent(),
        actor   = element.find('.actor'),
        data    = element.data();
    if( data.format)
      $(ui.handle).text(sprintf( data.format, templateEngine.map( ui.value, data.mapping )));
  },
  /*
  * Start a thread that regularily sends the silder position to the bus
  */
  slideStart:function(event,ui)
  {
    var element = $(this).parent(),
        actor   = element.find('.actor'),
        data    = element.data();
    data.inAction      = true;
    data.valueInternal = true;
    data.updateFn      = setInterval( function(){
      var asv = actor.slider('value');
      
      if( data.value == asv ) return;
      
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var dv  = templateEngine.transformEncode( data.address[addr][0], asv );
        if( dv != templateEngine.transformEncode( data.address[addr][0], data.value ) )
          templateEngine.visu.write( addr.substr(1), dv );
      }
      data.value = asv;
    }, 250 ); // update KNX every 250 ms 
  },
  /*
  * Delete the update thread and send the final value of the slider to the bus
  */
  slideChange:function(event,ui)
  {
    var data = $(this).parent().data();
    clearInterval( data.updateFn, ui.value);
    data.inAction = false;
    if( data.valueInternal && data.value != ui.value )
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var uv  = templateEngine.transformEncode( data.address[addr][0], ui.value );
        if( uv != templateEngine.transformEncode( data.address[addr][0], data.value ) )
          templateEngine.visu.write( addr.substr(1), uv );
      }
  }
});

}); // end define