/* Image.js 
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
 * @module Image 
 * @title  CometVisu Image 
 */


/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('image', {
  create: function(element, path, flavour, type) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget('image', $e, path, flavour, type);
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'width'  : $e.attr('width'),
      'height' : $e.attr('height'),
      'src'    : $e.attr('src'),
      'refresh': $e.attr('refresh') ? $e.attr('refresh') * 1000 : 0
    });

    // create the actor
    var imgStyle = '';
    if (data.width) {
      imgStyle += 'width:'  + data.width + ';';
    }
    else {
      imgStyle += 'width: 100%;';
    }
    if (data.height) {
      imgStyle += 'height:' + data.height + ';';
    }
    var actor = '<div class="actor"><img src="' + data.src + '" style="' + imgStyle + '" /></div>';

    if (data.refresh) {
      templateEngine.postDOMSetupFns.push( function(){
        templateEngine.setupRefreshAction( path, data.refresh );
      });
    }
    
    return ret_val + actor + '</div>';
  }
});

}); // end define
