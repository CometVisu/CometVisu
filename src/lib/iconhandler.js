//
//  Icon handler for the CometVisu.
//
//   Copyright (C) 2012 by Christian Mayer
//   cometvisu (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////

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
      /**
       * Append to the jQuery element a canvas element and return it.
       */
      appendCanvas = function( element, styling, classes )
      {
        var $c = $('<canvas class="' + classes + '" ' + styling + '/>');
        element.append( $c );
        return $c[0];
      },
      /**
       * Fill the canvas element @param c with the ImageData. Also resize the 
       * canvas at the same time.
       */
      fillCanvas = function( c, imageData )
      {
        c.width  = imageData.width;
        c.height = imageData.height;
        c.getContext('2d').putImageData( imageData, 0, 0 );
      },
      /**
       * Two versions of a recoloring funtion to work around an Android bug:
       * http://stackoverflow.com/questions/14969496/html5-canvas-pixel-manipulation-problems-on-mobile-devices-when-setting-the-alph
       * https://code.google.com/p/android/issues/detail?id=17565
       * 
       */
      innerRecolorLoop = navigator.userAgent.toLowerCase().indexOf('android') > -1 ?
        function( r, g, b, data, length ) // the Android version
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
      /**
       * Do the recoloring based on @param thisIcon and store it in the 
       * hash @param thisIconColors.
       */
      doRecolorNonTransparent = function( color, thisIcon, thisIconColors )
      {
        if( thisIconColors[color] )
          return; // done, already recolored
          
        var canvas = $('<canvas/>')[0];
        canvas.width  = thisIcon.width;
        canvas.height = thisIcon.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage( thisIcon, 0, 0 );
    
        var imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
        if( color !== undefined )
        {
          if( !hexColorRegEx.test( color ) )
            alert( 'Error! "' + color + '" is not a valid color for icon recoloring! It must have a shape like "#aabbcc".' );
          
          var r      = parseInt( color.substr( 1, 2 ), 16 ),
              g      = parseInt( color.substr( 3, 2 ), 16 ),
              b      = parseInt( color.substr( 5, 2 ), 16 );
          innerRecolorLoop( r, g, b, imageData.data, canvas.width * canvas.height * 4 );
        }
        thisIconColors[color] = imageData;
      };
  
  /**
   * Funtion to call for each icon that should be dynamically recolored.
   * This will be called for each known URL, so only remember the string but
   * don't load the image yet as it might not be needed.
   */
  window.recolorNonTransparent = function( url ) {
    var thisIcon,            // the original Image() of the icon
        thisIconColors = {}, // cache all the transformed ImageDatas
        toFill = [],         // all the icons to fill once the image was loaded
        loadHandler = function(){
          var thisFill;
          while( thisFill = toFill.pop() )
          {
            doRecolorNonTransparent( thisFill.color, thisIcon, thisIconColors );
            fillCanvas( thisFill.canvas, thisIconColors[thisFill.color] );
          }
        };
  
    /**
     * will be called for each color that is actually used
     * => load image for all colors
     * => transform image
     * @return {Function} a function that will append the recolored image to
     *         the jQuery element passed to that function 
     */
    return function( color, styling, classes )
    {
      // load image only when needed
      if( thisIcon === undefined )
      {
        thisIcon = new Image();
        thisIcon.onload = loadHandler;
        thisIcon.src = url;
      }
      
      if( color === undefined )
        color = '#ffffff';
      
      if( color in colorMapping )
        color = colorMapping[ color ];
      
      /**
       * The function to call to add the icon in the DOM.
       * It will handle if the icon content isn't available yet.
       */
      return function( valueElement ){
        var c = appendCanvas( valueElement, styling, classes );
        if( thisIcon.complete )
        {
          doRecolorNonTransparent( color, thisIcon, thisIconColors );
          fillCanvas( c, thisIconColors[color] );
        } else {
          // Icon not loaded yet - put on que
          toFill.push( { canvas: c, color: color } );
        }
      };
    }
  };
})(window);

/**
 * The object "icon" contains the whole API necessary to handle the icons.
 * 
 * @class icon
 * @constructor FOO
 */
