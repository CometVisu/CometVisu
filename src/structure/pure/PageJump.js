/* PageJump.js 
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
 * @module structure/pure/PageJump
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('pagejump', {
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
    var layout = basicdesign.parseLayout( $e.children('layout')[0] );
    var style = $.isEmptyObject(layout) ? '' : 'style="' + basicdesign.extractLayout( layout, type ) + '"';
    var target = $e.attr('target') ? $e.attr('target') : '0';
    var classes = 'widget clearfix pagejump';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var layoutClass = basicdesign.setWidgetLayout( $e, path );
    if( layoutClass ) classes += ' ' + layoutClass;
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
    var widgetInfo = $('widgetinfo > *', $e).first()[0];
    var info = '';
    if (widgetInfo!=undefined) {
      classes+=" infoaction";
      var data = templateEngine.widgetDataInsert( path+"_0", {
        containerClass           : "widgetinfo"
      } );
      info = templateEngine.create_pages(widgetInfo, path+"_0", flavour, widgetInfo.nodeName);
    }
    var ret_val = '<div class="'+classes+'" ' + style + '>';
    ret_val += basicdesign.extractLabel( $e.find('label')[0], flavour );
    var actor = '<div class="actor switchUnpressed ';
    if ( $e.attr( 'align' ) ) 
      actor += $e.attr( 'align' ); 
    actor += '">';
    if( $e.attr( 'name' ) )
      actor += '<div class="value">' + $e.attr( 'name' ) + '</div>';
    actor += '</div>';
    var data = templateEngine.widgetDataInsert( path, {
      'bind_click_to_widget': true, // for pagejumps this is mandatory
      'styling' : $e.attr('styling'),
      'layout'  : layout,
      'align'   : $e.attr('align'),
      'target'  : target,
      'target_path': $e.attr('path'),
      'path'    : path,
      'active_scope': $e.attr('active_scope') ? $e.attr('active_scope') : 'target'
    } );
    return ret_val + actor + info +'</div>';
  },
  /**
   * Description
   * @method downaction
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  downaction: function( path, actor, isCanceled ) {
    if (!$(actor).parent().hasClass("info")) {
      basicdesign.defaultButtonDownAnimationInheritAction( path, actor );
    }
  },
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  action: function( path, actor, isCanceled ) {
    if (!$(actor).parent().hasClass("info")) {
      basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    }
    if( isCanceled ) return;
    
    var data = templateEngine.widgetDataGet( path );
    var target = data.target;
    if (data.target_path !== undefined) {
      target = templateEngine.getPageIdByPath(data.target,data.target_path);
    }
    templateEngine.scrollToPage( target );
  }
});

  $(window).bind('scrolltopage', function( event, page_id ){
  var page = $('#' + page_id);
  var name = templateEngine.widgetData[page_id].name;
  
  // remove old active classes
  $('.pagejump.active').removeClass('active');
  $('.pagejump.active_ancestor').removeClass('active_ancestor');
  
  // and set the new active ones
  $('.pagejump').each( function(){
    var $pagejump = $(this);
    var data = templateEngine.widgetDataGetByElement( this );
    if( name == data.target)
    {
      $pagejump.addClass('active');
    }
  });

  // now set the active ancestors
  var parentPage = templateEngine.getParentPage(page);
  // set for all parent pages apart from the root page
  while (parentPage != null && templateEngine.getParentPage(parentPage) != null) {
    var 
      parentId   = parentPage.attr('id'),
      parentName = templateEngine.widgetData[ parentId ].name;
    
    $('.pagejump').each( function(){
      var $pagejump = $(this);
      var data = templateEngine.widgetDataGetByElement( this );
      if( parentName == data.target || (data.active_scope=="path" && data.path!=undefined && data.path.match(parentName+"$")) )
      {
        $pagejump.addClass('active_ancestor');
      }
    });
    // recursively find pagejumps for parent pages
    parentPage = templateEngine.getParentPage(parentPage);
  }
});

}); // end define