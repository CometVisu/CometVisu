/* page.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('page', {
  create: function( page, path, flavour, type ) {
    var $p = $(page);
    
    var address = {};
    if ($p.attr('ga')) {
      src = $p.attr('ga');
      templateEngine.addAddress($p.attr('ga'));
      address[ '_' + $p.attr('ga') ] = [ 'DPT:1.001', 0 ];
    }

    var name    = $p.attr('name');
    var type    = $p.attr('type') || 'text';              //text, 2d or 3d
    var backdrop = $p.attr('backdrop');
    var showtopnavigation = $p.attr('showtopnavigation');
    var showfooter = $p.attr('showfooter');
    var shownavbar_top = $p.attr('shownavbar-top');
    var shownavbar_bottom = $p.attr('shownavbar-bottom');
    var shownavbar_left = $p.attr('shownavbar-left');
    var shownavbar_right = $p.attr('shownavbar-right');
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ($p.attr("bind_click_to_widget")) bindClickToWidget = $p.attr("bind_click_to_widget")=="true";
    if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
    var wstyle  = '';                                     // widget style
    if( $p.attr('align') ) wstyle += 'text-align:' + $p.attr('align') + ';';
    if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';

    var ret_val;
    
    if ($p.attr('visible')=='false') {
      ret_val=$('');
    } else { // default is visible
      var layout = $p.children('layout')[0];
      var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
      ret_val = $('<div class="widget clearfix link pagelink" ' + style + '/>');
      ret_val.setWidgetLayout($p);
      if (bindClickToWidget) {
        ret_val.bind('click', function() {
          templateEngine.scrollToPage(path);
        });
        var tst = $('<div ' + wstyle + '><a href="#">' + name + '</a></div>');
        ret_val.append(tst );
      }
      else {
        var tst = $('<div ' + wstyle + '><a href="javascript:templateEngine.scrollToPage(\''+path+'\')">' + name + '</a></div>');
        ret_val.append(tst );
      }
    }

    var childs = $p.children().not('layout');
    //var container = $( '<div class="clearfix" />' );
    
    var subpage = $( '<div class="page" id="' + path + '"/>' );
    subpage.data('showtopnavigation',showtopnavigation);
    subpage.data('showfooter',showfooter);
    subpage.data('shownavbar',{
      top : shownavbar_top,
      bottom : shownavbar_bottom,
      left : shownavbar_left,
      right : shownavbar_right
    });
    var $container = $( '<div class="clearfix" path="'+path+'" style="height:100%;position:relative;" />'); 
    for( var addr in address ) $container.bind( addr, this.update );
    var container=$container;
    
    container.append( '<h1>' + name + '</h1>' );
    if( '2d' == type )
    {
      var size = 'width:100%;height:100%;';
      if( $p.attr('size') == 'fixed' )
        size = '';
      // else: assume scaled
      container.append( '<embed src="' + backdrop + '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' + size + '"/>' );
    } else if( '3d' == type )
    {
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
        templateEngine.addAddress($p.attr('azimut'));
        address[ '_' + $p.attr('azimut') ] = [ 'DPT:9.001', 0, 'azimut' ];
        container.bind( '_' + $p.attr('azimut'), this.update );
      }
      if ($p.attr('elevation')) {
        templateEngine.addAddress($p.attr('elevation'));
        address[ '_' + $p.attr('elevation') ] = [ 'DPT:9.001', 0, 'elevation' ];
        container.bind( '_' + $p.attr('elevation'), this.update );
      }; 
      if ($p.attr('floor')) {
        templateEngine.addAddress($p.attr('floor'));
        address[ '_' + $p.attr('floor') ] = [ 'DPT:5.004', 0, 'floor' ];
        container.bind( '_' + $p.attr('floor'), this.update );
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
    }
    container.data( 'address', address );
    $( childs ).each( function(i){
        container.append( templateEngine.create_pages( childs[i], path + '_' + i, flavour, type ) );
    } );
    subpage.append(container);
    if( flavour ) subpage.addClass( 'flavour_' + flavour );
    $('#pages').prepend( subpage );
    return ret_val;
  },
  update: function(e, data) {
    var element = $(this);
    var value = defaultValueHandling( e, data, element );
    var type = element.data().address[ e.type ][2];
    switch( type )
    {
      case 'azimut':
        element.data().JSFloorPlan3D.setState('currentAzimut', value, true);
        element.trigger( 'update3d', element.data().JSFloorPlan3D );
        break;
        
      case 'elevation':
        element.data().JSFloorPlan3D.setState('currentElevation', value, true);
        element.trigger( 'update3d', element.data().JSFloorPlan3D );
        break;
        
      case 'floor':
        element.data().JSFloorPlan3D.moveToRoom( value, false, true, true, function(){
          element.trigger( 'update3d', element.data().JSFloorPlan3D );
        });
        break;
        
      default:
        if (data==01) {
          templateEngine.scrollToPage(this.attributes.path.nodeValue);
          templateEngine.visu.write(e.type.substr(1), templateEngine.transformEncode('DPT:1.001', 0));
        }
    }
  }
});
