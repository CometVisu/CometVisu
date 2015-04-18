/* pagejump.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
  
design.basicdesign.addCreator('pagejump', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + basicdesign.extractLayout( layout, type ) + '"' : '';
    var target = $e.attr('target') ? $e.attr('target') : '0';
    var classes = 'widget clearfix pagejump';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var layoutClass = basicdesign.setWidgetLayout( $e, path );
    if( layoutClass ) classes += ' ' + layoutClass;
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
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
      'styling' : $(element).attr('styling'),
      'align'   : $e.attr('align'),
      'target'  : target
    } );
    var info = '';
    var widgetInfo = $('widgetinfo > *', $e).first()[0];
    if (widgetInfo!=undefined) {
      var data = templateEngine.widgetDataInsert( path+"_0", {
        containerClass           : "widgetinfo"
      } );
      info = templateEngine.create_pages(widgetInfo, path+"_0", flavour, widgetInfo.nodeName);
    }
    return ret_val + actor + info +'</div>';
  },
  downaction: function( path, actor, isCanceled ) {
    if (!$(actor).parent().hasClass("info")) {
      basicdesign.defaultButtonDownAnimationInheritAction( path, actor );
    }
  },
  action: function( path, actor, isCanceled ) {
    if (!$(actor).parent().hasClass("info")) {
      basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    }
    if( isCanceled ) return;
    
    var data = templateEngine.widgetDataGet( path );
    templateEngine.scrollToPage( data.target );
  }
});

$(window).bind('scrolltopage', function( event, page_id ){
  var page = $('#' + page_id);
  //var name = templateEngine.widgetData[page_id.substr(0,page_id.length-1)].name;
  var name = templateEngine.widgetData[page_id].name;
  
  // remove old active classes
  $('.pagejump.active').removeClass('active');
  $('.pagejump.active_ancestor').removeClass('active_ancestor');
  
  // and set the new active ones
  $('.pagejump').each( function(){
    var $pagejump = $(this);
    var data = templateEngine.widgetDataGetByElement( this );
    if( name == data.target )
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
      parentName = templateEngine.widgetData[ parentId.substr(0,parentId.length-1) ].name;
    $('.pagejump').each( function(){
      var $pagejump = $(this);
      var data = templateEngine.widgetDataGetByElement( this );
      if( parentName == data.target )
      {
        $pagejump.addClass('active_ancestor');
      }
    });
    // recursively find pagejumps for parent pages
    parentPage = templateEngine.getParentPage(parentPage);
  }
});

}); // end define