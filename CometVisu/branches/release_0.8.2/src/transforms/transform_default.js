/* transform_default.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
Transform = {
  'raw': {
    name  : 'Only the RAW value',
    encode: function( i ){
      return i;
    },
    decode: function( i ){
      return i;
    }
  },
  'int': {
    name  : 'Cast to Int',
    encode: function( i ){
      return i.toString();
    },
    decode: function( i ){
      return parseInt( i );
    }
  },
  'float': {
    name  : 'Cast to Float',
    encode: function( i ){
      return i.toString();
    },
    decode: function( i ){
      return parseFloat( i );
    }
  }
}

/****************************************************************************
 * All functions below are only in this, i.e. the default, file.
 * All further transforms will only have the above data structure.
 ***************************************************************************/

function addTransform( prefix, transforms )
{
  for( trans in transforms )
  {
    if( transforms[trans].link )
    {
      Transform[ prefix + ':' + trans ] = $.extend( {}, transforms[ transforms[trans].link ], transforms[trans] );
    } else {
      Transform[ prefix + ':' + trans ] = transforms[ trans ];
    }
  }
}

/**
 * Prepend zeros to the string s till the result has the length l.
 */
function zeroFillString( s, l )
{
  if( s.length >= l ) return s;
  
  return new Array(1 + l - s.length).join('0') + s;
}