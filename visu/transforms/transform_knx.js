/* transform_knx.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This class defines the default transforms:
 *   encode: transform JavaScript to bus value
 *   decode: transform bus to JavaScript value
 */
addTransform( 'DPT', {
  '1.001': {
    name  : 'DPT_Switch',
    encode: function( phy ){
      return phy.toString( 16 );
    },
    decode: function( hex ){
      return parseInt( hex , 16 );
    }
  },
  '1': {
    link  : '1.001'
  },
  
  '2': {
    link  : '1.001'
  },
  
  '3': {
    link  : '1.001'
  },
  
  '4.001': {
    name : 'DPT_Char_ASCII',
    encode: function( phy ){
      return phy.charCodeAt( 0 ).toString( 16 );
    },
    decode: function( hex ){
      return String.fromCharCode(parseInt( hex, 16 ));
    }
  },
  '4': {
    link  : '4.001'
  },
  
  '5.001' : {
    name  : 'DPT_Scaling',
    encode: function( phy ){
      return phy.toString( 16 );
    },
    decode: function( hex ){
      return parseInt( hex, 16 );
    }
  },
  '5.004' : {
    name  : 'DPT_Percent_U8',
    encode: function( phy ){
      return parseInt( phy * 255 / 100 ).toSting( 16 );
    },
    decode: function( hex ){
      return parseInt( hex, 16 ) * 100 / 255.0;
    }
  },
  '5': {
    link  : '5.004'
  },
  
  '6.001' : {
    name  : 'DPT_Percent_V8',
    encode: function( phy ){
      var val = phy < 0 ? phy + 256 : phy;
      return val.toString( 16 );
    },
    decode: function( hex ){
      var val = parseInt( hex, 16 )
      return val > 127 ? (val-256) : val;
    }
  },
  '6': {
    link  : '6.001'
  },
  
  '7.001' : {
    name  : 'DPT_Value_2_Ucount',
    encode: function( phy ){
      return phy.toString( 16 );
    },
    decode: function( hex ){ 
      return parseInt( hex, 16 );
    }
  },
  '7': {
    link  : '7.001'
  },
  
  '8.001' : {
    name  : 'DPT_Value_2_Count',
    encode: function( phy ){
      var val = phy < 0 ? phy + 65536 : phy;
      return val.toString( 16 );
    },
    decode: function( hex ){
      var val = parseInt( hex, 16 );
      return val > 32767 ? (val-65536) : val;
    }
  },
  '8': {
    link  : '8.001'
  },
  
  '9.001' : {
    name  : 'DPT_Value_Temp',
    encode: function( phy ){
      return phy;
    },
    decode: function( hex ){
      var bin1 = parseInt( hex.substr(0,2), 16 );
      var bin2 = parseInt( hex.substr(2,2), 16 );
      var sign = parseInt( bin1 & 0x80 );
      var exp  = parseInt( bin1 & 0x78 ) >> 3;
      var mant = parseInt( ((bin1 & 0x7) << 8) | bin2 );
      if( sign != 0 ) 
        mant = -(~(mant - 1) & 0x7ff);
      return (1 << exp) * 0.01 * mant;  
    }
  },
  '9': {
    link  : '9.001'
  },
  
  '12.001' : {
    name  : 'DPT_Value_4_Ucount',
    encode: function( phy ){
      return phy.toString( 16 );
    },
    decode: function( hex ){ 
      return parseInt( hex, 16 );
    }
  },
  '12': {
    link  : '12.001'
  },
  
  '13.001' : {
    name  : 'DPT_Value_4_Count',
    encode: function( phy ){
      var val = phy < 0 ? phy + 4294967296 : phy;
      return val.toString( 16 );
    },
    decode: function( hex ){
      var val = parseInt( hex, 16 );
      return val > 2147483647 ? (val-4294967296) : val;
    }
  },
  '13': {
    link  : '13.001'
  },
  
  '14.001' : {
    name  : 'DPT_Value_Acceleration_Angular',
    encode: function( phy ){
      return phy;
    },
    decode: function( hex ){
      var val = parseInt( hex, 16 );
      var sign = (val & 0x80000000) ? -1 : 1;
      var exp  =((val & 0x7F800000) >> 23) - 127;
      var mant = (val & 0x007FFFFF | 0x00800000);
      return sign * Math.pow( 2, exp ) * ( mant / (1 << 23));
    }
  },
  /* 9 Zeilen:
  },
  '.001' : {
    name  : '',
    encode: function( phy ){
      return phy;
    },
    decode: function( hex ){
      return hex;
    }
  }
  */ /////////////////////////////////////////////////
  /* 3 Zeilen:
  }
  '': {
    link  : '.001'
  },
  */
  'temp dummy' : {link:'1.001'}
} );