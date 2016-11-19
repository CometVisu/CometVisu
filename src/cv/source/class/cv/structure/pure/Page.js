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
qx.Class.define('cv.structure.pure.Page', {
  extend: cv.structure.pure.AbstractWidget,

  include: [
    cv.role.HasChildren,
    cv.role.Update
  ],

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    allPages : '',

    parse: function( page, path, flavour, pageType ) {
      var $p = $(page);

      var storagePath = cv.role.HasChildren.getStoragePath(page, path);
      var addresses = {};
      if ($p.attr('ga')) {
        var src = $p.attr('ga');
        cv.data.Model.getInstance().addAddress(src, storagePath);
        addresses[ src ] = [ 'DPT:1.001', 0 ];
      }

      var name    = $p.attr('name');
      pageType = $p.attr('type') || 'text';              //text, 2d or 3d
      var backdrop = $p.attr('backdrop');
      var showtopnavigation = $p.attr('showtopnavigation') ? $p.attr('showtopnavigation') === "true" : undefined;
      var showfooter = $p.attr('showfooter') ? $p.attr('showfooter') === "true": undefined;
      // make sure the type has the correct value as we need to use it ass CSS class
      switch (pageType) {
        case '2d':
        case '3d':
          // do nothing, type has correct value
          break;
        default:
          pageType = 'text';
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

      var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if ($p.attr("bind_click_to_widget")) {
        bindClickToWidget = $p.attr("bind_click_to_widget")=="true";
      }
      if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
      var wstyle  = '';                                     // widget style
      if( $p.attr('align') ) wstyle += 'text-align:' + $p.attr('align') + ';';
      if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';

      var layout = cv.xml.Parser.parseLayout( $p.children('layout')[0] );

      var data = cv.data.Model.getInstance().setWidgetData( storagePath, {
        path              : storagePath,
        name              : name,
        pageType          : pageType,
        showTopNavigation : showtopnavigation || null,
        showFooter        : showfooter || null,
        showNavbar        : shownavbar || null,
        backdropAlign     : '2d' === pageType ? ($p.attr('backdropalign' ) || '50% 50%') : null,
        size              : $p.attr('size') || null,
        address           : addresses,
        visible           : $p.attr('visible') ? $p.attr('visible') === "true" : true,
        flavour           : flavour || null,
        $$type            : "page",
        backdrop          : backdrop || null
      });
      cv.role.HasChildren.parse(page, path, flavour, pageType);
      if (data.visible === true) {
        var linkData = cv.data.Model.getInstance().setWidgetData( path, {
          $$type          : "pagelink",
          path            : path,
          name            : name,
          classes         : cv.xml.Parser.setWidgetLayout( $p, path ) || null,
          layout          : layout || null,
          address         : addresses,
          pageType        : pageType,
          wstyle          : wstyle || null
        });
        return [data, linkData];
      } else {
        return data;
      }
    },

    /**
     * Description
     * @method createFinal
     */
    createFinal: function() { // special function - only for pages!
      qx.bom.Selector.query("#pages")[0].innerHTML = this.allPages;
    }
  },


  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {

    name              : {
      check: "String",
      init: "", nullable: true
    },
    showTopNavigation : { check: "Boolean", init: true, nullable: true },
    showFooter        : { check: "Boolean", init: true, nullable: true },
    showNavbar        : { check: "Object", init: {}, nullable: true },
    backdropAlign     : {
      init: '50% 50%',
      nullable: true
    },
    backdropType      : { check: "String", nullable: true },
    visible           : { check: "Boolean", init: true, nullable: true },
    size              : { check: "String", nullable: true },
    backdrop          : { check: "String", nullable: true }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    getDomString: function() {
      var pageType = this.getPageType();

      var subpageClass = this.getFlavour() ? (' flavour_' + this.getFlavour()) : '';
      var subpage = '<div class="page type_' + pageType + subpageClass + '" id="' + this.getPath() + '">';
      var container = '<div class="clearfix" style="height:100%;position:relative;"><h1>' + this.getName() + '</h1>';

      if( '2d' == pageType )
      {
        var size = 'width:100%;height:100%;';
        switch( this.getSize() )
        {
          case 'fixed':
            size = '';
            break;

          case 'contained':
            size += 'object-fit:contain;';
            if(this.getBackdropAlign()) {
              size += 'object-position:' + this.getBackdropAlign() + ';';
            }
            break;

          case 'scaled':
          default: // default: assume scaled
        }

        var backdrop = this.getBackdrop();
        if (undefined != backdrop) {
          var elemType = '.svg' == backdrop.substring( backdrop.length - 4 ) ? 'embed' : 'img';
          container += '<' + elemType + ' src="' + backdrop + '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' + size + '"/>';
          this.setBackdropType(elemType);
        }
      } else if( '3d' == pageType && false ) //---Disable 3D for 0.8---
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
         cv.TemplateEngine.getInstance().addAddress( $p.attr('azimut'), path + '_' );
         address[ $p.attr('azimut') ] = [ 'DPT:9.001', 0, 'azimut' ];
         }
         if ($p.attr('elevation')) {
         cv.TemplateEngine.getInstance().addAddress( $p.attr('elevation'), path + '_' );
         address[ $p.attr('elevation') ] = [ 'DPT:9.001', 0, 'elevation' ];
         };
         if ($p.attr('floor')) {
         cv.TemplateEngine.getInstance().addAddress( $p.attr('floor'), path + '_' );
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
      container += this.getChildrenDomString();
      subpage += container + '</div></div>';
      cv.structure.pure.Page.allPages = subpage + cv.structure.pure.Page.allPages;
      return undefined;
    },

    /**
     * Description
     * @method update
     * @param {} ga
     * @param {} data
     */
    _update: function( ga, data ) {
      // widgetData  = cv.data.Model.getInstance().getWidgetDataByElement( element );
      // var value = this.defaultValueHandling( ga, data, widgetData );
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
        cv.TemplateEngine.getInstance().scrollToPage(this.getName());
        cv.TemplateEngine.getInstance().visu.write( ga, cv.TemplateEngine.getInstance().transformEncode('DPT:1.001', 0));
      }
      // }
    }
  }
});

/**
 * @class cv.structure.pure.PageLink
 */
qx.Class.define('cv.structure.pure.PageLink', {
  extend: cv.structure.pure.AbstractWidget,

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    name : {
      check: "String"
    },
    wstyle : {
      check: "String",
      init: ''
    },
    address : {
      check: "Array",
      init: []
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    getDomString: function() {
      var layout = this.getLayout();

      var style = qx.lang.Type.isObject(layout) ? '' : 'style="' + cv.xml.Parser.extractLayout(layout, this.getPageType()) + '"';

      var ret_val = '<div class="widget clearfix link pagelink ' + this.getClasses() + '" ' + style + '>';
      ret_val += '<div class="actor" ' + this.getWstyle() + '><a href="javascript:">' + this.getName() + '</a></div>';
      ret_val += '</div>';
      return ret_val;
    },

    action: function( path, actor, isCanceled ) {
      if( isCanceled ) return;

      cv.TemplateEngine.getInstance().scrollToPage( path + '_' );
    }
  },

  defer: function() {

    cv.xml.Parser.addHandler("page", cv.structure.pure.Page);
    cv.xml.Parser.addHandler("pagelink", cv.structure.pure.PageLink);
  }
}); // end define
