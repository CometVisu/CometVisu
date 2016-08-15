/* TransformKnx.js 
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
 * Transform replacement mockup
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
define( ['TransformDefault'], function(Transform ) {
  "use strict";

  Transform.addTransform( 'DPT', {
  '1.001': {
    name  : 'DPT_Switch',
    encode: function( phy ){
      return phy;
    },
    decode: function( hex ){
      return hex;
    }
  },
  '1': {
    link  : '1.001'
  },
  '1.002': {
    link  : '1.001'
  },
  '1.003': {
    link  : '1.001'
  },
  '1.008': {
    link  : '1.001'
  },
  '1.009': {
    link  : '1.001'
  },
  
  '2': {
    link  : '1.001'
  },
  
  '3': {
    link  : '1.001'
  },
  
  '4.001': {
    link  : '1.001'
  },
  '4': {
    link  : '4.001'
  },
  
  '5.001' : {
    link  : '1.001'
  },
  '5.003' : {
    link  : '1.001'
  },
  '5.004' : {
    link  : '1.001'
  },
  '5.010': {
    link  : '1.001'
  },
  '5': {
    link  : '1.001'
  },
  
  '6.001' : {
    link  : '1.001'
  },
  '6': {
    link  : '1.001'
  },
  
  '7.001' : {
    link  : '1.001'
  },
  '7': {
    link  : '1.001'
  },
  
  '8.001' : {
    link  : '1.001'
  },
  '8': {
    link  : '1.001'
  },
  
  '9.001' : {
    link  : '1.001'
  },
  '9.004': {
    link  : '1.001'
  },
  '9.007': {
    link  : '1.001'
  },
  '9.008': {
    link  : '1.001'
  },
  '9.020': {
    link  : '1.001'
  },
  '9.021': {
    link  : '1.001'
  },
  '9': {
    link  : '1.001'
  },
  
  '10.001' : {
    link  : '1.001'
  },

  '11.001' : {
    link  : '1.001'
  },
  
  '12.001' : {
    link  : '1.001'
  },
  '12': {
    link  : '1.001'
  },
  
  '13.001' : {
    link  : '1.001'
  },
  '13': {
    link  : '1.001'
  },
  
  '14.001' : {
    link  : '1.001'
  },
  '14': {
    link  : '1.001'
  },
  '16.001' : {
    link  : '1.001'
  },
  '16.000': {
    link  : '1.001'
  },
  '16': {
    link  : '1.001'
  },
  '20.102': {
    link  : '1.001'
  },
  '24.001' : {
    link  : '1.001'
  },
  'temp dummy' : {link:'1.001'}
} );
}); // end define