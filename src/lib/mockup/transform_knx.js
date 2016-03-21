
/**
 * Transform replacement mockup
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
define( ['transform_default'], function( Transform ) {
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