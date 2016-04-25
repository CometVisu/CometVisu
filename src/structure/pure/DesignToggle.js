/* DesignToggle.js 
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
 * @module DesignToggle 
 * @title  CometVisu DesignToggle 
 */


/**
 * @author Christian Mayer
 * @since 2010
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('designtoggle', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);

    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'toggle', $e, path, flavour, type );

    // create the actor
    var value = $('link[href*="basic.css"]').attr('href').split('/')[2];
    var actor = '<div class="actor switchUnpressed"><div class="value">' + value + '</div></div>';

    var data = templateEngine.widgetDataGet( path );
    
    $.getJSON("./designs/get_designs.php",function(d) {
      data['availableDesigns'] = d;
    });

    return ret_val + actor + '</div>';
  },
  downaction: basicdesign.defaultButtonDownAnimationInheritAction,
  action: function( path, actor, isCaneled ) {
    basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    if( isCaneled ) return;

    var 
      data = templateEngine.widgetDataGet( path );
    
    var $this = $(this);
    var designs = data.availableDesigns;

    var oldDesign = $('.value',$this).text();
    var newDesign = designs[ (designs.indexOf(oldDesign) + 1) % designs.length ];

    var URL = window.location.href;
    var regexp = new RegExp("design="+oldDesign)
    if (URL.search(regexp) != -1) { // has URL-parameter design
      window.location.href=URL.replace(regexp, "design="+newDesign);
    }
    else {
      if (URL.indexOf("?") != -1) { // has other parameters, append design
        window.location.href=URL+"&design="+newDesign;
      }
      else { // has now parameters
        window.location.href=URL+"?design="+newDesign;
      }
    }
  }
});

}); // end define