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
      return (phy | 0x80).toString( 16 );
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
      var val = phy.charCodeAt( 0 ).toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
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
    unit  : '%',
    range : {
      min: 0.0,
      max: 100.0
    },
    encode: function( phy ){
      var val = parseInt( phy * 255 / 100 ).toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
    },
    decode: function( hex ){
      return parseInt( hex, 16 ) * 100 / 255.0;
    }
  },
  '5.003' : {
    name  : 'DPT_Angle',
    unit  : '°',
    range : {
      min: 0.0,
      max: 360.0
    },
    encode: function( phy ){
      var val = parseInt( phy * 255 / 360 ).toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
    },
    decode: function( hex ){
      return parseInt( hex, 16 ) * 360 / 255.0;
    }
  },
  '5.004' : {
    name  : 'DPT_Percent_U8',
    unit  : '%',
    range : {
      min: 0.0,
      max: 255.0
    },
    encode: function( phy ){
      var val = parseInt( phy ).toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
    },
    decode: function( hex ){
      return parseInt( hex, 16 );
    }
  },
  '5.010': {
    link  : '5.004',
    name  : 'DPT_Value_1_Ucount',
    unit  : '-'
  },
  '5': {
    link  : '5.004',
    name  : '8-Bit Unsigned Value'
  },
  
  '6.001' : {
    name  : 'DPT_Percent_V8',
    encode: function( phy ){
      var val = phy < 0 ? phy + 256 : phy;
      val = val.toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
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
      var val = phy.toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
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
      return '80' + val.toString( 16 );
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
      if( undefined === phy || NaN == phy ) return '7fff';
      var sign = phy < 0 ? 0x8000 : 0;
      var mant = Math.round(phy * 100.0);
      var exp = 0;
      while( Math.abs(mant) > 2047 ) {
        mant >>= 1;
        exp++;
      }
      var val = ( sign | (exp<<11) | (mant & 0x07ff) ).toString( 16 );
      return '80' + ( new Array(4 - val.length + 1).join('0') + val );
    },
    decode: function( hex ){
      if( 0x7fff == parseInt( hex, 16 ) ) return NaN;
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
  '9.004': {
    link  : '9.001'
  },
  '9': {
    link  : '9.001'
  },
  
  '10.001' : {
    name  : 'DPT_TimeOfDay',
    encode: function( phy ){
      // FIXME
    },
    decode: function( hex ){ 
      var date = new Date(); // assume today
      date.setHours  ( parseInt(hex.substr(0,2),16) & 0x1F );
      date.setMinutes( parseInt(hex.substr(2,2),16)        );
      date.setSeconds( parseInt(hex.substr(4,2),16)        );
      // as KNX thinks the day of the week belongs to the time, but JavaScript
      // doesn't, tweak the date till it fits...
      var day = (parseInt(hex.substr(0,2),16) & 0xE0) >> 5;
      if( day > 0 )
      {
        var dayShift = (day - date.getDay()) % 7;
        date.setDate( date.getDate() + dayShift );
      }
      return date;
    }
  },

  '11.001' : {
    name  : 'DPT_Date',
    encode: function( phy ){
      // FIXME
    },
    decode: function( hex ){ 
      var year = parseInt(hex.substr(4,2),16) & 0x7F;
      return new Date(year < 90 ? year+2000 : year+1900, //1990 - 2089
                      (parseInt(hex.substr(2,2),16) & 0x0F) - 1,
                      parseInt(hex.substr(0,2),16) & 0x1F);
    }
  },
  
  '12.001' : {
    name  : 'DPT_Value_4_Ucount',
    encode: function( phy ){
      var val = phy.toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
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
      val = val.toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
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
      return '80' + phy;
    },
    decode: function( hex ){
      var val = parseInt( hex, 16 );
      var sign = (val & 0x80000000) ? -1 : 1;
      var exp  =((val & 0x7F800000) >> 23) - 127;
      var mant = (val & 0x007FFFFF | 0x00800000);
      return sign * Math.pow( 2, exp ) * ( mant / (1 << 23));
    }
  },
  '14': {
    link  : '14.001',
    name  : '4 byte float',
    lname : {
      'de': '4 Byte Gleitkommazahl'
    },
    unit  : '-'
  },
  '16.001' : {
    name  : 'DPT_String_8859_1',
    lname : {
      'de': '14 Byte Text ISO-8859-1'
    },
    decode: function( hex ){
      var val="";        
      var chars;
      for (var i=0;i<28;i=i+2) {
          chars=parseInt(hex.substr(i,2),16);
          if (chars>0) {
            val+=String.fromCharCode(chars);
          }
      }
      return val;
    }
  },
  '16.000': {
    link  : '16.001',
    name  : 'DPT_String_ASCII',
    lname : {
      'de': '14 Byte Text ASCII'
    },
    unit  : '-'
  },
  '16': {
    link  : '16.001',
    name  : 'DPT_String_ASCII',
    lname : {
      'de': '14 Byte Text ASCII'
    },
    unit  : '-'
  },
  '20.102': {
    name  : 'DPT_HVACMode',
    lname : {
      'de': 'KONNEX Betriebsart'
    },
    unit  : '-',
    range : {
      'enum': [ 'auto', 'comfort', 'standby', 'economy', 'building_protection' ]
    },
    encode: function( phy ){
      var val;
      switch( phy )
      {
        case 1: 
        case 'comfort':
          val = 1;
          break;
        case 2: 
        case 'standby':
          val = 2;
          break;
        case 3: 
        case 'economy':
          val = 3;
          break;
        case 4: 
        case 'building_protection':
          val = 4;
          break;
        default: // actually "case 0:" / "auto"
          val = 0;
      }
      val = val.toString( 16 );
      return (val.length == 1 ? '800' : '80') + val;
    },
    decode: function( hex ){
      switch( parseInt( hex, 16 ) )
      {
        case 1: 
          return 'comfort';
        case 2: 
          return 'standby';
        case 3: 
          return 'economy';
        case 4: 
          return 'building_protection';
        default: // actually "case 0:"
          return 'auto';
      }
    },
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

//////
// To be deleted later: a test function to check if the coding is consistent
function TEST( DPT, Bytes )
{
  var maxErr = 5;
  DPT = 'DPT:' + DPT;
  for( i = 0; i < Math.pow(2,8*Bytes); i++ )
  {
    var v = i.toString( 16 );
    v = new Array(2*Bytes - v.length + 1).join('0') + v;
    var test = Transform[DPT].encode(
      Transform[DPT].decode(v)
    );
    //console.log(i,v,test);
    if( v != test )
    {
      var v2 = Transform[DPT].decode(v);
      var test2 = Transform[DPT].decode(
        Transform[DPT].encode(v2)
      );
      if( v2 != test2 )
      {
        console.log( i, v, test, Transform[DPT].decode(v), v2, test2, maxErr );
        if( (--maxErr) < 0 ) return maxErr;
      }
    }
  }
}