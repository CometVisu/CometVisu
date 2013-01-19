/* multitrigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('multitrigger', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix multitrigger" ' + style + '/>');
    ret_val.setWidgetLayout($e)
    ret_val.append( extractLabel( $e.find('label')[0] ) );
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var address = makeAddressList($e);
    var showstatus = $e.attr("showstatus") || "false";
    var buttons = $('<div class="actor_container" style="float:left"/>');
    var buttonCount = 0;
    if( $e.attr('button1label') )
    {
      //buttonCount++;
      var actor = '<div class="actor switchUnpressed ';
      if ( $e.attr( 'align' ) ) 
        actor += $e.attr( 'align' ); 
      actor += '">';
      
      actor += '<div class="value">' + $e.attr('button1label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $e.attr('mapping'),
        'styling' : $e.attr('styling'),
        'value'   : $e.attr('button1value'),
        'align'   : $e.attr('align'),
        'type'    : 'switch'
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == (buttonCount++ % 2) ) buttons.append( $('<br/>') );
    }
    if( $e.attr('button2label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $e.attr( 'align' ) ) 
        actor += $e.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $e.attr('button2label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $e.attr('mapping'),
        'styling' : $e.attr('styling'),
        'value'   : $e.attr('button2value'),
        'type'    : 'switch',
        'align'   : $e.attr('align')
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == (buttonCount++ % 2) ) buttons.append( $('<br/>') );
    }
    if( $e.attr('button3label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $e.attr( 'align' ) ) 
        actor += $e.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $e.attr('button3label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $e.attr('mapping'),
        'styling' : $e.attr('styling'),
        'value'   : $e.attr('button3value'),
        'type'    : 'switch'
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == buttonCount++ % 2 ) buttons.append( $('<br/>') );
    }
    if( $e.attr('button4label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $e.attr( 'align' ) ) 
        actor += $e.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $e.attr('button4label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $e.attr('mapping'),
        'styling' : $e.attr('styling'),
        'value'   : $e.attr('button4value'),
        'type'    : 'switch',
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == buttonCount++ % 2 ) buttons.append( $('<br/>') );
    }
    //for( var addr in address ) $actor.bind( addr, this.update );
    //            ret_val.append( label ).append( $actor );
    return ret_val.append( buttons );
  },
  update: function(e,d) { 
    var element = $(this);
    //var value = defaultUpdate( e, d, element );
    var thisTransform = element.data().address[ e.type ][0];
    var value = templateEngine.transformDecode( element.data().address[ e.type ][0], d );
    element.removeClass( value == element.data().value ? 'switchUnpressed' : 'switchPressed' );
    element.addClass(    value == element.data().value ? 'switchPressed' : 'switchUnpressed' );
  },
  action: function() {
    var data = $(this).data();
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value ) );
    }
  }
});