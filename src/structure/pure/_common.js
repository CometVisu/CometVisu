/* _common.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This module defines the widgets for the CometVisu visualisation.
 * @module Structure Pure
 * @title  CometVisu Structure "pure"
*/

// Define ENUM of maturity levels for features, so that e.g. the editor can 
// ignore some widgets when they are not supported yet
var Maturity = {
  release     : 0,
  development : 1
};

/*
 * this function implements widget stylings 
 *
 * implemented in: default_update, trigger-widget
 */
$.fn.setWidgetStyling = function(value) {
  var styling = templateEngine.stylings[this.data('styling')];
  if (styling) {    
    this.removeClass(styling['classnames']); // remove only styling classes
    if (styling[value]) { // fixed value
      this.addClass(styling[value]); 
    } else { // 
      value = parseFloat(value);
      var range = styling['range'];
      for( var min in range ) {
        if( min > value ) continue;
        if( range[min][0] < value ) continue; // check max
        this.addClass( range[min][1] );
        break;
      } 
    }
  }
  return this;
}

/*
 * this function implements all widget layouts that are identical (JNK)
 *
 * implemented: rowspan, colspan
 */
  
$.fn.setWidgetLayout = function(page) { 
   this.data('colspan', page.children('layout').attr('colspan') || $('head').data('colspanDefault') || 6);
   if (page.children('layout').attr('rowspan')) {
     this.data('rowspanClass', templateEngine.rowspanClass(page.children('layout').attr('rowspan') || 1));
     this.addClass('innerrowspan'); 
   }
   return this;
 }

/*
 * this function implements the widget label (JNK)
 */
 
$.fn.makeWidgetLabel = function(page, flavour) { 
  var labelElement = page.find('label')[0]; // get first label element
  if (labelElement) { // if exists, add it
    this.append( extractLabel( labelElement, flavour ) );
  }
  return this;
}

/*
 * this function extracts all addresses with attributes (JNK)
 * 
 * @param  handleVariant is a callback function that returns an array of two
 *                       elements. The first is a boolean that determins if
 *                       the visu should listen for that address. The second
 *                       is added as it is to the returned object.
 */
function makeAddressList( page, handleVariant ) {
  var address = {};
  page.find('address').each( function(){ 
    var src = this.textContent;
    var transform = this.getAttribute('transform');
    if ((!src) || (!transform)) // fix broken address-entries in config
      return;
    var mode = 1|2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
    switch( this.getAttribute('mode') )
    {
      case 'disable':
        mode = 0;
        break;
      case 'read':
        mode = 1;
        break;
      case 'write':
        mode = 2;
        break;
      case 'readwrite':
        mode = 1|2;
        break;
    }
    var variantInfo = handleVariant ? handleVariant( src, transform, mode, this.getAttribute('variant') ) : [true, undefined];
    if( variantInfo[0])
      templateEngine.addAddress( src );
    address[ '_' + src ] = [ transform, mode, variantInfo[1] ];
    return; // end of each-func
  });
  return address;
}