function icon() { // Konstruktor

  // //////////////////////////////////////////////////////////////////////////
  // private static variables and methods:

  // ... none ...

  // check and fix if the user forgot the "new" keyword
  if (!(this instanceof icon)) {
    return new icon();
  }

  // //////////////////////////////////////////////////////////////////////////
  // Definition of the private variables

  /**
   * Internal database of the known icons.
   * Initially filled with the default icons.
   * 
   * @property db
   * @private
   */
  var db = {
'CometVisu' : { '*' : '128',
  '16' : { 
    'black'    : '*/000000',
    'white'    : '*/ffffff',
    'antimony' : '*/00ddff',
    'boron'    : '*/00ff11',
    'lithium'  : '*/ff0000',
    'potassium': '*/d00055',
    'orange  ' : '*/ff8000',
    '*': { '*' : 'ff8000',
      '000000': { 'uri': 'icon/comet_16_000000.png'},
      'ffffff': { 'uri': 'icon/comet_16_ffffff.png'},
      '00ddff': { 'uri': 'icon/comet_16_00ddff.png'},
      '00ff11': { 'uri': 'icon/comet_16_00ff11.png'},
      'ff0000': { 'uri': 'icon/comet_16_ff0000.png'},
      'd00055': { 'uri': 'icon/comet_16_d00055.png'},
      'ff8000': { 'uri': 'icon/comet_16_ff8000.png'}
    }
  },
  '32' : { 
    'black'    : '*/000000',
    'white'    : '*/ffffff',
    'antimony' : '*/00ddff',
    'boron'    : '*/00ff11',
    'lithium'  : '*/ff0000',
    'potassium': '*/d00055',
    'orange  ' : '*/ff8000',
    '*': { '*' : 'ff8000',
      '000000': { 'uri': 'icon/comet_32_000000.png'},
      'ffffff': { 'uri': 'icon/comet_32_ffffff.png'},
      '00ddff': { 'uri': 'icon/comet_32_00ddff.png'},
      '00ff11': { 'uri': 'icon/comet_32_00ff11.png'},
      'ff0000': { 'uri': 'icon/comet_32_ff0000.png'},
      'd00055': { 'uri': 'icon/comet_32_d00055.png'},
      'ff8000': { 'uri': 'icon/comet_32_ff8000.png'}
    }
  },
  '64' : { 
    'black'    : '*/000000',
    'white'    : '*/ffffff',
    'antimony' : '*/00ddff',
    'boron'    : '*/00ff11',
    'lithium'  : '*/ff0000',
    'potassium': '*/d00055',
    'orange  ' : '*/ff8000',
    '*': { '*' : 'ff8000',
      '000000': { 'uri': 'icon/comet_64_000000.png'},
      'ffffff': { 'uri': 'icon/comet_64_ffffff.png'},
      '00ddff': { 'uri': 'icon/comet_64_00ddff.png'},
      '00ff11': { 'uri': 'icon/comet_64_00ff11.png'},
      'ff0000': { 'uri': 'icon/comet_64_ff0000.png'},
      'd00055': { 'uri': 'icon/comet_64_d00055.png'},
      'ff8000': { 'uri': 'icon/comet_64_ff8000.png'}
    }
  },
  '128' : { 
    'black'    : '*/000000',
    'white'    : '*/ffffff',
    'antimony' : '*/00ddff',
    'boron'    : '*/00ff11',
    'lithium'  : '*/ff0000',
    'potassium': '*/d00055',
    'orange  ' : '*/ff8000',
    '*': { '*' : 'ff8000',
      '000000': { 'uri': 'icon/comet_128_000000.png'},
      'ffffff': { 'uri': 'icon/comet_128_ffffff.png'},
      '00ddff': { 'uri': 'icon/comet_128_00ddff.png'},
      '00ff11': { 'uri': 'icon/comet_128_00ff11.png'},
      'ff0000': { 'uri': 'icon/comet_128_ff0000.png'},
      'd00055': { 'uri': 'icon/comet_128_d00055.png'},
      'ff8000': { 'uri': 'icon/comet_128_ff8000.png'}
    }
  }
},

// Do not remove this line: Dynamic Icons Start

'audio_audio' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_audio.png') } } },
'audio_eject' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_eject.png') } } },
'audio_eq' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_eq.png') } } },
'audio_fade' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_fade.png') } } },
'audio_ff' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_ff.png') } } },
'audio_headphone' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_headphone.png') } } },
'audio_loudness' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_loudness.png') } } },
'audio_mic' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_mic.png') } } },
'audio_mic_mute' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_mic_mute.png') } } },
'audio_pause' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_pause.png') } } },
'audio_play' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_play.png') } } },
'audio_playlist' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_playlist.png') } } },
'audio_rec' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_rec.png') } } },
'audio_repeat' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_repeat.png') } } },
'audio_rew' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_rew.png') } } },
'audio_shuffle' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_shuffle.png') } } },
'audio_sound' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_sound.png') } } },
'audio_stop' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_stop.png') } } },
'audio_volume_high' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_volume_high.png') } } },
'audio_volume_low' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_volume_low.png') } } },
'audio_volume_mid' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_volume_mid.png') } } },
'audio_volume_mute' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/audio_volume_mute.png') } } },
'control_1' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_1.png') } } },
'control_2' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_2.png') } } },
'control_3' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_3.png') } } },
'control_4' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_4.png') } } },
'control_all_on_off' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_all_on_off.png') } } },
'control_arrow_down' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_down.png') } } },
'control_arrow_down_left' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_down_left.png') } } },
'control_arrow_down_right' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_down_right.png') } } },
'control_arrow_downward' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_downward.png') } } },
'control_arrow_left' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_left.png') } } },
'control_arrow_leftward' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_leftward.png') } } },
'control_arrow_right' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_right.png') } } },
'control_arrow_rightward' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_rightward.png') } } },
'control_arrow_turn_left' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_turn_left.png') } } },
'control_arrow_turn_right' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_turn_right.png') } } },
'control_arrow_up' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_up.png') } } },
'control_arrow_up_left' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_up_left.png') } } },
'control_arrow_up_right' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_up_right.png') } } },
'control_arrow_upward' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_arrow_upward.png') } } },
'control_building_2_s_all' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_all.png') } } },
'control_building_2_s_dg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_dg.png') } } },
'control_building_2_s_eg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_eg.png') } } },
'control_building_2_s_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_int_all.png') } } },
'control_building_2_s_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_int_dg.png') } } },
'control_building_2_s_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_int_eg.png') } } },
'control_building_2_s_int_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_int_kg.png') } } },
'control_building_2_s_kg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_2_s_kg.png') } } },
'control_building_all' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_all.png') } } },
'control_building_control' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_control.png') } } },
'control_building_dg' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_dg.png') } } },
'control_building_edg_all' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_all.png') } } },
'control_building_edg_dg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_dg.png') } } },
'control_building_edg_eg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_eg.png') } } },
'control_building_edg_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_int_all.png') } } },
'control_building_edg_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_int_dg.png') } } },
'control_building_edg_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_int_eg.png') } } },
'control_building_edg_int_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_int_kg.png') } } },
'control_building_edg_kg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_edg_kg.png') } } },
'control_building_eg' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_eg.png') } } },
'control_building_empty' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_empty.png') } } },
'control_building_filled' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_filled.png') } } },
'control_building_int_all' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_int_all.png') } } },
'control_building_int_dg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_int_dg.png') } } },
'control_building_int_eg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_int_eg.png') } } },
'control_building_int_kg' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_int_kg.png') } } },
'control_building_int_og' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_int_og.png') } } },
'control_building_kg' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_kg.png') } } },
'control_building_modern_s_2og_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_all.png') } } },
'control_building_modern_s_2og_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_dg.png') } } },
'control_building_modern_s_2og_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_eg.png') } } },
'control_building_modern_s_2og_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_all.png') } } },
'control_building_modern_s_2og_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_dg.png') } } },
'control_building_modern_s_2og_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_eg.png') } } },
'control_building_modern_s_2og_int_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_kg.png') } } },
'control_building_modern_s_2og_int_og1' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_og1.png') } } },
'control_building_modern_s_2og_int_og2' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_int_og2.png') } } },
'control_building_modern_s_2og_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_kg.png') } } },
'control_building_modern_s_2og_og1' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_og1.png') } } },
'control_building_modern_s_2og_og2' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_2og_og2.png') } } },
'control_building_modern_s_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_all.png') } } },
'control_building_modern_s_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_dg.png') } } },
'control_building_modern_s_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_eg.png') } } },
'control_building_modern_s_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_int_all.png') } } },
'control_building_modern_s_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_int_dg.png') } } },
'control_building_modern_s_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_int_eg.png') } } },
'control_building_modern_s_int_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_int_kg.png') } } },
'control_building_modern_s_int_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_int_og.png') } } },
'control_building_modern_s_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_kg.png') } } },
'control_building_modern_s_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_og.png') } } },
'control_building_modern_s_okg_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_all.png') } } },
'control_building_modern_s_okg_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_dg.png') } } },
'control_building_modern_s_okg_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_eg.png') } } },
'control_building_modern_s_okg_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_int_all.png') } } },
'control_building_modern_s_okg_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_int_dg.png') } } },
'control_building_modern_s_okg_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_int_eg.png') } } },
'control_building_modern_s_okg_int_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_int_og.png') } } },
'control_building_modern_s_okg_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_modern_s_okg_og.png') } } },
'control_building_og' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_og.png') } } },
'control_building_outside' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_outside.png') } } },
'control_building_s_all' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_all.png') } } },
'control_building_s_dg' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_dg.png') } } },
'control_building_s_eg' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_eg.png') } } },
'control_building_s_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_int_all.png') } } },
'control_building_s_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_int_dg.png') } } },
'control_building_s_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_int_eg.png') } } },
'control_building_s_int_kg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_int_kg.png') } } },
'control_building_s_int_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_int_og.png') } } },
'control_building_s_kg' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_kg.png') } } },
'control_building_s_og' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_og.png') } } },
'control_building_s_okg_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_all.png') } } },
'control_building_s_okg_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_dg.png') } } },
'control_building_s_okg_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_eg.png') } } },
'control_building_s_okg_int_all' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_int_all.png') } } },
'control_building_s_okg_int_dg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_int_dg.png') } } },
'control_building_s_okg_int_eg' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_int_eg.png') } } },
'control_building_s_okg_int_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_int_og.png') } } },
'control_building_s_okg_og' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_building_s_okg_og.png') } } },
'control_cancel' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_cancel.png') } } },
'control_centr_arrow_down' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_down.png') } } },
'control_centr_arrow_down_left' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_down_left.png') } } },
'control_centr_arrow_down_right' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_down_right.png') } } },
'control_centr_arrow_left' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_left.png') } } },
'control_centr_arrow_right' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_right.png') } } },
'control_centr_arrow_up' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_up.png') } } },
'control_centr_arrow_up_left' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_up_left.png') } } },
'control_centr_arrow_up_right' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_centr_arrow_up_right.png') } } },
'control_circuit_breaker_off' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_circuit_breaker_off.png') } } },
'control_circuit_breaker_on' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_circuit_breaker_on.png') } } },
'control_clear' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_clear.png') } } },
'control_fault_current_circuit_breaker_off' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_fault_current_circuit_breaker_off.png') } } },
'control_fault_current_circuit_breaker_on' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_fault_current_circuit_breaker_on.png') } } },
'control_home' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_home.png') } } },
'control_minus' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_minus.png') } } },
'control_ok' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_ok.png') } } },
'control_on_off' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_on_off.png') } } },
'control_outside_on_off' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_outside_on_off.png') } } },
'control_plus' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_plus.png') } } },
'control_reboot' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_reboot.png') } } },
'control_reset' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_reset.png') } } },
'control_return' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_return.png') } } },
'control_standby' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_standby.png') } } },
'control_switch_1' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_switch_1.png') } } },
'control_switch_3' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_switch_3.png') } } },
'control_switch_m_4' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_switch_m_4.png') } } },
'control_switch_m_8' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_switch_m_8.png') } } },
'control_x' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_x.png') } } },
'control_zoom_in' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_zoom_in.png') } } },
'control_zoom_out' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/control_zoom_out.png') } } },
'edit_collapse' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_collapse.png') } } },
'edit_copy' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_copy.png') } } },
'edit_cut' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_cut.png') } } },
'edit_delete' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_delete.png') } } },
'edit_expand' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_expand.png') } } },
'edit_favorites' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_favorites.png') } } },
'edit_input_numeric' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_input_numeric.png') } } },
'edit_numeric_0' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_0.png') } } },
'edit_numeric_1' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_1.png') } } },
'edit_numeric_2' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_2.png') } } },
'edit_numeric_3' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_3.png') } } },
'edit_numeric_4' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_4.png') } } },
'edit_numeric_5' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_5.png') } } },
'edit_numeric_6' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_6.png') } } },
'edit_numeric_7' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_7.png') } } },
'edit_numeric_8' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_8.png') } } },
'edit_numeric_9' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_numeric_9.png') } } },
'edit_open' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_open.png') } } },
'edit_paste' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_paste.png') } } },
'edit_save' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_save.png') } } },
'edit_settings' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_settings.png') } } },
'edit_sort' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/edit_sort.png') } } },
'fts_awning' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_awning.png') } } },
'fts_blade_arc' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc.png') } } },
'fts_blade_arc_00' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_00.png') } } },
'fts_blade_arc_10' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_10.png') } } },
'fts_blade_arc_100' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_100.png') } } },
'fts_blade_arc_20' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_20.png') } } },
'fts_blade_arc_30' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_30.png') } } },
'fts_blade_arc_40' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_40.png') } } },
'fts_blade_arc_50' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_50.png') } } },
'fts_blade_arc_60' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_60.png') } } },
'fts_blade_arc_70' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_70.png') } } },
'fts_blade_arc_80' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_80.png') } } },
'fts_blade_arc_90' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_90.png') } } },
'fts_blade_arc_automatic' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_automatic.png') } } },
'fts_blade_arc_close_00' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_close_00.png') } } },
'fts_blade_arc_close_100' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_close_100.png') } } },
'fts_blade_arc_close_50' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_close_50.png') } } },
'fts_blade_arc_sun' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_arc_sun.png') } } },
'fts_blade_s' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s.png') } } },
'fts_blade_s_00' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_00.png') } } },
'fts_blade_s_10' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_10.png') } } },
'fts_blade_s_100' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_100.png') } } },
'fts_blade_s_20' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_20.png') } } },
'fts_blade_s_30' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_30.png') } } },
'fts_blade_s_40' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_40.png') } } },
'fts_blade_s_50' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_50.png') } } },
'fts_blade_s_60' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_60.png') } } },
'fts_blade_s_70' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_70.png') } } },
'fts_blade_s_80' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_80.png') } } },
'fts_blade_s_90' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_90.png') } } },
'fts_blade_s_automatic' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_automatic.png') } } },
'fts_blade_s_sun' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_s_sun.png') } } },
'fts_blade_z' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z.png') } } },
'fts_blade_z_00' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_00.png') } } },
'fts_blade_z_10' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_10.png') } } },
'fts_blade_z_100' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_100.png') } } },
'fts_blade_z_20' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_20.png') } } },
'fts_blade_z_30' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_30.png') } } },
'fts_blade_z_40' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_40.png') } } },
'fts_blade_z_50' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_50.png') } } },
'fts_blade_z_60' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_60.png') } } },
'fts_blade_z_70' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_70.png') } } },
'fts_blade_z_80' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_80.png') } } },
'fts_blade_z_90' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_90.png') } } },
'fts_blade_z_automatic' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_automatic.png') } } },
'fts_blade_z_sun' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_blade_z_sun.png') } } },
'fts_door' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door.png') } } },
'fts_door_locked' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_locked.png') } } },
'fts_door_open' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_open.png') } } },
'fts_door_slide' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide.png') } } },
'fts_door_slide_2w' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_2w.png') } } },
'fts_door_slide_2w_open_l' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_2w_open_l.png') } } },
'fts_door_slide_2w_open_lr' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_2w_open_lr.png') } } },
'fts_door_slide_2w_open_r' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_2w_open_r.png') } } },
'fts_door_slide_m' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_m.png') } } },
'fts_door_slide_open' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_open.png') } } },
'fts_door_slide_open_m' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_slide_open_m.png') } } },
'fts_door_tilt' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_tilt.png') } } },
'fts_door_unlocked' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_door_unlocked.png') } } },
'fts_frontdoor' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_frontdoor.png') } } },
'fts_garage' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage.png') } } },
'fts_garage_door_10' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_10.png') } } },
'fts_garage_door_100' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_100.png') } } },
'fts_garage_door_20' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_20.png') } } },
'fts_garage_door_30' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_30.png') } } },
'fts_garage_door_40' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_40.png') } } },
'fts_garage_door_50' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_50.png') } } },
'fts_garage_door_60' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_60.png') } } },
'fts_garage_door_70' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_70.png') } } },
'fts_garage_door_80' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_80.png') } } },
'fts_garage_door_90' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_garage_door_90.png') } } },
'fts_light_dome' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_light_dome.png') } } },
'fts_light_dome_open' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_light_dome_open.png') } } },
'fts_shutter' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter.png') } } },
'fts_shutter_10' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_10.png') } } },
'fts_shutter_100' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_100.png') } } },
'fts_shutter_20' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_20.png') } } },
'fts_shutter_30' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_30.png') } } },
'fts_shutter_40' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_40.png') } } },
'fts_shutter_50' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_50.png') } } },
'fts_shutter_60' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_60.png') } } },
'fts_shutter_70' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_70.png') } } },
'fts_shutter_80' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_80.png') } } },
'fts_shutter_90' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_90.png') } } },
'fts_shutter_automatic' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_automatic.png') } } },
'fts_shutter_down' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_down.png') } } },
'fts_shutter_locked' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_locked.png') } } },
'fts_shutter_manual' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_manual.png') } } },
'fts_shutter_unlocked' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_unlocked.png') } } },
'fts_shutter_up' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_up.png') } } },
'fts_shutter_vert' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert.png') } } },
'fts_shutter_vert_10' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_10.png') } } },
'fts_shutter_vert_100' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_100.png') } } },
'fts_shutter_vert_20' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_20.png') } } },
'fts_shutter_vert_30' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_30.png') } } },
'fts_shutter_vert_40' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_40.png') } } },
'fts_shutter_vert_50' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_50.png') } } },
'fts_shutter_vert_60' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_60.png') } } },
'fts_shutter_vert_70' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_70.png') } } },
'fts_shutter_vert_80' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_80.png') } } },
'fts_shutter_vert_90' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_90.png') } } },
'fts_shutter_vert_automatic' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_automatic.png') } } },
'fts_shutter_vert_blade_00' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_00.png') } } },
'fts_shutter_vert_blade_10' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_10.png') } } },
'fts_shutter_vert_blade_100' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_100.png') } } },
'fts_shutter_vert_blade_20' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_20.png') } } },
'fts_shutter_vert_blade_30' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_30.png') } } },
'fts_shutter_vert_blade_40' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_40.png') } } },
'fts_shutter_vert_blade_50' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_50.png') } } },
'fts_shutter_vert_blade_60' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_60.png') } } },
'fts_shutter_vert_blade_70' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_70.png') } } },
'fts_shutter_vert_blade_80' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_80.png') } } },
'fts_shutter_vert_blade_90' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_blade_90.png') } } },
'fts_shutter_vert_down' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_down.png') } } },
'fts_shutter_vert_manual' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_manual.png') } } },
'fts_shutter_vert_up' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_shutter_vert_up.png') } } },
'fts_sliding_gate' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate.png') } } },
'fts_sliding_gate_closed' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate_closed.png') } } },
'fts_sliding_gate_l' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate_l.png') } } },
'fts_sliding_gate_l_closed' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate_l_closed.png') } } },
'fts_sliding_gate_l_open' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate_l_open.png') } } },
'fts_sliding_gate_open' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sliding_gate_open.png') } } },
'fts_sunblind' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_sunblind.png') } } },
'fts_umbrella_offset_closed' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_umbrella_offset_closed.png') } } },
'fts_umbrella_offset_open' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_umbrella_offset_open.png') } } },
'fts_window_1w' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_1w.png') } } },
'fts_window_1w_open' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_1w_open.png') } } },
'fts_window_1w_tilt' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_1w_tilt.png') } } },
'fts_window_2w' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w.png') } } },
'fts_window_2w_open' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_open.png') } } },
'fts_window_2w_open_l' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_open_l.png') } } },
'fts_window_2w_open_l_tilt_r' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_open_l_tilt_r.png') } } },
'fts_window_2w_open_lr' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_open_lr.png') } } },
'fts_window_2w_open_r' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_open_r.png') } } },
'fts_window_2w_tilt' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_tilt.png') } } },
'fts_window_2w_tilt_l' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_tilt_l.png') } } },
'fts_window_2w_tilt_l_open_r' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_tilt_l_open_r.png') } } },
'fts_window_2w_tilt_lr' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_tilt_lr.png') } } },
'fts_window_2w_tilt_r' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_2w_tilt_r.png') } } },
'fts_window_louvre' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_louvre.png') } } },
'fts_window_louvre_open' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_louvre_open.png') } } },
'fts_window_roof' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof.png') } } },
'fts_window_roof_open_1' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_open_1.png') } } },
'fts_window_roof_open_2' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_open_2.png') } } },
'fts_window_roof_shutter' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter.png') } } },
'fts_window_roof_shutter_10' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_10.png') } } },
'fts_window_roof_shutter_100' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_100.png') } } },
'fts_window_roof_shutter_20' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_20.png') } } },
'fts_window_roof_shutter_30' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_30.png') } } },
'fts_window_roof_shutter_40' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_40.png') } } },
'fts_window_roof_shutter_50' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_50.png') } } },
'fts_window_roof_shutter_60' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_60.png') } } },
'fts_window_roof_shutter_70' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_70.png') } } },
'fts_window_roof_shutter_80' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_80.png') } } },
'fts_window_roof_shutter_90' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_window_roof_shutter_90.png') } } },
'fts_yard_gate_2w' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_yard_gate_2w.png') } } },
'fts_yard_gate_2w_open' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/fts_yard_gate_2w_open.png') } } },
'it_camera' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_camera.png') } } },
'it_fax' :                       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_fax.png') } } },
'it_internet' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_internet.png') } } },
'it_nas' :                       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_nas.png') } } },
'it_net' :                       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_net.png') } } },
'it_network' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_network.png') } } },
'it_pc' :                        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_pc.png') } } },
'it_radio' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_radio.png') } } },
'it_remote' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_remote.png') } } },
'it_router' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_router.png') } } },
'it_satellite_dish' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_satellite_dish.png') } } },
'it_satellite_dish_heating' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_satellite_dish_heating.png') } } },
'it_server' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_server.png') } } },
'it_smartphone' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_smartphone.png') } } },
'it_telephone' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_telephone.png') } } },
'it_television' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_television.png') } } },
'it_wifi' :                      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_wifi.png') } } },
'it_wireless_dcf77' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/it_wireless_dcf77.png') } } },
'light_ball' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_ball.png') } } },
'light_bar_table' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_bar_table.png') } } },
'light_bedside' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_bedside.png') } } },
'light_bollard_1' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_bollard_1.png') } } },
'light_bollard_2' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_bollard_2.png') } } },
'light_cabinet' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_cabinet.png') } } },
'light_ceiling_light' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_ceiling_light.png') } } },
'light_control' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_control.png') } } },
'light_corridor' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_corridor.png') } } },
'light_cube' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_cube.png') } } },
'light_diffused' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_diffused.png') } } },
'light_dinner_table' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_dinner_table.png') } } },
'light_downlight' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_downlight.png') } } },
'light_dressing_room' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_dressing_room.png') } } },
'light_fairy_lights' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_fairy_lights.png') } } },
'light_floor_lamp' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_floor_lamp.png') } } },
'light_fountain_indoor' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_fountain_indoor.png') } } },
'light_garage' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_garage.png') } } },
'light_indoor' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor.png') } } },
'light_indoor_dg' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_dg.png') } } },
'light_indoor_eg' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_eg.png') } } },
'light_indoor_kg' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_kg.png') } } },
'light_indoor_og' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_og.png') } } },
'light_indoor_og_1' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_og_1.png') } } },
'light_indoor_og_2' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_og_2.png') } } },
'light_indoor_ug' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_indoor_ug.png') } } },
'light_kitchen_hood' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_kitchen_hood.png') } } },
'light_led' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_led.png') } } },
'light_led_stripe' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_led_stripe.png') } } },
'light_led_stripe_rgb' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_led_stripe_rgb.png') } } },
'light_light' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light.png') } } },
'light_light_dim_00' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_00.png') } } },
'light_light_dim_10' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_10.png') } } },
'light_light_dim_100' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_100.png') } } },
'light_light_dim_20' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_20.png') } } },
'light_light_dim_30' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_30.png') } } },
'light_light_dim_40' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_40.png') } } },
'light_light_dim_50' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_50.png') } } },
'light_light_dim_60' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_60.png') } } },
'light_light_dim_70' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_70.png') } } },
'light_light_dim_80' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_80.png') } } },
'light_light_dim_90' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_light_dim_90.png') } } },
'light_mirror' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_mirror.png') } } },
'light_mirrored_wardrobe' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_mirrored_wardrobe.png') } } },
'light_office' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_office.png') } } },
'light_office_desk' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_office_desk.png') } } },
'light_outdoor' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_outdoor.png') } } },
'light_painting' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_painting.png') } } },
'light_party' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_party.png') } } },
'light_pendant_light' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_pendant_light.png') } } },
'light_pendant_light_round' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_pendant_light_round.png') } } },
'light_plant' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_plant.png') } } },
'light_plant_spot' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_plant_spot.png') } } },
'light_pool' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_pool.png') } } },
'light_pool_rgb' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_pool_rgb.png') } } },
'light_rgb' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_rgb.png') } } },
'light_stairs' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_stairs.png') } } },
'light_starlit_sky' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_starlit_sky.png') } } },
'light_uplight' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_uplight.png') } } },
'light_wall_1' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_wall_1.png') } } },
'light_wall_2' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_wall_2.png') } } },
'light_wall_3' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_wall_3.png') } } },
'light_waterfall' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_waterfall.png') } } },
'light_window' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_window.png') } } },
'light_wire_system_1' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_wire_system_1.png') } } },
'light_wire_system_2' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/light_wire_system_2.png') } } },
'measure_battery_0' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_battery_0.png') } } },
'measure_battery_100' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_battery_100.png') } } },
'measure_battery_25' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_battery_25.png') } } },
'measure_battery_50' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_battery_50.png') } } },
'measure_battery_75' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_battery_75.png') } } },
'measure_cistern_0' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_0.png') } } },
'measure_cistern_10' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_10.png') } } },
'measure_cistern_100' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_100.png') } } },
'measure_cistern_20' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_20.png') } } },
'measure_cistern_30' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_30.png') } } },
'measure_cistern_40' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_40.png') } } },
'measure_cistern_50' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_50.png') } } },
'measure_cistern_60' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_60.png') } } },
'measure_cistern_70' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_70.png') } } },
'measure_cistern_80' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_80.png') } } },
'measure_cistern_90' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_cistern_90.png') } } },
'measure_current' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_current.png') } } },
'measure_ph_value' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_ph_value.png') } } },
'measure_photovoltaic_inst' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_photovoltaic_inst.png') } } },
'measure_pond_0' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_0.png') } } },
'measure_pond_10' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_10.png') } } },
'measure_pond_100' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_100.png') } } },
'measure_pond_20' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_20.png') } } },
'measure_pond_30' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_30.png') } } },
'measure_pond_40' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_40.png') } } },
'measure_pond_50' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_50.png') } } },
'measure_pond_60' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_60.png') } } },
'measure_pond_70' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_70.png') } } },
'measure_pond_80' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_80.png') } } },
'measure_pond_90' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pond_90.png') } } },
'measure_power' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_power.png') } } },
'measure_power_meter' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_power_meter.png') } } },
'measure_pressure_bar' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_pressure_bar.png') } } },
'measure_voltage' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_voltage.png') } } },
'measure_water_meter' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/measure_water_meter.png') } } },
'message_achtung' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_achtung.png') } } },
'message_attention' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_attention.png') } } },
'message_bell' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_bell.png') } } },
'message_bell_door' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_bell_door.png') } } },
'message_bell_door_disabled' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_bell_door_disabled.png') } } },
'message_caution' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_caution.png') } } },
'message_empty' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_empty.png') } } },
'message_error' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_error.png') } } },
'message_garbage' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_garbage.png') } } },
'message_garbage_collection' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_garbage_collection.png') } } },
'message_help' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_help.png') } } },
'message_info' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_info.png') } } },
'message_light_barrier' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_light_barrier.png') } } },
'message_light_barrier_open' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_light_barrier_open.png') } } },
'message_light_intensity' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_light_intensity.png') } } },
'message_mail' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_mail.png') } } },
'message_mail_open' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_mail_open.png') } } },
'message_medicine' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_medicine.png') } } },
'message_notice' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_notice.png') } } },
'message_ok' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_ok.png') } } },
'message_postbox' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_postbox.png') } } },
'message_postbox_mail' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_postbox_mail.png') } } },
'message_presence' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_presence.png') } } },
'message_presence_active' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_presence_active.png') } } },
'message_presence_disabled' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_presence_disabled.png') } } },
'message_presence_inactive' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_presence_inactive.png') } } },
'message_service' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_service.png') } } },
'message_socket' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_socket.png') } } },
'message_socket_ch' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_socket_ch.png') } } },
'message_socket_ch_3' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_socket_ch_3.png') } } },
'message_socket_ch_on_off' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_socket_ch_on_off.png') } } },
'message_socket_on_off' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_socket_on_off.png') } } },
'message_stop' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_stop.png') } } },
'message_tendency_downward' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_tendency_downward.png') } } },
'message_tendency_steady' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_tendency_steady.png') } } },
'message_tendency_upward' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/message_tendency_upward.png') } } },
'phone_answersing' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_answersing.png') } } },
'phone_call' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call.png') } } },
'phone_call_end' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call_end.png') } } },
'phone_call_end_in' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call_end_in.png') } } },
'phone_call_end_out' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call_end_out.png') } } },
'phone_call_in' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call_in.png') } } },
'phone_call_out' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_call_out.png') } } },
'phone_dial' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_dial.png') } } },
'phone_missed_in' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_missed_in.png') } } },
'phone_missed_out' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_missed_out.png') } } },
'phone_remote_trans_disabled' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_remote_trans_disabled.png') } } },
'phone_ring' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_ring.png') } } },
'phone_ring_in' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_ring_in.png') } } },
'phone_ring_out' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/phone_ring_out.png') } } },
'sani_boiler_temp' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_boiler_temp.png') } } },
'sani_buffer_temp_all' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_buffer_temp_all.png') } } },
'sani_buffer_temp_down' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_buffer_temp_down.png') } } },
'sani_buffer_temp_up' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_buffer_temp_up.png') } } },
'sani_central_vacuum_cleaner' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_central_vacuum_cleaner.png') } } },
'sani_central_vacuum_cleaner_dust_cont' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_central_vacuum_cleaner_dust_cont.png') } } },
'sani_central_vacuum_cleaner_filter' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_central_vacuum_cleaner_filter.png') } } },
'sani_cogeneration' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_cogeneration.png') } } },
'sani_cooling' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_cooling.png') } } },
'sani_cooling_automatic' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_cooling_automatic.png') } } },
'sani_cooling_manual' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_cooling_manual.png') } } },
'sani_cooling_temp' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_cooling_temp.png') } } },
'sani_domestic_waterworks' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_domestic_waterworks.png') } } },
'sani_earth_source_heat_pump' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_earth_source_heat_pump.png') } } },
'sani_floor_heating' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_floor_heating.png') } } },
'sani_garden_pump' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_garden_pump.png') } } },
'sani_heating' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_heating.png') } } },
'sani_heating_automatic' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_heating_automatic.png') } } },
'sani_heating_manual' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_heating_manual.png') } } },
'sani_heating_temp' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_heating_temp.png') } } },
'sani_irrigation' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_irrigation.png') } } },
'sani_irrigation_pop_up_off' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_irrigation_pop_up_off.png') } } },
'sani_irrigation_pop_up_on' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_irrigation_pop_up_on.png') } } },
'sani_leakage' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_leakage.png') } } },
'sani_pool_filter_pump' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_pool_filter_pump.png') } } },
'sani_pump' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_pump.png') } } },
'sani_return_temp' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_return_temp.png') } } },
'sani_solar' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_solar.png') } } },
'sani_solar_temp' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_solar_temp.png') } } },
'sani_sprinkling' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_sprinkling.png') } } },
'sani_supply_temp' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_supply_temp.png') } } },
'sani_valve_0' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_0.png') } } },
'sani_valve_10' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_10.png') } } },
'sani_valve_100' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_100.png') } } },
'sani_valve_20' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_20.png') } } },
'sani_valve_30' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_30.png') } } },
'sani_valve_40' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_40.png') } } },
'sani_valve_50' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_50.png') } } },
'sani_valve_60' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_60.png') } } },
'sani_valve_70' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_70.png') } } },
'sani_valve_80' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_80.png') } } },
'sani_valve_90' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_valve_90.png') } } },
'sani_water_cold' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_water_cold.png') } } },
'sani_water_hot' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_water_hot.png') } } },
'sani_water_softening_unit' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_water_softening_unit.png') } } },
'sani_water_tap' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/sani_water_tap.png') } } },
'scene_aquarium' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_aquarium.png') } } },
'scene_baby' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_baby.png') } } },
'scene_baking_oven' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_baking_oven.png') } } },
'scene_bath' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_bath.png') } } },
'scene_bathroom' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_bathroom.png') } } },
'scene_cat' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cat.png') } } },
'scene_childs_room' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_childs_room.png') } } },
'scene_cinema' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cinema.png') } } },
'scene_cleaning' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cleaning.png') } } },
'scene_clothes_dryer' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_clothes_dryer.png') } } },
'scene_cockle_stove' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cockle_stove.png') } } },
'scene_coffee_maker_automatic' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_coffee_maker_automatic.png') } } },
'scene_cooking' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cooking.png') } } },
'scene_cooking_alternat' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cooking_alternat.png') } } },
'scene_cooking_hob' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cooking_hob.png') } } },
'scene_corridor' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_corridor.png') } } },
'scene_cubby' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_cubby.png') } } },
'scene_day' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_day.png') } } },
'scene_deckchair' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_deckchair.png') } } },
'scene_dinner' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_dinner.png') } } },
'scene_dishwasher' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_dishwasher.png') } } },
'scene_dog' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_dog.png') } } },
'scene_dressing_room' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_dressing_room.png') } } },
'scene_dressing_room_alternat' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_dressing_room_alternat.png') } } },
'scene_drink' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_drink.png') } } },
'scene_fitness' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_fitness.png') } } },
'scene_fountain' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_fountain.png') } } },
'scene_fountain_indoor' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_fountain_indoor.png') } } },
'scene_freezer' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_freezer.png') } } },
'scene_gaming' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_gaming.png') } } },
'scene_garden' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_garden.png') } } },
'scene_hall' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_hall.png') } } },
'scene_hall_alternat' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_hall_alternat.png') } } },
'scene_ironing' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_ironing.png') } } },
'scene_keyboard' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_keyboard.png') } } },
'scene_kitchen_hood' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_kitchen_hood.png') } } },
'scene_kitchen_sink' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_kitchen_sink.png') } } },
'scene_laundry_room' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_laundry_room.png') } } },
'scene_laundry_room_fem' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_laundry_room_fem.png') } } },
'scene_living' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_living.png') } } },
'scene_livingroom' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_livingroom.png') } } },
'scene_making_love' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_making_love.png') } } },
'scene_making_love_clean' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_making_love_clean.png') } } },
'scene_massage_jet' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_massage_jet.png') } } },
'scene_microwave_oven' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_microwave_oven.png') } } },
'scene_night' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_night.png') } } },
'scene_office' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_office.png') } } },
'scene_party' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_party.png') } } },
'scene_pet' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_pet.png') } } },
'scene_pool' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_pool.png') } } },
'scene_robo_lawnmower' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_robo_lawnmower.png') } } },
'scene_robo_vac_cleaner' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_robo_vac_cleaner.png') } } },
'scene_sauna' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sauna.png') } } },
'scene_scene' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_scene.png') } } },
'scene_scene_teach_in' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_scene_teach_in.png') } } },
'scene_shower' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_shower.png') } } },
'scene_sleeping' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping.png') } } },
'scene_sleeping_alternat' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping_alternat.png') } } },
'scene_sleeping_twin_0_0' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping_twin_0_0.png') } } },
'scene_sleeping_twin_0_1' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping_twin_0_1.png') } } },
'scene_sleeping_twin_1_0' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping_twin_1_0.png') } } },
'scene_sleeping_twin_1_1' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_sleeping_twin_1_1.png') } } },
'scene_stairs' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_stairs.png') } } },
'scene_storeroom' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_storeroom.png') } } },
'scene_stove' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_stove.png') } } },
'scene_summerhouse' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_summerhouse.png') } } },
'scene_swimming' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_swimming.png') } } },
'scene_terrace' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_terrace.png') } } },
'scene_toilet' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_toilet.png') } } },
'scene_toilet_alternat' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_toilet_alternat.png') } } },
'scene_visit_guests' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_visit_guests.png') } } },
'scene_washing_machine' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_washing_machine.png') } } },
'scene_waterfall' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_waterfall.png') } } },
'scene_wine_cellar' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_wine_cellar.png') } } },
'scene_workshop' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_workshop.png') } } },
'scene_x-mas' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/scene_x-mas.png') } } },
'secur_alarm' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_alarm.png') } } },
'secur_alarm_alarm' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_alarm_alarm.png') } } },
'secur_alarm_disabled' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_alarm_disabled.png') } } },
'secur_alarm_enabled' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_alarm_enabled.png') } } },
'secur_alarm_test' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_alarm_test.png') } } },
'secur_breakage_glass' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_breakage_glass.png') } } },
'secur_burglary' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_burglary.png') } } },
'secur_encoding' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_encoding.png') } } },
'secur_frost_protection' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_frost_protection.png') } } },
'secur_heat_protection' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_heat_protection.png') } } },
'secur_locked' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_locked.png') } } },
'secur_open' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_open.png') } } },
'secur_sabotage' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_sabotage.png') } } },
'secur_smoke_detector' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/secur_smoke_detector.png') } } },
'status_automatic' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_automatic.png') } } },
'status_available' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_available.png') } } },
'status_away_1' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_away_1.png') } } },
'status_away_2' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_away_2.png') } } },
'status_comfort' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_comfort.png') } } },
'status_economy' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_economy.png') } } },
'status_frost' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_frost.png') } } },
'status_locked' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_locked.png') } } },
'status_night' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_night.png') } } },
'status_not_available' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_not_available.png') } } },
'status_open' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_open.png') } } },
'status_protection' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_protection.png') } } },
'status_standby' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_standby.png') } } },
'status_vacation' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/status_vacation.png') } } },
'temp_control' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_control.png') } } },
'temp_dew_point' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_dew_point.png') } } },
'temp_frost' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_frost.png') } } },
'temp_inside' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_inside.png') } } },
'temp_outside' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_outside.png') } } },
'temp_soil' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_soil.png') } } },
'temp_temperature' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_temperature.png') } } },
'temp_temperature_max' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_temperature_max.png') } } },
'temp_temperature_min' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_temperature_min.png') } } },
'temp_windchill' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/temp_windchill.png') } } },
'text_max' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/text_max.png') } } },
'text_min' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/text_min.png') } } },
'time_alarm_clock' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_alarm_clock.png') } } },
'time_alarm_clock_alarm_off' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_alarm_clock_alarm_off.png') } } },
'time_alarm_clock_alarm_on' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_alarm_clock_alarm_on.png') } } },
'time_alarm_clock_snooze' :      { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_alarm_clock_snooze.png') } } },
'time_automatic' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_automatic.png') } } },
'time_calendar' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_calendar.png') } } },
'time_clock' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_clock.png') } } },
'time_eco_mode' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_eco_mode.png') } } },
'time_graph' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_graph.png') } } },
'time_manual_mode' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_manual_mode.png') } } },
'time_note' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_note.png') } } },
'time_statistic' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_statistic.png') } } },
'time_timer' :                   { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_timer.png') } } },
'time_timer_switch' :            { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/time_timer_switch.png') } } },
'user_available' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/user_available.png') } } },
'user_away' :                    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/user_away.png') } } },
'user_ext_away' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/user_ext_away.png') } } },
'user_n_a' :                     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/user_n_a.png') } } },
'vent_air_filter' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_air_filter.png') } } },
'vent_air_filter_full' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_air_filter_full.png') } } },
'vent_ambient_air' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ambient_air.png') } } },
'vent_bypass' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_bypass.png') } } },
'vent_bypass_open' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_bypass_open.png') } } },
'vent_exhaust_air' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_exhaust_air.png') } } },
'vent_low_pressure_warning' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_low_pressure_warning.png') } } },
'vent_supply_air' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_supply_air.png') } } },
'vent_used_air' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_used_air.png') } } },
'vent_ventilation' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation.png') } } },
'vent_ventilation_control' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_control.png') } } },
'vent_ventilation_level_0' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_0.png') } } },
'vent_ventilation_level_1' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_1.png') } } },
'vent_ventilation_level_2' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_2.png') } } },
'vent_ventilation_level_3' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_3.png') } } },
'vent_ventilation_level_automatic' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_automatic.png') } } },
'vent_ventilation_level_manual_m' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/vent_ventilation_level_manual_m.png') } } },
'weather_barometric_pressure' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_barometric_pressure.png') } } },
'weather_cloudy' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_cloudy.png') } } },
'weather_cloudy_heavy' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_cloudy_heavy.png') } } },
'weather_cloudy_light' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_cloudy_light.png') } } },
'weather_directions' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions.png') } } },
'weather_directions_n' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_n.png') } } },
'weather_directions_no' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_no.png') } } },
'weather_directions_nw' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_nw.png') } } },
'weather_directions_o' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_o.png') } } },
'weather_directions_s' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_s.png') } } },
'weather_directions_so' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_so.png') } } },
'weather_directions_sw' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_sw.png') } } },
'weather_directions_w' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_directions_w.png') } } },
'weather_frost' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_frost.png') } } },
'weather_humidity' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_humidity.png') } } },
'weather_humidity_abs' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_humidity_abs.png') } } },
'weather_humidity_rel' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_humidity_rel.png') } } },
'weather_humidity_soil' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_humidity_soil.png') } } },
'weather_light_meter' :          { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_light_meter.png') } } },
'weather_moon_phases_1_new' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_1_new.png') } } },
'weather_moon_phases_2' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_2.png') } } },
'weather_moon_phases_3_half' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_3_half.png') } } },
'weather_moon_phases_4' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_4.png') } } },
'weather_moon_phases_5_full' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_5_full.png') } } },
'weather_moon_phases_6' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_6.png') } } },
'weather_moon_phases_7_half' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_7_half.png') } } },
'weather_moon_phases_8' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moon_phases_8.png') } } },
'weather_moonrise' :             { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moonrise.png') } } },
'weather_moonset' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_moonset.png') } } },
'weather_pollen' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_pollen.png') } } },
'weather_rain' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_rain.png') } } },
'weather_rain_gauge' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_rain_gauge.png') } } },
'weather_rain_heavy' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_rain_heavy.png') } } },
'weather_rain_light' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_rain_light.png') } } },
'weather_rain_meter' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_rain_meter.png') } } },
'weather_sleet' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_sleet.png') } } },
'weather_snow' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_snow.png') } } },
'weather_snow_heavy' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_snow_heavy.png') } } },
'weather_snow_ice_warning' :     { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_snow_ice_warning.png') } } },
'weather_snow_light' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_snow_light.png') } } },
'weather_station' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_station.png') } } },
'weather_station_quadra' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_station_quadra.png') } } },
'weather_storm' :                { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_storm.png') } } },
'weather_summer' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_summer.png') } } },
'weather_sun' :                  { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_sun.png') } } },
'weather_sunrise' :              { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_sunrise.png') } } },
'weather_sunset' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_sunset.png') } } },
'weather_thunderstorm' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_thunderstorm.png') } } },
'weather_wind' :                 { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind.png') } } },
'weather_wind_directions_e' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_e.png') } } },
'weather_wind_directions_n' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_n.png') } } },
'weather_wind_directions_ne' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_ne.png') } } },
'weather_wind_directions_nw' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_nw.png') } } },
'weather_wind_directions_s' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_s.png') } } },
'weather_wind_directions_se' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_se.png') } } },
'weather_wind_directions_sw' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_sw.png') } } },
'weather_wind_directions_w' :    { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_directions_w.png') } } },
'weather_wind_no_wind' :         { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_no_wind.png') } } },
'weather_wind_speed' :           { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_speed.png') } } },
'weather_wind_speed_bft' :       { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_speed_bft.png') } } },
'weather_wind_speed_ms' :        { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_wind_speed_ms.png') } } },
'weather_winter' :               { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : recolorNonTransparent('icon/knx-uf-iconset/128x128_white/weather_winter.png') } } }

// Do not remove this line: Dynamic Icons End

  };

  // //////////////////////////////////////////////////////////////////////////
  // Definition of the public variables

  /* ... */

  // //////////////////////////////////////////////////////////////////////////
  // Definition of the private methods
  /* ... */

  // //////////////////////////////////////////////////////////////////////////
  // Definition of the public methods
  /**
   * Insert or overwrite one or many icons into the database. The parameter
   * might be a full hash of icon definitions or a single one consisting out of
   * a name and a URI path. Optional further parameters are a "type" and a
   * flavour.
   */
  this.insert = function() {
    var name    = arguments[0];
    var uri     = arguments[1];
    var type    = arguments[2] || '*';
    var flavour = arguments[3] || '*';
    var color   = arguments[4] || '*';
    var styling = arguments[5];
    var dynamic = arguments[6];

    if (!db[name])
      db[name] = {};
    if (!db[name][type])
      db[name][type] = {};
    if (!db[name][type][flavour])
      db[name][type][flavour] = {};

    db[name][type][flavour][color] = {
      uri    : uri,
      styling: styling,
      dynamic: dynamic
    };
  }

  /**
   * Get the icon information for a name.
   * 
   * @method get
   * @param {String}
   *          name Name
   * @param {String}
   *          type Type (optional)
   * @param {String}
   *          flavour Flavour (optional)
   * @param {String}
   *          color Color (optional, only relevant for monochrome icons)
   * @return {URI} The URI for the icon - or "undefined" if not known
   */
  this.get = function() {
    var name    = arguments[0];
    var type    = arguments[1];
    var flavour = arguments[2];
    var color   = arguments[3];
    if (!db[name])
      return undefined;
    if (!db[name][type])
      type = '*'; // undefined -> use default
    if (typeof db[name][type] === 'string')
    {
      type = db[name][type]; // redirect link
      if( type.split('/').length > 1 )
      {
        var all = type.split('/');
        type = all.shift();
        if( flavour === undefined ) 
          flavour = all.shift();
      }
    }
    if (!db[name][type][flavour])
      flavour = '*'; // undefined -> use default
    if (typeof db[name][type][flavour] === 'string')
    {
      flavour = db[name][type][flavour]; // redirect link
      if( flavour.split('/').length > 1 )
      {
        var all = flavour.split('/');
        flavour = all.shift();
        if( color === undefined ) 
          color = all.shift();
      }
    }
    if (!db[name][type][flavour][color])
      color = '*'; // undefined -> use default
      
    // handle a generic mapping function
    if (typeof db[name][type][flavour]['*'] === 'function')
      return db[name][type][flavour]['*'];
    
    if (typeof db[name][type][flavour][color] === 'string')
      color = db[name][type][flavour][color]; // redirect link

    return db[name][type][flavour][color];
  }

  this.getURI = function() {
    var i = this.get.apply(this, arguments);
    if (i)
      return i.uri;
  }

  this.getIcon = function() {
    var i = this.get.apply(this, arguments);
    if (i) {
      var styling = arguments[4];
      if( i.icon && styling === undefined && typeof i !== 'function' )
        return i.icon;

      // fetch and cache image
      if( styling === undefined )
        styling = i.styling === undefined ? '' : ' style="' + i.styling + '"';
      else
        styling = ' style="' + styling + '"';
     
      var classes = 'icon'
      var iconclass = arguments[5];
      if( iconclass !== undefined) {
        classes = classes + ' custom_' + iconclass;
      }
      
      if( typeof i === 'function' )
      {
        i.icon = i( arguments[3], styling, classes );
      } else {
        i.icon = $('<img class="' + classes + '" src="' + i.uri + '"' + styling + '/>');
      }
      return i.icon;
    }
  }

  /**
   * List all known icons
   * 
   * @method list
   * @return {Array} List of all known icon names
   */
  this.list = function() {
    return Object.keys(db);
  }

  /**
   * Return icon database for debuging purposes - use ONLY for debugging as it's
   * circumventing the data hiding and exposes a writeable reference to the
   * database object!
   * 
   * @method debug
   * @return {Object} The icon database
   */
  this.debug = function() {
    return db;
  }
};
var icons = new icon();
