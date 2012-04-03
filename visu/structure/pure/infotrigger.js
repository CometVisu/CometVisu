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
  create: function( page, path ) {
    var $p = $(page);
    var ret_val = $('<div class="widget clearfix switch" />');
    ret_val.setWidgetLayout($p);
    // handle label
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    ret_val.append( label );

    // handle addresses
    var address = {};
    $p.find('address').each( function(){ 
      var src = this.textContent;
      var transform = this.getAttribute('transform');
      var readonly  = this.getAttribute('readonly' ) == 'true';
      var isButton  = this.getAttribute('variant'  ) == 'button';
      address[ '_' + src ] = [ transform, readonly, isButton ];
      if( !isButton ) { // no need to listen to relative address
        ga_list.push( src );
      };
    });

    // create buttons + info
    var buttons = $('<div style="float:left;"/>');
    var buttonCount = 2;

    var actordown = '<div class="actor switchUnpressed '
    if ( $p.attr( 'align' ) ) 
      actordown += $p.attr( 'align' ); 
    actordown += '">';
    actordown += '<div class="value">' + ($p.attr('downlabel') ? $p.attr('downlabel') : '-') + '</div>';
    actordown += '</div>';
    var $actordown = $(actordown).data( {
      'address' : address,
      'mapping' : $p.attr('mapping'),
      'styling' : $p.attr('styling'),
      'value'   : $p.attr('downvalue') || 0,
      'align'   : $p.attr('align'),
      'change'  : $p.attr('change') || 'relative',
      'min'     : parseFloat($p.attr('min')) || 0,
      'max'     : parseFloat($p.attr('max')) || 255,
      'type'    : 'switch'
    } ).bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } );

    var actorup = '<div class="actor switchUnpressed '
    if ( $p.attr( 'align' ) ) 
      actorup += $p.attr( 'align' ); 
    actorup += '">';
    actorup += '<div class="value">' + ($p.attr('uplabel') ? $p.attr('uplabel') : '+') + '</div>';
    actorup += '</div>';
    var $actorup = $(actorup).data( {
      'address' : address,
      'mapping' : $p.attr('mapping'),
      'styling' : $p.attr('styling'),
      'value'   : $p.attr('upvalue') || 1,
      'align'   : $p.attr('align'),
      'change'  : $p.attr('change') || 'relative',
      'min'     : parseFloat($p.attr('min')) || 0,
      'max'     : parseFloat($p.attr('max')) || 255,
      'type'    : 'switch'
    } ).bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } );

    var actorinfo = '<div class="actor switchInvisible" ';
    if ( $p.attr( 'align' ) ) 
      actorinfo += 'style="text-align: '+$p.attr( 'align' )+'" '; 
    actorinfo += '" ><div class="value">-</div></div>';
    var $actorinfo = $(actorinfo).data({
      'address'  : address,
      'format'   : $p.attr('format'),
      'mapping'  : $p.attr('mapping'),
      'styling'  : $p.attr('styling'),
      'align'    : $p.attr('align'),
    });
    for( var addr in address ) 
    {
      if( !address[addr][2] ) // if NOT relative
        $actorinfo.bind( addr, this.update );
    }

    if ( $p.attr('infoposition' )==1 ) {
      buttons.append( $actordown );
      buttons.append( $actorinfo );
      buttons.append( $actorup );        
    } else if ( $p.attr('infoposition' )==2 ) {
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
  action: function() {
    var data = $(this).data();
    var value = data.value;
    var relative = ( data.change != 'absolute' );
    if( !relative )
    {
      value = parseFloat($(this).parent().find('.switchInvisible').data('basicvalue'));
      value = value + parseFloat(data.value);
      if (value < data.min ) value = data.min;
      if( value > data.max ) value = data.max;
    }
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      if( data.address[addr][2] != relative ) continue; // skip when address mode doesn't fit action mode
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], value ) );
    }
  },
  attributes: {
    uplabel:      { type: 'string' , required: false },
    upvalue:      { type: 'string' , required: false },
    downlabel:    { type: 'string' , required: false },
    downvalue:    { type: 'string' , required: false },
    mapping:      { type: 'mapping', required: false },
    styling:      { type: 'styling', required: false },
    align:        { type: 'string' , required: false },
    infoposition: { type: 'list'   , required: true , list: {0: 'Info/Down/Up', 1: 'Down/Info/Up', 2: 'Down/Up/Info'} },
    format:       { type: 'string' , required: false },
    change:       { type: 'list'   , required: false, list: {'relative': 'Send relative/delta values', 'absolute': 'Send absolute values'} },
    min:          { type: 'numeric', required: false },
    max:          { type: 'numeric', required: false },
    colspan:      { type: 'numeric', required: false },
    rowspan:      { type: 'numeric', required: false }
  },
  elements: {
    label:        { type: 'string' , required: false, multi: false },
    address:      { type: 'address', required: true , multi: true , options: {variant: ['', 'isbutton']} }
  },
  content:      false
});