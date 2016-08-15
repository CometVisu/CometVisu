/* _common.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * This module defines the widgets for the CometVisu visualisation.
 * @module structure/pure
 * @title  CometVisu Structure "pure"
 * @author Christian Mayer [CometVisu at ChristianMayer dot de]
 * @since 2010
*/
define( ['jquery'], function($) {
  "use strict";

  // Define ENUM of maturity levels for features, so that e.g. the editor can 
  // ignore some widgets when they are not supported yet
  var Maturity = {
    release     : 0,
    development : 1
  };

  /**
   * This class defines all the building blocks for a Visu in the "Pure" design
   * @class VisuDesign
   * @method VisuDesign
   */
  function VisuDesign() {
  var self = this;
  
  this.creators = {};

  /**
   * Description
   * @method addCreator
   * @param {} name
   * @param {} object
   */
  this.addCreator = function (name, object) {
    this.creators[name] = object;
  }

  /**
   * Description
   * @method getCreator
   * @param {} name
   * @return MemberExpression
   */
  this.getCreator = function(name) {
    if (this.creators[name] === undefined) {
      return this.creators.unknown;
    }
    return this.creators[name];
  }

  var popups = {};

  /**
   * Description
   * @method addPopup
   * @param {} name
   * @param {} object
   */
  this.addPopup = function (name, object) {
    popups[name] = object;
    popups[name].type = name;
  }

  /**
   * Description
   * @method getPopup
   * @param {} name
   * @return MemberExpression
   */
  this.getPopup = function(name) {
    var p = popups[name];
    if (p === undefined) {
      return popups.unknown;
    }
    return popups[name];
  }

  this.addPopup('unknown', {
    /**
     * Description
     * @method create
     * @param {} attributes
     * @return ret_val
     */
    create: function( attributes ) {
      var reposition = false;
      var ret_val = $('<div class="popup" style="display:none"><div class="popup_close">X</div></div><div class="popup_background" style="display:none" />').appendTo('body');
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

      ret_val.bind( 'close', this.close );
      ret_val.bind( 'click', function() {
        // note: this will call two events - one for the popup itself and 
        //       one for the popup_background.
        ret_val.trigger( 'close' );
        return false;
      });
      $('.popup_close').bind( 'touchend', function() {
        // note: this will call two events - one for the popup itself and 
        //       one for the popup_background.
        ret_val.trigger( 'close' );
        return false;
      });

      ret_val.css( 'display', 'block' );
      $('#centerContainer').addClass('inactiveMain');
      return ret_val;
    },
    /**
     * Description
     * @method close
     * @param {} event
     */
    close: function( event ) {
      $('#centerContainer').removeClass('inactiveMain');
      event.currentTarget.remove();
    }
  });

  this.addPopup('info'   , $.extend(true, {}, this.getPopup('unknown')) );
  this.addPopup('warning', $.extend(true, {}, this.getPopup('unknown')) );
  this.addPopup('error'  , $.extend(true, {}, this.getPopup('unknown')) ) ;

  /**
   * Description
   * @method defaultValueHandling
   * @param ga         address
   * @param data       the raw value from the bus
   * @param widgetData the data structure in the widget
   * @return value
   */
  this.defaultValueHandling = function( ga, data, widgetData )
  {
    var thisTransform = '';
    var value = data;
    if( undefined !== ga )
    {
      thisTransform = widgetData.address[ ga ][0];
      // #1: transform the raw value to a JavaScript type
      value = templateEngine.transformDecode( thisTransform, data );
    }
    
    widgetData.basicvalue = value; // store it to be able to supress sending of unchanged data
    
    // #2: map it to a value the user wants to see
    value = templateEngine.map( value, widgetData.mapping );
    
    // #3: format it in a way the user understands the value
    if( widgetData.precision )
      value = Number( value ).toPrecision( widgetData.precision );
    if( widgetData.format ) {
      if( !('formatValueCache' in widgetData) )
        widgetData.formatValueCache = [widgetData.format];
      
      var argListPos = (widgetData.address && widgetData.address[ga])? widgetData.address[ga][3] : 1;
      
      widgetData.formatValueCache[argListPos] = value;

      value = sprintf.apply(this, widgetData.formatValueCache);
    }
    widgetData.value = value;
    if (undefined !== value && value.constructor == Date)
    {
      switch( thisTransform ) // special case for KNX
        {
        case 'DPT:10.001':
          value = value.toLocaleTimeString();
          break;
        case 'DPT:11.001':
          value = value.toLocaleDateString();
          break;
        case 'OH:datetime':
          value = value.toLocaleDateString();
          break;
        case 'OH:time':
          value = value.toLocaleTimeString();
          break;
      }
    }
    
    // #4 will happen outside: style the value to be pretty
    return value;
  };
  
  /**
   * Method to handle all special cases for the value. The might come from
   * the mapping where it can be quite complex as it can contain icons.
   * value: the value that will be inserted
   * modifyFn: callback function that modifies the DOM
   * @method defaultValue2DOM
   * @param {} value
   * @param {} modifyFn
   */
  this.defaultValue2DOM = function( value, modifyFn )
  {
    if (('string' === typeof value) || ('number' === typeof value))
      modifyFn( value );
    else if ('function' === typeof value)
      // thisValue(valueElement);
      console.error( 'typeof value === function - special case not handled anymore!' );
    else if( !Array.isArray( value ) ) {
      var element = value.cloneNode();
      if( value.getContext )
      {
        fillRecoloredIcon( element );
      }
      modifyFn( element );
    } else {
      for (var i = 0; i < value.length; i++) {
        var thisValue = value[i];
        if (!thisValue) continue;

        if( ('string' === typeof thisValue) || ('number' === typeof thisValue)  )
          modifyFn( thisValue );
        else if( 'function' === typeof thisValue )
          // thisValue(valueElement);
          console.error( 'typeof value === function - special case not handled anymore!' );
        else {
          var element = thisValue.cloneNode();
          if( thisValue.getContext )
          {
            fillRecoloredIcon( element );
          }
          modifyFn( element );
        }
      }
    }
  }
  
  /**
   * ga:            address
   * data:          the raw value from the bus
   * passedElement: the element to update
   * @method defaultUpdate
   * @param {} ga
   * @param {} data
   * @param {} passedElement
   * @param {} newVersion
   * @param {} path
   * @return value
   */
  this.defaultUpdate = function( ga, data, passedElement, newVersion, path ) 
  {
    ///console.log(ga, data, passedElement, newVersion );
    var element = passedElement || $(this);
    var elementData = templateEngine.widgetData[ path ];
    var actor   = newVersion ? element.find('.actor:has(".value")') : element;
    var value = self.defaultValueHandling( ga, data, elementData );
    
    templateEngine.setWidgetStyling( actor, elementData.basicvalue, elementData.styling );
    
    if (elementData['align'])
      element.addClass(elementData['align']);
  
    var valueElement = element.find('.value');
    valueElement.empty();
    if (undefined !== value)
      self.defaultValue2DOM( value, function(e){ valueElement.append( e ) } );
    else
      valueElement.append('-');
    
    return value;
  }
  
  /**
   * Description
   * @method defaultUpdate3d
   * @param {} ev
   * @param {} data
   * @param {} passedElement
   */
  this.defaultUpdate3d = function( ev, data, passedElement )
  {
    //var element = passedElement || $(this);
    var l = ev.data.layout;
    var pos = data.building2screen( new THREE.Vector3( l.x, l.y, l.z ) );
    ev.data.element.css( 'left', pos.x + 'px' );
    ev.data.element.css( 'top' , pos.y + 'px' );
    
    var floorFilter = true;
    if( l.floorFilter) floorFilter = data.getState('showFloor') == data.buildingProperties.floorNames[ l.floorFilter ];
    ev.data.element.css( 'display', floorFilter ? '' : 'none' );
  }
  
  /**
   * Parse config file layout element and convert it to an object
   * @method parseLayout
   * @param {} layout
   * @param {} defaultValues
   * @return ret_val
   */
  this.parseLayout = function( layout, defaultValues )
  {
    var ret_val = {};
    
    if( !layout )
      return ret_val;
    
    if( undefined === defaultValues ) defaultValues = {};
       
    if( layout.getAttribute('x'     ) ) ret_val.x      = layout.getAttribute('x'     );
    else if( defaultValues.x          ) ret_val.x      = defaultValues.x;
       
    if( layout.getAttribute('y'     ) ) ret_val.y      = layout.getAttribute('y'     );
    else if( defaultValues.y          ) ret_val.y      = defaultValues.y;
       
    if( layout.getAttribute('width' ) ) ret_val.width  = layout.getAttribute('width' );
    else if( defaultValues.width      ) ret_val.width  = defaultValues.width;
       
    if( layout.getAttribute('height') ) ret_val.height = layout.getAttribute('height');
    else if( defaultValues.height     ) ret_val.height = defaultValues.height;
       
    return ret_val;
  }
  
  /**
   * Description
   * @method extractLayout
   * @param {} layout
   * @param {} type
   * @return ret_val
   */
  this.extractLayout = function( layout, type )
  {
  
    var ret_val = (type == '2d') ? 'position:absolute;' : '';
    if( layout.x      ) ret_val += 'left:'   + layout.x      + ';';
    if( layout.y      ) ret_val += 'top:'    + layout.y      + ';';
    if( layout.width  ) ret_val += 'width:'  + layout.width  + ';';
    if( layout.height ) ret_val += 'height:' + layout.height + ';';
    
    return ret_val;
  }
  
  /**
   * Description
   * @method extractLayout3d
   * @param {} layout
   * @return ret_val
   */
  this.extractLayout3d = function( layout )
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
  
  /**
   * Description
   * @method extractLabel
   * @param {} label
   * @param {} flavour
   * @param {} labelClass
   * @param {} style
   * @return BinaryExpression
   */
  this.extractLabel = function( label, flavour, labelClass, style )
  {
    if( !label ) return '';
    
    if( !labelClass )
    var ret_val = '<div class="' + (undefined===labelClass ? 'label' : labelClass) + '"'
      + ( style ? (' style="' + style + '"') : '' ) + '>';
      
    $( label ).contents().each( function(){
      var $v = $(this);
      if( $v.is('icon') )
      {
        ret_val += icons.getIconText($v.attr('name'), $v.attr('type'), $v.attr('flavour') || flavour, $v.attr('color'), $v.attr('styling') );
      } else
        ret_val += this.textContent;
    });
    return ret_val + '</div>';
  }
  
  /**
   * this function extracts all addresses with attributes (JNK)
   *                       elements. The first is a boolean that determins if
   *                       the visu should listen for that address. The second
   *                       is added as it is to the returned object.
   * @method makeAddressList
   * @param {} element
   * @param handleVariant is a callback function that returns an array of two
   * @param id             id / path to the widget
   * @return address
   */
  this.makeAddressList = function( element, handleVariant, id ) {
    var address = {};
    element.find('address').each( function(){ 
      var 
        src = this.textContent,
        transform = this.getAttribute('transform'),
        formatPos = +(this.getAttribute('format-pos') || 1)|0, // force integer
        mode = 1|2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
      
      if ((!src) || (!transform)) // fix broken address-entries in config
        return;
      
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
      if( (mode&1) && variantInfo[0]) // add only addresses when reading from them
        templateEngine.addAddress( src, id );
      address[ src ] = [ transform, mode, variantInfo[1], formatPos ];
      return; // end of each-func
    });
    return address;
  };
  
  /**
   * this function implements all widget layouts that are identical (JNK)
   * implemented: rowspan, colspan
   * @method setWidgetLayout
   * @param {} page
   * @param {} path
   * @return ret_val
   */
  this.setWidgetLayout = function( page, path ) { 
    var 
      elementData = templateEngine.widgetDataGet( path ),
      layout      = page.children('layout'),
      lookupM     = [ 0, 2, 4,  6,  6,  6,  6, 12, 12, 12, 12, 12, 12 ],
      lookupS     = [ 0, 3, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
      ret_val = '';
    elementData.colspan = layout.attr('colspan') || $('head').data('colspanDefault') || 6;
    elementData.colspanM = layout.attr('colspan-m') || lookupM[Math.floor(elementData.colspan)] || elementData.colspan;
    elementData.colspanS = layout.attr('colspan-s') || lookupS[Math.floor(elementData.colspan)] || elementData.colspan;
    if( layout.attr('rowspan') )
    {
      elementData.rowspanClass = templateEngine.rowspanClass( layout.attr('rowspan') || 1 );
      ret_val = 'innerrowspan'; 
    }
    return ret_val;
  };
  
  /**
   * Create a default widget to be filled by the creator afterwards.
   * Note: the reciever of the returned string must add an </div> closing element!
   * @method createDefaultWidget
   * @param widgetType string of the widget type
   * @param $element   jQuery object of the XML element
   * @param path       string of the path ID
   * @param flavour    
   * @param type       
   * @param updateFn   The callback function for updates
   * @param {} makeAddressListFn
   * @return ret_val
   */
  this.createDefaultWidget = function( widgetType, $element, path, flavour, type, updateFn, makeAddressListFn ) {
    var layout = this.parseLayout( $element.children('layout')[0] );
    var style = layout ? 'style="' + this.extractLayout( layout, type ) + '"' : '';
    var classes = 'widget clearfix ' + widgetType;
    if( $element.attr('align') ) {
      classes+=" "+$element.attr('align');
    }
    classes += ' ' + this.setWidgetLayout( $element, path );
    if( $element.attr('flavour') ) flavour = $element.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
    if($element.attr('class')) classes += ' custom_' + $element.attr('class');
    var label = (widgetType==='text')?this.extractLabel( $element.find('label')[0], flavour, '' ):this.extractLabel( $element.find('label')[0], flavour );
    var address = this.makeAddressList( $element, makeAddressListFn, path );
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ($element.attr("bind_click_to_widget")) bindClickToWidget = $element.attr("bind_click_to_widget")=="true";

    templateEngine.widgetDataInsert( path, {
      'address' : address,
      'bind_click_to_widget': bindClickToWidget,
      'mapping' : $element.attr('mapping'),
      'styling' : $element.attr('styling'),
      'format'  : $element.attr('format'),
      'align'   : $element.attr('align'),
      'layout'  : layout,
      'path'    : path
    });
    var ret_val = '<div class="'+classes+'" ' + style + '>' + label;
    if (address && updateFn!=undefined) {
      templateEngine.postDOMSetupFns.push( function() {
        // initially setting a value
        updateFn.bind( $("#"+path), undefined, undefined );
      });
    }
    return ret_val;
  };
  
  /**
   * Create an action handling that shows a button press animation.
   * Note: use this function when multiple action elements are used and thus
   * bind_click_to_widget is not available.
   * @method defaultButtonDownAnimation
   * @param {} path
   * @param {} actor
   */
  this.defaultButtonDownAnimation = function( path, actor )
  {
    if( actor )
    {
      actor.classList.remove('switchUnpressed');
      actor.classList.add('switchPressed');
    }
  };
  /**
   * Create an action handling that shows a button press animation.
   * When the action is not set, it will be searched for - so that widgets
   * with bind_click_to_widget will also work.
   * @method defaultButtonDownAnimationInheritAction
   * @param {} path
   * @param {} actor
   */
  this.defaultButtonDownAnimationInheritAction = function( path, actor )
  {
    if( !actor )
      actor = templateEngine.handleMouseEvent.widget.getElementsByClassName('actor')[0];
    
    actor.classList.remove('switchUnpressed');
    actor.classList.add('switchPressed');
  };
  /**
   * Create an action handling that shows a button unpress animation.
   * Note: use this function when multiple action elements are used and thus
   * bind_click_to_widget is not available.
   * @method defaultButtonUpAnimation
   * @param {} path
   * @param {} actor
   */
  this.defaultButtonUpAnimation = function( path, actor )
  {
    if( actor )
    {
      actor.classList.remove('switchPressed');
      actor.classList.add('switchUnpressed');
    }
  };
  /**
   * Create an action handling that shows a button unpress animation.
   * When the action is not set, it will be searched for - so that widgets
   * with bind_click_to_widget will also work.
   * @method defaultButtonUpAnimationInheritAction
   * @param {} path
   * @param {} actor
   */
  this.defaultButtonUpAnimationInheritAction = function( path, actor )
  {
    if( !actor )
      actor = templateEngine.handleMouseEvent.widget.getElementsByClassName('actor')[0];
    
    actor.classList.remove('switchPressed');
    actor.classList.add('switchUnpressed');
  };
};

  /**
   * Figure out best placement of popup.
   * A preference can optionally be passed. The position is that of the numbers
   * on the numeric keypad. I.e. a value of "6" means centered above the anchor.
   * A value of "0" means centered to the page
   * @method placementStrategy
   * @param {} anchor
   * @param {} popup
   * @param {} page
   * @param {} preference
   * @return ObjectExpression
   */
  function placementStrategy( anchor, popup, page, preference )
  {
    var position_order = [ 8, 2, 6, 4, 9, 3, 7, 1, 5, 0 ];
    if( preference !== undefined ) position_order.unshift( preference );
  
    for( var pos in position_order )
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

  var basicdesign = new VisuDesign();

  return {
    basicdesign: basicdesign,
    Maturity: Maturity,
    placementStrategy: placementStrategy
  }
}); // end define