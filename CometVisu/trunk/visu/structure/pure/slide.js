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

basicdesign.addCreator('slide', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix slide" ' + style + ' />');
    ret_val.setWidgetLayout($e).makeWidgetLabel($e);
    var address = makeAddressList($e);
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
    var actor = $('<div class="actor">');
    var min  = parseFloat( $e.attr('min')  || datatype_min || 0   );
    var max  = parseFloat( $e.attr('max')  || datatype_max || 100 );
    var step = parseFloat( $e.attr('step') || 0.5 );
    var $actor = $(actor).data({
      'events':   $(actor).data( 'events' ),
      'address' : address,
      'mapping' : $e.attr('mapping'),
      'styling' : $e.attr('styling'),
      'min'     : min,
      'max'     : max,
      'step'    : step,
      'type'    : 'dim',
      'valueInternal': true,
      'format'  : $e.attr('format') || null
    });
    for( var addr in address ) 
    { 
      if( address[addr][1] & 1 ) $actor.bind( addr, this.update ); // only when read flag is set
    }
	
    if ($(actor).data('format')!=null) {
      $actor.slider({
        step:    step,
        min:     min,
        max:     max, 
        animate: true,
        start:   this.slideStart,
        change:  this.slideChange,
        slide:   this.slideUpdateValue
      });
      $actor.children('.ui-slider-handle').text(sprintf($actor.data( 'format' ),$actor.slider('value')));
    }
    else {
      $actor.slider({
        step:    step,
        min:     min,
        max:     max, 
        animate: true,
        start:   this.slideStart,
        change:  this.slideChange
      });
    }
    ret_val.append( $actor );
    return ret_val;
  },
  update: function( e, data ) { 
    var element = $(this);
    var value = transformDecode( element.data().address[ e.type ][0], data );
    if( element.data( 'value' ) != value )
    {
      element.data( 'value', value );
      element.data( 'valueInternal', false );
      element.slider('value', value);
      element.data( 'valueInternal', true );
      element.children('.ui-slider-handle').text(sprintf(element.data( 'format' ),value));
    }
  },
  slideUpdateValue:function(event,ui) {
    var actor = $( '.actor', $(this).parent() );
    $(ui.handle).text(sprintf( actor.data( 'format' ), ui.value));
  },
  /*
  * Start a thread that regularily sends the silder position to the bus
  */
  slideStart:function(event,ui)
  {
    var actor = $( '.actor', $(this).parent() );
    actor.data( 'valueInternal', true );
    actor.data( 'updateFn', setInterval( function(){
      var data = actor.data();
      if( data.value == actor.slider('value') ) return;
      var asv = actor.slider('value');
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var dv  = transformEncode( data.address[addr][0], asv );
        if( dv != transformEncode( data.address[addr][0], data.value ) )
          visu.write( addr.substr(1), dv );
      }
      data.value = actor.slider('value');
    }, 250 ) ); // update KNX every 250 ms 
  },
  /*
  * Delete the update thread and send the final value of the slider to the bus
  */
  slideChange:function(event,ui)
  {
    var data = $(this).data();
    clearInterval( data.updateFn, ui.value);
    if( data.valueInternal && data.value != ui.value )
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var uv  = transformEncode( data.address[addr][0], ui.value );
        if( uv != transformEncode( data.address[addr][0], data.value ) )
          visu.write( addr.substr(1), uv );
      }
  },
  attributes: {
    min:     { type: 'numeric', required: false },
    max:     { type: 'numeric', required: false },
    step:    { type: 'numeric', required: false },
    mapping: { type: 'mapping', required: false },
    styling: { type: 'styling', required: false },
    colspan: { type: 'numeric', required: false },
    rowspan: { type: 'numeric', required: false },
    format:  { type: 'string' , required: false }
  },
  elements: {
    label:   { type: 'string' , required: true , multi: false },
    address: { type: 'address', required: true , multi: true  },
    layout:  { type: 'layout' , required: false, multi: false }
  },
  content: false
});