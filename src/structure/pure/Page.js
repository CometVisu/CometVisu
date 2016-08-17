/* Page.js 
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
 * @module structure/pure/Page
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var 
    basicdesign = design.basicdesign,
    allPages = '';
 
  design.basicdesign.addCreator('page', {
  /**
   * Description
   * @method create
   * @param {} page
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return ret_val
   */
  create: function( page, path, flavour, type ) {
    var $p = $(page);
    
    var address = {};
    if ($p.attr('ga')) {
      var src = $p.attr('ga');
      templateEngine.addAddress( src, path + '_' );
      address[ src ] = [ 'DPT:1.001', 0 ];
    }

    var name    = $p.attr('name');
    var type    = $p.attr('type') || 'text';              //text, 2d or 3d
    var backdrop = $p.attr('backdrop');
    var showtopnavigation = $p.attr('showtopnavigation');
    var showfooter = $p.attr('showfooter');
    // make sure the type has the correct value as we need to use it ass CSS class
    switch (type) {
      case '2d':
      case '3d':
        // do nothing, type has correct value
        break;
      default:
        type = 'text';
        break;
    }
    
    // automatically set the navbars if not set in the config file
    var shownavbar = {
      top    : 'id' === path ? 'false' : 'inherit',
      bottom : 'id' === path ? 'false' : 'inherit',
      left   : 'id' === path ? 'false' : 'inherit',
      right  : 'id' === path ? 'false' : 'inherit'
    };
    $p.children('navbar').each( function(){
      shownavbar[ $(this).attr('position') || 'left' ] = 'true';
    });
    // overwrite default when set manually in the config
    shownavbar.top = $p.attr('shownavbar-top') || shownavbar.top;
    shownavbar.bottom = $p.attr('shownavbar-bottom') || shownavbar.bottom;
    shownavbar.left = $p.attr('shownavbar-left') || shownavbar.left;
    shownavbar.right = $p.attr('shownavbar-right') || shownavbar.right;
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ($p.attr("bind_click_to_widget")) bindClickToWidget = $p.attr("bind_click_to_widget")=="true";
    if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
    var wstyle  = '';                                     // widget style
    if( $p.attr('align') ) wstyle += 'text-align:' + $p.attr('align') + ';';
    if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';

    var ret_val;
    
    var layout = basicdesign.parseLayout( $p.children('layout')[0] );
    if ($p.attr('visible')=='false') {
      ret_val='';
    }
    else { // default is visible
      var style = $.isEmptyObject(layout) ? '' : 'style="' + basicdesign.extractLayout( layout, type ) + '"';
      var classes = basicdesign.setWidgetLayout( $p, path );
      ret_val = '<div class="widget clearfix link pagelink '+(classes?classes:'')+'" ' + style + '>';
      ret_val += '<div class="actor" ' + wstyle + '><a href="javascript:">' + name + '</a></div>';
      ret_val += '</div>';
      /*
      var clickable = bindClickToWidget ? ret_val : actor;
      clickable.bind( 'click', function() {
        templateEngine.scrollToPage(name);
      });
      */
    }

    var childs = $p.children().not('layout');
    var subpageClass = flavour ? (' flavour_' + flavour) : '';
    var subpage = '<div class="page type_' + type + subpageClass + '" id="' + path + '_">';
    var data = templateEngine.widgetDataInsert( path + '_', {
      name             : name,
      type             : type,
      showtopnavigation: showtopnavigation,
      showfooter       : showfooter,
      shownavbar       : shownavbar,
      layout           : layout,
      backdropalign    : '2d' === type ? ($p.attr('backdropalign' ) || '50% 50%') : undefined
    });
    var container = '<div class="clearfix" style="height:100%;position:relative;"><h1>' + name + '</h1>'; 
    
    if( '2d' == type )
    {
      var size = 'width:100%;height:100%;';
      switch( $p.attr('size') )
      {
        case 'fixed':
          size = '';
          break;
          
        case 'contained':
          size += 'object-fit:contain;';
          if( $p.attr('backdropalign' ) )
          {
            size += 'object-position:' + data.backdropalign + ';';
          }
          break;
          
        case 'scaled':
        default: // default: assume scaled
      }
      
      if (undefined != backdrop) {
        var elemType = '.svg' == backdrop.substring( backdrop.length - 4 ) ? 'embed' : 'img';
        container += '<' + elemType + ' src="' + backdrop + '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' + size + '"/>';
        data.backdroptype = elemType;
      }
    } else if( '3d' == type && false ) //---Disable 3D for 0.8---
    {
      /*
      var floorplan = JSFloorPlan3D( container, backdrop );
      floorplan.moveToRoom( 'Underground', false, true, false );
      container.data( 'JSFloorPlan3D', floorplan );
      container.find('canvas').css({position: 'absolute', top: '0px', left: '0px', 'z-index':'-1', width:'100%',height:'100%'});
      subpage.click( {JSFloorPlan3D:floorplan,callback:function(event){
        var j = this.JSFloorPlan3D;
        j.moveToRoom( j.getState('showFloor'), event.room.room, true, true, function(){
          container.trigger( 'update3d', j );
        });
      }}, floorplan.translateMouseEvent );
      $(window).bind( 'resize', function(){ floorplan.resize($('.page').width(), $('.page').height(), true);} );
      if ($p.attr('azimut')) {
        templateEngine.addAddress( $p.attr('azimut'), path + '_' );
        address[ $p.attr('azimut') ] = [ 'DPT:9.001', 0, 'azimut' ];
      }
      if ($p.attr('elevation')) {
        templateEngine.addAddress( $p.attr('elevation'), path + '_' );
        address[ $p.attr('elevation') ] = [ 'DPT:9.001', 0, 'elevation' ];
      }; 
      if ($p.attr('floor')) {
        templateEngine.addAddress( $p.attr('floor'), path + '_' );
        address[ $p.attr('floor') ] = [ 'DPT:5.004', 0, 'floor' ];
      }; 
      
      $( childs ).each( function(i,a){
        if( this.tagName == 'filter' )
        {
          var floorFilter = $(this).attr('floor');
          var roomFilter  = $(this).attr('room');
          childs.splice( i, 1 );                 // remove filter element
          $(this).children().each( function(j){  // and add it's children
            $(this).find('layout').attr({floorFilter:floorFilter,roomFilter:roomFilter});
            childs.splice( i+j, 0, this );
          });
        }
      });
      */
    }
    templateEngine.widgetDataInsert( path + '_', {
      'address': address
    });
    $( childs ).each( function(i){
      var subelement = templateEngine.create_pages( childs[i], path + '_' + i, flavour, type );
      if( undefined === subelement )
        return;
        
      container += subelement;
    } );
    subpage += container + '</div></div>';
    allPages = subpage + allPages;
    return ret_val;
  },
  /**
   * Description
   * @method createFinal
   */
  createFinal: function() { // special function - only for pages!
    $('#pages').prepend( allPages );
  },
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} data
   */
  update: function( ga, data ) {
    var 
      element = $(this);
    // widgetData  = templateEngine.widgetDataGetByElement( element );
    // var value = basicdesign.defaultValueHandling( ga, data, widgetData );
    // var type = widgetData.address[ ga ][2];
    // switch( type )
    // {
    //   case 'azimut':
    //     widgetData.JSFloorPlan3D.setState('currentAzimut', value, true);
    //     element.trigger( 'update3d', widgetData.JSFloorPlan3D );
    //     break;
    //
    //   case 'elevation':
    //     widgetData.JSFloorPlan3D.setState('currentElevation', value, true);
    //     element.trigger( 'update3d', widgetData.JSFloorPlan3D );
    //     break;
    //
    //   case 'floor':
    //     widgetData.JSFloorPlan3D.moveToRoom( value, false, true, true, function(){
    //       element.trigger( 'update3d', widgetData.JSFloorPlan3D );
    //     });
    //     break;
    //
    //   default:
    // TODO: data comparision has to be refactored to use DPT and a value
    if (data==1) {
      templateEngine.scrollToPage(element.context.firstChild.textContent);
      templateEngine.visu.write( ga, templateEngine.transformEncode('DPT:1.001', 0));
    }
    // }
  },
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  action: function( path, actor, isCanceled ) {
    if( isCanceled ) return;
    
    templateEngine.scrollToPage( path + '_' );
  }
});

}); // end define
