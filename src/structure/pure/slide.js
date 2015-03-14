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

function transformSlider(value,handle) 
{
  if (!$('#main').data('disableSliderTransform')) {
    if (!isNaN(value)) {
      var handleWidth = $(handle).outerWidth();
      var sliderMax = $(handle).parent().slider("option","max")+Math.abs($(handle).parent().slider("option","min"));
      var percent = Math.round((100/sliderMax)*(value+Math.abs($(handle).parent().slider("option","min"))));
      var translate = Math.round(handleWidth * percent/100);
      if (percent==100)
        translate-=1; // fix for visible slider bar right border, when handle is at 100%
      console.log("Width: "+handleWidth+", Value: "+value+", Max/Min: "+sliderMax+", %: "+percent+" => "+percent);
      $(handle).css('transform', 'translateX(-'+translate+'px)');
    }
  }
}

define( ['_common'], function( design ) {
   var basicdesign = design.basicdesign;
   
design.basicdesign.addCreator('slide', {
  create: function( element, path, flavour, type ) {
    var self = this,
        $e = $(element);
    
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
    var data = templateEngine.widgetDataInsert( path, {
      //???///'events':   $(actor).data( 'events' ),
      'min'     : min,
      'max'     : max,
      'step'    : step,
      'valueInternal': true,
      'inAction': false,
    });
    
    // create the actor
    templateEngine.postDOMSetupFns.push( function(){
      var $actor = $( '#' + path + ' .actor' );
      $actor.slider({
        step:    step,
        min:     min,
        max:     max, 
        range:   'min', 
        animate: true,
        start:   self.slideStart,
        change:  self.slideChange
      });
      
      if( data['format']) {
        $actor.on( 'slide', self.slideUpdateValue );
        
        // initially setting a value
        $actor.children('.ui-slider-handle').text(sprintf(data['format'],templateEngine.map( undefined, data['mapping'] )));
      }
      // Mark all horizontal sliders for correct transformation
      $actor.children('.ui-slider-horizontal .ui-slider-handle').addClass('untransformed');
      $(window).bind("scrolltopage",self.sliderVisible);
    });
    
    return ret_val + '<div class="actor"/></div>';
  },
  update: function( ga, d ) { 
    var element = $(this),
        actor   = element.find('.actor'),
        data    = templateEngine.widgetDataGetByElement( this );
    
    if( data.inAction )
      return;
    
    var value = templateEngine.transformDecode( data.address[ ga ][0], d );
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
        data    = templateEngine.widgetDataGetByElement( this );
    if( data.format)
      $(ui.handle).text(sprintf( data.format, templateEngine.map( ui.value, data.mapping )));
    transformSlider(ui.value,ui.handle);
  },
  /*
  * Start a thread that regularily sends the silder position to the bus
  */
  slideStart:function(event,ui)
  {
    var element = $(this).parent(),
        actor   = element.find('.actor'),
        data    = templateEngine.widgetDataGetByElement( this );
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
          templateEngine.visu.write( addr, dv );
      }
      data.value = asv;
    }, 250 ); // update KNX every 250 ms
  },
  /*
  * Delete the update thread and send the final value of the slider to the bus
  */
  slideChange:function(event,ui)
  {
    var data    = templateEngine.widgetDataGetByElement( this );
    clearInterval( data.updateFn, ui.value);
    data.inAction = false;
    if( data.valueInternal && data.value != ui.value )
    {
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var uv  = templateEngine.transformEncode( data.address[addr][0], ui.value );
        if( uv != templateEngine.transformEncode( data.address[addr][0], data.value ) )
          templateEngine.visu.write( addr, uv );
      }
    }
    transformSlider(ui.value,ui.handle);
  },
  sliderVisible:function(event,page_id)
  {
    $('.ui-slider-handle.untransformed', '#'+page_id).each(function(i) {
      $(this).removeClass('untransformed');
      var actor = $(this).parent();
      var val = actor.slider("value");
      transformSlider(val,this);
    });
  },
  
});

}); // end define