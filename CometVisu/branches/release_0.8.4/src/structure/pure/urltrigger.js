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

define( ['_common'], function( design ) {
  var basicdesign = design.basicdesign;
  
design.basicdesign.addCreator('urltrigger', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + basicdesign.extractLayout( layout, type ) + '"' : '';
    var value = $e.attr('value') ? $e.attr('value') : 0;
    var classes = 'widget clearfix trigger';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    basicdesign.setWidgetLayout( ret_val, $e );
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var label = basicdesign.extractLabel( $e.find('label')[0], flavour );
    var actor = '<div class="actor switchUnpressed ';
    if ( $e.attr( 'align' ) ) 
      actor += $e.attr( 'align' ); 
    actor += '"><div class="value"></div></div>';
    var $actor = $(actor);
    var valueElement = $actor.find('.value');
    var mappedValue = templateEngine.map( value, $e.attr('mapping') );
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ($e.attr("bind_click_to_widget")) bindClickToWidget = $e.attr("bind_click_to_widget")=="true";
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
    } );
    templateEngine.setWidgetStyling($actor, value);
    var clickable = bindClickToWidget ? ret_val : $actor;
    clickable.bind( 'click', this.action ).bind( 'mousedown', function(){
      $actor.removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $actor.removeClass('switchPressed').addClass('switchUnpressed');
    } );
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  action: function() {
    var data = $(this).find('.actor').size()==1 ? $(this).find('.actor').data() : $(this).data();
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

}); // end define

