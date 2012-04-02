/* structure_custom.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This module defines the custom widget additions to the CometVisu visualisation.
 * @module Structure custom
*/

/**
 * This class defines all the custom changes to the visu
 * @class VisuDesign_Custom
 */
function VisuDesign_Custom() {};                // do NOT change here
VisuDesign_Custom.prototype = new VisuDesign(); // do NOT change here

/*
 * Custom changes could go here and look e.g. like
****************************************
VisuDesign_Custom.prototype.addCreator("line", {
      create: function( page, path ) {
              return $( '<hr />' );
          },
      attributes: {
      },
      content: false
});
****************************************
 */

/*
 * This is a custom function that extends the available widgets.
 * It's purpose is to change the design of the visu during runtime
 * to demonstrate all available
 */
VisuDesign_Custom.prototype.addCreator("designtoggle", {
  create: function( page, path ) {
    var $p = $(page);             
    var ret_val = $('<div class="widget clearfix switch" />');
    ret_val.setWidgetLayout($p).makeWidgetLabel($p);
    var actor = '<div class="actor switchUnpressed">';
    var value = $('link[href*="basic.css"]').attr('href').split('/')[1];
    actor += '<div class="value">' + value + '</div>';
    actor += '</div>';
    ret_val.append($(actor)
      .data({
        'mapping' : $p.attr('mapping'),
        'styling' : $p.attr('styling'),
        'value'   : value,
        'type'    : 'toggle'
      })
      .bind('click', function() {
        var designs     = [ 'pure', 'discreet', 'discreet_sand', 'discreet_slim', 'alaska', 'alaska_slim' ];
        var oldDesign = $('.value',this).text();
        var newDesign = designs[ (designs.indexOf(oldDesign) + 1) % designs.length ];
        
        var URL = window.location.href;
        var regexp = new RegExp("design="+oldDesign)
        if (URL.search(regexp) != -1) { // has URL-parameter design
          window.location.href=URL.replace(regexp, "design="+newDesign);
        } else {
          if (URL.indexOf("?") != -1) { // has other parameters, append design
            window.location.href=URL+"&design="+newDesign;
          } else { // has now parameters
            window.location.href=URL+"?design="+newDesign;
          }
        }
        
      })
    );
    return ret_val;
  },
  attributes: {
  },
  content: true
});

