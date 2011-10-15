/* visudesign_pure.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

// Define ENUM of maturity levels for features, so that e.g. the editor can 
// ignore some widgets when they are not supported yet
var Maturity = {
  release     : 0,
  development : 1
};

/**
 * This class defines all the building blocks for a Visu in the "Pure" design
 */
function VisuDesign() {
  this.creators = {};

  this.addCreator = function (name, object) {
    this.creators[name] = object;
  }

  this.getCreator = function(name) {
    if (this.creators[name] === undefined) {
      return this.creators.unknown;
    }
    return this.creators[name];
  }

  this.popups = {};

  this.addPopup = function (name, object) {
    this.popups[name] = object;
    this.popups[name].type = name;
  }

  this.getPopup = function(name) {
    if (typeof this.popups[name] == undefined) {
        return this.popups.unknown;
    }
    return this.popups[name];
  }

  /**
   * The creators object contians all widgets creators and their mapping to the
   * XML config file tags
   */
  this.addCreator('page', {
    create: function( page, path, flavour ) {
      var $p = $(page);
      var ret_val = $('<div class="widget" />');
      var pstyle  = ( '0' != path ) ? 'display:none;' : ''; // subPage style
      var name    = $p.attr('name');
      var type    = $p.attr('type');                        //text, 2d or 3d
      if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
      var wstyle  = '';                                     // widget style
      if( $p.attr('align') ) wstyle += 'text-align:' + $p.attr('align') + ';';
      if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';
      ret_val.addClass( 'link' ).addClass('pagelink');
      ret_val.append( '<div ' + wstyle + '><a href="javascript:scrollToPage(\''+path+'\')">' + name + '</a></div>' );
      var childs = $p.children();
      var container = $( '<div class="clearfix"/>' );
      container.append( '<h1>' + name + '</h1>' );
      $( childs ).each( function(i){
          container.append( create_pages( childs[i], path + '_' + i, flavour ) );
      } );
      var subpage = $( '<div class="page" id="' + path + '" style="'+pstyle+';"/>' );
      subpage.append(container);
      if( flavour ) subpage.addClass( 'flavour_' + flavour );
      $('#pages').prepend( subpage );
      return ret_val;
    },
    attributes: {
      align:  { type: 'string', required: false },
      flavour:{ type: 'string', required: false },
      name:   { type: 'string', required: true }
    },
    elements: {
    },
    content: true
  });
  
  this.addCreator('group', {
    maturity: Maturity.development,
    create: function( page, path, flavour ) {
      var $p = $(page);
      var ret_val = $('<div class="widget group" />');
      if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
      var hstyle  = '';                                     // heading style
      if( $p.attr('align') ) hstyle += 'text-align:' + $p.attr('align') + ';';
      if( hstyle != '' ) hstyle = 'style="' + hstyle + '"';
      var childs = $p.children();
      var container = $( '<div class="clearfix"/>' );
      if( $p.attr('name') ) container.append( '<h2 ' + hstyle + '>' + $p.attr('name') + '</h2>' );
      $( childs ).each( function(i){
          container.append( create_pages( childs[i], path + '_' + i, flavour ) );
      } );
      if( flavour ) ret_val.addClass( 'flavour_' + flavour );
      ret_val.append( container );
      return ret_val;
    },
    attributes: {
      align:  { type: 'string', required: false },
      flavour:{ type: 'string', required: false },
      name:   { type: 'string', required: true }
    },
    elements: {
    },
    content: true
  });

  this.addCreator('line', {
    create:     function( page, path ) {
      return $( '<hr />' );
    },
    attributes: {
    },
    content:    false
  });

  this.addCreator('break', {
    create:     function( page, path ) {
      return $( '<br />' );
    },
    attributes: {
    },
    elements: {
    },
    content:    false
  });

  this.addCreator('text', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget text" />');
      var style = '';
      if( $p.attr('align') ) style += 'text-align:' + $p.attr('align') + ';';
      if( style != '' ) style = 'style="' + style + '"';
      ret_val.append( '<div ' + style + '>' + page.textContent + '</div>' );
      return ret_val;
    },
    attributes: {
      align:    { type: 'string', required: false }
    },
    elements: {
    },
    content:    { type: 'string', required: true }
  });

  this.addCreator('info', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget info" />');
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      var address = {};
      $p.find('address').each( function(){ 
        var src = this.textContent;
        ga_list.push( src ) 
        address[ '_' + src ] = [ this.getAttribute('transform') ];
      });
      var actor = '<div class="actor"><div class="value">-</div></div>';
      var $actor = $(actor).data({
        'address'  : address,
        'format'   : $p.attr('format'),
        'mapping'  : $p.attr('mapping'),
        'styling'  : $p.attr('styling')
      });
      for( var addr in address ) $actor.bind( addr, this.update );
      ret_val.append( label ).append( $actor );
      return ret_val;
    },
    update:       defaultUpdate,
    attributes: {
      format:     { type: 'format',    required: false },
      mapping:    { type: 'mapping',   required: false },
      styling:    { type: 'styling',   required: false }
    },
    elements: {
      label:      { type: 'string',    required: true, multi: false },
      address:    { type: 'address',   required: true, multi: true }
    },
    content:      false
  });

  this.addCreator('slide', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget slide" />');
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      var address = {};
      var datatype_min = undefined;
      var datatype_max = undefined;
      $p.find('address').each( function(){ 
        var src = this.textContent;
        var transform = this.getAttribute('transform');
        var readonly  = this.getAttribute('readonly');
        ga_list.push( src ) 
        address[ '_' + src ] = [ transform, readonly=='true' ];
        if( Transform[ transform ] && Transform[ transform ].range )
        {
          if( !( datatype_min > Transform[ transform ].range.min ) ) 
            datatype_min = Transform[ transform ].range.min;
          if( !( datatype_max < Transform[ transform ].range.max ) ) 
            datatype_max = Transform[ transform ].range.max;
        }
      });
      var actor = $('<div class="actor">');
      var min  = parseFloat( $p.attr('min')  || datatype_min || 0   );
      var max  = parseFloat( $p.attr('max')  || datatype_max || 100 );
      var step = parseFloat( $p.attr('step') || 0.5 );
      var $actor = $(actor).data({
        'events':   $(actor).data( 'events' ),
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'min'     : min,
        'max'     : max,
        'step'    : step,
        'type'    : 'dim',
        'valueInternal': true
      });
      for( var addr in address ) $actor.bind( addr, this.update );
      $actor.slider({
        step:    step,
        min:     min,
        max:     max, 
        animate: true,
        start:   this.slideStart,
        change:  this.slideChange
      });
      ret_val.append( label ).append( $actor );
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
      }
    },
    /**
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
          if( data.address[addr][1] == true ) continue; // skip read only
          var dv  = transformEncode( data.address[addr][0], asv );
          if( dv != transformEncode( data.address[addr][0], data.value ) )
            visu.write( addr.substr(1), dv );
        }
        data.value = actor.slider('value');
      }, 250 ) ); // update KNX every 250 ms 
    },
    /**
    * Delete the update thread and send the final value of the slider to the bus
    */
    slideChange:function(event,ui)
    {
      var data = $(this).data();
      clearInterval( data.updateFn, ui.value);
      if( data.valueInternal && data.value != ui.value )
        for( var addr in data.address )
        {
          if( data.address[addr][1] == true ) continue; // skip read only
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
      styling: { type: 'styling', required: false }
    },
    elements: {
      label:      { type: 'string',    required: true, multi: false },
      address:    { type: 'address',   required: true, multi: true }
    },
    content:      false
  });

  this.addCreator('switch', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget switch" />');
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      var address = {};
      $p.find('address').each( function(){ 
        var src = this.textContent;
        var transform = this.getAttribute('transform');
        var readonly  = this.getAttribute('readonly');
        ga_list.push( src ) 
        address[ '_' + src ] = [ transform, readonly=='true' ];
      });
      var actor = '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'on_value'  : $p.attr('on_value' ) || 1,
        'off_value' : $p.attr('off_value') || 0,
        'align'   : $p.attr('align'),
        'type'    : 'switch'
      } ).bind( 'click', this.action );
      for( var addr in address ) $actor.bind( addr, this.update );
      ret_val.append( label ).append( $actor );
      return ret_val;
    },
    update: function(e,d) { 
      var element = $(this);
      var value = defaultUpdate( e, d, element );
      var off = map( element.data( 'off_value' ), element );
      element.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
      element.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
    },
    action: function() {
      var data = $(this).data();
      for( var addr in data.address )
      {
        if( data.address[addr][1] == true ) continue; // skip read only
        visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value == data.off_value ? data.on_value : data.off_value ) );
      }
    },
    attributes: {
      on_value:   { type: 'string'  , required: false },
      off_value:  { type: 'string'  , required: false },
      mapping:    { type: 'mapping' , required: false },
      styling:    { type: 'styling' , required: false },
      align:      { type: 'string'  , required: false }
    },
    elements: {
      label:      { type: 'string',    required: true, multi: false },
      address:    { type: 'address',   required: true, multi: true }
    },
    content:      false
  });
  
  this.addCreator('multitrigger', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget switch" />');
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      var address = {};
      $p.find('address').each( function(){ 
        var src = this.textContent;
        var transform = this.getAttribute('transform');
        var readonly  = this.getAttribute('readonly');
        ga_list.push( src ) 
        address[ '_' + src ] = [ transform, readonly=='true' ];
      });
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
        buttons.append( $actor );
        if( 1 == buttonCount++ % 2 ) buttons.append( $('<br/>') );
      }
      //for( var addr in address ) $actor.bind( addr, this.update );
      //            ret_val.append( label ).append( $actor );
      return ret_val.append( buttons );
    },
    update: function(e,d) { 
      var element = $(this);
      var value = defaultUpdate( e, d, element );
      element.removeClass( value == 0 ? 'switchPressed' : 'switchUnpressed' );
      element.addClass(    value == 0 ? 'switchUnpressed' : 'switchPressed' );
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
      button1label:      { type: 'string'  , required: false },
      button1value:      { type: 'string'  , required: false },
      button2label:      { type: 'string'  , required: false },
      button2value:      { type: 'string'  , required: false },
      button3label:      { type: 'string'  , required: false },
      button3value:      { type: 'string'  , required: false },
      button4label:      { type: 'string'  , required: false },
      button4value:      { type: 'string'  , required: false },
      mapping:           { type: 'mapping' , required: false },
      styling:           { type: 'styling' , required: false },
      align:             { type: 'string'  , required: false }
    },
    elements: {
      label:             { type: 'string',    required: false, multi: false },
      address:           { type: 'address',   required: true, multi: true }
    },
    content:      false
  });
  
  this.addCreator('trigger', {
    create: function( page, path ) {
      var $p = $(page);
      var value = $p.attr('value') ? $p.attr('value') : 0;
      var ret_val = $('<div class="widget switch" />');
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      var address = {};
      $p.find('address').each( function(){ 
        var src = this.textContent;
        var transform = this.getAttribute('transform');
        var readonly  = this.getAttribute('readonly');
        ga_list.push( src ) 
        address[ '_' + src ] = [ transform, readonly=='true' ];
      });
      var actor = '<div class="actor switchUnpressed ';
      if ( $p.attr( 'align' ) ) 
        actor += $p.attr( 'align' ); 
      actor += '">';
      var map = $p.attr('mapping');
      if( mappings[map] && mappings[map][value] )
        actor += '<div class="value">' + mappings[map][value] + '</div>';
      else
        actor += '<div class="value">' + value + '</div>';
      actor += '</div>';
      var $actor = $(actor).data( {
        'address' : address,
        'mapping' : $(page).attr('mapping'),
        'styling' : $(page).attr('styling'),
        'type'    : 'trigger',
        'align'   : $p.attr('align'),
        'sendValue': value
      } ).bind( 'click', this.action );
      ret_val.append( label ).append( $actor );
      return ret_val;
    },
    action: function() {
      var data = $(this).data();
      for( var addr in data.address )
      {
        if( data.address[addr][1] == true ) continue; // skip read only
        visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.sendValue ) );
      }
    },
    attributes: {
      value:    { type: 'string'  , required: true  },
      mapping:  { type: 'mapping' , required: false },
      styling:  { type: 'styling' , required: false },
      align:    { type: 'string'  , required: false },
    },
    elements: {
      label:      { type: 'string',    required: true, multi: false },
      address:    { type: 'address',   required: true, multi: true }
    },
    content:      false
  });

  this.addCreator('image', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget image" />');
      var labelElement = $p.find('label')[0];
      ret_val.append( labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '' );
      var style = '';
      if( $p.attr('width' ) ) style += 'width:'  + $p.attr('width' ) + ';';
      if( $p.attr('height') ) style += 'height:' + $p.attr('height') + ';';
      if( style != '' ) style = 'style="' + style + '"';
      var actor = '<div class="actor"><img src="' +$p.attr('src') + '" ' + style + ' /></div>';
      var refresh = $p.attr('refresh') ? $p.attr('refresh')*1000 : 0;
      ret_val.append( $(actor).data( {
        'refresh': refresh
      } ).each(setupRefreshAction) ); // abuse "each" to call in context...
      return ret_val;
    },
    attributes: {
      src:        { type: 'uri'    , required: true  },
      width:      { type: 'string' , required: false },
      height:     { type: 'string' , required: false },
      refresh:    { type: 'numeric', required: false }
    },
    elements: {
      label:      { type: 'string',    required: false, multi: false }
    },
    content:      false
  });

  this.addCreator('video', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget video" />');
      var labelElement = $p.find('label')[0];
      ret_val.append( labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '' );
      var style = '';
      if( $p.attr('width' ) ) style += 'width:'  + $p.attr('width' ) + ';';
      if( $p.attr('height') ) style += 'height:' + $p.attr('height') + ';';
      if( style != '' ) style = 'style="' + style + '"';
      var actor = '<div class="actor"><video src="' +$p.attr('src') + '" ' + style + '  controls="controls" /></div>';
      var refresh = $p.attr('refresh') ? $p.attr('refresh')*1000 : 0;
      ret_val.append( $(actor).data( {
        'refresh': refresh
      } ).each(setupRefreshAction) ); // abuse "each" to call in context...
      return ret_val;
    },
    attributes: {
      src:     { type: 'uri'    , required: true  },
      width:   { type: 'string' , required: false },
      height:  { type: 'string' , required: false },
      refresh: { type: 'numeric', required: false }
    },
    elements: {
      label:      { type: 'string',    required: false, multi: false }
    },
    content:      false
  });

  this.addCreator('iframe', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget" />');
      ret_val.addClass( 'iframe' );
      ret_val.append( '<div class="label">' + page.textContent + '</div>' );
      var style = '';
      if( $p.attr('width' ) ) style += 'width:'  + $p.attr('width' ) + ';';
      if( $p.attr('height') ) style += 'height:' + $p.attr('height') + ';';
      if( $p.attr('frameborder') == "false" ) style += 'border: 0px ;';
      if( $p.attr('background') ) style += 'background-color:' + $p.attr('background') + ';';
      if( style != '' ) style = 'style="' + style + '"';
      var actor = '<div class="actor"><iframe src="' +$p.attr('src') + '" ' + style + '></iframe></div>';
      ret_val.append( $(actor) ); 
      return ret_val;
    },
    attributes: {
      src:         { type: 'uri'   , required: true  },
      width:       { type: 'string', required: false },
      height:      { type: 'string', required: false },
      frameborder: { type: 'list'  , required: false, list: {'true': "yes", 'false': "no"} },
      background:  { type: 'string', required: false }
    },
    elements: {
      label:  { type: 'string',    required: false, multi: false }
    },
    content:      false
  });

  this.addCreator('infotrigger', {
    create: function( page, path ) {
      var $p = $(page);
      var ret_val = $('<div class="widget switch" />');

      // handle label
      var labelElement = $p.find('label')[0];
      var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
      ret_val.append( label );

      // handle addresses
      var address = {};
      var addrread = {};
      $p.find('address').each( function(){ 
        var src = this.textContent;
        var transform = this.getAttribute('transform');
        var readonly  = this.getAttribute('readonly');
        ga_list.push( src ) 
        if (readonly=='true') {
          addrread[ '_' + src ] = [ transform, readonly=='true' ];
        } else {
          address[ '_' + src ] = [ transform, readonly=='true' ];
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
        'type'    : 'switch'
      } ).bind( 'click', this.action );

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
        'type'    : 'switch'
      } ).bind( 'click', this.action );

      var actorinfo = '<div class="actor switchInvisible"><div class="value">-</div></div>';
      var $actorinfo = $(actorinfo).data({
        'address'  : addrread,
        'format'   : $p.attr('format'),
        'mapping'  : $p.attr('mapping'),
        'styling'  : $p.attr('styling'),
        'align'    : $p.attr('align'),
      });
      for( var addr in addrread ) $actorinfo.bind( addr, this.update );

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
      for( var addr in data.address )
      {
        if( data.address[addr][1] == true ) continue; // skip read only
        visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value ) );
      }
    },
    attributes: {
      uplabel:           { type: 'string'  , required: false },
      upvalue:           { type: 'string'  , required: false },
      downlabel:         { type: 'string'  , required: false },
      downvalue:         { type: 'string'  , required: false },
      mapping:           { type: 'mapping' , required: false },
      styling:           { type: 'styling' , required: false },
      align:             { type: 'string'  , required: false },
      infoposition:      { type: 'numeric' , required: false }
    },
    elements: {
      label:             { type: 'string',    required: false, multi: false },
      address:           { type: 'address',   required: true, multi: true }
    },
    content:      false
  });
  
  this.addCreator('unknown', {
    create: function( page, path ) {
      var ret_val = $('<div class="widget" />');
      ret_val.append( '<pre>unknown: ' + page.nodeName + '</pre>' );
      return ret_val;
    },
    attributes: {
    },
    content: {type: 'string', required: true}
  });

  this.addPopup('unknown', {
    create: function( attributes ) {
      var repositon = false;
      var ret_val = $('<div class="popup" style="display:none"/><div class="popup_background" style="display:none" />').appendTo('body');
      ret_val.addClass( this.type );

      if (attributes.title) {
          ret_val.filter(".popup").append( $('<div class="head" />').append(attributes.title));
      }

      if( attributes.content) {
          ret_val.filter(".popup").append( $('<div class="main" />').append(attributes.content));
      }

      if( attributes.width ) {
        ret_val.width( attributes.width );
        reposition = true;
      }

      if( attributes.height ) {
        ret_val.height( attributes.height );
        reposition = true;
      }

      var anchor = {x: -1, y: -1, w: 0, h: 0};
      var align;
      if( attributes.position )
      {
        if( attributes.position.offset )
        {
          var offset = attributes.position.offset();
          anchor.x = offset.left;
          anchor.y = offset.top;
          anchor.w = attributes.position.width();
          anchor.h = attributes.position.height();
        } else {
          if( attributes.position.hasOwnProperty('x') ) anchor.x = attributes.position.x;
          if( attributes.position.hasOwnProperty('y') ) anchor.y = attributes.position.y;
          if( attributes.position.hasOwnProperty('w') ) anchor.w = attributes.position.w;
          if( attributes.position.hasOwnProperty('h') ) anchor.h = attributes.position.h;
          if( anchor.w == 0 && anchor.h == 0 ) align = 5;
        }
      }
      if( attributes.align !== undefined ) align = attributes.align;
      var placement = placementStrategy( 
        anchor, 
        { w:ret_val.outerWidth(), h:ret_val.outerHeight() }, 
        { w:$(window).width()   , h:$(window).height()    },
        align
      );
      ret_val.css( 'left', placement.x );
      ret_val.css( 'top' , placement.y );

      ret_val.bind("click", function() {
          ret_val.remove();
          return false;
      });

      ret_val.css( 'display', 'block' );
      return ret_val;
    },
    attributes: {
      title:      {type: 'string', required: false},
      content:    {type: 'string', required: false},
      width:      {type: 'string', required: false},
      height:     {type: 'string', required: false},
      position:   {type: 'object', required: false}  // either {x:,y:} or an jQuery object
    }
  });

  this.addPopup('info'   , $.extend(true, {}, this.getPopup('unknown')) );
  this.addPopup('warning', $.extend(true, {}, this.getPopup('unknown')) );
  this.addPopup('error'  , $.extend(true, {}, this.getPopup('unknown')) ) ;

  this.slideAction = function(event,ui) {
  //alert(ui.value);
    var now = new Date().getTime();
    var data = $( '.actor', $(this).parent() ).data();
    if( data.last &&  (now - data.last) < 1000 ) return; // too fast => early exit
    $( '.actor', $(this).parent() ).data( 'last', now );  
  //$(this).parent().data();
  //  alert( data.GA + ' = ' + data.value );
    //visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
    //FIXME eigentlich richtig... visu.write( data.GA, ui.value, data.datatype ); 
  }

  /**
   * Setup a refresh interval in seconds if the 'refresh' in the .data()
   * ist bigger than 0
   */
  this.refreshAction = function(that) {
    var data = $(this).data();
    alert('this.refreshAction');
  }
};

