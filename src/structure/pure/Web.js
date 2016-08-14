/* Web.js 
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
 */


/**
 * TODO: complete docs
 *
 * @module structure/pure/Web
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('web', {
  /**
   * Description
   * @method create
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return BinaryExpression
   */
  create: function( element, path, flavour, type ) {
    var $e = $(element);

    var address = {}, src;
    if ($e.attr('ga')) {
      src = $e.attr('ga');
      templateEngine.addAddress($e.attr('ga'));
      address[ '_' + $e.attr('ga') ] = [ 'DPT:1.001', 0 ];
    }

    var layout = basicdesign.parseLayout( $e.children('layout')[0] );
    var style = $.isEmptyObject(layout) ? '' : 'style="' + basicdesign.extractLayout( layout, type ) + '"';
    var classes = basicdesign.setWidgetLayout( $e, path );

    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
    var ret_val = '<div class="widget web '+(classes?classes:'')+'" ' + style + '>';
    ret_val += basicdesign.extractLabel( $e.find('label')[0], flavour );
    var webStyle = '';
    if( $e.attr('width' ) ) {
      webStyle += 'width:'  + $e.attr('width' ) + ';'; 
    } else {  // default width is 100% of widget space (fix bug #3175343 part 1)
      webStyle += 'width: 100%;';
    }
    if( $e.attr('height') ) webStyle += 'height:' + $e.attr('height') + ';';
    if( $e.attr('frameborder') == 'false' ) style += 'border: 0px ;';
    if( $e.attr('background') ) webStyle += 'background-color:' + $e.attr('background') + ';';
    if( webStyle != '' ) webStyle = 'style="' + webStyle + '"';

    var scrolling = '';
    if( $e.attr('scrolling') ) scrolling = 'scrolling="' + $e.attr('scrolling') +'"'; // add scrolling parameter to iframe

    //   var actor = '<div class="actor"><iframe src="' +$e.attr('src') + '" ' + webStyle + scrolling + '></iframe></div>';
    var actor = '<div class="actor"><iframe src="' +$e.attr('src') + '" ' + webStyle + scrolling + '></iframe></div>';
  
    var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
    var data = templateEngine.widgetDataInsert( path, {
      'path'    : path,
      'address': address,
      'layout' : layout,
      'refresh': refresh
    } );
    
    if (data.refresh) {
      templateEngine.postDOMSetupFns.push( function(){
        templateEngine.setupRefreshAction( path, data.refresh );
      });
    }

    return ret_val + actor + '</div>';
  },
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} data
   */
  update: function( ga, data) {
    var 
      element    = $(this),
      widgetData = templateEngine.widgetDataGetByElement( element ),
      value      = basicdesign.defaultValueHandling( ga, data, widgetData ),
      type       = widgetData.address[ ga ][2];
    switch( type )
    {
      default:
        if (data==1) {
          var iframe = element.find('iframe');
          iframe.attr('src', iframe.attr('src'));
          templateEngine.visu.write( ga, templateEngine.transformEncode('DPT:1.001', 0));
        }
    }
  }

});

}); // end define
