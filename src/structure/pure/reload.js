/* reload.js (c) 2014 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('reload', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'reload', $e, path, flavour, type, null );
    
    // create the actor
    var $actor = $('<div class="actor switchUnpressed"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    // bind to user action
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ( ret_val.data('bind_click_to_widget') ) bindClickToWidget = ret_val.data('bind_click_to_widget')==='true';
    var clickable = bindClickToWidget ? ret_val : $actor;
    basicdesign.createDefaultButtonAction( clickable, $actor, undefined, this.action );

    // initially setting a value
    basicdesign.defaultUpdate(undefined, $e.attr('value'), ret_val, true);
    return ret_val;
  },
  action: function(event) {
    templateEngine.visu.restart();
  }
});