/**
 * Figure out best placement of popup.
 * A preference can optionally be passed. The position is that of the numbers
 * on the numeric keypad. I.e. a value of "6" means centered above the anchor.
 * A value of "0" means centered to the page
 */
function placementStrategy( anchor, popup, page, preference )
{
  var position_order = [ 8, 2, 6, 4, 9, 3, 7, 1, 5, 0 ];
  if( preference !== undefined ) position_order.unshift( preference );
  
  for( pos in position_order )
  {
    var xy = {};
    switch(position_order[pos])
    {
      case 0: // page center - will allways work
        return { x: (page.w-popup.w)/2, y: (page.h-popup.h)/2 };
      
      case 1:
        xy.x = anchor.x - popup.w;
        xy.y = anchor.y + anchor.h;
        break;
      
      case 2:
        xy.x = anchor.x + anchor.w/2 - popup.w/2;
        xy.y = anchor.y + anchor.h;
        break;
      
      case 3:
        xy.x = anchor.x + anchor.w;
        xy.y = anchor.y + anchor.h;
        break;
      
      case 4:
        xy.x = anchor.x - popup.w;
        xy.y = anchor.y + anchor.h/2 - popup.h/2;
        break;
      
      case 5:
        xy.x = anchor.x + anchor.w/2 - popup.w/2;
        xy.y = anchor.y + anchor.h/2 - popup.h/2;
        break;
      
      case 6:
        xy.x = anchor.x + anchor.w;
        xy.y = anchor.y + anchor.h/2 - popup.h/2;
        break;
      
      case 7:
        xy.x = anchor.x - popup.w;
        xy.y = anchor.y - popup.h;
        break;
      
      case 8:
        xy.x = anchor.x + anchor.w/2 - popup.w/2;
        xy.y = anchor.y - popup.h;
        break;
      
      case 9:
        xy.x = anchor.x + anchor.w;
        xy.y = anchor.y - popup.h;
        break;
    }
    
    // test if that solution is valid
    if( xy.x >= 0 && xy.y >= 0 && xy.x+popup.w<=page.w && xy.y+popup.h<=page.h )
      return xy;
  }
  
  return { x: 0, y: 0 }; // sanity return
}

