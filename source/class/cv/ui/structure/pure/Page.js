/* Page.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Creates a new sub page and adds a corresponding link to the current page.
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.ui.structure.pure.Page', {
  extend: cv.ui.structure.AbstractWidget,
  implement: cv.ui.structure.IPage,

  include: [
    cv.ui.common.HasChildren,
    cv.ui.common.Update
  ],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.__waitForProperties = ['showNavbarTop', 'showNavbarBottom', 'showNavbarLeft', 'showNavbarRight'];
    this.base(arguments, props);

    this.addListener("changeVisible", this._onChangeVisible, this);

    // break out of the constructor
    new qx.util.DeferredCall(function() {
      var parentPage = this.getParentPage();
      if (!parentPage) {
        this.__waitForProperties = [];
      } else {
        this.debug("binding navbar visibility from " + parentPage.getPath() + " to " + this.getPath());
      }
      [
        ['showTopNavigation', true],
        ['showFooter', true],
        ['showNavbarTop', false],
        ['showNavbarBottom', false],
        ['showNavbarLeft', false],
        ['showNavbarRight', false]
      ].forEach(function (tuple) {
        var property = tuple[0];
        var defaultValue = tuple[1];
        if (this['get' + qx.lang.String.firstUp(property)]() === null) {
          // inherit from parent
          if (parentPage) {
            parentPage.bind(property, this, property);
          } else {
            // we have not parent page, because we are the root page, use the default value
            this['set' + qx.lang.String.firstUp(property)](defaultValue);
          }
        }
        if (!parentPage) {
          this.setInitialized(true);
        }
      }, this);
    }, this).schedule();

    if (this.getAddress()) {
      this._initOnCreate = true;
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    allPages : '',

    /**
     * Append the complete generated HTML code to the DOM tree at the end of the generation process
     */
    createFinal: function() { // special function - only for pages!
      qx.bom.Selector.query("#pages")[0].innerHTML = this.allPages;
      qx.event.message.Bus.unsubscribe("setup.dom.append", this.createFinal, this);
    }

  },


  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    initialized: {
      check: "Boolean",
      init: false,
      event: "changeInitialized"
    },

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
      event: "changeShowNavbarTop",
      apply: "_applyNavbarVisibility"
    },
    showNavbarBottom : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarBottom",
      apply: "_applyNavbarVisibility"
    },
    showNavbarLeft : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarLeft",
      apply: "_applyNavbarVisibility"
    },
    showNavbarRight : {
      check: "Boolean",
      nullable: true,
      event: "changeShowNavbarRight",
      apply: "_applyNavbarVisibility"
    },
    backdropAlign     : {
      init: '50% 50%',
      nullable: true
    },
    backdropType      : { check: "String", nullable: true },
    linkVisible       : { check: "Boolean", init: true, nullable: true },
    size              : { check: "String", nullable: true },
    backdrop          : { check: "String", nullable: true }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __waitForProperties: null,
    __colspanClass: null,
    __normalizedDomId: null,

    _applyNavbarVisibility: function(value, old, name) {
      if (value !== null) {
        qx.lang.Array.remove(this.__waitForProperties, name);
        if (this.__waitForProperties.length === 0) {
          this.setInitialized(true);
        }
      }
    },

    /**
     * If the page gets visible the colspan sized must be checked
     * @param ev {Event}
     */
    _onChangeVisible: function(ev) {
      if (ev.getData() && this.__colspanClass !== cv.ui.layout.Manager.COLSPAN_CLASS) {
        this.applyColumnWidths();
      }
    },

    /**
     * Set childrens column widths
     */
    applyColumnWidths: function() {
      cv.ui.layout.Manager.applyColumnWidths('#'+this.getPath(), false);
      this.__colspanClass = cv.ui.layout.Manager.COLSPAN_CLASS;
    },

    // overridden
    getDomString: function() {
      var pageType = this.getPageType();

      var subpageClass = this.getFlavour() ? (' flavour_' + this.getFlavour()) : '';
      var subpage = '<div class="page type_' + pageType + subpageClass + '" id="' + this.getPath() + '">';
      var container = '<div class="clearfix"><h1>' + this.getName() + '</h1>';

      if( '2d' === pageType )
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

          default: // default: assume scaled
        }

        var backdrop = this.getBackdrop();
        if (backdrop) {
          container += '<' + this.getBackdropType() + ' src="' + qx.util.ResourceManager.getInstance().toUri(backdrop) + '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' + size + '"/>';
        }
      } else if( '3d' === pageType && false ) //---Disable 3D for 0.8---
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
         if( this.tagName === 'filter' )
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
      cv.ui.structure.pure.Page.allPages = subpage + cv.ui.structure.pure.Page.allPages;
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
      if (parseInt(data) === 1) {
        cv.TemplateEngine.getInstance().scrollToPage(this.getPath());
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
            if (cv.data.Model.isWriteAddress(address)) {
              cv.TemplateEngine.getInstance().visu.write(id, cv.Transform.encode(address[0], value));
            }
          }
        }
      }
    }
  },

  defer: function(statics) {
    qx.event.message.Bus.subscribe("setup.dom.append", statics.createFinal, statics);
  }
});