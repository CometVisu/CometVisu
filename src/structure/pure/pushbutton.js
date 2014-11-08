/* pushbutton.js
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
  
design.basicdesign.addCreator('pushbutton', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'pushbutton', $e, path, flavour, type, this.update );
    // and fill in widget specific data
    ret_val.data( {
      'downValue'  : $e.attr('downValue' ) || 1,
      'upValue' : $e.attr('upValue') || 0
    } );

    // create the actor
    var $actor = $('<div class="actor switchUnpressed"><div class="value"></div></div>');
    ret_val.append( $actor );

    // bind to user action
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ( ret_val.data('bind_click_to_widget') ) bindClickToWidget = ret_val.data('bind_click_to_widget')==='true';
    var clickable = bindClickToWidget ? ret_val : $actor;
    basicdesign.createDefaultButtonAction( clickable, $actor, this.downAction, this.upAction );

    // initially setting a value
    basicdesign.defaultUpdate(undefined, undefined, ret_val, true);

    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var actor   = element.find('.actor');
    var value = basicdesign.defaultUpdate( e, d, element, true );
    var off = templateEngine.map( element.data( 'upValue' ), element.data('mapping') );
    actor.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    actor.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  downAction: function() {
    var $this = $(this);
    var data  = $this.data();
    if (undefined === data.address) data = $this.parent().data();

    for (var addr in data.address) {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      templateEngine.visu.write(addr.substr(1), templateEngine.transformEncode(data.address[addr][0], data.downValue));
    }
  },
  upAction: function() {
    var $this = $(this);
    var data  = $this.data();
    if (undefined === data.address) data = $this.parent().data();

    for (var addr in data.address) {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      templateEngine.visu.write(addr.substr(1), templateEngine.transformEncode(data.address[addr][0], data.upValue));
    }
  }
});

}); // end define