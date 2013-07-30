/* infotrigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('infotrigger', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    var ret_val = $('<div class="widget clearfix infotrigger" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    ret_val.append( extractLabel( $e.find('label')[0], flavour ) );
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    // handle addresses
    var address = makeAddressList($e, 
      function( src, transform, mode, variant ) {
        return [ variant != 'button' && variant != 'short', variant == 'button' ? 1 : (variant == 'short' ? 2 : 0) ];
      }
    );

    // create buttons + info
    var buttons = $('<div style="float:left;"/>');
    var buttonCount = 2;

    var actordown = '<div class="actor switchUnpressed downlabel" ';
    if ( $e.attr( 'align' ) ) 
      actorinfo += 'style="text-align: '+$e.attr( 'align' )+'" '; 
    actordown += '>';
    actordown += '<div class="value">' + ($e.attr('downlabel') ? $e.attr('downlabel') : '-') + '</div>';
    actordown += '</div>';
    var $actordown = $(actordown).data( {
      'address'    : address,
      'value'      : $e.attr('downvalue') || 0,
      'shortvalue' : $e.attr('shortdownvalue') || 0,
      'shorttime'  : parseFloat($e.attr('shorttime')) || -1,
      'align'      : $e.attr('align'),
      'change'     : $e.attr('change') || 'relative',
      'min'        : parseFloat($e.attr('min')) || 0,
      'max'        : parseFloat($e.attr('max')) || 255,
      'type'       : 'switch'
    } ).bind( 'mousedown touchstart', this.mousedown ).
      bind( 'mouseup touchend', this.mouseup ).
      bind( 'mouseout touchout', this.mouseout );/*.
      .bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } );*/

    var actorup = '<div class="actor switchUnpressed uplabel" ';
    if ( $e.attr( 'align' ) ) 
      actorinfo += 'style="text-align: '+$e.attr( 'align' )+'" '; 
    actorup += '>';
    actorup += '<div class="value">' + ($e.attr('uplabel') ? $e.attr('uplabel') : '+') + '</div>';
    actorup += '</div>';
    var $actorup = $(actorup).data( {
      'address'    : address,
      'value'      : $e.attr('upvalue') || 1,
      'shortvalue' : $e.attr('shortupvalue') || 1,
      'shorttime'  : parseFloat($e.attr('shorttime')) || -1,
      'align'      : $e.attr('align'),
      'change'     : $e.attr('change') || 'relative',
      'min'        : parseFloat($e.attr('min')) || 0,
      'max'        : parseFloat($e.attr('max')) || 255,
      'type'       : 'switch'
    } ).bind( 'mousedown touchstart', this.mousedown ).
      bind( 'mouseup touchend', this.mouseup ).
      bind( 'mouseout touchout', this.mouseout );/*..bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } );*/

    var actorinfo = '<div class="actor switchInvisible " ';
    if ( $e.attr( 'align' ) ) 
      actorinfo += 'style="text-align: '+$e.attr( 'align' )+'" '; 
    actorinfo += '" ><div class="value">-</div></div>';
    var $actorinfo = $(actorinfo).data({
      'address'  : address,
      'format'   : $e.attr('format'),
      'mapping'  : $e.attr('mapping'),
      'styling'  : $e.attr('styling'),
      'align'    : $e.attr('align'),
    });
    for( var addr in address ) 
    {
      if( !address[addr][2] ) // if NOT relative
        $actorinfo.bind( addr, this.update );
    }

    // initially setting a value
    defaultUpdate(undefined, undefined, $actorinfo);

    if ( $e.attr('infoposition' )==1 ) {
      buttons.append( $actordown );
      buttons.append( $actorinfo );
      buttons.append( $actorup );        
    } else if ( $e.attr('infoposition' )==2 ) {
      buttons.append( $actordown );
      buttons.append( $actorup );        
      buttons.append( $actorinfo );
    } else {
      buttons.append( $actorinfo );
      buttons.append( $actordown );
      buttons.append( $actorup );        
    }

    ret_val.append( buttons );
    return ret_val;
  },

  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    element.addClass('switchInvisible');
  },
  mousedown: function(event) {
    $(this).removeClass('switchUnpressed').addClass('switchPressed').data( 'downtime', new Date().getTime() );
    if( 'touchstart' == event.type )
    {
      // touchscreen => disable mouse emulation
      $(this).unbind('mousedown').unbind('mouseup').unbind('mouseout');
    }
  },
  mouseup: function(event) {
    var $this = $(this);
    if( $this.data( 'downtime' ) )
    {
      var data = $this.data();
      var isShort = (new Date().getTime()) - data.downtime < data.shorttime;
      var value = data.value;
      var relative = ( data.change != 'absolute' );
      if( !relative )
      {
        value = parseFloat($(this).parent().find('.switchInvisible').data('basicvalue'));
        if( isNaN( value ) )
          value = 0; // anything is better than NaN...
        value = value + parseFloat(data.value);
        if (value < data.min ) value = data.min;
        if( value > data.max ) value = data.max;
      }
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        if(   !isShort && 1 == data.address[addr][2] )
          templateEngine.visu.write( addr.substr(1), templateEngine.transformEncode( data.address[addr][0], data.shortvalue ) );
        if( (  isShort && 2 == data.address[addr][2]) || 
            (!relative && 0 == data.address[addr][2]) )
          templateEngine.visu.write( addr.substr(1), templateEngine.transformEncode( data.address[addr][0], value ) );
      }
    }
    $this.removeClass('switchPressed').addClass('switchUnpressed').removeData( 'downtime' );
  },
  mouseout: function(event) {
    $(this).removeClass('switchPressed').addClass('switchUnpressed').removeData( 'downtime' );
  }
});