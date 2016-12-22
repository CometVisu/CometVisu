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
 *
 *
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

      var storagePath = cv.role.HasChildren.getStoragePath(page, path);
      var addresses = {};
      if (qx.bom.element.Attribute.get(page, 'ga')) {
        var src = qx.bom.element.Attribute.get(page, 'ga');
        cv.data.Model.getInstance().addAddress(src, storagePath);
        addresses[ src ] = [ 'DPT:1.001', 0 ];
      }

      var name    = qx.bom.element.Attribute.get(page, 'name');
      pageType = qx.bom.element.Attribute.get(page, 'type') || 'text';              //text, 2d or 3d
      var backdrop = qx.bom.element.Attribute.get(page, 'backdrop');
      var showtopnavigation = qx.bom.element.Attribute.get(page, 'showtopnavigation') ? qx.bom.element.Attribute.get(page, 'showtopnavigation') === "true" : null;
      var showfooter = qx.bom.element.Attribute.get(page, 'showfooter') ? qx.bom.element.Attribute.get(page, 'showfooter') === "true": true;
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
        top    : path === "id" ? false : null,
        bottom : path === "id" ? false : null,
        left   : path === "id" ? false : null,
        right  : path === "id" ? false : null
      };
      qx.bom.Selector.matches("navbar", qx.dom.Hierarchy.getChildElements(page)).forEach( function(elem) {
        shownavbar[ qx.bom.element.Attribute.get(elem, 'position') || 'left' ] = true;
      });
      // overwrite default when set manually in the config
      ['top', 'left', 'right', 'bottom'].forEach(function(pos) {
        if (shownavbar[pos] !== null) {
          // do not override current values
          return;
        }
        var value = qx.bom.element.Attribute.get(page, 'shownavbar-'+pos);
        if (qx.lang.Type.isString(value)) {
          shownavbar[pos] = value === "true";
        }
      }, this);
      var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if (qx.bom.element.Attribute.get(page, "bind_click_to_widget")) {
        bindClickToWidget = qx.bom.element.Attribute.get(page, "bind_click_to_widget")=="true";
      }
      if( qx.bom.element.Attribute.get(page, 'flavour') ) flavour = qx.bom.element.Attribute.get(page, 'flavour');// sub design choice
      var wstyle  = '';                                     // widget style
      if( qx.bom.element.Attribute.get(page, 'align') ) wstyle += 'text-align:' + qx.bom.element.Attribute.get(page, 'align') + ';';
      if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';

      var layout = cv.xml.Parser.parseLayout( qx.bom.Selector.matches("layout", qx.dom.Hierarchy.getChildElements(page))[0] );

      var data = cv.data.Model.getInstance().setWidgetData( storagePath, {
        path              : storagePath,
        name              : name,
        pageType          : pageType,
        showTopNavigation : showtopnavigation,
        showFooter        : showfooter,
        showNavbarTop     : shownavbar.top,
        showNavbarBottom  : shownavbar.bottom,
        showNavbarLeft    : shownavbar.left,
        showNavbarRight   : shownavbar.right,
        backdropAlign     : '2d' === pageType ? (qx.bom.element.Attribute.get(page, 'backdropalign' ) || '50% 50%') : null,
        size              : qx.bom.element.Attribute.get(page, 'size') || null,
        address           : addresses,
        visible           : qx.bom.element.Attribute.get(page, 'visible') ? qx.bom.element.Attribute.get(page, 'visible') === "true" : true,
        flavour           : flavour || null,
        $$type            : "page",
        backdrop          : backdrop || null
      });
      // this has to be called manually to allow inheritance of the flavour, pageType values
      cv.role.HasChildren.parseChildren(page, path, flavour, pageType);
      if (data.visible === true) {
        var linkData = cv.data.Model.getInstance().setWidgetData( path, {
          $$type          : "pagelink",
          path            : path,
          name            : name,
          classes         : cv.xml.Parser.setWidgetLayout( page, path ) || '',
          layout          : layout || null,
          address         : addresses,
          pageType        : pageType,
          wstyle          : wstyle || '',
          bindClickToWidget: bindClickToWidget
        });
        return [data, linkData];
      } else {
        return data;
      }
    },

    /**
     * Description
     *
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
    anonymous : {
      refine: true,
      init: true
    },
    name              : {
      check: "String",
      init: "", nullable: true
    },
    showTopNavigation : {
      check: "Boolean",
      nullable: true,
      event: "changeShowTopNavigation"
    },
    showFooter        : {
      check: "Boolean",
      nullable: true,
      event: "changeShowFooter"
    },
    showNavbarTop : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarTop"
    },
    showNavbarBottom : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarBottom"
    },
    showNavbarLeft : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarLeft"
    },
    showNavbarRight : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarRight"
    },
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

    _onDomReady: function () {
      this.base(arguments);
      var parentPage = this.getParentPage();
      [
        ['showTopNavigation', true],
        ['showFooter', true],
        ['showNavbarTop', false],
        ['showNavbarBottom', false],
        ['showNavbarLeft', false],
        ['showNavbarRight', false]
      ].forEach(function(tuple) {
        var property = tuple[0];
        var defaultValue = tuple[1];
        if (this['get'+qx.lang.String.firstUp(property)]() === null) {
          // inherit from parent
          if (parentPage) {
            parentPage.bind(property, this, property);
          } else {
            // we have not parent page, because we are the root page, use the default value
            this['set'+qx.lang.String.firstUp(property)](defaultValue);
          }
        }
      }, this);
    },

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
          container += '<' + elemType + ' src="' + qx.util.ResourceManager.getInstance().toUri(backdrop) + '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' + size + '"/>';
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
         if (qx.bom.element.Attribute.get(page, 'azimut')) {
         cv.TemplateEngine.getInstance().addAddress( qx.bom.element.Attribute.get(page, 'azimut'), path + '_' );
         address[ qx.bom.element.Attribute.get(page, 'azimut') ] = [ 'DPT:9.001', 0, 'azimut' ];
         }
         if (qx.bom.element.Attribute.get(page, 'elevation')) {
         cv.TemplateEngine.getInstance().addAddress( qx.bom.element.Attribute.get(page, 'elevation'), path + '_' );
         address[ qx.bom.element.Attribute.get(page, 'elevation') ] = [ 'DPT:9.001', 0, 'elevation' ];
         };
         if (qx.bom.element.Attribute.get(page, 'floor')) {
         cv.TemplateEngine.getInstance().addAddress( qx.bom.element.Attribute.get(page, 'floor'), path + '_' );
         address[ qx.bom.element.Attribute.get(page, 'floor') ] = [ 'DPT:5.004', 0, 'floor' ];
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
        this.sendToBackend("0");
      }
      // }
    },

    sendToBackend: function (value) {
      if (this.getAddress) {
        var list = this.getAddress();
        for (var id in list) {
          if (list.hasOwnProperty(id)) {
            var address = list[id];
            if (!!(address[1] & 2)) {
              cv.TemplateEngine.getInstance().visu.write(id, cv.Transform.encode(address[0], value));
            }
          }
        }
      }
    }
  },

  defer: function() {
    cv.xml.Parser.addHandler("page", cv.structure.pure.Page);
  }
});