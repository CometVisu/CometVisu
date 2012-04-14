/* toggle.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('toggle', {
  create: function( page, path ) {
    var $p = $(page);
    var layout = $p.find('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout ) + '"' : '';
    var ret_val = $('<div class="widget clearfix toggle" ' + style + '/>');
    ret_val.setWidgetLayout($p);
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = makeAddressList($p);
    var actor = '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    var $actor = $(actor).data( {
      'address' : address,
      'mapping' : $p.attr('mapping'),
      'styling' : $p.attr('styling'),
      'align'   : $p.attr('align'),
      'type'    : 'switch'
    } ).bind( 'click', this.action );
    for( var addr in address ) $actor.bind( addr, this.update );
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    element.addClass('switchUnpressed');
  },
  action: function() {
    var data = $(this).data();
    var element_count = 0;
    var next_element;
    var first_element;
    for(var e in mappings[data.mapping])
        if(mappings[data.mapping].hasOwnProperty(e))
          {
              element_count++;
              if (e > data.value && !next_element)
                  next_element = e;
              if (!first_element)
                  first_element = e;
          }
    sendValue = (next_element) ? next_element : first_element;
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], sendValue ) );
    }
  },
  attributes: {
    mapping: { type: 'mapping', required: false },
    styling: { type: 'styling', required: false },
    align:   { type: 'string' , required: false },
    colspan: { type: 'numeric', required: false },
    rowspan: { type: 'numeric', required: false }
  },
  elements: {
    layout:  { type: 'layout' , required: false, multi: false },
    label:   { type: 'string' , required: true, multi: false  },
    address: { type: 'address', required: true, multi: true   }
  },
  content: false
});