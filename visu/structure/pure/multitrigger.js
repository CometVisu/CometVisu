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
  create: function( page, path ) {
    var $p = $(page);
    var layout = $p.find('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout ) + '"' : '';
    var ret_val = $('<div class="widget clearfix switch" ' + style + '/>');
    ret_val.setWidgetLayout($p)
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = makeAddressList($p);
    var showstatus = $p.attr("showstatus") || "false";
    ret_val.append( label );
    var buttons = $('<div style="float:left"/>');
    var buttonCount = 0;
    if( $p.attr('button1label') )
    {
      //buttonCount++;
      var actor = '<div class="actor switchUnpressed ';
      if ( $p.attr( 'align' ) ) 
        actor += $p.attr( 'align' ); 
      actor += '">';
      
      actor += '<div class="value">' + $p.attr('button1label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'value'   : $p.attr('button1value'),
        'align'   : $p.attr('align'),
        'type'    : 'switch'
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == (buttonCount++ % 2) ) buttons.append( $('<br/>') );
    }
    if( $p.attr('button2label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $p.attr( 'align' ) ) 
        actor += $p.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $p.attr('button2label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'value'   : $p.attr('button2value'),
        'type'    : 'switch',
        'align'   : $p.attr('align')
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == (buttonCount++ % 2) ) buttons.append( $('<br/>') );
    }
    if( $p.attr('button3label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $p.attr( 'align' ) ) 
        actor += $p.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $p.attr('button3label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'value'   : $p.attr('button3value'),
        'type'    : 'switch'
      } ).bind( 'click', this.action );
      if( showstatus == "true" ) {
          for( var addr in address ) $actor.bind( addr, this.update );        
      }
      buttons.append( $actor );
      if( 1 == buttonCount++ % 2 ) buttons.append( $('<br/>') );
    }
    if( $p.attr('button4label') )
    {
      var actor = '<div class="actor switchUnpressed ';
      if ( $p.attr( 'align' ) ) 
        actor += $p.attr( 'align' ); 
      actor += '">';
      actor += '<div class="value">' + $p.attr('button4label') + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'value'   : $p.attr('button4value'),
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
    var value = transformDecode( element.data().address[ e.type ][0], d );
    element.removeClass( value == element.data().value ? 'switchUnpressed' : 'switchPressed' );
    element.addClass(    value == element.data().value ? 'switchPressed' : 'switchUnpressed' );
  },
  action: function() {
    var data = $(this).data();
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value ) );
    }
  },
  attributes: {
    button1label: { type: 'string' , required: false },
    button1value: { type: 'string' , required: false },
    button2label: { type: 'string' , required: false },
    button2value: { type: 'string' , required: false },
    button3label: { type: 'string' , required: false },
    button3value: { type: 'string' , required: false },
    button4label: { type: 'string' , required: false },
    button4value: { type: 'string' , required: false },
    mapping:      { type: 'mapping', required: false },
    styling:      { type: 'styling', required: false },
    align:        { type: 'string' , required: false },
    showstatus:   { type: 'list'   , required: true , list: {'true': "yes", 'false': "no"}   },
    colspan:      { type: 'numeric', required: false },
    rowspan:      { type: 'numeric', required: false }
  },
  elements: {
    layout:       { type: 'layout' , required: false, multi: false },
    label:        { type: 'string' , required: false, multi: false },
    address:      { type: 'address', required: true , multi: true  }
  },
  content:      false
});