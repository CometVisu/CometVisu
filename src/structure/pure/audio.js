/* audio.js 
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
 *
 * @module Audio 
 * @title  CometVisu Audio 
 */


/**
 * @author Markus Damman
 * @since 2014
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('audio', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);

    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'audio', $e, path, flavour, type, this.update);
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'src'     : $e.attr('src'),
      'id'      : $e.attr('id'),
      'width'   : $e.attr('width'),
      'height'  : $e.attr('height'),
      'autoplay': $e.attr('autoplay'),
      'loop'    : $e.attr('loop'),
      'threshold_value'  : $e.attr('threshold_value' ) || 1
    } );

    // create the actor
    var style = '';
    if( data.width  ) style += 'width:'  + data.width  + ';';
    if( data.height ) style += 'height:' + data.height + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var autoplay = (data.autoplay == 'true') ? ' autoplay ' : '';
    var loop = (data.loop == 'true') ? ' loop ' : '';
    var actor = '<div class="actor"><audio id="' + $e.attr('id') + '" ' + autoplay + loop + style + ' controls> <source src="' +$e.attr('src') + '" > </audio> </div>';
    return ret_val + actor + '</div>';
  },
  
  update: function(e,d) {
    var element = $(this);
    var actor   = element.find('.actor');
    var value = basicdesign.defaultUpdate( e, d, element, true, element.parent().attr('id') );
    var data  = templateEngine.widgetDataGetByElement( element );
    var on = templateEngine.map( data[ 'threshold_value' ], data['mapping'] );
    if (value >= on){
      var audioWidget = document.getElementById(data['id']);
      if (audioWidget.paused == true)
        audioWidget.play();
    };
  }
});

}); // end define