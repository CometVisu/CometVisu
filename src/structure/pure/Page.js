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
define( [
  '_common',
  'lib/cv/role/HasChildren'
], function() {
  "use strict";

  Class('cv.structure.pure.Page', {
    isa: cv.structure.pure.AbstractWidget,

    does: [
      cv.role.HasChildren
    ],

    has: {
      name              : { is: 'r' },
      showTopNavigation : { is: 'r' },
      showFooter        : { is: 'r' },
      showNavbar        : { is: 'r', init: {} },
      backdropAlign     : { is: 'r' },
      bindClickToWidget : { is: 'r', init: false },
      backdropType      : { is: 'rw' },
      visible           : { is: 'r', init: true },
      pageType          : { is: 'r' },
      wstyle            : { is: 'r', init: '' },
      address           : { is: 'r', init: [] }
    },

    my : {
      has: {
        allPages          : { is: 'rw', init: ''}
      },

      methods: {
        /**
         * Description
         * @method create
         * @param {} page
         * @param {} path
         * @param {} flavour
         * @param {} pageType
         * @return ret_val
         */
        parse: function( page, path, flavour, pageType ) {
          var $p = $(page);

          var addresses = {};
          if ($p.attr('ga')) {
            var src = $p.attr('ga');
            templateEngine.addAddress( src, path + '_' );
            addresses[ src ] = [ 'DPT:1.001', 0 ];
          }

          var name    = $p.attr('name');
          pageType = $p.attr('type') || 'text';              //text, 2d or 3d
          var backdrop = $p.attr('backdrop');
          var showtopnavigation = $p.attr('showtopnavigation');
          var showfooter = $p.attr('showfooter');
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

          var bindClickToWidget = templateEngine.bindClickToWidget;
          if ($p.attr("bind_click_to_widget")) {
            bindClickToWidget = $p.attr("bind_click_to_widget")=="true";
          }
          if( $p.attr('flavour') ) flavour = $p.attr('flavour');// sub design choice
          var wstyle  = '';                                     // widget style
          if( $p.attr('align') ) wstyle += 'text-align:' + $p.attr('align') + ';';
          if( wstyle != '' ) wstyle = 'style="' + wstyle + '"';

          var layout = this.parseLayout( $p.children('layout')[0] );

          var data = templateEngine.widgetDataInsert( path + '_', {
            path              : path,
            name              : name,
            pageType          : pageType,
            showTopNavigation : showtopnavigation,
            showFooter        : showfooter,
            showNavbar        : shownavbar,
            layout            : layout,
            backdropAlign     : '2d' === pageType ? ($p.attr('backdropalign' ) || '50% 50%') : undefined,
            size              : $p.attr('size'),
            address           : addresses,
            visible           : $p.attr('visible') || true,
            flavour           : flavour,
            $$type            : "page",
            classes           : this.setWidgetLayout( $p, path ),
            wstyle            : wstyle
          });
          return data;
        },

        /**
         * Description
         * @method createFinal
         */
        createFinal: function() { // special function - only for pages!
          $('#pages').prepend( this.allPages );
        }
      }
    },
    
    methods: {

      getDomString: function() {
        var ret_val = '';
        var pageType = this.getPageType();

        if (!this.getVisible()) {
          ret_val='';
        }
        else { // default is visible
          var layout = this.getLayout();

          var style = $.isEmptyObject(layout) ? '' : 'style="' + this.extractLayout( layout, pageType ) + '"';

          ret_val = '<div class="widget clearfix link pagelink '+this.getClasses()+'" ' + style + '>';
          ret_val += '<div class="actor" ' + this.getWstyle() + '><a href="javascript:">' + this.getName() + '</a></div>';
          ret_val += '</div>';
          /*
           var clickable = bindClickToWidget ? ret_val : actor;
           clickable.bind( 'click', function() {
           templateEngine.scrollToPage(name);
           });
           */
        }
        var subpageClass = this.getFlavour() ? (' flavour_' + this.getFlavour()) : '';
        var subpage = '<div class="page type_' + pageType + subpageClass + '" id="' + this.getPath() + '_">';
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
        Joose.A.each( this.getChildren(), function(path) {
          var data = templateEngine.widgetDataGet(path);
          var widget = cv.structure.pure.WidgetFactory.createInstance(data.$$type, data);
          if (widget) {
            var subelement = widget.getDomString();
            if( undefined === subelement )
              return;
            container += '<div class="widget_container '
                + (data.rowspanClass ? data.rowspanClass : '')
                + (data.containerClass ? data.containerClass : '')
                + ('break' === data.type ? 'break_container' : '') // special case for break widget
                + '" id="'+path+'" data-type="'+data.$$type+'">' + subelement + '</div>';
          }
        }, this);
        subpage += container + '</div></div>';
        cv.structure.pure.Page.my.allPages = subpage + cv.structure.pure.Page.my.allPages;
        return ret_val;
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
    }
  });

  cv.xml.Parser.addHandler("page", cv.structure.pure.Page);
}); // end define
