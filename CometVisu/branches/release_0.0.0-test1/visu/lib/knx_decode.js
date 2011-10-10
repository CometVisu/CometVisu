/* knx_decode.js (c) by Michael Markstaller 2010
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

/* now obsolete

function formatInt(number,minlen)
{ 
  var result="";
  number=Math.abs(parseInt(number,10)); 
  minlen-=(""+number).length;
  for(var i=1;i<=minlen;i++)
  { 
    result+="0"; 
  } 
  result+=""+number; 
  return result;
}


function decodeDPT(hexstr,dpt)
{
  if( null === dpt ) return hexstr;
  if( undefined === dpt ) return hexstr;
  var val;
  var parts = dpt.split('.');
  dpt = parseInt( parts[0] );
  switch (dpt) {
      case 1:   
      case 2:   
      case 3:   
        val=parseInt(hexstr,16);
        return val.toFixed(0);
        break;
      case 4:   
        val=String.fromCharCode(parseInt(hexstr,16));
        return val;
        break;
      case 5:   
        val=parseInt(hexstr,16) * 100 / 255;
        return val.toFixed(0);
        break;
      case 6:   
        val=parseInt(hexstr,16);
        return val.toFixed(0) > 127 ? val.toFixed(0)-256 : val.toFixed(0);
        break;
      case 7:   
        return parseInt(hexstr.substr(0,2),16)<<8 | parseInt(hexstr.substr(2,2),16);
        break;
      case 8:   
        return parseInt(hexstr.substr(0,2),16)<<8 | parseInt(hexstr.substr(2,2),16);
        break;
      case 9:   
        var dez,bin1,bin2,sign,exp,mant;
        bin1=parseInt(hexstr.substr(0,2),16);
        bin2=parseInt(hexstr.substr(2,2),16);
        sign=parseInt(bin1 & 0x80);    
        exp=parseInt(bin1 & 0x78) >> 3;  
        mant=parseInt(((bin1 & 0x7) << 8) | bin2);
        if (sign != 0) 
            mant = -(~(mant - 1) & 0x7ff);
        dez = (1 << exp) * 0.01 * mant;  
        return(dez.toFixed(2));  
        break;
      case 10:   
        var wd = new Array("Null","Mo","Di","Mi","Do","Fr","Sa","So");
        var day,hour,minute,second;
        day=(parseInt(hexstr.substr(0,2),16) & 0xE0) >> 5;
        hour=parseInt(hexstr.substr(0,2),16) & 0x1F;
        minute=parseInt(hexstr.substr(2,2),16);
        second=parseInt(hexstr.substr(4,2),16);
        return wd[day]+" " +formatInt(hour,2)+":"+formatInt(minute,2)+":"+formatInt(second,2);
        break;
      case 11:
        var day,mon,year;
        day=parseInt(hexstr.substr(0,2),16) & 0x1F;
        mon=parseInt(hexstr.substr(2,2),16) & 0x0F;
        year=parseInt(hexstr.substr(4,2),16) &0x7F;
        year = year < 90 ? year+2000 : year+1900; //1990 - 2089
        return year.toFixed(0)+"-"+formatInt(mon,2)+"-"+formatInt(day,2);
        break;
      case 12:
        return parseInt(hexstr,16).toFixed(0);
        break;
      case 13:
        val=parseInt(hexstr,16).toFixed(0);
        return val > 2147483647 ? val-4294967296 : val;
        break;
      case 14:
        var sign,exp,mant;
        val=parseInt(hexstr,16);
        sign=(val & 0x80000000) ? -1 : 1;
        exp=((val & 0x7F800000) >> 23) - 127;
        mant=(val & 0x007FFFFF | 0x00800000);
        val=sign * Math.pow(2,exp) * ( mant / (1 << 23));
        return val.toFixed(2);
        break;
      case 16:   
        val="";
        var chars;
        for (var i=0;i<28;i=i+2) {
            chars=parseInt(hexstr.substr(i,2),16);
            if (chars>0) {
              val+=String.fromCharCode(chars);
            }
        }
        return val;
        break;
      default: return '0x'+hexstr;
  }

}
*/