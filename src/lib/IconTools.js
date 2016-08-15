/* IconTools.js 
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
 * @author Christian Mayer
 * @since 2015
 */
define([ 'jquery' ], function( $ ) {
  "use strict";

  (function( window, undefined ){
  // "global" functions (=> state less)
  var hexColorRegEx = /#[0-9a-fA-F]{6}/,
      colorMapping = { // as a convenience, definition of a few colors
        white:  '#ffffff', 
        orange: '#ff8000',
        red:    '#ff4444',
        green:  '#44ff44',
        blue:   '#4444ff',
        purple: '#ff44ff',
        yellow: '#ffff00',
        grey:   '#777777',
        black:  '#000000'
      },
      iconCache = {},    // the Image() of all knows (i.e. used) icons
      iconCacheMap = [], // mapping of ID to Cache entry (URL)
      iconDelay = [],    // array of all icons to fill where the Image is not ready yet
      iconDelayFn,       // handler for dealy function
      iconDelayed = function( icon, colors, color ) {
        iconDelay.push( [ icon, colors, color ] );
        if( !iconDelayFn )
          iconDelayFn = setInterval( function(){
            while( iconDelay.length )
            {
              // it should be enough to test only the first element - the other
              // elements will be covered anyway...
              if( iconDelay[0][2] in iconDelay[0][1] )
                window.fillRecoloredIcon( iconDelay.shift()[0] ); 
              else
                break;
            }
            
            if( 0 === iconDelay.length )
            {
              clearInterval( iconDelayFn );
              iconDelayFn = 0;
            }
          }, 10 );
      },
      /**
       * Create the HTML for the canvas element and return it.
       */
      createCanvas = function( iconId, styling, classes )
      {
        return '<canvas class="' + iconId + ' ' + classes + '" ' + styling + '/>';
      },
      /**
       * Fill the canvas with the ImageData. Also resize the 
       * canvas at the same time.
       */
      fillCanvas = function( canvas, imageData )
      {
        canvas.width  = imageData.width;
        canvas.height = imageData.height;
        canvas.getContext('2d').putImageData( imageData, 0, 0 );
      },
      /**
       * Two versions of a recoloring funtion to work around an Android bug:
       * http://stackoverflow.com/questions/14969496/html5-canvas-pixel-manipulation-problems-on-mobile-devices-when-setting-the-alph
       * https://code.google.com/p/android/issues/detail?id=17565
       * 
       */
      innerRecolorLoop = navigator.userAgent.toLowerCase().indexOf('android') > -1 && parseFloat(navigator.userAgent.slice(navigator.userAgent.toLowerCase().indexOf('android')+8)) < 4.4 ?
        function( r, g, b, data, length ) // for Android version < 4.4
        {
          for( var i = 0; i < length; i += 4 )
          {
            var a = data[ i+3 ];
            if( a > 127 )
            {
              data[ i   ] = r;
              data[ i+1 ] = g;
              data[ i+2 ] = b;
              data[ i+3 ] = 255;
            } else { // brute force it...
              data[ i   ] = 0;
              data[ i+1 ] = 0;
              data[ i+2 ] = 0;
              data[ i+3 ] = 0;
            }
          }
        } :
        function( r, g, b, data, length ) // the normal version
        {
          for( var i = 0; i < length; i += 4 )
          {
            if( 0 != data[ i+3 ] )
            {
              data[ i   ] = r;
              data[ i+1 ] = g;
              data[ i+2 ] = b;
            }
          }
        },
      tmpCanvas = $('<canvas/>')[0],
      tmpCtx    = tmpCanvas.getContext('2d'),
      /**
       * Do the recoloring based on @param thisIcon and store it in the 
       * hash @param thisIconColors.
       */
      doRecolorNonTransparent = function( color, thisIcon, thisIconColors )
      {
        if( thisIconColors[color] )
          return; // done, already recolored
          
        var
          width  = tmpCanvas.width  = thisIcon.width,
          height = tmpCanvas.height = thisIcon.height;
        tmpCtx.drawImage( thisIcon, 0, 0 );
    
        var imageData = tmpCtx.getImageData( 0, 0, width, height );
        if( color !== undefined )
        {
          if( !hexColorRegEx.test( color ) )
            alert( 'Error! "' + color + '" is not a valid color for icon recoloring! It must have a shape like "#aabbcc".' );
          
          var r      = parseInt( color.substr( 1, 2 ), 16 ),
              g      = parseInt( color.substr( 3, 2 ), 16 ),
              b      = parseInt( color.substr( 5, 2 ), 16 );
          innerRecolorLoop( r, g, b, imageData.data, width * height * 4 );
        }
        thisIconColors[color] = imageData;
      };
  
  /**
   * Funtion to call for each icon that should be dynamically recolored.
   * This will be called for each known URL, so only remember the string but
   * don't load the image yet as it might not be needed.
   */
  window.recolorNonTransparent = function( url ) {
    var
      loadHandler = function(){
        var
          toFill         = iconCache[url].toFill,
          thisIcon       = iconCache[url].icon,
          thisIconColors = iconCache[url].colors,
          thisFillColor;
        while( thisFillColor = toFill.pop() )
        {
          doRecolorNonTransparent( thisFillColor, thisIcon, thisIconColors );
        }
      };

    /**
     * will be called for each color that is actually used
     * => load image for all colors
     * => transform image
     * @return {Function} a function that will append the recolored image to
     *         the jQuery element passed to that function 
     */
    return function( color, styling, classes, asText )
    {
      if( undefined === iconCache[url] )
      {
        var thisIcon = new Image();
        thisIcon.onload = loadHandler;
        thisIcon.src = url;
        
        iconCache[url] = {
          icon  : thisIcon,            // the original Image() of the icon
          id    : iconCacheMap.length, // the unique ID for this icon
          colors: {},                  // cache all the transformed ImageDatas
          toFill: []                   // all the icon colors to fill once the image was loaded
        };
        iconCacheMap.push( url );
      }

      if( color === undefined )
        color = '#ffffff';
      
      if( color in colorMapping )
        color = colorMapping[ color ];
      
      var c = 'icon' + iconCache[url].id + '_' + color.substr( 1, 6 );
      iconCache[url].toFill.push( color );
      
      // when already available - fill it now. Otherwise the onLoad will do it.
      if( iconCache[url].icon.complete )
        loadHandler();
      
      var newCanvas = createCanvas( c, styling, classes );
      if( asText )
        return newCanvas;
      
      var newElement = $(newCanvas)[0];
      if( iconCache[url].icon.complete )
        fillCanvas( newElement, iconCache[url].colors[ color ] );
      else
        iconDelayed( newElement, iconCache[url].colors, color );
      
      return newElement;
    }
  };
  
  /**
   * This function must be called to fill a specific icon that was created
   */
  window.fillRecoloredIcon = function( icon ) {
    var 
      parameters = (icon.className.split ? icon.className.split(' ') : icon.className.baseVal.split(' '))[0].substring(4).split('_');
    if( 2 === parameters.length )
    { 
      var 
        cacheEntry = iconCache[ iconCacheMap[ parameters[0] ] ],
        coloredIcon = cacheEntry.colors[ '#' + parameters[1] ];
        
      if( undefined === coloredIcon )
        iconDelayed( icon, cacheEntry.colors, '#' + parameters[1] );
      else
        fillCanvas( icon, coloredIcon );
    }
  };
  
  window.svgKUF = function( iconID ) {
    return function( color, styling, classes, asText )
    {
      if( color in colorMapping )
        color = colorMapping[ color ];
      
      var style='';
      if( color )
        style = 'style="color:' + color + '" ';
      
      return '<svg ' + style + 'class="' + classes + '"><use xlink:href="icon/knx-uf-iconset.svg#kuf-' + iconID + '"></use></svg>';
    }
  };
})(window);

});
