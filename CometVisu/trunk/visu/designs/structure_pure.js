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

/**
 * This class defines all the building blocks for a Visu in the "Pure" design
 */
function VisuDesign() {
    this.creators = {};

    this.addCreator = function (name, object) {
        this.creators[name] = object;
    }

    this.getCreator = function(name) {
        if (typeof this.creators[name] == undefined) {
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
     * The creators object contians all widgets creators and their mappin to the
     * XML config file tags
     */
    this.addCreator("page", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                var style = ( '0' != path ) ? 'display:none' : '';
                var name = $(page).attr('name'); //path += '_' + name;
                var type = $(page).attr('type'); //text, 2d or 3d
                ret_val.addClass( 'link' ).addClass("pagelink");
                ret_val.append( '<a href="javascript:scrollToPage(\''+path+'\')">' + name + '</a>' );
                var childs = $(page).children();
                var container = $( '<div class="clearfix"/>' );

                container.append( '<h1>' + name + '</h1>' );
                $( childs ).each( function(i){
                    container.append( create_pages(childs[i], path + '_' + i ) );
                } );
                $('#pages').prepend( $( '<div class="page" id="' + path + '" style="'+style+';"/>' ).append(container) );
                return ret_val;
            },
        attributes: {
                name: {type: "string", required: true}
        },
        content: true
  });

  this.addCreator("line", {
        create: function( page, path ) {
                return $( '<hr />' );
            },
        attributes: {
        },
        content: false
  });

  this.addCreator("break", {
        create: function( page, path ) {
                return $( '<br />' );
            },
        attributes: {
        },
        content: false
  });


  this.addCreator("text", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'text' );
                var style = '';
                if( $(page).attr('align') ) style += 'text-align:' + $(page).attr('align') + ';';
                if( style != '' ) style = 'style="' + style + '"';
                ret_val.append( '<div ' + style + '>' + page.textContent + '</div>' );
                return ret_val;
            },
        attributes: {
            align:  {type: "string", required: false}
        },
        content: {type: "string", required: true}
  });
  
  this.addCreator("info", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'info' );
                var label = '<div class="label">' + page.textContent + '</div>';
                ga_list.push( $(page).attr('address') );
                var actor = '<div class="actor GA' + $(page).attr('address').split('/').join('_') + '">';
                if( $(page).attr('pre') ) actor += '<div>' + $(page).attr('pre') + '</div>';
                actor += '<div class="value">-</div>';
                if( $(page).attr('post') ) actor += '<div>' + $(page).attr('post') + '</div>';
                actor += '</div>';
                ret_val.append( label ).append( $(actor).data( {
                    'GA':       $(page).attr('address'),
                    'datatype': $(page).attr('datatype'),
                    'mapping' : $(page).attr('mapping'),
                    'styling' : $(page).attr('styling')
                } ).bind('_'+$(page).attr('address'), this.update ) );
                return ret_val;
            },
        update: defaultUpdate,
        attributes: {
            address:    {type: "address", required: true},
            datatype:   {type: "datatype", required: true},
            pre:        {type: "string", required: false},
            post:       {type: "string", required: false},
            mapping:    {type: "mapping", required: false},
            styling:    {type: "styling", required: false}
        },
        content: {type: "string", required: true}
  });

  this.addCreator("shade", this.getCreator("info"));


  this.addCreator("dim", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'dim' );
                var label = '<div class="label">' + page.textContent + '</div>';
                ga_list.push( $(page).attr('address') );
                var actor = $('<div class="actor GA' + $(page).attr('address').split('/').join('_') + '" />');
                ret_val.append( label ).append( actor );
                var min  = parseFloat( $(page).attr('min')  || 0   );
                var max  = parseFloat( $(page).attr('max')  || 100 );
                var step = parseFloat( $(page).attr('step') || 0.5 );
                ret_val.find('.actor').data( {
                    'events':   $(actor).data( 'events' ),
                    'GA':       $(page).attr('address'),
                    'datatype': $(page).attr('datatype'),
                    'mapping' : $(page).attr('mapping'),
                    'styling' : $(page).attr('styling'),
                    'min'     : min,
                    'max'     : max,
                    'step'    : step,
                    'type'    : 'dim'
                }).bind('_'+$(page).attr('address'), this.update ) 
                  .slider({step:step,min:min,max:max, animate: true,start:slideStart,change:slideChange}/*slide:slideAction}*/);
                return ret_val;
        },
        update: function(e,d) { 
                var element = $(this);
                var value = decodeDPT( d, element.data('datatype') );
                element.data( 'value', value );
                element.slider('value', value);
        },
        attributes: {
            address:    {type: "address", required: true},
            datatype:   {type: "datatype", required: true},
            response_address:    {type: "address", required: true},
            response_datatype:   {type: "datatype", required: true},
            min:        {type: "numeric", required: false},
            max:        {type: "numeric", required: false},
            step:       {type: "numeric", required: false},
            mapping:    {type: "mapping", required: false},
            styling:    {type: "styling", required: false}
        },
        content: {type: "string", required: true}
  });

  this.addCreator("slide", this.getCreator("dim"));

  this.addCreator("switch", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'switch' );
                var label = '<div class="label">' + page.textContent + '</div>';
                var response_address = $(page).attr('response_address');
                ga_list.push( response_address );
                var actor = '<div class="actor GA' + response_address.split('/').join('_') + ' switchUnpressed">';
                if( $(page).attr('pre') ) actor += $(page).attr('pre');
                actor += '<div class="value">-</div>';
                if( $(page).attr('post') ) actor += $(page).attr('post');
                actor += '</div>';
                ret_val.append( label ).append( $(actor).data( {
                    'GA':       $(page).attr('address'),
                    'datatype': $(page).attr('datatype'),
                    'mapping' : $(page).attr('mapping'),
                    'styling' : $(page).attr('styling'),
                    'type'    : 'toggle'
                } ).bind('click',switchAction)
                   .bind('_'+$(page).attr('address'), this.update ) );
                return ret_val;
            },
        update: function(e,d) { 
                var element = $(this);
                var value = defaultUpdate( e, d, element );
                element.removeClass( value == '0' ? 'switchPressed' : 'switchUnpressed' );
                element.addClass(    value == '0' ? 'switchUnpressed' : 'switchPressed' );
            },
        attributes: {
            address:    {type: "address", required: true},
            datatype:   {type: "datatype", required: true},
            response_address:    {type: "address", required: true},
            response_datatype:   {type: "datatype", required: true},
            pre:        {type: "string", required: false},
            post:       {type: "string", required: false},
            mapping:    {type: "mapping", required: false},
            styling:    {type: "styling", required: false}
        },
        content: {type: "string", required: true}
  });

  this.addCreator("toggle", this.getCreator("switch"));

  this.addCreator("trigger", {
        create: function( page, path ) {
                var value = $(page).attr('value') ? $(page).attr('value') : 0;
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'switch' );
                var label = '<div class="label">' + page.textContent + '</div>';
                var address = $(page).attr('address');
                var actor = '<div class="actor switchUnpressed">';
                if( $(page).attr('pre') ) actor += $(page).attr('pre');
                var map = $(page).attr('mapping');
                if( mappings[map] && mappings[map][value] )
                  actor += '<div class="value">' + mappings[map][value] + '</div>';
                else
                  actor += '<div class="value">' + value + '</div>';
                if( $(page).attr('post') ) actor += $(page).attr('post');
                actor += '</div>';
                ret_val.append( label ).append( $(actor).data( {
                  'GA'      : $(page).attr('address'),
                  'datatype': $(page).attr('datatype'),
                  'mapping' : $(page).attr('mapping'),
                  'styling' : $(page).attr('styling'),
                  'type'    : 'trigger',
                  'sendValue': value
                } ).bind('click',triggerAction) );

                return ret_val;
            },
        attributes: {
            address:    {type: "address", required: true},
            datatype:   {type: "datatype", required: true},
            value:      {type: "string", required: true},
            pre:        {type: "string", required: false},
            post:       {type: "string", required: false},
            mapping:    {type: "mapping", required: false},
            styling:    {type: "styling", required: false}
        },
        content: {type: "string", required: true}
  });

  this.addCreator("image", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'image' );
                ret_val.append( '<div class="label">' + page.textContent + '</div>' );
                var style = '';
                if( $(page).attr('width') ) style += 'width:' + $(page).attr('width') + ';';
                if( $(page).attr('height') ) style += 'height:' + $(page).attr('height') + ';';
                if( style != '' ) style = 'style="' + style + '"';
                var actor = '<div class="actor"><img src="' +$(page).attr('src') + '" ' + style + ' /></div>';
                var refresh = $(page).attr('refresh') ? $(page).attr('refresh')*1000 : 0;
                ret_val.append( $(actor).data( {
                  'refresh': refresh
                } ).each(setupRefreshAction) ); // abuse "each" to call in context...
                return ret_val;
            },
        attributes: {
            src:        {type: "uri", required: true},
            width:      {type: "string", required: false},
            height:     {type: "string", required: false},
            refresh:    {type: "numeric", required: false}
        },
        content: {type: "string", required: false}
  });

  this.addCreator("video", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'video' );
                ret_val.append( '<div class="label">' + page.textContent + '</div>' );
                var style = '';
                if( $(page).attr('width') ) style += 'width:' + $(page).attr('width') + ';';
                if( $(page).attr('height') ) style += 'height:' + $(page).attr('height') + ';';
                if( style != '' ) style = 'style="' + style + '"';
                var actor = '<div class="actor"><video src="' +$(page).attr('src') + '" ' + style + '  controls="controls" /></div>';
                var refresh = $(page).attr('refresh') ? $(page).attr('refresh')*1000 : 0;
                ret_val.append( $(actor).data( {
                  'refresh': refresh
                } ).each(setupRefreshAction) ); // abuse "each" to call in context...
                return ret_val;
            },
        attributes: {
            src:        {type: "uri", required: true},
            width:      {type: "string", required: false},
            height:     {type: "string", required: false},
            refresh:    {type: "numeric", required: false}
        },
        content: {type: "string", required: true}
  });

  this.addCreator("iframe", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.addClass( 'iframe' );
                ret_val.append( '<div class="label">' + page.textContent + '</div>' );
                var style = '';
                if( $(page).attr('width') ) style += 'width:' + $(page).attr('width') + ';';
                if( $(page).attr('height') ) style += 'height:' + $(page).attr('height') + ';';
                if( style != '' ) style = 'style="' + style + '"';
                var actor = '<div class="actor"><iframe src="' +$(page).attr('src') + '" ' + style + '></iframe></div>';
                ret_val.append( $(actor) ); // abuse "each" to call in context...
                return ret_val;
            },
        attributes: {
            src:        {type: "uri", required: true},
            width:      {type: "string", required: false},
            height:     {type: "string", required: false}
        },
        content: {type: "string", required: false}
  });

  this.addCreator("unknown", {
        create: function( page, path ) {
                var ret_val = $('<div class="widget" />');
                ret_val.append( '<pre>' + page.textContent + '</pre>' );
                return ret_val;
            },
        attributes: {
        },
        content: {type: "string", required: true}
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
                })

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

  this.switchAction = function() {
    var data = $(this).data();
  //  alert( data.GA + ' = ' + data.value );
    visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
  }

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
  var value = decodeDPT( data, element.data('datatype') );
  element.data( 'value', value );
  element.find('.value').text( map( value, element ) );

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
      if( not_found ) element.addClass( 'actor' );
    }
  }
  return value;
}