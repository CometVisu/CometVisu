/* designtoggle.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define( ['_common'], function( design ) {
   var basicdesign = design.basicdesign;
 
design.basicdesign.addCreator('designtoggle', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);

    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'toggle', $e, path, flavour, type );

    // create the actor
    var value = $('link[href*="basic.css"]').attr('href').split('/')[2];
    var $actor = $('<div class="actor switchUnpressed"><div class="value">' + value + '</div></div>');
    ret_val.append( $actor );

    // bind to user action
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ( ret_val.data('bind_click_to_widget') ) bindClickToWidget = ret_val.data('bind_click_to_widget')==='true';
    var clickable = bindClickToWidget ? ret_val : $actor;
    basicdesign.createDefaultButtonAction( clickable, $actor, false, this.action );

    $.getJSON("./designs/get_designs.php",function(data) {
      ret_val.data('availableDesigns', data);
    });

    return ret_val;
  },
  action: function() {
    var $this = $(this);
    var designs = $this.parent().data('availableDesigns');

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