/**
 * This class defines all the building blocks for a Visu in the "Pure" design
 * @class VisuDesign
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
    //templateEngine.visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
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

/*
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

function defaultValueHandling( e, data, passedElement )
{
  var element = passedElement || $(this);
  if( undefined !== e )
  {
    var thisTransform = element.data().address[ e.type ][0];
    // #1: transform the raw value to a JavaScript type
    var value = templateEngine.transformDecode( element.data().address[ e.type ][0], data );
  } else {
    var thisTransform = '';
    var value = data;
  }
  
  element.data( 'basicvalue', value ); // store it to be able to supress sending of unchanged data
  
  // #2: map it to a value the user wants to see
  value = templateEngine.map( value, element.data('mapping') );
  
  // #3: format it in a way the user understands the value
  if( element.data( 'precision' ) )
    value = Number( value ).toPrecision( element.data( 'precision' ) );
  if( element.data( 'format' ) )
    value = sprintf( element.data( 'format' ), value );
  element.data( 'value', value );
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
  
  // #4 will happen outside: style the value to be pretty
  return value;
}

function defaultUpdate( e, data, passedElement ) 
{
  var element = passedElement || $(this);
  var value = defaultValueHandling( e, data, element );
  
  element.setWidgetStyling( element.data( 'basicvalue' ) );
  
  if( element.data( 'align' ) )
    element.addClass(element.data( 'align' ) );

  var valueElement = element.find('.value');
  valueElement.empty();
  if( ('string' == typeof value) || ('number' == typeof value) )
    valueElement.append( value );
  else if( 'function' === typeof value )
    value( valueElement );
  else
  {
    for( var i = 0; i < value.length; i++ )
    {
      var thisValue = value[i];
      if( !thisValue )
        continue;
      
      if( ('string' == typeof thisValue) || ('number' == typeof thisValue) )
        valueElement.append( thisValue );
      else if( 'function' === typeof thisValue )
        thisValue( valueElement );
      else
        valueElement.append( $(thisValue).clone() );
    }
  }
  
  return value;
}

function defaultUpdate3d( e, data, passedElement )
{
  //var element = passedElement || $(this);
  var l = e.data.layout;
  var pos = data.building2screen( new THREE.Vector3( l.x, l.y, l.z ) );
  e.data.element.css( 'left', pos.x + 'px' );
  e.data.element.css( 'top' , pos.y + 'px' );
  
  var floorFilter = true;
  if( l.floorFilter) floorFilter = data.getState('showFloor') == data.buildingProperties.floorNames[ l.floorFilter ];
  e.data.element.css( 'display', floorFilter ? '' : 'none' );
}

function extractLayout( layout, type, defaultValues )
{
  if (typeof defaultValue === 'undefined') defaultValues = [];

  var ret_val = (type == '2d') ? 'position:absolute;' : '';
  if( layout.getAttribute('x'     ) ) ret_val += 'left:'   + layout.getAttribute('x'     ) + ';';
  else if( defaultValues[ 'x'     ] ) ret_val += 'left:'   + defaultValues[      'x'     ] + ';';
  
  if( layout.getAttribute('y'     ) ) ret_val += 'top:'    + layout.getAttribute('y'     ) + ';';
  else if( defaultValues[ 'y'     ] ) ret_val += 'top:'    + defaultValues[      'y'     ] + ';';
  
  if( layout.getAttribute('width' ) ) ret_val += 'width:'  + layout.getAttribute('width' ) + ';';
  else if( defaultValues[ 'width' ] ) ret_val += 'width:'  + defaultValues[      'width' ] + ';';
  
  if( layout.getAttribute('height') ) ret_val += 'height:' + layout.getAttribute('height') + ';';
  else if( defaultValues[ 'height'] ) ret_val += 'height:' + defaultValues[      'height'] + ';';
  
  return ret_val;
}

function extractLayout3d( layout )
{
  var ret_val = {};
  if( layout.getAttribute('x'    ) ) ret_val.x     = layout.getAttribute('x'    );
  if( layout.getAttribute('y'    ) ) ret_val.y     = layout.getAttribute('y'    );
  if( layout.getAttribute('z'    ) ) ret_val.z     = layout.getAttribute('z'    );
  if( layout.getAttribute('floor') ) ret_val.floor = layout.getAttribute('floor');
  if( layout.getAttribute('floorFilter') ) ret_val.floorFilter = layout.getAttribute('floorFilter');
  if( layout.getAttribute('roomFilter')  ) ret_val.roomFilter  = layout.getAttribute('roomFilter' );
  return ret_val;
}

function extractLabel( label, flavour )
{
  if( !label ) return;
  
  var $div = $( '<div class="label"></div>' );
  $( label ).contents().each( function(){
    var $v = $(this);
    if( $v.is('icon') )
    {
      var i = icons.getIcon($v.attr('name'), $v.attr('type'), $v.attr('flavour') || flavour, $v.attr('color'), $v.attr('styling') );
      
      if( 'function' === typeof i )
        i( $div );
      else
        if( i ) $div.append( i.clone() );
    } else
      $div.append( this.textContent );
  });
  return $div;
}

var basicdesign = new VisuDesign();