function defaultUpdate( e, data, passedElement ) 
{
  var element = passedElement || $(this);
  var thisTransform = element.data().address[ e.type ][0];
  var value = transformDecode( element.data().address[ e.type ][0], data );

  var styling = element.data('styling');
  if( styling && stylings[styling] && (stylings[styling][value] || stylings[styling]['range']) )
  {
    if( stylings[styling]['range'] ) value = parseFloat( value );
    element.removeClass();
    if( stylings[styling][value] )
    {
      element.addClass( 'actor ' + stylings[styling][value] );
    } else {
      var range = stylings[styling]['range'];
      var not_found = true;
      for( var min in range )
      {
        if( min > value ) continue;
        if( range[min][0] < value ) continue; // check max
        element.addClass( 'actor ' + range[min][1] );
        not_found = false;
        break;
      }
      if( not_found ) element.addClass( 'actor ' );
    }
  }

  if( element.data( 'align' ) )
    element.addClass(element.data( 'align' ) );

  if( element.data( 'precision' ) )
    value = Number( value ).toPrecision( element.data( 'precision' ) );
  if( element.data( 'format' ) )
    value = sprintf( element.data( 'format' ), value );
  element.data( 'value', value );
  value = map( value, element );
  if( value.constructor == Date )
  {
    switch( thisTransform ) // special case for KNX
      {
      case 'DPT:10.001':
        value = value.toLocaleTimeString();
        break;
      case 'DPT:11.001':
        value = value.toLocaleDateString();
        break;
      }
  }
  element.find('.value').text( value );
  
  return value;
}
