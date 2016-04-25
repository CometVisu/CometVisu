/* UrlTrigger.js 
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
 * @module UrlTrigger 
 * @title  CometVisu UrlTrigger 
 */


/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
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
    var layoutClass = basicdesign.setWidgetLayout( $e, path );
    if( layoutClass ) classes += ' ' + layoutClass;
    if( flavour ) classes += ' flavour_' + flavour;
    var ret_val = '<div class="'+classes+'" ' + style + '>';
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    var label = basicdesign.extractLabel( $e.find('label')[0], flavour );
    var actor = '<div class="actor switchUnpressed ';
    if ( $e.attr( 'align' ) ) 
      actor += $e.attr( 'align' ); 
    actor += '"><div class="value"></div></div>';
    var data = templateEngine.widgetDataInsert( path, {
      'url'     : $(element).attr('url'), 
      'mapping' : $(element).attr('mapping'),
      'styling' : $(element).attr('styling'),
      'align'   : $e.attr('align'),
      'params'  : $(element).attr('params'),
      'sendValue': value //value is currently ignored in XHR! maybe for multitrigger
    } );
    
    // initially setting a value
    templateEngine.postDOMSetupFns.push( function(){
      basicdesign.defaultUpdate( undefined, value, $('#'+path), true, path );
    });

    return ret_val + label + actor + '</div>';
  },
  downaction: basicdesign.defaultButtonDownAnimationInheritAction,
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    if( isCanceled ) return;
    
    var 
      data  = templateEngine.widgetDataGet( path );
      
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

