/* trigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
 * modified urltrigger.js (c) 2012 by mm@elabnet.de
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

basicdesign.addCreator('urltrigger', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var value = $e.attr('value') ? $e.attr('value') : 0;
    var classes = 'widget clearfix trigger';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    var label = extractLabel( $e.find('label')[0] );
    var actor = '<div class="actor switchUnpressed ';
    if ( $e.attr( 'align' ) ) 
      actor += $e.attr( 'align' ); 
    actor += '"><div class="value"></div></div>';
    var $actor = $(actor);
    var valueElement = $actor.find('.value');
    var mappedValue = map( value, $e.attr('mapping') );
    if( ('string' == typeof mappedValue) || ('number' == typeof mappedValue) )
    {
      valueElement.append( mappedValue );
    } else 
    for( var i = 0; i < mappedValue.length; i++ )
    {
      valueElement.append( $(mappedValue[i]).clone() );
    }
    $actor.data( {
      'url'     : $(element).attr('url'), 
      'mapping' : $(element).attr('mapping'),
      'styling' : $(element).attr('styling'),
      'type'    : 'urltrigger',
      'align'   : $e.attr('align'),
      'params'  : $(element).attr('params'),
      'sendValue': value //value is currently ignored in XHR! maybe for multitrigger
    } ).bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } ).setWidgetStyling(value);
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  action: function() {
    var data = $(this).data();
    data.params = data.params ? data.params : '';
    $.ajax({
    type: "GET",
    datatype: "html",
    data: encodeURI(data.params),
    url: data.url,
    success: function(data){
            //maybe do something useful with the response?
        }
    });
  }
});

